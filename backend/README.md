# E101 웹/모바일(웹 IoT)

## 카테고리
| Application | Domain | Language | Framework |
| ---- | ---- | ---- | ---- |
| :white_check_mark: Desktop Web | :black_square_button: AI | :white_check_mark: JavaScript | :black_square_button: Vue.js |
| :black_square_button: Mobile Web | :black_square_button: Big Data | :black_square_button: TypeScript | :white_check_mark: React |
| :white_check_mark: Responsive Web | :black_square_button: Blockchain | :black_square_button: C/C++ | :black_square_button: Angular |
| :black_square_button: Android App | :white_check_mark: IoT | :black_square_button: C# | :white_check_mark: Node.js |
| :black_square_button: iOS App | :black_square_button: AR/VR/Metaverse | :black_square_button: ​Python | :black_square_button: Flask/Django |
| :black_square_button: Desktop App | :black_square_button: Game | :black_square_button: Java | :black_square_button: Spring/Springboot |
| | | :black_square_button: Kotlin | |

## 팀소개
|이름|담당|
|:--:|:--:|
|김해인<br>(팀장)|Frontend|
|한성주<br>(팀원)|Embedded|
|김연빈<br>(팀원)|Embedded|
|이동호<br>(팀원)|Frontend|
|최진우<br>(팀원)|Backend|
|박종국<br>(팀원)|Backend|

## Commit Convention
|Tag Name|Description|
|:--:|:--|
|feat|새로운 기능을 추가|
|fix|버그 수정|
|design|CSS 등 사용자 UI 디자인 변경|
|!BREAKING<br/>CHANGE|커다란 API 변경|
|!HOTFIX|급하게 치명적인 버그를 고쳐야하는 경우|
|style|코드 포맷 변경, 세미 콜론 누락, 코드 수정이 없는 경우|
|refactor|프로덕션 코드 리팩토링|
|comment|필요한 주석 추가 및 변경|
|docs|문서 수정|
|test|테스트 코드, 리팩토링 테스트 코드 추가, <br/>Production Code(실제로 사용하는 코드) 변경 없음|
|chore|빌드 업무 수정, 패키지 매니저 수정, 패키지 관리자 구성 등 업데이트, <br/>Production Code 변경 없음|
|rename|파일 혹은 폴더명을 수정하거나 옮기는 작업만 수행한 경우|
|remove|파일을 삭제하는 작업만 수행한 경우|




### install
``` bash
npm install express@4
npm install socket.io
npm install socketio-file-upload
npm install mysql2;
```

### DB 설정


``` js
export default{
    host : '',
    user : '',
    port: '',
    password : '',
    database : '' 
}
```
루트 디렉토리에 dbconfig.js 파일 생성 후 자신의 설정에 맞게 기입


