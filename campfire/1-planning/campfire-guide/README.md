# 캠프파이어 사용 가이드 (정적 사이트)

매니저·강사·수강생 역할별 캠프파이어 사용 가이드. 캠프파이어 채널에 **역할별 링크로 임베드**해 사용한다.

- **라이브**: https://campfire-guide.pages.dev/manager · `/instructor` · `/student`
- **배포**: Cloudflare Pages 프로젝트 `campfire-guide` (직접 업로드 방식, Git 연동 아님)
- 순수 정적 HTML/CSS/JS — 빌드 과정 없음.

## 구조

| 파일 | 설명 |
|---|---|
| `manager.html` · `instructor.html` · `student.html` | 역할별 페이지 (셸) |
| `*-data.js` | 각 가이드의 콘텐츠 데이터 (수정은 이 파일만 편집) |
| `app.js` | 공통 렌더러 (사이드바·검색·스크롤스파이·스크린샷 자동 채움·라이트박스) |
| `styles.css` | 스타일 — LIKELION 디자인 시스템 토큰 적용 |
| `images/` | 스크린샷. `images/_README-스크린샷-목록.md`의 파일명대로 넣으면 자동 표시 |

## 수정 방법

- **내용 수정**: 해당 `*-data.js`의 `GUIDE_DATA` 편집
- **스크린샷 추가**: `images/`에 지정 파일명(`{role}-{섹션id}-{n}.png`)으로 저장 → 자동 반영. 목록은 `images/_README-스크린샷-목록.md` 참고
- **배포** (Cloudflare 인증 필요):
  ```bash
  wrangler pages deploy . --project-name=campfire-guide --branch=main --commit-dirty=true
  ```
