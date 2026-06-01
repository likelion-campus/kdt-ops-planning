# classroom/2-design/CLAUDE.md

> **이 파일은 AI 자동 적용 규약**입니다. classroom/2-design 영역에서 Claude가 시안·디자인 작업을 할 때 무조건 따릅니다. 사람이 읽는 가이드는 [design-system-reference/figma-workflow.md](design-system-reference/figma-workflow.md).

## 사용자 의도

가희님(@design-classroom-lead)이 "시안 만들어줘"라고 하면, 아래 규약을 **묻지 말고 즉시 적용**해서 그린다. 다른 작업자가 같은 영역에서 요청해도 동일.

---

## Hard Rules — 자동 적용 (예외 없음)

### 1. 디폴트 frame 통째로 복제부터

신규 화면 시안은 **frame `gTtfe482laJNGbTjKT7zLl > 43:1781` ("1280~")** 을 clone 후 콘텐츠만 교체한다. 처음부터 그리지 않는다.

```js
const original = await figma.getNodeByIdAsync("43:1781");
const cloned = original.clone();
cloned.name = "프로젝트 — {화면명} ({버전})";
cloned.x = original.x + original.width + 120;
figma.currentPage.appendChild(cloned);
// 이후 Contents > wrapper 안 자식만 제거 후 새 콘텐츠 추가
```

### 2. GNB / Footer / LNB / Profile / Pagination / ActionButton / Tab / Tag / Chip / Toggle / TextField / Dialog / Toast / Tooltip 등 **라이브러리 인스턴스만 사용**

자체 frame으로 그리지 않는다. 라이브러리에 컴포넌트가 없을 때만 자체 frame 허용 (이 경우도 토큰 binding 의무).

### 3. 모든 컬러는 DS variable binding

raw hex 입력 X. 모든 fill / stroke / text fill을 멋사 DS semantic variable에 binding. opacity가 있는 fill(예: `rgba(255,96,0,0.08)`)은 `bg/primary-weak` 같은 별도 semantic variable로 매핑.

### 4. 모든 spacing은 DS variable binding

`itemSpacing` → `gap/N` semantic variable, `paddingTop/Right/Bottom/Left` → `padding/N` semantic variable. raw px 입력 X.

| px | gap | padding |
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

### 5. 모든 텍스트는 DS text style 적용

`setTextStyleIdAsync`로 적용. raw fontSize / fontWeight 지정 X. 페이지 제목은 **`heading/h3 27|600`** 기본 (디폴트 frame과 동일).

| 용도 | 스타일 |
|---|---|
| 페이지 제목 | heading/h3 27\|600 |
| 섹션 제목 | heading/h4 23\|600 |
| 카드 강조 제목 | heading/h5 21\|600 |
| 카드 제목 | subtitle/p1 17\|600 |
| meta-pill 라벨 | subtitle/p3 13\|600 |
| 기본 본문 | body/p2 15\|400 |
| 보조 본문 | body/p3 13\|400 |
| meta-pill 값 | body/p4 12\|400 |

### 6. Height 규약

- **자체 생성 frame**: 모두 HUG (`layoutSizingVertical = "HUG"`)
- **라이브러리 컴포넌트 인스턴스 전부**: 라이브러리 정의 그대로 유지, 변경 X
- **GNB**: 라이브러리 인스턴스, fixed 64 유지
- **Lnb container (외곽 frame)**: FILL (Container height에 맞춤)
- **Lnb 안의 LNB 라이브러리 인스턴스**: HUG (메뉴 콘텐츠에 맞춤)

### 7. 카드(li-project 류)는 3-row 구조로 통일

```
Card (VERTICAL, padding 20, gap 16, radius 12, bg/white, border/weak):
├ TagRow (HORIZONTAL, gap 8)         ← Tag 인스턴스 가로 N개
├ TitleRow (HORIZONTAL, gap 8)       ← 제목(FILL) + ⋯ 메뉴
└ MetaRow (HORIZONTAL, gap 12, WRAP) ← Pill 두 개 (제출/피드백 기간)
```

다양한 Tag 개수에서도 일관된 모양을 위해 TagRow와 TitleRow를 명시적으로 분리.

### 8. LNB 메뉴 active 처리

LNB 인스턴스 안 `Item` 인스턴스들 중 **현재 화면 메뉴 1개만 `actived=on`**, 나머지 모두 `actived=off`로 setProperties.

### 9. PM 프로토타입과 데이터 정확히 매핑

회차·단계·기간·본문은 **PM mock-data.js + stageTag(p) 로직** 그대로:
- 회차 라벨: `p.round`
- 단계 라벨: today vs `p.submitTo` → "제출 진행" or "종료"
- 기간 포맷: `fmtDate(p.submitFrom, { compact: true })` 동일
- 본인 제출: `MOCK.projectSubmissions[p.id].find(s => s.studentId === sid)` → "내 제출 완료" Tag 추가

PM prototype 경로: `classroom/1-planning/prototype/`

---

## Tag variant 매핑 표 (멋사 Tag의 type=weak일 때 사용 가능한 조합만)

| 의도 라벨 | type | state | color | size |
|---|---|---|---|---|
| "기초" | weak | success | light-green | s |
| "심화" | weak | warning | yellow | s |
| "파이널" | weak | error | red | s |
| "기타" | weak | enabled | neutral | s |
| "제출 진행" | weak | success | light-green | s |
| "종료" | weak | enabled | neutral | s |
| "내 제출 완료" | weak | enabled | green | s |

위 외 조합은 멋사 Tag variant에 없음. setProperties 시 fail. 위 표에서 벗어나지 말 것.

---

## 핵심 키 ref (코드 작성용)

**라이브러리 키**: `lk-f763f94615479358918feb97f4d1d37867fb83f885381e78002b62f2d1f99afe2a82a11b9d19ae36c290311f640dcb3a1a00f6996347ef23e71638b45b77945f`

**Component 키**:
- ActionButton: `247ed614094c875dbdaa20b25feb1fc42f6d1dea`
- Tab: `08f0613e521ae28a5b682649a89fb4e1c28fd9b5`
- Tag: `6415c70b91fbe9a9a16f4adcc6694913ab7f1623`
- Chip: `dfd90ea4ff45270d58b6801c6088fae1c0b9c8c5`

**자주 쓰는 Color variable 키**:
- bg/white: `c93db6d2d282f021c949ed13c11ee3ff12442261`
- bg/normal: `e3eace7b811306ebf3c28335584d8f7e7d9d823e`
- bg/primary-weak: `e4f40cd83cfced46d8a40ae441cd5b33be7aeeda`
- border/weak: `989ae4f28ffef4f230a9c4dea44fb99178960af9`
- fg/strong: `dc48be56aba163dc36deb6add16d7ea482d3700c`
- fg/neutral: `a7fbeadab1dfd852a9e3ae9cc5bf96795d3fdd75`
- fg/assistive: `bfee6909bda0e0ff1e3349d2d3f543adbbe6e6b2`
- fg/alternative: `40f0b626f26d34392b2bc70b7fb8aaa7890f4b1d`
- primary/700: `6dc094c36b11d35a9a3e6c626b438303d5684885`

**자주 쓰는 Text style 키**:
- heading/h3 27|600: `a09004f46b6d3db77409371ab6ef0df9cd71a3b9`
- heading/h4 23|600: `c87260dc8ef5f632b0198e7a6803fb627eae06fe`
- heading/h5 21|600: `f336199d3908e6340f0258f5eee9850e5bfcdb0b`
- subtitle/p1 17|600: `67fac23e77ee512c350806a4ce0a8c7cc96378eb`
- subtitle/p3 13|600: `d24183bd499f689cbc33862bae0012e46388d30c`
- body/p2 15|400: `b316ad9e5c0ef303963741e2b3fc1e1222f4030d`
- body/p3 13|400: `81fed4b7cb1e119c4cc767d870a6779deee8529b`
- body/p4 12|400: `02b59f2b07fff0aacadddd42075d3fcd4fa995de`

**Spacing variable 키** (gap):
- gap/1 (4): `d909c2cc65aed432688e39777c2c500d514158eb`
- gap/2 (8): `161d5fcc8b672da2bf7cb8537800bffb27bc4731`
- gap/3 (12): `373c878d82d1586c4c96c5c5e9980e419eaef957`
- gap/4 (16): `d33cc7b18f94e5de5f25adf9efad9ecdb5ac05d4`
- gap/6 (24): `d0bb3c994f46987c97246099bfad0e614a3f7b9c`

**Spacing variable 키** (padding): 동일 N 스케일, search_design_system으로 추가 조회 가능.

---

## 작업 후 자동으로 할 것

1. **screenshot 검증**: `get_screenshot`으로 결과 확인 후 가희님께 보고
2. **figma-links.yml 등록 제안**: 신규 시안 완성 시 [../figma-links.yml](../figma-links.yml)에 등록 권유
3. **변경 사항 commit 제안**: 가희님이 push 요청 시 conventional commit 스타일로

---

## 묻지 않아도 되는 것

- 폰트 설치 여부 (✅ 클라우드 등록됨, 자동 사용)
- 라이브러리 등록 여부 (✅ 가희님 파일에 등록됨)
- 디폴트 레이아웃 (✅ 위 §1의 frame 43:1781)
- 카드 구조 (✅ §7 3-row)
- height 규약 (✅ §6)

## 묻고 진행할 것

- 어떤 화면을 그릴지 (PRD §몇 / 학생뷰·매니저뷰 / 빈상태·에러)
- PM 데이터 어떤 회차 기준인지 (proj-base / proj-deep / proj-final / proj-misc)
- 작업 산출물 push 여부

---

관련: [shared/CLAUDE.md](../../shared/CLAUDE.md) · [classroom/CLAUDE.md](../CLAUDE.md) · [design-system-reference/figma-workflow.md](design-system-reference/figma-workflow.md) (사람용)
