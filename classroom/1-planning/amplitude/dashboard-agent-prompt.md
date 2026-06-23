# Amplitude 대시보드 생성 — 에이전트 프롬프트 (v2 · Notion 최종본 기준)

> 아래 ``` 블록을 Amplitude AI 에이전트(또는 대시보드 담당자)에게 그대로 전달하세요.
> 근거: [metrics-framework.md](./metrics-framework.md) · 이벤트 명세: [event-installation-guide.md](./event-installation-guide.md)
> 이벤트 단일 진실(SSOT) = Notion Event Dictionary (13종, 개발서버 배포).

---

## 프롬프트 (copy & paste)

```
당신은 Amplitude 분석 전문가입니다. 아래 명세대로 "KDT 클래스룸 운영혁신 파일럿" 대시보드를 만들어 주세요.

## 컨텍스트
- 제품: KDT 부트캠프 클래스룸 (운영혁신 파일럿 = 백엔드 자바 26기, 2026-06-30 개강)
- 검증 목표: "강사 의존도↓ + 자기주도학습↑ → 비용·품질 동시 개선, 수료율 유지"
- 이벤트/속성은 모두 snake_case. 클래스룸 신규 이벤트는 kdt_ 프리픽스.

## 전역 필터 (모든 차트 공통)
- User Property `is_ops_innovation = true` 로 필터 (운영혁신 적용 수업 재적생만).
- ★ 비율 지표의 분모는 "이벤트를 친 활성 사용자"가 아니라 "is_ops_innovation=true User Property를 가진 전체 재적생 수"(미접속 포함)로 잡으세요. 활성 사용자 분모로 잡으면 사용률이 과대 계상됩니다.
- 기간: 개강일(2026-06-30)~현재, 일 단위. 비교 기간 옵션 on.
- 세그먼트 비교: cohort_id(기수), 분반(있으면) 기준 분리 뷰 제공.
- 주의: 서비스명이 이벤트마다 다름(bootcamp.likelion.net / axp saas) → 서비스로 필터하지 말고 is_ops_innovation User Property로만 필터.

## 사용 이벤트 (Notion 최종 13종 + 재사용 3)
- kdt_classroom_home_entered
- kdt_class_quiz_started / kdt_class_quiz_submitted (quiz_id, question_count, correct_count, score, duration_sec)
- kdt_class_quiz_explanation_viewed (quiz_id) — 결과 화면 열람
- kdt_wrong_answer_note_viewed
- kdt_supplementary_quiz_started (set_question_count, selected_date_count, set_wrong_answer, daily_set_count, daily_limit_reached)
- kdt_supplementary_quiz_submitted (set_question_count, correct_count, daily_set_count, daily_limit_reached)
- kdt_til_submitted (til_id, char_count, write_duration_sec) / kdt_til_updated (edit_count)
- kdt_project_submitted (project_round_id, project_round_type) — 회차 마일스톤
- kdt_project_viewed / kdt_project_published_viewed (project_round_url)
- kdt_classroom_trainee_verified (result) — 캠프파이어 입장 본인인증(출석 프록시)
- (재사용) alex_chatbot_message_sent, alex_chatbot_dm_clicked, milo_note_content_clicked

## 만들 차트

### 1. ⭐ North Star — 일일 학습 루프 완수율 (최상단)
- 정의: 같은 날(day) 안에서 kdt_class_quiz_submitted AND kdt_til_submitted 를 모두 수행한 고유 사용자 수 / is_ops_innovation 재적생 수.
- 구현: 두 이벤트 "performed all of"(또는 마이크로 퍼널/세그먼트 교집합)로 산출 → 재적 모수로 나눈 비율(%)을 일별 라인.
- 보조: "2종 중 N종 완수"(0/1/2) 일별 stacked — 어디서 이탈하는지 진단.

### 2. Input Metrics (일별 라인 + 목표선)
- I1 퀴즈 응시율 = kdt_class_quiz_submitted 고유 사용자 / 재적 모수. 목표선 80%.
- I2 TIL 작성률 = kdt_til_submitted 고유 사용자 / 재적 모수. 목표선 70%.
- I3 AI 자가학습 활용률 = (alex_chatbot_message_sent OR milo_note_content_clicked) 고유 사용자 / 재적 모수.

### 3. Health Metrics (경보용, 임계값 밴드)
- 출석·접속 유지율 = kdt_classroom_trainee_verified(result=success) 고유 사용자 / 재적 모수. Green≥95 / Yellow 90–95 / Red<90.
- 퀴즈 평균 정답률 = avg(kdt_class_quiz_submitted.correct_count / question_count). Green 55–75%.
- AI Q&A 유효성(프록시) = alex_chatbot_message_sent 사용자당 평균 메시지 수(멀티턴 지속) 추세. (별점 직접수집 불가)
- 플랫폼 uptime은 외부 모니터링 — Amplitude 외 별도.

### 4. Counter Metrics (Goodhart 방지)
- 퀴즈 무성의 응답률 = kdt_class_quiz_submitted 중 duration_sec 하위 임계값 이하 비율 + kdt_supplementary_quiz_submitted.daily_limit_reached=true 비율.
- TIL 빈껍데기율 = kdt_til_submitted 중 char_count / write_duration_sec 하위 임계값 비율.

### 5. 마일스톤 — 프로젝트 (별도 섹션, 회차 단위)
- 회차별 제출률 = kdt_project_submitted 고유 사용자 / 재적 모수 (project_round_type별: basic/advanced/final).
- 외부 공유 노출 = kdt_project_published_viewed 추세.

### 6. 보조 — 퍼널 & 리텐션
- 일일 학습 퍼널: kdt_classroom_home_entered → kdt_class_quiz_submitted → kdt_til_submitted.
- 주차별 리텐션: kdt_classroom_home_entered 기준 N-day retention.
- 자기주도 심화: kdt_supplementary_quiz_started/submitted, kdt_wrong_answer_note_viewed 사용률.

## 출력
- 위 차트를 하나의 대시보드("KDT 클래스룸 운영혁신 파일럿")로 묶고 North Star를 최상단 배치.
- 각 차트 caption에 정의·분모 기준 명시.
- 뷰 그룹: 일간 글랜스(North Star+Health) / 주간(Input 추세) / 마일스톤(프로젝트).
```

---

## 참고 (에이전트 전달 시 함께 안내)
- **분모 주의**: 비율 분모는 enrollment 기반(`is_ops_innovation` User Property 보유 재적생). 활성 사용자 분모는 과대 계상.
- **북극성 교집합**이 UI에서 까다로우면 2종 이벤트를 일별 1/0 처리 후 사용자×일 파생 지표(Custom/Computed)로.
- **AI 만족도**는 별점 미수집 → 1차 프록시(멀티턴/에스컬레이션), 정밀은 message_content LLM-as-judge 배치(대시보드 외부).
- **⚠️ 데이터 확인**: `kdt_project_viewed`/`kdt_project_published_viewed`는 Notion 정의 텍스트에 복사 흔적 있음 — 실제 트리거(조회/외부노출) 데이터팀 확인 후 차트 확정.
