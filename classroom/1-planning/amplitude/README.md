# amplitude/ — 클래스룸 Amplitude 데이터 계측 (Planning)

> 소유: PM(Planning) · 분석 도구: **Amplitude** · 서비스명 태깅: `axp saas`
> 컨벤션: 이벤트명·속성 모두 **snake_case**, 행동은 과거형
> 이벤트 단일 진실(미러): Notion Event Dictionary (신규 10종 `검토 중` 등록)

클래스룸의 **제품 분석(Amplitude)** 계측만 따로 모은 폴더. 성공지표·가설 → 핵심 지표 → 수집 이벤트까지의 기획을 담는다. (백엔드 도메인/시스템 이벤트인 `3-backend/events.yml` 과는 별개)

## 파일

| 파일 | 내용 |
|---|---|
| [metrics-framework.md](./metrics-framework.md) | North Star·Input·Health·Counter 지표 트리, 중간 수집 전략, 수업 분리(`is_ops_innovation`), AI 만족도 측정법 |
| [event-installation-guide.md](./event-installation-guide.md) | 개발자 설치 가이드 — 이벤트별 **페이지/발화 시점/발생 위치(클라vs서버)/속성** |

## 한눈에

- **North Star**: 일일 학습 루프 완수율 = 퀴즈 응시 AND TIL 작성 *2종 전부 완수* 학생 비율 (실습 폐지 / 프로젝트는 회차 마일스톤 별도)
- **수업 분리**: 코스 마스터 `is_ops_innovation`(boolean) 플래그 → 이벤트·User Property 자동 전파 → 대시보드 무수정
- **신규 이벤트 10종** + 기존 재사용 3종(`alex_chatbot_message_sent`/`alex_chatbot_dm_clicked`/`milo_note_content_clicked`)

## 정합성 메모 (중요)

- **실습(practice) 폐지 반영**: 실습 메뉴는 폐지(회의 §2, 자율 운영+AI노트·Alex 통합)되어 `kdt_practice_*` 이벤트 제거. 일일 루프는 퀴즈+TIL 2종, 프로젝트는 회차 마일스톤(`kdt_project_submitted`)으로 분리.
- **글로서리(SSOT) 정렬**: 보충 퀴즈는 `classroom/3-backend/glossary.yml`의 `SupplementaryQuiz` 기준으로 **하루 10세트(세트당 5/10/15문제) 한도**. (이전 초안의 "하루 100문제"는 폐기, Notion 동기화 완료)
- **명칭 정렬 검토 대상**: 도메인 엔티티는 `AIQuiz`/`QuizAttempt`/`WrongNote`. 현재 이벤트명(`kdt_daily_quiz_*`)은 Notion과 맞춘 것으로, 추후 도메인 명칭(`quiz_attempt_*`)으로 통일할지 별도 결정.

## 후속

- [ ] 코스 마스터 `is_ops_innovation` 컬럼 + Admin 수업 신설 폼 항목
- [ ] Amplitude 대시보드(North Star·Input·Health) 구성 — [dashboard-agent-prompt.md](./dashboard-agent-prompt.md) 활용
