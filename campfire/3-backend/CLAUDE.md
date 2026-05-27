# campfire/3-backend/CLAUDE.md

이 폴더의 변경은 **용어·구조의 진실**을 바꾼다는 의미다. AI는 다음을 지킬 것.

## 규칙

1. **glossary.yml 우선**: 새 도메인 용어는 여기 먼저 등록, 그 다음 데이터 모델/API/이벤트에서 사용한다.
2. **변경 전파**: api-contract.yml 의 endpoint id가 바뀌면 관련 PRD의 `api_refs:`도 같이 갱신해야 prd-gate가 통과한다.
3. **PRD 회귀 금지**: PRD에 적힌 API 주소·상태가 코드와 다르면 **코드/이 폴더가 옳다**. PRD를 수정하는 PR을 별도로 만든다.
4. **이벤트 정의 위치**: 분석 이벤트는 events.yml 이 단일 정의처. FE/BE 모두 여기를 참조한다.

## 파일 책임

- `glossary.yml`: Campfire 도메인 용어 (Squad, Daily Check-in 등)
- `data-model.md`: 엔티티·관계·핵심 컬럼 (DDL은 코드 레포에)
- `api-contract.yml`: OpenAPI 요약 (전체 OpenAPI는 코드 레포에)
- `events.yml`: Amplitude/내부 이벤트 정의
