import Layout from "~/components/layout/Layout";
import QuantumOceanography from "~/components/QuantumOceanography";
import Image from "next/image";

export default function QuantumOceanographyPage() {
  return (
    <Layout 
      title="Oceanografía Cuántica - OceanInsight" 
      description="Exploración de aplicaciones de computación cuántica en oceanografía: simulaciones avanzadas, procesamiento de big data y desarrollo de nuevas metodologías para el estudio oceánico."
    >
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-900 to-blue-700 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Oceanografía Cuántica</h1>
          <p className="text-xl max-w-3xl">
            La frontera entre la computación cuántica y las ciencias oceánicas, transformando nuestra 
            capacidad para modelar, analizar y predecir sistemas oceánicos complejos mediante algoritmos 
            cuánticos y gestión avanzada de datos.
          </p>
        </div>
      </div>

      {/* Innovación Section */}
      <div className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center mb-12">Innovación Cuántica para los Océanos</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-purple-500">
              <h3 className="text-xl font-semibold mb-4 text-purple-700">Algoritmos Cuánticos</h3>
              <p>Desarrollo de algoritmos especializados que aprovechan la superposición y el entrelazamiento cuántico para resolver problemas oceanográficos computacionalmente intensivos.</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-blue-500">
              <h3 className="text-xl font-semibold mb-4 text-blue-700">Big Data Oceánico</h3>
              <p>Implementación de técnicas de procesamiento cuántico para analizar volúmenes masivos de datos oceanográficos, desde observaciones satelitales hasta redes de sensores distribuidos.</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-indigo-500">
              <h3 className="text-xl font-semibold mb-4 text-indigo-700">Simulación Multiescala</h3>
              <p>Modelado simultáneo de procesos oceánicos a múltiples escalas, desde interacciones moleculares hasta circulación global, imposible con los enfoques computacionales clásicos.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Patrones Fractales y Sistemas Caóticos */}
      <div className="py-12 bg-gradient-to-br from-indigo-900 via-purple-800 to-blue-900 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center mb-8">Patrones Fractales y Sistemas Caóticos</h2>
          <div className="flex flex-col md:flex-row items-center md:space-x-8">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <div className="bg-white bg-opacity-10 rounded-lg p-6 backdrop-filter backdrop-blur-sm">
                <h3 className="text-2xl font-semibold mb-4">Descubriendo el Orden en el Caos Oceánico</h3>
                <p className="mb-6">
                  Los océanos son el epítome de sistemas caóticos con patrones fractales emergentes. 
                  La computación cuántica nos permite modelar estas estructuras auto-similares 
                  que aparecen en múltiples niveles: desde microescala de turbulencia hasta patrones 
                  globales de circulación, revelando conexiones profundas entre el orden y el aparente caos.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-purple-700 bg-opacity-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Arquitecturas No-Lineales</h4>
                    <p className="text-sm">Modelado cuántico de comportamientos no-lineales en sistemas oceánicos acoplados</p>
                  </div>
                  <div className="bg-blue-700 bg-opacity-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Patrones Randomizados</h4>
                    <p className="text-sm">Análisis de distribuciones estocásticas que emergen de interacciones deterministas</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="relative h-80 w-full rounded-xl overflow-hidden">
                <Image
                  src="/images/quantum/ocean_fractals.jpg"
                  alt="Patrones fractales oceánicos"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-indigo-900 to-transparent opacity-60"></div>
                <div className="absolute bottom-0 left-0 p-6">
                  <p className="text-lg font-semibold">La geometría fractal revela cómo la naturaleza opera en todas las escalas con patrones similares.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tendencias Emergentes */}
      <div className="py-12 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center mb-10">Tendencias Emergentes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6 flex">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-purple-700">Miniaturización</h3>
                <p className="text-gray-700">Desarrollo de sensores cuánticos miniaturizados para mediciones oceanográficas de alta precisión, reduciendo costos y aumentando la cobertura espacial de observaciones.</p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 flex">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-blue-700">Open-Source</h3>
                <p className="text-gray-700">Creación de bibliotecas cuánticas de código abierto específicas para oceanografía, fomentando colaboración global y acelerando el desarrollo de aplicaciones innovadoras.</p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 flex">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-green-700">Data Mining</h3>
                <p className="text-gray-700">Aplicación de algoritmos cuánticos para extraer patrones ocultos en grandes repositorios de datos oceanográficos históricos y en tiempo real, revelando conexiones previamente indetectables.</p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 flex">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-indigo-700">Autoorganización</h3>
                <p className="text-gray-700">Modelos inspirados en sistemas cuánticos para comprender y simular procesos de autoorganización en ecosistemas marinos y fenómenos oceanográficos complejos.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-12">
        <div className="container mx-auto px-4">
          <QuantumOceanography />
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-purple-800 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Explora el Futuro de la Oceanografía</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Únete a nuestra comunidad pionera en la aplicación de tecnologías cuánticas para resolver los desafíos más urgentes de los océanos. Desde simulaciones avanzadas hasta procesamiento de datos a escala sin precedentes.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-white text-purple-800 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-purple-100 transition duration-300">
              Consultoría Especializada
            </button>
            <button className="bg-transparent text-white border border-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-purple-700 transition duration-300">
              Recursos Técnicos
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}