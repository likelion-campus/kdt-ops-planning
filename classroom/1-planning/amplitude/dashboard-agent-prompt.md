# Amplitude 대시보드 생성 — 에이전트 프롬프트

> 아래 블록을 Amplitude AI 에이전트(또는 대시보드 담당자)에게 그대로 전달하세요.
> 근거 설계: [metrics-framework.md](./metrics-framework.md) · 이벤트 명세: [event-installation-guide.md](./event-installation-guide.md)

---

## 프롬프트 (copy & paste)

```
당신은 Amplitude 분석 전문가입니다. 아래 명세대로 KDT 클래스룸 운영혁신 파일럿 대시보드를 만들어 주세요.

## 컨텍스트
- 제품: KDT 부트캠프 클래스룸 (운영혁신 파일럿 = 백엔드 자바 26기)
- 검증 목표: "강사 의존도↓ + 자기주도학습↑ → 비용·품질 동시 개선, 수료율 유지"
- 모든 이벤트/속성은 snake_case. 신규 이벤트는 kdt_ 프리픽스.

## 전역 필터 (모든 차트 공통)
- User Property `is_ops_innovation = true` 로 필터 (운영혁신 적용 수업 재적생만).
  ※ 이 값은 미접속 재적생까지 포함하는 모수(분모) 기준이므로, 비율 지표의 분모는
    "is_ops_innovation=true 인 활성 사용자 수"가 아니라 "해당 User Property를 가진 전체 재적생 수"로 잡아주세요.
- 기간: 파일럿 개강일(2026-06-30)~현재, 일 단위. 비교 기간 옵션 on.
- 세그먼트 분리 옵션: `cohort_id`, 분반(있으면) 기준 비교 뷰 제공.

## 사용 이벤트 (snake_case)
- kdt_classroom_home_entered (entry_source)
- kdt_daily_quiz_started / kdt_daily_quiz_submitted (correct_count, score, duration_sec, is_completion_eligible)
- kdt_quiz_explanation_viewed / kdt_wrong_answer_note_viewed
- kdt_supplementary_quiz_submitted (set_question_count, daily_set_count, daily_limit_reached)
- kdt_til_submitted (char_count, write_duration_sec, has_external_paste, has_artifact_url) / kdt_til_updated
- kdt_project_submitted (project_round_type, is_external_published) — 회차 마일스톤
- kdt_attendance_checked (result)
- (재사용) alex_chatbot_message_sent, alex_chatbot_dm_clicked, milo_note_content_clicked

## 만들 차트

### 1. ⭐ North Star — 일일 학습 루프 완수율 (대표 차트, 최상단)
- 정의: 같은 날(day) 안에서 kdt_daily_quiz_submitted AND kdt_til_submitted
  를 모두 수행한 고유 사용자 수 / is_ops_innovation 재적생 수. (실습 폐지 → 2종)
- 구현: 2개 이벤트 모두 수행한 사용자를 Event Segmentation의 "performed all of"
  (또는 마이크로 퍼널/세그먼트 교집합)로 산출 → 재적 모수로 나눈 비율(%)을 일별 라인.
- 보조 차트: "2종 중 N종 완수" 분포 (0/1/2종) 일별 stacked — 어디서 이탈하는지 진단.

### 2. Input Metrics (3종, 일별 라인 + 목표선)
- I1 퀴즈 응시율 = kdt_daily_quiz_submitted 고유 사용자 / 재적 모수. 목표선 80%.
- I2 TIL 작성률 = kdt_til_submitted 고유 사용자 / 재적 모수. 목표선 70%.
- I3 AI 자가학습 활용률 = (alex_chatbot_message_sent OR milo_note_content_clicked) 고유 사용자 / 재적 모수.
- (마일스톤·별도) 프로젝트 회차 제출률 = 회차별 kdt_project_submitted 고유 사용자 / 재적 모수. 일일 Input 아님.

### 3. Health Metrics (경보용, 임계값 표시)
- 출석·접속 유지율 = kdt_attendance_checked(result=success) 고유 사용자 / 재적 모수. Green≥95 / Yellow 90–95 / Red<90.
- 퀴즈 평균 정답률 = avg(kdt_daily_quiz_submitted.correct_count / question_count). Green 55–75%.
- AI Q&A 유효성(프록시) = alex_chatbot_message_sent 사용자당 평균 메시지 수(멀티턴 지속 프록시) 추세. (별점 직접수집 불가)
- (가능 시) 플랫폼 uptime은 외부 모니터링 연동 — Amplitude 외 별도.

### 4. Counter Metrics (Goodhart 방지)
- 퀴즈 무성의 응답률 = kdt_daily_quiz_submitted 중 duration_sec 하위 임계값 이하 비율 + kdt_supplementary_quiz_submitted.daily_limit_reached=true 비율.
- TIL 빈껍데기율 = kdt_til_submitted 중 has_external_paste=true 또는 char_count/write_duration_sec 하위 임계값 비율.

### 5. 보조 — 퍼널 & 리텐션
- 일일 학습 퍼널: kdt_classroom_home_entered → kdt_daily_quiz_submitted → kdt_til_submitted.
- 주차별 리텐션: kdt_classroom_home_entered 기준 N-day retention.

## 출력
- 위 차트를 하나의 대시보드("KDT 클래스룸 운영혁신 파일럿")로 묶고, North Star를 최상단 배치.
- 각 차트에 정의·분모 기준을 caption으로 명시.
- 일간 글랜스(North Star+Health) / 주간(Input 추세) 뷰로 그룹핑.
```

---

## 참고 (에이전트 전달 시 함께 안내)
- **분모 주의**: 비율 지표 분모는 enrollment 기반(`is_ops_innovation` User Property 보유 재적생)이어야 정확. 활성 사용자 분모로 잡으면 사용률이 과대 계상됨.
- **북극성 교집합 산출**이 Amplitude UI에서 까다로우면, 2종 이벤트를 일별로 1/0 처리 후 사용자×일 단위 파생 지표(Custom/Computed)로 만드는 방식을 제안.
- **AI 만족도**는 별점 미수집 → 1차는 프록시(멀티턴/에스컬레이션), 정밀 측정은 message_content LLM-as-judge 배치(대시보드 외부).
