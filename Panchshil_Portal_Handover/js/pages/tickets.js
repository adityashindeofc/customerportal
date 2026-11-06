/* Panchshil Customer Portal — Tickets page — Excel-style grid */
const tk=T('tk',{data:TK,id:'id',searchKeys:['id','desc','cat'],emptyIcon:'msg',empty:['No tickets yet','Raise a ticket and it will appear here.'],
 cols:[{k:'act',t:'Actions',menu:false,lock:1,cls:'c',r:x=>eye(x.id)},{k:'sr',t:'Sr. No.',num:1,cls:'mono'},{k:'id',t:'Ticket ID',cls:'mono'},{k:'pr',t:'Priority',r:x=>'<span class="'+pcls(x.pr)+'">'+esc(x.pr)+'</span>'},{k:'desc',t:'Description',w:340},{k:'cat',t:'Category',w:280}],
 filters:[{k:'pr',t:'Priority'},{k:'cat',t:'Category'}],
 view:x=>pop('Ticket '+x.id,det([['Priority','<span class="'+pcls(x.pr)+'">'+esc(x.pr)+'</span>'],['Category',esc(x.cat)]])+'<p style="margin-top:16px">'+esc(x.desc)+'</p>')});
$('#tk-b').addEventListener('click',ev=>{const tr=ev.target.closest('tr');if(tr)$$('#tk-b tr').forEach(r=>r.classList.toggle('selr',r===tr))});
