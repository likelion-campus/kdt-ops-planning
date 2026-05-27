# 1-planning/ — PM (기획자) 가이드

> 이 폴더는 **의도와 정책**의 단일 진실. 기술값(API, 상태, DB)은 절대 여기에 적지 않습니다.

## 무엇을 만드는가

| 종류 | 위치 | 파일명 규칙 |
|---|---|---|
| 정책서 | `policies/` | `POL-CF-{NN}-{slug}.md` (Campfire) / `POL-CR-{NN}-{slug}.md` (Classroom) |
| PRD | `prd/` | `{기능명}.md` 또는 `PRD-{team}-{feature}.md` |
| 회의록 | `meetings/` | `YYYY-MM-DD-{topic}.md` |
| 타임라인 | `timeline.md` | 단일 파일 유지 |

## 절대 적지 않을 것 (v1 한계 ① 방지)

- API 경로 (`/api/v1/...`)
- HTTP 상태 코드
- DB 컬럼명, enum 값
- 구체적 화면 좌표/픽셀
- 라이브러리 이름/버전

> 이런 건 BE가 `3-backend/`에서, FE가 `4-frontend/`에서 정의합니다. PRD에는 "어떤 상태가 있어야 한다"(개념)만 적습니다.

## 정책 작성 템플릿

`policies/POL-CF-01-example.md` 복사 → 다음 항목 채움:

```yaml
---
id: POL-CF-{NN}
title: "..."
owner: "@본인-github-handle"
status: draft        # draft | active | deprecated
version: 1
related_prd: []
terms: [Trainee, ...]   # glossary에 등록된 용어만
---
```

본문 섹션: **의도** / **정책 조항** / **비정책** (의도적으로 정하지 않은 영역) / **관련 PRD**

## PRD 작성 + status 진행 절차

`prd/example-prd.md` 복사 후 단계별 승급:

```
draft
  ↓ (디자이너 1차 시안 + figma 링크 frontmatter에 추가)
design-review
  ↓ (BE가 api-contract.yml + data-model.md에 관련 endpoint/엔티티 추가)
tech-review
  ↓ (figma-links.yml prd_map에 매핑 + api_refs 모두 존재 확인)
ready-for-dev
```

`status: ready-for-dev` 로 올리는 PR은 CI(`prd-gate.yml`)가 figma+api 확인 후 자동 차단/통과.

## 회의록 작성

```markdown
---
date: YYYY-MM-DD
attendees: ["@a", "@b"]
topic: "..."
decisions: []
action_items:
  - { who: "@a", what: "...", due: "YYYY-MM-DD" }
---
```

`decisions`에 적힌 내용이 새 정책이 되면 즉시 `policies/` 아래 PR을 별도로 만듭니다.

## v1에서 학습한 PM 행동 규칙

1. **하나의 PR = 하나의 정책 ID**. 여러 정책 동시 수정 금지 (v1 한계 ④ 충돌 방지).
2. PRD에 기술값 적힌 걸 발견하면 즉시 `3-backend/` PR로 분리 (v1 한계 ①).
3. 새 용어를 본문에 쓰기 전에 **BE에게 glossary 등록 요청 PR**부터 (v1 한계 ③).
4. 디자이너가 시안 보기 전에 ready-for-dev 승급 금지 (v1 한계 ⑤).

## 체크리스트 (PR 올리기 전)

- [ ] frontmatter `terms:` 채웠는가
- [ ] 정책 ID 충돌 없는가 (`ls policies/` 확인)
- [ ] API/상태값/DB 컬럼명을 본문에 넣지 않았는가
- [ ] 변경 사유를 commit body에 한 문단 적었는가
- [ ] PR template 체크박스 모두 확인했는가

## 자주 묻는 질문

**Q. 운영 매뉴얼은 어디에?** → 이 폴더 안 `ops/` 서브폴더를 새로 만들어도 좋고, 짧으면 정책서 안에 §운영 절차 섹션으로.

**Q. 외부 자료(노션/구글닥) 링크는?** → 정책서 하단 **§참고**에 링크. 본문은 항상 이 레포가 단일 진실.

**Q. 다른 팀 정책을 참조하려면?** → `related_policies: [POL-CR-03]` frontmatter로. 본문 링크는 상대 경로 (`../../classroom/1-planning/policies/POL-CR-03-*.md`).
