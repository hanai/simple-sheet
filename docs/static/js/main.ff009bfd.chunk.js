(this["webpackJsonpsimple-sheet"]=this["webpackJsonpsimple-sheet"]||[]).push([[0],{22:function(e,t,n){},23:function(e,t,n){},30:function(e,t,n){},31:function(e,t,n){},32:function(e,t,n){},33:function(e,t,n){},34:function(e,t,n){},35:function(e,t,n){},36:function(e,t,n){},37:function(e,t,n){},38:function(e,t,n){"use strict";n.r(t);var c,r=n(1),l=n(0),o=n.n(l),a=n(9),u=n.n(a),i=(n(22),n(23),n(2)),s=n(4),f=Object(s.b)({name:"layout",initialState:{rows:[],cols:[]},reducers:{setLayout:function(e,t){e.rows=t.payload.rows,e.cols=t.payload.cols},setRowLayout:function(e,t){var n=t.payload,c=n.index,r=n.height;e.rows[c]={height:r}},setColLayout:function(e,t){var n=t.payload,c=n.index,r=n.width;e.cols[c]={width:r}}}}),b=f.actions,j=b.setLayout,d=b.setRowLayout,O=b.setColLayout,w=f.reducer,v=n(5),p=Object(s.b)({name:"selection",initialState:{rows:[],cols:[],cells:null},reducers:{selectRows:function(e,t){e.rows=t.payload,e.cols=[],e.cells=null},selectCols:function(e,t){e.rows=[],e.cols=t.payload,e.cells=null},selectCells:function(e,t){e.rows=[],e.cols=[],e.cells=t.payload},emptySelection:function(e){e.rows=[],e.cols=[],e.cells=null}}}),h=p.actions,C=h.selectRows,m=h.selectCols,y=h.selectCells,g=(h.emptySelection,p.reducer),x=n(6),L=n(16);!function(e){e[e.NORMAL=0]="NORMAL",e[e.PLACEHOLDER=1]="PLACEHOLDER"}(c||(c={}));var S,E=Object(s.b)({name:"cells",initialState:[],reducers:{setCells:function(e,t){e.splice.apply(e,[0,0].concat(Object(L.a)(t.payload)))},updateCell:function(e,t){var n=t.payload,c=n.index,r=n.cell;e[c[0]][c[1]]=r},updateCellRawValue:function(e,t){var n=t.payload,c=n.index,r=n.raw;e[c[0]][c[1]].raw=r},clearContent:function(e,t){var n=t.payload;e.forEach((function(e){e.forEach((function(e){var t=e.row,c=e.col;return null!=e&&t>=n[0]&&t<=n[2]&&c>=n[1]&&c<=n[3]&&(e.raw=""),e}))}))},mergeCells:function(e,t){for(var n=t.payload,r=e[n[0]][n[1]],l=e[n[2]][n[3]],o=l.row+(l.rowSpan||1)-r.row,a=l.col+(l.colSpan||1)-r.col,u=r.row;u<r.row+o;u++)for(var i=r.col;i<r.col+a;i++)u===r.row&&i===r.col||(e[u][i]=Object(x.a)(Object(x.a)({},e[u][i]),{},{rowSpan:1,colSpan:1,raw:void 0,type:c.PLACEHOLDER}));r.rowSpan=o,r.colSpan=a}}}),k=E.reducer,R=E.actions,N=R.setCells,M=(R.updateCell,R.clearContent),A=R.mergeCells,D=R.updateCellRawValue;n(30);!function(e){e[e.SINGLE_CELL=0]="SINGLE_CELL",e[e.MULTIPLE_CELL=1]="MULTIPLE_CELL"}(S||(S={}));var P=function(e){var t=e.visible,n=e.type,c=e.top,o=e.left,a=e.onHide,u=e.onClickMergeCells,i=e.onClickClearContent;Object(l.useEffect)((function(){var e=function(e){t&&(null!=e.target&&e.target.closest(".sheet-context-menu")||a&&a())};return document.addEventListener("click",e),function(){document.removeEventListener("click",e)}}),[a,t]);var s=[{label:"\u6e05\u7a7a\u5185\u5bb9",type:[S.SINGLE_CELL,S.MULTIPLE_CELL],onClick:function(){i&&i(),a&&a()}},{label:"\u5408\u5e76\u5355\u5143\u683c",type:[S.MULTIPLE_CELL],onClick:function(){u&&u(),a&&a()}}];return t?Object(r.jsx)("div",{className:"sheet-context-menu",style:{top:c,left:o},children:s.filter((function(e){return e.type.includes(n)})).map((function(e){return Object(r.jsx)("div",{onClick:e.onClick,className:"menu-item",children:e.label},e.label)}))}):null};P.defaultProps={visible:!1,onHide:function(){}};var I=P,T={visible:!1,type:S.SINGLE_CELL,top:0,left:0},H=Object(s.b)({name:"contextMenu",initialState:T,reducers:{show:function(e,t){var n=t.payload,c=n.type,r=n.top,l=n.left;e.visible=!0,e.type=c,e.top=r,e.left=l},hide:function(e){e.visible=!1}}}),_=H.actions,U=_.show,G=_.hide,X=H.reducer,Y=Object(v.c)({layout:w,selection:g,cells:k,contextMenu:X}),z=Object(s.a)({reducer:Y}),B=n(3),F=function(e){if(null==e)return[-1,-1];var t=e.closest("td");return[parseInt((null===t||void 0===t?void 0:t.getAttribute("data-row-idx"))||"-1",10),parseInt((null===t||void 0===t?void 0:t.getAttribute("data-col-idx"))||"-1",10)]},W=function(e,t){return Array.from({length:t-e+1},(function(t,n){return e+n}))},J=function(e){for(var t,n="";e>0;){var c=Math.floor((e-1)/26);n=((t=65+(e-1)%26)>65535?(t-=65536,String.fromCharCode(55296+(t>>10),56320+(1023&t))):String.fromCharCode(t))+n,e=c}return n},K=function(e){!function(e,t){var n=document.createRange();n.setStart(e.childNodes[0]||e,t),n.collapse(!0);var c=window.getSelection();null!=c&&(c.removeAllRanges(),c.addRange(n)),e.focus()}(e,e.innerText.length)},V=function(e,t){var n=Object(B.a)(t,4),c=n[0],r=n[1],l=n[2],o=n[3],a=e.row,u=e.col;return a>=c&&a<=l&&u>=r&&u<=o},q=function(e,t,n){if(n[e][t].type!==c.PLACEHOLDER)return n[e][t];for(var r=t;r>=0;r--){var l=n[e][r];if(l.type!==c.PLACEHOLDER){l.colSpan+l.col-1>=t&&(t=l.col);break}}for(var o=e;o>=0;o--){var a=n[o][t];if(a.type!==c.PLACEHOLDER){a.rowSpan+a.row-1>=e&&(e=a.row);break}}return n[e][t]},Q=function(e,t){for(var n,c,r,l,o=Object(B.a)(t,4),a=o[0],u=o[1],i=o[2],s=o[3],f=q(a,u,e),b=q(i,s,e),j=f.col,d=b.col+b.colSpan-1,O=f.row,w=b.row+b.rowSpan-1;n!==j||r!==O||c!==d||l!==w;){r=O,c=d,l=w,n=j;for(var v=w,p=j;p<=d;p++){var h=q(w,p,e),C=h.row+h.rowSpan-1;C>v&&(v=C)}for(var m=d,y=w=v;y>=O;y--){var g=q(y,d,e),x=g.col+g.colSpan-1;x>m&&(m=x)}for(var L=O,S=d=m;S>=j;S--){var E=q(O,S,e).row;E<L&&(L=E)}for(var k=j,R=O=L;R<=w;R++){var N=q(R,j,e).col;N<k&&(k=N)}j=k}return[f=q(O,j,e),b=q(w,d,e)]},Z=n(7),$=n.n(Z),ee=(n(31),function(e){var t=e.index,n=e.selected,c=e.height,o=e.onResize,a=e.onSelect,u=Object(l.useRef)(0),i=Object(l.useRef)(c),s=Object(l.useRef)(null),f=Object(l.useCallback)((function(e){var t;u.current=e.clientY,i.current=c,null===(t=s.current)||void 0===t||t.setPointerCapture(1)}),[c]),b=Object(l.useCallback)((function(e){var t=e.clientY-u.current+i.current;t<36||o(t)}),[o]),j=Object(l.useCallback)((function(e){var t=e.clientY-u.current+i.current;t<36||o(t)}),[o]),d=Object(l.useCallback)((function(){a()}),[a]);return Object(r.jsxs)("div",{className:$()({"row-header-item":!0,active:n}),style:{height:c},onClick:d,children:[t+1,Object(r.jsx)("div",{ref:s,draggable:"true",className:"row-header-trigger",onDragStart:f,onDrag:b,onDragEnd:j})]})}),te=Object(l.memo)(ee),ne=function(e){var t=e.index,n=Object(i.b)(),c=Object(i.c)((function(e){return e.selection.rows})),o=Object(i.c)((function(e){return e.layout.rows[t]})),a=c.indexOf(t)>-1,u=Object(l.useCallback)((function(e){n(d({index:t,height:e}))}),[n,t]),s=Object(l.useCallback)((function(){n(C([t]))}),[n,t]);return Object(r.jsx)(te,{index:t,height:o.height,selected:a,onResize:u,onSelect:s})},ce=Object(l.memo)(ne),re=(n(32),function(e){var t=Object(i.c)((function(e){return e.layout.rows}));return Object(r.jsx)("div",{className:"rows-header-container",children:t.map((function(e,t){return Object(r.jsx)(ce,{index:t},t)}))})}),le=Object(l.memo)(re),oe=(n(33),function(e){var t=e.index,n=e.selected,c=e.width,o=e.onResize,a=e.onSelect,u=Object(l.useRef)(0),i=Object(l.useRef)(c),s=Object(l.useRef)(null),f=Object(l.useCallback)((function(e){var t;u.current=e.clientX,i.current=c,null===(t=s.current)||void 0===t||t.setPointerCapture(1)}),[c]),b=Object(l.useCallback)((function(e){var t=e.clientX-u.current+i.current;t<80||o(t)}),[o]),j=Object(l.useCallback)((function(e){var t=e.clientX-u.current+i.current;t<80||o(t)}),[o]),d=Object(l.useCallback)((function(){a()}),[a]);return Object(r.jsxs)("div",{className:$()({"col-header-item":!0,active:n}),onClick:d,style:{width:c},children:[J(t+1),Object(r.jsx)("div",{ref:s,draggable:"true",className:"col-header-trigger",onDragStart:f,onDrag:b,onDragEnd:j})]})}),ae=Object(l.memo)(oe),ue=function(e){var t=e.index,n=Object(i.b)(),c=Object(i.c)((function(e){return e.selection.cols})),o=Object(i.c)((function(e){return e.layout.cols[t]})),a=c.indexOf(t)>-1,u=Object(l.useCallback)((function(e){n(O({index:t,width:e}))}),[n,t]),s=Object(l.useCallback)((function(){n(m([t]))}),[n,t]);return Object(r.jsx)(ae,{index:t,width:o.width,selected:a,onResize:u,onSelect:s})},ie=Object(l.memo)(ue),se=(n(34),function(e){var t=Object(i.c)((function(e){return e.layout.cols}));return Object(r.jsx)("div",{className:"cols-header-container",children:t.map((function(e,t){return Object(r.jsx)(ie,{index:t},t)}))})}),fe=Object(l.memo)(se),be=function(){var e=Object(i.c)((function(e){return e.contextMenu})),t=e.left,n=e.top,c=e.visible,o=e.type,a=Object(i.c)((function(e){return e.selection})),u=Object(i.b)(),s=Object(l.useCallback)((function(){u(G())}),[u]),f=Object(l.useCallback)((function(){var e=a.cells;u(M(e))}),[a.cells,u]),b=Object(l.useCallback)((function(){var e=a.cells;u(A(e))}),[a.cells,u]);return Object(r.jsx)(I,{onHide:s,type:o,left:t,top:n,visible:c,onClickClearContent:f,onClickMergeCells:b})},je=Object(l.memo)(be),de=(n(35),function(e){var t=e.cells,n=e.selection,c=e.layout,l=n.cells;if(null!=l){var o=Q(t,l),a=Object(B.a)(o,2),u=a[0],i=a[1];if(null==u||null==i)return null;var s=u.row,f=u.col,b=i.row,j=i.col;b=b+(i.rowSpan||1)-1,j=j+(i.colSpan||1)-1;for(var d=0,O=0,w=0,v=0,p=0;p<c.cols.length;p++){var h=c.cols[p];if(p<f&&(d+=h.width),!(p<=j))break;O+=h.width}for(var C=0;C<c.rows.length;C++){var m=c.rows[C];if(C<s&&(w+=m.height),!(C<=b))break;v+=m.height}return Object(r.jsxs)("div",{className:"sheet-overlay",children:[Object(r.jsx)("div",{className:"selection-l",style:{left:d,top:w,height:v-w}}),Object(r.jsx)("div",{className:"selection-r",style:{left:O,top:w,height:v-w}}),Object(r.jsx)("div",{className:"selection-t",style:{left:d,top:w,width:O-d}}),Object(r.jsx)("div",{className:"selection-b",style:{left:d,top:v,width:O-d}})]})}return null}),Oe=Object(l.memo)(de),we=function(){var e=Object(i.c)((function(e){return e.cells})),t=Object(i.c)((function(e){return e.selection})),n=Object(i.c)((function(e){return e.layout}));return Object(r.jsx)(Oe,{cells:e,selection:t,layout:n})},ve=Object(l.memo)(we),pe=(n(36),function(e){var t=e.raw,n=e.style,c=e.cell,o=e.selected,a=e.onChange,u=e.onSelect,i=Object(l.useRef)(null),s=Object(l.useState)(!1),f=Object(B.a)(s,2),b=f[0],j=f[1],d=Object(l.useCallback)((function(){b||(j(!0),setTimeout((function(){K(i.current)}),0))}),[b]),O=Object(l.useCallback)((function(e){if("Enter"===e.key&&!e.shiftKey&&(e.preventDefault(),j(!1),i.current)){var n=i.current.innerText;n!==t&&a(n)}}),[a,t]),w=Object(l.useCallback)((function(){u&&u(c.row,c.col)}),[c.row,c.col,u]),v=Object(l.useCallback)((function(){if(b&&(j(!1),i.current)){var e=i.current.innerText;e!==t&&a(e)}}),[b,t,a]);return Object(r.jsx)("td",{onDoubleClick:d,onClick:w,className:$()({cell:!0,selected:o}),style:n,rowSpan:c.rowSpan,colSpan:c.colSpan,"data-row-idx":c.row,"data-col-idx":c.col,children:Object(r.jsx)("div",{className:$()({"cell-content-wrapper":!0,active:b}),onBlur:v,ref:i,contentEditable:b,suppressContentEditableWarning:!0,onKeyPress:O,children:c.raw})})}),he=Object(l.memo)(pe),Ce=function(e){var t=e.cell,n=t.row,c=t.col,o=Object(i.b)(),a=Object(l.useCallback)((function(e){o(D({index:[n,c],raw:e}))}),[n,c,o]);return Object(r.jsx)(he,Object(x.a)(Object(x.a)({},e),{},{onChange:a}))},me=Object(l.memo)(Ce),ye=function(e){var t=e.tableWidth,n=e.layout,o=e.selection,a=e.cells,u=e.onSelectCells,i=e.onShowContextMenu,s=Object(l.useRef)({flag:!1,startRow:-1,startCol:-1}),f=Object(l.useCallback)((function(e){if(!s.current.flag){var t=F(e.target),n=Object(B.a)(t,2),c=n[0],r=n[1];if(-1===c||-1===r)return;(0===e.button||2===e.button&&(null==o.cells||c<o.cells[0]||c>o.cells[2]||r<o.cells[1]||r>o.cells[3]))&&u([c,r,c,r]),0===e.button&&(s.current={flag:!0,startRow:c,startCol:r})}}),[o.cells,u]),b=Object(l.useCallback)((function(e,t){var n=s.current,c=n.startRow,r=n.startCol,l=Q(a,[Math.min(e,c),Math.min(t,r),Math.max(e,c),Math.max(t,r)]),o=Object(B.a)(l,2),i=o[0],f=o[1];u([i.row,i.col,f.row+f.rowSpan-1,f.col+f.colSpan-1])}),[a,u]),j=Object(l.useCallback)((function(e){if(s.current.flag){var t=F(e.target),n=Object(B.a)(t,2),c=n[0],r=n[1];if(-1===c||-1===r)return;b(c,r)}}),[b]),d=Object(l.useCallback)((function(e){if(s.current.flag){var t=F(e.target),n=Object(B.a)(t,2),c=n[0],r=n[1];if(-1===c||-1===r)return;b(c,r),s.current.flag=!1}}),[b]),O=Object(l.useCallback)((function(e){e.preventDefault(),null!=o.cells&&(o.cells[0]===o.cells[2]&&o.cells[1]===o.cells[3]?i({left:e.pageX,top:e.pageY,type:S.SINGLE_CELL}):i({left:e.pageX,top:e.pageY,type:S.MULTIPLE_CELL}))}),[o.cells,i]);return Object(l.useEffect)((function(){var e=function(){s.current.flag&&(s.current.flag=!1)};return document.addEventListener("mouseup",e),function(){document.removeEventListener("mouseup",e)}}),[]),Object(r.jsxs)("table",{className:"sheet-table",style:{width:t},onMouseDown:f,onMouseUp:d,onMouseMove:j,onContextMenu:O,children:[Object(r.jsx)("colgroup",{children:n.cols.map((function(e,t){return Object(r.jsx)("col",{style:{width:e.width}},t)}))}),Object(r.jsx)("tbody",{children:a.length?n.rows.map((function(e,t){return Object(r.jsx)("tr",{style:{height:e.height},children:n.cols.map((function(e,n){var l=a[t][n];return l&&l.type===c.NORMAL?Object(r.jsx)(me,{cell:l,selected:null!=o.cells&&V(l,o.cells),raw:l.raw},n):null}))},t)})):null})]})},ge=Object(l.memo)(ye),xe=function(){var e=Object(i.b)(),t=Object(i.c)((function(e){return e.layout.cols.map((function(e){return e.width})).reduce((function(e,t){return e+t}),0)})),n=Object(i.c)((function(e){return e.layout})),c=Object(i.c)((function(e){return e.cells})),o=Object(i.c)((function(e){return e.selection})),a=Object(l.useCallback)((function(t){e(y(t))}),[e]),u=Object(l.useCallback)((function(t){e(U(t))}),[e]);return Object(r.jsx)(ge,{selection:o,cells:c,tableWidth:t,layout:n,onSelectCells:a,onShowContextMenu:u})},Le=Object(l.memo)(xe),Se=(n(37),function(){return{layout:(e=5,t=4,{cols:W(1,t).map((function(e){return{width:80}})),rows:W(1,e).map((function(e){return{height:36}}))}),cells:[{row:0,col:0,raw:"\u65e5\u671f"},{row:0,col:1,raw:"\u6536\u652f\u7c7b\u578b"},{row:0,col:2,raw:"\u8bf4\u660e"},{row:0,col:3,raw:"\u91d1\u989d"},{row:1,col:0,raw:"2020-05-06"},{row:1,col:1,raw:"\u56e2\u961f\u805a\u9910"},{row:1,col:2,raw:"\u8bf4\u660e\u6587\u6848A"},{row:1,col:3,raw:"1025"},{row:2,col:0,raw:"2020-05-07",rowSpan:2},{row:2,col:1,raw:"\u529e\u516c\u7528\u54c1"},{row:2,col:2,raw:"\u8bf4\u660e\u6587\u6848B"},{row:2,col:3,raw:"860"},{row:3,col:1,raw:"\u56e2\u961f\u5efa\u8bbe"},{row:3,col:2,raw:"\u8bf4\u660e\u6587\u6848C"},{row:3,col:3,raw:"1160"},{row:4,col:0,raw:"\u8bb0\u5f55\u4eba\uff1a\u738b\u5c0f\u660e",colSpan:2},{row:4,col:2,raw:"\u603b\u8ba1\uff1a"},{row:4,col:3,raw:""}]};var e,t}()),Ee=function(e){var t=Object(i.b)();return Object(l.useEffect)((function(){t(N(function(e){var t=e.layout,n=e.cells,r=Array.from({length:t.rows.length},(function(e,n){return Array.from({length:t.cols.length},(function(e,t){return{row:n,col:t,rowSpan:1,colSpan:1}}))}));return n.forEach((function(e){var t=e.row,n=e.col,l=e.rowSpan,o=void 0===l?1:l,a=e.colSpan,u=void 0===a?1:a;if(r[t][n]=Object(x.a)(Object(x.a)({},e),{},{row:t,col:n,rowSpan:o,colSpan:u,type:c.NORMAL}),o>1||u>1)for(var i=t;i<=t+o-1;i++)for(var s=n;s<=n+u-1;s++)i===t&&s===n||(r[i][s].type=c.PLACEHOLDER)})),r}(Se))),t(j(Se.layout))}),[t]),Object(r.jsxs)("div",{className:"sheet-container",children:[Object(r.jsx)("div",{className:"sheet-header"}),Object(r.jsx)(le,{}),Object(r.jsx)(fe,{}),Object(r.jsx)(je,{}),Object(r.jsx)(ve,{}),Object(r.jsx)(Le,{})]})},ke=function(){return Object(r.jsx)(i.a,{store:z,children:Object(r.jsx)(Ee,{})})};var Re=function(){return Object(r.jsx)("div",{id:"app",children:Object(r.jsx)(ke,{})})},Ne=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,39)).then((function(t){var n=t.getCLS,c=t.getFID,r=t.getFCP,l=t.getLCP,o=t.getTTFB;n(e),c(e),r(e),l(e),o(e)}))};u.a.render(Object(r.jsx)(o.a.StrictMode,{children:Object(r.jsx)(Re,{})}),document.getElementById("root")),Ne()}},[[38,1,2]]]);
//# sourceMappingURL=main.ff009bfd.chunk.js.map