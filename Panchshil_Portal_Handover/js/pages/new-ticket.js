/* Panchshil Customer Portal — New Ticket form — validation, sub-category, counter, attachments, submit */
$('#ntCat').innerHTML='<option value="">Select category</option>'+Object.keys(subs).map(c=>'<option>'+c+'</option>').join('');
$('#ntCat').onchange=e=>{const s=subs[e.target.value]||[];$('#ntSub').disabled=!s.length;$('#ntSub').innerHTML='<option value="">Select sub category</option>'+s.map(x=>'<option>'+x+'</option>').join('');$('#w-cat').classList.remove('bad')};
$('#ntType').onchange=()=>$('#w-type').classList.remove('bad');
$('#ntDesc').oninput=e=>{const n=e.target.value.length;$('#ntCnt').textContent=n+'/60';$('#ntCnt').classList.toggle('max',n>=60);$('#w-desc').classList.remove('bad')};
let FILES=[];const fmt=b=>b>1048576?(b/1048576).toFixed(1)+' MB':Math.ceil(b/1024)+' KB';
const drawF=()=>{$('#ntFiles').innerHTML=FILES.map((f,i)=>'<div class="fi"><span>'+esc(f.name)+' · '+fmt(f.size)+'</span><button type="button" data-i="'+i+'" aria-label="Remove">✕</button></div>').join('');$('#ntFiles').querySelectorAll('button').forEach(b=>b.onclick=()=>{FILES.splice(+b.dataset.i,1);drawF()})};
const addF=fs=>{const big=[...fs].filter(f=>f.size>10485760);FILES.push(...[...fs].filter(f=>f.size<=10485760));drawF();if(big.length)pop('Some files were skipped',big.map(f=>'<p>'+esc(f.name)+' is larger than 10 MB.</p>').join(''))};
const d=$('#drop'),fi=$('#ntFile');d.onclick=()=>fi.click();d.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();fi.click()}};fi.onchange=()=>{addF(fi.files);fi.value=''};
d.ondragover=e=>{e.preventDefault();d.classList.add('over')};d.ondragleave=()=>d.classList.remove('over');d.ondrop=e=>{e.preventDefault();d.classList.remove('over');addF(e.dataTransfer.files)};
$('#nt').onsubmit=e=>{e.preventDefault();const t=$('#ntType').value,c=$('#ntCat').value,ds=$('#ntDesc').value.trim();$('#w-type').classList.toggle('bad',!t);$('#w-cat').classList.toggle('bad',!c);$('#w-desc').classList.toggle('bad',!ds);if(!t||!c||!ds)return;
 const id='2722-'+(10193+TK.length-4);TK.unshift({sr:0,id,pr:'P5 - Low',desc:ds,cat:c+($('#ntSub').value?' – '+$('#ntSub').value:'')});TK.forEach((x,i)=>x.sr=i+1);tk.render();
 e.target.reset();FILES=[];drawF();$('#ntCnt').textContent='0/60';$('#ntSub').disabled=true;go('Tickets');pop('Ticket '+id+' created','<p>Added to your ticket list for this session.</p><p class="notice">Prototype only — not sent to the property team.</p>')};
