/* English and Spanish copy, shared by the portfolio and its interactive demos. */
(function () {
  'use strict';
  const entries = Object.create(null);
  const bySpanish = new Map();
  const originalText = new WeakMap();
  const originalAttributes = new WeakMap();
  let language = document.documentElement.lang === 'en' ? 'en' : 'es';
  let theme = document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
  const save = (key, value) => { try { localStorage.setItem(key, value); } catch (error) { /* Preferences still work in memory. */ } };
  const pairs = [
    ['José David Gómez · Datos y operaciones', 'José David Gómez · Data and operations'],
    ['José David Gómez Chamorro. Experiencia en datos, operaciones y software. Portafolio profesional con experiencia, formación y cinco demostraciones con datos sintéticos.', 'José David Gómez Chamorro. Experience in data, operations and software. Professional portfolio featuring work experience, education and five demonstrations using synthetic data.'],
    ['Ir al contenido', 'Skip to content'], ['/ DATOS Y OPERACIONES', '/ DATA AND OPERATIONS'],
    ['Inicio', 'Home'], ['Navegación principal', 'Main navigation'], ['Experiencia', 'Experience'], ['Formación', 'Education'], ['Proyectos', 'Projects'],
    ['PORTAFOLIO PROFESIONAL · DATOS Y SOFTWARE', 'PROFESSIONAL PORTFOLIO · DATA AND SOFTWARE'],
    ['Datos que ayudan', 'Data that helps'], ['a operar', 'operations work'], ['mejor.', 'better.'],
    ['Analista de Datos y Operaciones', 'Data and Operations Analyst'],
    ['Experiencia industrial, análisis de información y desarrollo de herramientas para investigar lo que ocurre en la operación.', 'Industrial experience, data analysis and software tools to investigate what happens in operations.'],
    ['Explorar los cinco proyectos', 'Explore the five projects'],
    ['OBSERVAR / VALIDAR / EXPLICAR', 'OBSERVE / VALIDATE / EXPLAIN'], ['Cinco proyectos', 'Five projects'], ['Una visión de la operación', 'One view of operations'],
    ['Composición visual ilustrativa', 'Illustrative visual composition'], ['PORTAFOLIO PROFESIONAL', 'PROFESSIONAL PORTFOLIO'],
    ['Los ejemplos operativos usan datos 100% sintéticos', 'Operational examples use 100% synthetic data'],
    ['Perfil', 'Profile'], ['PERFIL', 'PROFILE'], ['Ingeniería con enfoque', 'Engineering focused'], ['en análisis de datos', 'on data analysis'],
    ['Conecto el conocimiento de los procesos industriales con herramientas de análisis y desarrollo de software.', 'I connect knowledge of industrial processes with analytical tools and software development.'],
    ['BASE TÉCNICA', 'TECHNICAL FOUNDATION'], ['Ingeniería Mecatrónica', 'Mechatronics Engineering'], ['e Ingeniería Mecánica', 'and Mechanical Engineering'], ['Ingeniería Mecánica', 'Mechanical Engineering'],
    ['NEGOCIO Y DATOS', 'BUSINESS AND DATA'], ['MBA y Máster en Big Data', 'MBA and Master’s in Big Data'],
    ['Especialización en Ingeniería de Software', 'Postgraduate Specialization in Software Engineering'],
    ['Una trayectoria de aprendizaje que conecta ingeniería, negocio y desarrollo.', 'A learning journey connecting engineering, business and development.'],
    ['Ver formación y estudios en curso →', 'View education and ongoing studies →'], ['FORMACIÓN SEGÚN CV COMPARTIDO', 'EDUCATION AS LISTED IN THE SHARED CV'],
    ['Formación académica', 'Academic education'], ['FORMACIÓN ACADÉMICA', 'ACADEMIC EDUCATION'],
    ['Una base técnica que se amplía', 'A technical foundation enhanced'], ['con negocio, datos y software', 'with business, data and software'],
    ['DOBLE TITULACIÓN', 'DUAL DEGREE'], ['Febrero 2013 – mayo 2018', 'February 2013 – May 2018'], ['Diciembre 2018 – febrero 2021', 'December 2018 – February 2021'],
    ['Mayo 2023 – mayo 2024', 'May 2023 – May 2024'], ['EN CURSO', 'IN PROGRESS'], ['FINALIZADO', 'COMPLETED'], ['Ingeniería de Software', 'Software Engineering'],
    ['Febrero 2022 – en curso', 'February 2022 – in progress'],
    ['Técnico en Programación de Aplicaciones para Dispositivos Móviles', 'Technical Program in Mobile Application Programming'], ['Octubre 2021 – octubre 2023', 'October 2021 – October 2023'],
    ['Tecnología en Análisis y Desarrollo de Software', 'Technology Program in Software Analysis and Development'], ['Abril 2025 – en curso', 'April 2025 – in progress'],
    ['Estudios finalizados y programas en curso.', 'Completed studies and programs in progress.'],
    ['INGENIERÍA / NEGOCIO / BIG DATA / SOFTWARE', 'ENGINEERING / BUSINESS / BIG DATA / SOFTWARE'],
    ['Formación complementaria', 'Additional training'], ['FORMACIÓN COMPLEMENTARIA', 'ADDITIONAL TRAINING'],
    ['Aprendizaje aplicado', 'Learning applied'], ['al trabajo y al desarrollo', 'to work and development'],
    ['Programación, comunicación y gestión complementan mi experiencia en la operación.', 'Programming, communication and management complement my operational experience.'],
    ['También cuento con formación registrada en mantenimiento industrial, desarrollo móvil con App Inventor y diseño de embarcaciones menores.', 'My CV also records training in industrial maintenance, mobile development with App Inventor and small-vessel design.'],
    ['Selección de estudios complementarios del CV. Business English B2 corresponde al nombre del curso registrado.', 'Selected additional training from my CV. Business English B2 is the name of the recorded course.'],
    ['PROGRAMACIÓN', 'PROGRAMMING'], ['Fundamentos de Programación y Desarrollo de Software', 'Programming and Software Development Fundamentals'],
    ['Abril 2021 – diciembre 2021', 'April 2021 – December 2021'], ['DESARROLLO WEB', 'WEB DEVELOPMENT'], ['Programación y Desarrollo de Software Full Stack', 'Full Stack Programming and Software Development'],
    ['Noviembre 2021 – en curso', 'November 2021 – in progress'], ['IDIOMAS', 'LANGUAGES'], ['Enero 2020 – julio 2021', 'January 2020 – July 2021'],
    ['GESTIÓN', 'MANAGEMENT'], ['Habilidades Gerenciales', 'Management Skills'], ['Octubre 2018 – diciembre 2018', 'October 2018 – December 2018'],
    ['ESTUDIOS COMPLEMENTARIOS SEGÚN CV', 'ADDITIONAL TRAINING AS LISTED IN CV'],
    ['Experiencia laboral', 'Work experience'], ['EXPERIENCIA LABORAL', 'WORK EXPERIENCE'],
    ['Experiencia en procesos,', 'Experience in processes,'], ['mantenimiento y software', 'maintenance and software'],
    ['Cada etapa aporta una perspectiva sobre cómo se generan, registran y utilizan los datos.', 'Each role provides a perspective on how data is generated, recorded and used.'],
    ['Julio 2017 – abril 2018', 'July 2017 – April 2018'], ['Auxiliar de Producción', 'Production Assistant'],
    ['Análisis de eficiencia de líneas e input versus output. Inventarios y apoyo a la mejora de procesos.', 'Production-line efficiency and input-versus-output analysis. Inventory and process improvement support.'],
    ['Aportes y responsabilidades', 'Contributions and responsibilities'],
    ['Monitoreo de eficiencia de líneas y análisis de input versus output mediante bitácoras de eventos y tableros del proyecto Lean Six Sigma.', 'Monitored production-line efficiency and analyzed input versus output using event logs and Lean Six Sigma project dashboards.'],
    ['Ejecución y optimización del proceso de inventarios de producción, con seguimiento de materias primas, scrap y Mill Roll.', 'Executed and improved production inventory processes, tracking raw materials, scrap and Mill Roll.'],
    ['Octubre 2018 – septiembre 2019', 'October 2018 – September 2019'], ['Ingeniero Supervisor', 'Supervising Engineer'],
    ['Supervisión de mantenimiento y coordinación de equipos. Identificación de activos y organización de inventarios.', 'Maintenance supervision and team coordination. Asset identification and inventory organization.'],
    ['Supervisión de mantenimiento preventivo y correctivo en equipos de refrigeración y coordinación de equipos de trabajo de 5 a 10 personas, según el proyecto.', 'Supervised preventive and corrective maintenance on refrigeration equipment and coordinated teams of 5 to 10 people, depending on the project.'],
    ['Etiquetado e identificación de equipos por planta para mejorar el control de mantenimientos periódicos, actualizar inventarios y reestructurar la base de datos.', 'Labeled and identified equipment by plant to improve scheduled maintenance control, update inventories and restructure the database.'],
    ['Agosto 2020 – febrero 2021', 'August 2020 – February 2021'], ['Operador Pull Roll Stand', 'Pull Roll Stand Operator'],
    ['Control de producción y registro en PEM-SAP. Inventarios y trazabilidad de productos.', 'Production control and recording in PEM-SAP. Inventory and product traceability.'],
    ['Verificación de condiciones de proceso, tratamiento flama/corona y embobinado; control de producción y registro de producto en PEM-SAP.', 'Checked process conditions, flame/corona treatment and winding; controlled production and recorded products in PEM-SAP.'],
    ['Ejecución de inventarios y trazabilidad de productos; apoyo al seguimiento de planta en México y Colombia.', 'Performed inventory checks and product traceability; supported plant monitoring in Mexico and Colombia.'],
    ['Febrero 2023 – noviembre 2023', 'February 2023 – November 2023'], ['Investigador III', 'Researcher III'],
    ['Investigación aplicada en el ámbito naval. Desarrollo frontend de interfaces para software naval.', 'Applied research in the naval sector. Frontend interface development for naval software.'],
    ['Investigación y análisis de desafíos del sector naval dentro del Departamento de Investigación y Desarrollo.', 'Researched and analyzed naval-sector challenges within the Research and Development Department.'],
    ['Participación como desarrollador frontend en el diseño y optimización de interfaces de software naval, en colaboración con un equipo interdisciplinario.', 'Contributed as a frontend developer to designing and optimizing naval software interfaces with an interdisciplinary team.'],
    ['Diciembre 2023 – actualidad según CV', 'December 2023 – present as listed in CV'], ['Empresa confidencial · sector minero', 'Confidential company · mining sector'],
    ['Seguimiento de KPIs y reportes en Power BI. Automatización con Python e investigación de inconsistencias.', 'KPI monitoring and Power BI reporting. Python automation and investigation of inconsistencies.'],
    ['Seguimiento de KPIs en sistemas de gestión de combustible y elaboración de reportes semanales y mensuales sobre consumo, lubricantes y burn rate con Power BI.', 'Monitored fuel-management system KPIs and prepared weekly and monthly Power BI reports on consumption, lubricants and burn rate.'],
    ['Automatización de procesos con Python e investigación de anomalías e inconsistencias para comunicar hallazgos a los responsables de la operación.', 'Automated processes with Python and investigated anomalies and inconsistencies to communicate findings to operations stakeholders.'],
    ['FECHAS Y RESPONSABILIDADES SEGÚN CV', 'DATES AND RESPONSIBILITIES AS LISTED IN CV'],
    ['Rol actual', 'Current role'], ['ROL ACTUAL', 'CURRENT ROLE'], ['Información operativa', 'Operational information'], ['que se puede investigar', 'that can be investigated'],
    ['Seguimiento de KPIs en sistemas de gestión de combustible, con atención a la integridad del dato y a las preguntas de la operación.', 'Monitoring KPIs in fuel-management systems, focusing on data integrity and operational questions.'],
    ['Reportería y visualización', 'Reporting and visualization'], ['Reportes semanales y mensuales de consumo, lubricantes y burn rate con Power BI.', 'Weekly and monthly Power BI reports on consumption, lubricants and burn rate.'],
    ['Análisis de inconsistencias', 'Inconsistency analysis'], ['Investigación de anomalías y comunicación de hallazgos a responsables del sitio.', 'Investigating anomalies and communicating findings to site stakeholders.'],
    ['Automatización y trazabilidad', 'Automation and traceability'], ['Herramientas en Python, gestión de equipos y participación en pruebas de un sistema de mantenimiento.', 'Python tools, equipment management and participation in maintenance-system testing.'],
    ['Portafolio', 'Portfolio'], ['PROYECTOS COMPARTIDOS', 'SHARED PROJECTS'], ['Cinco preguntas', 'Five questions'], ['de la operación', 'from operations'],
    ['¿Qué equipos se inspeccionaron?', 'Which equipment was inspected?'], ['¿Cómo se comparan ingresos y entregas?', 'How do receipts and deliveries compare?'],
    ['¿Qué transacciones superan su referencia?', 'Which transactions exceed their reference?'], ['¿Qué registros requieren revisión?', 'Which records need review?'],
    ['¿Cómo evolucionan movimientos y niveles?', 'How do movements and levels change over time?'], ['FUNCIONALIDADES REVISADAS EN EL CÓDIGO COMPARTIDO', 'FUNCTIONALITY REVIEWED IN THE SHARED CODE'],
    ['Seguimiento de inspecciones', 'Tracking inspections'], ['y dispositivos', 'and devices'],
    ['Consolida formularios Excel, conserva un historial local y calcula cobertura por equipo y mes. También reúne movimientos de TAG y SMU.', 'Consolidates Excel forms, retains local history and calculates coverage by equipment and month. Also brings together TAG and SMU movements.'],
    ['Entradas', 'Inputs'], ['Formularios, maestro y semanales de dispositivos en Excel.', 'Excel forms, master data and weekly device reports.'], ['Salidas', 'Outputs'], ['Tablero de cobertura y reportes Excel.', 'Coverage dashboard and Excel reports.'],
    ['Tecnología', 'Technology'], ['Python, PySide6, SQLite, openpyxl y Matplotlib.', 'Python, PySide6, SQLite, openpyxl and Matplotlib.'],
    ['La cobertura usa equipos distintos inspeccionados y un tamaño de flota configurado.', 'Coverage uses distinct inspected equipment and a configured fleet size.'],
    ['DEMOSTRACIÓN ILUSTRATIVA', 'ILLUSTRATIVE DEMONSTRATION'], ['100% SINTÉTICA', '100% SYNTHETIC'], ['Grupo de equipos', 'Equipment group'],
    ['Equipos inspeccionados', 'Equipment inspected'], ['Cobertura de la muestra', 'Sample coverage'],
    ['Recreación simplificada. El software original también ofrece importación, deduplicación y exportación.', 'Simplified recreation. The original software also offers import, deduplication and export.'],
    ['DATOS DE DEMO · ABRIL 2025', 'DEMO DATA · APRIL 2025'],
    ['Conciliación de ingresos', 'Reconciliation of receipts'], ['y entregas', 'and deliveries'],
    ['Unifica despachos y transferencias para seguir el recorrido de cada producto por nodo y período.', 'Combines dispensing and transfers to trace each product by node and period.'],
    ['Pregunta', 'Question'], ['¿Cuánto ingresó y cuánto se entregó desde una unidad?', 'How much was received and delivered from a unit?'],
    ['Investigación', 'Investigation'], ['Desglose por transacción, receptor, categoría y horario.', 'Breakdown by transaction, recipient, category and time.'],
    ['Python, PySide6, Matplotlib y openpyxl.', 'Python, PySide6, Matplotlib and openpyxl.'],
    ['El desvío es ingreso menos entrega. Por sí solo no demuestra pérdida ni equivale al inventario del tanque.', 'The variance is receipts minus deliveries. On its own, it does not demonstrate a loss or equal the tank inventory.'],
    ['DIESEL · LITROS', 'DIESEL · LITERS'], ['Unidad de distribución', 'Distribution unit'], ['Ingreso', 'Receipts'], ['Entrega', 'Deliveries'], ['Desvío', 'Variance'],
    ['Transacciones sobre', 'Transactions above'], ['el nivel seguro de llenado', 'the safe fill level'],
    ['Cruza el volumen de cada transacción con el SFL del equipo y producto. Prioriza excesos y busca atípicos frente al historial del propio equipo.', 'Matches each transaction volume with the equipment and product SFL. Prioritizes exceedances and identifies outliers against the equipment’s own history.'],
    ['Maestro de equipos, despachos y transferencias.', 'Equipment master data, dispensing and transfers.'], ['Hallazgos, perfiles por equipo y puntos sin SFL.', 'Findings, equipment profiles and missing-SFL points.'],
    ['Método', 'Method'], ['Reglas de negocio y estadística robusta con mediana y MAD.', 'Business rules and robust statistics using the median and MAD.'],
    ['Una alerta indica qué revisar. No confirma derrame físico ni su causa.', 'An alert indicates what to review. It does not confirm a physical spill or its cause.'],
    ['Tolerancia sobre SFL:', 'Tolerance above SFL:'], ['Eventos sobre el umbral', 'Events above threshold'], ['Eventos sin SFL', 'Events without SFL'], ['Equipo ficticio', 'Fictional equipment'], ['Volumen', 'Volume'], ['Resultado', 'Result'],
    ['Muestra de eventos preparada para explicar cómo cambia el filtro. Las reglas completas viven en el software original.', 'An event sample prepared to explain how the filter changes. The complete rules are in the original software.'],
    ['UNIDADES EN LITROS · DATOS SIMULADOS', 'UNITS IN LITERS · SIMULATED DATA'],
    ['Calidad del dato', 'Data quality'], ['antes de tomar decisiones', 'before making decisions'],
    ['Revisa coherencia temporal, caudal y datos maestros. Reúne evidencia y propone ajustes para que un analista los revise.', 'Reviews time consistency, flow rates and master data. Gathers evidence and proposes adjustments for an analyst to review.'],
    ['Hallazgos', 'Findings'], ['Tiempo incompatible, volumen sin caudal, matrículas duplicadas y perfiles inconsistentes.', 'Incompatible timing, volume without flow, duplicate registrations and inconsistent profiles.'],
    ['Salida', 'Output'], ['Reporte de hallazgos y propuestas de corrección.', 'Findings report and proposed corrections.'], ['Control', 'Control'], ['Revisión humana y tope físico en las propuestas.', 'Human review and physical limits on proposed corrections.'],
    ['La herramienta prepara propuestas. No se verificó escritura automática en el sistema fuente.', 'The tool prepares proposals. Automatic writes to the source system were not verified.'],
    ['Familia de revisión', 'Review category'], ['Todas las familias', 'All categories'], ['Tiempo', 'Time'], ['Caudal', 'Flow rate'], ['Maestro de equipos', 'Equipment master data'],
    ['Ejemplos diseñados para demostrar el flujo de revisión. Los conteos no son resultados de la empresa.', 'Examples designed to demonstrate the review workflow. Counts are not company results.'], ['TRAZABILIDAD Y REVISIÓN DEL ANALISTA', 'TRACEABILITY AND ANALYST REVIEW'],
    ['Movimientos y niveles', 'Movements and levels'], ['en una vista temporal', 'in a timeline view'],
    ['Procesa exportaciones históricas de combustible en el navegador para explorar un diagrama de proceso, tendencias y alarmas.', 'Processes historical fuel exports in the browser to explore a process diagram, trends and alarms.'],
    ['Recepciones, transferencias, despachos y lecturas de volumen.', 'Receipts, transfers, dispensing and volume readings.'], ['Exploración', 'Exploration'], ['Reproducción temporal y evidencia de eventos.', 'Timeline playback and event evidence.'],
    ['HTML, CSS, JavaScript, SVG, PapaParse y ECharts.', 'HTML, CSS, JavaScript, SVG, PapaParse and ECharts.'],
    ['El proyecto analiza históricos. Esta demo no conecta sensores ni controla equipos físicos.', 'The project analyzes historical records. This demo does not connect to sensors or control physical equipment.'],
    ['RECREACIÓN ILUSTRATIVA', 'ILLUSTRATIVE RECREATION'], ['Lectura histórica:', 'Historical reading:'],
    ['Topología y capacidades inventadas. La vista muestra lecturas sintéticas, no la interfaz original ni un balance completo.', 'Invented topology and capacities. This view shows synthetic readings, rather than the original interface or a complete balance.'],
    ['LECTURAS SIMULADAS · ABRIL 2025', 'SIMULATED READINGS · APRIL 2025'],
    ['Método y privacidad', 'Method and privacy'], ['FORMA DE TRABAJO', 'HOW I WORK'], ['Una explicación necesita', 'An explanation needs'], ['datos que se puedan seguir', 'data that can be traced'],
    ['Comprender el proceso', 'Understand the process'], ['Definir la pregunta operativa, la unidad de análisis y el significado de cada campo.', 'Define the operational question, the unit of analysis and the meaning of each field.'],
    ['Preparar y validar', 'Prepare and validate'], ['Normalizar registros, relacionar fuentes y revisar faltantes, duplicados y coherencia.', 'Normalize records, link sources and check missing values, duplicates and consistency.'],
    ['Analizar con evidencia', 'Analyze with evidence'], ['Calcular indicadores y rastrear los hallazgos hasta las transacciones que los explican.', 'Calculate indicators and trace findings back to the transactions that explain them.'],
    ['Comunicar y revisar', 'Communicate and review'], ['Presentar conclusiones comprensibles y conservar la revisión del responsable del proceso.', 'Present clear conclusions and retain review by the process owner.'],
    ['Privacidad en esta presentación', 'Privacy in this presentation'],
    ['Los CSV y ejemplos fueron generados desde cero. Grupos, identificadores, usuarios, fechas, cantidades y lecturas son ficticios. Los archivos originales permanecen intactos.', 'The CSV files and examples were generated from scratch. Groups, identifiers, users, dates, quantities and readings are fictional. Original files remain untouched.'],
    ['DATOS 100% SINTÉTICOS', '100% SYNTHETIC DATA'], ['Aporte a un equipo de datos', 'Contribution to a data team'], ['APORTE PROFESIONAL', 'PROFESSIONAL CONTRIBUTION'],
    ['Lo que puedo aportar', 'What I can bring'], ['a un equipo de datos', 'to a data team'], ['Contexto de negocio', 'Business context'],
    ['Experiencia directa en procesos industriales, mantenimiento y operación minera.', 'Direct experience in industrial processes, maintenance and mining operations.'],
    ['Análisis y herramientas', 'Analysis and tools'], ['Python para automatización, Power BI para reportes y software para investigar información operativa.', 'Python for automation, Power BI for reporting and software for investigating operational information.'],
    ['Comunicación de hallazgos', 'Communicating findings'], ['Explicar inconsistencias y conectar el detalle de una transacción con una pregunta del proceso.', 'Explain inconsistencies and connect transaction details with a process question.'],
    ['POSIBLE SIGUIENTE PASO', 'POTENTIAL NEXT STEP'], ['Evaluar un modelo predictivo', 'Evaluate a predictive model'], ['cuando el problema lo requiera', 'when the problem calls for it'],
    ['Definir una variable objetivo, construir una referencia simple, separar entrenamiento y validación por tiempo y medir la utilidad para el negocio.', 'Define a target variable, build a simple baseline, split training and validation by time, and measure business usefulness.'],
    ['Propuesta de evolución. Los proyectos revisados demuestran analítica y reglas de detección; no acreditan modelos de ML desplegados ni experiencia cloud.', 'Proposed development path. The reviewed projects demonstrate analytics and detection rules; they do not establish deployed ML models or cloud experience.'],
    ['EXPERIENCIA DEMOSTRADA Y PROPUESTAS DIFERENCIADAS', 'DEMONSTRATED EXPERIENCE AND PROPOSALS CLEARLY DISTINGUISHED'],
    ['Cierre y materiales', 'Closing and resources'], ['Conversemos sobre', 'Let’s discuss'], ['el problema', 'the data'], ['de datos.', 'challenge.'],
    ['Mi aporte combina comprensión de la operación, atención a la calidad de la información y desarrollo de herramientas para analizarla.', 'I combine operational understanding, attention to data quality and the development of tools to analyze it.'],
    ['Recorrer las demostraciones ↗', 'Explore the demonstrations ↗'], ['Descargar datos sintéticos ↓', 'Download synthetic data ↓'], ['Perfil en GitHub ↗', 'GitHub profile ↗'],
    ['Las cinco demostraciones son recreaciones simplificadas para explicar el funcionamiento de los proyectos. Las funciones descritas se revisaron en el código de los proyectos compartidos. No se publican bases, capturas ni código de la empresa.', 'The five demonstrations are simplified recreations explaining how the projects work. The described features were reviewed in the shared project code. No company databases, screenshots or code are published.'],
    ['PORTAFOLIO PROFESIONAL · DATOS Y OPERACIONES', 'PROFESSIONAL PORTFOLIO · DATA AND OPERATIONS'],
    ['Controles de presentación', 'Presentation controls'], ['Anterior', 'Previous'], ['Siguiente', 'Next'], ['Salir de presentación', 'Exit presentation'], ['Salir', 'Exit'],
    ['Duración incompatible', 'Incompatible duration'], ['Revisar volumen registrado frente a una duración de 3 segundos.', 'Review the recorded volume against a duration of 3 seconds.'],
    ['Volumen sin flujo', 'Volume without flow'], ['El registro contiene volumen y un perfil de caudal en cero.', 'The record has volume and a zero flow-rate profile.'],
    ['Pico atípico', 'Unusual peak'], ['Contrastar el pico de caudal con la evidencia del evento.', 'Compare the flow-rate peak with the event evidence.'],
    ['Matrícula duplicada', 'Duplicate registration'], ['Dos equipos de prueba comparten una matrícula ficticia.', 'Two test equipment items share a fictional registration.'],
    ['Centro de costo diferente', 'Different cost center'], ['Revisar la correspondencia con la referencia ERP.', 'Review the match with the ERP reference.'],
    ['Perfil liviano incompleto', 'Incomplete light-vehicle profile'], ['La categoría requiere revisar la bandera del vehículo.', 'The category requires reviewing the vehicle flag.'],
    ['Perfil de contratista incompleto', 'Incomplete contractor profile'], ['La clasificación del grupo requiere revisar el perfil.', 'The group classification requires reviewing the profile.']
  ];
  pairs.forEach(([es, en], index) => { const key = 'copy.' + index; entries[key] = { es, en }; bySpanish.set(es, key); });
  const register = values => {
    Object.entries(values).forEach(([key, value]) => { entries[key] = value; if (value.es) bySpanish.set(value.es, key); });
  };
  register({
    languageLabel:{es:'Idioma',en:'Language'}, themeDark:{es:'Oscuro',en:'Dark'}, themeLight:{es:'Claro',en:'Light'},
    themeToDark:{es:'Cambiar a tema oscuro',en:'Switch to dark theme'}, themeToLight:{es:'Cambiar a tema claro',en:'Switch to light theme'},
    presentationStart:{es:'Modo presentación',en:'Presentation mode'}, presentationExit:{es:'Salir de presentación',en:'Exit presentation'},
    allGroups:{es:'Todos los grupos ficticios',en:'All fictional groups'}, equipmentUnit:{es:' eq.',en:' units'},
    receipt:{es:'Ingreso',en:'Receipts'}, delivery:{es:'Entrega',en:'Deliveries'},
    balanceExplanation:{es:'Desvío de {difference} L{percentage}. Ejemplo sintético para revisar el flujo de movimientos. No incorpora inventario inicial.',en:'Variance of {difference} L{percentage}. Synthetic example for reviewing movement flows. Opening inventory is not included.'},
    receiptPercentage:{es:' ({value}% del ingreso)',en:' ({value}% of receipts)'},
    missingSfl:{es:'Sin SFL',en:'No SFL'}, reviewMaster:{es:'Revisar maestro',en:'Review master data'}, aboveThreshold:{es:'Sobre umbral',en:'Above threshold'}, withinThreshold:{es:'Dentro del umbral',en:'Within threshold'},
    capacity:{es:'Capacidad {value} L',en:'Capacity {value} L'}, mainTank:{es:'DEMO - Tanque principal',en:'DEMO - Main Tank'}, virtualTank:{es:'DEMO - Tanque virtual',en:'DEMO - Virtual Tank'},
    trendLabel:{es:'Tendencia sintética del tanque principal. Lectura seleccionada {date}',en:'Synthetic main tank trend. Selected reading {date}'},
    trendExplanation:{es:'Principal: medido (verde), calculado (punteado). Diferencia seleccionada: {value} L.',en:'Main tank: measured (green), calculated (dashed). Selected difference: {value} L.'}
  });
  const t = (key, variables = {}) => {
    const entry = entries[key] || entries[bySpanish.get(key)];
    const value = entry ? (entry[language] || entry.es || key) : key;
    return value.replace(/\{(\w+)\}/g, (match, name) => Object.prototype.hasOwnProperty.call(variables, name) ? String(variables[name]) : match);
  };
  function translateText(source) {
    const trimmed = source.trim();
    const key = bySpanish.get(trimmed);
    return key ? source.replace(trimmed, t(key)) : source;
  }
  function refresh(root = document) {
    const nodes = root.nodeType === 1 ? [root, ...root.querySelectorAll('*')] : [...root.querySelectorAll('*')];
    for (const element of nodes) {
      if (element.closest('script,style,noscript,[data-i18n-live]')) continue;
      if (element.dataset.i18n) element.textContent = t(element.dataset.i18n);
      if (element.dataset.i18nHtml) element.innerHTML = t(element.dataset.i18nHtml);
      for (const attribute of ['aria-label','title','alt','placeholder','data-title','content']) {
        if (attribute === 'content' && !element.matches('meta[name="description"]')) continue;
        const explicit = element.getAttribute('data-i18n-' + attribute);
        if (explicit) { element.setAttribute(attribute, t(explicit)); continue; }
        if (!element.hasAttribute(attribute)) continue;
        let originals = originalAttributes.get(element);
        if (!originals) { originals = {}; originalAttributes.set(element, originals); }
        if (!(attribute in originals)) originals[attribute] = element.getAttribute(attribute);
        element.setAttribute(attribute, translateText(originals[attribute]));
      }
    }
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
      if (!node.parentElement || node.parentElement.closest('script,style,noscript,[data-i18n],[data-i18n-html],[data-i18n-live]')) continue;
      if (!originalText.has(node)) originalText.set(node, node.nodeValue);
      node.nodeValue = translateText(originalText.get(node));
    }
    document.documentElement.lang = language;
    if (!document.body.classList.contains('presenting')) document.title = t('José David Gómez · Datos y operaciones');
    updateControls();
  }
  function updateControls() {
    const select = document.getElementById('language-select');
    if (select) { select.value = language; select.setAttribute('aria-label',t('languageLabel')); }
    const toggle = document.getElementById('theme-toggle');
    if (toggle) {
      toggle.setAttribute('aria-pressed', String(theme === 'dark'));
      toggle.setAttribute('aria-label',t(theme === 'dark'?'themeToLight':'themeToDark'));
      toggle.setAttribute('title',t(theme === 'dark'?'themeToLight':'themeToDark'));
      document.getElementById('theme-label').textContent = t(theme === 'dark'?'themeLight':'themeDark');
      document.getElementById('theme-icon').textContent = theme === 'dark'?'☀':'☾';
    }
  }
  function setLanguage(value) {
    language = value === 'en' ? 'en' : 'es';
    save('portfolio-language',language); refresh();
    document.dispatchEvent(new CustomEvent('portfolio:languagechange',{detail:{language,locale:language === 'en'?'en-US':'es-CO'}}));
  }
  function setTheme(value) {
    theme = value === 'dark' ? 'dark' : 'light';
    document.documentElement.dataset.theme = theme; save('portfolio-theme',theme); updateControls();
    document.dispatchEvent(new CustomEvent('portfolio:themechange',{detail:{theme}}));
  }
  window.portfolioI18n = {
    t, refresh, setLanguage, setTheme,
    add(values) { register(values); refresh(); },
    get language() { return language; }, get locale() { return language === 'en'?'en-US':'es-CO'; }, get theme() { return theme; }
  };
  document.getElementById('language-select').addEventListener('change',event => setLanguage(event.target.value));
  document.getElementById('theme-toggle').addEventListener('click',() => setTheme(theme === 'dark'?'light':'dark'));
  refresh();
})();
