import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// Definir interfaz para los datos simplificada
interface Topic {
  title: string;
  description: string;
  keyPoints: string[];
  applications: string[];
  imagePath: string;
}

interface Category {
  name: string;
  topics: Topic[];
}

export default function InnovationComponent() {
  // Datos estáticos para el componente
  const categories: Category[] = [
    {
      name: "Enfoques Creativos",
      topics: [
        {
          title: "Design Thinking en Oceanografía",
          description: "Aplicación de metodologías de design thinking para resolver problemas complejos en ciencias marinas con un enfoque centrado en el usuario.",
          keyPoints: [
            "Procesos de ideación para desafíos oceanográficos",
            "Prototipado rápido de soluciones tecnológicas marinas",
            "Co-creación con comunidades costeras",
            "Visualización de datos complejos para diversas audiencias"
          ],
          applications: [
            "Rediseño de instrumentación oceanográfica",
            "Creación de interfaces intuitivas para monitoreo marino",
            "Soluciones frugales para investigación en contextos de recursos limitados"
          ],
          imagePath: "/images/innovation/design_thinking.png"
        },
        {
          title: "Enfoques Transdisciplinarios",
          description: "Metodologías para trascender las fronteras disciplinarias tradicionales en la investigación marina, integrando diversas formas de conocimiento.",
          keyPoints: [
            "Integración de conocimiento científico y tradicional",
            "Marcos conceptuales para colaboración entre ciencias naturales y sociales",
            "Comunicación efectiva entre disciplinas diversas",
            "Desarrollo de lenguajes comunes para problemas complejos"
          ],
          applications: [
            "Proyectos de conservación con múltiples actores",
            "Evaluaciones integradas de ecosistemas marinos",
            "Programas educativos que trascienden divisiones disciplinarias"
          ],
          imagePath: "/images/innovation/transdisciplinary.png"
        }
      ]
    },
    {
      name: "Integración de Saberes",
      topics: [
        {
          title: "Diálogo de Saberes",
          description: "Procesos y metodologías para establecer diálogos horizontales entre el conocimiento científico y los saberes locales sobre el entorno marino.",
          keyPoints: [
            "Validación conjunta de conocimientos diversos",
            "Cartografía participativa de recursos marinos",
            "Sistemas de monitoreo que integran observaciones locales",
            "Protocolos de investigación colaborativa"
          ],
          applications: [
            "Sistemas de alerta temprana basados en indicadores tradicionales",
            "Gestión pesquera que integra conocimiento local",
            "Conservación marina culturalmente apropiada"
          ],
          imagePath: "/images/innovation/scientific-local.png"
        },
        {
          title: "Recuperación de Memorias",
          description: "Preservación y activación del patrimonio inmaterial relacionado con el mar y los conocimientos tradicionales asociados a ecosistemas marinos.",
          keyPoints: [
            "Documentación de técnicas tradicionales de navegación",
            "Recuperación de taxonomías locales de especies marinas",
            "Archivos orales de relación histórica con el mar",
            "Integración de memorias en estrategias de adaptación"
          ],
          applications: [
            "Recursos educativos que valorizan saberes ancestrales",
            "Turismo cultural basado en patrimonio marítimo",
            "Líneas base históricas para restauración ecológica"
          ],
          imagePath: "/images/innovation/memory-recovery.png"
        }
      ]
    },
    {
      name: "Metodologías Futuras",
      topics: [
        {
          title: "Ciencia Ciudadana Marina",
          description: "Diseño e implementación de iniciativas que involucran al público general en la recolección y análisis de datos oceanográficos y costeros.",
          keyPoints: [
            "Plataformas digitales para participación ciudadana",
            "Control de calidad en datos generados por voluntarios",
            "Gamificación para aumentar participación",
            "Feedback efectivo a participantes"
          ],
          applications: [
            "Monitoreo de basura marina a gran escala",
            "Seguimiento de especies invasoras en zonas costeras",
            "Documentación de floraciones algales nocivas"
          ],
          imagePath: "/images/innovation/citizen-science.png"
        },
        {
          title: "Pensamiento de Futuros",
          description: "Aplicación de métodos prospectivos y escenarios futuros para anticipar cambios en sistemas marinos y desarrollar estrategias adaptativas.",
          keyPoints: [
            "Construcción participativa de escenarios oceánicos",
            "Backcasting para planificación de conservación marina",
            "Análisis de horizontes emergentes en oceanografía",
            "Narrativas transformadoras para futuros oceánicos"
          ],
          applications: [
            "Planificación de zonas costeras bajo cambio climático",
            "Desarrollo de políticas marinas anticipatorias",
            "Diseño de infraestructuras resilientes ante cambios oceanográficos"
          ],
          imagePath: "/images/innovation/futures-thinking.png"
        }
      ]
    }
  ];

  // Estados para índices numéricos (más seguros que IDs)
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [topicIndex, setTopicIndex] = useState(0);

  // Obtener categoría y tópico actual de forma segura con aserciones no-nulas
  const currentCategory = categories[categoryIndex]!;
  const currentTopic = currentCategory.topics[topicIndex]!;

  // Función para cambiar de categoría de forma segura
  const handleCategoryChange = (index: number) => {
    if (index >= 0 && index < categories.length) {
      setCategoryIndex(index);
      setTopicIndex(0); // Resetear al primer tópico
    }
  };

  // Función para cambiar de tópico de forma segura
  const handleTopicChange = (index: number) => {
    if (index >= 0 && index < currentCategory.topics.length) {
      setTopicIndex(index);
    }
  };

  return (
    <div className="space-y-8">
      {/* Nuevo: Banner destacado del Sistema de Memoria */}
      <div className="bg-gradient-to-r from-blue-50 to-teal-50 border border-teal-100 rounded-xl p-6 shadow-sm mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold text-gray-800 mb-3">Sistema de Memoria Oceanográfica</h2>
            <p className="text-gray-700 mb-4">
              Captura, organiza y desarrolla ideas relacionadas con todas las disciplinas oceanográficas. 
              Nuestro sistema de memoria te permite documentar observaciones, conceptos e innovaciones 
              potenciales, categorizarlas por disciplina y conectarlas entre sí.
            </p>
            <Link 
              href="/innovation/memory" 
              className="inline-flex items-center bg-gradient-to-r from-teal-500 to-blue-600 text-white font-medium px-5 py-2.5 rounded-lg hover:shadow-lg transition-all duration-300"
            >
              Acceder al Sistema de Memoria
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="bg-white p-4 rounded-lg shadow border border-gray-100">
              <div className="space-y-3">
                <div className="flex justify-between items-center border-b pb-2">
                  <span className="font-medium">Sistema de Memoria</span>
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">Activo</span>
                </div>
                <div className="bg-gray-50 p-2 rounded border border-gray-100">
                  <div className="text-sm font-medium">Nuevas técnicas de muestreo</div>
                  <div className="text-xs text-gray-500 mt-1">Oceanografía Química • Investigación</div>
                </div>
                <div className="bg-gray-50 p-2 rounded border border-gray-100">
                  <div className="text-sm font-medium">Efectos de turbulencia en arrecifes</div>
                  <div className="text-xs text-gray-500 mt-1">Oceanografía Física • Conservación</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        {/* Navegación de categorías */}
        <div className="mb-8 border-b">
          <nav className="flex flex-wrap space-x-2 sm:space-x-4">
            {categories.map((category, index) => (
              <button
                key={index}
                onClick={() => handleCategoryChange(index)}
                className={`pb-4 px-2 sm:px-4 text-base sm:text-lg font-medium transition-colors duration-300 ${
                  categoryIndex === index
                    ? "border-b-2 border-teal-500 text-teal-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {category.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Navegación de tópicos */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="md:col-span-1 bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Tópicos</h3>
            <nav className="space-y-2">
              {currentCategory.topics.map((topic, index) => (
                <button
                  key={index}
                  onClick={() => handleTopicChange(index)}
                  className={`w-full text-left px-3 py-2 rounded-md transition-colors duration-200 ${
                    topicIndex === index
                      ? "bg-teal-100 text-teal-700 font-medium"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {topic.title}
                </button>
              ))}
            </nav>
          </div>

          {/* Contenido del tópico */}
          <div className="md:col-span-3 bg-white">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{currentTopic.title}</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-gray-600 mb-6">{currentTopic.description}</p>
                
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Puntos Clave</h3>
                <ul className="list-disc pl-5 mb-6 space-y-2 text-gray-600">
                  {currentTopic.keyPoints.map((point, index) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>
                
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Aplicaciones</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-600">
                  {currentTopic.applications.map((app, index) => (
                    <li key={index}>{app}</li>
                  ))}
                </ul>
              </div>
              
              <div className="flex justify-center items-start">
                <div className="relative w-full h-64 lg:h-80 rounded-lg overflow-hidden">
                  {/* Usando Image directo en lugar de ImageWithFallback */}
                  <Image
                    src={currentTopic.imagePath}
                    alt={currentTopic.title}
                    fill
                    style={{ objectFit: "cover" }}
                    className="rounded-lg"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority={true}
                    onError={(e) => {
                      // Fallback simple cuando la imagen no puede cargarse
                      const target = e.target as HTMLImageElement;
                      if (target.src !== "/images/placeholder.png") {
                        target.src = "/images/placeholder.png";
                      }
                    }}
                  />
                </div>
              </div>
            </div>
            
            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-medium text-gray-800 mb-2">Laboratorio de Innovación</h3>
              <p className="text-gray-600">
                OceanInsight ofrece espacios de co-creación y talleres para desarrollar 
                soluciones innovadoras a desafíos oceanográficos. Nuestro enfoque facilita 
                la colaboración entre diversos actores y disciplinas.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <a 
                  href="#"
                  className="inline-block bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-300"
                >
                  Solicitar Taller de Innovación
                </a>
                
                <Link 
                  href="/innovation/memory"
                  className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-300"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  Sistema de Memoria
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Nuevo: Sección adicional destacando el sistema de memoria */}
      <div className="bg-white rounded-lg shadow-lg p-6 mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">¿Por qué usar nuestro Sistema de Memoria?</h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-teal-100 text-teal-600 mt-1">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-medium text-gray-800">Captura de Ideas Rápida</h3>
                  <p className="text-gray-600">Documenta tus ideas oceanográficas de forma estructurada en el momento que surgen.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-teal-100 text-teal-600 mt-1">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-medium text-gray-800">Organización por Disciplinas</h3>
                  <p className="text-gray-600">Clasifica tus ideas por categorías oceanográficas y etiquetas personalizadas.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-teal-100 text-teal-600 mt-1">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-medium text-gray-800">Evolución de Conceptos</h3>
                  <p className="text-gray-600">Sigue el desarrollo de tus ideas desde borradores iniciales hasta implementación.</p>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <Link
                href="/innovation/memory"
                className="inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-teal-500 text-white font-medium px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-300 w-full md:w-auto"
              >
                Comenzar a usar el Sistema de Memoria
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>
          
          <div className="flex items-center justify-center">
            <div className="bg-gray-50 rounded-xl shadow-sm p-6 max-w-md w-full border border-gray-100">
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b pb-2">
                  <span className="font-medium text-gray-800">Ejemplo de Sistema de Memoria</span>
                </div>
                <div className="bg-white p-3 rounded-lg border border-gray-200">
                  <div className="text-teal-600 text-xs font-medium mb-1">Oceanografía Física</div>
                  <div className="text-base font-medium mb-2">Interacción entre remolinos y ondas internas</div>
                  <div className="text-sm text-gray-600 line-clamp-2">Observaciones sobre el efecto de remolinos mesoscalares en la propagación y disipación de ondas internas en el Pacífico tropical.</div>
                  <div className="flex gap-1 mt-2">
                    <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded">remolinos</span>
                    <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded">ondas</span>
                    <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded">pacífico</span>
                  </div>
                </div>
                <div className="bg-white p-3 rounded-lg border border-gray-200">
                  <div className="text-green-600 text-xs font-medium mb-1">Biología Marina</div>
                  <div className="text-base font-medium mb-2">Adaptaciones de corales en zonas de surgencia</div>
                  <div className="text-sm text-gray-600 line-clamp-2">Hipótesis sobre mecanismos adaptativos de comunidades coralinas en zonas con temperatura variable por surgencias estacionales.</div>
                  <div className="flex gap-1 mt-2">
                    <span className="text-xs bg-green-50 text-green-600 px-2 py-0.5 rounded">corales</span>
                    <span className="text-xs bg-green-50 text-green-600 px-2 py-0.5 rounded">surgencia</span>
                  </div>
                </div>
                <div className="text-center pt-2">
                  <Link href="/innovation/memory" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    Ver más ejemplos →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}