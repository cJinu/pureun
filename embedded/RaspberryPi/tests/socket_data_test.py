import socketio
import base64
import time


sio = socketio.Client(logger=True)

@sio.on('tts')
def receive_file_data(data):
  print("receive")
  base64_data = data['base64Data']

  # base64 디코딩
  file_data = base64.b64decode(base64_data)

  # 파일로 저장 (ex: received_file.wav)
  with open('received_file.wav', 'wb') as file:
    file.write(file_data)

    print("File received and saved.")

sio.connect('http://192.168.30.209:8080')
sio.emit('stt',{
  "txt":"stt 메시지 type= string",
  "file":"base64로 인코딩된 파일(wav)정보"
})
time.sleep(10)
sio.disconnect()