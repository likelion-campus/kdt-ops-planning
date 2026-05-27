---
id: TC-CF-checkin
related_prd: PRD-campfire-daily-checkin
related_policies: [POL-CF-01]
owner: "@qa-campfire-lead"
terms: ["Daily Check-in", Trainee, Operator]
---

# TC-CF-checkin — Daily Check-in 테스트케이스

## TC-1: 정상 제출

| 단계 | 입력 | 기대결과 |
|---|---|---|
| 1 | 09:05 앱 진입 | CheckinCard 상태=not_submitted |
| 2 | 3개 질문 응답 후 제출 | API 200, 카드 상태=submitted, `checkin_submitted` 이벤트 발화 |
| 3 | Squad 보드 진입 | 본인 응답이 오늘 컬럼에 표시 |

## TC-2: 시간 외 진입

| 단계 | 기대결과 |
|---|---|
| 11:00 진입 | "오늘은 제출 시간이 지났습니다" 비활성 카드 표시 |

## TC-3: 3일 연속 미수행 알림

| 사전조건 | 기대결과 |
|---|---|
| 평일 3일 연속 미제출 | Operator의 `/campfire/operator/alerts` 응답에 해당 Trainee 포함 + `checkin_missed_streak_3` 이벤트 발화 |
