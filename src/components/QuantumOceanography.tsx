import { useState } from "react";
import Image from "next/image";

// Definición de tipos para nuestra estructura de datos
interface TopicContent {
  title: string;
  description: string;
  image: string;
  keyPoints: string[];
  applications: string[];
  resources?: string[];
}

interface CategoryData {
  [key: string]: TopicContent;
}

interface CategoriesData {
  [key: string]: CategoryData;
}

const QuantumOceanography = () => {
  // Estado para la categoría y el tópico seleccionados
  const [selectedCategory, setSelectedCategory] = useState("foundations");
  const [selectedTopic, setSelectedTopic] = useState("introduction");

  // Datos de las categorías y tópicos
  const categories = [
    { id: "foundations", name: "Fundamentos Cuánticos" },
    { id: "bigdata", name: "Big Data Oceanográfico" },
    { id: "applications", name: "Aplicaciones Cuánticas" },
    { id: "innovation", name: "Innovación Metodológica" },
    { id: "emergent", name: "Sistemas Emergentes" },
    { id: "platforms", name: "Plataformas y Herramientas" },
    { id: "future", name: "Perspectivas Futuras" },
  ];

  // Mapa de tópicos por categoría
  const topicsByCategory: { [key: string]: { id: string; name: string }[] } = {
    foundations: [
      { id: "introduction", name: "Introducción a la Oceanografía Cuántica" },
      { id: "principles", name: "Principios Cuánticos Esenciales" },
      { id: "algorithms", name: "Algoritmos Cuánticos Clave" },
      { id: "computing", name: "Hardware de Computación Cuántica" },
    ],
    bigdata: [
      { id: "management", name: "Gestión de Datos Oceánicos Masivos" },
      { id: "mining", name: "Data Mining y Scraping" },
      { id: "processing", name: "Procesamiento Cuántico de Datos" },
      { id: "integration", name: "Integración de Fuentes Heterogéneas" },
      { id: "visualization", name: "Visualización Avanzada" },
    ],
    applications: [
      { id: "fluid", name: "Dinámica de Fluidos Oceánicos" },
      { id: "chemistry", name: "Química Oceánica" },
      { id: "biology", name: "Biología Marina" },
      { id: "geology", name: "Geología y Geofísica Marina" },
      { id: "atmosphere", name: "Interfaz Océano-Atmósfera" },
    ],
    innovation: [
      { id: "miniaturization", name: "Miniaturización de Sensores" },
      { id: "opensource", name: "Desarrollo Open-Source" },
      { id: "methodology", name: "Nuevas Metodologías" },
      { id: "trial", name: "Enfoque de Ensayo-Error" },
      { id: "hybrid", name: "Sistemas Híbridos Clásico-Cuánticos" },
    ],
    emergent: [
      { id: "selforganization", name: "Modelos de Autoorganización" },
      { id: "memory", name: "Memoria Oceánica" },
      { id: "complexity", name: "Teoría de la Complejidad" },
      { id: "fractals", name: "Fractales y Patrones Oceánicos" },
      { id: "emergence", name: "Propiedades Emergentes" },
      { id: "networks", name: "Redes Complejas Oceánicas" },
    ],
    platforms: [
      { id: "software", name: "Software Cuántico Especializado" },
      { id: "cloud", name: "Acceso Cuántico en la Nube" },
      { id: "sensors", name: "Redes de Sensores Avanzados" },
      { id: "frameworks", name: "Frameworks de Integración" },
      { id: "apis", name: "APIs y Estándares" },
    ],
    future: [
      { id: "shortterm", name: "Hoja de Ruta a Corto Plazo" },
      { id: "midterm", name: "Desarrollos a Medio Plazo" },
      { id: "longterm", name: "Visión a Largo Plazo" },
      { id: "challenges", name: "Desafíos y Oportunidades" },
      { id: "collaborations", name: "Colaboraciones Estratégicas" },
    ],
  };

  // Contenido detallado de cada tópico
  const content: CategoriesData = {
    foundations: {
      introduction: {
        title: "Introducción a la Oceanografía Cuántica",
        description: "La oceanografía cuántica es un campo emergente que aplica los principios y tecnologías de la computación cuántica para abordar los desafíos complejos en el estudio de los océanos. Este enfoque interdisciplinario combina la mecánica cuántica con las ciencias oceánicas para desarrollar nuevas capacidades de modelado, análisis y predicción de sistemas marinos.",
        image: "/images/quantum/quantum_oceanography_intro.jpg",
        keyPoints: [
          "La oceanografía cuántica emerge como respuesta a los límites computacionales clásicos en la simulación de sistemas oceánicos complejos",
          "Aprovecha principios cuánticos como la superposición y el entrelazamiento para procesar información oceanográfica",
          "Permite abordar problemas oceanográficos previamente intratables computacionalmente",
          "Facilita la integración de datos multiescala, desde procesos moleculares hasta circulación global",
          "Representa un cambio de paradigma en nuestra capacidad para comprender y predecir sistemas oceánicos"
        ],
        applications: [
          "Modelado de circulación oceánica a múltiples escalas simultáneamente",
          "Simulación precisa de interacciones biogeoquímicas complejas",
          "Procesamiento avanzado de grandes conjuntos de datos oceanográficos",
          "Predicción mejorada de fenómenos oceánicos extremos",
          "Desarrollo de gemelos digitales oceánicos de alta fidelidad"
        ],
        resources: [
          "Quantum Earth Initiative: Oceanography Division",
          "IBM Quantum & Ocean Sciences Consortium",
          "Quantum Blue Computing Initiative"
        ]
      },
      principles: {
        title: "Principios Cuánticos Esenciales",
        description: "Los principios fundamentales de la mecánica cuántica proporcionan nuevas capacidades para abordar problemas oceanográficos complejos. Conceptos como la superposición, el entrelazamiento y la interferencia cuántica ofrecen ventajas computacionales significativas para modelar sistemas oceánicos multidimensionales y no lineales.",
        image: "/images/quantum/quantum_principles.jpg",
        keyPoints: [
          "Superposición: permite explorar múltiples estados oceanográficos simultáneamente",
          "Entrelazamiento: facilita correlaciones complejas entre variables oceánicas distantes",
          "Interferencia cuántica: optimiza soluciones a problemas de circulación y mezcla",
          "Qubits: unidades fundamentales de información cuántica aplicadas a datos oceanográficos",
          "Algoritmos cuánticos: secuencias de operaciones diseñadas para resolver problemas oceánicos específicos"
        ],
        applications: [
          "Representación eficiente de estados multivariable en oceanografía física",
          "Modelado de correlaciones no lineales en sistemas biogeoquímicos",
          "Optimización de redes de observación oceanográfica",
          "Resolución de ecuaciones diferenciales oceanográficas complejas",
          "Análisis de patrones en grandes conjuntos de datos marinos"
        ]
      },
      algorithms: {
        title: "Algoritmos Cuánticos Clave",
        description: "Los algoritmos cuánticos proporcionan nuevas formas de abordar problemas oceanográficos tradicionalmente difíciles de resolver con métodos clásicos. Estos algoritmos aprovechan propiedades cuánticas para procesar información de manera más eficiente, especialmente en sistemas complejos con múltiples variables e interacciones no lineales.",
        image: "/images/quantum/quantum_algorithms.jpg",
        keyPoints: [
          "Quantum Phase Estimation (QPE): fundamental para resolver ecuaciones de dinámica de fluidos oceánicos",
          "Variational Quantum Eigensolver (VQE): aplicado a simulación de sistemas químicos marinos",
          "Quantum Approximate Optimization Algorithm (QAOA): útil para problemas de optimización en redes tróficas marinas",
          "Quantum Machine Learning (QML): análisis avanzado de grandes conjuntos de datos oceanográficos",
          "Algoritmos híbridos: combinan procesamiento clásico y cuántico para aplicaciones oceanográficas prácticas"
        ],
        applications: [
          "Modelado de turbulencia oceánica a múltiples escalas",
          "Simulación de reacciones químicas en diferentes condiciones marinas",
          "Optimización de rutas de muestreo para misiones oceanográficas",
          "Clasificación mejorada de imágenes satelitales oceánicas",
          "Predicción de fenómenos oceanográficos extremos"
        ]
      },
      computing: {
        title: "Hardware de Computación Cuántica",
        description: "La evolución del hardware de computación cuántica está abriendo nuevas posibilidades para aplicaciones oceanográficas. Diferentes arquitecturas cuánticas ofrecen ventajas específicas para diversos tipos de problemas oceánicos, desde simulaciones químicas hasta modelado de circulación a gran escala.",
        image: "/images/quantum/quantum_hardware.jpg",
        keyPoints: [
          "Computadoras cuánticas basadas en circuitos superconductores: utilizadas para simulaciones de dinámica de fluidos",
          "Sistemas de iones atrapados: adecuados para cálculos cuánticos de alta precisión en química marina",
          "Computación cuántica adiabática: aplicada a problemas de optimización en redes de observación",
          "Procesadores cuánticos fotónicos: prometedores para algoritmos de machine learning oceanográfico",
          "Sistemas híbridos clásico-cuánticos: enfoque práctico para aplicaciones oceanográficas actuales"
        ],
        applications: [
          "Acceso remoto a procesadores cuánticos para investigadores oceanográficos",
          "Simuladores cuánticos especializados para procesos oceanográficos específicos",
          "Plataformas en la nube para ejecutar algoritmos cuánticos con datos oceánicos",
          "Procesadores cuánticos embarcados para procesamiento in-situ",
          "Infraestructura híbrida para centros de modelado oceánico"
        ]
      }
    },
    bigdata: {
      management: {
        title: "Gestión de Datos Oceánicos Masivos",
        description: "La gestión de datos masivos en oceanografía cuántica aborda el desafío de almacenar, organizar y acceder eficientemente a vastos conjuntos de datos heterogéneos provenientes de satélites, boyas, flotadores, modelos y otras fuentes. Las técnicas cuánticas ofrecen nuevos enfoques para indexación, compresión y recuperación de información.",
        image: "/images/quantum/quantum_data_management.jpg",
        keyPoints: [
          "Técnicas de indexación cuántica para conjuntos de datos oceanográficos multidimensionales",
          "Compresión cuántica para datos de alta resolución espacio-temporal",
          "Bases de datos diseñadas para facilitar el acceso cuántico a información oceanográfica",
          "Protocolos de transferencia optimizados para grandes volúmenes de datos satelitales y in-situ",
          "Estrategias de federación de datos distribuidos globalmente"
        ],
        applications: [
          "Gestión integrada de datos de sistemas de observación global del océano",
          "Plataformas de datos adaptadas para aplicaciones cuánticas oceanográficas",
          "Preservación a largo plazo de registros históricos oceanográficos",
          "Integración de datos multifuente para creación de gemelos digitales",
          "Infraestructuras escalables para datos oceanográficos en tiempo real"
        ]
      },
      mining: {
        title: "Data Mining y Scraping",
        description: "Las técnicas cuánticas de data mining y scraping revolucionan nuestra capacidad para extraer información valiosa de vastos repositorios de datos oceanográficos. Los algoritmos cuánticos pueden identificar patrones, anomalías y correlaciones ocultas que escapan a los métodos analíticos tradicionales.",
        image: "/images/quantum/quantum_data_mining.jpg",
        keyPoints: [
          "Algoritmos cuánticos para detectar patrones espaciotemporales complejos en datos oceanográficos",
          "Técnicas de scraping automatizado de múltiples fuentes de datos marinos",
          "Métodos cuánticos de reducción dimensional para visualizar relaciones en datos multivariables",
          "Enfoques de minería de texto para extraer conocimiento de literatura científica oceánica",
          "Sistemas de aprendizaje continuo que mejoran con nuevos datos"
        ],
        applications: [
          "Detección temprana de eventos oceanográficos anómalos como floraciones algales",
          "Reconstrucción de series históricas a partir de datos fragmentados",
          "Identificación de teleconexiones oceánicas no evidentes entre cuencas distantes",
          "Extracción automatizada de datos de repositorios globales para aplicaciones locales",
          "Descubrimiento de nuevos indicadores para salud de ecosistemas marinos"
        ]
      },
      processing: {
        title: "Procesamiento Cuántico de Datos",
        description: "El procesamiento cuántico transforma el análisis de datos oceanográficos, permitiendo operaciones que serían computacionalmente prohibitivas con métodos clásicos. Estos enfoques son particularmente valiosos para manejar las complejidades inherentes de los sistemas oceánicos y sus interacciones multifísicas.",
        image: "/images/quantum/quantum_data_processing.jpg",
        keyPoints: [
          "Aceleración cuántica de análisis estadísticos multivariable",
          "Transformadas espectrales cuánticas para datos de series temporales oceanográficas",
          "Correlaciones avanzadas entre múltiples capas de datos espacio-temporales",
          "Procesamiento en tiempo real de flujos de datos de redes de sensores distribuidos",
          "Análisis multiresolución adaptativo según características oceánicas"
        ],
        applications: [
          "Procesamiento de datos satelitales de alta resolución con técnicas cuánticas",
          "Análisis acelerado de perfiles oceanográficos verticales masivos",
          "Correlación de múltiples variables oceanográficas en diferentes escalas",
          "Detección mejorada de señales débiles en datos ruidosos de sensores oceánicos",
          "Reconstrucción de campos 3D a partir de observaciones dispersas"
        ]
      },
      integration: {
        title: "Integración de Fuentes Heterogéneas",
        description: "La integración cuántica de datos heterogéneos resuelve uno de los mayores desafíos en oceanografía: combinar coherentemente información de diversas fuentes, resoluciones y formatos. Las técnicas cuánticas pueden reconciliar inconsistencias y optimizar la fusión de datos para obtener una visión más completa del sistema oceánico.",
        image: "/images/quantum/data_integration.jpg",
        keyPoints: [
          "Armonización cuántica de datos de diferentes plataformas observacionales",
          "Técnicas de fusión para combinar mediciones in-situ con datos satelitales",
          "Reconciliación de diferencias de escala entre observaciones y modelos",
          "Integración coherente de datos históricos con observaciones modernas",
          "Sistemas de asimilación que preservan relaciones físicas fundamentales"
        ],
        applications: [
          "Creación de productos integrados de temperatura superficial del mar",
          "Reconstrucción tridimensional de campos de variables oceanográficas",
          "Fusión de datos acústicos, ópticos y físico-químicos para caracterización marina",
          "Integración de datos genómicos con variables ambientales oceánicas",
          "Desarrollo de atlas oceánicos multivariable coherentes"
        ]
      },
      visualization: {
        title: "Visualización Avanzada",
        description: "Las técnicas de visualización avanzada potenciadas por computación cuántica permiten representar de manera más intuitiva y significativa la complejidad multidimensional de los sistemas oceánicos. Estos métodos facilitan la identificación de patrones, relaciones y anomalías en conjuntos de datos masivos.",
        image: "/images/quantum/quantum_visualization.jpg",
        keyPoints: [
          "Técnicas de reducción dimensional cuántica para visualizar datos multivariable",
          "Visualización interactiva de incertidumbres en predicciones oceanográficas",
          "Representaciones holísticas de sistemas acoplados océano-atmósfera-hielo",
          "Sistemas inmersivos para exploración de datos oceanográficos 4D",
          "Visualización adaptativa que resalta características relevantes según contexto"
        ],
        applications: [
          "Dashboards interactivos para monitoreo en tiempo real de condiciones oceánicas",
          "Gemelos digitales visuales de ecosistemas marinos completos",
          "Herramientas de realidad virtual para exploración de datos batimétricos",
          "Visualización de trayectorias de partículas en flujos oceánicos complejos",
          "Interfaces intuitivas para análisis de tendencias oceanográficas a largo plazo"
        ]
      }
    },
    applications: {
      fluid: {
        title: "Dinámica de Fluidos Oceánicos",
        description: "La aplicación de computación cuántica a la dinámica de fluidos oceánicos representa uno de los avances más prometedores en oceanografía física. Los algoritmos cuánticos pueden abordar las complejidades no lineales de la turbulencia, los vórtices y la circulación a múltiples escalas de manera más eficiente que los métodos clásicos.",
        image: "/images/quantum/quantum_fluid_dynamics.jpg",
        keyPoints: [
          "Resolución cuántica de ecuaciones de Navier-Stokes para turbulencia oceánica",
          "Simulación simultánea de procesos en múltiples escalas espaciales y temporales",
          "Parametrización mejorada de procesos de subrejilla mediante optimización cuántica",
          "Modelado de interacciones no lineales entre corrientes, mareas y ondas internas",
          "Predicción más precisa de formación y evolución de remolinos de mesoescala"
        ],
        applications: [
          "Proyectos como QCF (Quantum Computing for Fluid Dynamics) aplicados a circulación oceánica",
          "Colaboraciones entre NOAA y empresas cuánticas para predicción de corrientes",
          "Simulaciones avanzadas de intercambios entre capas superficial y profunda",
          "Modelos de afloramiento costero con capacidades predictivas mejoradas",
          "Análisis de impacto de cambios en forzamientos atmosféricos en circulación oceánica"
        ]
      },
      chemistry: {
        title: "Química Oceánica",
        description: "La química oceánica se beneficia enormemente de la computación cuántica, que permite simular con precisión sin precedentes interacciones moleculares complejas en el agua de mar. Estos avances son críticos para comprender procesos como la acidificación oceánica, ciclos biogeoquímicos y transferencia de gases entre océano y atmósfera.",
        image: "/images/quantum/quantum_ocean_chemistry.jpg",
        keyPoints: [
          "Simulación cuántica del sistema de carbonatos en agua de mar con precisión molecular",
          "Modelado de cinética química en condiciones variables de presión, temperatura y salinidad",
          "Cálculos precisos de equilibrios complejos en mezclas multicomponente",
          "Predicción de comportamiento de compuestos orgánicos marinos mediante algoritmos VQE",
          "Estudio de catálisis en interfaces entre agua, minerales y organismos marinos"
        ],
        applications: [
          "Simulación de Procesos de Carbonato con IBM Quantum y universidades marinas",
          "Proyecto QuChem de Caltech y Scripps para química marina a alta presión",
          "Modelado de fotoquímica marina y degradación de materia orgánica disuelta",
          "Predicción de efectos de la acidificación oceánica a nivel molecular",
          "Estudios de especiación química en ambientes marinos extremos"
        ]
      },
      biology: {
        title: "Biología Marina",
        description: "La computación cuántica está abriendo nuevas fronteras en biología marina, desde la simulación de procesos moleculares fundamentales hasta el análisis de ecosistemas completos. Los algoritmos cuánticos permiten modelar con mayor fidelidad las complejas interacciones biológicas en ambientes marinos dinámicos.",
        image: "/images/quantum/quantum_marine_biology.jpg",
        keyPoints: [
          "Simulación cuántica de plegamiento de proteínas en organismos adaptados a ambientes extremos",
          "Análisis acelerado de datos de ADN ambiental (eDNA) mediante algoritmos de Grover",
          "Modelado de transferencia de energía fotosintética en fitoplancton con alta precisión",
          "Optimización de redes tróficas marinas y flujos energéticos entre niveles tróficos",
          "Análisis de respuestas evolutivas a cambios ambientales rápidos"
        ],
        applications: [
          "Proyecto QuBiSea para estudiar adaptaciones moleculares a alta presión",
          "Consorcio Marine-Q para procesamiento de datos acústicos y genómicos",
          "Center for Quantum Marine Ecology investigando simbiosis coral-zooxantela",
          "Simulación de bioluminiscencia marina a nivel cuántico",
          "Desarrollo de biomateriales inspirados en estructuras marinas"
        ]
      },
      geology: {
        title: "Geología y Geofísica Marina",
        description: "La geología y geofísica marina se benefician de la computación cuántica para modelar procesos complejos del fondo oceánico y del subsuelo marino. Los algoritmos cuánticos pueden simular interacciones multifásicas, procesos tectónicos y evolución de cuencas con mayor precisión y eficiencia computacional.",
        image: "/images/quantum/quantum_marine_geology.jpg",
        keyPoints: [
          "Técnicas cuánticas de inversión para mejorar interpretación de datos sísmicos submarinos",
          "Simulación multifásica de flujos gravitacionales y procesos sedimentarios",
          "Modelado integrado de sistemas de dorsales oceánicas con acoplamiento magmático-térmico",
          "Métodos cuánticos para reconstrucción paleoceanográfica de alta precisión",
          "Análisis mejorado de estabilidad de taludes submarinos para evaluación de riesgos"
        ],
        applications: [
          "Instituto Oceanográfico Cuántico desarrollando modelos de dorsales oceánicas",
          "Proyecto Quantum Seafloor simulando evolución de cuencas oceánicas",
          "Quantum Seismic Processing Initiative para caracterización del subsuelo marino",
          "Datación cuántica mejorada para cronoestratigrafía marina",
          "Evaluación avanzada de riesgos de tsunamis por deslizamientos submarinos"
        ]
      },
      atmosphere: {
        title: "Interfaz Océano-Atmósfera",
        description: "El estudio de la interfaz océano-atmósfera mediante computación cuántica permite abordar uno de los sistemas acoplados más complejos y determinantes para el clima global. Los algoritmos cuánticos facilitan el modelado de intercambios de energía, momento y masa entre estos dos medios a múltiples escalas.",
        image: "/images/quantum/quantum_ocean_atmosphere.jpg",
        keyPoints: [
          "Simulación cuántica de intercambios turbulentos en la capa límite océano-atmósfera",
          "Modelado preciso de transferencia de gases entre océano y atmósfera",
          "Representación mejorada de retroalimentaciones entre temperatura superficial del mar y convección",
          "Algoritmos VQE adaptados para dinámica no lineal de fenómenos como El Niño",
          "Integración de procesos a microescala con fenómenos climáticos a gran escala"
        ],
        applications: [
          "Initiative for Quantum Ocean-Atmosphere Coupling (IQOAC) modelando interacciones acopladas",
          "QuPOSA desarrollando sensores cuánticos para mediciones de la interfaz",
          "Simulación del fenómeno ENSO con predicción mejorada de eventos extremos",
          "Modelado de intensificación de ciclones tropicales sobre aguas cálidas",
          "Análisis cuántico de flujos de carbono entre océano y atmósfera"
        ]
      }
    },
    innovation: {
      miniaturization: {
        title: "Miniaturización de Sensores",
        description: "La miniaturización de sensores cuánticos está revolucionando la forma en que observamos y medimos los océanos. Estos dispositivos de última generación aprovechan propiedades cuánticas para lograr niveles sin precedentes de precisión, resolución y eficiencia energética en tamaños cada vez más reducidos.",
        image: "/images/quantum/quantum_sensors.jpg",
        keyPoints: [
          "Sensores cuánticos miniaturizados basados en defectos de centro NV en diamante",
          "Magnetómetros cuánticos para mediciones de alta precisión en plataformas pequeñas",
          "Gravímetros cuánticos para mapeo batimétrico desde vehículos autónomos",
          "Sensores de conductividad basados en efectos cuánticos para mediciones de salinidad",
          "Integración de múltiples sensores cuánticos en plataformas compactas"
        ],
        applications: [
          "Redes distribuidas de sensores cuánticos miniaturizados para observación global",
          "Equipamiento de flotadores Argo con sensores cuánticos de próxima generación",
          "Implementación en vehículos autónomos submarinos con capacidades de medición extendidas",
          "Monitoreo de precisión de parámetros críticos en áreas remotas",
          "Desarrollo de 'píldoras cuánticas' para trazado de masas de agua"
        ]
      },
      opensource: {
        title: "Desarrollo Open-Source",
        description: "El movimiento open-source en oceanografía cuántica está democratizando el acceso a herramientas avanzadas y acelerando la innovación a través de la colaboración global. Estas iniciativas están creando un ecosistema abierto que permite a investigadores de todo el mundo contribuir y beneficiarse de los avances en este campo emergente.",
        image: "/images/quantum/quantum_opensource.jpg",
        keyPoints: [
          "Bibliotecas de código abierto para algoritmos cuánticos específicos para oceanografía",
          "Frameworks colaborativos que integran modelos oceanográficos con procesadores cuánticos",
          "Repositorios compartidos de datos cuánticos para benchmarking y validación",
          "Comunidades de práctica que desarrollan conjuntamente casos de uso documentados",
          "Infraestructura de conocimiento distribuida con tutoriales y recursos educativos"
        ],
        applications: [
          "Proyecto OceanQ: biblioteca open-source para aplicaciones cuánticas oceanográficas",
          "QOceanPy: interfaz Python para algoritmos cuánticos aplicados a datos oceánicos",
          "Quantum-Ocean-Models: repositorio comunitario de modelos cuánticos para oceanografía",
          "OpenQuantumOcean: plataforma colaborativa para investigadores y desarrolladores",
          "Marine-Q-Learning: recursos educativos abiertos para formación en oceanografía cuántica"
        ]
      },
      methodology: {
        title: "Nuevas Metodologías",
        description: "El desarrollo de nuevas metodologías cuánticas está transformando los protocolos de investigación oceanográfica, desde el diseño experimental hasta el análisis de datos. Estos enfoques innovadores permiten abordar preguntas científicas previamente intratables y extraer más valor de los recursos de investigación existentes.",
        image: "/images/quantum/quantum_methodology.jpg",
        keyPoints: [
          "Protocolos de diseño experimental adaptados para aprovechar ventajas cuánticas",
          "Metodologías de validación para modelos cuánticos oceanográficos",
          "Enfoques multi-método que combinan observaciones, teoría y computación cuántica",
          "Técnicas de calibración cruzada entre sensores convencionales y cuánticos",
          "Protocolos de comunicación científica adaptados para investigación cuántica interdisciplinaria"
        ],
        applications: [
          "Quantum-Enhanced Sampling Protocol para optimizar campañas oceanográficas",
          "Multi-Scale Quantum Methodology para fenómenos oceanográficos acoplados",
          "Quantum Validation Framework para modelos oceanográficos avanzados",
          "Metodologías para transferencia de conocimiento entre campos oceanográficos y cuánticos",
          "Protocolos de calibración para nuevos sensores cuánticos en entornos marinos"
        ]
      },
      trial: {
        title: "Enfoque de Ensayo-Error",
        description: "El enfoque de ensayo-error en oceanografía cuántica reconoce la naturaleza exploratoria de este campo emergente. Esta metodología iterativa permite rápida experimentación, aprendizaje continuo y refinamiento de algoritmos y aplicaciones, acelerando el descubrimiento científico y la innovación tecnológica.",
        image: "/images/quantum/quantum_trial_error.jpg",
        keyPoints: [
          "Ciclos rápidos de desarrollo-prueba-evaluación para algoritmos cuánticos oceanográficos",
          "Benchmarking sistemático contra métodos clásicos establecidos",
          "Plataformas de experimentación para probar ideas cuánticas novedosas en oceanografía",
          "Documentación detallada de éxitos y fracasos para beneficio comunitario",
          "Procesos de revisión por pares adaptados para evaluar innovaciones cuánticas"
        ],
        applications: [
          "Quantum Oceanography Sandbox para experimentación segura con algoritmos",
          "Challenge-Based Innovation Sprints para resolver problemas oceanográficos específicos",
          "Comparative Algorithm Testing Framework para evaluación objetiva",
          "Failed-Approaches Repository para documentar lecciones aprendidas",
          "Quantum-Classical Hybrid Testbed para optimización incremental"
        ]
      },
      hybrid: {
        title: "Sistemas Híbridos Clásico-Cuánticos",
        description: "Los sistemas híbridos clásico-cuánticos representan un enfoque pragmático que combina lo mejor de ambos paradigmas computacionales. Estos sistemas aprovechan los procesadores clásicos para tareas en las que son eficientes y los procesadores cuánticos para problemas específicos donde ofrecen ventajas, creando soluciones más efectivas para aplicaciones oceanográficas reales.",
        image: "/images/quantum/quantum_hybrid.jpg",
        keyPoints: [
          "Arquitecturas que asignan dinámicamente tareas a procesadores clásicos o cuánticos",
          "Algoritmos híbridos donde pasos específicos se resuelven con procesamiento cuántico",
          "Preprocesamiento clásico para preparar problemas oceanográficos para computación cuántica",
          "Postprocesamiento clásico para interpretar y aplicar resultados cuánticos",
          "Sistemas de retroalimentación que optimizan la distribución de recursos computacionales"
        ],
        applications: [
          "Hybrid Ocean Circulation Models con componentes clásicos y cuánticos",
          "Quantum-Enhanced Data Assimilation Systems para predicción operacional",
          "Hybrid Quantum Learning para análisis de datos satelitales",
          "Simuladores oceanográficos con aceleradores cuánticos para procesos específicos",
          "Plataformas de modelado integrado con capacidades híbridas adaptativas"
        ]
      }
    },
    emergent: {
      selforganization: {
        title: "Modelos de Autoorganización",
        description: "Los modelos de autoorganización cuánticos ofrecen nuevas perspectivas sobre cómo los sistemas oceánicos desarrollan estructuras, patrones y comportamientos complejos a partir de interacciones locales simples. Estos modelos permiten simular fenómenos emergentes como formación de remolinos, estructuras frontales y agregaciones biológicas con mayor fidelidad.",
        image: "/images/quantum/quantum_selforganization.jpg",
        keyPoints: [
          "Algoritmos cuánticos inspirados en principios de autoorganización natural",
          "Simulación de transiciones de fase en sistemas oceanográficos complejos",
          "Modelado de procesos de retroalimentación positiva y negativa en dinámicas oceánicas",
          "Caracterización de atractores extraños en sistemas no lineales marinos",
          "Identificación de reglas simples que generan complejidad emergente"
        ],
        applications: [
          "Modelado de formación espontánea de frentes oceánicos",
          "Simulación de autoorganización en comunidades de plancton",
          "Predicción de estructuras coherentes en flujos turbulentos",
          "Estudio de procesos morfogenéticos en ecosistemas de arrecifes",
          "Análisis de patrones espaciotemporales en afloramientos costeros"
        ]
      },
      memory: {
        title: "Memoria Oceánica",
        description: "El concepto de memoria oceánica aborda cómo los océanos recuerdan condiciones previas y cómo esta memoria influye en estados futuros. Los enfoques cuánticos permiten representar y simular estos efectos de memoria de manera más sofisticada, capturando dependencias temporales complejas en sistemas oceánicos.",
        image: "/images/quantum/quantum_ocean_memory.jpg",
        keyPoints: [
          "Representaciones cuánticas de memoria térmica en masas de agua",
          "Modelado de efectos de histéresis en circulación oceánica",
          "Caracterización de tiempos de respuesta en diferentes componentes del sistema",
          "Simulación de memoria biogeoquímica en sedimentos y ecosistemas",
          "Análisis de cascadas de información a través de escalas temporales oceánicas"
        ],
        applications: [
          "Predicción de recuperación de ecosistemas después de perturbaciones",
          "Modelado de memoria climática en aguas profundas",
          "Análisis de efectos de eventos extremos en configuraciones futuras",
          "Estudios de persistencia de anomalías térmicas subsuperficiales",
          "Reconstrucción de estados oceánicos históricos a partir de señales de memoria"
        ]
      },
      complexity: {
        title: "Teoría de la Complejidad",
        description: "La teoría de la complejidad aplicada a oceanografía cuántica proporciona un marco teórico para entender sistemas oceánicos como entidades adaptativas complejas. Los algoritmos cuánticos pueden modelar más efectivamente las propiedades emergentes, auto-organización y comportamientos no lineales característicos de los océanos.",
        image: "/images/quantum/quantum_complexity.jpg",
        keyPoints: [
          "Aplicación de métricas de complejidad cuántica a sistemas oceanográficos",
          "Identificación de comportamientos críticos y transiciones de fase en dinámica oceánica",
          "Caracterización de complejidad computacional de problemas oceanográficos",
          "Análisis de propiedades de escalamiento fractal en fenómenos marinos",
          "Modelado de interacciones entre múltiples escalas acopladas"
        ],
        applications: [
          "Predicción de transiciones críticas en ecosistemas marinos",
          "Evaluación de resiliencia oceánica ante perturbaciones externas",
          "Identificación de indicadores tempranos de cambios de régimen",
          "Caracterización de límites fundamentales de predictibilidad en sistemas oceánicos",
          "Desarrollo de modelos reducidos que preservan complejidad esencial"
        ]
      },
      fractals: {
        title: "Fractales y Patrones Oceánicos",
        description: "Los sistemas oceánicos exhiben naturalmente geometrías fractales y patrones complejos a múltiples escalas. La computación cuántica ofrece nuevas herramientas para modelar, analizar y predecir estas estructuras auto-similares y arquitecturas no-lineales, revelando conexiones profundas entre orden y caos en la dinámica oceánica.",
        image: "/images/quantum/quantum_fractals.jpg",
        keyPoints: [
          "Caracterización cuántica de geometrías fractales en fenómenos oceánicos como turbulencia y filamentos",
          "Análisis de auto-similaridad en estructuras oceánicas a diferentes escalas",
          "Modelado de evolución caótica en sistemas deterministas oceánicos sensibles a condiciones iniciales",
          "Identificación de atractores extraños en dinámicas oceánicas mediante simulación cuántica",
          "Estudio de bordes fractales en interfaces oceánicas (frentes, remolinos, líneas costeras)"
        ],
        applications: [
          "Predicción mejorada de dispersión de contaminantes mediante simulaciones de transporte caótico",
          "Caracterización fractal de turbulencia oceánica para parametrizaciones más precisas",
          "Análisis de patrones de distribución biológica que siguen geometrías fractales",
          "Modelado de evolución de líneas costeras usando dimensión fractal en contexto climático",
          "Desarrollo de sensores cuánticos optimizados para detectar patrones fractales característicos"
        ],
        resources: [
          "Quantum Fractal Ocean Initiative (QFOI)",
          "Journal of Quantum Chaos and Oceanic Patterns",
          "International Database of Ocean Fractal Signatures"
        ]
      },
      emergence: {
        title: "Propiedades Emergentes",
        description: "El estudio de propiedades emergentes en oceanografía cuántica se centra en cómo surgen comportamientos y patrones complejos a nivel de sistema que no son evidentes en los componentes individuales. Los métodos cuánticos pueden capturar estas dinámicas emergentes con mayor fidelidad que los enfoques reduccionistas clásicos.",
        image: "/images/quantum/quantum_emergence.jpg",
        keyPoints: [
          "Algoritmos cuánticos para detectar propiedades emergentes en datos oceanográficos",
          "Modelado de emergencia de estructuras coherentes en flujos turbulentos",
          "Simulación de comportamientos colectivos en ecosistemas marinos",
          "Caracterización de propiedades sistémicas no reducibles a componentes",
          "Análisis de información emergente en sistemas acoplados océano-atmósfera"
        ],
        applications: [
          "Predicción de patrones de biodiversidad emergentes bajo presiones cambiantes",
          "Modelado de formación espontánea de giros y corrientes de mesoescala",
          "Estudio de comportamientos colectivos en poblaciones marinas",
          "Análisis de ciclos biogeoquímicos como propiedades emergentes",
          "Identificación de tipping points en sistemas oceanográficos complejos"
        ]
      },
      networks: {
        title: "Redes Complejas Oceánicas",
        description: "El análisis de redes complejas en oceanografía cuántica permite representar sistemas oceánicos como conjuntos interconectados de elementos, revelando propiedades estructurales y funcionales a nivel de sistema. Los algoritmos cuánticos ofrecen ventajas para caracterizar redes masivas con topologías complejas y dinámicas.",
        image: "/images/quantum/quantum_networks.jpg",
        keyPoints: [
          "Modelado cuántico de redes de transporte oceánico y conectividad",
          "Análisis de topologías de redes tróficas marinas y su resiliencia",
          "Caracterización de redes de teleconexiones climáticas océano-atmósfera",
          "Simulación de difusión y flujos en redes oceanográficas complejas",
          "Detección de comunidades y patrones modulares en ecosistemas marinos"
        ],
        applications: [
          "Optimización de diseño de áreas marinas protegidas basada en conectividad",
          "Modelado de dispersión de especies invasoras a través de redes de transporte",
          "Análisis de vulnerabilidad de ecosistemas basado en estructura de red",
          "Predicción de cascadas de extinción en redes tróficas marinas",
          "Caracterización de flujos de información en sistemas oceanográficos acoplados"
        ]
      }
    },
    platforms: {
      software: {
        title: "Software Cuántico Especializado",
        description: "El software cuántico especializado para oceanografía proporciona herramientas adaptadas a las necesidades específicas de la comunidad investigadora marina. Estas soluciones de software facilitan la transición entre paradigmas computacionales clásicos y cuánticos, permitiendo a oceanógrafos aprovechar las ventajas cuánticas sin necesidad de experiencia profunda en física cuántica.",
        image: "/images/quantum/quantum_software.jpg",
        keyPoints: [
          "Bibliotecas de algoritmos cuánticos optimizados para problemas oceanográficos comunes",
          "Interfaces de programación que abstraen complejidades cuánticas subyacentes",
          "Herramientas de traducción automática de modelos oceanográficos a circuitos cuánticos",
          "Entornos de desarrollo integrados para simulación oceanográfica cuántica",
          "Plataformas de visualización adaptadas para resultados de computación cuántica"
        ],
        applications: [
          "OceanQ Suite: conjunto de herramientas para análisis de datos oceanográficos cuánticos",
          "QuantumFlow: software para simulación de dinámica de fluidos oceánicos",
          "MarineQiskit: extensión especializada de Qiskit para aplicaciones oceánicas",
          "Quantum Ocean Workbench: plataforma integrada de modelado oceanográfico cuántico",
          "QuantumViz: herramientas de visualización para resultados de simulaciones cuánticas"
        ]
      },
      cloud: {
        title: "Acceso Cuántico en la Nube",
        description: "El acceso cuántico en la nube democratiza el uso de procesadores cuánticos para la comunidad oceanográfica global. Estas plataformas eliminan la necesidad de infraestructura local costosa, permitiendo a investigadores de todo el mundo ejecutar algoritmos cuánticos en hardware de vanguardia a través de interfaces web accesibles.",
        image: "/images/quantum/quantum_cloud.jpg",
        keyPoints: [
          "Servicios cuánticos en la nube optimizados para aplicaciones oceanográficas",
          "Interfaces de programación accesibles para investigadores marinos",
          "Integración con repositorios de datos oceanográficos estándar",
          "Capacidades de escalado adaptativo según complejidad de problemas",
          "Herramientas colaborativas para desarrollo y ejecución de experimentos"
        ],
        applications: [
          "OceanQ Cloud: plataforma especializada para oceanografía cuántica",
          "Quantum Ocean Lab: entorno virtual para experimentación cuántica oceanográfica",
          "Marine Quantum Access Program: iniciativa para democratizar acceso a instituciones marinas",
          "Hybrid Cloud Solutions: combinación de procesamiento clásico y cuántico para oceanografía",
          "Educational Quantum Platforms: recursos en la nube para formación en oceanografía cuántica"
        ]
      },
      sensors: {
        title: "Redes de Sensores Avanzados",
        description: "Las redes de sensores avanzados basados en principios cuánticos están transformando nuestra capacidad de observación oceánica. Estos sistemas distribuidos proporcionan mediciones de precisión sin precedentes, mayor cobertura espaciotemporal y nuevos tipos de observaciones previamente imposibles con tecnologías convencionales.",
        image: "/images/quantum/quantum_sensor_networks.jpg",
        keyPoints: [
          "Sensores cuánticos interconectados para monitoreo oceánico distribuido",
          "Sistemas de comunicación cuántica para transmisión de datos entre nodos",
          "Protocolos de autocalibración y validación de mediciones en tiempo real",
          "Plataformas autónomas equipadas con múltiples sensores cuánticos",
          "Estrategias de despliegue adaptativo basadas en información en tiempo real"
        ],
        applications: [
          "Quantum Argo: nueva generación de flotadores con sensores cuánticos",
          "Coastal Quantum Network: sistema integrado de monitoreo costero",
          "Deep Ocean Observatory Network: sensores cuánticos para monitoreo abisal",
          "Quantum Buoy Array: red de boyas con capacidades de medición avanzadas",
          "Marine Quantum Sensing Grid: infraestructura distribuida para observación global"
        ]
      },
      frameworks: {
        title: "Frameworks de Integración",
        description: "Los frameworks de integración proporcionan arquitecturas unificadas para combinar componentes cuánticos y clásicos en sistemas oceanográficos funcionales. Estas plataformas facilitan la interoperabilidad entre diversas herramientas, datos y modelos, permitiendo enfoques holísticos para abordar problemas oceanográficos complejos.",
        image: "/images/quantum/quantum_frameworks.jpg",
        keyPoints: [
          "Arquitecturas modulares que conectan componentes clásicos y cuánticos",
          "Interfaces estandarizadas para integración de diversas fuentes de datos",
          "Protocolos de comunicación entre sistemas heterogéneos",
          "Mecanismos de orquestación para flujos de trabajo complejos",
          "Capacidades de trazabilidad para asegurar reproducibilidad científica"
        ],
        applications: [
          "Quantum-Classical Ocean Framework (QCOF): arquitectura de referencia para integración",
          "Marine Digital Twin Platform: framework para gemelos digitales oceánicos",
          "Quantum Oceanographic Analysis Environment: ecosistema integrado de herramientas",
          "Modular Ocean Prediction System (MOPS): framework para predicción operational",
          "Integrated Marine Information System: plataforma para gestión de conocimiento oceanográfico"
        ]
      },
      apis: {
        title: "APIs y Estándares",
        description: "El desarrollo de APIs y estándares en oceanografía cuántica establece los cimientos para un ecosistema interoperable y sostenible. Estos elementos garantizan que herramientas, datos y plataformas puedan comunicarse eficientemente, fomentando la colaboración y acelerando la adopción de tecnologías cuánticas en la comunidad oceanográfica.",
        image: "/images/quantum/quantum_apis.jpg",
        keyPoints: [
          "APIs estandarizadas para acceso a procesadores cuánticos desde aplicaciones oceanográficas",
          "Protocolos de intercambio de datos compatibles con formatos oceanográficos establecidos",
          "Estándares de representación para estados cuánticos de variables oceánicas",
          "Especificaciones para asegurar reproducibilidad de experimentos cuánticos",
          "Frameworks de metadatos para documentar proveniencia de resultados cuánticos"
        ],
        applications: [
          "Quantum Ocean API: interfaz estandarizada para aplicaciones oceanográficas cuánticas",
          "Marine Quantum Data Format: especificación para intercambio de datos cuánticos",
          "Reproducible Quantum Oceanography Standard: protocolo para reproducibilidad científica",
          "Quantum-Enhanced NetCDF: extensión de formatos oceanográficos para datos cuánticos",
          "Quantum Ocean Metadata Convention: estándar para documentación de experimentos"
        ]
      }
    },
    future: {
      shortterm: {
        title: "Hoja de Ruta a Corto Plazo",
        description: "La hoja de ruta a corto plazo (1-3 años) para oceanografía cuántica se centra en desarrollos fundamentales que establecerán las bases para avances futuros. Esta fase inicial está marcada por pruebas de concepto, desarrollo de infraestructura básica y formación interdisciplinaria para construir capacidades en este campo emergente.",
        image: "/images/quantum/quantum_shortterm.jpg",
        keyPoints: [
          "Desarrollo de algoritmos híbridos que combinan procesamiento clásico y cuántico",
          "Pruebas de concepto en problemas oceanográficos específicos y acotados",
          "Formación interdisciplinaria de científicos en oceanografía y computación cuántica",
          "Establecimiento de infraestructura de acceso a procesadores cuánticos",
          "Creación de repositorios compartidos de algoritmos y datos de referencia"
        ],
        applications: [
          "Implementación de algoritmos cuánticos para problemas simplificados de circulación",
          "Desarrollo de formatos de datos compatibles con procesamiento cuántico",
          "Establecimiento de programas educativos en oceanografía cuántica",
          "Creación de consorcios iniciales entre instituciones oceanográficas y empresas cuánticas",
          "Publicación de estudios comparativos entre métodos clásicos y cuánticos"
        ]
      },
      midterm: {
        title: "Desarrollos a Medio Plazo",
        description: "Los desarrollos a medio plazo (3-7 años) en oceanografía cuántica verán la aplicación de tecnologías cuánticas más maduras a problemas oceanográficos significativos. Esta fase se caracteriza por la implementación de soluciones integradas y el comienzo de aplicaciones operacionales en áreas clave.",
        image: "/images/quantum/quantum_midterm.jpg",
        keyPoints: [
          "Implementación de componentes cuánticos en modelos oceanográficos operacionales",
          "Despliegue inicial de redes de sensores basados en principios cuánticos",
          "Desarrollo de simulaciones oceánicas integradas con elementos cuánticos",
          "Implementación de sistemas de asimilación de datos potenciados cuánticamente",
          "Establecimiento de estándares y protocolos para oceanografía cuántica"
        ],
        applications: [
          "Modelos de predicción oceánica regional con componentes cuánticos",
          "Redes piloto de sensores cuánticos en regiones oceánicas clave",
          "Sistemas de asimilación de datos satelitales con algoritmos cuánticos",
          "Plataformas integradas para simulación de ecosistemas marinos",
          "Aplicaciones operacionales de algoritmos cuánticos para problemáticas específicas"
        ]
      },
      longterm: {
        title: "Visión a Largo Plazo",
        description: "La visión a largo plazo (7+ años) para la oceanografía cuántica contempla una transformación fundamental en nuestra capacidad para observar, comprender y predecir sistemas oceánicos. En esta fase, las tecnologías cuánticas estarán plenamente integradas en la oceanografía mainstream, posibilitando avances científicos sin precedentes.",
        image: "/images/quantum/quantum_longterm.jpg",
        keyPoints: [
          "Simulaciones completamente cuánticas de aspectos seleccionados del sistema oceánico",
          "Integración de sistemas cuánticos en infraestructuras oceanográficas globales",
          "Redes globales de sensores cuánticos para monitoreo oceánico continuo",
          "Gemelos digitales oceanográficos de alta fidelidad potenciados por computación cuántica",
          "Descubrimientos fundamentales facilitados por capacidades cuánticas avanzadas"
        ],
        applications: [
          "Predicción operacional cuántica de eventos oceanográficos extremos",
          "Sistemas globales de observación con componentes cuánticos integrados",
          "Modelos completamente cuánticos para procesos oceanográficos seleccionados",
          "Plataformas de simulación oceánica accesibles con backends cuánticos",
          "Infraestructuras de investigación marina con componentes cuánticos nativos"
        ]
      },
      challenges: {
        title: "Desafíos y Oportunidades",
        description: "El campo de la oceanografía cuántica enfrenta importantes desafíos técnicos, científicos y organizacionales, pero también presenta oportunidades sin precedentes para transformar nuestra comprensión de los océanos. Navegar estos desafíos requerirá colaboración interdisciplinaria e inversiones estratégicas en áreas clave.",
        image: "/images/quantum/quantum_challenges.jpg",
        keyPoints: [
          "Limitaciones actuales de hardware: número de qubits, tasas de error y conectividad",
          "Desafíos de traducción de modelos físicos oceanográficos al formalismo cuántico",
          "Necesidad de científicos con formación tanto en oceanografía como en computación cuántica",
          "Requisitos de integración con infraestructuras computacionales existentes",
          "Necesidad de marcos de validación para resultados de simulaciones cuánticas"
        ],
        applications: [
          "Programas de formación interdisciplinaria en oceanografía cuántica",
          "Desarrollo de algoritmos específicos para limitaciones de hardware actuales",
          "Creación de espacios colaborativos entre comunidades oceanográfica y cuántica",
          "Iniciativas de acceso a hardware cuántico para científicos oceanográficos",
          "Elaboración de hojas de ruta coordinadas para investigación y desarrollo"
        ]
      },
      collaborations: {
        title: "Colaboraciones Estratégicas",
        description: "Las colaboraciones estratégicas entre instituciones oceanográficas, empresas tecnológicas, agencias gubernamentales y academia son esenciales para el avance de la oceanografía cuántica. Estos esfuerzos coordinados maximizan recursos, conocimientos y capacidades para abordar los complejos desafíos interdisciplinarios de este campo emergente.",
        image: "/images/quantum/quantum_collaborations.jpg",
        keyPoints: [
          "Consorcios internacionales que conectan expertos en oceanografía y tecnologías cuánticas",
          "Colaboraciones público-privadas para desarrollo de aplicaciones y hardware especializado",
          "Redes académicas para formación interdisciplinaria e intercambio de conocimientos",
          "Programas de financiación coordinados entre agencias de ciencias oceánicas y cuánticas",
          "Plataformas abiertas para compartir recursos, datos y resultados"
        ],
        applications: [
          "Quantum Earth Initiative: colaboración entre NASA, NOAA y empresas cuánticas",
          "Quantum Blue Computing: consorcio de institutos oceanográficos y empresas tecnológicas",
          "CryoQuantum Network: red internacional centrada en regiones polares",
          "Quantum Ocean Observation Consortium: colaboración para sensores cuánticos avanzados",
          "Blue Quantum Alliance: iniciativa global para aplicaciones cuánticas en océanos"
        ]
      }
    }
  };

  // Renderizar el contenido del tópico seleccionado
  const renderTopicContent = () => {
    const categoryData = content[selectedCategory];
    if (!categoryData) return <div>Categoría no encontrada</div>;

    const topicData = categoryData[selectedTopic];
    if (!topicData) return <div>Tópico no encontrado</div>;

    return (
      <div className="mt-8">
        <h3 className="text-2xl font-bold text-purple-800 mb-4">{topicData.title}</h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <p className="text-gray-700 mb-6">{topicData.description}</p>
            
            <div className="mb-6">
              <h4 className="text-xl font-semibold text-purple-700 mb-3">Puntos Clave</h4>
              <ul className="space-y-2">
                {topicData.keyPoints.map((point, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-purple-500 mr-2">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-xl font-semibold text-purple-700 mb-3">Aplicaciones</h4>
              <ul className="space-y-2">
                {topicData.applications.map((app, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-indigo-500 mr-2">→</span>
                    <span>{app}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="bg-gray-100 p-4 rounded-lg">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg mb-4">
              <Image 
                src={topicData.image} 
                alt={topicData.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
              />
            </div>
            
            {topicData.resources && (
              <div>
                <h4 className="text-lg font-semibold text-purple-700 mb-2">Recursos Adicionales</h4>
                <ul className="space-y-1">
                  {topicData.resources.map((resource, index) => (
                    <li key={index} className="text-purple-600 hover:underline cursor-pointer">
                      {resource}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      {/* Pestañas de categorías */}
      <div className="overflow-x-auto">
        <div className="flex border-b min-w-max">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`px-4 py-3 text-sm md:text-base font-medium whitespace-nowrap transition-colors duration-200 ${
                selectedCategory === category.id
                  ? "text-purple-700 border-b-2 border-purple-700 bg-purple-50"
                  : "text-gray-600 hover:text-purple-500 hover:bg-gray-50"
              }`}
              onClick={() => {
                setSelectedCategory(category.id);
                // Seleccionar el primer tópico de la categoría
                const topicsInCategory = topicsByCategory[category.id];
                if (topicsInCategory && topicsInCategory.length > 0 && topicsInCategory[0]) {
                  setSelectedTopic(topicsInCategory[0].id);
                }
              }}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Selector de tópicos */}
      <div className="bg-gray-50 p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {topicsByCategory[selectedCategory]?.map((topic) => (
            <button
              key={topic.id}
              className={`px-3 py-2 rounded text-sm transition-colors ${
                selectedTopic === topic.id
                  ? "bg-purple-600 text-white"
                  : "bg-white hover:bg-purple-100 text-gray-700 border border-gray-300"
              }`}
              onClick={() => setSelectedTopic(topic.id)}
            >
              {topic.name}
            </button>
          ))}
        </div>
      </div>

      {/* Contenido del tópico */}
      <div className="p-6">
        {renderTopicContent()}
      </div>
    </div>
  );
};

export default QuantumOceanography;