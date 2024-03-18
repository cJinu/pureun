#include <Servo.h>

// C++ code
//


#include <Servo.h>

// 핀 설정
const int servoPin1 = 2;       // 서보 모터 1 핀
const int servoPin2 = 3;      // 서보 모터 2 핀
const int trigPin = 10;        // 초음파 센서 트리거 핀
const int echoPin = 9;        // 초음파 센서 에코 핀
const int soilMoisturePin = A3;// 토양 습도 센서 핀
const int tempSensorPin = A0;  // TMP36 온도 센서 핀

Servo servo1;
Servo servo2;

void setup() {
  Serial.begin(9600);

  // 서보 모터 설정
  servo1.attach(servoPin1);
  servo2.attach(servoPin2);

  // 초음파 센서 설정
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
}

void loop() {
  // 서보 모터 테스트
  servo1.write(90);
  servo2.write(90);
  delay(1000);
  servo1.write(0);
  servo2.write(0);
  delay(1000);

  // 초음파 센서 테스트
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  long duration = pulseIn(echoPin, HIGH);
  long distance = duration * 0.034 / 2;
  Serial.print("Distance: ");
  Serial.println(distance);

  // 토양 습도 센서 테스트
  int soilMoistureValue = analogRead(soilMoisturePin);
  Serial.print("Soil Moisture: ");
  Serial.println(soilMoistureValue);

  // 온도 센서 테스트
  int tempValue = analogRead(tempSensorPin);
  float voltage = tempValue * 5.0 / 1024.0;
  float temperature = (voltage - 0.5) * 100;
  Serial.print("Temperature: ");
  Serial.println(temperature);

  delay(1000);
}
