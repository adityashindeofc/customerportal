/* Panchshil Customer Portal — My Permits page */
T('pm',{data:[],id:'id',searchKeys:['id'],emptyIcon:'doc',empty:['No permits found','Permits you apply for will appear here with their status.'],
 cols:[{k:'act',t:'Actions',menu:false,lock:1},{k:'id',t:'ID'},{k:'ref',t:'Ref No.'},{k:'type',t:'Permit Type'},{k:'for',t:'Permit For'},{k:'by',t:'Requested By'},{k:'st',t:'Status'},{k:'loc',t:'Location'},{k:'on',t:'Created On'}],filters:[{k:'type',t:'Permit type'},{k:'st',t:'Status'},{k:'loc',t:'Location'}]});
kpis('#pm-k',[['Total Permits',0,'doc'],['Approved',0,'check'],['Draft',0,'clock'],['Open',0,'clock'],['Closed',0,'box'],['Rejected',0,'x'],['Extended',0,'redo'],['Hold',0,'hour']]);$('#pm-k .kpi').classList.add('sel');
