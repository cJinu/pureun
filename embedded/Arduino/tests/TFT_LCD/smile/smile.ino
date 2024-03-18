// #include <Adafruit_GFX.h>    // Core graphics library
// #include <MCUFRIEND_kbv.h>   // Hardware-specific library

// MCUFRIEND_kbv tft;

// void setup(void) {
//     uint16_t ID = tft.readID();
//     tft.begin(ID);
//     tft.setRotation(1); // 화면 회전 설정

//     tft.fillScreen(TFT_BLACK); // 배경을 검은색으로 채우기
// }

// void loop(void) {
//     int centerX = tft.width() / 2;
//     int centerY = tft.height() / 2;

//     // 눈 그리기
//     tft.fillCircle(centerX - 30, centerY - 30, 10, TFT_WHITE); // 왼쪽 눈
//     tft.fillCircle(centerX + 30, centerY - 30, 10, TFT_WHITE); // 오른쪽 눈

//     // 입 움직임 애니메이션
//     for (int i = 0; i <= 20; i += 5) { // 입을 점점 더 크게 열기
//         tft.fillRect(centerX - 25, centerY + 20, 50, i, TFT_RED); // 입 그리기
//         delay(200);
//         if (i < 20) { // 마지막 단계가 아니면 이전 단계 지우기
//             tft.fillRect(centerX - 25, centerY + 20, 50, i, TFT_BLACK);
//         }
//     }

//     delay(500); // 입을 열고 잠시 기다림

//     for (int i = 20; i >= 0; i -= 5) { // 입을 점점 닫기
//         tft.fillRect(centerX - 25, centerY + 20, 50, i, TFT_RED); // 입 그리기
//         delay(200);
//         tft.fillRect(centerX - 25, centerY + 20, 50, i, TFT_BLACK); // 이전 단계 지우기
//     }

//     delay(1000); // 다음 애니메이션 전 잠시 기다림
// }

#include <Adafruit_GFX.h>    // Core graphics library
#include <MCUFRIEND_kbv.h>   // Hardware-specific library

MCUFRIEND_kbv tft;

void setup(void) {
    uint16_t ID = tft.readID();
    tft.begin(ID);
    tft.setRotation(1); // 화면 회전 설정

    tft.fillScreen(TFT_BLACK);
    // uint16_t lightBrown = tft.color565(210, 180, 140);
    // tft.fillScreen(lightBrown); 
}

void loop(void) {
    int centerX = tft.width() / 2;
    int centerY = tft.height() / 2;

    // 눈 그리기 (크기 증가)
    int eyeSize = 30; // 눈의 크기를 20으로 설정
    tft.fillCircle(centerX - 60, centerY - 60, eyeSize, TFT_WHITE); // 왼쪽 눈
    tft.fillCircle(centerX + 60, centerY - 60, eyeSize, TFT_BLACK); // 오른쪽 눈

    // 입 움직임 애니메이션 (크기 증가)
    for (int i = 0; i <= 60; i += 15) { // 입을 점점 더 크게 열기
        tft.fillRect(centerX - 75, centerY + 60, 150, i, TFT_RED); // 입 그리기
        delay(200);
        if (i < 40) { // 마지막 단계가 아니면 이전 단계 지우기
            tft.fillRect(centerX - 75, centerY + 60, 150, i, TFT_WHITE);
        }
    }

    delay(500); // 입을 열고 잠시 기다림

    for (int i = 60; i >= 0; i -= 15) { // 입을 점점 닫기
        tft.fillRect(centerX - 75, centerY + 60, 150, i, TFT_RED); // 입 그리기
        delay(200);
        tft.fillRect(centerX - 75, centerY + 60, 150, i, TFT_WHITE); // 이전 단계 지우기
    }

    delay(1000); // 다음 애니메이션 전 잠시 기다림
}
