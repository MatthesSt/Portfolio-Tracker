if(!self.define){let e,i={};const s=(s,r)=>(s=new URL(s+".js",r).href,i[s]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=i,document.head.appendChild(e)}else e=s,importScripts(s),i()})).then((()=>{let e=i[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(r,n)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(i[o])return;let t={};const d=e=>s(e,o),l={module:{uri:o},exports:t,require:d};i[o]=Promise.all(r.map((e=>l[e]||d(e)))).then((e=>(n(...e),t)))}}define(["./workbox-3625d7b0"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index-08c68a49.css",revision:null},{url:"assets/index-0a82d08d.js",revision:null},{url:"index.html",revision:"62e5e2c9be58d10d319e1e9b9b27d14d"},{url:"portfolio2x.png",revision:"347671098de8deffbaaced8b3b22736c"},{url:"registerSW.js",revision:"402b66900e731ca748771b6fc5e7a068"},{url:"vite.svg",revision:"8e3a10e157f75ada21ab742c022d5430"},{url:"portfolio2x.png",revision:"347671098de8deffbaaced8b3b22736c"},{url:"manifest.webmanifest",revision:"c4e726f77ab7df34735224ceb13b14bf"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
