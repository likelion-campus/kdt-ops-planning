/* =====================================================================
 * app.js — 캠프파이어 가이드 공통 렌더러 (3개 역할 페이지 공용)
 * 각 페이지(manager/instructor/student.html)는 자신의 *-data.js 를 먼저 로드해
 * GUIDE_META / GUIDE_DATA 전역을 정의한 뒤 이 파일을 불러온다.
 * ===================================================================== */
(function(){
  "use strict";

  /* 역할 ↔ 페이지 매핑 (사이드바 상단 가이드 전환 탭) */
  const ROLE_PAGES = [
    { role:"매니저", emoji:"🛠️", href:"manager.html" },
    { role:"강사",   emoji:"🎤", href:"instructor.html" },
    { role:"수강생", emoji:"🎒", href:"student.html" },
  ];

  const el=(t,c)=>{const e=document.createElement(t); if(c) e.className=c; return e;};
  const esc=(s)=>String(s).replace(/[&<>]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;"}[c]));

  /* ---------- 스크린샷 자동 채움 ----------
   * images/{PAGE_KEY}-{섹션id}-{순번}.(png|jpg|jpeg) 파일이 있으면 자리표시자를 이미지로 교체.
   * 없으면 자리표시자에 '넣을 파일명'을 보여줘 그대로 저장만 하면 채워진다. (코드 수정 불필요) */
  const PAGE_KEY = ({ "매니저":"manager", "강사":"instructor", "수강생":"student" })[GUIDE_META.role] || "page";
  function loadShot(ph, id, caption, exts){
    let i=0;
    (function tryNext(){
      if(i>=exts.length) return;            // 후보 확장자 모두 없으면 자리표시자 유지
      const img=new Image();
      img.onload=()=>{
        const fig=el("figure","shot-fig");
        const im=el("img","shot-img"); im.src=img.src; im.alt=caption||""; im.loading="lazy";
        fig.appendChild(im);
        if(caption){ const cap=el("figcaption","shot-cap"); cap.textContent=caption; fig.appendChild(cap); }
        ph.replaceWith(fig);
      };
      img.onerror=()=>{ i++; tryNext(); };
      img.src="images/"+id+"."+exts[i];
    })();
  }

  /* ---------- 1. 접근 범위(가시성) ----------
   * GUIDE_META.canView = 이 페이지에서 볼 수 있는 역할 목록.
   *  - 매니저: ["매니저","강사","수강생"] → 전체 전환 가능(허브)
   *  - 강사/수강생: ["본인"] → 다른 가이드로의 전환·링크 모두 숨김(독립)
   * 실제 접근 통제는 "어떤 캠프파이어 채널에 어떤 페이지를 임베드하느냐"로 이루어진다. */
  const VISIBLE = (GUIDE_META.canView && GUIDE_META.canView.length) ? GUIDE_META.canView : [GUIDE_META.role];
  const visiblePages = ROLE_PAGES.filter(r=>VISIBLE.includes(r.role));
  const isHub = visiblePages.length > 1;   // 다른 가이드도 볼 수 있는 페이지(매니저)인가

  const roleSwitch = visiblePages.map(r=>{
    const active = r.role===GUIDE_META.role ? " active" : "";
    return `<a class="rs${active}" href="${r.href}"><span class="rs-emoji">${r.emoji}</span>${r.role}</a>`;
  }).join("");
  const brandInner = `<img class="logo-img" id="brandLogo" src="logo.png" alt="캠프파이어" /><span class="brand-text">캠프파이어 가이드</span>`;
  // 임베드 전용 독립 페이지: 랜딩(index.html)이 없으므로 로고에 링크를 걸지 않는다
  const brandHtml = brandInner;

  document.body.innerHTML = `
    <header class="topbar">
      <button class="menu-btn" id="menuBtn" aria-label="메뉴">☰</button>
      <div class="brand">
        ${brandHtml}
        <span class="role" id="roleBadge"></span>
      </div>
      <div class="spacer"></div>
      <div class="search-wrap">
        <span class="search-ico">🔍</span>
        <input class="search-input" id="search" type="text" placeholder="기능·메뉴·문제 상황 검색" autocomplete="off" />
        <span class="search-kbd" id="kbdHint">Ctrl K</span>
        <div class="results" id="results"></div>
      </div>
    </header>
    <div class="scrim" id="scrim"></div>
    <div class="layout">
      <aside class="sidebar" id="sidebar">
        ${isHub ? `<nav class="role-switch">${roleSwitch}</nav>` : ""}
        <div id="navList"></div>
      </aside>
      <main class="content">
        <div class="doc-hero">
          <div class="eyebrow" id="eyebrow"></div>
          <h1 id="docTitle"></h1>
          <p class="tagline" id="docTagline"></p>
        </div>
        <div class="meta-bar" id="metaBar"></div>
        <div class="related" id="related"></div>
        <hr class="divider" />
        <div id="docBody"></div>
        <div class="footer" id="footer"></div>
      </main>
    </div>
    <button class="totop" id="toTop" aria-label="맨 위로">↑</button>`;

  const $=(s)=>document.querySelector(s);

  /* 로고 이미지가 없으면 🔥 이모지로 대체 */
  $("#brandLogo").addEventListener("error",function(){
    const span=el("span","logo"); span.textContent="🔥";
    this.replaceWith(span);
  });

  /* ---------- 2. 헤더 메타 ---------- */
  $("#roleBadge").textContent = GUIDE_META.role;
  $("#eyebrow").textContent = (GUIDE_META.emoji||"") + " " + GUIDE_META.product + " 사용 가이드";
  document.title = GUIDE_META.product + " " + GUIDE_META.role + " 가이드";
  $("#docTitle").textContent = GUIDE_META.role + " 가이드";
  $("#docTagline").textContent = GUIDE_META.tagline;

  const metaBar=$("#metaBar");
  [["대상",GUIDE_META.audience],["작성 상태",GUIDE_META.status]].forEach(([k,v])=>{
    if(!v) return;
    const c=el("span","meta-chip"); c.innerHTML="<b>"+esc(k)+"</b> · "+esc(v); metaBar.appendChild(c);
  });

  const related=$("#related");
  const others=visiblePages.filter(r=>r.role!==GUIDE_META.role);
  if(others.length){
    related.appendChild(Object.assign(el("span"),{textContent:"다른 가이드"}));
    others.forEach(r=>{
      const a=el("a","pill"); a.href=r.href; a.textContent=r.emoji+" "+r.role+" 가이드";
      related.appendChild(a);
    });
  } else { related.style.display="none"; }

  $("#footer").innerHTML =
    (isHub ? "🔗 다른 가이드는 사이드바 상단에서 전환할 수 있어요. &nbsp;·&nbsp; " : "") +
    "📬 문의: 운영 문의 채널";

  /* ---------- 3. 사이드바 + 본문 렌더 ---------- */
  const sidebar=$("#navList"), body=$("#docBody");
  const searchIndex=[]; // {chNum, chTitle, secId, secTitle, text}

  GUIDE_DATA.forEach(ch=>{
    const group=el("div","nav-group"); group.dataset.ch=ch.id;
    const btn=el("button","nav-ch");
    btn.innerHTML='<span class="num">'+ch.num+'</span><span class="ico">'+(ch.icon||"📄")+'</span><span>'+esc(ch.title)+'</span><span class="chev">▾</span>';
    btn.addEventListener("click",()=>group.classList.toggle("collapsed"));
    const subs=el("div","nav-subs");
    ch.sections.forEach(sec=>{
      const a=el("a","nav-sub"); a.href="#"+sec.id; a.textContent=sec.title; a.dataset.sec=sec.id;
      a.addEventListener("click",(ev)=>{ ev.preventDefault(); jumpTo(sec.id); });
      subs.appendChild(a);
    });
    group.appendChild(btn); group.appendChild(subs); sidebar.appendChild(group);

    const chEl=el("section","chapter"); chEl.id=ch.id;
    const h2=el("h2"); h2.innerHTML='<span class="cnum">'+ch.num+'</span>'+(ch.icon||"")+' '+esc(ch.title);
    chEl.appendChild(h2);
    ch.sections.forEach(sec=>{
      const secEl=el("section","section"); secEl.id=sec.id;
      const h3=el("h3"); h3.textContent=sec.title; secEl.appendChild(h3);
      const wrap=el("div"); wrap.innerHTML=sec.html;
      // 표를 가로 스크롤 컨테이너로 감싸기 (모바일 대응)
      wrap.querySelectorAll("table.cf-table").forEach(t=>{
        const sc=el("div","table-scroll"); t.parentNode.insertBefore(sc,t); sc.appendChild(t);
      });
      // 스크린샷 자리표시자 → 파일이 있으면 자동 교체, 없으면 넣을 파일명 안내
      let shotN=0;
      wrap.querySelectorAll(".shot").forEach(ph=>{
        shotN++;
        const id=PAGE_KEY+"-"+sec.id+"-"+shotN;
        const caption=ph.textContent.replace(/^\s*📸\s*(스크린샷)?\s*:?\s*/,"").trim();
        ph.innerHTML='📸 <strong>'+esc(caption)+'</strong><br><span class="shot-name">넣을 파일: <code>images/'+id+'.png</code></span>';
        loadShot(ph,id,caption,["png","jpg","jpeg"]);
      });
      secEl.appendChild(wrap);
      chEl.appendChild(secEl);
      searchIndex.push({chNum:ch.num, chTitle:ch.title, secId:sec.id, secTitle:sec.title,
        text:(sec.title+" "+wrap.textContent).replace(/\s+/g," ").trim()});
    });
    body.appendChild(chEl);
  });

  /* ---------- 4. 스크롤스파이 (스크롤 위치 기반) ----------
   * IntersectionObserver의 '마지막 교차 = 활성'은 짧은 섹션이 다음 섹션에 밀리고,
   * 맨 끝 섹션은 상단에 닿지 못해 활성화가 안 됐다. → 기준선/페이지끝 기반으로 결정론적 계산. */
  const subLinks=[...document.querySelectorAll(".nav-sub")];
  const secEls=[...document.querySelectorAll(".section")];
  const asideEl=$("#sidebar");
  const SPY_LINE=90;           // 헤더(78px) 살짝 아래 기준선
  let lockedId=null, idleTimer=null;  // 메뉴 클릭 점프 동안 활성 고정

  /* 활성 항목이 사이드바 밖에 있으면 '사이드바 자체'만 스크롤한다.
   * (element.scrollIntoView는 창 전체 스크롤까지 건드려 본문 스무스 스크롤을 끊는다 → '중간에 멈춤' 버그) */
  function revealInSidebar(link){
    const top=link.offsetTop, bottom=top+link.offsetHeight;
    const viewTop=asideEl.scrollTop, viewBottom=viewTop+asideEl.clientHeight;
    if(top<viewTop) asideEl.scrollTop=top-12;
    else if(bottom>viewBottom) asideEl.scrollTop=bottom-asideEl.clientHeight+12;
  }
  function setActive(id){
    if(!id) return;
    subLinks.forEach(a=>a.classList.toggle("active",a.dataset.sec===id));
    const active=subLinks.find(a=>a.dataset.sec===id);
    if(active){ const g=active.closest(".nav-group"); if(g) g.classList.remove("collapsed"); revealInSidebar(active); }
  }
  function currentSectionId(){
    if(!secEls.length) return null;
    // 페이지 끝까지 내려갔으면 무조건 마지막 섹션
    if(window.innerHeight+window.scrollY >= document.documentElement.scrollHeight-2)
      return secEls[secEls.length-1].id;
    // 기준선(SPY_LINE)을 지난 마지막 섹션
    let id=secEls[0].id;
    for(const s of secEls){ if(s.getBoundingClientRect().top<=SPY_LINE) id=s.id; else break; }
    return id;
  }
  function onScroll(){
    if(lockedId){ // 클릭 점프 중: 스크롤이 멈출 때까지 활성 고정, 멈추면 해제 후 재계산
      clearTimeout(idleTimer);
      idleTimer=setTimeout(()=>{ lockedId=null; setActive(currentSectionId()); },140);
      return;
    }
    setActive(currentSectionId());
  }
  window.addEventListener("scroll",onScroll,{passive:true});
  setActive(currentSectionId()); // 초기 1회

  /* ---------- 5. 검색 ---------- */
  const input=$("#search"), resultsBox=$("#results");
  let activeResult=-1, currentResults=[];
  const escapeRe=(s)=>s.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");
  const tokens=(q)=>q.toLowerCase().split(/\s+/).filter(Boolean);

  function search(q){
    const toks=tokens(q); if(!toks.length) return [];
    const scored=searchIndex.map(item=>{
      const lc=item.text.toLowerCase(), title=item.secTitle.toLowerCase();
      let score=0, allHit=true;
      toks.forEach(t=>{
        const inTitle=title.includes(t), inText=lc.includes(t);
        if(!inText&&!inTitle) allHit=false;
        if(inTitle) score+=10;
        if(inText) score+=3;
      });
      return allHit ? {item,score,snippet:makeSnippet(item.text,toks)} : null;
    }).filter(Boolean);
    scored.sort((a,b)=>b.score-a.score);
    return scored.slice(0,12);
  }
  function makeSnippet(text,toks){
    const lc=text.toLowerCase(); let idx=-1;
    for(const t of toks){const i=lc.indexOf(t); if(i>=0&&(idx<0||i<idx)) idx=i;}
    if(idx<0) idx=0;
    const start=Math.max(0,idx-32);
    let snip=(start>0?"…":"")+text.slice(start,start+150)+(start+150<text.length?"…":"");
    return highlight(snip,toks);
  }
  function highlight(str,toks){
    let out=esc(str);
    toks.forEach(t=>{ out=out.replace(new RegExp("("+escapeRe(t)+")","gi"),"<mark>$1</mark>"); });
    return out;
  }
  function renderResults(q){
    currentResults=search(q); activeResult=-1;
    if(!q.trim()){ resultsBox.classList.remove("open"); resultsBox.innerHTML=""; return; }
    resultsBox.classList.add("open");
    if(!currentResults.length){
      resultsBox.innerHTML='<div class="empty">🔍 “'+esc(q)+'” 에 대한 결과가 없어요.<br>다른 키워드로 검색해 보세요.</div>'; return;
    }
    const toks=tokens(q);
    let html='<div class="rcount">'+currentResults.length+'개 결과</div>';
    currentResults.forEach((r,i)=>{
      html+='<a class="result" data-i="'+i+'" href="#'+r.item.secId+'">'
        +'<div class="crumb">'+r.item.chNum+'. '+esc(r.item.chTitle)+'</div>'
        +'<div class="rtitle">'+highlight(r.item.secTitle,toks)+'</div>'
        +'<div class="snippet">'+r.snippet+'</div></a>';
    });
    resultsBox.innerHTML=html;
    [...resultsBox.querySelectorAll(".result")].forEach(a=>{
      a.addEventListener("click",ev=>{ ev.preventDefault(); jumpTo(a.getAttribute("href").slice(1)); });
    });
  }
  function jumpTo(id){
    const target=document.getElementById(id); if(!target) return;
    closeResults(); input.value=""; closeNav();
    lockedId=id; setActive(id);   // 클릭 즉시 활성 + 스크롤 점프 동안 고정(짧은 섹션/페이지끝도 정확)
    target.scrollIntoView({behavior:"smooth",block:"start"});
    target.classList.add("flash"); setTimeout(()=>target.classList.remove("flash"),1700);
    history.replaceState(null,"","#"+id);
    clearTimeout(idleTimer);      // 점프 후 스크롤 이벤트가 안 와도(이미 그 위치면) 안전하게 해제
    idleTimer=setTimeout(()=>{ lockedId=null; setActive(currentSectionId()); },600);
  }
  function closeResults(){resultsBox.classList.remove("open");}

  input.addEventListener("input",()=>renderResults(input.value));
  input.addEventListener("focus",()=>{ if(input.value.trim()) renderResults(input.value); });
  input.addEventListener("keydown",e=>{
    const items=[...resultsBox.querySelectorAll(".result")];
    if(e.key==="ArrowDown"){e.preventDefault();activeResult=Math.min(activeResult+1,items.length-1);paintActive(items);}
    else if(e.key==="ArrowUp"){e.preventDefault();activeResult=Math.max(activeResult-1,0);paintActive(items);}
    else if(e.key==="Enter"){e.preventDefault(); if(currentResults.length){const p=activeResult>=0?activeResult:0; jumpTo(currentResults[p].item.secId);}}
    else if(e.key==="Escape"){ input.value=""; closeResults(); input.blur(); }
  });
  function paintActive(items){
    items.forEach((it,i)=>it.classList.toggle("active",i===activeResult));
    if(items[activeResult]) items[activeResult].scrollIntoView({block:"nearest"});
  }
  document.addEventListener("click",e=>{ if(!e.target.closest(".search-wrap")) closeResults(); });
  document.addEventListener("keydown",e=>{
    if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="k"){e.preventDefault();input.focus();input.select();}
  });
  if(navigator.platform.toLowerCase().includes("mac")) $("#kbdHint").textContent="⌘ K";

  /* ---------- 6. 모바일 네비 / 맨 위로 / 딥링크 ---------- */
  function closeNav(){document.body.classList.remove("nav-open");}
  $("#menuBtn").addEventListener("click",()=>document.body.classList.toggle("nav-open"));
  $("#scrim").addEventListener("click",closeNav);
  const toTop=$("#toTop");
  window.addEventListener("scroll",()=>toTop.classList.toggle("show",window.scrollY>500));
  toTop.addEventListener("click",()=>window.scrollTo({top:0,behavior:"smooth"}));

  /* ---------- 7. 스크린샷 라이트박스 (클릭 시 확대) ---------- */
  const lb=el("div","lightbox"); lb.id="lightbox";
  lb.innerHTML='<button class="lightbox__close" aria-label="닫기">✕</button><img alt="" />';
  document.body.appendChild(lb);
  const lbImg=lb.querySelector("img");
  function openLightbox(src,alt){ lbImg.src=src; lbImg.alt=alt||""; lb.classList.add("open"); document.body.style.overflow="hidden"; }
  function closeLightbox(){ lb.classList.remove("open"); lbImg.removeAttribute("src"); document.body.style.overflow=""; }
  document.addEventListener("click",(e)=>{
    const img=e.target.closest(".shot-img");
    if(img){ openLightbox(img.currentSrc||img.src, img.alt); return; }
    if(lb.classList.contains("open") && e.target.closest("#lightbox")) closeLightbox();
  });
  document.addEventListener("keydown",(e)=>{ if(e.key==="Escape" && lb.classList.contains("open")) closeLightbox(); });

  if(location.hash){ const id=location.hash.slice(1); setTimeout(()=>jumpTo(id),150); }
})();
