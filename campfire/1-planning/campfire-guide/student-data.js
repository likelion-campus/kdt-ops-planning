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
            <li><strong>디스코드 써봤다면?</strong> 화면 구성과 사용법이 거의 비슷해요. 왼쪽에 채널 목록, 가운데에 대화, 수업은 맨 위 <strong>[강의] 카드</strong>로 참여 — 이 정도만 알면 바로 적응됩니다.</li>
          </ul>
          <div class="callout callout--tip"><span class="callout__ico">💡</span><div><strong>꼭 기억해 주세요 3가지</strong><br>1. 📢 <strong>공지 채널 알림은 '전체 메시지'로 켜두기</strong> — 중요한 안내를 놓치지 않아요<br>2. 🎤 <strong>수업은 맨 위 [강의] 카드</strong>로 참여 (수업이 열리면 빨간 <strong>● LIVE</strong> 뱃지가 붙어요)<br>3. ❓ <strong>질문은 질문 채널에서 스레드로</strong> — 답변이 깔끔하게 정리돼요</div></div>` },
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
          <div class="callout callout--tip"><span class="callout__ico">💡</span><div><strong>처음 입장하면 비밀번호를 설정하는 화면이 나와요.</strong> 이 비밀번호로 앞으로 데스크톱 앱·PC·모바일 앱에서 로그인할 수 있어요 (모바일 앱도 <strong>베타</strong>로 나왔어요!). 비밀번호는 꼭 기억해 주세요!<br>나중에 바꾸고 싶으면 <strong>프로필 → 프로필 설정 → 계정 탭 → [비밀번호 변경]</strong>에서 변경할 수 있어요.</div></div>
          <h4>매니저님이 초대 링크를 준 경우</h4>
          <ul>
            <li>받은 링크를 클릭하면 바로 입장할 수 있어요.</li>
            <li>단, 링크에는 <strong>만료일</strong>이 있어요. 받으면 가능한 한 빨리 들어와 주세요!</li>
          </ul>
          <div class="callout callout--warn"><span class="callout__ico">⚠️</span><div><strong>입장 버튼이 안 보이거나 "입장이 안 돼요"</strong><br>→ 아직 과정에 등록이 안 됐을 수 있어요. 당황하지 말고 매니저님에게 문의해 주세요. (6장 참고)</div></div>
          <div class="shot">📸 스크린샷: 내 강의실 캠프파이어 입장하기 버튼</div>` },
      { id:"s2-2", title:"프로필 설정하기",
        html:`
          <p>왼쪽 아래 <strong>내 프로필 → [프로필 설정]</strong>에서 바꿀 수 있어요. 탭은 <strong>일반 · 알림 · 계정</strong> 3개예요.</p>
          <h4>일반 탭</h4>
          <ul>
            <li><strong>표시 이름은 본명으로!</strong> (예: 홍길동) — 처음 입장하면 홈페이지 가입 이름으로 자동 설정돼요. 출석 확인과 소통을 위해 본명을 그대로 두는 걸 권장해요.</li>
            <li>프로필 사진(아바타)은 자유롭게 설정할 수 있어요 (필수는 아니에요). [아바타 제거]로 되돌릴 수도 있어요.</li>
            <li><strong>테마</strong>: 라이트 / 다크 / 시스템 중에 고를 수 있어요.</li>
            <li><strong>언어</strong>: 한국어 / English</li>
            <li>왼쪽 아래 <strong>[튜토리얼 다시 보기]</strong>로 첫 입장 때 봤던 안내를 다시 볼 수 있어요.</li>
          </ul>
          <h4>계정 탭</h4>
          <ul>
            <li><strong>비밀번호 변경</strong> — 앱·웹 로그인에 쓰는 비밀번호를 바꿔요.</li>
            <li><strong>차단한 사용자</strong> — 내가 차단한 사람 목록이 여기 모여요. <strong>차단 해제도 여기서</strong> 합니다.</li>
          </ul>
          <div class="callout callout--tip"><span class="callout__ico">💡</span><div>프로필 카드에는 내가 속한 <strong>소속 그룹</strong>(예: 1조)과 <strong>역할</strong>(수강생)이 함께 표시돼요. 그룹은 매니저님이 편성하는 거라 직접 바꿀 수 없어요.</div></div>
          <div class="shot">📸 스크린샷: 프로필 설정 화면 (일반 탭 — 표시 이름·테마·언어)</div>` },
      { id:"s2-3", title:"더 편하게 쓰기 (앱 & 알림)",
        html:`
          <ul>
            <li><strong>앱 받기</strong>: 왼쪽 아래 프로필 → [캠프파이어 앱 받기]. 데스크톱 앱은 내 컴퓨터 OS를 자동 인식해 맞는 버튼을 보여줘요. 같은 계정으로 로그인하면 웹에서 쓰던 그대로예요.</li>
            <li><strong>PC</strong>: 앱이 없어도 <strong>Chrome 브라우저</strong>로 충분히 사용 가능 (Chrome 권장!).</li>
            <li><strong>모바일</strong>: 앱(iOS·Android)이 <strong>베타</strong>로 나왔어요! [캠프파이어 앱 받기] 모달의 <strong>QR을 스캔하거나 눌러서 App Store·Google Play</strong>에서 설치하고, 같은 계정으로 로그인하면 돼요. (수업 참여는 화면이 큰 PC·Chrome을 권장!)</li>
            <li>📢 <strong>공지 채널 알림은 꼭 켜주세요!</strong> 일정 변경·과제 마감 등 중요한 안내를 놓치지 않으려면 필수예요. (방법은 바로 아래 2-4)</li>
          </ul>
          <div class="shot">📸 스크린샷: 프로필 > 캠프파이어 앱 받기</div>` },
      { id:"s2-4", title:"알림 설정",
        html:`
          <p>알림은 <strong>3단계</strong>로 되어 있어요. 아래로 갈수록 우선순위가 높아요.</p>
          <h4>① 전체 기본값 — 프로필 설정 &gt; 알림 탭</h4>
          <p>왼쪽 아래 <strong>프로필 → 프로필 설정 → 알림 탭</strong></p>
          <ul>
            <li>선택지는 <strong>'멘션만' / '끄기' 두 가지</strong>예요. 기본값은 <strong>멘션만</strong> — 나를 @멘션할 때만 알림이 와요.</li>
            <li>여기엔 '전체 메시지'가 없어요. <strong>모든 메시지 알림은 채널별로 켜는 방식</strong>이에요(아래 ③).</li>
          </ul>
          <h4>② 클래스별 알림 — 같은 화면 아래쪽</h4>
          <ul>
            <li>참여 중인 클래스마다 <strong>기본값 / 멘션만 / 끄기</strong>를 따로 정할 수 있어요.</li>
            <li><strong>'끄기'로 하면 그 클래스의 멘션·푸시는 물론 강의 호출 알림까지 조용해져요.</strong> 수업 중인 과정은 끄지 마세요!</li>
          </ul>
          <h4>③ 채널별 알림 — 두 가지 경로</h4>
          <ul>
            <li><strong>채널 오른쪽 위 🔔 (알림 설정) 버튼</strong> ← 가장 빠른 방법</li>
            <li>또는 <strong>사이드바에서 채널에 마우스를 올리면 생기는 케밥(⋮) 메뉴</strong></li>
            <li>둘 다 같은 메뉴가 열려요: <strong>기본값 따름 / 전체 메시지 / 멘션만 / 알림 끄기</strong></li>
            <li>케밥 메뉴에서는 <strong>즐겨찾기 등록</strong>, <strong>숨기기</strong>도 할 수 있어요.</li>
          </ul>
          <div class="callout callout--tip"><span class="callout__ico">💡</span><div>📢 <strong>공지 채널은 🔔 버튼 → '전체 메시지'로 켜두기!</strong> 일정·과제 안내를 놓치지 않아요.</div></div>
          <div class="shot">📸 스크린샷: 기본 알림 설정 (프로필 &gt; 프로필 설정 &gt; 알림 — 멘션만 + 클래스별 알림)</div>
          <div class="shot">📸 스크린샷: 채널별 알림 설정 (채널 상단 🔔 / 케밥 메뉴)</div>` },
    ],
  },
  {
    id:"ch3", num:3, title:"화면 둘러보기", icon:"🖥️",
    sections:[
      { id:"s3-0", title:"화면 구성 & 주요 채널",
        html:`
          <ul>
            <li><strong>① 왼쪽 (채널 목록)</strong>: 수업/공지/수다 방이 카테고리별로 나뉘어 있어요. 맨 위엔 수업에 들어가는 <strong>[강의] 카드</strong>가 있어요.</li>
            <li><strong>② 가운데 (대화 내용)</strong>: 메시지를 읽고 쓰는 곳이에요. 맨 아래 입력창엔 📎 파일 첨부 · 😀 이모지 · 📊 투표 만들기 버튼이 있어요.</li>
            <li><strong>③ 오른쪽 위 아이콘</strong>: 왼쪽부터 <strong>⭐ 즐겨찾기 · 🔍 검색(⌘K) · @ 내 활동 · 📄 파일 · 🔔 알림 설정 · 📌 고정된 메시지 · 👥 멤버 목록</strong> 이에요.</li>
            <li><strong>④ 멤버 목록</strong>: 👥를 누르면 오른쪽에 열려요. 역할(강사/보조강사/매니저/멘토/수강생)별로 묶여 보이고, 각 사람 옆에 <strong>카메라 켜짐 표시와 현재 위치(🖥️ 강의실)</strong>가 나와요.</li>
            <li><strong>⑤ 내 프로필 (왼쪽 맨 아래)</strong>: 상태 변경 · 캠프파이어 앱 받기 · 사용 가이드 · 프로필 설정 · 로그아웃</li>
          </ul>
          <div class="callout callout--tip"><span class="callout__ico">💡</span><div><strong>@ 내 활동</strong>은 예전 '멘션 모아보기'가 더 커진 거예요. <strong>전체 / DM / 멘션 / 스레드 / 초대</strong> 탭으로 나뉘고, <strong>'읽지 않은 항목'</strong>만 모아 볼 수도 있어요. 놓친 멘션 찾을 때 여기부터 보세요!</div></div>
          <div class="shot">📸 스크린샷: 전체 화면 + ①~⑤ 번호 표시</div>
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
      { id:"s3-1", title:"채널 파일 모아보기",
        html:`
          <p>채널 <strong>맨 위 오른쪽 파일 버튼(📁)</strong>을 누르면, 그 채널에 올라온 <strong>파일을 한 곳에서 모아보고 다운로드</strong>할 수 있어요.</p>
          <ol>
            <li>채널 <strong>오른쪽 위 파일 버튼</strong>을 눌러요.</li>
            <li>오른쪽에 <strong>[파일] 목록</strong>이 열려요.</li>
            <li><strong>파일명으로 검색</strong>하고, <strong>다운로드(⬇)</strong>로 저장하면 돼요.</li>
          </ol>
          <div class="callout callout--tip"><span class="callout__ico">💡</span><div>강의 자료·과제 파일이 채팅에 묻혔을 때, 파일 버튼으로 한 번에 찾을 수 있어요!</div></div>
          <div class="shot">📸 스크린샷: 상단 파일 버튼 → 채널 파일 목록·검색·다운로드</div>` },
    ],
  },
  {
    id:"ch4", num:4, title:"채팅 사용하기", icon:"💬",
    sections:[
      { id:"s4-1", title:"기본",
        html:`
          <ul>
            <li>메시지 보내기 / 수정 / 삭제 (메시지에 마우스를 올리면 <strong>반응 추가 · 답장 · 스레드 · 더보기(⋯)</strong> 버튼이 떠요)</li>
            <li><strong>@멘션</strong>으로 부르기 — <strong>@ 하나</strong>로 특정 사람·그룹·역할을 모두 부를 수 있어요 (예: @홍길동, @1team). <strong>@everyone(전체 알림)은 꼭 필요할 때만!</strong></li>
            <li><strong>#채널 링크</strong> — <strong>#</strong>를 치면 다른 채널을 링크로 걸 수 있어요 (예: "설문은 #주간설문조사 에서요").</li>
            <li>이모지 리액션 달기 👍 (강사님이 "이해했으면 ✅ 눌러주세요" 할 때 사용). 과정마다 <strong>커스텀 이모지</strong>가 등록돼 있기도 해요.</li>
            <li><strong>답장 vs 스레드</strong> — <strong>답장</strong>은 같은 채널에 인용해서 바로 달고, <strong>스레드</strong>는 오른쪽에 별도 패널로 대화를 모아요. 질문 채널에선 <strong>스레드</strong>를 써주세요 (4-2).</li>
            <li><strong>불편한 사람은 차단·신고할 수 있어요</strong>: 메시지 더보기(⋯) 또는 멤버 목록의 ⋮(케밥) &gt; <strong>이 사용자 차단 / 신고</strong>. 차단은 그 사람 메시지가 내게 안 보이게 하고, 신고는 사유를 골라 제출하면 매니저님이 확인해요. <strong>차단 해제는 프로필 설정 &gt; 계정 &gt; 차단한 사용자</strong>에서 합니다.</li>
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
      { id:"s4-5", title:"투표",
        html:`
          <p>메시지 입력창 오른쪽 <strong>📊 [투표 만들기]</strong> 버튼으로 간단한 투표를 올릴 수 있어요. 매니저님·강사님이 올린 투표는 메시지 안에서 바로 선택하면 돼요.</p>
          <ul>
            <li><strong>만드는 법</strong>: 질문 + 선택지(버튼으로 추가) → <strong>익명 / 기명</strong> 선택 → <strong>투표 기간</strong>(1시간 · 6시간 · 1일 · 1주 · 무기한) 선택</li>
            <li><strong>익명</strong>은 누가 무엇에 투표했는지 숨기고, <strong>기명</strong>은 모두에게 공개돼요.</li>
            <li>기간이 끝나면 메시지에 <strong>'종료됨 · 총 N표'</strong>로 표시돼요.</li>
          </ul>
          <div class="callout callout--tip"><span class="callout__ico">💡</span><div>OS 조사, 간식 다협, 스터디 짜기 같은 간단한 의견 수렴에 써보세요.</div></div>
          <div class="shot">📸 스크린샷: 투표 만들기 모달 (익명/기명 · 투표 기간)</div>` },
    ],
  },
  {
    id:"ch5", num:5, title:"화상 수업 참여하기 ⭐", icon:"🎥",
    sections:[
      { id:"s5-1", title:"수업 입장",
        html:`
          <ol>
            <li>수업 시간이 되면 강사님이 강의를 열어요. 사이드바 맨 위 <strong>[강의] 카드</strong>에 빨간 <strong>● LIVE</strong> 뱃지가 붙으면 클릭해서 참여하세요! (아직 안 열렸을 땐 '강의 열기'로 보이고, 수강생은 누를 수 없어요)</li>
            <li>클릭하면 <strong>“강의 세션에 참여하시겠습니까?”</strong> 화면이 떠요. 미리보기로 내 모습을 확인하고, <strong>입장 후 사용할 장치</strong>에서 카메라·마이크를 골라둘 수 있어요.</li>
            <li>[강의 참여]를 누르면 화면 안내 그대로 <strong>카메라는 켜진 상태, 마이크는 꺼진 상태</strong>로 입장해요.</li>
            <li>📹 <strong>카메라는 그대로 켜 두세요.</strong> 카메라 화면이 출석 확인에 쓰여요 — 끄면 '스킵'으로 남을 수 있어요. (5-4 참고)</li>
            <li>🎤 발언할 때만 하단 마이크 버튼으로 음소거를 풀면 됩니다.</li>
          </ol>
          <div class="callout callout--tip"><span class="callout__ico">💡</span><div>강사·매니저님이 <strong>강의 호출</strong>을 보내면 알림이 와요. "아직 안 들어왔어요~" 신호이니 [강의] 카드로 들어와 주세요.</div></div>
          <div class="shot">📸 스크린샷: [강의] 카드(● LIVE) + 강의 세션 참여 화면</div>` },
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
            <li>🎤 <strong>마이크 / 📹 카메라</strong>: 발언할 때만 마이크를 켜요. 각 버튼 오른쪽 <strong>∨(화살표)</strong>를 누르면 쓸 장치를 고를 수 있어요.</li>
            <li>🖥️ <strong>화면 공유</strong>: 발표·코드 리뷰 차례일 때 내 화면 공유 (강사 안내에 따라)</li>
            <li>😀 <strong>리액션</strong>: 이모지로 빠르게 반응</li>
            <li>✋ <strong>손 들기</strong>: 질문·발언하고 싶을 때 (강사님이 보고 시켜줘요)</li>
            <li>👍 <strong>이해 확인</strong>: 강사님이 '이해도 체크'를 시작하면 <strong>👍 이해 / 🤔 어려움</strong> 중에 솔직하게 눌러주세요 — 강사님이 속도를 조절해요</li>
            <li>💬 <strong>채팅</strong>: 강의 오른쪽에 <strong>강의 채팅</strong> 패널이 열려요. 화상 중에도 여기서 질문할 수 있어요.</li>
            <li>⋯ <strong>더보기</strong>: 화면 배치(그리드 보기 · 조감 모드)와 <strong>설정</strong>(카메라 · 배경 효과 · 마이크 · 스피커)이 여기 있어요.</li>
            <li>📞 <strong>퇴장</strong>(빨간 버튼): 수업이 끝나면 나가기</li>
          </ul>
          <h4>배경 효과 — 방 보이는 게 신경 쓰일 때</h4>
          <ul>
            <li><strong>⋯ 더보기 &gt; 설정 &gt; 배경 효과</strong></li>
            <li><strong>약한 블러 · 강한 블러</strong> 또는 <strong>캠프파이어 · 오피스 블루 · 숲 · 선셋 · 한밤중</strong> 배경 중 선택 (직접 이미지 추가도 가능)</li>
            <li>카메라를 켜면 바로 반영돼요. <strong>카메라를 끄는 대신 배경을 가리면 출석에도 문제가 없어요!</strong></li>
          </ul>
          <div class="callout callout--tip"><span class="callout__ico">💻</span><div><strong>노트북이 느려지거나 팬이 심하게 돌면</strong> — 강의 안 <strong>⋯ 더보기 &gt; 설정 &gt; 카메라 &gt; 저사양 모드</strong>를 켜보세요.<br>다른 사람 영상을 저화질로 받아 기기 부하를 줄여줘요. <strong>화면 공유와 소리는 원래 품질 그대로</strong>라 수업 듣는 데 지장 없어요.<br>✅ <strong>내 카메라가 남에게 흐리게 보이는 게 아니에요.</strong> 내가 <em>받는</em> 영상만 저화질이 되는 개인 설정이라 <strong>출석 캡쳐에도 영향이 없어요.</strong></div></div>
          <div class="shot">📸 스크린샷: 이해도 체크 (강사 진행 / 수강생 응답)</div>
          <div class="shot">📸 스크린샷: 강의 하단 컨트롤바 + 더보기 &gt; 설정 &gt; 배경 효과</div>
          <div class="shot">📸 스크린샷: 더보기 &gt; 설정 &gt; 카메라 &gt; 저사양 모드</div>
          <div class="callout callout--tip"><span class="callout__ico">💡</span><div><strong>발표 차례인데 어떻게 하나요?</strong> 따로 '발표자 지정'은 없어요. 강사님이 "OO님 마이크 켜고 말씀하세요"라고 하면 하단 🎤 버튼으로 음소거를 풀고 말하면 됩니다.</div></div>` },
      { id:"s5-3", title:"수업 에티켓",
        html:`
          <ul>
            <li>📹 <strong>카메라는 켜 둔 채로</strong> — 입장할 때 카메라는 자동으로 켜져요. 출석 확인에 쓰이니 수업 중에는 끄지 마세요. 배경이 신경 쓰이면 카메라를 끄는 대신 <strong>배경 효과</strong>를 쓰세요(5-3).</li>
            <li>🔇 <strong>발언할 때만 음소거 해제</strong> (다 같이 켜두면 소리가 겹쳐요)</li>
            <li>📸 <strong>출석은 카메라 화면 자동 캡쳐로 확인돼요</strong>: 수업 시간대에 <strong>10분마다(정각 기준) 카메라 화면이 캡쳐</strong>돼 출석으로 기록돼요. 카메라가 꺼져 있으면 '스킵', 앱이 꺼져 있거나 응답이 없으면 '무응답'으로 남아 출석 누락이 될 수 있으니 <strong>수업 중에는 카메라를 켜 두세요.</strong></li>
            <li>🟢 <strong>화면 오른쪽 '내 카메라' 창</strong>을 봐주세요. 지금 내 카메라가 어떻게 찍히고 있는지 보여주고, 얼굴이 인식되면 <strong>초록색 박스와 인식률(%)</strong>이 떠요. 박스가 안 보이면 자리를 조금 조정해 주세요. (창은 드래그로 옮기거나 최소화할 수 있어요)</li>
            <li>🙈 얼굴이 <strong>10초 이상 보이지 않으면 화면이 자동으로 흐려질</strong> 수 있어요(과정 설정에 따라). 자리를 비울 땐 안내 채널에 남겨주세요.</li>
            <li>질문은 손들기 ✋ 또는 채팅 💬을 활용해요</li>
          </ul>
          <div class="callout callout--tip"><span class="callout__ico">💡</span><div>촬영 시각이 정각과 조금 다를 수 있어요(예: 10:01:28). 네트워크 지연 때문인데, <strong>출석은 10분 슬롯(정각) 기준으로 집계</strong>되므로 정상 반영돼요.</div></div>` },
      { id:"s5-5", title:"조퇴·외출할 때 (QR 스스로 받기)",
        html:`
          <p>이제 <strong>조퇴·외출</strong>이 필요할 때 매니저·강사님께 매번 QR을 요청하지 않아도 돼요. 사이드바의 <strong>QR 확인 채널</strong>에서 <strong>본인 얼굴만 인증하면 QR 코드를 바로 확인할 수 있어요!</strong></p>
          <ol>
            <li>사이드바에서 <strong>QR 확인 채널</strong>에 들어가요. (과정마다 이름이 달라요 — 예: 🫆 QR출석체크)</li>
            <li>카메라가 여러 개라면 위의 <strong>카메라 선택</strong>에서 쓸 카메라를 골라요.</li>
            <li><strong>얼굴을 화면에 맞춰 인증</strong>해요 — 인식률(%)이 뜨면 성공이에요.</li>
            <li><strong>사유(조퇴·외출·지각·병원 방문 등)를 입력</strong>해요.</li>
            <li>아래 버튼을 눌러 <strong>내 QR 코드를 확인</strong>해요.</li>
          </ol>
          <div class="callout callout--warn"><span class="callout__ico">⚠️</span><div><strong>얼굴 인식과 사유 입력이 둘 다 돼야 버튼이 활성화돼요.</strong> 사유를 안 적으면 버튼에 "사유를 입력해 주세요"라고 뜨고 눌리지 않아요. 밝은 곳에서 얼굴이 화면에 잘 보이도록 한 뒤 다시 시도하고, 계속 안 되면 매니저·강사님께 문의해 주세요.</div></div>
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
          <details class="faq"><summary>📵 자꾸 튕겨요 / 강의 화면이 뚝뚝 끊겨요</summary><div>1. 인터넷 연결 확인, 가능하면 유선 인터넷 사용<br>2. 같은 방법(내 강의실 &gt; 입장하기)으로 다시 들어오면 돼요 — 로그인이 풀리지 않아요<br>3. 브라우저 새로고침 또는 데스크톱 앱 사용<br>4. <strong>기기가 버거워 보인다면</strong> — 강의 안 <strong>⋯ 더보기 &gt; 설정 &gt; 카메라 &gt; 저사양 모드</strong>를 켜보세요. 다른 사람 영상을 저화질로 받아 부하가 확 줄어들어요.</div></details>
          <details class="faq"><summary>🔔 알림이 안 와요 / 너무 많이 와요</summary><div>1. <strong>프로필 &gt; 프로필 설정 &gt; 알림</strong>이 '끄기'로 돼 있지 않은지 확인<br>2. 같은 화면 아래 <strong>클래스별 알림</strong>에서 우리 과정이 '끄기'로 돼 있지 않은지 확인 (← 강의 호출까지 안 와요!)<br>3. 특정 채널만 안 온다면 그 채널 상단 <strong>🔔 &gt; 전체 메시지</strong>로 변경<br>4. 반대로 너무 많으면 수다 채널만 <strong>🔔 &gt; 멘션만</strong> 또는 <strong>알림 끄기</strong>로 바꿔주세요</div></details>
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
          <details class="faq"><summary>Q. 모바일로도 수업을 들을 수 있나요?</summary><div>모바일 앱(iOS·Android)이 <strong>베타</strong>로 나왔어요! [캠프파이어 앱 받기] 모달의 QR로 App Store·Google Play에서 설치하고, 최초 입장 시 설정한 비밀번호(같은 계정)로 로그인하면 돼요. 다만 수업 참여·출석 캡쳐는 화면이 큰 PC(Chrome 권장)를 추천해요.</div></details>
          <details class="faq"><summary>Q. 화면이 너무 밝아요 / 어두워요</summary><div><strong>프로필 &gt; 프로필 설정 &gt; 일반 탭 &gt; 테마</strong>에서 라이트·다크·시스템 중에 고를 수 있어요. 같은 화면에서 언어(한국어/English)도 바꿀 수 있어요.</div></details>
          <details class="faq"><summary>Q. 누군가를 차단했는데 다시 풀고 싶어요</summary><div><strong>프로필 &gt; 프로필 설정 &gt; 계정 탭 &gt; 차단한 사용자</strong>에서 목록을 보고 차단을 해제할 수 있어요.</div></details>
          <details class="faq"><summary>Q. 비밀번호를 바꾸고 싶어요</summary><div><strong>프로필 &gt; 프로필 설정 &gt; 계정 탭 &gt; [비밀번호 변경]</strong>에서 바꿀 수 있어요. 앱·웹 로그인에 모두 같은 비밀번호가 쓰여요.</div></details>
          <details class="faq"><summary>Q. 배경에 방이 보이는 게 신경 쓰여요</summary><div>강의 안에서 <strong>⋯ 더보기 &gt; 설정 &gt; 배경 효과</strong>로 블러나 가상 배경을 켤 수 있어요. 카메라를 끄지 않아도 되니 출석에도 문제없어요. (5-3 참고)</div></details>` },
    ],
  },
];
