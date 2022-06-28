(function(C,u){typeof exports=="object"&&typeof module!="undefined"?u(exports,require("react"),require("styled-components")):typeof define=="function"&&define.amd?define(["exports","react","styled-components"],u):(C=typeof globalThis!="undefined"?globalThis:C||self,u(C.HTMLWriter={},C.React,C.StyleComponents))})(this,function(C,u,S){"use strict";function w(t){return t&&typeof t=="object"&&"default"in t?t:{default:t}}var r=w(u),b=w(S);const h=(t,e)=>Math.round(Math.random()*(e-t)+t);function H(t,e){const[n,i]=u.useState(Object.fromEntries(Object.keys(t).map(f=>[f,""]))),[{isRunning:d,isPaused:s},a]=u.useState({isRunning:!1,isPaused:!1}),m=u.useRef(t),o=u.useRef(),l=u.useRef(0),c=u.useRef({idx:0,keys:Object.keys(n),get key(){return this.keys[this.idx]}}),p=u.useCallback(()=>{var f;a(k=>({...k,isRunning:!1})),(f=e==null?void 0:e.onEnd)==null||f.call(e,c.current)},(e==null?void 0:e.deps)||[]),E=u.useCallback(f=>{var k,g,T;if(f===((k=m.current[c.current.key])==null?void 0:k.length)&&(c.current.idx++,f=0,l.current=0,((g=m.current[c.current.key])==null?void 0:g.length)===0)){a(j=>({...j,isRunning:!1,isPaused:!0})),(T=e==null?void 0:e.onPause)==null||T.call(e,c.current),l.current=f,clearTimeout(o.current);return}c.current.key?(i(j=>({...j,[c.current.key]:j[c.current.key]+m.current[c.current.key][f]})),o.current=setTimeout(E,h(50,270),f+1)):p()},(e==null?void 0:e.deps)||[]),y=u.useCallback(f=>{var k;c.current.key?(typeof f=="boolean"&&f?o.current=setTimeout(E,h(150,230),l.current):typeof f=="number"&&f>-1?o.current=setTimeout(E,f,l.current):E(l.current),a({isRunning:!0,isPaused:!1}),(k=e==null?void 0:e.onStart)==null||k.call(e,c.current)):p()},(e==null?void 0:e.deps)||[]),$=u.useCallback(()=>{var f;a(k=>({...k,isRunning:!1})),clearTimeout(o.current),(f=e==null?void 0:e.onPause)==null||f.call(e,c.current)},(e==null?void 0:e.deps)||[]),P=u.useCallback(()=>{clearTimeout(o.current);const f=Object.fromEntries(Object.keys(m.current).map(k=>[k,""]));l.current=0,c.current.idx=0,c.current.keys=Object.keys(f),a({isRunning:!1,isPaused:!1}),i(f)},(e==null?void 0:e.deps)||[]);return u.useEffect(()=>()=>{clearTimeout(o.current)},[]),{pencil:n,play:y,pause:$,clean:P,pencilTarget:c.current,isRunning:d,isPaused:s}}const A=S.css`
	* {
		font-family: ${t=>t.theme.fontFamily} !important;
		font-size: ${t=>t.theme.fontSize} !important;
	}

	pre,
	span {
		margin: 0;
		white-space: pre-wrap;
	}
`,_=S.keyframes`
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
`,q=b.default.div`
	${A}

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
`,x=b.default.span`
	color: ${t=>t.theme.tagHookColor};
`,D=b.default.span`
	color: ${t=>t.theme.tagNameColor};
`,M=b.default.span`
	color: ${t=>t.theme.attrNameColor};
`,N=b.default.span`
	color: ${t=>t.theme.attrSymbolColor};
`,v=b.default.span`
	color: ${t=>t.theme.attrQuoteColor};
`,z=b.default.span`
	color: ${t=>t.theme.attrValueColor};
`,B=b.default.div`
	${A}
	color: ${t=>t.theme.textColor};
`,L=b.default.span`
	border-left: solid ${t=>t.theme.cursorColor};
	${t=>t.blink&&S.css`
			animation: ${_} 0.5s linear infinite alternate;
		`}
`;function O({blinkDeps:t,display:e}){const[n,i]=u.useState(!1);return u.useEffect(()=>{const d=setTimeout(()=>i(!0),350);return()=>{clearTimeout(d),i(!1)}},[...t||[]]),r.default.createElement(L,{hidden:!e,blink:n},"\u200D")}function Q({name:t,shouldWrite:e,shouldClean:n,shouldDisplayCursor:i,onEnd:d}){const{pencil:s,play:a,clean:m,isRunning:o,isPaused:l}=H({oHook:"</",name:t,cHook:">"},{onEnd:d});return u.useEffect(()=>{n&&m()},[n]),u.useEffect(()=>{e&&!o&&!l&&a()},[e,o,l]),r.default.createElement("div",null,r.default.createElement(x,null,s.oHook),r.default.createElement(D,null,s.name),r.default.createElement(x,null,s.cHook),r.default.createElement(O,{display:e||i,blinkDeps:[s]}))}function V({content:t,shouldWrite:e,shouldClean:n,onStart:i,onEnd:d}){const{pencil:s,play:a,clean:m}=H(t,{onStart:i,onEnd:d});return u.useEffect(()=>{n&&m()},[n]),u.useEffect(()=>{e&&a()},[e]),r.default.createElement("span",null,r.default.createElement(M,null,s.key),r.default.createElement(N,null,s.symbol),r.default.createElement(v,null,s.quote1),r.default.createElement(z,null,s.value),r.default.createElement(v,null,s.quote2),r.default.createElement(O,{display:e,blinkDeps:[s]}))}function F(t,e,n){const i=u.useRef(t),[d,s]=u.useState(i.current),[a,m]=u.useState(!1);return u.useEffect(()=>{var o,l;(o=n==null?void 0:n.onChange)==null||o.call(n,d),!a&&d>=e&&(m(!0),(l=n==null?void 0:n.onEnd)==null||l.call(n))},[d,a,...(n==null?void 0:n.deps)||[]]),{hand:d,init:i.current,max:e,setHand:s,isFinished:a,incrementHand:(o=!0)=>s(l=>typeof o=="function"&&o(l,i.current)||typeof o!="function"&&o?l+1:l),derementHand:o=>s(l=>typeof o=="function"&&o(l,i.current)||typeof o!="function"&&o?l-1:l),reset:()=>{s(i.current),m(!1)}}}function I({attr:t,shouldWrite:e,shouldClean:n,onEnd:i}){const d=u.useRef(Object.entries(t)),{hand:s,setHand:a,incrementHand:m,reset:o}=F(-1,d.current.length,{onEnd:i});return u.useEffect(()=>{n&&o()},[n]),u.useEffect(()=>{e&&a(l=>l===-1?l+1:l)},[e]),r.default.createElement(r.default.Fragment,null,d.current.map(([l,c],p)=>r.default.createElement(V,{key:p,content:{key:" "+l,symbol:"=",quote1:'"',value:c,quote2:'"'},shouldWrite:p===s,shouldClean:n,onEnd:m})))}function G({name:t,attr:e,shouldWrite:n,shouldClean:i,shouldDisplayCursor:d,isIndented:s,onEnd:a}){const[m,o]=u.useState(!1),{pencil:l,play:c,clean:p,isRunning:E,isPaused:y}=H({oHook:"<",name:t,attr:"",cHook:">"},{onPause($){$.key==="attr"&&o(!0)},onEnd(){a==null||a(),o(!1)}});return u.useEffect(()=>{i&&p()},[i]),u.useEffect(()=>{n&&!E&&!y&&c(!s||h(500,600))},[n,E,y]),r.default.createElement("div",null,r.default.createElement(x,null,l.oHook),r.default.createElement(D,null,l.name),r.default.createElement(I,{attr:e,shouldWrite:m,shouldClean:i,onEnd:c}),r.default.createElement(x,null,l.cHook),r.default.createElement(O,{display:(n||d)&&!m,blinkDeps:[l]}))}const J={cursorColor:"white",textColor:"white",tagHookColor:"rgb(200, 200, 200)",tagNameColor:"#d34949",attrNameColor:"#8cd673",attrSymbolColor:"rgb(200, 200, 200)",attrQuoteColor:"#f9c962",attrValueColor:"#f9c962",selectColor:"white",selectBackgroundColor:"rgb(84, 95, 255)",fontSize:"20px",tagTabsize:"30px",fontFamily:"monospace"};function K({isChild:t,theme:e,children:n}){return t?r.default.createElement(r.default.Fragment,null,n):r.default.createElement(S.ThemeProvider,{theme:{...J,...e}},n)}const U=({isOpen:t,isSelected:e,children:n})=>r.default.createElement(q,{isOpen:t,isSelected:e},n);function X({name:t,open:e,attr:n={},loop:i,theme:d,shouldWrite:s,shouldClean:a,isChild:m,isIndented:o,children:l,onEnd:c}){const[p,E]=u.useState({isOpen:!1,isSelected:!1,loopCount:0}),{hand:y,init:$,isFinished:P,incrementHand:f,reset:k}=F(-1,r.default.Children.count(l)+2,{onChange(g){g===2&&e&&setTimeout(()=>E(T=>({...T,isOpen:!0})),h(230,330))},onEnd(){c==null||c(),!m&&(i||typeof i=="number"&&p.loopCount<i)&&setTimeout(()=>{E(g=>({...g,isSelected:!0})),setTimeout(()=>{E(g=>({isOpen:!1,isSelected:!1,loopCount:g.loopCount+1})),k(),setTimeout(f,500)},1e3)},2e3)},deps:[p.loopCount]});return u.useEffect(()=>{a&&(E(g=>({...g,isOpen:!1,isSelected:!1})),k())},[a]),u.useEffect(()=>{(!m||s)&&f((g,T)=>g===T)},[s]),r.default.createElement(K,{theme:d,isChild:m},r.default.createElement(U,{...p},r.default.createElement(G,{name:t,attr:n,shouldWrite:y===0,onEnd:f,shouldClean:a||p.loopCount,shouldDisplayCursor:!P&&s===void 0&&y===$,isIndented:o}),r.default.createElement("div",null,r.default.Children.map(l,(g,T)=>r.default.cloneElement(g,{shouldWrite:y===T+2,shouldClean:a||p.loopCount,onEnd:f,isChild:!0,isIndented:e&&T===0}))),r.default.createElement(Q,{name:t,shouldWrite:y===1,shouldClean:a||p.loopCount,shouldDisplayCursor:P&&s===void 0,onEnd:f})))}function Y({text:t,style:e,shouldWrite:n,shouldClean:i,isChild:d,isIndented:s,loop:a,onEnd:m}){const[o,l]=u.useState({isOpen:!1,isSelected:!1,loopCount:0}),{pencil:c,play:p,clean:E}=H({text:t},{onStart(y){console.log("vuuuuu")},onEnd(){m==null||m(),!d&&(a||typeof a=="number"&&o.loopCount<a)&&setTimeout(()=>{l(y=>({...y,isSelected:!0})),setTimeout(()=>l(y=>({...y,isSelected:!1,loopCount:y.loopCount+1})),1e3)},2e3)},deps:[o.loopCount]});return u.useEffect(()=>{i&&E()},[i]),u.useEffect(()=>{(!d||n)&&p(!s||h(500,600))},[n]),r.default.createElement(B,{style:e},r.default.createElement("span",null,c.text),r.default.createElement(O,{display:!!n||!d,blinkDeps:[c]}))}C.Tag=X,C.Text=Y,Object.defineProperties(C,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}})});
