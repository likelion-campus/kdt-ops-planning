---
terms: [Trainee, "Daily Check-in", Squad]
owner: "@fe-campfire-lead"
related_prd: [PRD-campfire-daily-checkin]
---

# Campfire — FE UI Spec

본 문서는 **컴포넌트 단위 동작 규약**만 다룬다. 데이터/엔드포인트는 `3-backend/`를 참조한다.

## 화면: CheckinCard

- 위치: 모바일 홈 상단 고정
- 데이터: `GET /campfire/checkin/today` (api-contract 참조)
- 상태:
  - `not_submitted` → 3-step form 노출
  - `submitted` → 응답 요약 + Squad 동료 1명의 어제 응답 미니카드
- 디자인: `2-design/figma-links.yml` → `daily-checkin-form`
- 인터랙션 노트: `2-design/interaction-notes.md` 모션 섹션

## 화면: SquadBoard

- 데이터: `GET /campfire/squad/{squadId}/checkin`
- 표시 단위: 일자별 컬럼, 인원 row
- 비어있는 셀: `2-design/interaction-notes.md` 빈상태 규약 적용

## 분석

- `checkin_submitted` 이벤트는 폼 제출 성공 시점에 트래킹. property 명세는 `3-backend/events.yml`.

## 의존성 (FE가 정의하지 않는 것)

| 항목 | 출처 |
|---|---|
| API endpoint | `3-backend/api-contract.yml` |
| 상태 enum (mood) | `3-backend/data-model.md` |
| 이벤트 이름 | `3-backend/events.yml` |
| 카피 톤 | `2-design/interaction-notes.md` |
