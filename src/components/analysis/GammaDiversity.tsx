import React, { useState } from 'react';
import Image from 'next/image';

interface GammaDiversityProps {
  ecosystemType?: string;
}

const GammaDiversity: React.FC<GammaDiversityProps> = ({ 
  ecosystemType = 'intermareal' 
}) => {
  const [selectedAnalysis, setSelectedAnalysis] = useState<string>('rda');

  // Métodos de análisis multivariado
  const analysisTypes = [
    { id: 'rda', name: 'Análisis de Redundancia (RDA)' },
    { id: 'dbrda', name: 'RDA basado en distancias (db-RDA)' },
    { id: 'nmds', name: 'Escalamiento Multidimensional No-Métrico (NMDS)' },
  ];

  // Descripción de los métodos
  const analysisDescriptions = {
    'rda': 'El Análisis de Redundancia (RDA) es una técnica de ordenación que extiende la regresión múltiple al caso de múltiples variables de respuesta. Permite visualizar relaciones entre especies y variables ambientales.',
    'dbrda': 'El RDA basado en distancias (db-RDA) es una versión del RDA que utiliza matrices de distancia (como Bray-Curtis) para capturar relaciones no lineales entre comunidades y variables ambientales.',
    'nmds': 'El NMDS es una técnica de ordenación que representa las disimilitudes entre muestras en un espacio de baja dimensión, preservando las distancias originales.'
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-ocean-dark mb-6">Diversidad Gamma y Análisis Multivariado</h2>
      <p className="mb-4 text-gray-700">
        La diversidad gamma representa la diversidad total de un conjunto de hábitats o comunidades en una región geográfica.
        El análisis multivariado nos permite entender las relaciones entre especies, comunidades y variables ambientales.
      </p>

      <div className="mb-4 bg-gray-100 p-4 rounded-lg">
        <div className="flex flex-wrap gap-2 mb-4">
          {analysisTypes.map(analysis => (
            <button
              key={analysis.id}
              onClick={() => setSelectedAnalysis(analysis.id)}
              className={`px-3 py-1 rounded ${
                selectedAnalysis === analysis.id 
                  ? 'bg-ocean text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {analysis.name}
            </button>
          ))}
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-ocean mb-4">
            {analysisTypes.find(a => a.id === selectedAnalysis)?.name}
          </h3>
          
          {selectedAnalysis === 'rda' && (
            <div className="flex flex-col items-center">
              <div className="relative w-full h-64 md:h-96">
                <Image 
                  src="/images/diversidad/comparacion_ordenacion.png"
                  alt="Análisis de Redundancia (RDA)"
                  fill
                  style={{ objectFit: "contain" }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="rounded-lg"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    if (target.src !== "/images/placeholder.png") {
                      target.src = "/images/placeholder.png";
                    }
                  }}
                />
              </div>
              <p className="mt-2 text-center text-sm text-gray-500">
                Análisis de Redundancia mostrando relaciones entre especies (azul) y variables ambientales (rojo)
              </p>
            </div>
          )}
          
          {selectedAnalysis === 'dbrda' && (
            <div className="flex flex-col items-center">
              <div className="relative w-full h-64 md:h-96">
                <Image 
                  src="/images/diversidad/dbrda_peces.png"
                  alt="Análisis de Redundancia basado en distancias (db-RDA)"
                  fill
                  style={{ objectFit: "contain" }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="rounded-lg"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    if (target.src !== "/images/placeholder.png") {
                      target.src = "/images/placeholder.png";
                    }
                  }}
                />
              </div>
              <p className="mt-2 text-center text-sm text-gray-500">
                Análisis de Redundancia basado en distancias (db-RDA) de comunidades marinas
              </p>
            </div>
          )}
          
          {selectedAnalysis === 'nmds' && (
            <div className="flex flex-col items-center">
              <div className="relative w-full h-64 md:h-96">
                <Image 
                  src="/images/diversidad/correlacion_variables.png"
                  alt="Correlación de variables ambientales"
                  fill
                  style={{ objectFit: "contain" }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="rounded-lg"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    if (target.src !== "/images/placeholder.png") {
                      target.src = "/images/placeholder.png";
                    }
                  }}
                />
              </div>
              <p className="mt-2 text-center text-sm text-gray-500">
                Correlación entre variables ambientales utilizadas en el análisis multivariado
              </p>
            </div>
          )}
          
          <p className="mt-4 text-sm text-gray-600">
            {analysisDescriptions[selectedAnalysis as keyof typeof analysisDescriptions]}
          </p>
        </div>
      </div>
      
      <div className="mt-6 bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-ocean-dark mb-2">Implementación en Python</h3>
        <div className="bg-gray-800 text-gray-200 p-4 rounded overflow-auto">
          <pre className="text-sm">
{`import numpy as np
import pandas as pd
from sklearn.preprocessing import StandardScaler
from scipy.spatial.distance import pdist, squareform
import matplotlib.pyplot as plt
from sklearn.decomposition import PCA

def realizar_rda_tradicional(datos_especies, datos_ambientales):
    """Realiza RDA tradicional"""
    # Estandarizar datos
    scaler = StandardScaler()
    X = scaler.fit_transform(datos_ambientales)
    Y = scaler.fit_transform(datos_especies)
    
    # Calcular RDA
    B = np.linalg.inv(X.T @ X) @ X.T @ Y
    Y_fit = X @ B

    # PCA para obtener ejes de ordenación
    pca = PCA()
    rda_result = pca.fit_transform(Y_fit)
    var_exp = pca.explained_variance_ratio_ * 100

    return rda_result, var_exp, B

def realizar_dbrda(datos_especies, datos_ambientales):
    """Realiza db-RDA usando distancias de Bray-Curtis"""
    # Estandarizar variables ambientales
    scaler = StandardScaler()
    X = scaler.fit_transform(datos_ambientales)

    # Calcular matriz de distancias Bray-Curtis
    dist_matrix = pdist(datos_especies, metric='braycurtis')
    dist_square = squareform(dist_matrix)

    # PCoA
    pcoa = PCA()
    coords_principales = pcoa.fit_transform(dist_square)

    # RDA sobre coordenadas principales
    B = np.linalg.inv(X.T @ X) @ X.T @ coords_principales
    Y_fit = X @ B
    var_exp = pcoa.explained_variance_ratio_ * 100

    return Y_fit, var_exp, B

def plot_comparacion(rda_result, rda_var, dbrda_result, dbrda_var,
                    variables_amb, especies, filename='comparacion_ordenacion.png'):
    """Crea plots comparativos de RDA y db-RDA"""
    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(20, 8))
    
    # Código para crear los plots...
    
    plt.savefig(filename, dpi=300)
    plt.close()`}
          </pre>
        </div>
      </div>
      
      <div className="mt-6 bg-blue-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-ocean-dark mb-4">Calculadora Interactiva (Próximamente)</h3>
        <p className="mb-2">
          Estamos desarrollando una calculadora interactiva que permitirá:
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>Cargar tus propios datos de abundancia de especies</li>
          <li>Calcular índices de diversidad alfa, beta y gamma</li>
          <li>Realizar análisis multivariados (RDA, db-RDA, NMDS)</li>
          <li>Generar visualizaciones personalizadas</li>
          <li>Descargar resultados en formato CSV y gráficos en alta resolución</li>
        </ul>
        <div className="flex justify-center">
          <button className="bg-ocean text-white px-4 py-2 rounded opacity-60 cursor-not-allowed">
            Calculadora en Desarrollo
          </button>
        </div>
      </div>
    </div>
  );
};

export default GammaDiversity; 