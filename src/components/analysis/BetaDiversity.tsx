import React, { useState } from 'react';
import Image from 'next/image';

interface BetaDiversityProps {
  ecosystemType?: string;
}

const BetaDiversity: React.FC<BetaDiversityProps> = ({ 
  ecosystemType = 'intermareal' 
}) => {
  const [selectedMethod, setSelectedMethod] = useState<string>('whittaker');
  const [selectedCase, setSelectedCase] = useState<string>('amp');

  // Métodos de diversidad beta
  const betaMethods = [
    { id: 'whittaker', name: 'Whittaker' },
    { id: 'jaccard', name: 'Jaccard' },
    { id: 'sorensen', name: 'Sørensen' }
  ];

  // Casos de estudio
  const studyCases = [
    { id: 'amp', name: 'Áreas Marinas Protegidas' },
    { id: 'temporal', name: 'Cambios Temporales' }
  ];

  // Descripción de los métodos
  const methodDescriptions = {
    'whittaker': {
      description: 'El índice de Whittaker (βw) compara la diversidad de especies entre ecosistemas en relación con la diversidad de especies en los ecosistemas individuales.',
      formula: 'βw = (S/α) - 1',
      interpretation: 'Donde S es el número total de especies y α es el promedio de especies por sitio. Valores más altos indican mayor diferencia entre comunidades.',
      applications: [
        'Evaluación de la efectividad de AMPs comparando la composición de especies dentro y fuera de las áreas protegidas',
        'Monitoreo de cambios en comunidades marinas a lo largo de gradientes ambientales',
        'Identificación de zonas de transición entre ecosistemas'
      ]
    },
    'jaccard': {
      description: 'El índice de Jaccard (Cj) mide la similitud entre conjuntos de especies, calculando la proporción de especies compartidas sobre el total de especies presentes.',
      formula: 'Cj = j / (a + b - j)',
      interpretation: 'Donde j es el número de especies compartidas, a y b son el número de especies en cada sitio. Varía de 0 (sin especies compartidas) a 1 (mismas especies).',
      applications: [
        'Comparación de la composición de especies entre diferentes hábitats marinos',
        'Evaluación del impacto de actividades pesqueras en la estructura de comunidades',
        'Análisis de conectividad entre poblaciones marinas'
      ]
    },
    'sorensen': {
      description: 'El índice de Sørensen (Cs) es similar al de Jaccard pero da más peso a las especies que se encuentran en ambos sitios que a las que son exclusivas.',
      formula: 'Cs = 2j / (a + b)',
      interpretation: 'Donde j es el número de especies compartidas, a y b son el número de especies en cada sitio. El factor 2 da más peso a las coincidencias.',
      applications: [
        'Evaluación de la similitud entre comunidades bentónicas',
        'Monitoreo de cambios estacionales en comunidades planctónicas',
        'Análisis de la recuperación de ecosistemas después de perturbaciones'
      ]
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-ocean-dark mb-6">Diversidad Beta</h2>
      <p className="mb-4 text-gray-700">
        La diversidad beta mide el cambio en la composición de especies entre diferentes comunidades o a lo largo de gradientes ambientales.
        Es fundamental para entender la heterogeneidad espacial y temporal de los ecosistemas marinos, siendo especialmente útil en:
      </p>
      <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
        <li>Evaluación de la efectividad de Áreas Marinas Protegidas (AMPs)</li>
        <li>Monitoreo de impactos de la pesca en comunidades marinas</li>
        <li>Análisis de cambios temporales en ecosistemas</li>
        <li>Identificación de zonas de transición ecológica</li>
      </ul>

      <div className="mb-8 bg-gray-100 p-4 rounded-lg">
        <div className="flex flex-wrap gap-2 mb-4">
          {betaMethods.map(method => (
            <button
              key={method.id}
              onClick={() => setSelectedMethod(method.id)}
              className={`px-3 py-1 rounded ${
                selectedMethod === method.id 
                  ? 'bg-ocean text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {method.name}
            </button>
          ))}
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-ocean mb-4">
            Índice de {betaMethods.find(m => m.id === selectedMethod)?.name}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-ocean-dark mb-2">Descripción</h4>
              <p className="text-sm text-gray-600">
                {methodDescriptions[selectedMethod as keyof typeof methodDescriptions].description}
              </p>
              <div className="mt-4 bg-white p-3 rounded">
                <p className="text-center font-mono">
                  {methodDescriptions[selectedMethod as keyof typeof methodDescriptions].formula}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {methodDescriptions[selectedMethod as keyof typeof methodDescriptions].interpretation}
                </p>
              </div>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold text-ocean-dark mb-2">Aplicaciones en Ecología Marina</h4>
              <ul className="list-disc pl-4 text-sm text-gray-600 space-y-2">
                {methodDescriptions[selectedMethod as keyof typeof methodDescriptions].applications.map((app, index) => (
                  <li key={index}>{app}</li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="mb-6">
            <h4 className="font-semibold text-ocean-dark mb-4">Casos de Estudio</h4>
            <div className="flex flex-wrap gap-2 mb-4">
              {studyCases.map(case_ => (
                <button
                  key={case_.id}
                  onClick={() => setSelectedCase(case_.id)}
                  className={`px-3 py-1 rounded ${
                    selectedCase === case_.id 
                      ? 'bg-ocean text-white' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {case_.name}
                </button>
              ))}
            </div>
            
            {selectedCase === 'amp' && (
              <div className="space-y-4">
                <div className="relative w-full h-[600px]">
                  <Image 
                    src={`/images/diversidad/beta_diversity_${selectedMethod}_amp.png`}
                    alt={`Comparación de diversidad beta (${selectedMethod}) en AMPs`}
                    fill
                    style={{ objectFit: "contain" }}
                    sizes="(max-width: 768px) 100vw, 80vw"
                    className="rounded-lg"
                  />
                </div>
                <p className="text-sm text-gray-600">
                  Comparación del índice de {betaMethods.find(m => m.id === selectedMethod)?.name} entre áreas marinas protegidas (AMPs) y zonas no protegidas.
                  Los boxplots muestran la distribución de valores para cada tipo de comparación, revelando patrones
                  de similitud/disimilitud entre diferentes regímenes de protección. Valores más altos indican mayor diferencia en la composición de especies.
                </p>
              </div>
            )}
            
            {selectedCase === 'temporal' && (
              <div className="space-y-4">
                <div className="relative w-full h-[600px]">
                  <Image 
                    src={`/images/diversidad/beta_diversity_${selectedMethod}_temporal.png`}
                    alt={`Cambios temporales en diversidad beta (${selectedMethod})`}
                    fill
                    style={{ objectFit: "contain" }}
                    sizes="(max-width: 768px) 100vw, 80vw"
                    className="rounded-lg"
                  />
                </div>
                <p className="text-sm text-gray-600">
                  Análisis temporal de los cambios en el índice de {betaMethods.find(m => m.id === selectedMethod)?.name} a lo largo de cinco años.
                  Las líneas muestran patrones estacionales y tendencias a largo plazo en la composición de comunidades marinas,
                  permitiendo identificar ciclos naturales y posibles impactos de cambios ambientales.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="mt-6 bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-ocean-dark mb-2">Implementación en Python</h3>
        <div className="bg-gray-800 text-gray-200 p-4 rounded overflow-auto">
          <pre className="text-sm">
{`import numpy as np
from scipy.spatial.distance import pdist, squareform

def calcular_indices_beta(datos_especies):
    """
    Calcula índices de diversidad beta para datos de presencia/ausencia.
    
    Args:
        datos_especies: matriz booleana donde las filas son sitios y las columnas especies
    Returns:
        dict con matrices de índices beta (Whittaker, Jaccard, Sørensen)
    """
    n_sitios = datos_especies.shape[0]
    whittaker = np.zeros((n_sitios, n_sitios))
    jaccard = np.zeros((n_sitios, n_sitios))
    sorensen = np.zeros((n_sitios, n_sitios))
    
    for i in range(n_sitios):
        for j in range(i+1, n_sitios):
            # Especies en cada sitio
            sp1 = datos_especies[i]
            sp2 = datos_especies[j]
            
            # Calcular componentes
            shared = np.sum(sp1 & sp2)  # Especies compartidas
            total_i = np.sum(sp1)       # Especies en sitio 1
            total_j = np.sum(sp2)       # Especies en sitio 2
            
            # Calcular índices
            whittaker[i,j] = whittaker[j,i] = (total_i + total_j - 2*shared) / ((total_i + total_j)/2)
            jaccard[i,j] = jaccard[j,i] = shared / (total_i + total_j - shared)
            sorensen[i,j] = sorensen[j,i] = 2*shared / (total_i + total_j)
    
    return {
        'whittaker': whittaker,
        'jaccard': jaccard,
        'sorensen': sorensen
    }`}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default BetaDiversity; 