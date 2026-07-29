# CLAUDE.md

에이전트가 이 저장소에서 작업할 때 먼저 읽는 파일.
제품 요구사항과 로드맵은 `docs/SPEC.md`에 있다.

---

## 이 프로젝트가 뭔지

Groovestone 기계식 키보드의 **타건음을 웹에서 직접 체험하는 사이트**.

핵심 목표 한 줄: **사용자가 유튜브 리뷰 영상을 찾아보지 않아도, 이 사이트에서 자기 키보드를 두드리며 제품별 타건음을 간접 체험할 수 있게 한다.**

이건 쇼핑몰 페이지가 아니다. 제품 목록은 체험으로 가는 입구일 뿐이고, 중심은 `ExperienceSection`이다. 기능 추가나 리팩터링을 판단할 때 "이게 타건음 체험을 더 좋게 만드는가"를 기준으로 삼을 것.

---

## 실행

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # dist/
npm run preview  # 빌드 결과 확인
npm test         # IME 로직 테스트
```

Node 18+ / Vite 6 / React 18.

---

## 디렉터리 구조

```
src/
├── main.jsx                    엔트리
├── App.jsx                     상태 소유 + 전역 키 이벤트 리스너
├── sections/                   페이지 세로 구획 (1:1로 <section> 대응)
│   ├── SiteHeader.jsx
│   ├── Introduction.jsx
│   ├── ProductList.jsx         제품 카드 + 검색
│   ├── ExperienceSection.jsx   ★ 핵심 섹션
│   └── SiteFooter.jsx
├── components/                 재사용 UI (각자 .module.css 동반)
│   ├── Keyboard/               Keyboard.jsx, Key.jsx
│   ├── SwitchSelector/
│   └── TypingArea/
├── data/                       순수 데이터 + 매핑. React 의존 없음
│   ├── switches.js             축 레지스트리
│   ├── products.js             제품 목록
│   ├── soundMap.js             키 -> 사운드 파일명
│   └── keyLayouts.js           KLE 레이아웃 프리셋
├── hooks/
│   └── useKeySound.js          오디오 프리로드/캐시/재생
├── utils/
│   └── kle.js                  KLE 파싱
└── styles/global.css           전역 스타일 (컴포넌트 스타일은 CSS Module)

public/
├── images/
└── sounds/
    ├── groovestone-intro.mp3   브랜드 사운드 (현재 미사용)
    └── milky-v2-45g/           축별 폴더. 파일명 세트는 모든 축이 동일

legacy/                         리팩터링 이전 바닐라 JS. 참고용, import 하지 말 것
docs/SPEC.md                    요구사항 / 로드맵
```

---

## 아키텍처에서 알아야 할 것

### 상태는 App.jsx가 전부 소유한다

`switchId`, `pressedKey`, `text` 세 개가 전부. 하위 컴포넌트는 props로만 받는다. 상태 관리 라이브러리는 없고, 지금 규모에서는 필요 없다.

### 물리 키보드 입력이 주된 상호작용

`App.jsx`의 `useEffect`가 `window`에 `keydown`/`keyup`을 건다. 화면의 키캡 클릭은 보조 수단이다. 이 우선순위를 뒤집지 말 것 — 사용자가 자기 키보드를 두드리는 게 이 사이트의 요점이다.

### 한글 IME 처리 — 여기서 제일 많이 깨진다

**`if (e.isComposing) return` 로 막으면 안 된다.** macOS 두벌식 IME 는 첫 자모부터 `isComposing` 이 계속 true 라, 이렇게 짜면 맥에서 한글 타이핑 중 소리가 전혀 안 난다. 실제로 그렇게 짰다가 맥에서 무음이 되는 문제가 있었다.

판정은 `utils/ime.js` 의 `shouldIgnoreKeydown()` 이 담당한다:

- 조합 중이어도 **자모와 특수키(Backspace, Space, Enter…)는 통과**시킨다
- 실제 키를 알 수 없는 경우(`Process`, `Unidentified`)만 무시하고 `compositionupdate` 에 맡긴다
- `e.repeat` 은 항상 차단 (길게 누를 때 연속 재생 방지)

두 경로가 다 열려 있으므로 같은 입력이 두 번 울릴 수 있다. `createPlayGate()` 가 40ms 안의 중복을 막는다.

`diffComposition()` 은 자모 수가 늘었을 때만 소리를 낸다. 글자 수로 세면 안 된다 — "마"→"만" 과 "만"→"마" 가 둘 다 1글자라 추가인지 삭제인지 구분되지 않는다. NFD 로 분해하되 **겹자모(ㄶ, ㅘ 등)는 2로 세야** 한다. `countJamo()` 참고.

이 로직은 브라우저·OS 마다 동작이 달라 눈으로 확인하기 어렵다. `npm test` 로 검증한다.

### 사운드는 키 단위가 아니라 행 단위

녹음이 키마다 따로 있는 게 아니라 **행(row) 단위 + 특수키**로 되어 있다.

```
row-function / row-number / row-r3 / row-r2 / row-r1 / row-control
space / enter / backspace / tab / capslock / shift-left / shift-right
```

`data/soundMap.js`의 `getSoundFile(key)`가 키 이름을 파일명으로 바꾼다. 한글·영문 각인을 모두 매핑에 넣어야 두벌식 입력에서도 소리가 난다.

좌/우 쉬프트만 `KeyboardEvent.code`로 구분한다 (`getSoundFileByCode`).

### 오디오 재생 규칙

`hooks/useKeySound.js` 가 담당한다. **Web Audio API(AudioContext) 기반**이다.

mp3 를 한 번만 디코드해 `AudioBuffer` 로 들고 있다가, 재생할 때마다 `BufferSource` 를 새로 만들어 물린다. 지연이 거의 없고 동시 재생도 자유롭다.

건드릴 때 지켜야 할 것:

- **`HTMLAudioElement` + `cloneNode()` 방식으로 되돌리지 말 것.** 연타 시 소리가 잘리고, 사파리에서 재생이 실패한다. 실제로 그 방식으로 짰다가 소리가 아예 안 나서 갈아엎었다.
- **자동재생 정책 해제는 `ctx.resume()`.** 브라우저는 사용자 상호작용 전에 AudioContext 를 `suspended` 상태로 둔다. 최초 `pointerdown`/`keydown` 에서 resume 한다.
- **에러를 조용히 삼키지 말 것.** `.catch(() => {})` 로 묻으면 소리가 안 날 때 원인을 찾을 수 없다. 훅이 `ready` / `error` 를 반환하고 UI 가 이를 표시한다.
- 축을 바꾸면 해당 폴더를 다시 fetch/decode 한다 (`baseDir` 이 deps 에 있음).

---

## 축 추가하는 법

가장 흔한 작업이다.

1. `public/sounds/<dir>/`에 사운드 세트를 넣는다. 파일명은 `data/soundMap.js`의 `SOUND_FILES`와 **정확히 동일**해야 한다.
2. `data/switches.js`의 `SWITCHES` 배열에서 해당 항목을 찾아 `available: true`로 바꾸고 `weight`, `description`을 채운다.

끝이다. UI는 레지스트리를 읽어 자동으로 반영된다. 코드 수정은 필요 없다.

현재 `coral`, `hani`, `jaejal`이 `available: false`로 자리만 잡혀 있다.

---

## 코드 컨벤션

- JSX가 들어가는 파일은 **반드시 `.jsx`**. `.js`에 JSX를 넣으면 Vite 빌드가 깨진다 (과거에 이걸로 빌드가 통째로 죽어 있었다).
- 컴포넌트 스타일은 CSS Module (`*.module.css`). 전역 스타일만 `styles/global.css`.
- `defaultProps` 쓰지 말 것 — 함수 컴포넌트에서 제거 예정이라 경고가 뜬다. 기본 파라미터를 쓴다.
- `data/`는 순수 데이터만. React를 import 하지 않는다.
- 주석과 UI 문구는 한국어.

---

## 함정

- **`index.html`은 반드시 루트에.** `public/`에 두면 Vite가 엔트리로 인식하지 않아 JS 번들이 아예 안 만들어진다. 빌드는 성공한 것처럼 보이는데 빈 페이지가 나온다.
- **`keyLayouts.js`의 `kle` 필드는 이미 `JSON.stringify` 된 문자열이다.** `JSON.parse(layout.kle)`로 바로 파싱할 것. 대괄호로 한 번 더 감싸면 삼중 배열이 되어 키가 0개 렌더링된다.
- **사운드 파일명은 ASCII로 유지.** 한글 파일명은 배포 환경에 따라 URL 인코딩 문제를 일으킨다.
- **`legacy/`는 읽기 전용 참고 자료.** 현재 앱과 연결되어 있지 않고, 존재하지 않는 DOM 요소를 참조한다.
- 저장소 히스토리가 한 번 재작성되었다 (`node_modules` 제거). 오래된 로컬 클론이 있으면 다시 클론할 것.

---

## 변경 후 확인

테스트가 없으므로 최소한 이건 돌린다.

```bash
npm run build
```

그리고 `npm run dev`로 직접 확인:

- 키보드를 두드렸을 때 소리가 나는가
- 한글 입력 시 소리가 두 번 나지 않는가
- 키를 길게 눌렀을 때 연속 재생되지 않는가
- 축을 바꿨을 때 소리가 실제로 달라지는가
- 화면 키캡을 클릭했을 때도 소리가 나는가
