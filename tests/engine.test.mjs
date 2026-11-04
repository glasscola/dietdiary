import test from 'node:test';
import assert from 'node:assert/strict';
import * as E from '../web/engine.mjs';
const profile={name:'검사',age:30,height:170,start:80,target:70,mode:'lose',range:1,closeTime:'23:00',goalDate:'2027-01-01'};
function fresh(){const s=E.createState({...profile},'2026-10-01');s.seed=12345;return s;}
test('empty company and date-boundary calculations',()=>{
 const s=fresh();assert.equal(s.staff.length,0);assert.equal(s.gold,500);assert.equal(E.weekStart('2026-10-11'),'2026-10-05');assert.equal(E.weekStart('2026-10-12'),'2026-10-12');
 assert.equal(E.lastClosedDate('23:00',new Date('2026-10-10T13:59:00Z')),'2026-10-09');
 assert.equal(E.lastClosedDate('23:00',new Date('2026-10-10T14:00:00Z')),'2026-10-10');
});
test('valuation affects future dividend, never directly removes existing gold',()=>{
 const s=fresh();E.setRecord(s,s.day,{weight:79});const high=E.valuation(s);assert.equal(s.gold,500);
 E.setRecord(s,s.day,{weight:81});assert.ok(E.valuation(s)<high);assert.equal(s.gold,500);
 const r=E.advance(s);assert.equal(s.gold,500+r.dividend);assert.equal(s.day,'2026-10-02');
});
test('dividend is credited before salary and settlement is idempotent',()=>{
 const s=fresh(),c=E.candidates(s)[0];E.hire(s,c,2);const before=s.gold;const r=E.settle(s);assert.equal(s.gold,before+r.dividend-r.wages+r.performance);
 const chronological=[...s.transactions].reverse();assert.ok(chronological.findIndex(t=>t.label==='일일 배당')<chronological.findIndex(t=>t.label==='직원 월급'));
 const gold=s.gold;assert.equal(E.settle(s),null);assert.equal(s.gold,gold);
});
test('historical correction recovers only delta, can create debt, retains RNG, hires, furniture',()=>{
 const s=fresh();E.setRecord(s,s.day,{weight:70});E.advance(s);const paid=s.ledger[0].dividend,roll=structuredClone(s.ledger[0].roll);
 E.hire(s,E.candidates(s)[0],2);E.buy(s,'plant',2);s.gold=0;const staffId=s.staff[0].id,item=s.inventory[0].uid;
 const delta=E.setRecord(s,'2026-10-01',{weight:80});assert.ok(delta<0);assert.equal(delta,s.ledger[0].dividend-paid);assert.equal(s.gold,delta);assert.ok(s.gold<0);
 assert.deepEqual(s.ledger[0].roll,roll);assert.equal(s.staff[0].id,staffId);assert.equal(s.inventory[0].uid,item);
 assert.equal(E.setRecord(s,'2026-10-01',{weight:80}),0);assert.equal(s.gold,delta);
});
test('goal change affects future settlement; correction uses original day goal',()=>{
 const s=fresh();E.setRecord(s,s.day,{weight:79});E.advance(s);const before=s.ledger[0].dividend;s.profile.target=60;
 assert.equal(E.setRecord(s,'2026-10-01',{weight:79}),0);assert.equal(s.ledger[0].dividend,before);
 E.advance(s);assert.equal(s.ledger[1].profile.target,60);
});
test('time unlocks promotion approval without invented ability growth',()=>{
 const s=fresh();E.hire(s,E.candidates(s)[0],2);const e=s.staff[0];e.star=1;const stats=[...e.stats];for(let i=0;i<3;i++)E.advance(s);
 assert.equal(e.star,1);assert.ok(e.promotionReady);E.promote(s,e.id);assert.equal(e.star,2);assert.deepEqual(e.stats,stats);assert.equal(s.staff.length,1);assert.equal(e.strain,0);
});
test('active habits grow skills; demoted employee can return to 5 stars',()=>{
 const s=fresh();E.hire(s,E.candidates(s)[0],2);const e=s.staff[0];e.star=5;e.cycle=2;e.strain=3.5;e.stats=[100,100,100,100];s.journal[s.day]={note:"오늘은 활동하지 않음"};E.advance(s);
 assert.equal(e.star,4);assert.ok(e.stats.every(v=>v<100));for(let i=0;i<3;i++){E.setActivity(s,'exercise',true);E.setActivity(s,'habit',true);E.advance(s);}
 E.promote(s,e.id);assert.equal(e.star,5);assert.ok(e.stats.some(v=>v>85));assert.ok(e.strain<3);
});
test('furniture bonus and sale, finite slots, severance',()=>{
 const s=fresh();s.gold=10000;E.buy(s,'chair',2);assert.equal(E.moraleBonus(s,2,0),3);assert.throws(()=>E.buy(s,'chair',2));assert.equal(E.sell(s,s.inventory[0].uid),60);assert.equal(E.moraleBonus(s,2),0);
 for(let i=0;i<3;i++){const p=E.PEOPLE[i];E.hire(s,{id:'test'+i,name:p[0],keyword:p[1],star:1,fee:45},2);}assert.throws(()=>E.hire(s,{id:'overflow',name:'검사',keyword:'의지',star:1,fee:45},2));
 const before=s.gold,id=s.staff[0].id;assert.equal(E.fire(s,id),24);assert.equal(s.gold,before-24);assert.equal(s.staff.length,2);
});
test('quest and investor claims cannot be repeated; contract consequence lasts 3 days',()=>{
 const s=fresh();E.setRecord(s,s.day,{weight:80});E.claimDaily(s,'record');assert.throws(()=>E.claimDaily(s,'record'));
 for(let i=0;i<7;i++)for(const kind of ['exercise','walk','habit','rest','movie'])E.setActivity(s,kind,true,E.addDays(E.weekStart(s.day),i));
 for(const q of E.weeklyQuests(s))if(q.count>=q.target){E.claimQuest(s,q.claimKey);assert.throws(()=>E.claimQuest(s,q.claimKey));}
 const normal=E.dividend(s,E.addDays(s.day,1),{factor:1});E.acceptInvestor(s,'temptation');assert.throws(()=>E.acceptInvestor(s,'temptation'));
 assert.ok(E.dividend(s,E.addDays(s.day,1),{factor:1})<normal);assert.equal(E.dividend(s,E.addDays(s.day,4),{factor:1}),normal);
});
test('optional records stay absent, invalid numbers rejected, plateau in maintenance is valid',()=>{
 const s=fresh();assert.throws(()=>E.setRecord(s,s.day,{weight:NaN}));assert.throws(()=>E.setRecord(s,s.day,{weight:80,sleep:25}));assert.throws(()=>E.setRecord(s,s.day,{weight:80,muscle:81}));
 E.setRecord(s,s.day,{weight:80});assert.equal(s.records[s.day].muscle,undefined);s.profile.mode='maintain';s.profile.target=80;const value=E.valuation(s,s.day,{factor:1});E.advance(s);E.setRecord(s,s.day,{weight:80});assert.ok(E.valuation(s,s.day,{factor:1})>=value);
});
test('demo is deterministic and supports long-term catch-up with no double processing',()=>{
 const a=E.makeDemo('2026-10-10'),b=E.makeDemo('2026-10-10');assert.deepEqual(a,b);assert.equal(a.staff.length,6);assert.equal(Object.keys(a.records).length,14);
 const s=fresh();const n=E.catchUp(s,new Date('2026-10-04T14:10:00Z'));assert.equal(n,4);assert.equal(s.day,'2026-10-05');assert.equal(E.catchUp(s,new Date('2026-10-04T14:10:00Z')),0);
});
