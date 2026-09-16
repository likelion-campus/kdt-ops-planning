/* =====================================================================
 * 캠프파이어 매니저 가이드 — 콘텐츠 데이터
 * ---------------------------------------------------------------------
 * 가이드 내용을 수정하려면 이 파일만 편집하세요.
 * 구조:
 *   GUIDE_META  : 문서 제목/역할/안내 문구
 *   GUIDE_DATA  : 챕터 배열. 각 챕터는 { id, num, title, icon, sections[] }
 *                 각 섹션은 { id, title, html }
 *   html 안에서 쓸 수 있는 헬퍼 컴포넌트(클래스):
 *     callout--tip / callout--warn / callout--info  : 강조 박스
 *     shot                                          : 스크린샷 자리(📸)
 *     <table class="cf-table">                      : 표
 *     <details class="faq">                         : 접기/펼치기(FAQ)
 * ===================================================================== */

const GUIDE_META = {
  product: "캠프파이어",
  role: "매니저",
  emoji: "🛠️",
  tagline: "워크스페이스 세팅부터 채널·멤버 관리, 운영 중 1차 대응까지 — 매니저가 혼자 처리할 수 있도록.",
  audience: "과정 운영을 담당하는 매니저",
  canView: ["매니저"], // 독립형: 캠프파이어 채널별 임베드용 — 역할 전환 탭/다른 가이드 링크 숨김
};

const GUIDE_DATA = [
  /* ========================= 1 ========================= */
  {
    id: "ch1", num: 1, title: "캠프파이어 한눈에 보기", icon: "👀",
    sections: [
      {
        id: "s1-1", title: "캠프파이어란?",
        html: `
          <p><strong>캠프파이어</strong>는 화상 + 텍스트 채팅을 하나로 합친 올인원 솔루션으로, KDT 교육 운영을 위해 만들어졌습니다. 디스코드를 써봤다면 구조가 거의 동일해 금방 익숙해집니다.</p>
          <div class="callout callout--tip"><span class="callout__ico">💡</span><div><strong>한 줄 요약</strong><br>강의(화상) · 채널(채팅) · 운영 도구가 한곳에 모여 있고, 훈련(기수)별로 <strong>클래스</strong>가 따로 생성됩니다. (화면 곳곳의 표기도 “클래스”로 통일돼 있어요)</div></div>
        `,
      },
      {
        id: "s1-2", title: "역할별 권한 비교",
        html: `
          <p>매니저가 할 수 있는 일과 다른 역할의 권한 차이입니다.</p>
          <table class="cf-table matrix">
            <thead><tr><th>기능</th><th>매니저</th><th>강사</th><th>보조강사</th><th>멘토</th><th>수강생</th></tr></thead>
            <tbody>
              <tr><td>채널 생성/삭제</td><td class="y">⭕</td><td class="n">❌</td><td class="n">❌</td><td class="n">❌</td><td class="n">❌</td></tr>
              <tr><td>멤버 초대/관리</td><td class="y">⭕</td><td class="n">❌</td><td class="n">❌</td><td class="n">❌</td><td class="n">❌</td></tr>
              <tr><td>화상 세션 개설</td><td class="y">⭕</td><td class="y">⭕</td><td class="y">⭕</td><td class="n">❌</td><td class="n">❌</td></tr>
              <tr><td>공지 작성</td><td class="y">⭕</td><td class="n">❌</td><td class="n">❌</td><td class="n">❌</td><td class="n">❌</td></tr>
            </tbody>
          </table>
          <div class="callout callout--info"><span class="callout__ico">ℹ️</span><div><strong>멘토</strong>는 수강생과 동일한 권한입니다. <strong>보조강사</strong>는 강사처럼 <strong>화상 세션 개설</strong>이 가능하지만, 채널·멤버 관리·공지 작성 권한은 없습니다.<br>이 표는 <strong>기본값</strong>이며, <strong>설정(⚙️) &gt; 역할</strong>에서 역할별 권한을 켜고 끌 수 있습니다 (5-3).</div></div>
        `,
      },
    ],
  },

  /* ========================= 2 ========================= */
  {
    id: "ch2", num: 2, title: "시작하기", icon: "🚀",
    sections: [
      {
        id: "s2-1", title: "계정 & 입장 구조 이해하기",
        html: `
          <div class="callout callout--info"><span class="callout__ico">🌐</span><div><strong>권장 브라우저 — PC Chrome 최신 버전</strong><br>화상 세션·화면 공유·녹화가 Chrome에 최적화돼 있습니다. 수강생 안내 시에도 <strong>Safari·Edge·인앱 브라우저 대신 PC Chrome</strong>을 권해 주세요.</div></div>
          <div class="callout callout--tip"><span class="callout__ico">💡</span><div><strong>핵심</strong><br>캠프파이어는 별도의 회원가입·로그인 절차가 없습니다. 어드민(Admin)에서 매니저로 등록되면 <strong>내 강의실</strong>의 [캠프파이어 입장하기] 버튼을 통해 <strong>본인 전용 토큰</strong>으로 자동 인증되어 입장합니다.</div></div>
          <ul>
            <li>캠프파이어 <strong>클래스</strong>는 어드민에서 <strong>훈련을 생성할 때 자동으로 함께 생성</strong>됩니다.</li>
            <li>매니저의 입장 권한은 어드민의 <strong>매니저 등록</strong>으로 부여됩니다.</li>
            <li>입장 경로는 <strong>내 강의실 → [캠프파이어 입장하기] 버튼</strong>이 기본입니다 (토큰 자동 인증).</li>
            <li><strong>최초 입장 시 비밀번호 설정 화면</strong>이 나오며, 여기서 정한 비밀번호로 <strong>데스크톱 앱·PC(웹)·모바일 앱에서 동일 계정 로그인</strong>이 가능합니다. <strong>모바일 앱이 베타로 출시</strong>되어 App Store·Google Play에서 설치할 수 있어요.</li>
            <li>여러 훈련을 담당하면 훈련별로 클래스가 각각 생성되며, 입장 후에는 사이드바 최상단 클래스 이름을 눌러 <strong>디스코드 서버처럼 클래스 간 자유롭게 이동</strong>할 수 있습니다.</li>
          </ul>
          <p><strong>입장 흐름 요약</strong></p>
          <div class="flow">
            <span>훈련 생성<br><em>(클래스 자동 생성)</em></span><i>→</i>
            <span>매니저 등록</span><i>→</i>
            <span>내 강의실</span><i>→</i>
            <span>입장하기 버튼</span><i>→</i>
            <span>(최초 1회)<br>비밀번호 설정</span><i>→</i>
            <span>입장 ✅</span>
          </div>
          <p><strong>지원 환경 &amp; 앱 받기</strong> — Chrome 브라우저 권장. 좌측 하단 <strong>내 프로필 클릭 → [캠프파이어 앱 받기]</strong>에서 다운로드.</p>
          <ul>
            <li><strong>데스크톱 앱</strong> — 접속 OS를 자동 감지해 해당 버전을 보여줍니다 ([다른 OS 버전 보기]로 수동 선택 가능).</li>
            <li><strong>모바일 앱(베타)</strong> — 같은 모달의 <strong>QR을 스캔하거나 눌러서 App Store·Google Play</strong>에서 설치. 캠에서 쓰던 워크스페이스 그대로 <strong>같은 계정으로 로그인</strong>하면 됩니다.</li>
          </ul>
          <div class="shot">📸 스크린샷: 프로필 &gt; 캠프파이어 앱 받기 모달 (데스크톱 + 모바일 QR)</div>
        `,
      },
      {
        id: "s2-2", title: "매니저 등록 & 입장 절차",
        html: `
          <ol>
            <li>어드민 접속 → <strong>훈련 관리</strong>에서 담당 훈련 선택 (예: 백엔드 부트캠프 24기: Java)</li>
            <li>우측 메뉴에서 <strong>매니저 관리</strong> 진입</li>
            <li>[회원 추가]로 대상 회원을 목록에 추가 → 회원 선택 후 [매니저 부여] 클릭, 직무 지정 (예: 교육운영)</li>
            <li><strong>내 강의실 &gt; 강의목록</strong>에서 해당 훈련 카드의 [캠프파이어 입장하기] 버튼 클릭 (클래스룸 입장하기 버튼 옆)</li>
            <li>본인 전용 토큰으로 자동 인증되어 입장 (<strong>최초 입장 시 비밀번호 설정</strong>)</li>
          </ol>
          <h4 class="warn-h">⚠️ 입장 관련 예외 케이스</h4>
          <table class="cf-table">
            <thead><tr><th>상황</th><th>영향</th><th>해결 방안</th></tr></thead>
            <tbody>
              <tr><td>매니저 등록 안 된 상태로 내 강의실 접근</td><td>입장 카드 자체가 노출되지 않음</td><td>어드민 &gt; 훈련 관리 &gt; 매니저 관리에서 등록 완료 후 재진입</td></tr>
              <tr><td>토큰 만료 / 장시간 미사용 후 재입장</td><td>현재 토큰 유효기간이 없어 만료로 인한 실패는 발생하지 않음</td><td>입장이 안 되면 매니저 등록 여부·네트워크 등 다른 원인 확인</td></tr>
              <tr><td>매니저 등록 해제</td><td>내부 직원이므로 해제해도 접근 권한이 자동 회수되지 않음</td><td>퇴사 등 차단이 필요한 경우 별도 정책 결정 필요</td></tr>
              <tr><td>한 매니저가 여러 훈련 담당</td><td>훈련별로 클래스가 각각 생성됨 (멤버·채널 분리)</td><td>입장 후 사이드바 최상단에서 클래스를 전환하며 이동</td></tr>
              <tr><td>훈련이 '교육 종료' 상태로 전환</td><td>내 강의실 카드에 입장 버튼이 안 보이는 것으로 보임 (확인 필요)</td><td>종료 후 접근 가능 여부·데이터 보존 정책 확인 필요</td></tr>
            </tbody>
          </table>
        `,
      },
      {
        id: "s2-3", title: "프로필 & 표시 이름",
        html: `
          <ul>
            <li>최초 입장 시 표시 이름은 <strong>멋쟁이사자처럼 홈페이지 가입 이름</strong>으로 자동 설정됩니다.</li>
            <li>입장 후 캠프파이어 안에서 표시 이름을 변경할 수 있습니다.</li>
            <li>표시 이름은 <strong>수강생·강사·매니저 모두 실명으로 표기</strong>합니다 (별도 접미사 규칙 없음).</li>
          </ul>
          <div class="callout callout--warn"><span class="callout__ico">⚠️</span><div>표시 이름은 누구나 자유롭게 변경할 수 있으므로, 가입 시 자동 설정된 실명을 그대로 유지하도록 <strong>기수 시작 시 안내</strong>하는 것을 권장합니다.</div></div>
        `,
      },
      {
        id: "s2-4", title: "알림 설정",
        html: `
          <p>알림은 <strong>전체 기본값 → 클래스별 → 채널별</strong> 3단계 구조입니다. (모든 역할 공통 — 수강생 안내 시 그대로 설명하시면 됩니다)</p>
          <h4>① 전체 기본값 — 프로필(좌측 하단) &gt; 프로필 설정 &gt; 알림 탭</h4>
          <ul>
            <li>선택지는 <strong>'멘션만' / '끄기' 두 가지뿐</strong>이며 기본값은 <strong>멘션만</strong>입니다.</li>
            <li>⚠️ <strong>예전의 '전체 메시지' 옵션은 이 화면에서 사라졌습니다.</strong> 화면 안내문도 "채널 전체 알림은 채널별로 켜세요"로 바뀌었어요. 공지 채널 알림 안내는 반드시 ③ 경로로 안내하세요.</li>
          </ul>
          <h4>② 클래스별 알림 (신규) — 같은 화면 아래쪽</h4>
          <ul>
            <li>참여 중인 클래스마다 <strong>기본값 / 멘션만 / 끄기</strong>로 전체 기본값을 덮어씁니다.</li>
            <li>화면 안내문: "'끄기'는 그 클래스의 멘션·푸시·강의 호출까지 조용히 합니다."</li>
            <li>🚨 <strong>수강생이 강의 호출 알림을 못 받는 가장 흔한 원인</strong>이 여기가 '끄기'로 돼 있는 경우입니다. 미입장 문의가 반복되면 먼저 확인하게 하세요.</li>
          </ul>
          <h4>③ 채널별 알림 — 경로가 2개로 늘어났습니다</h4>
          <ul>
            <li><strong>채널 상단 우측 🔔 (알림 설정) 버튼</strong> ← 신규·권장 경로</li>
            <li>기존 경로: 사이드바에서 <strong>채널에 마우스를 올리면 나타나는 케밥 메뉴(⋮)</strong></li>
            <li>메뉴 구성: <strong>기본값 따름 / 전체 메시지 / 멘션만 / 알림 끄기</strong>. 케밥에는 <strong>즐겨찾기 등록 · 숨기기</strong>도 함께 있습니다.</li>
          </ul>
          <div class="callout callout--tip"><span class="callout__ico">💡</span><div>📢 공지 채널은 <strong>채널 상단 🔔 &gt; '전체 메시지'</strong>로 켜두게 안내하세요. OT 때 스크린샷과 함께 공지하면 문의가 확 줄어듭니다.</div></div>
          <div class="shot">📸 스크린샷: 기본 알림 설정 (프로필 &gt; 프로필 설정 &gt; 알림 — 멘션만 + 클래스별 알림)</div>
          <div class="shot">📸 스크린샷: 채널별 알림 설정 (채널 상단 🔔 / 케밥 메뉴)</div>
        `,
      },
    ],
  },

  /* ========================= 3 ========================= */
  {
    id: "ch3", num: 3, title: "화면 구성", icon: "🖥️",
    sections: [
      {
        id: "s3-1", title: "화면 한눈에 보기",
        html: `
          <div class="callout callout--tip"><span class="callout__ico">💡</span><div>디스코드를 써봤다면 구조가 거의 동일합니다. 왼쪽에서 오른쪽으로: <strong>채널 목록(사이드바) → 대화 영역 → 우측 상단 아이콘 줄</strong>. 사이드바 <strong>맨 아래 아이콘 3개(프로필 · 🖥️ 클래스 모니터링 · ⚙️ 설정)</strong>가 매니저 운영의 출발점입니다.</div></div>
          <dl class="anatomy">
            <dt>① 사이드바 (좌측)</dt>
            <dd>
              <ul>
                <li><strong>최상단</strong>: 현재 입장한 <strong>클래스 이름</strong> — 클릭하면 내가 속한 다른 클래스 목록이 뜨고 바로 전환됩니다(디스코드 서버 전환과 동일). 메뉴 맨 아래엔 <strong>[+ 클래스 개설하기]</strong>도 있습니다. 오른쪽 <strong>🏠 아이콘</strong>은 클래스 홈페이지를 새 창으로 엽니다(8-5).</li>
                <li><strong>강의 카드</strong>: 닫혀 있을 때 <strong>'강의 열기'</strong>, <strong>진행 중에는 빨간 ● LIVE 뱃지</strong>로 바뀝니다.</li>
                <li><strong>채널 목록</strong>: 카테고리별 그룹화. 카테고리에 마우스를 올리면 <strong>[채널 만들기]</strong>와 <strong>[새 카테고리 추가]</strong> 버튼이 나타납니다.</li>
                <li><strong>채널 아이콘</strong>: # 텍스트 / 📢 공지 / 🎤 화상 / 🌐 임베드 / 🔳 QR 확인 / 🔒 비공개</li>
                <li><strong>하단</strong>: DM 목록</li>
                <li><strong>최하단 아이콘 3개</strong>: <strong>내 프로필</strong>(상태 변경 · 앱 받기 · 사용 가이드 · 프로필 설정 · 로그아웃) → <strong>🖥️ 클래스 모니터링</strong>(캡쳐·녹화·모니터 클립·QR 조회 — 9장) → <strong>⚙️ 설정</strong>(클래스 운영 메뉴). <strong>모니터링과 설정은 별도 버튼</strong>이니 헷갈리지 마세요.</li>
              </ul>
            </dd>
            <dt>② 메시지 영역 (중앙)</dt>
            <dd>상단: 채널 이름·즐겨찾기(⭐) / 메시지 스트림(작성자·시간·본문, 링크 미리보기) / 하단: 입력창(📎 첨부, 이모지) / 우측 하단: [최하단으로 이동]</dd>
            <dt>③ 멤버 목록</dt>
            <dd>우측 상단 멤버 아이콘(👥) 클릭 시 표시. 상단에 <strong>총 인원·멤버 정렬·멤버 검색</strong>이 있고, <strong>역할별로 구분</strong>되어 보입니다(예: 강사 — 2 / 보조강사 — 1 / 매니저 — 18 / 수강생 — 28). 순서는 <strong>설정 &gt; 역할</strong>의 순서를 따릅니다(5-3).<br><strong>🆕 멤버마다 카메라 켜짐 표시와 현재 위치(🖥️ 강의실)가 나옵니다</strong> — 누가 수업에 들어와 있는지 별도 화면 없이 바로 파악할 수 있어 출결 체크에 유용합니다.</dd>
            <dt>④ 화상 채널 영역</dt>
            <dd>사이드바 화상 채널 카테고리에 모여 있음 (예: 프로젝트 1~4팀, 회고방). 상세는 7장.</dd>
            <dt>⑤ 우측 상단 아이콘 줄</dt>
            <dd>왼쪽부터 <strong>⭐ 즐겨찾기 · 🔍 검색(⌘K) · @ 내 활동 · 📄 파일 · 🔔 알림 설정 · 📌 고정된 메시지 · 👥 멤버 목록</strong><br>• <strong>내 활동</strong>(예전 '멘션 모아보기')은 <strong>전체 / DM / 멘션 / 스레드 / 초대</strong> 탭과 '읽지 않은 항목' 필터를 제공합니다.<br>• <strong>🔔</strong>은 전역 알림이 아니라 <strong>지금 보는 채널의 알림 설정</strong>입니다(2-4).<br>• <strong>파일</strong>은 채널 파일 모아보기(3-2).</dd>
          </dl>
          <div class="shot">📸 스크린샷: 전체 화면에 ①~⑤ 번호를 오버레이한 이미지 1장</div>
        `,
      },
      {
        id: "s3-2", title: "채널 파일 모아보기",
        html: `
          <p>채널 <strong>상단 우측 툴바의 파일 버튼(📁)</strong>을 누르면, 그 채널에 올라온 <strong>모든 파일을 한 곳에서 모아보고 다운로드</strong>할 수 있습니다. (위치: @ 내 활동 과 🔔 알림 설정 사이)</p>
          <ol>
            <li>채널 <strong>상단 우측의 파일 버튼</strong> 클릭</li>
            <li>오른쪽에 <strong>[파일] 패널</strong>이 열리며 채널의 파일 목록이 표시됩니다.</li>
            <li><strong>파일명 검색</strong>으로 원하는 파일을 찾고, 각 파일의 <strong>다운로드(⬇) 아이콘</strong>으로 저장합니다.</li>
          </ol>
          <div class="callout callout--tip"><span class="callout__ico">💡</span><div>과제·자료가 채팅에 묻혀 찾기 어려울 때, 파일 버튼으로 채널별 자료를 한눈에 모아 관리하세요.</div></div>
          <div class="shot">📸 스크린샷: 상단 파일 버튼 → 채널 파일 목록·검색·다운로드</div>
        `,
      },
    ],
  },

  /* ========================= 4 ========================= */
  {
    id: "ch4", num: 4, title: "채널 관리", icon: "📁",
    sections: [
      {
        id: "s4-1", title: "채널 종류 이해하기",
        html: `
          <p>채널 타입 5종 (생성 시 선택):</p>
          <ul>
            <li><strong># 텍스트</strong> — 메시지·이미지·파일을 공유하는 기본 채널</li>
            <li><strong>📢 공지</strong> — <strong>매니저만 게시</strong>할 수 있는 공지 채널</li>
            <li><strong>🎤 화상</strong> — 화상·음성·화면 공유</li>
            <li><strong>🌐 임베드</strong> — 외부 페이지(부트캠프·YouTube 등)를 채널 안에 표시</li>
            <li><strong>🔳 QR 확인</strong> — 수강생이 <strong>얼굴 인증 후 조퇴·외출을 스스로 신청</strong>하는 출결 채널</li>
          </ul>
          <div class="callout callout--info"><span class="callout__ico">🔳</span><div><strong>QR 확인 채널이란?</strong> 수강생이 <strong>본인 얼굴을 인증</strong>한 뒤 <strong>조퇴·외출을 스스로 신청</strong>하는 출결 시스템입니다. 강사·매니저에게 매번 QR을 요청하지 않아도 돼요.<br>• <strong>수강생</strong>: 채널 입장 → 카메라로 <strong>본인 얼굴 인식이 성공해야</strong> 사유(조퇴·외출 등)를 입력하고 <strong>QR 코드를 직접 발급</strong>받습니다.<br>• <strong>매니저(전용)</strong>: QR을 찍은 수강생의 <strong>얼굴·사유·시각 기록</strong>은 사이드바 맨 아래 <strong>🖥️ [클래스 모니터링] → [QR 조회] 탭</strong>에서 확인합니다. 날짜·채널로 필터링할 수 있고 사진·사용자·채널·사유·시각이 표로 나옵니다. <strong>모니터링 관리 권한을 가진 역할만 열람</strong>할 수 있습니다.<br>⚠️ <strong>경로 변경</strong>: 예전에 안내되던 '채널 하단 [모니터링] 버튼'은 현재 QR 채널에서 보이지 않습니다.<br>• <strong>버튼 비활성 조건</strong>: 얼굴 인식과 <strong>사유 입력이 모두 끝나야</strong> 버튼이 눌립니다. 사유를 안 적으면 버튼에 "사유를 입력해 주세요"로 표시됩니다.</div></div>
          <div class="callout callout--info"><span class="callout__ico">ℹ️</span><div><strong>비공개</strong>는 타입이 아니라 <strong>옵션</strong>입니다 — 어떤 타입이든 생성 시 비공개 설정 가능(🔒). <strong>익명</strong>은 <strong>텍스트 유형에만</strong> 적용되는 옵션입니다.</div></div>
          <div class="shot">📸 스크린샷: 매니저 [모니터링] 버튼 → [QR 조회] 탭 (수강생 QR 인증 기록)</div>
          <p>채널은 <strong>카테고리</strong>(채널 / 강의 / 행정 / 기타 / 화상 채널)로 묶어 정리할 수 있습니다.</p>
          <p><strong>권장 구조 예시(멋사 표준)</strong>: 📢 공지 / 💬 자유수다 / ❓질문 / 🎥 강의실 / 팀별 채널 …</p>
        `,
      },
      {
        id: "s4-2", title: "채널 만들기",
        html: `
          <div class="callout callout--info"><span class="callout__ico">ℹ️</span><div>채널 만들기가 <strong>2단계 방식</strong>으로 바뀌었습니다. 먼저 <strong>유형을 고르고</strong>, 그다음 <strong>이름·카테고리·옵션</strong>을 입력합니다.</div></div>
          <ol>
            <li>사이드바 <strong>카테고리명에 마우스를 올리면</strong> 나타나는 <strong>[채널 만들기]</strong> 버튼 클릭 (옆에 <strong>[새 카테고리 추가]</strong> 버튼도 있음)</li>
            <li><strong>1단계 — 채널 유형 선택</strong>: 텍스트 / 공지 / 화상 / 임베드 / QR 확인 <span style="opacity:.7">(QR 확인 = "얼굴 인증 후 등록한 QR 이미지를 확인합니다" · 상세 4-1)</span></li>
            <li><strong>2단계 — 채널 이름 입력</strong> (예: 질문, 3주차-과제)</li>
            <li><strong>카테고리 선택</strong> — 기본값 '채널 (기본)'. 드롭다운 맨 아래 <strong>[+ 새 카테고리 만들기]</strong>로 바로 카테고리를 추가할 수도 있습니다.</li>
            <li>(선택) <strong>비공개 채널 토글</strong> — 켜면 아래에 <strong>멤버·그룹 초대</strong> 선택 영역이 나타납니다.</li>
            <li>(선택, <strong>텍스트만</strong>) <strong>익명 채널 토글</strong></li>
            <li>[채널 만들기] 클릭 → 사이드바에 즉시 생성</li>
          </ol>
          <div class="shot">📸 스크린샷: 카테고리 호버 [채널 만들기] / 1단계 유형 선택 / 2단계 이름·카테고리·비공개·익명</div>
        `,
      },
      {
        id: "s4-3", title: "채널 권한 설정 (공개·비공개·익명)",
        html: `
          <h4>공개 vs 비공개</h4>
          <ul>
            <li><strong>공개 채널</strong>(기본): 공간의 모든 멤버가 볼 수 있음</li>
            <li><strong>비공개 채널</strong>: 생성 시 토글 ON → <strong>선택된 멤버만</strong> 볼 수 있음(🔒)</li>
          </ul>
          <h4>비공개 세부 옵션 (토글 ON 시)</h4>
          <ul>
            <li><strong>멤버·그룹 초대</strong>: 개별 멤버 또는 <strong>그룹(@핸들) 단위</strong> 초대 (예: @5조 → 해당 조원 일괄). 그룹은 <strong>설정 &gt; 그룹</strong>에서 미리 만들어 두세요(5-5).</li>
          </ul>
          <div class="callout callout--warn"><span class="callout__ico">⚠️</span><div><strong>'관리자 자동 접근 허용' 옵션은 현재 채널 만들기 화면에 없습니다.</strong> 비공개를 켰을 때 노출되는 것은 멤버·그룹 초대뿐이니, 강사·보조강사가 봐야 하는 방이라면 <strong>해당 인원을 명시적으로 초대</strong>하거나 역할 그룹을 초대하세요.</div></div>
          <h4>익명 채널 (텍스트 전용)</h4>
          <p>토글 ON → 작성자가 <strong>익명1, 익명2…</strong>로 표시되고 해당 채널의 <strong>멤버 목록·멘션이 비활성화</strong>됩니다. 익명 피드백·고민 상담·건의함에 적합합니다.</p>
          <div class="callout callout--warn"><span class="callout__ico">⚠️</span><div>익명 채널은 제재·책임 확인이 어려우므로 금지 행동 등 <strong>운영 규칙을 사전 안내</strong>하는 것을 권장합니다.</div></div>
          <h4>운영 활용 예시</h4>
          <ul>
            <li>읽기 전용 공지 → 채널 유형 '공지'로 생성</li>
            <li>강사·보조강사 전용 소통방 → 비공개 + 관리자 자동 접근 ON</li>
            <li>팀별 채널 → 비공개 + 해당 팀 그룹만 초대</li>
          </ul>
          <div class="shot">📸 스크린샷: 채널 권한 설정 화면</div>
        `,
      },
      {
        id: "s4-4", title: "채널 정리 (이름 변경·비활성화·삭제)",
        html: `
          <ul>
            <li><strong>비활성화(아카이브)</strong>: 설정(⚙️) &gt; 채널에서 각 채널 [비활성화]. 다시 [활성화] 가능해 삭제와 달리 되돌릴 수 있음 → <strong>기수 종료 시 삭제 대신 비활성화 권장</strong></li>
            <li>설정 &gt; 채널에 <strong>활성 채널 수</strong> 표시(예: 활성 채널 35). '강의 중' 같은 시스템 채널은 [설정]만 가능</li>
            <li>채널 이름 변경·상세 설정: 채널별 [설정]에서</li>
            <li>삭제는 복구가 어려울 수 있으므로 신중히 (11장 FAQ 참고)</li>
          </ul>
          <h4>클래스 통째로 정리하기 — 클래스 보관 🆕</h4>
          <ul>
            <li><strong>설정(⚙️) &gt; 일반</strong> 맨 아래 <strong>[클래스 보관]</strong> — "보관된 클래스는 목록에서 숨겨지고 활동이 중단됩니다. 언제든 해제할 수 있습니다."</li>
            <li>기수가 끝난 클래스는 채널을 하나씩 비활성화하는 대신 <strong>클래스 보관 한 번으로 정리</strong>하는 것을 권장합니다.</li>
          </ul>
          <div class="shot">📸 스크린샷: 설정 &gt; 채널 — 비활성화 버튼</div>
        `,
      },
    ],
  },

  /* ========================= 5 ========================= */
  {
    id: "ch5", num: 5, title: "멤버 & 권한 관리", icon: "👥",
    sections: [
      {
        id: "s5-1", title: "멤버 초대하기 (초대 링크)",
        html: `
          <div class="callout callout--tip"><span class="callout__ico">💡</span><div><strong>수강생도 매니저처럼 내 강의실 → [캠프파이어 입장하기]로 입장하는 것이 기본</strong>입니다. 초대 링크는 멘토 등 내 강의실 경로가 없는 멤버를 초대할 때 쓰는 보조 수단입니다.</div></div>
          <h4>초대 링크 만들기</h4>
          <ol>
            <li>사이드바 좌측 하단 <strong>톱니(⚙️) 설정</strong> → <strong>기본 &gt; 멤버</strong></li>
            <li>초대 링크 영역에서 <strong>역할 선택</strong> (강사 / 보조강사 / 매니저 / 멘토 / 수강생)</li>
            <li><strong>만료일 선택</strong> → [링크 만들기]</li>
            <li>생성된 링크를 <strong>복사해서 공유</strong>하거나, 🆕 <strong>특정 이메일로 바로 발송</strong>할 수도 있습니다. (화면 안내: "링크를 만들어 공유하거나, 만든 링크를 특정 이메일로 보낼 수 있어요.")</li>
          </ol>
          <h4>링크 정책</h4>
          <ul>
            <li>만료일 선택 시 <strong>해당 날짜 23:59:59까지만</strong> 유효</li>
            <li><strong>역할별로 별도 링크</strong>를 만들며, 링크로 입장하면 해당 역할이 자동 부여</li>
            <li>[폐기] 버튼으로 링크 즉시 무효화 가능</li>
          </ul>
          <h4 class="warn-h">⚠️ 초대 관련 예외 케이스</h4>
          <table class="cf-table">
            <thead><tr><th>상황</th><th>영향</th><th>해결 방안</th></tr></thead>
            <tbody>
              <tr><td>만료된 링크로 접속</td><td>입장 불가</td><td>새 링크 생성 후 재공유</td></tr>
              <tr><td>역할 링크 유출 (강사용이 수강생에게)</td><td>수강생이 강사 권한으로 입장하는 권한 사고</td><td>역할별로 분리 공유, 유출 시 즉시 [폐기] 후 재발급, 잘못 입장 시 설정 &gt; 멤버에서 역할 정정</td></tr>
              <tr><td>수강생 대량 초대</td><td>명단 일괄 등록 지원 여부 확인 필요</td><td>수강생용 링크 1개를 전체 공지로 공유 (권장)</td></tr>
            </tbody>
          </table>
          <div class="shot">📸 스크린샷: 설정 &gt; 멤버 &gt; 초대 링크 생성 화면</div>
        `,
      },
      {
        id: "s5-2", title: "역할(Role) 부여하기",
        html: `
          <ul>
            <li>역할 종류(기본 5종): <strong>매니저 / 강사 / 보조강사 / 멘토 / 수강생</strong></li>
            <li>역할 표시 이름은 <strong>설정(⚙️) &gt; 역할</strong>에서 변경 가능 (예: '매니저' → '운영매니저'). 화면 이름이 다르면 대응해 읽으세요.</li>
          </ul>
          <p><strong>역할 부여 방법 3가지</strong></p>
          <ol>
            <li><strong>초대 링크로 자동 부여</strong> (5-1)</li>
            <li><strong>설정 &gt; 멤버에서 직접 변경</strong> — 역할 드롭다운에서 수정(이름·이메일로 검색 가능)</li>
            <li><strong>멤버 목록 케밥(⋮)</strong> — 멤버 호버 → ⋮ &gt; [역할 변경] / [퇴장시키기] (<strong>매니저에게만 노출</strong>)</li>
          </ol>
          <div class="callout callout--info"><span class="callout__ico">ℹ️</span><div><strong>설정 &gt; 멤버</strong> 목록에서는 각 줄 오른쪽에 <strong>역할 버튼</strong>과 <strong>[강퇴]</strong> 버튼이 있습니다. (예전 '내보내기·제거' 라벨이 현재는 <strong>강퇴</strong>로 표기됩니다) 본인 계정에는 '본인' 뱃지가 붙고 버튼이 나타나지 않습니다.</div></div>
          <div class="callout callout--info"><span class="callout__ico">ℹ️</span><div>보조강사·멘토는 수강생과 동일 권한입니다(1장 표 참고). <strong>그룹(@핸들)</strong>은 조별/팀별로 만들어 비공개 채널 초대·멘션에 활용합니다 (예: @1team, @managers).</div></div>
          <div class="shot">📸 스크린샷: 멤버에게 역할 부여하는 화면</div>
        `,
      },
      {
        id: "s5-3", title: "역할 권한 & 표시 설정",
        html: `
          <p><strong>설정(⚙️) &gt; 역할</strong>에서 각 역할의 <strong>표시(명칭·색·아이콘·순서)</strong>와 <strong>클래스 내 권한</strong>을 직접 설정할 수 있습니다. 예전에는 고정이던 역할별 권한을 이제 매니저가 켜고 끌 수 있어요.</p>
          <p><strong>여는 법</strong>: 설정(⚙️) &gt; 역할 → 좌측에서 역할 선택(강사 / 보조강사 / 매니저 / 멘토 / 수강생)</p>
          <h4>표시 설정</h4>
          <ul>
            <li><strong>아이콘·이름·색상</strong> 지정 — 멤버 목록·멘션에 이 색·이름으로 표기됩니다 (예: '매니저' → '운영매니저').</li>
            <li><strong>순서</strong> — 멤버 목록에서 역할이 노출되는 위/아래 순서(∧∨)를 조정합니다.</li>
          </ul>
          <h4>권한 (체크박스 5종)</h4>
          <table class="cf-table">
            <thead><tr><th>권한</th><th>켜면 할 수 있는 일</th></tr></thead>
            <tbody>
              <tr><td><strong>채널 관리</strong></td><td>채널·카테고리를 만들고 편집·정렬하며, 채널 멤버와 메시지 고정을 관리</td></tr>
              <tr><td><strong>공지 게시</strong></td><td>공지 채널(📢)에 글을 게시</td></tr>
              <tr><td><strong>강의 관리</strong></td><td>강의를 열고 닫으며, 참가자 음소거·내보내기·손들기·전체 안내 등 진행 도구 사용</td></tr>
              <tr><td><strong>모니터링 관리</strong></td><td>화면 캡쳐 모니터링과 얼굴 확인(출석) 기록을 확인·관리</td></tr>
              <tr><td><strong>클래스 관리</strong></td><td>클래스 설정, 역할·권한, 멤버, 공지 팝업을 관리</td></tr>
            </tbody>
          </table>
          <p>체크 후 <strong>[저장]</strong>. 원상 복구는 <strong>[표시 기본값으로]</strong> / <strong>[권한 기본값으로]</strong> 버튼으로 되돌립니다. <strong>관리자(ADMIN)</strong>는 이 설정과 무관하게 항상 모든 권한을 가지며, 변경은 <strong>최대 30초 내</strong> 반영됩니다.</p>
          <div class="callout callout--warn"><span class="callout__ico">⚠️</span><div><strong>권한을 잘못 끄면 운영 사고로 이어집니다.</strong><br>• 매니저 역할의 <strong>클래스 관리</strong>를 끄면 → 설정·역할 화면에 다시 못 들어가 스스로 되돌리기 어려워질 수 있습니다. 매니저 권한은 함부로 축소하지 마세요.<br>• 강사에게서 <strong>강의 관리</strong>를 끄면 → 강사가 강의를 열 수 없습니다. 실수했다면 [권한 기본값으로]로 복구하세요.<br>• 변경이 화면에 안 보이면 최대 30초 반영을 기다린 뒤 새로고침하세요.</div></div>
          <div class="shot">📸 스크린샷: 설정 &gt; 역할 — 역할 선택 + 표시/권한 체크박스</div>
        `,
      },
      {
        id: "s5-4", title: "멤버 내보내기 / 차단",
        html: `
          <ul>
            <li><strong>설정 &gt; 멤버</strong>의 내보내기 버튼, 또는 <strong>멤버 목록 케밥(⋮) &gt; [퇴장시키기]</strong></li>
            <li>🚨 <strong>내보낸 멤버는 유효한 초대 링크로 다시 입장할 수 있습니다.</strong> 재입장을 막으려면 반드시 <strong>내보내기 + 해당 역할 링크 [폐기]를 세트로</strong> 처리하세요.</li>
            <li><strong>중도포기자 오프보딩</strong>: 자동 절차 없이 담당 매니저(또는 개발팀)가 수동으로 멤버 삭제</li>
            <li>신고함(8-4)에서 신고된 사용자를 [강퇴]로 내보낼 수 있음</li>
          </ul>
          <div class="callout callout--info"><span class="callout__ico">ℹ️</span><div><strong>차단·신고는 수강생 포함 모든 멤버</strong>가 사용 가능. <strong>차단</strong>은 내게 그 사람 메시지가 안 보이게 하는 개인 차단(강퇴와 별개), <strong>신고</strong>는 사유를 골라 접수하면 매니저 신고함(8-4)으로 전달됩니다.<br>멤버 본인이 차단을 풀고 싶을 땐 <strong>프로필 설정 &gt; 계정 탭 &gt; 차단한 사용자</strong>에서 해제하면 된다고 안내하세요.</div></div>
        `,
      },
      {
        id: "s5-5", title: "그룹(조 편성) 관리 🆕",
        html: `
          <div class="callout callout--tip"><span class="callout__ico">💡</span><div><strong>그룹</strong>은 조·팀 단위 묶음입니다. 한번 만들어 두면 <strong>비공개 채널 일괄 초대</strong>와 <strong>@그룹 멘션</strong>에 계속 쓸 수 있어 조별 운영이 훨씬 편해집니다.</div></div>
          <ul>
            <li>위치: <strong>설정(⚙️) &gt; 기본 &gt; 그룹</strong> — "조 편성을 만들고 관리합니다."</li>
            <li><strong>[그룹 생성]</strong> → <strong>이름</strong>(한글·영문·공백 가능, 최대 40자) + <strong>설명(선택)</strong> 입력 → [생성]</li>
            <li>생성 후 그룹에 멤버를 추가하면, 해당 멤버의 <strong>프로필 카드에 '소속 그룹'으로 표시</strong>됩니다.</li>
          </ul>
          <h4>어디에 쓰이나요</h4>
          <ul>
            <li><strong>비공개 채널 초대</strong>: 채널 만들기 → 비공개 ON → 멤버·그룹 초대에서 그룹을 고르면 일괄 초대 (4-3)</li>
            <li><strong>@그룹 멘션</strong>: 공지·자동 메시지에서 특정 조만 호출 (6-1)</li>
          </ul>
          <div class="callout callout--warn"><span class="callout__ico">⚠️</span><div>그룹명을 나중에 바꾸면 이미 보낸 멘션은 그대로 남아 헷갈릴 수 있습니다. <strong>기수 시작 전에 조 이름 규칙(예: 1조, 2조)을 먼저 정해 두세요.</strong></div></div>
          <div class="shot">📸 스크린샷: 설정 &gt; 그룹 — 그룹 생성 모달</div>
        `,
      },
    ],
  },

  /* ========================= 6 ========================= */
  {
    id: "ch6", num: 6, title: "공지 & 메시지 운영", icon: "📢",
    sections: [
      {
        id: "s6-1", title: "공지 작성 가이드",
        html: `
          <ul>
            <li><strong>공지 채널(📢)은 매니저만 게시</strong>할 수 있는 읽기 전용 채널입니다. 중요 안내는 공지 채널을 기본으로 하세요.</li>
          </ul>
          <p><strong>멘션 사용 기준</strong> — @ 하나로 인원·그룹·역할을 모두 호출합니다.</p>
          <ul>
            <li><strong>@이름</strong> — 특정 인원</li>
            <li><strong>@역할</strong>(@강사·@수강생 등) — 특정 역할 전체</li>
            <li><strong>@그룹</strong>(@1team 등) — 조별/팀별</li>
            <li><strong>@everyone / @채널</strong> — 전체 알림 필수 공지(일정 변경·마감)에만. 남발하면 알림 피로로 중요 공지를 놓칩니다.</li>
          </ul>
          <p>공지 템플릿: 고정 양식은 없으며 매니저 권한으로 자유롭게 작성합니다(팀 내부 양식 통일 가능).</p>
        `,
      },
      {
        id: "s6-2", title: "데일리 팝업 (입장 시 노출 공지)",
        html: `
          <div class="callout callout--tip"><span class="callout__ico">💡</span><div>데일리 팝업은 <strong>매일 첫 접속 시 화면 가운데 떠서 반드시 보게 되는 공지</strong>입니다. 채널 공지는 스크롤로 지나칠 수 있지만 팝업은 놓치기 어려우므로 출석 체크·당일 일정·긴급 공지에 적합합니다.</div></div>
          <ul>
            <li>위치: <strong>설정(⚙️) &gt; 운영 &gt; 데일리 팝업</strong> — 화면 설명: "매일 첫 접속 시 표시되는 팝업을 설정합니다."</li>
            <li><strong>활성화 토글</strong>: 끄면 학생에게 노출되지 않음(작성 중이거나 멈추고 싶을 때 OFF)</li>
            <li>서식: 굵게/기울임/제목 2/글머리 기호/번호 매기기/인용/이미지 추가 — 리치 텍스트 편집기</li>
            <li>작성 후 <strong>[변경사항 저장]</strong>을 누르세요.</li>
            <li>운영 팁: 매일 아침 그날 일정으로 갱신하면 출결·일정 누락을 줄일 수 있음</li>
          </ul>
          <h4 class="warn-h">⚠️ 데일리 팝업 예외 케이스</h4>
          <table class="cf-table">
            <thead><tr><th>상황</th><th>영향</th><th>해결 방안</th></tr></thead>
            <tbody>
              <tr><td>활성화 ON인 채 빈 내용·지난 공지 방치</td><td>입장마다 철 지난/빈 팝업이 떠 피로도·신뢰도 하락</td><td>사용 안 할 땐 OFF, 사용 시 매일 갱신</td></tr>
              <tr><td>하루에 여러 번 공지를 바꾸는 경우</td><td>팝업은 <strong>매일 첫 접속 시 1회</strong>만 뜨므로, 이미 본 사람은 바뀐 내용을 못 볼 수 있음</td><td>당일 중 추가 공지는 공지 채널·@멘션을 병행</td></tr>
            </tbody>
          </table>
          <div class="shot">📸 스크린샷: 데일리 팝업 편집 화면</div>
        `,
      },
      {
        id: "s6-3", title: "메시지 핀 고정 & 스레드",
        html: `
          <h4>핀 고정</h4>
          <ul>
            <li>메시지에 마우스 올림 → <strong>[⋯ 더보기] → 고정</strong></li>
            <li>우측 상단 <strong>📌 아이콘</strong>에서 고정 메시지를 모아볼 수 있음</li>
            <li>활용: 규칙·자료 링크·반복 안내를 고정해 두면 신규 입장자가 바로 확인</li>
          </ul>
          <h4>스레드</h4>
          <ul>
            <li>메시지 호버 → <strong>스레드(💬) 아이콘</strong> → 우측 스레드 패널</li>
            <li>활용: <strong>질문 채널에서 답변을 스레드로 유도</strong>하면 질문-답변이 한 묶음으로 정리</li>
            <li>메시지 [⋯ 더보기]: 텍스트 복사 / 링크 복사 / 고정 / 차단 / 신고 / 삭제</li>
          </ul>
          <div class="shot">📸 스크린샷: 더보기 — 고정 메뉴 + 고정 패널 / 스레드 패널</div>
        `,
      },
      {
        id: "s6-4", title: "1:1 통화 (DM 음성·화상)",
        html: `
          <p><strong>다이렉트 메시지(DM·1:1 대화)에서만</strong> 상대에게 음성·화상 통화를 걸 수 있습니다. (채널에서는 사용 불가, 모든 역할 공통)</p>
          <ol>
            <li>상대와의 <strong>DM 화면 상단, 이름 옆 📞(음성)·📹(화상) 아이콘</strong> 클릭</li>
            <li>확인 다이얼로그에서 <strong>[통화 걸기]</strong> → 상대에게 통화 요청 발송</li>
            <li>상대는 <strong>수신 화면</strong>에서 <strong>수락(초록)/거절(빨강)</strong>을 선택</li>
          </ol>
          <div class="callout callout--tip"><span class="callout__ico">💡</span><div>통화 후 DM에 <strong>'통화 시작/종료'</strong> 기록이 남고, 안 받으면 <strong>'부재중 통화'</strong>로 표시돼요. 수강생 1:1 응대에 활용하세요.</div></div>
          <div class="shot">📸 스크린샷: DM 1:1 통화 (걸기 · 다이얼로그 · 수신)</div>
        `,
      },
    ],
  },

  /* ========================= 7 ========================= */
  {
    id: "ch7", num: 7, title: "화상 세션 운영", icon: "🎥",
    sections: [
      {
        id: "s7-0", title: "두 종류의 화상",
        html: `
          <div class="callout callout--tip"><span class="callout__ico">💡</span><div>캠프파이어 화상은 두 종류입니다: 사이드바 최상단의 <strong>[강의] 카드</strong>(정식 강의)와 채널 목록의 <strong>🎤 화상 채널</strong>(팀별 회의·자율 모임). <strong>녹화·AI 요약은 정식 강의에서만</strong> 이루어집니다.</div></div>
        `,
      },
      {
        id: "s7-1", title: "권한 범위",
        html: `
          <ul>
            <li><strong>강의를 열 수 있는 권한은 매니저와 강사뿐</strong>입니다. 보조강사·멘토·수강생은 열 수 없고, [강의 열기 및 참여] 화면 자체가 매니저·강사에게만 보입니다.</li>
            <li>수강생은 강사·매니저가 강의를 연 뒤 참여만 가능합니다.</li>
          </ul>
        `,
      },
      {
        id: "s7-2", title: "강의 열기 (정식 강의)",
        html: `
          <ol>
            <li>사이드바 최상단 <strong>[강의] 카드 &gt; [열기]</strong> → '강의를 열고 참여합니다' 화면이 뜨고 카메라 미리보기가 표시됩니다.</li>
            <li>[강의 열기 및 참여] 클릭 → 시작. <strong>강의를 여는 사람은 마이크·카메라가 모두 꺼진 상태</strong>로 입장되니 직접 켜세요.<br>⚠️ <strong>이미 열린 강의에 참여하는 쪽(수강생 포함)은 다릅니다</strong> — “강의 세션에 참여하시겠습니까?” 화면에 <strong>“카메라는 켜진 상태, 마이크는 꺼진 상태로 입장합니다”</strong>가 표시되고, 입장 후 사용할 장치도 미리 고를 수 있습니다.</li>
            <li>⚠️ <strong>이 대기 화면에는 장치 선택 드롭다운이 없습니다.</strong> 카메라·마이크 변경은 강의에 들어간 뒤 <strong>하단 🎤·📹 버튼 옆 ∨</strong> 또는 <strong>⋯ 더보기 &gt; 설정</strong>에서 합니다.</li>
            <li>강의 화면 오른쪽에 <strong>강의 채팅 패널</strong>이 함께 열립니다. 매니저는 여기서 <strong>[강의 채팅 전체 삭제]</strong>도 할 수 있습니다.</li>
          </ol>
          <div class="callout callout--info"><span class="callout__ico">🎥</span><div>별도 설정 없이 <strong>모든 정식 강의는 자동으로 녹화</strong>되고 <strong>AI 요약·STT</strong>까지 생성됩니다.</div></div>
          <p>강의가 시작·종료되면 <strong>강의 봇</strong>이 <strong># 강의 채팅</strong> 채널에 <code>🎬 강의가 시작되었습니다</code> / <code>🛑 강의가 종료되었습니다</code>를 날짜별로 자동 게시합니다. (채널명은 클래스마다 다를 수 있습니다)</p>
          <div class="shot">📸 스크린샷: 강의 열기 및 참여 화면</div>
          <div class="shot">📸 스크린샷: 강의 입장 화면 2종 (여는 경우 / 참여하는 경우)</div>
        `,
      },
      {
        id: "s7-5", title: "강의 호출 (미입장자 알림)",
        html: `
          <p>수업이 시작됐는데 <strong>아직 강의실에 들어오지 않은 수강생</strong>에게 입장 알림을 보낼 수 있습니다. (매니저·강사 가능)</p>
          <ol>
            <li>강의 화면 하단 <strong>[더보기(⋯)] → [강의 호출]</strong> <span style="opacity:.7">(예전 명칭 '수강생 호출'에서 변경)</span></li>
            <li>호출 메시지 작성 — 기본 문구("수업이 곳 시작됩니다. 강의실로 들어와 주세요! 🔔")가 채워져 있습니다 → <strong>[발송]</strong></li>
            <li>⚠️ 화면 안내 그대로 <strong>"강의에 아직 들어오지 않은 모든 멤버"</strong>에게 전송됩니다. 수강생만 골라 보내는 옵션은 없으니, 운영진·강사진이 많은 클래스에서는 남발하지 마세요.</li>
          </ol>
          <div class="callout callout--tip"><span class="callout__ico">💡</span><div>수강생은 <strong>'강의 초대' 알림 + [입장하기] 버튼</strong>을 받고, 버튼을 누르면 <strong>바로 강의실로 입장</strong>합니다.<br>🚨 단, 수강생이 <strong>프로필 설정 &gt; 알림 &gt; 클래스별 알림에서 해당 클래스를 '끄기'로 해둔 경우 호출 알림이 가지 않습니다.</strong> 상습적 미입장자가 있다면 이 설정부터 확인시키세요(2-4).</div></div>
          <div class="shot">📸 스크린샷: 더보기 &gt; 강의 호출 → 메시지 작성·발송</div>
        `,
      },
      {
        id: "s7-3", title: "녹화 다시 보기",
        html: `
          <ul>
            <li><strong>모든 정식 강의는 자동으로 녹화</strong>됩니다. (예전 'AI 요약 활성화' 토글은 없어졌고, 별도 설정이 필요 없습니다)</li>
            <li>⚠️ <strong>녹화를 보는 곳이 이동했습니다</strong>: 사이드바 맨 아래 <strong>🖥️ [클래스 모니터링] &gt; [녹화] 탭</strong> (예전 안내: '사이드바 [강의] 영역 &gt; 녹화 탭')</li>
            <li>목록 컬럼: <strong>시작 시각 · 상태 · 재생시간 · 크기 · 재생/다운로드</strong>. 진행 중인 강의는 '녹화 중 · 준비 중'으로 표시됩니다.</li>
          </ul>
          <div class="callout callout--warn"><span class="callout__ico">⚠️</span><div>모든 강의가 자동으로 녹화됩니다. 개인정보·민감 발언이 남을 수 있으니 <strong>수강생에게 녹화 사실을 미리 고지</strong>하고, 다운로드한 영상의 외부 공유는 주의하세요.</div></div>
          <div class="shot">📸 스크린샷: 클래스 모니터링 &gt; 녹화 탭 목록</div>
        `,
      },
      {
        id: "s7-4", title: "참가자(멤버) 관리 & 이해도 확인",
        html: `
          <h4>강의 안에서 쓰는 호스트 도구 (하단 ⋯ 더보기)</h4>
          <ul>
            <li><strong>그리드 보기 / 조감 모드(7×7 · 최대 49명)</strong> — 화면 배치 전환</li>
            <li><strong>참가자 패널</strong> — <strong>참가자 (N)</strong> 과 <strong>미참가 (N)</strong> 으로 나뉘어 역할·연결 상태까지 표시</li>
            <li><strong>출입 기록</strong> — 기간·이름 검색, <strong>시간순 / 사람별</strong> 정렬, <strong>고유 N명 · 현재 입장 N명 · 카메라 N명 / 시청 N명</strong> 집계</li>
            <li><strong>설정</strong> — 카메라 / 배경 효과 / 마이크 / 스피커 (장치 변경은 여기서)<br>└ <strong>카메라</strong> 탭에 <strong>내 화면 얼굴 표시</strong>(PiP에 얼굴 감지 박스 표시)와 <strong>저사양 모드</strong>가 있습니다.<br>└ <strong>저사양 모드</strong>는 “참가자 영상을 저화질·저프레임으로 받아 기기 부하를 줄입니다. 얼굴은 계속 보이고, 화면공유·오디오는 원래 품질 그대로예요.” — <strong>받는 쪽에만 적용되는 개인 설정</strong>이라 다른 참가자 화면에는 영향이 없습니다.</li>
            <li><strong>강의 호출</strong> (7-3) · <strong>전체 음소거</strong> · <strong>참여자 모두 퇴장</strong> · <strong>강의 종료하기</strong></li>
          </ul>
          <div class="callout callout--info"><span class="callout__ico">ℹ️</span><div><strong>세션 내 실시간 제어는 제공됩니다</strong> — [전체 음소거]와 [참여자 모두 퇴장]이 더보기 메뉴에 있습니다. 다만 <strong>역할 변경·영구 내보내기</strong>는 강의 화면이 아니라 <strong>설정(⚙️) &gt; 기본 &gt; 멤버</strong>에서 처리합니다(5-2).</div></div>
          <div class="callout callout--warn"><span class="callout__ico">⚠️</span><div><strong>[강의 종료하기]</strong>를 누르면 “강의를 종료하시겠습니까? 모든 참가자의 연결이 종료됩니다.” 확인창이 뜨고, 확인 시 <strong>전원이 강의실에서 나가게 됩니다.</strong><br>🚨 <strong>[퇴장]도 안전하지 않습니다.</strong> 내가 <strong>마지막 남은 강사·매니저</strong>라면 퇴장 시 “현재 참여 중인 유일한 강사입니다. 나가면 강의가 자동 종료됩니다.” 확인창이 뜨고, <strong>나가는 순간 강의가 종료</strong>됩니다. 수업을 계속 두려면 <strong>다른 강사·매니저가 들어온 뒤에</strong> 나가세요.</div></div>
          <h4>이해도 확인 (이해 확인 버튼)</h4>
          <ul>
            <li>강의 하단 <strong>👍 [이해 확인]</strong> → 수강생 화면에 '👍 이해 / 🤔 어려움' 선택지가 뜹니다. (강사·매니저 모두 사용)</li>
            <li>진행 중에는 화면에 <strong>이해 N · 어려움 N · 응답 N명</strong>이 실시간 집계되고, 버튼이 <strong>[이해도 체크 종료]</strong>로 바뀝니다.</li>
            <li>'어려움'이 많으면 보충 설명·속도 조절 신호로 활용하세요.</li>
          </ul>
          <div class="shot">📸 스크린샷: 강의 더보기 메뉴 + 참가자 패널 / 이해도 체크 진행 화면</div>
          <div class="shot">📸 스크린샷: 더보기 &gt; 설정 &gt; 카메라 &gt; 저사양 모드</div>
        `,
      },
    ],
  },

  /* ========================= 8 ========================= */
  {
    id: "ch8", num: 8, title: "운영 팁 모음", icon: "🧰",
    sections: [
      {
        id: "s8-1", title: "기수 운영 체크리스트",
        html: `
          <ul>
            <li>기수 시작 D-7 체크리스트 (채널 세팅, 초대 링크, 공지 예약 등)</li>
            <li>첫날 OT 때 수강생에게 안내할 것들</li>
            <li>주차별 반복 업무 <em>(작성 필요)</em></li>
          </ul>
        `,
      },
      {
        id: "s8-2", title: "자동 메시지 (예약 발송)",
        html: `
          <div class="callout callout--tip"><span class="callout__ico">💡</span><div>정해진 시각에 봇이 자동으로 메시지를 보내는 기능. 매일 반복되는 안내(출석 독려, 점심 메뉴, 일일 회고 리마인드)를 직접 보내지 않아도 됩니다.</div></div>
          <ul>
            <li>위치: <strong>설정(⚙️) &gt; 운영 &gt; 자동 메시지</strong></li>
            <li><strong>봇 이름</strong>: 자동 메시지를 보내는 봇의 표시 이름 (예: 알림봇, ☁️구름봇☁️). 변경 후 [저장]</li>
            <li>메시지 추가: <strong>[추가]</strong> → 활성화 토글 · <strong>채널</strong> · <strong>스케줄(매일 / 특정 요일)</strong> · <strong>시간(KST)</strong> · 메시지 (예: #일반 · 매일 12:40 "점심메뉴 골라두세요~!")</li>
            <li>메시지 안에서 <strong>@역할 · @all · #채널 링크</strong>를 그대로 쓸 수 있습니다.</li>
            <li>목록은 <strong>채널별로 묶여</strong> 표시되고, 각 항목에 <strong>활성/비활성 토글 · 반복 주기 · [편집] · [삭제] · 다음 발송 시각</strong>이 나옵니다.</li>
            <li>🆕 상단에 <strong>사용량(예: 20/100)</strong>과 <strong>[전체 켜기] / [전체 끄기]</strong> 버튼이 있습니다. <strong>한 클래스당 최대 100개</strong>까지 등록할 수 있습니다.</li>
          </ul>
          <div class="callout callout--warn"><span class="callout__ico">⚠️</span><div>기수 종료·방학 기간에는 <strong>[전체 끄기]</strong>로 한 번에 멈추세요. 개별로 끄다 보면 꼭 하나씩 남아 빈 클래스에 알림이 계속 갑니다.</div></div>
          <div class="shot">📸 스크린샷: 설정 &gt; 자동 메시지 화면</div>
        `,
      },
      {
        id: "s8-3", title: "연동 봇 (웹훅)",
        html: `
          <div class="callout callout--tip"><span class="callout__ico">💡</span><div>외부 시스템(n8n·자체 서버 등)이 캠프파이어 채널로 메시지를 자동 게시하게 하는 기능. 위의 자동 메시지 봇과는 별개입니다.</div></div>
          <ul>
            <li>⚠️ <strong>위치가 바뀌었습니다</strong>: 예전 '설정 &gt; 자동 메시지 안의 연동 봇' → 현재는 <strong>설정(⚙️) &gt; 운영 &gt; 연동</strong>으로 독립한 메뉴입니다.</li>
            <li>봇 이름을 입력하고 <strong>[봇 추가]</strong> → 봇마다 이름·API 키·<strong>대상 채널</strong>을 따로 지정합니다. (채널은 나중에 지정해도 됩니다)</li>
            <li>외부에서 <code>/api/v1/bot/send</code>로 게시할 때 사용하며, <strong>x-api-key</strong> 헤더로 인증합니다. [키 재발급]으로 재발급 가능.</li>
            <li>🆕 <strong>Slack Incoming Webhook 호환</strong> — GitHub·Sentry 등 외부 서비스의 <strong>'Slack Incoming Webhook URL'</strong> 칸에 각 봇의 Webhook URL을 그대로 붙여넣으면 대상 채널로 메시지가 게시됩니다. <strong>별도 개발 없이 외부 알림을 연결</strong>할 수 있어요.</li>
          </ul>
          <div class="callout callout--warn"><span class="callout__ico">⚠️</span><div>키는 발급 후 값이 다시 표시되지 않으므로 발급 즉시 안전한 곳에 보관하세요. 유출 의심 시 [키 재발급]으로 기존 키 무효화.</div></div>
        `,
      },
      {
        id: "s8-4", title: "신고함 & 기타",
        html: `
          <ul>
            <li><strong>신고함</strong>(설정 &gt; 신고함): 멤버가 신고한 건을 처리. <strong>신고는 수강생 포함 모든 멤버</strong>가 메시지 [⋯ 더보기 &gt; 신고] 또는 멤버 케밥(⋮) &gt; 신고에서 <strong>사유(스팸/괴롭힘/부적절한 콘텐츠/기타) + 상세</strong>로 접수. 매니저는 건마다 사유·신고자·시각을 확인하고 <strong>[메시지 삭제] / [강퇴] / [처리완료] / [기각]</strong> 중 선택</li>
          </ul>
          <h4>활동·데이터 메뉴 3종 🆕</h4>
          <p><strong>설정(⚙️) &gt; 활동·데이터</strong> 아래에 세 가지가 있습니다.</p>
          <table class="cf-table">
            <thead><tr><th>메뉴</th><th>무엇을 보나</th><th>언제 쓰나</th></tr></thead>
            <tbody>
              <tr><td><strong>수강생 현황</strong></td><td>멤버별 <strong>상태(온라인·자리비움·오프라인) · 현재 위치(강의실·채널명) · 오늘 누적 · 마지막 활동</strong>. 상단에 상태별 인원 수</td><td>수업 중 <strong>지금 누가 어디 있나</strong>를 바로 확인할 때</td></tr>
              <tr><td><strong>활동 리포트</strong></td><td><strong>AI 학습 케어</strong>(케어 권장 대상·근거·제안) / 기간 필터(7일·30일·사용자 정의) / <strong>CSV 다운로드</strong> / 일별 활동 추이 / 요일×시간대 히트맵 / 멤버별 타임라인 / 유형별 누적 시간 / 인기 채널 Top 8 / 멤버별 상세표(채팅·메시지·비디오·출석률)</td><td>주간·월간 운영 리포트, <strong>이탈 위험군 조기 발견</strong></td></tr>
              <tr><td><strong>멤버 진단</strong></td><td>로그 기반 이용 문제 자동 감지 — <strong>캡쳐 실패 · 화질 저하 · 카메라 점유 · 마이크 무음</strong>. 최근 48시간/7일 필터, '지금도 발생 중' 표시, 멤버 검색</td><td>"카메라가 안 돼요" 문의가 왔을 때 <strong>증거로 확인</strong></td></tr>
            </tbody>
          </table>
          <div class="callout callout--tip"><span class="callout__ico">💡</span><div><strong>멤버 진단</strong>을 먼저 보면 1차 대응이 빨라집니다. 예를 들어 '카메라 점유'가 잡혔다면 수강생이 Zoom 등 다른 앱에서 카메라를 쓰고 있다는 뜻입니다.</div></div>
          <div class="callout callout--warn"><span class="callout__ico">🔐</span><div>세 메뉴 모두 <strong>수강생 실명·이메일·활동 기록</strong>이 드러나는 화면입니다. 화면 공유·회의실 화면에 띄울 때 주의하고, CSV는 내부 용도로만 사용하세요.</div></div>
        `,
      },
      {
        id: "s8-5", title: "클래스 기본 설정 (설정 > 일반)",
        html: `
          <p>위치: <strong>설정(⚙️) &gt; 기본 &gt; 일반</strong> — 화면 설명: "클래스 이름·소개·배너와 캡쳐 스케줄을 관리합니다."</p>
          <ul>
            <li><strong>클래스 이름 · 설명(선택)</strong></li>
            <li><strong>홈페이지 URL(선택)</strong>: 사이드바 <strong>집(🏠) 아이콘</strong>이 새 창으로 여는 주소. 예: https://bootcamp.likelion.net/my/courses/detail/…</li>
            <li><strong>배너</strong>: 사이드바 상단에 표시되는 이미지. [이미지 업로드], JPG·PNG·WEBP · 최대 2MB · 가로형 2:1 권장(예: 1200×600)</li>
            <li>같은 화면 아래쪽에 <strong>카메라 자동 캡쳐</strong> 설정이 이어집니다 (8-6).</li>
            <li>변경 후 반드시 <strong>[변경사항 저장]</strong>을 누르세요.</li>
            <li>🆕 맨 아래 <strong>[클래스 보관]</strong> — 보관한 클래스는 목록에서 숨겨지고 활동이 중단됩니다. 언제든 해제 가능 (4-4)</li>
          </ul>
          <div class="shot">📸 스크린샷: 설정 &gt; 일반 — 기본 정보·홈페이지 URL·배너</div>
        `,
      },
      {
        id: "s8-6", title: "카메라 자동 캡쳐 (출석 확인)",
        html: `
          <div class="callout callout--tip"><span class="callout__ico">💡</span><div>수업 시간대에 수강생 카메라 화면을 자동 캡쳐해 출석을 확인하는 기능. ⚠️ <strong>결과를 보는 곳이 바뀌었습니다</strong> — 사이드바 맨 아래 <strong>🖥️ [클래스 모니터링] &gt; [캡쳐 모니터링] 탭</strong>에서 수강생별 격자로 확인합니다 (9장).</div></div>
          <ul>
            <li>위치: 설정(⚙️) &gt; 기본 &gt; 일반 &gt; <strong>카메라 자동 캡쳐</strong> — [이 클래스에서 카메라 자동 시작·출석 캡쳐 사용] 토글</li>
            <li>동작: <strong>10분마다(정각 기준)</strong> 입장 중인 수강생 기기로 캡쳐 요청을 보냅니다. 촬영 시각은 정각과 다를 수 있지만 <strong>출석은 10분 슬롯 기준으로 집계</strong>되어 정상 반영됩니다.</li>
            <li><strong>캡쳐 규칙</strong>: 요일 + 시간대(시작~종료)로 지정, [+시간대 추가]로 여러 시간대 구성. 규칙이 없으면 캡쳐하지 않음</li>
            <li><strong>공휴일 제외</strong>(한국 공휴일 자동) 체크 가능</li>
            <li><strong>캡쳐 제외일</strong>: 특정 날짜를 '종일' 또는 '시간 설정'으로 제외(개강일·휴강일·행사 등)</li>
            <li>🆕 <strong>카메라 OFF 목록을 봇으로 받기</strong> — 캡쳐 시각마다 '스킵·무응답' 수강생 명단을 봇이 지정 채널에 올려줍니다. 전원 캡쳐되면 보내지 않아요.<br><strong>🚨 명단이 채널에 공개되므로 반드시 비공개 채널(예: 🔒 모니터링)을 지정하세요.</strong></li>
            <li>🆕 <strong>얼굴 미감지 블러</strong> — 얼굴이 10초 이상 보이지 않으면 참가자 화면을 자동으로 흐리게 처리합니다. <strong>캡쳐에도 흐린 화면이 저장</strong>됩니다.</li>
            <li>캡쳐 상태: <strong>캡쳐</strong>(정상) / <strong>스킵</strong>(카메라 꺼짐) / <strong>무응답</strong>(앱 미접속·오프라인). 얼굴 인식 결과는 <strong>인식률(%) · 미인식 · 정적 프레임 · 📷 카메라 꺼짐</strong>으로 구분 표시됩니다.</li>
          </ul>
          <h4 class="warn-h">⚠️ 카메라 캡쳐 예외 케이스</h4>
          <table class="cf-table">
            <thead><tr><th>상황</th><th>영향</th><th>해결 방안</th></tr></thead>
            <tbody>
              <tr><td>수강생 카메라 OFF 또는 미입장</td><td>'스킵·무응답'으로 기록되어 출석 누락 오해</td><td>수강생은 <strong>카메라가 켜진 채로 입장</strong>하지만 본인이 끄면 '스킵'으로 남습니다. 카메라를 끄지 말라고 안내하고(배경이 신경 쓰이면 <strong>배경 효과</strong> 사용), 캡쳐 시간대도 사전 공지하세요. <strong>카메라 OFF 봇 알림</strong>을 켜면 실시간 대응 가능 <strong>카메라 OFF 봇 알림</strong>을 켜면 실시간 대응 가능</td></tr>
              <tr><td>캡쳐 규칙 미설정</td><td>캡쳐가 전혀 안 됨</td><td>운영 시간대 규칙을 먼저 등록</td></tr>
              <tr><td>공휴일·휴강일 불필요 캡쳐</td><td>수강생 혼선·불필요 데이터 적재</td><td>공휴일 제외 체크 + 제외일 추가</td></tr>
            </tbody>
          </table>
          <div class="shot">📸 스크린샷: 설정 &gt; 일반 — 카메라 자동 캡쳐 규칙·제외일·봇 알림·얼굴 블러</div>
        `,
      },
    ],
  },

  /* ========================= 9 ========================= */
  {
    id: "ch9", num: 9, title: "클래스 모니터링", icon: "🖥️",
    sections: [
      {
        id: "s9-0", title: "어디서 여나요",
        html: `
          <div class="callout callout--tip"><span class="callout__ico">💡</span><div>사이드바 <strong>맨 아래 프로필 오른쪽 🖥️ 아이콘</strong>이 <strong>클래스 모니터링</strong>입니다. 그 옆 ⚙️ 는 설정이라 서로 다릅니다. 예전에 여러 곳에 흩어져 있던 <strong>출석 캡쳐 · 녹화 · QR 기록</strong>이 전부 이 화면으로 모였습니다.</div></div>
          <p>탭은 4개입니다.</p>
          <table class="cf-table">
            <thead><tr><th>탭</th><th>내용</th><th>예전 위치</th></tr></thead>
            <tbody>
              <tr><td><strong>캡쳐 모니터링</strong></td><td>10분 슬롯별 수강생 카메라 캡쳐 격자</td><td>상단 [캡쳐 모니터링] 탭</td></tr>
              <tr><td><strong>녹화</strong></td><td>정식 강의 녹화 목록·재생·다운로드</td><td>사이드바 [강의] 영역 &gt; 녹화 탭</td></tr>
              <tr><td><strong>모니터 클립</strong> 🆕</td><td>날짜별 모니터 클립 모아보기</td><td>신규</td></tr>
              <tr><td><strong>QR 조회</strong></td><td>수강생 QR 인증 기록(사진·사유·시각)</td><td>QR 채널 하단 [모니터링] 버튼</td></tr>
            </tbody>
          </table>
          <div class="callout callout--warn"><span class="callout__ico">🔐</span><div>이 화면은 <strong>수강생 얼굴 사진과 실명</strong>이 그대로 보입니다. <strong>모니터링 관리 권한</strong>이 있는 역할만 열 수 있으며(5-3), 화면 공유·외부 공유는 금지입니다.</div></div>
        `,
      },
      {
        id: "s9-1", title: "캡쳐 모니터링 (출석 확인)",
        html: `
          <ol>
            <li>상단에서 <strong>날짜</strong>를 고릅니다.</li>
            <li>필터: <strong>시간대 · 학생 · 이미지 크기(작게·보통·크게) · 사용자명 검색(스페이스로 여러 명) · 전체 시간 · 전체 역할 · ☑ 얼굴 미인식만</strong></li>
            <li>결과는 <strong>10분 슬롯별</strong>로 묶여 있고, 슬롯 제목에 <strong>캡쳐 N / 스킵 N / 무응답 N</strong>이 표시됩니다. [모두 펴기]·[모두 접기]로 한 번에 조작할 수 있어요.</li>
            <li>슬롯마다 <strong>[파일로 다운로드]</strong> 링크가 있어 증빙 저장이 가능합니다.</li>
          </ol>
          <h4>상태 읽는 법</h4>
          <ul>
            <li><strong>인식률 (예: 92%)</strong> — 얼굴이 정상 인식된 캡쳐</li>
            <li><strong>미인식</strong> — 캡쳐는 됐지만 얼굴을 못 찾음 (조명·각도·마스크 등)</li>
            <li><strong>정적 프레임</strong> — 화면이 멈춘 듯한 이미지(사진·정지화면 의심)</li>
            <li><strong>📷 카메라 꺼짐 / 스킵</strong> — 카메라를 끈 상태</li>
            <li><strong>무응답</strong> — 앱 미접속·오프라인 등으로 응답이 없음</li>
          </ul>
          <div class="callout callout--tip"><span class="callout__ico">💡</span><div>촬영 시각이 정각과 다를 수 있습니다(예: 18:01:28). 네트워크·업로드 지연이나, 끊겼다 재접속한 기기의 보강 캡쳐 때문인데 <strong>출석 집계는 10분 슬롯(정각) 기준</strong>이라 정상 반영됩니다. 수강생 문의 시 이 문장 그대로 안내하세요.</div></div>
          <div class="shot">📸 스크린샷: 클래스 모니터링 &gt; 캡쳐 모니터링 (슬롯별 캡쳐/스킵/무응답)</div>
        `,
      },
      {
        id: "s9-2", title: "녹화 · 모니터 클립 · QR 조회",
        html: `
          <h4>녹화</h4>
          <ul>
            <li>정식 강의 녹화 목록. <strong>시작 시각 · 상태 · 재생시간 · 크기 · 재생/다운로드</strong></li>
            <li>진행 중인 강의는 <strong>녹화 중 · 준비 중</strong>으로 표시되고, 종료 후 <strong>완료</strong>로 바뀝니다.</li>
            <li>강사님이 녹화를 찾으면 이 경로를 안내하세요 (7-3).</li>
          </ul>
          <h4>모니터 클립 🆕</h4>
          <ul>
            <li>날짜를 고르면 그날의 <strong>캡쳐 N · 카메라꺼짐 N</strong> 수와 클립이 모여 보입니다. 크기(작게·보통·크게) 조절 가능.</li>
            <li>해당 날짜에 자료가 없으면 “이 날짜에 캡쳐된 모니터 클립이 없습니다”로 표시됩니다.</li>
          </ul>
          <h4>QR 조회</h4>
          <ul>
            <li>날짜 + <strong>채널</strong>(전체 / 특정 QR 채널)로 필터링합니다.</li>
            <li>표 구성: <strong>사진 · 사용자 · 채널 · 사유 · 시각</strong> — 사진을 클릭하면 크게 볼 수 있습니다.</li>
            <li>수강생이 스스로 발급한 조퇴·외출 기록을 <strong>본인 확인용</strong>으로 검증하는 용도입니다 (4-1).</li>
          </ul>
          <div class="shot">📸 스크린샷: 클래스 모니터링 &gt; 녹화 탭 / QR 조회 탭</div>
        `,
      },
    ],
  },

  /* ========================= 9 ========================= */
  {
    id: "ch10", num: 10, title: "트러블슈팅 (1차 대응)", icon: "🩹",
    sections: [
      {
        id: "s10-1", title: "증상별 1차 대응표",
        html: `
          <div class="callout callout--tip"><span class="callout__ico">🌐</span><div><strong>1순위 점검</strong> — 화상·입장·장치 문제는 먼저 <strong>PC Chrome 최신 버전</strong>인지 확인하세요. (수강생이 인앱 브라우저로 열었는지도 확인)</div></div>
          <table class="cf-table">
            <thead><tr><th>증상</th><th>원인 후보</th><th>해결 방법</th></tr></thead>
            <tbody>
              <tr><td>수강생이 입장을 못 해요</td><td>① 어드민 훈련생 등록 누락(입장 버튼 미노출) ② 초대 링크 만료</td><td>① 어드민에서 훈련생 등록 확인 ② 설정 &gt; 멤버에서 새 초대 링크 생성 후 재공유</td></tr>
              <tr><td>마이크/카메라가 안 돼요</td><td>① 브라우저 권한 차단 ② 잘못된 장치 선택 ③ 다른 앱이 점유</td><td>① Chrome 자물쇠 &gt; 카메라·마이크 [허용] ② <strong>강의 안</strong> 하단 🎤·📹 옆 ∨ 또는 [더보기 &gt; 설정]에서 장치 재선택(대기 화면에는 장치 드롭다운이 없습니다) ③ Zoom 등 종료 후 재시도 (마이크는 꺼진 상태로 입장되므로 세션 안에서 켜기)<br>④ 반복되면 <strong>설정 &gt; 멤버 진단</strong>에서 해당 멤버의 카메라 점유·캡쳐 실패 기록 확인 (8-4)</td></tr>
              <tr><td>메시지가 안 보내져요</td><td>① 공지 채널(📢)은 매니저만 게시 ② 비공개 채널 미초대 ③ 네트워크 끊김</td><td>① 공지 채널이면 정상(읽기 전용) ② 일반 채널이면 초대 여부 확인 ③ 새로고침·재접속</td></tr>
              <tr><td>강의(화상)가 안 보여요 / 안 열려요</td><td>강의 열기 권한은 매니저·강사만 — 수강생·보조강사·멘토 불가, 강사가 열기 전이면 참여 불가</td><td>강사·매니저가 [강의] 카드에서 먼저 강의를 열어야 함 (7장). 강사에게 카드가 안 보이면 <strong>설정 &gt; 역할 &gt; 강의 관리</strong> 권한이 꺼져 있는지 확인 (5-3)</td></tr>
              <tr><td>수강생이 강의 호출·멘션 알림을 못 받아요</td><td>본인 <strong>클래스별 알림</strong>이 “끄기”로 되어 있음</td><td>프로필 설정 &gt; 알림 &gt; <strong>클래스별 알림</strong>에서 해당 클래스를 “기본값”으로 되돌리게 안내 (2-4)</td></tr>
              <tr><td>수강생이 “강의가 버벅여요 / 팬이 심해요”</td><td>수강생 기기 사양 부족, 참가자 수가 많아 수신 영상이 과다</td><td>강의 안 <strong>⋯ 더보기 &gt; 설정 &gt; 카메라 &gt; 저사양 모드</strong>를 켜라고 안내하세요. 참가자 영상만 저화질로 받아 부하가 크게 줄고, 화면 공유·오디오 품질과 출석 캡쳐에는 영향이 없습니다. (조감 모드로 49명을 한 화면에 띄우는 상황에서 특히 효과적)</td></tr>
              <tr><td>출석 캡쳐가 계속 “무응답”이에요</td><td>앱 미접속·오프라인, 캡쳐 규칙 시간대 밖, 카메라 권한 거부</td><td>클래스 모니터링 &gt; 캡쳐 모니터링에서 슬롯별 상태 확인 후 설정 &gt; 일반의 캡쳐 규칙·제외일 점검 (8-6 · 9-1)</td></tr>
            </tbody>
          </table>
          <div class="callout callout--info"><span class="callout__ico">ℹ️</span><div><strong>에스컬레이션</strong>: 1차 매니저(이 문서의 1차 대응) → 해결 안 되면 담당 매니저가 개발팀에 직접 제보 (별도 채널 없음). 시스템 장애는 증상·시각·영향 범위를 정리해 바로 2차로 전달하면 빠릅니다.</div></div>
        `,
      },
    ],
  },

  /* ========================= 10 ========================= */
  {
    id: "ch11", num: 11, title: "FAQ", icon: "❓",
    sections: [
      {
        id: "s11-1", title: "자주 묻는 질문",
        html: `
          <details class="faq"><summary>Q. 채널을 잘못 삭제했어요. 복구할 수 있나요?</summary><div>채널 삭제 복구 기능 제공 여부는 확인 중입니다. 삭제된 메시지는 복구가 어려울 수 있으므로, 삭제 전 중요 내용은 백업하고 <strong>[보관·이름 변경]으로 먼저 처리한 뒤 정말 필요할 때만 삭제</strong>하는 것을 권장합니다. (정확한 복구 여부는 추후 업데이트)</div></details>
          <details class="faq"><summary>Q. 수강생이 다른 기수 채널을 볼 수 있나요?</summary><div>없습니다. 클래스는 <strong>훈련(기수)별로 각각 분리</strong>되며, 수강생은 본인이 등록·초대된 클래스에만 입장합니다. (매니저·강사가 여러 훈련을 담당할 때만 클래스를 전환해 이동)</div></details>
          <details class="faq"><summary>Q. 녹화 영상은 어디에서 보나요?</summary><div><strong>모든 정식 강의는 자동으로 녹화</strong>됩니다. (예전 'AI 요약 활성화' 설정은 없어졌습니다) 저장된 녹화는 <strong>사이드바 맨 아래 🖥️ [클래스 모니터링] &gt; [녹화] 탭</strong>에서 재생·다운로드합니다. 예전에 안내되던 '[강의] 영역 &gt; 녹화 탭'에서 위치가 바뀌었으니 강사님께도 안내해 주세요. (9장 참고)</div></details>
        `,
      },
    ],
  },
];
