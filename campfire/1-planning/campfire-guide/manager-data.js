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
          <div class="callout callout--tip"><span class="callout__ico">💡</span><div><strong>한 줄 요약</strong><br>강의(화상) · 채널(채팅) · 운영 도구가 한 공간에 모여 있고, 훈련(기수)별로 공간이 따로 생성됩니다.</div></div>
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
            <li>캠프파이어 공간은 어드민에서 <strong>훈련을 생성할 때 자동으로 함께 생성</strong>됩니다.</li>
            <li>매니저의 입장 권한은 어드민의 <strong>매니저 등록</strong>으로 부여됩니다.</li>
            <li>입장 경로는 <strong>내 강의실 → [캠프파이어 입장하기] 버튼</strong>이 기본입니다 (토큰 자동 인증).</li>
            <li><strong>최초 입장 시 비밀번호 설정 화면</strong>이 나오며, 여기서 정한 비밀번호로 <strong>데스크톱 앱·PC(웹)·모바일 앱에서 동일 계정 로그인</strong>이 가능합니다. <strong>모바일 앱이 출시</strong>되어 App Store·Google Play에서 설치할 수 있어요.</li>
            <li>여러 훈련을 담당하면 훈련별로 공간이 각각 생성되며, 입장 후에는 <strong>디스코드 서버처럼 공간 간 자유롭게 이동</strong>할 수 있습니다.</li>
          </ul>
          <p><strong>입장 흐름 요약</strong></p>
          <div class="flow">
            <span>훈련 생성<br><em>(공간 자동 생성)</em></span><i>→</i>
            <span>매니저 등록</span><i>→</i>
            <span>내 강의실</span><i>→</i>
            <span>입장하기 버튼</span><i>→</i>
            <span>(최초 1회)<br>비밀번호 설정</span><i>→</i>
            <span>입장 ✅</span>
          </div>
          <p><strong>지원 환경 &amp; 앱 받기</strong> — Chrome 브라우저 권장. 좌측 하단 <strong>내 프로필 클릭 → [캠프파이어 앱 받기]</strong>에서 다운로드.</p>
          <ul>
            <li><strong>데스크톱 앱</strong> — 접속 OS를 자동 감지해 해당 버전을 보여줍니다 ([다른 OS 버전 보기]로 수동 선택 가능).</li>
            <li><strong>모바일 앱</strong> — 같은 모달의 <strong>QR을 스캔하거나 눌러서 App Store·Google Play</strong>에서 설치. 캠에서 쓰던 워크스페이스 그대로 <strong>같은 계정으로 로그인</strong>하면 됩니다.</li>
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
              <tr><td>한 매니저가 여러 훈련 담당</td><td>훈련별로 공간이 각각 생성됨 (멤버·채널 분리)</td><td>입장 후 디스코드 서버처럼 공간을 전환하며 이동</td></tr>
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
          <p><strong>프로필(좌측 하단) → 프로필 설정 → 알림 탭</strong>에서 알림 수준을 조정합니다. (모든 역할 공통)</p>
          <ul>
            <li><strong>기본값은 '멘션만'</strong>입니다 — 나를 @멘션할 때만 알림이 와요. (필요하면 '전체 메시지' 또는 '끄기'로 변경)</li>
            <li><strong>채널별 개별 설정</strong>: 사이드바에서 <strong>채널에 마우스를 올리면 나타나는 케밥 메뉴(⋮)</strong>를 클릭 → 해당 채널만 알림을 따로 설정(전체/멘션만/끄기)할 수 있어요.</li>
          </ul>
          <div class="callout callout--tip"><span class="callout__ico">💡</span><div>📢 공지 채널은 <strong>'전체 메시지'</strong>로 켜두면 중요한 운영 안내를 놓치지 않아요.</div></div>
          <div class="shot">📸 스크린샷: 기본 알림 설정 (프로필 > 설정 > 알림 — 멘션만)</div>
          <div class="shot">📸 스크린샷: 채널별 알림 설정 (채널 케밥 메뉴)</div>
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
          <div class="callout callout--tip"><span class="callout__ico">💡</span><div>디스코드를 써봤다면 구조가 거의 동일합니다. 왼쪽에서 오른쪽으로: <strong>채널 목록(사이드바) → 대화 영역 → 우측 상단 아이콘(검색·알림·멤버)</strong>.</div></div>
          <dl class="anatomy">
            <dt>① 사이드바 (좌측)</dt>
            <dd>
              <ul>
                <li><strong>최상단</strong>: 현재 입장한 훈련(공간) 이름 — 여기서 다른 공간으로 전환 (디스코드 서버 전환과 동일)</li>
                <li><strong>강의 카드</strong>: 닫혀 있을 때 [열기]로 강의 시작, <strong>진행 중에는 [Live] 표시</strong>로 바뀜</li>
                <li><strong>채널 목록</strong>: 카테고리(채널 / 강의 / 행정 / 기타)별 그룹화</li>
                <li><strong>채널 아이콘</strong>: # 텍스트 / 📢 공지 / 🎤 화상 / 🌐 임베드 / 🔳 QR 확인 / 🔒 비공개</li>
                <li><strong>하단</strong>: DM 목록</li>
                <li><strong>최하단</strong>: 내 프로필(상태 변경·앱 받기·로그아웃). 프로필 옆 <strong>톱니(⚙️)는 공간 설정</strong>(운영 메뉴)으로 서로 다릅니다.</li>
              </ul>
            </dd>
            <dt>② 메시지 영역 (중앙)</dt>
            <dd>상단: 채널 이름·즐겨찾기(⭐) / 메시지 스트림(작성자·시간·본문, 링크 미리보기) / 하단: 입력창(📎 첨부, 이모지) / 우측 하단: [최하단으로 이동]</dd>
            <dt>③ 멤버 목록</dt>
            <dd>우측 상단 멤버 아이콘(👥) 클릭 시 표시. <strong>역할별로 구분</strong>되어 보입니다: 매니저 / 강사 / 보조강사 / 멘토 / 수강생.</dd>
            <dt>④ 화상 채널 영역</dt>
            <dd>사이드바 화상 채널 카테고리에 모여 있음 (예: 프로젝트 1~4팀, 회고방). 상세는 7장.</dd>
            <dt>⑤ 검색 / 알림 (우측 상단)</dt>
            <dd>🔍 검색(단축키) / @ 멘션 모아보기 / 🔔 알림 / 📌 고정된 메시지</dd>
          </dl>
          <div class="shot">📸 스크린샷: 전체 화면에 ①~⑤ 번호를 오버레이한 이미지 1장</div>
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
          <div class="callout callout--info"><span class="callout__ico">🔳</span><div><strong>QR 확인 채널이란?</strong> 수강생이 <strong>본인 얼굴을 인증</strong>한 뒤 <strong>조퇴·외출을 스스로 신청</strong>하는 출결 시스템입니다. 강사·매니저에게 매번 QR을 요청하지 않아도 돼요.<br>• <strong>수강생</strong>: 채널 입장 → 카메라로 <strong>본인 얼굴 인식이 성공해야</strong> 사유(조퇴·외출 등)를 입력하고 <strong>QR 코드를 직접 발급</strong>받습니다.<br>• <strong>매니저(전용)</strong>: QR을 찍은 수강생의 <strong>얼굴·시각 기록</strong>은 채널 <strong>하단 [모니터링] 버튼 → [QR 조회] 탭</strong>으로만 들어가 확인합니다. <strong>매니저만 열람</strong> 가능합니다.<br>• <strong>얼굴 인식 실패 시</strong>: 얼굴이 정상 인식돼야만 진행되며, 인식이 안 되면 <strong>[QR 확인하기] 버튼이 활성화되지 않습니다</strong>(사유 입력·QR 발급 불가).</div></div>
          <div class="callout callout--info"><span class="callout__ico">ℹ️</span><div><strong>비공개</strong>는 타입이 아니라 <strong>옵션</strong>입니다 — 어떤 타입이든 생성 시 비공개 설정 가능(🔒). <strong>익명</strong>은 <strong>텍스트 유형에만</strong> 적용되는 옵션입니다.</div></div>
          <div class="shot">📸 스크린샷: 매니저 [모니터링] 버튼 → [QR 조회] 탭 (수강생 QR 인증 기록)</div>
          <p>채널은 <strong>카테고리</strong>(채널 / 강의 / 행정 / 기타 / 화상 채널)로 묶어 정리할 수 있습니다.</p>
          <p><strong>권장 구조 예시(멋사 표준)</strong>: 📢 공지 / 💬 자유수다 / ❓질문 / 🎥 강의실 / 팀별 채널 …</p>
        `,
      },
      {
        id: "s4-2", title: "채널 만들기",
        html: `
          <ol>
            <li>사이드바 카테고리명 옆 [+] 클릭 → '채널 만들기' 모달</li>
            <li><strong>채널 유형 선택</strong>: 텍스트 / 공지 / 화상 / 임베드 / QR 확인 <span style="opacity:.7">(QR 확인 = 수강생 얼굴 인증 기반 셀프 조퇴·외출 출결 · 상세 4-1)</span></li>
            <li><strong>채널 이름 입력</strong> (예: 질문, 3주차-과제)</li>
            <li><strong>카테고리 선택</strong> — 기본값 '채널(기본)', 드롭다운에서 변경</li>
            <li>(선택) <strong>비공개 채널 토글</strong> — 관리자 자동 접근 허용·멤버 초대 옵션 노출</li>
            <li>(선택, <strong>텍스트만</strong>) <strong>익명 채널 토글</strong></li>
            <li>[채널 만들기] 클릭 → 사이드바에 즉시 생성</li>
          </ol>
          <div class="shot">📸 스크린샷: [+] 버튼 위치 / 채널 만들기 모달 / 비공개 설정 + 멤버·그룹 초대</div>
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
            <li><strong>관리자 자동 접근 허용</strong>: 켜면 강사·보조강사·매니저는 멤버 추가 없이도 채널을 볼 수 있음</li>
            <li><strong>멤버·그룹 초대</strong>: 개별 멤버 또는 <strong>그룹(@핸들) 단위</strong> 초대 (예: @team5 → 5조 8명 일괄)</li>
          </ul>
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
            <li>삭제는 복구가 어려울 수 있으므로 신중히 (10장 FAQ 참고)</li>
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
            <li>사이드바 좌측 하단 <strong>프로필 옆 톱니(⚙️)</strong> → <strong>설정 &gt; 멤버</strong></li>
            <li>초대 링크 영역에서 <strong>역할 선택</strong> (수강생 / 멘토 / 강사 등)</li>
            <li><strong>만료일 선택</strong> → [링크 만들기]</li>
            <li>생성된 링크 [복사]해서 공유</li>
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
              <tr><td><strong>모니터링 관리</strong></td><td>화면 캡처 모니터링과 얼굴 확인(출석) 기록을 확인·관리</td></tr>
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
          <div class="callout callout--info"><span class="callout__ico">ℹ️</span><div><strong>차단·신고는 수강생 포함 모든 멤버</strong>가 사용 가능. <strong>차단</strong>은 내게 그 사람 메시지가 안 보이게 하는 개인 차단(강퇴와 별개), <strong>신고</strong>는 사유를 골라 접수하면 매니저 신고함(8-4)으로 전달됩니다.</div></div>
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
          <div class="callout callout--tip"><span class="callout__ico">💡</span><div>데일리 팝업은 입장 시 화면 가운데 떠서 <strong>반드시 보게 되는 공지</strong>입니다. 채널 공지는 스크롤로 지나칠 수 있지만 팝업은 놓치기 어려우므로 출석 체크·당일 일정·긴급 공지에 적합합니다.</div></div>
          <ul>
            <li>위치: <strong>설정(⚙️) &gt; 데일리 팝업</strong></li>
            <li><strong>활성화 체크박스</strong>: 해제하면 학생에게 노출되지 않음(작성 중이거나 멈추고 싶을 때 OFF)</li>
            <li>서식: 굵게/기울임/제목(H2)/목록/인용/이미지 — 리치 텍스트 편집기</li>
            <li>운영 팁: 매일 아침 그날 일정으로 갱신하면 출결·일정 누락을 줄일 수 있음</li>
          </ul>
          <h4 class="warn-h">⚠️ 데일리 팝업 예외 케이스</h4>
          <table class="cf-table">
            <thead><tr><th>상황</th><th>영향</th><th>해결 방안</th></tr></thead>
            <tbody>
              <tr><td>활성화 ON인 채 빈 내용·지난 공지 방치</td><td>입장마다 철 지난/빈 팝업이 떠 피로도·신뢰도 하락</td><td>사용 안 할 땐 OFF, 사용 시 매일 갱신</td></tr>
              <tr><td>이미 닫은 팝업의 재노출</td><td>재노출 기준이 없어 활성 상태면 입장마다 다시 뜨는 구조로 보임</td><td>한 번만 알릴 공지는 공지 채널 사용, 팝업은 당일 안내에만</td></tr>
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
            <li>사이드바 최상단 <strong>[강의] 카드 &gt; [열기]</strong> → '강의를 열고 참여합니다' 화면</li>
            <li>장치 선택: <strong>마이크는 꺼진 상태, 카메라는 켜진 상태로 입장</strong>되며 사용할 카메라/마이크를 드롭다운에서 선택</li>
            <li>[강의 열기 및 참여] 클릭 → 시작</li>
          </ol>
          <div class="callout callout--info"><span class="callout__ico">🎥</span><div>별도 설정 없이 <strong>모든 정식 강의는 자동으로 녹화</strong>되고 <strong>AI 요약·STT</strong>까지 생성됩니다.</div></div>
          <p>강의가 시작·종료되면 <strong>강의봇</strong>이 '강의 중' 채널에 <code>강의가 시작되었습니다</code> / <code>강의가 종료되었습니다</code>를 자동 게시하고, 날짜별 강의 쓰레드가 생성됩니다.</p>
          <div class="shot">📸 스크린샷: 강의 열기 및 참여 화면</div>
        `,
      },
      {
        id: "s7-5", title: "수강생 호출 (미입장자 알림)",
        html: `
          <p>수업이 시작됐는데 <strong>아직 강의실에 들어오지 않은 수강생</strong>에게 입장 알림을 보낼 수 있습니다. (매니저·강사 가능)</p>
          <ol>
            <li>강의 화면 하단 <strong>[더보기(⋯)] → [수강생 호출]</strong></li>
            <li>호출 메시지 작성 (기본 문구가 채워져 있어요) → <strong>[발송]</strong></li>
            <li>강의에 <strong>아직 안 들어온 수강생에게만 DM</strong>으로 호출 메시지가 전송됩니다.</li>
          </ol>
          <div class="callout callout--tip"><span class="callout__ico">💡</span><div>수강생은 <strong>'강의 초대' 알림 + [입장하기] 버튼</strong>을 받고, 버튼을 누르면 <strong>바로 강의실로 입장</strong>합니다. 수업 시작 직후 미입장자가 많을 때 쓰면 효과적이에요.</div></div>
          <div class="shot">📸 스크린샷: 더보기 > 수강생 호출 → 메시지 작성·발송</div>
        `,
      },
      {
        id: "s7-3", title: "녹화 & AI 요약",
        html: `
          <ul>
            <li><strong>모든 정식 강의는 자동으로 녹화</strong>되며, <strong>영상 + AI 요약·STT(음성→텍스트)</strong>가 함께 생성됩니다. (예전 'AI 요약 활성화' 토글은 없어졌고, 별도 설정이 필요 없습니다)</li>
            <li>저장된 녹화는 <strong>사이드바 [강의] 영역 &gt; 녹화 탭</strong>에서 확인. 시작 시각·상태·재생시간·파일 크기·AI 요약이 표시되며 재생(▶)·다운로드(⬇) 가능</li>
          </ul>
          <div class="callout callout--warn"><span class="callout__ico">⚠️</span><div>모든 강의가 자동으로 녹화·AI 요약되어 음성이 텍스트로 기록됩니다. 개인정보·민감 발언이 남을 수 있으니 <strong>수강생에게 녹화 사실을 미리 고지</strong>하세요.</div></div>
          <div class="shot">📸 스크린샷: 강의 &gt; 녹화 탭 목록</div>
        `,
      },
      {
        id: "s7-4", title: "참가자(멤버) 관리 & 이해도 확인",
        html: `
          <h4>참가자 관리</h4>
          <ul>
            <li><strong>설정(⚙️) &gt; 멤버 탭</strong>에서 역할 변경(드롭다운)·멤버 제거(제거 아이콘)</li>
            <li>강제 음소거 등 세션 내 실시간 호스트 제어 제공 여부는 확인 필요</li>
            <li>화상 기본 컨트롤(본인): 음소거 / 카메라 끄기 / 전체화면 / 나가기(X)</li>
          </ul>
          <h4>이해도 확인 (이해 확인 버튼)</h4>
          <ul>
            <li>강의 중 <strong>[이해 확인]</strong> → 수강생 화면에 '👍 이해 / 🤔 어려움' 팝업, 응답을 모아 <strong>실시간 이해도</strong> 파악 (강사·매니저 모두 사용)</li>
            <li>'어려움'이 많으면 보충 설명·속도 조절 신호로 활용</li>
          </ul>
          <div class="shot">📸 스크린샷: 설정 &gt; 멤버(제어) / 이해 확인 뷰·수강생 응답 팝업</div>
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
            <li>위치: <strong>설정(⚙️) &gt; 자동 메시지</strong></li>
            <li><strong>봇 이름</strong>: 자동 메시지를 보내는 봇의 표시 이름 (예: 알림봇)</li>
            <li>메시지 추가: [+추가] → 발송 채널·반복 주기·시각·내용 (예: #일반 · 매일 12:40 "점심메뉴 골라두세요~!")</li>
            <li>각 메시지는 <strong>활성/비활성</strong> 토글, '다음 발송' 예정 시각 표시</li>
          </ul>
          <div class="shot">📸 스크린샷: 설정 &gt; 자동 메시지 화면</div>
        `,
      },
      {
        id: "s8-3", title: "연동 봇 (웹훅)",
        html: `
          <div class="callout callout--tip"><span class="callout__ico">💡</span><div>외부 시스템(n8n·자체 서버 등)이 캠프파이어 채널로 메시지를 자동 게시하게 하는 기능. 위의 자동 메시지 봇과는 별개입니다.</div></div>
          <ul>
            <li>위치: 설정 &gt; 자동 메시지 &gt; <strong>연동 봇 (웹훅)</strong></li>
            <li>외부에서 <code>/api/v1/bot/send</code>로 게시할 때 사용, 봇마다 이름·API 키 분리</li>
            <li>[키 재발급]으로 키 발급, <strong>x-api-key</strong> 헤더로 사용</li>
          </ul>
          <div class="callout callout--warn"><span class="callout__ico">⚠️</span><div>키는 발급 후 값이 다시 표시되지 않으므로 발급 즉시 안전한 곳에 보관하세요. 유출 의심 시 [키 재발급]으로 기존 키 무효화.</div></div>
        `,
      },
      {
        id: "s8-4", title: "신고함 & 기타",
        html: `
          <ul>
            <li><strong>신고함</strong>(설정 &gt; 신고함): 멤버가 신고한 건을 처리. <strong>신고는 수강생 포함 모든 멤버</strong>가 메시지 [⋯ 더보기 &gt; 신고] 또는 멤버 케밥(⋮) &gt; 신고에서 <strong>사유(스팸/괴롭힘/부적절한 콘텐츠/기타) + 상세</strong>로 접수. 매니저는 건마다 사유·신고자·시각을 확인하고 <strong>[메시지 삭제] / [강퇴] / [처리완료] / [기각]</strong> 중 선택</li>
            <li><strong>수강생 현황 / 활동 리포트</strong>: 참여·활동 데이터 조회 메뉴(본 가이드에서는 상세 생략)</li>
          </ul>
        `,
      },
      {
        id: "s8-5", title: "공간 기본 설정 (설정 > 일반)",
        html: `
          <ul>
            <li><strong>홈페이지 URL</strong>: 좌측 상단 <strong>집(🏠) 아이콘</strong> 클릭 시 이동 주소(새 창). 예: https://likelion.net/</li>
            <li><strong>배너</strong>: 좌측 상단 공간 선택 영역 하단 이미지. [이미지 교체]/[제거], JPG·PNG·WEBP·최대 2MB, 권장 가로형 약 2:1(예: 1200×600)</li>
          </ul>
          <div class="shot">📸 스크린샷: 설정 &gt; 일반 — 홈페이지 URL·배너</div>
        `,
      },
      {
        id: "s8-6", title: "카메라 자동 캡처 (출석 확인)",
        html: `
          <div class="callout callout--tip"><span class="callout__ico">💡</span><div>수업 시간대에 수강생 카메라 화면을 자동 캡처해 출석을 확인하는 기능. 결과는 상단 [캡처 모니터링] 탭에서 수강생별 격자로 확인합니다.</div></div>
          <ul>
            <li>위치: 설정(⚙️) &gt; 일반 &gt; <strong>카메라 자동 캡처</strong>, [이 클래스에서 카메라 자동 시작·출석 캡처 사용] 체크</li>
            <li>동작: <strong>10분마다(정각 기준)</strong> 입장 중인 수강생 카메라 캡처 (촬영 시각은 정각과 약간 다를 수 있음)</li>
            <li><strong>캡처 규칙</strong>: 요일 + 시간대(시작~종료)로 지정, [+시간대 추가]로 여러 시간대 구성. 규칙이 없으면 캡처하지 않음</li>
            <li><strong>공휴일 제외</strong>(한국 공휴일 자동) 체크 가능</li>
            <li><strong>캡처 제외일</strong>: 특정 날짜를 '종일' 또는 '시간 설정'으로 제외(개강일·휴강일 등)</li>
            <li>캡처 상태: <strong>캡처</strong>(정상) / <strong>스킵</strong>(카메라 꺼짐) / <strong>무응답</strong></li>
          </ul>
          <h4 class="warn-h">⚠️ 카메라 캡처 예외 케이스</h4>
          <table class="cf-table">
            <thead><tr><th>상황</th><th>영향</th><th>해결 방안</th></tr></thead>
            <tbody>
              <tr><td>수강생 카메라 OFF 또는 미입장</td><td>'스킵·무응답'으로 기록되어 출석 누락 오해</td><td>수업 전 카메라 ON 안내, 캡처 시간대 사전 공지</td></tr>
              <tr><td>캡처 규칙 미설정</td><td>캡처가 전혀 안 됨</td><td>운영 시간대 규칙을 먼저 등록</td></tr>
              <tr><td>공휴일·휴강일 불필요 캡처</td><td>수강생 혼선·불필요 데이터 적재</td><td>공휴일 제외 체크 + 제외일 추가</td></tr>
            </tbody>
          </table>
          <div class="shot">📸 스크린샷: 설정 &gt; 일반 — 카메라 자동 캡처 규칙·제외일</div>
        `,
      },
    ],
  },

  /* ========================= 9 ========================= */
  {
    id: "ch9", num: 9, title: "트러블슈팅 (1차 대응)", icon: "🩹",
    sections: [
      {
        id: "s9-1", title: "증상별 1차 대응표",
        html: `
          <div class="callout callout--tip"><span class="callout__ico">🌐</span><div><strong>1순위 점검</strong> — 화상·입장·장치 문제는 먼저 <strong>PC Chrome 최신 버전</strong>인지 확인하세요. (수강생이 인앱 브라우저로 열었는지도 확인)</div></div>
          <table class="cf-table">
            <thead><tr><th>증상</th><th>원인 후보</th><th>해결 방법</th></tr></thead>
            <tbody>
              <tr><td>수강생이 입장을 못 해요</td><td>① 어드민 훈련생 등록 누락(입장 버튼 미노출) ② 초대 링크 만료</td><td>① 어드민에서 훈련생 등록 확인 ② 설정 &gt; 멤버에서 새 초대 링크 생성 후 재공유</td></tr>
              <tr><td>마이크/카메라가 안 돼요</td><td>① 브라우저 권한 차단 ② 잘못된 장치 선택 ③ 다른 앱이 점유</td><td>① Chrome 자물쇠 &gt; 카메라·마이크 [허용] ② 입장 화면 장치 드롭다운에서 올바른 장치 선택 ③ Zoom 등 종료 후 재시도 (마이크는 꺼진 상태로 입장되므로 세션 안에서 켜기)</td></tr>
              <tr><td>메시지가 안 보내져요</td><td>① 공지 채널(📢)은 매니저만 게시 ② 비공개 채널 미초대 ③ 네트워크 끊김</td><td>① 공지 채널이면 정상(읽기 전용) ② 일반 채널이면 초대 여부 확인 ③ 새로고침·재접속</td></tr>
              <tr><td>강의(화상)가 안 보여요 / 안 열려요</td><td>강의 열기 권한은 매니저·강사만 — 수강생·보조강사·멘토 불가, 강사가 열기 전이면 참여 불가</td><td>강사·매니저가 [강의] 카드에서 먼저 강의를 열어야 함 (7장)</td></tr>
            </tbody>
          </table>
          <div class="callout callout--info"><span class="callout__ico">ℹ️</span><div><strong>에스컬레이션</strong>: 1차 매니저(이 문서의 1차 대응) → 해결 안 되면 담당 매니저가 개발팀에 직접 제보 (별도 채널 없음). 시스템 장애는 증상·시각·영향 범위를 정리해 바로 2차로 전달하면 빠릅니다.</div></div>
        `,
      },
    ],
  },

  /* ========================= 10 ========================= */
  {
    id: "ch10", num: 10, title: "FAQ", icon: "❓",
    sections: [
      {
        id: "s10-1", title: "자주 묻는 질문",
        html: `
          <details class="faq"><summary>Q. 채널을 잘못 삭제했어요. 복구할 수 있나요?</summary><div>채널 삭제 복구 기능 제공 여부는 확인 중입니다. 삭제된 메시지는 복구가 어려울 수 있으므로, 삭제 전 중요 내용은 백업하고 <strong>[보관·이름 변경]으로 먼저 처리한 뒤 정말 필요할 때만 삭제</strong>하는 것을 권장합니다. (정확한 복구 여부는 추후 업데이트)</div></details>
          <details class="faq"><summary>Q. 수강생이 다른 기수 채널을 볼 수 있나요?</summary><div>없습니다. 공간은 <strong>훈련(기수)별로 각각 분리</strong>되며, 수강생은 본인이 등록·초대된 공간에만 입장합니다. (매니저·강사가 여러 훈련을 담당할 때만 디스코드 서버처럼 공간을 전환해 이동)</div></details>
          <details class="faq"><summary>Q. 녹화 영상은 어디에 저장되나요?</summary><div><strong>모든 정식 강의는 자동으로 녹화</strong>되며 영상 + AI 요약·STT(자막)이 함께 저장됩니다. (예전 'AI 요약 활성화' 설정은 없어졌습니다) 저장된 녹화는 <strong>사이드바 [강의] 영역 &gt; 녹화 탭</strong>에서 재생·다운로드할 수 있습니다. (7장 참고)</div></details>
        `,
      },
    ],
  },
];
