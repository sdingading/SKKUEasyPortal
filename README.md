# 📔SKKUEasyPortal

성균관대 학생을 위한 Easy - 포털 (Web Page)

학생들의 일정관리, 강의 수강, 학교 공지 확인(학교(과) 공지사항, gls, I-campus 등) 등
대학생활에 필요한 내용들이 너무 분산되어 있다는 생각이 들었습니다.

이 내용들에 대한 접근성을 높이기 위해 학교 생활에 필요한 내용을 쉽게 관리할 수 있으면서,
학생들의 학업에도 도움을 줄 수 있는 웹페이지를 만들어 보기로 하였습니다.

데이터 베이스는 firebase를 사용하였습니다.

**< 🛠 제공 기능 >**

사용자 로그인을 통해 나만의 SKKUEasyPortal 을 누려보세요!

1. **[📗궁금해](#--궁금해)** : 자유게시판, 학교 생활에 필요한 정보 (졸업 요건 등) 정리
2. **[📕공부해](#--공부해)** : 타이머, 학사일정 D-day, 추천 공부 사이트
3. **[📒암기해](#--암기해)** : 과목별 파일 저장

# SKKUEasyPortal 시작하기

[(**SKKUEasyPortal**)](https://dkscksals12.github.io/SKKUEasyPortal/) 을 클릭하시면 SKKUEasyPortal 사이트에 접속됩니다.

링크 : https://dkscksals12.github.io/SKKUEasyPortal/

<img width="100%" src="https://user-images.githubusercontent.com/80513243/169660175-046749e1-2aac-4f74-970d-5bbbe6e4a008.png">
# 기능 엿보기

## - 📓회원가입

<img width="100%" src="https://user-images.githubusercontent.com/80513243/169660207-56537163-291e-4419-87fa-643fa32f4063.png">
처음 회원가입 페이지에서 아이디, 비밀번호를 설정한 뒤 sign up을 하시면 회원가입을 할 수 있습니다.
<img width="100%" src="https://user-images.githubusercontent.com/80513243/169660223-04ecf4de-5e6f-4bf9-9ab6-b35d3757678e.png">
좌측 하단의 유저를 클릭하시면 로그아웃 및 프로필 메뉴가 있습니다.
프로필 메뉴에서는 사용자 이름과 프로필 사진을 설정하실 수 있습니다.

## - 📗궁금해

<img width="100%" src="https://user-images.githubusercontent.com/80513243/169660240-feb66d6c-24ab-4e83-a6af-abe9e34679a6.png">

### 1. 자유 게시판

<img width="100%" src="https://user-images.githubusercontent.com/70026347/169686870-84fb7258-33ce-49bf-a1d7-219498642041.png">
글쓰기 버튼을 클릭하면 새 글을 작성할 수 있습니다.

이곳에 쓰인 글은 사용자 모두가 열람할 수 있으며, 본인이 쓴 게시글에는 체크 표시가 글쓴이 옆에 표시됩니다.

<img width="100%" src="https://user-images.githubusercontent.com/70026347/169687596-5905861b-ae67-4cd5-b02f-59cba37be1b2.png">
본인이 쓴 게시글은 열람할 경우, 삭제버튼이 나타나며 본인이 쓴 게시글만 삭제가 가능합니다.

### 2. 정보 페이지

<img width="100%" src="https://user-images.githubusercontent.com/70026347/169687783-d7665721-4040-4367-8d61-067ae9511650.png">
교내 WIFI 사용법, 졸업요건, 누려라 성대생, 캠퍼스맵의 네가지 메뉴가 지원됩니다.

위의 예시는 졸업요건 메뉴이고, 자신에게 해당하는 정보를 선택하면 자신의 조건에 맞는 졸업요건을 확인하실 수 있습니다.

## - 📕공부해

<img width="100%" src="https://user-images.githubusercontent.com/80513243/169685635-7fcb6e94-61be-4324-a9f5-78edb281699e.png" >

### 1. 타이머

<img width="100%" src="https://user-images.githubusercontent.com/80513243/169685726-862dda3d-2a0e-41fb-9f4b-5ea1a44f1dbe.png">

타이머 우측 상단의 + 버튼을 누른뒤, text 창에 과목 이름을 넣으면, 과목 이름이 설정된 타이머가 추가됩니다.

과목 이름을 빈칸으로 적을 경우, 과목 이름이 null로 표현됩니다.

플레이버튼을 누르면 시간이 가고 다시 일시정지를 누르면 시간이 멈추게 됩니다.

좌측의 타이머는 페이지를 새로고침할 때마다 0초부터 시작하고, 우측의 타이머는 공부한 시간을 누적하여 저장합니다.

과목 이름과, 오른쪽에 저장된 총 시간은 로그아웃 후 다시 로그인시 그대로 저장되어있습니다.

총 시간은 10초 간격으로 자동으로 저장이 되며, 중지 버튼을 눌렀을 경우에도 저장이 됩니다.

타이머 왼쪽의 x 버튼을 누르면 과목이 삭제되고,

타이머의 오른쪽 지우개모양 버튼을 누르면 총 누적 시간과 공부한 시간이 0으로 되돌아 갑니다.

### 2. D-day 리스트

<img width="100%" src="https://user-images.githubusercontent.com/80513243/169685796-05e36874-84da-437d-9ae4-bb5c04f378bd.png">

시험과 같은 중요 일정을 D-day 리스트에 추가하거나 제거할 수 있습니다.

일정 이름을 빈칸으로 적을 경우, 일정 이름이 null로 표현됩니다.

매일 자동으로 시작D-day와 종료D-day 가 계산되어 표시됩니다.

D-day 날짜가 끝날 경우 --로 표현됩니다.

### 3. Useful Link for Studying

공부할 때 도움이 될만한 사이트와 링크가 소개되어있습니다.

링크를 누르면 새창에서 해당 링크로 연결됩니다.

## - 📒암기해

과목별로 저장하고 싶은 파일을 저장할 수 있습니다.

<img width="100%" src="https://user-images.githubusercontent.com/70026347/169688234-40f339c9-b6f8-4a0c-9948-3e41d4499984.png">

책과 페이지를 컨셉으로 만들었습니다.

처음 가입했을 땐, + 모양 버튼을 눌러 새로운 책을 추가할 수 있습니다.

<img width="100%" src="https://user-images.githubusercontent.com/70026347/169688925-3e4076fd-43e2-4a03-ae51-7e2ae5c38907.png">

책의 제목, 색, 글자색을 마음대로 설정하실 수 있습니다.

같은 제목의 책을 생성하시게 되면 -1, -2 로 넘버링이 됩니다.

새로운 책이 생성되어 클릭해서 들어가게 되면, 해당 책으로 이동하게 됩니다.

<img width="100%" src="https://user-images.githubusercontent.com/80513243/169660364-a04b3202-2326-4e5f-8849-4ebf29e8ec9e.png">

책 내부에는 파일추가 버튼을 통해 원하는 파일들을 페이지와 같이 간단히 저장할 수 있습니다.

돋보기 버튼을 누르면 파일이 새창으로 열리게 되고 크게 보거나, 다운로드를 할 수 있습니다.

x 모양 버튼을 누르면 파일을 삭제할 수 있습니다.

마치 책의 페이지를 추가하는 것처럼 나만의 책을 완성하여 공부에 효율적으로 사용해보세요.

🙋‍♀️주의! 페이지에 추가할 수 있는 파일은 .pdf .jpg .png .txt 확장자의 파일만 지원합니다.



# How To Contribute

이 [레포지토리](https://github.com/dkscksals12/SKKUEasyPortal)를 fork 해 주세요.
수정한 내용을 pull request 로 보내주세요.

# 저작권 라이선스

MIT License
Copyright (c) 2022 Chan
Licensed under the [MIT](https://github.com/microsoft/vscode/blob/main/LICENSE.txt) license.
