// 시안 갤러리의 컴포넌트 미니 프리뷰 마크업 (slug -> html)
export const COMPONENT_PREVIEWS: Record<string, string> = {
  alert: `<div class="p-alert"><span class="ic">i</span><span class="ln"><i></i><i></i></span></div>`,
  autocomplete: `<div class="p-dropdown"><div class="fld">김변<span class="caret2" style="display:inline-block;vertical-align:middle;margin-left:2px"></span></div><div class="menu"><i class="on">김변호사</i><i>김변리사</i></div></div>`,
  avatar: `<div class="p-avatar"><span style="background:#2151EC">김</span><span style="background:#16336E">이</span><span style="background:#7EA0FF;color:#16336E">박</span><span style="background:#EEF3FF;color:#2151EC">+3</span></div>`,
  badge: `<div style="display:flex;gap:26px"><span class="p-badge"><svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M18 16H6c1.2-1.4 1.8-3.2 1.8-5.2V9a4.2 4.2 0 1 1 8.4 0v1.8c0 2 .6 3.8 1.8 5.2ZM10 19a2 2 0 0 0 4 0" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg><b>3</b></span><span class="p-badge"><svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M7 3h7l4 4v14H7V3Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="M10 12h5M10 16h5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg><b class="blue">12</b></span></div>`,
  button: `<div class="p-button"><span class="btn pri">계약 생성</span><span class="btn sec">취소</span></div>`,
  buttongroup: `<div class="p-btngroup"><span class="on">전체</span><span>검토중</span><span>완료</span></div>`,
  buttontab: `<div class="p-btngroup"><span class="on">계약</span><span>자문</span><span>송무</span></div>`,
  calendarpopover: `<div class="p-cal"><div class="hd">2026. 08</div><div class="gr"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i class="on"></i><i></i><i></i><i></i><i></i></div></div>`,
  card: `<div class="p-cardui"><div class="img"></div><div class="bd"><i></i><i></i></div></div>`,
  charttooltip: `<div class="p-tipwrap"><span class="p-tip">8월 · 128건</span><div class="p-widget" style="width:auto;border:none;background:transparent;padding:0"><div class="bars"><i></i><i></i><i></i><i></i></div></div></div>`,
  checkbox: `<div class="p-check">
            <span class="row"><span class="box on"><svg viewBox="0 0 12 12" fill="none"><path d="M2.5 6.2L5 8.7L9.5 3.5" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg></span>위험조항 포함</span>
            <span class="row"><span class="box"></span>자동 갱신 계약</span>
          </div>`,
  chip: `<div class="p-chipset"><span class="p-chip2">전자서명</span><span class="p-chip2 gray x">위임장</span></div>`,
  chipsnavigation: `<div class="p-chipset"><span class="p-chip2" style="background:#2151EC;color:#fff">전체</span><span class="p-chip2 gray">진행중</span><span class="p-chip2 gray">완료</span></div>`,
  collapse: `<div class="p-collapse"><div class="hd">제3조 손해배상<svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 3.5L5 6.5L8 3.5" stroke="#626F86" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg></div><div class="bd"><i></i><i style="width:70%"></i></div></div>`,
  datatable: `<div class="p-datatable">
            <div class="hd"><span>계약명</span><span>상태</span><span>금액</span></div>
            <div class="rw sel"><span>이용약관 개정</span><span style="color:#2151EC">검토중</span><span>1.2억</span></div>
            <div class="rw"><span>인프라 공급</span><span style="color:#1a9d55">완료</span><span>0.8억</span></div>
            <div class="rw"><span>업무협약</span><span style="color:#b57f0b">보류</span><span>0.3억</span></div>
          </div>`,
  datepicker: `<div class="p-cal"><div class="hd">2026. 08</div><div class="gr"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i class="on"></i><i class="in"></i><i class="in"></i><i class="on"></i><i></i><i></i><i></i></div></div>`,
  dropdown: `<div class="p-dropdown">
            <div class="fld">담당 변호사 <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 3.5L5 6.5L8 3.5" stroke="#626F86" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
            <div class="menu"><i class="on">김변호사</i><i>이변호사</i></div>
          </div>`,
  fileupload: `<div class="p-file"><svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 16V5M7.5 9.5 12 5l4.5 4.5M5 19h14" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>계약서를 끌어다 놓으세요</div>`,
  icon: `<div class="m-icons" style="color:#2151EC"><svg viewBox="0 0 24 24" fill="none"><path d="M12 3v18M5 7h14M5 7l-2.5 6a3.5 3.5 0 0 0 7 0L7 7M17 7l-2.5 6a3.5 3.5 0 0 0 7 0L19 7M8 21h8" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg><svg viewBox="0 0 24 24" fill="none"><path d="M7 3h7l4 4v14H7V3Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="M10 12h5M10 16h5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg><svg viewBox="0 0 24 24" fill="none"><path d="M12 3l2.4 5.4 5.6.6-4.2 3.9 1.2 5.6L12 15.6 7 18.5l1.2-5.6L4 9l5.6-.6L12 3Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg></div>`,
  iconbuttongroup: `<div class="p-iconbtns"><span class="on"><svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M7 3h7l4 4v14H7V3Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="M10 12h5M10 16h5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg></span><span><svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M7 3h7l4 4v14H7V3Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="M10 12h5M10 16h5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg></span><span><svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M7 3h7l4 4v14H7V3Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="M10 12h5M10 16h5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg></span></div>`,
  infopopover: `<div class="p-tipwrap"><div class="p-bubble">전자서명은 3단계로 진행돼요</div><span class="p-iconbtns"><span style="border-radius:50%;font-weight:800;color:#2151EC;font-size:12px">i</span></span></div>`,
  input: `<div class="p-input"><label>계약명</label><div class="fld">클라우드 인프라 공급<span class="caret"></span></div></div>`,
  inputdatepicker: `<div class="p-range"><div class="fld2 on" style="display:flex;align-items:center;gap:8px">2026-08-07 <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 3.5L5 6.5L8 3.5" stroke="#626F86" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg></div></div>`,
  inputdaterangepicker: `<div class="p-range"><div class="fld2 on">2026-08-01</div>~<div class="fld2">2026-08-31</div></div>`,
  linkbadge: `<span class="p-chip2" style="display:inline-flex;align-items:center;gap:5px">2026가합1234 <svg width="11" height="11" viewBox="0 0 24 24" fill="none"><path d="M7 17 17 7M9 7h8v8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></span>`,
  listgroup: `<div class="p-listgrp"><i class="on"></i><i></i><i></i></div>`,
  mention: `<div class="p-mention"><b>@김변호사</b> 검토 부탁드려요</div>`,
  modal: `<div class="p-modal"><h6>계약을 삭제할까요?</h6><i></i><i></i><div class="acts"><span class="no">취소</span><span class="ok">삭제</span></div></div>`,
  navigationtab: `<div class="p-tabs" style="width:80%"><div class="bar"><span class="on">대시보드</span><span>계약</span><span>자문</span><span>송무</span></div></div>`,
  numberinput: `<div class="p-numin"><span>−</span><b>12</b><span>+</span></div>`,
  pagination: `<div class="p-pagination"><span>‹</span><span class="on">1</span><span>2</span><span>3</span><span>›</span></div>`,
  popover: `<div class="p-tipwrap"><div class="p-bubble" style="max-width:170px">문서 이력 보기<br>권한 설정</div><span class="lds-btn sm outline" style="cursor:default">더보기</span></div>`,
  progress: `<div class="p-progress"><div class="lbl"><span>검토 진행률</span><b>64%</b></div><div class="trk"><i></i></div></div>`,
  quickmenu: `<div class="p-quick"><span><i></i></span><span><i></i></span><span><i></i></span><span><i></i></span><span><i></i></span><span><i></i></span></div>`,
  radio: `<div class="p-radio">
            <span class="row"><span class="rd on"></span>전자 서명</span>
            <span class="row"><span class="rd"></span>서면 서명</span>
          </div>`,
  radiobuttongroup: `<div class="p-btngroup"><span class="on">개인</span><span>법인</span></div>`,
  skeleton: `<div class="p-skeleton"><span class="cir sk"></span><span class="lns"><i class="sk"></i><i class="sk"></i></span></div>`,
  slider: `<div class="p-slider"><span class="trk"></span><span class="fil"></span><span class="th"></span></div>`,
  spinner: `<div class="p-spinner"></div>`,
  stack: `<div class="p-stack"><i></i><i></i><i></i></div>`,
  sweetalert: `<div class="p-modal" style="width:58%"><div style="width:34px;height:34px;border-radius:50%;background:rgba(240,175,35,.15);color:#b57f0b;display:grid;place-items:center;font-weight:800;margin:0 auto 8px">!</div><h6 style="text-align:center">계약을 반려할까요?</h6><div class="acts" style="justify-content:center"><span class="no">취소</span><span class="ok">반려</span></div></div>`,
  switch: `<div class="p-switch"><span class="sw on"></span><span class="sw off"></span></div>`,
  tabs: `<div class="p-tabs">
            <div class="bar"><span class="on">계약 정보</span><span>이력</span><span>결재</span></div>
            <div class="pane"><i></i><i></i></div>
          </div>`,
  tagselect: `<div class="p-tags"><span class="p-chip2 x" style="padding:4px 10px;font-size:11px">M&amp;A</span><span class="p-chip2 x" style="padding:4px 10px;font-size:11px">계약</span><span class="caret2"></span></div>`,
  toast: `<div class="p-toastui"><span class="ic"><svg viewBox="0 0 12 12" fill="none"><path d="M2.5 6.2L5 8.7L9.5 3.5" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg></span><span class="tx">계약서가 승인됐어요</span></div>`,
  tooltip: `<div class="p-tipwrap"><span class="p-tip">위험조항 2건</span><span class="lds-btn sm ghost" style="cursor:default;background:#fff;border:1px solid #EEEFF2;color:#626F86">조항 보기</span></div>`,
  treeview: `<div class="p-tree"><div class="rw"><span class="car open"></span>법무<i></i></div><div class="rw lv1"><span class="car open"></span>계약<i></i></div><div class="rw lv2"><span class="car"></span><i></i></div></div>`,
  widget: `<div class="p-widget"><div><div class="tt">이번 달 처리</div><div class="nm">128건</div><div class="dl">▲ 12%</div></div><div class="bars"><i></i><i></i><i></i><i></i></div></div>`,
};
