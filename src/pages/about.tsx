import Image from "next/image";
import Layout from "~/components/layout/Layout";

export default function About() {
  // Testimonios de usuarios
  const testimonials = [
    {
      quote: "La plataforma OceanInsight ha revolucionado la forma en que enseñamos oceanografía a nuestros estudiantes.",
      author: "Dra. María Rodríguez",
      position: "Profesora de Ciencias Marinas, Universidad de Santiago",
      image: "/images/testimonials/maria.jpg"
    },
    {
      quote: "Un recurso invaluable para quienes trabajamos en conservación marina. Los datos y análisis son de primer nivel.",
      author: "Carlos Vega",
      position: "Director de Proyectos, Fundación Océano Azul",
      image: "/images/testimonials/carlos.jpg"
    },
    {
      quote: "La integración de IA con oceanografía que ofrece OceanInsight nos ha permitido resolver problemas complejos de modelado.",
      author: "Dr. James Wong",
      position: "Investigador, Instituto Oceanográfico Internacional",
      image: "/images/testimonials/james.jpg"
    }
  ];
  
  // Datos del fundador basados en el CV
  const founder = {
    name: "MSc. Diego Hernández-Cerón",
    title: "Oceanógrafo y Desarrollador",
    image: "/images/founder/creador.jpeg",
    bio: "Oceanógrafo especializado en investigación antártica, análisis de datos marinos y desarrollo de herramientas tecnológicas para visualización y modelamiento oceanográfico. Integro la ciencia del océano con las tecnologías emergentes para generar soluciones accesibles y de impacto en el conocimiento marino global.",
    contact: {
      email: "diego.jhc@gmail.com",
      phone: "+569 32104924"
    },
    education: [
      {
        degree: "Magíster en Oceanografía",
        institution: "Pontificia Universidad Católica de Valparaíso / Universidad de Valparaíso",
        year: "2023",
        thesis: "Bottom-up controls on summer phytoplankton dynamics in the surface waters of the Gerlache-Bismarck Strait area, Western Antarctic Peninsula"
      },
      {
        degree: "Oceanógrafo",
        institution: "Pontificia Universidad Católica de Valparaíso",
        year: "2015",
        thesis: "Submarine landforms in fjords and bays of the Gerlache Strait, Western Antarctic Peninsula"
      }
    ],
    experience: [
      {
        position: "Estudiante de Doctorado",
        company: "Alfred Wegener Institute (AWI), Bremerhaven, Alemania",
        period: "Abril 2024 - Agosto 2024",
        description: "Investigación para el proyecto 'The effect of land-runoff on Antarctic coastal habitats'. Uso y calibración de sensores multiparamétricos, procesamiento de datos CTD y de imágenes de drones."
      },
      {
        position: "Investigador",
        company: "FONDECYT / FONDAP-IDEAL",
        period: "2021 - 2023",
        description: "Investigación sobre dinámica del fitoplancton y procesos biogeoquímicos en aguas antárticas. Participación en expediciones científicas."
      },
      {
        position: "Analista de Datos Oceanográficos",
        company: "Proyectos diversos",
        period: "2017 - 2019",
        description: "Procesamiento de datos batimétricos multihaz y análisis oceanográficos para proyectos nacionales e internacionales."
      },
      {
        position: "Fundador y Director",
        company: "OceanInsight",
        period: "2024 - Presente",
        description: "Creación de una plataforma integradora de conocimiento oceanográfico con herramientas de IA para facilitar el acceso a información científica."
      }
    ],
    skills: [
      {
        category: "Análisis de Datos",
        tools: ["R/RStudio (Avanzado)", "Python/Matlab (Intermedio)", "Análisis estadístico multivariado", "Series de tiempo"]
      },
      {
        category: "Oceanografía",
        tools: ["Ocean Data View", "Modelos oceanográficos", "Ecopath with Ecosim", "Ichthyop"]
      },
      {
        category: "Geoespacial",
        tools: ["ArcGIS Pro", "Global Mapper", "CARIS-HIPS/Fledermaus", "DJI Terra", "Pix4D"]
      },
      {
        category: "Tecnologías Emergentes",
        tools: ["Inteligencia artificial aplicada", "Visualización de datos", "Data mining"]
      }
    ],
    expeditions: [
      {
        name: "CIMAR 28 Islas Oceánicas",
        date: "Septiembre - Octubre 2023",
        description: "Muestreo de contaminantes orgánicos persistentes en el Pacífico Sur abierto, incluyendo Islas Desventuradas y Juan Fernández."
      },
      {
        name: "Expedición Antártica ECA-58",
        date: "Octubre 2021 - Enero 2022",
        description: "Investigación oceanográfica en Bahía Maxwell, recolección de datos sobre clorofila, nutrientes y bacterioplancton."
      },
      {
        name: "Expedición Antártica OPERANTAR XXXIV",
        date: "Octubre - Noviembre 2015",
        description: "Adquisición de datos batimétricos, muestreo de sedimentos y estudios en el Paso Drake y Estrecho de Bransfield."
      }
    ],
    publications: [
      "Participación en 'The biogeochemistry of ocean-ice interaction around Greenland', financiado por Deutsche Forschungsgemeinschaft (DFG).",
      "Presentaciones en el Workshop WAPSA-SOOS 2020, Congreso de Ciencias del Mar y X Congreso Antártico INACH."
    ],
    awards: [
      {
        name: "Beca Nacional de Magíster ANID",
        year: "2020-2022",
        organization: "Agencia Nacional de Investigación y Desarrollo"
      },
      {
        name: "Financiamiento FONDAP-IDEAL",
        year: "2021-2023",
        organization: "Centro de Investigación Dinámica de Ecosistemas Marinos de Altas Latitudes"
      }
    ],
    teaching: [
      {
        position: "Docente Asistente",
        courses: ["Ecología Bentónica", "Ecología de Comunidades Marinas"],
        institution: "PUCV",
        period: "2022-2023"
      }
    ],
    mission: "Mi misión es democratizar el acceso al conocimiento oceanográfico mediante herramientas tecnológicas modernas, combinando la rigurosidad científica con la innovación digital para acercar la ciencia del océano a estudiantes, investigadores y al público general."
  };
  
  // Hitos en la historia de OceanInsight
  const milestones = [
    {
      year: "2024",
      title: "Fundación de OceanInsight",
      description: "Inicio del proyecto como una plataforma educativa sobre oceanografía, integrando conocimientos científicos con tecnologías modernas."
    },
    {
      year: "2024",
      title: "Lanzamiento de los Módulos Base",
      description: "Implementación de los módulos de oceanografía física, química y biológica con visualizaciones interactivas."
    },
    {
      year: "2024",
      title: "Módulo de Oceanografía Geológica",
      description: "Desarrollo del módulo completo de oceanografía geológica con visualizaciones de batimetría y rasgos geomorfológicos submarinos."
    },
    {
      year: "2025",
      title: "Integración de Computación Cuántica",
      description: "Implementación pionera de herramientas basadas en computación cuántica para modelamiento oceanográfico avanzado."
    }
  ];

  // Valores fundamentales del proyecto
  const values = [
    {
      title: "Rigor Científico",
      description: "Compromiso con la precisión y validez científica en todos nuestros contenidos, basados en investigación actual.",
      icon: "🔬"
    },
    {
      title: "Innovación Tecnológica",
      description: "Integración constante de nuevas tecnologías para mejorar la comprensión y visualización de datos oceanográficos complejos.",
      icon: "💡"
    },
    {
      title: "Accesibilidad",
      description: "Democratización del conocimiento oceanográfico para que sea accesible a investigadores, estudiantes y público general.",
      icon: "🌐"
    },
    {
      title: "Sostenibilidad",
      description: "Promoción de la conservación de los océanos a través de la educación y divulgación científica responsable.",
      icon: "🌊"
    }
  ];
  
  return (
    <Layout 
      title="Sobre Nosotros - OceanInsight" 
      description="Conoce al fundador de OceanInsight y la historia detrás de nuestra plataforma de consultoría oceanográfica."
    >
      <div className="py-12 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">Nuestra Historia</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Descubre la visión y pasión detrás de OceanInsight, donde la ciencia oceanográfica se une con la tecnología moderna.
            </p>
          </div>
          
          {/* Fundador Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
            <div className="order-2 md:order-1">
              <h2 className="text-3xl font-bold text-blue-800 mb-4">El Fundador</h2>
              <h3 className="text-2xl text-blue-600 mb-6">{founder.name}</h3>
              <p className="text-gray-700 mb-6">{founder.bio}</p>
              <p className="text-gray-700 mb-8 italic border-l-4 border-blue-400 pl-4">
                "{founder.mission}"
              </p>
              
              <div className="space-y-3">
                {founder.education.map((edu, index) => (
                  <div key={index} className="flex items-start">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm mr-3">
                      {edu.year}
                    </span>
                    <div>
                      <h4 className="font-medium">{edu.degree}</h4>
                      <p className="text-sm text-gray-500">{edu.institution}</p>
                      <p className="text-xs text-gray-500 mt-1 italic">{edu.thesis}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="order-1 md:order-2 flex justify-center">
              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white shadow-xl">
                {/* Imagen del fundador */}
                <Image 
                  src={founder.image} 
                  alt={founder.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 256px, 320px"
                />
              </div>
            </div>
          </div>
          
          {/* Valores Section */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-blue-800 text-center mb-12">Nuestros Valores</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                  <div className="text-4xl mb-4">{value.icon}</div>
                  <h3 className="text-xl font-semibold text-blue-700 mb-2">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Historia Personal */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-blue-800 text-center mb-8">La Historia Detrás de OceanInsight</h2>
            
            <div className="bg-white rounded-lg shadow-md p-8">
              <div className="prose prose-blue max-w-none">
                <p className="text-gray-700 mb-4">
                  OceanInsight nació de un momento personal de transformación y resiliencia. Tras regresar a Chile después de una experiencia desafiante intentando realizar un doctorado en Alemania, donde enfrenté barreras lingüísticas y dificultades con mis supervisores, me encontraba en un punto de inflexión profesional.
                </p>
                <p className="text-gray-700 mb-4">
                  Este proyecto surgió de la necesidad de crear un espacio que reflejara genuinamente mi trayectoria académica y profesional. Sentía que no existía un repositorio completo de todo lo que había desarrollado durante mi carrera, y quería generar una plataforma open-source que pudiera visitar regularmente, y que también permitiera a otros reconocer mi formación y experiencia.
                </p>
                <p className="text-gray-700 mb-4">
                  Durante un período de recuperación emocional y redescubrimiento personal, encontré en la inteligencia artificial una herramienta poderosa que me permitía expandir mis ideas sin depender de la validación externa. Comencé un proceso de independización de mi pensamiento, construyendo mi propio camino como oceanógrafo multidisciplinario.
                </p>
                <p className="text-gray-700 mb-4">
                  OceanInsight representa no solo un recurso para compartir conocimiento oceanográfico, sino también un testimonio de resiliencia personal. La dificultad para encontrar oportunidades laborales me llevó a reconocer que mi perfil profesional necesitaba mayor visibilidad, y que debía construir mis propios espacios de colaboración e intercambio científico.
                </p>
                <p className="text-gray-700">
                  Esta plataforma es, en esencia, un puente entre mi experiencia personal y mi vocación científica, transformando los desafíos en oportunidades para democratizar el conocimiento oceanográfico y construir una comunidad basada en el valor del conocimiento compartido.
                </p>
              </div>
            </div>
          </div>

          {/* Cronología Section */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-blue-800 text-center mb-12">Nuestra Cronología</h2>
            
            <div className="relative">
              {/* Línea temporal */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-200"></div>
              
              {/* Hitos */}
              <div className="space-y-16">
                {milestones.map((milestone, index) => (
                  <div key={index} className={`relative flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                    <div className="w-5/12"></div>
                    
                    {/* Punto central */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-blue-500 rounded-full border-4 border-white shadow z-10">
                      <span className="sr-only">{milestone.year}</span>
                    </div>
                    
                    {/* Contenido */}
                    <div className="w-5/12 bg-white p-6 rounded-lg shadow-md">
                      <span className="inline-block px-4 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-2">
                        {milestone.year}
                      </span>
                      <h3 className="text-xl font-semibold text-blue-700 mb-2">{milestone.title}</h3>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Experiencia Section */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-blue-800 text-center mb-12">Trayectoria Profesional</h2>
            
            <div className="space-y-8">
              {founder.experience.map((exp, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-blue-800">{exp.position}</h3>
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                      {exp.period}
                    </span>
                  </div>
                  <h4 className="text-gray-700 font-medium mb-4">{exp.company}</h4>
                  <p className="text-gray-600">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Expediciones Section */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-blue-800 text-center mb-12">Expediciones Científicas</h2>
            
            <div className="grid grid-cols-1 gap-6">
              {founder.expeditions.map((expedition, index) => (
                <div key={index} className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-6 border border-blue-200">
                  <div className="flex flex-col md:flex-row justify-between mb-3">
                    <h3 className="text-xl font-semibold text-blue-800">{expedition.name}</h3>
                    <span className="text-sm font-medium text-blue-600 mt-1 md:mt-0">{expedition.date}</span>
                  </div>
                  <p className="text-gray-700">{expedition.description}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Habilidades Section */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-blue-800 text-center mb-12">Expertise Técnico</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {founder.skills.map((skillCategory, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-semibold text-blue-700 mb-4">{skillCategory.category}</h3>
                  <ul className="space-y-2">
                    {skillCategory.tools.map((tool, toolIndex) => (
                      <li key={toolIndex} className="flex items-start">
                        <svg className="w-5 h-5 text-blue-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        {tool}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          
          {/* Docencia Section */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-blue-800 text-center mb-12">Experiencia Docente</h2>
            
            <div className="bg-white rounded-lg shadow-md p-8">
              {founder.teaching.map((teachingExp, index) => (
                <div key={index} className="mb-6 last:mb-0">
                  <h3 className="text-xl font-semibold text-blue-700 mb-2">{teachingExp.position}</h3>
                  <p className="text-gray-600 mb-1"><span className="font-medium">Institución:</span> {teachingExp.institution}</p>
                  <p className="text-gray-600 mb-1"><span className="font-medium">Período:</span> {teachingExp.period}</p>
                  <p className="text-gray-600 mb-1"><span className="font-medium">Cursos:</span></p>
                  <ul className="list-disc list-inside ml-4 text-gray-600">
                    {teachingExp.courses.map((course, courseIndex) => (
                      <li key={courseIndex}>{course}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          
          {/* Reconocimientos Section */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-blue-800 text-center mb-12">Reconocimientos y Financiamiento</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {founder.awards.map((award, index) => (
                <div key={index} className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 border border-blue-200">
                  <div className="text-3xl text-yellow-500 mb-4">🏆</div>
                  <h3 className="text-lg font-semibold text-blue-800 mb-2">{award.name}</h3>
                  <p className="text-sm text-gray-600 mb-1">{award.organization}</p>
                  <p className="text-sm font-medium text-blue-600">{award.year}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Publicaciones Section */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-blue-800 text-center mb-12">Publicaciones y Participaciones</h2>
            
            <div className="bg-white rounded-lg shadow-md p-8">
              <ul className="space-y-6">
                {founder.publications.map((pub, index) => (
                  <li key={index} className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                    <p className="text-gray-700">
                      {pub}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* Testimonios Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-blue-800 text-center mb-12">Lo que dicen de nosotros</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6 flex flex-col">
                  <div className="flex-grow">
                    <p className="italic text-gray-600 mb-6">"{testimonial.quote}"</p>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-blue-200 flex-shrink-0 mr-4">
                      <div className="w-full h-full relative">
                        <Image 
                          src={testimonial.image} 
                          alt={testimonial.author}
                          fill
                          className="object-cover"
                          sizes="48px"
                        />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-blue-800">{testimonial.author}</h4>
                      <p className="text-sm text-gray-500">{testimonial.position}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Contacto Section */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-16">
            <h2 className="text-3xl font-bold text-blue-800 text-center mb-8">Información de Contacto</h2>
            
            <div className="flex flex-col md:flex-row justify-center space-y-6 md:space-y-0 md:space-x-12">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mr-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-800">Email</h3>
                  <a href={`mailto:${founder.contact.email}`} className="text-blue-600 hover:underline">
                    {founder.contact.email}
                  </a>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mr-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-800">Teléfono</h3>
                  <a href={`tel:${founder.contact.phone}`} className="text-blue-600 hover:underline">
                    {founder.contact.phone}
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          {/* Call to Action */}
          <div className="text-center">
            <h2 className="text-2xl font-bold text-blue-900 mb-6">¿Quieres formar parte de nuestra historia?</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Únete a nosotros en nuestra misión de democratizar el conocimiento oceanográfico y contribuir a un mejor entendimiento de nuestros océanos.
            </p>
            <div className="flex justify-center space-x-4">
              <a href="/contact" className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-md transition-colors duration-300">
                Contáctanos
              </a>
              <a href="/donate" className="bg-white hover:bg-gray-50 text-blue-600 font-medium py-3 px-6 rounded-md border border-blue-600 transition-colors duration-300">
                Apóyanos
              </a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}