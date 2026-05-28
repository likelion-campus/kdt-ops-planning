# kdt-ops-planning

KDT-ops 캠프파이어/클래스룸 두 팀의 **기획·디자인·백엔드 구조·QA**를 단일 SSOT로 관리하는 레포.
v1(노션 → 로컬md → Git 단방향 sync)에서 도출된 5대 한계점을 구조로 차단한 v2.

> **처음 오셨나요?** → [ONBOARDING.md](ONBOARDING.md) 본인 역할 행만 읽으세요. 5분이면 첫 PR 가능.

## 디렉터리 구조

```
shared/                  ← 전사 공통 (용어·페르소나·전역 AI 컨텍스트)
campfire/                ← 팀1
  1-planning/            ← PM: 의도·정책만 (기술값 금지)
  2-design/              ← 디자이너: UX 플로우 + Figma 링크 (임베드 X)
  3-backend/             ← BE: 용어·데이터모델·API contract·이벤트
  4-frontend/            ← FE: UI 스펙 (BE contract 참조)
  5-qa/                  ← QA: 테스트케이스
classroom/               ← 팀2 (동일 구조)
```

## 다운스트림 레포 (단방향 sync)

| 다운스트림 | 동기화되는 path |
|---|---|
| `campfire-fe`  | `shared/**`, `campfire/{1-planning,2-design,4-frontend}/**` |
| `campfire-be`  | `shared/**`, `campfire/{1-planning,3-backend}/**` |
| `classroom-fe` | `shared/**`, `classroom/{1-planning,2-design,4-frontend}/**` |
| `classroom-be` | `shared/**`, `classroom/{1-planning,3-backend}/**` |

## 자동화 도입 상태

현재 활성 워크플로우는 `sync-to-dev` **1개만** 입니다. 나머지(glossary-lint, prd-gate, figma-link-check, drift-alert)는 `.yml.disabled` 로 비활성 상태로 두고, 팀이 익숙해진 뒤 단계적으로 켭니다.

| 단계 | 활성 워크플로우 |
|---|---|
| 1주차 (현재) | `sync-to-dev` |
| 2주차 | + `glossary-lint` |
| 3~4주차 | + `prd-gate` |
| 이후 | + `figma-link-check`, `drift-alert` |

활성화 방법: `.github/workflows/{name}.yml.disabled` → `.yml` 로 rename + commit.

## 핵심 규칙 (v1 → v2 진화)

1. **기획 ≠ 기술값**: PRD/정책서에는 API 주소·상태값 적지 않음. `3-backend/`에서만 정의.
2. **용어 진실은 glossary**: `shared/glossary.yml` + `{team}/3-backend/glossary.yml`. 미정의 용어 사용 시 CI fail.
3. **PRD 상태 게이트**: `draft → design-review → tech-review → ready-for-dev`. `ready-for-dev` 승격 시 Figma 링크 + API contract 존재 검증.
4. **CODEOWNERS 강제**: 폴더별 오너만 머지 가능. PM 충돌 방지.
5. **CLAUDE.md 계층화**: 전사/팀/도메인 컨텍스트 분리 → AI가 정답화 방지.

## 빠른 시작

```bash
# 새 정책 작성
cp campfire/1-planning/policies/POL-CF-01-example.md campfire/1-planning/policies/POL-CF-02-{slug}.md

# 새 PRD 작성
cp campfire/1-planning/prd/example-prd.md campfire/1-planning/prd/{feature}.md
# frontmatter status는 draft로 시작

# 용어 추가 (BE 작업)
vi campfire/3-backend/glossary.yml
```

## 관련 문서

- [v1 회고 PPT](../AXP세미나_260410_종범_AI시대의%20기획개발%20협력프로세스.pptx)
- [shared/CLAUDE.md](shared/CLAUDE.md) — AI 작업 시 필수 컨텍스트
