# 클래스룸 이벤트 설치 가이드 (개발자 핸드오프) v2

> 대상: KDT 클래스룸 이벤트 계측 (**Notion Event Dictionary 최종본 기준 — 개발서버 배포 단계**)
> 분석 도구: **Amplitude** · 서비스명: 이벤트별 상이(`bootcamp.likelion.net` / `axp saas`)
> 컨벤션: 이벤트명·속성 모두 **snake_case**, 행동은 과거형
> 원본 지표 설계: [metrics-framework.md](./metrics-framework.md)
> ⚠️ **단일 진실(SSOT) = Notion Event Dictionary.** 본 문서는 그 미러. 충돌 시 Notion 우선.

이 문서는 개발자가 **어느 페이지의 어느 시점에** 이벤트를 심어야 하는지 정의한다. (실제 페이지 기준)

---

## 0. 공통 규약

### 0.1 모든 이벤트 공통 속성 (Event Properties)
전 이벤트에 아래 속성을 **항상 함께** 전송한다. 상세 정의는 Notion ['공통 property 정의'](https://app.notion.com/p/38744860a4f481819ed0c9c30c265508) 단일 참조.

| 속성 | 타입 | 설명 |
|---|---|---|
| `user_id` | string | 사용자 고유 ID |
| `user_type` | enum | `trainee` / `tutor` / `manager` |
| `course_id` | string | 과정(강좌) ID |
| `course_type` | string | 과정 유형 (`kdt`) |
| `cohort_id` | string | 기수 ID (Classroom UI '해당 수업') |
| `class_day_index` | number | 개강 후 N일차 |
| `organization_name` | string | 기관명 |
| `is_ops_innovation` | boolean | 운영혁신 적용 수업 여부 — 코스 마스터에서 자동 전파 (§0.3) |

### 0.2 User Properties (Identify — 로그인 시 1회 세팅)
재적생 모수(분모) 확보용. 이벤트 발생 여부와 무관하게 사람 단위로 세팅.

| User Property | 타입 | 설명 |
|---|---|---|
| `is_ops_innovation` | boolean | 운영혁신 수업 재적 여부 |
| `enrolled_course_id` | string | 재적 과정 ID |
| `enrolled_cohort_id` | string | 재적 기수 ID |
| `user_type` | enum | trainee/tutor/manager |

### 0.3 `is_ops_innovation` 처리 원칙
- **원천(SSOT)**: 코스/프로그램 마스터 컬럼 1개. 수업 신설 시 Admin에서 1회 지정.
- **자동 전파**: 클라이언트가 코스 메타에서 읽어 모든 이벤트 속성 + User Property로 전송 (이벤트마다 하드코딩 금지).
- **대시보드 무수정**: 신규 수업이 생겨도 `is_ops_innovation = true` 필터 그대로.

### 0.4 발화 일반 규칙
- 행동 시점(`_started`/`_submitted`/`_entered`/`_viewed`)에 발화. prefetch·백그라운드 로드 시 금지.
- 제출류(`_submitted`)는 확정(채점/저장) 시점 1회만. 중도 이탈 발화 안 함.
- 전 이벤트 **클라이언트 발화** (서버 전용 이벤트 없음).

---

## 1. 이벤트별 설치 명세 (13종)

각 항목: **페이지 / 발화 시점 / 발화 규칙 / 고유 속성 / 서비스 / Notion**

---

### 1) `kdt_classroom_home_entered`
- **페이지**: 클래스룸 홈 (로그인 후 가장 먼저 만나는 단일 진입점 대시보드)
- **발화 시점**: 홈 라우트 진입 후 메인 컴포넌트 마운트 완료 → 화면 표시되는 순간
- **발화 규칙**: 페이지뷰 1회. SPA 라우팅 재진입 시마다. prefetch·부분 렌더 금지
- **고유 속성**: (공통만)
- **서비스**: `bootcamp.likelion.net`
- **Notion**: https://app.notion.com/p/38344860a4f48152b357fe26802225b7

### 2) `kdt_class_quiz_started`
- **페이지**: 강의 퀴즈 (매일 오전 제공되는 10문제 퀴즈)
- **발화 시점**: '퀴즈 시작' 버튼 클릭 → 첫 문항 렌더링되는 순간 (풀이 시작 액션)
- **발화 규칙**: 하루 1회 응시 정책 → 재시작 불가 시 1회만
- **고유 속성**: `quiz_id` (string), `question_count` (number)
- **서비스**: `bootcamp.likelion.net`
- **Notion**: https://app.notion.com/p/38344860a4f4813c86bad663207dde0a

### 3) `kdt_class_quiz_submitted`
- **페이지**: 강의 퀴즈
- **발화 시점**: 마지막 문항 응답 후 '제출' → 채점 확정되는 순간
- **발화 규칙**: 제출 1회만. 중도 이탈 발화 안 함. `duration_sec` = started~제출 경과
- **고유 속성**: `quiz_id` (string), `question_count` (number), `correct_count` (number), `score` (number, 0~100), `duration_sec` (number)
- **서비스**: `bootcamp.likelion.net`
- **Notion**: https://app.notion.com/p/38344860a4f481d0b747fbaf1709fb78

### 4) `kdt_class_quiz_explanation_viewed`
- **페이지**: 강의 퀴즈 결과·해설 화면 (제출 직후 자동 표시)
- **발화 시점**: 시험 **결과 화면을 열람한 시점**
- **발화 규칙**: 결과 화면 열람 시 발화 (※ v1의 '문항별 해설 클릭'에서 '결과 화면 열람 1회'로 변경됨)
- **고유 속성**: `quiz_id` (string)
- **서비스**: `bootcamp.likelion.net`
- **Notion**: https://app.notion.com/p/38344860a4f4814a8cb5c14a323d793d

### 5) `kdt_wrong_answer_note_viewed`
- **페이지**: 오답노트 탭
- **발화 시점**: 오답노트 탭 진입 → 목록/상세 화면 표시되는 순간(페이지뷰)
- **발화 규칙**: 진입 1회. **페이지네이션 전환 시 추가 발화**
- **고유 속성**: (공통만)
- **서비스**: `axp saas`
- **Notion**: https://app.notion.com/p/38344860a4f481439b83f1b66b3b491f

### 6) `kdt_supplementary_quiz_started`
- **페이지**: 보충 퀴즈 제작 페이지
- **발화 시점**: 학생이 누적 오답 기반으로 보충 세트를 **제작(생성)한 순간**
- **발화 규칙**: 세트 생성 단위. `daily_limit_reached`는 당일 10세트 한도 도달 시 true
- **고유 속성**: `set_question_count` (enum: `5`|`10`|`15`), `selected_date_count` (number, 선택 날짜 수 1~5), `set_wrong_answer` (boolean, 오답중심 선택 유무), `daily_set_count` (number), `daily_limit_reached` (boolean)
- **서비스**: `axp saas`
- **Notion**: https://app.notion.com/p/38744860a4f480169617c546b9ad24bc

### 7) `kdt_supplementary_quiz_submitted`
- **페이지**: 보충 퀴즈 탭 (오답노트와 분리. 오답중심·날짜 최대 5일·문제수 5/10/15. 하루 10세트 한도)
- **발화 시점**: 보충 세트를 풀고 '제출' → 채점 확정되는 순간 (세트 단위)
- **발화 규칙**: 세트 제출 단위. `daily_limit_reached`는 당일 10세트 도달 시 true
- **고유 속성**: `set_question_count` (enum: `5`|`10`|`15`), `correct_count` (number), `daily_set_count` (number), `daily_limit_reached` (boolean)
- **서비스**: `axp saas`
- **Notion**: https://app.notion.com/p/38344860a4f481ba9048cd0fc80b0608

### 8) `kdt_til_submitted`
- **페이지**: TIL/회고 작성 (오후 회고. 산출물 URL·외부 복붙 입력 가능)
- **발화 시점**: 본문 작성 후 '게시'(최초 제출) → TIL 게시되는 순간
- **발화 규칙**: 최초 1회만. 수정은 `kdt_til_updated`
- **고유 속성**: `til_id` (string), `char_count` (number), `write_duration_sec` (number, **검토-선택**: 작성 화면 진입~게시)
- **서비스**: `bootcamp.likelion.net`
- **Notion**: https://app.notion.com/p/38344860a4f48118a32af12d897bb902

### 9) `kdt_til_updated`
- **페이지**: TIL/회고 작성 (게시 후 수정 화면)
- **발화 시점**: 기존 게시 TIL 편집 후 '수정 저장' → 변경 저장되는 순간
- **발화 규칙**: 수정할 때마다. `edit_count` = 누적 수정 횟수
- **고유 속성**: `til_id` (string), `edit_count` (number)
- **서비스**: `bootcamp.likelion.net`
- **Notion**: https://app.notion.com/p/38344860a4f48174bb8bd000e1bb5e37

### 10) `kdt_project_submitted`
- **페이지**: 프로젝트 (회차별 제출 — 기초/심화/파이널 3회차 + 기타. 회차당 1건 개인 제출)
- **발화 시점**: 프로젝트 회차 결과물 제출 → 제출 확정되는 순간
- **발화 규칙**: 회차당 1건(개인). **회차 마일스톤 단위(매일 아님)**
- **고유 속성**: `project_round_id` (string), `project_round_type` (enum: `basic`/`advanced`/`final`/`etc`)
- **서비스**: `bootcamp.likelion.net`
- **Notion**: https://app.notion.com/p/38344860a4f4816ca4eff8cfbbd8dce0

### 11) `kdt_project_viewed`
- **페이지**: 프로젝트 (회차별)
- **발화 시점**: 프로젝트 회차 결과물(상세)을 **조회한 순간**
- **발화 규칙**: 회차 조회 시. `project_round_url`은 내부 주소
- **고유 속성**: `project_round_id` (string), `project_round_type` (enum), `project_round_url` (string, 내부 주소)
- **서비스**: `bootcamp.likelion.net`
- **Notion**: https://app.notion.com/p/38744860a4f4802a9599fe7391247fc3
- ⚠️ Notion '이벤트 정의' 텍스트가 `kdt_project_submitted`에서 복사된 듯함(제출→조회). 의도는 **조회** 추적.

### 12) `kdt_project_published_viewed`
- **페이지**: 프로젝트 (외부 공유된 결과물)
- **발화 시점**: 프로젝트 결과물이 **외부에 공유된 상태에서 노출된 순간** (외부 노출 횟수)
- **발화 규칙**: 외부 공유 노출 단위
- **고유 속성**: `project_round_id` (string), `project_round_type` (enum), `project_round_url` (string)
- **서비스**: `bootcamp.likelion.net` · **단계**: 검토 완료
- **Notion**: https://app.notion.com/p/38744860a4f4805eac15e8834aaf1ec9
- ⚠️ Notion '이벤트 정의' 텍스트가 복사된 듯함. 의도는 **외부 공유 노출** 추적.

### 13) `kdt_classroom_trainee_verified`
- **페이지**: 출석을 위한 본인인증 (캠프파이어 입장 본인인증)
- **발화 시점**: 캠프파이어 입장을 위해 본인인증을 시도하여 인증 완료된 순간
- **발화 규칙**: **성공·실패 모두 발화**, `result`로 구분. 본인인증 100% 정확 요구
- **고유 속성**: `result` (enum: `success`/`fail`)
- **서비스**: `axp saas` · **단계**: 검토 완료
- **Notion**: https://app.notion.com/p/38344860a4f481a38b8bcebd6138b377
- ※ v1 `kdt_attendance_checked` 에서 이름·정의 변경(출석 체크 → 캠프파이어 입장 본인인증). 출석률 Health 지표 산출에 사용.

---

## 2. 기존 이벤트 재사용 (신규 정의 불필요, 연결만)

I3 'AI 자가학습 활용률'은 이미 운영 중인 이벤트를 그대로 사용한다.

| event_name | 용도 | 비고 |
|---|---|---|
| `alex_chatbot_message_sent` | ALEX와 대화(메시지 전송) | `chat.likelion.net`. `message_content` → 만족도 LLM-as-judge |
| `alex_chatbot_dm_clicked` | DM 목록에서 ALEX 진입 | `unread_message`로 Hook vs 자발 |
| `milo_note_content_clicked` | MILO AI노트 콘텐츠 클릭 | `ai_note_content_date` |

> 재사용 이벤트는 서비스명이 달라도 파일럿 필터는 `is_ops_innovation` **User Property** 기준으로 적용.

---

## 3. 보류 (삭제 예정)
- `kdt_practice_assigned` / `kdt_practice_submitted` — 실습 메뉴 폐지(회의 §2). Notion 단계 `보류`.

---

## 4. AI Q&A 만족도 (별점 직접 수집 불가 → 대안)
ALEX는 별점 UI가 없다. `alex_chatbot_message_sent.message_content`가 수집되므로:
- **단기(개발 0)**: 행동 프록시 — 멀티턴 지속률, 재질문율(역), ALEX→사람 에스컬레이션율(역), 세션당 턴 수
- **중기(권장)**: `message_content` LLM-as-judge 배치 스코어링 (UI 불필요)
- **장기(선택)**: 답변 말미 👍/👎 → 신규 이벤트 `alex_answer_rated {rating}` (프론트 개발 필요)

---

## 5. 설치 체크리스트 (개발)
- [ ] 코스 마스터에 `is_ops_innovation` 컬럼 + Admin 수업 신설 폼에 "운영혁신 여부" 항목
- [ ] 로그인 시 User Property 4종 Identify 세팅 (§0.2)
- [ ] 전 이벤트 공통 속성 8종 자동 첨부 (§0.1) — `is_ops_innovation`은 course 메타 참조
- [ ] 13종 발화 지점 설치 (§1) — 전부 클라이언트 발화
- [ ] QA: 발화 시점·중복 발화·속성 누락 검수 (Amplitude 디버거)
- [ ] `kdt_project_viewed` / `kdt_project_published_viewed` 정의 텍스트 확인(복사 흔적) — 데이터팀 확인 요청
