import{A as y,C as s,G as w}from"./vendor.8051c3f6.js";const g=function(){const l=document.createElement("link").relList;if(l&&l.supports&&l.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))a(o);new MutationObserver(o=>{for(const t of o)if(t.type==="childList")for(const d of t.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&a(d)}).observe(document,{childList:!0,subtree:!0});function h(o){const t={};return o.integrity&&(t.integrity=o.integrity),o.referrerpolicy&&(t.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?t.credentials="include":o.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function a(o){if(o.ep)return;o.ep=!0;const t=h(o);fetch(o.href,t)}};g();const f=async()=>{let r=new y;document.body.style.margin="0",r.renderer.view.style.position="absolute",r.renderer.view.style.display="block",r.renderer.resize(window.innerWidth,window.innerHeight),r.renderer.backgroundColor=1303;function l(){let i=new s,e=new w;e.lineStyle(10,6889216),e.moveTo(0,0),e.lineTo(50,50),e.lineTo(98,64),e.moveTo(50,50),e.lineTo(64,98),e.lineTo(112,112),e.moveTo(64,98),e.lineTo(78,146),e.moveTo(98,64),e.lineTo(146,78),e.moveTo(98,64),e.lineTo(112,112),e.lineTo(126,160),e.moveTo(112,112),e.lineTo(160,126),e.moveTo(146,78),e.lineTo(160,126),e.moveTo(146,78),e.lineTo(194,92),e.moveTo(168,83),e.lineTo(182,113),e.moveTo(78,146),e.lineTo(126,160),e.moveTo(78,146),e.lineTo(92,194),e.moveTo(85,170),e.lineTo(110,180);let n=new w;return n.lineStyle(1,0),n.beginFill(657930),n.moveTo(64+8,98+8),n.lineTo(78+4,146-5),n.lineTo(126-8,160-8),n.lineTo(64+8,98+8),n.moveTo(98+8,64+8),n.lineTo(146-4,78+5),n.lineTo(160-8,126-8),n.lineTo(98+8,64+8),n.lineStyle(1,16776960),n.beginFill(16776960),n.moveTo(64+8,98+8),n.arc(87,120,17,50*(Math.PI/180),112*(Math.PI/180)),n.lineTo(64+8,98+8),n.moveTo(98+8,64+8),n.arc(121,85,17,46*(Math.PI/180),348*(Math.PI/180),!0),n.lineStyle(1,0),n.beginFill(0),n.drawEllipse(88,123,3,1),n.drawEllipse(123,88,1,3),i.addChild(e,n),i}let h=45;for(let i=0;i<360;i+=h){let e=l();e.x=window.innerWidth/2,e.y=window.innerHeight/2,e.angle=i,r.stage.addChild(e)}let a=90,o=new s;for(let i=0;i<=window.innerWidth;i+=window.innerWidth/5)for(let e=0;e<=180;e+=a){let n=l();n.x=i,n.angle=e,o.addChild(n)}r.stage.addChild(o);let t=new s;for(let i=0;i<=window.innerHeight;i+=window.innerHeight/3)for(let e=0;e>=-180;e-=a){let n=l();n.y=i,n.angle=e,t.addChild(n)}r.stage.addChild(t);let d=new s;for(let i=0;i<=window.innerWidth;i+=window.innerWidth/5)for(let e=-180;e<=0;e+=a){let n=l();n.x=i,n.y=window.innerHeight,n.angle=e,d.addChild(n)}r.stage.addChild(d);let c=new s;for(let i=0;i<=window.innerHeight;i+=window.innerHeight/3)for(let e=180;e>=0;e-=a){let n=l();n.x=window.innerWidth,n.y=i,n.angle=e,c.addChild(n)}r.stage.addChild(c),window.addEventListener("resize",i=>{r.renderer.resize(window.innerWidth,window.innerHeight),o.x=0,o.y=0,t.x=0,t.y=0,d.x=0,d.y=0,c.x=0,c.y=0}),document.body.appendChild(r.view)};f();