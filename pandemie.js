function nodesConnected(a,b){
  for(var i=0; i<graph.links.length; i++){
    var curlink = graph.links[i];
    if((curlink.source.index==a)&&(curlink.target.index==b)) return true;
    if((curlink.source.index==b)&&(curlink.target.index==a)) return true;
  }
  
  return false;
}

var pandemieStats = {};

function initPandemie(graph){
   var a = randomInt(0, graph.links.length);
   var curlink = graph.links[a];
  
   if(Math.random() < 0.5){
     a = curlink.source.health = 1;
   }else{
     a = curlink.target.health = 1;
   }
  
  pandemieStats = {
    nIter: 0,
    nSick: 1,
    nVacc: 0,
    nImmun: 0,
  }
  
  for(var i=0; i<nNodes; i++){
    if(graph.nodes[i].health == 3){
      pandemieStats.nVacc++
    } 
  }
}

function iteratePandemie(graph){
  pandemieStats.nSick = 0;
  pandemieStats.nImmun = 0;

  var getsick = []
  var getwell = []
  
  for(var i=0; i<nNodes; i++){
    if(graph.nodes[i].health == 1){
      pandemieStats.nSick++;
    
      for(var j=0; j<nNodes; j++){
        if((graph.nodes[j].health == 0) && nodesConnected(i,j) && (Math.random()<probTrans)){
          getsick.push(j)
        }
      }
      graph.nodes[i].timeSickLeft--;
      
      if(graph.nodes[i].timeSickLeft == 0){
        getwell.push(i)
      }
    }
    if(graph.nodes[i].health == 2){
      pandemieStats.nImmun++;
    }
  }
  
  for(var i=0; i<getsick.length; i++){
    graph.nodes[getsick[i]].health = 1
  }
  
  for(var i=0; i<getwell.length; i++){
    graph.nodes[getwell[i]].health = 2
  }
  
  pandemieStats.nIter++;
}
