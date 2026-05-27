# classroom/CLAUDE.md

Classroom 팀 작업 시 AI가 따를 컨텍스트. `shared/CLAUDE.md` 를 먼저 읽었다고 가정한다.

## 팀 정의

- **프로덕트**: Classroom — 강의 진행/콘텐츠 허브
- **주 사용자**: P1 Trainee > P3 Mentor
- **핵심 가치**: 강의 진행 매끄러움 + 학습 컨텍스트 보존

## 이 팀에서 자주 쓰는 단어 (요약)

상세는 `classroom/3-backend/glossary.yml`. 새 용어는 거기에 추가한 뒤 본문에서 사용.

- `Lecture` — 1회차 강의 단위
- `Session` — Lecture 안에서 진행되는 라이브/녹화 슬롯
- `AINote` — Trainee가 강의 중 작성하는 AI 보조 학습 노트

## 작업 가드레일

1. Trainee의 학습 흐름 단절을 만들지 말 것 (모달 남발 금지).
2. Campfire와 공유되는 개념(Trainee, Cohort)은 `shared/glossary.yml`로 올리고 양 팀 동시 PR.
3. 이미 작업 중인 PRD가 있는 영역: `docs/specs/classroom-detail-prd-v1.md` (KDT-ops 본 레포 참조).
