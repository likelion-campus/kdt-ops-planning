# Project page — PM mirror with storybook design system

> ⚠️ **SSOT 아님.** 디자이너 탐색용 미러본. 정식 시안은 Figma + [../../figma-links.yml](../../figma-links.yml).

## 무엇인가

PM이 만든 [classroom/1-planning/prototype/project.html](../../../1-planning/prototype/project.html)을 **DOM·JS·레이아웃 그대로** 가져온 다음, **토큰의 단일 진실(SoT)을 글로벌 storybook 디자인시스템으로 옮긴 미러본**.

원본 PM의 자체 토큰(`--lk-*`)이 storybook 토큰(`--color-*`)을 가리키도록 alias만 추가했기 때문에, 같은 페이지가 글로벌 디자인시스템의 토큰 변경에 자동으로 따라가게 됨.

## 세 버전 비교

| 버전 | 위치 | 토큰 SoT | DOM | 컴포넌트 외관 |
|---|---|---|---|---|
| **원본 PM** | `../../../1-planning/prototype/project.html` | PM 자체 정의 (`--lk-*` 직접 값) | PM JS 렌더링 | PM 자체 |
| **PM 미러본** (이 폴더) | `./index.html` | **storybook** (`--color-*` → `--lk-*` alias) | PM JS 렌더링 (동일) | PM 자체 (외관 거의 변화 없음 — 토큰값이 같으므로) |
| **디자이너 재작성본** | `../project/index.html` | storybook | 가희님 직접 작성 | storybook 컴포넌트 (BEM 클래스 그대로) |

가운데 버전(미러본)이 의미 있는 이유: **PM 프로토타입이 글로벌 디자인시스템과 정렬되어 있는지 검증**할 수 있음. storybook의 토큰값이 바뀌면 이 페이지도 따라가므로, "PM 프로토타입이 SSOT를 이탈한 지점"을 빠르게 발견.

## 구조

```
project-pm-restyled/
├── README.md
├── index.html                ← PM project.html 그대로 + 헤더에 bridge CSS만 추가
└── assets/
    ├── storybook-bundle.css  ← 글로벌 storybook 토큰 + 컴포넌트 CSS (2969줄)
    ├── tokens-bridge.css     ← --lk-* → var(--color-*) alias (이 파일이 다리)
    ├── tokens-pm-original.css ← PM 원본 tokens.css 백업 (참조용, 사용 안 함)
    ├── styles.css            ← PM 자체 styles.css (복사본)
    ├── components.js         ← PM 자체 JS 렌더링 (복사본)
    └── mock-data.js          ← PM 자체 mock data (복사본)
```

## 로드 순서 (중요)

```html
1. storybook-bundle.css   → :root에 --color-* 정의
2. tokens-bridge.css      → --lk-*: var(--color-*); 로 alias
3. styles.css (PM)        → var(--lk-*) 참조 → bridge가 storybook 값을 흘려보냄
```

## 어떤 부분이 바뀌었는가

- **색상**: 토큰 값이 같으므로(둘 다 `#FF6000` 등) 시각적 변화 거의 없음. 다만 **출처가 storybook으로 통일됨**.
- **타이포(부분 적용)**: page-head 제목 / 카드 타이틀 / 버튼 라벨 3곳을 storybook typography 스케일로 강제 적용 (tokens-bridge.css 하단 부분). 시각 비교용.
- **컴포넌트 외관**: 변경 없음. PM 자체 `.btn`, `.tag`, `.tab` 클래스가 그대로 작동.

## 어떤 부분이 바뀌지 않았는가

- DOM: PM JS가 동적 렌더링하는 GNB/LNB/카드 모두 그대로
- mock data: PM 그대로
- 학생뷰/매니저뷰 토글: PM 그대로 작동 (`?view=manager`)

## 비교 보는 법

세 서버를 한꺼번에 띄우면 옆에 늘어놓고 보기 좋음:

```bash
# 원본 PM
cd ~/kdt-ops-planning/classroom/1-planning/prototype && python3 -m http.server 8765
# 디자이너 재작성본
cd ~/kdt-ops-planning/classroom/2-design/explorations/project && python3 -m http.server 8766
# 이 미러본
cd ~/kdt-ops-planning/classroom/2-design/explorations/project-pm-restyled && python3 -m http.server 8767
# storybook 컴포넌트 카탈로그
cd ~/Desktop/glob-storybook && npm run storybook  # :6006
```

## tokens-bridge.css 갱신 시점

- PM의 styles.css가 새 `--lk-*` 토큰을 쓰면 → bridge에 매핑 추가
- storybook이 시맨틱 토큰 네이밍을 바꾸면 → bridge의 `var(--color-semantic-...)` 부분 수정
- 둘 다 안 바뀌었으면 → 손댈 일 없음

## 한계

- PM의 컴포넌트(.btn, .tag, .tab)와 storybook 컴포넌트(.action-button, .tag, .tab) 사이의 외관 차이는 이 미러본으로는 안 보임 (PM 자체 외관 유지). 외관 차이까지 보려면 [../project/](../project/)의 디자이너 재작성본 참조.
- storybook의 시맨틱 토큰 네이밍이 가정에 기반함 (`--color-semantic-fg-strong` 등). 실제 네이밍이 다르면 fallback으로 primitive(gray-900 등)가 사용됨. 작동에는 영향 없음.
