---
terms: [Trainee, Operator, Squad, "Daily Check-in", CheckinPrompt, StreakCount]
owner: "@be-campfire-lead"
---

# Campfire — Data Model (planning surface)

실제 DDL/마이그레이션은 `campfire-be` 레포의 `db/` 디렉터리.
여기서는 **엔티티·관계·핵심 컬럼 의도**만 정의한다.

## 엔티티

### Squad
- `id` (uuid)
- `cohort_id` (uuid, FK)
- `name` (text)
- `member_count` (int, denormalized, 5~7)

### DailyCheckin
- `id` (uuid)
- `trainee_id` (uuid, FK)
- `squad_id` (uuid, FK)
- `prompt_id` (uuid, FK → CheckinPrompt)
- `mood` (enum: `great|ok|tired|stuck`)
- `today_goal` (text)
- `blocker` (text, nullable)
- `submitted_at` (timestamptz)
- 유니크: `(trainee_id, date(submitted_at))`

### CheckinPrompt
- `id` (uuid)
- `version` (int)
- `questions` (jsonb, 3개)
- `active_from` (date)

### StreakCount (read-model)
- `trainee_id`, `current_streak`, `last_checkin_at`

## 핵심 관계

```
Cohort 1—n Squad 1—n Trainee
Trainee 1—n DailyCheckin n—1 CheckinPrompt
```

## 정책 추적

- POL-CF-01 §2 "3일 연속 미수행 시 Operator 알림" → `DailyCheckin` 부재 감지 잡(Job).
