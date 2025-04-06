import React, { useState } from 'react';
import Image from 'next/image';
import { Tab } from '@headlessui/react';

interface TopicContent {
  title: string;
  description: string;
  keyPoints: string[];
  applications: string[];
  image?: string;
  imageAlt?: string;
}

const GeologicalOceanography: React.FC = () => {
  // Define las categorías principales del módulo
  const categories = [
    { id: 'methods', name: 'Métodos de Exploración' },
    { id: 'features', name: 'Rasgos Geológicos' },
    { id: 'processes', name: 'Procesos Geológicos' },
    { id: 'resources', name: 'Recursos Minerales' },
    { id: 'tectonics', name: 'Tectónica y Sismología' },
    { id: 'analytical', name: 'Métodos Analíticos' }
  ];

  // Estado para la categoría seleccionada
  const [categoryIndex, setCategoryIndex] = useState(0);
  
  // Estado para el tópico seleccionado dentro de cada categoría
  const [selectedTopics, setSelectedTopics] = useState<Record<string, number>>({
    methods: 0,
    features: 0,
    processes: 0,
    resources: 0,
    tectonics: 0,
    analytical: 0
  });

  // Contenido de los diferentes tópicos organizados por categorías
  const topicContent: Record<string, TopicContent[]> = {
    methods: [
      {
        title: 'Batimetría Multihaz',
        description: 'La batimetría multihaz es una técnica acústica que utiliza múltiples haces de sonido para mapear con alta resolución el fondo marino. A diferencia de las ecosondas monohaz tradicionales, los sistemas multihaz emiten abanicos de haces sónicos que permiten cubrir áreas más amplias con mayor detalle.',
        keyPoints: [
          'Los sistemas multihaz pueden cubrir franjas del fondo marino con anchuras de hasta 7 veces la profundidad del agua',
          'Permite crear modelos digitales del terreno (MDT) con resoluciones hasta submétrica en aguas poco profundas',
          'La precisión vertical puede alcanzar el 0.1% de la profundidad en sistemas bien calibrados',
          'Combina la medición de profundidad con la intensidad de retorno acústico (backscatter), aportando información sobre la naturaleza del fondo'
        ],
        applications: [
          'Cartografía náutica y seguridad en la navegación',
          'Detección de objetos sumergidos y arqueología submarina',
          'Estudios de hábitats bentónicos',
          'Planificación de infraestructuras submarinas',
          'Monitoreo de cambios morfológicos del fondo marino'
        ],
        image: '/images/geology/multibeam.png',
    imageAlt: 'Imagen de un mapa batimétrico multihaz mostrando la topografía del fondo marino'
  },
      {
        title: 'Sísmica de Reflexión',
        description: 'La sísmica de reflexión es un método geofísico que utiliza ondas acústicas para obtener imágenes del subsuelo marino. Se generan pulsos acústicos de baja frecuencia que penetran en el lecho marino y se reflejan en las distintas capas del subsuelo con propiedades acústicas diferentes.',
        keyPoints: [
          'Las fuentes acústicas más comunes son cañones de aire y sparkers para diferentes niveles de penetración',
          'Los reflejos de las ondas se registran en hidrófonos o streamers remolcados detrás del barco',
          'Permite visualizar la estratigrafía submarina hasta profundidades de varios kilómetros',
          'La resolución depende de la frecuencia utilizada: mayor frecuencia = mayor resolución pero menor penetración'
        ],
        applications: [
          'Exploración de hidrocarburos submarinos',
          'Identificación de estructuras geológicas como fallas y pliegues',
          'Estudio de la evolución de cuencas sedimentarias',
          'Identificación de riesgos geológicos submarinos',
          'Investigación de hidratos de gas'
        ],
        image: '/images/geology/seismic_reflection.jpg',
        imageAlt: 'Perfil sísmico mostrando capas estratigráficas del subsuelo marino'
      },
      {
        title: 'Sub-bottom Profiler',
        description: 'El perfilador de subfondo (sub-bottom profiler) es una herramienta de sísmica de alta resolución que emite pulsos acústicos de frecuencia relativamente alta para visualizar las primeras decenas de metros del subsuelo marino con gran detalle.',
        keyPoints: [
          'Utiliza frecuencias típicamente entre 0.5 y 24 kHz, más altas que la sísmica de reflexión convencional',
          'Permite visualizar estructuras sedimentarias con resoluciones decimétricas a métricas',
          'La penetración suele estar limitada a unos 10-50 metros dependiendo del sedimento',
          'Existen diferentes tecnologías: CHIRP (barrido de frecuencias), Pinger (frecuencia fija), Boomer y Sparker (mayor penetración)'
        ],
        applications: [
          'Estudios de ingeniería submarina para cimentaciones',
          'Localización de cables y tuberías enterradas',
          'Caracterización de capas sedimentarias recientes',
          'Arqueología submarina',
          'Detección de bolsas de gas en sedimentos'
        ],
        image: '/images/geology/subbottom_profiler.jpg',
        imageAlt: 'Registro de sub-bottom profiler mostrando capas sedimentarias superficiales'
      },
      {
        title: 'Magnetometría Marina',
        description: 'La magnetometría marina mide las variaciones en el campo magnético terrestre causadas por diferentes materiales y estructuras geológicas submarinas. Los materiales con propiedades magnéticas distintas (como los minerales ferromagnéticos) generan anomalías magnéticas detectables.',
        keyPoints: [
          'Se utilizan magnetómetros remolcados detrás del barco para evitar la interferencia magnética del propio buque',
          'Permite detectar objetos ferromagnéticos y formaciones geológicas con propiedades magnéticas distintivas',
          'Las mediciones se corrigen para eliminar las variaciones diurnas y regionales del campo magnético terrestre',
          'Se pueden detectar tanto anomalías dipolares (objetos discretos) como lineales (estructuras geológicas extensas)'
        ],
        applications: [
          'Localización de objetos metálicos sumergidos (pecios, oleoductos, cables)',
          'Cartografía de cuerpos ígneos submarinos',
          'Estudios de paleomagnetismo para datación relativa',
          'Exploración de depósitos minerales submarinos',
          'Detección de dorsales oceánicas y zonas de expansión del fondo marino'
        ],
        image: '/images/geology/marine_magnetometry.jpg',
        imageAlt: 'Mapa de anomalías magnéticas del fondo marino'
      },
      {
        title: 'Side Scan Sonar',
        description: 'El sonar de barrido lateral (side scan sonar) es un sistema acústico que emite haces de sonido hacia los lados del recorrido de navegación, creando imágenes acústicas detalladas del fondo marino basadas en la intensidad de la señal reflejada.',
        keyPoints: [
          'Proporciona imágenes acústicas con apariencia similar a fotografías aéreas pero basadas en reflectividad acústica',
          'Frecuencias típicas entre 100 kHz y 1 MHz, con mayor resolución a mayor frecuencia',
          'No mide directamente la profundidad, aunque existen sistemas que combinan side scan con batimetría',
          'La intensidad del eco depende del material del fondo, su rugosidad y el ángulo de incidencia'
        ],
        applications: [
          'Búsqueda y detección de objetos en el fondo marino',
          'Caracterización de tipos de fondo y hábitats bentónicos',
          'Inspección de infraestructuras submarinas',
          'Arqueología submarina',
          'Cartografía detallada de rasgos morfológicos como cañones submarinos o campos de ondas de arena'
        ],
        image: '/images/geology/side_scan_sonar.jpg',
        imageAlt: 'Imagen de sonar de barrido lateral mostrando rasgos del fondo marino'
      }
    ],
    
    features: [
      {
        title: 'Dorsales Mesooceánicas',
        description: 'Las dorsales mesooceánicas son cadenas montañosas submarinas que se forman en los límites divergentes de placas tectónicas, donde nuevo material del manto asciende y crea nueva corteza oceánica. Son el sistema montañoso más extenso de la Tierra, con más de 65,000 km de longitud.',
        keyPoints: [
          'Se caracterizan por un valle central (rift) flanqueado por elevaciones paralelas',
          'Son zonas de intensa actividad magmática y tectónica que generan continuamente nueva corteza oceánica',
          'La tasa de expansión varía desde menos de 1 cm/año (dorsales lentas) hasta más de 15 cm/año (dorsales rápidas)',
          'Las dorsales lentas como la del Atlántico tienden a ser más escarpadas y tectónicamente complejas que las rápidas como la del Pacífico Oriental'
        ],
        applications: [
          'Estudio de la evolución tectónica global',
          'Comprensión de los ciclos geoquímicos oceánicos',
          'Investigación de ecosistemas quimiosintéticos en fuentes hidrotermales',
          'Exploración de recursos minerales asociados (sulfuros masivos)',
          'Datación magnética del fondo oceánico'
        ],
        image: '/images/geology/mid_ocean_ridge.png',
        imageAlt: 'Modelo 3D de una dorsal mesooceánica mostrando el rift central'
      },
      {
        title: 'Montes Submarinos',
        description: 'Los montes submarinos son elevaciones del fondo marino de origen volcánico que se elevan más de 1,000 metros sobre el lecho oceánico circundante sin llegar a emerger. Se estima que existen más de 100,000 montes submarinos en los océanos del mundo.',
        keyPoints: [
          'La mayoría se forma por actividad volcánica en puntos calientes o zonas de subducción',
          'Pueden presentarse aislados o en cadenas lineales que marcan el movimiento de la placa sobre un punto caliente',
          'Modifican las corrientes oceánicas locales, creando surgencias que aumentan la productividad biológica',
          'Con el tiempo pueden hundirse y formar guyots (montes submarinos de cima plana erosionada)'
        ],
        applications: [
          'Estudio de la biodiversidad marina (son hotspots de biodiversidad)',
          'Análisis de patrones de corrientes oceánicas profundas',
          'Reconstrucción del movimiento histórico de placas tectónicas',
          'Exploración de recursos minerales (costras ricas en cobalto)',
          'Comprensión de procesos volcánicos submarinos'
        ],
        image: '/images/geology/guyot.png',
        imageAlt: 'Batimetría de un monte submarino mostrando su estructura cónica'
      },
      {
        title: 'Cañones Submarinos',
        description: 'Los cañones submarinos son valles profundos excavados en el talud continental, similares a los cañones terrestres pero de dimensiones mucho mayores. Actúan como conductos para el transporte de sedimentos desde la plataforma continental hasta las llanuras abisales.',
        keyPoints: [
          'Pueden extenderse por centenares de kilómetros y tener profundidades de miles de metros',
          'Se forman principalmente por erosión causada por corrientes de turbidez y otros flujos gravitacionales',
          'Suelen estar asociados a desembocaduras de ríos o zonas de alta sedimentación continental',
          'Presentan patrones variables, desde rectilíneos hasta altamente meandriformes'
        ],
        applications: [
          'Estudio de procesos sedimentarios desde la costa hasta aguas profundas',
          'Evaluación de riesgos geológicos por deslizamientos submarinos',
          'Conservación marina (son zonas de alta biodiversidad)',
          'Comprensión de la evolución del margen continental',
          'Modelado de flujos sedimentarios y corrientes de turbidez'
        ],
        image: '/images/geology/submarine_canyon.png',
        imageAlt: 'Batimetría de un cañón submarino mostrando su morfología erosiva'
      },
      {
        title: 'Fosas Oceánicas',
        description: 'Las fosas oceánicas son las partes más profundas de los océanos, formadas en zonas de subducción donde una placa tectónica oceánica se hunde bajo otra placa. La fosa de las Marianas, la más profunda, alcanza los 11,034 metros bajo el nivel del mar.',
        keyPoints: [
          'Se caracterizan por su forma estrecha y alongada, con profundidades superiores a los 6,000 metros',
          'Presentan una asimetría característica con pendiente más pronunciada del lado continental',
          'Son zonas de intensa actividad sísmica debido a la fricción entre placas',
          'La alta presión hidrostática crea condiciones extremas para la vida marina'
        ],
        applications: [
          'Estudio de procesos tectónicos y de subducción',
          'Investigación de biodiversidad en condiciones extremas',
          'Comprensión de ciclos geoquímicos y el reciclaje de la corteza oceánica',
          'Análisis del acoplamiento sismogénico y riesgo de tsunamis',
          'Exploración de recursos minerales en zonas de arco volcánico asociadas'
        ],
        image: '/images/geology/ocean_trench.jpg',
        imageAlt: 'Perfil batimétrico de una fosa oceánica mostrando su gran profundidad'
      },
      {
        title: 'Plataformas y Taludes Continentales',
        description: 'La plataforma continental es la prolongación sumergida de los continentes, caracterizada por una pendiente suave que se extiende hasta aproximadamente los 200 metros de profundidad. El talud continental es la zona de transición entre la plataforma y las llanuras abisales profundas.',
        keyPoints: [
          'La anchura de la plataforma varía de unos pocos kilómetros a más de 300 km dependiendo del margen continental',
          'El talud presenta pendientes típicas de 3° a 6°, aunque puede superar los 25° en zonas tectónicamente activas',
          'La base del talud (rise) es una zona de acumulación sedimentaria con pendiente más suave',
          'La morfología de estos elementos está controlada por la tectónica, aporte sedimentario y fluctuaciones del nivel del mar'
        ],
        applications: [
          'Exploración de recursos energéticos (petróleo y gas)',
          'Gestión de pesquerías (las plataformas son zonas de alta productividad)',
          'Instalación de infraestructuras submarinas',
          'Estudios de cambios del nivel del mar durante periodos glaciales',
          'Evaluación de riesgos de deslizamientos submarinos'
        ],
        image: '/images/geology/continental_shelf.jpg',
        imageAlt: 'Perfil del margen continental mostrando plataforma, talud y llanura abisal'
      }
    ],
    
    processes: [
      {
        title: 'Sedimentación Marina',
        description: 'La sedimentación marina abarca todos los procesos de deposición de partículas de origen continental, biogénico o químico en el fondo de los océanos. La distribución, composición y tasas de sedimentación varían enormemente según la región y profundidad.',
        keyPoints: [
          'Los sedimentos se clasifican en terrígenos (derivados de continentes), biogénicos (de origen orgánico) y autigénicos (formados in situ)',
          'Las tasas de sedimentación varían desde menos de 1 mm por 1000 años en cuencas abisales hasta metros por año en deltas fluviales',
          'La composición de los sedimentos refleja el clima, la geología continental y la productividad biológica',
          'Los patrones de sedimentación están fuertemente influenciados por corrientes oceánicas profundas'
        ],
        applications: [
          'Paleoclimatología y reconstrucción de condiciones oceánicas pasadas',
          'Comprensión de ciclos biogeoquímicos globales',
          'Gestión costera y de recursos sedimentarios',
          'Evaluación de sumideros de carbono en sedimentos marinos',
          'Datación de eventos geológicos a través de estratigrafía'
        ],
        image: '/images/geology/sediment_core.png',
        imageAlt: 'Imagen de diferentes tipos de sedimentos marinos'
      },
      {
        title: 'Remoción en Masa y Flujos Gravitacionales',
        description: 'Los fenómenos de remoción en masa y flujos gravitacionales incluyen deslizamientos submarinos, corrientes de turbidez y otros movimientos de material sedimentario por acción de la gravedad. Son mecanismos fundamentales en el transporte de sedimentos desde las plataformas continentales hasta las profundidades oceánicas.',
        keyPoints: [
          'Los deslizamientos submarinos pueden movilizar volúmenes de sedimento mucho mayores que sus equivalentes terrestres',
          'Las corrientes de turbidez son flujos sedimentarios turbios que pueden viajar a grandes velocidades (>70 km/h) y distancias (>1000 km)',
          'Estos eventos pueden ser desencadenados por terremotos, sobrecarga sedimentaria o disociación de hidratos de gas',
          'Generan depósitos característicos como turbiditas, mostrando gradación normal del tamaño de partículas'
        ],
        applications: [
          'Evaluación de riesgos geológicos en márgenes continentales',
          'Caracterización de reservorios de hidrocarburos (muchos yacimientos son turbiditas antiguas)',
          'Evaluación del potencial tsunamigénico de grandes deslizamientos',
          'Comprensión de la distribución de nutrientes y materia orgánica en cuencas profundas',
          'Interpretación del registro sedimentario para eventos catastróficos pasados'
        ],
        image: '/images/geology/submarine_landslide.jpg',
        imageAlt: 'Imagen batimétrica de un gran deslizamiento submarino'
      },
      {
        title: 'Formación de Arcillas y Mineralogía',
        description: 'Las arcillas marinas son minerales de silicato de aluminio finamente divididos que constituyen una parte importante de los sedimentos oceánicos. Su composición y distribución proporcionan información valiosa sobre procesos de meteorización continental, circulación oceánica y diagénesis.',
        keyPoints: [
          'Las principales arcillas marinas incluyen illita, caolinita, clorita, esmectita y minerals de arcilla mixtos',
          'Su distribución refleja zonas climáticas continentales: caolinita en tropicales húmedos, illita/clorita en regiones templadas',
          'Durante la diagénesis temprana, pueden transformarse unas en otras según condiciones de temperatura y química del agua intersticial',
          'Además de arcillas, los minerales autígenos importantes incluyen zeolitas, glauconita y fosfatos'
        ],
        applications: [
          'Reconstrucción paleoclimática y de patrones de meteorización continental',
          'Trazado de rutas de transporte de sedimentos y corrientes oceánicas',
          'Evaluación de procesos diagenéticos tempranos',
          'Estudio de interacciones químicas agua-sedimento',
          'Caracterización de propiedades geotécnicas de sedimentos marinos'
        ],
        image: '/images/geology/marine_clays.jpg',
        imageAlt: 'Imagen microscópica de diferentes arcillas marinas'
      },
      {
        title: 'Vulcanismo Submarino',
        description: 'El vulcanismo submarino engloba todas las manifestaciones de actividad magmática bajo el océano, desde las erupciones en dorsales oceánicas hasta volcanes submarinos aislados. Es el proceso volcánico más común en la Tierra, responsable de la formación de toda la corteza oceánica.',
        keyPoints: [
          'Las erupciones submarinas difieren de las terrestres por la alta presión hidrostática que modifica el comportamiento del magma',
          'En aguas profundas, predominan lavas almohadilladas (pillow lavas) por el rápido enfriamiento del magma',
          'En erupciones someras pueden producirse explosiones hidromagmáticas al interactuar el magma con el agua',
          'Las fuentes hidrotermales asociadas a vulcanismo submarino crean ecosistemas únicos basados en quimiosíntesis'
        ],
        applications: [
          'Comprensión de la formación y evolución de la corteza oceánica',
          'Estudio de ciclos geoquímicos volcánicos y su impacto en la química oceánica',
          'Investigación de ecosistemas extremófilos en fuentes hidrotermales',
          'Exploración de depósitos minerales asociados (sulfuros masivos)',
          'Evaluación de peligros volcánicos en islas y zonas costeras'
        ],
        image: '/images/geology/submarine_volcanism.jpg',
        imageAlt: 'Imagen de una erupción volcánica submarina mostrando lavas almohadilladas'
      },
      {
        title: 'Paleooceanografía',
        description: 'La paleooceanografía es el estudio de la historia de los océanos, incluyendo cambios en la circulación, química, biología y clima a lo largo del tiempo geológico. Utiliza indicadores (proxies) preservados en sedimentos marinos para reconstruir condiciones oceánicas pasadas.',
        keyPoints: [
          'Los principales indicadores incluyen microfósiles (foraminíferos, cocolitofóridos), isótopos estables (O18/O16, C13/C12), elementos traza y biomarcadores orgánicos',
          'Los núcleos de sedimentos marinos proporcionan archivos continuos que pueden abarcar millones de años',
          'Permite reconstruir temperaturas oceánicas, salinidad, productividad, oxigenación y circulación en el pasado',
          'El registro paleooceanográfico es clave para entender ciclos climáticos naturales y la respuesta de los océanos a cambios atmosféricos'
        ],
        applications: [
          'Modelado de cambios climáticos pasados y futuros',
          'Reconstrucción de eventos oceanográficos extremos (anoxia oceánica, disociación masiva de hidratos de gas)',
          'Comprensión de extinciones marinas pasadas',
          'Calibración de modelos de circulación oceánica',
          'Evaluación de tasas y escalas temporales de cambios oceanográficos naturales'
        ],
        image: '/images/geology/paleoceanography.jpg',
        imageAlt: 'Núcleo de sedimentos marinos mostrando capas que representan diferentes condiciones oceánicas'
      }
    ],
    
    resources: [
      {
        title: 'Nódulos Polimetálicos',
        description: 'Los nódulos polimetálicos son concreciones rocosas que se forman lentamente en el fondo marino, principalmente en llanuras abisales a profundidades de 4,000-6,000 metros. Contienen concentraciones significativas de manganeso, hierro y otros metales estratégicos como níquel, cobre y cobalto.',
        keyPoints: [
          'Se forman extremadamente despacio, creciendo apenas unos milímetros por millón de años',
          'Su formación implica la precipitación de metales disueltos en agua de mar alrededor de un núcleo',
          'Las mayores concentraciones se encuentran en la zona Clarion-Clipperton del Pacífico norte',
          'Un nódulo típico contiene aproximadamente 24% de manganeso, 14% de hierro, 1% de níquel, 1% de cobre y 0.25% de cobalto'
        ],
        applications: [
          'Fuente potencial de metales críticos para tecnologías verdes y electrónica',
          'Alternativa a la minería terrestre con menor huella de carbono pero mayor impacto en ecosistemas profundos',
          'Investigación sobre procesos oceanográficos de formación mineral',
          'Desarrollo de tecnologías de explotación minera submarina',
          'Estudios de impacto ambiental en ecosistemas abisales'
        ],
        image: '/images/geology/polymetallic_nodules.jpg',
        imageAlt: 'Imagen del fondo marino mostrando nódulos polimetálicos distribuidos sobre sedimentos'
      },
      {
        title: 'Costras de Ferromanganeso',
        description: 'Las costras de ferromanganeso son depósitos minerales que se forman sobre sustratos rocosos expuestos en montañas y mesetas submarinas. A diferencia de los nódulos, crecen como capas adheridas al sustrato y son especialmente ricas en cobalto, además de manganeso y hierro.',
        keyPoints: [
          'Se forman principalmente en montes submarinos a profundidades de 800-2,500 metros',
          'Pueden alcanzar espesores de hasta 25 cm tras millones de años de crecimiento',
          'Son particularmente ricas en cobalto (hasta 1.7%), titanio, elementos de tierras raras y platinoides',
          'Su formación requiere corrientes que impidan la sedimentación y favorezcan la precipitación mineral'
        ],
        applications: [
          'Fuente potencial de cobalto y tierras raras para baterías y tecnologías avanzadas',
          'Investigación de procesos de mineralización oceánica',
          'Indicadores de condiciones oceanográficas pasadas (cada capa registra condiciones de formación)',
          'Estudio de ecosistemas bentónicos de aguas profundas asociados a montes submarinos',
          'Desarrollo de tecnologías de extracción minera selectiva'
        ],
        image: '/images/geology/ferromanganese_crust.jpg',
        imageAlt: 'Muestra de una costra de ferromanganeso mostrando su estructura en capas'
      },
      {
        title: 'Sulfuros Masivos Volcánicos',
        description: 'Los sulfuros masivos volcánicos son depósitos minerales ricos en metales que se forman en zonas de actividad hidrotermal submarina, principalmente en dorsales oceánicas y arcos volcánicos. Se crean cuando fluidos hidrotermales calientes, enriquecidos en metales, emergen al fondo marino y precipitan al contacto con el agua fría.',
        keyPoints: [
          'Se asocian a "fumadores negros" y "fumadores blancos", chimeneas hidrotermales de alta temperatura (hasta 400°C)',
          'Contienen altas concentraciones de cobre, zinc, plomo, oro y plata',
          'Su formación es relativamente rápida en términos geológicos, pudiendo desarrollarse en décadas o siglos',
          'La composición varía según el entorno tectónico: los asociados a dorsales suelen ser ricos en cobre, mientras que los de arcos volcánicos contienen más plomo, zinc y metales preciosos'
        ],
        applications: [
          'Explotación minera de metales base y preciosos',
          'Estudio de ecosistemas quimiosintéticos asociados a fuentes hidrotermales',
          'Investigación sobre el origen de la vida en condiciones extremas',
          'Análogos modernos de yacimientos antiguos tipo VMS (Volcanic Massive Sulfide)',
          'Desarrollo de tecnologías para detectar y evaluar depósitos activos e inactivos'
        ],
        image: '/images/geology/seafloor_massive_sulfides.jpg',
        imageAlt: 'Chimenea hidrotermal submarina expulsando fluidos ricos en minerales'
      },
      {
        title: 'Hidratos de Metano',
        description: 'Los hidratos de metano (o clatratos de gas) son compuestos cristalinos similares al hielo donde moléculas de metano quedan atrapadas dentro de una estructura de moléculas de agua. Se forman naturalmente en sedimentos marinos profundos donde existen las condiciones adecuadas de presión, temperatura y suministro de metano.',
        keyPoints: [
          'Se encuentran principalmente en márgenes continentales a profundidades superiores a 300-500 metros',
          'El metano puede ser de origen biogénico (producido por microorganismos) o termogénico (derivado de hidrocarburos más profundos)',
          'Representan un enorme reservorio de carbono, estimado en 1,000-10,000 gigatoneladas de carbono',
          'Son estables solo en condiciones específicas de presión y temperatura; cambios en estas condiciones pueden provocar su disociación'
        ],
        applications: [
          'Potencial recurso energético (1 m³ de hidrato puede liberar hasta 164 m³ de metano gaseoso)',
          'Estudio de riesgos geológicos asociados a su disociación (deslizamientos submarinos)',
          'Investigación sobre su papel en cambios climáticos pasados y futuros',
          'Desarrollo de tecnologías de extracción segura',
          'Comprensión de ecosistemas microbianos asociados a zonas de filtración de metano'
        ],
        image: '/images/geology/methane_hydrates.jpg',
        imageAlt: 'Muestra de hidrato de metano en sedimento marino mostrando su estructura cristalina'
      },
      {
        title: 'Petróleo y Gas Submarino',
        description: 'Los yacimientos de petróleo y gas submarinos representan aproximadamente un 30% de la producción mundial de hidrocarburos. Se forman en cuencas sedimentarias marinas donde materia orgánica queda enterrada, se transforma en hidrocarburos por presión y temperatura, y migra hasta quedar atrapada en estructuras geológicas impermeables.',
        keyPoints: [
          'Los principales entornos son deltas submarinos, márgenes continentales y cuencas de antepaís',
          'Los reservorios más comunes incluyen areniscas porosas, calizas fracturadas y turbiditas',
          'La exploración utiliza métodos sísmicos 3D y 4D de alta resolución para identificar estructuras favorables',
          'Las profundidades de explotación han aumentado significativamente, alcanzando más de 3,000 metros de lámina de agua'
        ],
        applications: [
          'Abastecimiento energético convencional',
          'Desarrollo de tecnologías de perforación y producción en aguas ultraprofundas',
          'Estudio integrado de cuencas sedimentarias marinas',
          'Gestión de reservas de hidrocarburos',
          'Evaluación y mitigación de riesgos ambientales en explotación offshore'
        ],
        image: '/images/geology/offshore_oil.jpg',
        imageAlt: 'Plataforma petrolífera en el océano extrayendo hidrocarburos submarinos'
      }
    ],
    
    tectonics: [
      {
        title: 'Tectónica de Placas',
        description: 'La tectónica de placas es la teoría fundamental que explica la dinámica de la litosfera terrestre. En los océanos, es particularmente evidente con la creación de corteza en las dorsales, su desplazamiento a través de las cuencas oceánicas, y su destrucción en zonas de subducción.',
        keyPoints: [
          'Los océanos actuales están divididos en varias placas mayores (Pacífica, Norteamericana, Sudamericana, Euroasiática, Africana, Indoaustraliana y Antártica) y numerosas placas menores',
          'Las velocidades de desplazamiento varían desde menos de 1 cm/año hasta más de 15 cm/año',
          'El registro magnético del fondo oceánico proporciona evidencia directa del desplazamiento y expansión del fondo marino',
          'La edad máxima de la corteza oceánica actual es de aproximadamente 180 millones de años, mucho menor que la de continentes'
        ],
        applications: [
          'Comprensión de la evolución geodinámica global',
          'Predicción de riesgos sísmicos y volcánicos',
          'Reconstrucciones paleogeográficas',
          'Interpretación de patrones de circulación oceánica pasados y presentes',
          'Modelado de procesos de formación de recursos minerales y energéticos'
        ],
        image: '/images/geology/plate_tectonics.jpg',
        imageAlt: 'Mapa global mostrando las principales placas tectónicas y sus límites'
      },
      {
        title: 'Fallas de Transformación',
        description: 'Las fallas de transformación son un tipo de límite entre placas donde éstas se deslizan horizontalmente una respecto a la otra. En los océanos, las más prominentes son las que segmentan las dorsales mesooceánicas, aunque también existen grandes fallas transformantes que atraviesan cuencas oceánicas completas.',
        keyPoints: [
          'Conectan segmentos de dorsales y compensan su desplazamiento lateral',
          'Son zonas sísmicamente activas pero con terremotos de profundidad limitada (<30 km)',
          'Generan una morfología característica con valles lineales profundos y crestas paralelas',
          'Ejemplos notables incluyen la falla de San Andrés (que continúa en el océano como falla de Mendocino) y la zona de fractura Romanche en el Atlántico ecuatorial'
        ],
        applications: [
          'Estudio de la segmentación de dorsales y su evolución',
          'Comprensión de procesos sísmicos en límites transformantes',
          'Medición directa de tasas de desplazamiento entre placas',
          'Datación relativa de segmentos de dorsal',
          'Investigación de ecosistemas asociados a fluidos que migran a lo largo de zonas de fractura'
        ],
        image: '/images/geology/transform_fault.jpg',
        imageAlt: 'Imagen batimétrica de una falla de transformación oceánica y su desplazamiento'
      },
      {
        title: 'Sismología Marina',
        description: 'La sismología marina estudia la generación, propagación y registro de ondas sísmicas en el entorno oceánico. Es fundamental para comprender la estructura interna de la corteza oceánica, los procesos tectónicos activos y los riesgos sísmicos asociados.',
        keyPoints: [
          'Utiliza sismómetros de fondo oceánico (OBS) para registrar actividad sísmica submarina',
          'Los terremotos submarinos son más numerosos que los continentales debido a la actividad de dorsales y zonas de subducción',
          'La propagación de ondas sísmicas en corteza oceánica difiere de la continental debido a su estructura más simple y homogénea',
          'Permite detectar cámaras magmáticas bajo dorsales y zonas de acumulación de sedimentos'
        ],
        applications: [
          'Monitoreo de actividad sísmica en zonas de subducción para alerta de tsunamis',
          'Caracterización estructural de la corteza oceánica mediante tomografía sísmica',
          'Detección de volcanes submarinos activos',
          'Estudio de procesos de deformación en márgenes activos',
          'Exploración de recursos naturales mediante sísmica de refracción y reflexión'
        ],
        image: '/images/geology/marine_seismology.jpg',
        imageAlt: 'Mapa de epicentros de terremotos submarinos y dispositivo OBS para su detección'
      },
      {
        title: 'Isostasia',
        description: 'La isostasia es el principio de equilibrio gravitacional que explica cómo las diferentes partes de la litosfera "flotan" sobre la astenosfera más densa y deformable. En el entorno marino es crucial para entender la evolución de cuencas oceánicas, márgenes continentales y la respuesta a cargas como volcanes o capas de hielo.',
        keyPoints: [
          'La corteza oceánica se encuentra más profunda que la continental debido a su mayor densidad y menor espesor',
          'El enfriamiento y aumento de densidad de la litosfera oceánica con la edad explica el aumento de profundidad con la distancia a las dorsales',
          'Los montes submarinos y plateaus oceánicos generan anomalías positivas de gravedad y depresiones de la litosfera bajo ellos',
          'Los procesos de ajuste isostático continúan después de eventos como glaciaciones (rebote postglacial) o relleno de cuencas sedimentarias'
        ],
        applications: [
          'Interpretación de anomalías gravimétricas marinas',
          'Modelado de la subsidencia térmica de cuencas oceánicas',
          'Comprensión de cambios del nivel del mar relativos en costas tras glaciaciones',
          'Estudio de la flexión litosférica en zonas de subducción',
          'Análisis de la estabilidad de márgenes continentales'
        ],
        image: '/images/geology/isostasy.jpg',
        imageAlt: 'Diagrama mostrando el principio de isostasia aplicado a diferentes tipos de corteza'
      },
      {
        title: 'Geoide y Anomalías Gravitacionales',
        description: 'El geoide es la superficie equipotencial del campo gravitatorio terrestre que coincidiría con el nivel medio del mar en ausencia de mareas, corrientes y efectos atmosféricos. Sus desviaciones respecto a un elipsoide de referencia revelan anomalías gravitacionales que reflejan la distribución de masas en el interior terrestre y son particularmente evidentes en el entorno oceánico.',
        keyPoints: [
          'Las anomalías del geoide pueden alcanzar ±100 metros respecto al elipsoide de referencia',
          'En océanos, reflejan principalmente variaciones en el espesor y densidad de la corteza y litosfera',
          'Las dorsales generan anomalías positivas, mientras que las fosas oceánicas producen fuertes anomalías negativas',
          'Los datos de altimetría satelital permiten mapear el geoide marino con precisión centimétrica'
        ],
        applications: [
          'Determinación precisa de alturas ortométricas para cartografía marina',
          'Inferencia de estructuras del subsuelo oceánico',
          'Corrección de mediciones batimétricas',
          'Estudio de circulación oceánica absoluta',
          'Detección de montes submarinos no cartografiados'
        ],
        image: '/images/geology/geoid.jpg',
        imageAlt: 'Mapa global del geoide mostrando sus variaciones en el entorno oceánico'
      },
      {
        title: 'Datum y Sistemas de Referencia',
        description: 'Los datums son superficies de referencia utilizadas para definir posiciones horizontales y verticales en cartografía marina. Su correcta comprensión y aplicación es fundamental en geofísica marina para integrar datos de diferentes fuentes y épocas.',
        keyPoints: [
          'El datum vertical marino tradicional es el nivel medio del mar local, aunque modelos globales como el EGM96 son cada vez más utilizados',
          'Los datums horizontales han evolucionado desde redes locales hasta sistemas globales como WGS84',
          'La transformación entre diferentes datums es crítica al combinar conjuntos de datos históricos con modernos',
          'Las cartas náuticas utilizan datums verticales específicos (generalmente basados en la marea baja) diferentes de los geodésicos'
        ],
        applications: [
          'Integración de datos batimétricos de diferentes campañas',
          'Georreferenciación precisa de estructuras submarinas',
          'Determinación de cambios relativos del nivel del mar',
          'Planificación de operaciones de ingeniería submarina',
          'Cartografía náutica y seguridad en la navegación'
        ],
        image: '/images/geology/marine_datum.jpg',
        imageAlt: 'Diagrama mostrando diferentes datums verticales utilizados en entornos marinos'
      }
    ],
    
    analytical: [
      {
        title: 'Métodos Analíticos con IA',
        description: 'La aplicación de técnicas de Inteligencia Artificial y aprendizaje automático está revolucionando el análisis e interpretación de datos geológicos marinos. Estas técnicas permiten procesar enormes volúmenes de datos, identificar patrones complejos y automatizar tareas que tradicionalmente requerían interpretación manual.',
        keyPoints: [
          'Los algoritmos de aprendizaje profundo (deep learning) permiten la clasificación automática de imágenes de sonar y batimetría',
          'Técnicas de reconocimiento de patrones facilitan la identificación de estructuras geológicas en perfiles sísmicos',
          'Modelos predictivos basados en IA ayudan a identificar zonas potenciales para recursos minerales',
          'Algoritmos de clustering mejoran la segmentación de características del fondo marino a partir de múltiples fuentes de datos'
        ],
        applications: [
          'Interpretación automatizada de grandes conjuntos de datos sísmicos',
          'Clasificación de tipos de fondo marino a partir de datos acústicos',
          'Predicción de zonas de inestabilidad en taludes submarinos',
          'Identificación automática de rasgos geomorfológicos en datos batimétricos',
          'Optimización de rutas para campañas oceanográficas'
        ],
        image: '/images/geology/ai_analysis.jpg',
        imageAlt: 'Visualización de un algoritmo de IA procesando datos geofísicos marinos'
      },
      {
        title: 'Visualización Multidimensional',
        description: 'Las técnicas de visualización multidimensional permiten representar y analizar simultáneamente múltiples variables geológicas y geofísicas, facilitando la identificación de correlaciones y patrones no evidentes en representaciones tradicionales.',
        keyPoints: [
          'Combina datos espaciales 3D con dimensiones adicionales como tiempo (4D) y múltiples atributos geofísicos',
          'Utiliza técnicas como visualización volumétrica, realidad virtual y aumentada, y proyecciones multidimensionales',
          'Permite interactividad en tiempo real con grandes conjuntos de datos',
          'Facilita la colaboración interdisciplinaria al presentar datos complejos de forma intuitiva'
        ],
        applications: [
          'Interpretación integrada de datos sísmicos, electromagnéticos y gravimétricos',
          'Análisis de evolución temporal de sistemas geológicos submarinos',
          'Planificación de operaciones submarinas complejas',
          'Comunicación científica y educativa sobre procesos geológicos marinos',
          'Integración de datos geológicos con parámetros oceanográficos'
        ],
        image: '/images/geology/multidimensional_viz.jpg',
        imageAlt: 'Visualización multidimensional de datos geológicos submarinos mostrando múltiples atributos'
      },
      {
        title: 'Cartografía y Proyecciones',
        description: 'La cartografía marina aborda los desafíos específicos de representar la superficie tridimensional de la Tierra en mapas bidimensionales, con especial atención a la precisión en la representación de áreas oceánicas y la integración de datos batimétricos y geofísicos.',
        keyPoints: [
          'Las proyecciones más utilizadas en oceanografía incluyen Mercator (para navegación), UTM (para estudios locales) y proyecciones equivalentes (para análisis de área)',
          'La elección de proyección afecta significativamente la representación de estructuras submarinas, especialmente en altas latitudes',
          'Los sistemas de información geográfica marinos (GIS) permiten transformaciones entre proyecciones y análisis espacial avanzado',
          'La tendencia actual es hacia sistemas de cartografía web que permiten visualizar datos en múltiples proyecciones según necesidades'
        ],
        applications: [
          'Producción de cartas náuticas y mapas batimétricos',
          'Análisis espacial de datos oceanográficos y geológicos',
          'Planificación de campañas de investigación marina',
          'Gestión de zonas marinas protegidas',
          'Estudios de impacto de infraestructuras submarinas'
        ],
        image: '/images/geology/marine_cartography.jpg',
        imageAlt: 'Mapa batimétrico en diferentes proyecciones mostrando sus efectos en la representación'
      },
      {
        title: 'Geoquímica Marina',
        description: 'La geoquímica marina estudia la composición química de materiales del fondo oceánico y procesos que controlan la distribución y ciclo de elementos en el entorno marino. Es fundamental para comprender la génesis mineral, alteraciones diagenéticas y procesos de meteorización submarina.',
        keyPoints: [
          'Utiliza técnicas analíticas avanzadas como ICP-MS, microsonda electrónica y espectrometría de masas',
          'Estudia elementos mayores, trazas, tierras raras e isótopos en sedimentos y rocas submarinas',
          'Permite caracterizar fuentes de materiales, condiciones redox y procesos de alteración',
          'Los análisis de isótopos radiogénicos y estables aportan información sobre edades y condiciones de formación'
        ],
        applications: [
          'Determinación de procedencia de sedimentos marinos',
          'Estudio de procesos hidrotermales y mineralización asociada',
          'Reconstrucción de condiciones paleoceanográficas',
          'Monitoreo de contaminación en sedimentos',
          'Caracterización de recursos minerales submarinos'
        ],
        image: '/images/geology/marine_geochemistry.jpg',
        imageAlt: 'Análisis geoquímico de muestras de sedimentos marinos en laboratorio'
      },
      {
        title: 'Plataformas de Visualización',
        description: 'Las plataformas y herramientas de visualización permiten procesar, analizar y representar gráficamente datos geológicos marinos. La diversidad de opciones facilita diferentes enfoques según las necesidades específicas y la naturaleza de los datos.',
        keyPoints: [
          'R destaca por su potencia estadística y paquetes especializados como marmap, oce y metR para datos oceanográficos',
          'Python ofrece flexibilidad con librerías como GMT-Python, PyGMT, pandas y matplotlib para análisis geoespacial',
          'JavaScript permite visualizaciones interactivas web con librerías como Leaflet, D3.js y Plotly',
          'ArcGIS proporciona entorno integrado con extensiones específicas como Maritime Chart Server y Bathymetry'
        ],
        applications: [
          'Creación de mapas batimétricos interactivos',
          'Análisis estadístico de datos geológicos marinos',
          'Desarrollo de aplicaciones web para visualización de datos oceanográficos',
          'Integración de múltiples fuentes de datos geoespaciales',
          'Producción de visualizaciones científicas para publicaciones'
        ],
        image: '/images/geology/visualization_platforms.jpg',
        imageAlt: 'Diferentes plataformas mostrando visualizaciones de datos geológicos marinos'
      }
    ],

    // Nuevas categorías y tópicos
    resources_continued: [
      {
        title: 'Energía Geotérmica Submarina',
        description: 'La energía geotérmica submarina aprovecha el calor generado en zonas de actividad volcánica e hidrotermal del fondo oceánico. A diferencia de la geotermia terrestre, estos sistemas se encuentran a profundidades considerables bajo el mar y presentan desafíos únicos de acceso y aprovechamiento.',
        keyPoints: [
          'Las principales zonas con potencial se ubican en dorsales activas, arcos volcánicos submarinos y puntos calientes oceánicos',
          'Los sistemas pueden alcanzar temperaturas superiores a 400°C en chimeneas hidrotermales',
          'Existen proyectos piloto cerca de zonas costeras con actividad hidrotermal como Islandia y Japón',
          'El aprovechamiento puede ser directo (extracción de fluidos calientes) o indirecto (intercambio de calor in situ)'
        ],
        applications: [
          'Generación eléctrica en islas volcánicas y zonas costeras',
          'Desalinización de agua marina mediante calor geotérmico',
          'Acuicultura en zonas con gradientes térmicos naturales',
          'Desarrollo de tecnologías submarinas resistentes a condiciones extremas',
          'Investigación sobre ciclos geoquímicos asociados a sistemas hidrotermales'
        ],
        image: '/images/geology/submarine_geothermal.jpg',
        imageAlt: 'Sistema de aprovechamiento geotérmico submarino cerca de una zona hidrotermal'
      },
      {
        title: 'Cables Submarinos',
        description: 'Los cables submarinos son infraestructuras críticas que atraviesan los fondos oceánicos transportando más del 95% de las comunicaciones internacionales. Su instalación, mantenimiento y protección requieren un profundo conocimiento de la geología marina para evitar riesgos geológicos y optimizar rutas.',
        keyPoints: [
          'Existen más de 400 cables submarinos activos que suman más de 1.3 millones de kilómetros',
          'Su instalación requiere estudios geológicos detallados para evitar zonas de riesgo como fallas activas, cañones submarinos o zonas de deslizamientos',
          'En plataformas continentales suelen enterrarse para protección, mientras que en aguas profundas descansan sobre el lecho marino',
          'Su vida útil promedio es de 25 años, aunque factores geológicos pueden reducirla significativamente'
        ],
        applications: [
          'Telecomunicaciones internacionales',
          'Transmisión de energía eléctrica entre territorios separados por mar',
          'Monitoreo sísmico y oceanográfico con cables en desuso o con sensores integrados',
          'Estudios de impacto de infraestructuras en ecosistemas bentónicos',
          'Desarrollo de materiales y diseños resistentes a condiciones submarinas extremas'
        ],
        image: '/images/geology/submarine_cables.jpg',
        imageAlt: 'Mapa de cables submarinos y detalles de instalación en diferentes entornos geológicos'
      }
    ],
    
    ecology: [
      {
        title: 'Geobiología Marina',
        description: 'La geobiología marina estudia las interacciones entre los organismos marinos y el entorno geológico, incluyendo cómo los seres vivos modifican y son afectados por procesos geológicos submarinos. Es un campo interdisciplinario que conecta geología, biología, química y oceanografía.',
        keyPoints: [
          'Abarca desde comunidades microbianas en sedimentos profundos hasta arrecifes coralinos y ecosistemas quimiosintéticos',
          'Estudia el papel de organismos en la formación y alteración de rocas y minerales marinos',
          'Investiga biomineralización y su influencia en ciclos biogeoquímicos oceánicos',
          'Analiza la adaptación de la vida a condiciones geológicas extremas como fuentes hidrotermales y filtraciones frías'
        ],
        applications: [
          'Comprensión de la formación de depósitos biogénicos como carbonatos y silicatos',
          'Estudio de microbialitas y estromatolitos modernos como análogos de ecosistemas primitivos',
          'Investigación de sumideros de carbono en sedimentos biogénicos',
          'Desarrollo de biomateriales inspirados en procesos de biomineralización marina',
          'Evaluación de impactos de actividades humanas en ecosistemas bentónicos'
        ],
        image: '/images/geology/marine_geobiology.jpg',
        imageAlt: 'Ecosistema de fuente hidrotermal mostrando interacciones geobiológicas'
      },
      {
        title: 'Formación de Carbonatos',
        description: 'La formación de carbonatos marinos incluye procesos biogénicos y abióticos que precipitan minerales carbonatados en el entorno oceánico. Estos depósitos representan importantes registros paleoclimáticos y constituyen una parte significativa de la corteza terrestre.',
        keyPoints: [
          'Los principales organismos formadores de carbonatos incluyen corales, moluscos, foraminíferos y cocolitofóridos',
          'La aragonita y calcita son los polimorfos de carbonato de calcio más comunes, con diferentes solubilidades',
          'La química del agua, temperatura y presión controlan la saturación y tipo de carbonato precipitado',
          'Los arrecifes de coral y plataformas carbonatadas son los sistemas de acumulación más importantes en mares someros'
        ],
        applications: [
          'Reconstrucción de paleoclimas y niveles del mar',
          'Evaluación de impactos de acidificación oceánica en organismos calcificadores',
          'Exploración de hidrocarburos en rocas carbonatadas',
          'Estudio de ciclos de carbono a escala geológica',
          'Desarrollo de análogos modernos para entender depósitos antiguos'
        ],
        image: '/images/geology/carbonate_formation.jpg',
        imageAlt: 'Procesos de formación de carbonatos por organismos marinos y precipitación'
      },
      {
        title: 'Formación de Sílice Biogénica',
        description: 'La formación de sílice biogénica ocurre principalmente por la actividad de organismos marinos como diatomeas, radiolarios y esponjas silíceas, que extraen ácido silícico disuelto del agua para construir sus estructuras esqueléticas. Estos depósitos son importantes componentes de sedimentos oceánicos y registros paleoceanográficos.',
        keyPoints: [
          'Las diatomeas son los principales productores de sílice biogénica, especialmente en zonas de afloramiento y altas latitudes',
          'La sílice biogénica inicial (ópalo-A) sufre transformaciones diagenéticas a formas más estables como ópalo-CT y cuarzo',
          'Los depósitos de sílice pueden formar extensas capas de diatomita o radiolarita',
          'El ciclo de la sílice marina es más rápido que el del carbonato, con tiempos de residencia menores'
        ],
        applications: [
          'Reconstrucción de productividad oceánica pasada',
          'Indicadores de zonas de surgencia y frentes oceánicos pasados',
          'Extracción comercial de diatomita para filtración y absorbentes',
          'Desarrollo de biomateriales inspirados en nanoestructuras silíceas naturales',
          'Estudio del ciclo biogeoquímico del silicio'
        ],
        image: '/images/geology/biogenic_silica.jpg',
        imageAlt: 'Microfotografía de diatomeas y radiolarios formadores de depósitos silíceos'
      },
      {
        title: 'Anisotropía de Minerales',
        description: 'La anisotropía de minerales se refiere a la variación de propiedades físicas según la dirección en cristales y rocas. En geología marina, es particularmente relevante para comprender propiedades sísmicas, magnéticas y de deformación de materiales del fondo oceánico y manto superior.',
        keyPoints: [
          'Los minerales del manto como olivino y piroxeno presentan fuerte anisotropía sísmica que influye en la propagación de ondas',
          'La cristalización y alineación preferente de minerales en dorsales crea patrones de anisotropía característicos',
          'Los sedimentos con partículas planares (arcillas) desarrollan anisotropía durante la compactación',
          'Las técnicas de difracción de rayos X y neutrones permiten caracterizar la orientación preferente de minerales'
        ],
        applications: [
          'Interpretación de datos sísmicos de refracción en corteza y manto oceánico',
          'Estudio de dirección de flujo en el manto bajo dorsales y zonas de subducción',
          'Análisis de estabilidad de taludes submarinos en sedimentos anisotrópicos',
          'Caracterización de fábricas tectónicas en zonas de deformación submarinas',
          'Modelado de propiedades de propagación de ondas en exploración geofísica'
        ],
        image: '/images/geology/mineral_anisotropy.jpg',
        imageAlt: 'Representación de anisotropía sísmica en minerales de la corteza oceánica'
      }
    ],
    
    mapping: [
      {
        title: 'Mapas de Riesgo Geológico',
        description: 'Los mapas de riesgo geológico submarino integran información batimétrica, sísmica, geotécnica y oceanográfica para identificar y caracterizar amenazas naturales en el entorno marino. Son herramientas esenciales para la planificación de infraestructuras submarinas y gestión de zonas costeras.',
        keyPoints: [
          'Incluyen análisis de estabilidad de taludes submarinos, zonas sísmicamente activas y vulcanismo submarino',
          'Combinan datos históricos de eventos pasados con modelado predictivo',
          'Utilizan sistemas de información geográfica (SIG) para integrar múltiples capas de información',
          'Categorizan zonas según niveles de riesgo para diferentes tipos de infraestructuras'
        ],
        applications: [
          'Planificación de rutas para cables y tuberías submarinas',
          'Evaluación de sitios para plataformas offshore y parques eólicos marinos',
          'Prevención y alerta temprana de tsunamis',
          'Gestión integrada de zonas costeras',
          'Mitigación de riesgos para comunidades costeras vulnerables'
        ],
        image: '/images/geology/geological_hazard_map.jpg',
        imageAlt: 'Mapa de riesgos geológicos submarinos mostrando diferentes zonas de amenaza'
      },
      {
        title: 'Mapas Sedimentológicos',
        description: 'Los mapas sedimentológicos del fondo marino representan la distribución espacial de diferentes tipos de sedimentos, su composición, granulometría y propiedades asociadas. Son fundamentales para comprender procesos de transporte y deposición, así como para aplicaciones prácticas en ingeniería y gestión ambiental.',
        keyPoints: [
          'Combinan muestreo directo con técnicas indirectas como sonar multihaz y clasificación acústica',
          'Categorizan sedimentos según clasificaciones estandarizadas (Folk, Shepard, etc.)',
          'Incluyen información sobre composición mineralógica, contenido orgánico y contaminantes',
          'Pueden representar tasas de sedimentación y direcciones de transporte'
        ],
        applications: [
          'Planificación de dragados y operaciones de infraestructura submarina',
          'Identificación de hábitats bentónicos para gestión ecológica',
          'Estudios de dispersión de contaminantes en sedimentos',
          'Exploración de placeres minerales',
          'Investigación de procesos sedimentarios y oceanográficos'
        ],
        image: '/images/geology/sediment_map.jpg',
        imageAlt: 'Mapa sedimentológico marino mostrando distribución de diferentes tipos de sedimentos'
      },
      {
        title: 'Cadenas de Montes Submarinos',
        description: 'Las cadenas de montes submarinos son alineaciones de elevaciones volcánicas submarinas que suelen formarse por el movimiento de placas tectónicas sobre puntos calientes o a lo largo de zonas de fractura. Su cartografía y estudio proporciona información valiosa sobre la evolución tectónica y volcánica de las cuencas oceánicas.',
        keyPoints: [
          'Ejemplos notables incluyen la cadena Hawaiana-Emperador en el Pacífico, las Islas Canarias en el Atlántico y la cordillera de Ninety East en el Índico',
          'Su edad suele seguir patrones progresivos que reflejan el movimiento de las placas',
          'Muestran diferente morfología según su etapa evolutiva: cónicos cuando son jóvenes, planos (guyots) cuando han sido erosionados',
          'Forman ecosistemas únicos que funcionan como "oasis" de biodiversidad en aguas oceánicas'
        ],
        applications: [
          'Reconstrucción de movimientos absolutos de placas tectónicas',
          'Estudio de la evolución de puntos calientes y plumas mantélicas',
          'Conservación de ecosistemas pelágicos asociados',
          'Exploración de recursos minerales (costras de ferromanganeso)',
          'Comprensión de la variabilidad oceanográfica causada por interacción con corrientes'
        ],
        image: '/images/geology/seamount_chains.jpg',
        imageAlt: 'Mapa batimétrico mostrando una cadena de montes submarinos con progresión de edades'
      }
    ]
  };

  // Obtener los tópicos para la categoría seleccionada
  const getCurrentTopics = (): TopicContent[] => {
    // Asegurarse de que categoryIndex está dentro de los límites
    if (categoryIndex >= categories.length) {
      return [];
    }
    
    // Usar aserción non-null para asegurarle a TypeScript que el objeto existe
    const categoryId = categories[categoryIndex]!.id;
    let topics: TopicContent[] = [];
    
    // Manejar categorías combinadas como resources y resources_continued
    if (categoryId === 'resources') {
      // Asegurarse de que las propiedades existen con una aserción de tipo
      const resourceTopics = topicContent.resources as TopicContent[];
      const resourcesContinuedTopics = topicContent.resources_continued as TopicContent[];
      topics = [...(resourceTopics || []), ...(resourcesContinuedTopics || [])];
    } else if (categoryId in topicContent) {
      // Usar aserción de tipo para informar a TypeScript que estos valores son seguros
      topics = topicContent[categoryId as keyof typeof topicContent] as TopicContent[];
    }
    
    return topics;
  };

  // Función para cambiar el tópico seleccionado dentro de la categoría actual
  const selectTopic = (topicIndex: number) => {
    // Verificar que categoryIndex está dentro de los límites válidos
    if (categoryIndex >= categories.length) {
      return; // Salir de la función si el índice está fuera de rango
    }
    
    // Usar aserción non-null para indicar a TypeScript que el objeto existe
    const categoryId = categories[categoryIndex]!.id;
    
    setSelectedTopics({
      ...selectedTopics,
      [categoryId]: topicIndex
    });
  };

  // Función para renderizar el contenido del tópico seleccionado
  const renderTopicContent = () => {
    const topics = getCurrentTopics();
    
    // Asegurarse de que categoryIndex está dentro de los límites
    if (categoryIndex >= categories.length) {
      return (
        <div className="p-4 text-center text-gray-500">
          <p>Categoría no disponible.</p>
        </div>
      );
    }
    
    const categoryId = categories[categoryIndex]!.id;
    const topicIndex = selectedTopics[categoryId] || 0;
    
    if (!topics || topics.length === 0 || topicIndex >= topics.length) {
      return (
        <div className="p-4 text-center text-gray-500">
          <p>No hay contenido disponible para esta categoría.</p>
        </div>
      );
    }
    
    // Usamos una aserción non-null (!) porque ya verificamos arriba que el topic existe
    const topic = topics[topicIndex]!;
    
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-ocean-800">{topic.title}</h2>
        
        {topic.image && (
  <div className="relative rounded-lg mb-6 overflow-hidden" style={{ height: '300px', width: '100%' }}>
    <Image 
  src={topic.image}
  alt={topic.imageAlt || topic.title}
  fill
  sizes="100vw"
  style={{ objectFit: 'contain' }}
  className="transition-transform duration-500 hover:scale-105"
/>
  </div>
)}
        
        <div className="prose prose-ocean max-w-none">
          <p className="text-lg text-gray-700">{topic.description}</p>
          
          <div className="mt-6">
            <h3 className="text-xl font-semibold text-ocean-700 mb-3">Puntos Clave</h3>
            <ul className="list-disc pl-5 space-y-2">
              {topic.keyPoints.map((point: string, idx: number) => (
                <li key={idx} className="text-gray-700">{point}</li>
              ))}
            </ul>
          </div>
          
          <div className="mt-6">
            <h3 className="text-xl font-semibold text-ocean-700 mb-3">Aplicaciones</h3>
            <ul className="list-disc pl-5 space-y-2">
              {topic.applications.map((app: string, idx: number) => (
                <li key={idx} className="text-gray-700">{app}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  };
  
  // Renderizado del componente principal
  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-ocean-900 mb-4">Oceanografía Geológica</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Exploración de los procesos geológicos submarinos, formaciones y recursos del fondo oceánico
          </p>
        </div>
        
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Selector de categorías */}
          <Tab.Group selectedIndex={categoryIndex} onChange={setCategoryIndex}>
          <Tab.List className="flex p-1 space-x-1 bg-ocean-100 rounded-t-xl">
  {categories.map((category) => (
    <Tab
      key={category.id}
      className={({ selected }) =>
        `w-full py-3 text-sm font-medium leading-5 transition-colors duration-200
        ${
          selected
            ? 'bg-ocean-700 text-white rounded-md shadow-sm'
            : 'text-ocean-700 hover:bg-ocean-200 rounded-md'
        }`
      }
    >
      {category.name}
    </Tab>
  ))}
</Tab.List>
            
            <Tab.Panels>
              {categories.map((category, idx) => (
                <Tab.Panel key={idx} className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Selector de tópicos */}
                    <div className="lg:col-span-1">
                      <h3 className="text-lg font-semibold text-ocean-800 mb-4">Tópicos</h3>
                      <div className="space-y-2">
                        {getCurrentTopics().map((topic, topicIdx) => (
                          <button
                            key={topicIdx}
                            onClick={() => selectTopic(topicIdx)}
                            className={`block w-full text-left px-4 py-3 rounded-lg transition
                              ${
                                idx < categories.length && 
                                selectedTopics[categories[idx]!.id] === topicIdx
                                  ? 'bg-ocean-600 text-white'
                                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                              }`}
                          >
                            {/* Usar operador non-null para asegurarle a TypeScript que title existe */}
                            {topic?.title!}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    {/* Contenido del tópico seleccionado */}
                    <div className="lg:col-span-2 bg-gray-50 rounded-lg p-6">
                      {renderTopicContent()}
                    </div>
                  </div>
                </Tab.Panel>
              ))}
            </Tab.Panels>
          </Tab.Group>
        </div>
        
        {/* Sección adicional: Recursos y herramientas */}
        <div className="mt-12 bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-ocean-800 mb-6">Recursos y Herramientas</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-ocean-50 rounded-lg p-5">
              <h3 className="text-xl font-semibold text-ocean-700 mb-3">Bases de Datos</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li><a href="#" className="text-ocean-600 hover:underline">GEBCO (Batimetría Global)</a></li>
                <li><a href="#" className="text-ocean-600 hover:underline">GeoMapApp (Visualización Geofísica)</a></li>
                <li><a href="#" className="text-ocean-600 hover:underline">EMODnet Geology (Datos Geológicos Europeos)</a></li>
                <li><a href="#" className="text-ocean-600 hover:underline">NGDC Marine Geology Data (NOAA)</a></li>
              </ul>
            </div>
            
            <div className="bg-ocean-50 rounded-lg p-5">
              <h3 className="text-xl font-semibold text-ocean-700 mb-3">Software</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li><a href="#" className="text-ocean-600 hover:underline">MB-System (Procesamiento Batimétrico)</a></li>
                <li><a href="#" className="text-ocean-600 hover:underline">GMT (Generic Mapping Tools)</a></li>
                <li><a href="#" className="text-ocean-600 hover:underline">QGIS con plugins oceánicos</a></li>
                <li><a href="#" className="text-ocean-600 hover:underline">Fledermaus (Visualización 3D)</a></li>
              </ul>
            </div>
            
            <div className="bg-ocean-50 rounded-lg p-5">
              <h3 className="text-xl font-semibold text-ocean-700 mb-3">Biblioteca</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li><a href="#" className="text-ocean-600 hover:underline">Manual de Geología Marina (PDF)</a></li>
                <li><a href="#" className="text-ocean-600 hover:underline">Guía de Métodos Acústicos</a></li>
                <li><a href="#" className="text-ocean-600 hover:underline">Atlas de Estructuras Submarinas</a></li>
                <li><a href="#" className="text-ocean-600 hover:underline">Diccionario de Términos Geológicos Marinos</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Sección de casos de estudio */}
        <div className="mt-12 bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-ocean-800 mb-6">Casos de Estudio</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-lg overflow-hidden">
            <div className="relative h-48">
  <Image 
    src="/images/geology/multibeam.png" 
    alt="Estudio de deslizamiento submarino en Patagonia"
    fill
    sizes="100vw"
    style={{ objectFit: 'cover' }}
  />
</div>
              <div className="p-5">
                <h3 className="text-xl font-semibold text-ocean-700 mb-2">Deslizamiento submarino en fiordo Aysén</h3>
                <p className="text-gray-700 mb-3">
                  Análisis geológico y geofísico del deslizamiento submarino en el flanco del fiordo Aysén.
                </p>
                <a href="#" className="text-ocean-600 hover:underline">Ver estudio completo →</a>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg overflow-hidden">
              <div className="relative h-48">
                <Image 
                  src="/images/geology/case_study2.jpg" 
                  alt="Cartografía de fuentes hidrotermales en la dorsal Mesoatlántica"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="p-5">
                <h3 className="text-xl font-semibold text-ocean-700 mb-2">Fuentes Hidrotermales de Isla Mocha</h3>
                <p className="text-gray-700 mb-3">
                  Cartografía multihaz de alta resolución y caracterización geoquímica del campo hidrotermal.
                </p>
                <a href="#" className="text-ocean-600 hover:underline">Ver estudio completo →</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Definición de estilos específicos para Tailwind
const tailwindConfig = {
  theme: {
    extend: {
      colors: {
        ocean: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
      },
      typography: {
        ocean: {
          css: {
            '--tw-prose-headings': 'var(--tw-color-ocean-700)',
            '--tw-prose-links': 'var(--tw-color-ocean-600)',
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@headlessui/react'),
  ],
};

export default GeologicalOceanography;