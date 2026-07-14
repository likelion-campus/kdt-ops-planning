/* 캠프파이어 수강생 가이드 — 콘텐츠 데이터 (수정은 Notion 원문 → npm run sync) */

const GUIDE_META = {
  product: "캠프파이어",
  role: "수강생",
  emoji: "🎒",
  tagline: "첫날 10분 안에 입장 → 인사 → 수업 참여까지 끝내기.",
  audience: "멋쟁이사자처럼 부트캠프에 참여하는 모든 수강생",
  canView: ["수강생"], // 수강생은 본인 가이드만
};

const GUIDE_DATA = [
  {
    id:"ch1", num:1, title:"캠프파이어가 뭔가요?", icon:"👋",
    sections:[
      { id:"s1-0", title:"한 줄 소개 & 꼭 기억할 3가지",
        html:`
          <ul>
            <li><strong>한 줄 소개</strong>: 수업(화상)과 소통(채팅)을 한곳에서 하는 우리 과정의 공식 공간이에요.</li>
            <li><strong>디스코드 써봤다면?</strong> 화면 구성과 사용법이 거의 비슷해요. 왼쪽에 채널 목록, 가운데에 대화, 수업은 맨 위 [강의] 버튼으로 참여 — 이 정도만 알면 바로 적응됩니다.</li>
          </ul>
          <div class="callout callout--tip"><span class="callout__ico">💡</span><div><strong>꼭 기억해 주세요 3가지</strong><br>1. 📢 <strong>공지 채널 알림은 꼭 켜두기</strong> — 중요한 안내를 놓치지 않아요<br>2. 🎤 <strong>수업은 맨 위 [강의] 버튼</strong>으로 참여 (수업 시간에 [Live]로 바뀌어요)<br>3. ❓ <strong>질문은 질문 채널에서 스레드로</strong> — 답변이 깔끔하게 정리돼요</div></div>` },
    ],
  },
  {
    id:"ch2", num:2, title:"시작하기 (첫날 따라하기) ⭐", icon:"🚀",
    sections:[
      { id:"s2-1", title:"입장하기 (가장 먼저!)",
        html:`
          <div class="callout callout--info"><span class="callout__ico">🌐</span><div><strong>권장 브라우저 — PC Chrome 최신 버전</strong><br>화상 수업·화면 공유·녹화는 <strong>Chrome</strong>에 최적화돼 있어요. Safari·Edge나 <strong>카톡·슬랙 같은 인앱 브라우저로 링크를 열면</strong> 카메라·마이크·화면 공유가 막힐 수 있으니, 가능하면 <strong>PC에서 Chrome으로</strong> 접속하세요.</div></div>
          <div class="callout callout--tip"><span class="callout__ico">💡</span><div>캠프파이어는 <strong>따로 회원가입이 없어요.</strong> 멋쟁이사자처럼 홈페이지 계정 그대로 입장합니다.</div></div>
          <h4>기본 방법 — 내 강의실에서 입장</h4>
          <ol>
            <li>멋사 홈페이지 로그인 → <strong>내 강의실 &gt; 강의목록</strong></li>
            <li>듣고 있는 과정 카드에서 <strong>[캠프파이어 입장하기]</strong> 버튼 클릭</li>
            <li>자동으로 입장돼요!</li>
          </ol>
          <div class="callout callout--tip"><span class="callout__ico">💡</span><div><strong>처음 입장하면 비밀번호를 설정하는 화면이 나와요.</strong> 이 비밀번호로 앞으로 데스크톱 앱·PC·모바일 앱에서 로그인할 수 있어요 (모바일 앱도 출시됐어요!). 비밀번호는 꼭 기억해 주세요!</div></div>
          <h4>매니저님이 초대 링크를 준 경우</h4>
          <ul>
            <li>받은 링크를 클릭하면 바로 입장할 수 있어요.</li>
            <li>단, 링크에는 <strong>만료일</strong>이 있어요. 받으면 가능한 한 빨리 들어와 주세요!</li>
          </ul>
          <div class="callout callout--warn"><span class="callout__ico">⚠️</span><div><strong>입장 버튼이 안 보이거나 "입장이 안 돼요"</strong><br>→ 아직 과정에 등록이 안 됐을 수 있어요. 당황하지 말고 매니저님에게 문의해 주세요. (6장 참고)</div></div>
          <div class="shot">📸 스크린샷: 내 강의실 캠프파이어 입장하기 버튼</div>` },
      { id:"s2-2", title:"프로필 설정하기",
        html:`
          <ul>
            <li><strong>이름은 본명으로!</strong> (예: 홍길동) — 처음 입장하면 홈페이지 가입 이름으로 자동 설정돼요. 출석 확인과 소통을 위해 본명을 그대로 두는 걸 권장해요.</li>
            <li>프로필 사진은 자유롭게 설정할 수 있어요 (필수는 아니에요).</li>
          </ul>
          <div class="shot">📸 스크린샷: 프로필 설정 화면</div>` },
      { id:"s2-3", title:"더 편하게 쓰기 (앱 & 알림)",
        html:`
          <ul>
            <li><strong>앱 받기</strong>: 왼쪽 아래 프로필 → [캠프파이어 앱 받기]. 데스크톱 앱은 내 컴퓨터 OS를 자동 인식해 맞는 버튼을 보여줘요. 같은 계정으로 로그인하면 웹에서 쓰던 그대로예요.</li>
            <li><strong>PC</strong>: 앱이 없어도 <strong>Chrome 브라우저</strong>로 충분히 사용 가능 (Chrome 권장!).</li>
            <li><strong>모바일</strong>: 앱(iOS·Android)이 <strong>출시됐어요!</strong> [캠프파이어 앱 받기] 모달의 <strong>QR을 스캔하거나 눌러서 App Store·Google Play</strong>에서 설치하고, 같은 계정으로 로그인하면 돼요. (수업 참여는 화면이 큰 PC·Chrome을 권장!)</li>
            <li>📢 <strong>공지 채널 알림은 꼭 켜주세요!</strong> 일정 변경·과제 마감 등 중요한 안내를 놓치지 않으려면 필수예요.</li>
          </ul>
          <div class="shot">📸 스크린샷: 프로필 > 캠프파이어 앱 받기</div>` },
      { id:"s2-4", title:"알림 설정",
        html:`
          <p><strong>왼쪽 아래 프로필 → 프로필 설정 → 알림 탭</strong>에서 알림을 조정할 수 있어요.</p>
          <ul>
            <li><strong>기본은 '멘션만'</strong>으로 되어 있어요 — 나를 @멘션할 때만 알림이 와요. ('전체 메시지'로 켜거나 '끄기'도 가능)</li>
            <li><strong>채널별로 다르게</strong>: 사이드바에서 <strong>채널에 마우스를 올리면 생기는 케밥(⋮) 메뉴</strong>를 눌러 그 채널만 따로 설정할 수 있어요.</li>
          </ul>
          <div class="callout callout--tip"><span class="callout__ico">💡</span><div>📢 <strong>공지 채널은 '전체 메시지'로 켜두기!</strong> 일정·과제 안내를 놓치지 않아요.</div></div>
          <div class="shot">📸 스크린샷: 기본 알림 설정 (프로필 > 설정 > 알림 — 멘션만)</div>
          <div class="shot">📸 스크린샷: 채널별 알림 설정 (채널 케밥 메뉴)</div>` },
    ],
  },
  {
    id:"ch3", num:3, title:"화면 둘러보기", icon:"🖥️",
    sections:[
      { id:"s3-0", title:"화면 구성 & 주요 채널",
        html:`
          <ul>
            <li><strong>① 왼쪽 (채널 목록)</strong>: 수업/공지/수다 방이 나뉘어 있어요. 맨 위엔 수업에 들어가는 <strong>[강의]</strong> 버튼이 있어요.</li>
            <li><strong>② 가운데 (대화 내용)</strong>: 메시지를 읽고 쓰는 곳이에요.</li>
            <li><strong>③ 오른쪽 (사람들)</strong>: 지금 같이 있는 사람들이 역할(강사/매니저/수강생 등)별로 보여요.</li>
          </ul>
          <div class="shot">📸 스크린샷: 전체 화면 + ①~③ 번호 표시</div>
          <h4>우리 과정의 주요 채널</h4>
          <table class="cf-table">
            <thead><tr><th>채널</th><th>용도</th><th>누가 글 쓰나요?</th></tr></thead>
            <tbody>
              <tr><td>📢 공지</td><td>운영 공지</td><td>매니저만 (나는 읽기 전용)</td></tr>
              <tr><td>❓ 질문</td><td>수업 질문</td><td>누구나</td></tr>
              <tr><td>💬 자유수다</td><td>잡담</td><td>누구나</td></tr>
              <tr><td>🎤 화상 채널</td><td>팀별 회의·소그룹</td><td>채널 들어가면 화상 참여</td></tr>
            </tbody>
          </table>
          <div class="callout callout--tip"><span class="callout__ico">💡</span><div>채널 구성은 과정마다 조금씩 달라요. 맨 위 [강의] 버튼은 <strong>강사님이 여는 정식 수업</strong>, 🎤 화상 채널은 <strong>팀별 모임</strong>용이에요.</div></div>` },
    ],
  },
  {
    id:"ch4", num:4, title:"채팅 사용하기", icon:"💬",
    sections:[
      { id:"s4-1", title:"기본",
        html:`
          <ul>
            <li>메시지 보내기 / 수정 / 삭제 (내가 쓴 메시지에 마우스를 올리면 메뉴가 떠요)</li>
            <li><strong>@멘션</strong>으로 부르기 — <strong>@ 하나</strong>로 특정 사람·그룹·역할을 모두 부를 수 있어요 (예: @홍길동, @1team). <strong>@everyone(전체 알림)은 꼭 필요할 때만!</strong></li>
            <li>이모지 리액션 달기 👍 (강사님이 "이해했으면 ✅ 눌러주세요" 할 때 사용)</li>
            <li><strong>불편한 사람은 차단·신고할 수 있어요</strong>: 메시지·멤버 목록의 ⋮(케밥) &gt; 차단/신고. 차단은 그 사람 메시지가 내게 안 보이게 하고, 신고는 사유를 골라 제출하면 매니저님이 확인해요.</li>
            <li>🕶️ <strong>익명 채널</strong>: 일부 채널은 '익명 채널'로 운영될 수 있어요. 글을 쓰면 이름 대신 <strong>익명1·익명2…</strong>로 표시되고 멤버 목록·멘션은 꺼져요.</li>
          </ul>` },
      { id:"s4-2", title:"스레드 — 질문할 때 이렇게!",
        html:`
          <div class="callout callout--tip"><span class="callout__ico">💡</span><div>질문 채널에서는 <strong>새 질문 = 새 메시지</strong>, <strong>답변·추가 논의 = 스레드 안에서</strong> 하는 게 규칙이에요. 그래야 질문과 답이 한 묶음으로 정리돼 나중에 찾아보기 좋아요.</div></div>
          <ul><li>메시지에 마우스를 올리면 나타나는 <strong>스레드(💬) 아이콘</strong>을 클릭하면 오른쪽에 스레드가 열려요.</li></ul>
          <div class="shot">📸 스크린샷: 스레드 열기 버튼</div>` },
      { id:"s4-3", title:"파일 & 코드 올리기",
        html:`
          <ul>
            <li>파일은 입력창의 <strong>📎(클립) 버튼</strong>으로 첨부해요. (용량 제한은 과정 안내 참고)</li>
            <li><strong>코드는 코드 블록으로!</strong> 백틱 3개로 코드를 감싸면 코드 블록으로 보여요. 단, 언어별 색상 강조는 아직 지원되지 않아 <strong>단색</strong>으로 표시돼요(읽는 데는 문제없어요).</li>
          </ul>
          <div class="shot">📸 스크린샷: 파일 업로드</div>` },
      { id:"s4-4", title:"1:1 통화 (DM 음성·화상)",
        html:`
          <p><strong>다이렉트 메시지(DM·1:1 대화)에서만</strong> 음성·화상 통화를 걸 수 있어요. (채널에서는 안 돼요)</p>
          <ol>
            <li>대화 상대와의 <strong>DM 화면 상단, 이름 옆 📞(음성)·📹(화상) 아이콘</strong>을 눌러요</li>
            <li>확인 창에서 <strong>[통화 걸기]</strong>를 누르면 상대에게 요청이 가요</li>
            <li>상대 화면에 <strong>수신 화면</strong>이 떠요 — <strong>초록(수락)/빨강(거절)</strong>으로 받거나 거절해요</li>
          </ol>
          <div class="callout callout--tip"><span class="callout__ico">💡</span><div>통화가 끝나면 DM에 '통화 시작/종료' 기록이 남아요. 못 받으면 '부재중 통화'로 표시돼요.</div></div>
          <div class="shot">📸 스크린샷: DM 1:1 통화 (걸기 · 다이얼로그 · 수신)</div>` },
    ],
  },
  {
    id:"ch5", num:5, title:"화상 수업 참여하기 ⭐", icon:"🎥",
    sections:[
      { id:"s5-1", title:"수업 입장",
        html:`
          <ol>
            <li>수업 시간이 되면 강사님이 강의를 열어요. 사이드바 맨 위 <strong>[강의]</strong> 버튼이 <strong>[Live]</strong>로 바뀌면 클릭해서 참여하세요!</li>
            <li>입장하면 <strong>마이크는 꺼진 상태, 카메라는 켜진 상태</strong>로 시작해요. 발언할 때 하단 🎤 버튼으로 마이크를 켜면 됩니다. (카메라는 출석 확인에 쓰이니 수업 중에는 끄지 마세요)</li>
          </ol>
          <div class="callout callout--tip"><span class="callout__ico">💡</span><div>강사님이 <strong>수강생 호출</strong>을 보내면 알림이 와요. "아직 안 들어왔어요~" 신호이니 [강의] 버튼으로 들어와 주세요.</div></div>
          <div class="shot">📸 스크린샷: [강의] 버튼(Live) + 입장 직후 마이크/카메라 버튼</div>` },
      { id:"s5-4", title:"강의 초대 받고 입장하기",
        html:`
          <p>수업이 시작되면 강사·매니저가 <strong>'강의 초대'</strong>를 보낼 수 있어요. 아직 강의실에 안 들어왔다면 알림이 와요.</p>
          <ul>
            <li><strong>'강의 초대' 알림</strong>의 <strong>[입장하기]</strong> 버튼을 누르면 — <strong>바로 강의실로 이동</strong>해요! (채널을 따로 찾을 필요 없어요)</li>
            <li>"수업이 곧 시작됩니다. 강의실로 들어와 주세요!" 같은 안내와 함께 와요.</li>
          </ul>
          <div class="callout callout--tip"><span class="callout__ico">💡</span><div>알림을 놓쳤다면? 걱정 마세요 — 사이드바 맨 위 <strong>[강의 / Live]</strong> 버튼으로도 언제든 입장할 수 있어요.</div></div>
          <div class="shot">📸 스크린샷: 강의 초대 알림 (입장하기 버튼)</div>` },
      { id:"s5-2", title:"수업 중 기능 (화면 아래 버튼들)",
        html:`
          <ul>
            <li>🎤 <strong>음소거 / 📹 카메라</strong>: 발언할 때만 마이크를 켜요</li>
            <li>✋ <strong>손 들기</strong>: 질문·발언하고 싶을 때 (강사님이 보고 시켜줘요)</li>
            <li>😀 <strong>리액션</strong>: 이모지로 빠르게 반응</li>
            <li>🙋 <strong>이해 확인 응답</strong>: '이해되시나요?' 팝업에 👍 이해 / 🤔 어려움 중 솔직하게 — 강사님이 속도를 조절해요</li>
            <li>💬 <strong>채팅</strong>: 화상 중에도 채팅으로 질문 가능</li>
            <li>🖥️ <strong>화면 공유</strong>: 발표·코드 리뷰 차례일 때 내 화면 공유 (강사 안내에 따라)</li>
            <li>🚪 <strong>퇴장</strong>: 수업이 끝나면 나가기</li>
          </ul>
          <div class="shot">📸 스크린샷: 이해도 체크 (강사 진행 / 수강생 응답)</div>
          <div class="callout callout--tip"><span class="callout__ico">💡</span><div><strong>발표 차례인데 어떻게 하나요?</strong> 따로 '발표자 지정'은 없어요. 강사님이 "OO님 마이크 켜고 말씀하세요"라고 하면 하단 🎤 버튼으로 음소거를 풀고 말하면 됩니다.</div></div>` },
      { id:"s5-3", title:"수업 에티켓",
        html:`
          <ul>
            <li>🔇 <strong>발언할 때만 음소거 해제</strong> (다 같이 켜두면 소리가 겹쳐요)</li>
            <li>📸 <strong>출석은 카메라 화면 자동 캡처로 확인돼요</strong>: 수업 시간대에 약 <strong>10분마다 카메라 화면이 캡처</strong>돼 출석으로 기록돼요. 카메라가 꺼져 있으면 '스킵'으로 남아 출석 누락이 될 수 있으니 <strong>과정 규칙에 따라 카메라를 켜 두세요.</strong></li>
            <li>질문은 손들기 ✋ 또는 채팅 💬을 활용해요</li>
          </ul>` },
      { id:"s5-5", title:"조퇴·외출할 때 (QR 스스로 받기)",
        html:`
          <p>이제 <strong>조퇴·외출</strong>이 필요할 때 매니저·강사님께 매번 QR을 요청하지 않아도 돼요. 사이드바의 <strong>QR 확인 채널</strong>에서 <strong>본인 얼굴만 인증하면 QR 코드를 직접 받을 수 있어요!</strong></p>
          <ol>
            <li>사이드바에서 <strong>QR 확인 채널</strong>에 들어가요.</li>
            <li><strong>카메라로 본인 얼굴을 인증</strong>해요 — 얼굴이 정상적으로 인식돼야 다음 단계로 넘어가요.</li>
            <li><strong>사유(조퇴·외출 등)를 입력</strong>해요.</li>
            <li><strong>[QR 확인하기]</strong>를 눌러 <strong>내 QR 코드를 발급</strong>받아요.</li>
          </ol>
          <div class="callout callout--warn"><span class="callout__ico">⚠️</span><div><strong>얼굴 인식이 안 되면 [QR 확인하기] 버튼이 눌리지 않아요.</strong> 밝은 곳에서 얼굴이 화면에 잘 보이도록 한 뒤 다시 시도하고, 계속 안 되면 매니저·강사님께 문의해 주세요.</div></div>
          <div class="callout callout--tip"><span class="callout__ico">💡</span><div>QR을 언제 받았는지(얼굴·시간)는 매니저님이 확인할 수 있어요. 본인 확인용이니 <strong>꼭 본인이</strong> 인증해 주세요.</div></div>
          <div class="shot">📸 스크린샷: QR 확인 채널 — 얼굴 인증 + [QR 확인하기]</div>` },
    ],
  },
  {
    id:"ch6", num:6, title:"문제가 생겼어요 (혼자 해결해보기)", icon:"🩹",
    sections:[
      { id:"s6-0", title:"증상별 해결",
        html:`
          <div class="callout callout--tip"><span class="callout__ico">🌐</span><div><strong>가장 먼저!</strong> 화상·소리·입장 문제 대부분은 브라우저 때문이에요. <strong>PC Chrome 최신 버전</strong>인지부터 확인하세요. (인앱 브라우저로 열었다면 Chrome으로 다시 접속!)</div></div>
          <details class="faq"><summary>📷 카메라가 안 켜져요</summary><div><strong>웹(브라우저)에서 카메라가 안 켜지는 흔한 이유예요:</strong><br>1. <strong>브라우저 권한 차단</strong> — Chrome 주소창 왼쪽 자물쇠 🔒 &gt; 사이트 권한에서 카메라 [허용] 확인<br>2. <strong>다른 앱이 카메라 사용 중</strong> — Zoom·Teams 등 카메라 쓰는 프로그램을 모두 종료 (카메라는 한 번에 한 곳만 쓸 수 있어요)<br>3. <strong>잘못된 장치 선택</strong> — 강의 하단 📹 버튼 옆 화살표에서 올바른 카메라 선택<br>4. <strong>노트북 카메라 가림</strong> — 카메라 커버(프라이버시 셔터)나 물리 스위치가 꺼져 있는지 확인<br>5. <strong>웹과 데스크톱 앱에서 동시에 켰을 때 (Windows)</strong> — 카메라는 <strong>한 번에 한 곳에서만</strong> 켜져요. 캠프파이어를 웹과 앱에서 둘 다 열어두면 한쪽에서만 카메라가 잡혀요. <strong>쓸 곳 한 곳만 남기고</strong> 다른 쪽은 창을 닫거나 카메라를 꺼주세요. (이미 다른 화면에서 켜져 있진 않은지 확인!)<br><br><strong>외장(USB) 카메라를 쓴다면?</strong><br>1. USB 카메라는 보통 꽂으면 자동 인식돼요. 안 잡히면 <strong>다른 USB 포트</strong>에 다시 꽂아보세요.<br>2. 그래도 안 되면 <strong>제조사 드라이버 설치</strong>가 필요해요 — 카메라 <strong>모델명으로 검색</strong>해 공식 드라이버를 받아 설치하세요.<br>3. (Windows) <strong>장치 관리자 &gt; 카메라</strong>에 모델이 보이는지 확인 (이름 옆 ⚠️ 표시면 드라이버 문제)<br>4. 드라이버 설치·재연결 후엔 <strong>브라우저를 새로고침</strong>하고 장치 목록에서 다시 선택해요.</div></details>
          <details class="faq"><summary>🎤 제 마이크가 안 돼요</summary><div>1. Chrome 주소창 왼쪽 자물쇠 &gt; 사이트 권한에서 마이크 [허용] 확인<br>2. 강의 하단 🎤 버튼 옆 화살표에서 올바른 마이크 선택 확인<br>3. Zoom 등 마이크를 쓰는 다른 프로그램 종료</div></details>
          <details class="faq"><summary>🚪 입장이 안 돼요 / 채널이 안 보여요</summary><div>1. 내 강의실 &gt; [캠프파이어 입장하기]로 다시 들어와 보세요<br>2. 입장 버튼 자체가 안 보이면 아직 과정 등록이 안 된 것일 수 있어요 → 매니저님에게 문의<br>3. 특정 채널만 안 보이는 건 정상이에요 (비공개 채널은 초대받은 사람만 보여요)</div></details>
          <details class="faq"><summary>📵 자꾸 튕겨요</summary><div>1. 인터넷 연결 확인, 가능하면 유선 인터넷 사용<br>2. 같은 방법(내 강의실 &gt; 입장하기)으로 다시 들어오면 돼요 — 로그인이 풀리지 않아요<br>3. 브라우저 새로고침 또는 데스크톱 앱 사용</div></details>
          <div class="callout callout--warn"><span class="callout__ico">🆘</span><div><strong>그래도 안 되면?</strong> 혼자 끙끙대지 말고 바로 도움을 요청하세요! → 도움요청 채널에 남기거나 매니저님에게 DM (구체적인 채널은 과정 안내 참고)</div></div>` },
    ],
  },
  {
    id:"ch7", num:7, title:"FAQ", icon:"❓",
    sections:[
      { id:"s7-0", title:"자주 묻는 질문",
        html:`
          <details class="faq"><summary>Q. 지난 수업 녹화는 어디서 보나요?</summary><div>수업(정식 강의)은 별도 설정 없이 자동으로 녹화돼요. 녹화 영상을 보는 방법은 과정마다 다를 수 있으니(공유 링크, 별도 안내 등) 매니저님·강사님의 안내를 따라주세요.</div></details>
          <details class="faq"><summary>Q. 닉네임을 바꾸고 싶어요</summary><div>프로필에서 표시 이름을 바꿀 수 있어요. 다만 출석 확인·소통에 혼선이 생길 수 있으니 되도록 본명을 유지해 주세요.</div></details>
          <details class="faq"><summary>Q. 모바일로도 수업을 들을 수 있나요?</summary><div>모바일 앱(iOS·Android)이 출시됐어요! [캠프파이어 앱 받기] 모달의 QR로 App Store·Google Play에서 설치하고, 최초 입장 시 설정한 비밀번호(같은 계정)로 로그인하면 돼요. 다만 수업 참여는 화면이 큰 PC(Chrome 권장)를 추천해요.</div></details>` },
    ],
  },
];
