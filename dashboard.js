const CURRENT=document.body.dataset.page,pick=id=>document.getElementById(id),num=v=>v.toFixed(1);
const verdict=(v,[a,b])=>v<a||v>b?'bad':'ok';
const gearRow=z=>Object.keys(ICONS).map(k=>`<span class="b ${z.gear[k]?'on':''}">${ICONS[k]}</span>`).join('');
const figure=(n,v)=>`<div class=box><small>${n}</small><div class=figure>${v}</div></div>`;
const dial=(z,k,n,u)=>{const [a,b]=z.bounds[k],v=z.live[k],w=Math.round(Math.max(0,Math.min(100,(v-a)/(b-a)*100)));
 return `<div class="dial ${verdict(v,z.bounds[k])}" style="--p:${w}"><div class=ring><em><b>${num(v)}</b><small>${u}</small></em></div><span>${n}</span></div>`};
const box=z=>`<div class=gauge><header><h3>${z.name}</h3><em>${z.regime==='auto'?'авто':'ручной'}</em></header>
<div class=dials>${[['t','Воздух','°C'],['h','Влага возд.','%'],['s','Влага грунта','%']].map(([k,n,u])=>dial(z,k,n,u)).join('')}</div>
<p class=light>Освещённость: <b>${z.live.l} лк</b></p><div class=gearRow>${gearRow(z)}</div></div>`;
const persist=()=>{Memo.persist(Hub);render()};
window.switchGear=(i,k)=>{const z=Hub.plots[i];z.gear[k]=!z.gear[k];z.regime='manual';persist()};
window.switchRegime=i=>{const z=Hub.plots[i];z.regime=z.regime=='auto'?'manual':'auto';persist()};
window.bounds=(i,k,j,v)=>{Hub.plots[i].bounds[k][j]=+v;Memo.persist(Hub)};
const SCREENS={
 dashboard:()=>{const n=Hub.plots.length,av=k=>Hub.plots.reduce((a,z)=>a+z.live[k],0)/n;
  return `<h1>Сводка по теплице</h1><div class=flow>${figure('Температура воздуха',num(av('t'))+' °C')}${figure('Влажность воздуха',num(av('h'))+' %')}
${figure('Влажность почвы',num(av('s'))+' %')}${figure('Инцидентов открыто',Hub.incidents.filter(a=>!a.resolved).length)}</div><h2>Участки</h2><div class=flow>${Hub.plots.map(box).join('')}</div>`},
 zones:()=>`<h1>Участки</h1><div class=flow>${Hub.plots.map(box).join('')}</div>`,
 sensors:()=>`<h1>Датчики</h1><div class=box><table><tr><th>Зона<th>Датчик<th>Значение<th>Допуск<th>Статус</tr>${Hub.plots.map(z=>
  [['t','Температура воздуха','°C'],['h','Влажность воздуха','%'],['s','Влажность почвы','%']].map(([k,n,u])=>`<tr><td>${z.name}<td>${n}<td>${num(z.live[k])} ${u}<td>${z.bounds[k].join('–')}<td class=${verdict(z.live[k],z.bounds[k])}>${verdict(z.live[k],z.bounds[k])=='ok'?'в допуске':'вне допуска'}`).join('')).join('')}</table></div>`,
 control:()=>`<h1>Пульт</h1><div class=flow>${Hub.plots.map((z,i)=>`<div class=box><h3>${z.name}</h3>
<button class="${z.regime=='auto'?'on':''}" onclick="switchRegime(${i})">Авто</button><p>${Object.keys(ICONS).map(k=>`<button class="${z.gear[k]?'on':''}" onclick="switchGear(${i},'${k}')">${ICONS[k]} ${{drip:'Капельный полив',airflow:'Обдув',led:'LED-свет'}[k]}</button>`).join('')}</p></div>`).join('')}</div>`,
 settings:()=>`<h1>Допуски</h1>${Hub.plots.map((z,i)=>`<div class=box style="margin:8px 0"><h3>${z.name}</h3>${[['t','Темп. °C'],['h','Возд. %'],['s','Почва %']].map(([k,n])=>
  `${n}: <input type=number value=${z.bounds[k][0]} onchange="bounds(${i},'${k}',0,this.value)">–<input type=number value=${z.bounds[k][1]} onchange="bounds(${i},'${k}',1,this.value)"> `).join('')}</div>`).join('')}
  <button onclick="Memo.wipeAll();location.reload()">Очистить память</button>`};
let pristine=true;
function render(){if(CURRENT=='settings'&&!pristine)return;pristine=false;pick('app').innerHTML=SCREENS[CURRENT]()}
launch(render);
