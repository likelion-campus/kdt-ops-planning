# 클래스룸 프로토타입 v2

> [PRD-classroom-detail-v1.2.md](../prd/PRD-classroom-detail-v1.2.md) v1.2.1 §4 디테일을 깊이 우선으로 프로토타이핑.
> 설계서: [blueprint-classroom-prototype-v2.md](./blueprint-classroom-prototype-v2.md)
> 기존 v1.2: [docs/handoff/prototype/classroom-v1.2/](../../../../../docs/handoff/prototype/classroom-v1.2/) (골든패스만)

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
├── ai-quiz.html             # AI 퀴즈 (학생 3탭 + 매니저 3탭)
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
| AI 퀴즈 | 3탭 — 오늘의 퀴즈·오답노트·보충 퀴즈 | 3탭 — 오늘의 퀴즈·퀴즈 현황 히트맵·보충 퀴즈 사용수 히트맵 |
| 실습 | 날짜별 리스트 + 제출 폼 | 발행 + 학생×문제 채점 표 |
| TIL | 활동 히트맵 + 좌(본문)/우(컨텍스트 3종) 폼 | 학생×날짜 히트맵 + 셀 슬라이드 패널 |
| 프로젝트 | 회차 카드 + 제출 폼 + 게시판 + 본인 피드백 | 등록 폼 + 모더레이션 큐 |

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
