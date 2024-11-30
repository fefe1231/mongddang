![logo](assets/logo.png)

# ✨나의 혈당 메이트, 몽땅(MongDDang)✨

---

### 1️⃣ 프로젝트 개요

✨ **개발 기간**

| 개발기간 | 2024.10.14 ~ 2024.11.19 (6주) |
| ---- | ---------------------------- |

✨ **팀원 소개**

| 팀원  | 역할                                                                   |
| --- | -------------------------------------------------------------------- |
| 김민진 | 팀장, FE, UI/UX 디자인, 기능구현(메인페이지, 알림(FCM), 약 관리, 약 등록, 일일 퀘스트, 식사, 수면, 운동 등록 및 수정, 메뉴페이지(보호자메인))   |
| 권대호 | FE, Infra(CI/CD), 기능 구현(회원관리(로그인, 어린이 보호자 연결), 어린이/보호자 화면 기록, 일일 기록) |
| 조선미 | FE, 디자인 컴포넌트 개발, 기능구현(회원관리(회원가입, 프로필), 도감, 업적, 주간리포트), 갤럭시 워치 기능     |
| 나혜림 | BE, 기능구현(vital, 삼성 헬스 데이터 연동), 안드로이드(capacitor 용 AccessTokenplugin, BloodGlucosePlugin, SamsungHealthPlugin, foregroundPlugin 개발), FE(삼성헬스 & foreground Setting 컴포넌트) 크롤링                                                   |
| 변서원 | BE, 기능구현(유저, fcm 알림, mealplan, 구글 소셜로그인+jwt+spring security, 급식표 ocr & 공공api 연결(급식)), 에셋 디자인, 몽땅 세계관 구성                                                |
| 유영한 | BE, 기능구현(게임, 기록, 복약, vital, tts&stt 구현), ai(주간 레포트 프롬프팅& 몽땅 캐릭터 성격 프롬프팅) FE(몽땅과 채팅 및 음성 대화 기능,앱 미디어 세팅)                                                        |

✨ **기획 의도**

| 1형 당뇨, 4년 사이 `26%` 증가                                               |
| ------------------------------------------------------------------- |
| 소아 1형 당뇨의 경우 습관 형성이 필요하지만, 심리적으로 취약하기도 하고 실시간 혈당이 보호자와 연결의 필요성이 있음  |
| 갤럭시 워치를 활용하여 실시간 혈당을 공유하고 앱을 통해 아이 뿐 아니라 보호자도 함께 공유할 수 있는 앱을 만들기 위함 |

✨ **목표**

아이들의 혈당 관리 습관을 만들고 보호자의 불안감 해소

---

### 2️⃣ 서비스 기능 소개

✨ **워치**

- 실시간 혈당 알림

✨ **스마트폰**

- 혈당관리와 관련한 퀘스트 제공

- 코인과 캐릭터로 보상 지급, 동기 부여

- 피보호자의 습관형성 상태 확인

- 피보호자의 혈당 리포트 제공

- 응급상황 실시간 알림

---

### 3️⃣ Figma

## ![img](https://private-user-images.githubusercontent.com/101388919/391247400-219cf8fb-61e6-43a8-bc66-41d4fcf83084.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MzI5ODE5NjEsIm5iZiI6MTczMjk4MTY2MSwicGF0aCI6Ii8xMDEzODg5MTkvMzkxMjQ3NDAwLTIxOWNmOGZiLTYxZTYtNDNhOC1iYzY2LTQxZDRmY2Y4MzA4NC5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjQxMTMwJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI0MTEzMFQxNTQ3NDFaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT0xNGY2OGQ5YTIwM2Q1ZWFlMTM0YTExZDkwNzU2YjAzMzM4MGU1NmRhYzI1YTEzYWUzMmUxMGFkODRiOWQyNWNjJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.ALGWMBVl4sO4aPFwYFvEudFqo54RZYx6fqbXV8Wmhl4)


### 3️⃣ ERD

## ![img](https://private-user-images.githubusercontent.com/101388919/391247398-86f10298-0eba-44ad-98bb-8c64824f31a3.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MzI5ODE5NjEsIm5iZiI6MTczMjk4MTY2MSwicGF0aCI6Ii8xMDEzODg5MTkvMzkxMjQ3Mzk4LTg2ZjEwMjk4LTBlYmEtNDRhZC05OGJiLThjNjQ4MjRmMzFhMy5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjQxMTMwJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI0MTEzMFQxNTQ3NDFaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT1kN2JlMWNlY2Y2ZjMwY2I4MTRmODliNjQyZTkyYjE4NWJjNWU3Yjk5NzdjYmJiMjlmOTVlM2I4ZWQ1MDk5MjRmJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.A_kD93Nvz9QTSbX_HIkZ8iwabv-5_wmUMMYSO3mT1cQ)

### 4️⃣ 기술 스택

## ![img](https://private-user-images.githubusercontent.com/101388919/391247403-7113b0c0-ca0f-4d05-bcc6-90cfdaf7f6c5.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MzI5ODE5NjEsIm5iZiI6MTczMjk4MTY2MSwicGF0aCI6Ii8xMDEzODg5MTkvMzkxMjQ3NDAzLTcxMTNiMGMwLWNhMGYtNGQwNS1iY2M2LTkwY2ZkYWY3ZjZjNS5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjQxMTMwJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI0MTEzMFQxNTQ3NDFaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT1kN2YxYWY3MTkxMmFmOTVhZWRjZWFkY2VkODhhZTkyMWVlNmEwOWEzMjBjYTk1NDgwYTcxZGQ1M2M1NzU4Nzk2JlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.inZHRzuFTLmGAZJ5TTNTH-A4mlk-UycuaQbUtofZLqc)

### 5️⃣ 아키텍처

## ![img](https://private-user-images.githubusercontent.com/101388919/391247567-21a70537-0814-44ff-8cff-6f352cc55996.svg?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MzI5ODE5NjEsIm5iZiI6MTczMjk4MTY2MSwicGF0aCI6Ii8xMDEzODg5MTkvMzkxMjQ3NTY3LTIxYTcwNTM3LTA4MTQtNDRmZi04Y2ZmLTZmMzUyY2M1NTk5Ni5zdmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjQxMTMwJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI0MTEzMFQxNTQ3NDFaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT1jODk0NGNjYTg5MjRkNDIxZGIyMzRiMGNhOTg0ZGU2MDM2YWZiODg1YmM1Y2ZiMGMxNGUxZTFmMWExNDY5YWJmJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.3d3x3C8VjoigYm1Blgcqr20q2af0c7Q0d7EzQZualDM)

### 6️⃣ 기대효과

- 몽땅과의 대화로 인한 어린이 정서적 안정

- 이상 혈당에 대한 빠른 대처 가능

- 갤럭시 워치 활용성 증대

- 보호자 불안 해소 및 부담 경감

- 게임화 된 건강관리로 인한 지속적 습관 형성

---

### API

##### User

## ![img](https://private-user-images.githubusercontent.com/101388919/391247386-7a265de4-2aa1-46c3-a526-4bcd8ea59290.PNG?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MzI5ODE5NjEsIm5iZiI6MTczMjk4MTY2MSwicGF0aCI6Ii8xMDEzODg5MTkvMzkxMjQ3Mzg2LTdhMjY1ZGU0LTJhYTEtNDZjMy1hNTI2LTRiY2Q4ZWE1OTI5MC5QTkc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjQxMTMwJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI0MTEzMFQxNTQ3NDFaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT1iMDNjMWU2OTA2ODAxNmNmZjRmZThiZTA5MWQ0Y2RlMDYxNWE0YTY1NTZhY2YyODU3M2Q3NmY0NjIyYzhmNjA1JlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.dCXJFRjW5uYopL9JxV-mMlUpKIfvX47iTMj0NLmCBaU)

##### FCM

## ![img](https://private-user-images.githubusercontent.com/101388919/391247391-1f650722-1216-4560-a958-03d8f1b7cded.PNG?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MzI5ODE5NjEsIm5iZiI6MTczMjk4MTY2MSwicGF0aCI6Ii8xMDEzODg5MTkvMzkxMjQ3MzkxLTFmNjUwNzIyLTEyMTYtNDU2MC1hOTU4LTAzZDhmMWI3Y2RlZC5QTkc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjQxMTMwJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI0MTEzMFQxNTQ3NDFaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT1iZGVjYTg1NGMxYzVlYTRkZGEyNTc2YWVhZDBkNmRhNjU1NDQzMWZiYjgzZDMxYjcxYmU3ZGZlNGIxN2Q5ODQwJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.5YaAtX0m2z2hlFA5az3zygsb-vYun1xJGOqATCpibPk)

##### Notificatioin

## ![img](https://private-user-images.githubusercontent.com/101388919/391247392-f173c674-45c5-4fc8-b3de-365a53eaa34b.PNG?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MzI5ODE5NjEsIm5iZiI6MTczMjk4MTY2MSwicGF0aCI6Ii8xMDEzODg5MTkvMzkxMjQ3MzkyLWYxNzNjNjc0LTQ1YzUtNGZjOC1iM2RlLTM2NWE1M2VhYTM0Yi5QTkc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjQxMTMwJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI0MTEzMFQxNTQ3NDFaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT04NTRmNDkxYWNhNTdmYjUyNzAyYWM0MzQ0ZjhiMjgyYjEwNTEwNjNhZjEwYWViZjM5ZGMwMmU2YTRlNDZkMDNhJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.QYWHg3HUoh_EiClF8fkOWG9uc4QtRRERTodFTW0W98g)

##### Game

## ![img](https://private-user-images.githubusercontent.com/101388919/391247393-a3dae63c-1d7b-4c60-baa0-0ea133d70ee8.PNG?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MzI5ODE5NjEsIm5iZiI6MTczMjk4MTY2MSwicGF0aCI6Ii8xMDEzODg5MTkvMzkxMjQ3MzkzLWEzZGFlNjNjLTFkN2ItNGM2MC1iYWEwLTBlYTEzM2Q3MGVlOC5QTkc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjQxMTMwJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI0MTEzMFQxNTQ3NDFaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT1iNzgzOTlkM2QyYjhkMmQxYTIyMDVlOTY1MDlmN2Y2YzVlZDdiOTJjOGE2MzMxMTczMzlhYTFjODJhMjU1OWE1JlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.V0wygd6w9oGciURvkzFuwPiXo_C33Gda80B9duH-eO4)

##### Record

## ![img](https://private-user-images.githubusercontent.com/101388919/391247396-ee8d3459-4436-4c4f-ba3c-6f3dd0b99a8e.PNG?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MzI5ODE5NjEsIm5iZiI6MTczMjk4MTY2MSwicGF0aCI6Ii8xMDEzODg5MTkvMzkxMjQ3Mzk2LWVlOGQzNDU5LTQ0MzYtNGM0Zi1iYTNjLTZmM2RkMGI5OWE4ZS5QTkc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjQxMTMwJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI0MTEzMFQxNTQ3NDFaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT0zYjgyN2RjNjBmYWM4NDM5NzJiMTIyY2E0MTMwOTdjYzI2YTYzNGM5NzIxYjgxMzQ4ZGMwN2RkYmM0MGExNWZhJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.mtHKHN1YPCQP4_MZe5iZ-4BFnDaS-_mI3XSADfjtYhk)

##### Medication

## ![img](https://private-user-images.githubusercontent.com/101388919/391247397-401eb970-ed22-4b09-936a-874d23b3b646.PNG?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MzI5ODE5NjEsIm5iZiI6MTczMjk4MTY2MSwicGF0aCI6Ii8xMDEzODg5MTkvMzkxMjQ3Mzk3LTQwMWViOTcwLWVkMjItNGIwOS05MzZhLTg3NGQyM2IzYjY0Ni5QTkc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjQxMTMwJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI0MTEzMFQxNTQ3NDFaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT0xYjI3MjI3NzUyZTlhOThhYWQ1MDEzMDZhMDE4ZTcxNDhmN2MyMDdlMGQ5OGVmYTUxNGMxMTdkNjRjYTRiYmYwJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.aNabBaFfT6NQW6ResxltZ6LNpt33Vrue_GxNVhr2OJo)

##### vital

## ![img](https://private-user-images.githubusercontent.com/101388919/391247963-a1ccd675-9f8f-41bf-9674-6745bb8584d7.PNG?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MzI5ODIzMzgsIm5iZiI6MTczMjk4MjAzOCwicGF0aCI6Ii8xMDEzODg5MTkvMzkxMjQ3OTYzLWExY2NkNjc1LTlmOGYtNDFiZi05Njc0LTY3NDViYjg1ODRkNy5QTkc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjQxMTMwJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI0MTEzMFQxNTUzNThaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT1mNTZjMzkxYzczODE0NmNhOWU0MTIyY2NhOWM4Y2Y5MDEyYjRlYzIwZGFkMjFlZWU1MTA4NDdhMDY4Nzk5N2JkJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.esGwDOOYCQO0sKhgqr-3DWCwclQj3qXpTjNYIkSpOtA)
