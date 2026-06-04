# 클래스룸 프로토타입 v2.4

> [PRD-classroom-detail-v1.2.md](../prd/PRD-classroom-detail-v1.2.md) §4 디테일을 깊이 우선으로 프로토타이핑.
> 설계서: [blueprint-classroom-prototype-v2.md](./blueprint-classroom-prototype-v2.md)
> 기존 v1.2: [docs/handoff/prototype/classroom-v1.2/](../../../../../docs/handoff/prototype/classroom-v1.2/) (골든패스만)

## v2.4 변경점 (2026-06-05 코멘트 반영 · PRD v1.4 / POL-CR-03 v1.6)

> 정책: [POL-CR-03 v1.6](../policies/POL-CR-03-운영-결정사항-통합.md)

- **리네이밍** — 메뉴 `AI 퀴즈`→**`학습퀴즈`**, 일일 `오늘의 퀴즈`→**`학습퀴즈`** 통일 (AI 생성 액션 라벨은 유지)
- **학습퀴즈 응시시간** — 문항별 **평균 응시시간(난이도 쉬움/보통/어려움)** · **평균 응시시간 KPI**(목표 15분) · **학생별 응시시간** · 학생 결과 `풀이 시간`. 자동 생성은 **AI 노트 보유 최근 학습일의 모든 노트** 기준
- **ALEX 복습** — 첫 답변부터 고품질·틀린문제 중심 개념·미니퀴즈·문답 (정책/PRD 품질 요구만; 프로토타입은 진입 토스트)
- **보충 퀴즈** — `생성`→**`출제`** 단어 변경, **오답 0건 시 출제 불가 에러**
- **AI 노트** — 매니저 수정 시 `수정됨·시각` 배지 + **원본 복구(백업)**
- **TIL** — 퀴즈 결과 **본문 한 블록 붙여넣기**(문항별/전체), 매니저 히트맵 **월별 페이지네이션**(스크롤↓)
- **프로젝트** — 다른 학생 제출본 공개를 **제출 직후→제출 기간 종료(피드백 기간)부터 전체 공개**(제출 여부 무관)
- **강사일지**(차기) — AI 노트·학습퀴즈 체크 항목 요구만 정책/PRD에 기재(화면 미구현)

## v2.3 변경점 (2026-05-29 신규 스펙 회의 반영)

> 입력: [meeting-2026-05-29-신규스펙정리.md](../meetings/meeting-2026-05-29-신규스펙정리.md) · 정책: [POL-CR-03 v1.1](../policies/POL-CR-03-운영-결정사항-통합.md)

- **AI 퀴즈** — 보충 생성: 디폴트(최근 5일 오답) + 날짜 다중 셀렉트(최대 5) + 하루 **10회** 한도 "오늘 쉬세요" / 매니저 보충 히트맵: **푼 날짜** 기준·Max 10회 / 발행 후 **수정됨 · 시각** 배지(학생 결과) / 단일 세트·문항 **재발행** + 응시 invalidation confirm
- **TIL** — 발행 본문 **외부 복사(공개 URL)·PDF 다운** / 히트맵 **주 7일(월~일)** + 주말 점선 / **날짜 셀렉트**로 작성·수정 통합 / **우수 TIL ★** 마크(매니저) + 히트맵 차별화(색+아이콘)
- **프로젝트** — 제출 폼 **외부 발행 토글 제거**(외부 공유는 제출본 리스트 → 외부 공유하기에서만)
- **공통 컴포넌트** — `UI.multiSelect`(최대 N·칩) 추가, 히트맵 `excellent` 오버레이 지원
- **디바이스** — PC 뷰(1280)만 1차 출시 / 모바일 스펙 아웃(별도 문서)

## 실행

```bash
open index.html
```

브라우저에서 바로 열림. 외부 의존:
- Tailwind CDN (`cdn.tailwindcss.com`)
- Pretendard Variable CDN (`cdn.jsdelivr.net`)
- 디자인 토큰: [assets/tokens.css](./assets/tokens.css) — `mcp__likelion-docs__get_design_tokens` 2026-05-28 페치본
- 컴포넌트 참조: @likelion-design/ui — Badge·Button·Checkbox·Chip·Dialog·Pagination·RadioButton·Select·Tab·Tag·TextField·Toast·Toggle·Tooltip·Typography 18종

## 파일 구조

```
prototype/
├── README.md                # 본 문서
├── blueprint-classroom-prototype-v2.md  # 설계서 (SSOT)
├── index.html               # LNB 허브 + 뷰 토글 + 메뉴 라우팅
├── ai-quiz.html             # 학습퀴즈 (구 AI 퀴즈 · 학생 3탭 + 매니저 3탭)
├── practice.html            # 실습
├── til.html                 # TIL
├── project.html             # 프로젝트
├── ai-note.html             # AI 노트 (컨텍스트용 미러)
├── assets/
│   ├── tokens.css           # likelion-docs MCP 토큰
│   ├── styles.css           # 커스텀 유틸 클래스
│   ├── components.js        # LNB·헤더·모달·히트맵 공유
│   └── mock-data.js         # 30일 × 30명 합성
├── checklists/
│   └── prd-match.md         # PRD §4 (A~E) 매칭
└── figma-frames/
    └── README.md            # Figma URL 인덱스 (Step 7 산출)
```

## 화면 구성

### 학생뷰 / 매니저뷰 (LNB 우상단 토글)

| 메뉴 | 학생뷰 | 매니저뷰 |
|---|---|---|
| AI 노트 | 카드 리스트 (참고) | 카드 리스트 (참고) |
| 학습퀴즈 | 3탭 — 학습퀴즈·오답노트·보충(다중 날짜·하루 10회·**출제**) | 3탭 — **퀴즈 발행하기**(슬롯 리스트·상단 고정 액션·AI 퀴즈 생성·임시저장/예약발행/즉시발행·문항별 AI 문항 생성)·발행된 퀴즈(오답률·**평균 응시시간/난이도**·분포·**학생별 응시시간**)·보충 히트맵(푼 날짜·Max 10) |
| ~~실습~~ | **폐지** (자율 운영 + AI 노트·Alex 통합) — `practice.html` 비활성 보존 | — |
| TIL | 활동 히트맵 주 7일×26주차(주말 점선·★우수) + 날짜 셀렉트 작성/수정 통합 + 외부 복사/PDF | 학생×날짜 히트맵 + 셀 본문 상세 + 우수 TIL 마크 |
| 프로젝트 | 3탭(문제·제출 리스트·받은 피드백) + **문제 좌측 제출 버튼**(제출 시 수정하기·기간 외 비활성) / 태그 = 회차 + 전체 단계(보조) + **내 진행 상태(주)** | 2탭(문제·제출현황) — 진행중 우선 정렬·우측 제출률 통계 / 제출현황에 **피드백 통합**(필터·썸네일 태그·하단 등록/수정·우수/비공개) / 상단 `프로젝트 정보 수정` 모달 / 태그 = 회차 + **전체 단계(주)** |

상태 시연:
- URL 쿼리 `?state=empty` 또는 `?state=error` 로 빈상태·에러 케이스 강제

## 데모 한계

- 시간 의존 액션(09:10 자동 발행 등)은 "데모 트리거" 버튼으로 대체
- 데이터는 정적 합성. sessionStorage로만 임시 상태 유지 — 새로고침 시 reset
- 첨부 파일 업로드는 파일명만 표시, 실제 업로드 X
- 응시 중 네트워크 끊김·페이지 이탈 시 작성본 sessionStorage 보존 — mock 미구현
- 발행 후 정답·보기 잠금 UI / 자동 저장 실패 UI — 텍스트 명시만 (실제 검증 X)
- Figma 변환 산출물은 사용자 컨펌 후 생성 (Step 7 컨펌 게이트)

## PRD 대조 검증

[checklists/prd-match.md](./checklists/prd-match.md) — PRD §4 (A)(B)(C)(D)(E) 행마다 ✅/❌ + 사유. 95% 이상 통과 후 Figma 단계 진입.

## 다음 단계 (인계 4단계)

1. ~~PRD 상세화~~ — [PRD-classroom-detail-v1.2.md](../prd/PRD-classroom-detail-v1.2.md) v1.2.1 완료
2. **프로토타입** — 본 폴더 (현재 단계)
3. Figma 변환 + UX 1회 검수 — [figma-frames/](./figma-frames/) + handoff
4. GitHub 개발 요청서 — [docs/handoff/HANDOFF-TEMPLATE.md](../../../../../docs/handoff/HANDOFF-TEMPLATE.md)
