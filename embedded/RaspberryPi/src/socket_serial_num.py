from cryptography.fernet import Fernet
from dotenv import load_dotenv
import os
import socketio
from serial_number import get_serial_number

load_dotenv()

# 암호화 키 생성
key = Fernet.generate_key()
cipher_suite = Fernet(key)

def encrypt_data(data):
    return cipher_suite.encrypt(data.encode())

def decrypt_data(encrypted_data):
    return cipher_suite.decrypt(encrypted_data).decode()

server_url = os.getenv('SERVER_URL')
sio = socketio.Client()

@sio.event
def connect():
    serial_number = get_serial_number()  # 시리얼 번호 가져오기
    encrypted_data = encrypt_data(serial_number)  # 데이터 암호화
    sio.emit('device_code', encrypted_data)  # 암호화된 데이터 전송

if __name__ == '__main__':
    sio.connect(server_url)
