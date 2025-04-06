import React from 'react';
import Layout from '../components/layout/Layout';
import GeologicalOceanography from '../components/GeologicalOceanography';
import Image from 'next/image';
import Link from 'next/link';

const GeologicalPage = () => {
  return (
    <Layout 
      title="Oceanografía Geológica - OceanInsight"
      description="Explora los procesos geológicos submarinos, formaciones y recursos del fondo oceánico con nuestra plataforma de consultoría especializada"
    >
      {/* Hero section */}
      <div className="relative bg-ocean-900">
        <div className="absolute inset-0 overflow-hidden opacity-30">
          <Image 
            src="/images/geology/strata.png" 
            alt="Estratificación geológica marina" 
            layout="fill" 
            objectFit="cover" 
            priority
          />
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Oceanografía Geológica
          </h1>
          <p className="mt-6 max-w-3xl text-xl text-ocean-100">
            Descubre los secretos del fondo marino a través del estudio de sus procesos geológicos, formaciones y recursos. Nuestro equipo especializado ofrece análisis y asesoría respaldados por las tecnologías más avanzadas.
          </p>
        </div>
      </div>

      {/* Introducción */}
      <div className="bg-white py-16 px-4 overflow-hidden sm:px-6 lg:px-8 lg:py-24">
        <div className="relative max-w-xl mx-auto">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Explorando el Mundo Submarino
            </h2>
            <p className="mt-4 text-lg leading-7 text-gray-500">
              La oceanografía geológica estudia los procesos que han dado forma al fondo oceánico a lo largo de millones de años. Desde las enormes cordilleras submarinas hasta los diminutos sedimentos, cada elemento cuenta una historia sobre nuestro planeta.
            </p>
          </div>
        </div>
      </div>

      {/* Características principales */}
      <div className="bg-ocean-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-ocean-600 font-semibold tracking-wide uppercase">
              Nuestras capacidades
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Experiencia integral en geología marina
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Ofrecemos análisis especializados y soluciones adaptadas a las necesidades específicas de investigadores, empresas e instituciones.
            </p>
          </div>

          <div className="mt-10">
            <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              <div className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-ocean-700 text-white">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Exploración submarina</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  Utilización de tecnologías avanzadas como batimetría multihaz, sonar de barrido lateral y sísmica de reflexión para mapear el fondo marino con alta precisión.
                </dd>
              </div>

              <div className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-ocean-700 text-white">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Análisis sedimentológico</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  Caracterización de sedimentos marinos, su distribución, composición y procesos de transporte para comprender la evolución de cuencas oceánicas.
                </dd>
              </div>

              <div className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-ocean-700 text-white">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Evaluación de recursos</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  Identificación y evaluación de recursos minerales submarinos, desde nódulos polimetálicos hasta hidratos de metano, con enfoque en sostenibilidad.
                </dd>
              </div>

              <div className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-ocean-700 text-white">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Riesgos geológicos</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  Evaluación de peligros naturales submarinos como deslizamientos, tsunamis y vulcanismo para prevención y mitigación de desastres en zonas costeras.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      {/* Módulo principal */}
      <GeologicalOceanography />
      
      {/* Destacados de Imágenes */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Técnicas de Exploración Destacadas</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Batimetría Multihaz */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative h-64">
                <Image 
                  src="/images/geology/multibeam.png" 
                  alt="Batimetría multihaz del fondo marino" 
                  layout="fill" 
                  objectFit="cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-ocean-700 mb-2">Batimetría Multihaz</h3>
                <p className="text-gray-700">
                  Técnica acústica avanzada que permite mapear el fondo marino con alta resolución utilizando múltiples haces de sonido. Proporciona datos detallados sobre la topografía submarina, esencial para la navegación, exploración y estudios geológicos.
                </p>
              </div>
            </div>
            
            {/* Sedimentación Marina */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative h-64">
                <Image 
                  src="/images/geology/strata.png" 
                  alt="Procesos de sedimentación marina y estratigrafía" 
                  layout="fill" 
                  objectFit="cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-ocean-700 mb-2">Sedimentación Marina</h3>
                <p className="text-gray-700">
                  Estudio de los procesos de deposición, transporte y acumulación de sedimentos en el fondo oceánico. El análisis estratigráfico de estos sedimentos proporciona información valiosa sobre la historia geológica y las condiciones climáticas del pasado.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sección de servicios de consultoría */}
      <div className="bg-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-ocean-600 font-semibold tracking-wide uppercase">
              Servicios de consultoría
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Soluciones para cada necesidad
            </p>
          </div>

          <div className="mt-10">
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
              <div className="bg-ocean-50 overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Cartografía marina
                  </h3>
                  <div className="mt-2 max-w-xl text-sm text-gray-500">
                    <p>
                      Levantamientos batimétricos de alta resolución y mapas temáticos del fondo marino para proyectos científicos e industriales.
                    </p>
                  </div>
                  <div className="mt-5">
                    <Link href="/services/marine-mapping" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-ocean-600 hover:bg-ocean-700">
                      Más información
                    </Link>
                  </div>
                </div>
              </div>

              <div className="bg-ocean-50 overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Estudios de impacto
                  </h3>
                  <div className="mt-2 max-w-xl text-sm text-gray-500">
                    <p>
                      Evaluación de impacto ambiental para infraestructuras submarinas, dragados y otras actividades en el entorno marino.
                    </p>
                  </div>
                  <div className="mt-5">
                    <Link href="/services/impact-studies" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-ocean-600 hover:bg-ocean-700">
                      Más información
                    </Link>
                  </div>
                </div>
              </div>

              <div className="bg-ocean-50 overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Asesoría especializada
                  </h3>
                  <div className="mt-2 max-w-xl text-sm text-gray-500">
                    <p>
                      Consultoría técnica para proyectos de investigación, exploración de recursos y planificación espacial marina.
                    </p>
                  </div>
                  <div className="mt-5">
                    <Link href="/services/specialized-consulting" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-ocean-600 hover:bg-ocean-700">
                      Más información
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA - Contacto */}
      <div className="bg-ocean-700">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            <span className="block text-white">¿Listo para explorar las profundidades?</span>
            <span className="block text-ocean-200">Contáctanos hoy mismo.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Link href="#" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-ocean-700 bg-white hover:bg-ocean-50">
                Solicitar consulta
              </Link>
            </div>
            <div className="ml-3 inline-flex rounded-md shadow">
              <Link href="#" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-ocean-600 hover:bg-ocean-500">
                Recursos gratuitos
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default GeologicalPage;