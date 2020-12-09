(this["webpackJsonpsimple-sheet"]=this["webpackJsonpsimple-sheet"]||[]).push([[0],{22:function(e,t,n){},23:function(e,t,n){},30:function(e,t,n){},31:function(e,t,n){},32:function(e,t,n){},33:function(e,t,n){},34:function(e,t,n){},35:function(e,t,n){},36:function(e,t,n){},37:function(e,t,n){},38:function(e,t,n){"use strict";n.r(t);var c,o=n(1),l=n(0),r=n.n(l),a=n(9),i=n.n(a),u=(n(22),n(23),n(2)),s=n(4),f=Object(s.b)({name:"layout",initialState:{rows:[],cols:[]},reducers:{setLayout:function(e,t){e.rows=t.payload.rows,e.cols=t.payload.cols},setRowLayout:function(e,t){var n=t.payload,c=n.index,o=n.height;e.rows[c]={height:o}},setColLayout:function(e,t){var n=t.payload,c=n.index,o=n.width;e.cols[c]={width:o}}}}),b=f.actions,j=b.setLayout,d=b.setRowLayout,w=b.setColLayout,O=f.reducer,p=n(5),h=Object(s.b)({name:"selection",initialState:{rows:[],cols:[],cells:null},reducers:{selectRows:function(e,t){e.rows=t.payload,e.cols=[],e.cells=null},selectCols:function(e,t){e.rows=[],e.cols=t.payload,e.cells=null},selectCells:function(e,t){e.rows=[],e.cols=[],e.cells=t.payload},emptySelection:function(e){e.rows=[],e.cols=[],e.cells=null}}}),v=h.actions,m=v.selectRows,C=v.selectCols,x=v.selectCells,y=(v.emptySelection,h.reducer),g=n(6),S=n(16);!function(e){e[e.NORMAL=0]="NORMAL",e[e.PLACEHOLDER=1]="PLACEHOLDER"}(c||(c={}));var L,E=Object(s.b)({name:"cells",initialState:[],reducers:{setCells:function(e,t){e.splice.apply(e,[0,0].concat(Object(S.a)(t.payload)))},updateCell:function(e,t){var n=t.payload,c=n.index,o=n.cell;e[c[0]][c[1]]=o},updateCellRawValue:function(e,t){var n=t.payload,c=n.index,o=n.raw;e[c[0]][c[1]].raw=o},clearContent:function(e,t){var n=t.payload;e.forEach((function(e){e.forEach((function(e){var t=e.row,c=e.col;return null!=e&&t>=n[0]&&t<=n[2]&&c>=n[1]&&c<=n[3]&&(e.raw=""),e}))}))},mergeCells:function(e,t){for(var n=t.payload,o=e[n[0]][n[1]],l=e[n[2]][n[3]],r=l.row+(l.rowSpan||1)-o.row,a=l.col+(l.colSpan||1)-o.col,i=o.row;i<o.row+r;i++)for(var u=o.col;u<o.col+a;u++)i===o.row&&u===o.col||(e[i][u]=Object(g.a)(Object(g.a)({},e[i][u]),{},{rowSpan:1,colSpan:1,raw:void 0,type:c.PLACEHOLDER}));o.rowSpan=r,o.colSpan=a}}}),k=E.reducer,M=E.actions,R=M.setCells,N=(M.updateCell,M.clearContent),A=M.mergeCells,D=M.updateCellRawValue;n(30);!function(e){e[e.SINGLE_CELL=0]="SINGLE_CELL",e[e.MULTIPLE_CELL=1]="MULTIPLE_CELL"}(L||(L={}));var P=function(e){var t=e.visible,n=e.type,c=e.top,r=e.left,a=e.onHide,i=e.onClickMergeCells,u=e.onClickClearContent;Object(l.useEffect)((function(){var e=function(e){t&&(null!=e.target&&e.target.closest(".sheet-context-menu")||a&&a())};return document.addEventListener("click",e),function(){document.removeEventListener("click",e)}}),[a,t]);var s=[{label:"\u6e05\u7a7a\u5185\u5bb9",type:[L.SINGLE_CELL,L.MULTIPLE_CELL],onClick:function(){u&&u(),a&&a()}},{label:"\u5408\u5e76\u5355\u5143\u683c",type:[L.MULTIPLE_CELL],onClick:function(){i&&i(),a&&a()}}];return t?Object(o.jsx)("div",{className:"sheet-context-menu",style:{top:c,left:r},children:s.filter((function(e){return e.type.includes(n)})).map((function(e){return Object(o.jsx)("div",{onClick:e.onClick,className:"menu-item",children:e.label},e.label)}))}):null};P.defaultProps={visible:!1,onHide:function(){}};var I=P,T={visible:!1,type:L.SINGLE_CELL,top:0,left:0},H=Object(s.b)({name:"contextMenu",initialState:T,reducers:{show:function(e,t){var n=t.payload,c=n.type,o=n.top,l=n.left;e.visible=!0,e.type=c,e.top=o,e.left=l},hide:function(e){e.visible=!1}}}),_=H.actions,U=_.show,G=_.hide,X=H.reducer,Y=Object(p.c)({layout:O,selection:y,cells:k,contextMenu:X}),z=Object(s.a)({reducer:Y}),B=n(3),F=function(e){if(null==e)return[-1,-1];var t=e.closest("td");return[parseInt((null===t||void 0===t?void 0:t.getAttribute("data-row-idx"))||"-1",10),parseInt((null===t||void 0===t?void 0:t.getAttribute("data-col-idx"))||"-1",10)]},W=function(e,t){return Array.from({length:t-e+1},(function(t,n){return e+n}))},J=function(e){for(var t,n="";e>0;){var c=Math.floor((e-1)/26);n=((t=65+(e-1)%26)>65535?(t-=65536,String.fromCharCode(55296+(t>>10),56320+(1023&t))):String.fromCharCode(t))+n,e=c}return n},K=function(e){!function(e,t){var n=document.createRange();n.setStart(e.childNodes[0]||e,t),n.collapse(!0);var c=window.getSelection();null!=c&&(c.removeAllRanges(),c.addRange(n)),e.focus()}(e,e.innerText.length)},V=function(e,t){var n=Object(B.a)(t,4),c=n[0],o=n[1],l=n[2],r=n[3],a=e.row,i=e.col;return a>=c&&a<=l&&i>=o&&i<=r},q=function(e,t,n){if(n[e][t].type!==c.PLACEHOLDER)return n[e][t];for(var o=t;o>=0;o--){var l=n[e][o];if(l.type!==c.PLACEHOLDER){l.colSpan+l.col-1>=t&&(t=l.col);break}}for(var r=e;r>=0;r--){var a=n[r][t];if(a.type!==c.PLACEHOLDER){a.rowSpan+a.row-1>=e&&(e=a.row);break}}return n[e][t]},Q=function(e,t){for(var n=Object(B.a)(t,4),c=n[0],o=n[1],l=n[2],r=n[3],a=q(c,o,e),i=q(l,r,e),u=q(i.row,a.col,e),s=q(a.row,i.col,e);1!==u.rowSpan&&u.row+u.rowSpan-i.row-i.rowSpan!==0||u.col<a.col||s.row<a.row||1!==s.colSpan&&s.col+s.colSpan-i.col-i.colSpan!==0;)a=q(Math.min(a.row,s.row),Math.min(a.col,u.col),e),i=q(Math.max(u.row+u.rowSpan-1,i.row+i.rowSpan-1),Math.max(s.col+s.colSpan-1,i.col+i.colSpan-1),e),u=q(Math.max(u.row+u.rowSpan-1,i.row+i.rowSpan-1),Math.min(a.row,s.row),e),s=q(Math.min(a.row,s.row),Math.max(s.col+s.colSpan-1,i.col+i.colSpan-1),e);return[a,i]},Z=n(7),$=n.n(Z),ee=(n(31),function(e){var t=e.index,n=e.selected,c=e.height,r=e.onResize,a=e.onSelect,i=Object(l.useRef)(0),u=Object(l.useRef)(c),s=Object(l.useRef)(null),f=Object(l.useCallback)((function(e){var t;i.current=e.clientY,u.current=c,null===(t=s.current)||void 0===t||t.setPointerCapture(1)}),[c]),b=Object(l.useCallback)((function(e){var t=e.clientY-i.current+u.current;t<36||r(t)}),[r]),j=Object(l.useCallback)((function(e){var t=e.clientY-i.current+u.current;t<36||r(t)}),[r]),d=Object(l.useCallback)((function(){a()}),[a]);return Object(o.jsxs)("div",{className:$()({"row-header-item":!0,active:n}),style:{height:c},onClick:d,children:[t+1,Object(o.jsx)("div",{ref:s,draggable:"true",className:"row-header-trigger",onDragStart:f,onDrag:b,onDragEnd:j})]})}),te=Object(l.memo)(ee),ne=function(e){var t=e.index,n=Object(u.b)(),c=Object(u.c)((function(e){return e.selection.rows})),r=Object(u.c)((function(e){return e.layout.rows[t]})),a=c.indexOf(t)>-1,i=Object(l.useCallback)((function(e){n(d({index:t,height:e}))}),[n,t]),s=Object(l.useCallback)((function(){n(m([t]))}),[n,t]);return Object(o.jsx)(te,{index:t,height:r.height,selected:a,onResize:i,onSelect:s})},ce=Object(l.memo)(ne),oe=(n(32),function(e){var t=Object(u.c)((function(e){return e.layout.rows}));return Object(o.jsx)("div",{className:"rows-header-container",children:t.map((function(e,t){return Object(o.jsx)(ce,{index:t},t)}))})}),le=Object(l.memo)(oe),re=(n(33),function(e){var t=e.index,n=e.selected,c=e.width,r=e.onResize,a=e.onSelect,i=Object(l.useRef)(0),u=Object(l.useRef)(c),s=Object(l.useRef)(null),f=Object(l.useCallback)((function(e){var t;i.current=e.clientX,u.current=c,null===(t=s.current)||void 0===t||t.setPointerCapture(1)}),[c]),b=Object(l.useCallback)((function(e){var t=e.clientX-i.current+u.current;t<80||r(t)}),[r]),j=Object(l.useCallback)((function(e){var t=e.clientX-i.current+u.current;t<80||r(t)}),[r]),d=Object(l.useCallback)((function(){a()}),[a]);return Object(o.jsxs)("div",{className:$()({"col-header-item":!0,active:n}),onClick:d,style:{width:c},children:[J(t+1),Object(o.jsx)("div",{ref:s,draggable:"true",className:"col-header-trigger",onDragStart:f,onDrag:b,onDragEnd:j})]})}),ae=Object(l.memo)(re),ie=function(e){var t=e.index,n=Object(u.b)(),c=Object(u.c)((function(e){return e.selection.cols})),r=Object(u.c)((function(e){return e.layout.cols[t]})),a=c.indexOf(t)>-1,i=Object(l.useCallback)((function(e){n(w({index:t,width:e}))}),[n,t]),s=Object(l.useCallback)((function(){n(C([t]))}),[n,t]);return Object(o.jsx)(ae,{index:t,width:r.width,selected:a,onResize:i,onSelect:s})},ue=Object(l.memo)(ie),se=(n(34),function(e){var t=Object(u.c)((function(e){return e.layout.cols}));return Object(o.jsx)("div",{className:"cols-header-container",children:t.map((function(e,t){return Object(o.jsx)(ue,{index:t},t)}))})}),fe=Object(l.memo)(se),be=function(){var e=Object(u.c)((function(e){return e.contextMenu})),t=e.left,n=e.top,c=e.visible,r=e.type,a=Object(u.c)((function(e){return e.selection})),i=Object(u.b)(),s=Object(l.useCallback)((function(){i(G())}),[i]),f=Object(l.useCallback)((function(){var e=a.cells;i(N(e))}),[a.cells,i]),b=Object(l.useCallback)((function(){var e=a.cells;i(A(e))}),[a.cells,i]);return Object(o.jsx)(I,{onHide:s,type:r,left:t,top:n,visible:c,onClickClearContent:f,onClickMergeCells:b})},je=Object(l.memo)(be),de=(n(35),function(e){var t=e.cells,n=e.selection,c=e.layout,l=n.cells;if(null!=l){var r=Q(t,l),a=Object(B.a)(r,2),i=a[0],u=a[1];if(null==i||null==u)return null;var s=i.row,f=i.col,b=u.row,j=u.col;b=b+(u.rowSpan||1)-1,j=j+(u.colSpan||1)-1;for(var d=0,w=0,O=0,p=0,h=0;h<c.cols.length;h++){var v=c.cols[h];if(h<f&&(d+=v.width),!(h<=j))break;w+=v.width}for(var m=0;m<c.rows.length;m++){var C=c.rows[m];if(m<s&&(O+=C.height),!(m<=b))break;p+=C.height}return Object(o.jsxs)("div",{className:"sheet-overlay",children:[Object(o.jsx)("div",{className:"selection-l",style:{left:d,top:O,height:p-O}}),Object(o.jsx)("div",{className:"selection-r",style:{left:w,top:O,height:p-O}}),Object(o.jsx)("div",{className:"selection-t",style:{left:d,top:O,width:w-d}}),Object(o.jsx)("div",{className:"selection-b",style:{left:d,top:p,width:w-d}})]})}return null}),we=Object(l.memo)(de),Oe=function(){var e=Object(u.c)((function(e){return e.cells})),t=Object(u.c)((function(e){return e.selection})),n=Object(u.c)((function(e){return e.layout}));return Object(o.jsx)(we,{cells:e,selection:t,layout:n})},pe=Object(l.memo)(Oe),he=(n(36),function(e){var t=e.raw,n=e.style,c=e.cell,r=e.selected,a=e.onChange,i=e.onSelect,u=Object(l.useRef)(null),s=Object(l.useState)(!1),f=Object(B.a)(s,2),b=f[0],j=f[1],d=Object(l.useCallback)((function(){b||(j(!0),setTimeout((function(){K(u.current)}),0))}),[b]),w=Object(l.useCallback)((function(e){if("Enter"===e.key&&!e.shiftKey&&(e.preventDefault(),j(!1),u.current)){var n=u.current.innerText;n!==t&&a(n)}}),[a,t]),O=Object(l.useCallback)((function(){i&&i(c.row,c.col)}),[c.row,c.col,i]),p=Object(l.useCallback)((function(){if(b&&(j(!1),u.current)){var e=u.current.innerText;e!==t&&a(e)}}),[b,t,a]);return Object(o.jsx)("td",{onDoubleClick:d,onClick:O,className:$()({cell:!0,selected:r}),style:n,rowSpan:c.rowSpan,colSpan:c.colSpan,"data-row-idx":c.row,"data-col-idx":c.col,children:Object(o.jsx)("div",{className:$()({"cell-content-wrapper":!0,active:b}),onBlur:p,ref:u,contentEditable:b,suppressContentEditableWarning:!0,onKeyPress:w,children:c.raw})})}),ve=Object(l.memo)(he),me=function(e){var t=e.cell,n=t.row,c=t.col,r=Object(u.b)(),a=Object(l.useCallback)((function(e){r(D({index:[n,c],raw:e}))}),[n,c,r]);return Object(o.jsx)(ve,Object(g.a)(Object(g.a)({},e),{},{onChange:a}))},Ce=Object(l.memo)(me),xe=function(e){var t=e.tableWidth,n=e.layout,r=e.selection,a=e.cells,i=e.onSelectCells,u=e.onShowContextMenu,s=Object(l.useRef)({flag:!1,startRow:-1,startCol:-1}),f=Object(l.useCallback)((function(e){if(!s.current.flag){var t=F(e.target),n=Object(B.a)(t,2),c=n[0],o=n[1];if(-1===c||-1===o)return;(0===e.button||2===e.button&&(null==r.cells||c<r.cells[0]||c>r.cells[2]||o<r.cells[1]||o>r.cells[3]))&&i([c,o,c,o]),0===e.button&&(s.current={flag:!0,startRow:c,startCol:o})}}),[r.cells,i]),b=Object(l.useCallback)((function(e,t){var n=s.current,c=n.startRow,o=n.startCol,l=Q(a,[Math.min(e,c),Math.min(t,o),Math.max(e,c),Math.max(t,o)]),r=Object(B.a)(l,2),u=r[0],f=r[1];i([u.row,u.col,f.row+f.rowSpan-1,f.col+f.colSpan-1])}),[a,i]),j=Object(l.useCallback)((function(e){if(s.current.flag){var t=F(e.target),n=Object(B.a)(t,2),c=n[0],o=n[1];if(-1===c||-1===o)return;b(c,o)}}),[b]),d=Object(l.useCallback)((function(e){if(s.current.flag){var t=F(e.target),n=Object(B.a)(t,2),c=n[0],o=n[1];if(-1===c||-1===o)return;b(c,o),s.current.flag=!1}}),[b]),w=Object(l.useCallback)((function(e){e.preventDefault(),null!=r.cells&&(r.cells[0]===r.cells[2]&&r.cells[1]===r.cells[3]?u({left:e.pageX,top:e.pageY,type:L.SINGLE_CELL}):u({left:e.pageX,top:e.pageY,type:L.MULTIPLE_CELL}))}),[r.cells,u]);return Object(l.useEffect)((function(){var e=function(){s.current.flag&&(s.current.flag=!1)};return document.addEventListener("mouseup",e),function(){document.removeEventListener("mouseup",e)}}),[]),Object(o.jsxs)("table",{className:"sheet-table",style:{width:t},onMouseDown:f,onMouseUp:d,onMouseMove:j,onContextMenu:w,children:[Object(o.jsx)("colgroup",{children:n.cols.map((function(e,t){return Object(o.jsx)("col",{style:{width:e.width}},t)}))}),Object(o.jsx)("tbody",{children:a.length?n.rows.map((function(e,t){return Object(o.jsx)("tr",{style:{height:e.height},children:n.cols.map((function(e,n){var l=a[t][n];return l&&l.type===c.NORMAL?Object(o.jsx)(Ce,{cell:l,selected:null!=r.cells&&V(l,r.cells),raw:l.raw},n):null}))},t)})):null})]})},ye=Object(l.memo)(xe),ge=function(){var e=Object(u.b)(),t=Object(u.c)((function(e){return e.layout.cols.map((function(e){return e.width})).reduce((function(e,t){return e+t}),0)})),n=Object(u.c)((function(e){return e.layout})),c=Object(u.c)((function(e){return e.cells})),r=Object(u.c)((function(e){return e.selection})),a=Object(l.useCallback)((function(t){e(x(t))}),[e]),i=Object(l.useCallback)((function(t){e(U(t))}),[e]);return Object(o.jsx)(ye,{selection:r,cells:c,tableWidth:t,layout:n,onSelectCells:a,onShowContextMenu:i})},Se=Object(l.memo)(ge),Le=(n(37),function(){return{layout:(e=5,t=4,{cols:W(1,t).map((function(e){return{width:80}})),rows:W(1,e).map((function(e){return{height:36}}))}),cells:[{row:0,col:0,raw:"\u65e5\u671f"},{row:0,col:1,raw:"\u6536\u652f\u7c7b\u578b"},{row:0,col:2,raw:"\u8bf4\u660e"},{row:0,col:3,raw:"\u91d1\u989d"},{row:1,col:0,raw:"2020-05-06"},{row:1,col:1,raw:"\u56e2\u961f\u805a\u9910"},{row:1,col:2,raw:"\u8bf4\u660e\u6587\u6848A"},{row:1,col:3,raw:"1025"},{row:2,col:0,raw:"2020-05-07",rowSpan:2},{row:2,col:1,raw:"\u529e\u516c\u7528\u54c1"},{row:2,col:2,raw:"\u8bf4\u660e\u6587\u6848B"},{row:2,col:3,raw:"860"},{row:3,col:1,raw:"\u56e2\u961f\u5efa\u8bbe"},{row:3,col:2,raw:"\u8bf4\u660e\u6587\u6848C"},{row:3,col:3,raw:"1160"},{row:4,col:0,raw:"\u8bb0\u5f55\u4eba\uff1a\u738b\u5c0f\u660e",colSpan:2},{row:4,col:2,raw:"\u603b\u8ba1\uff1a"},{row:4,col:3,raw:""}]};var e,t}()),Ee=function(e){var t=Object(u.b)();return Object(l.useEffect)((function(){t(R(function(e){var t=e.layout,n=e.cells,o=Array.from({length:t.rows.length},(function(e,n){return Array.from({length:t.cols.length},(function(e,t){return{row:n,col:t,rowSpan:1,colSpan:1}}))}));return n.forEach((function(e){var t=e.row,n=e.col,l=e.rowSpan,r=void 0===l?1:l,a=e.colSpan,i=void 0===a?1:a;if(o[t][n]=Object(g.a)(Object(g.a)({},e),{},{row:t,col:n,rowSpan:r,colSpan:i,type:c.NORMAL}),r>1||i>1)for(var u=t;u<=t+r-1;u++)for(var s=n;s<=n+i-1;s++)u===t&&s===n||(o[u][s].type=c.PLACEHOLDER)})),o}(Le))),t(j(Le.layout))}),[t]),Object(o.jsxs)("div",{className:"sheet-container",children:[Object(o.jsx)("div",{className:"sheet-header"}),Object(o.jsx)(le,{}),Object(o.jsx)(fe,{}),Object(o.jsx)(je,{}),Object(o.jsx)(pe,{}),Object(o.jsx)(Se,{})]})},ke=function(){return Object(o.jsx)(u.a,{store:z,children:Object(o.jsx)(Ee,{})})};var Me=function(){return Object(o.jsx)("div",{id:"app",children:Object(o.jsx)(ke,{})})},Re=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,39)).then((function(t){var n=t.getCLS,c=t.getFID,o=t.getFCP,l=t.getLCP,r=t.getTTFB;n(e),c(e),o(e),l(e),r(e)}))};i.a.render(Object(o.jsx)(r.a.StrictMode,{children:Object(o.jsx)(Me,{})}),document.getElementById("root")),Re()}},[[38,1,2]]]);
//# sourceMappingURL=main.c6cba15d.chunk.js.map