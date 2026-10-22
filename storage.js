const Memo={
 fresh(){return{incidents:[],plots:PLOTS.map(z=>({...JSON.parse(JSON.stringify(z)),regime:'auto',
  live:{t:22,h:65,s:50,l:400},gear:{drip:false,airflow:false,led:false},series:[]}))}},
 restore(){try{return JSON.parse(localStorage.getItem('ghx'))||this.fresh()}catch(e){return this.fresh()}},
 persist(s){try{localStorage.setItem('ghx',JSON.stringify(s))}catch(e){}},
 wipeAll(){try{localStorage.removeItem('ghx')}catch(e){}}};
let Hub=Memo.restore();
