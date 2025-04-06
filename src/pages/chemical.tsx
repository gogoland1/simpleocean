import type { NextPage } from "next";
import Link from "next/link";
import Layout from "~/components/layout/Layout";

const ChemicalOceanography: NextPage = () => {
  // Secciones principales basadas en el libro de Susan Libes
  const mainSections = [
    {
      title: "Fisicoquímica del Agua de Mar",
      description: "Propiedades, composición y procesos químicos fundamentales del agua marina",
      icon: "🧪",
      topics: [
        { name: "La Fábrica Corteza-Océano-Atmósfera", link: "/chemical/crust-ocean-atmosphere" },
        { name: "Las Aguas del Mar", link: "/chemical/seawater" },
        { name: "La Sal Marina más allá del NaCl", link: "/chemical/sea-salt" },
        { name: "Salinidad como Trazador Conservativo", link: "/chemical/salinity" },
        { name: "Transformaciones Químicas en el Océano", link: "/chemical/chemical-transformations" },
        { name: "Solubilidad de Gases e Intercambio Aire-Mar", link: "/chemical/gas-exchange" },
      ]
    },
    {
      title: "Química Redox del Agua de Mar",
      description: "Procesos de oxidación-reducción y su impacto en los ecosistemas marinos",
      icon: "⚗️",
      topics: [
        { name: "La Importancia del Oxígeno", link: "/chemical/oxygen" },
        { name: "Materia Orgánica: Producción y Destrucción", link: "/chemical/organic-matter" },
        { name: "Segregación Vertical de Elementos Biolimitantes", link: "/chemical/vertical-segregation" },
        { name: "Segregación Horizontal de Elementos Biolimitantes", link: "/chemical/horizontal-segregation" },
        { name: "Elementos Traza en el Agua de Mar", link: "/chemical/trace-elements" },
        { name: "Diagénesis", link: "/chemical/diagenesis" },
      ]
    },
    {
      title: "Química de Sedimentos Marinos",
      description: "Composición, formación y procesos químicos en los sedimentos oceánicos",
      icon: "🏝️",
      topics: [
        { name: "Clasificación de Sedimentos", link: "/chemical/sediment-classification" },
        { name: "Minerales de Arcilla y Silicatos Detríticos", link: "/chemical/clay-minerals" },
        { name: "Calcita, Alcalinidad y pH del Agua de Mar", link: "/chemical/calcite-alkalinity" },
        { name: "Sílice Biogénica", link: "/chemical/biogenic-silica" },
        { name: "Evaporitas", link: "/chemical/evaporites" },
        { name: "Nódulos de Hierro-Manganeso y Minerales Hidrógenos", link: "/chemical/fe-mn-nodules" },
        { name: "Sedimentos Metalíferos y Depósitos Hidrotermales", link: "/chemical/metalliferous-sediments" },
        { name: "Patrón Global de Distribución de Sedimentos", link: "/chemical/sediment-distribution" },
        { name: "Por qué el Agua de Mar es Salada pero no Demasiado", link: "/chemical/seawater-salinity" },
      ]
    },
    {
      title: "Biogeoquímica Orgánica",
      description: "Ciclos biogeoquímicos y transformaciones de compuestos orgánicos en el océano",
      icon: "🌱",
      topics: [
        { name: "Biogeoquímica Marina: Una Visión General", link: "/chemical/biogeochemistry-overview" },
        { name: "Producción y Destrucción de Compuestos Orgánicos", link: "/chemical/organic-compounds" },
        { name: "Ciclos Marinos de Nitrógeno y Fósforo", link: "/chemical/n-p-cycles" },
        { name: "Ciclo del Carbono Marino y Cambio Climático", link: "/chemical/carbon-cycle" },
        { name: "Origen del Petróleo en el Ambiente Marino", link: "/chemical/petroleum-origin" },
        { name: "Productos Orgánicos del Mar", link: "/chemical/organic-products" },
      ]
    },
    {
      title: "Contaminación Marina",
      description: "Impactos antropogénicos en la química oceánica y sus consecuencias",
      icon: "🏭",
      topics: [
        { name: "Contaminación Marina: El Océano como Espacio de Residuos", link: "/chemical/marine-pollution" },
        { name: "Contaminantes Emergentes", link: "/chemical/emerging-contaminants" },
        { name: "Microplásticos en el Océano", link: "/chemical/microplastics" },
        { name: "Acidificación Oceánica", link: "/chemical/ocean-acidification" },
        { name: "Monitoreo y Análisis de Contaminantes", link: "/chemical/contaminant-monitoring" },
      ]
    },
  ];

  // Herramientas y recursos analíticos
  const analyticalTools = [
    {
      name: "Modelado de Química Marina",
      description: "Simulaciones numéricas de procesos químicos oceánicos y ciclos biogeoquímicos",
      icon: "💻"
    },
    {
      name: "Técnicas Analíticas",
      description: "Métodos avanzados para análisis químico de agua de mar y sedimentos",
      icon: "🔬"
    },
    {
      name: "Sensores Químicos",
      description: "Tecnologías para monitoreo continuo de parámetros químicos en el océano",
      icon: "📡"
    },
    {
      name: "Trazadores Químicos",
      description: "Uso de elementos y compuestos como marcadores de procesos oceanográficos",
      icon: "🔍"
    },
    {
      name: "Análisis Isotópico",
      description: "Aplicaciones de isótopos estables y radiactivos en oceanografía química",
      icon: "⚛️"
    },
  ];

  // Aplicaciones prácticas
  const applications = [
    {
      name: "Evaluación de Calidad de Agua",
      description: "Análisis químico para determinar la salud de ecosistemas marinos",
    },
    {
      name: "Ciclos Biogeoquímicos y Clima",
      description: "Estudio de ciclos elementales y su influencia en el clima global",
    },
    {
      name: "Impactos de Contaminación",
      description: "Evaluación de efectos de contaminantes en ecosistemas costeros y marinos",
    },
    {
      name: "Procesos Hidrotermales",
      description: "Química de sistemas hidrotermales y sus implicaciones ecológicas",
    },
    {
      name: "Química de Interfases",
      description: "Procesos en las interfases aire-mar, agua-sedimento y costeras",
    },
    {
      name: "Productos Naturales Marinos",
      description: "Exploración y aprovechamiento de compuestos bioactivos de origen marino",
    },
  ];

  return (
    <Layout 
      title="Oceanografía Química - OceanInsight"
      description="Estudio de la composición química del agua de mar y los procesos biogeoquímicos oceánicos"
    >
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-ocean-dark to-ocean via-ocean-dark py-16 text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Oceanografía Química</h1>
          <p className="text-xl max-w-3xl">
            Estudio de la composición química del agua de mar, los procesos químicos en el océano 
            y los ciclos biogeoquímicos que mantienen la vida marina y regulan el clima global.
          </p>
        </div>
      </div>

      {/* Main Sections */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-ocean-dark mb-12 text-center">Áreas Principales</h2>
          
          <div className="space-y-16">
            {mainSections.map((section, idx) => (
              <div key={idx} className="bg-gray-50 rounded-lg overflow-hidden shadow-md">
                <div className="p-6 bg-ocean-light bg-opacity-10">
                  <div className="flex items-center gap-4">
                    <span className="text-4xl">{section.icon}</span>
                    <div>
                      <h3 className="text-2xl font-bold text-ocean-dark">{section.title}</h3>
                      <p className="text-gray-600">{section.description}</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {section.topics.map((topic, i) => (
                      <Link 
                        key={i} 
                        href={topic.link}
                        className="p-3 bg-white border border-gray-200 rounded-md hover:bg-ocean-light hover:bg-opacity-10 hover:border-ocean-light transition"
                      >
                        <span className="font-medium text-ocean-dark">{topic.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Analytical Tools & Techniques */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-ocean-dark mb-12 text-center">Herramientas y Técnicas Analíticas</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {analyticalTools.map((tool, idx) => (
              <div key={idx} className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-4xl mb-4 text-ocean">{tool.icon}</div>
                <h3 className="text-xl font-bold text-ocean-dark mb-2">{tool.name}</h3>
                <p className="text-gray-600">{tool.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Chemical Oceanography in Practice */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-ocean-dark mb-4 text-center">Aplicaciones Prácticas</h2>
          <p className="text-gray-600 text-center max-w-3xl mx-auto mb-12">
            La oceanografía química proporciona conocimientos fundamentales para comprender y abordar 
            numerosos desafíos ambientales y sociales relacionados con los océanos.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {applications.map((app, idx) => (
              <div key={idx} className="border border-gray-200 rounded-lg p-6 hover:border-ocean-light hover:shadow-md transition">
                <h3 className="text-xl font-bold text-ocean-dark mb-3">{app.name}</h3>
                <p className="text-gray-600">{app.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Resources */}
      <div className="py-16 bg-ocean-light bg-opacity-10">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-ocean-dark mb-12 text-center">Recursos Destacados</h2>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/3 bg-ocean-dark text-white p-6 flex items-center justify-center">
                <div className="text-center">
                  <h3 className="text-xl font-bold mb-2">Texto de Referencia</h3>
                  <p className="text-lg">An Introduction to Marine Chemistry</p>
                  <p className="italic">Susan Libes</p>
                </div>
              </div>
              <div className="md:w-2/3 p-6">
                <h3 className="text-xl font-bold text-ocean-dark mb-3">Recurso Fundamental</h3>
                <p className="text-gray-600 mb-4">
                  Este texto comprensivo cubre todos los aspectos esenciales de la oceanografía química, 
                  desde la fisicoquímica básica del agua de mar hasta los ciclos biogeoquímicos y la contaminación marina.
                </p>
                <p className="text-gray-600">
                  Los contenidos de esta sección están organizados siguiendo la estructura de este texto de referencia, 
                  proporcionando una base sólida para el estudio de la química oceánica.
                </p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold text-ocean-dark mb-3">Base de Datos de Parámetros Químicos</h3>
              <p className="text-gray-600 mb-4">
                Acceso a compilaciones de datos químicos oceánicos globales, incluyendo temperatura, 
                salinidad, nutrientes, oxígeno y otros parámetros biogeoquímicos.
              </p>
              <Link 
                href="/chemical/database"
                className="text-ocean hover:text-ocean-dark font-medium"
              >
                Explorar base de datos →
              </Link>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold text-ocean-dark mb-3">Herramientas de Visualización</h3>
              <p className="text-gray-600 mb-4">
                Visualizaciones interactivas de distribuciones químicas oceánicas, perfiles verticales, 
                secciones transversales y mapas globales de variables biogeoquímicas.
              </p>
              <Link 
                href="/chemical/visualization"
                className="text-ocean hover:text-ocean-dark font-medium"
              >
                Ver herramientas →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-ocean py-12 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">¿Necesitas asesoría en oceanografía química?</h2>
          <p className="max-w-2xl mx-auto mb-8">
            Nuestro equipo de expertos puede ayudarte con análisis químicos, interpretación de datos, 
            evaluación de impactos ambientales y más.
          </p>
          <Link 
            href="/contact"
            className="inline-block px-8 py-3 bg-white text-ocean font-bold rounded-md hover:bg-gray-100 transition"
          >
            Contactar a un especialista
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default ChemicalOceanography;