import type { NextPage } from "next";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import Layout from "~/components/layout/Layout";
import AlphaDiversity from "~/components/analysis/AlphaDiversity";
import BetaDiversity from "~/components/analysis/BetaDiversity";
import GammaDiversity from "~/components/analysis/GammaDiversity";
import SpatialDiversityAnalysis from "~/components/analysis/SpatialDiversityAnalysis";
import DiversityIndices from "~/components/analysis/DiversityIndices";

const BiodiversityAnalysisPage: NextPage = () => {
  const [activeTab, setActiveTab] = useState<'indices' | 'alpha' | 'beta' | 'gamma' | 'spatial'>('indices');
  const router = useRouter();
  
  // Establecer la pestaña activa basada en el parámetro de URL
  useEffect(() => {
    if (router.isReady) {
      const { tab } = router.query;
      if (tab === 'spatial') {
        setActiveTab('spatial');
      } else if (tab === 'beta') {
        setActiveTab('beta');
      } else if (tab === 'gamma') {
        setActiveTab('gamma');
      } else if (tab === 'alpha') {
        setActiveTab('alpha');
      } else if (tab === 'indices') {
        setActiveTab('indices');
      }
    }
  }, [router.isReady, router.query]);
  
  // Función para cambiar la pestaña activa y actualizar la URL
  const handleTabChange = (tab: 'indices' | 'alpha' | 'beta' | 'gamma' | 'spatial') => {
    setActiveTab(tab);
    router.push({
      pathname: router.pathname,
      query: { tab }
    }, undefined, { shallow: true });
  };
  
  return (
    <Layout 
      title="Análisis de Biodiversidad Marina - OceanInsight"
      description="Metodologías y herramientas para el análisis de la biodiversidad en ecosistemas marinos con índices de diversidad alfa, beta y gamma"
    >
      <div className="py-8 bg-gradient-to-b from-ocean-light to-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-ocean-dark mb-4">Análisis de Biodiversidad Marina</h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Herramientas y metodologías para el estudio de la biodiversidad marina a través de índices de diversidad
            alfa, beta y gamma, con análisis espacial e implementaciones en Python.
          </p>
        </div>
      </div>
      
      <div className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-center mb-8">
            <div className="inline-flex rounded-md shadow-sm overflow-x-auto" role="group">
              <button 
                onClick={() => handleTabChange('indices')}
                className={`px-4 py-2 text-sm font-medium ${
                  activeTab === 'indices' 
                    ? 'bg-ocean text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                } ${activeTab === 'indices' ? '' : 'border-r-0'} rounded-l-lg`}
              >
                Índices de Diversidad
              </button>
              <button 
                onClick={() => handleTabChange('alpha')}
                className={`px-4 py-2 text-sm font-medium ${
                  activeTab === 'alpha' 
                    ? 'bg-ocean text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                } ${activeTab === 'alpha' ? '' : 'border-r-0'}`}
              >
                Diversidad Alfa
              </button>
              <button 
                onClick={() => handleTabChange('beta')}
                className={`px-4 py-2 text-sm font-medium ${
                  activeTab === 'beta' 
                    ? 'bg-ocean text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-50 border-t border-b border-gray-300'
                } ${activeTab === 'beta' ? '' : 'border-r-0'}`}
              >
                Diversidad Beta
              </button>
              <button 
                onClick={() => handleTabChange('gamma')}
                className={`px-4 py-2 text-sm font-medium ${
                  activeTab === 'gamma' 
                    ? 'bg-ocean text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                } ${activeTab === 'gamma' ? '' : 'border-r-0'}`}
              >
                Diversidad Gamma
              </button>
              <button 
                onClick={() => handleTabChange('spatial')}
                className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
                  activeTab === 'spatial' 
                    ? 'bg-ocean text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                }`}
              >
                Análisis Espacial
              </button>
            </div>
          </div>
          
          <div className="mb-12">
            {activeTab === 'indices' && <DiversityIndices />}
            {activeTab === 'alpha' && <AlphaDiversity ecosystemType="intermareal" />}
            {activeTab === 'beta' && <BetaDiversity ecosystemType="intermareal" />}
            {activeTab === 'gamma' && <GammaDiversity ecosystemType="intermareal" />}
            {activeTab === 'spatial' && <SpatialDiversityAnalysis region="valparaiso" />}
          </div>
          
          {/* Nuevos ejemplos de biodiversidad marina */}
          <div className="bg-white rounded-lg p-6 mb-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-ocean-dark mb-4">Ejemplos Destacados de Biodiversidad Marina</h2>
            <p className="mb-6">
              Los océanos albergan ecosistemas con patrones de biodiversidad fascinantes y complejos. 
              Estos ejemplos ilustran aplicaciones prácticas del análisis de biodiversidad en contextos reales:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {/* Ejemplo 1 */}
              <div className="bg-gray-50 rounded-lg overflow-hidden shadow-md">
                <div className="relative h-56">
                  <Image 
                    src="/images/diversidad/gradiente_intermareal.jpg" 
                    alt="Gradiente de diversidad en zona intermareal"
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-ocean-dark mb-2">Gradientes de Diversidad en Zonas Intermareales</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    <strong>Caso de estudio:</strong> Costa rocosa de Chile central
                  </p>
                  <p className="text-gray-700">
                    Los estudios en zonas intermareales muestran un claro patrón de diversidad alfa que aumenta desde el supralitoral 
                    hacia el infralitoral. El índice de Shannon varía de 1.8 a 3.1, reflejando cómo los factores de estrés físico 
                    (desecación, temperatura) influyen en la distribución de las especies. Mediante análisis de diversidad beta 
                    (Bray-Curtis) se identifican zonas de transición entre comunidades.
                  </p>
                  <div className="mt-3 text-sm text-ocean">
                    <strong>Aplicación:</strong> Monitoreo de impactos del cambio climático en comunidades intermareales
                  </div>
                </div>
              </div>
              
              {/* Ejemplo 2 */}
              <div className="bg-gray-50 rounded-lg overflow-hidden shadow-md">
                <div className="relative h-56">
                  <Image 
                    src="/images/diversidad/arrecife_coral.jpg" 
                    alt="Diversidad en arrecifes de coral"
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-ocean-dark mb-2">Diversidad Funcional en Arrecifes de Coral</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    <strong>Caso de estudio:</strong> Gran Barrera de Coral, Australia
                  </p>
                  <p className="text-gray-700">
                    Los arrecifes de coral presentan patrones de diversidad funcional que complementan los análisis taxonómicos tradicionales. 
                    Estudios recientes incorporan rasgos funcionales de corales y peces para entender la resistencia del ecosistema. 
                    Utilizando índices multivariados, se han identificado "grupos funcionales" clave cuya presencia determina la 
                    capacidad de recuperación tras perturbaciones como blanqueamiento.
                  </p>
                  <div className="mt-3 text-sm text-ocean">
                    <strong>Aplicación:</strong> Diseño de áreas marinas protegidas basado en diversidad funcional
                  </div>
                </div>
              </div>
              
              {/* Ejemplo 3 */}
              <div className="bg-gray-50 rounded-lg overflow-hidden shadow-md">
                <div className="relative h-56">
                  <Image 
                    src="/images/diversidad/surgencia_plancton.jpg" 
                    alt="Diversidad planctónica en zonas de surgencia"
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-ocean-dark mb-2">Diversidad Planctónica en Zonas de Surgencia</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    <strong>Caso de estudio:</strong> Sistema de Corriente de Humboldt
                  </p>
                  <p className="text-gray-700">
                    Las zonas de surgencia costera muestran patrones estacionales en la diversidad de fitoplancton y zooplancton. 
                    Análisis multivariados (RDA) revelan cómo variables ambientales (temperatura, nutrientes) determinan la 
                    composición de comunidades. Durante eventos de surgencia, se observa inicialmente baja diversidad alfa 
                    (dominancia de diatomeas), seguida de incrementos en diversidad beta conforme maduran las comunidades.
                  </p>
                  <div className="mt-3 text-sm text-ocean">
                    <strong>Aplicación:</strong> Predicción de floraciones algales nocivas mediante patrones de diversidad
                  </div>
                </div>
              </div>
              
              {/* Ejemplo 4 - Actualizado para mostrar análisis espacial de zooplancton */}
              <div className="bg-gray-50 rounded-lg overflow-hidden shadow-md">
                <div className="relative h-56">
                  <Image 
                    src="/images/diversidad/zooplankton/zooplankton_diversity_0m.png" 
                    alt="Análisis espacial de diversidad de zooplancton"
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-ocean-dark mb-2">Análisis Espacial de Diversidad de Zooplancton</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    <strong>Caso de estudio:</strong> Bahía de Valparaíso, Chile
                  </p>
                  <p className="text-gray-700">
                    El análisis de la distribución espacial de zooplancton revela patrones de diversidad que varían con la profundidad.
                    En superficie (0m), la diversidad es mayor cerca de la costa debido al aporte de nutrientes, mientras que a mayor
                    profundidad (200m) el patrón se invierte. La interpolación espacial permite identificar zonas de alta diversidad
                    y sus características oceanográficas asociadas.
                  </p>
                  <div className="mt-3 text-sm text-ocean">
                    <strong>Aplicación:</strong> <a href="#" onClick={(e) => {e.preventDefault(); handleTabChange('spatial');}} className="underline">Explorar análisis espacial completo</a>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-ocean-light bg-opacity-20 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-ocean-dark mb-2">Recursos para Científicos Marinos</h3>
              <p className="mb-3">
                Para profundizar en el análisis de biodiversidad marina, recomendamos:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-gray-700">
                <li>Bases de datos: OBIS (Ocean Biodiversity Information System), GBIF (Global Biodiversity Information Facility)</li>
                <li>Paquetes R: vegan, BiodiversityR, betapart</li>
                <li>Paquetes Python: scikit-bio, biodiversitR (interfaz Python-R)</li>
                <li>Herramientas de visualización: EcoViz, bioviZ, mapas interactivos con Folium</li>
                <li>Técnicas de interpolación espacial: Kriging, IDW, RBF con cartopy y scipy</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-ocean-dark mb-4">¿Qué es el análisis de biodiversidad?</h2>
            <p className="mb-4">
              El análisis de biodiversidad es fundamental para comprender y conservar la vida en los océanos.
              Las técnicas modernas permiten cuantificar diferentes aspectos de la biodiversidad:
            </p>
            <ul className="list-disc pl-8 mb-4 space-y-2">
              <li><strong>Diversidad Alfa:</strong> Mide la riqueza y la equitatividad de las especies dentro de un hábitat específico. Los índices como Shannon y Simpson cuantifican estos aspectos.</li>
              <li><strong>Diversidad Beta:</strong> Evalúa el cambio en la composición de especies entre diferentes ecosistemas o a lo largo de gradientes ambientales. Los índices como Bray-Curtis y Whittaker miden estas diferencias.</li>
              <li><strong>Diversidad Gamma:</strong> Representa la diversidad total en una región geográfica amplia. Se estudia mediante técnicas de análisis multivariado que relacionan las comunidades con variables ambientales.</li>
              <li><strong>Análisis Espacial:</strong> Examina los patrones de distribución espacial de la biodiversidad en tres dimensiones, incorporando la variación con la profundidad y las características oceanográficas.</li>
            </ul>
            <p>
              Estas herramientas de análisis son esenciales para monitorear los ecosistemas marinos, evaluar el impacto de las actividades humanas, y desarrollar estrategias efectivas de conservación marina.
            </p>
          </div>
          
          <div className="bg-ocean-light bg-opacity-10 p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-ocean-dark mb-4">Proyecto tIAmat - Análisis Avanzado</h2>
            <p className="mb-4">
              El proyecto tIAmat ofrece herramientas de análisis avanzadas para el estudio de la biodiversidad en ecosistemas marinos. 
              Utilizando algoritmos de aprendizaje automático, tIAmat puede:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Calcular automáticamente múltiples índices de diversidad</li>
              <li>Identificar patrones de zonación y distribución de especies</li>
              <li>Comparar comunidades utilizando análisis multivariante</li>
              <li>Visualizar datos espacialmente mediante integración con Google Earth Engine</li>
              <li>Generar modelos predictivos para estimar biodiversidad en diferentes escenarios</li>
              <li>Crear mapas de interpolación espacial con algoritmos adaptados a datos oceanográficos</li>
            </ul>
            <div className="flex justify-center">
              <Link href="#" className="bg-ocean text-white px-4 py-2 rounded hover:bg-ocean-dark transition">
                Ver Documentación de tIAmat
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BiodiversityAnalysisPage;