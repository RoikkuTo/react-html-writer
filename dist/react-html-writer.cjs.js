"use strict";Object.defineProperties(exports,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}});var a=require("react"),S=require("styled-components");function j(t){return t&&typeof t=="object"&&"default"in t?t:{default:t}}var l=j(a),C=j(S);const h=(t,e)=>Math.round(Math.random()*(e-t)+t);function O(t,e){const[n,c]=a.useState(Object.fromEntries(Object.keys(t).map(f=>[f,""]))),[{isRunning:d,isPaused:o},s]=a.useState({isRunning:!1,isPaused:!1}),m=a.useRef(t),u=a.useRef(),r=a.useRef(0),i=a.useRef({idx:0,keys:Object.keys(n),get key(){return this.keys[this.idx]}}),p=a.useCallback(()=>{var f;s(k=>({...k,isRunning:!1})),(f=e==null?void 0:e.onEnd)==null||f.call(e,i.current)},(e==null?void 0:e.deps)||[]),E=a.useCallback(f=>{var k,g,b;if(f===((k=m.current[i.current.key])==null?void 0:k.length)&&(i.current.idx++,f=0,r.current=0,((g=m.current[i.current.key])==null?void 0:g.length)===0)){s(H=>({...H,isRunning:!1,isPaused:!0})),(b=e==null?void 0:e.onPause)==null||b.call(e,i.current),r.current=f,clearTimeout(u.current);return}i.current.key?(c(H=>({...H,[i.current.key]:H[i.current.key]+m.current[i.current.key][f]})),u.current=setTimeout(E,h(50,270),f+1)):p()},(e==null?void 0:e.deps)||[]),y=a.useCallback(f=>{var k;i.current.key?(typeof f=="boolean"&&f?u.current=setTimeout(E,h(150,230),r.current):typeof f=="number"&&f>-1?u.current=setTimeout(E,f,r.current):E(r.current),s({isRunning:!0,isPaused:!1}),(k=e==null?void 0:e.onStart)==null||k.call(e,i.current)):p()},(e==null?void 0:e.deps)||[]),T=a.useCallback(()=>{var f;s(k=>({...k,isRunning:!1})),clearTimeout(u.current),(f=e==null?void 0:e.onPause)==null||f.call(e,i.current)},(e==null?void 0:e.deps)||[]),$=a.useCallback(()=>{clearTimeout(u.current);const f=Object.fromEntries(Object.keys(m.current).map(k=>[k,""]));r.current=0,i.current.idx=0,i.current.keys=Object.keys(f),s({isRunning:!1,isPaused:!1}),c(f)},(e==null?void 0:e.deps)||[]);return a.useEffect(()=>()=>{clearTimeout(u.current)},[]),{pencil:n,play:y,pause:T,clean:$,pencilTarget:i.current,isRunning:d,isPaused:o}}const v=S.css`
	* {
		font-family: ${t=>t.theme.fontFamily} !important;
		font-size: ${t=>t.theme.fontSize} !important;
	}

	pre,
	span {
		margin: 0;
		white-space: pre-wrap;
	}
`,D=S.keyframes`
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
`,F=C.default.div`
	${v}

	display: flex;
	flex-wrap: wrap;
	flex-direction: ${t=>t.isOpen?"column":"row"};

	${t=>t.isSelected&&S.css`
			background: ${t.theme.selectBackgroundColor} !important;

			* {
				color: ${t.theme.selectColor} !important;
			}
		`}

	& > div:nth-child(2) {
		${t=>t.isOpen?`margin-left: ${t.theme.tagTabsize};`:"display: flex;"}
	}
`,R=C.default.span`
	color: ${t=>t.theme.tagHookColor};
`,w=C.default.span`
	color: ${t=>t.theme.tagNameColor};
`,_=C.default.span`
	color: ${t=>t.theme.attrNameColor};
`,q=C.default.span`
	color: ${t=>t.theme.attrSymbolColor};
`,P=C.default.span`
	color: ${t=>t.theme.attrQuoteColor};
`,N=C.default.span`
	color: ${t=>t.theme.attrValueColor};
`,z=C.default.div`
	${v}
	color: ${t=>t.theme.textColor};
`,M=C.default.span`
	border-left: solid ${t=>t.theme.cursorColor};
	${t=>t.blink&&S.css`
			animation: ${D} 0.5s linear infinite alternate;
		`}
`;function x({blinkDeps:t,display:e}){const[n,c]=a.useState(!1);return a.useEffect(()=>{const d=setTimeout(()=>c(!0),350);return()=>{clearTimeout(d),c(!1)}},[...t||[]]),l.default.createElement(M,{hidden:!e,blink:n},"\u200D")}function B({name:t,shouldWrite:e,shouldClean:n,shouldDisplayCursor:c,onEnd:d}){const{pencil:o,play:s,clean:m,isRunning:u,isPaused:r}=O({oHook:"</",name:t,cHook:">"},{onEnd:d});return a.useEffect(()=>{n&&m()},[n]),a.useEffect(()=>{e&&!u&&!r&&s()},[e,u,r]),l.default.createElement("div",null,l.default.createElement(R,null,o.oHook),l.default.createElement(w,null,o.name),l.default.createElement(R,null,o.cHook),l.default.createElement(x,{display:e||c,blinkDeps:[o]}))}function Q({content:t,shouldWrite:e,shouldClean:n,onStart:c,onEnd:d}){const{pencil:o,play:s,clean:m}=O(t,{onStart:c,onEnd:d});return a.useEffect(()=>{n&&m()},[n]),a.useEffect(()=>{e&&s()},[e]),l.default.createElement("span",null,l.default.createElement(_,null,o.key),l.default.createElement(q,null,o.symbol),l.default.createElement(P,null,o.quote1),l.default.createElement(N,null,o.value),l.default.createElement(P,null,o.quote2),l.default.createElement(x,{display:e,blinkDeps:[o]}))}function A(t,e,n){const c=a.useRef(t),[d,o]=a.useState(c.current),[s,m]=a.useState(!1);return a.useEffect(()=>{var u,r;(u=n==null?void 0:n.onChange)==null||u.call(n,d),!s&&d>=e&&(m(!0),(r=n==null?void 0:n.onEnd)==null||r.call(n))},[d,s,...(n==null?void 0:n.deps)||[]]),{hand:d,init:c.current,max:e,setHand:o,isFinished:s,incrementHand:(u=!0)=>o(r=>typeof u=="function"&&u(r,c.current)||typeof u!="function"&&u?r+1:r),derementHand:u=>o(r=>typeof u=="function"&&u(r,c.current)||typeof u!="function"&&u?r-1:r),reset:()=>{o(c.current),m(!1)}}}function V({attr:t,shouldWrite:e,shouldClean:n,onEnd:c}){const d=a.useRef(Object.entries(t)),{hand:o,setHand:s,incrementHand:m,reset:u}=A(-1,d.current.length,{onEnd:c});return a.useEffect(()=>{n&&u()},[n]),a.useEffect(()=>{e&&s(r=>r===-1?r+1:r)},[e]),l.default.createElement(l.default.Fragment,null,d.current.map(([r,i],p)=>l.default.createElement(Q,{key:p,content:{key:" "+r,symbol:"=",quote1:'"',value:i,quote2:'"'},shouldWrite:p===o,shouldClean:n,onEnd:m})))}function I({name:t,attr:e,shouldWrite:n,shouldClean:c,shouldDisplayCursor:d,isIndented:o,onEnd:s}){const[m,u]=a.useState(!1),{pencil:r,play:i,clean:p,isRunning:E,isPaused:y}=O({oHook:"<",name:t,attr:"",cHook:">"},{onPause(T){T.key==="attr"&&u(!0)},onEnd(){s==null||s(),u(!1)}});return a.useEffect(()=>{c&&p()},[c]),a.useEffect(()=>{n&&!E&&!y&&i(!o||h(500,600))},[n,E,y]),l.default.createElement("div",null,l.default.createElement(R,null,r.oHook),l.default.createElement(w,null,r.name),l.default.createElement(V,{attr:e,shouldWrite:m,shouldClean:c,onEnd:i}),l.default.createElement(R,null,r.cHook),l.default.createElement(x,{display:(n||d)&&!m,blinkDeps:[r]}))}const L={cursorColor:"white",textColor:"white",tagHookColor:"rgb(200, 200, 200)",tagNameColor:"#d34949",attrNameColor:"#8cd673",attrSymbolColor:"rgb(200, 200, 200)",attrQuoteColor:"#f9c962",attrValueColor:"#f9c962",selectColor:"white",selectBackgroundColor:"rgb(84, 95, 255)",fontSize:"20px",tagTabsize:"30px",fontFamily:"monospace"};function G({isChild:t,theme:e,children:n}){return t?l.default.createElement(l.default.Fragment,null,n):l.default.createElement(S.ThemeProvider,{theme:{...L,...e}},n)}const J=({isOpen:t,isSelected:e,children:n})=>l.default.createElement(F,{isOpen:t,isSelected:e},n);function K({name:t,open:e,attr:n={},loop:c,theme:d,shouldWrite:o,shouldClean:s,isChild:m,isIndented:u,children:r,onEnd:i}){const[p,E]=a.useState({isOpen:!1,isSelected:!1,loopCount:0}),{hand:y,init:T,isFinished:$,incrementHand:f,reset:k}=A(-1,l.default.Children.count(r)+2,{onChange(g){g===2&&e&&setTimeout(()=>E(b=>({...b,isOpen:!0})),h(230,330))},onEnd(){i==null||i(),!m&&(c||typeof c=="number"&&p.loopCount<c)&&setTimeout(()=>{E(g=>({...g,isSelected:!0})),setTimeout(()=>{E(g=>({isOpen:!1,isSelected:!1,loopCount:g.loopCount+1})),k(),setTimeout(f,500)},1e3)},2e3)},deps:[p.loopCount]});return a.useEffect(()=>{s&&(E(g=>({...g,isOpen:!1,isSelected:!1})),k())},[s]),a.useEffect(()=>{(!m||o)&&f((g,b)=>g===b)},[o]),l.default.createElement(G,{theme:d,isChild:m},l.default.createElement(J,{...p},l.default.createElement(I,{name:t,attr:n,shouldWrite:y===0,onEnd:f,shouldClean:s||p.loopCount,shouldDisplayCursor:!$&&o===void 0&&y===T,isIndented:u}),l.default.createElement("div",null,l.default.Children.map(r,(g,b)=>l.default.cloneElement(g,{shouldWrite:y===b+2,shouldClean:s||p.loopCount,onEnd:f,isChild:!0,isIndented:e&&b===0}))),l.default.createElement(B,{name:t,shouldWrite:y===1,shouldClean:s||p.loopCount,shouldDisplayCursor:$&&o===void 0,onEnd:f})))}function U({text:t,style:e,shouldWrite:n,shouldClean:c,isChild:d,isIndented:o,loop:s,onEnd:m}){const[u,r]=a.useState({isOpen:!1,isSelected:!1,loopCount:0}),{pencil:i,play:p,clean:E}=O({text:t},{onStart(y){console.log("vuuuuu")},onEnd(){m==null||m(),!d&&(s||typeof s=="number"&&u.loopCount<s)&&setTimeout(()=>{r(y=>({...y,isSelected:!0})),setTimeout(()=>r(y=>({...y,isSelected:!1,loopCount:y.loopCount+1})),1e3)},2e3)},deps:[u.loopCount]});return a.useEffect(()=>{c&&E()},[c]),a.useEffect(()=>{(!d||n)&&p(!o||h(500,600))},[n]),l.default.createElement(z,{style:e},l.default.createElement("span",null,i.text),l.default.createElement(x,{display:!!n||!d,blinkDeps:[i]}))}exports.Tag=K;exports.Text=U;
