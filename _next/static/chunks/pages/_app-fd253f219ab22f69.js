(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[888],{6840:function(e,t,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/_app",function(){return r(7570)}])},1551:function(e,t,r){"use strict";function n(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function o(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var n,o,l=[],u=!0,a=!1;try{for(r=r.call(e);!(u=(n=r.next()).done)&&(l.push(n.value),!t||l.length!==t);u=!0);}catch(c){a=!0,o=c}finally{try{u||null==r.return||r.return()}finally{if(a)throw o}}return l}}(e,t)||function(e,t){if(!e)return;if("string"===typeof e)return n(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(r);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return n(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var l,u=(l=r(7294))&&l.__esModule?l:{default:l},a=r(1003),c=r(880),i=r(9246);function f(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},l=Object.keys(e);for(n=0;n<l.length;n++)r=l[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(n=0;n<l.length;n++)r=l[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var s={};function d(e,t,r,n){if(e&&a.isLocalURL(t)){e.prefetch(t,r,n).catch((function(e){0}));var o=n&&"undefined"!==typeof n.locale?n.locale:e&&e.locale;s[t+"%"+r+(o?"%"+o:"")]=!0}}var p=u.default.forwardRef((function(e,t){var r,n=e.legacyBehavior,l=void 0===n?!0!==Boolean(!1):n,p=e.href,y=e.as,b=e.children,h=e.prefetch,v=e.passHref,m=e.replace,g=e.shallow,j=e.scroll,x=e.locale,w=e.onClick,O=e.onMouseEnter,E=f(e,["href","as","children","prefetch","passHref","replace","shallow","scroll","locale","onClick","onMouseEnter"]);r=b,l&&"string"===typeof r&&(r=u.default.createElement("a",null,r));var _,k=!1!==h,C=c.useRouter(),M=u.default.useMemo((function(){var e=o(a.resolveHref(C,p,!0),2),t=e[0],r=e[1];return{href:t,as:y?a.resolveHref(C,y):r||t}}),[C,p,y]),P=M.href,S=M.as,I=u.default.useRef(P),A=u.default.useRef(S);l&&(_=u.default.Children.only(r));var L=l?_&&"object"===typeof _&&_.ref:t,N=o(i.useIntersection({rootMargin:"200px"}),3),R=N[0],U=N[1],T=N[2],B=u.default.useCallback((function(e){A.current===S&&I.current===P||(T(),A.current=S,I.current=P),R(e),L&&("function"===typeof L?L(e):"object"===typeof L&&(L.current=e))}),[S,L,P,T,R]);u.default.useEffect((function(){var e=U&&k&&a.isLocalURL(P),t="undefined"!==typeof x?x:C&&C.locale,r=s[P+"%"+S+(t?"%"+t:"")];e&&!r&&d(C,P,S,{locale:t})}),[S,P,U,x,k,C]);var D={ref:B,onClick:function(e){l||"function"!==typeof w||w(e),l&&_.props&&"function"===typeof _.props.onClick&&_.props.onClick(e),e.defaultPrevented||function(e,t,r,n,o,l,u,c){("A"!==e.currentTarget.nodeName.toUpperCase()||!function(e){var t=e.currentTarget.target;return t&&"_self"!==t||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.nativeEvent&&2===e.nativeEvent.which}(e)&&a.isLocalURL(r))&&(e.preventDefault(),t[o?"replace":"push"](r,n,{shallow:l,locale:c,scroll:u}))}(e,C,P,S,m,g,j,x)},onMouseEnter:function(e){l||"function"!==typeof O||O(e),l&&_.props&&"function"===typeof _.props.onMouseEnter&&_.props.onMouseEnter(e),a.isLocalURL(P)&&d(C,P,S,{priority:!0})}};if(!l||v||"a"===_.type&&!("href"in _.props)){var H="undefined"!==typeof x?x:C&&C.locale,K=C&&C.isLocaleDomain&&a.getDomainLocale(S,H,C&&C.locales,C&&C.domainLocales);D.href=K||a.addBasePath(a.addLocale(S,H,C&&C.defaultLocale))}return l?u.default.cloneElement(_,D):u.default.createElement("a",Object.assign({},E,D),r)}));t.default=p,("function"===typeof t.default||"object"===typeof t.default&&null!==t.default)&&(Object.assign(t.default,t),e.exports=t.default)},9246:function(e,t,r){"use strict";function n(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function o(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var n,o,l=[],u=!0,a=!1;try{for(r=r.call(e);!(u=(n=r.next()).done)&&(l.push(n.value),!t||l.length!==t);u=!0);}catch(c){a=!0,o=c}finally{try{u||null==r.return||r.return()}finally{if(a)throw o}}return l}}(e,t)||function(e,t){if(!e)return;if("string"===typeof e)return n(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(r);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return n(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}Object.defineProperty(t,"__esModule",{value:!0}),t.useIntersection=function(e){var t=e.rootRef,r=e.rootMargin,n=e.disabled||!a,f=l.useRef(),s=o(l.useState(!1),2),d=s[0],p=s[1],y=o(l.useState(t?t.current:null),2),b=y[0],h=y[1],v=l.useCallback((function(e){f.current&&(f.current(),f.current=void 0),n||d||e&&e.tagName&&(f.current=function(e,t,r){var n=function(e){var t,r={root:e.root||null,margin:e.rootMargin||""},n=i.find((function(e){return e.root===r.root&&e.margin===r.margin}));n?t=c.get(n):(t=c.get(r),i.push(r));if(t)return t;var o=new Map,l=new IntersectionObserver((function(e){e.forEach((function(e){var t=o.get(e.target),r=e.isIntersecting||e.intersectionRatio>0;t&&r&&t(r)}))}),e);return c.set(r,t={id:r,observer:l,elements:o}),t}(r),o=n.id,l=n.observer,u=n.elements;return u.set(e,t),l.observe(e),function(){if(u.delete(e),l.unobserve(e),0===u.size){l.disconnect(),c.delete(o);var t=i.findIndex((function(e){return e.root===o.root&&e.margin===o.margin}));t>-1&&i.splice(t,1)}}}(e,(function(e){return e&&p(e)}),{root:b,rootMargin:r}))}),[n,b,r,d]),m=l.useCallback((function(){p(!1)}),[]);return l.useEffect((function(){if(!a&&!d){var e=u.requestIdleCallback((function(){return p(!0)}));return function(){return u.cancelIdleCallback(e)}}}),[d]),l.useEffect((function(){t&&h(t.current)}),[t]),[v,d,m]};var l=r(7294),u=r(4686),a="undefined"!==typeof IntersectionObserver;var c=new Map,i=[];("function"===typeof t.default||"object"===typeof t.default&&null!==t.default)&&(Object.assign(t.default,t),e.exports=t.default)},7570:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return s}});var n=r(5893),o=(r(6774),r(1664)),l=r.n(o),u=r(1163),a=function(e){var t=e.currentPath,r="about"===t,o="posts"===t;return(0,n.jsxs)("ul",{className:"flex gap-3 h-full",children:[(0,n.jsx)("li",{className:"h-full  flex flex-col justify-end border-black "+(r?"pb-3 border-b-4":"pb-4"),children:(0,n.jsx)(l(),{href:"/about",children:"About"})}),(0,n.jsx)("li",{className:"h-full  flex flex-col justify-end border-black "+(o?"pb-3 border-b-4":"pb-4"),children:(0,n.jsx)(l(),{href:"/posts",children:"Blog"})})]})},c=function(){var e=(0,u.useRouter)();return(0,n.jsxs)("div",{className:"sticky top-0 bg-white w-full h-16 flex flex-row justify-between items-center px-4 border-b-2",children:[(0,n.jsx)("div",{className:"flex items-center font-midium text-3xl h-full",children:(0,n.jsx)(l(),{href:"/",children:"(wat-aro)"})}),(0,n.jsx)(a,{currentPath:e.asPath.split("/")[1]})]})};r(6709);function i(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function f(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{},n=Object.keys(r);"function"===typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(r).filter((function(e){return Object.getOwnPropertyDescriptor(r,e).enumerable})))),n.forEach((function(t){i(e,t,r[t])}))}return e}var s=function(e){var t=e.Component,r=e.pageProps;return(0,n.jsxs)("div",{className:"py-0 px-8 min-h-screen m-auto flex flex-col items-center",children:[(0,n.jsx)(c,{}),(0,n.jsx)(t,f({},r))]})}},6709:function(){},6774:function(){},1664:function(e,t,r){e.exports=r(1551)},1163:function(e,t,r){e.exports=r(880)}},function(e){var t=function(t){return e(e.s=t)};e.O(0,[774,179],(function(){return t(6840),t(880)}));var r=e.O();_N_E=r}]);