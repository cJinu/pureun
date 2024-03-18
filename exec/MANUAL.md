# Porting Maunal

1. 사용한 JVM, 웹서버, WAS 제품 등의 종류와 설정값, 버전(IDE 버전 포함), 사용기술스택 버전 명시 필수
    - Front
        - React: ^18.2.0
        - react-router-dom: ^6.22.0
        - VS Code: 1.86.1
    - Embeded
        - Arduino IDE: 2.2.1
        - Raspberrypi 4
        - RealVNC Viewer
        - VS Code: 1.85.1
    - Back
        - node: 20.10.0
        - nest: 10.3.0
    - Build
        - Gitlab
        - Gerrit
        - Jenkins: 2.442
        - NGINX: 1.25.3
        - Docker: 25.0.2
    - DB
        - MySQL: 8.3.0
2. 빌드 시 사용되는 환경변수 등 내용 상세
    - .gitignore
        - backend
            
            ```jsx
            # compiled output
            /dist
            /node_modules
            
            # Logs
            logs
            *.log
            npm-debug.log*
            pnpm-debug.log*
            yarn-debug.log*
            yarn-error.log*
            lerna-debug.log*
            
            # OS
            .DS_Store
            
            # Tests
            /coverage
            /.nyc_output
            
            # IDEs and editors
            /.idea
            .project
            .classpath
            .c9/
            *.launch
            .settings/
            *.sublime-workspace
            
            # IDE - VSCode
            .vscode/*
            !.vscode/settings.json
            !.vscode/tasks.json
            !.vscode/launch.json
            !.vscode/extensions.json
            
            upload/
            .env
            ```
            
        - frontend:
        - embedded: .venv, venv/, .env, .mypy_cache/
    - .env
        - embedded
        
        ```jsx
        ACCESS_KEY="호출어 인식(PORCUPINE) ACCESS KEY"
        SERVER_URL="소켓 통신 할 서버 URL"
        GOOGLE_APPLICATION="STT용 JSON 파일 경로"
        ```
        
        - backend
        
        ```jsx
        DB_HOST="DB 호스트"
        DB_PORT="사용중인 DB 포트 번호"
        DB_USERNAME="DB 사용자 이름"
        DB_PASSWORD="DB 비밀번호"
        DB_DATABASE="DB에서 사용할 스키마 이름"
        
        GPT_API_KEY="CHAT GPT API 호출을 위한 ACCESS KEY"
        CLOVA_CLIENT_ID="TTS 호출을 위한 클로바 API ID"
        CLOVA_CLIENT_SECRET="TTS 호출을 위한 클로바 API SECRET"
        
        AWS_REGION= "AWS S3 사용을 위한 지역설정"
        AWS_ACCESS_KEY= "key name"
        AWS_SECRET_KEY= "aws s3 secret key"
        AWS_BUCKET_NAME= "aws s3 bucket name"
        ```     
            
3. 배포 시 특이사항
    
    [Deploy Comment](https://www.notion.so/Deploy-Comment-0ff0d2f8e4c246cb822609bb1e13415b?pvs=21)
    
4. 프로젝트에 활용되는 주요 계정 및 프로퍼티가 정의된 파일 목록
    - .env
5. 외부 서비스 가입 및 활용에 필요한 정보
    - openAI ChatGPT API
        - https://platform.openai.com/docs/api-reference
    - Google Cloud - speech-to-text
        - https://cloud.google.com/speech-to-text/docs/apis?hl=ko
    - Naver Cloud platform - Clova voice - tts service
        - https://api.ncloud-docs.com/docs/ai-naver-clovavoice
    - PICO VOICE - porcupine
        - https://picovoice.ai/docs/porcupine/
    - Amazon S3 Cloud
        - https://s3.console.aws.amazon.com/s3/home?region=ap-northeast-2
6. db 덤프파일 최신본
7. 시연 시나리오(시연 순서에 따른 site 화면별, 실행별 상세 설명)
    
    키즈모드 - 화분상세, 컬렉션 + 해제할때 비번 설명
    
    ![image](https://github.com/cJinu/CS/assets/38110757/442cb706-bf2d-4470-8945-bbe4b70ee675)
    
    키즈모드 메인
    
    ![image](https://github.com/cJinu/CS/assets/38110757/b8e936ab-f6cf-49a5-a7bf-4415eb0da1e9)
    
    화분상세(키즈)
    
    ![image](https://github.com/cJinu/CS/assets/38110757/d50d2468-f7bd-45bb-8917-fbf714f22571)
    
    컬렉션(키즈)
    
    ![image](https://github.com/cJinu/CS/assets/38110757/87b40609-0e47-4e86-934b-cfda76cd2e53)
    
    키즈모드 해제
    
    메인페이지 → 아이관리(아이목록) → 아이 상세(버튼 눌러서 대충 보여주기)
    
    ![image](https://github.com/cJinu/CS/assets/38110757/62197c15-ad3e-4b63-9db5-a34d00f31cb3)
    
    메인페이지
    
    ![image](https://github.com/cJinu/CS/assets/38110757/a4147e4b-5c1b-41ba-b2d1-b69928e811be)
    
    아이 관리
    
    ![image](https://github.com/cJinu/CS/assets/38110757/ce329380-3d49-490f-a763-0dced625a55d)
    
    아이 상세
    
    ![image](https://github.com/cJinu/CS/assets/38110757/a6ce2022-0d8c-4e3e-914a-6f66924400bd)
    
    톱니바퀴 누르면 삭제하기 버튼
    
    ![image](https://github.com/cJinu/CS/assets/38110757/fe4b1777-3227-4391-8196-922cf074c8c9)
    
    컬렉션(부모)
    
    ![image](https://github.com/cJinu/CS/assets/38110757/88fef4fa-a488-454c-a739-82d63e41b77e)
    
    이건 혹시나 해서 넣어둔 화면 캡쳐
    
    화분목록: 메인 + 네브바에서 볼수 있다 설명하고, 우리는 메인에서 눌러서 ㄱㄱ
    
    ![image](https://github.com/cJinu/CS/assets/38110757/b2224157-2cfa-4744-a597-1bb442220f94)
    
    화분목록
    
    화분 추가 → 버튼눌러주기, 등록하기를 누를건가? (등록하기 할거니까 미리 생각해두자) > 목록으로 돌아오면 애기별 조회 가능(우리가 추가한 주인으로 보여주자)
    
    ![image](https://github.com/cJinu/CS/assets/38110757/af2702da-35a9-4f00-b7ec-7d367e77f28d)

    ![image](https://github.com/cJinu/CS/assets/95911613/7af67289-7046-4486-aad4-1c2067efea7b)
    
    화분추가

    
    ![image](https://github.com/cJinu/CS/assets/38110757/077ffe1c-103c-473f-bc51-9c64f18c03d2)
    
    화분목록(필터링)
    
    동호 1번 들어가서 화분상세 보여줘, 화분 상세정보를 볼 수 있다. 실시간으로 온습도가 반영되는 것을 볼 수 있다. → 캘린더, 그래프 → 성장완료 버튼 누르면 컬렉션에 들어감
    
    ![image](https://github.com/cJinu/CS/assets/38110757/3590c110-fa09-4e92-8547-9a57e429c95e)
    
    화분상세-1 (수정 필요)
    
    ![image](https://github.com/cJinu/CS/assets/38110757/ca6b430f-d4c0-448f-8f5c-22982443f00c)
    
    화분상세-2
    
    대화목록 → 즐겨찾기, 안읽음 보여주기
    
    ![image](https://github.com/cJinu/CS/assets/38110757/04cd063e-f21a-4ec7-9a02-0f8770b3bf4a)
    
    대화목록(전체)
    
    ![image](https://github.com/cJinu/CS/assets/38110757/67c79d93-f819-42dd-8ffa-e3d6f123c4d8)
    
    대화목록(즐겨찾기)
    
    ![image](https://github.com/cJinu/CS/assets/38110757/77a0ef50-be03-4011-96f0-b88b97ad0783)
    
    대화목록(안읽음)
    
    대화상세 - 하나, 전체 재생되는거 보여주기
    
    ![image](https://github.com/cJinu/CS/assets/38110757/76095e94-d50a-4d79-9b03-fedd8f77c74f)
    
    대화상세
    
    푸른이와 대화 예시
```text
    1. 호출어 (푸른아) -> 인식 모션 & 안내음
    2. 푸른이 에게 말걸기 -> 푸른이의 응답
    3. 지속해서 대화 하기 or 자동 종료
    4. 웹에 저장된 대화 내용 text, audio 확인
```
    물주는 상황 시연
