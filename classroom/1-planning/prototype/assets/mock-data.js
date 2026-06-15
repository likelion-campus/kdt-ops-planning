/* mock-data.js — 30일 × 30명 합성 데이터
 * 학생 25~30번은 회색(위험군)이 자연스럽게 보이도록 분포 편향 (PRD §9 위험군 = 별도 라벨 X, 히트맵 회색).
 * 결정론적 seeded random — 새로고침해도 동일 분포.
 */
(function () {
  // ---------- seeded random ----------
  function mulberry32(seed) {
    return function () {
      seed |= 0; seed = seed + 0x6D2B79F5 | 0;
      let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }
  const r = mulberry32(2026_05_28);
  const pick = (arr) => arr[Math.floor(r() * arr.length)];

  // ---------- 날짜 ----------
  const TODAY = '2026-05-28';
  const DAYS = []; // 30일 (2026-04-29 ~ 2026-05-28)
  {
    const end = new Date(TODAY);
    for (let i = 29; i >= 0; i--) {
      const d = new Date(end); d.setDate(end.getDate() - i);
      DAYS.push(d.toISOString().slice(0, 10));
    }
  }
  const HOLIDAYS = ['2026-05-05']; // 어린이날
  const isWeekday = (d) => { const w = new Date(d).getDay(); return w !== 0 && w !== 6; };
  const isLearningDay = (d) => isWeekday(d) && !HOLIDAYS.includes(d);

  // ---------- 학생 ----------
  const STUDENT_NAMES = [
    '김재훈', '박서연', '이도윤', '최지우', '정하준', '강민서', '윤서윤', '임지호', '한예린', '조시우',
    '백지안', '오준영', '서수아', '신유진', '권태민', '안지율', '문서아', '양건우', '배하늘', '구민찬',
    '남유나', '심지민', '홍채원', '전현우', '고은서', '나도현', '도하린', '류시안', '맹지후', '복지환',
  ];
  const STUDENTS = STUDENT_NAMES.map((name, i) => {
    const id = 's' + String(i + 1).padStart(2, '0');
    // 25~30번은 위험군 — 활동률 낮게 편향
    const baseActivity = i < 20 ? 0.85 - i * 0.01 : 0.45 - (i - 20) * 0.04;
    // 동명이인 식별용 전화번호 뒷자리 4 (결정론적). 이름 노출 시 항상 함께 표시.
    const phone4 = String((i * 7919 + 3271) % 10000).padStart(4, '0');
    // 중도포기자 (admin에서 별도 설정 가정) — 데모로 위험군 2명 지정
    const dropped = (i === 26 || i === 29); // s27, s30
    // 중도포기 확정일 — 퀴즈 매니저뷰 '생성 시점 기준' 집계용(POL-CR-03 v1.12). 미지정 시 전 기간 포기로 간주.
    // s30(5/12) → 5/12 이후 생성 퀴즈에서 제외, s27(5/20) → 5/20 이후 제외. 그 전 생성 퀴즈는 응시 점수 보존·표시.
    const droppedAt = i === 26 ? '2026-05-20' : (i === 29 ? '2026-05-12' : null);
    return { id, name, no: i + 1, phone4, dropped, droppedAt, baseActivity: Math.max(0.15, baseActivity) };
  });

  // ---------- AI 노트 ----------
  // 가장 최근 일자(today)에는 스크린샷 .md 풀 본문, 다른 날은 요약형
  const FULL_NOTE_TODAY = {
    title: '1주차 리서치와 스프린트 운영',
    summary: '본 강의는 1주차의 핵심 목표를 "리서치와 데이터 수집을 통해 문제를 발굴하고, 팀 내 배경지식을 정렬하는 것"으로 정리하고, 2주차부터는 내부, 외부 사용자 조사를 통해 우선순위와 의사결정을 명확히 하도록 흐름을 제시했습니다. 특히 사용자 조사(유저 리서치)를 \'가설과 솔루션의 검증을 위한 데이터 수집 과정\'으로 정의하며, 설문, 인터뷰 등을 통해 고객의 공감과 지불 의사까지 확인해야 한다는 점을 강조했습니다. 또한 3~4주차에는 UX/UI 구체화와 프로토타입 제작, 최종 사용자 조사 및 데이터 분석, 발표 준비로 이어지는 산출물 중심의 스케줄을 설명했습니다.',
    body: `# 1주차 리서치와 스프린트 운영

## 주차별 산출물 로드맵
> 1주차는 리서치 기반 문제 발굴과 팀 내 배경지식 정렬에 집중하고, 2주차는 내부, 외부 사용자 조사로 우선순위와 가설 근거를 강화하며, 3주차는 UX/UI와 프로토타입으로 솔루션을 구체화하고, 4주차는 사용자 검증, 데이터 분석과 발표 준비로 마무리됩니다.

1주차의 핵심은 팀별로 리서치와 데이터 수집을 최대한 확장하면서, 그 안에서 공감대가 형성되는 문제를 발굴하는 것입니다. 팀원마다 배경지식이 다르므로, 각자가 가진 리서치 관점을 공유해 문제의식과 용어 수준을 맞추는 과정이 중요합니다.

2주차에는 월요일(또는 주초) 시점에 우선순위와 의사결정 기준이 어느 정도 명확해야 합니다. 이후에는 단순 문헌, 통계 리서치가 아니라, 필요 시 추가 사용자 조사를 통해 가설의 근거를 보강하는 흐름이 권장됩니다.

3주차는 설계 단계로서 UX/UI 구체화와 프로토타입 산출물이 본격적으로 등장합니다. 미드 프로젝트 대비 프로토타이핑 도구 선택지가 넓어졌다는 점을 전제로, 결과물의 설득력을 높일 수 있는 표현 수단을 적극적으로 활용하는 구성이 됩니다.

| 주차 | 주요 목표 | 대표 활동 | 핵심 산출물 |
|---|---|---|---|
| 1주차 | 문제 발굴 및 공감대 형성 | 리서치, 데이터 수집, 팀 내 지식 공유 | 문제 후보군, 공통 문제 정리 |
| 2주차 | 우선순위, 의사결정 명확화 | 내부/외부 사용자 조사, 정량 데이터 확보 | 우선순위, 가설 근거 |
| 3주차 | 솔루션 구체화 | UX/UI 설계, 프로토타입 제작, 대안 비교 | 프로토타입, 유저 플로우 |
| 4주차 | 검증 및 발표 마무리 | 사용자 테스트, 데이터 분석, 발표 준비 | 검증 결과, 인사이트, 발표 자료 |

### 핵심 키워드
@@KEYWORDS:우선순위,문제발굴,프로토타입,UX/UI,발표산출물

## 사용자 조사(유저 리서치)와 검증
> 유저 리서치는 팀 내부 가설을 외부 데이터로 검증하여 공감과 설득 가능성, 나아가 고객의 지불 의사까지 확인하는 과정이며, 설문과 인터뷰 같은 방법으로 정성, 정량 데이터를 확보해 타당성과 신뢰를 보강합니다.

사용자 조사는 '피드백을 받는다'기보다 '검증을 위한 데이터를 수집한다'는 관점으로 정리됩니다. 내부에서 생각한 문제, 솔루션이 실제 사용자에게도 설득되는지, 그리고 제품이 문제를 해결해준다고 했을 때 비용을 지불할 의사가 있는지를 확인하는 것이 목적입니다.

| 구분 | 대상 | 목적 | 활용 포인트 |
|---|---|---|---|
| 내부 유사군 리서치 | 유사한 배경의 동료 집단 | 가설의 논리적 결함과 용어/전제 점검 | 초기 우선순위와 논리 정제에 유리 |
| 외부 사용자 리서치 | 실제 사용자 또는 잠재 고객 | 공감, 니즈, 지불 의사 검증 | 시장 타당성과 고객 관점의 반증 확보 |

### 핵심 키워드
@@KEYWORDS:유저리서치,설문,인터뷰,가설검증,정량데이터

## 솔루션 정의와 대안 설계 전략
> 솔루션 정의는 '무엇을 만들 것인지'를 유저 플로우와 핵심 기능 수준에서 서술 가능한 상태로 만드는 것이며, 이후 UX/UI, 프로토타입으로 구체화하면서 복수 대안(예: AI 적용/미적용, UI 2안)을 비교해 최적안을 채택하는 방식으로 진행됩니다.

솔루션이 "정의되었다"는 것은 단지 아이디어가 있다는 의미가 아니라, 사용자 흐름과 구현해야 할 기능이 가시적으로 정리되어 설명 가능한 상태를 뜻합니다. 즉, 목, 금의 단계는 피그마 산출물 자체보다는 '기획 서술(As-Is/To-Be 관점 포함)이 가능한 수준'에 더 가깝습니다.

단일 해법만 제시하면 설득력이 약해질 수 있으므로, 최소 2가지 이상의 방향을 대비하는 전략이 권장됩니다. 특히 AI로 문제를 해결하는 방식과 AI 없이 해결하는 방식을 모두 검토하면, 기술 선택의 당위성과 대체 가능성을 동시에 보여줄 수 있습니다.

### 핵심 키워드
@@KEYWORDS:솔루션정의,유저플로우,ROI,리스크,AB테스트

## 애자일 스프린트와 데일리 스크럼 운영
> 스프린트 방식은 주간 목표를 설정하고 역할을 분배한 뒤, 데일리 스크럼에서 진행 상황과 미완료 작업을 공유하며 실행력을 관리하는 운영 체계입니다.

데일리 스크럼은 "오늘 해야 할 일"과 "마무리하지 못했던 일"을 공유하여 작업 병목을 빠르게 드러내는 장치로 설명됩니다.

- 데일리 스크럼에서는 당일 수행 계획과 미완료 항목을 반드시 공유해야 합니다.
- 주간 목표 설정과 역할 분배는 주초에 확정해 실행 기준을 명확히 해야 합니다.
- 리서치 이후 단계에서는 짧은 기간이라도 분업을 적용해 산출물 품질을 높여야 합니다.
- 회고와 주간 설문은 팀 운영의 개선점을 축적하는 장치로 기능합니다.

### 핵심 키워드
@@KEYWORDS:스프린트,데일리스크럼,역할분담,회고,주간목표`,
  };

  const AI_NOTE_TOPICS = {
    '2026-05-28': 'pandas groupby & 시계열 리샘플링',
    '2026-05-27': 'SQL Window 함수 — ROW_NUMBER · LAG · LEAD',
    '2026-05-26': 'matplotlib 다중 축 + seaborn heatmap',
    '2026-05-25': 'scikit-learn pipeline + GridSearchCV',
    '2026-05-22': 'EDA 케이스 스터디 — 이탈률 분석',
    '2026-05-21': '모델 평가 지표 — Precision/Recall/F1',
    '2026-05-20': 'Feature Engineering 패턴 정리',
    '2026-05-19': 'EDA 시각화 모범 사례',
  };

  const AI_NOTES = {};
  DAYS.forEach((d) => {
    if (!isLearningDay(d)) return;
    if (d === TODAY) {
      AI_NOTES[d] = FULL_NOTE_TODAY;
      return;
    }
    const topic = AI_NOTE_TOPICS[d] || pick(['Python 기초 복습', 'Git workflow 정리', '시각화 모범 사례', '데이터 정제 패턴']);
    AI_NOTES[d] = {
      title: topic,
      summary: `오늘은 ${topic}을(를) 다뤘다. 핵심 개념 3가지와 실습 예제 2개를 정리했다.`,
      body: `# ${topic}\n\n## 금일 학습 요약\n> 오늘은 ${topic}의 기초 개념과 실무 적용 패턴을 다뤘습니다.\n\n핵심 개념을 정리한 뒤, 코드 예제로 직접 확인하고 발생할 수 있는 흔한 실수를 짚었습니다.\n\n## 핵심 개념\n강의 중 정리한 핵심 개념 3가지\n\n## 코드 예제\n\`df.groupby([...]).agg(...)\` 와 같은 패턴\n\n### 핵심 키워드\n@@KEYWORDS:기초,실무,코드예제,주의사항`,
      sections: [
        { heading: '핵심 개념', body: '강의 중 정리한 핵심 개념 3가지' },
        { heading: '코드 예제', body: '`df.groupby([...]).agg(...)` 와 같은 패턴' },
        { heading: '주의 사항', body: 'NaN 처리와 인덱스 정렬에 유의' },
      ],
    };
  });

  // AI 노트 매니저 수정 데모 — '수정됨 · 시각' 배지 + 원본 복구(백업).
  // 잘못 수정했을 때 되돌릴 수 있도록 최초 수정 시 원본(originalBody/Title/Summary)을 보관한다.
  if (AI_NOTES['2026-05-27']) {
    const n = AI_NOTES['2026-05-27'];
    n.originalTitle = n.title;
    n.originalSummary = n.summary;
    n.originalBody = n.body;
    n.editedAt = '2026-05-27T11:20';
    n.body = n.body + '\n\n## 매니저 보강 (수정)\n> 실습 중 자주 나온 질문을 강사가 보강했습니다.\n\n- PARTITION BY 없이 ORDER BY만 쓰면 누적 집계가 전체 행 기준으로 동작합니다.\n- 원본 복구 버튼으로 이 보강 전 상태로 되돌릴 수 있습니다.';
  }

  // ---------- AI 퀴즈 ----------
  // 문항별 평균 응시시간(초) — 문제 난이도 측정 지표. 합계가 목표 응시시간(15분=900초)에 맞도록 구성.
  // (긴 시간 = 어려운 문항. 매니저는 이 값으로 09:30 리뷰 우선순위를 판단)
  const QUIZ_TARGET_SEC = 900; // 하루 학습퀴즈 목표 풀이시간 (전체 10문항 ≈ 15분)
  const BASE_SECS = [120, 75, 150, 60, 90, 80, 110, 70, 95, 50]; // 합계 900초
  const SAMPLE_QUIZ = (date) => ({
    questions: [
      {
        id: `${date}-q1`,
        stem: 'pandas에서 그룹별 평균을 구할 때 가장 권장되는 패턴은?',
        choices: [
          'df.mean().groupby(col)',
          'df.groupby(col).mean(numeric_only=True)',
          'df.apply(lambda g: g.mean())',
          'df.aggregate(mean)',
        ],
        answer: 1,
        explanation: 'groupby 후 mean을 호출할 때 numeric_only=True를 명시하는 것이 안전하다. 비수치 컬럼에서 발생하는 FutureWarning을 피한다.',
        avgSec: BASE_SECS[0],
      },
      {
        id: `${date}-q2`,
        stem: 'pd.to_datetime이 가장 안전하게 동작하는 입력은?',
        choices: ['ISO 8601 문자열', 'epoch float', '월/일 약어 영문', '한글 날짜 표기'],
        answer: 0,
        explanation: 'ISO 8601(예: 2026-05-28)은 모호함이 없어 가장 안전하다.',
        avgSec: BASE_SECS[1],
      },
      {
        id: `${date}-q3`,
        stem: '시계열 리샘플링에서 다운샘플(D → W) 시 기본 집계는?',
        choices: ['sum', 'mean', 'first', '에러'],
        answer: 3,
        explanation: '.resample("W")만 호출하면 집계함수가 없어 에러. .mean() 등 명시 필요.',
        avgSec: BASE_SECS[2],
      },
      // 4~10번은 동일 패턴으로 생성 — 데모용 짧게
      ...Array.from({ length: 7 }, (_, i) => ({
        id: `${date}-q${i + 4}`,
        stem: `샘플 문항 ${i + 4} — 강의 핵심 개념 점검`,
        choices: ['보기 A', '보기 B', '보기 C', '보기 D'],
        answer: Math.floor(r() * 4),
        explanation: '해설: 핵심 개념과 연결지어 이해할 것.',
        avgSec: BASE_SECS[i + 3],
      })),
    ],
  });

  const QUIZZES = {};
  DAYS.forEach((d, i) => {
    if (!isLearningDay(d)) return;
    const isToday = d === TODAY;
    const failed = d === '2026-05-26';
    const baseQuiz = SAMPLE_QUIZ(d);
    QUIZZES[d] = {
      status: failed ? 'generation_failed'
        : isToday ? 'draft'
          : 'published',
      generatedAt: failed ? null : d + 'T14:00',
      publishedAt: isToday || failed ? null : d + 'T08:30',
      defaultPublishAt: '08:30',
      autoPublishFailedAt: d === '2026-05-21' ? d + 'T08:30' : null,
      error: failed ? 'AI 노트 매핑 실패 — 매니저 재생성 필요' : null,
      ...baseQuiz,
      // 묶음(set) 모델 — 자동 1세트 + 수동 추가 가능
      sets: [
        {
          id: `${d}-set-auto`,
          title: `${MOCK_TOPIC_FOR(d)} 데일리 퀴즈`,
          source: 'auto',
          status: failed ? 'generation_failed' : (isToday ? 'scheduled' : 'published'),
          publishedAt: (isToday || failed) ? null : d + 'T08:30',
          scheduledAt: isToday ? d + 'T08:30' : null,
          questions: baseQuiz.questions,
        },
      ],
    };
  });
  function MOCK_TOPIC_FOR(d) {
    return AI_NOTE_TOPICS[d] || '데일리';
  }
  // 오늘 Draft에 매니저 수동 추가 세트 1개 (데모 풍부화)
  if (QUIZZES[TODAY]) {
    QUIZZES[TODAY].sets.push({
      id: `${TODAY}-set-manual-1`,
      title: '심화 — 실무 케이스 챌린지',
      source: 'manual',
      status: 'draft',
      publishedAt: null,
      scheduledAt: null,
      questions: SAMPLE_QUIZ(TODAY).questions.slice(0, 5).map((q, i) => ({ ...q, id: `${TODAY}-m-q${i + 1}`, stem: '강사 직접 작성 — ' + q.stem })),
    });
  }
  // 발행 후 텍스트 수정 데모 — 특정 과거 발행본에 "수정됨 · 시각" 표시
  // (정답·보기 번호는 잠금 / 문제·보기·해설 텍스트만 수정 가능 — POL-CR-03 §1.1)
  if (QUIZZES['2026-05-27']) {
    const editedAt = '2026-05-27T10:15';
    const set0 = QUIZZES['2026-05-27'].sets[0];
    set0.editedAt = editedAt;
    if (set0.questions[0]) set0.questions[0].editedAt = editedAt;
    if (set0.questions[2]) set0.questions[2].editedAt = editedAt;
    // QUIZZES[d].questions 는 set0.questions 와 동일 참조이므로 함께 반영됨
  }

  // ---------- 응시 ----------
  const ATTEMPTS = {};
  STUDENTS.forEach((s) => {
    ATTEMPTS[s.id] = {};
    DAYS.forEach((d) => {
      if (!QUIZZES[d] || QUIZZES[d].status !== 'published') return;
      const took = r() < s.baseActivity;
      if (!took) { ATTEMPTS[s.id][d] = { submitted: false }; return; }
      const correct = Math.round(s.baseActivity * 10 + (r() - 0.5) * 3);
      const score = Math.max(0, Math.min(10, correct));
      // 오답 ID
      const wrongCount = 10 - score;
      const wrongIds = Array.from({ length: wrongCount }, (_, i) => `${d}-q${i + 1}`);
      // 학생별 풀이 시간 — 활동률 높을수록 빠름(목표 900초 대비). timeFactor로 문항별 시간 재현.
      const timeFactor = +(1.3 - s.baseActivity * 0.55 + (r() - 0.5) * 0.2).toFixed(3);
      const durationSec = Math.max(180, Math.round(QUIZ_TARGET_SEC * timeFactor));
      ATTEMPTS[s.id][d] = { submitted: true, submittedAt: d + 'T09:30', score, wrongIds, durationSec, timeFactor };
    });
  });

  // ---------- 오답노트 (학생별 누적) ----------
  const WRONG_NOTES = {};
  STUDENTS.forEach((s) => {
    WRONG_NOTES[s.id] = [];
    DAYS.forEach((d) => {
      const a = ATTEMPTS[s.id]?.[d];
      if (!a?.submitted || !a.wrongIds?.length) return;
      a.wrongIds.forEach((qid, idx) => {
        const q = QUIZZES[d].questions.find((q) => q.id === qid);
        if (!q) return;
        WRONG_NOTES[s.id].push({
          date: d,
          questionId: qid,
          source: 'today', // 출처: 오늘의 퀴즈
          stem: q.stem,
          choices: q.choices,
          userPick: (q.answer + 1 + idx) % 4, // 정답이 아닌 보기
          answer: q.answer,
          explanation: q.explanation,
          bookmarked: r() < 0.15,
          memo: r() < 0.1 ? '복습 필요 — 인덱스 정렬 부분 다시' : null,
        });
      });
    });
  });

  // ---------- 보충 퀴즈 ----------
  // 6개월(180일) 시뮬레이션: 학생이 직접 생성한 보충 퀴즈 세트들.
  // 세트 1개 = 한 번의 "생성 요청"으로 만들어진 5~15문항 묶음.
  // 한도 1000문제/일 (내부값, UI 비표시).
  const SUPP_TARGET_DAYS = [];
  {
    const end = new Date(TODAY);
    for (let i = 180; i >= 0; i--) {
      const d = new Date(end); d.setDate(end.getDate() - i);
      const iso = d.toISOString().slice(0, 10);
      SUPP_TARGET_DAYS.push(iso);
    }
  }

  const SUPP_SESSIONS = {}; // sid -> [세트 객체]
  STUDENTS.forEach((s) => {
    SUPP_SESSIONS[s.id] = [];
    // 학생 활동률에 따라 세트 개수
    const setCount = Math.floor(20 + s.baseActivity * 50); // 25 ~ 65 세트
    for (let i = 0; i < setCount; i++) {
      // 결정론적 가짜 랜덤
      const seed = parseInt(s.id.replace('s', '')) * 1000 + i;
      const rr = (seed * 9301 + 49297) % 233280 / 233280;
      const createdIdx = Math.floor(rr * SUPP_TARGET_DAYS.length);
      const createdAt = SUPP_TARGET_DAYS[createdIdx] + 'T18:30';
      // 대상 날짜 (학습한 날 중 하나)
      const targetIdx = Math.max(0, createdIdx - Math.floor(rr * 5));
      const targetDate = SUPP_TARGET_DAYS[targetIdx];
      const count = [5, 10, 15][i % 3];
      const solved = rr > 0.25;
      const correct = solved ? Math.round(count * (0.45 + s.baseActivity * 0.45)) : 0;
      // 푼 날짜 — 생성일로부터 0~2일 뒤 (히트맵 "푼 날짜 기준" 집계용)
      const solvedAt = solved
        ? SUPP_TARGET_DAYS[Math.min(SUPP_TARGET_DAYS.length - 1, createdIdx + (seed % 3))] + 'T19:30'
        : null;
      const setId = `supp-${s.id}-${i}`;
      const topic = AI_NOTE_TOPICS[targetDate] || '복습 세트';
      SUPP_SESSIONS[s.id].push({
        id: setId,
        createdAt,
        targetDate,
        count,
        solved,
        solvedAt,
        correct,
        rate: solved ? correct / count : null,
        wrongFocus: i % 2 === 0,
        topic,
      });
      // 보충 퀴즈 오답도 오답노트에 누적 (출처: 보충 퀴즈) — 대상일 퀴즈 풀에서 1문항 노트화
      if (solved && i % 2 === 0 && count - correct > 0 && QUIZZES[targetDate]?.questions?.length) {
        const pool = QUIZZES[targetDate].questions;
        const q = pool[seed % pool.length];
        WRONG_NOTES[s.id].push({
          date: (solvedAt || createdAt).slice(0, 10),
          questionId: `${setId}-wn`,
          source: 'supp', // 출처: 보충 퀴즈
          title: topic, // 보충 퀴즈는 대상일 핵심 개념을 제목으로
          stem: q.stem,
          choices: q.choices,
          userPick: (q.answer + 1) % q.choices.length,
          answer: q.answer,
          explanation: q.explanation,
          bookmarked: false,
          memo: null,
        });
      }
    }
    // 최신순 정렬
    SUPP_SESSIONS[s.id].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  });

  // 매니저 히트맵용 일별 사용수 집계
  const SUPPLEMENTARY = {};
  STUDENTS.forEach((s) => {
    SUPPLEMENTARY[s.id] = {};
    SUPP_SESSIONS[s.id].forEach((set) => {
      const d = set.createdAt.slice(0, 10);
      if (!SUPPLEMENTARY[s.id][d]) SUPPLEMENTARY[s.id][d] = { count: 0, sets: 0, sumScore: 0 };
      SUPPLEMENTARY[s.id][d].count += set.count;
      SUPPLEMENTARY[s.id][d].sets += 1;
      SUPPLEMENTARY[s.id][d].sumScore += set.rate || 0;
    });
    Object.values(SUPPLEMENTARY[s.id]).forEach((agg) => { agg.avgScore = agg.sets ? agg.sumScore / agg.sets : 0; });
  });

  // 매니저 히트맵용 — "푼 날짜" 기준 일별 풀이 횟수(세트=회) 집계. Max 10회.
  const SUPP_SOLVED_DAILY = {}; // sid -> { 'YYYY-MM-DD': { plays, sumRate } }
  STUDENTS.forEach((s) => {
    SUPP_SOLVED_DAILY[s.id] = {};
    SUPP_SESSIONS[s.id].forEach((set) => {
      if (!set.solved || !set.solvedAt) return;
      const d = set.solvedAt.slice(0, 10);
      if (!SUPP_SOLVED_DAILY[s.id][d]) SUPP_SOLVED_DAILY[s.id][d] = { plays: 0, sumRate: 0 };
      SUPP_SOLVED_DAILY[s.id][d].plays += 1;
      SUPP_SOLVED_DAILY[s.id][d].sumRate += set.rate || 0;
    });
  });

  // ---------- 실습 ----------
  const PRACTICE_TEMPLATES = [
    { title: 'pandas groupby 실전', body: '주어진 매출 데이터에서 지역×제품군 합계를 구해 시각화하시오.', criteria: '정확한 집계 · 시각화 적절성 · 코드 가독성' },
    { title: 'SQL Window 함수 응용', body: '월별 사용자 누적 매출과 전월 대비 증감을 한 쿼리로 작성하시오.', criteria: '함수 선택 · 결과 정확성 · 가독성' },
    { title: 'EDA: 이탈 사용자 분석', body: '제공된 로그에서 이탈 패턴 3가지를 발견하고 가설을 세우시오.', criteria: '가설의 구체성 · 데이터 근거 · 시각화' },
    { title: 'Pipeline + GridSearch', body: '제공된 분류 문제에 대해 scikit-learn pipeline을 구성하고 GridSearchCV로 튜닝하시오.', criteria: '파이프라인 구조 · 평가 지표 선택 · 결과 해석' },
  ];

  const PRACTICES = {};
  DAYS.forEach((d, i) => {
    if (!isLearningDay(d)) { PRACTICES[d] = []; return; }
    if (d === TODAY) { PRACTICES[d] = []; return; } // 오늘은 빈 케이스 시연용
    const count = i % 5 === 0 ? 2 : 1;
    PRACTICES[d] = Array.from({ length: count }, (_, k) => {
      const t = PRACTICE_TEMPLATES[(i + k) % PRACTICE_TEMPLATES.length];
      return {
        id: `prac-${d}-${k + 1}`,
        title: t.title,
        body: t.body,
        criteria: t.criteria,
        publishedAt: d + 'T14:00',
        scheduledAt: null,
        campfireChannel: i % 7 === 0 ? '#daily-practice' : null,
        updatedAt: i % 9 === 0 ? d + 'T16:30' : null,
        scope: 'standard',
      };
    });
  });

  const PRACTICE_SUBMISSIONS = {};
  STUDENTS.forEach((s) => {
    PRACTICE_SUBMISSIONS[s.id] = {};
    Object.entries(PRACTICES).forEach(([d, plist]) => {
      plist.forEach((p) => {
        const submitted = r() < s.baseActivity;
        const graded = submitted && r() < 0.55;
        PRACTICE_SUBMISSIONS[s.id][p.id] = submitted
          ? {
            submitted: true,
            submittedAt: d + 'T17:20',
            text: '실습 결과를 정리한 텍스트입니다. (Mock)',
            attachments: r() < 0.4 ? ['result.png'] : [],
            urls: r() < 0.5 ? ['https://github.com/sample/repo'] : [],
            score: graded ? Math.round(s.baseActivity * 100) : null,
            comment: graded ? '코드 가독성 좋음. 시각화 축 라벨 보완 추천.' : null,
            gradedAt: graded ? d + 'T20:00' : null,
          }
          : { submitted: false };
      });
    });
  });

  // ---------- TIL ----------
  const TIL_SAMPLES = [
    { ld: 'pandas groupby의 numeric_only 옵션이 핵심임을 알게 되었다.', stuck: 'MultiIndex 슬라이싱이 헷갈림.', next: 'IndexSlice 패턴 정리하기' },
    { ld: 'SQL Window 함수는 OVER 절 설계가 가장 중요하다.', stuck: 'PARTITION 없이 ORDER BY만 썼을 때 동작이 모호함.', next: 'lead/lag 예제 3개 풀기' },
    { ld: 'pipeline은 fit_transform의 순서를 명확히 만든다.', stuck: 'GridSearchCV 결과 해석이 어려움.', next: 'best_params_ vs cv_results_ 차이 정리' },
    { ld: '시계열 리샘플링에서 .resample 후 집계함수 누락이 잦은 실수.', stuck: '주말 포함 여부에 따라 결과가 달라짐.', next: 'business day frequency 정리' },
  ];

  const TILS = {};
  STUDENTS.forEach((s) => {
    TILS[s.id] = {};
    DAYS.forEach((d, i) => {
      if (!isLearningDay(d)) return;
      const roll = r();
      let status;
      if (roll < s.baseActivity * 0.85) status = 'written';
      else if (roll < s.baseActivity) status = 'temp';
      else status = 'none';
      if (status === 'none') { TILS[s.id][d] = { status }; return; }
      const tpl = TIL_SAMPLES[i % TIL_SAMPLES.length];
      const editCount = status === 'written' && r() < 0.3 ? 1 : 0;
      // 우수 TIL — 매니저가 마크 (데모: written 중 일부). 색약 대응 위해 색 + 별 아이콘 동시.
      const excellent = status === 'written' && r() < 0.12;
      TILS[s.id][d] = {
        status,
        title: `${d} TIL`,
        body: `# 오늘 배운것\n${tpl.ld}\n\n# 막힌것\n${tpl.stuck}\n\n# 내일 할 것\n${tpl.next}`,
        updatedAt: d + (status === 'temp' ? 'T17:30' : 'T18:00'),
        editCount,
        excellent,
      };
    });
  });

  // ---------- 프로젝트 ----------
  const PROJECTS = [
    {
      id: 'proj-basic',
      round: '기초',
      title: '기초 프로젝트 — Python 데이터 정제 챌린지',
      summary: '결측·이상치·중복이 섞인 raw 데이터를 정제하고, 인사이트 2개를 도출합니다.',
      description: `# 배경

실무에서는 분석 모델보다 **데이터 정제**가 80%의 시간을 차지합니다. 본 기초 프로젝트는 정제 파이프라인의 기본기를 다지는 것을 목표로 합니다.

# 문제 정의

전국 60개 매장의 2024년 1~3분기 POS 데이터(약 120만 행)가 제공됩니다. 이 데이터에는 다음과 같은 품질 이슈가 섞여 있습니다.

- 일부 매장의 매출 단위가 \`KRW\` / \`won\` / 빈 셀로 섞여 있음
- 동일 거래가 시각 차이로 인해 1~3건씩 중복 입력됨
- 일부 행은 음수 값(환불) 표기, 일부는 \`refund\` 컬럼 별도 표기
- 지역 코드가 \`서울\`, \`SEL\`, \`Seoul\` 등으로 혼재

# 요구 사항

1. **정제 파이프라인** — 위 4가지 이슈를 일관된 정책으로 처리
2. **인사이트 2개** — 정제 후 데이터로부터 도출한 발견을 시각화 + 1줄 코멘트
3. **재현 가능성** — \`pipeline.py\` 또는 노트북 1개로 raw → cleaned 변환이 가능해야 함

# 제출물

- GitHub 레포 URL (코드 + README)
- 시연 영상 URL (5분 내, YouTube/Vimeo)
- 메인 이미지 (대표 시각화 1장)

# 평가 기준

- 정제 정책의 일관성 (40%)
- 인사이트의 설득력 (30%)
- 코드 가독성·재현성 (20%)
- 발표 영상 명확성 (10%)`,
      registeredAt: '2026-04-22',
      submitFrom: '2026-04-29', submitTo: '2026-05-06',
      feedbackFrom: '2026-05-07', feedbackTo: '2026-05-13',
      status: '종료',
    },
    {
      id: 'proj-deep',
      round: '심화',
      title: '심화 프로젝트 — 머신러닝 모델링 + 대시보드',
      summary: '도메인 데이터로 분류/회귀 모델을 학습하고, 결과를 대시보드로 가시화합니다.',
      description: `# 배경

기초 프로젝트가 데이터를 다루는 손이었다면, 심화는 **모델링 + 결과 전달**의 흐름을 익힙니다.

# 문제 정의

다음 3개 중 1개를 선택하세요.

1. **이탈 예측** — 구독 서비스의 사용자 로그로 30일 내 이탈 확률 예측 (분류)
2. **수요 예측** — 지난 24개월 매출로 향후 3개월 수요 예측 (회귀)
3. **추천 점수** — 사용자×아이템 상호작용에서 추천 점수 산출 (랭킹)

# 요구 사항

1. **Pipeline** — \`sklearn.pipeline\` 또는 동등 도구로 전처리 + 모델 + 평가까지 한 흐름
2. **모델 비교** — 최소 2개 알고리즘 비교 + 채택 이유
3. **대시보드** — Streamlit / Gradio 등으로 결과를 인터랙티브하게 가시화
4. **Tech Stack 문서화** — README에 데이터·모델·서빙 흐름을 1장 다이어그램으로

# 제출물

- GitHub 레포 URL (코드 + README + 다이어그램)
- 대시보드 URL (배포 또는 로컬 실행 영상)
- 시연 영상 URL (7분 내)
- 메인 이미지

# 평가 기준

- 문제 정의의 명확성 (15%)
- 모델 성능 + 비교 분석 (30%)
- 파이프라인 재현성 (20%)
- 대시보드 UX (20%)
- 발표 영상 (15%)`,
      registeredAt: '2026-05-01',
      submitFrom: '2026-05-10', submitTo: '2026-05-20',
      feedbackFrom: '2026-05-25', feedbackTo: '2026-06-08',
      status: '피드백 진행',
    },
    {
      id: 'proj-final',
      round: '파이널',
      title: '파이널 프로젝트 — 팀 단위 데이터 프로덕트',
      summary: '4~5인 팀이 자유 주제로 데이터 프로덕트를 개발합니다. 제출은 개인 단위.',
      description: `# 배경

부트캠프의 종합 마무리. 팀으로 협업하되, **제출은 개인 단위**로 진행합니다. (PRD §9 — 팀 단위 제출 없음)

# 문제 정의

팀이 자유 주제로 1개의 데이터 프로덕트를 기획·개발합니다. 본인의 기여 영역을 명확히 정의하고, 본인 파트를 중심으로 제출하세요.

### 권장 주제 (참고)

- 데이터 분석 SaaS (대시보드·리포트 자동 생성)
- 도메인 특화 추천 시스템 (영화·음식·도서·여행)
- 공공 데이터 활용 시민 도구 (대기질·교통·복지)
- LLM 기반 어시스턴트 (특정 도메인 Q&A)

# 요구 사항

1. **문제 정의** — 누구의 어떤 페인을 해결하는가
2. **팀 협업 흐름** — 본인 파트 + 팀 전체 흐름 다이어그램
3. **MVP 배포** — 실제 사용자가 클릭 가능한 형태
4. **회고** — 잘된 점·아쉬운 점·다음 액션
5. **시연 영상** — 10분 내, 본인 파트 데모 포함

# 제출물

- GitHub 레포 URL (본인이 기여한 PR 링크 포함)
- 배포 URL
- 시연 영상 URL
- 발표 자료 (slide URL)
- 메인 이미지

# 평가 기준

- 문제 정의·시장성 (20%)
- 기술적 완성도 (25%)
- 본인 기여의 명확성 (25%)
- 사용자 가치·UX (20%)
- 발표 (10%)`,
      registeredAt: '2026-05-18',
      submitFrom: '2026-05-25', submitTo: '2026-06-15',
      feedbackFrom: '2026-06-16', feedbackTo: '2026-06-22',
      status: '제출 진행',
    },
    {
      id: 'proj-extra',
      round: '기타',
      title: '오픈소스 컨트리뷰션 챌린지',
      summary: 'OSS에 PR을 1건 이상 보내고, 과정을 정리합니다. 회차당 1건 제출.',
      description: `# 배경

자기 코드만 쓰던 흐름을 깨고, **남의 코드를 읽고 기여**하는 경험을 합니다.

# 요구 사항

1. **관심 OSS 1개 선정** — 사용 중인 라이브러리에서 시작 권장 (pandas, requests, fastapi 등)
2. **PR 1건 이상** — good first issue 또는 typo fix도 OK
3. **과정 회고** — 어떻게 찾았고, 어떤 어려움이 있었고, 머지까지 얼마나 걸렸는지

# 제출물

- PR URL
- 과정 회고 (README 또는 블로그 글)
- 메인 이미지 (PR 머지 스크린샷 또는 OSS 로고)

# 평가 기준

- 기여의 의미성 (40%)
- 회고의 솔직성 (40%)
- 다음 기여 계획 (20%)`,
      registeredAt: '2026-05-08',
      submitFrom: '2026-05-15', submitTo: '2026-05-31',
      feedbackFrom: '2026-06-01', feedbackTo: '2026-06-05',
      status: '제출 진행',
    },
  ];

  // 제출 폼 옵션 — 매니저가 회차별로 지정하는 "필수 제출 값" (제목·소개·설명·이미지는 항상 필수)
  // 데모: 대부분 URL·시연영상 필수, 첨부는 선택. proj-deep만 첨부도 필수로 변형.
  PROJECTS.forEach((p) => {
    p.submitOptions = { projectUrl: true, demoVideo: true, attachment: false };
  });
  if (PROJECTS.find((p) => p.id === 'proj-deep')) PROJECTS.find((p) => p.id === 'proj-deep').submitOptions.attachment = true;

  const PROJECT_SUBMISSIONS = {};
  PROJECTS.forEach((p) => {
    PROJECT_SUBMISSIONS[p.id] = [];
    STUDENTS.forEach((s) => {
      const submitRate = p.status === '종료' ? 0.95 : p.status === '피드백 진행' ? 0.85 : 0.55;
      if (r() > submitRate * s.baseActivity * 1.1) return;
      PROJECT_SUBMISSIONS[p.id].push({
        studentId: s.id,
        studentName: s.name,
        title: `${s.name}의 ${p.round} 프로젝트`,
        oneLiner: '데이터로 의사결정을 돕는 작은 도구',
        description: `# 문제 정의\n수업에서 다룬 문제를 확장한 프로젝트입니다.\n\n# 핵심 기능\n- 자동 집계\n- 시각화 대시보드\n\n# Tech Stack\nPython · pandas · streamlit\n\n# 주요 트러블슈팅\n초기 데이터 결측치 처리에 시간이 걸렸으나 결국 imputation 전략으로 해결.\n\n# 팀 소개\n${s.name}`,
        mainImage: `https://picsum.photos/seed/${s.id}-${p.id}/640/360`,
        urls: ['https://github.com/sample/' + s.id, 'https://figma.com/file/sample'],
        videoUrl: 'https://youtu.be/dQw4w9WgXcQ',
        attachments: r() < 0.3 ? ['발표자료.pdf'] : [],
        slides: 'https://docs.google.com/presentation/d/sample',
        submittedAt: p.submitFrom + 'T22:00',
        published: r() < 0.2, // 외부 공개(로그인 없이 별도 주소로 열람) — 학생이 토글
        externalRestricted: false, // 매니저가 외부 공개를 제한했는지
        restrictReason: null, // 제한 사유 (학생 외부공개 탭에 표시)
        feedback: p.status !== '제출 진행' && r() < 0.6
          ? '문제 정의가 명확하고, 시각화 선택이 적절합니다. tech stack에서 의존성 관리 부분 보완하면 좋겠어요.'
          : null,
        excellent: r() < 0.08,
      });
    });
  });

  // s01(김재훈) 데모 고정 — 학생뷰 '내 진행 상태' 케이스 다양화
  // proj-basic(종료)=피드백 도착 / proj-deep(피드백진행)=제출 완료 / proj-extra(제출진행)=제출 완료(수정하기) / proj-final(제출진행)=미제출
  (function seedActiveStudent() {
    const sid = 's01', sname = '김재훈';
    const mk = (p, fb) => ({
      studentId: sid, studentName: sname,
      title: `${sname}의 ${p.round} 프로젝트`,
      oneLiner: '데이터로 의사결정을 돕는 작은 도구',
      description: `# 문제 정의\n수업에서 다룬 문제를 확장한 프로젝트입니다.\n\n# 핵심 기능\n- 자동 집계\n- 시각화 대시보드\n\n# Tech Stack\nPython · pandas · streamlit\n\n# 주요 트러블슈팅\n초기 데이터 결측치 처리 전략으로 해결.\n\n# 팀 소개\n${sname}`,
      mainImage: `https://picsum.photos/seed/${sid}-${p.id}/640/360`,
      urls: ['https://github.com/sample/' + sid, 'https://figma.com/file/sample'],
      videoUrl: 'https://youtu.be/dQw4w9WgXcQ', attachments: [], slides: 'https://docs.google.com/presentation/d/sample',
      submittedAt: p.submitFrom + 'T22:00', published: false, externalRestricted: false, restrictReason: null, excellent: false, feedback: fb,
    });
    const want = { 'proj-basic': '문제 정의가 명확하고 시각화 선택이 적절합니다. 의존성 관리 부분을 보완하면 좋겠어요.', 'proj-deep': null, 'proj-extra': null };
    Object.keys(want).forEach((pid) => {
      const p = PROJECTS.find((x) => x.id === pid);
      if (!p || !PROJECT_SUBMISSIONS[pid]) return;
      PROJECT_SUBMISSIONS[pid] = PROJECT_SUBMISSIONS[pid].filter((s) => s.studentId !== sid);
      PROJECT_SUBMISSIONS[pid].unshift(mk(p, want[pid]));
    });
    // 데모: proj-deep 제출물은 외부 공개가 매니저에 의해 제한된 상태 (학생 외부공개 탭에서 사유 확인)
    const deep = PROJECT_SUBMISSIONS['proj-deep']?.find((s) => s.studentId === sid);
    if (deep) { deep.published = true; deep.externalRestricted = true; deep.restrictReason = '제출물에 외부 비공개 데이터셋(고객 PII)이 포함되어 있어 외부 공개를 제한합니다. 데이터 마스킹 후 매니저에게 해제 요청해 주세요.'; }
    if (PROJECT_SUBMISSIONS['proj-final']) PROJECT_SUBMISSIONS['proj-final'] = PROJECT_SUBMISSIONS['proj-final'].filter((s) => s.studentId !== sid);
  })();

  // ---------- export ----------
  window.MOCK = {
    meta: {
      cohortName: 'KDT 데이터분석 5기',
      classId: 'kdt-da-5',
      today: TODAY,
      daysCount: DAYS.length,
      studentsCount: STUDENTS.length,
    },
    days: DAYS,
    holidays: HOLIDAYS,
    isLearningDay,
    students: STUDENTS,
    aiNotes: AI_NOTES,
    quizzes: QUIZZES,
    attempts: ATTEMPTS,
    wrongNotes: WRONG_NOTES,
    supplementary: SUPPLEMENTARY,
    suppSolvedDaily: SUPP_SOLVED_DAILY,
    suppSessions: SUPP_SESSIONS,
    suppDailyLimit: 1000,
    suppDailySetLimit: 10,
    todayQuizDailyLimit: 20, // 학습퀴즈(매니저 공식 발행) 생성일 기준 하루 최대 발행 수
    quizQuestionMax: 15, // 퀴즈 1세트 최대 문항 수
    quizTargetSec: QUIZ_TARGET_SEC, // 하루 학습퀴즈 목표 응시(풀이) 시간 — 전체 ≈ 15분(900초)
    practices: PRACTICES,
    practiceSubmissions: PRACTICE_SUBMISSIONS,
    tils: TILS,
    projects: PROJECTS,
    projectSubmissions: PROJECT_SUBMISSIONS,
    /** 데모용 활성 학생 (학생뷰 진입 시 default 본인) */
    activeStudentId: 's01',
  };
})();
