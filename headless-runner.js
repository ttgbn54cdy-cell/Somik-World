#!/usr/bin/env node
'use strict';
const fs=require('fs'),path=require('path');
const E=require('./research-engine.js');
function arg(name,fallback){const i=process.argv.indexOf('--'+name);return i<0?fallback:process.argv[i+1];}
function integer(name,fallback,min=1,max=Number.MAX_SAFE_INTEGER){const n=Number(arg(name,fallback));if(!Number.isSafeInteger(n)||n<min||n>max)throw new Error('Invalid --'+name);return n;}
const flag=name=>process.argv.includes('--'+name);
function atomicJson(file,value){const tmp=file+'.tmp',fd=fs.openSync(tmp,'w');try{fs.writeFileSync(fd,JSON.stringify(value));fs.fsyncSync(fd);}finally{fs.closeSync(fd);}fs.renameSync(tmp,file);}
function compact(e){if(!['birth','death','checkpoint','technical_failure'].includes(e.type))return null;return e;}
function main(){
 if(flag('help')){console.log('node headless-runner.js --seed 1 --ticks 100000 --checkpoint 5000 --out run-1\nResumes the same directory. --ticks is the absolute target.\nOptional: --mutation-off --asexual --no-objects --no-chemical --memory-off --target-generation 50 --self-test');return;}
 if(flag('self-test')){const r=E.selfTest();console.log(JSON.stringify(r,null,2));if(!r.ok)process.exitCode=1;return;}
 const seed=integer('seed',1,1,4294967295),target=integer('ticks',100000),stride=integer('checkpoint',5000),targetGen=integer('target-generation',0,0);
 const out=path.resolve(arg('out','run-'+seed));fs.mkdirSync(out,{recursive:true});
 const stateFile=path.join(out,'state.json'),eventFile=path.join(out,'events.jsonl'),summaryFile=path.join(out,'summary.json');
 const treatment={mutationEnabled:!flag('mutation-off'),reproductionMode:flag('asexual')?'asexual':'sexual',objectsEnabled:!flag('no-objects'),chemicalEnabled:!flag('no-chemical'),memoryEnabled:!flag('memory-off')};
 let w,eventSeq=0,eventBytes=0;
 if(fs.existsSync(stateFile)){
  const checkpoint=JSON.parse(fs.readFileSync(stateFile,'utf8'));
  if(checkpoint.schema!=='SomikWorldResearchHeadlessState/1.1'||checkpoint.snapshotHash!==E.snapshotHash(checkpoint.state))throw new Error('Invalid checkpoint/checksum');
  w=E.World.load(checkpoint.state);
  if(w.stateHash()!==checkpoint.stateHash)throw new Error('Scientific state checksum mismatch');
  if(w.seed!==seed||JSON.stringify(w.treatment)!==JSON.stringify(treatment))throw new Error('Seed/treatment differs from saved run. Use the original options or a new directory.');
  eventBytes=checkpoint.eventBytes;eventSeq=checkpoint.eventSeq;
  if(!Number.isSafeInteger(eventBytes)||eventBytes<0||!Number.isSafeInteger(eventSeq)||eventSeq<0)throw new Error('Invalid event checkpoint');
  const bytes=fs.existsSync(eventFile)?fs.statSync(eventFile).size:0;if(bytes<eventBytes)throw new Error('Event archive is shorter than the committed checkpoint');
  if(bytes>eventBytes)fs.truncateSync(eventFile,eventBytes); // discard uncommitted crash tail
  console.log('Resumed tick '+w.tick);
 }else{
  if(fs.existsSync(eventFile)&&fs.statSync(eventFile).size)throw new Error('Event archive exists without checkpoint. Choose a new output directory.');
  w=new E.World({seed,...treatment});
 }
 function save(reason){
  const pending=w.eventBuffer.map(compact).filter(Boolean);let seq=eventSeq;
  const lines=pending.map(e=>JSON.stringify({...e,seq:++seq})).join('\n');
  if(lines){const fd=fs.openSync(eventFile,'a');try{fs.writeFileSync(fd,lines+'\n');fs.fsyncSync(fd);}finally{fs.closeSync(fd);}}
  else if(!fs.existsSync(eventFile))fs.writeFileSync(eventFile,'');
  const state=JSON.parse(JSON.stringify(w.dump()));state.eventBuffer=[];
  const checkpoint={schema:'SomikWorldResearchHeadlessState/1.1',savedAt:new Date().toISOString(),reason,
   protocolId:E.PROTOCOL_ID,protocolHash:E.PROTOCOL_HASH,engineHash:E.ENGINE_HASH,
   eventSeq:seq,eventBytes:fs.statSync(eventFile).size,stateHash:w.stateHash(),snapshotHash:E.snapshotHash(state),state};
  atomicJson(stateFile,checkpoint);w.eventBuffer=[];eventSeq=seq;eventBytes=checkpoint.eventBytes;
  atomicJson(summaryFile,{savedAt:checkpoint.savedAt,reason,seed:w.seed,stateHash:checkpoint.stateHash,metrics:w.metrics(),protocolId:E.PROTOCOL_ID,protocolHash:E.PROTOCOL_HASH,engineHash:E.ENGINE_HASH,runtime:{node:process.version,platform:process.platform,arch:process.arch}});
 }
 if(!fs.existsSync(stateFile))save('start');
 let stopRequested=false;process.on('SIGINT',()=>{stopRequested=true;});process.on('SIGTERM',()=>{stopRequested=true;});
 // Yield at bounded chunks so signals can commit a checkpoint before exit.
 async function run(){let reached=false;while(w.tick<target&&!w.extinct&&!w.technicalFailure&&!stopRequested){
   const end=Math.min(target,w.tick+100);
   while(w.tick<end&&!w.extinct&&!w.technicalFailure){w.step();if(w.tick%stride===0){save('periodic');console.log(JSON.stringify({tick:w.tick,population:w.agents.length,births:w.births}));}}
   if(targetGen&&w.metrics().medianGeneration>=targetGen){reached=true;break;}
   await new Promise(resolve=>setImmediate(resolve));
  }
  const reason=w.technicalFailure?'technical-failure':w.extinct?'extinction':stopRequested?'interrupted':reached?'target-generation':'target-ticks';
  save(reason);console.log(JSON.stringify({done:true,reason,tick:w.tick,population:w.agents.length,births:w.births,stateHash:w.stateHash()}));if(w.technicalFailure)process.exitCode=2;
 }
 return run();
}
Promise.resolve().then(main).catch(e=>{console.error(e.stack||e);process.exitCode=1;});
