// src/pages/biological/islandtheory.tsx
import Layout from "~/components/layout/Layout";
import IslandBiogeography from "../../components/IslandBiogeography";
import Link from "next/link";
import { useState } from "react";

export default function IslandTheoryPage() {
  const [showContent, setShowContent] = useState<boolean>(true);

  // Secciones para el menú de navegación rápida
  const sections = [
    { id: "classic-model", name: "Modelo Clásico" },
    { id: "nonlinear-effects", name: "Fenómenos No Lineales" },
    { id: "genetic-effects", name: "Efectos Genéticos" },
    { id: "marine-examples", name: "Ejemplos Marinos" },
    { id: "visualizations", name: "Visualizaciones" }
  ];

  return (
    <Layout 
      title="Teoría de Islas - OceanInsight" 
      description="Exploración de la teoría de biogeografía de islas, sus aplicaciones en ecología marina y sus limitaciones"
    >
      {/* Hero Section */}
      <div className="w-full bg-gradient-to-r from-blue-900 to-teal-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center mb-4">
            <Link href="/biological" className="text-blue-100 hover:text-white transition flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Biología Marina
            </Link>
          </div>
          
          <h1 className="text-4xl font-bold mb-4">Teoría de Biogeografía de Islas</h1>
          <p className="text-xl max-w-3xl">
            Un pilar fundamental en la ecología de comunidades con importantes 
            aplicaciones en ecosistemas marinos y conservación biológica.
          </p>
          
          <div className="mt-8 flex flex-wrap gap-2">
            {sections.map(section => (
              <a 
                key={section.id}
                href={`#${section.id}`}
                className="bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-full text-sm transition"
              >
                {section.name}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Introducción */}
      <div className="bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-blue-800 mb-6">Introducción</h2>
            <p className="text-lg text-gray-700 mb-6">
              La biogeografía de islas estudia los patrones de distribución de especies en ecosistemas 
              insulares y los procesos que los determinan. El modelo clásico de MacArthur y Wilson (1967) 
              revolucionó este campo, pero numerosos fenómenos complejos escapan a sus predicciones.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              Este marco teórico no solo es aplicable a islas geográficas, sino también a "islas ecológicas" 
              como lagos aislados, fragmentos de bosque, montañas submarinas, arrecifes de coral y otros 
              ecosistemas marinos aislados por barreras ecológicas o físicas.
            </p>

            <div className="flex items-center justify-center">
              <button 
                onClick={() => setShowContent(!showContent)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition flex items-center"
              >
                {showContent ? (
                  <>
                    Saltar a Visualizaciones
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </>
                ) : (
                  <>
                    Mostrar Contenido Completo
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Componente principal de contenido */}
      {showContent ? (
        <IslandBiogeography />
      ) : (
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-blue-800 mb-8">Visualizaciones Interactivas</h2>
            <div className="bg-blue-50 p-6 rounded-lg">
              <p className="text-lg text-center mb-6">
                Explora directamente nuestros modelos interactivos de la teoría de biogeografía de islas
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-bold text-blue-700 mb-3">Modelo Clásico</h3>
                  <p className="mb-4">Visualiza el equilibrio entre tasas de inmigración y extinción según MacArthur y Wilson.</p>
                  <button 
                    onClick={() => setShowContent(true)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition"
                  >
                    Ver Modelo Clásico
                  </button>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-bold text-blue-700 mb-3">Modelo Avanzado</h3>
                  <p className="mb-4">Explora efectos no lineales como el efecto fundador y cuello de botella genético.</p>
                  <button 
                    onClick={() => setShowContent(true)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition"
                  >
                    Ver Modelo Avanzado
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Referencias y recursos */}
      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-blue-800 mb-6">Referencias y Recursos Adicionales</h2>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-semibold text-blue-700 mb-3">Lecturas Recomendadas</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>MacArthur, R. H., & Wilson, E. O. (1967). <strong>The Theory of Island Biogeography</strong>. Princeton University Press.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Losos, J. B., & Ricklefs, R. E. (2009). <strong>The Theory of Island Biogeography Revisited</strong>. Princeton University Press.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Whittaker, R. J., & Fernández-Palacios, J. M. (2007). <strong>Island Biogeography: Ecology, Evolution, and Conservation</strong>. Oxford University Press.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Fenómenos Relacionados */}
      <div className="bg-blue-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-blue-800 mb-6">Fenómenos Genéticos Relacionados</h2>
            <p className="text-lg text-gray-700 mb-6">
              La biogeografía de islas está estrechamente relacionada con importantes procesos genéticos 
              que afectan a las poblaciones insulares. Explora estos fenómenos en detalle:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link href="/biological/founder-effect" className="block">
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
                  <div className="h-40 bg-gradient-to-r from-purple-800 to-indigo-600 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-white text-xl font-bold">Efecto Fundador</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-600">
                      Cuando un pequeño grupo de individuos establece una nueva población, 
                      solo una fracción del material genético original está representada, 
                      creando un proceso evolutivo único.
                    </p>
                    <div className="mt-4 flex justify-end">
                      <span className="text-blue-600 font-medium flex items-center">
                        Explorar
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
              
              <Link href="/biological/bottleneck" className="block">
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
                  <div className="h-40 bg-gradient-to-r from-blue-800 to-purple-800 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-white text-xl font-bold">Cuello de Botella Genético</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-600">
                      Una drástica reducción en el tamaño poblacional seguida de una recuperación 
                      numérica puede resultar en pérdida de diversidad genética con importantes 
                      consecuencias evolutivas.
                    </p>
                    <div className="mt-4 flex justify-end">
                      <span className="text-blue-600 font-medium flex items-center">
                        Explorar
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}