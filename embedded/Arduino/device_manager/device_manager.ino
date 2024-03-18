#include <EEPROM.h> // EEPROM 라이브러리 포함

// 고유값 저장 위치
const int UNIQUE_ID_ADDRESS = 0; // EEPROM에서 고유값을 저장할 시작 주소

void init_device_manager() {
  // EEPROM에서 첫 번째 바이트를 읽어서 고유값이 이미 저장되어 있는지 확인
  if (EEPROM.read(UNIQUE_ID_ADDRESS) == 0xFF) { // 만약 고유값이 저장되어 있지 않다면
    String unique_id = generate_unique_id(); // 새로운 고유값을 생성
    for (int i = 0; i < unique_id.length(); i++) { // 생성된 고유값을 EEPROM에 저장
      EEPROM.write(UNIQUE_ID_ADDRESS + i, unique_id[i]);
    }
    // 고유값 길이 저장 (옵션)
    EEPROM.write(UNIQUE_ID_ADDRESS + unique_id.length(), '\0'); // 문자열 종료자 저장
  }
}

String generate_unique_id() {
  unsigned long now = millis(); // 현재 시간을 밀리초 단위로 가져옴
  String unique_id = String(now) + String(random(0, 1000)); // 현재 시간과 랜덤 값을 결합하여 고유값 생성
  return unique_id; // 생성된 고유값을 반환
}

String get_unique_id() {
  String unique_id = ""; // 고유값을 저장할 빈 문자열 선언
  char ch;
  for (int i = 0; i < 8; i++) { // 최대 8바이트를 읽어 고유값을 조합
    ch = char(EEPROM.read(UNIQUE_ID_ADDRESS + i));
    if (ch == '\0') break; // 문자열 종료자를 만나면 반복 중단
    unique_id += ch; // 각 바이트를 문자로 변환하여 문자열에 추가
  }
  return unique_id; // 조합된 고유값을 반환
}

void setup() {
  Serial.begin(9600); // 시리얼 통신 시작
  init_device_manager(); // 고유값 관리자 초기화

  String unique_id = get_unique_id();
  Serial.print("Unique ID: ");
  Serial.println(unique_id);
}

void loop() {

}