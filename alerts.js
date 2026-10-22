window.resolved=id=>{const a=Hub.incidents.find(x=>x.id==id);if(a)a.resolved=true;Memo.persist(Hub);render()};
window.dropAll=()=>{Hub.incidents=[];Memo.persist(Hub);render()};
function render(){document.getElementById('app').innerHTML=`<h1>Инциденты</h1><button onclick="dropAll()">Стереть записи</button>`+
 (Hub.incidents.map(a=>`<div class="box inc ${a.resolved?'resolved':''}"><b>${a.plot}</b> — ${a.note}<br><small>${new Date(a.ts).toLocaleTimeString()}</small>
 ${a.resolved?'':`<button onclick="resolved('${a.id}')">Закрыть</button>`}</div>`).join('')||'<p class=mu>Инцидентов нет ✅</p>')}
launch(render);
