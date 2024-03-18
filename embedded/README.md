# 임베디드

------

## 멤버

- 한성주

- 김연빈


----


## 라즈베리파이

### 시작 시 해야 할 일(자동화)

1. 가상환경 실행

```bash
source venv/bin/activate
```

2. python 실행
- 무조건 src에서 실행해야함, 안그러면 effect_sound 재생오류가 뜸. system error

### 주의 사항

1. PyAudio 설치

- 운영체제 별로 오류가 생길 수 있음
- 인터넷 검색 바람

2. STT 함부로 실행되지 않도록 주의

- 반드시 확인!!!!!!

------

### 소켓 통신
main.py 실행하면 얘도 실행되게
1. 소켓 연결됐는지 연결메시지 보내기 (화분등록 되어있니?)
2. 저쪽에서 메시지를 받으면 확인메시지 보내(ㅇㅇ 되어있음) > 그 확인메시지를 받으면 연결됐다고 print만 찍어.

- 받기
    - tts 음성파일 (기본인사, 대화, 알람)
    - 새로고침 신호
    - 연결메시지 > connect에 넣기
    - 표정 상태값
    - 주인 연결 여부 > connect에 넣기
    - 화분 고유 id > connect에 넣기

- 보내기
    - 연결메시지 > connect에 넣기
    - stt 텍스트, stt 음성 파일
    - 각종 측정값 (온도, 토양습도) + 물 줬을때 - 1시간 단위
    - 시리얼 넘버 > connect에 넣기

----

### 마이크

-------

### 스피커

--------

### 3.5인치 TFT LCD 스크린 

---------

### 호출어 (Hot-word)
#### efficientword
```bash
# demo 실행해보기
# efficientword-net 파이썬 라이브러리 설치
pip install EfficientWord-Net

# 위 라이브러리 설치 오류 시 해결을 위한 설치들
pip install pyproject

pip install pipwin
pipwin install pyaudio

# 실행
python -m eff_word_net.engine
```
#### picoporcupine
```
```

### 블루투스

1. 라즈베리와 아두이노 블루투스 연결

```bash
// 라즈베리파이 업데이트
Sudo apt-get update
Sudo apt-get upgrade

// 필요한 라이브러리 설치
Sudo apt-get install bluetooth blueman bluez
Sudo apt-get install python-bluetooth

// 재부팅
Sudo reboot
```

2. 블루투스 페어링

- 블루투스 검색
```bash
sudo bluetoothctl

power on
scan on
```

- 블루투스 연결
```bash
pair MAC주소
```

- 핀 코드 입력
```bash
Enter PIN code:
```

- 신뢰
```bash
trust MAC주소
```

#### 블루투스가 안 될 시

```bash
sudo apt install python3-bluez
```

---------

## 아두이노

--------

### 블루투스

- HC-06 모듈

- 시리얼 모니터를 켜고 AT를 입력했을 때 OK 라고 뜨면 연결 성공

------

### 온습도 센서

-----

### 토양 수분 센서

------

### 서보 모터

-------

### 초음파 센서

