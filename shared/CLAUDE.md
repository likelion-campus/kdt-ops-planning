# shared/CLAUDE.md — 전사 AI 작업 컨텍스트 (최상위)

AI 도구(Claude Code, Cursor 등)가 이 레포에서 작업할 때 **반드시 따를 우선순위**.

## 진실의 출처 (Source of Truth)

| 무엇이 진실인가 | 어디에서 |
|---|---|
| 용어 정의 | `shared/glossary.yml` > `{team}/3-backend/glossary.yml` (도메인은 팀이 우선) |
| API/상태값/DB 컬럼 | `{team}/3-backend/` (PRD가 다르게 적혀있어도 backend 우선) |
| 정책의 *의도* | `{team}/1-planning/policies/` |
| UX 의도 | `{team}/2-design/ux-flows/` |
| 실제 Figma 시안 | `{team}/2-design/figma-links.yml` 에서 링크된 외부 Figma 파일 |

## v1에서 학습한 규칙 (절대 위반하지 말 것)

1. **PRD는 정답이 아니다.** `1-planning/`에 API 주소·상태값이 적혀 있어도, 코드가 다르면 **코드 또는 `3-backend/`가 옳다.** PRD는 "의도와 정책"만 담는다.
2. **용어 사전을 신뢰하라.** 본문에서 같은 개념을 다른 이름으로 부르지 말 것. `glossary.yml`에 없는 도메인 용어를 PRD에 쓰지 말 것.
3. **변경은 작게.** 한 PR에서 여러 정책을 동시에 수정하지 말 것. 정책 ID 단위로 분리.
4. **다운스트림은 미러일 뿐.** `campfire-fe` / `campfire-be` / `classroom-*`의 `planning-docs/`는 1:1 복제본이다. 거기서 수정하면 다음 sync에 덮어쓰여진다. 항상 이 레포에서 수정한다.

## 디렉터리 책임자

- `1-planning/`: PM (의도·정책·맥락)
- `2-design/`: 디자이너 (UX 플로우 + Figma 링크)
- `3-backend/`: 백엔드 (용어·데이터모델·API·이벤트) ← 기술값의 단일 진실
- `4-frontend/`: 프론트엔드 (UI 스펙, `3-backend/` 참조)
- `5-qa/`: QA (테스트 케이스)

## 작업 시 체크리스트

- [ ] 변경하려는 path에 대해 CODEOWNERS 권한 있는가
- [ ] PRD라면 frontmatter `status`, `owner`, `figma`, `api_refs`, `terms` 채웠는가
- [ ] 새 용어를 썼다면 `glossary.yml`에 정의했는가
- [ ] 기술값(URL, 상태 enum, 컬럼명)을 `1-planning/`에 쓰지 않았는가
