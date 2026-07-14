/* 캠프파이어 강사 가이드 — 콘텐츠 데이터 (수정은 Notion 원문 → npm run sync) */

const GUIDE_META = {
  product: "캠프파이어",
  role: "강사",
  emoji: "🎤",
  tagline: "수업 전 준비 → 화상 수업 진행 → 수업 후 마무리까지, 막힘없이.",
  audience: "캠프파이어로 수업을 진행하는 강사",
  canView: ["강사"], // 강사는 본인 가이드만
};

const GUIDE_DATA = [
  {
    id:"ch1", num:1, title:"캠프파이어 한눈에 보기", icon:"👀",
    sections:[
      { id:"i1-0", title:"강사가 쓰는 캠프파이어",
        html:`
          <ul>
            <li>캠프파이어 = 멋사의 화상 + 텍스트 올인원 채팅 솔루션 (디스코드와 사용감이 비슷합니다).</li>
            <li>강사가 주로 쓰는 기능: <strong>화상 강의 진행 · 화면 공유 · 녹화 · 질문 채널 답변</strong></li>
          </ul>` },
      { id:"i1-1", title:"강사 권한 경계 ⭐ 가장 먼저 확인",
        html:`
          <div class="callout callout--tip"><span class="callout__ico">💡</span><div>강사는 <strong>수업 진행에 필요한 권한</strong>은 갖지만, <strong>공간 운영 권한(채널·멤버·공지)은 매니저</strong>에게 있습니다. 무엇을 직접 하고 무엇을 요청해야 하는지 먼저 알아두면 수업 중 당황할 일이 없어요.</div></div>
          <table class="cf-table">
            <thead><tr><th>구분</th><th>강사가 직접 할 수 있는 것</th><th>매니저에게 요청</th></tr></thead>
            <tbody>
              <tr><td>화상 강의</td><td>강의 열기·진행·녹화(AI 요약), 화면 공유</td><td>—</td></tr>
              <tr><td>메시지</td><td>일반 채널 메시지·핀 고정·스레드·파일·코드·멘션</td><td>📢 공지 채널 게시(매니저 전용)</td></tr>
              <tr><td>채널</td><td>—</td><td>채널 생성/삭제, 비공개·권한, 비활성화</td></tr>
              <tr><td>멤버</td><td>—</td><td>멤버 초대·역할 변경·내보내기</td></tr>
              <tr><td>운영 자동화</td><td>—</td><td>데일리 팝업, 자동 메시지, 신고함 처리</td></tr>
            </tbody>
          </table>
          <div class="callout callout--warn"><span class="callout__ico">⚠️</span><div>강사는 좌측 하단 <strong>톱니(⚙️) 공간 설정 메뉴에 들어갈 수 없습니다.</strong> 멤버·채널·자동 메시지 등 모든 운영 설정은 매니저 영역입니다.</div></div>
          <div class="shot">📸 스크린샷: 캠프파이어 입장 화면</div>` },
    ],
  },
  {
    id:"ch2", num:2, title:"시작하기", icon:"🚀",
    sections:[
      { id:"i2-1", title:"입장 방법",
        html:`
          <div class="callout callout--info"><span class="callout__ico">🌐</span><div><strong>권장 브라우저 — PC Chrome 최신 버전</strong><br>화상 수업·화면 공유·녹화가 Chrome에 최적화돼 있습니다. Safari·Edge·인앱 브라우저에서는 카메라·마이크·화면 공유가 제한될 수 있으니 <strong>수업은 PC Chrome으로</strong> 진행하세요.</div></div>
          <div class="callout callout--tip"><span class="callout__ico">💡</span><div><strong>핵심</strong>: 별도 회원가입·로그인이 없습니다. 어드민에서 <strong>강사로 등록(강사 부여)</strong>되면 <strong>내 강의실</strong>의 [캠프파이어 입장하기] 버튼으로 본인 전용 토큰이 자동 인증되어 입장합니다.</div></div>
          <ol>
            <li>어드민에서 담당 훈련에 <strong>강사 부여</strong> 완료 (교육 운영 매니저가 처리)</li>
            <li>멋사 홈페이지 로그인 → <strong>내 강의실 &gt; 강의목록</strong></li>
            <li>담당 훈련 카드의 <strong>[캠프파이어 입장하기]</strong> → 자동 입장</li>
          </ol>
          <ul>
            <li><strong>최초 입장 시 비밀번호 설정 화면</strong>이 나옵니다. 이 비밀번호로 데스크톱 앱·PC(웹)·모바일 앱에서 동일 계정 로그인이 가능합니다.</li>
            <li>토큰은 유효기간이 없어 만료로 인한 실패는 없습니다. 입장이 안 되면 <strong>강사 등록 여부</strong>부터 매니저에게 확인하세요.</li>
            <li><strong>앱 받기</strong>: 좌측 하단 프로필 → [캠프파이어 앱 받기]. 데스크톱 앱은 접속 OS를 자동 감지하고, 모바일 앱은 같은 모달의 QR로 App Store·Google Play에서 설치할 수 있어요.</li>
          </ul>
          <div class="callout callout--warn"><span class="callout__ico">⚠️</span><div><strong>강사 등록이 안 됐을 때</strong>: 내 강의실에 입장 카드 자체가 보이지 않습니다 → 담당 매니저에게 강사 부여를 요청하세요.</div></div>
          <div class="shot">📸 스크린샷: 프로필 > 캠프파이어 앱 받기</div>` },
      { id:"i2-2", title:"프로필 & 표시 이름",
        html:`
          <ul>
            <li>최초 입장 시 표시 이름은 <strong>멋사 홈페이지 가입 실명</strong>으로 자동 설정 (강사도 실명 표기).</li>
            <li>입장 후 변경 가능하나, 수강생 식별을 위해 <strong>실명 유지 권장</strong>.</li>
          </ul>` },
      { id:"i2-3", title:"오디오 / 비디오 장치 점검 ⭐ 첫 수업 전 필수",
        html:`
          <div class="callout callout--tip"><span class="callout__ico">💡</span><div>강의에 입장하면 <strong>마이크는 꺼진 상태, 카메라는 켜진 상태</strong>입니다. 첫 수업 전에 어떤 장치가 잡히는지 미리 확인해두면 시작 직후 버벅이지 않아요.</div></div>
          <ul>
            <li>강의 입장 화면의 <strong>장치 드롭다운</strong>에서 사용할 카메라·마이크 선택</li>
            <li>권장 환경: Chrome 최신, 가능하면 유선 인터넷 + 헤드셋(에코 방지)</li>
            <li>입장 후 화상 패널에서 음소거/카메라를 직접 켜고 끔</li>
          </ul>
          <div class="shot">📸 스크린샷: 강의 입장 화면의 장치 선택 드롭다운</div>` },
      { id:"i2-4", title:"알림 설정",
        html:`
          <p><strong>프로필(좌측 하단) → 프로필 설정 → 알림 탭</strong>에서 알림 수준을 조정해요. (모든 역할 공통)</p>
          <ul>
            <li><strong>기본값은 '멘션만'</strong> — 나를 @멘션할 때만 알림이 와요. (필요하면 '전체 메시지'·'끄기'로 변경)</li>
            <li><strong>채널별 개별 설정</strong>: 사이드바에서 <strong>채널에 마우스를 올리면 나타나는 케밥(⋮) 메뉴</strong>를 클릭 → 그 채널만 알림을 따로 설정.</li>
          </ul>
          <div class="callout callout--tip"><span class="callout__ico">💡</span><div>질문 채널처럼 답변이 필요한 곳은 <strong>'전체 메시지'</strong>로 켜두면 놓치지 않아요.</div></div>
          <div class="shot">📸 스크린샷: 기본 알림 설정 (프로필 > 설정 > 알림 — 멘션만)</div>
          <div class="shot">📸 스크린샷: 채널별 알림 설정 (채널 케밥 메뉴)</div>` },
    ],
  },
  {
    id:"ch3", num:3, title:"화면 구성 (강사 시점)", icon:"🖥️",
    sections:[
      { id:"i3-0", title:"화면 한눈에 보기",
        html:`
          <div class="callout callout--tip"><span class="callout__ico">💡</span><div>디스코드와 구조가 거의 같습니다. 왼쪽에서 오른쪽으로: <strong>채널 목록 → 대화 영역 → 우측 상단 아이콘(검색·알림·멤버)</strong>.</div></div>
          <ul>
            <li><strong>① 사이드바</strong>: 최상단 현재 훈련(공간) 이름, 그 아래 <strong>[강의] 카드</strong>(열기/Live), 카테고리별 채널, 화상 채널, 하단 DM·내 프로필</li>
            <li><strong>② 메시지 영역</strong>: 메시지 스트림, 하단 입력창(📎 첨부·이모지), [최하단으로 이동]</li>
            <li><strong>③ 멤버 목록</strong>: 우측 상단 👥 → 역할별 구분 표시</li>
            <li><strong>④ 강의(화상) 영역</strong>: [강의] 카드의 정식 강의 + 🎤 화상 채널</li>
            <li>강사에게만 보이는 컨트롤: <strong>[강의] 카드의 [열기] 버튼</strong> (강의 개설은 매니저·강사만)</li>
          </ul>
          <div class="shot">📸 스크린샷: 강사 화면 전체, ①~④ 번호 오버레이</div>` },
    ],
  },
  {
    id:"ch4", num:4, title:"수업 전 준비", icon:"📋",
    sections:[
      { id:"i4-0", title:"수업 전 체크리스트",
        html:`
          <ul>
            <li>☐ 담당 채널 위치 확인 (강의·질문 채널 등 — 채널 세팅은 매니저가 미리)</li>
            <li>☐ 수업 자료 업로드 테스트 (📎 첨부 — 용량 제한은 확인 필요)</li>
            <li>☐ <strong>화면 공유 사전 테스트</strong> (발표 자료 ↔ 코드 에디터 전환)</li>
            <li>☐ 카메라·마이크 장치 점검 (2-3)</li>
            <li>☐ 수업 시작 안내 방법 합의: <strong>공지 채널은 매니저만 게시</strong> → 강사는 일반 채널에서 @수강생 멘션 또는 매니저에 공지 요청</li>
          </ul>
          <div class="shot">📸 스크린샷: 파일 업로드(📎) 화면</div>` },
    ],
  },
  {
    id:"ch5", num:5, title:"화상 수업 진행하기 ⭐", icon:"🎥",
    sections:[
      { id:"i5-1", title:"강의 시작하기",
        html:`
          <ol>
            <li>사이드바 최상단 <strong>[강의] 카드 &gt; [열기]</strong> → '강의를 열고 참여합니다' 화면</li>
            <li><strong>마이크는 꺼진 상태, 카메라는 켜진 상태로 입장</strong>, 사용할 장치를 드롭다운에서 선택</li>
            <li><strong>[강의 열기 및 참여]</strong> → 시작</li>
          </ol>
          <div class="callout callout--info"><span class="callout__ico">🎥</span><div>별도 설정 없이 <strong>모든 정식 강의는 자동으로 녹화</strong>되고 <strong>AI 요약·STT</strong>까지 생성됩니다.</div></div>
          <ul>
            <li>시작·종료 시 <strong>강의봇</strong>이 '강의 중' 채널에 자동 게시</li>
            <li>진행 중에는 [강의] 카드가 <strong>[Live]</strong> 표시로 바뀜</li>
          </ul>
          <div class="shot">📸 스크린샷: 강의 열기 및 참여 화면</div>` },
      { id:"i5-6", title:"수강생 호출 (미입장자 알림)",
        html:`
          <p>수업이 시작됐는데 <strong>아직 들어오지 않은 수강생</strong>에게 입장 알림(DM 호출)을 보낼 수 있어요.</p>
          <ol>
            <li>강의 화면 하단 <strong>[더보기(⋯)] → [수강생 호출]</strong></li>
            <li>호출 메시지 작성(기본 문구 제공) → <strong>[발송]</strong></li>
            <li>강의에 <strong>아직 안 들어온 수강생에게만 DM</strong>으로 전송됩니다.</li>
          </ol>
          <div class="callout callout--tip"><span class="callout__ico">💡</span><div>수강생은 <strong>'강의 초대' 알림 + [입장하기] 버튼</strong>을 받고, 누르면 <strong>바로 강의실로 입장</strong>해요.</div></div>
          <div class="shot">📸 스크린샷: 더보기 > 수강생 호출 → 메시지 작성·발송</div>` },
      { id:"i5-2", title:"화면 공유",
        html:`
          <ul>
            <li>하단 <strong>[화면 공유]</strong> → 3가지 방식 선택:
              <ul>
                <li><strong>Chrome 탭</strong> — 특정 브라우저 탭(슬라이드·노션 등)</li>
                <li><strong>창</strong> — 특정 프로그램 창(코드 에디터 등)</li>
                <li><strong>전체 화면</strong> — 모니터 전체</li>
              </ul>
            </li>
            <li><strong>오디오 포함 공유</strong>(영상 재생 시): 모달 하단 <strong>[탭 오디오도 공유]</strong> 토글 ON. 단 <strong>'Chrome 탭' + 토글 ON 조합, Chrome/Edge에서만</strong> 지원.</li>
          </ul>
          <div class="callout callout--tip"><span class="callout__ico">💡</span><div>발표 자료는 '창', 영상 재생은 '탭 + 탭 오디오 공유'로 나눠 쓰면 소리 문제가 줄어듭니다.</div></div>
          <div class="shot">📸 스크린샷: 화면 공유 선택 모달</div>` },
      { id:"i5-3", title:"세션 컨트롤 & 참가자 관리",
        html:`
          <ul>
            <li>하단 컨트롤 바: <strong>음소거 / 카메라 / 화면 공유 / 리액션 / 손 들기 / 채팅 / 더보기 / 퇴장</strong></li>
            <li><strong>[더보기] 메뉴</strong> 호스트 기능:
              <ul>
                <li><strong>수강생 호출</strong> — 아직 안 들어온 수강생에게 알림</li>
                <li><strong>전체 음소거</strong> / <strong>참여자 모두 퇴장</strong> / <strong>강의 종료하기</strong></li>
                <li><strong>활성 화자 보기 / 조감 모드(7×7, 최대 49명)</strong> — 화면 배치 전환</li>
                <li><strong>출입 기록</strong> — 입장·퇴장 기록 확인</li>
              </ul>
            </li>
            <li>우측 <strong>참가자 패널</strong>에서 참가/미참가 명단을 역할 표시와 함께 확인</li>
          </ul>
          <div class="callout callout--warn"><span class="callout__ico">⚠️</span><div><strong>발표자 지정 기능은 없습니다.</strong> 수강생 발표 시 강사가 "마이크 켜고 말씀하세요"라고 안내하세요. 멤버 역할 변경·영구 내보내기는 매니저 전용이며, 멤버 케밥(⋮)에서 강사에겐 <strong>차단·신고만</strong> 보입니다(신고 시 매니저 신고함으로 전달).</div></div>
          <div class="shot">📸 스크린샷: 더보기 메뉴 + 참가자 패널</div>` },
      { id:"i5-4", title:"소그룹(브레이크아웃) — 지원 여부 확인 필요",
        html:`
          <ul>
            <li>그룹 나누기 / 순회 / 전체 호출 기능 제공 여부는 확인 필요</li>
            <li>미지원 시 대안: 사이드바 🎤 <strong>화상 채널(팀별)</strong>로 나눠 들어가게 하고, 강사가 채널을 옮겨 다니며 순회 (팀별 화상 채널 생성은 매니저에 요청)</li>
          </ul>` },
      { id:"i5-5", title:"녹화 & AI 요약",
        html:`
          <ul>
            <li><strong>모든 정식 강의는 자동으로 녹화</strong>되며, 영상 + AI 요약·STT까지 함께 생성됩니다. (예전 'AI 요약 활성화' 토글은 없어졌고, 별도 설정이 필요 없습니다)</li>
            <li>저장된 녹화: <strong>[강의] 영역 &gt; 녹화 탭</strong>에서 재생(▶)·다운로드(⬇)</li>
          </ul>
          <div class="callout callout--warn"><span class="callout__ico">⚠️</span><div>모든 강의가 자동으로 녹화·AI 요약되어 음성이 텍스트로 기록됩니다. 민감 발언이 남을 수 있으니 <strong>수강생에게 녹화 사실을 미리 고지</strong>하세요.</div></div>
          <div class="shot">📸 스크린샷: 강의 &gt; 녹화 탭</div>` },
    ],
  },
  {
    id:"ch6", num:6, title:"수업 중 소통", icon:"💬",
    sections:[
      { id:"i6-0", title:"질문·고정·멘션·이해 확인",
        html:`
          <ul>
            <li><strong>질문 다루기</strong>: 질문 채널에서 답변은 <strong>스레드(💬)로 유도</strong> → 질문-답변이 한 묶음으로 정리</li>
            <li><strong>중요 안내 고정</strong>: 메시지 [⋯ 더보기] &gt; 고정 → 우측 📌에서 모아보기</li>
            <li><strong>코드 블록 공유</strong>: 마크다운 코드 블록 지원 (문법 강조 여부는 확인 필요)</li>
            <li><strong>멘션</strong>: <strong>@ 하나</strong>로 인원·그룹·역할을 모두 호출 (예: @이름, @1team, @수강생). @everyone은 꼭 필요할 때만.</li>
            <li><strong>이해 확인</strong>: [이해 확인] 버튼 → 수강생 화면에 '👍 이해 / 🤔 어려움' 팝업. 응답을 모아 실시간 이해도 파악, '어려움'이 많으면 보충·속도 조절.</li>
            <li><strong>이모지 리액션</strong>으로도 빠르게 이해도 체크 (예: ✅)</li>
          </ul>` },
      { id:"i6-1", title:"1:1 통화 (DM 음성·화상)",
        html:`
          <p><strong>다이렉트 메시지(DM·1:1 대화)에서만</strong> 음성·화상 통화를 걸 수 있어요. (채널에서는 불가, 모든 역할 공통)</p>
          <ol>
            <li>상대와의 <strong>DM 상단, 이름 옆 📞(음성)·📹(화상) 아이콘</strong> 클릭</li>
            <li>확인 다이얼로그에서 <strong>[통화 걸기]</strong> → 요청 발송</li>
            <li>상대는 <strong>수신 화면</strong>에서 <strong>수락/거절</strong>을 선택</li>
          </ol>
          <div class="callout callout--tip"><span class="callout__ico">💡</span><div>통화 후 DM에 '통화 시작/종료' 기록이 남고, 안 받으면 '부재중 통화'로 표시돼요. 수강생 개별 피드백·상담에 활용하세요.</div></div>
          <div class="shot">📸 스크린샷: DM 1:1 통화 (걸기 · 다이얼로그 · 수신)</div>` },
    ],
  },
  {
    id:"ch7", num:7, title:"수업 마무리", icon:"✅",
    sections:[
      { id:"i7-0", title:"마무리 체크리스트",
        html:`
          <ul>
            <li>☐ 강의 종료 (나가기 → 강의봇이 '강의 종료' 자동 게시)</li>
            <li>☐ <strong>녹화 저장 확인</strong>: [강의] &gt; 녹화 탭에서 '완료' 확인</li>
            <li>☐ 과제/공지 게시: <strong>공지 채널은 매니저 전용</strong> → 일반 채널 게시 또는 매니저에 요청</li>
            <li>☐ 질문 채널의 미답변 스레드 처리</li>
          </ul>` },
    ],
  },
  {
    id:"ch8", num:8, title:"트러블슈팅", icon:"🩹",
    sections:[
      { id:"i8-0", title:"증상별 대응표",
        html:`
          <div class="callout callout--tip"><span class="callout__ico">🌐</span><div><strong>1순위 점검</strong> — 화상·장치 문제는 먼저 <strong>PC Chrome 최신 버전</strong>인지 확인하세요. 아래 해법 대부분이 Chrome 기준입니다.</div></div>
          <table class="cf-table">
            <thead><tr><th>증상</th><th>즉시 해볼 것</th><th>그래도 안 되면</th></tr></thead>
            <tbody>
              <tr><td>내 마이크·카메라가 안 잡혀요</td><td>① Chrome 자물쇠 &gt; 카메라·마이크 [허용] ② 입장 화면 장치 드롭다운 재선택 ③ Zoom 등 종료</td><td>담당 매니저에게 연락</td></tr>
              <tr><td>강의가 안 열려요</td><td>[강의] 카드 &gt; [열기]가 보이는지 확인(강사·매니저만). 안 보이면 강사 등록 여부 확인</td><td>매니저에게 강사 부여 확인 요청</td></tr>
              <tr><td>화면 공유가 검은 화면</td><td>① 공유 중단 후 재선택 ② macOS 보안·개인정보 &gt; 화면 기록에서 브라우저 허용 ③ '전체 화면' 대신 '창'으로</td><td>담당 매니저에게 연락</td></tr>
              <tr><td>수업 중 튕겼어요</td><td>같은 [캠프파이어 입장하기] 경로로 재입장 → [강의] 카드 재참여 (토큰 만료 없음)</td><td>담당 매니저에게 연락</td></tr>
            </tbody>
          </table>
          <p>수업 중 장애 시 비상 연락: <strong>담당 매니저</strong> (연락 채널은 기수별 확인)</p>` },
    ],
  },
  {
    id:"ch9", num:9, title:"FAQ", icon:"❓",
    sections:[
      { id:"i9-0", title:"자주 묻는 질문",
        html:`
          <details class="faq"><summary>Q. 수강생 화면을 대신 봐줄 수 있나요? (원격 지원)</summary><div>원격 제어 기능은 제공하지 않습니다. 수강생이 화면을 공유하게 하고 강사가 보며 안내하는 방식을 권장합니다.</div></details>
          <details class="faq"><summary>Q. 소그룹(브레이크아웃)으로 나눌 수 있나요?</summary><div>전용 소그룹 기능은 현재 없습니다. 사이드바의 팀별 화상 채널로 나눠 들어가게 하고 강사가 순회하는 방식을 권장합니다(채널 생성은 매니저에 요청).</div></details>` },
    ],
  },
];
