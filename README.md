# Groovestone 키감 체험

기계식 키보드 타건음을 웹에서 직접 들어보는 사이트.
유튜브 리뷰를 찾아보지 않아도, 자기 키보드를 두드리며 제품별 소리를 비교할 수 있게 하는 것이 목표다.

## 실행

```bash
npm install
npm run dev
```

http://localhost:5173 에서 열린다.

```bash
npm run build     # dist/ 생성
npm run preview   # 빌드 결과 확인
```

## 사용법

체험 섹션에서 축을 고르고 키보드를 두드리면 해당 축의 타건음이 재생된다.
화면의 키캡을 클릭해도 같은 소리가 난다.
제품 카드의 "이 축 소리 듣기"를 누르면 그 제품의 축으로 바로 전환된다.

## 축 추가하기

1. `public/sounds/<축이름>/` 에 사운드 세트를 넣는다
   (파일명은 `src/data/soundMap.js` 의 `SOUND_FILES` 와 동일하게)
2. `src/data/switches.js` 에서 해당 항목을 `available: true` 로 바꾼다

코드 수정은 필요 없다.

## 기술 스택

React 18 · Vite 6 · CSS Modules

## 문서

- [`CLAUDE.md`](./CLAUDE.md) — 아키텍처, 컨벤션, 함정
- [`docs/SPEC.md`](./docs/SPEC.md) — 요구사항, 현재 상태, 로드맵

## 라이선스 / 저작권

타건음은 Groovestone 제품의 실제 녹음이다. 재배포하지 말 것.
