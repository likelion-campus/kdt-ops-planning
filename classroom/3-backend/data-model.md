---
terms: [Course, KDTCurriculum, Chapter, Section, KDTAttendance, AINote, AIQuiz, QuizQuestion, QuizAttempt, WrongNote, SupplementaryQuiz]
owner: "@be-classroom-lead"
---

# Classroom — Data Model (planning surface)

> 두 소유 도메인으로 나뉜다.
> **A. Course 도메인** = `glob-course`가 SSOT (Classroom·axp는 **읽기 전용 참조**).
> **B. AI 퀴즈 도메인** = `axp-common-python`의 **common DB**가 소유(read-write, 신규).

---

## A. Course 도메인 (glob-course 소유 · 읽기 전용 참조)

### Course — 해당 수업
- `id`, `title`, `started_at`, `ended_at` (+ 기수/cohort 속성)
- 학생·매니저가 속한 단위 수업. 식별자 **`course_id`** (모든 하위 데이터의 기준).

### KDTCurriculum — 수업일 일정 (일자별)
- `id`, `course_id`, `date`, `interval`, `title`, `description`, `location`, `tutor`, `sub_tutor`, `is_break`, `is_project`, `is_guest_lecture`
- **날짜 기준 수업 일정** 1건. ("Lecture/회차"가 아니라 `date` 단위)
- ⭐ **휴강·수업일 판정 출처**: `is_break=True` 또는 해당 날짜 미존재 → 비수업일. AI 퀴즈 **발행 스케줄러가 이 값으로 휴일 skip 판정**(+ `core/utils/holiday.py` 공휴일).

### Chapter / Section — 콘텐츠 구조
- **Chapter**: `id`, `title`, `description`, `order`, `delayed_days`, `resources[]`
- **Section**: `id`, `course_id`, `chapter_id`, `resource_id`, `*_order`, `*_delayed_days`, `is_free`
- 강의 콘텐츠(리소스) 묶음. 수업일(Curriculum)과는 별개 축.

### KDTAttendance — 일별 출결
- `id`, `course_id`, `user_id`, `hrd_user_id`, `status`, `attendance_date`, `started_at`, `ended_at`, `out_started_at`, `out_ended_at`
- Trainee × **수업일(`attendance_date`)** 의 일별 출석. (Session 단위 아님)

### AINote (= LiveroomSummary) — 오늘의 AI 노트
- `id`, `course_id`, `summary_date`, `summary_items[]` (테이블 `liveroom_summaries`, common DB)
- 라이브룸(수업) **AI 자동 요약** 학습 노트. 학생 읽기 전용. **AIQuiz·보충 퀴즈 생성의 입력 소스** (`course_id × summary_date` 유일).

---

## B. AI 퀴즈 도메인 (axp-common-python · common DB · 신규)

> POL-CR-03 v1.2 기준. 상세 설계: axp `docs/superpowers/specs/2026-06-01-ai-quiz-design.md`

### ai_quiz — 퀴즈 (발행 단위)
- `id`, `course_id`, `quiz_date`, `title`, `source`(`auto|manual`), `status`(`draft|scheduled|published|generation_failed`), `source_summary_id`(→ `liveroom_summaries`, auto일 때), `generated_at`, `publish_at`, `published_at`, `error`
- **해당 수업 × 날짜에 여러 개 가능** (UNIQUE 없음). auto=배치 자동 생성 / manual=매니저 자작.

### ai_quiz_question — 문항
- `id`, `quiz_id`, `no`, `stem`, `choices`(jsonb[4]), `answer`(0~3), `explanation`, `edited_at`, `regenerated_at`
- 객관식 4지선다. 발행 후 텍스트(문제·보기·해설)만 수정 → `edited_at`. AI 재생성/정정 → `regenerated_at`.

### ai_quiz_attempt — 응시 / ai_quiz_answer — 채점 상세
- **attempt**: `id`, `quiz_id`, `course_id`, `user_id`, `score`, `total`, `submitted_at` · **UNIQUE(quiz_id, user_id)** (재응시 불가)
- **answer**: `id`, `attempt_id`, `question_id`, `picked`(0~3), `is_correct`
- 1문항 1점. 서버 채점.

### ai_quiz_wrong_note — 오답노트
- `id`, `user_id`, `course_id`, `question_id`, `quiz_date`, `bookmarked`, `memo` · **UNIQUE(user_id, question_id)**
- 응시 오답 자동 누적(insert-once). 액션 `메모`·`책갈피`만. 보충과 분리.

### ai_quiz_supp_set / ai_quiz_supp_question — 보충 퀴즈
- **supp_set**: `id`, `user_id`, `course_id`, `created_at`, `target_dates`(jsonb), `wrong_focus`, `count`, `solved`, `solved_at`, `correct`, `rate`
- **supp_question**: `id`, `supp_set_id`, `no`, `stem`, `choices`(jsonb[4]), `answer`, `explanation`, `picked`, `is_correct`
- 학생이 오답 기반 직접 생성. 결과는 보충 탭 내부에만 누적.

---

## 정책 추적

- **발행 휴일 skip** ← `KDTCurriculum.is_break` + `core/utils/holiday.py` (POL-CR-03 §1.1 "휴일 제외, 다음 수업일")
- **자동 퀴즈 발행 기본 08:30** (매니저 조정 가능) ← POL-CR-03 §1.1
- **자동 생성 15:00 배치**(AINote 14:00 생성 후) → `ai_quiz.source=auto`, `publish_at=quiz_date+1 08:30`
- **발행 후 텍스트만 수정 / 정답·보기 번호 잠금** ← POL-CR-03 §1.1
- **단일 재발행 → 응시 invalidation·재집계** ← POL-CR-03 §1.4.2 (상세 PRD v1.3 확정 대기)
- **보충 하루 10회(세트)** ← POL-CR-03 §2 / **보충 히트맵 = `solved_at` 기준 Max 10** ← §2.1
- **현황 = 응시율·정답률·문항별 오답률·보기 선택 분포** ← POL-CR-03 §1.2
