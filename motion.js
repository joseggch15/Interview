(() => {
 'use strict';
 const I=window.portfolioI18n;
 I.add({
  journeyTitle:{es:'Un recorrido entre ingeniería y datos',en:'A journey from engineering to data'},heroJourneyLink:{es:'Explorar mi recorrido ↓',en:'Explore my journey ↓'},
  journeyEyebrow:{es:'UN RECORRIDO ENTRE INGENIERÍA Y DATOS',en:'A JOURNEY FROM ENGINEERING TO DATA'},
  journeyIndustrialTitle:{es:'Primero, entender<br>el proceso.',en:'First, understand<br>the process.'},
  journeyIndustrialText:{es:'Producción, inventarios y mantenimiento: conocer la operación me ayuda a formular mejores preguntas sobre sus datos.',en:'Production, inventory and maintenance: understanding operations helps me ask better questions about their data.'},
  journeyNavalTitle:{es:'Ingeniería que se<br>convierte en interfaces.',en:'Engineering brought<br>into interfaces.'},
  journeyNavalText:{es:'Mi paso por COTECMAR conecta la investigación naval con el desarrollo frontend y el trabajo interdisciplinario.',en:'My experience at COTECMAR connects naval research with frontend development and interdisciplinary teamwork.'},
  journeyDataTitle:{es:'Del registro<br>a la explicación.',en:'From a record<br>to an explanation.'},
  journeyDataText:{es:'Python, visualización y controles de calidad para investigar movimientos, revisar inconsistencias y comunicar hallazgos.',en:'Python, visualization and quality checks to investigate transactions, review inconsistencies and communicate findings.'},
  journeyExperienceLink:{es:'Explorar mi experiencia ↗',en:'Explore my experience ↗'},journeyEducationLink:{es:'Conocer mi formación ↗',en:'Explore my education ↗'},journeySoftwareLink:{es:'Ver el software funcionando ↗',en:'See the software in action ↗'},
  journeyNavigation:{es:'Escenas del recorrido',en:'Journey scenes'},journeyRailIndustrial:{es:'01 · Industria',en:'01 · Industry'},journeyRailNaval:{es:'02 · Ingeniería naval',en:'02 · Naval engineering'},journeyRailData:{es:'03 · Datos y software',en:'03 · Data & software'},
  conceptLabel:{es:'Imágenes conceptuales generadas',en:'Generated conceptual images'},journeyHint:{es:'Desplázate para recorrer ↓',en:'Scroll to explore ↓'},motionPause:{es:'Pausar movimiento',en:'Pause motion'},motionResume:{es:'Activar movimiento',en:'Enable motion'}
 });
 const section=document.getElementById('recorrido'),stage=section.querySelector('.journey-stage'),photos=[...section.querySelectorAll('.journey-photo')],panels=[...section.querySelectorAll('.journey-panel')],buttons=[...section.querySelectorAll('[data-stop]')],progress=section.querySelector('.journey-progress i'),toggle=document.getElementById('motion-toggle');
 const reduce=window.matchMedia('(prefers-reduced-motion: reduce)');let paused=reduce.matches,current=0,queued=false;
 function setScene(index){current=index;[photos,panels,buttons].forEach(items=>items.forEach((item,i)=>{item.classList.toggle('is-current',i===index);if(items===panels)item.setAttribute('aria-hidden',String(i!==index));if(items===buttons)item.setAttribute('aria-pressed',String(i===index));}));}
 function update(){queued=false;const presentation=document.body.classList.contains('presenting');if(presentation){photos.forEach(img=>img.style.transform='none');progress.style.width=((current+1)/3*100)+'%';return;}
  const rect=section.getBoundingClientRect(),header=document.querySelector('.site-header').offsetHeight,span=Math.max(1,section.offsetHeight-stage.offsetHeight),p=Math.max(0,Math.min(1,(header-rect.top)/span)),index=Math.min(2,Math.floor(p*3));setScene(index);progress.style.width=(p*100)+'%';
  photos.forEach((img,i)=>{const local=Math.max(0,Math.min(1,p*3-i));img.style.transform=paused?'none':`scale(${1.02+local*.065}) translateX(${-local*1.1}%)`;});
 }
 function schedule(){if(!queued){queued=true;requestAnimationFrame(update);}}
 function updateToggle(){toggle.dataset.i18n=paused?'motionResume':'motionPause';toggle.textContent=I.t(toggle.dataset.i18n);toggle.setAttribute('aria-pressed',String(!paused));}
 toggle.addEventListener('click',()=>{paused=!paused;updateToggle();schedule();});reduce.addEventListener('change',event=>{paused=event.matches;updateToggle();schedule();});
 buttons.forEach((button,index)=>button.addEventListener('click',()=>{if(document.body.classList.contains('presenting')){setScene(index);progress.style.width=((index+1)/3*100)+'%';return;}const top=section.getBoundingClientRect().top+window.scrollY-document.querySelector('.site-header').offsetHeight+Math.max(1,section.offsetHeight-stage.offsetHeight)*(index+.12)/3;window.scrollTo({top,behavior:paused?'instant':'smooth'});}));
 window.addEventListener('scroll',schedule,{passive:true});window.addEventListener('resize',schedule);new MutationObserver(schedule).observe(document.body,{attributes:true,attributeFilter:['class']});document.addEventListener('portfolio:languagechange',updateToggle);updateToggle();schedule();
 // Restrained entrance animation, with immediate visibility for motion-sensitive visitors.
 const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.remove('await-reveal');revealObserver.unobserve(entry.target);}}),{threshold:.08});
 document.querySelectorAll('.section-top,.education-grid article,.method article,.project-copy,.timeline article,.github-card').forEach(element=>{element.classList.add('reveal-block','await-reveal');revealObserver.observe(element);});document.documentElement.classList.add('motion-ready');
})();
