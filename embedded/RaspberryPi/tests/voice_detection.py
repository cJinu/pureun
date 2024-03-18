import sounddevice as sd
import numpy as np
import wave
import os
import time as pytime

def write_wav(file_path, data, sample_rate):
    with wave.open(file_path, 'w') as wf:
        wf.setnchannels(1)
        wf.setsampwidth(2)
        wf.setframerate(sample_rate)
        wf.writeframes(data.tobytes())

def record_wav(file_path, sample_rate=48000, silence_threshold=0.01, max_silence_duration=5, max_duration=5):
    print("Recording...")

    recorded_frames = []
    last_sound_time = pytime.time()
    start_time = pytime.time()

    def audio_callback(indata, frame_count, time_info, status):
        if status:
            print(status, flush=True)

        nonlocal last_sound_time, recorded_frames
        if np.any(indata > silence_threshold):
            last_sound_time = pytime.time()
            recorded_frames.append(indata.copy())

    with sd.InputStream(callback=audio_callback, channels=1, samplerate=sample_rate):
        while True:
            current_time = pytime.time()

            # 음성 감지가 되지 않으면 녹음 중단
            if current_time - last_sound_time > max_silence_duration:
                print("3초 동안 음성 감지되지 않음. 녹음 중지")
                break

            # 최대 녹음 시간 초과 시 중단
            if current_time - start_time > max_duration:
                print("최대 녹음 시간 초과")
                break

    if recorded_frames:
        wav_data = np.concatenate(recorded_frames, axis=0).flatten()
        write_wav(file_path, wav_data, sample_rate)
        return "ok"
    else:
        return ""

if __name__ == "__main__":
    wav_file_path = "record_audio.wav"
    transcript = record_wav(wav_file_path)
    print("Transcript:", transcript)
