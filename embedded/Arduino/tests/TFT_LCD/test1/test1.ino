#include <Adafruit_GFX.h>    // Core graphics library
#include <MCUFRIEND_kbv.h>   // Hardware-specific library

MCUFRIEND_kbv tft;

void setup(void) {
    uint16_t ID = tft.readID();
    tft.begin(ID);
    tft.setRotation(1); // 화면 회전 설정

    tft.fillScreen(TFT_BLACK); // 배경을 검은색으로 채우기

    // 선 그리기
    tft.drawLine(0, 0, tft.width(), tft.height(), TFT_WHITE);

    // 사각형 그리기
    tft.drawRect(50, 50, 100, 100, TFT_RED);

    // 원 그리기
    tft.drawCircle(120, 160, 50, TFT_GREEN);

    // 텍스트 출력
    tft.setCursor(20, 20);
    tft.setTextColor(TFT_YELLOW);  
    tft.setTextSize(2);
    tft.println("Hello, TFT!");
}

void loop(void) {

}
