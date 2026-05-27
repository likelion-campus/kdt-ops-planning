---
terms: [Lecture, Session, AINote, Attendance, Trainee, Cohort]
owner: "@be-classroom-lead"
---

# Classroom — Data Model (planning surface)

## 엔티티

### Lecture
- `id`, `cohort_id`, `title`, `start_at`, `end_at`

### Session
- `id`, `lecture_id`, `kind` (`live|recorded`), `start_at`, `entry_window_min` (default 10), `entry_grace_min` (default 30)

### Attendance
- `id`, `trainee_id`, `session_id`, `entered_at`, `left_at`, `status` (`present|late|absent|left_early`)

### AINote
- `id`, `trainee_id`, `session_id`, `content` (jsonb), `updated_at`

## 정책 추적

- POL-CR-01 §1 → `Session.entry_window_min`, `entry_grace_min`
- POL-CR-01 §2 → 5분 idle 감지 → `Attendance.status = left_early`
