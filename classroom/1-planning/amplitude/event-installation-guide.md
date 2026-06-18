# 클래스룸 이벤트 설치 가이드 (개발자 핸드오프) v1

> 대상: KDT 클래스룸 신규 11종 이벤트 계측
> 분석 도구: **Amplitude** · 서비스명 태깅: `axp saas`
> 컨벤션: 이벤트명·속성 모두 **snake_case**, 행동은 과거형
> 원본 지표 설계: [data-instrumentation-v1.md](./data-instrumentation-v1.md)
> Notion Event Dictionary: 신규 11종 `적용단계 = 검토 중` 등록 완료

이 문서는 개발자가 **어느 페이지의 어느 시점에** 이벤트를 심어야 하는지 정확히 정의한다. (약어 F-번호 미사용, 실제 페이지 기준)

---

## 0. 공통 규약

### 0.1 모든 이벤트 공통 속성 (Event Properties)
전 이벤트에 아래 속성을 **항상 함께** 전송한다.

| 속성 | 타입 | 설명 |
|---|---|---|
| `user_id` | string | 사용자 고유 ID |
| `user_type` | enum | `trainee` / `tutor` / `manager` / `ca` |
| `course_id` | string | 수강 과정 ID |
| `course_type` | string | 과정 유형 (`kdt`) |
| `cohort_id` | string | 기수 ID |
| `class_day_index` | number | 개강 후 N일차 |
| `organization_name` | string | 기관명 |
| `is_ops_innovation` | boolean | **운영혁신 적용 수업 여부** — 코스 마스터에서 자동 전파 (§0.3) |

### 0.2 User Properties (Identify — 로그인 시 1회 세팅)
이벤트 발생 여부와 무관하게 **재적생 모수(분모)** 를 확보하기 위해, 로그인/세션 시작 시 `setUserProperties`(Identify)로 세팅한다.

| User Property | 타입 | 설명 |
|---|---|---|
| `is_ops_innovation` | boolean | 운영혁신 수업 재적 여부 |
| `enrolled_course_id` | string | 재적 과정 ID |
| `enrolled_cohort_id` | string | 재적 기수 ID |
| `user_type` | enum | trainee/tutor/manager/ca |

### 0.3 `is_ops_innovation` 처리 원칙 (중요)
- **원천(Source of Truth)**: 코스/프로그램 마스터 테이블의 컬럼 1개. 수업 신설 시 Admin에서 1회 지정.
- **자동 전파**: 클라이언트는 이 값을 코스 메타에서 읽어 모든 이벤트 속성 + User Property로 실어 보낸다. **이벤트마다 하드코딩 금지**, course 메타 참조.
- **분석 측 무수정 보장**: 신규 운영혁신 수업이 생겨도 대시보드는 `is_ops_innovation = true` 필터 그대로 사용.

### 0.4 발화 일반 규칙
- `_started` / `_submitted` / `_entered` 등 **행동 시점**에 발화 (페이지 prefetch·백그라운드 로드 시 발화 금지).
- 제출류(`_submitted`)는 **확정(채점/저장) 시점 1회**만. 중도 이탈은 발화 안 함.
- 클라이언트 이벤트 vs **서버 이벤트** 구분은 각 항목의 `발생 위치` 참조.

---

## 1. 이벤트별 설치 명세 (신규 11종)

각 항목: **페이지 / 발화 시점(trigger) / 발생 위치 / 발화 규칙 / 고유 속성 / Notion**

---

### 1) `kdt_classroom_home_entered`
- **페이지**: 클래스룸 홈 (로그인 후 가장 먼저 만나는 단일 진입점 대시보드)
- **발화 시점**: 홈 라우트 진입 후 메인 컴포넌트 마운트 완료 → 화면 표시되는 순간
- **발생 위치**: 클라이언트
- **발화 규칙**: 페이지뷰 1회. SPA 라우팅으로 홈 재진입 시마다 발화. prefetch·부분 렌더 시 발화 금지
- **고유 속성**: `entry_source` (enum: `direct` / `notification` / `internal_link`)
- **Notion**: https://app.notion.com/p/38344860a4f48152b357fe26802225b7

### 2) `kdt_daily_quiz_started`
- **페이지**: 데일리 퀴즈 (매일 오전 제공되는 5문제 퀴즈)
- **발화 시점**: '퀴즈 시작' 버튼 클릭 → 첫 문항이 렌더링되는 순간
- **발생 위치**: 클라이언트
- **발화 규칙**: 풀이 시작 액션 기준(페이지뷰 아님). 하루 1회 응시 정책 → 재시작 불가 시 1회만
- **고유 속성**: `quiz_id` (string), `question_count` (number)
- **Notion**: https://app.notion.com/p/38344860a4f4813c86bad663207dde0a

### 3) `kdt_daily_quiz_submitted`
- **페이지**: 데일리 퀴즈
- **발화 시점**: 마지막 문항 응답 후 '제출' 클릭 → 채점 확정되는 순간
- **발생 위치**: 클라이언트 (점수는 서버 채점 결과 수신 후 첨부)
- **발화 규칙**: 제출 1회만. 중도 이탈·미제출 발화 안 함. `duration_sec` = `kdt_daily_quiz_started`~제출 경과
- **고유 속성**: `quiz_id` (string), `question_count` (number), `correct_count` (number), `score` (number, 0~100), `duration_sec` (number), `is_completion_eligible` (boolean, 응시 80% 충족)
- **Notion**: https://app.notion.com/p/38344860a4f481d0b747fbaf1709fb78

### 4) `kdt_quiz_explanation_viewed`
- **페이지**: 데일리 퀴즈 결과·해설 화면 (제출 직후 자동 표시)
- **발화 시점**: 특정 문항 해설을 펼치거나 클릭하여 해설 본문 노출되는 순간
- **발생 위치**: 클라이언트
- **발화 규칙**: **문항 단위 발화** (여러 문항 열람 시 각각). 결과 화면 단순 진입 아님
- **고유 속성**: `quiz_id` (string), `question_id` (string)
- **Notion**: https://app.notion.com/p/38344860a4f4814a8cb5c14a323d793d

### 5) `kdt_wrong_answer_note_viewed`
- **페이지**: 오답노트 탭 (데일리 퀴즈와 분리된 별도 탭. 객관식 전체·본인 선택·정답·해설 한 화면, 다시 풀기 없음)
- **발화 시점**: 오답노트 탭 진입 → 목록/상세 화면 표시되는 순간
- **발생 위치**: 클라이언트
- **발화 규칙**: 탭 진입 페이지뷰 1회
- **고유 속성**: `entry_source` (enum: `quiz_result` / `menu`, 선택)
- **Notion**: https://app.notion.com/p/38344860a4f481439b83f1b66b3b491f

### 6) `kdt_supplementary_quiz_submitted`
- **페이지**: 보충 퀴즈 탭 (오답노트와 분리. 학생이 누적 오답 기반으로 직접 생성하는 보충 세트. **하루 10세트 한도**, 세트당 5/10/15문제)
- **발화 시점**: 보충 세트를 풀고 '제출' → 채점 확정되는 순간 (세트 단위)
- **발생 위치**: 클라이언트
- **발화 규칙**: 세트 제출 단위 발화. `daily_limit_reached`는 당일 10세트 도달 시 true
- **고유 속성**: `set_question_count` (enum: `5`|`10`|`15`), `correct_count` (number), `daily_set_count` (number, 당일 누적 세트 수), `daily_limit_reached` (boolean, 당일 10세트 도달)
- **글로서리 정합**: WrongNote(오답노트, insert-once)와 분리 — 보충 결과는 오답노트에 영향 없음 (`classroom/3-backend/glossary.yml` SupplementaryQuiz 기준)
- **Notion**: https://app.notion.com/p/38344860a4f481ba9048cd0fc80b0608

### 7) `kdt_practice_assigned`
- **페이지**: 실습 (AI 자동 제안 실습 — 기본/기본2/심화 3종)
- **발화 시점**: AI 자동 제안 로직이 AI 노트·퀴즈 점수 기반으로 실습을 배정하여 학생 목록에 등록되는 순간
- **발생 위치**: **서버 (백엔드 이벤트)** — 사용자 액션·클라이언트 렌더 시점 아님
- **발화 규칙**: 배정 발생 시. 동일 실습 재배정 정책에 따름
- **고유 속성**: `practice_id` (string), `difficulty_level` (enum: `basic`/`basic2`/`advanced`), `assign_reason` (enum: `auto_note`/`quiz_score`)
- **Notion**: https://app.notion.com/p/38344860a4f481a0b633e277420235e4

### 8) `kdt_practice_submitted`
- **페이지**: 실습
- **발화 시점**: 결과물 업로드/작성 후 '제출' → 제출 확정되는 순간
- **발생 위치**: 클라이언트
- **발화 규칙**: 마감·채점 없는 정책이므로 제출 행위 자체만 기록. 첨부 한도 30MB
- **고유 속성**: `practice_id` (string), `difficulty_level` (enum), `file_size_mb` (number), `has_external_url` (boolean)
- **Notion**: https://app.notion.com/p/38344860a4f48143b607d60949f9a10b

### 9) `kdt_til_submitted`
- **페이지**: TIL/회고 작성 (오후 회고. 산출물 URL·외부 복붙 입력 가능)
- **발화 시점**: 본문 작성 후 '게시'(최초 제출) 클릭 → TIL 게시되는 순간
- **발생 위치**: 클라이언트
- **발화 규칙**: **최초 1회만**. 게시 후 수정은 `kdt_til_updated`. `has_external_paste`는 작성 중 외부 텍스트 붙여넣기 감지 시 true
- **고유 속성**: `til_id` (string), `char_count` (number), `has_artifact_url` (boolean), `write_duration_sec` (number, 작성 화면 진입~게시), `has_external_paste` (boolean)
- **Notion**: https://app.notion.com/p/38344860a4f48118a32af12d897bb902

### 10) `kdt_til_updated`
- **페이지**: TIL/회고 작성 (게시 후 수정 화면)
- **발화 시점**: 기존 게시 TIL 편집 후 '수정 저장' → 변경 저장되는 순간
- **발생 위치**: 클라이언트
- **발화 규칙**: 수정할 때마다 발화. `edit_count` = 해당 TIL 누적 수정 횟수
- **고유 속성**: `til_id` (string), `edit_count` (number)
- **Notion**: https://app.notion.com/p/38344860a4f48174bb8bd000e1bb5e37

### 11) `kdt_attendance_checked`
- **페이지**: 출석 (QR 휴대폰 본인인증 화면)
- **발화 시점**: QR 본인인증 시도 → 출석 처리(성공/실패 판정) 완료되는 순간
- **발생 위치**: 클라이언트 (인증 결과는 서버 응답 기준)
- **발화 규칙**: **성공·실패 모두 발화**, `result`로 구분. 본인인증 100% 정확 요구
- **고유 속성**: `method` (enum: `qr_auth`), `result` (enum: `success`/`fail`)
- **Notion**: https://app.notion.com/p/38344860a4f481a38b8bcebd6138b377

---

## 2. 기존 이벤트 재사용 (신규 정의 불필요, 연결만)

I4 'AI 자가학습 활용률'은 이미 운영 중인 이벤트를 그대로 사용한다. **신규 설치 없이 분석 측에서 연결**.

| event_name | 용도 | 비고 |
|---|---|---|
| `alex_chatbot_message_sent` | ALEX와 대화(메시지 전송) | 서비스명 `chat.likelion.net`. `message_content` 수집됨 → AI 만족도 LLM-as-judge 분석에 활용 (§AI 만족도) |
| `alex_chatbot_dm_clicked` | DM 목록에서 ALEX 진입 | `unread_message`로 Hook 경유 vs 자발 유입 구분 |
| `milo_note_content_clicked` | MILO AI노트 콘텐츠 클릭 | `ai_note_content_date` 속성 |

> ⚠️ 재사용 이벤트는 서비스명이 `chat.likelion.net` / `bootcamp.likelion.net`일 수 있으므로, 파일럿 필터는 `is_ops_innovation` **User Property** 기준으로 적용한다 (해당 이벤트에도 User Property는 동일 사용자에 묶임).

---

## 3. AI Q&A 만족도 (별점 직접 수집 불가 → 대안)
ALEX는 별점 UI가 없다. `alex_chatbot_message_sent.message_content`가 이미 수집되므로:
- **단기(개발 0)**: 행동 프록시 — 멀티턴 지속률, 재질문율(역), ALEX→사람 에스컬레이션율(역), 세션당 턴 수
- **중기(권장)**: `message_content` LLM-as-judge 배치 스코어링 (UI 불필요)
- **장기(선택)**: 답변 말미 👍/👎 → 신규 이벤트 `alex_answer_rated {rating}` (프론트 개발 필요)

---

## 4. 설치 체크리스트 (개발)
- [ ] 코스 마스터에 `is_ops_innovation` 컬럼 추가 + Admin 수업 신설 폼에 "운영혁신 여부" 항목
- [ ] 로그인 시 User Property 4종 Identify 세팅 (§0.2)
- [ ] 전 이벤트 공통 속성 8종 자동 첨부 (§0.1) — `is_ops_innovation`은 course 메타 참조
- [ ] 신규 11종 발화 지점 설치 (§1)
- [ ] `kdt_practice_assigned`는 **서버 사이드** 발화 (백엔드 작업)
- [ ] QA: 발화 시점·중복 발화·속성 누락 검수 (Amplitude 디버거)
- [ ] 검수 후 Notion Event Dictionary 단계 `검토 중` → `개발서버 배포` 전환
