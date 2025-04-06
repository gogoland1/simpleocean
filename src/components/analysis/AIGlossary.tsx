import React, { useState } from 'react';

// Definición de tipos
interface GlossaryTerm {
  id: number;
  term: string;
  category: string;
  definition: string;
  examples: string[];
}

interface CategoryType {
  id: string;
  name: string;
}

// Componente principal
const AIGlossary: React.FC = () => {
  // Estados
  const [selectedTerm, setSelectedTerm] = useState<GlossaryTerm | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Definición de categorías
  const categories: CategoryType[] = [
    { id: 'all', name: 'Todas las Categorías' },
    { id: 'fundamentals', name: 'Conceptos Fundamentales' },
    { id: 'applications', name: 'Aplicaciones en Oceanografía' },
    { id: 'tools', name: 'Herramientas y Tecnologías' },
    { id: 'data', name: 'Gestión y Análisis de Datos' },
    { id: 'ethics', name: 'Ética y Gobernanza' },
    { id: 'emerging', name: 'Tendencias Emergentes' }
  ];

  // Definición del glosario
  const glossaryTerms: GlossaryTerm[] = [
    {
      id: 1,
      term: 'Inteligencia Artificial (IA)',
      category: 'fundamentals',
      definition: 'Tecnología que permite a las máquinas realizar tareas que típicamente requieren inteligencia humana, como el reconocimiento de patrones, el aprendizaje y la toma de decisiones.',
      examples: [
        'Sistemas de navegación autónoma para vehículos submarinos',
        'Análisis automatizado de imágenes satelitales oceánicas',
        'Predicción de patrones climáticos marinos'
      ]
    },
    {
      id: 2,
      term: 'Aprendizaje Automático (Machine Learning)',
      category: 'fundamentals',
      definition: 'Subcampo de la IA que permite a los sistemas aprender y mejorar a partir de la experiencia sin ser programados explícitamente. Fundamental para el análisis de datos oceánicos.',
      examples: [
        'Identificación de especies marinas en imágenes',
        'Predicción de mareas y corrientes',
        'Descubrimiento de nuevos patrones de migración marina'
      ]
    },
    {
      id: 3,
      term: 'Redes Neuronales',
      category: 'fundamentals',
      definition: 'Sistemas de procesamiento inspirados en el cerebro humano, utilizados para reconocimiento de patrones en datos oceánicos, como imágenes submarinas o señales acústicas.',
      examples: [
        'Análisis de imágenes submarinas para identificación de especies',
        'Procesamiento de datos satelitales para detectar floraciones de algas',
        'Predicción de series temporales oceánicas como temperatura o salinidad'
      ]
    },
    {
      id: 4,
      term: 'Procesamiento de Datos en Tiempo Real',
      category: 'data',
      definition: 'Capacidad de analizar y procesar datos mientras se recopilan, crucial para monitoreo oceánico continuo.',
      examples: [
        'Monitoreo de parámetros físico-químicos en boyas oceanográficas',
        'Análisis de flujos de datos de sensores submarinos',
        'Detección inmediata de anomalías en ecosistemas marinos'
      ]
    },
    {
      id: 5,
      term: 'Monitoreo Oceánico Autónomo',
      category: 'applications',
      definition: 'Sistemas basados en IA que pueden recopilar y analizar datos oceánicos de forma independiente, utilizando vehículos no tripulados y sensores.',
      examples: [
        'Vehículos autónomos submarinos (AUVs) para exploración',
        'Boyas inteligentes con capacidad de procesamiento',
        'Redes de sensores oceánicos con comunicación automática'
      ]
    },
    {
      id: 6,
      term: 'Análisis de Biodiversidad Marina',
      category: 'applications',
      definition: 'Uso de IA para identificar y clasificar especies marinas a través de imágenes o datos acústicos.',
      examples: [
        'Identificación automatizada de especies en imágenes submarinas',
        'Clasificación de vocalizaciones de mamíferos marinos',
        'Estimación de poblaciones mediante procesamiento de video'
      ]
    },
    {
      id: 7,
      term: 'Predicción Oceánica',
      category: 'applications',
      definition: 'Modelos de IA que pueden predecir cambios en las condiciones oceánicas, corrientes marinas y eventos climáticos.',
      examples: [
        'Predicción del fenómeno El Niño/La Niña',
        'Pronóstico de corrientes marinas para navegación',
        'Anticipación de cambios en temperatura superficial del mar'
      ]
    },
    {
      id: 8,
      term: 'Sistemas RAG (Retrieval-Augmented Generation)',
      category: 'tools',
      definition: 'Sistemas que combinan la recuperación de información específica de bases de datos con la generación de respuestas contextualizadas, utilizados para proporcionar información oceanográfica precisa.',
      examples: [
        'Asistentes de investigación para literatura científica marina',
        'Sistemas de soporte a decisiones basados en datos históricos',
        'Generación de informes automáticos con datos verificados'
      ]
    },
    {
      id: 9,
      term: 'Sensores Inteligentes',
      category: 'tools',
      definition: 'Dispositivos que utilizan IA para recopilar datos oceánicos de manera autónoma y adaptativa.',
      examples: [
        'Sensores de calidad de agua con procesamiento local',
        'Sistemas acústicos con detección automática de especies',
        'Boyas con capacidad de ajustar frecuencia de muestreo'
      ]
    },
    {
      id: 10,
      term: 'Big Data Oceánico',
      category: 'data',
      definition: 'Grandes conjuntos de datos marinos que requieren técnicas especiales de IA para su procesamiento y análisis.',
      examples: [
        'Datos satelitales de cobertura global',
        'Series temporales de observatorios submarinos',
        'Datos genómicos de biodiversidad marina'
      ]
    },
    {
      id: 11,
      term: 'IA Explicable (XAI)',
      category: 'ethics',
      definition: 'Sistemas de IA que pueden explicar sus decisiones, crucial para aplicaciones oceánicas críticas.',
      examples: [
        'Justificación de alertas de tsunamis',
        'Explicación de recomendaciones para gestión pesquera',
        'Transparencia en modelos de predicción climática'
      ]
    },
    {
      id: 12,
      term: 'Redes Neuromórficas',
      category: 'emerging',
      definition: 'Arquitecturas de IA inspiradas en el cerebro humano con eficiencia energética, ideales para aplicaciones marinas remotas.',
      examples: [
        'Procesamiento de señales acústicas submarinas en tiempo real',
        'Sistemas de navegación adaptativos para vehículos autónomos',
        'Monitoreo continuo de parámetros ambientales con bajo consumo'
      ]
    },
    {
      id: 13,
      term: 'Aprendizaje Profundo Oceánico',
      category: 'emerging',
      definition: 'Aplicaciones avanzadas de deep learning en investigación y gestión marina.',
      examples: [
        'Modelos complejos para predicción climática oceánica',
        'Análisis integral de ecosistemas marinos',
        'Reconocimiento avanzado de patrones en datos oceanográficos'
      ]
    },
    {
      id: 14,
      term: 'LSTM (Long Short-Term Memory)',
      category: 'tools',
      definition: 'Tipo de red neuronal especializada en procesar secuencias y series temporales, muy útil para datos oceanográficos.',
      examples: [
        'Predicción de variables oceánicas como temperatura y salinidad',
        'Modelado de fenómenos como El Niño y ciclones tropicales',
        'Detección de anomalías en series temporales oceanográficas'
      ]
    },
    {
      id: 15,
      term: 'Vehículos Autónomos Submarinos (AUV)',
      category: 'tools',
      definition: 'Robots submarinos equipados con IA para exploración y recopilación de datos.',
      examples: [
        'Mapeo de fondos marinos',
        'Monitoreo de ecosistemas profundos',
        'Inspección de infraestructuras submarinas'
      ]
    }
  ];

  // Filtrar términos según la categoría seleccionada y término de búsqueda
  const filteredTerms = glossaryTerms.filter(term => {
    const matchesCategory = selectedCategory === 'all' || term.category === selectedCategory;
    const matchesSearch = term.term.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Obtener el nombre de la categoría a partir del ID
  const getCategoryName = (categoryId: string): string => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : categoryId;
  };

  return (
    <div className="space-y-8">
      {/* Encabezado */}
      <div className="bg-ocean-dark p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-white">Diccionario de Alfabetización en IA para Profesionales Oceánicos</h2>
        <p className="mt-2 text-ocean-light">
          Una guía comprensiva de términos y conceptos de Inteligencia Artificial relevantes para ciencias marinas y oceanografía.
        </p>
      </div>
      
      {/* Búsqueda y filtros */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-1/2">
            <input
              type="text"
              placeholder="Buscar término..."
              className="w-full p-2 border border-gray-300 rounded"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="w-full md:w-1/2">
            <select
              className="w-full p-2 border border-gray-300 rounded"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      {/* Contenido principal */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Lista de términos */}
          <div className="w-full md:w-1/3 bg-gray-50 p-4 md:h-96 overflow-y-auto">
            <h3 className="text-sm font-medium text-gray-500 mb-3">Términos ({filteredTerms.length})</h3>
            <ul className="space-y-2">
              {filteredTerms.map(term => (
                <li key={term.id}>
                  <button
                    onClick={() => setSelectedTerm(term)}
                    className={`w-full text-left p-3 rounded transition-all ${
                      selectedTerm && selectedTerm.id === term.id
                        ? 'bg-ocean text-white'
                        : 'bg-white hover:bg-gray-100 text-gray-800'
                    }`}
                  >
                    {term.term}
                  </button>
                </li>
              ))}
            </ul>
            {filteredTerms.length === 0 && (
              <div className="text-center py-4 text-gray-500">
                No se encontraron términos con los criterios actuales.
              </div>
            )}
          </div>
          
          {/* Detalle del término */}
          <div className="w-full md:w-2/3 p-6 md:h-96 overflow-y-auto">
            {selectedTerm ? (
              <div>
                <h2 className="text-2xl font-bold text-ocean-dark mb-1">{selectedTerm.term}</h2>
                <div className="mb-4">
                  <span className="inline-block text-xs font-semibold bg-blue-100 text-blue-800 rounded-full px-3 py-1">
                    {getCategoryName(selectedTerm.category)}
                  </span>
                </div>
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Definición</h3>
                  <p className="text-gray-600">{selectedTerm.definition}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Ejemplos en Contexto Oceánico</h3>
                  <ul className="list-disc pl-5 space-y-1 text-gray-600">
                    {selectedTerm.examples.map((example, idx) => (
                      <li key={idx}>{example}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                <div className="text-center">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-gray-900">Selecciona un término</h3>
                  <p className="mt-1 text-sm text-gray-500">Elige un término del diccionario para ver su definición y ejemplos.</p>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Footer */}
        <div className="bg-gray-50 p-4 border-t border-gray-200 text-sm text-gray-600">
          <p>Basado en "Diccionario de Alfabetización en IA para Profesionales Oceánicos"</p>
          <p className="text-xs mt-1">Referencias: Satterthwaite, E., & Robbins, M. (2024). Artificial Intelligence Literacy for Ocean Professionals.</p>
        </div>
      </div>
    </div>
  );
};

export default AIGlossary;