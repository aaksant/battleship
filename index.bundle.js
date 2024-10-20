(()=>{"use strict";var e={118:(e,t,n)=>{n.d(t,{A:()=>o});var r=n(601),a=n.n(r),i=n(314),s=n.n(i)()(a());s.push([e.id,":root {\n  box-sizing: border-box;\n  --border-radius: 0.75rem;\n  --main-blue: #007bff;\n  --hover-blue: #0062cc;\n  --grid-size: 35px;\n  --border-gray: #ccc;\n  --hover-gray: #d0d0d0;\n  --instruction-gray: #666;\n}\n\n*,\n::before,\n::after {\n  box-sizing: inherit;\n  margin: 0;\n  padding: 0;\n}\n\nbody {\n  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,\n    Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;\n}\n\n.wrapper {\n  margin: 0 auto;\n  padding: 20px;\n}\n\n.header {\n  margin: 2rem 0;\n  text-align: center;\n}\n\n.boards-container {\n  display: flex;\n  justify-content: space-around;\n}\n\n.board-container {\n  padding: 20px;\n}\n\n.board-container h2 {\n  margin-bottom: 15px;\n  color: var(--main-blue);\n  text-align: center;\n}\n\n.board {\n  display: grid;\n  grid-template-columns: repeat(10, var(--grid-size));\n  grid-template-rows: repeat(10, var(--grid-size));\n  border: 1px solid black;\n}\n\n.cell {\n  width: var(--grid-size);\n  height: var(--grid-size);\n  border: 1px solid var(--border-gray);\n  cursor: pointer;\n}\n\n.cell.occupied,\n.cell.occupied:hover {\n  background-color: var(--main-blue);\n}\n\n.cell:hover {\n  background-color: var(--hover-gray);\n}\n\n.drag-feedback {\n  border: 3px solid var(--main-blue);\n  transition: background-color 0.1s ease;\n}\n\n.btn {\n  cursor: pointer;\n  border-radius: var(--border-radius);\n  border-style: none;\n  color: #f5f5f5;\n  font-weight: bold;\n  line-height: 1.5;\n  outline: none;\n  padding: 8px 15px;\n}\n\n.btn:hover {\n  transform: translateY(0);\n  transition-duration: 0.35s;\n}\n\n.btn:active {\n  transform: translateY(2px);\n  transition-duration: 0.35s;\n}\n\n.preview {\n  display: flex;\n  justify-content: center;\n  gap: 4rem;\n  margin-bottom: 2rem;\n}\n\n.preview-board {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n}\n\n.board-buttons {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 0.5rem;\n}\n\n.board-buttons .btn {\n  background-color: var(--main-blue);\n}\n\n.board-buttons .btn:hover {\n  background-color: var(--hover-blue);\n}\n\n.ships-container {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n  padding: 1rem;\n  border: 2px dashed var(--border-gray);\n  border-radius: var(--border-radius);\n  min-width: 250px;\n  transition: opacity 0.3s ease, background-color 0.3s ease;\n}\n\n.inaccessible {\n  opacity: 0.6;\n  background-color: #f0f0f0;\n  pointer-events: none;\n  cursor: not-allowed;\n  filter: grayscale(50%);\n}\n\n.ship-row {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n  padding: 0.5rem;\n  border-radius: var(--border-radius);\n}\n\n.ship-row:hover {\n  background-color: #f5f5f5;\n}\n\n.ship {\n  display: flex;\n  background-color: var(--main-blue);\n  border-radius: calc(var(--border-radius) / 2);\n  height: var(--grid-size);\n}\n\n.ship-segment {\n  flex: 1;\n  border-right: 2px solid rgba(255, 255, 255, 0.3);\n}\n\n.ship-segment:last-child {\n  border-right: none;\n}\n\n.carrier {\n  width: calc(var(--grid-size) * 5);\n}\n.battleship {\n  width: calc(var(--grid-size) * 4);\n}\n.cruiser {\n  width: calc(var(--grid-size) * 3);\n}\n.submarine {\n  width: calc(var(--grid-size) * 3);\n}\n.destroyer {\n  width: calc(var(--grid-size) * 2);\n}\n\n.ship-description {\n  display: flex;\n  gap: 0.5rem;\n  color: var(--instruction-gray);\n  font-size: 0.9rem;\n}\n\n.ship-length {\n  color: var(--instruction-gray);\n}\n\n.draggable {\n  cursor: grab;\n}\n\n.btn-start {\n  background-color: #ef4444;\n}\n\n.btn-start:hover {\n  background-color: #dc2626;\n}\n\n.btn-start:disabled {\n  background-color: var(--hover-gray);\n  transform: none;\n  transition: none;\n  cursor: not-allowed;\n}\n\n/* Modal */\n.modal {\n  position: fixed;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  padding: 2rem 4rem;\n  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,\n    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;\n  border-radius: var(--border-radius);\n}\n\n.modal-header {\n  margin-bottom: 2rem;\n  text-align: center;\n}\n\n#playerName {\n  width: 100%;\n  padding: 12px;\n  border-radius: var(--border-radius);\n  outline: none;\n  border: none;\n  box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;\n}\n\n#playerName:focus {\n  border: 1px solid var(--main-blue);\n}\n\n.hidden {\n  display: none;\n}\n",""]);const o=s},314:e=>{e.exports=function(e){var t=[];return t.toString=function(){return this.map((function(t){var n="",r=void 0!==t[5];return t[4]&&(n+="@supports (".concat(t[4],") {")),t[2]&&(n+="@media ".concat(t[2]," {")),r&&(n+="@layer".concat(t[5].length>0?" ".concat(t[5]):""," {")),n+=e(t),r&&(n+="}"),t[2]&&(n+="}"),t[4]&&(n+="}"),n})).join("")},t.i=function(e,n,r,a,i){"string"==typeof e&&(e=[[null,e,void 0]]);var s={};if(r)for(var o=0;o<this.length;o++){var d=this[o][0];null!=d&&(s[d]=!0)}for(var l=0;l<e.length;l++){var c=[].concat(e[l]);r&&s[c[0]]||(void 0!==i&&(void 0===c[5]||(c[1]="@layer".concat(c[5].length>0?" ".concat(c[5]):""," {").concat(c[1],"}")),c[5]=i),n&&(c[2]?(c[1]="@media ".concat(c[2]," {").concat(c[1],"}"),c[2]=n):c[2]=n),a&&(c[4]?(c[1]="@supports (".concat(c[4],") {").concat(c[1],"}"),c[4]=a):c[4]="".concat(a)),t.push(c))}},t}},601:e=>{e.exports=function(e){return e[1]}},72:e=>{var t=[];function n(e){for(var n=-1,r=0;r<t.length;r++)if(t[r].identifier===e){n=r;break}return n}function r(e,r){for(var i={},s=[],o=0;o<e.length;o++){var d=e[o],l=r.base?d[0]+r.base:d[0],c=i[l]||0,h="".concat(l," ").concat(c);i[l]=c+1;var p=n(h),u={css:d[1],media:d[2],sourceMap:d[3],supports:d[4],layer:d[5]};if(-1!==p)t[p].references++,t[p].updater(u);else{var g=a(u,r);r.byIndex=o,t.splice(o,0,{identifier:h,updater:g,references:1})}s.push(h)}return s}function a(e,t){var n=t.domAPI(t);return n.update(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap&&t.supports===e.supports&&t.layer===e.layer)return;n.update(e=t)}else n.remove()}}e.exports=function(e,a){var i=r(e=e||[],a=a||{});return function(e){e=e||[];for(var s=0;s<i.length;s++){var o=n(i[s]);t[o].references--}for(var d=r(e,a),l=0;l<i.length;l++){var c=n(i[l]);0===t[c].references&&(t[c].updater(),t.splice(c,1))}i=d}}},659:e=>{var t={};e.exports=function(e,n){var r=function(e){if(void 0===t[e]){var n=document.querySelector(e);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(e){n=null}t[e]=n}return t[e]}(e);if(!r)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");r.appendChild(n)}},540:e=>{e.exports=function(e){var t=document.createElement("style");return e.setAttributes(t,e.attributes),e.insert(t,e.options),t}},56:(e,t,n)=>{e.exports=function(e){var t=n.nc;t&&e.setAttribute("nonce",t)}},825:e=>{e.exports=function(e){if("undefined"==typeof document)return{update:function(){},remove:function(){}};var t=e.insertStyleElement(e);return{update:function(n){!function(e,t,n){var r="";n.supports&&(r+="@supports (".concat(n.supports,") {")),n.media&&(r+="@media ".concat(n.media," {"));var a=void 0!==n.layer;a&&(r+="@layer".concat(n.layer.length>0?" ".concat(n.layer):""," {")),r+=n.css,a&&(r+="}"),n.media&&(r+="}"),n.supports&&(r+="}");var i=n.sourceMap;i&&"undefined"!=typeof btoa&&(r+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(i))))," */")),t.styleTagTransform(r,e,t.options)}(t,e,n)},remove:function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(t)}}}},113:e=>{e.exports=function(e,t){if(t.styleSheet)t.styleSheet.cssText=e;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(e))}}}},t={};function n(r){var a=t[r];if(void 0!==a)return a.exports;var i=t[r]={id:r,exports:{}};return e[r](i,i.exports,n),i.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n.nc=void 0;var r=n(72),a=n.n(r),i=n(825),s=n.n(i),o=n(659),d=n.n(o),l=n(56),c=n.n(l),h=n(540),p=n.n(h),u=n(113),g=n.n(u),b=n(118),f={};f.styleTagTransform=g(),f.setAttributes=c(),f.insert=d().bind(null,"head"),f.domAPI=s(),f.insertStyleElement=p(),a()(b.A,f),b.A&&b.A.locals&&b.A.locals;class m{constructor(e){this.length=e,this.hits=[]}hit(e){e<0||e>=this.length||this.hits.includes(e)||this.hits.push(e)}isSunk(){return this.hits.length===this.length}}class v{constructor(){this.size=10,this.grid=this.createGrid(!0),this.attackGrid=this.createGrid(!1)}createGrid(e){return Array(this.size).fill().map((()=>Array(this.size).fill(!!e&&null)))}isInsideBoard(e,t){return e>=0&&t>=0&&e<this.size&&t<this.size}isWholeShipInBoard(e,t,n,r){return r?t+e.length<=this.size:n+e.length<=this.size}isPlaceTaken(e,t,n,r){for(let a=0;a<e.length;a++){const e=r?t+a:t,i=r?n:n+a;if(!this.isInsideBoard(e,i)||null!==this.grid[e][i])return!0}return!1}isValidPlacement(e,t,n,r){return this.isInsideBoard(t,n)&&this.isWholeShipInBoard(e,t,n,r)&&!this.isPlaceTaken(e,t,n,r)}placeShip(e,t,n,r){if(!this.isValidPlacement(e,t,n,r))return!1;for(let a=0;a<e.length;a++)r?this.grid[t+a][n]=e:this.grid[t][n+a]=e;return!0}getPartIndex(e,t,n){for(let r=0;r<this.size;r++)for(let a=0;a<this.size;a++)if(this.grid[r][a]===e){if(r===t)return n-a;if(a===n)return t-r}}receiveAttack(e,t){if(!this.isInsideBoard(e,t)||this.attackGrid[e][t])return!1;if(this.attackGrid[e][t]=!0,this.grid[e][t]instanceof m){const n=this.grid[e][t],r=this.getPartIndex(n,e,t);return n.hit(r),!0}return!1}isGameOver(){for(let e=0;e<this.size;e++)for(let t=0;t<this.size;t++)if(this.grid[e][t]instanceof m&&!this.grid[e][t].isSunk())return!1;return!0}}class y{constructor(){this.board=new v,this.defaultPlayerName="Player",this.isVertical=!1,this.shipTypes=this.getShipTypes(),this.getPlayerName(),this.handleBoardButtons(),this.initDragAndDrop(),this.disableStartGameButton()}enableStartGameButton(){document.querySelector(".btn-start").removeAttribute("disabled")}disableStartGameButton(){document.querySelector(".btn-start").setAttribute("disabled","")}getPlayerName(){const e=document.getElementById("form"),t=document.getElementById("playerName");e.addEventListener("submit",(n=>(n.preventDefault(),this.closeModal(e.parentElement),this.openPreviewModal(),t.value?t.value.trim():this.defaultPlayerName)))}openPreviewModal(){document.querySelector(".modal-preview").classList.remove("hidden")}closeModal(e){e.classList.add("hidden")}handleBoardButtons(){document.querySelector(".board-buttons").addEventListener("click",(e=>{const t=e.target.closest(".btn");if(t)switch(t.dataset.action){case"rotate":this.rotateShip();break;case"reset":this.reset();break;case"random":this.placeRandom()}}))}rotateShip(){this.isVertical=!this.isVertical}placeRandom(){this.reset(),this.shipTypes.forEach((e=>{const t=document.querySelector(`.ship[data-ship=${e}]`),n=parseInt(t.dataset.length),r=new m(n);let a=null;for(;!a;){const{row:t,col:i,isVertical:s}=this.getRandomPosition();a=this.board.placeShip(r,t,i,s),a&&(this.fillBoard(t,i,n,s),this.disableShipRow(e))}})),this.shipTypes=[],this.enableStartGameButton()}reset(){const e=document.querySelectorAll(".ship-row");[...document.querySelectorAll(".cell")].filter((e=>e.classList.contains("occupied"))).forEach((e=>e.classList.remove("occupied"))),e.forEach((e=>{e.setAttribute("draggable","true"),e.classList.add("draggable"),e.classList.remove("inaccessible"),e.style.cursor="grab"})),this.board=new v,this.shipTypes=this.getShipTypes(),this.isVertical=!1,this.initDragAndDrop(),this.disableStartGameButton()}getRandomPosition(){return{row:Math.floor(Math.random()*this.board.size),col:Math.floor(Math.random()*this.board.size),isVertical:Math.random()<.5}}getShipTypes(){return[...document.querySelectorAll(".ship-row")].map((e=>e.firstElementChild.dataset.ship))}initDragAndDrop(){const e=document.querySelector(".ships-container"),t=document.querySelector(".player-board");e.addEventListener("dragstart",this.handleDragStart.bind(this)),t.addEventListener("dragover",this.handleOver.bind(this)),t.addEventListener("drop",this.handleDrop.bind(this)),t.addEventListener("dragleave",this.clearDragFeedback.bind(this)),document.addEventListener("dragend",this.clearDragFeedback.bind(this))}handleDragStart(e){let t=e.target.closest(".draggable");if(!t)return;t.classList.contains("draggable")&&(t=t.firstElementChild,this.isVertical&&t.classList.add("vertical"));const n={length:parseInt(t.dataset.length),type:t.dataset.ship};e.dataTransfer.setData("application/json",JSON.stringify(n)),e.dataTransfer.setData(`ship-length-${n.length}/plain`,"")}handleOver(e){let t=e.target;if(!t.classList.contains("dropzone"))return;e.preventDefault(),this.clearDragFeedback();const n=parseInt(t.dataset.row),r=parseInt(t.dataset.col),a=e.dataTransfer.types.find((e=>e.startsWith("ship-length-")));if(!a)return;const i=parseInt(a.split("-").at(-1)),s=new m(i),o=this.board.isValidPlacement(s,n,r,this.isVertical);return o&&this.showDragFeedback(n,r,i,this.isVertical),{startRow:n,startCol:r,length:i,isValidPlacement:o}}handleDrop(e){if(!e.target.classList.contains("dropzone"))return;e.preventDefault();const t=this.handleOver(e);if(!t)return;const{startRow:n,startCol:r,length:a,isValidPlacement:i}=t;if(i){const t=JSON.parse(e.dataTransfer.getData("application/json")),i=new m(t.length);this.disableShipRow(t.type),this.shipTypes.splice(this.shipTypes.indexOf(t.type),1),this.board.placeShip(i,n,r,this.isVertical),this.fillBoard(n,r,a,this.isVertical),this.shipTypes.length||this.enableStartGameButton()}}disableShipRow(e){document.querySelector(`.ship-row .ship.${e}`).parentElement.classList.add("inaccessible")}showDragFeedback(e,t,n,r){const a=document.querySelector(".player-board");for(let i=0;i<n;i++){const n=r?e+i:e,s=r?t:t+i,o=a.querySelector(`[data-row="${n}"][data-col="${s}"]`);o&&o.classList.add("drag-feedback")}}clearDragFeedback(){document.querySelector(".player-board").querySelectorAll(".drag-feedback").forEach((e=>e.classList.remove("drag-feedback")))}fillBoard(e,t,n,r){const a=document.querySelector(".player-board");for(let i=0;i<n;i++){const n=r?e+i:e,s=r?t:t+i,o=a.querySelector(`[data-row="${n}"][data-col="${s}"]`);o&&o.classList.add("occupied")}}}new class{constructor(){this.setup=new y,this.playerBoard=new v,this.opponentBoard=new v,this.initPlayersBoard()}initPlayersBoard(){this.createBoard(this.playerBoard.grid,document.querySelector(".player-board")),this.createBoard(this.opponentBoard.grid,document.querySelector(".opponent-board"))}createBoard(e,t){for(let n=0;n<e.length;n++)for(let r=0;r<e[n].length;r++){const e=document.createElement("div");e.classList.add("cell"),e.classList.add("dropzone"),e.dataset.row=n,e.dataset.col=r,t.appendChild(e)}}}})();