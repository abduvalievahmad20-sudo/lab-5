const PLOTS=[
 {id:1,name:'Перец',bounds:{t:[19,29],h:[55,75],s:[40,70],l:[400,1000]}},
 {id:2,name:'Салат',bounds:{t:[12,22],h:[60,85],s:[45,80],l:[250,700]}},
 {id:3,name:'Герань',bounds:{t:[15,26],h:[45,70],s:[30,60],l:[350,900]}}];
const TABS=[['index.html','Старт'],['dashboard.html','Сводка'],['zones.html','Участки'],['sensors.html','Датчики'],['control.html','Пульт'],['alerts.html','Инциденты'],['analytics.html','Графики'],['settings.html','Допуски']];
const ICONS={drip:'Полив',airflow:'Обдув',led:'LED'};
(function(){const p=location.pathname.split('/').pop()||'index.html';
document.getElementById('menu').innerHTML='<div class="logo">Teplica<span>.log</span></div><nav>'+TABS.map(([f,n])=>`<a href="${f}" class="${f==p?'on':''}">${n}</a>`).join('')+'</nav>'})();
