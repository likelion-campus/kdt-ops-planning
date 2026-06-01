# Figma 시안 작업 가이드 — Classroom 팀

> 이 문서는 가희(@design-classroom-lead)가 2026-06 초 프로젝트 화면을 작업하며 정립한 시안 절차입니다. 다른 작업자(디자이너·PM·FE)도 동일한 방식으로 시안을 만들고 검증할 수 있도록 박제한 가이드.

**관련 문서**: [README.md](README.md) (토큰 인덱스) · [../README.md](../README.md) (Classroom 디자이너 가이드 — 캐노니컬) · [tokens.css](tokens.css)

## 0. 사전 셋업 (최초 1회)

### 0-1. Pretendard 폰트 — **추가 작업 불필요** ✅
워크스페이스에 **클라우드 폰트로 이미 등록**되어 있어요 (2026-06-01, 가희님 등록). 워크스페이스 멤버는 Figma 열자마자 `Pretendard` family 자동 사용 가능. Mac 로컬 설치도 필요 없음.

> 새로운 워크스페이스/조직으로 옮길 때만: admin이 https://github.com/orioncactus/pretendard/releases/latest 에서 9개 static OTF 다운로드 → Figma 워크스페이스 Fonts 설정 업로드 (SIL OFL 라이선스, 임베드 자유).

### 0-2. Figma 파일에 멋사 DS 라이브러리 등록
파일 좌측 Assets 패널 → "+" 클릭 → `멋쟁이사자처럼 Design System` 라이브러리 활성화.
파일 안에 다음 라이브러리들이 함께 보여야 합니다:
- `멋쟁이사자처럼 Design System` ⭐ (메인)
- `02 LDS_Icons`
- `99 LDS_Helper`

### 0-3. 디폴트 레이아웃 frame 확인
운영혁신 클래스룸 파일 (`gTtfe482laJNGbTjKT7zLl`) > 프로젝트 페이지 > **frame `43:1781` ("1280~")** 가 모든 신규 시안의 출발선입니다. 직접 만들지 않고 통째로 복제 후 콘텐츠만 교체하세요.

---

## 1. 디폴트 레이아웃 구조

```
[1280 wide, VERTICAL, padding 0, gap 0, bg white]
├ GNB (1280×64)        ← 라이브러리 인스턴스 Navigaion/GNB/LIKELION
│                          variant: Breakpoint=PC(~1024), State=Login
├ Container (HORIZONTAL)
│   ├ Lnb (244 wide, padding 48 24, gap 28, border weak right)
│   │   ├ Profile (220×52)   ← 라이브러리 인스턴스 Profile + Classroom/Tag(상태=수강생)
│   │   └ LNB (220×auto)     ← 라이브러리 인스턴스 LNB
│   │                            variant: 구분=KDT
│   │                            메뉴 아이템 variant: actived=on/off
│   └ Contents (1036 wide, padding 48 24, gap 24, bg white)
│       ├ Header (988×auto, GRID)
│       │   ├ 페이지 제목 (textStyle: heading/h3 27|600)
│       │   └ ActionButton 인스턴스
│       │       variant: size=large, type=solid, hierarchy=primary, state=enabled
│       └ wrapper (988×auto, VERTICAL, gap 48)
│           ├ ul-project (gap 24)
│           │   └ li-project N개 (padding 20, gap 16, radius 12, bg white, border weak)
│           └ pagination 인스턴스 (988×28)
└ Footer (1280×460)    ← 라이브러리 인스턴스 Footer/Bootcamp
                          variant: Breakpoint=Tablet(~1023)
```

**원칙**: GNB / LNB / Profile / Footer / Pagination / ActionButton / Tab / Tag — **자체로 그리지 마세요. 라이브러리 인스턴스만 사용.**

---

## 2. 신규 시안 그리는 절차

1. **디폴트 frame `43:1781` 통째로 복제** (Cmd+D 또는 plugin clone)
2. **위치**: 기존 시안 옆에 (x = 직전 frame.x + 1280 + 120 정도)
3. **이름 변경**: `프로젝트 — {화면명} ({버전})` 형식
4. **Contents > wrapper 안 자식 모두 제거** 후 새 콘텐츠 추가
5. **Header**의 페이지 제목 / ActionButton 라벨만 새 화면에 맞게 교체
6. **모든 색·여백·텍스트는 토큰/스타일에 binding** (다음 절 참조)

---

## 3. 컴포넌트 인스턴스 사용 패턴

### 3-1. Tag (회차·단계 표시)

variant 4축: `type`, `size`, `state`, `color`. 멋사 Tag는 weak 타입일 때 state·color 조합이 정해져 있어요.

| 의도 | 라벨 | type | state | color | size |
|---|---|---|---|---|---|
| 회차: 기초 | "기초" | weak | success | light-green | s |
| 회차: 심화 | "심화" | weak | warning | yellow | s |
| 회차: 파이널 | "파이널" | weak | error | red | s |
| 회차: 기타 | "기타" | weak | enabled | neutral | s |
| 단계: 제출 진행 | "제출 진행" | weak | success | light-green | s |
| 단계: 종료 | "종료" | weak | enabled | neutral | s |
| 본인 제출 완료 | "내 제출 완료" | weak | enabled | green | s |

**중요**: 위 조합이 아닌 다른 state-color 조합은 멋사 Tag variant에 없어서 setProperties 시 fail 합니다.

### 3-2. Tab (탭 그룹)

라이브러리 `Tab` component_set 사용. 활성 탭만 selected/pressed variant로 변경.

### 3-3. ActionButton (CTA)

| 케이스 | size | type | hierarchy | state |
|---|---|---|---|---|
| 페이지 헤더 메인 CTA | large | solid | primary | enabled |
| 카드 안 보조 액션 | medium | outline | neutral | enabled |
| 인라인 텍스트 액션 | medium | ghost | primary | enabled |

### 3-4. LNB 메뉴 아이템

라이브러리 `Item` 인스턴스. 현재 화면에 해당하는 메뉴 1개만 `actived=on`, 나머지는 모두 `actived=off`.

### 3-5. 카드 (li-project — 자체 frame)

라이브러리에 카드 컴포넌트가 없어서 자체로 그립니다. 다만 다음 3-row 구조로 통일:

```
li-project (VERTICAL, padding 20, gap 16, radius 12, bg white, border weak)
├ TagRow (HORIZONTAL, gap 8)         ← Tag 인스턴스 가로 N개
├ TitleRow (HORIZONTAL, gap 8, vertical CENTER)
│   ├ 제목 text (subtitle/p1, FILL horizontal)
│   └ ⋯ 메뉴 (body/p2, fg/assistive)
└ MetaRow (HORIZONTAL, gap 12, layoutWrap WRAP)
    ├ Pill: 제출 기간 (라벨 subtitle/p3 + 값 body/p4)
    └ Pill: 피드백 기간
```

다양한 Tag 개수에서도 일관된 모양을 유지하기 위해 TagRow와 TitleRow를 명시적으로 분리하세요.

---

## 4. 토큰 binding 의무

### 4-1. 컬러 (Fill / Stroke / Text fill)

모든 색은 **변수(variable)에 binding**. raw hex 절대 입력 X.

자주 쓰는 semantic 토큰 (이름 → hex):
| 변수 | hex | 용도 |
|---|---|---|
| `color/bg/white` | `#FFFFFF` | 카드·LNB 배경 |
| `color/bg/normal` | `#F3F4F6` | 페이지 배경·meta-pill 배경 |
| `color/bg/primary-weak` | `#FFEFE5` | 활성 메뉴 배경 |
| `color/border/weak` | `#E5E7EA` | 모든 일반 border |
| `color/border/primary` | `#FF6000` | 강조 border |
| `color/fg/strong` | `#191F28` | 페이지 제목·카드 제목 |
| `color/fg/normal` | `#333D4B` | 본문 강조 |
| `color/fg/neutral` | `#4E5967` | 본문 |
| `color/fg/alternative` | `#6B7583` | 부제·메타 |
| `color/fg/assistive` | `#8A95A0` | 보조 텍스트·아이콘 |
| `color/fg/primary` | `#FF6000` | 강조 텍스트 (CTA 라벨 등) |
| `color/primary/700` | `#993A00` | 활성 메뉴 텍스트 |

전체 매핑은 [tokens.css](tokens.css) 참조.

### 4-2. Spacing (itemSpacing / padding)

모든 간격은 **semantic gap/padding variable에 binding**.

| px | gap variable | padding variable |
|---|---|---|
| 4 | gap/1 | padding/1 |
| 8 | gap/2 | padding/2 |
| 10 | — | padding/2_5 |
| 12 | gap/3 | padding/3 |
| 16 | gap/4 | padding/4 |
| 20 | gap/5 | padding/5 |
| 24 | gap/6 | padding/6 |
| 32 | gap/8 | padding/8 |
| 40 | gap/10 | padding/10 |
| 48 | gap/12 | padding/12 |

### 4-3. Typography (text style)

모든 텍스트에 **DS text style** 적용. 직접 fontSize/fontWeight 지정 금지.

| 스타일명 | px | weight | 용도 |
|---|---|---|---|
| `heading/h1 35 \| 600` | 35 | 600 | 랜딩 강조 |
| `heading/h2 31 \| 600` | 31 | 600 | 페이지 메인 제목 |
| `heading/h3 27 \| 600` | 27 | 600 | **디폴트 페이지 제목** |
| `heading/h4 23 \| 600` | 23 | 600 | 섹션 제목 |
| `heading/h5 21 \| 600` | 21 | 600 | 카드 강조 제목 |
| `heading/h6 19 \| 600` | 19 | 600 | 작은 제목 |
| `subtitle/p1 17 \| 600` | 17 | 600 | 카드 제목 |
| `subtitle/p2 15 \| 600` | 15 | 600 | 버튼·라벨 |
| `subtitle/p3 13 \| 600` | 13 | 600 | meta-pill 라벨 |
| `body/p1 17 \| 400` | 17 | 400 | 강조 본문 |
| `body/p2 15 \| 400` | 15 | 400 | 기본 본문 |
| `body/p3 13 \| 400` | 13 | 400 | 보조 본문 |
| `body/p4 12 \| 400` | 12 | 400 | meta-pill 값 |
| `body/p5 11 \| 400` | 11 | 400 | 가장 작은 보조 |

폰트는 자동으로 Pretendard (스타일이 정의한 family).

---

## 5. Width / Height 규약

### Width
자유. 외곽 1280, LNB 244, FILL 등 콘텐츠에 맞게.

### Height — **새로 만드는 자체 frame은 HUG**, 다음만 예외:

| 예외 | 이유 |
|---|---|
| **라이브러리 컴포넌트 인스턴스 전부** | 라이브러리 정의 그대로 유지 |
| **GNB** | 라이브러리 인스턴스, fixed 64 |
| **Lnb container (외곽 frame)** | FILL — Container height에 맞춤 |
| **Lnb 안의 LNB 라이브러리 인스턴스** | HUG (메뉴 콘텐츠에 맞춤) |

자체 frame은 신규 생성 시 `layoutSizingVertical = "HUG"` 또는 (VERTICAL frame) `primaryAxisSizingMode = "AUTO"` / (HORIZONTAL frame) `counterAxisSizingMode = "AUTO"`.

---

## 6. PM 프로토타입과 정확히 매핑

PM이 만든 HTML 프로토타입(`classroom/1-planning/prototype/`)은 데이터·상태·인터랙션의 진실. 시안 만들 때 PM 데이터에 정확히 맞춥니다.

### 매핑 룰
- **회차·단계 라벨**: PM `mock-data.js`의 `round` + `stageTag(p)` 결과 (today와 `submitTo` 비교)
- **기간 표기**: PM `fmtDate(p.submitFrom, { compact: true })`와 동일 포맷
- **본인 제출 여부**: PM `MOCK.projectSubmissions[p.id].find(s => s.studentId === sid)` 결과
- **마크다운 본문**: PM `mock-data.js`의 `description` 그대로

### 확인 방법
1. PM 프로토타입 서버 띄우기:
   ```bash
   cd classroom/1-planning/prototype && python3 -m http.server 8765
   open http://localhost:8765/project.html
   ```
2. 카드 클릭 → 학생 상세 진입
3. URL에 `?state=empty` 또는 `?state=error` 붙여 빈상태·에러 시안 확인
4. 우상단 토글로 학생뷰 ↔ 매니저뷰 전환

---

## 7. AI 도구(Claude Code) 활용

`use_figma` plugin API를 통해 토큰 binding·variant 적용·구조 변환을 자동화할 수 있어요. 가희(@design-classroom-lead)가 사용한 핵심 패턴:

### 자주 쓰는 명령
- **시안 새로 그리기**: "디폴트 frame 43:1781 통째로 복제해서 {화면명}으로 만들고 wrapper 안 콘텐츠만 교체해줘"
- **토큰 binding**: "모든 fill/stroke/spacing/text fill을 DS semantic variable에 binding해줘"
- **카드 구조 통일**: "card_심화 기준으로 다른 카드도 TagRow + TitleRow + MetaRow로 정리해줘"
- **height 규약**: "모든 frame height를 hug로 (라이브러리 인스턴스·GNB·Lnb container 제외)"
- **PM 데이터 적용**: "PM 프로토타입의 `{회차명}` 회차 데이터로 맞춰줘"

### 컴포넌트 키 / 스타일 키 / 변수 키 ref

자주 쓰는 키들이라 미리 알려두면 plugin code 작성이 빨라요. `search_design_system`으로 찾을 수도 있지만 ref 박제:

**라이브러리 키**: `lk-f763f94615479358918feb97f4d1d37867fb83f885381e78002b62f2d1f99afe2a82a11b9d19ae36c290311f640dcb3a1a00f6996347ef23e71638b45b77945f`

**핵심 component 키**:
- ActionButton: `247ed614094c875dbdaa20b25feb1fc42f6d1dea`
- Tab: `08f0613e521ae28a5b682649a89fb4e1c28fd9b5`
- Tag: `6415c70b91fbe9a9a16f4adcc6694913ab7f1623`
- Chip: `dfd90ea4ff45270d58b6801c6088fae1c0b9c8c5`

**전체 토큰/스타일 키 ref**: [tokens.css](tokens.css)에 정의된 변수들이 멋사 DS variable name과 1:1 매핑. plugin 작성 시 search_design_system으로 키 조회.

---

## 8. 자주 발생하는 함정

1. **Pretendard 폰트 미인식** — Mac에 설치되어 있어도 Figma plugin이 못 봄. 클라우드 폰트 등록이 진짜 답.
2. **Tag variant 조합 실패** — type=weak일 때 모든 color에 모든 state가 있지 않음. 위 3-1 표 참조.
3. **opacity가 들어간 fill** (예: `rgba(255,96,0,0.08)`) **을 variable binding하면 opacity 무시되어 풀 컬러로 보임**. 이 경우 `bg/primary-weak` 같은 별도 variable로 매핑.
4. **카드 안 row의 vertical sizing 누락** → height가 의도와 다르게 잡힘. 명시적으로 HUG 설정.
5. **자체로 GNB·Footer·LNB 그리지 말 것** — 라이브러리 인스턴스 한 번 다시 검색해서 swap.

---

## 9. 작업 산출물 박제

시안 완성 후 다음을 반드시:

1. **figma-links.yml에 등록** — [../figma-links.yml](../figma-links.yml) 에 screen key + node URL 등록
2. **prd_map 추가** — PRD ID와 매핑 (PRD ready-for-dev 게이트 통과 위해)
3. **ux-flows/{기능}.md** — Mermaid 플로우 + 디자인 결정 근거 (별도 작업)
4. **last_review 날짜 갱신**

예시:
```yaml
file_root: "https://www.figma.com/design/gTtfe482laJNGbTjKT7zLl/?node-id={node-id}"

screens:
  project-list:
    node: "10:628"
    url: "https://www.figma.com/design/gTtfe482laJNGbTjKT7zLl/?node-id=10-628"
    last_review: "2026-06-01"
  project-detail-student:
    node: "55:479"
    url: "..."
    last_review: "2026-06-01"

prd_map:
  PRD-classroom-detail:
    - project-list
    - project-detail-student
```

---

## 변경 이력

- 2026-06-01 — 가희(@design-classroom-lead) 초안. 프로젝트 페이지(목록 + 학생 상세) 시안 작업 기반.
