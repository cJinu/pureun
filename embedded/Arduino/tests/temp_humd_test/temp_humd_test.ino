#include <DHT.h>

#define DHTPIN 2     // DHT11의 데이터 핀 번호 (D2)
#define DHTTYPE DHT11   // DHT 11 사용

DHT dht(DHTPIN, DHTTYPE);

void setup() {
  Serial.begin(9600);
  dht.begin();
}

void loop() {
  // 센서로부터 온도와 습도 읽기
  float h = dht.readHumidity();
  float t = dht.readTemperature();

  // 센서 오류 체크
  if (isnan(h) || isnan(t)) {
    Serial.println("DHT11에서 데이터를 읽을 수 없습니다!");
    return;
  }

  // 온도와 습도 출력
  Serial.print("습도: ");
  Serial.print(h);
  Serial.print(" %\t");
  Serial.print("온도: ");
  Serial.print(t);
  Serial.println(" *C");
  delay(2000); // 2초 간격으로 데이터 읽기
}
