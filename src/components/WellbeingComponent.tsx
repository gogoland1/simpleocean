import React, { useState } from "react";
import Image from "next/image";

// Definir interfaz para los datos
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

export default function WellbeingComponent() {
  // Datos estáticos para el componente
  const categories: Category[] = [
    {
      name: "Salud Mental",
      topics: [
        {
          title: "Manejo del Estrés",
          description: "Estrategias y herramientas para gestionar el estrés asociado con el trabajo de campo, investigación y publicación académica en ciencias marinas.",
          keyPoints: [
            "Técnicas de mindfulness adaptadas al entorno marino",
            "Planificación y gestión del tiempo en proyectos oceánicos",
            "Protocolos para manejar el estrés en expediciones prolongadas",
            "Equilibrio entre la vida profesional y personal en la carrera científica"
          ],
          applications: [
            "Programas de reducción de estrés para expediciones científicas",
            "Talleres virtuales para investigadores en locaciones remotas",
            "Aplicaciones móviles para seguimiento de bienestar durante campañas"
          ],
          imagePath: "/images/wellbeing/stress-management.png"
        },
        {
          title: "Prevención del Burnout",
          description: "Identificación temprana y prevención del agotamiento profesional en científicos marinos, con especial atención a jóvenes investigadores.",
          keyPoints: [
            "Señales de alerta temprana del burnout académico",
            "Estrategias de autocuidado para investigadores",
            "Reestructuración de rutinas de trabajo científico",
            "Importancia de los periodos de descanso en la productividad"
          ],
          applications: [
            "Programas de mentoría con enfoque en bienestar",
            "Políticas institucionales para prevenir el agotamiento",
            "Comunidades de apoyo entre pares científicos"
          ],
          imagePath: "/images/wellbeing/burnout-prevention.png"
        }
      ]
    },
    {
      name: "Clima Laboral",
      topics: [
        {
          title: "Entornos Inclusivos",
          description: "Creación y mantenimiento de ambientes de trabajo inclusivos y respetuosos en instituciones oceanográficas y equipos de investigación.",
          keyPoints: [
            "Prácticas para la inclusión de género y diversidad",
            "Comunicación efectiva en equipos multiculturales",
            "Estrategias anti-acoso en contextos académicos",
            "Accesibilidad en instalaciones de investigación marina"
          ],
          applications: [
            "Protocolos de inclusión para expediciones científicas",
            "Programas de entrenamiento en diversidad para líderes de equipos",
            "Evaluaciones de clima laboral en instituciones oceanográficas"
          ],
          imagePath: "/images/wellbeing/inclusive-environments.png"
        },
        {
          title: "Resolución de Conflictos",
          description: "Metodologías y herramientas para la resolución constructiva de conflictos en entornos científicos colaborativos.",
          keyPoints: [
            "Mediación en disputas de autoría científica",
            "Gestión de desacuerdos metodológicos",
            "Comunicación no violenta en ambientes académicos",
            "Construcción de acuerdos en proyectos multidisciplinarios"
          ],
          applications: [
            "Protocolos de mediación para institutos de investigación",
            "Formación en resolución de conflictos para líderes de proyectos",
            "Sistemas de gestión temprana de tensiones en equipos científicos"
          ],
          imagePath: "/images/wellbeing/conflict-resolution.png"
        }
      ]
    },
    {
      name: "Equilibrio Laboral",
      topics: [
        {
          title: "Carreras Sostenibles",
          description: "Desarrollo de trayectorias profesionales sostenibles en oceanografía, compatible con el bienestar personal y familiar.",
          keyPoints: [
            "Planificación de carrera a largo plazo",
            "Alternativas de trabajo flexible en ciencias marinas",
            "Transiciones profesionales en la oceanografía",
            "Adaptación a diferentes etapas de la vida profesional"
          ],
          applications: [
            "Programas de desarrollo profesional con enfoque en sostenibilidad",
            "Modelos de trabajo híbrido para investigadores",
            "Políticas de apoyo familiar en instituciones oceanográficas"
          ],
          imagePath: "/images/wellbeing/sustainable-careers.png"
        },
        {
          title: "Bienestar Digital",
          description: "Estrategias para mantener un equilibrio saludable con la tecnología en el trabajo científico y la conectividad permanente.",
          keyPoints: [
            "Gestión saludable del correo electrónico y comunicaciones",
            "Desconexión digital durante periodos de descanso",
            "Optimización del trabajo remoto",
            "Ergonomía digital en el trabajo científico"
          ],
          applications: [
            "Protocolos de comunicación asincrónica para equipos globales",
            "Herramientas de gestión del tiempo digital",
            "Políticas institucionales de respeto a horarios no laborales"
          ],
          imagePath: "/images/wellbeing/digital-wellbeing.png"
        }
      ]
    }
  ];

  // Estados para índices (más seguros que IDs)
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [topicIndex, setTopicIndex] = useState(0);

  // Obtener categoría y tópico actual de forma segura
  const currentCategory = categories[categoryIndex]!; // Aserción no-nula
  const currentTopic = currentCategory.topics[topicIndex]!; // Aserción no-nula

  // Función para cambiar de categoría de forma segura
  const handleCategoryChange = (index: number) => {
    // Verificar que el índice está dentro de límites
    if (index >= 0 && index < categories.length) {
      setCategoryIndex(index);
      // Resetear al primer tópico de la nueva categoría
      setTopicIndex(0);
    }
  };

  // Función para cambiar de tópico de forma segura
  const handleTopicChange = (index: number) => {
    // Verificar que el índice está dentro de límites
    if (index >= 0 && index < currentCategory.topics.length) {
      setTopicIndex(index);
    }
  };

  return (
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
                  ? "border-b-2 border-cyan-500 text-cyan-600"
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
                    ? "bg-cyan-100 text-cyan-700 font-medium"
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
                {/* Usando Image directamente en lugar de ImageWithFallback */}
                <Image
                  src={currentTopic.imagePath}
                  alt={currentTopic.title}
                  fill
                  style={{ objectFit: "cover" }}
                  className="rounded-lg"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={true}
                  // Fallback manual si la imagen falla
                  onError={(e) => {
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
            <h3 className="text-lg font-medium text-gray-800 mb-2">Recursos Adicionales</h3>
            <p className="text-gray-600">
              Consulta con nuestros especialistas para obtener más información sobre programas 
              de bienestar específicos para tu institución o equipo de investigación marina.
            </p>
            <div className="mt-4">
              <a 
                href="#"
                className="inline-block bg-cyan-600 hover:bg-cyan-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-300"
              >
                Solicitar Consulta
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}