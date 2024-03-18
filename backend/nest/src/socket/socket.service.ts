import { HttpException, HttpStatus, Inject, Injectable, forwardRef } from '@nestjs/common';
import * as fs from 'fs';
import { DeviceService } from './../device/device.service';
import { SituationDto, SocketLoginDto } from './socket.dto';
import { DeviceCreateDto, DeviceUpdateDto } from 'src/device/device-req.dto';
import { SentenceService } from 'src/sentence/sentence.service';
import { TtsService } from 'src/tts/tts.service';
import { FileService } from './../file/file.service';
import { SentenceCreateDto } from 'src/sentence/sentence-req.dto';
import { PotService } from 'src/pot/pot.service';
import { S3Service } from 'src/s3/s3.service';

@Injectable()
export class SocketService {
  constructor(
    private readonly deviceService: DeviceService,
    private readonly sentenceService: SentenceService,
    private readonly ttsService: TtsService,
    private readonly fileService: FileService,
    @Inject(forwardRef(() => PotService))
    private readonly potService: PotService,
    private readonly s3Service: S3Service,
  ){}

  // device 정보 + socket id 저장
  async login(clientId:string, serial_number: string): Promise<SocketLoginDto>{
    if (!serial_number) throw new HttpException('needed serial_number', HttpStatus.BAD_REQUEST)
    const device = await this.deviceService.findBySerialNumber(serial_number)
    const result = new SocketLoginDto()

    result.is_owner = false
    result.pot_id = null
    // 처음온 연결인 경우
    if (!device){
      const deviceDto: DeviceCreateDto = new DeviceCreateDto()
      deviceDto.client_id = clientId
      deviceDto.empty_FG = true
      deviceDto.pot_id = null
      deviceDto.serial_number = serial_number
      deviceDto.user_id = null
      await this.deviceService.save(deviceDto)
      result.serial_number = serial_number
    // 이전 연결이 있는 경우
    }else{
      await this.deviceService.connectDevice(serial_number, clientId)
      if (device.pot_id) result.is_owner = true; result.pot_id = device.pot_id
    }
    return result;
  }

  /** stt-> tts : stt 받아서 tts로 return */
  async stt(text: string, talk_id: number, base64Data: string): Promise<string>{
    const today = this.fileService.getToday();
    const filePath = "upload/talk/" + today + "/"

    let nextSentenceId = await this.sentenceService.nestSentenceId(talk_id)
    const saveFilePath =  filePath + talk_id + "-" + nextSentenceId + ".mp3"
    const decodedBuffer = Buffer.from(base64Data, 'base64');

    const sentenceDto = new SentenceCreateDto()
    sentenceDto.content = text
    sentenceDto.audio = await this.s3Service.uploadBuffer(decodedBuffer, saveFilePath)
    sentenceDto.talker = "user"
    sentenceDto.talk_id = talk_id
    await this.sentenceService.save(sentenceDto)
    // gpt api
    const answerText = await this.sentenceService.answer(text)
    
    const uploadFilePath = filePath + talk_id + "-" + (nextSentenceId+1) + ".wav"
    const saveTtsPath = './'+talk_id + "-" + nextSentenceId + ".mp3"
    // message -> tts
    await this.ttsService.tts(answerText, saveTtsPath)
    
    // client.emit
    const content = await new Promise<Buffer>((resolve, reject) => {
      fs.readFile(saveTtsPath, (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(data)
        }
      })
    })
    
    // text, answerText 파일 저장
    console.log(text)
    const sentenceDto2 = new SentenceCreateDto()
    sentenceDto2.content = answerText
    sentenceDto2.audio = await this.s3Service.uploadBuffer(content, uploadFilePath)
    sentenceDto2.talker = "ai"
    sentenceDto2.talk_id = talk_id
    await this.sentenceService.save(sentenceDto2)

    return Buffer.from(content).toString('base64')
  }
  
  /*
  1. 대화부족
  2. 물 그만줘
  3. 물 적절해
  4. 물 부족
  5. 알람 도착
  6. 온도 낮아
  7. 온도 높아
  8. 모두 만족
  */
  async situation(pot_id: number, inject_situation_id: number): Promise<SituationDto>{
    const situationDto = new SituationDto();
    const status = await this.potService.potDetail(pot_id);
    let filePath = "./basic_ment/";

    if(inject_situation_id == undefined){
      // 대화 부족
      if(status.last_talk > 3){
        situationDto.situation_id = 1;
        filePath += 'boring/' + this.getRandomIntegerWav(1, 5);
      }
      // 물 그만줘
      else if (status.statusDto.mois_state == '초과'){
        situationDto.situation_id = 2;
        filePath += 'water_stop/' + this.getRandomIntegerWav(1, 3);
      }
      
      // 물 적절해
      else if(status.statusDto.mois_state == '적정') {
        situationDto.situation_id = 3;
        filePath += 'water_good/' + this.getRandomIntegerWav(1, 4);
      }
      // 물 부족해
      else if(status.statusDto.mois_state == '부족') {
        situationDto.situation_id = 4;
        filePath += 'water_more/' + this.getRandomIntegerWav(1, 3);
      }
      // 알람 도착: 동적 알람 매핑문제가 해결되면 추가할 예정

      else if(status.statusDto.temp_state == '낮음') {
        situationDto.situation_id = 6;
        filePath += 'cold/' + this.getRandomIntegerWav(1, 3);
      }
      else if(status.statusDto.temp_state == '높음') {
        situationDto.situation_id = 7;
        filePath += 'hot/' + this.getRandomIntegerWav(1, 3);
      } 
      else {
        situationDto.situation_id = 8;
        filePath += 'happy/' + this.getRandomIntegerWav(1, 6);
      }
    }
    else{
       // 대화 부족
       if(inject_situation_id == 1){
        situationDto.situation_id = 1;
        filePath += 'boring/' + this.getRandomIntegerWav(1, 5);
      }
      // 물 그만줘
      else if (inject_situation_id == 2){
        situationDto.situation_id = 2;
        filePath += 'water_stop/' + this.getRandomIntegerWav(1, 3);
      }
      
      // 물 적절해
      else if(inject_situation_id == 3) {
        situationDto.situation_id = 3;
        filePath += 'water_good/' + this.getRandomIntegerWav(1, 4);
      }
      // 물 부족해
      else if(inject_situation_id == 4 ) {
        situationDto.situation_id = 4;
        filePath += 'water_more/' + this.getRandomIntegerWav(1, 3);
      }
      // 알람 도착: 동적 알람 매핑문제가 해결되면 추가할 예정

      else if(inject_situation_id == 6) {
        situationDto.situation_id = 6;
        filePath += 'cold/' + this.getRandomIntegerWav(1, 3);
      }
      else if(inject_situation_id == 7) {
        situationDto.situation_id = 7;
        filePath += 'hot/' + this.getRandomIntegerWav(1, 3);
      } 
      else {
        situationDto.situation_id = 8;
        filePath += 'happy/' + this.getRandomIntegerWav(1, 6);
      }
    }
    
    const content = await new Promise<Buffer>((resolve, reject) => {
      fs.readFile(filePath, (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(data)
        }
      })
    })
    situationDto.basic_voice = Buffer.from(content).toString('base64')
    situationDto.filePath = filePath;
    return situationDto;
  }

  /** 유저 이름 부르는 파일 만들고 디코딩해서 return */
  async makeUserNameFile(pot_id: number): Promise<string>{    
    const status = await this.potService.potDetail(pot_id);
    const name_voice =  status.nickname + await this.selectPostposition(status.nickname);

    const nameVoicePath = "./upload/name_voice/" + name_voice + '.wav'
    await this.ttsService.tts(name_voice, nameVoicePath);

    const buffer:Buffer = await new Promise<Buffer>((resolve, reject) => {
      fs.readFile(nameVoicePath, (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(data)
        }
      })
    })

    return Buffer.from(buffer).toString('base64')
}

  // 이름 뒤의 조사 선택
  async selectPostposition(name) {
    // 종구야 : 종국아
    return this.hasCoda(name) ? "야" : "아";
  }

  // 이름이 받침으로 끝나는지 확인
  async hasCoda(name) {
    const lastChar = name.charAt(name.length - 1); // 이름의 마지막 글자
    const uni = lastChar.charCodeAt(0); // 마지막 글자의 유니코드
    // 한글의 유니코드 범위(0xAC00 ~ 0xD7A3) 내에 있고, 마지막 글자가 받침을 가지는지 확인
    if (uni >= 0xac00 && uni <= 0xd7a3) {
      return (uni - 0xac00) % 28 === 0;
    }
    return true;
  }

  getRandomIntegerWav(min, max): string {
    // Math.floor와 Math.random을 사용하여 랜덤 정수 생성
    return String(Math.floor(Math.random() * (max - min + 1)) + min) + '.wav';
  }

  async toTts(text: string) {
    const filePath = './hi dongho.mp3'
    await this.ttsService.tts(text, filePath)
  }
}
