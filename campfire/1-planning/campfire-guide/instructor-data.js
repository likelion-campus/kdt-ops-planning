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
          <div class="callout callout--tip"><span class="callout__ico">💡</span><div>강사는 <strong>수업 진행에 필요한 권한</strong>은 갖지만, <strong>클래스 운영 권한(채널·멤버·공지)은 매니저</strong>에게 있습니다. 무엇을 직접 하고 무엇을 요청해야 하는지 먼저 알아두면 수업 중 당황할 일이 없어요.</div></div>
          <div class="callout callout--info"><span class="callout__ico">ℹ️</span><div>아래 표는 <strong>기본값</strong>입니다. 이제는 매니저가 <strong>설정(⚙️) &gt; 역할</strong>에서 역할별로 <strong>채널 관리 · 공지 게시 · 강의 관리 · 모니터링 관리 · 클래스 관리</strong> 5가지 권한을 켜고 끌 수 있어서, 과정마다 내가 할 수 있는 일이 다를 수 있습니다.</div></div>
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
          <div class="callout callout--warn"><span class="callout__ico">⚠️</span><div>기본값 기준으로 강사는 좌측 하단 <strong>톱니(⚙️) 클래스 설정</strong>과 <strong>🖥️ 클래스 모니터링</strong>에 들어갈 수 없습니다. 다만 이제는 매니저가 <strong>설정 &gt; 역할</strong>에서 역할별 권한(채널 관리·공지 게시·강의 관리·모니터링 관리·클래스 관리)을 켜고 끌 수 있어서, <strong>과정마다 보이는 메뉴가 다를 수 있습니다.</strong> 화면에 없는 기능은 담당 매니저에게 문의하세요.</div></div>
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
            <li><strong>앱 받기</strong>: 좌측 하단 프로필 → [캠프파이어 앱 받기]. 데스크톱 앱은 접속 OS를 자동 감지하고, 모바일 앱(<strong>베타</strong>)은 같은 모달의 QR로 App Store·Google Play에서 설치할 수 있어요.</li>
            <li>같은 프로필 메뉴에 <strong>[사용 가이드]</strong> 링크가 있어 이 문서를 바로 열 수 있습니다.</li>
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
          <div class="callout callout--tip"><span class="callout__ico">💡</span><div><strong>여는 사람과 참여하는 사람의 입장 상태가 다릅니다.</strong> 내가 강의를 <strong>열 때</strong>는 마이크·카메라가 모두 꺼진 채로 시작하고, <strong>이미 열린 강의에 참여</strong>할 때(수강생 포함)는 화면 안내대로 <strong>카메라는 켜진 상태, 마이크는 꺼진 상태</strong>로 입장합니다. 그래서 강의를 연 뒤에는 <strong>내 카메라를 직접 켜 주셔야</strong> 수강생 화면에 얼굴이 보여요. 첫 수업 전에 어떤 장치가 잡히는지 미리 확인해두면 시작 직후 버벅이지 않아요.</div></div>
          <h4>장치를 고르는 두 가지 경로 (모두 강의 안에서)</h4>
          <ul>
            <li><strong>하단 컨트롤바</strong>의 🎤·📹 버튼 오른쪽 <strong>∨(화살표)</strong> → 장치 목록에서 선택</li>
            <li><strong>⋯ 더보기 &gt; 설정</strong> → <strong>카메라 / 배경 효과 / 마이크 / 스피커</strong> 탭에서 상세 설정</li>
          </ul>
          <div class="callout callout--info"><span class="callout__ico">ℹ️</span><div><strong>대기 화면은 두 가지로 다릅니다.</strong><br>• <strong>내가 강의를 여는 경우</strong> — “강의를 열고 참여합니다” 화면. 미리보기만 있고 <strong>장치 드롭다운이 없습니다.</strong> 장치 변경은 강의에 들어간 뒤 위 경로로 합니다.<br>• <strong>이미 열려 있는 강의에 참여하는 경우</strong> — “강의 세션에 참여하시겠습니까?” 화면. <strong>입장 후 사용할 장치</strong>로 카메라·마이크를 미리 고를 수 있고, 안내문에 “카메라는 켜진 상태, 마이크는 꺼진 상태로 입장합니다”가 표시됩니다.<br>수업 5분 전에 미리 들어가 장치가 잡히는지 확인해 주세요.</div></div>
          <ul>
            <li>권장 환경: Chrome 최신, 가능하면 유선 인터넷 + 헤드셋(에코 방지)</li>
            <li><strong>설정 &gt; 카메라</strong>에는 <strong>내 화면 얼굴 표시</strong>(PiP에 얼굴 감지 박스 표시)와 <strong>저사양 모드</strong>도 있습니다.<br>└ <strong>저사양 모드</strong>: 참가자 영상을 저화질·저프레임으로 <strong>받아서</strong> 기기 부하를 줄입니다. 화면 공유·오디오 품질은 그대로이고, <strong>받는 쪽에만 적용되는 개인 설정</strong>이라 다른 사람에게 내 화면이 흐려 보이거나 출석 캡쳐가 나빠지지 않습니다. 수강생 기기가 버거워 할 때 이 점을 함께 안내해 주세요.</li>
            <li><strong>배경 효과</strong>: 약한/강한 블러 + 프리셋 배경(캠프파이어·오피스 블루·숲·선셋·한밤중) · 이미지 직접 추가 가능</li>
          </ul>
          <div class="shot">📸 스크린샷: 강의 ⋯ 더보기 &gt; 설정 (카메라·배경 효과·마이크·스피커)</div>
          <div class="shot">📸 스크린샷: 설정 &gt; 카메라 &gt; 내 화면 얼굴 표시 · 저사양 모드</div>
          <div class="shot">📸 스크린샷: 강의 입장 화면 2종 (여는 경우 / 참여하는 경우)</div>` },
      { id:"i2-4", title:"알림 설정",
        html:`
          <p>알림은 <strong>전체 기본값 → 클래스별 → 채널별</strong> 3단계입니다. (모든 역할 공통)</p>
          <h4>① 전체 기본값 — 프로필(좌측 하단) &gt; 프로필 설정 &gt; 알림 탭</h4>
          <ul>
            <li>선택지는 <strong>'멘션만' / '끄기' 둘뿐</strong>입니다. 기본값은 <strong>멘션만</strong>.</li>
            <li>예전의 '전체 메시지'는 여기에 없습니다. <strong>모든 메시지 알림은 채널별로 켜는 방식</strong>으로 바뀌었어요(③).</li>
          </ul>
          <h4>② 클래스별 알림 — 같은 화면 아래쪽</h4>
          <ul>
            <li>담당 클래스마다 <strong>기본값 / 멘션만 / 끄기</strong>를 따로 지정합니다. 여러 과정을 맡을 때 유용해요.</li>
            <li><strong>'끄기'로 하면 그 클래스의 멘션·푸시·강의 호출까지 모두 조용해집니다.</strong> 진행 중인 과정은 끄지 마세요.</li>
          </ul>
          <h4>③ 채널별 알림 — 두 가지 경로</h4>
          <ul>
            <li><strong>채널 상단 우측 🔔 (알림 설정) 버튼</strong> ← 가장 빠릅니다</li>
            <li>또는 사이드바에서 <strong>채널 호버 → 케밥(⋮) 메뉴</strong></li>
            <li>메뉴 구성: <strong>기본값 따름 / 전체 메시지 / 멘션만 / 알림 끄기</strong> (케밥에는 즐겨찾기 등록·숨기기도 있음)</li>
          </ul>
          <div class="callout callout--tip"><span class="callout__ico">💡</span><div>질문 채널처럼 답변이 필요한 곳은 채널 상단 🔔 → <strong>'전체 메시지'</strong>로 켜두면 놓치지 않아요.</div></div>
          <div class="shot">📸 스크린샷: 기본 알림 설정 (프로필 &gt; 프로필 설정 &gt; 알림 — 멘션만 + 클래스별 알림)</div>
          <div class="shot">📸 스크린샷: 채널별 알림 설정 (채널 상단 🔔 / 케밥 메뉴)</div>` },
    ],
  },
  {
    id:"ch3", num:3, title:"화면 구성 (강사 시점)", icon:"🖥️",
    sections:[
      { id:"i3-0", title:"화면 한눈에 보기",
        html:`
          <div class="callout callout--tip"><span class="callout__ico">💡</span><div>디스코드와 구조가 거의 같습니다. 왼쪽에서 오른쪽으로: <strong>채널 목록 → 대화 영역 → 우측 상단 아이콘 줄</strong>.</div></div>
          <ul>
            <li><strong>① 사이드바</strong>: 최상단 현재 클래스 이름(클릭해 다른 클래스로 전환) · 🏠 클래스 홈페이지 열기, 그 아래 <strong>[강의] 카드</strong>(닫힘 = '강의 열기' / 진행 중 = 빨간 <strong>● LIVE</strong>), 카테고리별 채널, 화상 채널, 하단 DM</li>
            <li><strong>② 메시지 영역</strong>: 메시지 스트림, 하단 입력창(📎 첨부 · 😀 이모지 · 📊 투표 만들기), [최하단으로 이동]</li>
            <li><strong>③ 우측 상단 아이콘</strong>: <strong>⭐ 즐겨찾기 · 🔍 검색(⌘K) · @ 내 활동 · 📄 파일 · 🔔 알림 설정 · 📌 고정된 메시지 · 👥 멤버 목록</strong><br>└ <strong>내 활동</strong>은 예전 '멘션 모아보기'가 확장된 것으로, <strong>전체 / DM / 멘션 / 스레드 / 초대</strong> 탭과 '읽지 않은 항목' 필터를 제공합니다. <strong>미답변 스레드를 모아 볼 때 유용</strong>해요.</li>
            <li><strong>④ 멤버 목록</strong>: 👥 클릭 → 역할별 구분(강사·보조강사·매니저·멘토·수강생). 멤버마다 <strong>카메라 켜짐 표시와 현재 위치(🖥️ 강의실)</strong>가 표시돼 누가 수업에 들어와 있는지 바로 보입니다.</li>
            <li><strong>⑤ 강의(화상) 영역</strong>: [강의] 카드의 정식 강의 + 🎤 화상 채널</li>
            <li>강사에게만 보이는 컨트롤: <strong>[강의] 카드의 '강의 열기'</strong> (강의 개설은 매니저·강사만)</li>
          </ul>
          <div class="shot">📸 스크린샷: 강사 화면 전체, ①~⑤ 번호 오버레이</div>` },
      { id:"i3-1", title:"채널 파일 모아보기",
        html:`
          <p>채널 상단 우측 <strong>파일 버튼(📁)</strong>으로 그 채널의 <strong>모든 파일을 모아보고 다운로드</strong>할 수 있습니다. (검색 · @멘션 · <strong>파일</strong> · 알림 사이)</p>
          <ol>
            <li>채널 상단 우측 툴바의 <strong>파일 버튼</strong> 클릭</li>
            <li>오른쪽 <strong>[파일] 패널</strong>에 파일 목록 표시 → <strong>파일명 검색</strong> + <strong>다운로드(⬇)</strong></li>
          </ol>
          <div class="callout callout--tip"><span class="callout__ico">💡</span><div>수업 자료·과제 파일을 채널별로 한눈에 모아 확인·공유할 수 있어요.</div></div>
          <div class="shot">📸 스크린샷: 상단 파일 버튼 → 채널 파일 목록·검색·다운로드</div>` },
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
            <li>사이드바 최상단 <strong>[강의] 카드 &gt; [열기]</strong> → '강의를 열고 참여합니다' 화면이 뜨고 카메라 미리보기가 표시됩니다.</li>
            <li><strong>[강의 열기 및 참여]</strong> 클릭 → 시작. <strong>여는 사람은 마이크·카메라가 모두 꺼진 상태로 입장</strong>하므로 하단 버튼으로 직접 켜야 합니다. (나중에 참여하는 수강생은 카메라가 켜진 채로 들어옵니다)</li>
            <li>장치를 바꾸려면 입장 후 <strong>하단 🎤·📹 버튼 옆 ∨</strong> 또는 <strong>⋯ 더보기 &gt; 설정</strong>에서 선택합니다 (2-3 참고).</li>
          </ol>
          <div class="callout callout--info"><span class="callout__ico">🎥</span><div>별도 설정 없이 <strong>모든 정식 강의는 자동으로 녹화</strong>됩니다. 수강생에게 미리 고지해 주세요.</div></div>
          <ul>
            <li>시작·종료 시 <strong>강의 봇</strong>이 <strong># 강의 채팅</strong> 채널에 🎬 강의가 시작되었습니다 / 🛑 강의가 종료되었습니다 를 자동 게시합니다. (채널명은 과정마다 다를 수 있음)</li>
            <li>진행 중에는 [강의] 카드가 빨간 <strong>● LIVE</strong> 뱃지로 바뀝니다.</li>
            <li>강의 화면 오른쪽에 <strong>강의 채팅 패널</strong>이 함께 열려 화상과 채팅을 동시에 볼 수 있습니다. (필요하면 [채팅 닫기]로 접기)</li>
          </ul>
          <div class="shot">📸 스크린샷: 강의 열기 및 참여 화면</div>` },
      { id:"i5-6", title:"강의 호출 (미입장자 알림)",
        html:`
          <p>수업이 시작됐는데 <strong>아직 강의실에 들어오지 않은 멤버</strong>에게 입장 알림을 보낼 수 있어요. (예전 명칭은 '수강생 호출' → 현재 라벨은 <strong>강의 호출</strong>)</p>
          <ol>
            <li>강의 화면 하단 <strong>[더보기(⋯)] → [강의 호출]</strong></li>
            <li>호출 메시지 작성 — 기본 문구("수업이 곳 시작됩니다. 강의실로 들어와 주세요! 🔔")가 채워져 있습니다 → <strong>[발송]</strong></li>
            <li>화면 안내 그대로 <strong>강의에 아직 들어오지 않은 '모든 멤버'</strong>에게 전송됩니다. 수강생만 골라 보내는 옵션은 없으니, 운영진이 많은 클래스에선 남발하지 마세요.</li>
          </ol>
          <div class="callout callout--tip"><span class="callout__ico">💡</span><div>수강생은 <strong>'강의 초대' 알림 + [입장하기] 버튼</strong>을 받고, 누르면 <strong>바로 강의실로 입장</strong>해요. 단, 프로필 설정에서 <strong>해당 클래스 알림을 '끄기'로 해둔 수강생은 호출 알림도 받지 못합니다.</strong></div></div>
          <div class="shot">📸 스크린샷: 더보기 &gt; 강의 호출 → 메시지 작성·발송</div>` },
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
            <li>하단 컨트롤 바(왼→오른): <strong>🎤 마이크(∨) / 📹 카메라(∨) / 🖥️ 화면 공유 / 😀 리액션 / ✋ 손 들기 / 👍 이해 확인 / 💬 채팅 / ⋯ 더보기 / 📞 퇴장</strong><br>└ 마이크·카메라 버튼 옆 <strong>∨</strong>로 장치를 바로 바꿀 수 있습니다.</li>
            <li><strong>[⋯ 더보기] 메뉴</strong> (위→아래 순서):
              <ul>
                <li><strong>그리드 보기</strong> / <strong>조감 모드 (7×7 · 최대 49명을 한 화면에)</strong> — 화면 배치 전환</li>
                <li><strong>참가자 패널</strong> — 우측에 참가자/미참가 명단 표시</li>
                <li><strong>출입 기록</strong> — 기간·이름 검색, 시간순/사람별 정렬, 고유·현재 입장·카메라·시청 인원 집계</li>
                <li><strong>설정</strong> — 카메라 / 배경 효과 / 마이크 / 스피커 (2-3 참고)</li>
                <li><strong>강의 호출</strong> — 아직 안 들어온 멤버에게 알림 (5-2)</li>
                <li><strong>전체 음소거</strong> / <strong>참여자 모두 퇴장</strong> / <strong>강의 종료하기</strong></li>
              </ul>
            </li>
            <li><strong>참가자 패널</strong>: '참가자 (N)' 과 '미참가 (N)'로 나뉘며, 역할과 연결 상태 아이콘이 함께 표시됩니다.</li>
            <li><strong>강의 종료하기</strong>를 누르면 "모든 참가자의 연결이 종료됩니다" 확인창이 뜨고, 확인하면 카드가 다시 '강의 열기'로 돌아갑니다. <strong>나혼자 빠지려면 [퇴장]</strong>을 써야 강의가 유지됩니다.</li>
          </ul>
          <div class="callout callout--warn"><span class="callout__ico">⚠️</span><div><strong>발표자 지정 기능은 없습니다.</strong> 수강생 발표 시 강사가 "마이크 켜고 말씀하세요"라고 안내하세요. 멤버 역할 변경·영구 내보내기는 매니저 전용이며, 멤버 케밥(⋮)에서 강사에겐 <strong>차단·신고만</strong> 보입니다(신고 시 매니저 신고함으로 전달).</div></div>
          <div class="shot">📸 스크린샷: 더보기 메뉴 + 참가자 패널</div>` },
      { id:"i5-4", title:"소그룹(브레이크아웃) — 전용 기능 없음",
        html:`
          <div class="callout callout--info"><span class="callout__ico">ℹ️</span><div>강의 안에서 그룹을 나누는 <strong>전용 브레이크아웃 기능은 여전히 없습니다.</strong> 강의 하단 더보기 메뉴에도 그룹 분할 항목은 없습니다.</div></div>
          <ul>
            <li><strong>권장 대안</strong>: 사이드바 🎤 <strong>화상 채널(팀별)</strong>로 나눠 들어가게 하고, 강사가 채널을 옮겨 다니며 순회합니다. (팀별 화상 채널 생성은 매니저에 요청)</li>
            <li>팀을 불러모을 땐 <strong>@그룹 멘션</strong>(예: @1team)이나 강의 화면의 <strong>강의 호출</strong>을 사용하세요.</li>
            <li>팀원이 어느 채널·강의실에 있는지는 <strong>멤버 목록(👥)</strong>의 현재 위치 표시로 확인할 수 있습니다.</li>
          </ul>` },
      { id:"i5-5", title:"녹화 다시 보기",
        html:`
          <ul>
            <li><strong>모든 정식 강의는 자동으로 녹화</strong>됩니다. (예전 'AI 요약 활성화' 토글은 없어졌고, 별도 설정이 필요 없습니다)</li>
            <li><strong>저장된 녹화를 보는 곳이 변경됐습니다</strong>: 사이드바 맨 아래 <strong>🖥️ [클래스 모니터링] → [녹화] 탭</strong>. 시작 시각·상태·재생시간·크기가 표시되고 <strong>재생 · 다운로드</strong>할 수 있습니다. (진행 중인 강의는 '녹화 중 · 준비 중'으로 표시)</li>
            <li><strong>모니터링 메뉴가 안 보인다면</strong> 역할 권한(모니터링 관리)이 꺼져 있는 것이므로 담당 매니저에게 녹화 공유를 요청하세요.</li>
          </ul>
          <div class="callout callout--warn"><span class="callout__ico">⚠️</span><div>모든 강의가 자동으로 녹화됩니다. 민감 발언이 남을 수 있으니 <strong>수강생에게 녹화 사실을 미리 고지</strong>하세요.</div></div>
          <div class="shot">📸 스크린샷: 클래스 모니터링 &gt; 녹화 탭</div>` },
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
            <li><strong>코드 블록 공유</strong>: 백틱 3개 마크다운 코드 블록을 지원합니다. 다만 <strong>언어별 문법 강조(하이라이팅)는 아직 지원되지 않아 단색</strong>으로 표시됩니다.</li>
            <li><strong>멘션</strong>: <strong>@ 하나</strong>로 인원·그룹·역할을 모두 호출 (예: @이름, @1team, @수강생). @everyone은 꼭 필요할 때만.</li>
            <li><strong>채널 링크</strong>: <strong>#</strong>으로 다른 채널을 링크로 걸 수 있습니다 (예: "과제는 #과제제출 에 올려주세요").</li>
            <li><strong>답장 vs 스레드</strong>: 메시지 호버 시 <strong>반응 추가 · 답장 · 스레드 · 더보기(⋯)</strong>가 나타납니다. 짧은 확인은 <strong>답장</strong>, 이어지는 논의는 <strong>스레드</strong>로 유도하세요.</li>
            <li><strong>이해 확인</strong>: 강의 하단 <strong>👍 [이해 확인]</strong> 버튼 → 수강생 화면에 '👍 이해 / 🤔 어려움' 선택지가 뜨고, 강사 화면 상단에 <strong>이해 N · 어려움 N · 응답 N명</strong>이 실시간 집계됩니다. 끝낼 땐 <strong>[이해도 체크 종료]</strong>.</li>
            <li><strong>이모지 리액션</strong>으로도 빠르게 이해도 체크 (예: ✅). 과정별 <strong>커스텀 이모지</strong>가 등록돼 있을 수 있습니다.</li>
            <li><strong>투표</strong>: 입력창 오른쪽 <strong>📊 [투표 만들기]</strong> → 질문·선택지 입력 후 <strong>익명/기명</strong>과 <strong>투표 기간</strong>(1시간·6시간·1일·1주·무기한)을 고르면 됩니다. 사전 지식 조사·실습 난이도 확인에 유용합니다.</li>
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
              <tr><td>내 마이크·카메라가 안 잡혀요</td><td>① Chrome 자물쇠 &gt; 카메라·마이크 [허용] ② 강의 하단 🎤·📹 옆 ∨ 또는 더보기 &gt; 설정에서 장치 재선택 ③ Zoom 등 종료</td><td>담당 매니저에게 연락</td></tr>
              <tr><td>강의가 안 열려요</td><td>[강의] 카드에 '강의 열기'가 보이는지 확인(강사·매니저만). 안 보이면 강사 등록 또는 <strong>역할 권한(강의 관리)</strong> 확인</td><td>매니저에게 강사 부여·권한 확인 요청</td></tr>
              <tr><td>특정 수강생만 계속 화면이 안 나와요</td><td>수강생 본인의 카메라 권한·점유 확인 안내</td><td>매니저에게 <strong>설정 &gt; 멤버 진단</strong> 조회 요청 (캡쳐 실패·화질 저하·카메라 점유·마이크 무음을 로그로 잡아줍니다)</td></tr>
              <tr><td>수강생들이 강의가 버벅인다고 해요</td><td>강의 <strong>더보기 &gt; 설정 &gt; 카메라 &gt; 저사양 모드</strong>를 켜라고 안내 (참가자 영상을 저화질로 받아 부하를 줄임)</td><td>담당 매니저에게 연락</td></tr>
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
          <details class="faq"><summary>Q. 소그룹(브레이크아웃)으로 나눌 수 있나요?</summary><div>전용 소그룹 기능은 현재 없습니다. 사이드바의 팀별 화상 채널로 나눠 들어가게 하고 강사가 순회하는 방식을 권장합니다(채널 생성은 매니저에 요청).</div></details>
          <details class="faq"><summary>Q. 지난 강의 녹화는 어디서 보나요?</summary><div>사이드바 맨 아래 <strong>🖥️ [클래스 모니터링] &gt; [녹화] 탭</strong>에서 재생·다운로드합니다. 예전에 안내되던 '[강의] 영역 &gt; 녹화 탭'에서 이동했습니다. 메뉴가 안 보이면 역할 권한(모니터링 관리)이 꺼진 것이니 매니저에게 문의하세요.</div></details>
          <details class="faq"><summary>Q. 수강생이 배경을 가리고 싶다고 해요</summary><div>강의 안 <strong>⋯ 더보기 &gt; 설정 &gt; 배경 효과</strong>에서 블러나 가상 배경을 켜라고 안내하세요. 카메라를 끄지 않아도 돼서 <strong>출석 캡쳐에도 영향이 없습니다.</strong></div></details>` },
    ],
  },
];
