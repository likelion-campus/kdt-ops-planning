# Project page exploration

> ⚠️ **이것은 SSOT가 아닙니다.** 디자이너(가희) 탐색용 HTML 프로토타입.
> 정식 디자인 산출물은 Figma (등록 위치: [../../figma-links.yml](../../figma-links.yml)) + [../../ux-flows/](../../ux-flows/).

## 의도

[PRD-classroom-detail-v1.2 §4.5 프로젝트](../../../1-planning/prd/PRD-classroom-detail-v1.2.md#L327)를 **`@likelion-design/ui` 디자인 시스템 토큰·타이포·컴포넌트로 입혀본 탐색본**.
PM 프로토타입([../../../1-planning/prototype/project.html](../../../1-planning/prototype/project.html))은 자체 토큰(`--lk-*`)을 쓰고, 여기는 **글로벌 storybook의 토큰(`--color-*`)**을 쓴다는 차이.

## 출처

- 디자인 시스템: `@likelion-design/ui` (글로벌 storybook)
- 로컬 레포: `~/Desktop/glob-storybook` (develop 브랜치)
- Storybook 라이브 데모: http://localhost:6006 — `npm run storybook` from glob-storybook
- 토큰 출처 파일: `src/styles/globals.css` (CSS variables)
- 컴포넌트 CSS: `src/stories/{Component}/{component}.css`

## 사용 토큰 — 컬러

| 카테고리 | 토큰 prefix | 예 |
|---|---|---|
| Brand primary (KDT 오렌지) | `--color-primary-{50..900}` | `var(--color-primary-500)` = `#FF6000` |
| Gray scale | `--color-gray-{50..950}` | `var(--color-gray-700)` = `#4E5967` |
| State | `--color-red/yellow/green/blue/purple-{step}` | 상태 배지·알림 |
| Semantic FG | `--color-semantic-fg-{primary/normal/neutral/...}` | 텍스트 시맨틱 |
| Semantic BG | `--color-semantic-bg-{normal/primary/...}` | 배경 시맨틱 |

## 사용 토큰 — 타이포

`typography.css`의 `.typography--{variant}` 클래스 그대로 사용. 또는 Text 컴포넌트 흉내.

| Variant | 용도 |
|---|---|
| `display-d1`~`d4` | 마케팅·랜딩 (강조) |
| `heading-h1`~`h6` | 페이지·섹션 제목 |
| `subtitle-p1`~`p3` | 버튼·라벨 |
| `body-p1`~`p5` | 본문·설명 |

## 사용 컴포넌트 (PRD §4.5 매핑)

| PRD 요소 | storybook 컴포넌트 | 클래스 |
|---|---|---|
| 페이지 제목 "프로젝트" | Text variant=`heading-h2` | `.typography--heading-h2` |
| 회차 분류 탭 (기초/심화/파이널/기타) | TabGroup + Tab | `.tab-group .tab--round` |
| 상태 배지 (모집전·진행·종료) | Tag | `.tag .tag--weak .tag--{state}` |
| `프로젝트 제출하기` 버튼 | ActionButton size=`large` color=`primary` | `.action-button--large.action-button--primary.action-button--solid` |
| `프로젝트 등록하기` (매니저) | ActionButton size=`large` color=`primary` type=`outline` | 위 + `--outline` |
| 매니저뷰 토글 | Chip variant=`primary` | `.chip--solid.chip--medium` |
| 빈상태 안내 | Text + Icon | `.typography--body-p2` |

## 빌드/실행

### Storybook (컴포넌트 카탈로그)
```bash
cd ~/Desktop/glob-storybook
npm run storybook   # http://localhost:6006
```

### 이 exploration 정적 HTML
```bash
cd ~/kdt-ops-planning/classroom/2-design/explorations/project
python3 -m http.server 8766   # http://localhost:8766
```

## CSS 묶음 재생성

`assets/storybook-bundle.css`는 storybook의 src CSS를 cat으로 묶은 것. storybook이 업데이트되면 갱신 필요:

```bash
SB=~/Desktop/glob-storybook
{
  cat "$SB/src/styles/globals.css"
  cat "$SB/src/stories/Typography/typography.css"
  cat "$SB/src/stories/Button/ActionButton/action-button.css"
  cat "$SB/src/stories/Button/IconButton/icon-button.css"
  cat "$SB/src/stories/Tab/tab.css"
  cat "$SB/src/stories/Badge/badge.css"
  cat "$SB/src/stories/Tag/tag.css"
  cat "$SB/src/stories/Chip/chip.css"
  cat "$SB/src/stories/TextField/text-field.css"
  cat "$SB/src/stories/Dialog/dialog.css"
} > assets/storybook-bundle.css
```

> **장기적으로는** glob-storybook이 npm 패키지(`@likelion-design/ui`)로 게시되므로, FE가 구현할 때는 `npm install @likelion-design/ui` 후 `import "@likelion-design/ui/styles.css"` 한 줄로 끝남. 이 묶음은 디자인 탐색 단계에서만 사용.

## Figma 연결

작업이 진전되면 `../../figma-links.yml`에 다음 형태로 등록:

```yaml
file_root: "https://www.figma.com/design/{FILE_KEY}/classroom"

screens:
  project-list:
    node: "{node-id}"
    url: "https://www.figma.com/design/{FILE_KEY}/classroom?node-id={node-id}"
    last_review: "YYYY-MM-DD"
  project-detail:
    node: "{node-id}"
    url: "..."
    last_review: "YYYY-MM-DD"
  project-submit-form:
    node: "{node-id}"
    url: "..."
    last_review: "YYYY-MM-DD"

prd_map:
  PRD-classroom-detail:
    - project-list
    - project-detail
    - project-submit-form
```

## 변경 이력

- 2026-06-01: 초기 셋업 (가희). PRD §4.5 학생/매니저 카드 리스트 시안.
