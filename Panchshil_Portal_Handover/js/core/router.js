/* Panchshil Customer Portal — view switching (sidebar + data-go links) and popover closing */
function closeAll(x){$$('.pop.open').forEach(p=>{if(p!==x)p.classList.remove('open')});$$('.ib.on').forEach(b=>b.classList.remove('on'));$$('.hm').forEach(h=>h.remove());$$('th .hb.on').forEach(b=>b.classList.remove('on'))}
function go(v){$$('.view').forEach(x=>x.classList.toggle('on',x.id==='v-'+v));const n=v==='NewTicket'?'Tickets':v;$$('nav button').forEach(b=>b.classList.toggle('active',b.dataset.nav===n));closeAll();window.scrollTo({top:0})}
$$('[data-nav]').forEach(b=>b.onclick=e=>{e.stopImmediatePropagation();go(b.dataset.nav)});
document.addEventListener('click',e=>{const g=e.target.closest('[data-go]');if(g)go(g.dataset.go)});
$$('[data-form="ticket"]').forEach(b=>b.onclick=()=>go('NewTicket'));
document.addEventListener('click',e=>{if(!e.target.closest('.wrapc,.hm,th .hb'))closeAll()});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeAll()});
