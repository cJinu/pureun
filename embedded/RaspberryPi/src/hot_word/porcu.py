# 이건 데모버전 코드를 가져와서 수정한 코드
# Copyright 2018-2023 Picovoice Inc.
#
# You may not use this file except in compliance with the license. A copy of the license is located in the "LICENSE"
# file accompanying this source.
#
# Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on
# an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
# specific language governing permissions and limitations under the License.
#

'''
AC_KEY = access_key

porcupine = pvporcupine.create(
  access_key=AC_KEY,
  keyword_paths=['Desktop/plantz/hot-word/방울아_ko_raspberry-pi_v3_0_0.ppn'],
  model_path='Desktop/plantz/hot-word/porcupine_params_ko.pv'
)
'''

import argparse
import os
import struct
import wave
from datetime import datetime

import pvporcupine
from pvrecorder import PvRecorder

from dotenv import load_dotenv

current_dir = os.path.dirname(os.path.realpath(__file__))

load_dotenv()


def hotword():
    access_key=os.getenv("ACCESS_KEY")
    parser = argparse.ArgumentParser()

    parser.add_argument(
        '--access_key',
        help='AccessKey obtained from Picovoice Console (https://console.picovoice.ai/)')

    parser.add_argument(
        '--keywords',
        nargs='+',
        help='List of default keywords for detection. Available keywords: %s' % ', '.join(
            '%s' % w for w in sorted(pvporcupine.KEYWORDS)),
        choices=sorted(pvporcupine.KEYWORDS),
        metavar='')

    parser.add_argument(
        '--keyword_paths',
        nargs='+',
        help="Absolute paths to keyword model files. If not set it will be populated from `--keywords` argument")

    parser.add_argument(
        '--library_path',
        help='Absolute path to dynamic library. Default: using the library provided by `pvporcupine`')

    parser.add_argument(
        '--model_path',
        help='Absolute path to the file containing model parameters. '
             'Default: using the library provided by `pvporcupine`')

    parser.add_argument(
        '--sensitivities',
        nargs='+',
        help="Sensitivities for detecting keywords. Each value should be a number within [0, 1]. A higher "
             "sensitivity results in fewer misses at the cost of increasing the false alarm rate. If not set 0.5 "
             "will be used.",
        type=float,
        default=None)

    parser.add_argument('--audio_device_index', help='Index of input audio device.', type=int, default=-1)

    parser.add_argument('--output_path', help='Absolute path to recorded audio for debugging.', default=None)

    parser.add_argument('--show_audio_devices', action='store_true')

    args = parser.parse_args()

    # 환경설정
    args.access_key=access_key
    # args.keyword_paths=['베리야_ko_windows_v3_0_0.ppn', '푸른아_ko_windows_v3_0_0.ppn'] # 호출어 추가 시 이 부분이 바뀌어야함, 윈도우용
    # args.keyword_paths=['Desktop/plantz/hot-word/방울아_ko_raspberry-pi_v3_0_0.ppn', 'Desktop/plantz/hot-word/푸른아_ko_raspberry-pi_v3_0_0.ppn'] # 라즈베리파이 용
    # args.model_path='Desktop/plantz/hot-word/porcupine_params_ko.pv' # 한국어 파일 라즈베리용
    # args.model_path='porcupine_params_ko.pv'

    # 절대 경로 노출 X
    # window
    keyword_path1 = os.path.join(current_dir, '베리야_ko_windows_v3_0_0.ppn')
    keyword_path2 = os.path.join(current_dir, '푸른아_ko_windows_v3_0_0.ppn')
    

    # raspberry pi
    # keyword_path1 = os.path.join(current_dir, '방울아_ko_raspberry-pi_v3_0_0.ppn')
    # keyword_path2 = os.path.join(current_dir, '푸른아_ko_raspberry-pi_v3_0_0.ppn')
    # keyword_path3 = os.path.join(current_dir, '푸르나_ko_raspberry-pi_v3_0_0.ppn')



    args.keyword_paths=[keyword_path1, keyword_path2]
    args.model_path = os.path.join(current_dir, 'porcupine_params_ko.pv')


    if args.show_audio_devices:
        for i, device in enumerate(PvRecorder.get_available_devices()):
            print('Device %d: %s' % (i, device))
        return

    if args.keyword_paths is None:
        if args.keywords is None:
            raise ValueError("Either `--keywords` or `--keyword_paths` must be set.")

        keyword_paths = [pvporcupine.KEYWORD_PATHS[x] for x in args.keywords]
    else:
        keyword_paths = args.keyword_paths

    if args.sensitivities is None:
        args.sensitivities = [0.5] * len(keyword_paths)

    if len(keyword_paths) != len(args.sensitivities):
        raise ValueError('Number of keywords does not match the number of sensitivities.')

    try:

        porcupine = pvporcupine.create(
            access_key=args.access_key,
            library_path=args.library_path,
            model_path=args.model_path,
            keyword_paths=keyword_paths,
            sensitivities=args.sensitivities)


    except pvporcupine.PorcupineInvalidArgumentError as e:
        print("One or more arguments provided to Porcupine is invalid: ", args)
        print(e)
        raise e
    except pvporcupine.PorcupineActivationError as e:
        print("AccessKey activation error")
        raise e
    except pvporcupine.PorcupineActivationLimitError as e:
        print("AccessKey '%s' has reached it's temporary device limit" % args.access_key)
        raise e
    except pvporcupine.PorcupineActivationRefusedError as e:
        print("AccessKey '%s' refused" % args.access_key)
        raise e
    except pvporcupine.PorcupineActivationThrottledError as e:
        print("AccessKey '%s' has been throttled" % args.access_key)
        raise e
    except pvporcupine.PorcupineError as e:
        print("Failed to initialize Porcupine")
        raise e

    keywords = list()
    for x in keyword_paths:
        keyword_phrase_part = os.path.basename(x).replace('.ppn', '').split('_')
        if len(keyword_phrase_part) > 6:
            keywords.append(' '.join(keyword_phrase_part[0:-6]))
        else:
            keywords.append(keyword_phrase_part[0])

    print('Porcupine version: %s' % porcupine.version)

    recorder = PvRecorder(
        frame_length=porcupine.frame_length,
        device_index=args.audio_device_index)
    recorder.start()

    wav_file = None
    if args.output_path is not None:
        wav_file = wave.open(args.output_path, "w")
        wav_file.setnchannels(1)
        wav_file.setsampwidth(2)
        wav_file.setframerate(16000)

    print('Listening ... (press Ctrl+C to exit)')

    try:
        while True:
            pcm = recorder.read()
            result = porcupine.process(pcm)

            if wav_file is not None:
                wav_file.writeframes(struct.pack("h" * len(pcm), *pcm))

            # 호출어가 인식 된 경우
            if result >= 0:
                print('[%s] Detected %s' % (str(datetime.now()), keywords[result]))
                return True

    except KeyboardInterrupt:
        print('Stopping ...')
    finally:
        recorder.delete()
        porcupine.delete()
        if wav_file is not None:
            wav_file.close()
            

if __name__ == '__main__':
    hotword()