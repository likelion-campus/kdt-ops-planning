# 클래스룸 데이터 계측 설계 — 핵심 지표 & 로깅 이벤트

> 대상: KDT 클래스룸 (파일럿 = 백엔드 자바 26기, 2026-06-30 개강)
> 분석 스택: Amplitude · 서비스명: 이벤트별 상이(`bootcamp.likelion.net` / `axp saas`)
> 컨벤션: 이벤트명·속성 모두 snake_case, 행동은 과거형
> 상태: **v2.0 — Notion Event Dictionary 최종본(개발서버 배포) 동기화.** 이벤트명·속성의 SSOT는 Notion.

---

## 1. 측정 철학 — 무엇을 증명하나

파일럿 핵심 가설: **"강사 의존도↓ + 자기주도학습↑ → 비용·품질 동시 개선, 수료율 유지"**
→ 데이터가 증명할 단 하나: **강사가 끌고 가지 않아도 학생이 스스로 핵심 학습 사이클을 도는가.**

| 가설 | 핵심 질문 | 대표 지표 |
|---|---|---|
| H1 자기주도학습 ↑ | 강사 시간 줄여도 학습 루프가 돌아가나 | **North Star (학습루프 완수율)** |
| H2 AXP 자동화 실작동 | AI(ALEX/MILO)가 강사 역할을 실제로 대체하나 | Input I3 (AI 자가학습 활용률) |
| H3 만족도·수료율 유지 | 자기주도로 바꿔도 품질이 안 떨어지나 | Health/Counter (정답률·만족도·수료율) |

---

## 2. 핵심 지표 트리

### ⭐ North Star — 일일 학습 루프 완수율 (Daily Learning-Loop Completion Rate)
**정의**: `당일 ① 퀴즈 응시(kdt_class_quiz_submitted) AND ② TIL 작성(kdt_til_submitted)을 모두 완수한 학생 수 / 당일 재적 학생 수`
- **active 기준 = 2종 전부 완수 (엄격)** — 일일 학습 루프는 퀴즈+TIL 2종. 추세 상승이 핵심.
- **근거**: 강사 개입 없이 능동 학습 사이클이 도는 직접 증거이자 수료율의 선행지표.
- **보조 추적**: "2종 중 N종 완수"(0/1/2) 분포. 프로젝트(회차)는 일일 루프가 아닌 **마일스톤**(`kdt_project_submitted`)으로 별도.

### Input Metrics — North Star를 움직이는 레버
| # | 지표 | 정의 | 이벤트 | 목표 |
|---|---|---|---|---|
| I1 | 퀴즈 응시율 | 당일 퀴즈 제출 학생 / 재적 | `kdt_class_quiz_submitted` | ≥80% (수료조건) |
| I2 | 회고(TIL) 작성률 | 당일 TIL 작성 학생 / 재적 | `kdt_til_submitted` | ≥70% |
| I3 | AI 자가학습 활용률 | ALEX 대화 or MILO 노트 사용 학생 / 재적 | `alex_chatbot_message_sent`·`milo_note_content_clicked` (재사용) | 측정 후 (H2 핵심) |

> 완수율 = I1·I2의 교집합, I3는 그 둘을 끌어올리는 자동화 동력.
> **마일스톤 지표(별도)**: 프로젝트 회차 제출률 = 회차별 `kdt_project_submitted` 제출 학생 / 재적 (일일 Input 아님).

### Health Metrics — 흔들리면 경보
| 지표 | 정의 | Green | Yellow | Red | 주기 |
|---|---|---|---|---|---|
| 출석·접속 유지율 | `kdt_classroom_trainee_verified`(result=success) / 재적 | ≥95% | 90–95% | <90% | 일 |
| 퀴즈 평균 정답률 | `kdt_class_quiz_submitted` correct_count/question_count | 55–75% | 45–55·75–85% | <45·>85% | 일 |
| AI Q&A 유효성 (프록시) | §3.2 — 멀티턴 지속률 + 사람 에스컬레이션율(역) | 지속↑·에스컬↓ | 보합 | 지속↓·에스컬↑ | 주 |
| 플랫폼 uptime | Campfire 가동률 | ≥99.5% | 99–99.5% | <99% | 일 |

> AI Q&A **만족도 별점은 직접 수집 불가** → 행동 프록시 + LLM-as-judge로 대체 (§3.2).

### Counter Metrics — Goodhart 방지 (완수율만 좇다 빈껍데기 되는지)
| 지표 | 왜 보나 | 경보 신호 |
|---|---|---|
| 퀴즈 무성의 응답률 | 응시율↑ 위해 찍기 | `kdt_class_quiz_submitted.duration_sec` 과소 비율↑, `kdt_supplementary_quiz_submitted.daily_limit_reached` ↑ |
| TIL 형식충족 vs 실질 | 작성률↑ 위해 빈껍데기 | `kdt_til_submitted.char_count` 과소·`write_duration_sec`(검토-선택) 과소 |

---

## 3. 중간 데이터 수집 전략

결과(수료율·취업)는 6개월 뒤에야 나오므로, Input/Health를 **선행지표**로 단계적으로 추적한다.

| 주기 | 보는 것 | 액션 |
|---|---|---|
| 일간 | North Star + Health 글랜스 | Red 경보 시 매니저 즉시 개입 |
| 주간 | Input 추세 + 분반/기수 코호트 비교 | 스탠드업에서 레버 진단 |
| 월간 | Input → 수료 선행 상관 검증 | 가설 보정, 목표 캘리브레이션 |
| 분기 | 지표 프레임 자체 재점검 | North Star·임계값 재설정 |

### 3.1 운영혁신 적용 수업만 분리 추적 (핵심)

운영혁신 수업이 수시로 신규 생성되므로, `course_id`를 대시보드에서 하나씩 추가하는 화이트리스트(Cohort)는 유지보수 지옥이 된다.

> **핵심 원칙**: 운영혁신 여부를 **코스 마스터에 전용 플래그 1개(`is_ops_innovation`)** 로 보유하고, 이벤트·User Property로 **자동 전파**한다. 신규 수업이 생겨도 대시보드는 **무수정**.

| 계층 | 역할 | 분모/분자 |
|---|---|---|
| 코스 마스터 `is_ops_innovation` | 단일 진실 공급원 | — |
| User Property (Identify) | 재적생 식별 | **분모** (미접속 포함) |
| Event Property (공통) | 이벤트 필터 | **분자** |

> 비율 분모는 활성 사용자가 아니라 **User Property 보유 재적생 모수**. 화이트리스트(Cohort) 방식은 폐기.

### 3.2 AI Q&A 만족도 측정 방법 (직접 별점 수집 불가 대안)

ALEX는 별점 UI가 없으나 `alex_chatbot_message_sent`에 **`message_content`가 수집**된다.

| 단계 | 방법 | 설명 | 개발 부담 |
|---|---|---|---|
| **단기 (즉시)** | 행동 프록시 | 멀티턴 지속률 · 재질문율(역) · ALEX→사람 에스컬레이션율(역) · 세션당 턴 수 | 0 |
| **중기 (권장)** | LLM-as-judge 배치 | `message_content`를 주기적으로 LLM이 품질 스코어링 | 배치만, UI 불필요 |
| **장기 (선택)** | 마이크로 피드백 | 답변 말미 👍/👎 → 신규 `alex_answer_rated {rating}` | 프론트 개발 필요 |

---

## 4. 데이터 로깅 이벤트 (최종 13종 + 기존 재사용 3 🔁)

**공통 이벤트 속성**: `user_id`, `user_type`(**trainee/tutor/manager**), `course_id`, `course_type`(kdt), `cohort_id`, `class_day_index`, `organization_name`, `is_ops_innovation`(boolean)
**User Property** (Identify, 분모용): `is_ops_innovation`, `enrolled_course_id`, `enrolled_cohort_id`, `user_type`
> 상세 설치·발화 시점은 [event-installation-guide.md](./event-installation-guide.md), 단일 진실은 Notion Event Dictionary.

| 그룹 | event_name | 트리거 | 핵심 속성 (공통 외) | 서비스 | 연결 지표 |
|---|---|---|---|---|---|
| 진입 | `kdt_classroom_home_entered` | 클래스룸 홈 진입 | — | bootcamp | 세션 베이스 |
| 퀴즈 | `kdt_class_quiz_started` | 강의 퀴즈 시작 | `quiz_id`, `question_count` | bootcamp | I1 funnel |
| 퀴즈 | `kdt_class_quiz_submitted` | 강의 퀴즈 제출 | `quiz_id`, `correct_count`, `score`, `duration_sec` | bootcamp | I1, 정답률, Counter |
| 퀴즈 | `kdt_class_quiz_explanation_viewed` | 결과 화면 열람 | `quiz_id` | bootcamp | 자기주도 |
| 퀴즈 | `kdt_wrong_answer_note_viewed` | 오답노트 열람 | — (페이지네이션 추가발화) | axp saas | 자기주도 |
| 퀴즈 | `kdt_supplementary_quiz_started` | 보충세트 생성 | `set_question_count`, `selected_date_count`, `set_wrong_answer`, `daily_set_count`, `daily_limit_reached` | axp saas | 자기주도 심화 |
| 퀴즈 | `kdt_supplementary_quiz_submitted` | 보충세트 제출 | `set_question_count`, `correct_count`, `daily_set_count`, `daily_limit_reached` | axp saas | Counter (어뷰징) |
| 회고 | `kdt_til_submitted` | TIL 게시(최초) | `til_id`, `char_count`, `write_duration_sec`(검토-선택) | bootcamp | I2, Counter |
| 회고 | `kdt_til_updated` | TIL 수정 | `til_id`, `edit_count` | bootcamp | I2 |
| 프로젝트 | `kdt_project_submitted` | 프로젝트 회차 제출 (마일스톤) | `project_round_id`, `project_round_type` | bootcamp | 마일스톤 |
| 프로젝트 | `kdt_project_viewed` | 프로젝트 회차 조회 | `project_round_id`, `project_round_type`, `project_round_url` | bootcamp | 보조 |
| 프로젝트 | `kdt_project_published_viewed` | 외부 공유 노출 | `project_round_id`, `project_round_type`, `project_round_url` | bootcamp | 보조 |
| 출석 | `kdt_classroom_trainee_verified` | 캠프파이어 입장 본인인증 | `result`(success/fail) | axp saas | 출석률 |
| AI 🔁 | `alex_chatbot_message_sent` | ALEX 대화 | `message_content` *(재사용)* | chat | I3, 만족도 프록시 |
| AI 🔁 | `alex_chatbot_dm_clicked` | ALEX DM 진입 | `unread_message` *(재사용)* | chat | I3 유입 |
| AI 🔁 | `milo_note_content_clicked` | MILO 노트 클릭 | `ai_note_content_date` *(재사용)* | bootcamp | I3 |

> **보류(삭제 예정)**: `kdt_practice_assigned`·`kdt_practice_submitted` (실습 메뉴 폐지, 회의 §2).

---

## 5. 구현 노트
- **데이터 소스**: 전 이벤트 클라이언트 발화 (Amplitude SDK). 서버 전용 이벤트 없음.
- **서비스명 혼재**: 수업/홈/TIL/프로젝트 = `bootcamp.likelion.net`, 보충/오답/본인인증 = `axp saas`. 파일럿 필터는 서비스 무관 `is_ops_innovation` User Property 기준.
- **공통 속성 단일 정의**: Notion ['공통 property 정의'](https://app.notion.com/p/38744860a4f481819ed0c9c30c265508) 참조.
- **수업 분리(§3.1)**: 코스 마스터 `is_ops_innovation` 플래그 자동 전파. 분모는 User Property.
- **AI 만족도(§3.2)**: 별점 직접 수집 불가 → 단기 행동 프록시, 중기 LLM-as-judge.

---

## 6. 후속 액션
- [x] Event Dictionary 13종 `개발서버 배포` 단계 (Notion 최종)
- [ ] 코스 마스터 `is_ops_innovation` 컬럼 + Admin 수업 신설 폼 항목
- [ ] `is_ops_innovation` User Property(Identify) + Event Property 계측
- [ ] 각 Input/Health 지표 Amplitude 차트·대시보드 구성 (분모 = 재적 User Property)
- [ ] AI 만족도 프록시 산출식 + LLM-as-judge 배치 PoC (§3.2)
- [ ] `kdt_project_viewed`/`kdt_project_published_viewed` 정의 텍스트 확인(복사 흔적) — 데이터팀 확인
