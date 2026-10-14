/* Standalone portfolio. Every operational DEMO record is fictional. */
'use strict';
const $ = id => document.getElementById(id);
const I = window.portfolioI18n;
const fmt = (value, decimals = 0) => new Intl.NumberFormat(I.locale, {minimumFractionDigits:decimals,maximumFractionDigits:decimals}).format(value);
const dateLabel = value => new Intl.DateTimeFormat(I.locale,{dateStyle:'medium'}).format(new Date(value+'T12:00:00'));
const D = window.DEMO;
const option = (value,label) => {const element=document.createElement('option');element.value=value;element.textContent=label;return element;};
const text = (tag,value,className='') => {const element=document.createElement(tag);element.textContent=value;element.className=className;return element;};
['fleet-group','fleet-covered','fleet-coverage','fleet-chart','balance-node','balance-in','balance-out','balance-diff','balance-chart','balance-explanation','tolerance-label','overfill-table','overfill-count','overfill-blind','quality-list','tank-time-label','tank-viz','tank-trend','present','theme-toggle'].forEach(id => $(id).setAttribute('data-i18n-live',''));

function bars(target,rows,max) {
  const root=$(target); root.replaceChildren();
  for(const row of rows) {
    const wrap=document.createElement('div');wrap.className='bar-row';wrap.append(text('span',row.label));
    const track=document.createElement('div');track.className='bar-track';
    const fill=document.createElement('div');fill.className='bar-fill';fill.style.setProperty('--value',(max?Math.min(100,row.value/max*100):0)+'%');
    track.append(fill);wrap.append(track,text('span',fmt(row.value)+(row.unit||''),'bar-value'));root.append(wrap);
  }
}
function renderFleet() {
  const group=$('fleet-group').value||'all';
  $('fleet-group').replaceChildren(option('all',I.t('allGroups')),...D.groups.map(value=>option(value,value)));$('fleet-group').value=group;
  const rows=D.fleet.filter(row=>group==='all'||row.group===group);
  const covered=rows.reduce((sum,row)=>sum+row.inspected,0),total=rows.reduce((sum,row)=>sum+row.total,0);
  $('fleet-covered').textContent=fmt(covered)+' / '+fmt(total);$('fleet-coverage').textContent=total?fmt(Math.round(covered/total*100))+'%':'—';
  bars('fleet-chart',rows.map(row=>({label:row.group.replace('DEMO_',''),value:row.inspected,unit:I.t('equipmentUnit')})),Math.max(...rows.map(row=>row.total)));
}
$('fleet-group').addEventListener('change',renderFleet);
$('balance-node').append(...D.balances.map(row=>option(row.node,row.node)));
function renderBalance() {
  const balance=D.balances.find(row=>row.node===$('balance-node').value),difference=balance.received-balance.delivered;
  $('balance-in').textContent=fmt(balance.received)+' L';$('balance-out').textContent=fmt(balance.delivered)+' L';$('balance-diff').textContent=fmt(difference)+' L';
  bars('balance-chart',[{label:I.t('receipt'),value:balance.received,unit:' L'},{label:I.t('delivery'),value:balance.delivered,unit:' L'}],Math.max(balance.received,balance.delivered));
  const percentage=balance.received?I.t('receiptPercentage',{value:fmt(difference/balance.received*100,1)}):'';
  $('balance-explanation').textContent=I.t('balanceExplanation',{difference:fmt(difference),percentage});
}
$('balance-node').addEventListener('change',renderBalance);
function renderOverfill() {
  const tolerance=Number($('tolerance').value);$('tolerance-label').textContent=fmt(tolerance)+'%';$('tolerance').setAttribute('aria-valuetext',fmt(tolerance)+'%');
  let count=0,blind=0;const body=$('overfill-table');body.replaceChildren();
  for(const event of D.overfill) {
    const missing=event.sfl===null||event.sfl<=0,alert=!missing&&event.volume>event.sfl*(1+tolerance/100);
    if(alert)count++;if(missing)blind++;
    const row=document.createElement('tr');row.append(text('td',event.equipment),text('td',fmt(event.volume)+' L'),text('td',missing?I.t('missingSfl'):fmt(event.sfl)+' L'),text('td',I.t(missing?'reviewMaster':alert?'aboveThreshold':'withinThreshold'),missing?'status-blind':alert?'status-alert':'status-ok'));body.append(row);
  }
  $('overfill-count').textContent=fmt(count);$('overfill-blind').textContent=fmt(blind);
}
$('tolerance').addEventListener('input',renderOverfill);
function renderQuality() {
  const root=$('quality-list');root.replaceChildren();
  for(const issue of D.quality.filter(row=>$('issue-filter').value==='all'||row.family===$('issue-filter').value)) {
    const article=document.createElement('article');article.append(text('h4',I.t(issue.issue)),text('p',I.t(issue.description)),text('span',fmt(issue.count),'issue-count'));root.append(article);
  }
}
$('issue-filter').addEventListener('change',renderQuality);
$('tank-time').max=D.dates.length-1;
function renderTanks() {
  const index=Number($('tank-time').value),date=dateLabel(D.dates[index]);$('tank-time-label').textContent=date;$('tank-time').setAttribute('aria-valuetext',date);
  const root=$('tank-viz');root.replaceChildren();
  for(const item of D.tanks) {
    const article=document.createElement('div');article.className='tank-item';const tank=document.createElement('div');tank.className='tank';
    const level=document.createElement('div');level.className='tank-level';level.style.setProperty('--level',(item.history[index]/item.capacity*100)+'%');
    tank.append(level,text('span',fmt(item.history[index])+' L','tank-value'));
    const name=item.name==='DEMO - Main Tank'?I.t('mainTank'):item.name==='DEMO - Virtual Tank'?I.t('virtualTank'):item.name;
    article.append(tank,text('strong',name),text('small',I.t('capacity',{value:fmt(item.capacity)})));root.append(article);
  }
  const values=D.tanks[0].history,expected=D.hmi.map(row=>row.calculated),range=Math.max(...expected)-Math.min(...values),max=Math.max(...expected)+range*.12,min=Math.min(...values)-range*.12;
  const y=value=>70-(value-min)/(max-min)*55,points=values.map((value,i)=>`${10+i/(values.length-1)*480},${y(value)}`).join(' ');
  const ns='http://www.w3.org/2000/svg',svg=document.createElementNS(ns,'svg');svg.setAttribute('viewBox','0 0 500 80');svg.setAttribute('role','img');svg.setAttribute('aria-label',I.t('trendLabel',{date}));
  const path=document.createElementNS(ns,'polyline');path.setAttribute('points',points);path.setAttribute('fill','none');path.setAttribute('stroke','var(--teal)');path.setAttribute('stroke-width','2');
  const dot=document.createElementNS(ns,'circle');dot.setAttribute('cx',10+index/(values.length-1)*480);dot.setAttribute('cy',y(values[index]));dot.setAttribute('r','4');dot.setAttribute('fill','var(--ink)');
  const calculated=document.createElementNS(ns,'polyline');calculated.setAttribute('points',expected.map((value,i)=>`${10+i/(values.length-1)*480},${y(value)}`).join(' '));calculated.setAttribute('fill','none');calculated.setAttribute('stroke','var(--chart-secondary)');calculated.setAttribute('stroke-width','2');calculated.setAttribute('stroke-dasharray','5 4');
  svg.append(calculated,path,dot);$('tank-trend').replaceChildren(svg,text('p',I.t('trendExplanation',{value:fmt(D.hmi[index].measured-D.hmi[index].calculated)}),'demo-note'));
}
$('tank-time').addEventListener('input',renderTanks);
function renderDemos(){renderFleet();renderBalance();renderOverfill();renderQuality();renderTanks();}
renderDemos();

const scenes=[...document.querySelectorAll('.scene')];let presenting=false,current=0;
const scenePosition=index=>String(index+1).padStart(2,'0')+' / '+scenes.length;
scenes.forEach((scene,index)=>{const number=scene.querySelector('.section-number');if(number)number.textContent=String(index+1).padStart(2,'0');const position=scene.querySelector('.scene-position');if(position)position.textContent=scenePosition(index);});
$('position').textContent=scenePosition(0);
function updatePresentationLabels() {
  const button=$('present'),label=I.t(presenting?'presentationExit':'presentationStart');button.querySelector('.present-label').textContent=label;button.querySelector('.present-icon').textContent=presenting?'×':'↗';button.setAttribute('aria-label',label);button.setAttribute('title',label);
  document.title=presenting?scenes[current].dataset.title+' · José David Gómez':I.t('José David Gómez · Datos y operaciones');
}
function activeScene(index) {
  current=Math.max(0,Math.min(scenes.length-1,index));for(let i=0;i<scenes.length;i++)scenes[i].classList.toggle('active',i===current);
  $('position').textContent=scenePosition(current);updatePresentationLabels();$('previous').disabled=current===0;$('next').disabled=current===scenes.length-1;$('progress-bar').style.width=((current+1)/scenes.length*100)+'%';
  if(presenting){scenes[current].scrollTop=0;history.replaceState(null,'','#'+scenes[current].id);}
}
function togglePresentation(force) {
  presenting=typeof force==='boolean'?force:!presenting;if(presenting){const hash=location.hash.slice(1);current=Math.max(0,scenes.findIndex(scene=>scene.id===hash));}
  document.body.classList.toggle('presenting',presenting);$('present').setAttribute('aria-pressed',String(presenting));activeScene(current);if(!presenting)scenes[current].scrollIntoView({behavior:'instant'});
}
$('present').addEventListener('click',()=>togglePresentation());$('exit-present').addEventListener('click',()=>togglePresentation(false));$('previous').addEventListener('click',()=>activeScene(current-1));$('next').addEventListener('click',()=>activeScene(current+1));
document.addEventListener('keydown',event=>{
  if(!presenting)return;if(event.key==='Escape'){togglePresentation(false);return;}if(/INPUT|SELECT|TEXTAREA|BUTTON/.test(document.activeElement.tagName))return;
  if(['ArrowRight','ArrowDown','PageDown',' '].includes(event.key)){event.preventDefault();activeScene(current+1);}if(['ArrowLeft','ArrowUp','PageUp'].includes(event.key)){event.preventDefault();activeScene(current-1);}if(event.key==='Home')activeScene(0);if(event.key==='End')activeScene(scenes.length-1);
});
document.querySelectorAll('a[href^="#"]').forEach(anchor=>anchor.addEventListener('click',event=>{if(presenting){const index=scenes.findIndex(scene=>'#'+scene.id===anchor.getAttribute('href'));if(index>=0){event.preventDefault();activeScene(index);}}}));
const observer=new IntersectionObserver(entries=>{if(presenting)return;for(const entry of entries)if(entry.isIntersecting){current=scenes.indexOf(entry.target);$('progress-bar').style.width=((current+1)/scenes.length*100)+'%';}},{threshold:.4});scenes.forEach(scene=>observer.observe(scene));
document.addEventListener('portfolio:languagechange',()=>{renderDemos();updatePresentationLabels();});
updatePresentationLabels();
