---
id: POL-CF-01
title: "Daily Check-in 참여 정책"
owner: "@pm-campfire-lead"
status: ready-for-dev
version: 1
related_prd: [PRD-campfire-daily-checkin]
terms: [Trainee, Operator, Squad, Daily Check-in, Cohort]
---

# POL-CF-01 — Daily Check-in 참여 정책

## 의도

매일 아침 Trainee가 Squad 동료들과 짧게 컨디션·계획을 공유함으로써
Operator가 이상 신호를 조기에 포착하고, Trainee 간 약한 연결을 강화한다.

## 정책

1. 모든 Trainee는 평일 09:00~10:30 사이 Daily Check-in을 1회 수행한다.
2. Check-in 미수행이 3일 연속 발생하면 Operator에게 알림이 발송된다.
3. Check-in은 Squad 단위로 진행되며, Squad 외 공개 여부는 Trainee가 선택한다.

## 비정책 (의도적으로 정하지 않음)

- 어떤 질문을 보여줄지는 디자인/운영 시즌별 실험으로 결정.
- 모바일 푸시 vs 슬랙 vs 이메일 채널 선택은 BE 구현에 위임.

## 기술값

본 정책에는 API/상태/스키마 정보를 적지 않는다.
→ 구현 세부는 `campfire/3-backend/data-model.md` 의 `DailyCheckin` 엔티티 참조.
