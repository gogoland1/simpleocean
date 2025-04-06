import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';

// Definir interfaces para la estructura jerárquica
interface TopicBase {
  id: number;
  name: string;
  category: string;
  description: string;
  image: string;
  size: 'large' | 'medium' | 'small';
}

interface MainTopic extends TopicBase {
  size: 'large';
  connections: number[]; // Conexiones a otros temas principales
  subtopics: number[]; // IDs de los subtemas relacionados
}

interface SubTopic extends TopicBase {
  size: 'medium' | 'small';
  parentId: number; // ID del tema principal al que pertenece
  connections: number[]; // Conexiones a otros subtemas
}

type Topic = MainTopic | SubTopic;

// Función para determinar si un topic es principal
const isMainTopic = (topic: Topic): topic is MainTopic => {
  return topic.size === 'large';
};

const MarineHierarchicalNetwork: React.FC = () => {
  const router = useRouter();
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [isInfoVisible, setIsInfoVisible] = useState<boolean>(false);
  const [zoomedNode, setZoomedNode] = useState<number | null>(null);
  const [expandedMainTopic, setExpandedMainTopic] = useState<number | null>(null);
  const networkRef = useRef<HTMLDivElement | null>(null);
  const nodeRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
  
  // Datos de tópicos de biología marina en estructura jerárquica
  const topics: Topic[] = [
    // Temas principales (nodos grandes)
    {
      id: 1,
      name: 'Biodiversidad Marina',
      category: 'Conceptos',
      size: 'large',
      description: 'Estudio de la diversidad de vida en los océanos y sus patrones de distribución. Comprende tres componentes: diversidad alfa (riqueza en un hábitat), diversidad beta (cambios entre comunidades) y diversidad gamma (diversidad regional). Las herramientas de análisis permiten cuantificar estas dimensiones y entender procesos ecológicos y evolutivos en ecosistemas marinos.',
      image: '/ecosystems/marine-biodiversity.jpg',
      connections: [2, 3, 7, 8], // Conexiones a otros temas principales
      subtopics: [101, 102, 103, 104, 105, 106, 107] // Añadimos los nuevos subtemas
    },
    {
      id: 2,
      name: 'Ecología de Comunidades',
      category: 'Campos',
      size: 'large',
      description: 'Estudio de las interacciones entre poblaciones de diferentes especies que coexisten en tiempo y espacio en ecosistemas marinos.',
      image: '/ecosystems/community-ecology.jpg',
      connections: [1, 3, 6, 8],
      subtopics: [201, 202, 203, 204, 205, 213, 214]
    },
    {
      id: 3,
      name: 'Ecosistemas Marinos',
      category: 'Ecosistemas',
      size: 'large',
      description: 'Sistemas biológicos formados por organismos marinos y el ambiente físico donde interactúan, intercambiando energía y nutrientes.',
      image: '/ecosystems/marine-ecosystems.jpg',
      connections: [1, 2, 4, 6, 8],
      subtopics: [301, 302, 303, 304, 305, 306]
    },
    {
      id: 4,
      name: 'Microbiología Marina',
      category: 'Campos',
      size: 'large',
      description: 'Estudio de los microorganismos marinos, incluyendo bacterias, arqueas, virus y microeucariotas.',
      image: '/ecosystems/marine-microbiology.jpg',
      connections: [3, 5, 7],
      subtopics: [401, 402, 403, 404]
    },
    {
      id: 5,
      name: 'Ficología',
      category: 'Campos',
      size: 'large',
      description: 'Estudio de las algas, incluyendo macroalgas y microalgas, organismos fotosintéticos marinos fundamentales en los ecosistemas.',
      image: '/ecosystems/phycology.jpg',
      connections: [1, 3, 4, 6],
      subtopics: [501, 502, 503, 504, 505]
    },
    {
      id: 6,
      name: 'Oceanografía Biológica',
      category: 'Campos',
      size: 'large',
      description: 'Estudio de cómo los procesos biológicos influyen en la química y física de los océanos y viceversa.',
      image: '/ecosystems/biological-oceanography.jpg',
      connections: [2, 3, 5, 8],
      subtopics: [601, 602, 603, 604]
    },
    {
      id: 7,
      name: 'Procesos Simbióticos',
      category: 'Procesos',
      size: 'large',
      description: 'Interacciones íntimas y persistentes entre especies diferentes en el medio marino, con beneficios para al menos una de ellas.',
      image: '/ecosystems/symbiotic-processes.jpg',
      connections: [1, 3, 4, 5],
      subtopics: [701, 702, 703, 704]
    },
    {
      id: 8,
      name: 'Conservación Marina',
      category: 'Aplicaciones',
      size: 'large',
      description: 'Esfuerzos para proteger y preservar ecosistemas marinos y su biodiversidad frente a amenazas humanas.',
      image: '/ecosystems/marine-conservation.jpg',
      connections: [1, 2, 3],
      subtopics: [801, 802, 803, 804]
    },

    {
      id: 9, // Asumiendo que ya tienes 8 temas principales
      name: 'Análisis Estadístico Ecológico',
      category: 'Métodos',
      size: 'large',
      description: 'Métodos estadísticos y análisis multivariados utilizados para interpretar patrones ecológicos complejos en ecosistemas marinos.',
      image: '/ecosystems/statistical-analysis.jpg',
      connections: [2, 6, 3], // Conectar con Ecología de Comunidades, Oceanografía Biológica y Ecosistemas Marinos
      subtopics: [901, 902, 903, 904, 905] // IDs de subtemas nuevos
    },
    {
      id: 10,
      name: 'Metodologías de Muestreo',
      category: 'Métodos',
      size: 'large',
      description: 'Técnicas y protocolos para la recolección de datos en ecosistemas marinos, desde plancton hasta megafauna y hábitats bentónicos.',
      image: '/ecosystems/sampling-methods.jpg',
      connections: [1, 3, 4, 5], // Conectar con Biodiversidad, Ecosistemas, Microbiología y Ficología
      subtopics: [1001, 1002, 1003, 1004] // IDs de subtemas nuevos
    },
    
    // Subtemas de Biodiversidad Marina
    {
      id: 101,
      name: 'Taxonomía Marina',
      category: 'Biodiversidad',
      size: 'medium',
      parentId: 1,
      description: 'Clasificación sistemática de los organismos marinos basada en relaciones evolutivas.',
      image: '/ecosystems/taxonomy.jpg',
      connections: [102, 103, 104, 105]
    },
    {
      id: 102,
      name: 'Biogeografía Marina',
      category: 'Biodiversidad',
      size: 'medium',
      parentId: 1,
      description: 'Estudio de la distribución geográfica de especies marinas y los factores históricos y ecológicos que la determinan.',
      image: '/ecosystems/biogeography.jpg',
      connections: [101, 103, 201, 106]
    },
    {
      id: 103,
      name: 'Filogenética Marina',
      category: 'Biodiversidad',
      size: 'medium',
      parentId: 1,
      description: 'Estudio de las relaciones evolutivas entre especies marinas a través del tiempo.',
      image: '/ecosystems/phylogenetics.jpg',
      connections: [101, 102, 107]
    },
    {
      id: 104,
      name: 'Diversidad Funcional',
      category: 'Biodiversidad',
      size: 'medium',
      parentId: 1,
      description: 'Estudio de las características funcionales de especies marinas y cómo contribuyen al funcionamiento del ecosistema.',
      image: '/ecosystems/functional-diversity.jpg',
      connections: [101, 204, 603, 105, 106]
    },
    {
      id: 105,
      name: 'Diversidad Alfa',
      category: 'Biodiversidad',
      size: 'medium',
      parentId: 1,
      description: 'Medida de la riqueza y equitatividad de especies dentro de un hábitat específico. Se evalúa mediante índices como Shannon, Simpson, Margalef y Pielou, permitiendo comparar y monitorear la diversidad de comunidades marinas en espacios definidos.',
      image: '/images/diversidad/alpha_diversity.jpg',
      connections: [101, 104, 106, 107, 902]
    },
    {
      id: 106,
      name: 'Diversidad Beta',
      category: 'Biodiversidad',
      size: 'medium',
      parentId: 1,
      description: 'Análisis del cambio en la composición de especies entre diferentes ecosistemas o a lo largo de gradientes ambientales. Índices como Bray-Curtis y Whittaker permiten cuantificar estos cambios e identificar patrones de zonación en ecosistemas marinos.',
      image: '/images/diversidad/beta_diversity.jpg',
      connections: [102, 104, 105, 107, 903]
    },
    {
      id: 107,
      name: 'Diversidad Gamma',
      category: 'Biodiversidad',
      size: 'medium',
      parentId: 1,
      description: 'Evaluación de la diversidad total en una región geográfica amplia. Se analiza mediante técnicas multivariadas como RDA, db-RDA y NMDS que permiten relacionar la composición de comunidades con variables ambientales a escala regional.',
      image: '/images/diversidad/gamma_diversity.jpg',
      connections: [103, 105, 106, 904]
    },
    
    // Subtemas de Ecología de Comunidades
    {
      id: 201,
      name: 'Competencia',
      category: 'Ecología',
      size: 'medium',
      parentId: 2,
      description: 'Interacción entre especies que buscan los mismos recursos limitados, afectando el crecimiento, supervivencia y reproducción.',
      image: '/ecosystems/competition.jpg',
      connections: [202, 203, 205, 303]
    },
    {
      id: 202,
      name: 'Dinámicas de Población',
      category: 'Ecología',
      size: 'medium',
      parentId: 2,
      description: 'Estudio de cómo y por qué cambian los tamaños y estructuras de las poblaciones a lo largo del tiempo.',
      image: '/ecosystems/population-dynamics.jpg',
      connections: [201, 203, 205]
    },
    {
      id: 203,
      name: 'Teoría de Islas',
      category: 'Ecología',
      size: 'medium',
      parentId: 2,
      description: 'Modelo que explica la riqueza de especies en hábitats aislados como función del equilibrio entre colonización y extinción.',
      image: '/images/biology/community_ecology/island_theory.png',
      connections: [201, 202, 204, 903, 213, 214]
    },
    
    // Nodo para el Efecto Fundador
    {
      id: 213,
      name: 'Efecto Fundador',
      category: 'Ecología',
      size: 'small',
      parentId: 2,
      description: 'Proceso evolutivo que ocurre cuando un pequeño grupo de individuos establece una nueva población, llevando a cambios en frecuencias alélicas y reducción de diversidad genética.',
      image: '/images/biology/community_ecology/founder_effect.png',
      connections: [203, 214]
    },
    
    // Nodo para el Cuello de Botella Genético
    {
      id: 214,
      name: 'Cuello de Botella',
      category: 'Ecología',
      size: 'small',
      parentId: 2,
      description: 'Reducción drástica en el tamaño de una población existente que resulta en pérdida de diversidad genética y aumento de deriva génica, afectando su potencial evolutivo.',
      image: '/images/biology/community_ecology/bottleneck.png',
      connections: [203, 213]
    },
    
    {
      id: 204,
      name: 'Redes Tróficas',
      category: 'Ecología',
      size: 'medium',
      parentId: 2,
      description: 'Representación de las interacciones alimentarias entre especies en ecosistemas marinos.',
      image: '/ecosystems/food-webs.jpg',
      connections: [201, 202, 205, 601]
    },
    {
      id: 205,
      name: 'Sucesión Ecológica Marina',
      category: 'Ecología',
      size: 'medium',
      parentId: 2,
      description: 'Proceso de cambio direccional en la estructura de comunidades marinas a lo largo del tiempo.',
      image: '/ecosystems/succession.jpg',
      connections: [201, 202, 301]
    },
    
    // Subtemas de Ecosistemas Marinos
    {
      id: 301,
      name: 'Arrecifes de Coral',
      category: 'Ecosistemas',
      size: 'medium',
      parentId: 3,
      description: 'Ecosistemas marinos de alta biodiversidad formados principalmente por colonias de corales y otros organismos calcificantes.',
      image: '/ecosystems/coral-reefs.jpg',
      connections: [302, 303, 701, 702]
    },
    {
      id: 302,
      name: 'Ecosistemas Bentónicos',
      category: 'Ecosistemas',
      size: 'medium',
      parentId: 3,
      description: 'Comunidades biológicas que habitan el fondo marino, desde la costa hasta las fosas abisales.',
      image: '/ecosystems/benthic-ecosystems.jpg',
      connections: [301, 303, 304]
    },
    {
      id: 303,
      name: 'Ecosistemas Pelágicos',
      category: 'Ecosistemas',
      size: 'medium',
      parentId: 3,
      description: 'Hábitats de aguas abiertas donde viven organismos que nadan o flotan libremente en la columna de agua.',
      image: '/ecosystems/pelagic-ecosystems.jpg',
      connections: [302, 304, 601]
    },
    {
      id: 304,
      name: 'Manglares',
      category: 'Ecosistemas',
      size: 'medium',
      parentId: 3,
      description: 'Ecosistemas costeros dominados por árboles adaptados a condiciones de alta salinidad en la interfaz tierra-mar.',
      image: '/ecosystems/mangroves.jpg',
      connections: [302, 305, 306]
    },
    {
      id: 305,
      name: 'Praderas Marinas',
      category: 'Ecosistemas',
      size: 'medium',
      parentId: 3,
      description: 'Ecosistemas formados por plantas marinas con flores que crecen en aguas poco profundas y sedimentos suaves.',
      image: '/ecosystems/seagrass.jpg',
      connections: [302, 304, 306]
    },
    {
      id: 306,
      name: 'Estuarios',
      category: 'Ecosistemas',
      size: 'medium',
      parentId: 3,
      description: 'Zonas de transición donde los ríos se encuentran con el mar, caracterizadas por gradientes de salinidad.',
      image: '/ecosystems/estuaries.jpg',
      connections: [304, 305]
    },
    
    // Subtemas de Microbiología Marina
    {
      id: 401,
      name: 'Microbiomas Marinos',
      category: 'Microbiología',
      size: 'medium',
      parentId: 4,
      description: 'Comunidades complejas de microorganismos que habitan diferentes nichos marinos y sus interacciones.',
      image: '/ecosystems/microbiomes.jpg',
      connections: [402, 403, 404, 701]
    },
    {
      id: 402,
      name: 'Virus Marinos',
      category: 'Microbiología',
      size: 'medium',
      parentId: 4,
      description: 'Estudio de los virus en ecosistemas marinos y su impacto en poblaciones microbianas y ciclos biogeoquímicos.',
      image: '/ecosystems/marine-viruses.jpg',
      connections: [401, 403, 404]
    },
    {
      id: 403,
      name: 'Bacterias Marinas',
      category: 'Microbiología',
      size: 'medium',
      parentId: 4,
      description: 'Organismos procariotas unicelulares marinos que desempeñan roles cruciales en ciclos biogeoquímicos y redes tróficas.',
      image: '/ecosystems/marine-bacteria.jpg',
      connections: [401, 402, 404, 602]
    },
    {
      id: 404,
      name: 'Arqueobacterias Marinas',
      category: 'Microbiología',
      size: 'medium',
      parentId: 4,
      description: 'Grupo de microorganismos procariotas distintos de las bacterias, adaptados a condiciones extremas en ambientes marinos.',
      image: '/ecosystems/marine-archaea.jpg',
      connections: [401, 402, 403]
    },
    
    // Subtemas de Ficología
    {
      id: 501,
      name: 'Macroalgas',
      category: 'Ficología',
      size: 'medium',
      parentId: 5,
      description: 'Algas multicelulares visibles a simple vista que crecen principalmente en zonas costeras.',
      image: '/ecosystems/macroalgae.jpg',
      connections: [502, 505, 302]
    },
    {
      id: 502,
      name: 'Microalgas',
      category: 'Ficología',
      size: 'medium',
      parentId: 5,
      description: 'Algas microscópicas unicelulares o coloniales que forman parte del plancton o viven adheridas a sustratos.',
      image: '/ecosystems/microalgae.jpg',
      connections: [501, 503, 504, 601]
    },
    {
      id: 503,
      name: 'Diatomeas',
      category: 'Ficología',
      size: 'medium',
      parentId: 5,
      description: 'Microalgas unicelulares con pared celular de sílice, responsables de gran parte de la productividad primaria oceánica.',
      image: '/ecosystems/diatoms.jpg',
      connections: [502, 504, 601]
    },
    {
      id: 504,
      name: 'Dinoflagelados',
      category: 'Ficología',
      size: 'medium',
      parentId: 5,
      description: 'Microorganismos flagelados, muchos fotosintéticos, algunos responsables de mareas rojas y bioluminiscencia.',
      image: '/ecosystems/dinoflagellates.jpg',
      connections: [502, 503, 702]
    },
    {
      id: 505,
      name: 'Algas Coralinas',
      category: 'Ficología',
      size: 'medium',
      parentId: 5,
      description: 'Algas rojas calcificadas que contribuyen significativamente a la formación y cementación de arrecifes de coral.',
      image: '/ecosystems/coralline-algae.jpg',
      connections: [501, 301]
    },
    
    // Subtemas de Oceanografía Biológica
    {
      id: 601,
      name: 'Productividad Primaria',
      category: 'Oceanografía',
      size: 'medium',
      parentId: 6,
      description: 'Síntesis de compuestos orgánicos a partir de CO₂, principalmente por fitoplancton, base de las cadenas alimentarias marinas.',
      image: '/ecosystems/primary-productivity.jpg',
      connections: [502, 503, 602, 603]
    },
    {
      id: 602,
      name: 'Ciclos Biogeoquímicos',
      category: 'Oceanografía',
      size: 'medium',
      parentId: 6,
      description: 'Intercambio de elementos químicos entre organismos marinos y su ambiente, fundamentales para el funcionamiento ecosistémico.',
      image: '/ecosystems/biogeochemical-cycles.jpg',
      connections: [403, 601, 603]
    },
    {
      id: 603,
      name: 'Zonas Oceánicas',
      category: 'Oceanografía',
      size: 'medium',
      parentId: 6,
      description: 'Clasificación vertical y horizontal de los océanos según características físicas, químicas y biológicas.',
      image: '/ecosystems/ocean-zones.jpg',
      connections: [302, 303, 601, 602]
    },
    {
      id: 604,
      name: 'Corrientes y Biodiversidad',
      category: 'Oceanografía',
      size: 'medium',
      parentId: 6,
      description: 'Influencia de las corrientes oceánicas en la distribución y conectividad de especies marinas.',
      image: '/ecosystems/currents-biodiversity.jpg',
      connections: [102, 601, 603]
    },
    
    // Subtemas de Procesos Simbióticos
    {
      id: 701,
      name: 'Holobiontes Marinos',
      category: 'Simbiosis',
      size: 'medium',
      parentId: 7,
      description: 'Unidades ecológicas formadas por un organismo hospedador y todos sus microorganismos asociados que funcionan como un sistema.',
      image: '/ecosystems/holobionts.jpg',
      connections: [401, 702, 703]
    },
    {
      id: 702,
      name: 'Simbiosis Coral-Alga',
      category: 'Simbiosis',
      size: 'medium',
      parentId: 7,
      description: 'Relación mutualista entre corales y algas zooxantelas, fundamental para la formación de arrecifes de coral.',
      image: '/ecosystems/coral-algae-symbiosis.jpg',
      connections: [301, 504, 701]
    },
    {
      id: 703,
      name: 'Micorrizas Marinas',
      category: 'Simbiosis',
      size: 'medium',
      parentId: 7,
      description: 'Asociaciones simbióticas entre hongos y raíces de plantas marinas como pastos marinos, que facilitan la absorción de nutrientes.',
      image: '/ecosystems/marine-mycorrhizae.jpg',
      connections: [305, 701, 704]
    },
    {
      id: 704,
      name: 'Endosimbiosis',
      category: 'Simbiosis',
      size: 'medium',
      parentId: 7,
      description: 'Proceso evolutivo donde un organismo vive dentro de otro, como el origen de organelos en células eucariotas a partir de bacterias.',
      image: '/ecosystems/endosymbiosis.jpg',
      connections: [403, 701, 703]
    },
    
    // Subtemas de Conservación Marina
    {
      id: 801,
      name: 'Áreas Marinas Protegidas',
      category: 'Conservación',
      size: 'medium',
      parentId: 8,
      description: 'Espacios marinos designados para la conservación de biodiversidad y recursos naturales con diferentes niveles de protección.',
      image: '/ecosystems/mpas.jpg',
      connections: [802, 803, 804]
    },
    {
      id: 802,
      name: 'Restauración de Ecosistemas',
      category: 'Conservación',
      size: 'medium',
      parentId: 8,
      description: 'Intervenciones activas para ayudar a la recuperación de ecosistemas marinos degradados, como arrecifes o manglares.',
      image: '/ecosystems/restoration.jpg',
      connections: [301, 304, 801, 803]
    },
    {
      id: 803,
      name: 'Especies Amenazadas',
      category: 'Conservación',
      size: 'medium',
      parentId: 8,
      description: 'Especies marinas en riesgo de extinción por presiones antropogénicas como sobrepesca, contaminación o cambio climático.',
      image: '/ecosystems/threatened-species.jpg',
      connections: [801, 802, 804]
    },
    {
      id: 804,
      name: 'Impactos Antropogénicos',
      category: 'Conservación',
      size: 'medium',
      parentId: 8,
      description: 'Efectos de las actividades humanas sobre ecosistemas marinos, como contaminación, sobrepesca o cambio climático.',
      image: '/ecosystems/anthropogenic-impacts.jpg',
      connections: [801, 803]
    },
    // Subtemas de Análisis Estadístico
{
  id: 901,
  name: 'Análisis de Ordenación',
  category: 'Métodos',
  size: 'medium',
  parentId: 9,
  description: 'Técnicas para reducir dimensionalidad y visualizar patrones en datos ecológicos multivariados (PCA, PCoA, RDA, CCA).',
  image: '/ecosystems/ordination.jpg',
  connections: [902, 903, 904]
},
{
  id: 902,
  name: 'Análisis de Varianza',
  category: 'Métodos',
  size: 'medium',
  parentId: 9,
  description: 'Métodos para comparar medias y varianzas entre grupos (ANOVA, ANCOVA, MANOVA) en estudios de biodiversidad y ecología.',
  image: '/ecosystems/variance-analysis.jpg',
  connections: [901, 903, 905]
},
{
  id: 903,
  name: 'Modelos Aditivos Generalizados',
  category: 'Métodos',
  size: 'medium',
  parentId: 9,
  description: 'Extensiones no paramétricas de GLM que permiten relaciones no lineales entre variables respuesta y predictores (GAMs).',
  image: '/ecosystems/gam-models.jpg',
  connections: [901, 902]
},
{
  id: 904,
  name: 'Análisis de Conglomerados',
  category: 'Métodos',
  size: 'medium',
  parentId: 9,
  description: 'Técnicas para agrupar objetos similares en clusters basados en medidas de similitud o distancia.',
  image: '/ecosystems/cluster-analysis.jpg',
  connections: [901, 905]
},
{
  id: 905,
  name: 'Análisis Basados en Distancia',
  category: 'Métodos',
  size: 'medium',
  parentId: 9,
  description: 'Métodos que utilizan matrices de distancia o disimilitud (db-RDA, PERMANOVA) para datos ecológicos complejos.',
  image: '/ecosystems/distance-based.jpg',
  connections: [901, 902, 904]
},

// Subtemas de Metodologías de Muestreo
{
  id: 1001,
  name: 'Muestreo Bentónico',
  category: 'Métodos',
  size: 'medium',
  parentId: 10,
  description: 'Técnicas para recolectar muestras de organismos y sedimentos del fondo marino, desde la zona intermareal hasta el océano profundo.',
  image: '/ecosystems/benthic-sampling.jpg',
  connections: [1002, 1003, 302] // Conectado con Ecosistemas Bentónicos
},
{
  id: 1002,
  name: 'Muestreo Planctónico',
  category: 'Métodos',
  size: 'medium',
  parentId: 10,
  description: 'Métodos para recolectar organismos microscópicos suspendidos en la columna de agua, como redes de plancton y botellas Niskin.',
  image: '/ecosystems/plankton-sampling.jpg',
  connections: [1001, 1003, 303] // Conectado con Ecosistemas Pelágicos
},

{
  id: 1003,
  name: 'Censos Visuales',
  category: 'Métodos',
  size: 'medium',
  parentId: 10,
  description: 'Técnicas observacionales no destructivas como transectos visuales, cuadrantes fotográficos y video-transectos submarios.',
  image: '/ecosystems/visual-census.jpg',
  connections: [1001, 1004, 301] // Conectado con Arrecifes de Coral
},
{
  id: 1004,
  name: 'Métodos Moleculares',
  category: 'Métodos',
  size: 'medium',
  parentId: 10,
  description: 'Técnicas de ADN ambiental (eDNA), metabarcoding y otras aproximaciones moleculares para el estudio de la biodiversidad marina.',
  image: '/ecosystems/molecular-methods.jpg',
  connections: [1002, 1003, 401] // Conectado con Microbiomas Marinos
},
  ];
  
  // Colores para las categorías
  const categoryColors = {
    'Conceptos': '#2a9d8f',
    'Campos': '#8338ec',
    'Ecosistemas': '#219ebc',
    'Biodiversidad': '#2a9d8f',
    'Ecología': '#4361ee',
    'Microbiología': '#fb8500',
    'Ficología': '#38b000',
    'Oceanografía': '#3a86ff',
    'Procesos': '#4361ee',
    'Simbiosis': '#ff9f1c',
    'Aplicaciones': '#ef476f',
    'Conservación': '#ef476f',
    'Métodos': '#ffa500'
  };
  
  // Efecto para inicializar la red
  useEffect(() => {
    if (!networkRef.current) return;
    
    const positionNodes = () => {
      const container = networkRef.current;
      if (!container) return;
      
      const width = container.clientWidth;
      const height = container.clientHeight;
      
      // Crear SVG para las líneas si no existe
      let svgElement = container.querySelector('svg.connection-lines') as SVGSVGElement | null;
      if (!svgElement) {
        svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svgElement.classList.add('connection-lines');
        svgElement.setAttribute('width', '100%');
        svgElement.setAttribute('height', '100%');
        svgElement.style.position = 'absolute';
        svgElement.style.top = '0';
        svgElement.style.left = '0';
        svgElement.style.zIndex = '1';
        svgElement.style.pointerEvents = 'none';
        container.appendChild(svgElement);
      }
      
      // Limpiar el SVG
      while (svgElement.firstChild) {
        svgElement.removeChild(svgElement.firstChild);
      }
      
      // Filtrar los temas principales
      const mainTopics = topics.filter(isMainTopic);
      
      // Posicionar los temas principales en círculo
      const mainTopicsCount = mainTopics.length;
      mainTopics.forEach((topic, index) => {
        const nodeRef = nodeRefs.current[topic.id];
        if (!nodeRef) return;
        
        // Calcular posición en círculo para temas principales
        const angleStep = (2 * Math.PI) / mainTopicsCount;
        const angle = index * angleStep;
        const radius = Math.min(width, height) * 0.35;
        
        const x = width / 2 + Math.cos(angle) * radius;
        const y = height / 2 + Math.sin(angle) * radius;
        
        // Aplicar posición
        nodeRef.style.left = `${x - (topic.size === 'large' ? 70 : 50)}px`;
        nodeRef.style.top = `${y - (topic.size === 'large' ? 70 : 50)}px`;
        
        // Guardar coordenadas para dibujar líneas después
        nodeRef.dataset.centerX = String(x);
        nodeRef.dataset.centerY = String(y);
      });
      
      // Posicionar los subtemas alrededor de su tema principal si está expandido
      if (expandedMainTopic !== null) {
        const mainTopic = mainTopics.find(t => t.id === expandedMainTopic);
        if (mainTopic) {
          const subtopics = topics.filter(t => !isMainTopic(t) && (t as SubTopic).parentId === expandedMainTopic);
          const mainNodeRef = nodeRefs.current[mainTopic.id];
          
          if (mainNodeRef && subtopics.length > 0) {
            const mainX = parseFloat(mainNodeRef.dataset.centerX || '0');
            const mainY = parseFloat(mainNodeRef.dataset.centerY || '0');
            const subRadius = Math.min(width, height) * 0.15;
            
            subtopics.forEach((subtopic, idx) => {
              const nodeRef = nodeRefs.current[subtopic.id];
              if (!nodeRef) return;
              
              // Calcular posición en círculo para subtemas alrededor del tema principal
              const subAngleStep = (2 * Math.PI) / subtopics.length;
              const subAngle = idx * subAngleStep;
              
              const x = mainX + Math.cos(subAngle) * subRadius;
              const y = mainY + Math.sin(subAngle) * subRadius;
              
              // Aplicar posición con animación
              nodeRef.style.opacity = '1';
              nodeRef.style.left = `${x - (subtopic.size === 'medium' ? 50 : 40)}px`;
              nodeRef.style.top = `${y - (subtopic.size === 'medium' ? 50 : 40)}px`;
              
              // Guardar coordenadas para dibujar líneas después
              nodeRef.dataset.centerX = String(x);
              nodeRef.dataset.centerY = String(y);
            });
          }
        }
      } else {
        // Ocultar subtemas si no hay tema principal expandido
        topics.forEach(topic => {
          if (!isMainTopic(topic)) {
            const nodeRef = nodeRefs.current[topic.id];
            if (nodeRef) {
              nodeRef.style.opacity = '0';
            }
          }
        });
      }
      
      // Dibujar conexiones entre temas principales
      if (svgElement) {
        drawConnections(svgElement);
      }
    };
    
    // Dibujar conexiones entre nodos
    const drawConnections = (svg: SVGSVGElement) => {
      // Dibujar conexiones entre temas principales
      const mainTopics = topics.filter(isMainTopic);
      
      mainTopics.forEach(topic => {
        if (isMainTopic(topic)) {
          topic.connections.forEach(connectedId => {
            // Dibujar cada conexión solo una vez
            if (topic.id < connectedId) {
              const sourceNode = nodeRefs.current[topic.id];
              const targetNode = nodeRefs.current[connectedId];
              
              if (sourceNode && targetNode) {
                const sourceX = parseFloat(sourceNode.dataset.centerX || '0');
                const sourceY = parseFloat(sourceNode.dataset.centerY || '0');
                const targetX = parseFloat(targetNode.dataset.centerX || '0');
                const targetY = parseFloat(targetNode.dataset.centerY || '0');
                
                // Crear línea SVG
                const line = document.createElementNS('http://www.w3.org/2000/svg', 'line') as SVGLineElement;
                line.setAttribute('x1', String(sourceX));
                line.setAttribute('y1', String(sourceY));
                line.setAttribute('x2', String(targetX));
                line.setAttribute('y2', String(targetY));
                line.setAttribute('stroke', '#ffffff');
                line.setAttribute('stroke-width', '1.5');
                line.setAttribute('stroke-opacity', '0.4');
                line.setAttribute('data-source', String(topic.id));
                line.setAttribute('data-target', String(connectedId));
                
                svg.appendChild(line);
              }
            }
          });
        }
      });
      
      // Dibujar conexiones entre subtemas y su tema principal si hay un tema expandido
      if (expandedMainTopic !== null) {
        const subtopics = topics.filter(t => !isMainTopic(t) && (t as SubTopic).parentId === expandedMainTopic);
        const mainNodeRef = nodeRefs.current[expandedMainTopic];
        
        if (mainNodeRef && subtopics.length > 0) {
          subtopics.forEach(subtopic => {
            const nodeRef = nodeRefs.current[subtopic.id];
            
            if (nodeRef) {
              const mainX = parseFloat(mainNodeRef.dataset.centerX || '0');
              const mainY = parseFloat(mainNodeRef.dataset.centerY || '0');
              const subX = parseFloat(nodeRef.dataset.centerX || '0');
              const subY = parseFloat(nodeRef.dataset.centerY || '0');
              
              // Crear línea SVG para conexión tema-subtema
              const line = document.createElementNS('http://www.w3.org/2000/svg', 'line') as SVGLineElement;
              line.setAttribute('x1', String(mainX));
              line.setAttribute('y1', String(mainY));
              line.setAttribute('x2', String(subX));
              line.setAttribute('y2', String(subY));
              line.setAttribute('stroke', categoryColors[(subtopic as SubTopic).category as keyof typeof categoryColors] || '#ffffff');
              line.setAttribute('stroke-width', '2');
              line.setAttribute('stroke-opacity', '0.7');
              line.setAttribute('data-type', 'parent-child');
              
              svg.appendChild(line);
              
              // Dibujar conexiones entre subtemas
              (subtopic as SubTopic).connections.forEach(connId => {
                if (subtopic.id < connId) {
                  const targetNode = nodeRefs.current[connId];
                  
                  if (targetNode) {
                    const targetX = parseFloat(targetNode.dataset.centerX || '0');
                    const targetY = parseFloat(targetNode.dataset.centerY || '0');
                    
                    // Crear línea SVG para conexión subtema-subtema
                    const subLine = document.createElementNS('http://www.w3.org/2000/svg', 'line') as SVGLineElement;
                    subLine.setAttribute('x1', String(subX));
                    subLine.setAttribute('y1', String(subY));
                    subLine.setAttribute('x2', String(targetX));
                    subLine.setAttribute('y2', String(targetY));
                    subLine.setAttribute('stroke', '#ffffff');
                    subLine.setAttribute('stroke-width', '1');
                    subLine.setAttribute('stroke-opacity', '0.5');
                    subLine.setAttribute('stroke-dasharray', '3,3');
                    subLine.setAttribute('data-source', String(subtopic.id));
                    subLine.setAttribute('data-target', String(connId));
                    
                    svg.appendChild(subLine);
                  }
                }
              });
            }
          });
        }
      }
    };
    
    // Inicializar la red
    positionNodes();
    
    // Actualizar al cambiar el tamaño de la ventana
    window.addEventListener('resize', positionNodes);
    
    return () => {
      window.removeEventListener('resize', positionNodes);
    };
  }, [topics, expandedMainTopic]);
  
  // Manejar clic en tema principal
  const handleMainTopicClick = (topic: MainTopic) => {
    if (expandedMainTopic === topic.id) {
      // Si ya está expandido, lo contraemos
      setExpandedMainTopic(null);
      setSelectedTopic(null);
      setIsInfoVisible(false);
    } else {
      // Si no está expandido, lo expandimos
      setExpandedMainTopic(topic.id);
      setSelectedTopic(topic);
      setIsInfoVisible(true);
    }
    
    // Reiniciar zoom
    setZoomedNode(null);
  };
  
  // Manejar clic en subtema
  const handleSubtopicClick = (topic: SubTopic) => {
    setSelectedTopic(topic);
    setZoomedNode(topic.id);
    setIsInfoVisible(true);

    // Navegar a la página de distribución de especies cuando se hace clic en Biogeografía Marina
    if (topic.id === 102) {
      router.push('/biological/species-distribution');
    }
  };
  
  return (
    <div className="relative w-full h-screen bg-gradient-to-b from-blue-900 to-blue-950 overflow-hidden">
      {/* Botón de reset */}
      {zoomedNode !== null && (
        <button 
          onClick={() => setZoomedNode(null)}
          className="absolute top-4 left-4 z-30 bg-white bg-opacity-20 backdrop-blur-sm text-white px-3 py-1 rounded-full hover:bg-opacity-30 transition-all"
        >
          Ver Todos los Subtemas
        </button>
      )}
      
      {/* Red de tópicos */}
      <div ref={networkRef} className="relative w-full h-full">
        {/* Renderizar nodos */}
        {topics.map((topic) => {
          const isMainNode = isMainTopic(topic);
          const nodeColor = categoryColors[topic.category as keyof typeof categoryColors] || '#219ebc';
          const isSubtopic = !isMainNode;
          const shouldRenderSubtopic = isSubtopic && (topic as SubTopic).parentId === expandedMainTopic;
          
          if (isMainNode || shouldRenderSubtopic) {
            return (
              <motion.div
                key={topic.id}
                ref={(el: HTMLDivElement | null) => { nodeRefs.current[topic.id] = el; }}
                className={`absolute network-node cursor-pointer rounded-full flex items-center justify-center shadow-lg transition-all duration-300 z-10
                  ${zoomedNode === topic.id ? 'ring-2 ring-white' : ''}
                  ${isMainNode ? 'text-lg font-semibold' : 'text-sm font-medium'}`}
                style={{ 
                  backgroundColor: nodeColor,
                  width: isMainNode ? '140px' : (topic.size === 'medium' ? '100px' : '80px'),
                  height: isMainNode ? '140px' : (topic.size === 'medium' ? '100px' : '80px'),
                  opacity: isMainNode || shouldRenderSubtopic ? 1 : 0,
                  zIndex: zoomedNode === topic.id ? 20 : 10,
                }}
                onClick={() => isMainNode ? handleMainTopicClick(topic as MainTopic) : handleSubtopicClick(topic as SubTopic)}
                whileHover={{ 
                  scale: 1.1, 
                  boxShadow: '0 0 15px rgba(255,255,255,0.3)'
                }}
              >
                <span className="text-white text-center px-2">
                  {topic.name}
                </span>
              </motion.div>
            );
          }
          return null;
        })}
      </div>
      
      {/* Mostrar información del nodo seleccionado */}
      <AnimatePresence>
        {isInfoVisible && selectedTopic && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-4 left-4 right-4 bg-white rounded-lg shadow-xl p-6 z-50 max-h-[50vh] overflow-auto"
            style={{ maxWidth: '600px', margin: '0 auto' }}
          >
            <button 
              onClick={() => setIsInfoVisible(false)}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <h2 className="text-2xl font-bold text-ocean-dark mb-2">{selectedTopic.name}</h2>
            <div className="text-sm text-ocean mb-4">{selectedTopic.category}</div>
            
            <p className="mb-4 text-gray-700">{selectedTopic.description}</p>
            
            {/* Enlaces adicionales para nodos de biodiversidad */}
            {(selectedTopic.id === 105 || selectedTopic.id === 106 || selectedTopic.id === 107 || selectedTopic.id === 1) && (
              <div className="mt-4 bg-ocean-light bg-opacity-20 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-ocean-dark mb-2">Herramientas de Análisis</h3>
                <p className="mb-3 text-sm">
                  Explora nuestras herramientas para análisis de biodiversidad marina:
                </p>
                <Link 
                  href="/biological/biodiversity" 
                  className="inline-block px-4 py-2 bg-ocean text-white rounded-md hover:bg-ocean-dark transition"
                >
                  Acceder al módulo de análisis de diversidad
                </Link>
              </div>
            )}
            
            {/* Mostrar subtemas si es un tema principal */}
            {isMainTopic(selectedTopic) && selectedTopic.subtopics.length > 0 && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-ocean-dark mb-2">Subtemas relacionados:</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {selectedTopic.subtopics.map(id => {
                    const subtopic = topics.find(t => t.id === id);
                    return subtopic ? (
                      <li key={id} className="text-ocean hover:text-ocean-dark">
                        <button 
                          onClick={() => {
                            setSelectedTopic(subtopic);
                            // No cerramos el panel de información
                          }}
                          className="text-left hover:underline"
                        >
                          {subtopic.name}
                        </button>
                      </li>
                    ) : null;
                  })}
                </ul>
              </div>
            )}
            
            {/* Mostrar conexiones */}
            {selectedTopic.connections.length > 0 && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-ocean-dark mb-2">Conectado con:</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedTopic.connections.map(id => {
                    const connectedTopic = topics.find(t => t.id === id);
                    return connectedTopic ? (
                      <button
                        key={id}
                        onClick={() => {
                          setSelectedTopic(connectedTopic);
                          // No cerramos el panel de información
                        }}
                        className="px-3 py-1 bg-gray-100 rounded-full text-sm text-ocean-dark hover:bg-gray-200"
                      >
                        {connectedTopic.name}
                      </button>
                    ) : null;
                  })}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Leyenda de categorías */}
      <div className="absolute bottom-6 right-6 bg-black bg-opacity-20 backdrop-blur-sm rounded-lg p-4 z-20">
        <h3 className="text-white text-sm font-medium mb-2">Categorías</h3>
        <div className="flex flex-wrap gap-x-4 gap-y-2">
          {Object.entries(categoryColors).map(([category, color]) => (
            <div key={category} className="flex items-center">
              <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: color }}></div>
              <span className="text-white text-xs">{category}</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Instrucciones */}
      <div className="absolute top-6 left-6 bg-black bg-opacity-20 backdrop-blur-sm rounded-lg p-4 z-20 max-w-xs">
        <h3 className="text-white text-sm font-medium mb-2">Cómo Navegar</h3>
        <ul className="text-white text-xs space-y-1">
          <li>• Haz clic en un tema principal para ver sus subtemas</li>
          <li>• Haz clic en un subtema para obtener más información</li>
          <li>• Utiliza los botones del panel para navegar entre temas relacionados</li>
        </ul>
      </div>
    </div>
  );
};

export default MarineHierarchicalNetwork;