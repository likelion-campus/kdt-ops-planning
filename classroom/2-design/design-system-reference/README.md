# 멋쟁이사자처럼 Design System — 토큰 전체 참조

> 디자이너(가희)가 시안 작업할 때 곁에 두는 토큰 색인.
> SSOT는 Figma library + storybook 레포. **이 문서는 색인일 뿐, 값을 정의하지 않음**.

**시안 작업 절차는 별도 가이드**: [figma-workflow.md](figma-workflow.md) — 디폴트 레이아웃·라이브러리 사용·토큰 binding·height 규약·PM 프로토타입 매핑 등 작업 흐름 전체.

## 디자인시스템 정체

- **Figma 라이브러리**: `멋쟁이사자처럼 Design System` (`fileKey: YYBmxUiSu1G3RQxQrbycoV`)
- **npm 패키지**: [`@likelion-design/ui`](https://www.npmjs.com/package/@likelion-design/ui) (FE가 쓰는 React 컴포넌트 + tokens)
- **소스 레포**: `~/Desktop/glob-storybook` (develop 브랜치)
- **Storybook 라이브 데모**: http://localhost:6006

추가로 Figma에 같이 등록된 관련 라이브러리:
- `04 LDS_Core Components`, `03 LDS_Images`, `01 LADS_Styles` 등 — 멋사 내부 LDS family
- `클래스룸 (부트캠프)` — 가희님 작업 도메인 라이브러리 ⭐
- `멋쟁이사자처럼 Design Library (제작중)` — 종합 라이브러리

## 토큰 총 274개 — 카테고리 요약

| 그룹 | 개수 | naming | 용도 |
|---|---|---|---|
| **Color — Primitive** | 102 | `--color-{family}-{step}` | 원자색. `basic` (white/black + 11단계 opacity scale × 3), `gray` (12), `primary/blue/green/light-green/pink/purple/red/yellow` (각 10) |
| **Color — Semantic** | 62 | `--color-semantic-{prop}-{name}-{state}` | 의미별. `bg-*`, `border-*`, `fg-*`, `state-*`, `style-*` |
| **Font — Primitive** | 24 | `--font-primitive-{kind}-{name}` | size (display/heading/subtitle/body × 단계) / weight (5) / letter-spacing (3) / family (1) |
| **Spacing — Primitive** | 14 | `--spacing-primitive-{n}` | 1=4px, 2=8px, ... 16=64px |
| **Gap — Semantic** | 13 | `--gap-semantic-*` | 컴포넌트별 권장 간격 |
| **Padding — Semantic** | 11 | `--padding-semantic-*` | 컴포넌트별 권장 패딩 |
| **Radius — Primitive** | 11 | `--radius-primitive-{xs/sm/md/lg/xl/full/...}` | 모서리 |
| 기타 | 37 | `--background`, `--foreground`, `--font-sans/mono`, `--Boolean-primitive` 등 | 보일러플레이트 |

→ **로컬 dump**: [tokens.css](tokens.css) (353줄, 모든 변수 = manager-tokens 복사본)
→ Storybook의 원본 위치: `~/Desktop/glob-storybook/public/manager-tokens.css`

## 컬러 — Primitive 팔레트 (10단계 스케일)

| Family | 50 | 100 | 300 | 500 (base) | 700 | 900 | 용도 |
|---|---|---|---|---|---|---|---|
| **primary** ⭐ | `#FFEFE5` | `#FFDFCC` | `#FFA066` | **`#FF6000`** | `#993A00` | `#4D1D00` | KDT 브랜드 오렌지 |
| gray | `#F9FAFB` | `#F3F4F6` | `#D1D6DC` | `#8A95A0` | `#4E5967` | `#191F28` | 텍스트·테두리·배경 |
| red | `#FDF0F3` | `#FFCCD8` | `#FFA5B4` | `#F64C4C` | `#AD1625` | `#6E0A1E` | error, danger |
| yellow | `#FFF8E4` | `#FFEEBF` | `#FFD456` | `#FFB700` | `#AA7900` | — | warning |
| green | `#E4FAF5` | `#C4F8EB` | `#7EDDCD` | `#0DA796` | `#006D5D` | — | progressing |
| light-green | `#F2FDE3` | `#D7F2B1` | `#B0D55C` | `#79B116` | `#2D660A` | — | success |
| blue | `#E5F5FF` | `#CCEBFF` | `#80C6FB` | `#3D94FF` | `#045CA9` | — | info |
| purple | `#F9EFFF` | `#F0D6FF` | `#D7AAFF` | `#AF79DD` | `#734098` | — | accent |
| pink | `#FFF3FF` | `#FFD2FF` | `#FF9EEE` | `#D3689F` | `#A02C6D` | — | accent |

> 추가로 각 family에는 200/400/600/800 단계도 있음 (총 10단계). gray만 12단계 (+850, 950).

### 투명도 스케일 (basic-opacity)
`--color-basic-opacity-{tone}-{percent}`
- tone: `neutral-light` (white) / `neutral-dark` (black) / `primary` (오렌지)
- percent: 0, 2, 4, 6, 8, 16, 24, 48, 56, 72, 80, 90 (총 12단계)
- 예: `--color-basic-opacity-primary-8` = `rgba(255, 96, 0, 0.08)` (오렌지 그림자 / hover)

## 컬러 — Semantic (의미 기반)

> "어떤 색을 쓸지" 결정할 때 첫 번째로 보는 곳. 컴포넌트 외관에 직접 매핑.

| 그룹 | 토큰 예 | 용도 |
|---|---|---|
| **bg** | `bg-normal`, `bg-primary`, `bg-primary-weak`, `bg-primary-hovered`, `bg-disabled`, `bg-inverted` (다크), `bg-{state}` (yellow/green/blue/...) | 배경 |
| **border** | `border-primary`, `border-strong`, `border-normal`, `border-weak` | 테두리 |
| **fg** | (구버전 기준 — manager-tokens.css에 없음, primitive로 직접 사용 권장) | 텍스트·아이콘 |
| **state** | `state-danger`, `state-success`, `state-warning`, `state-info` | 알림·상태 |
| **style** | `style-gradation-primary`, `style-gradation-dark`, `style-dim` | 그라데이션·딤 |

### 자주 쓰는 시맨틱 패턴
```css
/* 기본 페이지 배경 */              var(--color-semantic-bg-normal)         /* = gray-100 */
/* 카드/표면 */                     var(--color-semantic-bg-white)          /* = white */
/* 위에 가벼운 강조 (hover) */      var(--color-semantic-bg-weak-primary)   /* = rgba(255,96,0,0.08) */
/* CTA 버튼 */                      var(--color-semantic-bg-primary)        /* = primary-500 */
/* CTA 버튼 hover */                var(--color-semantic-bg-primary-hovered) /* = primary-600 */
/* 강조 본문 텍스트 */              var(--color-gray-900)
/* 일반 본문 */                     var(--color-gray-800) ~ 700
/* 보조 텍스트 */                   var(--color-gray-500) ~ 600
```

## 타이포 — 모든 variant

```
display-d1  52px / 600 / 1.3
display-d2  44px / 600 / 1.3
display-d3  32px / 600 / 1.3
display-d4  27px / 600 / 1.3

heading-h1  35px / 600 / 1.3
heading-h2  31px / 600 / 1.3
heading-h3  27px / 600 / 1.3
heading-h4  23px / 600 / 1.3
heading-h5  21px / 600 / 1.3     ← 가희님이 잡아주신 그것
heading-h6  19px / 600 / 1.3

subtitle-p1 17px / 600 / 1.3
subtitle-p2 15px / 600 / 1.3
subtitle-p3 13px / 600 / 1.6

body-p1     17px / 400 / 1.6
body-p2     15px / 400 / 1.6     ← 기본 본문
body-p3     13px / 400 / 1.6
body-p4     12px / 400 / 1.6
body-p5     11px / 400 / 1.6
```

- Weight: extrabold 800 / bold 700 / semibold 600 / medium 500 / regular 400
- Letter-spacing: tight `-0.3px` (대부분 본문) / normal 0 / loose 1px
- Font family: Pretendard (한/영 통합)

[Figma Typography 페이지](https://www.figma.com/design/YYBmxUiSu1G3RQxQrbycoV/?node-id=3-7)에 같은 표가 시각화되어 있음. Variants 테이블이 디자인 SoT.

## Spacing / Gap / Padding

```
spacing-primitive-1   4px
spacing-primitive-2   8px
spacing-primitive-3   12px
spacing-primitive-4   16px      ← 기본 단위
spacing-primitive-5   20px
spacing-primitive-6   24px
spacing-primitive-8   32px
spacing-primitive-10  40px
spacing-primitive-12  48px
spacing-primitive-16  64px
```

`gap-semantic-*` 및 `padding-semantic-*`는 컴포넌트별 권장 간격(13/11 토큰). 자체 정의 필요할 때만 보고, 평소엔 컴포넌트가 알아서 적용.

## Radius

```
radius-primitive-xs   4px
radius-primitive-sm   6px
radius-primitive-md   8px       ← 카드·버튼 기본
radius-primitive-lg   12px      ← 상위 카드·모달
radius-primitive-xl   16px
radius-primitive-full 9999px    ← Pill / 원형
```

## 가희님이 어디서 어떻게 토큰을 쓰는가

### 1. Figma 시안 작업할 때
- Figma 우측 패널의 **Variables** 섹션에서 해당 라이브러리(`멋쟁이사자처럼 Design System`) 선택
- Fill/Stroke/Typography 모두 토큰 변수로 지정 — 절대 hex 직접 입력 X
- **Figma library 이미 등록되어 있음** (위 get_libraries 결과 확인)

### 2. 시안을 코드 데모로 옮길 때
- `classroom/2-design/explorations/project/` (재작성본) — storybook 컴포넌트 클래스 그대로
- `classroom/2-design/explorations/project-pm-restyled/` (미러본) — PM 구조 + 토큰만 storybook

### 3. 새 화면 디자인할 때 권장 흐름
1. **컴포넌트 우선 결정** — storybook에 있는 ActionButton/Tab/Tag/Chip 등 골라서 시안에 배치
2. **여백·radius는 primitive 스케일에서만** — 자주 쓰는 건 4/8/12/16/24/32/48
3. **컬러는 semantic 우선** — `bg-primary` 같은 의미별 토큰. 시맨틱이 없으면 primitive로 fallback (`primary-500`)
4. **타이포는 variant 클래스** — `.typography--heading-h5` 같은 형태로 spec 명시 (FE가 그대로 가져감)

## 변경되면 어떻게 따라가는가

- 디자인시스템이 토큰 값을 바꾸면 → storybook 새 버전 npm 배포 → FE가 `npm update @likelion-design/ui` → 자동 반영
- 우리 `explorations/`의 `storybook-bundle.css` / `tokens.css`는 **시점 스냅샷**. 디자인시스템 업데이트 후 다시 sync 필요 (각 폴더 README의 "재생성" 절차 참고)
- 가희님 Figma 시안은 라이브러리 구독 중이면 자동 갱신 됨

## Figma에서 정확한 토큰 값을 도구로 받아오려면

`get_variable_defs` 호출은 Figma 앱의 **현재 selection**이 필요해요. 가희님이 Figma 데스크탑/브라우저에서 해당 노드를 클릭으로 선택하면, 그 selection을 기반으로 토큰 맵을 그대로 가져올 수 있어요. 지금처럼 selection 없는 호출은 "select a layer first" 에러.

## 관련 파일

- [tokens.css](tokens.css) — 274개 토큰 전체 정의 (이 폴더 안의 사본)
- [../explorations/project/](../explorations/project/) — 디자이너 재작성본 (storybook 클래스 직접 사용)
- [../explorations/project-pm-restyled/](../explorations/project-pm-restyled/) — PM 페이지 미러본 (토큰 alias)
- [../../1-planning/prototype/](../../1-planning/prototype/) — PM 원본
- [../README.md](../README.md) — Classroom 디자이너 가이드 (캐노니컬은 campfire/2-design/README.md)
