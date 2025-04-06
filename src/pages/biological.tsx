import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import Layout from "~/components/layout/Layout";
// Importar los componentes de visualización
import MarineTopicsNetwork from "../components/visualization/MarineTopicsNetwork";
import MarineNeuralNetwork from "../components/visualization/MarineNeuralNetwork";
import MarineHierarchicalNetwork from "../components/visualization/MarineHierarchicalNetwork";
import { useState } from "react";

const BiologicalOceanography: NextPage = () => {
  // Estado para alternar entre las diferentes vistas
  const [viewMode, setViewMode] = useState<'hierarchical' | 'neuralnet' | 'network' | 'traditional'>('hierarchical');

  // Ecosistemas marinos principales (mantenemos los datos existentes)
  const ecosystems = [
    {
      name: "Intermareal",
      description: "Zonas costeras entre mareas altas y bajas, caracterizadas por condiciones variables y organismos altamente adaptados.",
      image: "/ecosystems/intertidal.jpg",
      link: "/biological/ecosystems/intertidal"
    },
    {
      name: "Arrecifes",
      description: "Complejos ecosistemas con alta biodiversidad, formados principalmente por corales y otros organismos constructores.",
      image: "/ecosystems/reef.jpg",
      link: "/biological/ecosystems/reef"
    },
    {
      name: "Estuarinos",
      description: "Zonas de transición donde ríos se encuentran con el mar, caracterizadas por mezcla de agua dulce y salada.",
      image: "/ecosystems/estuary.jpg",
      link: "/biological/ecosystems/estuary"
    },
    {
      name: "Océano Abierto",
      description: "Vastas regiones pelágicas con diferentes zonas de profundidad y comunidades biológicas distintivas.",
      image: "/ecosystems/open-ocean.jpg",
      link: "/biological/ecosystems/open-ocean"
    },
    {
      name: "Hidrotermales",
      description: "Ecosistemas extremos basados en quimiosíntesis alrededor de fuentes hidrotermales en el fondo marino.",
      image: "/ecosystems/hydrothermal.jpg",
      link: "/biological/ecosystems/hydrothermal"
    },
    {
      name: "Fiordos",
      description: "Valles glaciares inundados con características oceanográficas únicas y comunidades biológicas particulares.",
      image: "/ecosystems/fjord.jpg",
      link: "/biological/ecosystems/fjord"
    }
  ];

  // Herramientas de análisis disponibles
  const analysisTools = [
    {
      name: "Índices de Diversidad",
      description: "Análisis de biodiversidad mediante índices alfa y beta como Shannon, Simpson, Margalef y otros.",
      icon: "📊"
    },
    {
      name: "Análisis Espacial",
      description: "Distribución espacial de la diversidad de zooplancton a diferentes profundidades en la Bahía de Valparaíso.",
      icon: "🌊"
    },
    {
      name: "Análisis de Zonación",
      description: "Estudio de patrones de distribución vertical y horizontal de especies en ecosistemas costeros.",
      icon: "📏"
    },
    {
      name: "Rarefacción y Estimadores",
      description: "Evaluación de riqueza de especies y comparación de comunidades con diferente esfuerzo de muestreo.",
      icon: "📈"
    },
    {
      name: "Análisis de Clusters",
      description: "Agrupación de comunidades biológicas basada en similitud de composición de especies.",
      icon: "🔬"
    }
  ];

  return (
    <Layout 
      title="Biología Marina - OceanInsight"
      description="Exploración interactiva de conceptos, ecosistemas y métodos en biología marina"
    >
      {/* Hero Section - Común para todas las vistas */}
      <div className="bg-gradient-to-r from-ocean-dark to-ocean via-ocean-dark py-8 text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Biología Marina</h1>
          <p className="text-xl max-w-3xl">
            Estudio de los organismos que habitan los océanos y sus interacciones con el ambiente marino,
            desde la biodiversidad microscópica hasta los grandes ecosistemas.
          </p>
          
          {/* Selector de vista con cuatro opciones */}
          <div className="mt-6 flex flex-wrap gap-2">
            <button 
              onClick={() => setViewMode('hierarchical')}
              className={`px-4 py-2 rounded-md transition ${
                viewMode === 'hierarchical' 
                  ? 'bg-white text-ocean-dark font-bold' 
                  : 'bg-ocean-dark text-white border border-white hover:bg-ocean'
              }`}
            >
              Red Jerárquica
            </button>
            <button 
              onClick={() => setViewMode('neuralnet')}
              className={`px-4 py-2 rounded-md transition ${
                viewMode === 'neuralnet' 
                  ? 'bg-white text-ocean-dark font-bold' 
                  : 'bg-ocean-dark text-white border border-white hover:bg-ocean'
              }`}
            >
              Red Neuronal
            </button>
            <button 
              onClick={() => setViewMode('network')}
              className={`px-4 py-2 rounded-md transition ${
                viewMode === 'network' 
                  ? 'bg-white text-ocean-dark font-bold' 
                  : 'bg-ocean-dark text-white border border-white hover:bg-ocean'
              }`}
            >
              Vista Conceptual
            </button>
            <button 
              onClick={() => setViewMode('traditional')}
              className={`px-4 py-2 rounded-md transition ${
                viewMode === 'traditional' 
                  ? 'bg-white text-ocean-dark font-bold' 
                  : 'bg-ocean-dark text-white border border-white hover:bg-ocean'
              }`}
            >
              Vista Clásica
            </button>
          </div>
        </div>
      </div>

      {/* Visualización de Red Jerárquica (Nueva) */}
      {viewMode === 'hierarchical' && (
        <div className="h-screen">
          <MarineHierarchicalNetwork />
        </div>
      )}

      {/* Visualización de Red Neuronal */}
      {viewMode === 'neuralnet' && (
        <div className="h-screen">
          <MarineNeuralNetwork />
        </div>
      )}

      {/* Visualización de Red Conceptual */}
      {viewMode === 'network' && (
        <div className="h-screen">
          <MarineTopicsNetwork />
        </div>
      )}

      {/* Contenido Tradicional */}
      {viewMode === 'traditional' && (
        <>
          {/* Main Content */}
          <div className="py-12 bg-white">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-ocean-dark mb-8">Ecosistemas Marinos</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                {ecosystems.map((ecosystem) => (
                  <div key={ecosystem.name} className="bg-gray-50 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                    <div className="h-48 bg-ocean-light relative">
                      {/* Placeholder for image (you'll need to add actual images) */}
                      <div className="absolute inset-0 flex items-center justify-center text-white text-4xl">
                        {/* Replace with actual Image component when you have images */}
                        <span>{ecosystem.name[0]}</span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-ocean-dark mb-2">{ecosystem.name}</h3>
                      <p className="text-gray-600 mb-4">{ecosystem.description}</p>
                      <Link 
                        href={ecosystem.link}
                        className="text-ocean hover:text-ocean-dark font-medium"
                      >
                        Explorar más →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              <h2 className="text-3xl font-bold text-ocean-dark mb-8">Herramientas de Análisis</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                {analysisTools.map((tool) => (
                  <div key={tool.name} className="flex items-start p-6 bg-gray-50 rounded-lg">
                    <div className="text-3xl mr-4 bg-ocean text-white h-12 w-12 rounded-full flex items-center justify-center">
                      {tool.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-ocean-dark mb-2">
                        {tool.name === "Índices de Diversidad" ? (
                          <Link href="/biological/biodiversity" className="text-ocean-dark hover:text-ocean transition">
                            {tool.name}
                          </Link>
                        ) : tool.name === "Análisis Espacial" ? (
                          <Link href="/biological/biodiversity?tab=spatial" className="text-ocean-dark hover:text-ocean transition">
                            {tool.name}
                          </Link>
                        ) : (
                          tool.name
                        )}
                      </h3>
                      <p className="text-gray-600">{tool.description}</p>
                      {tool.name === "Índices de Diversidad" && (
                        <Link href="/biological/biodiversity" className="mt-2 inline-block text-ocean hover:underline">
                          Explorar módulo de diversidad →
                        </Link>
                      )}
                      {tool.name === "Análisis Espacial" && (
                        <Link href="/biological/biodiversity?tab=spatial" className="mt-2 inline-block text-ocean hover:underline">
                          Explorar análisis espacial →
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-ocean-light bg-opacity-20 rounded-lg p-8">
                <h2 className="text-2xl font-bold text-ocean-dark mb-4">Proyecto tIAmat: Análisis Automatizado</h2>
                <p className="mb-4">
                  Nuestro proyecto tIAmat proporciona herramientas avanzadas para el análisis automatizado de datos 
                  de biodiversidad marina, incluyendo:
                </p>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                  <li>Cálculo de índices de diversidad alfa y beta</li>
                  <li>Análisis de patrones de zonación</li>
                  <li>Métodos de rarefacción y estimadores de riqueza</li>
                  <li>Visualización de datos espaciales mediante Google Earth Engine</li>
                  <li>Generación y análisis de datos sintéticos para modelado</li>
                </ul>
                <Link 
                  href="/projects/tiamat"
                  className="inline-block px-6 py-3 bg-ocean text-white rounded-md hover:bg-ocean-dark transition"
                >
                  Explorar Proyecto tIAmat
                </Link>
              </div>
            </div>
          </div>

          {/* Research Areas Section */}
          <div className="py-12 bg-gray-50">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-ocean-dark mb-8">Áreas de Investigación</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 bg-white rounded-lg shadow-md">
                  <h3 className="text-xl font-bold text-ocean-dark mb-3">Biodiversidad Marina</h3>
                  <p className="text-gray-600">
                    Estudio de la diversidad de especies en diferentes ecosistemas marinos, 
                    patrones de distribución y factores que influyen en la riqueza de especies.
                  </p>
                </div>
                
                <div className="p-6 bg-white rounded-lg shadow-md">
                  <h3 className="text-xl font-bold text-ocean-dark mb-3">Ecología de Comunidades</h3>
                  <p className="text-gray-600">
                    Análisis de interacciones entre especies, estructura trófica y dinámica 
                    de comunidades en ecosistemas marinos.
                  </p>
                </div>
                
                <div className="p-6 bg-white rounded-lg shadow-md">
                  <h3 className="text-xl font-bold text-ocean-dark mb-3">Conservación Marina</h3>
                  <p className="text-gray-600">
                    Estrategias para la protección y manejo sostenible de ecosistemas marinos, 
                    especies amenazadas y áreas marinas protegidas.
                  </p>
                </div>
                
                <div className="p-6 bg-white rounded-lg shadow-md">
                  <h3 className="text-xl font-bold text-ocean-dark mb-3">Cambio Climático</h3>
                  <p className="text-gray-600">
                    Impactos del cambio climático en ecosistemas marinos, incluyendo acidificación 
                    oceánica, aumento de temperatura y eventos extremos.
                  </p>
                </div>
                
                <div className="p-6 bg-white rounded-lg shadow-md">
                  <h3 className="text-xl font-bold text-ocean-dark mb-3">Biología Molecular Marina</h3>
                  <p className="text-gray-600">
                    Aplicación de técnicas moleculares para el estudio de biodiversidad, 
                    evolución y adaptación de organismos marinos.
                  </p>
                </div>
                
                <div className="p-6 bg-white rounded-lg shadow-md">
                  <h3 className="text-xl font-bold text-ocean-dark mb-3">Ecología Funcional</h3>
                  <p className="text-gray-600">
                    Estudio de los roles funcionales de diferentes especies y grupos en 
                    ecosistemas marinos y su importancia para procesos ecosistémicos.
                  </p>
                </div>
              </div>

              {/* Destacado de Teoría de Islas */}
              <div className="mt-10 bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-6 shadow-sm">
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="md:w-2/3">
                    <h3 className="text-2xl font-bold text-blue-800 mb-3">Teoría de Biogeografía de Islas</h3>
                    <p className="text-gray-700 mb-4">
                      Un pilar fundamental en la ecología de comunidades marinas que explica cómo el tamaño y 
                      aislamiento de los hábitats determinan la biodiversidad. Explora conceptos clave como 
                      equilibrio dinámico, efecto fundador, cuello de botella genético y otros fenómenos en ecosistemas insulares.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <Link 
                        href="/biological/islandtheory" 
                        className="inline-flex items-center px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                      >
                        Explorar Teoría de Islas
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </Link>
                      <Link 
                        href="/biological/founder-effect" 
                        className="inline-flex items-center px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                      >
                        Efecto Fundador
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </Link>
                      <Link 
                        href="/biological/bottleneck" 
                        className="inline-flex items-center px-5 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
                      >
                        Cuello de Botella
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                  <div className="md:w-1/3">
                    <div className="rounded-lg overflow-hidden shadow-md">
                      <Image 
                        src="/images/biology/community_ecology/island_theory.png" 
                        alt="Teoría de biogeografía de islas"
                        width={400}
                        height={250}
                        className="w-full h-auto"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-ocean py-12 text-white">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl font-bold mb-4">¿Necesitas asesoría en biología marina?</h2>
              <p className="max-w-2xl mx-auto mb-8">
                Nuestro equipo de expertos puede ayudarte con análisis de datos, consultoría para 
                proyectos de investigación o evaluaciones ambientales.
              </p>
              <Link 
                href="/contact"
                className="inline-block px-8 py-3 bg-white text-ocean font-bold rounded-md hover:bg-gray-100 transition"
              >
                Contactar a un especialista
              </Link>
            </div>
          </div>
        </>
      )}
    </Layout>
  );
};

export default BiologicalOceanography;