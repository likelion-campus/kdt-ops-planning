# shared/ — 전사 공통 자산

Campfire와 Classroom **양 팀이 함께 사용**하는 자산만 둡니다. 한 팀만 쓰는 건 `{team}/`로.

## 무엇이 들어가는가

| 파일 | 책임자 | 변경 시 |
|---|---|---|
| `glossary.yml` | BE leads (양 팀) | 전사 합의 필요. 양 팀 BE/PM 리뷰 후 머지 |
| `personas.md` | PM leads | 양 팀 PM 합의 |
| `CLAUDE.md` | infra/AI 담당 | AI 작업 규칙 변경. 큰 변경은 전원 공지 |

## 들어가면 안 되는 것

- 한 팀에만 해당하는 용어 → `{team}/3-backend/glossary.yml`
- 팀별 PRD, 디자인, API → 각 팀 폴더
- 임시/실험성 문서 → 본인 팀 폴더

## 변경 절차

1. PR 브랜치 생성: `shared/{name}/{topic}`
2. CODEOWNERS가 양 팀 lead 자동 리뷰어로 호출
3. **두 팀 모두 승인** 후 머지 (single approval 금지)
4. 머지 시 4개 다운스트림 레포 전부에 자동 PR 생성됨 → 영향 큼, 신중히

## 체크리스트

- [ ] 한 팀만 쓰는 게 아닌지 확인했다
- [ ] 양 팀 BE/PM lead 멘션했다
- [ ] glossary 추가 시 description + aliases 채웠다
- [ ] CLAUDE.md 변경 시 변경 이유를 commit body에 남겼다
