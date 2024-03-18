import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { CreatePotStateDto } from 'src/pot-state/pot-state-insert.dto';
import { SocketService } from "./socket.service";
import { PotStateService } from 'src/pot-state/pot-state.service';
import { CalenderService } from 'src/calender/calender.service';
import { CalenderCreateDto } from 'src/calender/calender-req.dto';
import { TalkService } from 'src/talk/talk.service';
import { DeviceService } from 'src/device/device.service';
import { PotService } from 'src/pot/pot.service';
import { Pot } from 'src/pot/pot.entity';

@WebSocketGateway(7080, {
  cors: { origin: "*",},
  headers: { Authorization: 'base64 auth' }
})

@Injectable()
export class SocketGateway {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly socketService: SocketService,
    private readonly potStateService: PotStateService,
    private readonly calenderService: CalenderService,
    private readonly talkService: TalkService,
    private readonly deviceService: DeviceService,
    @Inject(forwardRef(() => PotService))
    private readonly potService: PotService,
  ){}

  handleConnection( client: Socket ){
    console.log(client.id)
  }

  async handleDisconnect( client: Socket){
    await this.deviceService.disconnectDevice( client.id )
  }

  @SubscribeMessage('login')
  async handleClientConnect(@ConnectedSocket() client: Socket, @MessageBody('serial_number') serial_number: string){
    const result = await this.socketService.login(client.id, serial_number)
    client.emit('login_result', result)
  }

  @SubscribeMessage('pot_state')
  async handleMessage( @MessageBody() inputDto: CreatePotStateDto): Promise<number>{
    await this.potStateService.save(inputDto);
    return 1;
  }

  @SubscribeMessage('stt')
  async saveSttFile( @ConnectedSocket() client: Socket, 
        @MessageBody('text') text: string, 
        @MessageBody('talk_id') talk_id: number, 
        @MessageBody('file') base64Data: string): Promise<string>{
    if (text==null) text=""
    if (base64Data==null) base64Data=""
    console.log(talk_id)
    const returnData = await this.socketService.stt(text, talk_id, base64Data)
    try{
      client.emit('tts', {base64Data:returnData} );
    } catch (error) {
      console.error(`Error reading file: ${error}`);
    }
    return returnData
  }

  @SubscribeMessage('water')
  async water( @MessageBody('pot_id') pot_id: number ): Promise<void>{
    const waterDto = new CalenderCreateDto;
    waterDto.pot_id = pot_id
    waterDto.code = 'W'
    this.calenderService.save(waterDto)
  }

  @SubscribeMessage('hot_word')
  async hotWord( @ConnectedSocket() client: Socket, @MessageBody('pot_id') pot_id: number ): Promise<void>{
    const dto = new CalenderCreateDto()
    if (!pot_id) client.emit('talk_id',1)
    dto.pot_id = pot_id
    dto.code = 'T'
    this.potService.increaseHappyCnt(pot_id);
    this.calenderService.save(dto)
    const pot:Pot = await this.potService.find(pot_id)
    const fileName = pot.pot_name + '과 ' + pot.user.nickname+ '의 대화'
    const talk_id = await this.talkService.saveTalk(pot.pot_id, fileName)
    client.emit('talk_id',{talk_id})
  }

  async refresh( pot_id: number ): Promise<void>{
    const clientId = await this.deviceService.findByPotId(pot_id)
    if (clientId) this.server.to(clientId).emit('refresh')
  }

  @SubscribeMessage('situation')
  async situation(@ConnectedSocket() client: Socket, @MessageBody('pot_id') pot_id: number, @MessageBody('inject_situation_id') inject_situation_id: number){
    const situationDto = await this.socketService.situation(pot_id, inject_situation_id);
    client.emit('situation', situationDto);
  }

  @SubscribeMessage('tts')
  async ttsThisMessage(@ConnectedSocket() client: Socket, @MessageBody('text') text: string){
    const returnData = await this.socketService.toTts(text)
  }
}