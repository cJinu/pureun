# main.py

# 모듈
import socketio
import os
import requests
import base64
import time
import serial
import sys
import datetime
import sounddevice as sd
import soundfile as sf
from dotenv import load_dotenv
from serial_number import get_serial_number
from stt import record_wav, speech_to_text
from hot_word.porcu import hotword
from threading import Thread, Event

current_dir = os.path.dirname(os.path.realpath(__file__))

load_dotenv()

sio = socketio.Client()
pot_id = None # 식물 id
is_owner = False # 주인 연결 여부
is_connected = False # 백과 연결 여부
is_water = False # 백에 물 준 날 전송 여부 / day
status_flag = False # 백에 화분 상태 전송 여부 / hour
is_talking = False # 대화 중
talk_id = None # 대화 번호
serial_number = get_serial_number() # 시리얼 번호
# 아두이노 포트 설정
arduino_port = 'COM6'
arduino_port_1 = '/dev/ttyACM0' # LCD
arduino_port_2 = '/dev/ttyUSB0' # nano

# ------------------------------------- 소켓 이벤트 핸들러 -------------------------------------

# 라즈베리와 백엔드 연결
@sio.event
def connect():
    print('Connected with serial number:', serial_number)

    # 시리얼 넘버 보내기
    sio.emit('login', {
        'serial_number': serial_number,
    })


# 연결 끊기
@sio.event
def disconnect():
    print('Disconnect from server')


# login 확인 시 받을 data
@sio.on('login_result')
def login_result(data):
    global is_owner, pot_id
    is_owner = data['is_owner'] # 주인 연결 여부 받기
    pot_id = data['pot_id'] # 화분 고유 id 받기
    print(data)
    if is_owner:
        pot_state() # 시작 시 보낼 데이터
        time.sleep(5)
        is_owner_event.set()
        print('프로세스 실행')
    else:
        is_owner_event.clear()
        print('프로세스 종료')
    
    

# 대화 중 tts 실행
@sio.on('tts')
def talk_tts(data):
    TTS(data)
    # 이 다음에 stt 실행
    # 이렇게 하니까 끊겨서 save_tts_file함수 안에서 stt를 실행했음


# 주인 변했을때 == 주인이 생겼을때/없어졌을때
# data==True일 때 이름 파일 받아서 저장
@sio.on('owner_change')
def owner_change(data): 
    global is_owner
    # data={
    #     'is_owner': bool,
    #     'name_voice': wavfile,
    # }
    is_owner = data['is_owner']
    if is_owner:
        base64_name_voice = data['name_voice']
        name_voice_name = "name_voice.wav"
        save_sound(base64_name_voice, name_voice_name)
        is_owner_event.set()
        print('프로세스 실행')
    else:
        is_owner_event.clear()
        print('프로세스 종료')
    print("owner status changed : ", is_owner)


# 대화 id 받기
@sio.on('talk_id')
def get_talk_id(data):
    global is_talking, talk_id
    talk_id = data['talk_id'] 
    is_talking = True
    print('talk_id:', talk_id) 

    STT() # 호출어 인식 후 STT()


# 새로고침 시 보낼 데이터
@sio.on('refresh')
def refresh(): # 새로고침 신호
    # state로 지금 측정한 데이터를 보내주면 됨
    # 아두이노야 측정해줘
    # 측정값을 받아서 보낸다. > pot_state
    print("refreshing...")
    pot_state()


# 상태 별 액션
@sio.on('situation')
def situation(data):
    # data = {
    #     'situation_id':int, # 상황번호
    #     'basic_voice':wav_file, # 기본멘트 음성파일(랜덤으로 보내주세요), 알람일땐 tts 파일
    # } 
    situation_id = data['situation_id']
    base64_basic_voice = data['basic_voice']
    basic_voice_path = "basic_voice.wav"
    print('situation_id:', situation_id)
    # 대화 중이 아닐 경우
    if is_talking == False:
        # 효과음과 이름 음원 재생 + 멘트
        start_sound()
        save_sound(base64_basic_voice, basic_voice_path)
        play_sound(basic_voice_path)
        
        if situation_id == 5: # 알람일때
            send_sig_to_arduino(ser2, "alarm") # 팔 신호보내기
    
    # 대화 중일 경우 kill
    else:
        pass

    send_sig_to_arduino(ser1, situation_id) # lcd 바꾸기
    

# -------------------------------------------- 함수 ------------------------------------------------

# 음원 저장
def save_sound(encoded_data, file_name):
    file_data = base64.b64decode(encoded_data) # base64 디코딩

    file_path = os.path.join(current_dir, file_name)

    # 파일로 저장 (ex: received_file.wav)
    with open(file_path, 'wb') as file:
        file.write(file_data)

    print(f"File saved to {file_name}.")
    time.sleep(1)


# 음성 재생
def play_sound(file_name):
    file_path = os.path.join(current_dir, file_name)
    try:
        data, fs = sf.read(file_path)  # 파일 읽기
        sd.play(data, fs)  # 소리 재생
        sd.wait()  # 재생이 끝날 때까지 대기
    except Exception as e:
        print(f"재생 중 오류 발생: {e}")


# 효과음 + 이름 재생
def start_sound():
    effect_path = os.path.join(current_dir, "effect_sound.wav")
    name_voice_path = os.path.join(current_dir, "name_voice.wav")

    send_sig_to_arduino(ser2, "talk start")
    play_sound(effect_path)  # 효과음 재생
    play_sound(name_voice_path)  # 이름 음성 파일 재생


# 호출어 인식 - process로 만듦
def keyword():
    global is_talking
    while True:
        is_owner_event.wait()
        if not is_talking:  # 대화 중이 아닐 때만 hotword 검사 실행
            print('keyword start')
            print('talk_id:', talk_id)
            if hotword():
                send_sig_to_arduino(ser2, 'hotword')
                sio.emit('hot_word', {'pot_id' : pot_id})  # 서버에게 hot_word 요청
                print("키워드인식")
            else:
                # 호출어 인식 실패 시
                pass
        time.sleep(1)  # CPU 사용률 관리를 위해 짧은 대기 시간 추가


# stt 텍스트, 음성파일 전송
def STT(): 
    global talk_id, is_talking, encoded_wav, transcript

    play_sound("effect_sound.wav")

    stt_voice_name = "recorded_audio.wav"
    record_wav(stt_voice_name)
    transcript = speech_to_text(stt_voice_name)

    if transcript:
        print(transcript)
        stt_voice_path = os.path.join(current_dir, stt_voice_name)
        print(stt_voice_path)
        # WAV 파일을 Base64 인코딩하여 전송
        try:
            with open(stt_voice_path, "rb") as wav_file:
                encoded_wav = base64.b64encode(wav_file.read()).decode('utf-8')
                print('인코딩 성공')
                
                # 인코딩된 데이터의 일부를 출력하여 확인
                # print('인코딩된 데이터 일부:', encoded_wav[:100])
        except Exception as e:
            print('인코딩 실패:', e)
            return  # 인코딩 실패 시 함수 종료

        sio.emit('stt', {
            'talk_id': talk_id,  # 대화 번호
            'text': transcript,  # STT text
            'file': encoded_wav,  # wav file
        })

    else:
        # transcript 값이 없으면 대화 종료 로직을 수행
        is_talking = False
        send_sig_to_arduino(ser1, 0)
        return


# 음성 파일 저장 + 출력 함수
def TTS(data): 
    # lcd에 신호 보내기
    send_sig_to_arduino(ser1, 'start')

    play_sound("effect_sound.wav")

    base64_tts_voice = data['base64Data']
    tts_voice_name='tts_voice.wav'
    save_sound(base64_tts_voice, tts_voice_name)
    time.sleep(0.5)
    play_sound(tts_voice_name)

    STT()
    

# 아두이노 측정값 + 물줬을때, 아두이노에서 측정값 받고 보내기
def pot_state(): 
    print('start pot_state')

    # 아두이노로 신호 보내기
    send_sig_to_arduino(ser2, 'get value')
    # 시간 두고 아두이노가 신호 처리 하도록
    time.sleep(3) # 한번 측정할 정도의 시간임

    while ser2.in_waiting > 0:
        sensor_value = ser2.readline().decode('utf-8').strip()
        is_temp = False
        # T이면 온도
        if (sensor_value[:1] == 'T'):
            sensor_value = float(sensor_value[1:])
            is_temp = True
        # M이면 습도
        elif (sensor_value[:1] == 'M'):
            sensor_value = float(sensor_value[1:])
        # D이면 거리 -> 전송 안함
        else:
            continue
        print(sensor_value)

        # Socket.IO로 데이터 전송
        sio.emit('pot_state', {'pot_id' : pot_id, 'data': sensor_value, 'isTemp_FG': is_temp})


# 아두이노로 메시지 보내기
def send_sig_to_arduino(ser, msg):
    msg = str(msg) + '\n'
    msg = bytes(msg, 'utf-8')
    ser.write(msg)

    # 테스트용으로 완료신호 받는 함수
    # time.sleep(1)

    # while ser2.in_waiting > 0:
    #     answer = ser2.readline().decode('utf-8').strip()
    #     print(answer)



# Threading - Process로 만듦
def arduino_work():
    global is_water, status_flag
    print('arduino start')
    while True:
        is_owner_event.wait()
        # water 들어오면 emit하기
        while ser2.in_waiting > 0:
            sensor_value = ser2.readline().decode('utf-8').strip()
            # 물 줬고, 오늘 한번도 물 안줬다면 물 신호 보내기
            if (sensor_value == 'Water' and is_water == False):
                print('sending water signal')
                is_water = True
                sio.emit('water', {'pot_id' : pot_id})

        # 정각마다 pot_state 한 번 실행
        now = datetime.datetime.now()
        if now.minute == 0:
            if status_flag == False: # 1분 내내 보내는 걸 방지
                pot_state()
                sio.emit('situation', {'pot_id' : pot_id})
                status_flag = True
            if now.hour == 0:
                is_water = False


# 메인 실행문
if __name__ == '__main__': 
    global ser1, ser2, is_owner_event

    # 시리얼 열기
    # 시리얼 통신 객체 생성
    # ser2 = serial.Serial(arduino_port, 9600)  # 아두이노와의 통신 속도에 맞게 설정 > 윈도우
    # ser1 = serial.Serial("COM5", 115200)  # 아두이노와의 통신 속도에 맞게 설정 > 윈도우
    ser1 = serial.Serial(arduino_port_1, 115200)  # TFT_LCD & arduino uno
    ser2 = serial.Serial(arduino_port_2, 9600)  # arduino nano    

    time.sleep(2)

    server_url = os.getenv('SERVER_URL')
    sio.connect(server_url)
    
    play_sound("effect_sound.wav")

    # sio.emit('situation', {'pot_id' : pot_id})

    # threading event
    is_owner_event = Event()
    
    
    # if is_owner:
    #     pot_state()
    #     time.sleep(2)
    #     is_owner_event.set()
    #     print('프로세스 실행')
    # else:
    #     is_owner_event.clear()
    #     print('프로세스 종료')

    # thread 지정
    rasp = Thread(target=keyword, args=(), daemon=True)
    ard = Thread(target=arduino_work, args=(), daemon=True)


    # process 시작
    rasp.start()
    ard.start()

    # main 함수 끝나지 않도록 설정
    while True:
        time.sleep(1)
        
    # -----       
        
    # 시리얼 포트 닫기
    # ser.close()
    # print('serial close')
