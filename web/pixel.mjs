import {FLOORS,SHOP,hash,innerThought,workSignals,projectBook,dialogue,roleOf} from './engine.mjs';
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
function avatar(c,e,x,y,t=0,pose={}){
 const skin=SKIN[(e.skin??hash(e.id+'skin'))%6],hair=HAIR[(e.hair??hash(e.id+'hair'))%7],col=CLOTH[(e.outfit??hash(e.id+'outfit'))%8],style=(e.outfit??0)%4,hs=(e.hair??0)%7,acc=(e.accessory??0)%5;
 const walking=pose.walking,step=walking?Math.sin(t*11+(hash(e.id)%6))*2:0,bob=walking?Math.abs(Math.sin(t*11))*.8:Math.sin(t*1.7+hash(e.id)%7)*.35;
 c.save();c.translate(Math.round(x),Math.round(y+bob));if(pose.walking&&pose.direction===-1)c.scale(-1,1);if(pose.seated&&pose.working&&roleOf(e)==='researcher'){rect(c,15,25,12,8,'#f8edcf');rect(c,17,28,7,1,'#a08259');}shade(c,0,37,12,2.5);
 if(hs===2||hs===4)rounded(c,-14,-4,28,29,7,hair);
 if(pose.seated){rounded(c,-9,25,19,6,3,'#7d7468');rect(c,-8,29,5,22,'#7d7468');rect(c,4,29,5,22,'#7d7468')}
 else{rounded(c,-8,25+step,6,10,2,'#7a7365');rounded(c,3,25-step,6,10,2,'#7a7365')}
 rounded(c,-10,(pose.seated?50:34+step),9,4,2,'#604f43');rounded(c,2,(pose.seated?50:34-step),9,4,2,'#604f43');
 rounded(c,-11,12,23,17,5,pose.suit?'#786451':col);rounded(c,-15,15+step*.3,6,13,3,pose.suit?'#786451':col);rounded(c,11,15-step*.3,6,13,3,pose.suit?'#786451':col);rounded(c,-15,pose.seated?23+Math.sin(t*(pose.working?8:1))*1.2:25+step*.3,5,5,2,skin);rounded(c,12,pose.seated?23-Math.sin(t*(pose.working?8:1))*1.2:25-step*.3,5,5,2,skin);
 if(pose.suit){rect(c,-4,12,8,13,'#f6ecdc');rect(c,-1,14,3,11,'#a17b55');rect(c,-8,15,3,6,'#9f8971');rect(c,6,15,3,6,'#9f8971')}
 else{
  rounded(c,-5,11,11,5,2,'#e6d4b7');if(style===0){rect(c,-1,16,2,12,'#ead6b83f');for(let i=0;i<3;i++)rect(c,3,17+i*4,2,2,'#6d5a475c')}
  if(style===1){for(let i=0;i<3;i++)rect(c,-9,18+i*4,19,1,'#f2e6d04d')}
  if(style===2){rect(c,-3,17,7,10,'#edddc66e');rect(c,-11,19,23,2,'#f2dfc44d')}
  if(style===3){rect(c,-7,20,5,5,'#efdfc54f');rect(c,4,20,5,5,'#efdfc54f')}
  rect(c,-10,27,21,2,'#624c3826');rect(c,-14,23,5,2,'#efdfc55f');rect(c,12,23,5,2,'#efdfc55f');
 }
 rounded(c,-13,-9,27,25,10,skin);rounded(c,-16,1,5,8,3,skin);rounded(c,12,1,5,8,3,skin);
 rounded(c,-14,-12,29,13,8,hair);
 if(hs===0){rounded(c,-13,-7,8,13,4,hair);rect(c,-7,-5,12,3,hair)}
 if(hs===1){rounded(c,-13,-8,8,16,4,hair);rounded(c,6,-8,8,9,3,hair);rect(c,-2,-4,9,3,hair)}
 if(hs===2){rounded(c,-14,-5,5,21,3,hair);rounded(c,10,-5,5,21,3,hair);rect(c,-8,-5,18,3,hair)}
 if(hs===3){rounded(c,-10,-16,11,8,4,hair);rounded(c,0,-15,12,7,4,hair);rect(c,-8,-5,7,5,hair)}
 if(hs===4){ellipse(c,15,-7,6,7,hair);rounded(c,14,-4,5,17,2,hair);rect(c,12,-6,4,3,'#d8b494')}
 if(hs===5){rounded(c,-12,-5,7,10,4,hair);rounded(c,7,-5,7,10,4,hair);rect(c,-7,-4,14,3,hair)}
 if(hs===6){rounded(c,-12,-10,25,7,4,'#d4b389');rect(c,-13,-5,27,3,'#b99973')}
 const blink=Math.floor(t*1.2+hash(e.id)%13)%11===0;
 rounded(c,-7,3,3,blink?1:4,1,'#514036');rounded(c,5,3,3,blink?1:4,1,'#514036');rect(c,-6,3,1,1,'#ffffff9e');rect(c,6,3,1,1,'#ffffff9e');ellipse(c,-9,8,3,1.5,'#da9e8b7f');ellipse(c,10,8,3,1.5,'#da9e8b7f');rect(c,0,10,3,1,'#ad7362');
 if(acc===1){strokeRound(c,-10,1,10,8,3,'#78604b');strokeRound(c,2,1,10,8,3,'#78604b');rect(c,0,4,2,1,'#78604b')}
 if(acc===2){rounded(c,-13,-1,7,3,1,'#c6a77c');rect(c,-12,0,2,1,'#f5e2bb')}
 if(acc===3){ellipse(c,13,9,2,2,'#d1ac65')}
 if(acc===4){rect(c,-11,-8,7,2,'#e0b19c');rect(c,-9,-10,3,6,'#e0b19c')}
 if(pose.direction===-1){rect(c,-15,8,3,2,'#e4b08a4f')}
 c.restore();
}
function warmColor(a){return ({computer:'#d1c2a8',laptop:'#c3b5a0',creator:'#b09a8e',desk:'#e1c8a1',wooddesk:'#b58b60',chair:'#9baf8c',pinkchair:'#c99781',rattan:'#b68d5b',clock:'#a1815e',moonclock:'#94867a',wallpaper:'#eee0c4',pinkwall:'#ead5c6',plant:'#819970',bookshelf:'#bf9a6d',lamp:'#d5b479',aquarium:'#a2b1a1',pantry:'#c2a37f',coffee:'#a28262',water:'#c3baa6',rug:'#c6ad86'})[a.id]||a.color}
function furnitureArt(c,item,x,y,scale=1){
 const a=SHOP.find(a=>a.id===item.id);if(!a)return;const l=item.skin||item.level||1,k=a.kind,col=warmColor(a),dark=P.edge,light='#fff2dd';c.save();c.translate(x,y);c.scale(scale,scale);shade(c,0,26,31,4);
 if(k==='computer'){
  if(a.id==='laptop'){rounded(c,-25,-23-l,50,31+l,4,col);rounded(c,-22,-20-l,44,25+l,3,'#718b76');rounded(c,-19,-17-l,38,17+l,2,'#e1ebd3');rect(c,-16,-14-l,18,3,'#acc3a3');rect(c,-16,-8-l,29,2,'#bfd0b2');rounded(c,-29,8,58,5,2,'#baa98d');for(let n=0;n<8;n++)rect(c,-20+n*5,9,3,1,'#f4e3c6');if(l>=4){rounded(c,28,-26,21,30,3,col);rect(c,31,-23,15,23,'#dde8d0')}if(l===5)rect(c,-24,13,48,2,'#98a984')}
  else{const w=42+(l-1)*4;rounded(c,-w/2,-31,w,34,5,col);strokeRound(c,-w/2,-31,w,34,5,dark);rounded(c,-w/2+4,-27,w-8,24,3,'#dde7cc');rounded(c,-w/2+7,-24,w-14,5,2,'#a2b49a');rect(c,-w/2+8,-16,w-23,2,'#bcccb0');rect(c,-w/2+8,-11,w-18,2,'#c4d0b7');rounded(c,-3,3,6,8,2,col);rounded(c,-13,11,26,4,2,col);if(l===1){rounded(c,24,-22,12,27,2,'#baa68a');rect(c,27,-16,6,2,'#ece0c8');rect(c,28,-4,3,2,'#94a17c')}if(l===4){rounded(c,29,-28,24,31,3,col);rect(c,32,-24,18,23,'#e1e9d1');rect(c,38,3,4,9,col)}if(l===5){strokeRound(c,-w/2-3,-34,w+6,40,6,'#a8b192');rect(c,-8,-21,16,12,'#bcceaf');rect(c,-5,-18,10,6,'#e8efdd')}if(a.id==='creator')rect(c,-w/2+5,0,w-10,2,'#b49588')}
  rounded(c,-20,19,38,5,2,'#dfceb2');for(let n=0;n<9;n++)rect(c,-17+n*4,20,2,1,'#af9675');rounded(c,24,18,6,8,3,'#d5c2a2');
 }else if(k==='desk'){rounded(c,-43,-6,86,11,4,col);rect(c,-40,-4,80,2,'#fff0d975');rounded(c,-38,5,6,26,2,dark);rounded(c,32,5,6,26,2,dark);if(l>=2){rounded(c,17,6,20,20,2,col);rect(c,19,13,16,1,dark);rect(c,25,10,5,1,dark)}if(l>=3){rounded(c,-40,-9,16,3,1,'#d9c3a0');rect(c,19,20,16,1,dark)}if(l>=4){rect(c,-37,17,74,3,'#baa482');rect(c,-33,7,3,19,'#e9d9bd')}if(l===5){rounded(c,-20,-10,28,4,2,'#bbab91');rect(c,23,-4,11,2,'#a3b08a')}
 }else if(k==='chair'){if(a.id==='rattan'){rounded(c,-19,-32,38,36,15,col);for(let i=0;i<5;i++)rect(c,-15+i*7,-26,2,22,'#e9d6af');for(let i=0;i<3;i++)rect(c,-15,-21+i*7,31,1,'#97734f');rounded(c,-18,-3,36,12,5,l>=2?'#e8d9ba':'#c9ac7e')}
  else{rounded(c,-18,-30,36,34,11,col);strokeRound(c,-18,-30,36,34,11,'#816b50');rounded(c,-14,-26,28,23,8,'#fff2dd28');rounded(c,-21,3,42,12,5,col);rect(c,-16,5,32,2,'#f7e5c435');if(l>=3)for(let i=0;i<3;i++)rect(c,-12,-20+i*6,24,1,'#eee0bd55')}
  rounded(c,-3,15,6,15,2,'#9c8a72');rect(c,-18,29,36,3,'#9c8a72');ellipse(c,-17,33,3,2,'#6f5b48');ellipse(c,17,33,3,2,'#6f5b48');if(l>=2){rounded(c,-24,-3,6,13,3,dark);rounded(c,18,-3,6,13,3,dark)}if(l>=4)rounded(c,-12,-39,24,9,4,col);if(l===5){rounded(c,-12,-12,24,7,3,'#fff0d943');rect(c,-2,-30,4,2,'#eedbbb')}
 }else if(k==='clock'){if(l<=2){rounded(c,-18,-23,36,36,l===1?6:17,col);rounded(c,-14,-19,28,28,l===1?4:14,'#fff4e0');for(let i=0;i<4;i++){const an=i*Math.PI/2;rect(c,Math.cos(an)*11-1,-5+Math.sin(an)*11,2,2,'#ad9470')}c.strokeStyle='#7e674e';c.lineWidth=2;for(const [angle,len]of [[(clockNow.getHours()%12+clockNow.getMinutes()/60)*Math.PI/6,7],[clockNow.getMinutes()*Math.PI/30,11]]){c.beginPath();c.moveTo(0,-5);c.lineTo(Math.sin(angle)*len,-5-Math.cos(angle)*len);c.stroke();}ellipse(c,0,-5,2,2,'#b88f55')}else{rounded(c,-26,-17,52,25,6,col);rounded(c,-22,-13,44,17,4,'#dbe4ce');text(c,clockNow.toLocaleTimeString('ko-KR',{hour:'2-digit',minute:'2-digit',hour12:false}),0,0,11,'#5b6951','center');if(l>=4)rounded(c,-28,12,56,4,2,'#c5b18f');if(l===5)strokeRound(c,-30,-21,60,34,7,'#bba986')}
 }else if(k==='plant'||k==='deskplant'){rounded(c,-13,0,26,24,5,'#ceac83');rect(c,-11,3,22,3,'#e3c6a2');rect(c,-1,-30,3,32,'#657c55');for(let i=0;i<l+2;i++){const yy=-5-i*5;ellipse(c,i%2?-8:9,yy,9,4,i%2?'#91aa78':'#718d61')}if(l>=4)ellipse(c,12,-27,6,5,'#d9c290');if(k==='deskplant'){rect(c,-4,11,2,2,'#8e694c');rect(c,4,11,2,2,'#8e694c');rect(c,0,15,3,1,'#8e694c')}
 }else if(k==='bookshelf'){rounded(c,-28,-40,56,67,3,col);rect(c,-24,-35,48,57,'#7f614832');for(let r=0;r<(l>=3?3:2);r++){rect(c,-25,-9+r*18,50,4,col);for(let b=0;b<Math.min(7,3+l);b++){const h=14+(b%3)*2;rounded(c,-21+b*6,-10+r*18-h,5,h,1,['#9aa281','#d1b58b','#bb8c72','#a49782'][b%4])}}if(l>=4){rect(c,-32,-42,4,69,col);rect(c,28,-42,4,69,col)}if(l===5)rounded(c,-34,-46,68,5,2,'#dac4a2')
 }else if(k==='lamp'){ellipse(c,0,25,18,4,'#bfaa86');rounded(c,-2,-30,4,55,2,'#947a5b');c.fillStyle=col;c.beginPath();c.moveTo(-12,-38);c.lineTo(12,-38);c.lineTo(22,-16);c.lineTo(-22,-16);c.closePath();c.fill();ellipse(c,0,-16,22,3,'#f3deb0');if(l>=2)rect(c,-14,-31,28,1,'#f6e7ca');if(l>=3)ellipse(c,0,26,31,4,'#edc57e35');if(l>=4){rounded(c,-24,-41,48,5,2,'#d3b27b');rect(c,-17,-34,2,14,'#edd6ad')}if(l===5)rounded(c,-5,-48,10,5,2,'#bea174')
 }else if(k==='aquarium'){rounded(c,-33,-31,66,45,5,'#ad9f7f');rounded(c,-29,-27,58,35,3,'#c2d2b6');rect(c,-28,3,56,5,'#dccaa2');for(let i=0;i<Math.min(5,l+1);i++){ellipse(c,-20+i*10,-17+(i%2)*10,5,3,i%2?'#c59070':'#e1c18d');rect(c,-26+i*10,-19+(i%2)*10,3,5,i%2?'#c59070':'#e1c18d')}rect(c,21,-12,3,16,'#78956e');rounded(c,-35,14,70,8,3,'#b3936d')
 }else if(k==='sofa'){rounded(c,-57,-31,114,45,15,col);rounded(c,-50,-26,100,28,10,'#e2c9a746');rounded(c,-61,-4,14,34,7,col);rounded(c,47,-4,14,34,7,col);rounded(c,-46,7,92,22,7,col);rect(c,-41,9,82,2,'#f2dfc359');rect(c,-43,30,6,6,dark);rect(c,37,30,6,6,dark);if(l>=2){rounded(c,-38,-18,23,23,6,'#e8d8bc');strokeRound(c,-38,-18,23,23,6,'#b59a76');rounded(c,17,-18,23,23,6,'#a2ac86')}if(l>=3)rounded(c,-8,-17,23,22,6,'#d8b29a');if(l>=4)rect(c,-44,24,88,2,'#f3e5cc66');if(l===5)rounded(c,-60,-35,120,5,2,'#d9b88f')
 }else if(k==='coffee'){rounded(c,-35,5,70,30,3,'#b48b60');rounded(c,-39,0,78,7,3,'#d5b58b');rect(c,-32,9,64,2,'#d4ae80');rounded(c,-20,-35,35,35,5,col);rounded(c,-15,-29,25,12,3,'#e6d8bd');rect(c,-14,-14,24,3,'#695141');rounded(c,-12,-10,13,10,3,'#f4e6cc');strokeRound(c,1,-7,5,5,2,'#f4e6cc',2);if(l>=2){rounded(c,19,-21,15,21,3,'#d0bd9c');rect(c,22,-17,9,9,'#8b7153')}if(l>=3){ellipse(c,-7,-24,4,3,'#9f8e70');rect(c,-16,-39,28,4,'#87684b')}if(l>=4)rounded(c,-43,-44,86,5,2,'#b8966b');if(l===5){rect(c,-37,-40,3,38,'#b8966b');rect(c,34,-40,3,38,'#b8966b');text(c,'COFFEE',0,-49,8,'#8c6a4b','center')}
 }else if(k==='water'){rounded(c,-18,-28,36,59,6,'#d7cbb4');rounded(c,-13,-54,26,27,7,'#c9d5bf');rect(c,-11,-50,22,3,'#e3e8d6');rounded(c,-12,-20,24,11,3,'#a49e82');rect(c,-8,-5,4,5,'#9ba981');rect(c,5,-5,4,5,'#bc957b');rounded(c,-10,5,20,17,3,'#b7ad91');if(l>=3)rect(c,-9,-18,18,4,'#d5dfc5');if(l>=4)rect(c,-12,26,24,2,'#ab9674');if(l===5)strokeRound(c,-21,-31,42,65,7,'#baa88c')
 }else if(k==='rug'){rounded(c,-53,-4,106,38,l===5?18:7,col);strokeRound(c,-49,0,98,30,5,'#eee0bd');for(let i=0;i<l+1;i++)rect(c,-43+i*17,3,2,24,'#f3e3c359');for(let i=0;i<6;i++){rect(c,-55,1+i*5,3,2,'#b89a71');rect(c,52,1+i*5,4,2,'#b89a71')}
 }else if(k==='wallpaper'){rounded(c,-49,-37,98,67,4,col);for(let i=0;i<6;i++)rect(c,-44+i*17,-33,l>=3?3:1,59,'#fff3db8c');if(l===2)for(let i=0;i<5;i++)ellipse(c,-37+i*18,-19+(i%2)*20,4,3,'#c5b38c');if(l===4)rect(c,-45,-1,90,2,'#baa27b');if(l===5)for(let i=0;i<4;i++)rounded(c,-41+i*23,-29,18,52,5,'#e4d3b4')
 }else if(k==='keyboard'){rounded(c,-37,-6,74,24,5,col);for(let r=0;r<3;r++)for(let i=0;i<12;i++)rounded(c,-32+i*5.3,-2+r*5.5,4,4,1,i>9?'#c8a585':'#f4e7cd');rounded(c,-13,15,27,3,1,'#a58a67');if(l>=3)rounded(c,-38,22,76,9,3,'#b88f60');if(l>=4)rect(c,-35,19,70,1,'#8d9f7a');if(l===5)rounded(c,41,-5,12,27,4,'#d5bd99')
 }else if(k==='mug'){rounded(c,-15,-13,31,35,7,col);strokeRound(c,12,-8,17,20,7,col,5);ellipse(c,0,-12,15,4,'#f8e9cc');ellipse(c,0,-12,11,2,'#94704c');if(l>=2)rect(c,-9,-7,2,17,'#f3e2c4');if(l>=3){ellipse(c,-5,6,2,2,'#7b5e45');ellipse(c,6,6,2,2,'#7b5e45');ellipse(c,0,11,3,2,'#b88b68')}if(l>=4)ellipse(c,0,24,28,4,'#dfcba5');if(l===5)rounded(c,-28,26,57,4,2,'#a38e69')
 }else if(k==='board'||k==='poster'){rounded(c,-35,-38,70,59,4,'#a9845b');rect(c,-31,-34,62,51,k==='board'?'#d0ae7b':'#ede0c7');if(k==='board'){for(let i=0;i<l+2;i++){rect(c,-25+(i%4)*15,-27+Math.floor(i/4)*21,12,17,['#ede0bc','#ccd1ad','#e0b59a'][i%3]);ellipse(c,-19+(i%4)*15,-25+Math.floor(i/4)*21,1.5,1.5,'#946b4b')}}else{ellipse(c,10,-17,10,10,'#cfad72');rect(c,-25,-2,50,15,'#b4bf92');for(let i=0;i<l;i++)rect(c,-23+i*10,-15-i%2*5,6,17,'#8fa078');text(c,'SLOW DAYS',0,12,6,'#6b684e','center')}
 }else if(k==='beanbag'){rounded(c,-37,-24,74,57,27,col);ellipse(c,-4,9,25,13,'#e5d0af52');strokeRound(c,-28,-13,55,40,20,'#9e805f');if(l>=2)rect(c,-20,0,40,1,'#f0e0c352');if(l>=3)for(let i=0;i<6;i++)rect(c,-21+i*8,1,1,14,'#e6d3b84f');if(l>=4)rounded(c,9,-16,21,19,6,'#e3ccb0');if(l===5)rounded(c,-43,28,86,6,3,'#d7bd99')
 }else if(k==='parasol'){rect(c,-2,-45,4,79,'#927451');ellipse(c,0,35,24,4,'#bca07a');c.fillStyle=col;c.beginPath();c.moveTo(0,-70);c.lineTo(60,-30);c.lineTo(-60,-30);c.closePath();c.fill();for(let i=0;i<6;i++){c.fillStyle=i%2?'#f0dfc3':col;c.beginPath();c.moveTo(0,-70);c.lineTo(-60+i*20,-30);c.lineTo(-40+i*20,-30);c.closePath();c.fill()}rounded(c,-60,-32,120,7,3,'#b69a74');if(l>=2)ellipse(c,0,-69,4,3,'#99794f');if(l>=3)rect(c,-2,-45,1,73,'#e8cda4');if(l>=4){rect(c,-57,-26,2,8,'#e3c798');rect(c,55,-26,2,8,'#e3c798')}if(l===5)rounded(c,-62,-77,124,4,2,'#ccb08a')
 }else if(k==='teatable'){rounded(c,-32,-2,64,18,9,col);rect(c,-25,14,5,20,'#87694d');rect(c,20,14,5,20,'#87694d');ellipse(c,-6,-4,13,4,'#f1dfbd');rounded(c,-10,-15,9,13,2,'#ead7b5');strokeRound(c,-2,-12,5,5,2,'#ead7b5',2);if(l>=2)rounded(c,12,-10,12,7,3,'#a9845d');if(l>=3)rect(c,-27,22,54,3,'#af8c63');if(l>=4)rounded(c,-35,1,70,3,1,'#e9d3b1');if(l===5)rounded(c,10,-22,15,13,4,'#a8b58a')
 }else if(k==='flowerbox'){rounded(c,-43,5,86,27,4,'#b99369');for(let i=0;i<6;i++)rect(c,-39+i*14,8,1,20,'#8f6f50');for(let i=0;i<l+3;i++){const xx=-34+i*68/(l+2);rect(c,xx,-14,2,21,'#7c9161');ellipse(c,xx+1,-14,5,5,i%2?'#e2c18f':'#d6a991');ellipse(c,xx+1,-14,2,2,'#ae8e4f');ellipse(c,xx-3,-2,4,2,'#99a97a')}
 }else if(k==='hammock'){rect(c,-43,-45,5,77,'#94734e');rect(c,38,-45,5,77,'#94734e');c.strokeStyle='#bca681';c.lineWidth=2;c.beginPath();c.moveTo(-40,-40);c.quadraticCurveTo(0,19,40,-40);c.stroke();c.fillStyle=col;c.beginPath();c.moveTo(-34,-28);c.quadraticCurveTo(0,22,34,-28);c.lineTo(27,4);c.quadraticCurveTo(0,27,-27,4);c.closePath();c.fill();if(l>=2)for(let i=0;i<5;i++)rect(c,-23+i*11,1,2,10,'#e9ddc34d');if(l>=3)rounded(c,-15,-7,24,14,6,'#e6d3b0');if(l>=4)rect(c,-46,31,92,4,'#b0936e');if(l===5)rounded(c,-46,-48,92,4,2,'#c6b58e')
 }else if(k==='speaker'){rounded(c,-31,-31,62,55,7,col);rounded(c,-26,-26,33,45,4,'#b8a680');for(let r=0;r<8;r++)for(let i=0;i<6;i++)rect(c,-23+i*4.6,-22+r*5,1,1,'#897351');ellipse(c,18,-15,5,5,'#e1cda8');rect(c,13,0,10,2,'#6d5941');if(l>=2)rect(c,-24,-30,21,2,'#e2cda8');if(l>=3)rect(c,-30,26,60,4,'#9b815f');if(l>=4)rounded(c,35,-20,18,38,4,col);if(l===5)ellipse(c,18,12,4,4,'#94a47a')}
 c.restore();
}
export function drawShop(canvas,id,level=1,skin=level){canvas.width=160;canvas.height=110;const c=canvas.getContext('2d');c.imageSmoothingEnabled=false;c.clearRect(0,0,160,110);furnitureArt(c,{id,level,skin},80,65,.9)}
export function drawAvatar(canvas,e){canvas.width=64;canvas.height=76;const c=canvas.getContext('2d');c.imageSmoothingEnabled=false;c.clearRect(0,0,64,76);c.save();c.translate(32,23);c.scale(1.1,1.1);avatar(c,e,0,0,2,{suit:!!e.candidate});c.restore()}
function active(s,f,kind,slot=0){return s.inventory.find(i=>i.equipped&&i.floor===f&&(i.slot||0)===slot&&SHOP.find(a=>a.id===i.id)?.kind===kind)}
function pathPoint(points,k){const lengths=points.slice(1).map((p,i)=>Math.hypot(p.x-points[i].x,p.y-points[i].y)),total=lengths.reduce((a,b)=>a+b,0);let dist=Math.max(0,Math.min(1,k))*total;for(let i=0;i<lengths.length;i++){if(dist<=lengths[i]||i===lengths.length-1){const u=lengths[i]?dist/lengths[i]:0;return {x:points[i].x+(points[i+1].x-points[i].x)*u,y:points[i].y+(points[i+1].y-points[i].y)*u,direction:points[i+1].x<points[i].x?-1:1}}dist-=lengths[i]}return points.at(-1)}
function deskPosition(e){return {x:85+(e.seat||0)*120,y:FY[e.floor]+56}}
function liftY(f){return FY[f]+88}
export function movementScene(s,time=0){
 time=Math.max(0,Number.isFinite(time)?time:0);
 const cycle=Math.floor(time/90),t=time%90,groups=[2,3,4].map(f=>s.staff.filter(e=>e.floor===f)),viable=groups.filter(g=>g.length>=2),pool=viable.length?viable[cycle%viable.length]:s.staff,offset=pool.length?cycle%pool.length:0,pair=pool.length>=2?[pool[offset],pool[(offset+1)%pool.length]]:pool.slice(0,1);
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
function windowArt(c,x,y,w=70,h=46){const hour=clockNow.getHours()+clockNow.getMinutes()/60,night=hour<6||hour>=19;rounded(c,x-3,y-3,w+6,h+6,3,'#b69a75');rect(c,x,y,w,h,'#e8ecdb');rect(c,x+3,y+3,w-6,h-6,night?'#414855':hour>=16?'#edc5a1':'#e4ecd9');ellipse(c,x+10+((hour+18)%24)/24*(w-20),y+12,night?4:6,6,night?'#f4e6c2':'#e4bd75');if(night){rect(c,x+12,y+8,2,2,'#fff4d7');rect(c,x+40,y+17,2,2,'#fff4d7');}rect(c,x+5,y+h-11,w-10,11,'#c7d1b0');rect(c,x+w/2,y,3,h,'#c4aa83');rect(c,x,y+h/2,w,3,'#c4aa83');rect(c,x-4,y+h+1,w+8,5,'#d2b48a');rect(c,x-7,y-5,5,h+7,'#cdb48e');rect(c,x+w+2,y-5,5,h+7,'#cdb48e')}
function deskBack(c,s,f,x,y,seat){furnitureArt(c,active(s,f,'chair',seat)||{id:'chair',skin:1},x,y+4,.63);furnitureArt(c,active(s,f,'desk',seat)||{id:'wooddesk',skin:1},x,y,.94)}
function deskFront(c,s,f,x,y,seat){const desk=active(s,f,'desk',seat)||{id:'wooddesk'};rounded(c,x-40,y,80,10,3,warmColor(SHOP.find(a=>a.id===desk.id)));rect(c,x-39,y+1,78,2,'#f5e2bd');furnitureArt(c,active(s,f,'computer',seat)||{id:'computer',skin:2},x-24,y-6,.63);for(const [kind,dx,dy,scale]of [['keyboard',-2,10,.31],['deskplant',-34,-1,.28],['mug',32,1,.25]]){const i=active(s,f,kind,seat);if(i)furnitureArt(c,i,x+dx,y+dy,scale)}}
function bubble(c,t,x,y){const w=Math.min(248,Math.max(144,t.length*8+20)),left=Math.max(29,Math.min(405-w,x-w/2));rounded(c,left,y-29,w,27,7,'#fff7e8');strokeRound(c,left,y-29,w,27,7,'#b89870');rect(c,x-2,y-2,5,5,'#fff7e8');text(c,t,left+w/2,y-12,8,P.ink,'center')}
export function sceneHit(x,y){return [...targets].reverse().find(a=>x>=a.x&&x<=a.x+a.w&&y>=a.y&&y<=a.y+a.h)||null}
export function renderBuilding(canvas,s,time=0){
 if(canvas.width!==CANVAS_W||canvas.height!==CANVAS_H){canvas.width=CANVAS_W;canvas.height=CANVAS_H}const c=canvas.getContext('2d');clockNow=new Date();c.imageSmoothingEnabled=false;targets=[];rect(c,0,0,480,1000,'#e9dfce');
 for(let i=0;i<5;i++){const x=(i*137+time*.9)%600-40;rounded(c,x,12+i%2*20,72,7,4,'#f7efe0');rounded(c,x+16,6+i%2*20,32,10,5,'#f7efe0')}
 const night=clockNow.getHours()<6||clockNow.getHours()>=19;if(night)rect(c,0,0,480,207,'#555660');
 text(c,(s.profile?.name||'새봄')+' COMPANY',240,27,11,'#7d644c','center');
 rect(c,21,208,441,751,'#aa8862');rect(c,28,208,385,747,'#eadcc3');
 // Rooftop cafe is physically separated from the interview floor.
 rect(c,27,169,388,33,'#c5a57d');for(let i=0;i<20;i++)rect(c,29+i*20,172,1,28,'#e3cba4');rect(c,23,197,395,10,'#927151');rect(c,23,192,395,5,'#e1c69f');
 rounded(c,30,50,384,118,4,'#f3e7d0');rect(c,31,144,382,44,'#d4bc95');text(c,'ROOFTOP  ·  느린 오후의 휴게실',49,68,10,'#765b40');
 const rug=active(s,6,'rug');if(rug)furnitureArt(c,rug,206,157,1.2);const para=active(s,6,'parasol');if(para)furnitureArt(c,para,321,102,.65);
 furnitureArt(c,active(s,6,'sofa')||{id:'pantry',skin:1},203,150,.93);furnitureArt(c,active(s,6,'coffee')||{id:'coffee',skin:1},65,129,.65);furnitureArt(c,active(s,6,'water')||{id:'water',skin:1},379,126,.58);
 const roofSpots={plant:[345,150,.65],lamp:[122,137,.6],beanbag:[300,160,.6],teatable:[202,172,.58],flowerbox:[62,177,.6],hammock:[317,143,.7],speaker:[104,102,.4]};for(const [kind,[x,y,sc]]of Object.entries(roofSpots)){const i=active(s,6,kind);if(i)furnitureArt(c,i,x,y,sc)}
for(const [idx,p]of projectBook(s).entries())if(p.completed){rounded(c,45+idx*42,73,28,28,3,'#ead7ad');text(c,['歩','食','月'][idx],59+idx*42,92,12,'#947047','center');}
 targets.push({action:'lounge',x:30,y:50,w:384,h:142});
 for(const f of [5,4,3,2]){const y=FY[f],wall=active(s,f,'wallpaper'),wallCol=wall?warmColor(SHOP.find(a=>a.id===wall.id)):'#f1e6d1';rect(c,28,y,385,96,wallCol);rect(c,28,y+96,385,34,'#d6b68b');for(let i=0;i<13;i++)rect(c,30+i*30,y+99,1,30,'#bd976d5f');rect(c,25,y+130,392,10,'#a17e57');rect(c,25,y+130,392,3,'#f5e6cc');
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
 rect(c,417,52,45,898,'#c2a681');rect(c,420,55,39,892,'#a08a6d');for(const f of [1,2,3,4,5,6]){const yy=liftY(f)-19;rounded(c,421,yy,37,60,3,'#d8c4a4');rect(c,439,yy+2,1,57,'#b49a75');rounded(c,409,yy+17,5,10,2,'#c6a47a');rect(c,410,yy+19,2,2,'#8c744e');text(c,f===6?'R':String(f),439,yy-5,8,'#6c543d','center')}
 const scene=movementScene(s,time),cy=scene.carY;rounded(c,420,cy-19,39,61,3,'#896f53');rounded(c,423,cy-16,33,55,2,'#e4d3b7');rect(c,423,cy+25,33,13,'#bfa17a');
 const positions=new Map(scene.poses.map(p=>[p.id,p]));
 for(const p of scene.poses.filter(p=>p.zone==='work')){const e=s.staff.find(e=>e.id===p.id);avatar(c,e,p.x,p.y,time,{...p,working:workSignals(s)[e.floor===2?'exercise':e.floor===3?'diet':'rest']>0})}
 for(const f of [4,3,2])for(let seat=0;seat<3;seat++){const e=s.staff.find(e=>e.floor===f&&e.seat===seat);deskFront(c,s,f,85+seat*120,FY[f]+79,seat);if(e)nameTag(c,e.name,85+seat*120,FY[f]+114)}
 for(const p of scene.poses.filter(p=>p.zone!=='work').sort((a,b)=>a.y-b.y)){const e=s.staff.find(e=>e.id===p.id);avatar(c,e,p.x,p.y,time,{...p,working:workSignals(s)[e.floor===2?'exercise':e.floor===3?'diet':'rest']>0})}
 // Door leaves cover riders during closed travel, so no one crosses floors in open air.
 const doorW=17*(1-scene.door);rect(c,422,cy-17,doorW,57,'#c5ad8b');rect(c,457-doorW,cy-17,doorW,57,'#c5ad8b');rect(c,439,cy-16,1,55,'#b69d7c');
 for(const p of scene.poses){if(p.zone==='elevator')continue;targets.push({action:'staff',id:p.id,x:p.x-20,y:p.y-17,w:40,h:57})}
 const resting=scene.poses.filter(p=>p.zone==='roof');if(resting.length>=2){const turn=Math.floor((scene.t-scene.restStart)/4)%resting.length,p=resting[turn],e=s.staff.find(e=>e.id===p.id);const partner=s.staff.find(e=>e.id===resting[(turn+1)%resting.length].id),lines=dialogue(s,s.staff.find(e=>e.id===resting[0].id),s.staff.find(e=>e.id===resting[1].id)),line=lines[Math.floor((scene.t-scene.restStart)/4)%lines.length];bubble(c,line.name+': '+line.text,p.x,p.y-17)}
 rect(c,17,953,449,8,'#92704d');rect(c,12,961,459,8,'#c2a47b');rect(c,0,970,480,30,'#e0d0b8');for(let i=0;i<8;i++)rect(c,18+i*62,983,38,3,'#cbb28d');
}
