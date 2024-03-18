# bluetooth module
import serial

# 블루투스 시리얼 포트 설정
bluetoothSerial = serial.Serial("/dev/rfcomm0", baudrate=9600)

def read_bluetooth_data():
    while True:
        if bluetoothSerial.inWaiting() > 0:
            data = bluetoothSerial.readline().decode().rstrip()
            return data

if __name__ == '__main__':
    received_data = read_bluetooth_data()
    print('Received:', received_data)
