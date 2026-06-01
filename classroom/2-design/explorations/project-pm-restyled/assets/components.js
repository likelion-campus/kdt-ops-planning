/* components.js — 멋사 부트캠프 스타일 셸 + 공유 컴포넌트
 * GNB(상단) + 라이트 LNB(좌측 프로필 + 메뉴 아이콘) + 페이지 헤더 분리
 * mock-data.js 이후에 로드되어 window.MOCK 을 사용.
 */
(function () {
  const STATE_KEY = 'classroom-proto:state';
  const VIEW_KEY = 'classroom-proto:view';

  const getView = () => sessionStorage.getItem(VIEW_KEY) || 'trainee';
  const setView = (v) => { sessionStorage.setItem(VIEW_KEY, v); location.reload(); };

  const loadState = () => {
    try { return JSON.parse(sessionStorage.getItem(STATE_KEY)) || {}; }
    catch { return {}; }
  };
  const saveState = (patch) => {
    const cur = loadState();
    const next = { ...cur, ...patch };
    sessionStorage.setItem(STATE_KEY, JSON.stringify(next));
    return next;
  };

  const qs = new URLSearchParams(location.search);
  const stateFlag = qs.get('state');

  // RemixIcon names per LNB key (멋사 스크린샷 기준)
  // 요구 순서: 강의보드·출결·커리큘럼·공지 → AI 노트·AI 퀴즈·실습·TIL → Q&A·훈련평가·프로젝트·설문·행정
  const LNB_ITEMS = [
    { key: 'lecture-board',  label: '강의보드',   icon: 'ri-presentation-line',   scope: 'out' },
    { key: 'attendance',     label: '출결현황',   icon: 'ri-calendar-line',       scope: 'out' },
    { key: 'curriculum',     label: '커리큘럼',   icon: 'ri-book-open-line',      scope: 'out' },
    { key: 'notice',         label: '공지사항',   icon: 'ri-notification-line',   scope: 'out' },
    { key: 'ai-note',        label: 'AI 노트',    icon: 'ri-sticky-note-line',    scope: 'in', file: 'ai-note.html' },
    { key: 'ai-quiz',        label: 'AI 퀴즈',    icon: 'ri-list-check-2',        scope: 'in', file: 'ai-quiz.html' },
    { key: 'til',            label: 'TIL',        icon: 'ri-quill-pen-line',      scope: 'in', file: 'til.html' },
    { key: 'qna',            label: 'Q&A',        icon: 'ri-question-line',       scope: 'out' },
    { key: 'eval',           label: '훈련평가',   icon: 'ri-file-list-3-line',    scope: 'out' },
    { key: 'project',        label: '프로젝트',   icon: 'ri-folder-line',         scope: 'in', file: 'project.html' },
    { key: 'survey',         label: '설문조사',   icon: 'ri-survey-line',         scope: 'out' },
    { key: 'admin',          label: '행정/운영',  icon: 'ri-user-settings-line',  scope: 'out' },
  ];

  // 데모상 user/role display
  const USER = { name: '우종범', traineeRole: '훈련생', managerRole: '매니저' };

  function renderShell(activeKey) {
    const view = getView();
    document.body.innerHTML = '';
    document.body.classList.remove('shell');

    const app = document.createElement('div');
    app.className = 'app';

    // ===== GNB =====
    const gnb = document.createElement('header');
    gnb.className = 'gnb';
    gnb.innerHTML = `
      <a class="gnb-brand" href="index.html">
        <span class="logo-mark" aria-hidden="true"></span>
        <span class="brand-text"><b>멋사</b> 부트캠프</span>
      </a>
      <nav class="gnb-nav">
        <a href="#">부트캠프 <span class="chev">▾</span></a>
        <a href="#">취업지원</a>
        <a href="#">블로그 <span class="chev">▾</span></a>
        <a href="#">내일배움카드</a>
      </nav>
      <div class="gnb-right">
        ${stateFlag ? `<span class="tag tag-weak-warning tag-small" data-slot="dstate"></span>` : ''}
        <div class="view-toggle" role="tablist" aria-label="뷰 전환">
          <button class="${view === 'trainee' ? 'is-active' : ''}" data-view="trainee">학생뷰</button>
          <button class="${view === 'manager' ? 'is-active' : ''}" data-view="manager">매니저뷰</button>
        </div>
        <div class="gnb-avatar" aria-label="프로필"><i class="ri-icon ri-user-line"></i></div>
      </div>
    `;
    if (stateFlag) gnb.querySelector('[data-slot="dstate"]').textContent = `데모: ${stateFlag}`;

    // ===== Shell (LNB + Main) =====
    const shell = document.createElement('div');
    shell.className = 'shell';

    const lnb = document.createElement('aside');
    lnb.className = 'lnb';
    const roleTag = view === 'manager'
      ? '<span class="tag tag-weak-enabled tag-small">매니저</span>'
      : '<span class="tag tag-weak-enabled tag-small">훈련생</span>';
    lnb.innerHTML = `
      <div class="lnb-profile">
        <div class="avatar"><i class="ri-icon ri-user-line"></i></div>
        <div>
          <div class="name-row"><span data-slot="uname"></span> <span class="chev">›</span></div>
          <div class="role">${roleTag}</div>
        </div>
      </div>
      <nav class="lnb-list">
        ${LNB_ITEMS.map((it) => {
          const cls = ['lnb-item'];
          if (activeKey === it.key) cls.push('is-active');
          if (it.scope === 'out') cls.push('is-disabled');
          const tag = it.scope === 'in' ? 'a' : 'div';
          const href = it.scope === 'in' ? ` href="${it.file}"` : '';
          return `<${tag} class="${cls.join(' ')}"${href}>
            <i class="ri-icon ${it.icon}"></i>
            <span>${it.label}</span>
          </${tag}>`;
        }).join('')}
      </nav>
    `;
    lnb.querySelector('[data-slot="uname"]').textContent = USER.name;

    const main = document.createElement('main');
    main.className = 'main';
    main.innerHTML = `
      <div class="page">
        <div id="page-root"></div>
      </div>
      <div class="toast-stack" id="toast-stack"></div>
    `;

    shell.appendChild(lnb);
    shell.appendChild(main);

    app.appendChild(gnb);
    app.appendChild(shell);
    document.body.appendChild(app);

    gnb.querySelectorAll('.view-toggle button').forEach((b) => {
      b.addEventListener('click', () => setView(b.dataset.view));
    });

    return { root: main.querySelector('#page-root'), view };
  }

  // ===== Page header (제목 + 부제 + 우상단 action) =====
  function renderPageHead(root, opts) {
    const head = document.createElement('div');
    head.className = 'page-head';
    head.innerHTML = `
      <div>
        <h2 data-slot="title"></h2>
        ${opts.subtitle ? '<div class="subtitle" data-slot="subtitle"></div>' : ''}
      </div>
      <div class="actions" id="page-actions"></div>
    `;
    head.querySelector('[data-slot="title"]').textContent = opts.title;
    if (opts.subtitle) head.querySelector('[data-slot="subtitle"]').textContent = opts.subtitle;
    if (opts.actions) {
      const slot = head.querySelector('#page-actions');
      opts.actions.forEach((a) => slot.appendChild(a));
    }
    root.appendChild(head);
    return head;
  }

  // ===== Button factory (likelion ActionButton spec) =====
  function button({ label, icon, type = 'solid', color = 'primary', size = 'medium', onClick, disabled }) {
    const b = document.createElement('button');
    b.className = `btn btn-${size} btn-${type}-${color}`;
    b.type = 'button';
    if (icon) { const i = document.createElement('i'); i.className = `ri-icon ${icon}`; b.appendChild(i); }
    const span = document.createElement('span'); span.textContent = label; b.appendChild(span);
    if (disabled) b.disabled = true;
    if (onClick) b.addEventListener('click', onClick);
    return b;
  }

  // ===== Tag factory =====
  function tag({ label, type = 'weak', state = 'enabled', size = 'medium' }) {
    const t = document.createElement('span');
    t.className = `tag tag-${size} tag-${type}-${state}`;
    t.textContent = label;
    return t;
  }

  // ===== Toast =====
  function toast(msg, kind) {
    const stack = document.getElementById('toast-stack');
    if (!stack) return;
    const el = document.createElement('div');
    el.className = 'toast';
    if (kind) el.classList.add('toast-' + kind);
    el.textContent = msg;
    stack.appendChild(el);
    setTimeout(() => el.remove(), 2400);
  }

  // ===== Fullpage overlay (메인 영역 위 덮어쓰기, LNB/GNB는 유지) =====
  // Stack: 페이지 → 페이지 가능 (예: TIL 작성 → AI 노트 미리보기). 닫으면 직전 페이지로.
  const fullpageStack = [];
  function openFullPage(opts) {
    const fp = document.createElement('div');
    fp.className = 'fullpage';
    fp.innerHTML = `
      <div class="fullpage-head">
        <button class="fullpage-back" id="fp-back"><i class="ri-icon ri-arrow-left-line"></i><span data-slot="back-label">뒤로</span></button>
        <div id="fp-actions" style="display:flex; gap:8px; align-items:center;"></div>
      </div>
      <div id="fp-body"></div>
    `;
    // 이전 fullpage가 있으면 숨김 (스택)
    const prev = fullpageStack[fullpageStack.length - 1];
    if (prev) prev.style.display = 'none';
    document.body.appendChild(fp);
    if (opts?.backLabel) fp.querySelector('[data-slot="back-label"]').textContent = opts.backLabel;
    fp.querySelector('#fp-back').addEventListener('click', () => {
      closeFullPage();
      if (opts?.onClose) opts.onClose();
    });
    fullpageStack.push(fp);
    return {
      body: fp.querySelector('#fp-body'),
      actions: fp.querySelector('#fp-actions'),
      root: fp,
    };
  }
  function closeFullPage() {
    const cur = fullpageStack.pop();
    if (cur) cur.remove();
    const prev = fullpageStack[fullpageStack.length - 1];
    if (prev) prev.style.display = '';
  }
  function closeAllFullPages() {
    while (fullpageStack.length) fullpageStack.pop().remove();
  }

  // ===== Modal / slide panel =====
  let activePanel = null;
  function openSlide(html) {
    closeSlide();
    const backdrop = document.createElement('div');
    backdrop.className = 'modal-backdrop';
    backdrop.style.background = 'transparent';
    backdrop.addEventListener('click', closeSlide);
    const panel = document.createElement('aside');
    panel.className = 'slide-panel';
    panel.innerHTML = html;
    panel.addEventListener('click', (e) => e.stopPropagation());
    document.body.appendChild(backdrop);
    document.body.appendChild(panel);
    activePanel = { backdrop, panel };
  }
  function closeSlide() {
    if (activePanel) {
      activePanel.backdrop.remove();
      activePanel.panel.remove();
      activePanel = null;
    }
  }
  function openModal(html) {
    const backdrop = document.createElement('div');
    backdrop.className = 'modal-backdrop';
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = html;
    backdrop.appendChild(modal);
    backdrop.addEventListener('click', (e) => { if (e.target === backdrop) backdrop.remove(); });
    document.body.appendChild(backdrop);
    return backdrop;
  }

  // ===== Markdown (light) — table, blockquote, @@KEYWORDS 지원 =====
  function md(text) {
    if (!text) return '';
    const escape = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const lines = text.split('\n');
    const out = [];
    let i = 0;
    while (i < lines.length) {
      const line = lines[i];
      // Table: 헤더 + delimiter
      if (/^\|.*\|\s*$/.test(line) && i + 1 < lines.length && /^\|\s*[:\- |]+\s*\|\s*$/.test(lines[i + 1])) {
        const header = line.trim().slice(1, -1).split('|').map((c) => c.trim());
        i += 2;
        const rows = [];
        while (i < lines.length && /^\|.*\|\s*$/.test(lines[i])) {
          rows.push(lines[i].trim().slice(1, -1).split('|').map((c) => c.trim()));
          i++;
        }
        out.push(`<table><thead><tr>${header.map((h) => `<th>${escape(h)}</th>`).join('')}</tr></thead><tbody>${rows.map((r) => `<tr>${r.map((c) => `<td>${escape(c)}</td>`).join('')}</tr>`).join('')}</tbody></table>`);
        continue;
      }
      // Blockquote
      if (/^>\s+/.test(line)) {
        const buf = [];
        while (i < lines.length && /^>\s+/.test(lines[i])) {
          buf.push(lines[i].replace(/^>\s+/, ''));
          i++;
        }
        out.push(`<blockquote><p>${escape(buf.join(' '))}</p></blockquote>`);
        continue;
      }
      // KEYWORDS 칩
      if (/^@@KEYWORDS:/.test(line)) {
        const kws = line.replace(/^@@KEYWORDS:/, '').split(',').map((k) => k.trim()).filter(Boolean);
        out.push(`<div class="md-keywords">${kws.map((k) => `<span class="md-keyword">${escape(k)}</span>`).join('')}</div>`);
        i++;
        continue;
      }
      // 헤딩
      if (/^### (.+)$/.test(line)) { out.push(`<h3>${escape(line.replace(/^### /, ''))}</h3>`); i++; continue; }
      if (/^## (.+)$/.test(line)) { out.push(`<h2>${escape(line.replace(/^## /, ''))}</h2>`); i++; continue; }
      if (/^# (.+)$/.test(line)) { out.push(`<h1>${escape(line.replace(/^# /, ''))}</h1>`); i++; continue; }
      // 리스트
      if (/^- /.test(line)) {
        const buf = [];
        while (i < lines.length && /^- /.test(lines[i])) {
          buf.push(lines[i].replace(/^- /, ''));
          i++;
        }
        out.push(`<ul>${buf.map((b) => `<li>${escape(b).replace(/`([^`]+)`/g, '<code>$1</code>').replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')}</li>`).join('')}</ul>`);
        continue;
      }
      // 빈 줄
      if (line.trim() === '') { i++; continue; }
      // 일반 문단
      const para = [];
      while (i < lines.length && lines[i].trim() !== '' && !/^[#>\-|]|^@@/.test(lines[i])) {
        para.push(lines[i]);
        i++;
      }
      const txt = escape(para.join(' '))
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/`([^`]+)`/g, '<code>$1</code>');
      out.push(`<p>${txt}</p>`);
    }
    return out.join('\n');
  }

  // ===== Date helpers =====
  function fmtDate(d, opts = {}) {
    if (!d) return '';
    const date = new Date(d);
    const wk = ['일', '월', '화', '수', '목', '금', '토'][date.getDay()];
    if (opts.short) return `${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')} (${wk})`;
    if (opts.compact) return `${String(date.getFullYear()).slice(2)}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')} (${wk})`;
  }
  function relTime(iso) {
    if (!iso) return '';
    const d = new Date(iso);
    return `${d.getMonth() + 1}/${d.getDate()} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
  }

  // ===== Heatmap =====
  function renderHeatmap(opts) {
    const { rows, cols, cellLevel, onCell, rowLabel, colLabel } = opts;
    const wrap = document.createElement('div');
    wrap.className = 'heatmap-table';
    wrap.style.gridTemplateColumns = `auto repeat(${cols.length}, 14px)`;

    // header
    wrap.appendChild(document.createElement('div'));
    cols.forEach((c) => {
      const h = document.createElement('div');
      h.className = 'col-label';
      h.textContent = colLabel ? colLabel(c) : c;
      wrap.appendChild(h);
    });

    rows.forEach((row) => {
      const lbl = document.createElement('div');
      lbl.className = 'row-label';
      lbl.textContent = rowLabel ? rowLabel(row) : row;
      wrap.appendChild(lbl);
      cols.forEach((c) => {
        const cell = document.createElement('div');
        cell.className = 'heat-cell';
        const level = cellLevel(row, c);
        if (level && typeof level === 'object') {
          if (level.level !== undefined) cell.setAttribute('data-level', level.level);
          if (level.pattern) cell.setAttribute('data-pattern', level.pattern);
          if (level.excellent) cell.setAttribute('data-excellent', 'true');
          if (level.title) cell.title = level.title;
        } else {
          cell.setAttribute('data-level', level == null ? '0' : level);
        }
        if (onCell) cell.addEventListener('click', () => onCell(row, c));
        wrap.appendChild(cell);
      });
    });
    return wrap;
  }

  function renderLegend(items) {
    const wrap = document.createElement('div');
    wrap.className = 'heat-legend';
    items.forEach((it) => {
      const sp = document.createElement('span');
      const i = document.createElement('i');
      i.style.background = it.color;
      if (it.pattern === 'stripe') i.style.backgroundImage = 'repeating-linear-gradient(45deg, transparent 0 3px, rgba(0,0,0,0.15) 3px 4px)';
      sp.appendChild(i);
      const t = document.createElement('span'); t.textContent = it.label; sp.appendChild(t);
      wrap.appendChild(sp);
    });
    return wrap;
  }

  // ===== Empty / banner =====
  function emptyCard({ icon = 'ri-inbox-line', title, body, cta }) {
    const div = document.createElement('div');
    div.className = 'empty';
    div.innerHTML = `
      <div class="icon"><i class="ri-icon ${icon}"></i></div>
      <h4 data-slot="t"></h4>
      ${body ? '<p data-slot="b"></p>' : ''}
      <div data-slot="cta"></div>
    `;
    div.querySelector('[data-slot="t"]').textContent = title;
    if (body) div.querySelector('[data-slot="b"]').textContent = body;
    if (cta) {
      const btn = button({ label: cta.label, type: 'outline', color: 'neutral', onClick: cta.onClick });
      div.querySelector('[data-slot="cta"]').appendChild(btn);
    }
    return div;
  }

  function banner({ kind = 'info', icon, msg, action }) {
    const div = document.createElement('div');
    div.className = `banner banner-${kind}`;
    div.innerHTML = `<i class="ri-icon ${icon || (kind === 'error' ? 'ri-error-warning-line' : 'ri-information-line')}"></i><span data-slot="msg"></span><div class="actions" data-slot="actions"></div>`;
    div.querySelector('[data-slot="msg"]').textContent = msg;
    if (action) {
      const a = button({ label: action.label, type: kind === 'error' ? 'outline' : 'solid', color: 'primary', size: 'small', onClick: action.onClick });
      div.querySelector('[data-slot="actions"]').appendChild(a);
    }
    return div;
  }

  // ===== Likelion Select (커스텀 dropdown, system select 대체) =====
  /**
   * options: [{ value, label, sub?, score?, html? }]
   * returns: HTMLElement (wrapper). 외부에서 ele.value, ele.onChange = cb 로 사용
   */
  function select(opts) {
    const { options = [], value = null, placeholder = '선택', rich = false, onChange } = opts;
    const wrap = document.createElement('div');
    wrap.className = 'lk-select';
    let _value = value;
    let _open = false;

    const trigger = document.createElement('button');
    trigger.type = 'button';
    trigger.className = 'lk-select-trigger';
    wrap.appendChild(trigger);

    const menu = document.createElement('div');
    menu.className = 'lk-select-menu';
    menu.style.display = 'none';
    wrap.appendChild(menu);

    function repaintTrigger() {
      trigger.innerHTML = '';
      const sel = options.find((o) => o.value === _value);
      if (!sel) {
        const span = document.createElement('span');
        span.className = 'placeholder';
        span.textContent = placeholder;
        trigger.appendChild(span);
      } else {
        const span = document.createElement('span');
        span.textContent = sel.label;
        trigger.appendChild(span);
        if (sel.score != null) {
          const sc = document.createElement('span');
          sc.style.cssText = 'margin-left: auto; font-weight: 700; color: var(--lk-color-fg-primary); padding-right: 4px;';
          sc.textContent = sel.score;
          trigger.appendChild(sc);
        }
      }
    }
    function open() { _open = true; menu.style.display = ''; trigger.classList.add('is-open'); paintMenu(); }
    function close() { _open = false; menu.style.display = 'none'; trigger.classList.remove('is-open'); }
    function paintMenu() {
      menu.innerHTML = '';
      options.forEach((o) => {
        const it = document.createElement('div');
        it.className = 'lk-select-option' + (rich ? ' lk-select-option-rich' : '') + (o.value === _value ? ' is-selected' : '');
        if (rich) {
          const row = document.createElement('div');
          row.className = 'row';
          const t = document.createElement('span'); t.className = 'title'; t.textContent = o.label; row.appendChild(t);
          if (o.score != null) { const sc = document.createElement('span'); sc.className = 'score'; sc.textContent = o.score; row.appendChild(sc); }
          it.appendChild(row);
          if (o.sub) { const s = document.createElement('div'); s.className = 'sub'; s.textContent = o.sub; it.appendChild(s); }
        } else {
          const lbl = document.createElement('span'); lbl.textContent = o.label; it.appendChild(lbl);
          if (o.meta) { const m = document.createElement('span'); m.className = 'opt-meta'; m.textContent = o.meta; it.appendChild(m); }
        }
        it.addEventListener('click', () => { _value = o.value; close(); repaintTrigger(); if (onChange) onChange(_value); });
        menu.appendChild(it);
      });
    }
    trigger.addEventListener('click', (e) => { e.stopPropagation(); _open ? close() : open(); });
    document.addEventListener('click', (e) => { if (!wrap.contains(e.target)) close(); });

    Object.defineProperty(wrap, 'value', { get: () => _value, set: (v) => { _value = v; repaintTrigger(); }, configurable: true });
    repaintTrigger();
    return wrap;
  }

  // ===== Likelion Multi-Select (최대 N개 · 칩 트리거 · lk-select 톤) =====
  /**
   * options: [{ value, label, sub?, score?, disabled? }]
   * max: 최대 선택 수 (도달 시 미선택 옵션 disabled + 안내)
   * returns: HTMLElement (wrapper). ele.values (배열 get/set), opts.onChange(values)
   */
  function multiSelect(opts) {
    const { options = [], values = [], placeholder = '선택', max = Infinity, rich = false, onChange } = opts;
    const wrap = document.createElement('div');
    wrap.className = 'lk-select lk-multiselect';
    let _values = values.slice();
    let _open = false;

    const trigger = document.createElement('button');
    trigger.type = 'button';
    trigger.className = 'lk-select-trigger';
    wrap.appendChild(trigger);

    const menu = document.createElement('div');
    menu.className = 'lk-select-menu';
    menu.style.display = 'none';
    wrap.appendChild(menu);

    function repaintTrigger() {
      trigger.innerHTML = '';
      if (_values.length === 0) {
        const span = document.createElement('span');
        span.className = 'placeholder';
        span.textContent = placeholder;
        trigger.appendChild(span);
      } else {
        const chips = document.createElement('span');
        chips.className = 'lk-chips';
        _values.forEach((v) => {
          const o = options.find((x) => x.value === v);
          if (!o) return;
          const chip = document.createElement('span');
          chip.className = 'lk-chip';
          const t = document.createElement('span'); t.textContent = o.label; chip.appendChild(t);
          const x = document.createElement('i'); x.className = 'ri-icon ri-close-line';
          x.addEventListener('click', (e) => { e.stopPropagation(); _values = _values.filter((y) => y !== v); repaintTrigger(); if (_open) paintMenu(); if (onChange) onChange(_values.slice()); });
          chip.appendChild(x);
          chips.appendChild(chip);
        });
        trigger.appendChild(chips);
      }
      const cnt = document.createElement('span');
      cnt.className = 'lk-multiselect-count';
      cnt.textContent = `${_values.length} / ${max === Infinity ? '∞' : max}`;
      trigger.appendChild(cnt);
    }
    function open() { _open = true; menu.style.display = ''; trigger.classList.add('is-open'); paintMenu(); }
    function close() { _open = false; menu.style.display = 'none'; trigger.classList.remove('is-open'); }
    function paintMenu() {
      menu.innerHTML = '';
      const atMax = _values.length >= max;
      options.forEach((o) => {
        const checked = _values.includes(o.value);
        const blocked = (atMax && !checked) || o.disabled;
        const it = document.createElement('div');
        it.className = 'lk-select-option lk-multiselect-option' + (rich ? ' lk-select-option-rich' : '') + (checked ? ' is-selected' : '') + (blocked ? ' is-disabled' : '');
        const box = document.createElement('span');
        box.className = 'lk-check' + (checked ? ' is-on' : '');
        box.innerHTML = checked ? '<i class="ri-icon ri-check-line"></i>' : '';
        it.appendChild(box);
        const txt = document.createElement('span');
        txt.className = 'lk-multiselect-label';
        if (rich) {
          const top = document.createElement('div'); top.className = 'row';
          const t = document.createElement('span'); t.className = 'title'; t.textContent = o.label; top.appendChild(t);
          if (o.score != null) { const sc = document.createElement('span'); sc.className = 'score'; sc.textContent = o.score; top.appendChild(sc); }
          txt.appendChild(top);
          if (o.sub) { const s = document.createElement('div'); s.className = 'sub'; s.textContent = o.sub; txt.appendChild(s); }
        } else {
          txt.textContent = o.label;
        }
        it.appendChild(txt);
        if (!blocked) {
          it.addEventListener('click', () => {
            if (checked) _values = _values.filter((y) => y !== o.value);
            else if (_values.length < max) _values.push(o.value);
            repaintTrigger(); paintMenu();
            if (onChange) onChange(_values.slice());
          });
        }
        menu.appendChild(it);
      });
      if (max !== Infinity) {
        const hint = document.createElement('div');
        hint.className = 'lk-multiselect-hint';
        hint.textContent = _values.length >= max ? `최대 ${max}개까지 선택했어요 · 변경하려면 먼저 해제하세요` : `최대 ${max}개까지 선택할 수 있어요`;
        menu.appendChild(hint);
      }
    }
    trigger.addEventListener('click', (e) => { e.stopPropagation(); _open ? close() : open(); });
    document.addEventListener('click', (e) => { if (!wrap.contains(e.target)) close(); });

    Object.defineProperty(wrap, 'values', { get: () => _values.slice(), set: (v) => { _values = (v || []).slice(); repaintTrigger(); }, configurable: true });
    repaintTrigger();
    return wrap;
  }

  // ===== Demo state toggle (프로토타입용) =====
  function demoStateToggle(options, current, onChange) {
    const wrap = document.createElement('div');
    wrap.className = 'demo-state-toggle';
    const lbl = document.createElement('span');
    lbl.className = 'lbl';
    lbl.textContent = '데모';
    wrap.appendChild(lbl);
    options.forEach((o) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.textContent = o.label;
      if (o.value === current) btn.classList.add('is-active');
      btn.addEventListener('click', () => onChange(o.value));
      wrap.appendChild(btn);
    });
    return wrap;
  }

  // ===== expose =====
  window.UI = {
    renderShell, renderPageHead,
    button, tag, toast,
    openSlide, closeSlide, openModal,
    openFullPage, closeFullPage, closeAllFullPages,
    select, multiSelect, demoStateToggle,
    md, fmtDate, relTime,
    renderHeatmap, renderLegend, emptyCard, banner,
    getView, setView, loadState, saveState,
    stateFlag,
    USER,
  };
})();
