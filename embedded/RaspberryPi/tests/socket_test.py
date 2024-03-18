import socketio
import base64
import time
from dotenv import load_dotenv
import os

load_dotenv()

sio = socketio.Client()

@sio.event
def connect():
    print('Connect')
    sio.emit('msg', 'Im raspberry')
    request_file("ETA.mp3")

@sio.event
def msg(data):
    print("Receive message : ", data)

@sio.event
def disconnect():
    print('Disconnect')

def request_file(filename):
    sio.emit('requestFile', {'filename': filename})

# 서버로부터 파일 데이터를 받는 이벤트 핸들러
@sio.on('fileData')
def on_file_data(data):
    filename = data['filename']
    file_data = base64.b64decode(data['data'])

    # 파일 데이터를 사용하거나 저장하는 로직을 추가
    with open(f'downloads/{filename}', 'wb') as file:
        file.write(file_data)

    print(f'Received file data: {filename}')

# 서버로부터 파일 에러를 받는 이벤트 핸들러
@sio.on('fileError')
def on_file_error(error):
    print(f'File error: {error["message"]}')

# 서버로부터 파일 전송이 완료된 이벤트 핸들러
@sio.on('fileTransferComplete')
def on_file_transfer_complete():
    print('File transfer complete!')


server_url = os.getenv('SERVER_URL')

sio.connect(server_url)

time.sleep(1000)