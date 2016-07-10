"use strict";

//Graph
function genGraph(nNodes, oddTwoLinks, propVacc){
  
  /*
  
  function randomInt(a,b){
    return Math.floor(Math.random() * b) + a 
  }
  
  var graph = {
    nodes: [],
    links: []
  }
  
  for (var i=0;i<nNodes;i++){
    graph.nodes.push({id:i, health:0, timeSickLeft:timeSick})
  }

  for (var i=0;i<nLinks;i++){
    do{
      var a = randomInt(0,nNodes);
      var b = randomInt(0,nNodes);
    }while(a==b);
  
    graph.links.push({source:a, target:b})
  }
  
  return graph;
  
  */
  
/*
  function nodesConnected(a,b){
    for(var i=0; i<graph.links.length; i++){
      var curlink = graph.links[i];
    
      if((curlink.source==a)&&(curlink.target==b)) return true;
      if((curlink.source==b)&&(curlink.target==a)) return true;
    }

    return false;
  }

  function getVoisin(a, n){
      var counter=0;
      var voisin=[];
      var a=randomInt(0, graph.links.length);

      for(var i=a; i<graph.links.length; i++){
        var curlink = graph.links[i];
        if((curlink.source.id==a)&&counter<n) voisin[counter]=curlink.target.id;
        if((curlink.target.id==a)&&counter<n) voisin[counter]=curlink.source.id;
        counter++;
      }

      if (voisin.length!=0) return voisin; 
      return randomInt(0, nNodes);
  }

  function getNbLinks(a){
      for(var i=0; i<graph.links.length; i++){
      var curlink = graph.links[i];
      var nblinks=0;
      if((curlink.source.id==a)||(curlink.target.id==a)) nblinks++;
    }
      return nblinks;

  }
*/
  var graph = {
    nodes: [],
    links: []
  }

  var seedSize = 3;
  
  //Génération des nodes
  for(var i=0; i < nNodes; i++){
    graph.nodes.push({id:i, health:((Math.random() < propVacc)?(3):(0)), timeSickLeft:timeSick});
  }
  
  // Génération réseau seed
  for(var i=0; i < seedSize; i++){
    var a = randomInt(0, seedSize-1);
    if(a>=i) a++
    
    graph.links.push({source:i, target:a});
  }
  
  // Génération du reste du réseau
  for(var i = seedSize; i<nNodes; i++){
    var newlinks = [];
    
    var nNewlinks;
  
    if(Math.random() < (1-oddTwoLinks)){
      nNewlinks=1
    }else{
      nNewlinks=2
    }
    
    for(var j=0; j<nNewlinks; j++){
      var a;
      
      do{
        a = randomInt(0, graph.links.length);
        var curlink = graph.links[a];
        
        if(Math.random() < 0.5){
          a = curlink.source;
        }else{
          a = curlink.target;
        }
      }while(newlinks.indexOf(a) != -1);
      
      graph.links.push({source:i, target:a});
     
      newlinks.push(a);
    }
  }  
  
  
  
/*
  var nNodes = 100;
  var nLinks = 150;
  var counterLinks=0;
  var seedSize = 10;
  var loop=true;

  
  while (counterLinks<nLinks){
      for (var i=seedSize; i<nNodes; i++){  
          var voisin=randomInt(1,voisinpossible);
          var voisinsec=randomInt(0,voisinpossible);
          if (loop) graph.nodes.push({id:i, health:1});

          for(var j=1;j<voisin;j++){
              var idvoisin=randomInt(0, i);
              var voisinsecID=getVoisin(idvoisin, voisinsec);
              var voisinlinks=getNbLinks(idvoisin);
              if ((Math.random()>0.55)&&(!nodesConnected(i, idvoisin))){
                  graph.links.push({source:i, target:idvoisin})
                  counterLinks++;
              }

              for(var k=0;k<voisinsecID.length;k++){
                  if((Math.random()>0.25)&&(!nodesConnected(i, voisinsecID[k]))){
                      graph.links.push({source:i, target:voisinsecID[k]})
                      counterLinks++;
                  } 
              }
          }
      }
      loop=false;
  }

  /*
  console.log(graph.nodes.length)

  for(var i=0;i<graph.nodes.length;i++)  {
      var nodetest=graph.nodes[i];
      console.log("nodes");
      console.log(nodetest.id);
  }

  console.log(graph.links.length)

  for(var i=0;i<graph.links.length;i++)  {
      var nodetest=graph.links[i];
      console.log("links");
      console.log(nodetest.source);
      console.log(nodetest.target);
  }
*/
  return graph
  
}