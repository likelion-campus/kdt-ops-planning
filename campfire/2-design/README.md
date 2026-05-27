# 2-design/ — 디자이너 가이드

> Figma 시안 자체를 이 레포에 임베드하지 않습니다. **링크 + UX 의도**만 텍스트로.

## 무엇을 만드는가

| 종류 | 위치 | 비고 |
|---|---|---|
| UX 플로우 (Mermaid) | `ux-flows/{기능}.md` | 상태 전이, 화면 이동 |
| Figma 링크 매핑 | `figma-links.yml` | screen ID → URL, PRD 매핑 |
| 인터랙션 규약 | `interaction-notes.md` | 모션, 빈 상태, 다크모드 등 공통 규칙 |

## 왜 Figma를 임베드하지 않는가 (v1 한계 ⑤ 대응)

- 시안은 자주 바뀜 → 이미지 임베드는 즉시 stale
- 본문에는 **의도와 결정 근거**만 남기고, **시안은 Figma에서 항상 최신**
- `figma-link-check.yml` CI가 주 1회 URL 살아있는지 자동 검증

## UX flow 작성 템플릿

`ux-flows/example-flow.md` 복사:

```markdown
---
id: UXF-{team}-{feature}
related_prd: PRD-{team}-{feature}
terms: [...]
owner: "@design-handle"
---

# UX Flow — {제목}

\`\`\`mermaid
flowchart TD
    ...
\`\`\`

## 핵심 인터랙션 노트

## 디자인 결정 근거
```

## Figma 링크 등록 절차

`figma-links.yml` 에 screen 추가:

```yaml
screens:
  {screen-key}:
    node: "1:23"      # Figma node ID
    url: "https://www.figma.com/design/{FILE_KEY}/...?node-id=1-23"
    last_review: "YYYY-MM-DD"

prd_map:
  PRD-campfire-daily-checkin:
    - {screen-key}
```

> PRD가 `status: ready-for-dev`로 승급되려면 `prd_map`에 매핑이 반드시 있어야 합니다 (CI 자동 검증).

## interaction-notes.md 책임

화면마다 반복되는 결정(모션 시간, 빈 상태 처리, 햅틱 등)은 여기서 단일 관리. 새 UX flow에서 같은 내용 반복하지 말 것.

## v1에서 학습한 디자이너 행동 규칙

1. **PRD가 draft일 때 시안 시작 → PRD design-review로 승급되면 figma 링크 등록**.
2. 시안이 정책을 거스르면 PR 코멘트로 PM에게 정책 변경 요청 (시안만 바꾸지 말 것).
3. Figma URL은 노드 단위로 (`?node-id=...`). 파일 루트만 적지 말 것.
4. 디자인이 BE 데이터 모델보다 앞서 가지 않게: 새 필드/상태가 필요하면 BE PR 먼저.

## 체크리스트

- [ ] `ux-flows/`에 Mermaid 다이어그램으로 플로우 그렸는가
- [ ] `figma-links.yml`에 screen + prd_map 등록했는가
- [ ] Figma URL이 node-id까지 포함되어 있는가
- [ ] `last_review` 날짜 갱신했는가
- [ ] 시안에만 있는 새 컴포넌트/상태가 있다면 BE에게 동시 PR 요청했는가

## 자주 묻는 질문

**Q. 디자인 시스템 라이브러리는?** → likelion-design MCP (`@likelion-design/docs-mcp`) 우선. 본 레포에는 *어떤 토큰을 썼는지*만 기록.

**Q. 프로토타입 영상은?** → Figma 프로토타입 URL을 `figma-links.yml` 에서 별도 키로 (`prototypes:` 섹션 추가).

**Q. 이미지 첨부는?** → 캡처 1~2장 정도는 `assets/` 서브폴더에 두되, **단일 진실은 항상 Figma**.
