# 클래스룸 데이터 계측 설계 v1 — 핵심 지표 & 로깅 이벤트

> 대상: KDT 클래스룸 (파일럿 = 백엔드 자바 26기, 2026-06-30 개강)
> 분석 스택: Amplitude · 서비스명: `axp saas`
> 컨벤션: 이벤트명·속성 모두 snake_case, 행동은 과거형 (기존 Event Dictionary 준수)
> 상태: v1.3 (North Star=퀴즈+TIL 2종 완수 / **실습(practice) 폐지 반영** / 프로젝트는 회차 마일스톤 별도 / 스코프=신규 10종+재사용 3종 / 수업 분리=코스 마스터 `is_ops_innovation` 플래그 / AI 만족도=프록시+LLM-judge)

---

## 1. 측정 철학 — 무엇을 증명하나

파일럿 핵심 가설: **"강사 의존도↓ + 자기주도학습↑ → 비용·품질 동시 개선, 수료율 유지"**
→ 데이터가 증명할 단 하나: **강사가 끌고 가지 않아도 학생이 스스로 핵심 학습 사이클을 도는가.** 모든 지표는 여기서 역산한다.

| 가설 | 핵심 질문 | 대표 지표 |
|---|---|---|
| H1 자기주도학습 ↑ | 강사 시간 줄여도 학습 루프가 돌아가나 | **North Star (학습루프 완수율)** |
| H2 AXP 자동화 실작동 | AI(ALEX/MILO)가 강사 역할을 실제로 대체하나 | Input I3 (AI 자가학습 활용률) |
| H3 만족도·수료율 유지 | 자기주도로 바꿔도 품질이 안 떨어지나 | Health/Counter (정답률·만족도·수료율) |

---

## 2. 핵심 지표 트리

### ⭐ North Star — 일일 학습 루프 완수율 (Daily Learning-Loop Completion Rate)
**정의**: `당일 ① 퀴즈 응시 AND ② TIL 작성을 모두 완수한 학생 수 / 당일 재적 학생 수`
- **active 기준 = 2종 전부 완수 (엄격)** — 실습 폐지로 일일 학습 루프는 퀴즈+TIL 2종. 가장 보수적으로 자기주도학습을 증명하며, 추세 상승이 핵심.
- **근거**: 강사 개입 없이 능동 학습 사이클이 도는 직접 증거이자 수료율의 선행지표. 단순 접속(허영지표) 아님.
- **보조 추적**: "2종 중 N종 완수"(0/1/2) 분포로 어디서 이탈하는지 진단. 프로젝트(회차)는 일일 루프가 아닌 **마일스톤**(`kdt_project_submitted`)으로 별도 추적.

### Input Metrics — North Star를 움직이는 레버
| # | 지표 | 정의 | 기능 | 목표 |
|---|---|---|---|---|
| I1 | 퀴즈 응시율 | 당일 퀴즈 응시 학생 / 재적 | 퀴즈 | ≥80% (수료조건) |
| I2 | 회고(TIL) 작성률 | 당일 TIL 작성 학생 / 재적 | TIL | ≥70% |
| I3 | AI 자가학습 활용률 | ALEX 대화 or MILO 노트 사용 학생 / 재적 | AXP | 측정 후 (H2 핵심) |

> Input은 MECE하게 North Star를 설명한다: 완수율 = I1·I2의 교집합, I3는 그 둘을 끌어올리는 자동화 동력.
> I3은 **신규 이벤트 정의 없이 기존 운영 이벤트를 재사용**한다: `alex_chatbot_message_sent`(ALEX 대화), `milo_note_content_clicked`(노트 열람).
> **마일스톤 지표(별도)**: 프로젝트 회차 제출률 = 회차별 `kdt_project_submitted` 제출 학생 / 재적 (일일 Input 아님, 회차 단위).

### Health Metrics — 흔들리면 경보
| 지표 | 정의 | Green | Yellow | Red | 주기 |
|---|---|---|---|---|---|
| 출석·접속 유지율 | QR 인증 출석 / 재적 | ≥95% | 90–95% | <90% | 일 |
| 퀴즈 평균 정답률 | 난이도 적정 밴드 | 55–75% | 45–55·75–85% | <45·>85% | 일 |
| AI Q&A 유효성 (프록시) | §3.2 참조 — 멀티턴 지속률 + 사람 에스컬레이션율(역) | 지속↑·에스컬↓ | 보합 | 지속↓·에스컬↑ | 주 |
| 플랫폼 uptime | Campfire 가동률 | ≥99.5% | 99–99.5% | <99% | 일 |

> AI Q&A **만족도 별점은 현재 직접 수집 불가** → 행동 프록시 + LLM-as-judge로 대체. 측정 방법은 §3.2.

### Counter Metrics — Goodhart 방지 (완수율만 좇다 빈껍데기 되는지)
| 지표 | 왜 보나 | 경보 신호 |
|---|---|---|
| 퀴즈 무성의 응답률 | 응시율↑ 위해 찍기 | `kdt_daily_quiz_submitted.duration_sec` 과소 비율↑, `kdt_supplementary_quiz_submitted.daily_limit_reached` ↑ |
| TIL 형식충족 vs 실질 | 작성률↑ 위해 빈껍데기 | `kdt_til_submitted.write_duration_sec` 과소·`has_external_paste=true` 비율↑, `char_count` 과소 |

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

현재 전체 이벤트는 모든 수업을 한 번에 추적한다. 학생은 보통 **부트캠프 1수업만 수강**하므로, 운영혁신 적용 수업만 추려 **"전체 재적생 대비 사용량"** 을 보려고 한다. 그런데 **운영혁신 수업은 수시로 신규 생성**되므로, `course_id`를 대시보드에서 하나씩 추가하는 화이트리스트(Cohort) 방식은 신규 수업마다 손이 가는 **유지보수 지옥**이 된다.

> **핵심 원칙**: 운영혁신 여부를 **코스 마스터(원천 데이터)에 전용 플래그 1개로 보유**하고, 그것이 이벤트·User Property로 **자동 전파**되게 한다. 그러면 신규 수업이 생겨도 대시보드는 **무수정**이다.

**✅ 권장 — `is_ops_innovation` (boolean), 코스 마스터 소유 속성**

| 항목 | 내용 |
|---|---|
| 원천(Source of Truth) | 코스/프로그램 마스터 테이블에 컬럼 1개 (`is_ops_innovation`) |
| 태깅 시점 | **수업 신설 시 Admin(F10)에서 체크 1번** → 이후 전부 자동 |
| 자동 전파 | 모든 이벤트 공통 속성 + 로그인 시 User Property로 함께 전송 |
| 대시보드 | `is_ops_innovation = true` **한 줄 필터** — 신규 수업 추가돼도 대시보드 무수정 |
| 거버넌스 | 코스 생성 워크플로에 "운영혁신 여부" 항목 포함 (운영팀 지정) |

**모수(분모) 확보 — User Property 병행 (중요)**
이벤트만으로는 미접속 재적생이 집계되지 않아 "전체 재적 대비 사용률"의 분모가 샌다. 로그인 시 Identify로 `is_ops_innovation`, `enrolled_cohort_id`, `enrolled_course_id`를 **User Property**로 세팅 → 접속·이벤트 발생 여부와 무관하게 재적 모수 확보.

| 계층 | 역할 | 분모/분자 |
|---|---|---|
| 코스 마스터 `is_ops_innovation` | 단일 진실 공급원 | — |
| User Property (Identify) | 재적생 식별 | **분모** (미접속 포함) |
| Event Property (공통) | 이벤트 필터 | **분자** |

> **화이트리스트(Cohort) 방식은 폐기**, 보조 편의용으로만. boolean으로 충분하나, 향후 트랙이 여러 개(운영혁신 A/B·재직자 등)로 늘면 enum `course_track`으로 승격 가능.

### 3.2 AI Q&A 만족도 측정 방법 (직접 별점 수집 불가 대안)

ALEX는 별점 UI가 없어 만족도를 직접 못 받는다. 단 `alex_chatbot_message_sent`에 **`message_content`가 이미 수집**되므로 이를 활용한다.

| 단계 | 방법 | 설명 | 개발 부담 |
|---|---|---|---|
| **단기 (즉시)** | 행동 프록시 | • 멀티턴 지속률(답변 유효 시 대화 이어감)<br>• 재질문율(같은 주제 반복 = 역지표)<br>• **ALEX→사람(강사/매니저) 에스컬레이션율**(AI 미해결 = 역지표)<br>• 세션당 평균 턴 수 | 0 (기존 이벤트로 산출) |
| **중기 (권장)** | LLM-as-judge 배치 | 수집된 `message_content`를 주기적으로 LLM이 답변 품질(정확성·관련성·완결성) 스코어링 | 분석 배치만, UI 불필요 |
| **장기 (선택)** | 마이크로 피드백 | 답변 말미 👍/👎 1클릭 → 신규 이벤트 `alex_answer_rated {rating}` | 프론트 개발 필요, 응답률 낮음 |

> 단기는 프록시로 시작, 중기 LLM-as-judge가 가장 비용 대비 정확. Health 지표는 우선 프록시(멀티턴 지속률↑ + 에스컬레이션율↓)로 운영.

---

## 4. 데이터 로깅 이벤트 (1차 = 13종 · 신규 10 + 기존 재사용 3 🔁)

**공통 이벤트 속성** (전 이벤트 기본 첨부, Amplitude 기본 속성 외):
`user_id`, `user_type`(**trainee/tutor/manager/ca** — 기존 컨벤션 준수), `course_id`, `course_type`(kdt), `cohort_id`, `class_day_index`(개강 후 N일차), `organization_name`, **`is_ops_innovation`(boolean — 코스 마스터에서 자동 전파, §3.1)**

**User Property** (Identify로 로그인 시 1회 세팅 — §3.1, 분모 확보용):
`is_ops_innovation`, `enrolled_cohort_id`, `enrolled_course_id`, `user_type`

| 그룹 | event_name | 트리거 | 핵심 속성 (공통 외) | 연결 지표 |
|---|---|---|---|---|
| 진입 | `kdt_classroom_home_entered` | F7 단일진입점 홈 진입 | `entry_source` | 세션 베이스 |
| 퀴즈 | `kdt_daily_quiz_started` | 09시 퀴즈 시작 | `quiz_id`, `question_count` | I1 |
| 퀴즈 | `kdt_daily_quiz_submitted` | 퀴즈 제출 | `quiz_id`, `correct_count`, `score`, `duration_sec`, `is_completion_eligible` | I1, 정답률, Counter |
| 퀴즈 | `kdt_quiz_explanation_viewed` | 자동해설 열람 | `quiz_id`, `question_id` | 자기주도 |
| 퀴즈 | `kdt_wrong_answer_note_viewed` | 오답노트 열람 | `entry_source` | 자기주도 |
| 퀴즈 | `kdt_supplementary_quiz_submitted` | 보충퀴즈 세트 제출 (하루 10세트 한도) | `set_question_count`, `correct_count`, `daily_set_count`, `daily_limit_reached` | Counter (어뷰징) |
| 회고 | `kdt_til_submitted` | TIL 작성(최초 게시) | `til_id`, `char_count`, `has_artifact_url`, `write_duration_sec`, `has_external_paste` | I2, Counter |
| 회고 | `kdt_til_updated` | TIL 수정 | `til_id`, `edit_count` | I2 |
| 프로젝트 | `kdt_project_submitted` | 프로젝트 회차 제출 (마일스톤) | `project_round_id`, `project_round_type`(basic/advanced/final/etc), `is_external_published` | 마일스톤 |
| AI | `alex_chatbot_message_sent` 🔁 | ALEX와 대화(메시지 전송) | `message_content`, `course_id`, `user_id` *(기존 운영 이벤트 재사용)* | I3 (H2), 만족도 프록시 |
| AI | `alex_chatbot_dm_clicked` 🔁 | DM 목록에서 ALEX 진입 | `unread_message`(Hook 경유 vs 자발) *(기존 재사용)* | I3 유입 경로 |
| AI | `milo_note_content_clicked` 🔁 | MILO AI노트 콘텐츠 클릭 *(기존 운영 이벤트 재사용)* | `ai_note_content_date` | I3 |
| 출석 | `kdt_attendance_checked` | QR 본인인증 출석 | `method`(qr_auth), `result`(success/fail) | 출석률 |

### 2차 이관 (스코프 외 — 핵심 루프 안정화 후)
- `kdt_til_featured` (우수 TIL 게시) — 품질
- `kdt_camera_signal_lost` (카메라OFF/얼굴미감지 10분) — engagement/개입
- `kdt_manager_alert_acted` (매니저 알림 후 행동) — 알림 대응률
- `kdt_instructor_attendance_checked` (F11 강사 근태) — 강사시간(비용) 검증

---

## 5. 구현 노트
- **데이터 소스**: 클라이언트 이벤트 = Amplitude SDK (Campfire 프론트), 서버 사이드 = 퀴즈 채점 등 백엔드 이벤트.
- **서비스명 태깅**: 신규 이벤트 `axp saas`. (재사용 ALEX 이벤트는 기존 `chat.likelion.net` 유지 — `is_ops_innovation` user property로 파일럿 필터)
- **기존 자산 재사용(🔁)**: ALEX 대화 = `alex_chatbot_message_sent`(+`alex_chatbot_dm_clicked`), 노트 = `milo_note_content_clicked` 등 MILO 계열. 신규 정의 대신 기존 Event Dictionary 항목 연결.
- **수업 분리(§3.1)**: 코스 마스터 `is_ops_innovation` 플래그가 단일 진실 공급원 → 이벤트 공통 속성 + 로그인 User Property로 자동 전파. 신규 수업 추가 시 대시보드 무수정. 분모(재적생)는 User Property 기준.
- **AI 만족도(§3.2)**: 별점 직접 수집 불가 → 단기 행동 프록시, 중기 `message_content` LLM-as-judge.
- **등록 워크플로**: 후속으로 Event Dictionary(`collection://2cd44860-a4f4-8013-a9a1-000be7e9f7e2`)에 신규 10종을 `적용단계 = 검토 중`으로 등록 → 개발서버 배포 시 단계 전환.

---

## 6. 후속 액션 (검증 후)
- [ ] Event Dictionary에 **신규 10종** 행 등록 (`적용단계 = 검토 중`), ALEX/MILO 3종은 기존 연결
- [ ] 코스 마스터에 `is_ops_innovation` 컬럼 추가 + Admin(F10) 수업 신설 폼에 "운영혁신 여부" 항목 추가
- [ ] `is_ops_innovation` User Property(Identify) + Event Property 계측 요청서 (§3.1)
- [ ] 각 Input/Health 지표 Amplitude 차트·대시보드 구성 (분모 = 재적 User Property)
- [ ] AI 만족도 프록시 지표 산출식 확정 + LLM-as-judge 배치 PoC (§3.2)
- [ ] North Star 코호트(분반·기수) 비교 뷰 셋업
- [ ] 2차 이벤트 4종 정의 확장
