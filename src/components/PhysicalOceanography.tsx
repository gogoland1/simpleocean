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

const PhysicalOceanography = () => {
  // Estado para la categoría y el tópico seleccionados
  const [selectedCategory, setSelectedCategory] = useState("fundamentals");
  const [selectedTopic, setSelectedTopic] = useState("introduction");

  // Datos de las categorías y tópicos
  const categories = [
    { id: "fundamentals", name: "Fundamentos de Oceanografía Física" },
    { id: "circulation", name: "Dinámica y Circulación Oceánica" },
    { id: "waves", name: "Olas, Ondas y Mareas" },
    { id: "scales", name: "Fenómenos de Escala" },
    { id: "interaction", name: "Interacción Océano-Atmósfera" },
    { id: "observation", name: "Métodos Observacionales y Análisis" },
    { id: "modeling", name: "Modelado Numérico y Aplicaciones IA" },
  ];

  // Mapa de tópicos por categoría
  const topicsByCategory: { [key: string]: { id: string; name: string }[] } = {
    fundamentals: [
      { id: "introduction", name: "Introducción a la Oceanografía Física" },
      { id: "properties", name: "Propiedades del Agua de Mar" },
      { id: "equations", name: "Ecuaciones Fundamentales" },
      { id: "optics", name: "Óptica Marina" },
    ],
    circulation: [
      { id: "geostrophic", name: "Corrientes Geostróficas" },
      { id: "thermohaline", name: "Circulación Termohalina" },
      { id: "ekman", name: "Transporte de Ekman" },
      { id: "coastal", name: "Circulación Costera" },
      { id: "boundary", name: "Corrientes de Borde" },
    ],
    waves: [
      { id: "surface", name: "Olas Superficiales" },
      { id: "internal", name: "Ondas Internas" },
      { id: "kelvin", name: "Ondas de Kelvin y Rossby" },
      { id: "tides", name: "Mareas y Fenómenos Asociados" },
      { id: "spectral", name: "Análisis Espectral" },
    ],
    scales: [
      { id: "submesoscale", name: "Procesos de Submesoescala" },
      { id: "mesoscale", name: "Fenómenos de Mesoescala" },
      { id: "gyres", name: "Giros Oceánicos" },
      { id: "fronts", name: "Frentes y Filamentos" },
      { id: "eddies", name: "Remolinos" },
    ],
    interaction: [
      { id: "heatflux", name: "Flujos de Calor" },
      { id: "momentum", name: "Transferencia de Momentum" },
      { id: "elnino", name: "El Niño y Teleconexiones" },
      { id: "climate", name: "Rol Oceánico en el Clima" },
    ],
    observation: [
      { id: "remote", name: "Sensores Remotos" },
      { id: "insitu", name: "Mediciones In-Situ" },
      { id: "timeseries", name: "Series Temporales" },
      { id: "dataanalysis", name: "Técnicas de Análisis de Datos" },
    ],
    modeling: [
      { id: "numerical", name: "Modelos Numéricos" },
      { id: "coastal", name: "Modelos Costeros" },
      { id: "global", name: "Modelos Globales" },
      { id: "ai", name: "Aplicaciones de IA" },
      { id: "dataassimilation", name: "Asimilación de Datos" },
    ],
  };

  // Contenido detallado de cada tópico
  const content: CategoriesData = {
    fundamentals: {
      introduction: {
        title: "Introducción a la Oceanografía Física",
        description: "La oceanografía física estudia los procesos físicos que ocurren en los océanos, incluyendo las corrientes, olas, mareas y la distribución de temperatura y salinidad. Esta disciplina combina principios de física de fluidos, termodinámica y mecánica para entender cómo se mueve el agua del océano y cómo interactúa con la atmósfera y los continentes.",
        image: "/images/physics/ocean_currents.jpg",
        keyPoints: [
          "Los océanos cubren aproximadamente el 71% de la superficie terrestre y contienen el 97% del agua del planeta",
          "La circulación oceánica global transporta calor desde el ecuador hacia los polos, regulando el clima terrestre",
          "La oceanografía física moderna combina observaciones in-situ, datos satelitales y modelado numérico",
          "Las escalas espaciales en oceanografía van desde milímetros hasta miles de kilómetros",
          "Las escalas temporales abarcan desde segundos (turbulencia) hasta siglos (circulación profunda)"
        ],
        applications: [
          "Predicción de corrientes oceánicas para navegación y transporte marítimo",
          "Estudio del cambio climático y su impacto en los océanos",
          "Manejo de recursos costeros y evaluación de riesgos",
          "Detección y seguimiento de contaminantes marinos",
          "Optimización de rutas de navegación y eficiencia energética"
        ]
      },
      properties: {
        title: "Propiedades del Agua de Mar",
        description: "El agua de mar posee propiedades físicas y químicas únicas que influyen en la dinámica de los océanos. La temperatura, salinidad y presión determinan la densidad del agua, que es fundamental para la estratificación oceánica y la circulación. Entender estas propiedades es crucial para comprender los procesos oceanográficos.",
        image: "/images/physics/water_properties.jpg",
        keyPoints: [
          "La ecuación de estado del agua de mar relaciona temperatura, salinidad y presión con densidad",
          "La salinidad promedio global es de aproximadamente 35 PSU (Practical Salinity Units)",
          "La temperatura superficial varía desde -2°C en regiones polares hasta 30°C en trópicos",
          "La termoclina es la capa donde la temperatura cambia rápidamente con la profundidad",
          "La picnoclina es donde la densidad cambia rápidamente con la profundidad"
        ],
        applications: [
          "Determinación de estructuras de masas de agua y su origen",
          "Cálculo de velocidades de corrientes geostróficas",
          "Estimación de capacidad de absorción de CO2 y calor",
          "Evaluación de estabilidad y mezcla vertical",
          "Estudios de acústica submarina (propagación del sonido)"
        ]
      },
      equations: {
        title: "Ecuaciones Fundamentales",
        description: "Las ecuaciones fundamentales en oceanografía física describen la conservación de masa, momento y energía en los fluidos oceánicos. Estas ecuaciones de Navier-Stokes, adaptadas para la Tierra en rotación y estratificada, son la base del entendimiento de los procesos dinámicos en el océano y su modelado numérico.",
        image: "/images/physics/equations.jpg",
        keyPoints: [
          "Ecuaciones de Navier-Stokes con fuerza de Coriolis (rotación terrestre)",
          "Aproximación de Boussinesq para fluidos estratificados (densidad variable)",
          "Balance geostrófico: equilibrio entre gradiente de presión y fuerza de Coriolis",
          "Ecuación de continuidad (conservación de masa)",
          "Ecuaciones de conservación de calor y sal"
        ],
        applications: [
          "Desarrollo de modelos numéricos de circulación oceánica",
          "Cálculo de transportes de masas de agua y propiedades",
          "Análisis de balances de fuerzas en diferentes regiones",
          "Estimación de velocidades verticales (difíciles de medir directamente)",
          "Predicción de evolución de campos de temperatura y salinidad"
        ]
      },
      optics: {
        title: "Óptica Marina",
        description: "La óptica marina estudia cómo la luz interactúa con el agua de mar y sus componentes. La absorción, dispersión y reflexión de la luz en el océano son procesos fundamentales que determinan el color del mar, la penetración de la radiación solar y afectan directamente la productividad biológica oceánica.",
        image: "/images/physics/ocean_optics.jpg",
        keyPoints: [
          "El agua pura absorbe fuertemente la luz roja e infrarroja, dejando pasar más la luz azul",
          "Los constituyentes ópticamente activos incluyen fitoplancton, materia orgánica disuelta y partículas",
          "La zona eufótica es la capa donde penetra suficiente luz para la fotosíntesis (típicamente 50-200m)",
          "La teledetección multiespectral e hiperespectral permite estimar concentraciones de clorofila",
          "El coeficiente de atenuación difusa (Kd) describe cómo disminuye la luz con la profundidad"
        ],
        applications: [
          "Detección satelital de floraciones de algas y contaminantes",
          "Clasificación de masas de agua basada en propiedades ópticas",
          "Estimación de productividad primaria oceánica",
          "Desarrollo de algoritmos para corrección atmosférica en imágenes satelitales",
          "Diseño de instrumentos ópticos submarinos para investigación"
        ]
      }
    },
    circulation: {
      geostrophic: {
        title: "Corrientes Geostróficas",
        description: "Las corrientes geostróficas representan el flujo oceánico en equilibrio entre la fuerza del gradiente de presión y la fuerza de Coriolis. Este balance geostrófico domina la circulación de gran escala en los océanos fuera de la capa límite superficial y el ecuador, permitiendo calcular velocidades a partir de la distribución de densidad.",
        image: "/images/physics/geostrophic_current.jpg",
        keyPoints: [
          "El balance geostrófico es fundamental en escalas espaciales grandes y temporales largas",
          "Las corrientes fluyen paralelas a las isobaras (líneas de igual presión)",
          "En el hemisferio norte, el flujo es con altas presiones a la derecha",
          "La velocidad geostrófica puede calcularse a partir de perfiles de temperatura y salinidad",
          "La altimetría satelital permite estimar corrientes geostróficas superficiales"
        ],
        applications: [
          "Mapeo de patrones de circulación oceánica global",
          "Cálculo de transportes de volumen, calor y sal",
          "Identificación de frentes oceánicos y corrientes intensas",
          "Análisis de variabilidad de corrientes a escala estacional e interanual",
          "Validación de modelos de circulación oceánica"
        ]
      },
      thermohaline: {
        title: "Circulación Termohalina",
        description: "La circulación termohalina es el sistema global de corrientes oceánicas profundas impulsadas por diferencias de densidad causadas por variaciones de temperatura y salinidad. Este 'cinturón transportador oceánico' conecta todos los océanos y juega un papel crucial en la regulación del clima terrestre.",
        image: "/images/physics/thermohaline.jpg",
        keyPoints: [
          "Ciclo completo de recirculación que puede durar ~1000 años",
          "Formación de agua profunda en regiones polares (Atlántico Norte, Antártida)",
          "Transporte de agua profunda fría a lo largo del fondo oceánico",
          "Afloramiento gradual en el Océano Índico y Pacífico",
          "Retorno superficial hacia las regiones de formación de agua profunda"
        ],
        applications: [
          "Entendimiento del papel oceánico en el sistema climático global",
          "Estudio de mecanismos de almacenamiento y transporte de calor",
          "Análisis de captura y secuestro de carbono atmosférico",
          "Evaluación de impactos del cambio climático en circulación oceánica",
          "Investigación de eventos paleoclimáticos y cambios abruptos"
        ]
      },
      ekman: {
        title: "Transporte de Ekman",
        description: "El transporte de Ekman describe el movimiento de las capas superficiales del océano inducido por el viento, incorporando el efecto de la rotación terrestre. Debido a la fuerza de Coriolis, el agua se mueve a un ángulo respecto a la dirección del viento, resultando en un transporte neto perpendicular al viento.",
        image: "/images/physics/ekman_transport.jpg",
        keyPoints: [
          "El agua superficial se mueve a 45° de la dirección del viento en la superficie",
          "La dirección del movimiento cambia con la profundidad (espiral de Ekman)",
          "El transporte neto integrado es a 90° a la derecha del viento (en hemisferio norte)",
          "La profundidad de la capa de Ekman varía típicamente entre 10-200m",
          "El bombeo de Ekman crea zonas de convergencia/divergencia que inducen movimientos verticales"
        ],
        applications: [
          "Predicción de afloramientos costeros importantes para pesquerías",
          "Análisis de transporte y acumulación de contaminantes superficiales",
          "Estudio de formación de frentes oceánicos y zonas productivas",
          "Cálculo de balances de calor en capa mixta superficial",
          "Comprensión de respuesta oceánica a cambios en patrones de viento"
        ]
      },
      coastal: {
        title: "Circulación Costera",
        description: "La circulación costera comprende los patrones de flujo en regiones costeras y de plataforma continental, donde la batimetría, los vientos costeros, los aportes fluviales y las mareas interactúan para crear sistemas dinámicos complejos con importantes implicaciones ecológicas y socioeconómicas.",
        image: "/images/physics/coastal_circulation.jpg",
        keyPoints: [
          "Afloramientos costeros generados por vientos paralelos a la costa",
          "Corrientes impulsadas por gradientes de densidad de origen fluvial",
          "Corrientes de marea amplificadas por confinamiento en plataformas someras",
          "Ondas atrapadas a la costa que se propagan con la costa a la derecha (HN)",
          "Frentes de densidad que separan aguas costeras de oceánicas"
        ],
        applications: [
          "Gestión de recursos pesqueros y acuicultura",
          "Planificación costera y evaluación de erosión",
          "Predicción de dispersión de contaminantes y derrames",
          "Optimización de operaciones portuarias y navegación",
          "Diseño de infraestructuras costeras y energías renovables marinas"
        ]
      },
      boundary: {
        title: "Corrientes de Borde",
        description: "Las corrientes de borde son flujos intensos y angostos que se forman a lo largo de los márgenes continentales, siendo elementos cruciales de la circulación oceánica global. Incluyen corrientes de borde occidental intensificadas (como la Corriente del Golfo) y corrientes de borde oriental más amplias y difusas.",
        image: "/images/physics/boundary_currents.jpg",
        keyPoints: [
          "Corrientes de borde occidental: estrechas, profundas e intensas (Golfo, Kuroshio)",
          "Corrientes de borde oriental: más anchas, someras y lentas (Canarias, California)",
          "Intensificación occidental debido a la variación del parámetro de Coriolis con latitud",
          "Transporte de calor significativo hacia los polos en corrientes occidentales",
          "Alta variabilidad y formación de meandros y remolinos"
        ],
        applications: [
          "Navegación marítima y optimización de rutas comerciales",
          "Estudios de transporte meridional de calor para balance climático",
          "Análisis de ecosistemas marinos asociados a corrientes productivas",
          "Evaluación de potencial energético para turbinas de corrientes marinas",
          "Seguimiento de objetos flotantes y dispersión de contaminantes"
        ]
      }
    },
    waves: {
      surface: {
        title: "Olas Superficiales",
        description: "Las olas superficiales son ondulaciones de la interfaz aire-agua generadas principalmente por el viento. Su estudio abarca desde la generación, propagación y transformación, hasta su disipación. La teoría de olas gravitatorias describe su comportamiento en términos de parámetros como altura, longitud de onda, periodo y energía.",
        image: "/images/physics/surface_waves.jpg",
        keyPoints: [
          "Generación por transferencia de energía del viento a la superficie del agua",
          "Clasificación por periodo: capilares, gravitatorias, infragravitatorias, marea",
          "Propagación como dispersivas: diferentes longitudes de onda viajan a diferentes velocidades",
          "Transformación en aguas someras: refracción, difracción, asomeramiento",
          "El espectro de oleaje describe distribución de energía por frecuencias y direcciones"
        ],
        applications: [
          "Diseño de estructuras costeras y marinas",
          "Predicción de estados de mar para navegación segura",
          "Estimación de riesgos de erosión costera",
          "Evaluación de potencial de energía undimotriz",
          "Estudios de transporte de sedimentos en zonas costeras"
        ]
      },
      internal: {
        title: "Ondas Internas",
        description: "Las ondas internas son oscilaciones que ocurren en el interior del océano estratificado, donde existen gradientes de densidad. A diferencia de las olas superficiales, pueden alcanzar amplitudes mucho mayores (decenas de metros) y son fundamentales para la mezcla oceánica y el transporte vertical de nutrientes.",
        image: "/images/physics/internal_waves.jpg",
        keyPoints: [
          "Se propagan a lo largo de interfaces de densidad o picnoclinas",
          "Generadas por interacción de corrientes con topografía o por ajustes de masas de agua",
          "Amplitudes típicas de 10-50m, mucho mayores que las olas superficiales",
          "Períodos que van desde minutos hasta horas (cerca de la frecuencia de Brunt-Väisälä)",
          "Pueden romperse y causar mezcla vertical intensa"
        ],
        applications: [
          "Comprensión de mezcla oceánica y balance energético global",
          "Estimación de disponibilidad de nutrientes para productividad biológica",
          "Interpretación de imágenes satelitales de rugosidad superficial",
          "Evaluación de impactos en operaciones submarinas (ROVs, submarinos)",
          "Análisis de interacciones con infraestructuras submarinas (plataformas, cables)"
        ]
      },
      kelvin: {
        title: "Ondas de Kelvin y Rossby",
        description: "Las ondas de Kelvin y Rossby son fenómenos de gran escala fundamentales para la dinámica oceánica planetaria. Estas ondas son moduladas por la rotación terrestre y la estratificación, y son cruciales para entender las teleconexiones oceánicas y fenómenos como El Niño Oscilación del Sur (ENSO).",
        image: "/images/physics/kelvin_rossby.jpg",
        keyPoints: [
          "Ondas de Kelvin: atrapadas a límites (costa, ecuador), se propagan con el límite a la derecha (HN)",
          "Ondas de Rossby: planetarias, se propagan hacia el oeste, causadas por variación de Coriolis",
          "Velocidades de fase: Kelvin (~2-3 m/s), Rossby (cm/s a pocos m/s)",
          "Las ondas de Kelvin ecuatoriales son fundamentales en el ciclo ENSO",
          "Las ondas de Rossby pueden tardar años en cruzar cuencas oceánicas"
        ],
        applications: [
          "Predicción de eventos El Niño/La Niña y sus impactos globales",
          "Estudio de ajustes oceánicos a gran escala tras perturbaciones",
          "Análisis de propagación de señales climáticas a través de cuencas",
          "Interpretación de patrones de variabilidad en altimetría satelital",
          "Comprensión de oscilaciones interanuales en sistemas de corrientes"
        ]
      },
      tides: {
        title: "Mareas y Fenómenos Asociados",
        description: "Las mareas son oscilaciones periódicas del nivel del mar causadas principalmente por la atracción gravitatoria de la Luna y el Sol. Este fenómeno global se manifiesta de manera compleja debido a la rotación terrestre, la distribución de continentes y la batimetría, generando patrones únicos en cada localidad.",
        image: "/images/physics/tides.jpg",
        keyPoints: [
          "Fuerzas generadoras: gravitacional (directa) y centrífuga (indirecta)",
          "Componentes principales: semidiurnas (M2, S2), diurnas (K1, O1)",
          "Sistemas de anfidromía: puntos nodales donde la amplitud es cero",
          "Resonancia en cuencas y plataformas que amplifica la señal mareai",
          "Mareas internas generadas por flujo mareal sobre topografía submarina"
        ],
        applications: [
          "Navegación marítima y operaciones portuarias",
          "Generación de energía mareomotriz",
          "Estudios de inundación costera y zonificación",
          "Análisis de transporte de sedimentos y cambios morfológicos",
          "Planificación de muestreos oceanográficos"
        ]
      },
      spectral: {
        title: "Análisis Espectral",
        description: "El análisis espectral es una herramienta matemática fundamental en oceanografía física para estudiar señales periódicas y cuasi-periódicas. Permite descomponer series temporales complejas en sus componentes de frecuencia, revelando ciclos dominantes y energía asociada a diferentes procesos oceánicos.",
        image: "/images/physics/spectral_analysis.jpg",
        keyPoints: [
          "Transformada de Fourier para convertir señales del dominio temporal al frecuencial",
          "Espectro de potencia que muestra distribución de energía por frecuencias",
          "Análisis de coherencia para relacionar señales en diferentes ubicaciones",
          "Métodos avanzados: wavelets para señales no estacionarias",
          "Análisis espectral rotatorio para distinguir movimientos ciclónicos y anticiclónicos"
        ],
        applications: [
          "Identificación de componentes mareales en registros de nivel del mar",
          "Caracterización de oleaje y estados de mar",
          "Detección de oscilaciones relacionadas con fenómenos climáticos (ENSO, NAO)",
          "Análisis de turbulencia y cascadas energéticas",
          "Evaluación de tendencias y cambios a largo plazo en series oceánicas"
        ]
      }
    },
    scales: {
      submesoscale: {
        title: "Procesos de Submesoescala",
        description: "Los procesos de submesoescala ocurren en escalas espaciales de 0.1-10 km y temporales de horas a días, ocupando un régimen intermedio entre la mesoescala y la turbulencia de pequeña escala. Estos fenómenos son fundamentales para la transferencia de energía entre escalas y para los intercambios verticales en el océano.",
        image: "/images/physics/submesoscale.jpg",
        keyPoints: [
          "Frontogénesis intensificada: formación de frentes de densidad muy pronunciados",
          "Números de Rossby cercanos a 1: equilibrio entre advección y rotación",
          "Filamentos y estructuras filiformes con fuerte gradiente de densidad",
          "Inestabilidades simétricas que generan circulación secundaria",
          "Contribución significativa a los flujos verticales y mezcla"
        ],
        applications: [
          "Comprensión de mecanismos de bomba biológica y carbono",
          "Evaluación de transporte vertical de trazadores y nutrientes",
          "Interpretación de imágenes satelitales de alta resolución",
          "Diseño de estrategias de muestreo para capturas de procesos rápidos",
          "Mejora de parametrizaciones en modelos numéricos"
        ]
      },
      mesoscale: {
        title: "Fenómenos de Mesoescala",
        description: "Los fenómenos de mesoescala son estructuras oceánicas con dimensiones de 10-100 km y persistencia de semanas a meses. Dominados por el balance geostrófico y caracterizados por números de Rossby pequeños, estos procesos contienen la mayor parte de la energía cinética del océano y son cruciales para el transporte de calor y otras propiedades.",
        image: "/images/physics/mesoscale.jpg",
        keyPoints: [
          "Escala espacial del radio de deformación de Rossby (~10-100 km según latitud)",
          "Balance principalmente geostrófico, con importancia secundaria de efectos no lineales",
          "Remolinos de mesoescala como estructuras coherentes que pueden viajar largas distancias",
          "Sistemas frontales que separan masas de agua con diferentes propiedades",
          "Meandros en corrientes intensas que pueden desprenderse formando anillos"
        ],
        applications: [
          "Predicción de ruta y evolución de remolinos para navegación",
          "Análisis de transporte de calor, sal y otras propiedades",
          "Estudios de agregación biológica en estructuras de mesoescala",
          "Seguimiento de dispersion de contaminantes y organismos",
          "Desarrollo de parametrizaciones para modelos de baja resolución"
        ]
      },
      gyres: {
        title: "Giros Oceánicos",
        description: "Los giros oceánicos son sistemas de circulación a escala de cuenca, formados por la interacción del viento, la rotación terrestre y la configuración de las cuencas oceánicas. Estos patrones de circulación dominan la estructura horizontal de los océanos y son fundamentales para la redistribución global de calor, sal y otras propiedades.",
        image: "/images/physics/ocean_gyres.jpg",
        keyPoints: [
          "Giros subtropicales: anticiclónicos, cálidos, asociados a altas presiones atmosféricas",
          "Giros subpolares: ciclónicos, fríos, asociados a bajas presiones atmosféricas",
          "Circulación intensificada en los bordes occidentales (corrientes como el Golfo, Kuroshio)",
          "Corrientes de retorno más débiles y difusas en bordes orientales",
          "Dinámica explicada por la teoría de Sverdrup y conservación de vorticidad potencial"
        ],
        applications: [
          "Estudios de circulación global y transportes de calor",
          "Análisis de acumulación de detritos plásticos en centros de giros",
          "Evaluación de circulación de masas de agua y tiempos de residencia",
          "Interpretación de distribuciones de especies marinas y migraciones",
          "Comprensión de ciclos biogeoquímicos a gran escala"
        ]
      },
      fronts: {
        title: "Frentes y Filamentos",
        description: "Los frentes oceánicos son interfaces que separan masas de agua con diferentes propiedades (temperatura, salinidad, densidad). Los filamentos son estructuras alargadas y estrechas que se extienden desde frentes o remolinos. Ambos fenómenos son zonas de intenso gradiente horizontal y suelen estar asociados a movimientos verticales significativos.",
        image: "/images/physics/fronts_filaments.jpg",
        keyPoints: [
          "Frentes térmicos, halinos o de densidad según la propiedad dominante",
          "Filamentos como extensiones de agua fría/cálida que penetran en otras masas",
          "Mecanismos de formación: convergencia, afloramiento, intrusión de corrientes",
          "Circulación secundaria asociada a frentes (células transversales)",
          "Alta productividad biológica típicamente asociada a estas estructuras"
        ],
        applications: [
          "Identificación de zonas pesqueras productivas",
          "Detección y seguimiento mediante imágenes satelitales térmicas y de color",
          "Estudios de mezcla lateral y tasas de intercambio entre masas de agua",
          "Análisis de agregación de contaminantes flotantes en frentes",
          "Evaluación de impacto en ecosistemas marinos"
        ]
      },
      eddies: {
        title: "Remolinos",
        description: "Los remolinos oceánicos son estructuras rotacionales coherentes que pueden persistir desde semanas hasta años. Transportan propiedades (calor, sal, momento) y organismos a través de largas distancias, jugando un papel crucial en la mezcla lateral y en el mantenimiento del balance energético oceánico.",
        image: "/images/physics/ocean_eddies.jpg",
        keyPoints: [
          "Clasificación: ciclónicos (rotación como Tierra, centro frío) y anticiclónicos (opuestos)",
          "Formación: inestabilidad de corrientes, desprendimiento de meandros, topografía",
          "Estructura vertical que puede extenderse desde superficie hasta miles de metros",
          "Aislamiento relativo del núcleo, que preserva propiedades originales",
          "Tiempo de vida que puede superar un año en grandes remolinos oceánicos"
        ],
        applications: [
          "Transporte de calor, sal y otras propiedades a través de cuencas",
          "Aislamiento y transporte de comunidades biológicas",
          "Interpretación de anomalías en altimetría satelital",
          "Estudios de mezcla lateral y difusión en el océano",
          "Evaluación de impacto en operaciones offshore y acústica submarina"
        ]
      }
    },
    interaction: {
      heatflux: {
        title: "Flujos de Calor",
        description: "Los flujos de calor entre océano y atmósfera son componentes críticos del balance energético terrestre. Incluyen la radiación solar directa, radiación infrarroja, calor latente asociado a evaporación, y calor sensible por conducción. Estos intercambios determinan la temperatura superficial del mar y alimentan la circulación atmosférica global.",
        image: "/images/physics/heat_flux.jpg",
        keyPoints: [
          "Radiación de onda corta: principal aporte energético, variable con latitud y estación",
          "Radiación de onda larga: emisión infrarroja del océano hacia la atmósfera",
          "Calor latente: liberado durante evaporación, principal mecanismo de pérdida de calor",
          "Calor sensible: transferencia directa por diferencia de temperatura océano-atmósfera",
          "Balance neto positivo en trópicos, negativo en altas latitudes"
        ],
        applications: [
          "Modelado climático y predicciones estacionales",
          "Estudios de formación y evolución de la capa mixta",
          "Análisis de balances energéticos regionales y globales",
          "Evaluación de impactos de eventos extremos (huracanes, olas de calor marinas)",
          "Interpretación de patrones de temperatura superficial del mar"
        ]
      },
      momentum: {
        title: "Transferencia de Momentum",
        description: "La transferencia de momentum entre la atmósfera y el océano ocurre principalmente a través del esfuerzo del viento sobre la superficie. Este proceso es fundamental para la generación de corrientes superficiales, el desarrollo de oleaje, y juega un papel crucial en fenómenos como afloramientos costeros y el transporte de Ekman.",
        image: "/images/physics/momentum_transfer.jpg",
        keyPoints: [
          "Esfuerzo del viento proporcional al cuadrado de la velocidad del viento",
          "Coeficiente de arrastre variable según condiciones de estabilidad y estado del mar",
          "Rugosidad superficial determinada por el campo de oleaje",
          "Transferencia bidireccional: el estado del mar también afecta a la capa límite atmosférica",
          "Principal motor de la circulación superficial oceánica"
        ],
        applications: [
          "Predicción de corrientes superficiales y deriva de objetos",
          "Modelado de afloramientos costeros y su variabilidad",
          "Estudios de generación y evolución de oleaje",
          "Análisis de interacción océano-atmósfera en ciclones tropicales",
          "Evaluación de potencial de energía eólica offshore"
        ]
      },
      elnino: {
        title: "El Niño y Teleconexiones",
        description: "El Niño-Oscilación del Sur (ENSO) es un patrón de variabilidad acoplada océano-atmósfera en el Pacífico tropical, con impactos globales a través de teleconexiones atmosféricas. Este fenómeno alterna entre fases cálidas (El Niño), frías (La Niña) y neutras, afectando patrones climáticos a nivel mundial.",
        image: "/images/physics/el_nino.jpg",
        keyPoints: [
          "El Niño: debilitamiento de alisios, aguas cálidas en Pacífico oriental, termoclina más profunda",
          "La Niña: intensificación de alisios, aguas frías en Pacífico oriental, termoclina superficial",
          "Ciclo irregular con periodicidad de 2-7 años",
          "Mecanismo de retroalimentación positiva de Bjerknes en su desarrollo",
          "Propagación de señales vía ondas de Kelvin ecuatoriales (hacia este) y Rossby (hacia oeste)"
        ],
        applications: [
          "Predicción climática estacional a global",
          "Gestión de recursos hídricos y agrícolas sensibles a precipitación",
          "Análisis de impactos en pesquerías y ecosistemas marinos",
          "Evaluación de riesgos de eventos extremos (sequías, inundaciones)",
          "Estudios de variabilidad interanual en registros oceanográficos"
        ]
      },
      climate: {
        title: "Rol Oceánico en el Clima",
        description: "Los océanos juegan un papel crucial en el sistema climático terrestre como reguladores térmicos, almacenes de carbono y transportadores de calor. Su alta capacidad calorífica, inercia térmica y circulación global son fundamentales para moderar extremos climáticos y determinar patrones de variabilidad a múltiples escalas temporales.",
        image: "/images/physics/ocean_climate.jpg",
        keyPoints: [
          "Los océanos absorben más del 90% del exceso de calor del sistema climático",
          "Transportan ~4-5 petavatios de calor desde trópicos hacia polos",
          "Capturan ~25% de las emisiones antropogénicas de CO2",
          "Son fuente de vapor de agua para precipitación terrestre",
          "Su variabilidad influye en patrones climáticos desde estacionales hasta milenarios"
        ],
        applications: [
          "Predicciones climáticas estacionales a decadales",
          "Proyecciones de cambio climático a largo plazo",
          "Estudios de acidificación oceánica y sus impactos",
          "Análisis de mecanismos de retroalimentación en el sistema climático",
          "Reconstrucciones paleoclimáticas basadas en registros oceánicos"
        ]
      }
    },
    observation: {
      remote: {
        title: "Sensores Remotos",
        description: "Los sensores remotos permiten observar los océanos desde satélites, aeronaves y plataformas costeras, proporcionando cobertura global y continua de múltiples variables oceánicas. Estas tecnologías han revolucionado la oceanografía física permitiendo observaciones sinópticas de procesos a múltiples escalas.",
        image: "/images/physics/remote_sensing.jpg",
        keyPoints: [
          "Altimetría satelital para topografía superficial y corrientes geostróficas",
          "Radiometría infrarroja y microondas para temperatura superficial",
          "Dispersómetros para campos de viento superficial",
          "Sensores de color oceánico para clorofila y propiedades ópticas",
          "Sistemas de radar para oleaje, corrientes superficiales y hielo marino"
        ],
        applications: [
          "Monitoreo global de temperatura superficial y nivel del mar",
          "Detección y seguimiento de remolinos y frentes",
          "Alertas de floraciones algales y contaminación",
          "Análisis de tendencias climáticas a largo plazo",
          "Asimilación de datos en modelos predictivos oceánicos"
        ]
      },
      insitu: {
        title: "Mediciones In-Situ",
        description: "Las mediciones in-situ proporcionan observaciones directas de las propiedades oceanográficas, desde la superficie hasta las profundidades abisales. Estas mediciones son esenciales para calibrar y validar sensores remotos, caracterizar la estructura vertical del océano y estudiar procesos que no son observables desde el espacio.",
        image: "/images/physics/insitu_measurements.jpg",
        keyPoints: [
          "Perfiladores CTD para temperatura, salinidad y presión",
          "Flotadores Argo para perfiles de la capa superior (0-2000m)",
          "Anclajes y boyas para series temporales en puntos fijos",
          "Gliders y AUVs para muestreos autónomos tridimensionales",
          "Instrumentación acústica (ADCPs) para perfiles de corrientes"
        ],
        applications: [
          "Caracterización de masas de agua y su variabilidad",
          "Monitoreo de corrientes profundas y transporte de volumen",
          "Estudios de procesos de mezcla y turbulencia",
          "Validación de productos satelitales y modelos numéricos",
          "Investigación de procesos en regiones de difícil acceso (polares, profundas)"
        ]
      },
      timeseries: {
        title: "Series Temporales",
        description: "Las series temporales oceanográficas son registros continuos o periódicos de variables en ubicaciones fijas, proporcionando información crucial sobre variabilidad temporal desde minutos hasta décadas. Son fundamentales para caracterizar ciclos, tendencias y eventos extremos en el océano.",
        image: "/images/physics/time_series.jpg",
        keyPoints: [
          "Observatorios oceánicos permanentes con múltiples sensores",
          "Registros mareográficos, algunos con más de un siglo de duración",
          "Secciones hidrográficas repetidas en transectos clave",
          "Series de temperatura, salinidad, corrientes, biogeoquímica",
          "Red global de boyas fijas (TAO/TRITON, PIRATA, RAMA) para monitoreo tropical"
        ],
        applications: [
          "Detección de tendencias a largo plazo (calentamiento, acidificación)",
          "Caracterización de ciclos estacionales e interanuales",
          "Estudio de eventos extremos y su recurrencia",
          "Validación de modelos y reconstrucciones históricas",
          "Análisis de teleconexiones y patrones de oscilación climática"
        ]
      },
      dataanalysis: {
        title: "Técnicas de Análisis de Datos",
        description: "Las técnicas modernas de análisis de datos oceanográficos permiten extraer información significativa a partir de conjuntos complejos y multidimensionales. Desde métodos estadísticos clásicos hasta algoritmos de aprendizaje automático, estas herramientas son esenciales para interpretar la creciente cantidad de datos disponibles.",
        image: "/images/physics/data_analysis.jpg",
        keyPoints: [
          "Análisis espectral para identificación de periodicidades",
          "Funciones empíricas ortogonales (EOF) para patrones espaciales dominantes",
          "Filtrado y descomposición de señales para separar procesos",
          "Análisis de correlación y coherencia entre variables",
          "Técnicas avanzadas: wavelets, redes neuronales, clustering"
        ],
        applications: [
          "Reconstrucción de campos oceanográficos a partir de datos dispersos",
          "Identificación de patrones espaciotemporales de variabilidad",
          "Detección de eventos extremos y anomalías",
          "Predicción estadística de variables oceanográficas",
          "Interpretación de relaciones entre múltiples variables físicas y biogeoquímicas"
        ]
      }
    },
    modeling: {
      numerical: {
        title: "Modelos Numéricos",
        description: "Los modelos numéricos oceánicos son representaciones matemáticas del océano implementadas computacionalmente para simular su estado y evolución. Basados en las ecuaciones fundamentales de la dinámica de fluidos, estos modelos son herramientas esenciales para comprender procesos pasados, presentes y futuros en los océanos.",
        image: "/images/physics/numerical_models.jpg",
        keyPoints: [
          "Discretización espacial: diferencias finitas, elementos finitos, volúmenes finitos",
          "Esquemas temporales: explícitos, implícitos, semi-implícitos",
          "Coordenadas verticales: z, sigma, isopícnicas o híbridas",
          "Parametrización de procesos no resueltos: turbulencia, mezcla, interacciones",
          "Modelos jerárquicos desde idealizados hasta realistas"
        ],
        applications: [
          "Predicciones operacionales de corrientes, temperatura, nivel del mar",
          "Estudios de procesos específicos con modelos idealizados",
          "Reconstrucciones históricas (reanalysis) del estado oceánico",
          "Proyecciones de cambios futuros en escenarios climáticos",
          "Simulación de dispersión de contaminantes y organismos"
        ]
      },
      coastal: {
        title: "Modelos Costeros",
        description: "Los modelos costeros se especializan en simular la dinámica oceánica en regiones costeras, donde la interacción con la topografía, los aportes fluviales y los procesos de pequeña escala son cruciales. Estos modelos requieren alta resolución espacial y la inclusión de forzamientos específicos para representar adecuadamente estos entornos complejos.",
        image: "/images/physics/coastal_models.jpg",
        keyPoints: [
          "Alta resolución espacial (decenas a cientos de metros)",
          "Inclusión de mareas y procesos baroclínicos",
          "Representación de aportes fluviales y plumas estuarinas",
          "Interacción con morfología costera y batimetría compleja",
          "Acoplamiento con modelos de oleaje y transporte sedimentario"
        ],
        applications: [
          "Predicción de inundaciones costeras y marejadas ciclónicas",
          "Gestión de calidad de agua y dispersión de contaminantes",
          "Planificación costera y evaluación de impactos",
          "Apoyo a operaciones portuarias y navegación",
          "Estudios de conectividad ecológica y dispersión larvaria"
        ]
      },
      global: {
        title: "Modelos Globales",
        description: "Los modelos globales simulan la circulación oceánica a escala planetaria, capturando los principales sistemas de corrientes, la formación de masas de agua y los intercambios entre cuencas. Estos modelos son fundamentales para estudios climáticos y para proporcionar condiciones de contorno a modelos regionales de mayor resolución.",
        image: "/images/physics/global_models.jpg",
        keyPoints: [
          "Resolución espacial desde 1° hasta 0.1° en modelos de alta resolución",
          "Representación de circulación termohalina y transporte interoceánico",
          "Capacidad de simular variabilidad interanual a multidecadal",
          "Considerar interacciones con hielo marino y plataformas glaciares",
          "Incluir ciclos biogeoquímicos en modelos de sistema terrestre"
        ],
        applications: [
          "Estudios de variabilidad climática y cambio global",
          "Análisis de balances energéticos y ciclos globales",
          "Predicciones estacionales a decadales",
          "Identificación de teleconexiones oceánicas",
          "Condiciones de contorno para modelos regionales anidados"
        ]
      },
      ai: {
        title: "Aplicaciones de IA",
        description: "Las aplicaciones de inteligencia artificial en oceanografía física aprovechan el aprendizaje automático y técnicas analíticas avanzadas para extraer patrones de grandes conjuntos de datos, mejorar predicciones y optimizar productos. Estas tecnologías están transformando la forma en que observamos, analizamos y predecimos el comportamiento oceánico.",
        image: "/images/physics/ai_applications.jpg",
        keyPoints: [
          "Redes neuronales para predicción de variables oceánicas",
          "Algoritmos de clasificación para identificación de fenómenos y anomalías",
          "Técnicas de super-resolución para mejorar datos satelitales",
          "Aprendizaje profundo para corrección de sesgos en sensores",
          "Modelos híbridos que combinan física con aprendizaje automático"
        ],
        applications: [
          "Predicción de temperatura superficial del mar y corrientes",
          "Identificación y seguimiento de remolinos y frentes",
          "Reconstrucción de campos 3D a partir de datos limitados",
          "Detección de eventos extremos y anomalías",
          "Mejora de productos satelitales (eliminación de nubes, ruido)"
        ]
      },
      dataassimilation: {
        title: "Asimilación de Datos",
        description: "La asimilación de datos es el proceso de incorporar observaciones en modelos numéricos para mejorar sus predicciones. Estas técnicas combinan de manera óptima la información de diferentes fuentes, considerando sus incertidumbres respectivas, para producir una estimación coherente del estado oceánico.",
        image: "/images/physics/data_assimilation.jpg",
        keyPoints: [
          "Métodos secuenciales: filtro de Kalman y sus variantes (EnKF, SEEK)",
          "Métodos variacionales: 3D-VAR, 4D-VAR",
          "Asimilación de múltiples tipos de datos: in-situ, satélite, etc.",
          "Balance entre fidelidad a observaciones y consistencia física",
          "Estimación de incertidumbres en predicciones y análisis"
        ],
        applications: [
          "Predicción operacional en tiempo real",
          "Reanálisis oceanográficos para estudios históricos",
          "Inicialización de modelos de predicción estacional y climática",
          "Estimación de parámetros no observables directamente",
          "Diseño óptimo de redes observacionales"
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
        <h3 className="text-2xl font-bold text-blue-800 mb-4">{topicData.title}</h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <p className="text-gray-700 mb-6">{topicData.description}</p>
            
            <div className="mb-6">
              <h4 className="text-xl font-semibold text-blue-700 mb-3">Puntos Clave</h4>
              <ul className="space-y-2">
                {topicData.keyPoints.map((point, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-xl font-semibold text-blue-700 mb-3">Aplicaciones</h4>
              <ul className="space-y-2">
                {topicData.applications.map((app, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-green-500 mr-2">→</span>
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
                <h4 className="text-lg font-semibold text-blue-700 mb-2">Recursos Adicionales</h4>
                <ul className="space-y-1">
                  {topicData.resources.map((resource, index) => (
                    <li key={index} className="text-blue-600 hover:underline cursor-pointer">
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
                  ? "text-blue-700 border-b-2 border-blue-700 bg-blue-50"
                  : "text-gray-600 hover:text-blue-500 hover:bg-gray-50"
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
                  ? "bg-blue-600 text-white"
                  : "bg-white hover:bg-blue-100 text-gray-700 border border-gray-300"
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

export default PhysicalOceanography;