#include <TaskScheduler.h>
#include <DHT.h>
#include <Servo.h>

// DHT 센서 설정
#define DHTPIN A0
#define DHTTYPE DHT11
DHT dht(DHTPIN, DHTTYPE);
float temperature;

// 토양 수분 센서 설정
const int MOISTURE_SENSOR_PIN = A5;
const int MOISTURE_THRESHOLD = 50; // 급격한 변화를 감지할 임계값
int lastMoistureLevel = 0; // 마지막으로 측정된 수분 수준
bool rapidChangeDetected = false; // 급변 감지 플래그
bool childClose = false; // '아이가 가까이 있는지' 여부를 추적
float moisturePercent;


// 초음파 센서 설정
long distance = 0;

Scheduler runner;

// 초음파 센서 핀 설정
const int trigPin = 10;        // 초음파 센서 트리거 핀
const int echoPin = 9;        // 초음파 센서 에코 핀

// 서보 모터 핀 설정
const int servoPin1 = 2;       // 서보 모터 1 핀
const int servoPin2 = 3;      // 서보 모터 2 핀

Servo servo1;
Servo servo2;

/*
task - 1초마다 
온습도 센서로 온도 읽기: T25
토양수분 센서로 습도 읽기: M20

측정하다가 급격한 변화 > 라즈베리한테 알려줘: Water
요청하면 > 라즈베리한테 알려줘 > 이제 되지만 일단 다른 로직으로 구성함
*/


// 온습도 센서 데이터 읽기
void readTempSensor() {
  temperature = dht.readTemperature();
  float humidity = dht.readHumidity();
}

// 토양 수분 센서 데이터 읽기 및 급변 감지
void readMoistureSensor() {
  int moistureLevel = analogRead(MOISTURE_SENSOR_PIN);

  if (abs(moistureLevel - lastMoistureLevel) > MOISTURE_THRESHOLD) {
    rapidChangeDetected = true;
    Serial.println("Water");
  } else {
    rapidChangeDetected = false; // 추가: 변화가 없을 경우 플래그 초기화
  }

  lastMoistureLevel = moistureLevel;

  // 값 변환
  moisturePercent = map(moistureLevel, 200, 1023, 100, 0);
  moisturePercent = constrain(moisturePercent, 0, 100);
}


// 초음파센서 데이터 읽기
void readDistance () {
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  long duration = pulseIn(echoPin, HIGH);
  distance = duration * 0.034 / 2;
  // Serial.print("Distance: ");
  // Serial.println(distance);
}

// 양쪽 팔 동시에 흔들기
void arm_both() {
  servo1.write(90);
  servo2.write(90);
  delay(1000);
  servo1.write(0);
  servo2.write(0);
  delay(1000);
}


// 양쪽 팔 번갈아 흔들기
void arm_switch() {
  servo1.write(90);
  servo2.write(0);
  delay(1000);
  servo1.write(0);
  servo2.write(90);
  delay(1000);
}


// 한쪽 팔 흔들기
void arm_single(Servo servo) {
  servo.write(90);
  delay(1000);
  servo.write(0);
  delay(1000);
}


// 1초마다 센서 읽기
Task taskReadHumidity(1000, TASK_FOREVER, &readTempSensor);
Task taskReadMoisture(1000, TASK_FOREVER, &readMoistureSensor); 
Task taskReadDistance(1000, TASK_FOREVER, &readDistance); 

void setup() {
  Serial.begin(9600);
  dht.begin();

  runner.init();
  runner.addTask(taskReadHumidity);
  runner.addTask(taskReadMoisture);
  runner.addTask(taskReadDistance);
  taskReadHumidity.enable();
  taskReadMoisture.enable();
  taskReadDistance.enable();

  // 초기 값 설정
  lastMoistureLevel = analogRead(MOISTURE_SENSOR_PIN);

  // 서보 모터 설정
  servo1.attach(servoPin1);
  servo2.attach(servoPin2);
  servo1.write(0);
  servo2.write(0);

  // 초음파 센서 설정
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
}

void loop() {
  runner.execute();
  
  // 거리 가까우면 오른팔 흔들기
  // if ( distance == 100) {
  //   arm_single(servo1);
  // }

  // 거리가 100cm 이하이고, 이전에 아이가 가까이 있지 않았다면 인사 동작 수행
  if (distance <= 100 && !childClose) {
    childClose = true; // 아이가 가까이 있었다는 상태로 변경
    arm_single(servo1);
  }
  // 거리가 100cm를 초과하면 아이가 멀어졌다고 가정하고 상태 초기화
  else if (distance > 100) {
    childClose = false;
  }

  // 왼쪽- 말 시작할때, 양쪽같이- 호출어, 양쪽 번갈아-알람
  if (Serial.available() > 0) { // 라즈베리에서 신호를 주면
    String input = Serial.readStringUntil('\n'); // 라즈베리파이로부터 전송된 데이터를 한 줄씩 읽음
    if (input.equals("alarm")) { // 알람
      Serial.println("alarm");
      arm_switch();
    }
    else if (input.equals("hotword")) { // 호출어 인식
      Serial.println("hotword");
      arm_both();
    }
    else if (input.equals("talk start")) { // 말 시작할때
      Serial.println("talk start");
      arm_single(servo2);
    }
    else if (input.equals("get value")) {
      // Serial.println("get value");
      // 습도
      Serial.print("M");
      Serial.println(moisturePercent);
      Serial.print("T");
      Serial.println(temperature);
    }
  }
}
