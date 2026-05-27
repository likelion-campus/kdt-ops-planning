# 4-frontend/ — 프론트엔드 가이드

> FE는 **참조자**입니다. API/상태/이벤트 이름을 여기서 *정의*하지 않습니다. `3-backend/`를 따릅니다.

## 무엇을 만드는가

| 종류 | 위치 | 비고 |
|---|---|---|
| UI 스펙 | `ui-spec.md` | 화면·컴포넌트 단위 동작 규약 |
| 컴포넌트 상세 (필요 시) | `components/{name}.md` | 재사용 컴포넌트 |

> 실제 React 코드는 `campfire-fe` 레포에. 여기는 **"어떤 화면이 어떤 데이터를 어떻게 표시"** 만.

## ui-spec.md 작성 원칙

화면 단위 H2 섹션, 각 화면마다:

```markdown
## 화면: CheckinCard

- 위치: 모바일 홈 상단 고정
- 데이터: GET /campfire/checkin/today  ← api-contract.yml 의 endpoint id를 그대로
- 상태:
  - not_submitted → 3-step form
  - submitted → 응답 요약
- 디자인: 2-design/figma-links.yml → daily-checkin-form
- 인터랙션 노트: 2-design/interaction-notes.md 모션 섹션
```

## "정의하지 않는 것" (다른 폴더에서 가져옴)

| 항목 | 출처 |
|---|---|
| API endpoint id | `3-backend/api-contract.yml` |
| 상태 enum 값 | `3-backend/data-model.md` |
| 이벤트 이름 | `3-backend/events.yml` |
| 카피 톤/모션 규약 | `2-design/interaction-notes.md` |
| 컴포넌트 시안 | `2-design/figma-links.yml` |

> FE가 이런 걸 *재정의*하면 v1 한계 ③(용어 불일치)이 재발합니다. 항상 *참조*만.

## v1에서 학습한 FE 행동 규칙

1. PRD에 적힌 API/상태가 `3-backend/`와 다르면 **BE에게 정정 요청 → 본인 코드 막지 말기**.
2. 새 분석 이벤트가 필요하면 `events.yml`에 추가 PR 먼저 → 머지 후 FE에서 호출.
3. 화면 신규 추가 시 `figma-links.yml` 등록되어 있는지 확인 → 없으면 디자이너에게 요청.
4. 컴포넌트 라이브러리 (`@likelion-design/...`) 토큰 사용. 직접 색상/사이즈 정의 금지.

## 체크리스트

- [ ] 사용한 API endpoint id가 `3-backend/api-contract.yml`에 있는가
- [ ] 상태 enum이 `3-backend/data-model.md`와 일치하는가
- [ ] 발화하는 이벤트가 `3-backend/events.yml`에 정의돼 있는가
- [ ] Figma 링크가 `2-design/figma-links.yml`에 등록돼 있는가
- [ ] `terms:` frontmatter에 사용한 도메인 용어 명시했는가

## 자주 묻는 질문

**Q. 빠르게 프로토타입하고 싶다, BE 없이 가능?** → mock 데이터로 코드 레포에서 진행하되, 본 레포의 `ui-spec.md`는 BE contract 완성 후 작성.

**Q. 다국어/접근성은?** → `interaction-notes.md`에 전사 규약. 화면 특이사항만 ui-spec에.

**Q. 성능 요구사항은?** → 정책에 적힐 만한 거(예: "초기 로딩 < 2s")는 `1-planning/policies/`에. FE 구현 디테일은 코드 레포 README에.
