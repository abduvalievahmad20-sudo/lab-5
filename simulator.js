const wobble=a=>(Math.random()-.5)*a, squeeze=(v,a,b)=>Math.min(b,Math.max(a,v));
function pulse(Hub){
 const clock=new Date().getHours(),sunlight=Math.max(0,Math.sin((clock-6)/14*Math.PI));
 Hub.plots.forEach(z=>{const c=z.live,a=z.gear;
  c.t=squeeze(c.t+sunlight*.4-.15+(a.airflow?-.8:.2)+wobble(.3),5,45);
  c.h=squeeze(c.h+(a.airflow?-1.2:.5)+(a.drip?1:0)+wobble(.6),20,99);
  c.s=squeeze(c.s+(a.drip?4:-.6)+wobble(.3),5,95);
  c.l=Math.round(squeeze(sunlight*800+(a.led?300:0)+wobble(30),0,1500));
  z.series.push({ts:Date.now(),t:c.t,h:c.h,s:c.s,l:c.l,v:a.airflow?1:0,p:a.drip?1:0});
  z.series=z.series.slice(-60)})}
