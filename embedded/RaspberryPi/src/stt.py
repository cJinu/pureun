import sounddevice as sd
import numpy as np
import wave
import os
import json
from dotenv import load_dotenv
import google.cloud.speech as google_speech 

load_dotenv()
google_application_credentials=os.getenv("GOOGLE_APPLICATION_CREDENTIALS")

os.environ["GOOGLE_APPLICATION_CREDENTIALS"]=google_application_credentials

def record_wav(file_path, duration=5, sample_rate=44100):
    print("Recording...")
    recording = sd.rec(int(duration * sample_rate), samplerate=sample_rate, channels=1, dtype='int16')
    sd.wait()
    print("Recording complete.")

    print("Saving to WAV file...")
    wav_data = recording.flatten()
    write_wav(file_path, wav_data, sample_rate)
    print(f"File saved at: {file_path}")

# ----------------------------------------------------------------
# def record_wav(file_path, sample_rate=44100, threshold=0.5, timeout=5):
#     print("Voice detection started. Speak now...")

#     # 오디오 데이터를 담을 리스트
#     recorded_frames = []
#     start_recording = False
#     last_voice_time = None

#     def callback(indata, frames, time, status):
#         nonlocal start_recording, last_voice_time
#         if status:
#             print(status)
        
#         # 목소리 감지
#         if np.any(indata > threshold):
#             if not start_recording:
#                 print("Recording...")
#             start_recording = True
#             last_voice_time = time.inputBufferAdcTime

#         # 녹음 중 목소리가 없는 경우
#         if start_recording and (time.inputBufferAdcTime - last_voice_time) > timeout:
#             print("Silence detected, stop recording.")
#             raise sd.CallbackAbort  # 콜백 중단

#         if start_recording:
#             recorded_frames.append(indata.copy())

#     # InputStream으로 오디오 스트리밍 처리
#     with sd.InputStream(callback=callback, channels=1, samplerate=sample_rate, dtype='int16'):
#         try:
#             while True:
#                 sd.sleep(100)
#         except sd.CallbackAbort:
#             pass  # 콜백 중단 시 루프 종료

#     data = np.concatenate(recorded_frames, axis=0)
#     write_wav(file_path, data.flatten(), sample_rate)
#     print(f"File saved at: {file_path}")
#    ----------------------------------------------------------------

def write_wav(file_path, data, sample_rate):
    with wave.open(file_path, 'w') as wf:
        wf.setnchannels(1)
        wf.setsampwidth(2)
        wf.setframerate(sample_rate)
        wf.writeframes(data.tobytes())

def speech_to_text(file_path, language_code='ko-KR'):
    client = google_speech.SpeechClient()
    print("stt start")  

    with open(file_path, 'rb') as audio_file:
        content = audio_file.read()

    audio = google_speech.RecognitionAudio(content=content) 
    config = google_speech.RecognitionConfig(  
        encoding=google_speech.RecognitionConfig.AudioEncoding.LINEAR16,
        sample_rate_hertz=44100,
        language_code=language_code
    )

    print("continue....")
    response = client.recognize(config=config, audio=audio)

    # print("response: ",response)

    transcript = ""
    for result in response.results:
        print("Transcript: {}".format(result.alternatives[0].transcript))
        transcript += result.alternatives[0].transcript + " "

    return transcript.strip()

if __name__ == "__main__":
    wav_file_path = "recorded_audio.wav"
    record_wav(wav_file_path)
    speech_to_text(wav_file_path)
