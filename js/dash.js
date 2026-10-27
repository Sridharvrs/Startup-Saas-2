const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const COL=['#6d4aff','#ff6b57','#14b8a6','#f5a623','#2f6bff'];
const fmt=(v,f)=>f==='$k'?'$'+v+'k':f==='h'?v+'h':v;
const D={
 count(el){const t=+el.dataset.count,dec=(String(el.dataset.count).split('.')[1]||'').length,st=performance.now();(function f(n){const p=Math.min((n-st)/1300,1),v=t*(1-Math.pow(1-p,3));el.textContent=v.toLocaleString(undefined,{minimumFractionDigits:dec,maximumFractionDigits:dec});p<1&&requestAnimationFrame(f)})(st)},
 line(el){const v=el.dataset.line.split(',').map(Number),sp='spark' in el.dataset,lb=(el.dataset.labels||'').split(','),f=el.dataset.fmt,W=600,H=sp?60:210,pd=sp?4:30,mx=Math.max(...v)*1.1,mn=sp?Math.min(...v)*.9:0,
  X=i=>pd+i*(W-pd*2)/(v.length-1),Y=x=>H-pd-(x-mn)/(mx-mn)*(H-pd*2),d=v.map((x,i)=>(i?'L':'M')+X(i).toFixed(1)+' '+Y(x).toFixed(1)).join('');
  let s=`<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="${sp?'none':'xMidYMid meet'}"><defs><linearGradient id="g${Math.random().toString(36).slice(2,7)}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6d4aff" stop-opacity=".3"/><stop offset="1" stop-color="#6d4aff" stop-opacity="0"/></linearGradient></defs>`;
  const gid=s.match(/id="(g\w+)"/)[1];
  if(!sp)for(let i=0;i<=4;i++){const y=pd+i*(H-pd*2)/4;s+=`<line class="gl" x1="${pd}" x2="${W-pd}" y1="${y}" y2="${y}"/><text class="tx" x="0" y="${y+4}">${fmt(Math.round(mx-(mx-mn)*i/4),f)}</text>`}
  s+=`<path class="ar" d="${d}L${X(v.length-1)} ${H-pd}L${X(0)} ${H-pd}Z" fill="url(#${gid})"/><path class="ln" pathLength="1" d="${d}"/>`;
  if(!sp)v.forEach((x,i)=>s+=`<circle class="pt2 ar" cx="${X(i)}" cy="${Y(x)}" r="5"><title>${lb[i]}: ${fmt(x,f)}</title></circle><text class="tx" x="${X(i)-12}" y="${H-6}">${lb[i]||''}</text>`);
  el.innerHTML=s+'</svg>'},
 bars(el){const v=el.dataset.bars.split(',').map(Number),lb=el.dataset.labels.split(','),f=el.dataset.fmt,m=Math.max(...v);
  el.innerHTML='<div class="bars">'+v.map((x,i)=>`<div class="bc"><em>${x?fmt(x,f):''}</em><i style="--h:${Math.max(x/m*88,x?4:0)}%;--k:${i}"></i></div>`).join('')+'</div><div class="bl">'+lb.map(l=>`<span>${l}</span>`).join('')+'</div>'},
 donut(el){let v=el.dataset.donut.split(',').map(Number),n=el.dataset.names.split(','),t=v.reduce((a,b)=>a+b),off=25,c='';
  v.forEach((x,i)=>{const p=x/t*100;c+=`<circle r="15.9155" cx="21" cy="21" stroke="${COL[i%5]}" stroke-dashoffset="${off}" style="--d:${p-1};--k:${i}"/>`;off-=p});
  el.innerHTML=`<div class="ds"><svg viewBox="0 0 42 42">${c}</svg><b>${el.dataset.center}</b></div><ul class="lg">`+v.map((x,i)=>`<li><i style="background:${COL[i%5]}"></i>${n[i]}<span>${Math.round(x/t*100)}%</span></li>`).join('')+'</ul>'},
 render(r=document){$$('[data-line]',r).forEach(D.line);$$('[data-bars]',r).forEach(D.bars);$$('[data-donut]',r).forEach(D.donut);$$('[data-count]',r).forEach(D.count);$$('.panel,.kpi',r).forEach((e,i)=>e.style.setProperty('--i',i));$$('.pt i',r).forEach(e=>{e.style.animation='none';e.offsetWidth;e.style.animation=''})}
};
window.toast=m=>{const t=document.createElement('div');t.className='toast';t.textContent=m;$('#toasts').append(t);setTimeout(()=>{t.style.opacity=0;t.style.transition='.4s';setTimeout(()=>t.remove(),400)},2400)};
const side=$('#side'),scrim=$('#scrim'),tgl=o=>{side.classList.toggle('open',o);scrim.classList.toggle('show',o);document.body.style.overflow=o?'hidden':''};
$('#bg').onclick=()=>tgl(true);$('#sx').onclick=scrim.onclick=()=>tgl(false);
const show=id=>{const m=$('#m-'+id)||$('.mod');id=m.id.slice(2);$$('.mod').forEach(x=>x.classList.toggle('on',x===m));$$('.ni[data-m]').forEach(b=>b.classList.toggle('on',b.dataset.m===id));$('#ttl').textContent=m.dataset.title;history.replaceState(null,'','#'+id);D.render(m);scrollTo({top:0});tgl(false);document.dispatchEvent(new CustomEvent('mod',{detail:id}))};
$$('.ni[data-m]').forEach(b=>b.onclick=()=>show(b.dataset.m));
const lom=$('#lom');$$('[data-logout]').forEach(b=>b.onclick=()=>{tgl(false);lom.classList.add('show')});$('#lc').onclick=()=>lom.classList.remove('show');lom.onclick=e=>e.target===lom&&lom.classList.remove('show');
$('#ly').onclick=()=>{toast('Logged out. See you soon!');setTimeout(()=>location.href='index.html',900)};
addEventListener('keydown',e=>{if(e.key==='Escape'){lom.classList.remove('show');tgl(false);$('#dd').classList.remove('show')}});
$('#bell').onclick=e=>{e.stopPropagation();$('#dd').classList.toggle('show')};document.addEventListener('click',()=>$('#dd').classList.remove('show'));
const clk=()=>$('#clk').textContent=new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit',second:'2-digit'});clk();setInterval(clk,1000);
document.addEventListener('click',e=>{const t=e.target.closest('[data-t]');if(t)toast(t.dataset.t);const g=e.target.closest('.tg');if(g){g.classList.toggle('on');toast('Setting updated')}});
$$('.vt button').forEach(b=>b.addEventListener('click',()=>{if(!b.classList.contains('on')){b.classList.add('on');b.firstChild.textContent=+b.firstChild.textContent+1}}));
show(location.hash.slice(1));
