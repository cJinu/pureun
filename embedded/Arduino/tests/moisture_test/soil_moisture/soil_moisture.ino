const int MOISTURE_SENSOR_PIN = A5; // 토양 수분 센서 핀 설정 (A0 핀 사용)

void setup() {
  Serial.begin(9600); // 시리얼 통신 시작 (통신 속도 9600 bps)
}

void loop() {
  int sensorValue = analogRead(MOISTURE_SENSOR_PIN); // 센서 값 읽기
  Serial.print("Soil Moisture Level: ");
  Serial.println(sensorValue); // 센서 값 출력

  delay(1000); // 1초 대기
}
