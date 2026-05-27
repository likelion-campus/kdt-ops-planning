---
id: PRD-campfire-daily-checkin
title: "Daily Check-in 기능"
owner: "@pm-campfire-lead"
status: draft     # draft | design-review | tech-review | ready-for-dev
version: 0.1
personas: [P1, P2]
related_policies: [POL-CF-01]
terms: [Trainee, Operator, Squad, Daily Check-in]

# status 가 design-review 이상이면 필수
figma: []         # 예: ["https://www.figma.com/design/xxx?node-id=1-23"]
api_refs: []      # 예: ["GET /campfire/checkin/today", "POST /campfire/checkin"]
---

# PRD — Daily Check-in 기능

## 문제

운영진(Operator)은 Trainee 60명의 컨디션과 진행 상황을
슬랙 DM·구글 시트로 분산 수집하다 보니 누락이 잦다.

## 사용자 시나리오

1. P1 Trainee가 오전 09:00 푸시 알림을 받는다.
2. 1분 이내에 3개 질문(컨디션/오늘 목표/막힘)에 답한다.
3. P2 Operator는 Squad별 답변을 보드에서 한눈에 확인한다.

## 성공 지표

- 평일 참여율 ≥ 85%
- Operator의 이상 신호 발견까지 평균 시간 < 4h

## 범위 (이번 버전)

- 모바일 우선 (PC는 fallback)
- 익명 옵션 없음 (Squad 내 공유)

## 비범위

- AI 자동 요약 (다음 분기)
- 멘토 공유 (M4 이후)

## 참고

- 정책: `campfire/1-planning/policies/POL-CF-01-example.md`
- UX 플로우: `campfire/2-design/ux-flows/example-flow.md`
- 데이터 모델: `campfire/3-backend/data-model.md` (status가 tech-review 진입 시 작성)
