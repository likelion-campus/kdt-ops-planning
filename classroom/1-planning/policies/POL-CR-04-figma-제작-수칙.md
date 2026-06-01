---
id: POL-CR-04
title: "Figma 산출물 제작 수칙 v1.0 — 플래닝/디자인 정합 게이트"
owner: "@pm-classroom-lead"
co_owner: "@design-classroom-lead"
status: draft
version: 1.0
date: 2026-06-01
related_policy: [POL-CR-01-classroom-core-v1.2.md, POL-CR-03-운영-결정사항-통합.md]
canonical:
  - ../../2-design/CLAUDE.md
  - ../../2-design/design-system-reference/figma-workflow.md
  - ../../2-design/design-system-reference/README.md
applies_to:
  - 1-planning/figma-fullpage/
  - 1-planning/prototype/figma-frames/
  - 1-planning/prototype/ (대응 Figma 시안)
---

# POL-CR-04 — Figma 산출물 제작 수칙 v1.0

## 의도

플래닝 측에서 디자이너 또는 AI(`use_figma` / figma-use MCP 등)로 Figma 산출물(파일·페이지·프레임)을 만들 때, **디자이너(가희)가 정립한 캐노니컬 수칙을 무조건 우선 적용**한다. 본 정책은 1-planning 영역의 **게이트**다 — Figma 산출물 생성 직전 본 문서 §4 체크리스트를 통과한 뒤에만 진행한다.

## 단일 진실 (Canonical SSOT)

본 정책은 캐노니컬을 박제하지 않고 **참조**한다. 캐노니컬이 갱신되면 본 정책은 §4 게이트만 갱신하면 된다.

| 항목 | Canonical 경로 |
|---|---|
| AI 자동 적용 규약 (Hard Rules) | [`../../2-design/CLAUDE.md`](../../2-design/CLAUDE.md) |
| 사람용 작업 가이드 | [`../../2-design/design-system-reference/figma-workflow.md`](../../2-design/design-system-reference/figma-workflow.md) |
| 토큰 색인 | [`../../2-design/design-system-reference/README.md`](../../2-design/design-system-reference/README.md) |
| 토큰 dump (시점 스냅샷) | [`../../2-design/design-system-reference/tokens.css`](../../2-design/design-system-reference/tokens.css) |

---

## 1. 적용 범위

| 적용 | 비적용 |
|---|---|
| `1-planning/figma-fullpage/` 블루프린트가 지정하는 Figma 파일 | 캠프파이어 팀 산출물 (별도 POL-CF-* 신설) |
| `1-planning/prototype/figma-frames/` 같은 어노테이션 보드 | 디자이너가 가이드 외 단독으로 만드는 탐색본(`2-design/explorations/`) — 디자이너 재량 |
| PM/PD가 figma-use MCP / `use_figma` 도구로 직접 만드는 frame | — |
| 본 정책 채택 이후 디자이너와 PM이 협의해 만드는 모든 신규 frame | — |

---

## 2. Hard Rules 요약 — 캐노니컬 절대 우선

본 §의 모든 항목은 [`2-design/CLAUDE.md`](../../2-design/CLAUDE.md) Hard Rules와 1:1 매핑된다. **충돌 시 캐노니컬 우선.**

| # | 규약 | 캐노니컬 § |
|---|---|---|
| H1 | 신규 화면은 디폴트 frame `43:1781` (파일 `gTtfe482laJNGbTjKT7zLl`) 통째로 복제 후 콘텐츠만 교체. 처음부터 그리지 않음 | `CLAUDE §1` |
| H2 | GNB / Footer / LNB / Profile / Pagination / ActionButton / Tab / Tag / Chip / Toggle / TextField / Dialog / Toast / Tooltip — **라이브러리 인스턴스만 사용**. 자체 frame X | `CLAUDE §2` |
| H3 | 모든 컬러는 **DS variable binding**. raw hex 입력 X. opacity 있는 fill은 `bg/primary-weak` 같은 별도 semantic으로 매핑 | `CLAUDE §3` |
| H4 | 모든 spacing은 **DS variable binding** — `gap/N`, `padding/N` semantic. raw px 입력 X | `CLAUDE §4` |
| H5 | 모든 텍스트는 **DS text style** 적용 (`setTextStyleIdAsync`). raw fontSize/fontWeight 지정 X. 페이지 제목은 `heading/h3 27\|600` 기본 | `CLAUDE §5` |
| H6 | Height — 자체 frame은 모두 **HUG**, 라이브러리 인스턴스/GNB(fixed 64)/Lnb container(FILL)는 예외 | `CLAUDE §6` |
| H7 | 카드(li-project 류)는 3-row 구조: **TagRow + TitleRow + MetaRow** | `CLAUDE §7` |
| H8 | LNB 메뉴 — 현재 화면에 해당하는 메뉴 1개만 `actived=on`, 나머지 모두 `actived=off` | `CLAUDE §8` |
| H9 | PM 프로토타입(`1-planning/prototype/mock-data.js`)과 정확히 매핑 — 회차·단계·기간·본문 모두 mock + `stageTag(p)` 그대로 | `CLAUDE §9` |

상세는 캐노니컬 본문 참조. 본 표는 게이트 점검용 요약일 뿐.

---

## 3. 사전 셋업 점검 (워크스페이스당 1회)

신규 워크스페이스/조직에서 작업 시작할 때만 점검. 기존 워크스페이스에선 묻지 않는다.

- [ ] **Pretendard 폰트** — Figma 워크스페이스에 클라우드 폰트 등록됨? (2026-06-01 가희 등록 완료)
- [ ] **DS 라이브러리** — 작업 파일에 `멋쟁이사자처럼 Design System` + `02 LDS_Icons` + `99 LDS_Helper` 활성?
- [ ] **디폴트 frame** — `gTtfe482laJNGbTjKT7zLl > 43:1781` 존재 확인?

미통과 시 [figma-workflow.md §0](../../2-design/design-system-reference/figma-workflow.md) 참조.

---

## 4. Figma 생성 게이트 (산출물 만들기 직전 필수)

> **PM/PD/AI가 새 Figma 산출물을 만들기 직전 본 체크리스트를 통과해야 한다.** 미통과 항목이 1개라도 있으면 진행 보류 → 캐노니컬 재확인 → 보완 후 재진입.

### 4.1 시작 전

- [ ] §3 사전 셋업 모두 ✅ 상태?
- [ ] 산출물의 목적·범위가 [PRD-classroom-detail-v1.2.md](../prd/PRD-classroom-detail-v1.2.md) 또는 [블루프린트](../figma-fullpage/)에 명시되어 있음?
- [ ] 산출물 위치 결정: 1-planning 박제(`figma-fullpage/` 또는 `prototype/figma-frames/`) vs 2-design 박제(디자이너 영역)?

### 4.2 신규 frame 생성 시

- [ ] **H1 준수** — 디폴트 frame `43:1781` 복제 패턴으로 시작? (자체 GNB·LNB·Footer 그리지 않음 / 처음부터 그리지 않음)
- [ ] frame 명명 — `프로젝트 — {화면명} ({버전})` 형식?
- [ ] 위치 — x = 직전 frame.x + 1280 + 120 (옆으로 늘어놓기)?

### 4.3 컴포넌트 / 스타일 적용 시

- [ ] **H2 준수** — 사용 컴포넌트가 라이브러리 인스턴스 의무 목록(`GNB/Footer/LNB/Profile/Pagination/ActionButton/Tab/Tag/Chip/Toggle/TextField/Dialog/Toast/Tooltip`)에 있다면 인스턴스로 들어감?
- [ ] **H3 준수** — 모든 fill/stroke/text fill이 DS variable binding?
- [ ] **H4 준수** — 모든 itemSpacing/padding이 gap/padding semantic binding?
- [ ] **H5 준수** — 모든 텍스트에 DS text style 적용?
- [ ] **H6 준수** — height 규약 (자체 frame HUG, 예외 명시)?
- [ ] **H7 준수** — 카드라면 TagRow + TitleRow + MetaRow 3-row 구조?

### 4.4 데이터 매핑

- [ ] **H9 준수** — PM 프로토타입(`1-planning/prototype/`)에 대응 데이터가 있다면 `mock-data.js` + `stageTag(p)` 기준 매핑?
- [ ] Tag variant — [`2-design/CLAUDE.md` §"Tag variant 매핑 표"](../../2-design/CLAUDE.md)의 허용 조합만 사용? (위 표 외 조합은 멋사 Tag variant에 없어 fail)

### 4.5 작업 후 박제

- [ ] [`2-design/figma-links.yml`](../../2-design/figma-links.yml)에 screen key + node URL 등록?
- [ ] PRD ID와 매핑(`prd_map`) 추가?
- [ ] `last_review` 날짜 갱신?
- [ ] 1-planning 측 박제라면 — 본 정책의 `applies_to` 경로(`figma-fullpage/` 또는 `prototype/figma-frames/`)에 README + node-id 인덱스 작성?
- [ ] **H8 준수** — LNB 메뉴 active 상태 화면별로 검증?

---

## 5. 캐노니컬과 충돌 시

본 정책 / 어떤 블루프린트 / PRD가 캐노니컬과 충돌한다면 **캐노니컬 우선**, 충돌 측 갱신.

단, **캐노니컬 자체에 명백한 누락이 있다면**:
1. 디자이너(@design-classroom-lead)에게 보고
2. 디자이너가 캐노니컬 갱신
3. 본 정책 §2 / §4 갱신

캐노니컬을 우회하거나 본 정책에 새 Hard Rule을 추가해 캐노니컬을 추월하지 않는다.

---

## 6. AI(use_figma / figma-use MCP) 사용 시 추가 가이드

본 정책의 모든 항목은 AI 도구가 1-planning 영역에서 Figma 산출물을 만들 때도 동일하게 적용된다.

| 상황 | 즉시 적용 (캐노니컬에 박제) | 게이트 통과 후 진행 |
|---|---|---|
| "시안 만들어줘" | §3 사전 셋업·디폴트 frame·라이브러리·토큰 binding | §4.1·4.2·4.3 |
| "토큰 binding 해줘" | 모든 fill/stroke/spacing/text fill을 DS semantic | §4.3 (H3/H4/H5) |
| "카드 구조 통일" | TagRow + TitleRow + MetaRow | §4.3 (H7) |
| "PM 데이터 적용" | mock-data.js + stageTag(p) 매핑 | §4.4 (H9) |
| "새 파일 만들어줘" | **잠시 멈춤** — 기존 파일(`gTtfe482laJNGbTjKT7zLl`)이 캐노니컬. 신규 파일이 정말 필요한지 디자이너에게 확인 | §4.1 |

---

## 7. 변경 이력

| 버전 | 일자 | 변경 |
|---|---|---|
| v1.0 | 2026-06-01 | 최초 — 2026-06-01 가희 캐노니컬(`2-design/CLAUDE.md` + `figma-workflow.md` + `design-system-reference/README.md`) 기준 박제. 1-planning 측 Figma 산출물 생성 게이트로 신설. |

---

## 관련 문서

- [POL-CR-01](POL-CR-01-classroom-core-v1.2.md) — 클래스룸 핵심 정책
- [POL-CR-03](POL-CR-03-운영-결정사항-통합.md) — 운영 결정사항 통합
- [`2-design/CLAUDE.md`](../../2-design/CLAUDE.md) — 캐노니컬 (AI 자동 적용 규약) ⭐
- [`2-design/design-system-reference/figma-workflow.md`](../../2-design/design-system-reference/figma-workflow.md) — 캐노니컬 (사람용 절차) ⭐
- [`figma-fullpage/blueprint-figma-fullpage-v2.4.md`](../figma-fullpage/blueprint-figma-fullpage-v2.4.md) — 본 정책 v1.0 채택 후 갱신 대상 (draft, 본인 작업 중)
