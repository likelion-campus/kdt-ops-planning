# Figma 프레임 인덱스 (Step 7 산출 예정)

> 본 폴더는 Step 7(`figma-use`로 HTML → Figma 변환) 산출물의 메타 인덱스 보관소입니다.
> Figma 파일 자체는 사용자 Figma 계정에 생성되며, 본 README 에 URL과 frame ID를 기록합니다.

## 변환 계획

**대상**: PRD 수정 스코프 5종 메뉴 × 학생뷰·매니저뷰·빈상태·에러 = **20 frame**

| # | 메뉴 | 뷰/상태 | 소스 HTML | URL/파라미터 | Frame URL | Frame ID |
|---|------|--------|----------|-------------|-----------|---------|
| 1 | AI 노트 | 학생뷰 정상 | `ai-note.html` | — | — | — |
| 2 | AI 노트 | 빈상태 | `ai-note.html` | `?state=empty` | — | — |
| 3 | AI 퀴즈 | 학생 — 오늘의 퀴즈 (응시 가능) | `ai-quiz.html` | `?state=` | — | — |
| 4 | AI 퀴즈 | 학생 — 오답노트 | `ai-quiz.html` | (quizTab=wrong) | — | — |
| 5 | AI 퀴즈 | 학생 — 보충 퀴즈 (한도 근접) | `ai-quiz.html` | (quizTab=supplementary) | — | — |
| 6 | AI 퀴즈 | 학생 — 빈상태 (미발행) | `ai-quiz.html` | `?state=empty` | — | — |
| 7 | AI 퀴즈 | 매니저 — 오늘의 퀴즈 Draft | `ai-quiz.html` | (view=manager) | — | — |
| 8 | AI 퀴즈 | 매니저 — 퀴즈 현황 히트맵 | `ai-quiz.html` | (mgrQuizTab=status) | — | — |
| 9 | AI 퀴즈 | 매니저 — 보충 퀴즈 사용수 히트맵 | `ai-quiz.html` | (mgrQuizTab=supplementary) | — | — |
| 10 | AI 퀴즈 | 매니저 — 에러 (생성 실패) | `ai-quiz.html` | `?state=error` | — | — |
| 11 | 실습 | 학생 — 오늘·과거 리스트 | `practice.html` | — | — | — |
| 12 | 실습 | 학생 — 빈상태 | `practice.html` | `?state=empty` | — | — |
| 13 | 실습 | 매니저 — 발행 폼 | `practice.html` | (view=manager) | — | — |
| 14 | 실습 | 매니저 — 채점 표 | `practice.html` | (practiceTab=grade) | — | — |
| 15 | TIL | 학생 — 활동 히트맵 + 카드 | `til.html` | — | — | — |
| 16 | TIL | 학생 — 작성 폼 좌우 분할 | `til.html` | (작성하기 진입 상태) | — | — |
| 17 | TIL | 매니저 — 학생×날짜 히트맵 | `til.html` | (view=manager) | — | — |
| 18 | 프로젝트 | 학생 — 회차 카드 4종 | `project.html` | — | — | — |
| 19 | 프로젝트 | 학생 — 제출 폼 + 게시판 | `project.html` | (제출하기 진입 상태) | — | — |
| 20 | 프로젝트 | 매니저 — 등록 + 모더레이션 | `project.html` | (view=manager) | — | — |

## 변환 전략

1. **신규 Figma 파일 생성** — 이름: "클래스룸 v2 프로토타입 — KDT 데이터분석 5기"
2. **20 frame 배치**: 5×4 그리드 (가로 5메뉴, 세로 4상태). 메뉴별 색상 라벨 섹션 헤더.
3. **디자인 토큰 매핑**: HTML의 `--lk-color-*`, `--lk-spacing-*` 토큰을 Figma 변수 컬렉션 "Likelion / Semantic" 으로 미러링 → 이후 UX 디자이너 검수 시 토큰 1군데 수정으로 일괄 반영 가능.
4. **컴포넌트 인스턴스화**: Tab·Tag·Button 등 반복 패턴은 Figma 컴포넌트로 만들고 frame 안에서 인스턴스로 사용.
5. **변환 도구**: `figma-use` MCP — `use_figma` 호출로 frame 한 묶음씩 (최대 10 logical op/call) 분할 작성.

## 실행 후 채울 메타 정보

- Figma 파일 URL: ___
- 마지막 동기화: ___ (HTML 수정 후 재변환 필요 여부)
- UX 검수 진행 상태: ___ (검수 전 / 진행 중 / 완료)
- 검수자: ___
- 검수 메모 링크: [classroom-v2-ux-review.md](../../../../../docs/handoff/classroom-v2-ux-review.md)

## 데모 한계

- 슬라이드 패널·모달은 별도 frame이 아닌 **메인 frame 옆에 오버레이된 형태**로 1개 frame 안에 동거 (디자이너 검수 시 분리 결정 가능)
- 인터랙션(클릭→토스트 등)은 Figma prototype 모드가 아닌 **정적 frame**으로만 표현 — 동작은 HTML 프로토타입으로 검증
