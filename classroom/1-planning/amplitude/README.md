# amplitude/ — 클래스룸 Amplitude 데이터 계측 (Planning)

> 소유: PM(Planning) · 분석 도구: **Amplitude** · 서비스명: 이벤트별 상이(`bootcamp.likelion.net`/`axp saas`)
> 컨벤션: 이벤트명·속성 모두 **snake_case**, 행동은 과거형
> 이벤트 **단일 진실(SSOT) = Notion Event Dictionary** (13종 `개발서버 배포` 단계). 본 폴더는 미러 — 충돌 시 Notion 우선.

클래스룸의 **제품 분석(Amplitude)** 계측만 따로 모은 폴더. 성공지표·가설 → 핵심 지표 → 수집 이벤트까지의 기획을 담는다. (백엔드 도메인/시스템 이벤트인 `3-backend/events.yml` 과는 별개)

## 파일

| 파일 | 내용 |
|---|---|
| [metrics-framework.md](./metrics-framework.md) | North Star·Input·Health·Counter 지표 트리, 중간 수집 전략, 수업 분리(`is_ops_innovation`), AI 만족도 측정법 |
| [event-installation-guide.md](./event-installation-guide.md) | 개발자 설치 가이드 — 이벤트별 **페이지/발화 시점/속성/서비스** (13종) |
| [dashboard-agent-prompt.md](./dashboard-agent-prompt.md) | Amplitude 대시보드 생성용 에이전트 프롬프트 |

## 한눈에 (Notion 최종본 v2 동기화)

- **North Star**: 일일 학습 루프 완수율 = `kdt_class_quiz_submitted` AND `kdt_til_submitted` *2종 전부 완수* (실습 폐지 / 프로젝트는 회차 마일스톤 별도)
- **수업 분리**: 코스 마스터 `is_ops_innovation`(boolean) 플래그 → 이벤트·User Property 자동 전파 → 대시보드 무수정
- **이벤트 13종**(개발서버 배포) + 기존 재사용 3종(`alex_chatbot_message_sent`/`alex_chatbot_dm_clicked`/`milo_note_content_clicked`)

## 정합성 메모 (중요)

- **Notion 최종본 동기화(v2)**: 이름 변경(`daily_quiz_*`→`class_quiz_*`, `attendance_checked`→`classroom_trainee_verified`[캠프파이어 본인인증]), 신규 3종(`supplementary_quiz_started`/`project_viewed`/`project_published_viewed`), 속성 조정(`is_completion_eligible`/`has_external_paste`/`is_external_published`/`entry_source` 제거, `user_type`에서 `ca` 제거).
- **실습(practice) 폐지**: 실습 메뉴 폐지(회의 §2)로 `kdt_practice_*` 보류(삭제 예정). 일일 루프는 퀴즈+TIL 2종.
- **보충 퀴즈**: `SupplementaryQuiz` 기준 **하루 10세트(5/10/15문제) 한도**. 생성=`kdt_supplementary_quiz_started`, 제출=`kdt_supplementary_quiz_submitted`.
- **⚠️ 확인 필요**: `kdt_project_viewed`/`kdt_project_published_viewed`의 Notion '이벤트 정의'가 `project_submitted`에서 복사된 흔적 — 데이터팀 확인.

## 후속

- [ ] 코스 마스터 `is_ops_innovation` 컬럼 + Admin 수업 신설 폼 항목
- [ ] Amplitude 대시보드(North Star·Input·Health) 구성 — [dashboard-agent-prompt.md](./dashboard-agent-prompt.md) 활용
