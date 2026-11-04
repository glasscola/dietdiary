import {drawPerson,drawFurnishing} from './art.mjs';
import {FLOORS,SHOP,hash,innerThought,workSignals,projectBook,dialogue,roleOf,workThought} from './engine.mjs';
export const CANVAS_W=480;
export const CANVAS_H=1000;
const FY={1:778,2:638,3:498,4:358,5:218,6:46},LIFT_X=440;
const SKIN=['#f3d1ad','#e4b58e','#d5a07c','#bd8563','#9a654a','#79513e'],HAIR=['#594338','#83604a','#3c332e','#b78c63','#8c624d','#6a5748','#b6a18a'],CLOTH=['#af8c69','#8a9b79','#c7927a','#d2b484','#8a7b72','#b29baf','#758f8a','#be986b'];
const P={ink:'#604b3b',line:'#9d7f60',wood:'#b89065',edge:'#7e6046',cream:'#f6ecdc',wall:'#ede0cb',floor:'#d3b18a',muted:'#8b735c'};
let targets=[];let clockNow=new Date();
function rect(c,x,y,w,h,color){c.fillStyle=color;c.fillRect(Math.round(x),Math.round(y),Math.round(w),Math.round(h))}
function rounded(c,x,y,w,h,r,color){c.fillStyle=color;c.beginPath();c.roundRect(Math.round(x),Math.round(y),w,h,r);c.fill()}
function strokeRound(c,x,y,w,h,r,color,width=1){c.strokeStyle=color;c.lineWidth=width;c.beginPath();c.roundRect(x+.5,y+.5,w-1,h-1,r);c.stroke()}
function text(c,s,x,y,size=9,color=P.ink,align='left'){c.font=`${size}px "Malgun Gothic",sans-serif`;c.textAlign=align;c.fillStyle=color;c.fillText(s,x,y);c.textAlign='left'}
function ellipse(c,x,y,rx,ry,col){c.fillStyle=col;c.beginPath();c.ellipse(x,y,rx,ry,0,0,Math.PI*2);c.fill()}
function shade(c,x,y,w,h){ellipse(c,x,y,w,h,'#70533c20')}
function nameTag(c,t,x,y){const w=t.length*8+14;rounded(c,x-w/2,y,w,16,5,'#fff8eb');strokeRound(c,x-w/2,y,w,16,5,'#d2b895');text(c,t,x,y+11,8,P.ink,'center')}
function avatar(c,e,x,y,t=0,pose={}){drawPerson(c,e,x,y,t,pose)}
function warmColor(a){return ({computer:'#d1c2a8',laptop:'#c3b5a0',creator:'#b09a8e',desk:'#e1c8a1',wooddesk:'#b58b60',chair:'#9baf8c',pinkchair:'#c99781',rattan:'#b68d5b',clock:'#a1815e',moonclock:'#94867a',wallpaper:'#eee0c4',pinkwall:'#ead5c6',plant:'#819970',bookshelf:'#bf9a6d',lamp:'#d5b479',aquarium:'#a2b1a1',pantry:'#c2a37f',coffee:'#a28262',water:'#c3baa6',rug:'#c6ad86'})[a.id]||a.color}
function furnitureArt(c,item,x,y,scale=1){drawFurnishing(c,item,x,y,scale,clockNow)}
export function drawShop(canvas,id,level=1,skin=level){canvas.width=320;canvas.height=220;const c=canvas.getContext('2d');c.imageSmoothingEnabled=false;c.clearRect(0,0,320,220);c.scale(2,2);furnitureArt(c,{id,level,skin},80,65,.9)}
export function drawAvatar(canvas,e){canvas.width=128;canvas.height=152;const c=canvas.getContext('2d');c.imageSmoothingEnabled=false;c.clearRect(0,0,128,152);c.scale(2,2);c.save();c.translate(32,23);c.scale(1.1,1.1);avatar(c,e,0,0,2,{suit:!!e.candidate});c.restore()}
function active(s,f,kind,slot=0){return s.inventory.find(i=>i.equipped&&i.floor===f&&(i.slot||0)===slot&&SHOP.find(a=>a.id===i.id)?.kind===kind)}
function pathPoint(points,k){const lengths=points.slice(1).map((p,i)=>Math.hypot(p.x-points[i].x,p.y-points[i].y)),total=lengths.reduce((a,b)=>a+b,0);let dist=Math.max(0,Math.min(1,k))*total;for(let i=0;i<lengths.length;i++){if(dist<=lengths[i]||i===lengths.length-1){const u=lengths[i]?dist/lengths[i]:0;return {x:points[i].x+(points[i+1].x-points[i].x)*u,y:points[i].y+(points[i+1].y-points[i].y)*u,direction:points[i+1].x<points[i].x?-1:1}}dist-=lengths[i]}return points.at(-1)}
function deskPosition(e){return {x:85+(e.seat||0)*120,y:FY[e.floor]+56}}
function liftY(f){return FY[f]+88}
export function movementScene(s,time=0){
 time=Math.max(0,Number.isFinite(time)?time:0);
 const period=s.journal?.[s.day]?.rest?75:105,cycle=Math.floor(time/period),t=time%period,groups=[2,3,4].map(f=>s.staff.filter(e=>e.floor===f)),viable=groups.filter(g=>g.length>=2),pool=viable.length?viable[cycle%viable.length]:s.staff,offset=pool.length?cycle%pool.length:0,pair=pool.length>=2?[pool[offset],pool[(offset+1)%pool.length]]:pool.slice(0,1);
 const origins=[...new Set(pair.map(e=>e.floor))].sort((a,b)=>a-b),stops=[],pick={},drop={};let cursor=12,from=1;
 function travel(to){const duration=Math.max(1,Math.abs(liftY(from)-liftY(to))/140*1.25);stops.push({start:cursor,end:cursor+duration,from,to,door:false});cursor+=duration;from=to}
 function hold(f){const stop={start:cursor,end:cursor+2,from:f,to:f,door:true};stops.push(stop);cursor+=2;return stop}
 for(const f of origins){travel(f);pick[f]=hold(f)}travel(6);const roofIn=hold(6),restStart=cursor+4,restEnd=restStart+13;stops.push({start:cursor,end:restEnd+5,from:6,to:6,door:false});cursor=restEnd+5;const roofOut=hold(6);
 for(const f of [...origins].reverse()){travel(f);drop[f]=hold(f)}
 const stage=stops.find(a=>t>=a.start&&t<a.end),carY=stage?liftY(stage.from)+(liftY(stage.to)-liftY(stage.from))*(t-stage.start)/(stage.end-stage.start):t<12?liftY(1):liftY(from),door=stage?.door?Math.min(1,Math.min((t-stage.start)*3,(stage.end-t)*3)):0;
 const poses=s.staff.map(e=>{const base=deskPosition(e),idx=pair.findIndex(a=>a.id===e.id);if(idx<0)return {id:e.id,...base,zone:'work',seated:true};const wait={x:393+idx*14,y:liftY(e.floor)},car={x:LIFT_X+(idx?4:-4),y:carY},seat={x:170+idx*66,y:123},roofWait={x:393+idx*14,y:liftY(6)},pk=pick[e.floor],dp=drop[e.floor];let p,zone='work';
  if(t<6)p=base;
  else if(t<12){p=pathPoint([base,{x:base.x,y:liftY(e.floor)},wait],(t-6)/6);zone='walk'}
  else if(t<pk.start){p=wait;zone='waiting'}
  else if(t<pk.start+1.4){p=pathPoint([wait,{x:car.x,y:liftY(e.floor)}],(t-pk.start)/1.4);zone='boarding'}
  else if(t<roofIn.start+.5){p=car;zone='elevator'}
  else if(t<restStart){p=pathPoint([{x:car.x,y:liftY(6)},roofWait,{x:seat.x,y:liftY(6)},seat],(t-roofIn.start-.5)/(restStart-roofIn.start-.5));zone='walk'}
  else if(t<restEnd){p=seat;zone='roof'}
  else if(t<roofOut.start){p=pathPoint([seat,{x:seat.x,y:liftY(6)},roofWait],(t-restEnd)/5);zone='walk'}
  else if(t<roofOut.start+1.4){p=pathPoint([roofWait,{x:car.x,y:liftY(6)}],(t-roofOut.start)/1.4);zone='boarding'}
  else if(t<dp.start+.5){p=car;zone='elevator'}
  else if(t<dp.end+5){p=pathPoint([{x:car.x,y:liftY(e.floor)},wait,{x:base.x,y:liftY(e.floor)},base],(t-dp.start-.5)/(dp.end+5-dp.start-.5));zone='walk'}
  else p=base;
  return {id:e.id,...p,zone,seated:zone==='work'||zone==='roof',walking:zone==='walk'||zone==='boarding',appearance:{skin:e.skin,hair:e.hair,outfit:e.outfit,accessory:e.accessory}};
 });return {poses,carY,door,t,restStart,restEnd,pair:pair.map(e=>e.id)};
}
function windowArt(c,x,y,w=70,h=46){const hour=clockNow.getHours()+clockNow.getMinutes()/60,night=hour<6||hour>=19;rounded(c,x-3,y-3,w+6,h+6,3,'#b69a75');rect(c,x,y,w,h,'#e8ecdb');rect(c,x+3,y+3,w-6,h-6,night?'#414855':hour>=16?'#edc5a1':'#e4ecd9');ellipse(c,x+10+((hour+18)%24)/24*(w-20),y+12,night?4:6,6,night?'#f4e6c2':'#e4bd75');if(night){rect(c,x+12,y+8,2,2,'#fff4d7');rect(c,x+40,y+17,2,2,'#fff4d7');}rect(c,x+5,y+h-11,w-10,11,'#c7d1b0');rect(c,x+w/2,y,3,h,'#c4aa83');rect(c,x,y+h/2,w,3,'#c4aa83');rect(c,x-4,y+h+1,w+8,5,'#d2b48a');rect(c,x-7,y-5,5,h+7,'#cdb48e');rect(c,x+w+2,y-5,5,h+7,'#cdb48e');rect(c,x-7,y-5,w+14,3,'#967e60');rounded(c,x-5,y-2,12,h-1,3,'#d9ccb5');rounded(c,x+w-7,y-2,12,h-1,3,'#d9ccb5');for(const dx of [-2,2,w-4,w])rect(c,x+dx,y+1,1,h-7,'#f6e9d088');rect(c,x+9,y+h-4,w-18,4,'#b8c09c');rect(c,x+10,y+h-3,w-20,1,'#d9dfbf');}
function deskBack(c,s,f,x,y,seat){furnitureArt(c,active(s,f,'chair',seat)||{id:'chair',skin:1},x,y+4,.63);furnitureArt(c,active(s,f,'desk',seat)||{id:'wooddesk',skin:1},x,y,.94)}
function deskFront(c,s,f,x,y,seat){const desk=active(s,f,'desk',seat)||{id:'wooddesk'};rounded(c,x-40,y,80,10,3,warmColor(SHOP.find(a=>a.id===desk.id)));rect(c,x-39,y+1,78,2,'#f5e2bd');furnitureArt(c,active(s,f,'computer',seat)||{id:'computer',skin:2},x-24,y-6,.63);for(const [kind,dx,dy,scale]of [['keyboard',-2,10,.31],['deskplant',-34,-1,.28],['mug',32,1,.25]]){const i=active(s,f,kind,seat);if(i)furnitureArt(c,i,x+dx,y+dy,scale)}}
function bubble(c,t,x,y){const w=Math.min(248,Math.max(144,t.length*8+20)),left=Math.max(29,Math.min(405-w,x-w/2));rounded(c,left,y-29,w,27,7,'#fff7e8');strokeRound(c,left,y-29,w,27,7,'#b89870');rect(c,x-2,y-2,5,5,'#fff7e8');text(c,t,left+w/2,y-12,8,P.ink,'center')}
export function sceneHit(x,y){return [...targets].reverse().find(a=>x>=a.x&&x<=a.x+a.w&&y>=a.y&&y<=a.y+a.h)||null}
export function renderBuilding(canvas,s,time=0){
 if(canvas.width!==CANVAS_W*2||canvas.height!==CANVAS_H*2){canvas.width=CANVAS_W*2;canvas.height=CANVAS_H*2}const c=canvas.getContext('2d');clockNow=new Date();c.setTransform(2,0,0,2,0,0);c.imageSmoothingEnabled=true;targets=[];rect(c,0,0,480,1000,'#e9dfce');
 for(let i=0;i<5;i++){const x=(i*137+time*.9)%600-40;rounded(c,x,12+i%2*20,72,7,4,'#f7efe0');rounded(c,x+16,6+i%2*20,32,10,5,'#f7efe0')}
 const night=clockNow.getHours()<6||clockNow.getHours()>=19;if(night)rect(c,0,0,480,207,'#555660');
 text(c,(s.profile?.name||'새봄')+' COMPANY',240,27,11,'#7d644c','center');
 rect(c,21,208,441,751,'#a48768');rect(c,28,208,385,747,'#eadcc3');for(let yy=216;yy<951;yy+=17){rect(c,17,yy,10,14,'#c0ac90');rect(c,19,yy+1,7,1,'#ebddc6');}rect(c,12,210,5,741,'#8d79613b');
 // Rooftop cafe is physically separated from the interview floor.
 rect(c,27,169,388,33,'#c5a57d');for(let i=0;i<20;i++)rect(c,29+i*20,172,1,28,'#e3cba4');rect(c,23,197,395,10,'#927151');rect(c,23,192,395,5,'#e1c69f');
 rounded(c,30,50,384,118,4,'#f3e7d0');rect(c,31,144,382,44,'#d4bc95');for(let xx=38;xx<410;xx+=24){rect(c,xx,147,1,37,'#a88b6038');}for(let i=0;i<7;i++){const xx=58+i*51,yy=84+Math.sin(i/6*Math.PI)*9;ellipse(c,xx,yy,2.2,2.4,'#e7c98b');}c.strokeStyle='#a08a68';c.lineWidth=.7;c.beginPath();c.moveTo(46,76);c.quadraticCurveTo(205,110,391,76);c.stroke();text(c,'ROOFTOP  ·  느린 오후의 휴게실',49,68,10,'#765b40');
 const rug=active(s,6,'rug');if(rug)furnitureArt(c,rug,206,157,1.2);const para=active(s,6,'parasol');if(para)furnitureArt(c,para,321,102,.65);
 furnitureArt(c,active(s,6,'sofa')||{id:'pantry',skin:1},203,150,.93);furnitureArt(c,active(s,6,'coffee')||{id:'coffee',skin:1},65,129,.65);furnitureArt(c,active(s,6,'water')||{id:'water',skin:1},379,126,.58);
 const roofSpots={plant:[345,150,.65],lamp:[122,137,.6],beanbag:[300,160,.6],teatable:[202,172,.58],flowerbox:[62,177,.6],hammock:[317,143,.7],speaker:[104,102,.4]};for(const [kind,[x,y,sc]]of Object.entries(roofSpots)){const i=active(s,6,kind);if(i)furnitureArt(c,i,x,y,sc)}
for(const [idx,p]of projectBook(s).entries())if(p.completed){rounded(c,45+idx*42,73,28,28,3,'#ead7ad');text(c,['歩','食','月'][idx],59+idx*42,92,12,'#947047','center');}
 targets.push({action:'lounge',x:30,y:50,w:384,h:142});
 for(const f of [5,4,3,2]){const y=FY[f],wall=active(s,f,'wallpaper'),wallCol=wall?warmColor(SHOP.find(a=>a.id===wall.id)):'#f1e6d1';rect(c,28,y,385,96,wallCol);rect(c,28,y+96,385,34,'#cdb291');rect(c,29,y+92,383,4,'#bca17e');rect(c,30,y+92,381,1,'#f1dfc2');for(let row=0;row<3;row++)for(let xx=30+(row%2)*17;xx<410;xx+=50){rect(c,xx,y+98+row*10,43,1,'#ad8e6738');rect(c,xx+42,y+98+row*10,1,10,'#a68a6626');}for(let xx=35;xx<412;xx+=38){strokeRound(c,xx,y+59,32,31,1,'#c7b49466',.6);}rect(c,29,y+35,383,1,'#e1d2b8');for(let i=0;i<13;i++)rect(c,30+i*30,y+99,1,30,'#bd976d5f');rect(c,25,y+130,392,10,'#a17e57');rect(c,25,y+130,392,3,'#f5e6cc');
  if(wall&&wall.skin>=2)for(let xx=36;xx<410;xx+=22)rect(c,xx,y+3,wall.skin>=3?2:1,90,'#fff3dd70');
  rounded(c,39,y+9,29,20,5,'#ddc6a0');text(c,f+'F',53,y+23,10,'#6e5139','center');text(c,FLOORS[f],77,y+23,10,'#755b42');windowArt(c,314,y+35,70,43);
  furnitureArt(c,active(s,f,'clock')||{id:'clock',skin:1},266,y+45,.48);
  const roomProps={bookshelf:[48,y+82,.52],plant:[390,y+89,.5],lamp:[291,y+85,.45],aquarium:[267,y+81,.47],board:[177,y+48,.44],poster:[226,y+47,.4],speaker:[294,y+91,.4],rug:[202,y+108,1.3]};for(const [kind,[x,yy,sc]]of Object.entries(roomProps)){const i=active(s,f,kind);if(i)furnitureArt(c,i,x,yy,sc)}
  if(f===5){deskBack(c,s,f,205,y+85,0);avatar(c,{id:'boss',skin:0,hair:3,outfit:0,accessory:1},205,y+56,time,{seated:true});deskFront(c,s,f,205,y+79,0);nameTag(c,'대표님',205,y+114);furnitureArt(c,{id:'pantry',skin:2},86,y+93,.5);targets.push({action:'boss',x:184,y:y+39,w:43,h:45})}
  else for(let seat=0;seat<3;seat++){const x=85+seat*120;deskBack(c,s,f,x,y+85,seat);const e=s.staff.find(e=>e.floor===f&&e.seat===seat);if(!e)text(c,'빈 자리',x,y+122,8,'#806a51','center')}
 }
 // Interview and meeting rooms: no floor-wide hit area or interview shortcut.
 const y=FY[1],lobbyWall=active(s,1,'wallpaper');rect(c,28,y,385,171,lobbyWall?warmColor(SHOP.find(a=>a.id===lobbyWall.id)):'#eee0c7');if(lobbyWall&&lobbyWall.skin>=2)for(let xx=36;xx<410;xx+=22)rect(c,xx,y+3,lobbyWall.skin>=3?2:1,128,'#fff3dd70');rect(c,28,y+133,385,38,'#d3b489');rect(c,28,y+133,385,3,'#e6cda4');rect(c,214,y+27,5,105,'#ad8a60');rounded(c,39,y+9,29,20,5,'#dcc19a');text(c,'1F',53,y+23,10,'#6e5139','center');text(c,'어서 오세요, 작은 회사에.',77,y+23,10,'#755b42');text(c,'면접실',121,y+48,10,'#795d43','center');text(c,'미팅룸',313,y+48,10,'#795d43','center');
 const applicant=s.__candidates||[];for(let i=0;i<3;i++){const x=66+i*55;furnitureArt(c,{id:'rattan',skin:2},x,y+102,.55);const a=applicant[i];if(a){avatar(c,a,x,y+73,time,{seated:true,suit:true});nameTag(c,a.name,x,y+137);targets.push({action:'candidate',id:a.id,x:x-21,y:y+57,w:42,h:65})}}
 rounded(c,251,y+107,119,10,4,'#b48a5e');rect(c,259,y+117,5,26,'#7f6043');rect(c,357,y+117,5,26,'#7f6043');const guest={id:'meeting-guest',skin:1,hair:1,outfit:0,accessory:1};avatar(c,guest,307,y+75,time,{seated:true,suit:true});rounded(c,293,y+106,27,11,2,'#fff0d6');rect(c,297,y+109,16,1,'#ac9574');rect(c,297,y+112,12,1,'#ac9574');furnitureArt(c,{id:'mug',skin:2},351,y+104,.23);nameTag(c,'한보고 · 일정 제안',309,y+137);targets.push({action:'meeting',x:285,y:y+60,w:46,h:62});
 for(const [kind,x,yy,sc]of [['plant',390,y+118,.48],['clock',385,y+49,.38],['poster',250,y+73,.38],['board',181,y+78,.35],['bookshelf',235,y+125,.36],['aquarium',371,y+98,.3],['lamp',227,y+118,.4],['speaker',272,y+105,.3],['rug',120,y+142,.7]]){const i=active(s,1,kind);if(i)furnitureArt(c,i,x,yy,sc)}
 // Dedicated elevator shaft. Vertical travel is drawn only inside this shaft.
 rect(c,417,52,45,898,'#c2a681');rect(c,420,55,39,892,'#a08a6d');for(const f of [1,2,3,4,5,6]){const yy=liftY(f)-19;rounded(c,421,yy,37,60,3,'#d8c4a4');rect(c,439,yy+2,1,57,'#b49a75');rect(c,423,yy+3,33,2,'#f1e4cb');rect(c,424,yy+8,12,30,'#eee4cc38');rounded(c,435,yy-13,10,7,2,'#687467');rounded(c,409,yy+17,5,10,2,'#c6a47a');rect(c,410,yy+19,2,2,'#8c744e');text(c,f===6?'R':String(f),440,yy-7,5,'#eee8d3','center')}
 const scene=movementScene(s,time),cy=scene.carY;rounded(c,420,cy-19,39,61,3,'#896f53');rounded(c,423,cy-16,33,55,2,'#e4d3b7');rect(c,423,cy+25,33,13,'#bfa17a');
 const positions=new Map(scene.poses.map(p=>[p.id,p]));
 for(const p of scene.poses.filter(p=>p.zone==='work')){const e=s.staff.find(e=>e.id===p.id);avatar(c,e,p.x,p.y,time,{...p,working:workSignals(s)[e.floor===2?'exercise':e.floor===3?'diet':'rest']>0})}
 for(const f of [4,3,2])for(let seat=0;seat<3;seat++){const e=s.staff.find(e=>e.floor===f&&e.seat===seat);deskFront(c,s,f,85+seat*120,FY[f]+79,seat);if(e)nameTag(c,e.name,85+seat*120,FY[f]+114)}
 for(const p of scene.poses.filter(p=>p.zone!=='work').sort((a,b)=>a.y-b.y)){const e=s.staff.find(e=>e.id===p.id);avatar(c,e,p.x,p.y,time,{...p,working:workSignals(s)[e.floor===2?'exercise':e.floor===3?'diet':'rest']>0})}
 // Door leaves cover riders during closed travel, so no one crosses floors in open air.
 const doorW=17*(1-scene.door);rect(c,422,cy-17,doorW,57,'#c5ad8b');rect(c,457-doorW,cy-17,doorW,57,'#c5ad8b');rect(c,439,cy-16,1,55,'#b69d7c');
 for(const p of scene.poses){if(p.zone==='elevator')continue;targets.push({action:'staff',id:p.id,x:p.x-20,y:p.y-17,w:40,h:57})}
 const resting=scene.poses.filter(p=>p.zone==='roof');if(resting.length>=2){const turn=Math.floor((scene.t-scene.restStart)/4)%resting.length,p=resting[turn],e=s.staff.find(e=>e.id===p.id);const partner=s.staff.find(e=>e.id===resting[(turn+1)%resting.length].id),lines=dialogue(s,s.staff.find(e=>e.id===resting[0].id),s.staff.find(e=>e.id===resting[1].id)),line=lines[Math.floor((scene.t-scene.restStart)/4)%lines.length];bubble(c,line.name+': '+line.text,p.x,p.y-17)}
 const thoughtBeat=Math.floor(time/13),speaker=scene.poses.filter(p=>p.zone==='work');if(time%13<4&&speaker.length){const p=speaker[thoughtBeat%speaker.length],e=s.staff.find(e=>e.id===p.id);bubble(c,workThought(s,e,thoughtBeat),p.x,p.y-12);}
 rect(c,17,953,449,8,'#92704d');rect(c,12,961,459,8,'#c2a47b');rect(c,0,970,480,30,'#e0d0b8');for(let i=0;i<8;i++)rect(c,18+i*62,983,38,3,'#cbb28d');
}
