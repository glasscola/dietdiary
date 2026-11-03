import {SHOP,hash} from './engine.mjs';
const C={ink:'#695344',edge:'#92755c',cream:'#f7eddb',walnut:'#a77c56',wood:'#c7a47d',sage:'#91a28a',dark:'#54635b',rose:'#c39a86',linen:'#dfcdb3',gold:'#bb9863'};
const rr=(c,x,y,w,h,r,fill,stroke)=>{c.beginPath();c.roundRect(x,y,w,h,r);if(fill){c.fillStyle=fill;c.fill()}if(stroke){c.strokeStyle=stroke;c.lineWidth=.8;c.stroke()}};
const el=(c,x,y,rx,ry,col)=>{c.beginPath();c.ellipse(x,y,rx,ry,0,0,Math.PI*2);c.fillStyle=col;c.fill()};
const ln=(c,x,y,x2,y2,col=C.edge,w=.8)=>{c.beginPath();c.moveTo(x,y);c.lineTo(x2,y2);c.strokeStyle=col;c.lineWidth=w;c.stroke()};
const poly=(c,pts,col)=>{c.beginPath();pts.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y));c.closePath();c.fillStyle=col;c.fill()};
function grad(c,x,y,h,a,b){const g=c.createLinearGradient(x,y,x,y+h);g.addColorStop(0,a);g.addColorStop(1,b);return g}
function wood(c,x,y,w,h,col=C.wood){rr(c,x,y,w,h,3,grad(c,x,y,h,'#dfc7a5',col),C.edge);for(let i=0;i<3;i++)ln(c,x+5,y+3+i*(h-5)/3,x+w-7-i*3,y+3+i*(h-5)/3,'#8c684526',.6)}
function textile(c,x,y,w,h,r,col){rr(c,x,y,w,h,r,grad(c,x,y,h,'#f0e2cb',col),C.edge);rr(c,x+3,y+3,w-6,h-6,Math.max(2,r-2),null,'#fff6e26b');}
function label(c,s,x,y,size=6,col=C.ink){c.fillStyle=col;c.font=`${size}px "Malgun Gothic",sans-serif`;c.textAlign='center';c.fillText(s,x,y);c.textAlign='left'}
function leaf(c,x,y,scale=1){c.save();c.translate(x,y);c.scale(scale,scale);el(c,-4,-4,5,2.5,'#889c78');el(c,3,-8,5,2.7,'#a0ae8a');ln(c,0,2,0,-10,'#718766');c.restore()}
function cup(c,x,y,s=1){c.save();c.translate(x,y);c.scale(s,s);el(c,0,10,13,3,'#bca58340');rr(c,-8,-6,16,17,4,'#f5e9d2',C.edge);c.beginPath();c.arc(9,1,5,-Math.PI/2,Math.PI/2);c.strokeStyle='#cbb18d';c.lineWidth=2.5;c.stroke();el(c,0,-5,7,2,'#a67f58');ln(c,-5,-1,-5,7,'#fff9e9');c.restore()}
function book(c,x,y,w,h,col){rr(c,x,y,w,h,1.3,col,'#876e5533');ln(c,x+2,y+2,x+2,y+h-2,'#f6ecd877');ln(c,x+3,y+4,x+w-2,y+4,'#fff0d575')}
function screen(c,x,y,w,h,dark=false){rr(c,x,y,w,h,2,dark?'#34443f':grad(c,x,y,h,'#edf1dd','#cbd8c1'));rr(c,x+3,y+3,w-6,3,1,'#94a88d');rr(c,x+3,y+9,w*.3,h-13,1,'#b2c2a3');for(let r=0;r<3;r++)ln(c,x+w*.42,y+10+r*4,x+w-4-r*2,y+10+r*4,dark?'#91a88b':'#9fae95',.8);poly(c,[[x+w-13,y],[x+w,y],[x+w,y+h-7]],'#ffffff20')}
export function drawPerson(c,e,x,y,t=0,p={}){
 const skins=['#f2d4b8','#e2b993','#cc9b76','#b8805f','#966449','#78513f'],hairs=['#514139','#8b654d','#403c37','#b4936b','#705449','#7c7163','#c0a27c'],clothes=['#b19c82','#8b9e86','#bd9380','#c5ad87','#8c8175','#a49aab','#819b96','#b99370'];
 const h=hash(e.id||'boss'),skin=skins[(e.skin??h)%6],hair=hairs[(e.hair??h)%7],col=clothes[(e.outfit??h)%8],style=(e.outfit??h)%6,hs=(e.hair??h)%7,acc=(e.accessory??h)%5,walk=p.walking?Math.sin(t*9+h%5):0,bob=p.walking?Math.abs(walk)*.65:Math.sin(t*1.4+h%9)*.23;
 c.save();c.translate(x,y+bob);if(p.walking&&p.direction===-1)c.scale(-1,1);el(c,0,p.seated?52:38,12,2,'#684f3420');
 if([2,4].includes(hs))rr(c,-14,-8,28,34,9,hair);
 const leg=p.seated?23:12,base=p.seated?29:25;
 rr(c,-8,base+(p.seated?0:walk*2),6,leg,2,'#777769');rr(c,3,base-(p.seated?0:walk*2),6,leg,2,'#777769');
 for(const [xx,step]of [[-9,walk*2],[2,-walk*2]]){const yy=(p.seated?50:34+step);rr(c,xx,yy,10,4.5,2,'#655449');ln(c,xx+1,yy+3.5,xx+8,yy+3.5,'#c6b59e');}
 const suit=p.suit,body=suit?'#79766b':col;rr(c,-11,12,23,18,5,grad(c,-11,12,18,body,suit?'#5e635c':col), '#745a4438');
 const hands=p.seated&&p.working?Math.sin(t*7+h%3)*1:0;
 for(const [side,xx]of [[-1,-15],[1,11]]){rr(c,xx,15+(p.walking?side*walk:0),6,13,3,body);ln(c,xx+1,24,xx+5,24,'#f5e7cd88',1);rr(c,xx+1,25+side*hands,5,5,2,skin);}
 if(suit){poly(c,[[-5,12],[0,16],[5,12],[4,29],[-4,29]],'#f5ebda');poly(c,[[-1,16],[1,16],[3,25],[0,28],[-2,24]],'#a88567');poly(c,[[-10,13],[-5,12],[-2,22],[-8,18]],'#989589');poly(c,[[10,13],[5,12],[2,22],[8,18]],'#989589');rr(c,5,21,5,1.5,0,'#e6d8bf');}
 else if(style===0){poly(c,[[-4,12],[0,18],[4,12]],'#ede1cc');ln(c,0,18,0,29,'#74644f66');for(let j=0;j<3;j++)el(c,2,19+j*4,.75,.75,'#665b48');rr(c,-8,22,5,4,1,'#d0baa047');}
 else if(style===1){rr(c,-5,10,11,6,3,'#c8cfb6');for(let j=0;j<5;j++)ln(c,-8+j*4,18,-8+j*4,27,'#e9e4cc55',.65);ln(c,-10,27,10,27,'#6f7f6655');}
 else if(style===2){poly(c,[[-7,13],[-3,11],[0,16],[3,11],[7,13],[5,18],[-5,18]],'#f0e5d0');ln(c,0,17,0,29,'#7a665055');rr(c,4,21,5,5,1,'#e8c6ac88');}
 else if(style===3){rr(c,-7,12,4,16,1,'#eadcc3');rr(c,4,12,4,16,1,'#eadcc3');rr(c,-5,19,12,10,2,'#c5b18c');rr(c,-2,21,6,4,1,'#e5d5b5');}
 else if(style===4){rr(c,-7,10,15,6,3,'#b8ad98');for(let r=0;r<3;r++){ln(c,-9,18+r*4,9,18+r*4,'#e8dfca88');}rr(c,-9,26,19,3,1,'#9c917e');}
 else{rr(c,-9,12,19,5,2,'#e9deca');poly(c,[[-8,17],[-3,16],[-3,27],[-10,27]],'#8b817355');poly(c,[[9,17],[4,16],[4,27],[11,27]],'#8b817355');}
 rr(c,-4,8,9,6,2,skin);rr(c,-13,-9,27,25,10,grad(c,-13,-9,25,'#ffffff11',skin));rr(c,-13,-9,27,25,10,skin,'#8e634438');el(c,-13,4,2.4,4,skin);el(c,14,4,2.4,4,skin);
 if(hs===0){rr(c,-14,-12,29,12,7,hair);poly(c,[[-12,-4],[-4,-8],[1,-1],[8,-6],[13,-3],[13,-10],[-12,-10]],hair);rr(c,-13,-5,4,10,2,hair);}
 if(hs===1){rr(c,-14,-13,29,13,8,hair);poly(c,[[-12,-3],[7,-12],[13,-4],[5,-2],[-2,1]],hair);rr(c,10,-4,4,11,2,hair);}
 if(hs===2){rr(c,-14,-12,29,11,8,hair);rr(c,-14,-5,5,21,2,hair);rr(c,10,-5,5,21,2,hair);for(let i=0;i<4;i++)rr(c,-10+i*6,-7,5,7+(i%2)*2,1,hair);}
 if(hs===3){for(let i=0;i<5;i++)el(c,-10+i*5,-9-(i%2)*3,6,6,hair);rr(c,-14,-4,4,9,2,hair);}
 if(hs===4){el(c,14,-9,7,8,hair);rr(c,14,-5,5,18,3,hair);rr(c,-14,-12,29,12,8,hair);poly(c,[[-12,-2],[2,-9],[11,-2],[11,-9],[-12,-9]],hair);el(c,15,-5,2,2,'#cfa48c');}
 if(hs===5){rr(c,-14,-12,29,12,8,hair);el(c,0,-16,8,5,hair);rr(c,-13,-7,4,12,2,hair);rr(c,10,-7,4,10,2,hair);}
 if(hs===6){rr(c,-14,-12,29,12,8,hair);rr(c,-15,-13,31,8,4,'#bfaa89');ln(c,-12,-7,13,-7,'#927f63',1.5);rr(c,10,-5,4,8,1,hair);}
 ln(c,-8,-9,4,-11,'#e0c0a529',1.2);
 const blink=Math.floor(t*1.1+h%17)%13===0;
 for(const xx of [-6,6]){rr(c,xx-1.2,3,2.5,blink?.8:3.5,1,'#4c4239');if(!blink)el(c,xx-.4,3.6,.5,.5,'#fff8e6');ln(c,xx-2,0,xx+1,0,hair,.7);}
 el(c,-8,8,2.8,1.3,'#d08a7860');el(c,9,8,2.8,1.3,'#d08a7860');ln(c,0,7,1,8,'#ba8c72',.6);c.beginPath();c.arc(1,9,2,.2,Math.PI-.2);c.strokeStyle='#a87a60';c.lineWidth=.7;c.stroke();
 if(acc===1){rr(c,-11,1,10,8,3,null,'#75604c');rr(c,2,1,10,8,3,null,'#75604c');ln(c,-1,4,2,4,'#75604c');}
 if(acc===2){rr(c,-12,-4,6,2,1,'#cca77b');rr(c,-10,-6,2,6,1,'#dfc5a4');}
 if(acc===3){el(c,14,9,1.5,2.3,'#caa56b');el(c,-13,9,1.3,2,'#caa56b');}
 if(acc===4){poly(c,[[-11,-5],[-7,-8],[-3,-5],[-7,-3]],'#c99886');el(c,-7,-5,1.4,1.4,'#ebcfb0');}
 c.restore();
}
export function drawFurnishing(c,item,x,y,scale=1,now=new Date()){
 const a=SHOP.find(a=>a.id===item.id);if(!a)return;const l=Math.max(1,Math.min(5,item.skin||item.level||1)),k=a.kind,col=({chair:'#9ba78f',pinkchair:'#c6a38e',rattan:'#b59973',pantry:'#c6ad91',computer:'#cfc5b1',laptop:'#c1c0ac',creator:'#adaba0',clock:'#b39570',moonclock:'#8c9181',desk:'#d9c6a7',wooddesk:'#bc9870'})[a.id]||C.linen;
 c.save();c.translate(x,y);c.scale(scale,scale);el(c,0,29,k==='sofa'?57:30,4,'#69513a16');
 if(k==='computer'){
  if(a.id==='laptop'){
   const w=l>=4?61:51;poly(c,[[-w/2,-30],[w/2,-30],[w/2+3,3],[-w/2+3,3]],'#8c8f80');rr(c,-w/2+1,-29,w-2,31,3,col,C.edge);screen(c,-w/2+4,-26,w-8,24);el(c,0,-27.5,.6,.6,'#666a5b');poly(c,[[-w/2+3,3],[w/2+3,3],[w/2+11,18],[-w/2-7,18]],'#d9d3c1');ln(c,-w/2-7,18,w/2+11,18,'#928b78',1.4);for(let r=0;r<3;r++)for(let b=0;b<10;b++)rr(c,-w/2+7+b*(w-12)/10+r*.4,5+r*2.8,3.3,1.8,.5,'#969e8d');rr(c,-7,13,17,4,1,null,'#b3ac98');if(l>=3)rr(c,w/2+13,-24,6,41,2,'#c1aa87');if(l>=4){wood(c,-37,20,85,4);rr(c,33,-39,17,12,2,'#ddd2bd',C.edge);label(c,'NOTE',41,-31,4)}if(l===5)leaf(c,-43,11,.8);
  }else{
   const w=a.id==='creator'?58:l===1?43:l>=4?60:50;rr(c,-w/2-2,-34,w+4,l===1?39:34,4,grad(c,0,-34,34,'#e9e0cc',col),C.edge);screen(c,-w/2+2,-30,w-4,l===1?28:26);rr(c,-3,0,6,12,1,'#b1ad99');el(c,0,13,16,3,'#b9b39f');el(c,w/2-3,-2,.8,.8,C.sage);if(l===1){rr(c,28,-23,12,29,2,'#c5baa2',C.edge);rr(c,30,-19,8,2,.5,'#8f957e');ln(c,30,-5,38,-5,'#a39d86')}if(l>=4){rr(c,35,-29,22,32,3,col,C.edge);screen(c,38,-26,16,23);ln(c,45,3,43,12,'#9b9c88',2)}if(l===5){rr(c,-35,-40,70,4,2,'#9d9e8d');ln(c,-32,-36,-32,-33,'#8b8c7c');rr(c,32,13,19,5,2,'#bca281')}
   if(a.id==='creator'){rr(c,-w/2-2,-1,w+4,4,1,'#a4b39b');wood(c,-18,12,36,4,'#b29370');rr(c,w/2+4,-17,8,22,2,'#b9b59e');el(c,w/2+8,-9,2.3,2.3,'#7a8371');el(c,w/2+8,-1,1.6,1.6,'#7a8371');}rr(c,-23,19,43,7,2,'#e4d7bd',C.edge);for(let r=0;r<2;r++)for(let i=0;i<10;i++)rr(c,-20+i*3.8,20+r*2.6,2.8,1.6,.4,'#9f9d86');rr(c,27,18,7,11,3,'#d4c5a8',C.edge);ln(c,30.5,19,30.5,23,'#a7957b');
  }
 }else if(k==='desk'){
  wood(c,-43,-6,86,12,col);rr(c,-38,6,6,26,1,'#967958');rr(c,32,6,6,26,1,'#967958');ln(c,-34,24,34,24,'#b5a07c',2);if(l>=2){wood(c,16,7,21,23);ln(c,18,18,35,18);rr(c,23,12,7,1.5,.5,'#806a50')}if(l>=3){rr(c,-42,-9,84,3,1,'#f0dfbf');rr(c,-34,-12,21,5,1,'#a2ab8f');}if(l>=4){rr(c,-36,8,3,20,1,'#e7ddca');rr(c,31,8,3,20,1,'#e7ddca')}if(l===5){rr(c,-42,-15,85,6,2,'#bea582');ln(c,-37,-12,36,-12,'#e9d5b3');}
 }else if(k==='chair'){
  if(a.id==='rattan'){rr(c,-18,-31,36,38,15,'#b89d76',C.edge);for(let j=0;j<8;j++)ln(c,-13+j*3.8,-25,-13+j*3.8,2,'#e9d5ae',1);for(let j=0;j<6;j++)ln(c,-14,-24+j*4.5,14,-24+j*4.5,'#8d735652');textile(c,-17,-2,34,13,5,l>=2?'#dfd6bc':'#bcaa83')}
  else{rr(c,-18,-31,36,39,11,col,C.edge);rr(c,-14,-27,28,29,8,grad(c,0,-27,29,'#c9d2ba',col));if(a.id==='pinkchair')rr(c,-14,-27,28,29,8,'#d8bdac');ln(c,-12,-13,12,-13,'#f4e9d277');textile(c,-20,4,40,12,5,col);if(l>=3)for(let j=0;j<5;j++)ln(c,-10,-22+j*4,10,-22+j*4,'#6b7d6733');}
  rr(c,-3,16,6,13,1,'#a99a7f');ln(c,-19,30,19,30,'#8d816c',2);for(const dx of [-18,18]){el(c,dx,33,3,2.2,'#6c6655');}if(l>=2){rr(c,-24,-4,5,14,2,'#967e63');rr(c,19,-4,5,14,2,'#967e63')}if(l>=4)textile(c,-12,-40,24,9,4,col);if(l===5){rr(c,-9,-7,18,4,2,'#d4ddc3');ln(c,-2,-30,2,-30,C.gold,2)}
 }else if(k==='clock'){
  if(l<=2){el(c,0,-5,21,21,'#866e55');el(c,0,-6,19,19,col);el(c,0,-6,16,16,'#f7efdc');for(let i=0;i<12;i++){const an=i*Math.PI/6;ln(c,Math.sin(an)*13,-6-Math.cos(an)*13,Math.sin(an)*14.6,-6-Math.cos(an)*14.6,'#99866b',i%3? .7:1.4)}for(const [ang,len,w]of [[(now.getHours()%12+now.getMinutes()/60)*Math.PI/6,8,1.7],[now.getMinutes()*Math.PI/30,12,1.2]])ln(c,0,-6,Math.sin(ang)*len,-6-Math.cos(ang)*len,'#786752',w);el(c,0,-6,1.5,1.5,C.gold);if(l===1){wood(c,-8,15,16,14);ln(c,0,17,0,25,'#9b8668');el(c,0,25,4,3,'#ceb581')}}
  else{wood(c,-29,-19,58,31,col);rr(c,-24,-15,48,21,3,'#e0e5d1');label(c,now.toLocaleTimeString('en-GB',{hour:'2-digit',minute:'2-digit'}),0,0,13,'#617258');if(a.id==='moonclock'){el(c,20,-6,3.5,3.5,'#acb397');el(c,22,-8,3.5,3.5,'#e0e5d1');}if(l>=4){label(c,'SLOW DAYS',0,16,5);rr(c,-25,21,50,4,2,'#b99f78')}if(l===5)rr(c,-33,-24,66,40,7,null,'#c7ad82')}
 }else if(k==='sofa'){
  wood(c,-58,13,116,16,'#ac855d');rr(c,-49,26,7,10,2,'#816b51');rr(c,42,26,7,10,2,'#816b51');textile(c,-56,-32,112,48,14,col);for(let i=0;i<(l>=3?3:2);i++){const n=l>=3?3:2,w=96/n;textile(c,-48+i*w,-26,w-2,31,8,col);el(c,-48+i*w+w/2,-12,1,1,'#a58d7038')}for(let i=0;i<2;i++)textile(c,-47+i*48,7,46,21,6,'#cdbba1');textile(c,-61,-7,14,33,6,'#bca68a');textile(c,47,-7,14,33,6,'#bca68a');if(l>=2){c.save();c.translate(-31,-2);c.rotate(-.12);textile(c,-11,-16,22,23,4,'#e1d8bf');ln(c,-7,-12,7,3,'#b6a78a55');c.restore();textile(c,19,-18,21,23,5,'#9da88a')}if(l>=3){rr(c,-3,-14,19,30,3,'#d6ad91');for(let j=0;j<4;j++)ln(c,0,-9+j*6,13,-9+j*6,'#eed4b855')}if(l>=4)textile(c,37,14,24,24,5,'#c6b49c');if(l===5){wood(c,-65,32,130,4);rr(c,-59,-34,118,3,1,'#eedcc1')}
 }else if(k==='plant'||k==='deskplant'||k==='flowerbox'){
  const box=k==='flowerbox';wood(c,box?-42:-13,box?4:0,box?84:26,box?27:24,'#c2a17c');if(box){for(let i=0;i<6;i++)ln(c,-36+i*14,7,-36+i*14,27,'#8a704c44');for(let i=0;i<l+3;i++){const dx=-33+i*66/(l+2);leaf(c,dx,-2,.9);el(c,dx,-20,4.3,4.3,i%2?'#cfac8e':'#e2c994');el(c,dx,-20,1.4,1.4,'#9e8958')}}else{el(c,0,0,12,3,'#e3cbaa');el(c,0,-1,10,2,'#8d7a58');for(let i=0;i<l+2;i++){const yy=-i*7;leaf(c,(i%2?4:-4),yy,1+i*.08)}if(l>=4)el(c,5,-36,5,4,'#dfc7a3');rr(c,-10,6,2,12,1,'#f2dfbc66')}
 }else if(k==='bookshelf'){
  wood(c,-29,-43,58,72);rr(c,-24,-37,48,60,1,'#9d805d');for(let r=0;r<3;r++){wood(c,-25,-18+r*20,50,4);for(let b=0;b<4+l%2;b++)book(c,-21+b*8,-35+r*20,6,15-(b%2)*2,['#879b86','#c89f86','#d5be96','#a5a99a','#d8cbb3'][b%5]);}if(l>=3)cup(c,17,14,.5);if(l>=4)wood(c,-34,-47,68,5);if(l===5)leaf(c,30,-40,.8);
 }else if(k==='coffee'){
  wood(c,-36,4,72,31);wood(c,-40,0,80,7);ln(c,-30,19,30,19,'#9b7857');for(const dx of [-16,16])rr(c,dx-4,13,8,1.5,.5,'#dfc5a0');rr(c,-22,-35,38,35,5,'#d8c9ac',C.edge);rr(c,-17,-29,28,13,3,'#828e7c');el(c,-10,-23,3,3,'#d5c6a8');el(c,8,-23,2,2,'#d7b98a');rr(c,-18,-12,31,4,1,'#6e6f60');ln(c,-10,-9,-10,-5,'#695f50',2);cup(c,-9,-3,.6);for(let j=0;j<3;j++)ln(c,-17+j*9,-2,-17+j*9,1,'#796f5b');if(l>=2){rr(c,21,-22,12,22,3,'#a6a68f');el(c,27,-23,6,2,'#d7c5a6')}if(l>=3){cup(c,-10,-38,.35);cup(c,3,-38,.35)}if(l>=4){wood(c,-42,-44,85,4);label(c,'COFFEE & REST',0,-50,6)}if(l===5)leaf(c,-32,-22,.65);
 }else if(k==='water'){
  rr(c,-17,-27,34,59,6,'#e7deca',C.edge);rr(c,-12,-53,24,25,7,grad(c,0,-53,25,'#d9e6d9','#aabeb0'),'#8eaa9a');ln(c,-7,-49,-7,-34,'#f5f5e0',2);rr(c,-11,-19,22,12,2,'#a9b7a1');rr(c,-11,1,22,20,3,'#b1ac98');cup(c,0,11,.65);rr(c,-7,-3,4,4,1,'#91a48c');rr(c,4,-3,4,4,1,'#c3967e');if(l>=3)label(c,'PURE',0,-10,5);if(l>=4)rr(c,-12,25,24,3,1,'#a39981');if(l===5)wood(c,-22,31,44,4);
 }else if(k==='lamp'){
  el(c,0,27,17,4,'#b7a07d');rr(c,-2,-29,4,56,2,'#9a825e');poly(c,[[-12,-41],[12,-41],[22,-17],[-22,-17]],'#dbbf8d');el(c,0,-17,22,3,'#f5e3b5');for(let i=0;i<6;i++)ln(c,-10+i*4,-37,-18+i*7,-18,'#f4e3bf99');el(c,0,28,l>=3?33:24,5,'#eccb8033');if(l>=4)rr(c,-12,-43,24,3,1,'#a78c65');if(l===5)wood(c,-20,29,40,3);
 }else if(k==='aquarium'){
  rr(c,-34,-32,68,48,4,'#a99b7e',C.edge);rr(c,-30,-28,60,39,2,grad(c,0,-28,39,'#dbe5d7','#acbcab'));rr(c,-29,4,58,7,1,'#d7c6a3');leaf(c,-19,3,.9);leaf(c,22,0,.7);for(let i=0;i<l+1;i++){const dx=-16+i*7,yy=-16+i%2*8;el(c,dx,yy,4,2.3,i%2?'#c39b80':'#e1c590');poly(c,[[dx+3,yy],[dx+7,yy-3],[dx+7,yy+3]],'#bd9b78')}ln(c,-25,-25,-25,-4,'#f6f5e0aa',2);wood(c,-36,16,72,7);
 }else if(k==='rug'){
  textile(c,-53,-4,106,38,7,'#c6ad8c');rr(c,-45,2,90,25,4,null,'#eee0c3');for(let i=0;i<8;i++){ln(c,-52,1+i*4,-57,1+i*4,'#bca583');ln(c,52,1+i*4,57,1+i*4,'#bca583')}if(l>=2)for(let i=0;i<l+2;i++)ln(c,-38+i*15,5,-38+i*15,24,'#eee1c555');
 }else if(k==='wallpaper'){
  rr(c,-49,-37,98,68,3,a.id==='pinkwall'?'#e3cbbb':'#e6ddc7',C.edge);for(let i=0;i<9;i++)ln(c,-45+i*11,-34,-45+i*11,26,'#fff7e866');wood(c,-48,16,96,14,'#c8af8c');if(l>=3)for(let i=0;i<5;i++){leaf(c,-34+i*17,-10,.5)}if(l===5)rr(c,-40,-27,80,34,3,null,'#c6b38d');
 }else if(k==='keyboard'){
  rr(c,-37,-6,74,25,5,'#c9bfa8',C.edge);for(let r=0;r<3;r++)for(let i=0;i<12;i++)rr(c,-33+i*5.5,-3+r*5.5,4.3,4.3,1,i>9?'#acb6a0':'#f3e9d4','#bbaa8c55');rr(c,-13,14,29,3,1,'#e4cfac');if(l>=3)wood(c,-38,22,76,8);if(l>=4)rr(c,40,0,12,20,4,'#d0c4a9');if(l===5)label(c,'S',32,13,4);
 }else if(k==='mug'){
  cup(c,0,0,1.6);if(l>=2)ln(c,-6,-19,-4,-27,'#bba98b88');if(l>=3){el(c,-5,8,1.5,1.5,'#846f54');el(c,5,8,1.5,1.5,'#846f54');}if(l>=4)el(c,0,23,25,4,'#d5bd97');if(l===5)wood(c,-30,27,60,4);
 }else if(k==='board'||k==='poster'){
  wood(c,-35,-39,70,63);rr(c,-30,-34,60,53,1,k==='board'?'#c6ac84':'#f2e7ce');if(k==='board'){for(let i=0;i<l+2;i++){const xx=-25+i%4*14,yy=-28+Math.floor(i/4)*23;rr(c,xx,yy,12,18,1,['#ece2c6','#b5c0a2','#d4b499'][i%3]);el(c,xx+6,yy+2,1.2,1.2,'#9d7b59');ln(c,xx+2,yy+7,xx+9,yy+7,'#9b896655')}}else{el(c,10,-18,10,10,'#d8bc84');poly(c,[[-26,8],[-9,-21],[10,8]],'#a8b294');poly(c,[[-4,9],[10,-10],[27,9]],'#879a7d');label(c,'SLOW MORNING',0,15,5)}
 }else if(k==='beanbag'){
  textile(c,-37,-25,74,59,26,'#c6b29b');c.beginPath();c.moveTo(-24,-13);c.quadraticCurveTo(-5,28,24,-13);c.strokeStyle='#a48b6c';c.lineWidth=.8;c.stroke();if(l>=2)textile(c,5,-16,24,19,6,'#e3d5ba');if(l>=3)for(let i=0;i<4;i++)ln(c,-20+i*12,7,-20+i*12,20,'#ebddc344');
 }else if(k==='parasol'){
  rr(c,-2,-45,4,79,1,'#9e815a');el(c,0,35,23,4,'#c1ab89');for(let i=0;i<8;i++)poly(c,[[0,-69],[-60+i*15,-30],[-45+i*15,-30]],i%2?'#f1e5cd':'#c8ad83');for(let i=0;i<8;i++)rr(c,-60+i*15,-31,15,6,3,i%2?'#eee0c5':'#bea078');el(c,0,-69,3,3,'#8c7558');if(l>=3)ln(c,-1,-44,-1,29,'#e9d6b0');if(l>=4)for(let i=0;i<7;i++)el(c,-48+i*16,-22,1.5,1.5,'#f0d6a1');
 }else if(k==='teatable'){
  el(c,0,5,34,13,'#987951');el(c,0,1,34,12,grad(c,0,-10,25,'#e1cba8','#bf9d73'));ln(c,-25,15,-25,34,'#947653',5);ln(c,25,15,25,34,'#947653',5);cup(c,-8,-9,.75);if(l>=2)book(c,10,-9,17,9,'#a1ad91');if(l>=4)leaf(c,15,-12,.55);
 }else if(k==='hammock'){
  wood(c,-45,-46,5,80);wood(c,40,-46,5,80);c.beginPath();c.moveTo(-40,-37);c.quadraticCurveTo(0,25,40,-37);c.strokeStyle='#b7a78b';c.lineWidth=2;c.stroke();poly(c,[[-33,-22],[-23,17],[0,23],[23,17],[33,-22],[14,-7],[-14,-7]],'#ccb89b');for(let i=0;i<7;i++)ln(c,-21+i*7,2,-17+i*5.5,16,'#eee0c1');if(l>=2)textile(c,-14,-10,27,16,6,'#e5d7bd');if(l>=4)wood(c,-47,33,94,4);
 }else if(k==='speaker'){
  wood(c,-31,-31,62,56);rr(c,-26,-26,34,45,4,'#b3ac8c');for(let r=0;r<9;r++)for(let i=0;i<7;i++)el(c,-23+i*4.2,-22+r*4.5,.65,.65,'#877955');el(c,19,-15,5,5,'#d8c39f');el(c,19,-15,2.5,2.5,'#b09a74');rr(c,13,-2,12,3,1,'#6c7464');if(l>=3){ln(c,-30,-34,20,-34,'#997d55',2);rr(c,-31,-35,12,4,1,'#a28a68')}if(l===5)label(c,'FM',19,14,5);
 }
 c.restore();
}
