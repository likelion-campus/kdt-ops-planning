# 5-qa/ — QA 가이드

## 무엇을 만드는가

| 종류 | 위치 | 파일명 |
|---|---|---|
| 테스트 케이스 | `testcases/` | `TC-CF-{feature}.md` |
| 회귀 시나리오 | `testcases/regression/` | `RG-{date}-{topic}.md` |
| 운영 점검 체크 | `runbooks/` (필요 시) | `RB-{topic}.md` |

## 테스트 케이스 작성 템플릿

`testcases/TC-CF-checkin.md` 참조:

```yaml
---
id: TC-CF-{feature}
related_prd: PRD-campfire-{feature}
related_policies: [POL-CF-XX]
owner: "@qa-handle"
terms: [...]
---
```

본문:
- TC-1, TC-2, ... 각 시나리오마다 **단계 / 입력 / 기대결과** 표
- 정책 조항(예: POL-CF-01 §2)이 어떻게 검증되는지 명시

## v1에서 학습한 QA 행동 규칙

1. **정책 ↔ 테스트케이스 양방향 추적**: 정책 PR이 올라오면 QA는 `related_policies`에 본인 ID 포함된 케이스가 영향받는지 본다.
2. PRD가 `ready-for-dev` 승급 시 같은 PR/후속 PR로 TC-{feature}.md 최소 1개 생성.
3. 테스트 결과(pass/fail 로그)는 본 레포에 두지 않음. 별도 도구 또는 코드 레포 CI.

## 체크리스트

- [ ] `related_prd`, `related_policies` 채웠는가
- [ ] 각 정책 조항이 최소 1개 TC로 커버되는가
- [ ] 시나리오에 명확한 기대결과(events, status, UI 상태)를 명시했는가
- [ ] `terms:`에 사용 도메인 용어 등록했는가

## 자주 묻는 질문

**Q. 자동화 테스트 코드는?** → 코드 레포 (`campfire-fe/be`)의 `tests/`. 여기는 **시나리오 정의**만.

**Q. 버그 리포트 위치?** → GitHub Issues. 본 레포에 두면 다운스트림에 미러됨.
