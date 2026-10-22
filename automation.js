const TITLES={t:'Температура воздуха',h:'Влажность воздуха',s:'Влажность почвы'};
function govern(Hub){Hub.plots.forEach(z=>{const c=z.live,L=z.bounds,a=z.gear;
 if(z.regime==='auto'){
  if(c.s<L.s[0])a.drip=true;else if(c.s>L.s[1]-5)a.drip=false;
  if(c.t>L.t[1]||c.h>L.h[1])a.airflow=true;else if(c.t<L.t[1]-2&&c.h<L.h[1]-5)a.airflow=false;
  a.led=c.l<L.l[0]&&new Date().getHours()>=6&&new Date().getHours()<21}
 ['t','h','s'].forEach(k=>{const bad=c[k]<L[k][0]||c[k]>L[k][1],key=z.id+k;
  if(bad&&!Hub.incidents.some(x=>x.key==key&&!x.resolved))
   Hub.incidents.unshift({id:Date.now()+k,key,ts:Date.now(),plot:z.name,resolved:false,
    note:`${TITLES[k]} ${c[k].toFixed(1)} вне допуска ${L[k][0]}–${L[k][1]}`})});
 });Hub.incidents=Hub.incidents.slice(0,100)}
function launch(fn){fn();setInterval(()=>{pulse(Hub);govern(Hub);Memo.persist(Hub);fn()},3000)}
