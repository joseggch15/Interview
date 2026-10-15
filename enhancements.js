/* Verified public repositories and screenshots of the original software using synthetic data. */
(function () {
 'use strict';
 const I = window.portfolioI18n;
 I.add({
  'github.sceneTitle':{es:'GitHub y desarrollo',en:'GitHub and development'},
  'github.eyebrow':{es:'GITHUB · DESARROLLO EN PRÁCTICA',en:'GITHUB · DEVELOPMENT IN PRACTICE'},
  'github.title':{es:'Más proyectos,<br>la misma curiosidad',en:'More projects,<br>the same curiosity'},
  'github.intro':{es:'Mi perfil público JoseGCH reúne proyectos para explorar interfaces, visualización y desarrollo web. Estos repositorios complementan mi experiencia en datos y operaciones.',en:'My public profile JoseGCH brings together projects exploring interfaces, visualization and web development. These repositories complement my data and operations experience.'},
  'github.profile':{es:'Ver perfil joseggch15 ↗',en:'View joseggch15’s profile ↗'},
  'github.hmi.category':{es:'VISUALIZACIÓN DE PROCESOS',en:'PROCESS VISUALIZATION'},
  'github.hmi.description':{es:'HMI web de silos para explorar balances de masa con datos simulados directamente en el navegador.',en:'A browser-based silo HMI for exploring mass balances with simulated data.'},
  'github.hmi.tagBalance':{es:'Balance de masa',en:'Mass balance'},
  'github.hmi.tagData':{es:'Datos simulados',en:'Simulated data'},
  'github.react.category':{es:'DESARROLLO DE INTERFACES',en:'INTERFACE DEVELOPMENT'},
  'github.react.description':{es:'Proyecto de interfaz web con componentes React y navegación mediante React Router.',en:'A web interface project using React components and navigation with React Router.'},
  'github.astro.category':{es:'PORTAFOLIO WEB',en:'WEB PORTFOLIO'},
  'github.astro.description':{es:'Exploración de un portafolio personal con Astro y estilos utilitarios de Tailwind CSS.',en:'An exploration of a personal portfolio with Astro and Tailwind CSS utility styles.'},
  'github.repository':{es:'Explorar repositorio ↗',en:'Explore repository ↗'},
  'github.hmi.link':{es:'Explorar el repositorio hmisilos en GitHub',en:'Explore the hmisilos repository on GitHub'},
  'github.react.link':{es:'Explorar el repositorio ReactCoderHouseProyectoFinal en GitHub',en:'Explore the ReactCoderHouseProyectoFinal repository on GitHub'},
  'github.astro.link':{es:'Explorar el repositorio MyPortafolioWithAstro en GitHub',en:'Explore the MyPortafolioWithAstro repository on GitHub'},
  'github.note':{es:'Selección basada en el README y los archivos de configuración públicos de estos repositorios. Las tecnologías indican herramientas utilizadas en los proyectos.',en:'Selection based on these repositories’ public READMEs and configuration files. Technologies indicate tools used in the projects.'},
  'github.footer':{es:'CÓDIGO PÚBLICO / INTERFACES / APRENDIZAJE',en:'PUBLIC CODE / INTERFACES / LEARNING'},
  'capture.badge':{es:'SOFTWARE REAL · DATOS SINTÉTICOS',en:'REAL SOFTWARE · SYNTHETIC DATA'},
  'capture.note':{es:'Captura de la aplicación original funcionando con datos 100% ficticios. Selecciona la imagen para ampliarla.',en:'Screenshot of the original application running with 100% fictional data. Select the image to enlarge it.'},
  'capture.zoom':{es:'Ampliar captura de {project}',en:'Enlarge screenshot of {project}'},
  'capture.enlarge':{es:'Ampliar ↗',en:'Enlarge ↗'},
  'capture.interactive':{es:'Explorar ejemplo interactivo',en:'Explore interactive example'},
  'capture.interactiveNote':{es:'Recreación interactiva simplificada para explicar la lógica del proyecto. La captura superior corresponde al software original.',en:'A simplified interactive recreation explaining the project’s logic. The screenshot above shows the original software.'},
  'capture.close':{es:'Cerrar imagen ampliada',en:'Close enlarged image'},
  'capture.closeText':{es:'Cerrar',en:'Close'},
  'capture.dialogTitle':{es:'{project} · captura del software',en:'{project} · software screenshot'},
  'capture.dialogNote':{es:'Entorno de demostración. Los nombres, grupos, identificadores y valores operativos son ficticios.',en:'Demonstration environment. Names, groups, identifiers and operational values are fictional.'},
  'capture.process':{es:'Diagrama de proceso',en:'Process diagram'},
  'capture.trend':{es:'Vista de tendencias',en:'Trend view'},
  'capture.views':{es:'Vistas de HMI Tank',en:'HMI Tank views'},
  'capture.fleet.alt':{es:'Fleet Maintenance: interfaz original de seguimiento de inspecciones con datos ficticios.',en:'Fleet Maintenance: original inspection-tracking interface with fictional data.'},
  'capture.intake.alt':{es:'Intake vs Delivery: interfaz original de conciliación de ingresos y entregas con datos ficticios.',en:'Intake vs Delivery: original receipts and deliveries reconciliation interface with fictional data.'},
  'capture.overfill.alt':{es:'Overfill SFL Spy: interfaz original de revisión de volúmenes y nivel seguro de llenado con datos ficticios.',en:'Overfill SFL Spy: original volume and safe-fill-level review interface with fictional data.'},
  'capture.sweeper.alt':{es:'Sweeper & Mop: interfaz original de revisión de calidad de datos con registros ficticios.',en:'Sweeper & Mop: original data quality review interface with fictional records.'},
  'capture.hmi.alt':{es:'HMI Tank: diagrama de proceso del software original con niveles y movimientos ficticios.',en:'HMI Tank: original software process diagram with fictional levels and movements.'},
  'capture.hmiTrend.alt':{es:'HMI Tank: vista de tendencias del software original con lecturas históricas ficticias.',en:'HMI Tank: original software trend view with fictional historical readings.'},
  'capture.closing':{es:'Las capturas de las cinco aplicaciones de análisis operativo muestran el software original funcionando con datos 100% sintéticos. Los ejemplos interactivos son recreaciones simplificadas. La galería histórica muestra fotografías e interfaces reales de cargos anteriores. No se publican bases operativas ni código privado.',en:'Screenshots of the five operational-analysis applications show the original software running with 100% synthetic data. Interactive examples are simplified recreations. The historical gallery shows real photographs and interfaces from previous roles. No operational databases or private code are published.'},
  'capture.action':{es:'Recorrer el software y las capturas ↗',en:'Explore the software and screenshots ↗'}
 });
 const projects = [
  {id:'fleet',name:'Fleet Maintenance'},
  {id:'intake',name:'Intake vs Delivery'},
  {id:'overfill',name:'Overfill SFL Spy'},
  {id:'sweeper',name:'Sweeper & Mop'},
  {id:'hmi',name:'HMI Tank'}
 ];
 const captures = [];
 let activeCapture = null;
 let previousFocus = null;
 const element = (tag,className,text) => {const node=document.createElement(tag);if(className)node.className=className;if(text)node.textContent=text;return node;};
 const translated = (tag,className,key) => {const node=element(tag,className,I.t(key));node.dataset.i18n=key;return node;};
 const screenshotPath = capture => 'assets/'+capture.project.id+(capture.variant==='trend'?'-trend':'')+'-'+I.language+'.png';
 const altKey = capture => capture.variant==='trend'?'capture.hmiTrend.alt':'capture.'+capture.project.id+'.alt';

 const dialog=element('dialog','capture-dialog');dialog.id='capture-dialog';dialog.setAttribute('aria-labelledby','capture-dialog-title');
 const dialogHeader=element('div','capture-dialog-header');
 const dialogTitle=element('h2','capture-dialog-title');dialogTitle.id='capture-dialog-title';
 const closeButton=element('button','capture-dialog-close');closeButton.type='button';closeButton.append(translated('span','','capture.closeText'),element('span','capture-close-icon','×'));closeButton.lastChild.setAttribute('aria-hidden','true');closeButton.dataset.i18nAriaLabel='capture.close';
 dialogHeader.append(dialogTitle,closeButton);
 const dialogImage=element('img','capture-dialog-image');dialogImage.decoding='async';
 dialog.append(dialogHeader,dialogImage,translated('p','capture-dialog-note','capture.dialogNote'));document.body.append(dialog);
 function updateDialog() {
  if(!activeCapture)return;
  dialogTitle.textContent=I.t('capture.dialogTitle',{project:activeCapture.project.name});dialogImage.src=screenshotPath(activeCapture);dialogImage.alt=I.t(altKey(activeCapture));
 }
 function closeDialog() {if(dialog.open)dialog.close();}
 function openDialog(capture,trigger) {
  activeCapture=capture;previousFocus=trigger;updateDialog();
  if(!dialog.open)dialog.showModal();closeButton.focus();
 }
 closeButton.addEventListener('click',closeDialog);
 dialog.addEventListener('cancel',event=>{event.preventDefault();closeDialog();});
 dialog.addEventListener('keydown',event=>event.stopPropagation());
 dialog.addEventListener('close',()=>{if(previousFocus&&previousFocus.isConnected)previousFocus.focus({preventScroll:true});});
 dialog.addEventListener('click',event=>{if(event.target===dialog){const rect=dialog.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)closeDialog();}});

 for(const project of projects) {
  const scene=document.getElementById(project.id),demo=scene&&scene.querySelector('.project-layout > .demo');if(!demo)continue;
  const showcase=element('div','software-showcase');
  const figure=element('figure','software-capture');
  const caption=element('figcaption','capture-caption');caption.append(translated('span','capture-badge','capture.badge'),translated('span','capture-enlarge','capture.enlarge'));
  const imageButton=element('button','capture-image-button');imageButton.type='button';
  const image=element('img','capture-image');image.loading='lazy';image.decoding='async';image.width=1600;image.height=1000;
  imageButton.append(image);
  const capture={project,variant:'main',image,imageButton,viewButtons:[]};captures.push(capture);
  imageButton.addEventListener('click',()=>openDialog(capture,imageButton));
  figure.append(caption,imageButton,translated('p','capture-note','capture.note'));
  showcase.append(figure);
  if(project.id==='hmi') {
   const views=element('div','capture-views');views.setAttribute('role','group');views.dataset.i18nAriaLabel='capture.views';
   for(const [variant,key] of [['main','capture.process'],['trend','capture.trend']]) {
    const button=translated('button','capture-view-button',key);button.type='button';button.setAttribute('aria-pressed',String(variant===capture.variant));
    button.addEventListener('click',()=>{capture.variant=variant;updateCapture(capture);});views.append(button);capture.viewButtons.push({button,variant});
   }
   showcase.append(views);
  }
  const details=element('details','interactive-example');
  details.append(translated('summary','','capture.interactive'),translated('p','interactive-example-note','capture.interactiveNote'));
  showcase.append(details);demo.replaceWith(showcase);details.append(demo);
 }
 function updateCapture(capture) {
  capture.image.src=screenshotPath(capture);capture.image.alt=I.t(altKey(capture));capture.imageButton.setAttribute('aria-label',I.t('capture.zoom',{project:capture.project.name}));
  for(const view of capture.viewButtons)view.button.setAttribute('aria-pressed',String(view.variant===capture.variant));
  if(activeCapture===capture&&dialog.open)updateDialog();
 }
 const closing=document.querySelector('.closing-note');if(closing){closing.dataset.i18n='capture.closing';closing.textContent=I.t('capture.closing');}
 const closingAction=document.querySelector('.closing-actions > .primary-button');if(closingAction){closingAction.dataset.i18n='capture.action';closingAction.textContent=I.t('capture.action');}
 captures.forEach(updateCapture);I.refresh();
 document.addEventListener('portfolio:languagechange',()=>{captures.forEach(updateCapture);updateDialog();});
})();
