import{A as a,S as c,G as u}from"./vendor.5025a745.js";const f=function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function n(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerpolicy&&(r.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?r.credentials="include":e.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(e){if(e.ep)return;e.ep=!0;const r=n(e);fetch(e.href,r)}};f();const p=t=>new Promise(i=>{t.loader.add("wood","assets/pexels-fwstudio-172292_edited.png").load(()=>{i()})});let l=[];const w=async()=>{let t=new a({backgroundColor:2894894});document.body.style.margin="0",t.renderer.view.style.position="absolute",t.renderer.view.style.display="block",t.renderer.resize(window.innerWidth,window.innerHeight),await p(t);let i=100,n=15,s=0,e=innerHeight/30;for(let o=0;o<24;o++){let d=new c(t.loader.resources.wood.texture);d.width=i,d.height=n,d.x=s,d.y=e,e+=2*n,t.stage.addChild(d),l.push(d)}window.addEventListener("resize",o=>{t.renderer.resize(window.innerWidth,window.innerHeight)}),document.body.appendChild(t.view),new u;let r={velocity:{x:1,y:1}};t.ticker.add(h,r)};function h(){this.time=new Date;let t=0,i=0;for(let n in l){let e=(innerWidth-l[n].width)/60;l[n].x<=innerWidth-l[n].width&&t==0&&(l[n].x+=e,t+=e),i+=t,console.log(i)}}w();
