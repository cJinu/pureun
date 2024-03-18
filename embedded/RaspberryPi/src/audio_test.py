# import pygame


# def audio():
#     pygame.mixer.init()
#     # file_path = "received_file.wav"
#     file_path = "recorded_audio.wav"

#     try:
#         pygame.mixer.music.load(file_path)
#         pygame.mixer.music.play()
            
#         # 파일 재생이 완료될 때까지 대기
#         while pygame.mixer.music.get_busy():
#             pygame.time.Clock().tick(10)

#     except pygame.error as e:
#         print("오류 발생:", e)
#     finally:
#         print("File play done")
#         pygame.mixer.quit()

# audio()

import sounddevice as sd
import soundfile as sf

def play_sound(file_path):
    # 음원 파일 로드
    data, fs = sf.read(file_path)
    # 음원 재생
    sd.play(data, fs)
    # 재생이 완료될 때까지 대기
    sd.wait()

if __name__ == "__main__":
    file_path = 'received_file.wav'  # 재생할 음원 파일 경로
    play_sound(file_path)
