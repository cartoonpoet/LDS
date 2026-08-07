// 시안(lds-site-fullscreen-hero.html)에서 추출한 홈 섹션 마크업
export const FILM_HTML = `<div class="film-scene fs-1">
            <div class="fl-zoom">
              <div class="fl-typo">
                <div class="fl-row fl-r1">
                <span class="fl-word"><span class="fl-c"><b>D</b></span><span class="fl-c"><b style="animation-delay:0.045s">e</b></span><span class="fl-c"><b style="animation-delay:0.090s">s</b></span><span class="fl-c"><b style="animation-delay:0.135s">i</b></span><span class="fl-c"><b style="animation-delay:0.180s">g</b></span><span class="fl-c"><b style="animation-delay:0.225s">n</b></span></span>
                <span class="fl-word"><span class="fl-c"><b style="animation-delay:0.270s">t</b></span><span class="fl-c"><b style="animation-delay:0.315s">o</b></span></span>
                <span class="fl-word"><span class="fl-c"><b style="animation-delay:0.360s">C</b></span><span class="fl-c"><b style="animation-delay:0.405s">o</b></span><span class="fl-c"><b style="animation-delay:0.450s">d</b></span><span class="fl-c"><b style="animation-delay:0.495s">e</b></span></span>
                </div>
                <div class="fl-row fl-r2">
                <span class="fl-word"><span class="fl-c"><b>C</b></span><span class="fl-c"><b style="animation-delay:0.045s">o</b></span><span class="fl-c"><b style="animation-delay:0.090s">d</b></span><span class="fl-c"><b style="animation-delay:0.135s">e</b></span></span>
                <span class="fl-word"><span class="fl-c"><b style="animation-delay:0.180s">t</b></span><span class="fl-c"><b style="animation-delay:0.225s">o</b></span></span>
                <span class="fl-word"><span class="fl-c"><b style="animation-delay:0.270s">L</b></span><span class="fl-c"><b style="animation-delay:0.315s">a</b></span><span class="fl-c"><b style="animation-delay:0.360s">w</b></span></span>
                  <span class="fl-dot2"></span>
                </div>
              </div>
            </div>
          </div>
          <div class="film-scene fs-2">
            <span class="fl-arm a1"></span>
            <span class="fl-arm a2"></span>
            <span class="fl-arm a3"></span>
            <span class="fl-dot"></span>
            <svg class="fl-spark" viewBox="0 0 100 100" fill="#11152A"><path d="M50 0C55.5 29 71 44.5 100 50C71 55.5 55.5 71 50 100C44.5 71 29 55.5 0 50C29 44.5 44.5 29 50 0Z"/></svg>
          </div>
          <div class="film-scene fs-3">
            <span class="fl-band b1"></span>
            <span class="fl-band b2"></span>
            <span class="fl-band b3"></span>
            <span class="fl-band b4"></span>
            <span class="fl-band b5"></span>
          </div>
          <div class="film-scene fs-4">
            <svg class="fl-close" viewBox="0 0 100 100" fill="#11152A"><path d="M50 0C55.5 29 71 44.5 100 50C71 55.5 55.5 71 50 100C44.5 71 29 55.5 0 50C29 44.5 44.5 29 50 0Z"/></svg>
            <div class="fl-lock">
              <svg viewBox="0 0 100 100" fill="#11152A"><path d="M50 0C55.5 29 71 44.5 100 50C71 55.5 55.5 71 50 100C44.5 71 29 55.5 0 50C29 44.5 44.5 29 50 0Z"/></svg>
              <span class="fl-lock-word">LDS</span>
            </div>
          </div>`;
export const BENTO_HTML = `<div class="bento">
        <div class="card card-table">
          <div class="card-label">계약 목록</div>
          <table class="lds-table">
            <thead>
              <tr><th>계약명</th><th>상태</th><th>계약금액</th></tr>
            </thead>
            <tbody>
              <tr><td>서비스 이용약관 개정 계약</td><td><span class="chip review">검토중</span></td><td>₩120,000,000</td></tr>
              <tr><td>클라우드 인프라 공급 계약</td><td><span class="chip done">체결완료</span></td><td>₩84,500,000</td></tr>
              <tr><td>공동 마케팅 업무협약</td><td><span class="chip hold">보류</span></td><td>₩36,000,000</td></tr>
              <tr><td>SW 라이선스 갱신 계약</td><td><span class="chip review">검토중</span></td><td>₩58,200,000</td></tr>
              <tr><td>물류센터 임대차 계약</td><td><span class="chip risk">위험조항</span></td><td>₩210,000,000</td></tr>
            </tbody>
          </table>
        </div>

        <div class="card card-stat">
          <div class="card-label">이번 달 처리 계약</div>
          <div class="stat-num"><span data-count="128">0</span><span class="stat-delta">▲ 12%</span></div>
          <div class="stat-bars"><i></i><i></i><i></i><i></i><i></i><i class="hot"></i></div>
        </div>

        <div class="card card-switch dark">
          <div class="card-label">알림 설정</div>
          <div class="switch-row">
            <span class="switch-name">자동 결재 알림</span>
            <span class="lds-switch"></span>
          </div>
          <div class="switch-hint">결재 요청이 오면 바로 알려드려요</div>
        </div>

        <div class="card card-steps">
          <div class="card-label">결재 진행</div>
          <div class="steps">
            <span class="step-dot d1"><svg viewBox="0 0 12 12" fill="none"><path d="M2.5 6.2L5 8.7L9.5 3.5" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
            <span class="step-bar b1"><i></i></span>
            <span class="step-dot d2"><svg viewBox="0 0 12 12" fill="none"><path d="M2.5 6.2L5 8.7L9.5 3.5" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
            <span class="step-bar b2"><i></i></span>
            <span class="step-dot d3"><svg viewBox="0 0 12 12" fill="none"><path d="M2.5 6.2L5 8.7L9.5 3.5" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
            <span class="step-bar b3"><i></i></span>
            <span class="step-dot d4"><svg viewBox="0 0 12 12" fill="none"><path d="M2.5 6.2L5 8.7L9.5 3.5" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
          </div>
          <div class="step-names"><span>기안</span><span>검토</span><span>법무팀</span><span>완료</span></div>
        </div>

        <div class="card card-toast pale">
          <div class="card-label">Toast</div>
          <div class="toast-stage">
            <div class="toast">
              <span class="toast-ic"><svg viewBox="0 0 12 12" fill="none"><path d="M2.5 6.2L5 8.7L9.5 3.5" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
              <span class="toast-txt">계약서가 승인됐어요<small>방금 전 · 법무팀 김변호사</small></span>
            </div>
          </div>
        </div>

        <div class="card card-avatars">
          <div class="card-label">함께 검토하는 중</div>
          <div class="avatar-row">
            <span class="avatar a1">김</span>
            <span class="avatar a2">이</span>
            <span class="avatar a3">박</span>
            <span class="avatar a4">정</span>
            <span class="avatar more">+3</span>
            <span class="avatar-live"><span class="dot"></span>7명 실시간 협업</span>
          </div>
        </div>

        <div class="card card-progress">
          <div class="card-label">ProgressBar</div>
          <div class="progress-head">
            <span class="progress-title">3분기 계약 검토 진행률</span>
            <span class="progress-pct">72%</span>
          </div>
          <div class="progress-track"><div class="progress-fill"></div></div>
          <div class="progress-meta"><span>검토 완료 <b>86건</b></span><span>진행중 <b>24건</b></span><span>대기 <b>9건</b></span></div>
        </div>
      </div>`;
export const DARK_HTML = `<div class="dark-zone" id="darkZone">
    <section class="intro">
      <div class="container">
        <div class="intro-grid">
          <h2 class="intro-title reveal">법무 제품의<br>디자인 시스템<br><span class="accent">LDS</span></h2>
          <div class="intro-desc reveal d1">
            <p>LDS는 법무 제품의 뿌리가 되는 디자인 시스템이에요. 컴포넌트, 인터랙션, 스타일을 하나의 기준으로 정의해 더 빠르고 일관된 사용자 경험을 만들 수 있게 해요.</p>
            <p>계약 관리부터 자문, 결재, 전자서명까지 — 서로 다른 화면이 같은 언어로 이야기할 때, 사용자는 배우지 않고도 제품을 이해할 수 있어요.</p>
          </div>
        </div>
      </div>
      <div class="subway-wrap">
        <svg class="subway" viewBox="0 0 1440 520" preserveAspectRatio="xMidYMid slice">
          <path class="flow" d="M-60 400 H 380 Q 450 400 496 354 L 640 210 Q 686 164 756 164 H 1500" stroke="#2151EC" stroke-width="14" stroke-dasharray="360 260"/>
          <path class="flow f2" d="M-60 130 H 500 Q 570 130 616 176 L 760 320 Q 806 366 876 366 H 1500" stroke="#7EA0FF" stroke-width="10" stroke-dasharray="300 320"/>
          <path class="flow f3" d="M210 -60 V 220 Q 210 290 280 290 H 1010 Q 1080 290 1080 360 V 580" stroke="#16336E" stroke-width="14" stroke-dasharray="420 240"/>
          <path d="M-60 462 H 900 Q 970 462 1016 416 L 1120 312" stroke="#DFE8FF" stroke-width="6" opacity="0.16" fill="none"/>
          <circle class="station s1" cx="496" cy="354" r="10" fill="#0D0F14" stroke="#2151EC" stroke-width="5"/>
          <circle class="station s2" cx="756" cy="164" r="10" fill="#0D0F14" stroke="#2151EC" stroke-width="5"/>
          <circle class="station s3" cx="616" cy="176" r="8" fill="#0D0F14" stroke="#7EA0FF" stroke-width="4"/>
          <circle class="station s4" cx="876" cy="366" r="8" fill="#0D0F14" stroke="#7EA0FF" stroke-width="4"/>
          <circle class="station s5" cx="210" cy="220" r="10" fill="#0D0F14" stroke="#16336E" stroke-width="5"/>
          <circle class="station s2" cx="1080" cy="360" r="10" fill="#0D0F14" stroke="#16336E" stroke-width="5"/>
          <circle class="station s3" cx="280" cy="290" r="8" fill="#0D0F14" stroke="#16336E" stroke-width="4"/>
        </svg>
      </div>
    </section>

    <section class="principles">
      <div class="container">
        <div class="principles-grid">
          <div class="principles-sticky">
            <div class="section-eyebrow">Principles</div>
            <h2 class="section-title">LDS의<br>디자인 원칙</h2>
            <p>세 가지 원칙이 모든 컴포넌트와 패턴의 판단 기준이 돼요. 새로운 화면을 만들 때도, 기존 화면을 고칠 때도 같은 기준으로 결정해요.</p>
          </div>
          <div class="principle-list">
            <div class="principle reveal">
              <div class="principle-visual pv-1">
                <div class="pv-grid">
                  <i></i><i class="on"></i><i></i><i></i><i class="on"></i><i></i><i></i><i></i><i class="on"></i>
                  <i class="on"></i><i></i><i></i><i class="on"></i><i></i><i></i><i class="on"></i><i></i><i></i>
                  <i></i><i></i><i class="on"></i><i></i><i></i><i class="on"></i><i></i><i></i><i class="on"></i>
                  <i></i><i class="on"></i><i></i><i></i><i class="on"></i><i></i><i class="on"></i><i></i><i></i>
                </div>
              </div>
              <h3>Consistent &amp; Dense</h3>
              <p>정보 밀도가 높은 법무 화면에서도 흔들리지 않는 일관된 판단 기준을 제공해요. 어떤 화면을 열어도 같은 규칙이 사용자를 기다려요.</p>
            </div>
            <div class="principle reveal">
              <div class="principle-visual pv-2">
                <div class="pv-rings"><span></span><span></span><span></span><span></span></div>
              </div>
              <h3>Accessible &amp; Clear</h3>
              <p>명확한 표현과 예측 가능한 구조로, 누구나 동등하게 제품을 사용할 수 있게 해요. 대비, 크기, 포커스까지 접근성이 기본값이에요.</p>
            </div>
            <div class="principle reveal">
              <div class="principle-visual pv-3">
                <div class="pv-orbs"><span></span><span></span><span></span><span></span></div>
              </div>
              <h3>Themeable &amp; Alive</h3>
              <p>토큰 기반 테마 시스템으로 어떤 브랜드에서도 살아있는 경험을 만들어요. 색 하나를 바꾸면 제품 전체가 새 브랜드로 숨 쉬기 시작해요.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="foundations">
      <div class="container foundations-head reveal">
        <div class="section-eyebrow">Foundations</div>
        <h2 class="section-title">LDS의 기반</h2>
        <p>토큰부터 모션까지, 모든 화면이 딛고 서는 공통의 기반이에요.</p>
      </div>
      <div class="marquee">
        <div class="m-track" id="marqueeA">
          <div class="m-card pale"><div class="m-code"><span class="k">$color</span>.accent.500<br><span class="k">$spacing</span>.x4 <span style="opacity:.55">→ 16px</span><br><span class="k">$radius</span>.card <span style="opacity:.55">→ 16px</span></div><div class="m-title">Design Token</div></div>
          <div class="m-card blue"><div class="m-swatches"><i style="background:#2151EC"></i><i style="background:#7EA0FF"></i><i style="background:#DFE8FF"></i><i style="background:#16336E"></i></div><div class="m-title">Color</div></div>
          <div class="m-card navy"><div class="m-type">가A<small>Pretendard</small></div><div class="m-title">Typography</div></div>
          <div class="m-card pale"><div class="m-icons">
            <svg viewBox="0 0 24 24" fill="none"><path d="M12 3v18M5 7h14M5 7l-2.5 6a3.5 3.5 0 0 0 7 0L7 7M17 7l-2.5 6a3.5 3.5 0 0 0 7 0L19 7M8 21h8" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>
            <svg viewBox="0 0 24 24" fill="none"><path d="M7 3h7l4 4v14H7V3Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="M10 12h5M10 16h5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>
            <svg viewBox="0 0 24 24" fill="none"><path d="M12 3l2.4 5.4 5.6.6-4.2 3.9 1.2 5.6L12 15.6 7 18.5l1.2-5.6L4 9l5.6-.6L12 3Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>
          </div><div class="m-title">Icon</div></div>
          <div class="m-card pale"><div class="m-elev"><i></i><i></i><i></i></div><div class="m-title">Shadow</div></div>
          <div class="m-card deep"><div class="m-radius"></div><div class="m-title">Radius</div></div>
          <div class="m-card deep"><div class="m-swatches"><i style="background:#2151EC"></i><i style="background:#1FA45B"></i><i style="background:#7B5CE6"></i><i style="background:#F07A23"></i></div><div class="m-title">Theming</div></div>
          <div class="m-card navy"><div class="m-spacing"><i></i><i></i><i></i></div><div class="m-title">Spacing</div></div>
        
          <div class="m-card pale"><div class="m-code"><span class="k">$color</span>.accent.500<br><span class="k">$spacing</span>.x4 <span style="opacity:.55">→ 16px</span><br><span class="k">$radius</span>.card <span style="opacity:.55">→ 16px</span></div><div class="m-title">Design Token</div></div>
          <div class="m-card blue"><div class="m-swatches"><i style="background:#2151EC"></i><i style="background:#7EA0FF"></i><i style="background:#DFE8FF"></i><i style="background:#16336E"></i></div><div class="m-title">Color</div></div>
          <div class="m-card navy"><div class="m-type">가A<small>Pretendard</small></div><div class="m-title">Typography</div></div>
          <div class="m-card pale"><div class="m-icons">
            <svg viewBox="0 0 24 24" fill="none"><path d="M12 3v18M5 7h14M5 7l-2.5 6a3.5 3.5 0 0 0 7 0L7 7M17 7l-2.5 6a3.5 3.5 0 0 0 7 0L19 7M8 21h8" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>
            <svg viewBox="0 0 24 24" fill="none"><path d="M7 3h7l4 4v14H7V3Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="M10 12h5M10 16h5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>
            <svg viewBox="0 0 24 24" fill="none"><path d="M12 3l2.4 5.4 5.6.6-4.2 3.9 1.2 5.6L12 15.6 7 18.5l1.2-5.6L4 9l5.6-.6L12 3Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>
          </div><div class="m-title">Icon</div></div>
          <div class="m-card pale"><div class="m-elev"><i></i><i></i><i></i></div><div class="m-title">Shadow</div></div>
          <div class="m-card deep"><div class="m-radius"></div><div class="m-title">Radius</div></div>
          <div class="m-card deep"><div class="m-swatches"><i style="background:#2151EC"></i><i style="background:#1FA45B"></i><i style="background:#7B5CE6"></i><i style="background:#F07A23"></i></div><div class="m-title">Theming</div></div>
          <div class="m-card navy"><div class="m-spacing"><i></i><i></i><i></i></div><div class="m-title">Spacing</div></div>
        </div>
      </div>
      <div class="marquee rev">
        <div class="m-track" id="marqueeB">
          <div class="m-card navy"><div class="m-spacing"><i></i><i></i><i></i></div><div class="m-title">Spacing</div></div>
          <div class="m-card deep"><div class="m-radius"></div><div class="m-title">Radius</div></div>
          <div class="m-card deep"><div class="m-swatches"><i style="background:#2151EC"></i><i style="background:#1FA45B"></i><i style="background:#7B5CE6"></i><i style="background:#F07A23"></i></div><div class="m-title">Theming</div></div>
          <div class="m-card pale"><div class="m-code"><span class="k">$color</span>.bg.dark<br><span class="k">$elev</span>.floating<br><span class="k">$font</span>.heading.xl</div><div class="m-title">Design Token</div></div>
          <div class="m-card navy"><div class="m-type">가A<small>Pretendard</small></div><div class="m-title">Typography</div></div>
          <div class="m-card blue"><div class="m-swatches"><i style="background:#16336E"></i><i style="background:#2151EC"></i><i style="background:#7EA0FF"></i><i style="background:#DFE8FF"></i></div><div class="m-title">Color</div></div>
          <div class="m-card pale"><div class="m-elev"><i></i><i></i><i></i></div><div class="m-title">Shadow</div></div>
          <div class="m-card blue"><div class="m-icons" style="color:#fff">
            <svg viewBox="0 0 24 24" fill="none"><path d="M12 3v18M5 7h14M5 7l-2.5 6a3.5 3.5 0 0 0 7 0L7 7M17 7l-2.5 6a3.5 3.5 0 0 0 7 0L19 7M8 21h8" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>
            <svg viewBox="0 0 24 24" fill="none"><path d="M7 3h7l4 4v14H7V3Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="M10 12h5M10 16h5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>
            <svg viewBox="0 0 24 24" fill="none"><path d="M12 3l2.4 5.4 5.6.6-4.2 3.9 1.2 5.6L12 15.6 7 18.5l1.2-5.6L4 9l5.6-.6L12 3Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>
          </div><div class="m-title">Icon</div></div>
        
          <div class="m-card navy"><div class="m-spacing"><i></i><i></i><i></i></div><div class="m-title">Spacing</div></div>
          <div class="m-card deep"><div class="m-radius"></div><div class="m-title">Radius</div></div>
          <div class="m-card deep"><div class="m-swatches"><i style="background:#2151EC"></i><i style="background:#1FA45B"></i><i style="background:#7B5CE6"></i><i style="background:#F07A23"></i></div><div class="m-title">Theming</div></div>
          <div class="m-card pale"><div class="m-code"><span class="k">$color</span>.bg.dark<br><span class="k">$elev</span>.floating<br><span class="k">$font</span>.heading.xl</div><div class="m-title">Design Token</div></div>
          <div class="m-card navy"><div class="m-type">가A<small>Pretendard</small></div><div class="m-title">Typography</div></div>
          <div class="m-card blue"><div class="m-swatches"><i style="background:#16336E"></i><i style="background:#2151EC"></i><i style="background:#7EA0FF"></i><i style="background:#DFE8FF"></i></div><div class="m-title">Color</div></div>
          <div class="m-card pale"><div class="m-elev"><i></i><i></i><i></i></div><div class="m-title">Shadow</div></div>
          <div class="m-card blue"><div class="m-icons" style="color:#fff">
            <svg viewBox="0 0 24 24" fill="none"><path d="M12 3v18M5 7h14M5 7l-2.5 6a3.5 3.5 0 0 0 7 0L7 7M17 7l-2.5 6a3.5 3.5 0 0 0 7 0L19 7M8 21h8" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>
            <svg viewBox="0 0 24 24" fill="none"><path d="M7 3h7l4 4v14H7V3Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="M10 12h5M10 16h5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>
            <svg viewBox="0 0 24 24" fill="none"><path d="M12 3l2.4 5.4 5.6.6-4.2 3.9 1.2 5.6L12 15.6 7 18.5l1.2-5.6L4 9l5.6-.6L12 3Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>
          </div><div class="m-title">Icon</div></div>
        </div>
      </div>
    </section>

    <section class="articles">
      <div class="container">
        <div class="articles-head reveal">
          <div class="section-eyebrow">Journey</div>
          <h2 class="section-title">LDS가 자라나는 과정</h2>
          <p>디자인 시스템이 제품과 함께 성장해 온 이야기예요.</p>
        </div>
        <div class="article-grid">
          <div class="article-card reveal">
            <div class="article-thumb th-1">
              <div class="th-1-inner">
                <div class="th-check-row"><span class="ck"><svg viewBox="0 0 12 12" fill="none"><path d="M2.5 6.2L5 8.7L9.5 3.5" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg></span>a11y · 포커스 링 검증 통과</div>
                <div class="th-check-row"><span class="ck"><svg viewBox="0 0 12 12" fill="none"><path d="M2.5 6.2L5 8.7L9.5 3.5" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg></span>visual regression 통과</div>
                <div class="th-check-row"><span class="ck"><svg viewBox="0 0 12 12" fill="none"><path d="M2.5 6.2L5 8.7L9.5 3.5" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg></span>272 tests passed</div>
              </div>
            </div>
            <div class="article-body">
              <h3>54개 컴포넌트, 454개 테스트 — 품질 게이트와 함께 성장</h3>
              <p>모든 컴포넌트가 테스트와 접근성 검증을 통과해야 배포돼요.</p>
            </div>
          </div>
          <div class="article-card reveal d1">
            <div class="article-thumb th-2">
              <div class="th-frame"><i></i><i></i><i></i><i></i></div>
              <span class="th-arrow"><svg viewBox="0 0 24 24" fill="none"><path d="M4 12h15M13 6l6 6-6 6" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
              <div class="th-code"><i></i><i></i><i></i><i></i><i></i></div>
            </div>
            <div class="article-body">
              <h3>Zeplin에서 코드까지 — 디자인 스펙이 곧 구현 기준</h3>
              <p>디자인 스펙과 코드가 같은 토큰을 바라보며 어긋나지 않아요.</p>
            </div>
          </div>
          <div class="article-card reveal d2">
            <div class="article-thumb th-3">
              <div class="th-3-inner">
                <div class="th-orbits"><i></i><i></i><i></i><i></i></div>
                <span class="th-token-chip">createLdsThemeVars()</span>
              </div>
            </div>
            <div class="article-body">
              <h3>하나의 토큰, 여러 브랜드 — createLdsThemeVars로 브랜드 컬러 교체</h3>
              <p>토큰 한 벌로 어떤 브랜드의 법무 제품이든 옷을 갈아입어요.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>`;
export const FOOTER_HTML = `<footer class="footer">
    <div class="container">
      <div class="footer-top">
        <div>
          <div class="footer-slogan">Rooted in Law.</div>
          <div class="footer-copy">© 2026 LDS. Legal Design System.</div>
        </div>
        <div class="footer-cols">
          <div class="footer-col">
            <h4>Menu</h4>
            <a href="/get-started">Get Started</a>
            <a href="/foundations">Foundations</a>
            <a href="/components">Components</a>
            <a href="/updates">Updates</a>
          </div>
          <div class="footer-col">
            <h4>More</h4>
            <a href="https://lds-storybook.vercel.app" target="_blank" rel="noreferrer">Storybook</a>
            <a href="https://github.com/cartoonpoet/LDS" target="_blank" rel="noreferrer">GitHub</a>
          </div>
        </div>
      </div>
    </div>
    <div class="footer-wordmark-wrap">
      <div class="footer-wordmark">LDS</div>
    </div>
  </footer>`;
