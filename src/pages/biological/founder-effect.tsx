import React, { useState } from "react";
import Layout from "~/components/layout/Layout";
import Link from "next/link";
import Image from "next/image";

export default function FounderEffectPage() {
  // Estado para controlar el modal de imagen ampliada
  const [showImageModal, setShowImageModal] = useState(false);

  // Función para abrir el modal con la imagen
  const openImageModal = () => {
    setShowImageModal(true);
  };

  // Función para cerrar el modal
  const closeImageModal = () => {
    setShowImageModal(false);
  };

  // Componente para el modal de imagen
  const ImageModal = () => {
    return (
      <div 
        className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
        onClick={closeImageModal}
      >
        <div className="max-w-5xl max-h-screen flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
          <div className="relative w-full h-[70vh] mb-4">
            <Image
              src="/images/biology/community_ecology/founder_effect.png"
              alt="Efecto fundador en poblaciones insulares"
              fill
              style={{ objectFit: 'contain' }}
              quality={100}
            />
          </div>
          <p className="text-white text-center max-w-3xl text-lg">
            Ilustración del efecto fundador: un pequeño subconjunto de la población original 
            establece una nueva población con diferente composición genética, lo que resulta en 
            cambios significativos en la frecuencia alélica y pérdida de diversidad genética.
          </p>
          <button 
            className="mt-6 bg-white text-black px-6 py-2 rounded-full hover:bg-gray-200 transition"
            onClick={closeImageModal}
          >
            Cerrar
          </button>
        </div>
      </div>
    );
  };

  return (
    <Layout
      title="Efecto Fundador - Teoría de Islas - OceanInsight"
      description="Exploración del efecto fundador como proceso evolutivo en biogeografía de islas y sus implicaciones en ecosistemas marinos"
    >
      {/* Hero Section */}
      <div className="w-full bg-gradient-to-r from-blue-900 to-purple-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center mb-4">
            <Link href="/biological/islandtheory" className="text-blue-100 hover:text-white transition flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Teoría de Islas
            </Link>
          </div>
          
          <h1 className="text-4xl font-bold mb-4">Efecto Fundador</h1>
          <p className="text-xl max-w-3xl">
            Fenómeno evolutivo crucial en la colonización de islas y ecosistemas aislados, 
            con profundas implicaciones para la biodiversidad marina.
          </p>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8 mb-12">
            <div className="md:w-2/3">
              <h2 className="text-3xl font-bold text-blue-800 mb-6">¿Qué es el Efecto Fundador?</h2>
              
              <p className="text-lg text-gray-700 mb-6">
                El efecto fundador es un fenómeno evolutivo que ocurre cuando un pequeño subgrupo de una 
                población mayor se separa y establece una nueva población aislada. Este proceso es 
                particularmente relevante en la colonización de islas, tanto terrestres como "islas" 
                ecológicas en ambientes marinos.
              </p>
              
              <div className="bg-blue-50 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-semibold text-blue-700 mb-3">Características principales:</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-blue-600 font-bold mr-2">•</span>
                    <span><strong>Muestreo aleatorio:</strong> Los individuos fundadores representan solo una muestra aleatoria del pool genético original.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 font-bold mr-2">•</span>
                    <span><strong>Pérdida de diversidad:</strong> La nueva población tiene significativamente menos variabilidad genética.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 font-bold mr-2">•</span>
                    <span><strong>Cambio en frecuencias alélicas:</strong> Algunos alelos pueden estar sobrerrepresentados y otros pueden haberse perdido por completo.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 font-bold mr-2">•</span>
                    <span><strong>Fijación de alelos raros:</strong> Alelos que eran raros en la población original pueden volverse comunes en la nueva población.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 font-bold mr-2">•</span>
                    <span><strong>Potencial para enfermedades genéticas:</strong> Mayor probabilidad de expresión de trastornos recesivos.</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="md:w-1/3">
              <div 
                className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                onClick={openImageModal}
              >
                <div className="relative h-64 w-full">
                  <Image
                    src="/images/biology/community_ecology/founder_effect.png"
                    alt="Ilustración del efecto fundador"
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="sr-only">Ampliar imagen</span>
                    <div className="absolute inset-0 bg-black opacity-0 hover:opacity-10 transition-opacity flex items-center justify-center">
                      <div className="text-white text-sm font-medium px-3 py-1 bg-black bg-opacity-70 rounded">
                        Clic para ampliar
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm text-gray-600 italic">
                    Representación del efecto fundador en poblaciones insulares y sus consecuencias genéticas
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Ejemplos documentados */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-blue-800 mb-6">Ejemplos Documentados</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-xl font-semibold text-blue-700 mb-3">Ejemplos Terrestres</h3>
                <ul className="space-y-4">
                  <li>
                    <p className="font-medium">Isla de Tristan da Cunha</p>
                    <p className="text-gray-600">Habitantes muestran alta prevalencia de asma debido a sus pocos fundadores (15 individuos en 1816).</p>
                  </li>
                  <li>
                    <p className="font-medium">Población Amish</p>
                    <p className="text-gray-600">Ciertas enfermedades genéticas son más frecuentes debido a la fundación por un pequeño grupo con poca diversidad genética.</p>
                  </li>
                  <li>
                    <p className="font-medium">Pinzones de Darwin</p>
                    <p className="text-gray-600">Su diversificación en Galápagos comenzó con pocos individuos fundadores, derivando en diversas especies adaptadas a diferentes nichos.</p>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-xl font-semibold text-blue-700 mb-3">Ejemplos Marinos</h3>
                <ul className="space-y-4">
                  <li>
                    <p className="font-medium">Arrecife de la Isla de Pascua</p>
                    <p className="text-gray-600">Peces como el <em>Chaetodon litus</em> evolucionaron a partir de pocos individuos fundadores y muestran adaptaciones locales específicas.</p>
                  </li>
                  <li>
                    <p className="font-medium">Montañas submarinas</p>
                    <p className="text-gray-600">La cadena de montañas submarinas de Hawaii muestra gradientes de diversificación genética que evidencian colonizaciones secuenciales con efectos fundadores.</p>
                  </li>
                  <li>
                    <p className="font-medium">Ventilas hidrotermales</p>
                    <p className="text-gray-600">Comunidades de <em>Riftia pachyptila</em> (gusanos tubícolas gigantes) muestran evidencia de efectos fundadores severos en la colonización de nuevas ventilas.</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Implicaciones para la Biogeografía de Islas */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-blue-800 mb-6">Implicaciones para la Biogeografía de Islas</h2>
            
            <p className="text-lg text-gray-700 mb-6">
              El efecto fundador tiene importantes repercusiones no representadas en la teoría clásica de 
              MacArthur y Wilson, afectando significativamente la dinámica evolutiva y la biodiversidad 
              en sistemas insulares:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-xl font-semibold text-blue-700 mb-3">Divergencia Acelerada</h3>
                <p className="text-gray-600">
                  Las poblaciones fundadoras, con su reducida diversidad genética y distintas frecuencias 
                  alélicas, pueden evolucionar rápidamente en direcciones diferentes a sus poblaciones de origen, 
                  acelerando los procesos de especiación alopátrica.
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-xl font-semibold text-blue-700 mb-3">Adaptación Local</h3>
                <p className="text-gray-600">
                  La composición genética alterada de las poblaciones fundadoras puede facilitar adaptaciones 
                  rápidas a nuevos ambientes insulares, especialmente cuando ciertos alelos ventajosos están 
                  sobrerrepresentados en la población fundadora.
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-xl font-semibold text-blue-700 mb-3">Vulnerabilidad Ecológica</h3>
                <p className="text-gray-600">
                  Poblaciones con baja diversidad genética debido al efecto fundador pueden tener menor 
                  capacidad para responder a cambios ambientales o resistir a nuevos patógenos, aumentando 
                  su riesgo de extinción.
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-xl font-semibold text-blue-700 mb-3">Patrones de Endemismo</h3>
                <p className="text-gray-600">
                  El efecto fundador contribuye significativamente a los altos niveles de endemismo observados 
                  en sistemas insulares, tanto terrestres como marinos, favoreciendo la aparición de especies 
                  únicas.
                </p>
              </div>
            </div>
          </div>

          {/* Ejemplos específicos en ecosistemas marinos */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-blue-800 mb-6">Ejemplos en Ecosistemas Marinos</h2>
            
            <div className="bg-blue-50 rounded-lg p-8">
              <h3 className="text-xl font-semibold text-blue-700 mb-4">Arrecifes de Coral como "Islas" Marinas</h3>
              
              <p className="text-gray-700 mb-4">
                Los arrecifes de coral funcionan como islas biológicas en el océano, mostrando patrones 
                consistentes con la teoría de biogeografía insular pero con complejidades adicionales 
                debido a efectos genéticos:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="bg-white rounded-lg shadow-sm p-4">
                  <p className="font-medium text-blue-600 mb-2">Dispersión Larvaria</p>
                  <p className="text-gray-600">
                    La fase larvaria planctónica de muchos organismos arrecifales (peces, corales, invertebrados) 
                    actúa como mecanismo de dispersión, pero con importantes limitaciones que facilitan el efecto fundador.
                  </p>
                </div>
                
                <div className="bg-white rounded-lg shadow-sm p-4">
                  <p className="font-medium text-blue-600 mb-2">Ejemplo: Isla de Pascua</p>
                  <p className="text-gray-600">
                    Los arrecifes aislados de la Isla de Pascua muestran evidencia clara de efecto fundador, 
                    con menor diversidad genética y altas tasas de endemismo en peces como <em>Chaetodon litus</em>.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Conclusiones e implicaciones para la conservación */}
          <div>
            <h2 className="text-2xl font-bold text-blue-800 mb-6">Conclusiones e Implicaciones para la Conservación</h2>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <p className="text-lg text-gray-700 mb-6">
                El efecto fundador tiene importantes implicaciones para la conservación de la biodiversidad 
                en ecosistemas insulares marinos:
              </p>
              
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="bg-blue-100 text-blue-800 rounded-full h-6 w-6 flex items-center justify-center font-bold mr-3 mt-0.5">1</div>
                  <div>
                    <p className="font-medium">Consideración de la diversidad genética</p>
                    <p className="text-gray-600">Los esfuerzos de conservación deben considerar no solo el número de individuos, sino también preservar la diversidad genética de las poblaciones.</p>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <div className="bg-blue-100 text-blue-800 rounded-full h-6 w-6 flex items-center justify-center font-bold mr-3 mt-0.5">2</div>
                  <div>
                    <p className="font-medium">Conectividad entre poblaciones</p>
                    <p className="text-gray-600">Mantener o restaurar la conectividad entre poblaciones insulares puede contrarrestar los efectos negativos del efecto fundador.</p>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <div className="bg-blue-100 text-blue-800 rounded-full h-6 w-6 flex items-center justify-center font-bold mr-3 mt-0.5">3</div>
                  <div>
                    <p className="font-medium">Refuerzo genético</p>
                    <p className="text-gray-600">En casos críticos, el refuerzo genético mediante la introducción estratégica de individuos de poblaciones genéticamente diversas puede ser necesario.</p>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <div className="bg-blue-100 text-blue-800 rounded-full h-6 w-6 flex items-center justify-center font-bold mr-3 mt-0.5">4</div>
                  <div>
                    <p className="font-medium">Manejo adaptativo</p>
                    <p className="text-gray-600">Las estrategias de conservación deben adaptarse a las características genéticas únicas de cada población insular.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Enlaces relacionados */}
      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-blue-800 mb-6">Temas Relacionados</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link href="/biological/islandtheory" className="block bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition">
                <h3 className="text-lg font-semibold text-blue-700 mb-2">Teoría de Islas</h3>
                <p className="text-gray-600">Volver al modelo principal de biogeografía de islas</p>
              </Link>
              
              <Link href="/biological/bottleneck" className="block bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition">
                <h3 className="text-lg font-semibold text-blue-700 mb-2">Cuello de Botella</h3>
                <p className="text-gray-600">Fenómeno de reducción drástica en tamaño poblacional</p>
              </Link>
              
              <Link href="/biological/community-structure" className="block bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition">
                <h3 className="text-lg font-semibold text-blue-700 mb-2">Estructura Comunitaria</h3>
                <p className="text-gray-600">Organización y dinámica de comunidades ecológicas</p>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Modal para imagen ampliada */}
      {showImageModal && <ImageModal />}
    </Layout>
  );
} 