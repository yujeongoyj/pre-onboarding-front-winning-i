# Pre-Onboarding 3주차 과제 2) 차트 페이지와 게시판 만들기

JUSTCODE 6기에서 진행한 Wanted Pre-Onboarding 과정의 3주차 두 번째 과제입니다.

##  배포 링크

https://justcode-pre-onboarding-3-2.netlify.app/

## 실행 방법

레포지토리 클론하시고 `npm i` 후 `npm run dev` 커맨드 입력하시면 실행됩니다.

## 사용한 언어 및 라이브러리 
`JavaScript` `React.js` `Recoil` `styled-components` `chart-js` `MUI` 등등

## 프로젝트 설명

![d1d2](https://user-images.githubusercontent.com/100749629/196729537-a0461931-a014-4969-8aa7-543cdffa07e7.png)


Pre-Onboarding 3주차 두 번째 과제인 **차트 페이지와 게시판 만들기**입니다.

과제 진행방식이 명확하게 제시되어있지 않아 제 나름대로 해석한대로 진행했습니다.

우선 프론트 개발자 혼자 어떻게 게시판과 로그인을 구현할까 생각하다가 **로컬 스토리지**를 데이터베이스처럼 사용하자는 생각을 했습니다.

그래서 새로 회원가입한 아이디 목록, 계정 별 차트 데이터, 현재 로그인한 아이디, 게시글 데이터, 댓글 데이터 등을 로컬스토리지에 저장한 후 값을 가져와 **브라우저를 종료하거나 사이트를 나가도 재접속하면 계정, 게시글, 댓글 등이 유지되도록** 구현했습니다.

또 메인 차트는 chart-js 라이브러리를 사용했으며 MUI 라이브러리를 사용해 디자인을 깔끔하게 구현하려고 노력했고, 모바일 환경에서도 작동할 수 있도록 **반응형 페이지**로 구현했습니다.

---

## 후기 (블로그에 작성 후 링크 예정)

## Reference

- 이 프로젝트는 비영리목적으로 WINNING I와의 기업협업 과제제출용으로 제작한 프로젝트입니다.
