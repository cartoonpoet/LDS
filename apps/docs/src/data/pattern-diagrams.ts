// 시안 패턴 카드의 미니 다이어그램 마크업
export const PATTERN_DIAGRAMS: Record<string, string> = {
  "gnb": `<div class="pdx-gnb">
              <div class="bar"><span class="logo"></span><i class="on"></i><i></i><i></i></div>
              <div class="body"><i style="width:55%"></i><i></i><i style="width:80%"></i></div>
            </div>`,
  "lnb": `<div class="pdx-cols">
              <div class="pdx-lnb"><i class="on"></i><i></i><i></i><i></i><i></i></div>
              <div class="pdx-main"><i class="h"></i><i></i><i></i><i style="width:70%"></i></div>
            </div>`,
  "drawer": `<div class="pdx-cols">
              <div class="pdx-main"><i class="h"></i><i></i><i></i><i style="width:70%"></i></div>
              <div class="pdx-drawer"><i class="h"></i><i></i><i></i><i style="width:60%"></i></div>
            </div>`,
  "comments": `<div class="pdx-comment">
              <span class="av" style="background:#2151EC">김</span>
              <span class="ln"><span class="mention">@이변호사</span><i></i><i style="width:70%"></i></span>
            </div>
            <div class="pdx-comment" style="margin-left:26px">
              <span class="av" style="background:#16336E">이</span>
              <span class="ln"><i></i><i style="width:55%"></i></span>
            </div>`,
  "table-tree": `<div class="pdx-tree">
              <div class="rw"><span class="car open"></span><i></i></div>
              <div class="rw lv1"><span class="car open"></span><i></i></div>
              <div class="rw lv2"><span class="car"></span><i></i></div>
              <div class="rw lv1"><span class="car"></span><i></i></div>
            </div>`,
};
