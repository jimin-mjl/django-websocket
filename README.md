# WebSocket 기반 채팅 서비스

## 개요

웹 소켓을 사용해 실시간 익명 채팅 서비스를 구현한다.

## 데모

[데모 비디오 링크](https://drive.google.com/file/d/1qYbTxtjOKMHFzDT1u8UPm_XfWWdrfKI6/view?usp=sharing)

## 개발 환경

- IDE : Visual Studio Code
- 프로그래밍 언어 : Python
- 프레임워크 : Django, Django Channels

## 구현 내용

- 유저는 로비에서 채팅방을 생성할 수 있다.
- 유저는 채팅방마다 닉네임을 따로 설정할 수 있다.
- 유저 입장 시 채팅방의 전체 멤버에게 알림이 간다.
- 채팅 시 자신의 채팅은 오른쪽에, 타인의 채팅은 왼쪽으로 정렬되어 보여진다.
- 로비 또는 채팅방 안에서 참여 멤버 목록을 확인할 수 있다.
- 이름으로 채팅방을 검색할 수 있다.
- 채팅방에 남은 마지막 멤버가 나가면 채팅방은 자동으로 삭제된다.

## 실행 방법

1. .env 파일 생성

```
# 예시
SECRET_KEY=somekey
DEBUG=True
ALLOWED_HOSTS=127.0.0.1
```

2. 의존 파일 설치

```
pip install -r requirements.txt
```

3. 실행

```
python manage.py runserver
```

4. `127.0.0.1/8000` 접속

## Next Step

- 채팅 로그를 보존할 수 있도록 구현한다.
- 유저 간 쪽지 기능을 추가한다.
