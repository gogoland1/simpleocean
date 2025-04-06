import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface SpatialDiversityAnalysisProps {
  region?: string;
}

const SpatialDiversityAnalysis: React.FC<SpatialDiversityAnalysisProps> = ({ 
  region = 'valparaiso' 
}) => {
  const [selectedView, setSelectedView] = useState<'maps' | 'profile' | 'summary' | 'workflow'>('maps');
  const [selectedDepth, setSelectedDepth] = useState<0 | 50 | 200>(0);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-ocean-dark mb-6">Análisis Espacial de Diversidad de Zooplancton</h2>
      <p className="mb-4 text-gray-700">
        Este análisis muestra la distribución espacial de la diversidad de zooplancton en la Bahía de Valparaíso
        a diferentes profundidades, utilizando datos sintéticos generados para fines educativos.
        Aquí podemos observar patrones espaciales y verticales característicos de ecosistemas costeros.
      </p>

      {/* Selector de vista */}
      <div className="mb-6 bg-gray-100 p-4 rounded-lg">
        <div className="flex flex-wrap gap-2 mb-4">
          <button
            onClick={() => setSelectedView('maps')}
            className={`px-3 py-1 rounded ${
              selectedView === 'maps' 
                ? 'bg-ocean text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Mapas de Diversidad
          </button>
          <button
            onClick={() => setSelectedView('profile')}
            className={`px-3 py-1 rounded ${
              selectedView === 'profile' 
                ? 'bg-ocean text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Perfil Vertical
          </button>
          <button
            onClick={() => setSelectedView('summary')}
            className={`px-3 py-1 rounded ${
              selectedView === 'summary' 
                ? 'bg-ocean text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Resumen Estadístico
          </button>
          <button
            onClick={() => setSelectedView('workflow')}
            className={`px-3 py-1 rounded ${
              selectedView === 'workflow' 
                ? 'bg-ocean text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Flujo de Trabajo
          </button>
        </div>
        
        {/* Contenido según la vista seleccionada */}
        <div className="bg-white p-4 rounded-lg shadow">
          {selectedView === 'maps' && (
            <>
              <h3 className="text-lg font-semibold text-ocean mb-4">
                Mapas de Diversidad por Profundidad
              </h3>
              
              {/* Selector de profundidad */}
              <div className="flex flex-wrap gap-2 mb-4">
                <button
                  onClick={() => setSelectedDepth(0)}
                  className={`px-3 py-1 rounded ${
                    selectedDepth === 0 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Superficie (0m)
                </button>
                <button
                  onClick={() => setSelectedDepth(50)}
                  className={`px-3 py-1 rounded ${
                    selectedDepth === 50 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Media Agua (50m)
                </button>
                <button
                  onClick={() => setSelectedDepth(200)}
                  className={`px-3 py-1 rounded ${
                    selectedDepth === 200 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Profundidad (200m)
                </button>
              </div>
              
              {/* Visualización del mapa según profundidad */}
              <div className="flex flex-col items-center">
                <div className="relative w-full h-[500px]">
                  <Image 
                    src={`/images/diversidad/zooplankton/zooplankton_diversity_${selectedDepth}m.png`}
                    alt={`Mapa de diversidad de zooplancton a ${selectedDepth}m de profundidad`}
                    fill
                    style={{ objectFit: "contain" }}
                    sizes="(max-width: 768px) 100vw, 80vw"
                    className="rounded-lg"
                  />
                </div>
                <p className="mt-4 text-sm text-gray-600 max-w-2xl text-center">
                  {selectedDepth === 0 && 
                    "En la superficie (0m), observamos mayor diversidad cerca de la costa debido al aporte de nutrientes y la influencia de corrientes costeras. Los patrones espaciales muestran áreas de alta diversidad asociadas a zonas de surgencia."}
                  {selectedDepth === 50 && 
                    "A media agua (50m), la diversidad se concentra en zonas de mezcla y frentes oceánicos. Los patrones son más homogéneos que en superficie, con valores moderados de diversidad en la mayor parte del área."}
                  {selectedDepth === 200 && 
                    "En aguas profundas (200m), la diversidad general disminuye, pero se observan 'hotspots' asociados a corrientes profundas y características topográficas del fondo marino."}
                </p>
              </div>
            </>
          )}
          
          {selectedView === 'profile' && (
            <>
              <h3 className="text-lg font-semibold text-ocean mb-4">
                Perfil Vertical y Gradiente de Diversidad
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col items-center">
                  <div className="relative w-full h-[400px]">
                    <Image 
                      src="/images/diversidad/zooplankton/zooplankton_vertical_profile.png"
                      alt="Perfil vertical de diversidad de zooplancton"
                      fill
                      style={{ objectFit: "contain" }}
                      sizes="(max-width: 768px) 100vw, 40vw"
                      className="rounded-lg"
                    />
                  </div>
                  <p className="mt-2 text-sm text-gray-600 text-center">
                    Perfil vertical promedio mostrando la variación del índice de Shannon con la profundidad
                  </p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="relative w-full h-[400px]">
                    <Image 
                      src="/images/diversidad/zooplankton/zooplankton_vertical_gradient.png"
                      alt="Gradiente vertical de diversidad de zooplancton"
                      fill
                      style={{ objectFit: "contain" }}
                      sizes="(max-width: 768px) 100vw, 40vw"
                      className="rounded-lg"
                    />
                  </div>
                  <p className="mt-2 text-sm text-gray-600 text-center">
                    Mapa del gradiente vertical (diferencia entre 0m y 200m), mostrando donde ocurren los mayores cambios
                  </p>
                </div>
              </div>
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-ocean-dark mb-2">Interpretación Ecológica</h4>
                <p className="text-sm text-gray-600">
                  El perfil vertical muestra una disminución general de la diversidad con la profundidad, un patrón 
                  común en zonas costeras. Esto se debe principalmente a la reducción de disponibilidad de luz y recursos 
                  alimenticios. La capa superficial (0-25m) presenta la mayor diversidad debido a la productividad primaria 
                  y disponibilidad de nutrientes, mientras que las capas más profundas muestran una comunidad más especializada 
                  y menos diversa. El gradiente espacial muestra áreas de alta variabilidad vertical cerca de la costa y en 
                  zonas de frentes oceánicos.
                </p>
              </div>
            </>
          )}
          
          {selectedView === 'summary' && (
            <>
              <h3 className="text-lg font-semibold text-ocean mb-4">
                Resumen Estadístico del Análisis
              </h3>
              <div className="flex flex-col items-center">
                <div className="relative w-full h-[600px]">
                  <Image 
                    src="/images/diversidad/zooplankton/zooplankton_diversity_summary.png"
                    alt="Resumen estadístico de diversidad de zooplancton"
                    fill
                    style={{ objectFit: "contain" }}
                    sizes="(max-width: 768px) 100vw, 90vw"
                    className="rounded-lg"
                  />
                </div>
                <p className="mt-4 text-sm text-gray-600 max-w-3xl text-center">
                  Este resumen integra diferentes métricas estadísticas del análisis espacial. Podemos observar (A) los valores 
                  promedio del índice de Shannon en cada profundidad, (B) la distribución estadística de los valores, 
                  (C) el perfil vertical completo y (D) la relación entre diversidad y distancia a la costa para las 
                  profundidades extremas (0m y 200m). Nótese la tendencia inversa en superficie (mayor diversidad cerca de costa) 
                  versus aguas profundas (mayor diversidad lejos de costa).
                </p>
              </div>
            </>
          )}
          
          {selectedView === 'workflow' && (
            <>
              <h3 className="text-lg font-semibold text-ocean mb-4">
                Flujo de Trabajo del Análisis Espacial
              </h3>
              <div className="flex flex-col items-center mb-6">
                <div className="relative w-full h-[400px]">
                  <Image 
                    src="/images/diversidad/zooplankton/workflow_spatial_analysis.png"
                    alt="Diagrama de flujo del análisis espacial"
                    fill
                    style={{ objectFit: "contain" }}
                    sizes="(max-width: 768px) 100vw, 80vw"
                    className="rounded-lg"
                  />
                </div>
                <p className="mt-2 text-sm text-gray-600 text-center">
                  Diagrama de flujo mostrando los pasos principales del análisis espacial de diversidad
                </p>
              </div>
              <div className="mb-6 bg-gray-800 text-gray-200 p-4 rounded overflow-auto">
                <pre className="text-sm">
{`# Flujo de trabajo en Python para análisis espacial de diversidad
import numpy as np
import matplotlib.pyplot as plt
from scipy.interpolate import Rbf
import cartopy.crs as ccrs

# 1. Generación de datos sintéticos espacialmente estructurados
def generate_diversity_data(lons, lats, depth):
    # Diferentes patrones según la profundidad
    base_diversity = np.zeros(len(lons))
    
    if depth == 0:  # Superficie
        for i in range(len(lons)):
            coastal_influence = (lons[i] - lon_min) / (lon_max - lon_min)
            upwelling_influence = np.sin(lats[i] * 10) * 0.5 + 0.5
            base_diversity[i] = 2.0 + (1.0 - coastal_influence) * 1.5 + upwelling_influence * 0.8
    
    elif depth == 50:  # Media agua
        for i in range(len(lons)):
            front_position = (lon_max + lon_min) / 2
            front_influence = 1.0 - abs(lons[i] - front_position) * 5
            mixing_influence = np.cos(lats[i] * 15) * 0.5 + 0.5
            base_diversity[i] = 1.8 + front_influence * 1.2 + mixing_influence * 0.7
    
    else:  # Profundidad
        for i in range(len(lons)):
            deep_current = np.sin(lats[i] * 8 + lons[i] * 5) * 0.5 + 0.5
            base_diversity[i] = 1.0 + deep_current * 1.0
    
    return np.clip(base_diversity, 0.2, 4.0)  # Valores realistas

# 2. Interpolación espacial con Radial Basis Function
def interpolate_data(lons, lats, values, grid_lon, grid_lat):
    rbf = Rbf(lons, lats, values, function='multiquadric', epsilon=0.05)
    return rbf(grid_lon, grid_lat)

# 3. Visualización con paleta de ODV y línea de costa
def plot_diversity_map(grid_z, depth):
    fig = plt.figure(figsize=(10, 8))
    ax = plt.axes(projection=ccrs.PlateCarree())
    ax.coastlines(resolution='10m')
    
    # Crear colormap similar a ODV
    colors = [(0.0, 'darkblue'), (0.2, 'blue'), (0.4, 'turquoise'),
              (0.6, 'green'), (0.8, 'yellow'), (1.0, 'red')]
    cmap = LinearSegmentedColormap.from_list('odv_diversity', colors)
    
    # Plotear datos con máscara de tierra
    im = ax.pcolormesh(grid_lon, grid_lat, grid_z, cmap=cmap, 
                      transform=ccrs.PlateCarree())
    
    # Añadir barra de colores, título, etc.
    plt.colorbar(im, label='Índice de Shannon (H\')')
    plt.title(f'Diversidad de Zooplancton a {depth}m')
    plt.savefig(f'zooplankton_diversity_{depth}m.png', dpi=300)`}
                </pre>
              </div>
              <p className="mt-4 text-sm text-gray-600">
                Este flujo de trabajo muestra los pasos principales para realizar un análisis espacial de diversidad:
              </p>
              <ol className="list-decimal pl-6 mt-2 text-sm text-gray-600 space-y-1">
                <li>Generación o recolección de datos de diversidad georeferenciados</li>
                <li>Aplicación de técnicas de interpolación espacial (Radial Basis Function)</li>
                <li>Visualización de patrones espaciales con mapas oceanográficos</li>
                <li>Análisis estadístico para identificar patrones y gradientes</li>
                <li>Interpretación ecológica de los resultados</li>
              </ol>
              
              <div className="mt-6 bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-ocean-dark mb-2">Importancia para Estudios Oceanográficos</h4>
                <p className="text-sm text-gray-600">
                  El análisis espacial en 3D (considerando profundidad) es fundamental para comprender la estructura 
                  de comunidades planctónicas, ya que estas se distribuyen tanto horizontal como verticalmente siguiendo 
                  gradientes ambientales y oceanográficos. Las técnicas modernas combinan datos in situ con modelos 
                  oceanográficos e imágenes satelitales para crear representaciones más precisas de la distribución de 
                  la biodiversidad marina.
                </p>
              </div>
            </>
          )}
        </div>
      </div>
      
      <div className="mt-6 bg-ocean-light bg-opacity-20 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-ocean-dark mb-2">Recursos Adicionales</h3>
        <p className="mb-3 text-sm">
          Este análisis espacial es parte de una serie de herramientas para el estudio de la distribución de 
          comunidades zooplanctónicas. Para explorar más a fondo:
        </p>
        <ul className="list-disc pl-6 space-y-1 text-sm">
          <li>Consulta el módulo de diversidad alfa, beta y gamma en nuestro apartado de biodiversidad</li>
          <li>Explora las herramientas de estadística espacial en nuestro proyecto tIAmat</li>
          <li>Descarga el código Python utilizado para este análisis</li>
        </ul>
        <div className="flex justify-center mt-4">
          <Link 
            href="/biological/biodiversity" 
            className="inline-block px-4 py-2 bg-ocean text-white rounded-md hover:bg-ocean-dark transition mr-4"
          >
            Explorar biodiversidad marina
          </Link>
          <a 
            href="/scripts/zooplankton_spatial_analysis.py" 
            download
            className="inline-block px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition"
          >
            Descargar script Python
          </a>
        </div>
      </div>
    </div>
  );
};

export default SpatialDiversityAnalysis; 