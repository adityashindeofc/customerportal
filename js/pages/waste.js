/* Panchshil Customer Portal — Waste Management table (cards are static HTML in index.html) */
T('ws',{data:WS,id:'id',searchKeys:['id','dt','u','em','cat'],emptyIcon:'bin',empty:['No records',''],filters:[],
 cols:[{k:'act',t:'Action',menu:false,lock:1,cls:'c',r:x=>eye(x.id)},{k:'id',t:'Generation ID',num:1,cls:'mono'},{k:'dt',t:'Date & Time',cls:'mono'},{k:'u',t:'User Name'},{k:'em',t:'Email Id',cls:'mono'},{k:'cat',t:'Waste Category',r:x=>'<span class="pill '+wcol[cats.indexOf(x.cat)]+'">'+x.cat+'</span>'},{k:'bags',t:'Total Bags',num:1,cls:'mono'},{k:'qty',t:'Quantity',num:1,cls:'mono'}],
 view:x=>pop('Generation '+x.id,det([['Date & time',x.dt],['Waste category',x.cat],['Total bags',x.bags],['Quantity',x.qty],['User',x.u],['Email',x.em]]))});
