import{A as c,S as u,G as f}from"./vendor.5025a745.js";const h=function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))l(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const d of r.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&l(d)}).observe(document,{childList:!0,subtree:!0});function n(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerpolicy&&(r.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?r.credentials="include":e.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function l(e){if(e.ep)return;e.ep=!0;const r=n(e);fetch(e.href,r)}};h();const p=t=>new Promise(i=>{t.loader.add("wood","assets/pexels-fwstudio-172292_edited.png").load(()=>{i()})});let o=[];const w=async()=>{let t=new c({backgroundColor:2894894});document.body.style.margin="0",t.renderer.view.style.position="absolute",t.renderer.view.style.display="block",t.renderer.resize(window.innerWidth,window.innerHeight),await p(t);let i=100,n=15,l=0,e=innerHeight/30;if(o.length==0)for(let d=0;d<24;d++){let s=new u(t.loader.resources.wood.texture);s.width=i,s.height=n,s.x=l,s.y=e,e+=2*n,t.stage.addChild(s),o.push(s)}window.addEventListener("resize",d=>{t.renderer.resize(window.innerWidth,window.innerHeight)}),document.body.appendChild(t.view),new f;let r={velocity:{x:1,y:1}};t.ticker.add(g,r)};let a=0;function g(){this.time=new Date;let t=0,i=innerWidth-o[0].width;for(let n in o){let l=i/60**3;o[n].x<=innerWidth-o[n].width&&t==0&&(o[n].x+=l,t+=l,a+=t)}if(Math.ceil(a)>=i*24){a=0;for(let n in o)o[n].x=0}}w();