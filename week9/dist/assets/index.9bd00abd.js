import{S as H,a as A,C as E,P as F,W as N,b as T,O as _,c as j,A as q,M as l,d as D,e as O,f as I,G as b,D as K}from"./vendor.56f11876.js";const B=function(){const p=document.createElement("link").relList;if(p&&p.supports&&p.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))f(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const m of o.addedNodes)m.tagName==="LINK"&&m.rel==="modulepreload"&&f(m)}).observe(document,{childList:!0,subtree:!0});function C(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerpolicy&&(o.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?o.credentials="include":e.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function f(e){if(e.ep)return;e.ep=!0;const o=C(e);fetch(e.href,o)}};B();let r,i,d,P,h,L,M,v,g,c,u;function J(){U(),Q(),V()}function Q(){M=new H,document.body.appendChild(M.dom)}function U(){i=new A,i.background=new E(65280),d=new F(75,window.innerWidth/window.innerHeight,.1,1e3),d.position.z=5,r=new N,r.shadowMap.enabled=!0,r.shadowMap.type=T,r.setPixelRatio(window.devicePixelRatio),r.setSize(window.innerWidth,window.innerHeight),document.body.appendChild(r.domElement),L=new _(d,r.domElement);const R=.25;h=new j(16777215),h.position.set(-.5,.5,4),h.castShadow=!0,h.intensity=R,i.add(h),P=new q(16777215),P.intensity=.12,i.add(P);const p=64,C=new l({color:16711680}),f=.5,e=1.5,o=new D(f,f,e,p);v=new O(o,C),v.position.y=.42,i.add(v);const m=.5,k=1.5,x=64,z=new I(m,k,x),S=new l({color:16763653});S.transparent=!0,S.opacity=.7;const G=new O(z,S);G.position.y=1.91,i.add(G),new b().setPath("/resources/models/").load("toothpick_container.gltf",function(w){g=w.scene,g.scale.set(.005,.005,.005),g.position.set(0,-.31,-1.5);const s=new l({color:15592124}),y=new l({color:13303740}),n=new l({color:2434341});g.traverse(t=>{t.type==="Mesh"&&(t.name==="Cylinder"?t.material=s:t.name==="Sphere"?t.material=y:t.name==="Rectangle"&&(t.material=n))}),i.add(g)}),new b().setPath("resources/models/").load("styrofoam_container.gltf",function(w){let s=[];const y=new l({color:15856113,side:K});c=w.scene,c.scale.set(.2,.2,.2),c.position.x=-4.53,s.push(c);const n=c.clone();n.position.x=0,s.push(n);for(let t=0;t<2;t++)s[t].traverse(a=>{a.type==="Mesh"&&a.name==="Cube_2"&&(a.material=y)});i.add(c,n)}),new b().setPath("resources/models/").load("pupusa.gltf",function(w){let s=[];const y=new l({color:13541476});u=w.scene,u.scale.set(.022,.022,.022),u.position.set(-.17,-.24,.63),s.push(u);const n=u.clone();n.position.x=1.6,n.position.y=-.2,n.rotation.z=-.08,s.push(n);for(let t=0;t<2;t++)s[t].traverse(a=>{console.log(a),a.type==="Mesh"&&a.name==="Sphere"&&(a.material=y)});i.add(u,n)}),W()}function V(){window.addEventListener("resize",X,!1)}function X(){d.aspect=window.innerWidth/window.innerHeight,d.updateProjectionMatrix(),r.setSize(window.innerWidth,window.innerHeight)}function W(){requestAnimationFrame(()=>{W()}),M&&M.update(),L&&L.update(),r.render(i,d)}J();
