---
id: TT-SPEC-CAMPFIRE-v0.1
title: "시간표(Timetable) 기획 명세 — 캠프파이어 인계용"
owner: "@pm-classroom-lead"
status: handoff-draft
version: 0.1
date: 2026-05-28
audience: 캠프파이어 PM·디자이너·백엔드
related_policy: [POL-CR-02-시간표-운영-정책.md]
related_meeting: [meeting-2026-05-28-운영변경점.md]
related_prd: [PRD-classroom-detail-v1.2.md]
---

# 시간표(Timetable) 기획 명세 — 캠프파이어 인계용

> **이 문서는 시간표 시스템을 어디서 / 어떻게 / 누가 만드는지의 기획서다.**
> 클래스룸 측 운영 정책은 [POL-CR-02](../policies/POL-CR-02-시간표-운영-정책.md) 참조.
> 캠프파이어 담당자에게 axp07@likelion.net 이 구두로 1차 전달 후, 본 문서를 SSOT로 정렬.

---

## 0. 한 줄 정리

> 매니저·강사·퍼실이 cohort 시간표를 **계층형(기간 + 일·시간 블록)** 으로 관리하고, 카테고리별 **자동화 프리셋** 으로 클래스룸의 4개 자동화(얼굴 인식·강의 녹화 STT·AI Note 생성·퀴즈 생성)를 트리거한다. **학생에게는 공개하지 않는다.**

---

## 1. 배경 / 결정 사항

회의록 [meeting-2026-05-28-운영변경점.md](../meetings/meeting-2026-05-28-운영변경점.md) 에서 시간표 운영 요건이 도출되었다. 회의 후 PM과 협의해 다음 4가지를 확정:

| 결정 | 내용 |
|---|---|
| 위치 | **캠프파이어 도메인**에 시간표 메뉴 신설 (클래스룸 LNB에 추가하지 않음) |
| 단위 | **계층형** — 기간(Phase) + 일·시간 블록(Block) |
| 권한 | 매니저(전체) · 강사(본인 강의) · 퍼실(CA·소그룹) · 학생(접근 차단) |
| 자동화 연결 | **카테고리별 프리셋 + 항목별 override** |

---

## 2. 사용자 & 권한

캠프파이어 4종 권한 기준 (PRD §1.2).

| 권한 | 접근 |
|---|---|
| 학생 | **메뉴 자체 미노출**. URL 직접 접근도 차단 |
| 강사 | 읽기 + 본인 담당 강의 블록 등록·수정 |
| 퍼실 | 읽기 + CA·소그룹 블록 등록·수정 |
| 매니저 | **전체 읽기·쓰기** — 기간 정의, 모든 블록 관리, 다른 운영자 블록 수정 가능 |

---

## 3. 데이터 모델

### 3.1 Phase (기간)

| 필드 | 타입 | 설명 |
|---|---|---|
| `id` | string | 고유 ID |
| `cohortId` | string | 캠프파이어 cohort 참조 |
| `type` | enum | `theory` / `project` / `mixed` |
| `name` | string | 예: "이론 1차", "파이널 프로젝트" |
| `startDate` | date | 시작일 |
| `endDate` | date | 종료일 |
| `automationOverride` | object? | Phase 단위로 자동화 일괄 OFF 가능 (예: 프로젝트 기간은 퀴즈 OFF) |
| `notes` | string? | 운영 메모 |

### 3.2 BlockTemplate (일·시간 블록 — 반복 템플릿)

같은 패턴이 매주 반복되는 경우용 (예: "매일 10:00~13:00 이론 강의").

| 필드 | 타입 | 설명 |
|---|---|---|
| `id` | string | 고유 ID |
| `phaseId` | string | Phase 참조 |
| `category` | enum | `lecture-theory` / `lecture-practice` / `self-study` / `quiz-take` / `quiz-review` / `ca` / `break` / `lunch` / `evening` / `custom` |
| `dayOfWeek` | enum[] | `[mon, tue, wed, thu, fri]` 등 (주말 옵션) |
| `startTime` | time | 시작 시각 (HH:MM) |
| `endTime` | time | 종료 시각 |
| `title` | string | 블록 제목 (예: "이론 강의 — pandas") |
| `assignees` | userId[] | 진행 강사·퍼실 |
| `automation` | object | §5 참조 |

### 3.3 BlockInstance (일자 인스턴스 — 옵션, 변경 시만 생성)

특정 일자에 템플릿과 다른 운영이 필요할 때 (예: "이번 주 수요일은 이론 → 특강").

| 필드 | 타입 | 설명 |
|---|---|---|
| `id` | string | — |
| `templateId` | string? | 템플릿이 있다면 참조 |
| `date` | date | 발생 일자 |
| `category` | enum | — |
| `startTime` | time | — |
| `endTime` | time | — |
| `title` | string | — |
| `assignees` | userId[] | — |
| `automation` | object | (override 시만 채움 — 비어있으면 템플릿 따름) |
| `isCancelled` | boolean | 취소된 블록 표시용 |

> **단순화 옵션**: BlockInstance 없이 BlockTemplate + 예외(`exceptions`) 배열만 둬도 충분. 캠프파이어 백엔드 팀과 협의 결정.

### 3.4 Automation (자동화 설정)

```ts
type Automation = {
  faceRecognition: boolean;    // 얼굴 인식 경고
  recordSTT: boolean;          // 강의 녹화 + STT (→ AI Note 본문 소스)
  aiNote: boolean;             // AI Note 자동 생성
  quizGen: boolean;            // 다음날 D+1 퀴즈 생성
};
```

각 필드는 3-state 가능:
- `true`: 강제 ON (프리셋 override)
- `false`: 강제 OFF (프리셋 override)
- `null` 또는 미설정: 프리셋 그대로 따름

---

## 4. 카테고리 정의

| 카테고리 키 | 표시명 | 색상 (제안) | 비고 |
|---|---|---|---|
| `lecture-theory` | 이론 강의 | 오렌지 (primary) | 강사 메인 진행 |
| `lecture-practice` | 실습 강의 | 옐로우 | 강사 가이드 + 학생 자율 |
| `self-study` | 자율 실습 (Alex 활용) | 라이트 그린 | 학생 자율 시간 |
| `quiz-take` | 퀴즈 풀이 | 블루 | 08:30~09:30 슬롯 |
| `quiz-review` | 퀴즈 리뷰 | 블루 (dark) | 09:30~09:50 슬롯, 강사 진행 |
| `ca` | CA 활동 | 퍼플 | 퍼실 진행, 18시 이후 |
| `lunch` | 점심 | 그레이 | — |
| `break` | 휴식 | 그레이 (light) | — |
| `evening` | 종료 후 자유 | 그레이 (light) | — |
| `custom` | 직접 정의 | 화이트 + 회색 보더 | 자유 입력 |

---

## 5. 자동화 프리셋 (카테고리 → 기본 ON/OFF)

| 카테고리 | 얼굴인식 | 녹화·STT | AI Note | 퀴즈 생성 |
|---|---|---|---|---|
| `lecture-theory` | ✅ | ✅ | ✅ | ✅ |
| `lecture-practice` | ✅ | ✅ | ✅ | ⬜ |
| `self-study` | ⬜ | ⬜ | ⬜ (옵션) | ⬜ |
| `quiz-take` | ✅ | ⬜ | ⬜ | — |
| `quiz-review` | ✅ | ✅ (옵션) | ⬜ | ⬜ |
| `ca` | ⬜ | ⬜ | ⬜ | ⬜ |
| `lunch` | ⬜ | ⬜ | ⬜ | ⬜ |
| `break` | ⬜ | ⬜ | ⬜ | ⬜ |
| `evening` | ⬜ | ⬜ | ⬜ | ⬜ |
| `custom` | (운영자 직접 설정) | | | |

> 프리셋과 다르면 블록에 "프리셋 변경됨" 배지 노출 — 운영자가 의도적으로 변경했음을 시각화.

---

## 6. UI 화면 구성 (캠프파이어 측)

### 6.1 시간표 진입 (LNB 또는 상단 메뉴)

- 캠프파이어 LNB에 **"시간표"** 메뉴 추가 (학생에게는 미노출)
- 진입 시 default 뷰: **이번 주 (월~금) 일정**

### 6.2 메인 뷰 — 3종 탭

| 탭 | 용도 |
|---|---|
| **주간 뷰** | 일자별 시간 블록 가로 배치 (Google Calendar 스타일). default 진입점 |
| **기간 뷰** | Phase(이론/프로젝트) 간트 차트. 전체 cohort 흐름 한눈 |
| **템플릿 관리** | BlockTemplate 등록·수정·복사. 주차별 반복 패턴 정의 |

### 6.3 블록 등록 폼 (모달 또는 슬라이드)

```
┌─ 블록 등록 ──────────────────┐
│ 카테고리 [▼ 이론 강의       ] │
│ 제목      [______________]   │
│ 날짜      [2026-06-01 ~ ]    │
│ 요일      [☑월 ☑화 ☑수 ☑목 ☑금]│
│ 시간      [10:00 ~ 13:00]    │
│ 담당자    [+ 강사 추가]      │
├─ 자동화 (프리셋 적용됨) ─────┤
│ ☑ 얼굴 인식 경고             │
│ ☑ 강의 녹화 + STT            │
│ ☑ AI Note 생성               │
│ ☑ D+1 퀴즈 생성              │
│ [프리셋으로 되돌리기]        │
├──────────────────────────────┤
│ [취소]            [저장]     │
└──────────────────────────────┘
```

### 6.4 주간 뷰 블록 카드

블록 카드에 표시:
- 카테고리 색상 좌측 띠
- 시간 (`10:00 ~ 13:00`)
- 제목
- 담당자 아바타 (1~3명)
- 자동화 아이콘 배지 (활성화된 자동화만 작게)
- 우상단 케밥(편집·복제·삭제·취소)

---

## 7. 자동화 트리거 발생 흐름

```
캠프파이어 시간표 (Block) ─┐
                          │
            특정 시각 도달 │
                          ▼
                ┌─ 카테고리 프리셋 + override 합성 ─┐
                │  Automation = {face, stt, note, quiz} │
                └────────────┬──────────────────┘
                             │
                ┌────────────┴────────────┐
                ▼          ▼          ▼          ▼
            얼굴인식    녹화+STT    AI Note     D+1 퀴즈
            (캠프파이어)  ↓           ↓            ↓
                       녹음 파일    클래스룸     클래스룸
                       + 텍스트     AI 노트       AI 퀴즈
                                                 (Draft)
```

### 7.1 클래스룸과의 연동 인터페이스

캠프파이어가 클래스룸에 보내는 이벤트(제안):

| 이벤트 | 페이로드 | 클래스룸 수신 후 |
|---|---|---|
| `lecture.started` | `{ blockId, cohortId, startedAt }` | 녹화 시작 |
| `lecture.ended` | `{ blockId, cohortId, endedAt, recordingUrl }` | STT 잡 큐 등록 |
| `stt.completed` | `{ blockId, transcript }` | AI Note 생성 잡 큐 등록 |
| `ainote.generated` | `{ blockId, noteId }` | AI 퀴즈 D+1 생성 잡 큐 등록 |
| `quiz.scheduled` | `{ blockId, date, scheduledAt }` | 다음날 08:30 발행 예약 |

> 실제 메시지 키·페이로드는 백엔드 spec에서 확정.

---

## 8. 학생 비공개 — 보안 처리

1. 캠프파이어 시간표 API는 **학생 권한으로는 항상 403**
2. URL 직접 접근(예: `/timetable/cohort/xxx`)도 권한 검사 후 차단
3. 매니저뷰 ↔ 학생뷰 토글 시 학생뷰에서는 시간표 메뉴 자체가 사라져야 함 (URL 추측 차단까지 책임)
4. 자동화 트리거 결과(예: AI 노트)는 학생에게 노출 OK (시간표 자체가 아닌 산출물)

---

## 9. 비기능 요구

- 동일 cohort 60명에게 시간표 변경이 즉시 반영 (자동화 미래 트리거 갱신)
- 동시 편집 충돌 처리 (강사·매니저 동시 수정) — 마지막 저장 우선 또는 충돌 감지
- 모바일 — 매니저 채점·등록은 PC 권장 (PRD §7 톤 유지)

---

## 10. 단계별 우선순위 제안

| 단계 | 범위 | 의존성 |
|---|---|---|
| **MVP** | Phase·BlockTemplate CRUD + 주간 뷰 + 카테고리 프리셋 자동화 | 캠프파이어 백엔드 모델 + 클래스룸 자동화 라우팅 |
| **v2** | BlockInstance(예외 일자 override) + 기간 간트 뷰 | MVP |
| **v3** | 동시 편집 충돌 감지 + 매니저별 알림 / 변경 이력 | v2 |

---

## 11. 미결 / 후속 결정 필요

1. 휴일·공휴일 자동 OFF 정책 (캠프파이어 admin 설정으로 처리할지)
2. 카테고리 enum 추가 시 (예: 외부 특강·시험) 자동화 프리셋 정의
3. 시간표 데이터의 cohort 복제 — 다음 기수 시작 시 직전 기수 시간표 복사
4. 매니저 본인 알림 채널 — 시간표 변경 시 캠프파이어 매니저 알림 발송 여부
5. 운영자 권한 분리 가이드 — 강사가 매니저 블록 수정 가능 여부 / 강사간 상호 수정 가능 여부

---

## 12. 본 문서 활용

- **D-Day**: PM이 캠프파이어 담당자에게 본 문서 + POL-CR-02 정책서 1회 구두 전달
- **D+3**: 캠프파이어 담당자 의견 수렴 후 본 문서 v0.2 갱신 (담당 분담·일정 포함)
- **D+5**: 본 문서를 캠프파이어 도메인 PRD/스펙으로 이관 — 본 문서는 그 시점부터 archive
