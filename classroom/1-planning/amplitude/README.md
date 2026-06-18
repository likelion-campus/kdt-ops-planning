# amplitude/ — 클래스룸 Amplitude 데이터 계측 (Planning)

> 소유: PM(Planning) · 분석 도구: **Amplitude** · 서비스명 태깅: `axp saas`
> 컨벤션: 이벤트명·속성 모두 **snake_case**, 행동은 과거형
> 이벤트 단일 진실(미러): Notion Event Dictionary (신규 11종 `검토 중` 등록 완료)

클래스룸의 **제품 분석(Amplitude)** 계측만 따로 모은 폴더. 성공지표·가설 → 핵심 지표 → 수집 이벤트까지의 기획을 담는다. (백엔드 도메인/시스템 이벤트인 `3-backend/events.yml` 과는 별개)

## 파일

| 파일 | 내용 |
|---|---|
| [metrics-framework.md](./metrics-framework.md) | North Star·Input·Health·Counter 지표 트리, 중간 수집 전략, 수업 분리(`is_ops_innovation`), AI 만족도 측정법 |
| [event-installation-guide.md](./event-installation-guide.md) | 개발자 설치 가이드 — 이벤트별 **페이지/발화 시점/발생 위치(클라vs서버)/속성** |

## 한눈에

- **North Star**: 일일 학습 루프 완수율 = 퀴즈 응시 AND 실습 제출 AND TIL 작성 *3종 전부 완수* 학생 비율
- **수업 분리**: 코스 마스터 `is_ops_innovation`(boolean) 플래그 → 이벤트·User Property 자동 전파 → 대시보드 무수정
- **신규 이벤트 11종** + 기존 재사용 3종(`alex_chatbot_message_sent`/`alex_chatbot_dm_clicked`/`milo_note_content_clicked`)

## 정합성 메모 (중요)

- **글로서리(SSOT) 정렬**: 보충 퀴즈는 `classroom/3-backend/glossary.yml`의 `SupplementaryQuiz` 기준으로 **하루 10세트(세트당 5/10/15문제) 한도**로 정정함. (이전 초안의 "하루 100문제"는 폐기)
- **⚠️ Notion 동기화 필요**: Notion `supplementary_quiz_submitted` 페이지는 아직 옛 "100문제" 기준 → 본 폴더 기준(10세트)으로 업데이트 필요.
- **명칭 정렬 검토 대상**: 도메인 엔티티는 `AIQuiz`/`QuizAttempt`/`WrongNote`. 현재 이벤트명(`daily_quiz_*`)은 Notion과 맞춘 것으로, 추후 도메인 명칭(`quiz_attempt_*`)으로 통일할지 별도 결정.

## 후속

- [ ] Notion Event Dictionary 보충퀴즈 항목 10세트 기준 동기화
- [ ] 코스 마스터 `is_ops_innovation` 컬럼 + Admin 수업 신설 폼 항목
- [ ] Amplitude 대시보드(North Star·Input·Health) 구성
