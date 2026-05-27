# ONBOARDING — 역할별 시작 가이드

이 레포에 처음 들어왔다면 본인 역할 행만 읽으세요. 5분 안에 첫 PR을 올릴 수 있도록 설계됐습니다.

## 1. 내가 누구인지 / 어디서 일하는지

| 역할 | 주 작업 폴더 | 무엇을 만드는가 | 자세히 |
|---|---|---|---|
| **PM (기획자)** | `{team}/1-planning/` | 정책서(POL-*), PRD, 회의록, 타임라인 | [1-planning/README.md](campfire/1-planning/README.md) |
| **디자이너** | `{team}/2-design/` | UX 플로우(md), Figma 링크, 인터랙션 노트 | [2-design/README.md](campfire/2-design/README.md) |
| **백엔드 (BE)** | `{team}/3-backend/` | 용어사전, 데이터 모델, API contract, 이벤트 정의 | [3-backend/README.md](campfire/3-backend/README.md) |
| **프론트엔드 (FE)** | `{team}/4-frontend/` | UI 스펙 (BE contract 참조) | [4-frontend/README.md](campfire/4-frontend/README.md) |
| **QA** | `{team}/5-qa/` | 테스트케이스 | [5-qa/README.md](campfire/5-qa/README.md) |
| **(공통)** | `shared/` | 전사 용어, 페르소나, CLAUDE.md | [shared/README.md](shared/README.md) |

> `{team}` = `campfire` 또는 `classroom`. 양 팀 구조가 동일하므로 위 링크는 campfire 기준입니다.

## 2. 첫 PR 5분 가이드

```bash
# 1. clone
git clone https://github.com/likelion-campus/kdt-ops-planning
cd kdt-ops-planning

# 2. 본인 역할에 맞는 README 열기 (위 표)
# 3. 새 브랜치
git checkout -b {role}/{name}/{topic}      # 예: pm/jb/checkin-policy

# 4. 파일 추가/수정 (역할별 README의 "체크리스트" 따르기)
# 5. push + PR
git push -u origin HEAD
gh pr create --fill
```

## 3. 누가 무엇을 결정하는가 (RACI 요약)

| 결정 사항 | Responsible | Accountable | Consulted | Informed |
|---|---|---|---|---|
| 정책의 **의도** | PM | PM lead | 디자이너, BE | FE, QA |
| UX 플로우 | 디자이너 | Design lead | PM | FE |
| Figma 시안 | 디자이너 | Design lead | PM, FE | — |
| 도메인 용어 | BE | BE lead | PM | 전원 |
| 데이터 모델 | BE | BE lead | PM | FE |
| API 경로/상태값 | BE | BE lead | FE | PM |
| 분석 이벤트 정의 | BE | BE lead | PM | 데이터 |
| UI 컴포넌트 동작 | FE | FE lead | 디자이너 | — |
| 테스트 시나리오 | QA | QA lead | PM, FE | — |

## 4. v1에서 학습한 5가지 함정 (절대 하지 말 것)

1. **PRD에 API 주소/상태값 적기** → AI가 그걸 정답화해서 코드를 망가뜨림. 기술값은 `3-backend/`에서만.
2. **같은 개념 다른 이름** → BE가 `glossary.yml`에 등록한 용어만 본문에서 사용.
3. **한 PR에 여러 정책 묶기** → 정책 ID 단위로 PR 분리.
4. **디자인 없이 ready-for-dev 승격** → PRD `status` 단계별 게이트가 막아줌.
5. **다운스트림 레포에서 문서 직접 수정** → 다음 sync에 덮어쓰여짐. 항상 이 레포에서 수정.

## 5. 도움이 필요할 때

| 상황 | 누구에게 |
|---|---|
| 새 용어를 추가하고 싶음 | 본인 팀 BE lead |
| 디자인 결정 충돌 | Design lead + PM lead 동시 멘션 |
| sync가 안 됨 | `.github/workflows/drift-alert.yml` 자동 이슈 확인 또는 infra lead |
| 어디에 써야 할지 모름 | 이 표 다시 보고, 그래도 모르면 PM lead |

## 6. 관련 문서

- [README.md](README.md) — 구조 전반
- [shared/CLAUDE.md](shared/CLAUDE.md) — AI 작업 시 규칙
- v1 회고 PPT (KDT-ops 본 레포 `github structure (co-op structure)/`)
