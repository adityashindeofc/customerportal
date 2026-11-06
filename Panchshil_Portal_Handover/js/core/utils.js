/* Panchshil Customer Portal — shared helpers: $, $$, HTML escape, icon, modal, priority pill class, row actions */
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)],M=$('#modal');
const esc=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const ic=n=>'<svg class="ic"><use href="#i-'+n+'"/></svg>';
const pop=(t,h)=>{$('#modalTitle').textContent=t;$('#modalBody').innerHTML=h;M.showModal()};
const pcls=p=>'pill p'+(String(p).match(/P(\d)/)||[,0])[1];
const eye=id=>'<button type="button" class="eye" data-view="'+esc(id)+'" aria-label="View">'+ic('eye')+'</button>';
const det=rows=>rows.map(r=>'<div class="detailrow"><span>'+r[0]+'</span><strong style="font-weight:500;text-align:right;max-width:65%">'+r[1]+'</strong></div>').join('');
