/* Historical portfolio gallery. Images retain their original language and pixels. */
(function () {
 'use strict';
 const section=document.getElementById('trabajos'),I=window.portfolioI18n;
 if(!section||!I)return;
 const defaultItems=[
  {id:'cotecmar-echosounder',company:'cotecmar',src:'assets/history-cotecmar-echosounder.png',width:960,height:1280,title:{es:'Monitor de ecosonda',en:'Echo sounder monitor'},caption:{es:'Interfaz naval. Participación frontend dentro de un equipo interdisciplinario.',en:'Naval interface. Frontend contribution within an interdisciplinary team.'},alt:{es:'Fotografía original de una pantalla de monitoreo de ecosonda.',en:'Original photograph of an echo sounder monitoring screen.'},source:{es:'Fotografía original del trabajo en COTECMAR',en:'Original photograph of work at COTECMAR'}},
  {id:'cotecmar-device-monitor',company:'cotecmar',src:'assets/history-cotecmar-device-monitor.png',width:960,height:1280,title:{es:'Señales de dispositivos',en:'Device signals'},caption:{es:'Vista de señales y estados. Participación frontend colaborativa.',en:'Signals and status view. Collaborative frontend contribution.'},alt:{es:'Fotografía original de una interfaz naval de monitoreo de dispositivos.',en:'Original photograph of a naval device monitoring interface.'},source:{es:'Fotografía original del trabajo en COTECMAR',en:'Original photograph of work at COTECMAR'}},
  {id:'cotecmar-alarm-system',company:'cotecmar',src:'assets/history-cotecmar-alarm-system.jpg',width:3840,height:2160,title:{es:'Monitoreo de alarmas',en:'Alarm monitoring'},caption:{es:'Pantalla de seguimiento de alarmas. Participación frontend en equipo interdisciplinario.',en:'Alarm monitoring screen. Frontend contribution in an interdisciplinary team.'},alt:{es:'Fotografía original de una pantalla naval de monitoreo de alarmas.',en:'Original photograph of a naval alarm monitoring screen.'},source:{es:'Fotografía original del trabajo en COTECMAR',en:'Original photograph of work at COTECMAR'}},
  {id:'cotecmar-navigation',company:'cotecmar',src:'assets/history-cotecmar-navigation.jpg',width:3840,height:2160,title:{es:'Indicadores de navegación',en:'Navigation indicators'},caption:{es:'Interfaz de indicadores navales. Participación frontend colaborativa.',en:'Naval indicator interface. Collaborative frontend contribution.'},alt:{es:'Fotografía original de una interfaz naval con indicadores de navegación.',en:'Original photograph of a naval interface with navigation indicators.'},source:{es:'Fotografía original del trabajo en COTECMAR',en:'Original photograph of work at COTECMAR'}}
 ];
 const companies={biofilm:'Biofilm',stip:'STIP',taghleef:'Taghleef',cotecmar:'COTECMAR'};
 const supplied=Array.isArray(window.historyPortfolioItems)?window.historyPortfolioItems:defaultItems;
 const field=(value,fallback)=>typeof value==='string'?{es:value,en:value}:{es:value?.es||fallback,en:value?.en||value?.es||fallback};
 const records=supplied.filter(item=>item&&companies[item.company]&&typeof item.src==='string'&&/^(?:\.\/)?assets\//.test(item.src)).map((item,index)=>({
  ...item,id:String(item.id||'item-'+index).replace(/[^a-zA-Z0-9_-]/g,'-'),
  title:field(item.title,companies[item.company]),caption:field(item.caption,''),alt:field(item.alt,companies[item.company]),source:field(item.source,''),
  width:Number(item.width)>0?Number(item.width):1200,height:Number(item.height)>0?Number(item.height):800
 }));
 const messages={
  'history.sceneTitle':{es:'Trabajos anteriores',en:'Earlier work'},
  'history.eyebrow':{es:'TRABAJOS ANTERIORES',en:'EARLIER WORK'},
  'history.title':{es:'Proyectos y trabajos de etapas anteriores',en:'Projects and work from earlier roles'},
  'history.intro':{es:'Fotografías e interfaces originales de mi experiencia en producción, mantenimiento y desarrollo frontend naval.',en:'Original photographs and interfaces from my experience in production, maintenance and naval frontend development.'},
  'history.teamNote':{es:'En COTECMAR participé en el frontend dentro de un equipo interdisciplinario.',en:'At COTECMAR, I contributed to frontend development within an interdisciplinary team.'},
  'history.filterLabel':{es:'Filtrar trabajos por empresa',en:'Filter work by company'},
  'history.galleryLabel':{es:'Galería de trabajos anteriores. Desplázate para ver más imágenes.',en:'Earlier work gallery. Scroll to view more images.'},
  'history.all':{es:'Todos',en:'All'},
  'history.link':{es:'Ver imágenes de mis trabajos ↗',en:'View images of my work ↗'},
  'history.empty':{es:'No hay imágenes en esta selección.',en:'There are no images in this selection.'},
  'history.count':{es:'{count} imágenes en esta selección',en:'{count} images in this selection'},
  'history.countOne':{es:'1 imagen en esta selección',en:'1 image in this selection'},
  'history.enlarge':{es:'Ampliar',en:'Enlarge'},
  'history.zoomLabel':{es:'Ampliar: {title}',en:'Enlarge: {title}'},
  'history.close':{es:'Cerrar imagen ampliada',en:'Close enlarged image'},
  'history.closeText':{es:'Cerrar',en:'Close'},
  'history.imageLanguage':{es:'La imagen original conserva su idioma. El título y la descripción siguen el idioma seleccionado.',en:'The original image keeps its language. The title and description follow the selected language.'},
  'history.footer':{es:'PRODUCCIÓN / MANTENIMIENTO / FRONTEND NAVAL',en:'PRODUCTION / MAINTENANCE / NAVAL FRONTEND'},
  'history.role.biofilm':{es:'Biofilm · Producción',en:'Biofilm · Production'},
  'history.role.stip':{es:'STIP · Ingeniería y mantenimiento',en:'STIP · Engineering and maintenance'},
  'history.role.taghleef':{es:'Taghleef · Producción y trazabilidad',en:'Taghleef · Production and traceability'},
  'history.role.cotecmar':{es:'COTECMAR · Participación frontend colaborativa',en:'COTECMAR · Collaborative frontend contribution'}
 };
 for(const record of records)for(const name of ['title','caption','alt','source'])messages['history.item.'+record.id+'.'+name]=record[name];
 I.add(messages);
 const key=(record,name)=>'history.item.'+record.id+'.'+name;
 const make=(tag,className)=>{const element=document.createElement(tag);if(className)element.className=className;return element;};
 const translated=(tag,className,textKey)=>{const element=make(tag,className);element.dataset.i18n=textKey;element.textContent=I.t(textKey);return element;};
 const grid=section.querySelector('#history-grid'),viewport=section.querySelector('.history-viewport'),count=section.querySelector('#history-count'),empty=section.querySelector('#history-empty');
 const filters=[...section.querySelectorAll('[data-history-company]')];
 const cards=[];let filter='all',activeRecord=null,previousFocus=null;
 const dialog=make('dialog','history-dialog');dialog.id='history-dialog';dialog.setAttribute('aria-labelledby','history-dialog-title');dialog.setAttribute('aria-describedby','history-dialog-caption');
 const header=make('div','history-dialog-header'),title=make('h2','history-dialog-title');title.id='history-dialog-title';
 const close=make('button','history-dialog-close');close.type='button';close.dataset.i18nAriaLabel='history.close';close.append(translated('span','','history.closeText'));
 const closeSymbol=make('span','history-close-symbol');closeSymbol.textContent='×';closeSymbol.setAttribute('aria-hidden','true');close.append(closeSymbol);header.append(title,close);
 const figure=make('figure','history-dialog-figure'),image=make('img','history-dialog-image');image.decoding='async';
 const copy=make('figcaption','history-dialog-copy'),company=make('p','history-dialog-company'),caption=make('p','history-dialog-caption'),source=make('p','history-dialog-source');caption.id='history-dialog-caption';
 copy.append(company,caption,source,translated('p','history-dialog-language-note','history.imageLanguage'));figure.append(image,copy);dialog.append(header,figure);document.body.append(dialog);
 function updateDialog() {
  if(!activeRecord)return;
  title.textContent=I.t(key(activeRecord,'title'));caption.textContent=I.t(key(activeRecord,'caption'));source.textContent=I.t(key(activeRecord,'source'));source.hidden=!source.textContent;
  company.textContent=I.t('history.role.'+activeRecord.company);image.src=activeRecord.src;image.alt=I.t(key(activeRecord,'alt'));image.width=activeRecord.width;image.height=activeRecord.height;
 }
 function openDialog(record,trigger) {activeRecord=record;previousFocus=trigger;updateDialog();if(!dialog.open)dialog.showModal();close.focus({preventScroll:true});}
 const closeDialog=()=>{if(dialog.open)dialog.close();};
 close.addEventListener('click',closeDialog);
 dialog.addEventListener('cancel',event=>{event.preventDefault();closeDialog();});
 dialog.addEventListener('keydown',event=>event.stopPropagation());
 dialog.addEventListener('close',()=>{if(previousFocus?.isConnected)previousFocus.focus({preventScroll:true});});
 dialog.addEventListener('click',event=>{if(event.target!==dialog)return;const rect=dialog.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)closeDialog();});
 for(const record of records) {
  const card=make('article','history-card');card.dataset.historyCompany=record.company;
  const button=make('button','history-image-button');button.type='button';
  const thumbnail=make('img','history-image');thumbnail.src=record.src;thumbnail.loading='lazy';thumbnail.decoding='async';thumbnail.width=record.width;thumbnail.height=record.height;thumbnail.dataset.i18nAlt=key(record,'alt');thumbnail.alt=I.t(key(record,'alt'));
  const enlarge=make('span','history-enlarge'),symbol=make('span','history-enlarge-symbol');symbol.textContent='↗';symbol.setAttribute('aria-hidden','true');enlarge.append(translated('span','','history.enlarge'),symbol);button.append(thumbnail,enlarge);
  button.addEventListener('click',()=>openDialog(record,button));
  card.append(button,translated('p','history-card-company','history.role.'+record.company),translated('h3','',key(record,'title')),translated('p','history-card-caption',key(record,'caption')));
  if(record.source.es||record.source.en)card.append(translated('p','history-card-source',key(record,'source')));
  grid.append(card);cards.push({record,card,button});
 }
 function updateCount() {const shown=cards.filter(({record})=>filter==='all'||record.company===filter).length;count.textContent=I.t(shown===1?'history.countOne':'history.count',{count:shown});empty.hidden=shown>0;}
 function updateLanguage() {for(const {record,button} of cards)button.setAttribute('aria-label',I.t('history.zoomLabel',{title:I.t(key(record,'title'))}));updateCount();if(dialog.open)updateDialog();}
 for(const button of filters)button.addEventListener('click',()=>{filter=button.dataset.historyCompany;for(const item of filters)item.setAttribute('aria-pressed',String(item===button));for(const {record,card} of cards)card.hidden=filter!=='all'&&record.company!==filter;viewport.scrollTop=0;updateCount();});
 viewport.addEventListener('keydown',event=>{if(['ArrowDown','ArrowUp','PageDown','PageUp','Home','End',' '].includes(event.key))event.stopPropagation();});
 I.refresh(section);I.refresh(dialog);updateLanguage();
 document.addEventListener('portfolio:languagechange',updateLanguage);
})();
