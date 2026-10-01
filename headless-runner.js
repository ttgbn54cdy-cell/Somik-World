#!/usr/bin/env node
'use strict';
const fs=require('fs');
const path=require('path');
const E=require('./research-engine.js');

function arg(name,def){const i=process.argv.indexOf('--'+name);return i>=0&&process.argv[i+1]!==undefined?process.argv[i+1]:def;}
const seed=Math.max(1,Number(arg('seed','1'))>>>0);
const target=Math.max(1,Number(arg('ticks','1000000'))|0);
const checkpointEvery=Math.max(100,Number(arg('checkpoint','10000'))|0);
const outDir=path.resolve(arg('out',`./somik-run-${seed}`));
const stateFile=path.join(outDir,'state.json');
const eventsFile=path.join(outDir,'events.jsonl');
const summaryFile=path.join(outDir,'summary.json');
fs.mkdirSync(outDir,{recursive:true});

function compactEvent(ev){
  if(ev.type==='birth')return{tick:ev.tick,type:ev.type,child:ev.child,parentA:ev.parentA,parentB:ev.parentB,generation:ev.generation,genomeHash:ev.genomeHash,mutations:ev.mutations||[]};
  if(ev.type==='death')return{tick:ev.tick,type:ev.type,agent:ev.agent,generation:ev.generation,genomeHash:ev.genomeHash,offspring:ev.offspring};
  if(ev.type==='checkpoint')return{tick:ev.tick,type:ev.type,generation:ev.generation,hashes:ev.hashes||[]};
  if(ev.type==='technical_failure')return{tick:ev.tick,type:ev.type,message:ev.message||''};
  return null;
}
function flushEvents(w){
  if(!w.eventBuffer?.length)return;
  const lines=[];
  for(const ev of w.eventBuffer){const c=compactEvent(ev);if(c)lines.push(JSON.stringify(c));}
  if(lines.length)fs.appendFileSync(eventsFile,lines.join('\n')+'\n');
  w.eventBuffer=[];
}
function atomicJson(file,obj){const tmp=file+'.tmp';fs.writeFileSync(tmp,JSON.stringify(obj));fs.renameSync(tmp,file);}
function save(w,reason){flushEvents(w);atomicJson(stateFile,{schema:'SomikWorldResearchHeadlessState/1',savedAt:new Date().toISOString(),reason,protocolId:E.PROTOCOL_ID,protocolHash:E.PROTOCOL_HASH,engineHash:E.ENGINE_HASH,state:w.dump()});atomicJson(summaryFile,{savedAt:new Date().toISOString(),reason,seed:w.seed,stateHash:w.stateHash(),metrics:w.metrics(),protocolId:E.PROTOCOL_ID,protocolHash:E.PROTOCOL_HASH,engineHash:E.ENGINE_HASH});}

let w;
if(fs.existsSync(stateFile)){
  const d=JSON.parse(fs.readFileSync(stateFile,'utf8'));
  if(d.protocolId!==E.PROTOCOL_ID||d.protocolHash!==E.PROTOCOL_HASH)throw new Error(`Protocol mismatch in saved state: ${d.protocolId}/${d.protocolHash}`);
  w=E.World.load(d.state);
  console.log(`Resumed ${outDir} at tick ${w.tick}`);
}else{
  w=new E.World({seed});
  save(w,'start');
  console.log(`Started seed ${seed}`);
}

let last=w.tick,lastWall=Date.now();
while(w.tick<target&&!w.extinct&&!w.technicalFailure){
  w.step();
  if(w.tick%checkpointEvery===0){
    save(w,'periodic');
    const now=Date.now(),dt=(now-lastWall)/1000,tps=(w.tick-last)/Math.max(.001,dt),m=w.metrics();
    console.log(`tick=${w.tick} pop=${m.population} gen=${m.medianGeneration.toFixed(1)} births=${m.births} dist=${m.meanGeneticDistance.toFixed(5)} tps=${tps.toFixed(0)}`);
    last=w.tick;lastWall=now;
  }
}
save(w,w.extinct?'extinction':w.technicalFailure?'technical-failure':'target-reached');
console.log(JSON.stringify({done:true,tick:w.tick,extinct:w.extinct,technicalFailure:w.technicalFailure,stateHash:w.stateHash(),metrics:w.metrics()},null,2));
