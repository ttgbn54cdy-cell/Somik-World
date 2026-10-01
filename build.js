'use strict';
// Dependency-free, reproducible release builder. SHA-256 uses a normalized engine
// with the engine identity field blanked to avoid a self-referential checksum.
const fs=require('fs'),path=require('path'),crypto=require('crypto');
const root=__dirname,sha=x=>crypto.createHash('sha256').update(x).digest('hex');
let source=fs.readFileSync(path.join(root,'research-engine.js'),'utf8');
const filename=path.join(root,'research-engine.js');
delete require.cache[require.resolve(filename)];let E=require(filename);
const manifest=JSON.parse(JSON.stringify(E.Protocol));delete manifest.protocolHash;
const protocolHash=sha(JSON.stringify(manifest)).slice(0,16);
source=source.replace(/const PROTOCOL_HASH='[^']+';/,`const PROTOCOL_HASH='${protocolHash}';`);
source=source.replace(/const ENGINE_HASH='[^']+';/,"const ENGINE_HASH='';");
const engineHash=sha(source);
source=source.replace("const ENGINE_HASH='';",`const ENGINE_HASH='${engineHash}';`);
fs.writeFileSync(filename,source);
delete require.cache[require.resolve(filename)];E=require(filename);
fs.writeFileSync(path.join(root,'SCIENTIFIC_PROTOCOL.json'),JSON.stringify(E.Protocol,null,2)+'\n');
const escapeScript=s=>s.replace(/<\/script/gi,'<\\/script');
const app=fs.readFileSync(path.join(root,'app.js'),'utf8'),v3=fs.readFileSync(path.join(root,'v3-baseline.html'),'utf8');
const single=fs.readFileSync(path.join(root,'index.html'),'utf8')
 .replace('<script src="research-engine.js"></script>',`<script>${escapeScript(source)}</script>\n<script>globalThis.__SOMIK_ENGINE_SOURCE=${escapeScript(JSON.stringify(source))};globalThis.__SOMIK_V3_SOURCE=${escapeScript(JSON.stringify(v3))};</script>`)
 .replace('<script src="app.js"></script>',`<script>${escapeScript(app)}</script>`);
fs.writeFileSync(path.join(root,'Somik_World_Research_1.1_Classic.html'),single);
const files={};for(const name of fs.readdirSync(root).sort()){const p=path.join(root,name);if(fs.statSync(p).isFile()&&name!=='BUILD_MANIFEST.json')files[name]=sha(fs.readFileSync(p));}
fs.writeFileSync(path.join(root,'BUILD_MANIFEST.json'),JSON.stringify({version:E.ENGINE_VERSION,protocolId:E.PROTOCOL_ID,protocolHash:E.PROTOCOL_HASH,engineHash:E.ENGINE_HASH,engineHashRule:'SHA-256 of research-engine.js with ENGINE_HASH replaced by empty string',files},null,2)+'\n');
console.log(JSON.stringify({version:E.ENGINE_VERSION,protocolHash:E.PROTOCOL_HASH,engineHash:E.ENGINE_HASH,files:Object.keys(files).length}));
