"use strict";
(() => {
  let data={players:[],updated_at:null}, mode='xp', search='';
  const list=document.getElementById('rank-rows');
  const podium=document.getElementById('rank-podium');
  const status=document.getElementById('rank-summary');
  const rankLabels=[{level:21,name:'Arcymistrz'},{level:15,name:'Legenda'},
    {level:10,name:'Mistrz'},{level:6,name:'Architekt'},{level:3,name:'Budowniczy'},{level:1,name:'Odkrywca'}];
  function safePlayer(p){
    if(!p||typeof p!=='object'||typeof p.nick!=='string'||!/^[A-Za-z0-9_]{3,16}$/.test(p.nick))return null;
    const row={nick:p.nick};for(const key of ['xp','wins','losses','kills','deaths']){
      if(!Number.isSafeInteger(p[key])||p[key]<0||p[key]>1000000000)return null;
      row[key]=p[key];
    }return row;
  }
  function setData(raw){
    if(!raw||typeof raw!=='object'||!Array.isArray(raw.players))throw new Error('Nieprawidłowy plik rankingu');
    const names=new Set();
    const players=[];
    for(const p of raw.players.slice(0,500)){
      const row=safePlayer(p);if(!row||names.has(row.nick.toLowerCase()))continue;
      names.add(row.nick.toLowerCase());players.push(row);
      if(players.length>=250)break;
    }
    data={players,updated_at:typeof raw.updated_at==='string'?raw.updated_at:null};render();
  }
  function level(xp){let l=1;while(l<5000&&50*l*(l+1)<=xp)l++;return l;}
  function kd(p){return p.deaths===0?(p.kills?'∞':'0.00'):(p.kills/p.deaths).toFixed(2);}
  function text(tag,value,cls){const n=document.createElement(tag);n.textContent=String(value);if(cls)n.className=cls;return n;}
  function sorted(){return [...data.players].sort((a,b)=>mode==='xp'?
    b.xp-a.xp||a.nick.localeCompare(b.nick):
    b.wins-a.wins||a.losses-b.losses||b.kills-a.kills||a.nick.localeCompare(b.nick));}
  function render(){
    const ordered=sorted(), rows=ordered.filter(p=>p.nick.toLowerCase().includes(search.toLowerCase()));
    status.textContent=data.players.length?
      `${data.players.length} graczy • wyniki lokalne, niezweryfikowane${data.updated_at?' • eksport: '+data.updated_at.replace('T',' ').slice(0,16)+' UTC':''}`:
      'Brak opublikowanych wyników. Ranking nie pobiera danych z serwerów Minecraft automatycznie.';
    podium.replaceChildren();const medals=['🥇','🥈','🥉'];
    for(let i=0;i<3;i++){
      const box=text('div','', 'rank-medal'+(!ordered[i]?' empty':''));
      box.appendChild(text('span',medals[i],'medal'));
      box.appendChild(text('strong',ordered[i]?ordered[i].nick:'Wolne miejsce'));
      box.appendChild(text('small',ordered[i]?(mode==='xp'?`${ordered[i].xp} XP`:`${ordered[i].wins} wygranych`):'Brak danych'));
      podium.appendChild(box);
    }
    list.replaceChildren();
    document.getElementById('rank-main-col').textContent=mode==='xp'?'XP / poziom':'Wygrane';
    document.getElementById('rank-rank-col').textContent=mode==='xp'?'Ranga twórcy':'Przegrane';
    rows.forEach(p=>{
      const tr=document.createElement('tr');
      const lv=level(p.xp),r=rankLabels.find(x=>lv>=x.level).name;
      const cells=[ordered.indexOf(p)+1,p.nick,mode==='xp'?`${p.xp} XP / Lv ${lv}`:p.wins,
        mode==='xp'?r:p.losses,p.wins,kd(p)];
      cells.forEach(v=>tr.appendChild(text('td',v)));list.appendChild(tr);
    });
    if(!rows.length){const tr=document.createElement('tr'),td=text('td',
      data.players.length?'Nie znaleziono graczy.':'Nie ma jeszcze danych do wyświetlenia.');
      td.colSpan=6;tr.appendChild(td);list.appendChild(tr);}
  }
  document.querySelectorAll('[data-mode]').forEach(b=>b.addEventListener('click',()=>{
    mode=b.dataset.mode;document.querySelectorAll('[data-mode]').forEach(x=>{
      x.classList.toggle('active',x===b);x.setAttribute('aria-pressed',String(x===b));
    });render();
  }));
  document.getElementById('rank-search').addEventListener('input',e=>{search=e.target.value;render();});
  document.getElementById('rank-file').addEventListener('change',async e=>{
    const file=e.target.files?.[0];if(!file)return;
    if(file.size>1000000){status.textContent='Plik jest za duży.';return;}
    try{setData(JSON.parse(await file.text()));}catch(err){status.textContent='Nie można wczytać pliku: '+err.message;}
  });
  if(location.protocol==='file:'){
    render();status.textContent='Podgląd lokalny: wybierz plik ranking.json, aby zobaczyć wyniki.';
  }else{
    fetch('ranking.json',{cache:'no-store'}).then(res=>{if(!res.ok)throw Error('Brak pliku');return res.json();})
      .then(setData).catch(()=>{render();status.textContent='Brak opublikowanego pliku ranking.json. Wgraj eksport z launchera na hosting.';});
  }
})();
