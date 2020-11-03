"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var react_1=require("react"),defaultOptions={root:null,rootMargin:"-150px 0px -150px 0px",thresholds:[0]},handleIntersect=function(e){return function(r){r.forEach((function(r){return e&&e(r)}))}},createObserver=function(e,r,t){var n=new IntersectionObserver(handleIntersect(t),r);return e.forEach((function(e){return n.observe(e)})),n},useIntersectionObserver=function(e,r,t){void 0===e&&(e=[]),void 0===t&&(t=defaultOptions);var n=react_1.useRef(),c=react_1.useState(),u=c[0],o=c[1];return react_1.useEffect((function(){u&&o();try{n.current=createObserver(e,t,r)}catch(c){o(c.message)}return function(){n.current&&(n.current.disconnect(),n.current=null)}}),[e]),{observer:n,error:u}};exports.default=useIntersectionObserver;