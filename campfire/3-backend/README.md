# 3-backend/ — 백엔드 가이드 (가장 중요)

> 이 폴더는 **용어·데이터·API·이벤트의 단일 진실**. PRD가 다르게 적혔어도 여기가 옳습니다.

## 책임 영역

| 파일 | 무엇 | 변경 빈도 |
|---|---|---|
| `glossary.yml` | 팀 도메인 용어 정의 (Squad, Daily Check-in 등) | 새 기능 시작 시 |
| `data-model.md` | 엔티티·관계·핵심 컬럼 의도 | 새 엔티티/필드 시 |
| `api-contract.yml` | endpoint 요약 + 정책 매핑 | 새 API 시 |
| `events.yml` | 분석 이벤트 (Amplitude/내부) | 새 이벤트 시 |

> 실제 DDL/OpenAPI spec/마이그레이션은 `campfire-be` 코드 레포에. **여기는 "왜/무엇"** 만.

## BE가 게이트키퍼인 이유 (v1 한계 ① ③ 대응)

v1에서 발생한 두 문제:
- PRD가 잘못된 API/상태를 적어두면 AI가 그걸 정답으로 삼아 코드를 회귀시킴
- 기획·FE·BE가 같은 개념을 다른 이름으로 부르며 혼선

해결: **용어와 기술값의 단일 진실을 BE가 보유**. PRD/FE는 이 폴더를 *참조*만.

## glossary.yml 운영 규칙

```yaml
terms:
  Squad:
    description: "Cohort 안의 5~7명 단위 소그룹. Daily Check-in 의 1차 공유 단위."
    entity: Squad           # 데이터 모델 엔티티명과 일치 (선택)
    aliases: ["스쿼드"]      # 본문에서 별칭 사용 시 허용
```

룰:
- description은 1~2문장 한국어
- 엔티티와 1:1 대응이면 `entity:` 채움
- 다른 팀과 공유되는 개념이면 `shared/glossary.yml`로 올림
- **삭제 금지** — deprecated 되면 `status: deprecated` 필드 추가

## data-model.md 작성 원칙

- 엔티티별 H3 섹션 + 핵심 컬럼만 bullet list
- 관계는 텍스트 다이어그램(`Cohort 1—n Squad`)
- 정책 추적: `POL-CF-01 §2 → Attendance.status = left_early` 같은 매핑 명시
- 인덱스/마이그레이션 디테일은 코드 레포 README에

## api-contract.yml 작성 원칙

```yaml
endpoints:
  "GET /campfire/checkin/today":
    summary: "..."
    auth: trainee
    related_policies: [POL-CF-01]
```

- endpoint id는 `METHOD PATH` 형식 (OpenAPI summary key)
- `related_policies` 필수 → 정책 변경 시 영향 추적
- 본 파일은 *요약*. 실제 OpenAPI yaml은 코드 레포

## events.yml 작성 원칙

- 이벤트명: `snake_case` 동사 과거형 (`checkin_submitted`)
- properties는 타입 명시 (`string`, `number`, `"enum: a|b|c"`)
- FE/BE 양쪽에서 같은 이름을 쓰기 위해 **여기가 단일 정의**

## v1에서 학습한 BE 행동 규칙

1. PRD가 코드와 다르면 **PRD를 수정하는 PR을 별도로** 만든다. 코드를 PRD에 맞추지 않는다.
2. 새 용어가 도입되면 같은 PR이 아니라 **선행 PR로 glossary 추가** → 머지 후 다른 작업에서 사용.
3. API id가 바뀌면 (`POST /a` → `POST /b`) 관련 PRD의 `api_refs:`도 같은 PR에서 갱신. 안 그러면 `prd-gate` CI 실패.
4. 이벤트 이름은 한 번 정하면 거의 안 바꿈. 처음에 신중히.
5. `glossary.yml`의 entity는 코드의 클래스명과 일치시킴 (PascalCase).

## PR 워크플로우 (BE 기준)

```
1. glossary.yml에 새 용어 추가 PR (single concept)
   ↓ 머지
2. data-model.md + api-contract.yml + events.yml 동시 PR
   ↓ 머지
3. PM이 PRD에서 새 용어/api_refs 사용 (이때서야 glossary-lint, prd-gate 통과)
```

## 체크리스트

- [ ] 새 용어를 본문에 쓰기 전 `glossary.yml`에 등록했는가
- [ ] 새 endpoint에 `related_policies:` 적었는가
- [ ] PRD가 잘못 적힌 게 발견되면 PRD 수정 PR을 별도로 만들었는가
- [ ] 이벤트 properties 타입 명시했는가
- [ ] 코드 레포의 OpenAPI/DDL과 의도 차이 없는지 확인했는가

## 자주 묻는 질문

**Q. enum 값 변경은?** → `data-model.md`에 신규 값 추가 PR → 머지 → 코드 마이그레이션 → 구값 deprecated 표기.

**Q. 두 팀이 같은 엔티티(Trainee)를 쓰면?** → `shared/glossary.yml`에 정의. `entity:` 는 양쪽 코드 레포에서 동일 이름으로.

**Q. 외부 API 의존성은?** → `data-model.md` 하단 §외부 의존성 섹션에 한 줄로 (예: "Amplitude 이벤트는 events.yml의 이름 그대로 전송").
