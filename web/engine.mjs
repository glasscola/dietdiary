export const VERSION = 1;
export const FLOORS = {1:'면접실 · 미팅룸',6:'옥상 휴게실',2:'활동사업부',3:'영양운영부',4:'회복지원부',5:'대표이사실'};
export const STATS = ['분석력','운영력','협업력','연구력'];
export const WAGES = [0,8,16,27,40,58];
export const PEOPLE = [
 ['한의지','의지',2],['도전우','도전',2],['차성실','성실',3],['유꾸준','꾸준함',4],['온여유','여유',4],['서균형','균형',3],['신활력','활력',2],['안차분','차분함',4],['고집중','집중',3],['이새봄','새출발',2],['조인내','인내',3],['윤유연','유연함',4],['백긍정','긍정',2],['정단단','결심',3],['배배려','배려',4]
];
export const SHOP = [
 {id:'computer',name:'오피스 PC',kind:'computer',price:180,efficiency:.025,color:'#83b9da',personal:true,skins:['클래식 CRT','슬림 LCD','올인원 PC','듀얼 모니터','스마트 워크스테이션']},
 {id:'laptop',name:'에어 노트북',kind:'computer',price:220,efficiency:.03,color:'#9daddd',personal:true,skins:['베이직 노트북','슬림북','울트라북','프로 노트북','플로팅 디스플레이']},
 {id:'creator',name:'크리에이터 PC',kind:'computer',price:260,efficiency:.035,color:'#bca5dd',personal:true,skins:['컬러 PC','와이드 PC','스튜디오 PC','울트라 와이드','크리에이터 듀얼']},
 {id:'desk',name:'클라우드 책상',kind:'desk',price:120,efficiency:.02,color:'#a8d2e7',personal:true,skins:['기본 책상','화이트 데스크','수납형 데스크','모션 데스크','스마트 데스크']},
 {id:'wooddesk',name:'내추럴 책상',kind:'desk',price:140,efficiency:.022,color:'#d4b992',personal:true,skins:['원목 책상','라이트 우드','넓은 원목 책상','원목 모션 데스크','프리미엄 우드']},
 {id:'chair',name:'브리즈 의자',kind:'chair',price:100,morale:5,color:'#8acbd7',personal:true,skins:['기본 의자','쿠션 체어','메시 체어','인체공학 체어','프리미엄 체어']},
 {id:'pinkchair',name:'피치 의자',kind:'chair',price:120,morale:6,color:'#e1b1c6',personal:true,skins:['피치 체어','소프트 쿠션','피치 메시','피치 에르고','스위트 프리미엄']},
 {id:'clock',name:'오트 벽시계',kind:'clock',price:90,efficiency:.012,color:'#7ab2d7',skins:['아날로그 시계','미니멀 시계','디지털 시계','스마트 클록','홀로그램 클록']},
 {id:'moonclock',name:'문라이트 시계',kind:'clock',price:110,efficiency:.014,color:'#a9a6d9',skins:['문 클록','달빛 벽시계','무드 디지털','문라이트 스마트','루나 홀로그램']},
 {id:'wallpaper',name:'오트밀 벽지',kind:'wallpaper',price:160,morale:5,color:'#c5e4f4',skins:['오트밀 크림','린넨 패턴','세이지 스트라이프','원목 패널','카페 아틀리에']},
 {id:'pinkwall',name:'블러쉬 벽지',kind:'wallpaper',price:160,morale:5,color:'#f0d8e8',skins:['블러쉬 핑크','작은 꽃무늬','피치 스트라이프','로즈 글라스','선셋 오로라']},
 {id:'plant',name:'초록빛 화분',kind:'plant',price:70,morale:3,color:'#91bea1',skins:['새싹 화분','작은 잎사귀','몬스테라','실내 정원','그린 아트리움']},
 {id:'bookshelf',name:'작은 서가',kind:'bookshelf',price:140,efficiency:.015,color:'#adbbd2',skins:['작은 책장','정리된 서가','오픈 북셀프','디자인 서가','라이브러리 월']},
 {id:'lamp',name:'햇살 조명',kind:'lamp',price:100,morale:4,color:'#f1d797',skins:['작은 스탠드','데스크 램프','무드 램프','플로어 램프','앰비언트 라이트']},
 {id:'aquarium',name:'물빛 수족관',kind:'aquarium',price:210,morale:6,color:'#9ed9e7',skins:['미니 어항','열대어 어항','수초 어항','아쿠아리움','오션 갤러리']},
 {id:'pantry',name:'라운지 소파',kind:'sofa',price:200,morale:8,color:'#a8c8e7',onlyFloor:6,skins:['작은 소파','패브릭 소파','코너 소파','라운지 소파','프리미엄 라운지']},
 {id:'coffee',name:'커피 스테이션',kind:'coffee',price:150,morale:5,color:'#bdc8de',onlyFloor:6,skins:['커피포트','캡슐 머신','에스프레소 머신','커피바','바리스타 스테이션']},
 {id:'water',name:'워터 스테이션',kind:'water',price:110,morale:4,color:'#9ed1e7',onlyFloor:6,skins:['물병과 컵','미니 정수기','슬림 정수기','스마트 정수기','프리미엄 워터바']},
 {id:'rug',name:'클라우드 러그',kind:'rug',price:130,morale:3,color:'#a3c6e5',skins:['작은 러그','체크 러그','소프트 러그','아트 러그','구름 러그']},
 {id:'rattan',name:'라탄 쿠션 체어',kind:'chair',price:145,efficiency:.012,morale:3,color:'#b48c5e',personal:true,skins:['라탄 체어','린넨 쿠션','등받이 쿠션','라운드 라탄','포근한 라탄']},
 {id:'keyboard',name:'크림 키보드',kind:'keyboard',price:65,efficiency:.005,color:'#e6cdb0',personal:true,skins:['미니 키보드','동글 키캡','우드 손목받침','저소음 키보드','커스텀 키보드']},
 {id:'deskplant',name:'책상 위 작은 초록',kind:'deskplant',price:55,morale:2,color:'#83986b',personal:true,skins:['새싹 친구','작은 선인장','콩잎 화분','꽃피는 화분','작은 분재']},
 {id:'mug',name:'마이 머그 세트',kind:'mug',price:50,efficiency:.004,morale:1,color:'#d2a78a',personal:true,skins:['도자기 머그','라떼 머그','곰돌이 머그','티타임 세트','핸드메이드 세트']},
 {id:'corkboard',name:'코르크 메모 보드',kind:'board',price:100,efficiency:.008,color:'#be9467',skins:['작은 메모','사진 보드','위클리 보드','아이디어 월','우리 회사 기록']},
 {id:'poster',name:'따뜻한 아트 포스터',kind:'poster',price:85,morale:2,color:'#b98b70',skins:['커피 한 잔','작은 숲','오늘의 햇살','나의 페이스','계절의 그림']},
 {id:'beanbag',name:'폭신한 빈백',kind:'beanbag',price:150,morale:4,efficiency:.002,color:'#c2a183',onlyFloor:6,skins:['린넨 빈백','코듀로이 빈백','포근한 니트','패치워크 빈백','구름 빈백']},
 {id:'parasol',name:'햇살 파라솔',kind:'parasol',price:190,morale:3,efficiency:.003,color:'#e5c69d',onlyFloor:6,skins:['작은 그늘','스트라이프 그늘','우드 파라솔','카페 테라스','가든 파빌리온']},
 {id:'teatable',name:'라운드 티 테이블',kind:'teatable',price:125,morale:2,efficiency:.003,color:'#bd9670',onlyFloor:6,skins:['작은 원목 테이블','티타임 테이블','라탄 테이블','카페 테이블','브런치 테이블']},
 {id:'flowerbox',name:'옥상 꽃상자',kind:'flowerbox',price:90,morale:3,color:'#9ba875',onlyFloor:6,skins:['작은 꽃상자','데이지 꽃밭','허브 가든','계절 꽃밭','루프탑 정원']},
 {id:'hammock',name:'느긋한 해먹',kind:'hammock',price:230,morale:5,efficiency:.003,color:'#c4b294',onlyFloor:6,skins:['린넨 해먹','우드 스탠드','니트 해먹','코지 해먹','숲속 해먹']},
 {id:'speaker',name:'작은 우드 스피커',kind:'speaker',price:135,morale:2,efficiency:.003,color:'#a98160',skins:['라디오','블루투스 스피커','우드 스테레오','빈티지 오디오','뮤직 스테이션']}

];

for(const a of SHOP){
 a.scope=a.personal?'seat':a.onlyFloor===6?'company':'floor';
 a.allowedFloors=a.onlyFloor?[a.onlyFloor]:a.personal?[2,3,4,5]:['clock','wallpaper','board','poster','bookshelf','aquarium'].includes(a.kind)?[1,2,3,4,5]:[1,2,3,4,5,6];
 if(a.kind==='chair'){a.efficiency??=.01;a.morale=Math.min(a.morale||2,3);}
 if(a.kind==='desk')a.efficiency=.015;
 if(a.kind==='clock')a.efficiency=.008;
 if(a.kind==='computer')a.efficiency=a.id==='creator'?.03:a.id==='laptop'?.025:.02;
 if(a.scope==='company'){a.efficiency??=.003;a.morale=Math.min(a.morale||2,5);}
}
export const SCOPE_LABELS={seat:'사용 직원',floor:'배치한 층',company:'모든 직원'};
export function allowedFloors(id){return [...(SHOP.find(a=>a.id===id)?.allowedFloors||[])];}
export function appearanceFor(id,seed=0){const k=seed+':'+id;return {skin:hash(k+'skin')%6,hair:hash(k+'hair')%7,outfit:hash(k+'outfit')%8,accessory:hash(k+'acc')%5};}
export function furnitureScope(i){const a=SHOP.find(a=>a.id===i.id);return a.scope==='seat'?'seat':i.floor===6?'company':a.scope;}
export function placeFurniture(s,uid,floor,slot=0){
 const i=s.inventory.find(i=>i.uid===uid);if(!i)throw Error('가구를 찾지 못했어요.');const a=SHOP.find(a=>a.id===i.id);
 if(!a.allowedFloors.includes(floor))throw Error('이 공간에는 설치할 수 없는 가구예요.');
 if(a.personal&&[2,3,4].includes(floor)){if(!Number.isInteger(slot)||slot<0||slot>2)throw Error('1~3번 자리를 선택해주세요.');}else slot=0;
 for(const other of s.inventory)if(other.uid!==uid&&other.equipped&&other.floor===floor&&(other.slot||0)===slot&&SHOP.find(a=>a.id===other.id)?.kind===a.kind)other.equipped=false;
 i.floor=floor;i.slot=slot;i.equipped=true;return i;
}
export function setFurnitureSkin(s,uid,skin){const i=s.inventory.find(i=>i.uid===uid);if(!i)throw Error('가구를 찾지 못했어요.');if(!Number.isInteger(skin)||skin<1||skin>i.level)throw Error('아직 해금하지 않은 스킨이에요.');i.skin=skin;return i;}
export function storeFurniture(s,uid){const i=s.inventory.find(i=>i.uid===uid);if(!i)throw Error('가구를 찾지 못했어요.');i.equipped=false;return i;}
export function efficiencyBreakdown(s,floor,seat=null){const parts={seat:0,floor:0,company:0};for(const i of s.inventory){if(!i.equipped||i.floor==null)continue;const a=SHOP.find(a=>a.id===i.id),scope=furnitureScope(i);if(scope==='company'||i.floor===floor&&(scope==='floor'||seat!=null&&i.slot===seat))parts[scope]+=(a.efficiency||0)*i.level;}parts.seat=Math.min(.18,parts.seat);parts.floor=Math.min(.12,parts.floor);parts.company=Math.min(.08,parts.company);return {...parts,total:Math.min(.35,parts.seat+parts.floor+parts.company)};}
export function exerciseGap(s,date=s.day){let gap=0;for(let i=0;i<30;i++){const d=addDays(date,-i);if(d<s.created)break;const a=activity(s,d),q=Object.values(s.questLog||{}).some(q=>q.completed&&q.date===d&&q.category==='exercise');if(a.exercise||a.walk||q)break;gap++;}return gap;}
export function dayMood(s,date=s.day){const q=Object.values(s.questLog||{}).filter(q=>q.completed&&q.date===date),a=activity(s,date),rest=!!(a.rest||a.movie||q.some(q=>q.category==='rest')),active=!!(a.exercise||a.walk||q.some(q=>q.category==='exercise')),count=q.length+Object.values(a).filter(Boolean).length,gap=exerciseGap(s,date);return {rest,active,count,gap,kind:count>=7?'busy':active?'active':rest?'rest':count===0?'quiet':gap>=3&&!rest?'stalled':count?'steady':'quiet'};}
export function dailyWisdom(s,date=s.day){const m=dayMood(s,date),books={busy:['열심히 산 하루에도, 숨을 고를 자리는 필요해요.','많이 해낸 날에는 나를 쉬게 하는 일도 성과예요.','오늘의 최선 다음에는 편안한 쉼을 놓아주세요.'],active:['작은 한 걸음도, 어제와 다른 방향으로 나를 데려가요.','빠른 변화보다 오래 이어갈 수 있는 하루를 쌓아요.','내 속도로 움직인 오늘이 내일의 힘이 돼요.'],rest:['휴식도 나를 돌보는 방법이에요. 오늘은 편안하게 충전해요.','쉬어가는 하루가 있어야 다음 걸음도 가벼워져요.','잠시 멈춘 오늘도, 나를 위한 하루예요.'],stalled:['쉬는 날이 이어졌네요. 내일은 작은 산책부터 해볼까요?','내일은 딱 한 가지, 나를 위한 작은 약속을 골라봐요.','다시 시작하는 데 큰 결심은 필요 없어요. 한 걸음이면 충분해요.'],steady:['오늘 지킨 작은 약속은 사라지지 않고 내 안에 남아요.','꾸준함은 매일 완벽한 모습보다, 다시 돌아오는 마음이에요.','남과 다른 속도도 나에게는 맞는 속도일 수 있어요.'],quiet:['오늘은 조용히 지나갔네요. 내일의 작은 시작을 기다릴게요.','아무것도 못 한 날에도, 나를 다그치지 않아도 괜찮아요.','내일은 물 한 잔과 작은 기록 하나로 시작해볼까요?']};return {kind:m.kind,text:books[m.kind][hash(s.seed+date+'wisdom')%books[m.kind].length],source:'새봄의 하루 문장'};}
export function innerThought(s,e,date=s.day){const m=dayMood(s,date),lines={busy:['오늘 일정이 꽉 찼네. 조금 힘들다…','우리 대표님도 잠깐 쉬면 좋겠어.','바쁜 날엔 이 커피 한 잔이 소중해.'],active:['오늘은 우리도 할 일이 있네!','움직이는 날은 회사도 활기차.','작은 운동 하나에도 힘이 나네.'],rest:['오늘은 같이 숨 좀 돌리자.','잘 쉬어야 오래 일할 수 있지.','오늘 쉼이 내일 힘이 되면 좋겠어.'],stalled:['운동을 며칠 쉬니 할 일이 없네…','내일은 가볍게 움직여주실까?','대표님의 작은 시작을 기다리는 중.'],steady:['작은 약속이 하나씩 쌓이고 있어.','이 정도 페이스도 꽤 괜찮은데?','내 자리에서 천천히 해볼게.'],quiet:['오늘은 사무실이 조용하네.','대표님, 작은 일 하나 해볼까요?','내일은 무슨 일을 하게 될까?']};return lines[m.kind][hash(e.id+date)%lines[m.kind].length];}

export const DIFFICULTIES={easy:{label:'쉬움',daily:30,weekly:100},normal:{label:'보통',daily:60,weekly:200},hard:{label:'어려움',daily:100,weekly:350}};
export const CATEGORIES={habit:'작은 습관',exercise:'운동 · 활동',diet:'식단',rest:'휴식',general:'일상'};
export function migrateState(s){
 s.customQuests??=[
  {id:'starter-habit',title:'내가 정한 작은 습관 하나',type:'daily',difficulty:'easy',category:'habit',repeat:'weekdays',days:[0,1,2,3,4,5,6],startDate:s.created||s.day},
  {id:'starter-move',title:'가볍게 몸 움직이기',type:'daily',difficulty:'normal',category:'exercise',repeat:'weekdays',days:[0,1,2,3,4,5,6],startDate:s.created||s.day},
  {id:'starter-rest',title:'나를 위한 휴식 시간',type:'daily',difficulty:'easy',category:'rest',repeat:'weekdays',days:[0,1,2,3,4,5,6],startDate:s.created||s.day},
  {id:'starter-week',title:'이번 주 운동 세 번 해보기',type:'weekly',difficulty:'normal',category:'exercise',repeat:'weekly',days:[],startDate:s.created||s.day},
  {id:'starter-movie',title:'영화 한 편 보며 쉬어가기',type:'weekly',difficulty:'easy',category:'rest',repeat:'weekly',days:[],startDate:s.created||s.day}
 ];s.questLog??={};s.stamps??={};const previousRevision=s.revision||1;s.revision=4;s.weeklyProgress??={};s.pausedDays??={};
 for(const i of s.inventory){i.level??=1;i.skin??=1;i.slot??=0;i.equipped??=true;if(previousRevision<3&&['pantry','coffee','water'].includes(i.id))i.floor=6;if(i.floor==null)i.equipped=false;if(!SHOP.find(a=>a.id===i.id)?.allowedFloors.includes(i.floor)){i.equipped=false;i.floor=null;}}
 for(const f of [2,3,4]){const used=new Set();for(const e of s.staff.filter(e=>e.floor===f)){if(!Number.isInteger(e.seat)||e.seat<0||e.seat>2||used.has(e.seat))e.seat=[0,1,2].find(i=>!used.has(i));used.add(e.seat);}}
 for(const e of s.staff){e.hair??=hash(e.id+'hair')%5;e.outfit??=hash(e.id+'outfit')%6;e.accessory??=hash(e.id+'acc')%4;}
 return s;
}
export function questKey(q,date){return q.id+':'+(q.type==='weekly'?weekStart(date):date);}
export function scheduledQuests(s,type,date=s.day){return (s.customQuests||[]).filter(q=>{
 if(q.type!==type||q.startDate>date||(q.deletedOn&&q.deletedOn<=date))return false;
 if(s.pausedDays?.[q.id+':'+date])return false;
 if(type==='weekly')return q.repeat==='weekly'||weekStart(q.startDate)===weekStart(date);
 return q.repeat==='once'?q.startDate===date:q.days.includes(new Date(date+'T12:00:00Z').getUTCDay());
 }).map(q=>({...q,key:questKey(q,date),log:s.questLog[questKey(q,date)]||null}));}
export function upsertQuest(s,input){
 const title=String(input.title||'').trim();if(!title||title.length>80)throw Error('제목을 1~80자로 입력해주세요.');
 if(!['daily','weekly'].includes(input.type)||!DIFFICULTIES[input.difficulty]||!CATEGORIES[input.category])throw Error('일정 설정을 확인해주세요.');
 if(!/^\d{4}-\d{2}-\d{2}$/.test(input.startDate))throw Error('시작 날짜를 선택해주세요.');
 const days=[...new Set((input.days||[]).map(Number))].filter(n=>n>=0&&n<=6);
 if(input.type==='daily'&&input.repeat!=='once'&&!days.length)throw Error('반복할 요일을 하나 이상 선택해주세요.');
 let old=s.customQuests.find(q=>q.id===input.id);const q={id:old?.id||'quest-'+(++s.serial),title,type:input.type,difficulty:input.difficulty,category:input.category,repeat:input.type==='weekly'?(input.repeat==='once'?'once':'weekly'):(input.repeat==='once'?'once':'weekdays'),days,startDate:input.startDate,target:input.type==='weekly'?Math.max(1,Math.min(30,Math.round(Number(input.target)||1))):1};
 if(old)Object.assign(old,q);else s.customQuests.push(q);return q;
}
export function deleteQuest(s,id){const q=s.customQuests.find(q=>q.id===id);if(!q)throw Error('일정을 찾지 못했어요.');q.deletedOn=s.day;}
export function toggleQuest(s,id,date=s.day){
 const q=s.customQuests.find(q=>q.id===id);if(!q)throw Error('일정을 찾지 못했어요.');const key=questKey(q,date),prior=s.questLog[key];
 if(q.type==='weekly'&&(q.target||1)>1&&!prior?.completed){const list=s.weeklyProgress??={};const entries=list[key]??=[];if(entries.includes(date))throw Error('오늘 실천은 이미 기록했어요.');entries.push(date);if(entries.length<q.target)return {partial:true,count:entries.length,target:q.target};}
 if(prior?.completed&&s.ledger.some(l=>l.date===prior.date))throw Error('결산된 실천은 취소할 수 없어요.');
 if(prior?.completed){if(s.weeklyProgress?.[key])s.weeklyProgress[key].pop();prior.completed=false;transaction(s,'완료 취소: '+prior.title,-prior.amount,date);delete s.stamps[date];delete s.stamps[prior.date];return {...prior,cancelled:true};}
 if(!scheduledQuests(s,q.type,date).some(a=>a.id===id))throw Error('이 날짜에 예정된 일정이 아니에요.');
 const dice=prior?.dice||1+hash(s.seed+key+'dice')%6,base=prior?.base||DIFFICULTIES[q.difficulty][q.type],amount=prior?.amount||Math.round(base*(1+dice/10));
 const log={key,id,title:prior?.title||q.title,type:q.type,category:q.category,difficulty:q.difficulty,dice,base,amount,completed:true,date};s.questLog[key]=log;transaction(s,'일정 완료: '+log.title,amount,date);delete s.stamps[date];return log;
}
export function receiptQuests(s,date){const historical=s.ledger.find(l=>l.date===date)?.questSnapshot;const list=(historical||[...scheduledQuests(s,'daily',date),...scheduledQuests(s,'weekly',date)].map(q=>({id:q.id,key:q.key,title:q.title,type:q.type,difficulty:q.difficulty}))).map(q=>({...q}));for(const log of Object.values(s.questLog||{}))if(log.completed&&log.date<=date&&(log.type==='weekly'?weekStart(log.date)===weekStart(date):log.date===date)&&!list.some(q=>q.key===log.key))list.push({id:log.id,key:log.key,title:log.title,type:log.type,difficulty:log.difficulty});return list.map(q=>({...q,title:s.questLog[q.key]?.title||q.title,completed:!!s.questLog[q.key]?.completed&&s.questLog[q.key].date<=date,log:s.questLog[q.key]||null}));}
export function upgradeCost(i){const item=SHOP.find(x=>x.id===i.id);return Math.round(item.price*(.65+(i.level||1)*.35));}
export function upgradeFurniture(s,uid){const i=s.inventory.find(i=>i.uid===uid);if(!i)throw Error('비품을 찾지 못했어요.');if(i.level>=5)throw Error('이미 최고 레벨이에요.');const cost=upgradeCost(i);if(s.gold<cost)throw Error('업그레이드 골드가 부족해요.');i.level++;i.skin=i.level;i.paid+=cost;transaction(s,SHOP.find(x=>x.id===i.id).name+' Lv.'+i.level+' 업그레이드',-cost);return i;}
export function equipFurniture(s,uid,skin=null){const i=s.inventory.find(i=>i.uid===uid);if(!i)throw Error('가구를 찾지 못했어요.');if(skin!=null&&(!Number.isInteger(skin)||skin<1||skin>i.level))throw Error('아직 해금하지 않은 스킨이에요.');if(i.floor!=null)placeFurniture(s,uid,i.floor,i.slot);if(skin!=null)i.skin=skin;}
export const QUESTS = [
 {id:'exercise',title:'이번 주 운동 3번',target:3,reward:160,kind:'exercise'},
 {id:'movie',title:'영화 한 편으로 쉬어가기',target:1,reward:80,kind:'movie'},
 {id:'walk',title:'가볍게 산책 2번',target:2,reward:100,kind:'walk'},
 {id:'rest',title:'나를 위한 휴식 2번',target:2,reward:90,kind:'rest'},
 {id:'habit',title:'내가 정한 작은 습관 3번',target:3,reward:120,kind:'habit'},
 {id:'record',title:'내 몸의 기록 4일 남기기',target:4,reward:100,kind:'record'}
];
export const INVESTORS = [
 {id:'walk',name:'차근차근 투자사',tag:'활동 계약',title:'오늘, 가벼운 산책 한 번',desc:'산책을 기록한 후 계약을 완료하면 90 G를 지급합니다.',reward:90,kind:'walk',cost:'추가 비용 없음'},
 {id:'rest',name:'느긋한 파트너스',tag:'복지 계약',title:'대표님도 쉬어가세요',desc:'오늘 휴식을 기록하면 60 G를 지급합니다.',reward:60,kind:'rest',cost:'추가 비용 없음'},
 {id:'temptation',name:'오늘만 캐피탈',tag:'단기 계약',title:'오늘은 치팅데이 어때요?',desc:'수락 즉시 160 G, 전 직원 사기 +5. 다음 3일 배당은 15% 감소합니다. 실제 식사와 관계없이 적용되는 게임 계약입니다.',reward:160,kind:null,cost:'다음 3일 배당 −15%'},
 {id:'habit',name:'꾸준한 미래금융',tag:'습관 계약',title:'작은 약속도 투자입니다',desc:'오늘 작은 습관을 실천하고 기록하면 80 G를 지급합니다.',reward:80,kind:'habit',cost:'추가 비용 없음'}
];
export function hash(s){let h=2166136261; for(const c of String(s)) h=Math.imul(h^c.charCodeAt(0),16777619); return h>>>0;}
export function rnd(s){return hash(s)/4294967296;}
export function addDays(d,n){const t=new Date(d+'T12:00:00Z');t.setUTCDate(t.getUTCDate()+n);return t.toISOString().slice(0,10);}
export function daysBetween(a,b){return Math.round((new Date(b+'T12:00:00Z')-new Date(a+'T12:00:00Z'))/86400000);}
export function seoulDate(now=new Date()){return new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Seoul',year:'numeric',month:'2-digit',day:'2-digit'}).format(now);}
export function weekStart(d){const day=new Date(d+'T12:00:00Z').getUTCDay();return addDays(d,-((day+6)%7));}
export function lastClosedDate(closeTime='23:00',now=new Date()){
 const parts=new Intl.DateTimeFormat('en-GB',{timeZone:'Asia/Seoul',hour:'2-digit',minute:'2-digit',hour12:false}).format(now);
 return parts>=closeTime?seoulDate(now):addDays(seoulDate(now),-1);
}
export function createState(profile=null,day=seoulDate()){
 return migrateState({version:VERSION,profile,day,created:day,seed:hash(day+':'+Date.now()),gold:500,staff:[],records:{},activities:{},ledger:[],inventory:[],contracts:[],claimed:[],transactions:[],lastClosed:null,serial:0});
}
export function activity(s,d=s.day){return s.activities[d]||{};}
export function transaction(s,label,amount,date=s.day){s.gold+=amount;s.transactions.unshift({id:++s.serial,date,label,amount});s.transactions=s.transactions.slice(0,300);}
export function latestRecord(s,date=s.day){return Object.entries(s.records).filter(([d,r])=>d<=date&&Number.isFinite(r.weight)).sort((a,b)=>b[0].localeCompare(a[0]))[0]||null;}
export function rollFor(s,date){const list=[{label:'잔잔한 하루',factor:1},{label:'반가운 소식',factor:1.025},{label:'작은 순풍',factor:1.012},{label:'잠깐의 흐림',factor:.98},{label:'뜻밖의 호재',factor:1.04},{label:'조용한 조정',factor:.99}];return list[hash(s.seed+date+'market')%list.length];}
export function valuation(s,date=s.day,roll=null,profile=s.profile){
 if(!profile)return 10000;
 const p=profile,w=latestRecord(s,date)?.[1].weight??p.start;
 let base;
 if(p.mode==='maintain') {const distance=Math.max(0,Math.abs(w-p.target)-(p.range||1));const count=Object.entries(s.records).filter(([d,r])=>d<=date&&Math.abs(r.weight-p.target)<=(p.range||1)).length;base=20000-distance*2500+Math.min(count,180)*120;}
 else {const span=Math.max(.1,p.start-p.target);const progress=(p.start-w)/span;base=10000+progress*90000;}
 const factor=roll?.factor??s.ledger.filter(x=>x.date<=date).at(-1)?.roll.factor??1;
 return Math.max(1000,Math.round(base*factor));
}
export function dividend(s,date,roll,profile=s.profile){let amount=Math.max(25,Math.round(valuation(s,date,roll,profile)*.012));for(const c of s.contracts)if(c.id==='temptation'&&date>c.date&&date<=addDays(c.date,3))amount=Math.round(amount*.85);return amount;}
export function moraleBonus(s,floor,seat=null){return Math.min(30,s.inventory.filter(i=>i.equipped&&i.floor!=null&&(furnitureScope(i)==='company'||i.floor===floor&&(furnitureScope(i)==='floor'||seat!=null&&i.slot===seat))).reduce((sum,i)=>sum+(SHOP.find(a=>a.id===i.id)?.morale||0)*i.level,0));}
export function efficiencyBonus(s,floor,seat=null){return efficiencyBreakdown(s,floor,seat).total;}
export function weeklyQuests(s,date=s.day){const start=weekStart(date),pool=[...QUESTS].sort((a,b)=>hash(s.seed+start+a.id)-hash(s.seed+start+b.id));return pool.slice(0,3).map(q=>{let count=0;for(let i=0;i<7;i++){const d=addDays(start,i);count+=q.kind==='record'?(s.records[d]?.weight?1:0):(activity(s,d)[q.kind]?1:0);}return {...q,count:Math.min(count,q.target),claimKey:start+':'+q.id};});}
export function candidates(s,date=s.day){
 const value=valuation(s,date);const count=value<7000?1:value<30000?2:3;
 return Array.from({length:count},(_,i)=>{const n=hash(s.seed+date+'candidate'+i)%PEOPLE.length,p=PEOPLE[n],v=rnd(s.seed+date+i+'stars');const star=value>=30000?(v>.6?3:v>.2?2:1):(v>.7?2:1);const id=date+':'+i;return {id,name:p[0],keyword:p[1],floor:p[2],star,fee:star*45,wage:WAGES[star],...appearanceFor(id,s.seed),candidate:true};}).filter(c=>!s.claimed.includes('hire:'+c.id));
}
export function hire(s,c,floor=c.floor){
 if(s.staff.length>=9)throw Error('직원은 최대 9명까지 고용할 수 있어요.');
 if(s.staff.filter(e=>e.floor===floor).length>=3)throw Error('이 부서는 자리가 가득 찼어요.');
 if(s.gold<c.fee)throw Error('채용 준비금이 부족해요. 배당을 모아주세요.');
 if(s.claimed.includes('hire:'+c.id))throw Error('이미 채용한 지원자예요.');
 const id='staff-'+(++s.serial),h=hash(s.seed+c.id);
 const employee={id,name:c.name,keyword:c.keyword,floor,star:c.star,bornStar:c.star,tenure:0,cycle:0,morale:75,strain:0,stats:[0,1,2,3].map(j=>12+c.star*5+hash(h+':'+j)%9),skin:h%6,hair:hash(id+'hair')%5,outfit:hash(id+'outfit')%6,accessory:hash(id+'acc')%4,trait:h%5,left:false,seat:[0,1,2].find(i=>!s.staff.some(e=>e.floor===floor&&e.seat===i)),...appearanceFor(c.id,s.seed)};
 s.staff.push(employee);s.claimed.push('hire:'+c.id);transaction(s,c.name+' 채용',-c.fee);return employee;
}
export function fire(s,id){const e=s.staff.find(x=>x.id===id);if(!e)throw Error('직원을 찾지 못했어요.');const cost=WAGES[e.star]*3;transaction(s,e.name+' 퇴직금',-cost);s.staff=s.staff.filter(x=>x.id!==id);return cost;}
export function moveStaff(s,id,floor){if(![2,3,4].includes(floor))throw Error('업무 부서를 선택해주세요.');if(s.staff.filter(x=>x.floor===floor&&x.id!==id).length>=3)throw Error('해당 층의 세 자리가 모두 찼어요.');const e=s.staff.find(x=>x.id===id);if(!e)throw Error('직원을 찾지 못했어요.');if(e.floor!==floor){e.seat=[0,1,2].find(i=>!s.staff.some(a=>a.floor===floor&&a.seat===i));e.floor=floor;}}
export function buy(s,id,floor=null,slot=0){const a=SHOP.find(a=>a.id===id);if(!a)throw Error('가구를 찾지 못했어요.');if(s.gold<a.price)throw Error('보유 골드가 부족해요.');if(floor!=null&&a.onlyFloor)floor=a.onlyFloor;if(floor!=null){if(!a.allowedFloors.includes(floor))throw Error('이 공간에는 설치할 수 없어요.');if(!Number.isInteger(slot)||slot<0||slot>2)throw Error('자리를 확인해주세요.');if(!a.personal||![2,3,4].includes(floor))slot=0;if(s.inventory.some(i=>i.id===id&&i.equipped&&i.floor===floor&&(i.slot||0)===slot))throw Error('이미 같은 가구가 배치되어 있어요.');}const i={uid:'item-'+(++s.serial),id,floor:null,slot:0,paid:a.price,level:1,skin:1,equipped:false};s.inventory.push(i);if(floor!=null)placeFurniture(s,i.uid,floor,slot);transaction(s,a.name+' 구매',-a.price);return i;}
export function sell(s,uid){const i=s.inventory.find(x=>x.uid===uid);if(!i)throw Error('비품을 찾지 못했어요.');const money=Math.floor(i.paid*.6);s.inventory=s.inventory.filter(x=>x.uid!==uid);transaction(s,SHOP.find(x=>x.id===i.id).name+' 매각',money);return money;}
export function setRecord(s,date,record){
 if(!s.profile)throw Error('먼저 회사를 설립해주세요.');
 if(!/^\d{4}-\d{2}-\d{2}$/.test(date)||Number.isNaN(new Date(date+'T12:00:00Z').getTime())||date>s.day)throw Error('기록 날짜를 확인해주세요.');
 if(!Number.isFinite(record.weight)||record.weight<=0||record.weight>350)throw Error('체중을 0보다 크고 350 이하인 숫자로 입력해주세요.');
 for(const k of ['sleep','calories','muscle','fat'])if(record[k]!=null&&(!Number.isFinite(record[k])||record[k]<0))throw Error('선택 기록은 0 이상의 숫자로 입력해주세요.');
 if(record.sleep>24||record.calories>20000||record.muscle>record.weight||record.fat>record.weight)throw Error('선택 기록의 값을 확인해주세요.');
 s.records[date]={...record,note:String(record.note||'').slice(0,500)};
 let delta=0;for(const l of s.ledger){const revised=dividend(s,l.date,l.roll,l.profile||s.profile);delta+=revised-l.dividend;l.dividend=revised;l.value=valuation(s,l.date,l.roll,l.profile||s.profile);}
 if(delta)transaction(s,'기록 수정 배당 정산',delta);return delta;
}
export function setActivity(s,kind,value,date=s.day){if(!['exercise','walk','rest','habit','movie'].includes(kind))throw Error('알 수 없는 활동이에요.');if(s.ledger.some(x=>x.date===date))throw Error('정산이 끝난 날의 활동은 바꿀 수 없어요.');s.activities[date]={...activity(s,date),[kind]:!!value};}
export function effort(s,date){const a=activity(s,date),q=Object.values(s.questLog||{}).filter(l=>l.completed&&l.date===date);return (a.exercise?1:0)+(a.walk?0.7:0)+(a.habit?0.8:0)+(a.rest?0.5:0)+(a.movie?0.2:0)+(s.records[date]?.weight?0.2:0)+Math.min(3,q.reduce((sum,l)=>sum+(l.category==='general'?.2:.6),0));}
export function claimQuest(s,key){const q=weeklyQuests(s).find(x=>x.claimKey===key);if(!q||q.count<q.target)throw Error('아직 목표를 달성하지 않았어요.');if(s.claimed.includes(key))throw Error('이미 보상을 받았어요.');s.claimed.push(key);transaction(s,'주간 사업: '+q.title,q.reward);}
export function claimDaily(s,id){const done=id==='record'?!!s.records[s.day]?.weight:!!activity(s)[id];const key='daily:'+s.day+':'+id;if(!done)throw Error('먼저 기록을 남겨주세요.');if(s.claimed.includes(key))throw Error('이미 보상을 받았어요.');s.claimed.push(key);transaction(s,'일일 사업 완료',id==='record'?15:25);}
export function acceptInvestor(s,id){const o=INVESTORS.find(x=>x.id===id),key='contract:'+s.day+':'+id;if(!o)throw Error('계약을 찾지 못했어요.');if(s.claimed.includes(key))throw Error('오늘 이미 완료한 계약이에요.');if(o.kind&&!activity(s)[o.kind])throw Error('계약에 필요한 활동을 먼저 기록해주세요.');s.claimed.push(key);s.contracts.push({id,date:s.day});transaction(s,o.name+' 투자금',o.reward);if(id==='temptation')s.staff.forEach(e=>e.morale=Math.min(100,e.morale+5));}
export function settle(s,date=s.day){
 if(!s.profile)throw Error('먼저 회사를 설립해주세요.');if(s.ledger.some(l=>l.date===date))return null;
 const roll=rollFor(s,date),value=valuation(s,date,roll),pay=dividend(s,date,roll),events=[];transaction(s,'일일 배당',pay,date);
 const wages=s.staff.reduce((sum,e)=>sum+WAGES[e.star],0);if(wages)transaction(s,'직원 월급',-wages,date);
 let performance=0;
 for(const e of [...s.staff]){
  const work=effort(s,date)+Math.min(1,Object.values(s.weeklyProgress||{}).filter(ds=>ds.includes(date)).length*.6),a=activity(s,date);let matching=e.floor===2?Number(!!a.exercise)+Number(!!a.walk):e.floor===3?Number(s.records[date]?.calories!=null):Number(!!a.rest)+Number(s.records[date]?.sleep!=null);
  const completed=Object.values(s.questLog||{}).filter(q=>q.completed&&q.date===date);matching+=completed.filter(q=>q.category===(e.floor===2?'exercise':e.floor===3?'diet':'rest')).length;
  const boost=e.trait===0&&s.records[date]?1:e.trait===1&&a.habit?1:e.trait===2&&a.exercise?1:e.trait===3&&a.rest?1:e.trait===4&&a.walk?1:0;
  e.tenure++;e.cycle++;
  e.strain=work>=.5?Math.max(0,e.strain-1.5):e.strain+(work>0?.45:1);
  e.morale=Math.max(5,Math.min(100,e.morale+(work>=.5?3:-2)+(s.gold<0?-5:0)+moraleBonus(s,e.floor,e.seat)*.12+(work>0?e.stats[2]*.015:0)));
  if(e.strain>=3){e.morale=Math.max(5,e.morale-4);if(e.strain<5)events.push(e.name+' 님이 회사의 앞날을 걱정합니다.');}
  if(e.strain>=5&&rnd(e.id+date+'leave')<.28){s.staff=s.staff.filter(x=>x.id!==e.id);events.push(e.name+' 님이 다른 회사를 찾아 떠났습니다.');continue;}
  if(e.strain>=4&&e.star>1&&e.cycle>=2){e.star--;e.stats=e.stats.map(v=>Math.max(3,Math.floor(v*.85)));e.cycle=0;events.push(e.name+' 님이 '+e.star+'성으로 강등되었습니다.');}
  else if(e.cycle>=3&&e.star<5){e.star++;e.cycle=0;const growth=work>0?Math.round((1+matching+boost)*(.6+rnd(e.id+date))):0;e.stats=e.stats.map((v,j)=>v+Math.round(growth*(.5+rnd(e.id+j))*(j===0?1+Math.min(.3,e.stats[0]/300):1)));events.push(e.name+' 님이 '+e.star+'성으로 승진했습니다.');}
  if(work>0){const j=hash(e.id+date)%4;e.stats[j]+=Math.round((work+matching+boost)*(.5+rnd(date+e.id+'growth')));}

 }
 // Operating income is deterministic and itemized below.
 const questSnapshot=receiptQuests(s,date).map(q=>({id:q.id,key:q.key,title:q.title,type:q.type,difficulty:q.difficulty}));
 const operations=operationsPreview(s,date);performance=operations.total;if(performance)transaction(s,'확정 운영 수익',performance,date);for(const row of operations.rows){const person=s.staff.find(e=>e.id===row.id);if(person){person.lastWork={date,...row};events.push(person.name+' · '+row.units+'건 처리 +'+row.total+' G (가구 +'+row.furniture+' G)');}}
 const report={operations,date,roll,value,dividend:pay,wages,performance,events,balance:s.gold,profile:{...s.profile},questSnapshot,activities:{...activity(s,date)}};s.ledger.push(report);s.ledger.sort((a,b)=>a.date.localeCompare(b.date));s.lastClosed=date;return report;
}
export function advance(s){const report=settle(s,s.day);s.day=addDays(s.day,1);return report;}
export function catchUp(s,now=new Date()){if(!s.profile)return 0;const closed=lastClosedDate(s.profile.closeTime,now);let n=0;while(s.day<=closed&&n<400){advance(s);n++;}return n;}
export function makeDemo(day=seoulDate()){
 const start=addDays(day,-14),s=createState({name:'새봄',age:29,height:168,start:79.8,target:70,goalDate:addDays(day,90),mode:'lose',range:1,closeTime:'23:00'},start);s.seed=37119;
 for(let i=0;i<6;i++){const p=PEOPLE[i];s.staff.push({id:'demo-'+i,name:p[0],keyword:p[1],floor:p[2],star:i%2+1,bornStar:i%2+1,tenure:0,cycle:0,morale:75,strain:0,stats:[26+i*2,30+i,23+i*3,22+i],skin:i%4,trait:i%5});}
 for(let i=0;i<14;i++){s.records[s.day]={weight:Math.round((79.8-i*.13+(i%4===0?.2:0))*10)/10,sleep:7+(i%3)*.5,calories:i%3===0?null:1900+i*15,muscle:i%4===0?Math.round((29.8+i*.02)*10)/10:null,fat:i%4===0?Math.round((24-i*.1)*10)/10:null,note:i===6?'주말에는 친구와 맛있는 저녁.':i===12?'조금씩 쌓이는 기록이 좋다.':''};s.activities[s.day]={walk:i%2===0,exercise:i%3===0,habit:true,rest:i%2===1,movie:i===4};advance(s);}
 transaction(s,'샘플 운영자금',3860-s.gold);s.inventory=[{uid:'demo-i1',id:'plant',floor:2,paid:70,level:2,skin:2,slot:0},{uid:'demo-i2',id:'chair',floor:3,paid:160,level:3,skin:3,slot:0},{uid:'demo-i3',id:'clock',floor:4,paid:120,level:2,skin:2,slot:0},{uid:'demo-i4',id:'rug',floor:5,paid:280,level:2,skin:2,slot:0},{uid:'demo-i5',id:'computer',floor:2,paid:300,level:3,skin:3,slot:0},{uid:'demo-i6',id:'pantry',floor:6,paid:200,level:2,skin:2,slot:0}];
 for(const [n,id,floor,slot,level]of [[7,'parasol',6,0,2],[8,'teatable',6,0,2],[9,'flowerbox',6,0,2],[10,'rattan',2,0,3],[11,'mug',2,0,3],[12,'keyboard',2,0,2],[13,'deskplant',3,1,2]])s.inventory.push({uid:'demo-i'+n,id,floor,slot,level,skin:level,paid:SHOP.find(a=>a.id===id).price,equipped:true});
 for(let i=1;i<=6;i++){const date=addDays(day,-i);for(const q of scheduledQuests(s,'daily',date).slice(0,i%3+1)){const key=questKey(q,date),base=DIFFICULTIES[q.difficulty].daily,dice=hash(key)%6+1;s.questLog[key]={key,id:q.id,title:q.title,type:q.type,category:q.category,difficulty:q.difficulty,dice,base,amount:Math.round(base*(1+dice/10)),completed:true,date};}}return migrateState(s);
}

export function undoWeekly(s,id){const q=s.customQuests.find(q=>q.id===id);if(!q)throw Error('일정을 찾지 못했어요.');const key=questKey(q,s.day);if(s.questLog[key]?.completed)return toggleQuest(s,id);const entries=s.weeklyProgress?.[key];if(entries?.length){if(s.ledger.some(l=>l.date===entries.at(-1)))throw Error('결산된 실천은 취소할 수 없어요.');entries.pop();}}
export function pauseToday(s,id){s.pausedDays??={};s.pausedDays[id+':'+s.day]=true;}
export function workSignals(s,date=s.day){const counts={exercise:0,diet:0,rest:0,habit:0,general:0};for(const q of Object.values(s.questLog||{}))if(q.completed&&q.date===date&&!s.weeklyProgress?.[q.key])counts[q.category]=(counts[q.category]||0)+1;for(const [key,entries]of Object.entries(s.weeklyProgress||{})){const q=s.customQuests.find(q=>key.startsWith(q.id+':'));if(q)counts[q.category]=(counts[q.category]||0)+entries.filter(d=>d===date).length;}const a=activity(s,date);counts.exercise+=Number(!!a.exercise)+Number(!!a.walk);counts.rest+=Number(!!a.rest)+Number(!!a.movie);counts.habit+=Number(!!a.habit);counts.diet+=Number(s.records[date]?.calories!=null);return counts;}
export function operationsPreview(s,date=s.day){const signals=workSignals(s,date);const rows=s.staff.map(e=>{const category=e.floor===2?'exercise':e.floor===3?'diet':'rest',units=Math.min(3,signals[category]+Math.min(1,signals.habit)),team=s.staff.filter(p=>p.floor===e.floor),collab=Math.min(.15,team.reduce((v,p)=>v+p.stats[2],0)/1500),base=Math.round(units*(16+e.star*8+e.stats[1]/12)*(1+collab)),furniture=units?Math.ceil(base*efficiencyBonus(s,e.floor,e.seat)):0;return {id:e.id,name:e.name,units,base,furniture,total:base+furniture,category};});return {rows,total:rows.reduce((v,r)=>v+r.total,0),furniture:rows.reduce((v,r)=>v+r.furniture,0)};}
export function projectBook(s){return [ ['exercise','우리 동네 산책 지도','발자국 액자'],['diet','나를 위한 식탁','작은 식탁 배지'],['rest','편안한 쉼 연구','달빛 기념패'] ].map(([category,title,souvenir])=>{const entries=[];for(const [date]of Object.entries(s.records))entries.push(date);for(const q of Object.values(s.questLog||{}))entries.push(q.date);for(const dates of Object.values(s.weeklyProgress||{}))entries.push(...dates);for(const date of Object.keys(s.activities||{}))entries.push(date);const dates=[...new Set(entries)].sort().filter(d=>workSignals(s,d)[category]>0);const staff=s.staff.filter(e=>(e.floor===2?'exercise':e.floor===3?'diet':'rest')===category);const research=staff.length?Math.min(1,Math.floor(staff.reduce((v,e)=>v+e.stats[3],0)/200)):0;const target=5-research;return {category,title,souvenir,dates,target,count:dates.length,completed:Math.floor(dates.length/target),progress:dates.length%target};});}
