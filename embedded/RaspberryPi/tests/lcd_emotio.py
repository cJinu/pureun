
import serial
import time

def send_sig_to_arduino(ser, msg):
    msg = msg + '\n'
    msg = bytes(msg, 'utf-8')
    ser.write(msg)


if __name__ == '__main__': 

    # 시리얼 열기
    # 시리얼 통신 객체 생성
    ser1 = serial.Serial('COM3', 9600)  # 아두이노와의 통신 속도에 맞게 설정 > 윈도우
    time.sleep(2)
    # -----------
    # keyword() # 호출어 인식 테스트
    send_sig_to_arduino(ser1, '1')