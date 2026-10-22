const SHADES=['#0b6e4f','#c8553d','#2b59c3'];
function sketch(cv,series){const w=cv.width=cv.clientWidth*2,h=cv.height=320,x=cv.getContext('2d'),all=series.flat();
 const mn=Math.min(...all),mx=Math.max(...all);x.lineWidth=3;
 series.forEach((s,i)=>{x.strokeStyle=SHADES[i];x.beginPath();s.forEach((v,j)=>{const X=j/Math.max(s.length-1,1)*w,Y=h-10-(v-mn)/((mx-mn)||1)*(h-20);j?x.lineTo(X,Y):x.moveTo(X,Y)});x.stroke()})}
function hints(){const r=[];Hub.plots.forEach(z=>{const n=z.series.length||1,airflow=z.series.reduce((a,x)=>a+x.v,0)/n,drip=z.series.reduce((a,x)=>a+x.p,0)/n;
 if(airflow>.5)r.push(`${z.name}: вентиляция занят ${Math.round(airflow*100)}% времени — проверьте затенение или порог температуры.`);
 if(drip>.4)r.push(`${z.name}: частый полив (${Math.round(drip*100)}%) — рассмотрите капельный полив или мульчу.`);
 if(z.live.l<z.bounds.l[0])r.push(`${z.name}: освещённости не хватает — включите досветку.`)});
 return r.length?r:['Все участки в штатном режиме 👍']}
function render(){document.getElementById('app').innerHTML=`<h1>Графики</h1><p class=mu>${Hub.plots.map((z,i)=>`<span style="color:${SHADES[i]}">● ${z.name}</span>`).join(' ')}</p>
${[['t','Температура воздуха, °C'],['h','Влажность воздуха, %'],['s','Влажность почвы, %']].map(([k,n])=>`<h3>${n}</h3><canvas id=c${k}></canvas>`).join('')}
<h2>Подсказки</h2><div class=box>${hints().map(t=>`<p>• ${t}</p>`).join('')}</div>`;
 ['t','h','s'].forEach(k=>sketch(document.getElementById('c'+k),Hub.plots.map(z=>z.series.map(x=>x[k]).concat(z.series.length?[]:[z.live[k]]))))}
launch(render);
