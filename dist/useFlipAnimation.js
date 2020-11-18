"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var react_1=require("react"),utils_1=require("@ivbrajkovic/utils"),invertDefault=function(e){var t=e.delta,r=e.elem;r.style.transform="translate("+t.left+"px, "+t.top+"px)",r.style.transition="transform 0s"},playDefault=function(e){var t=e.elem;t.style.transform="",t.style.transition="transform 300ms ease"},invertAndPlayDefault=function(e){var t=e.delta,r=e.elem;e.previous,e.next;r.animate([{transform:"translate("+t.left+"px, "+t.top+"px)"},{transform:"none"}],{delay:0,duration:300,easing:"ease"})},getDelta=function(e,t){return{top:e.top-t.top,left:e.left-t.left,width:e.width/t.width,height:e.height/t.height}},isZero=function(e){return 0===e.left&&0===e.top&&1===e.width&&1===e.height},useFlipAnimation=function(e){var t=e.root,r=e.invert,n=void 0===r?invertDefault:r,i=e.play,a=void 0===i?playDefault:i,o=e.invertAndPlay,u=void 0===o?invertAndPlayDefault:o,l=e.debounceScrolling,s=void 0===l?0:l,f=react_1.useRef({}),c=react_1.useRef(!0),d=react_1.useState(!0)[1];react_1.useEffect((function(){var e;return s>0&&(e=utils_1.debounce((function(){c.current=!0,d((function(e){return!e}))}),s),window.addEventListener("scroll",e)),function(){return e&&window.removeEventListener("scroll",e)}}),[]),react_1.useLayoutEffect((function(){if(t.current){for(var e=t.current.children,r=function(t){var r=e[t],i=r.dataset.key||0,o=r.getBoundingClientRect();if(!c.current&&i in f.current){var l=f.current[i],s=getDelta(l,o);isZero(s)||(u?u({delta:s,elem:r,previous:l,next:o}):(n({delta:s,elem:r,previous:l,next:o}),requestAnimationFrame((function(){a({delta:s,elem:r,previous:l,next:o})}))))}f.current[r.dataset.key]=o},i=0;i<e.length;i++)r(i);c.current=!1}}),[t,n,a,u])};exports.default=useFlipAnimation;