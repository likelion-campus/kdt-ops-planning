# 변경 요약

<!-- 한 문장으로 무엇을 왜 바꿨는지 -->

## 영향 영역

- [ ] `shared/` (전사 영향)
- [ ] `campfire/` 팀
- [ ] `classroom/` 팀

## 변경 유형

- [ ] 정책 (POL-*)
- [ ] PRD
- [ ] UX 플로우 / Figma
- [ ] 용어사전 (glossary)
- [ ] API contract / data-model
- [ ] 이벤트 정의
- [ ] QA 케이스

## 변경된 정책 / PRD ID

<!-- 예: POL-CF-03, PRD-classroom-detail-v2 -->

## PRD 상태 전환 (해당 시)

- [ ] draft → design-review
- [ ] design-review → tech-review
- [ ] tech-review → **ready-for-dev** ← 이 단계는 figma-links + api-contract 사전 확보 필수

## 기술값 분리 체크 (v1 한계 ① 방지)

- [ ] 본 PR의 `1-planning/` 변경에 API 주소/상태값/DB 컬럼명이 **포함되어 있지 않다**
- [ ] 기술값은 `3-backend/` 또는 `4-frontend/`에만 있다

## 용어 점검 (v1 한계 ③ 방지)

- [ ] 새 용어는 `glossary.yml`에 등록 후 본문에서 사용
- [ ] `glossary-lint` CI 통과

## 다운스트림 영향

이 PR이 머지되면 다음 레포에 자동 PR이 생성됩니다:

- [ ] `campfire-fe`
- [ ] `campfire-be`
- [ ] `classroom-fe`
- [ ] `classroom-be`

## 리뷰어 가이드

<!-- 어느 부분을 집중해서 봐야 하는지 (v1 한계 ② "정독 회피" 방지) -->
