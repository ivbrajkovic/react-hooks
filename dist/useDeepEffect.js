"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var react_1=require("react"),useDeepEffect=function(e,r){var t=react_1.useRef(!0),u=react_1.useRef(JSON.stringify(r));react_1.useEffect((function(){if(t)return t.current=!1,void e();var c=JSON.stringify(r);u.current!==c&&(u.current=c,e())}),[r])};exports.default=useDeepEffect;