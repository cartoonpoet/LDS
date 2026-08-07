// 시안에서 추출한 서브페이지 본문 마크업 (링크는 실제 라우트로 변환됨)
export const GET_STARTED_MAIN = `
  <div class="doc-shell three-col">
    <aside class="sidebar">
      <div class="sidebar-sticky">
        <h5>Guide</h5>
        <a href="/get-started" class="active">Get Started</a>
        <a href="#gs-install">설치</a>
        <a href="#gs-theme">테마 적용</a>
        <a href="#gs-first">첫 컴포넌트</a>
        <h5>Next</h5>
        <a href="/foundations">Foundations</a>
        <a href="/components">Components</a>
      </div>
    </aside>
    <div class="doc-main">
      <div class="breadcrumb">Guide</div>
      <h1 class="doc-title">Get Started</h1>
      <p class="doc-desc">LDS는 법무 제품을 위한 디자인 시스템이에요. 토큰과 컴포넌트가 한 몸으로 움직여서, 설치하고 감싸기만 하면 어느 화면이든 같은 언어로 이야기하기 시작해요.</p>

      <section class="doc-section" id="gs-install">
        <h2>설치</h2>
        <p>패키지 매니저로 컴포넌트와 토큰 패키지를 함께 설치해요.</p>
        <div class="codeblock"><span class="tk-cm"># pnpm</span>
pnpm add @lds/ui-v3 @lds/tokens</div>
      </section>

      <section class="doc-section" id="gs-theme">
        <h2>테마 적용</h2>
        <p>앱 최상단을 <code>LdsProvider</code>로 감싸고 테마 클래스를 넘겨요. 토큰이 CSS 변수로 주입되면서 모든 컴포넌트가 같은 색과 간격을 바라보게 돼요.</p>
        <div class="codeblock"><span class="tk-kw">import</span> { <span class="tk-fn">lightThemeClass</span>, <span class="tk-fn">createLdsThemeVars</span> } <span class="tk-kw">from</span> <span class="tk-str">"@lds/tokens"</span>;
<span class="tk-kw">import</span> { <span class="tk-fn">LdsProvider</span> } <span class="tk-kw">from</span> <span class="tk-str">"@lds/ui-v3"</span>;

<span class="tk-kw">export const</span> <span class="tk-fn">App</span> = () <span class="tk-kw">=&gt;</span> (
  &lt;<span class="tk-tag">LdsProvider</span> <span class="tk-attr">themeClass</span>={<span class="tk-fn">lightThemeClass</span>}&gt;
    &lt;<span class="tk-tag">Router</span> /&gt;
  &lt;/<span class="tk-tag">LdsProvider</span>&gt;
);</div>
      </section>

      <section class="doc-section" id="gs-first">
        <h2>첫 컴포넌트</h2>
        <p>이제 어떤 컴포넌트든 가져다 쓰면 돼요. 색, 라운드, 간격은 토큰이 알아서 챙겨요.</p>
        <div class="codeblock"><span class="tk-kw">import</span> { <span class="tk-fn">Button</span> } <span class="tk-kw">from</span> <span class="tk-str">"@lds/ui-v3"</span>;

<span class="tk-kw">export const</span> <span class="tk-fn">Confirm</span> = () <span class="tk-kw">=&gt;</span> &lt;<span class="tk-tag">Button</span> <span class="tk-attr">variant</span>=<span class="tk-str">"solid"</span>&gt;확인&lt;/<span class="tk-tag">Button</span>&gt;;</div>
        <h3>다음 단계</h3>
        <div class="next-cards">
          <a class="next-card" href="/foundations"><b>Foundations 보기 →</b><span>색, 타이포, 간격 — 시스템의 기반을 먼저 이해해요.</span></a>
          <a class="next-card" href="/components"><b>Components 보기 →</b><span>38개 컴포넌트를 갤러리에서 한눈에 둘러봐요.</span></a>
        </div>
      </section>
    </div>
    <aside class="toc">
      <div class="toc-sticky">
        <h6>On this page</h6>
        <a href="#gs-install" class="active" data-scroll="#gs-install">설치</a>
        <a href="#gs-theme">테마 적용</a>
        <a href="#gs-first">첫 컴포넌트</a>
      </div>
    </aside>
  </div>`;
export const DEVELOP_MAIN = `
  <div class="doc-shell two-col">
    <aside class="sidebar">
      <div class="sidebar-sticky">
        <h5>Develop</h5>
        <a href="/develop" class="active">React 시작하기</a>
        <a href="#dv-pkg">패키지 구조</a>
        <a href="#dv-res">리소스</a>
        <h5>Guide</h5>
        <a href="/get-started">Get Started</a>
      </div>
    </aside>
    <div class="doc-main">
      <div class="breadcrumb">Develop</div>
      <h1 class="doc-title">React 시작하기</h1>
      <p class="doc-desc">LDS는 React 컴포넌트와 프레임워크 중립적인 토큰 패키지로 배포돼요. Vanilla Extract 기반이라 런타임 스타일 비용이 없어요.</p>
      <section class="doc-section">
        <div class="codeblock"><span class="tk-cm"># 설치</span>
pnpm add @lds/ui-v3 @lds/tokens

<span class="tk-cm">// 앱 진입점</span>
<span class="tk-kw">import</span> <span class="tk-str">"@lds/tokens/global.css"</span>;
<span class="tk-kw">import</span> { <span class="tk-fn">lightThemeClass</span> } <span class="tk-kw">from</span> <span class="tk-str">"@lds/tokens"</span>;
<span class="tk-kw">import</span> { <span class="tk-fn">LdsProvider</span> } <span class="tk-kw">from</span> <span class="tk-str">"@lds/ui-v3"</span>;</div>
      </section>
      <section class="doc-section" id="dv-pkg">
        <h2>패키지 구조</h2>
        <div class="dev-pkgs">
          <div class="dev-pkg"><code>@lds/tokens</code> <span style="font-size:12px;font-weight:700;color:var(--muted)">v0.1.0</span><p>색·간격·라운드·모션 토큰의 단일 출처예요. CSS 변수와 TypeScript 타입을 함께 내보내요.</p></div>
          <div class="dev-pkg"><code>@lds/ui-v3</code> <span style="font-size:12px;font-weight:700;color:var(--muted)">v0.1.52</span><p>토큰 위에서 만든 React 컴포넌트 54종이에요. 접근성과 테스트 454개가 배포 게이트예요.</p></div>
        </div>
      </section>
      <section class="doc-section" id="dv-res">
        <h2>리소스</h2>
        <div class="dev-links">
          <a class="dev-link" href="https://lds-storybook.vercel.app" target="_blank" rel="noreferrer">
            <span class="ic" style="background:#2151EC">S</span>
            <span><b>Storybook</b><span>컴포넌트 API와 라이브 데모</span></span>
          </a>
          <a class="dev-link" href="https://github.com/cartoonpoet/LDS" target="_blank" rel="noreferrer">
            <span class="ic" style="background:#16336E">G</span>
            <span><b>GitHub</b><span>github.com/cartoonpoet/LDS</span></span>
          </a>
        </div>
      </section>
    </div>
  </div>`;
export const FOUNDATIONS_HUB_MAIN = `
  <div class="doc-shell two-col">
    <aside class="sidebar">
      <div class="sidebar-sticky">
        <h5>Foundations</h5>
        <a href="/foundations" class="active">Overview</a>
        <a href="/foundations/color">Color</a>
        <a href="/foundations/typography">Typography</a>
        <a href="/foundations/spacing">Spacing</a>
        <a href="/foundations/radius">Radius</a>
        <a href="/foundations/shadow">Shadow</a>
        <a href="/foundations/theming">Theming</a>
      </div>
    </aside>
    <div class="doc-main">
      <h1 class="doc-title">Foundations</h1>
      <p class="doc-desc">모든 화면이 딛고 서는 공통의 기반이에요. @lds/tokens 한 벌이 색부터 그림자까지 전부를 연결해요.</p>
      <div class="hub-grid">
        <a class="hub-card" href="/foundations/color">
          <div class="hub-thumb blue"><div class="m-swatches"><i style="background:#2151EC"></i><i style="background:#7EA0FF"></i><i style="background:#DFE8FF"></i><i style="background:#16336E"></i></div></div>
          <div class="hub-name">Color<small>9개 팔레트와 시맨틱 컬러 역할</small></div>
        </a>
        <a class="hub-card" href="/foundations/typography">
          <div class="hub-thumb navy"><div class="m-type">가A<small>Pretendard</small></div></div>
          <div class="hub-name">Typography<small>폰트·크기·행간·자간 스케일과 textStyles</small></div>
        </a>
        <a class="hub-card" href="/foundations/spacing">
          <div class="hub-thumb navy"><div class="m-spacing"><i></i><i></i><i></i></div></div>
          <div class="hub-name">Spacing<small>spacing.x1~x6 · 4~24px</small></div>
        </a>
        <a class="hub-card" href="/foundations/radius">
          <div class="hub-thumb deep"><div class="m-radius"></div></div>
          <div class="hub-name">Radius<small>sm · md · lg = 4 · 6 · 8px</small></div>
        </a>
        <a class="hub-card" href="/foundations/shadow">
          <div class="hub-thumb pale"><div class="m-elev"><i></i><i></i><i></i></div></div>
          <div class="hub-name">Shadow<small>raised · focus 그림자 토큰</small></div>
        </a>
        <a class="hub-card" href="/foundations/theming">
          <div class="hub-thumb deep"><div class="m-swatches"><i style="background:#2151EC"></i><i style="background:#1FA45B"></i><i style="background:#7B5CE6"></i><i style="background:#F07A23"></i></div></div>
          <div class="hub-name">Theming<small>createLdsThemeVars 브랜드 오버라이드</small></div>
        </a>
      </div>
    </div>
  </div>`;
export const FOUNDATIONS_COLOR_MAIN = `
  <div class="doc-shell three-col">
    <aside class="sidebar">
      <div class="sidebar-sticky">
        <h5>Foundations</h5>
        <a href="/foundations">Overview</a>
        <a href="/foundations/color" class="active">Color</a>
        <a href="/foundations/typography">Typography</a>
        <a href="/foundations/spacing">Spacing</a>
        <a href="/foundations/radius">Radius</a>
        <a href="/foundations/shadow">Shadow</a>
        <a href="/foundations/theming">Theming</a>
      </div>
    </aside>

    <div class="doc-main">
      <div class="breadcrumb">Foundations</div>
      <h1 class="doc-title">Color</h1>
      <p class="doc-desc">LDS 색상 시스템은 접근성을 고려하면서 제품의 계층, 상태, 브랜드를 표현할 수 있도록 도와요.</p>

      <div class="color-hero">
        <span class="orbit o1"></span>
        <span class="orbit o2"></span>
        <span class="orbit o3"></span>
        <span class="orbit o4"></span>
        <span class="orbit o5"></span>
        <span class="strip st1"></span>
        <span class="strip st2"></span>
      </div>

      <div class="doc-tabs">
        <a class="on" href="#sec-overview">Overview</a>
        <a href="#sec-roles">Roles</a>
        <a href="#sec-palette">Palette</a>
      </div>

      <section class="doc-section" id="sec-overview">
        <h2>Overview</h2>
        <p>LDS의 색은 두 층으로 나뉘어요. 원색 값 그대로의 <code>Palette Color</code>, 그리고 쓰임새에 이름을 붙인 <code>Role Based Color</code>예요. 화면을 만들 때는 언제나 역할 색을 먼저 사용해요.</p>
        <p>역할 색만 사용하면 다크 모드 전환이나 브랜드 테마 교체가 코드 수정 없이 이루어져요. <code>createLdsThemeVars</code>가 팔레트를 역할에 다시 연결해 주기 때문이에요.</p>
      </section>

      <section class="doc-section" id="sec-roles">
        <h2>Role Based Color</h2>
        <p>역할 색은 "이 색이 무엇인지"가 아니라 "이 색이 무엇을 하는지"를 말해요. <code>$color.accent</code>는 행동을 부르는 색, <code>$color.danger</code>는 되돌릴 수 없는 일을 경고하는 색이에요.</p>
        <p>역할 색은 <code>surface</code> · <code>text</code> · <code>border</code> · <code>action</code> 네 그룹으로 나뉘어요. 맥락별 대비 기준을 통과한 값이 배정되어, 어떤 조합을 골라도 WCAG AA 대비를 지켜요.</p>
        <div class="swatch-group">
          <h4>semanticColorRoles · action</h4>
          <div class="swatch-row s3">
            <div class="swatch on-dark" style="background:#2151EC"><span class="nm">action.accent</span><span class="hx">#2151EC</span></div>
            <div class="swatch on-dark" style="background:#1739A5"><span class="nm">action.hover</span><span class="hx">#1739A5</span></div>
            <div class="swatch on-dark" style="background:#16336E"><span class="nm">action.deep</span><span class="hx">#16336E</span></div>
          </div>
        </div>
        <div class="swatch-group">
          <h4>greenPalette · yellowPalette · redPalette</h4>
          <div class="swatch-row s3">
            <div class="swatch on-dark" style="background:#28C76F"><span class="nm">green.500</span><span class="hx">#28C76F</span></div>
            <div class="swatch on-dark" style="background:#F0AF23"><span class="nm">yellow.500</span><span class="hx">#F0AF23</span></div>
            <div class="swatch on-dark" style="background:#EA5455"><span class="nm">red.500</span><span class="hx">#EA5455</span></div>
          </div>
        </div>
      </section>

      <section class="doc-section" id="sec-palette">
        <h2>Palette Color</h2>
        <p>팔레트는 gray · blue · green · red · yellow · cyan · dark · opacity · scourt 아홉 벌로 구성돼요. 숫자가 커질수록 어두워지고, 각 단계는 흰색·검정 텍스트와의 대비가 검증되어 있어요.</p>
        <div class="swatch-group">
          <h4>bluePalette</h4>
          <div class="swatch-row">
            <div class="swatch on-light" style="background:#EEF3FF"><span class="nm">blue.50</span><span class="hx">#EEF3FF</span></div>
            <div class="swatch on-light" style="background:#DFE8FF"><span class="nm">blue.100</span><span class="hx">#DFE8FF</span></div>
            <div class="swatch on-light" style="background:#7EA0FF"><span class="nm">blue.300</span><span class="hx">#7EA0FF</span></div>
            <div class="swatch on-dark" style="background:#2151EC"><span class="nm">blue.500</span><span class="hx">#2151EC</span></div>
            <div class="swatch on-dark" style="background:#1739A5"><span class="nm">blue.600</span><span class="hx">#1739A5</span></div>
            <div class="swatch on-dark" style="background:#16336E"><span class="nm">blue.800</span><span class="hx">#16336E</span></div>
          </div>
        </div>
        <div class="swatch-group">
          <h4>grayPalette · darkPalette</h4>
          <div class="swatch-row">
            <div class="swatch on-light" style="background:#FFFFFF;border-color:#EEEFF2"><span class="nm">surface.default</span><span class="hx">#FFFFFF</span></div>
            <div class="swatch on-light" style="background:#F2F4F6"><span class="nm">gray.100</span><span class="hx">#F2F4F6</span></div>
            <div class="swatch on-light" style="background:#EEEFF2"><span class="nm">border.default</span><span class="hx">#EEEFF2</span></div>
            <div class="swatch on-dark" style="background:#626F86"><span class="nm">text.muted</span><span class="hx">#626F86</span></div>
            <div class="swatch on-dark" style="background:#11152A"><span class="nm">dark.900</span><span class="hx">#11152A</span></div>
            <div class="swatch on-dark" style="background:#0D0F14"><span class="nm">dark.950</span><span class="hx">#0D0F14</span></div>
          </div>
        </div>
      </section>
    </div>

    <aside class="toc">
      <div class="toc-sticky">
        <h6>On this page</h6>
        <a href="#sec-overview" class="active" data-scroll="#sec-overview">Overview</a>
        <a href="#sec-roles">Role Based Color</a>
        <a href="#sec-palette">Palette Color</a>
      </div>
    </aside>
  </div>`;
