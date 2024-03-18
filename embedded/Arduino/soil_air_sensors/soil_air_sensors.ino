#include <TaskScheduler.h>
#include <DHT.h>

// DHT 센서 설정
#define DHTPIN A0
#define DHTTYPE DHT11
DHT dht(DHTPIN, DHTTYPE);

// 토양 수분 센서 설정
const int MOISTURE_SENSOR_PIN = A5;
const int MOISTURE_THRESHOLD = 50; // 급격한 변화를 감지할 임계값
int lastMoistureLevel = 0; // 마지막으로 측정된 수분 수준
bool rapidChangeDetected = false; // 급변 감지 플래그

Scheduler runner;

/*
task - 1초마다 
온습도 센서로 온도 읽기: T25
토양수분 센서로 습도 읽기: M20

측정하다가 급격한 변화 > 라즈베리한테 알려줘: Water
요청하면 > 라즈베리한테 알려줘 > 이거 안됨...ㅜ
*/


// 온습도 센서 데이터 읽기
void readTempSensor() {
  float temperature = dht.readTemperature();
  float humidity = dht.readHumidity();

  // 에러 메시지 출력
  if (isnan(humidity) || isnan(temperature)) {
    Serial.println("Failed to read from DHT sensor!");
    return;
  }

  Serial.print("T");
  Serial.println(temperature);
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
  float moisturePercent = map(moistureLevel, 200, 1023, 100, 0);
  moisturePercent = constrain(moisturePercent, 0, 100);

  // 출력
  Serial.print("M");
  Serial.println(moisturePercent);
}

// 1초마다 센서 읽기
Task taskReadHumidity(1000, TASK_FOREVER, &readTempSensor);
Task taskReadMoisture(1000, TASK_FOREVER, &readMoistureSensor); 

void setup() {
  Serial.begin(9600);
  dht.begin();

  runner.init();
  runner.addTask(taskReadHumidity);
  runner.addTask(taskReadMoisture);
  taskReadHumidity.enable();
  taskReadMoisture.enable();

  // 초기 값 설정
  lastMoistureLevel = analogRead(MOISTURE_SENSOR_PIN);
}

void loop() {
  runner.execute();
}
