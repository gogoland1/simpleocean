import type { NextPage } from "next";
import Link from "next/link";
import Layout from "~/components/layout/Layout";
import ChemicalAnalysis from "~/components/analysis/ChemicalAnalysis";

const ChemicalAnalysisPage: NextPage = () => {
  return (
    <Layout 
      title="Análisis Químico Oceánico - OceanInsight"
      description="Herramientas analíticas para el estudio de la química oceánica y visualización de datos"
    >
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-ocean-dark to-ocean via-ocean-dark py-16 text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Análisis Químico Oceánico</h1>
          <p className="text-xl max-w-3xl">
            Herramientas interactivas para visualizar y analizar la química de los océanos, desde 
            perfiles verticales hasta tendencias temporales y distribuciones espaciales.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <div className="lg:col-span-2">
              <ChemicalAnalysis analysisType="profile" parameter="oxygen" />
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-ocean-dark mb-4">Guía de Análisis</h2>
              <p className="text-gray-700 mb-4">
                Esta herramienta interactiva le permite explorar diferentes parámetros químicos oceánicos
                a través de múltiples perspectivas analíticas.
              </p>
              
              <h3 className="font-semibold text-ocean-dark mt-4 mb-2">Cómo utilizar la herramienta:</h3>
              <ol className="list-decimal pl-5 space-y-2 text-gray-700">
                <li>Seleccione el <strong>parámetro químico</strong> que desea analizar</li>
                <li>Elija el <strong>tipo de análisis</strong> que mejor responda a su pregunta</li>
                <li>Explore los gráficos interactivos pasando el cursor sobre los datos</li>
                <li>Lea la interpretación proporcionada para entender el significado de los patrones observados</li>
              </ol>
              
              <div className="mt-8 pt-4 border-t border-gray-200">
                <h3 className="font-semibold text-ocean-dark mb-2">Análisis Personalizados</h3>
                <p className="text-sm text-gray-600 mb-4">
                  ¿Necesita análisis más específicos o interpretaciones detalladas para su investigación o proyecto?
                </p>
                <Link 
                  href="/contact"
                  className="block text-center bg-ocean hover:bg-ocean-dark text-white py-2 px-4 rounded transition"
                >
                  Solicitar Análisis Personalizado
                </Link>
              </div>
            </div>
          </div>

          {/* Additional Information - Susan Libes textbook reference */}
          <div className="bg-ocean-light bg-opacity-10 rounded-lg p-8 mb-12">
            <div className="md:flex">
              <div className="md:w-1/4 mb-6 md:mb-0 flex justify-center">
                <div className="w-48 h-64 bg-gray-300 rounded-md flex items-center justify-center">
                  <span className="text-gray-600 text-center px-4">
                    Portada: An Introduction to Marine Chemistry
                  </span>
                </div>
              </div>
              <div className="md:w-3/4 md:pl-8">
                <h2 className="text-2xl font-bold text-ocean-dark mb-4">Fundamentos de Oceanografía Química</h2>
                <p className="text-gray-700 mb-4">
                  Los datos e interpretaciones presentados en esta plataforma están basados en principios fundamentales
                  de la oceanografía química, como los descritos en el texto de referencia "An Introduction to Marine Chemistry"
                  de Susan Libes.
                </p>
                <p className="text-gray-700 mb-6">
                  Esta obra cubre la fisicoquímica del agua de mar, química redox, sedimentos marinos, 
                  biogeoquímica orgánica y contaminación marina, proporcionando un marco integral para 
                  entender los procesos químicos oceánicos.
                </p>
                
                <h3 className="font-semibold text-ocean-dark mb-2">Principales temas cubiertos:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <ul className="list-disc pl-5 space-y-1 text-gray-700">
                    <li>Propiedades fisicoquímicas del agua de mar</li>
                    <li>Composición y propiedades de la sal marina</li>
                    <li>Salinidad como trazador conservativo</li>
                    <li>Transformaciones químicas oceánicas</li>
                    <li>Intercambio de gases en la interfaz aire-mar</li>
                    <li>Química del oxígeno y zonas mínimas</li>
                  </ul>
                  <ul className="list-disc pl-5 space-y-1 text-gray-700">
                    <li>Ciclos biogeoquímicos de nutrientes</li>
                    <li>Química de sedimentos marinos</li>
                    <li>Sistema del carbonato y alcalinidad</li>
                    <li>Ciclo del carbono marino y cambio climático</li>
                    <li>Elementos traza en agua de mar</li>
                    <li>Contaminación química marina</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Chemical Parameters Tutorial */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-ocean-dark mb-8 text-center">Parámetros Químicos Clave</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-3 bg-[#3498db]"></div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-ocean-dark mb-3">Oxígeno Disuelto</h3>
                  <p className="text-gray-700 mb-4">
                    El oxígeno disuelto es esencial para la respiración de organismos marinos y central en procesos 
                    biogeoquímicos como la remineralización de materia orgánica.
                  </p>
                  <div className="text-sm text-gray-600 space-y-2">
                    <p><strong>Unidades típicas:</strong> ml/L, μmol/kg</p>
                    <p><strong>Rango típico:</strong> 0-9 ml/L</p>
                    <p><strong>Factores influyentes:</strong> Temperatura, fotosíntesis, respiración, circulación</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-3 bg-[#2ecc71]"></div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-ocean-dark mb-3">pH y Acidificación</h3>
                  <p className="text-gray-700 mb-4">
                    El pH del océano regula procesos químicos y biológicos. La absorción de CO₂ atmosférico 
                    está causando acidificación oceánica, con impactos en organismos calcificadores.
                  </p>
                  <div className="text-sm text-gray-600 space-y-2">
                    <p><strong>Unidades:</strong> Escala pH (log[H+])</p>
                    <p><strong>Rango típico:</strong> 7.5-8.5</p>
                    <p><strong>Tendencia actual:</strong> Disminución de ~0.1 unidades desde era preindustrial</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-3 bg-[#f39c12]"></div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-ocean-dark mb-3">Nutrientes</h3>
                  <p className="text-gray-700 mb-4">
                    Los nutrientes principales (nitratos, fosfatos, silicatos) son elementos biolimitantes 
                    esenciales para la productividad primaria oceánica.
                  </p>
                  <div className="text-sm text-gray-600 space-y-2">
                    <p><strong>Unidades típicas:</strong> μmol/L</p>
                    <p><strong>Relación Redfield:</strong> C:N:P = 106:16:1</p>
                    <p><strong>Distribución vertical:</strong> Agotados en superficie, enriquecidos en profundidad</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-3 bg-[#9b59b6]"></div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-ocean-dark mb-3">Alcalinidad</h3>
                  <p className="text-gray-700 mb-4">
                    La alcalinidad total representa la capacidad amortiguadora del agua de mar contra 
                    la acidificación y es clave en el sistema del carbonato.
                  </p>
                  <div className="text-sm text-gray-600 space-y-2">
                    <p><strong>Unidades típicas:</strong> meq/kg, μmol/kg</p>
                    <p><strong>Rango típico:</strong> 2.2-2.5 meq/kg</p>
                    <p><strong>Componentes principales:</strong> Bicarbonato, carbonato, borato</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-3 bg-[#e74c3c]"></div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-ocean-dark mb-3">Salinidad</h3>
                  <p className="text-gray-700 mb-4">
                    La salinidad es un parámetro conservativo fundamental que afecta densidad, 
                    estratificación, circulación y procesos biogeoquímicos.
                  </p>
                  <div className="text-sm text-gray-600 space-y-2">
                    <p><strong>Unidades modernas:</strong> Escala de Salinidad Práctica (PSU)</p>
                    <p><strong>Rango típico oceánico:</strong> 33-37 PSU</p>
                    <p><strong>Medición:</strong> Conductividad, temperatura, presión</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-3 bg-[#1abc9c]"></div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-ocean-dark mb-3">Elementos Traza</h3>
                  <p className="text-gray-700 mb-4">
                    Los elementos traza incluyen metales esenciales (Fe, Zn) y contaminantes (Hg, Pb). 
                    Sus concentraciones y especiación afectan procesos biológicos y ciclos biogeoquímicos.
                  </p>
                  <div className="text-sm text-gray-600 space-y-2">
                    <p><strong>Unidades típicas:</strong> nmol/L, pmol/L</p>
                    <p><strong>Ejemplo clave:</strong> Hierro como limitante en océano abierto</p>
                    <p><strong>Desafíos analíticos:</strong> Contaminación, especiación compleja</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Method Showcase */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-ocean-dark mb-8 text-center">Métodos Analíticos en Oceanografía Química</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-ocean-dark mb-4">Técnicas de Campo</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="text-ocean text-lg mr-3">🧪</span>
                    <div>
                      <p className="font-medium">CTD con Sensores Químicos</p>
                      <p className="text-sm text-gray-600">Perfiles verticales de temperatura, salinidad, oxígeno, fluorescencia y turbidez.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-ocean text-lg mr-3">🧪</span>
                    <div>
                      <p className="font-medium">Botellas Niskin</p>
                      <p className="text-sm text-gray-600">Recolección de muestras de agua a diferentes profundidades para análisis posteriores.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-ocean text-lg mr-3">🧪</span>
                    <div>
                      <p className="font-medium">Sensores Autónomos</p>
                      <p className="text-sm text-gray-600">Boyas, gliders y flotadores Argo con sensores químicos para monitoreo continuo.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-ocean text-lg mr-3">🧪</span>
                    <div>
                      <p className="font-medium">Sensores In Situ</p>
                      <p className="text-sm text-gray-600">Electrodos, optodos y analizadores para mediciones directas de parámetros químicos.</p>
                    </div>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-ocean-dark mb-4">Técnicas de Laboratorio</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="text-ocean text-lg mr-3">🔬</span>
                    <div>
                      <p className="font-medium">Titulaciones</p>
                      <p className="text-sm text-gray-600">Método Winkler para oxígeno disuelto, alcalinidad y análisis de carbonatos.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-ocean text-lg mr-3">🔬</span>
                    <div>
                      <p className="font-medium">Espectrofotometría</p>
                      <p className="text-sm text-gray-600">Análisis de nutrientes (nitrato, fosfato, silicato) y otros compuestos coloreados.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-ocean text-lg mr-3">🔬</span>
                    <div>
                      <p className="font-medium">Espectrometría de Masas</p>
                      <p className="text-sm text-gray-600">Análisis isotópico y determinación de elementos traza en agua de mar.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-ocean text-lg mr-3">🔬</span>
                    <div>
                      <p className="font-medium">Cromatografía</p>
                      <p className="text-sm text-gray-600">Separación y análisis de compuestos orgánicos y otros componentes complejos.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Related Topics */}
          <div>
            <h2 className="text-3xl font-bold text-ocean-dark mb-8 text-center">Temas Relacionados</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link
                href="/chemical/carbon-cycle"
                className="bg-gray-50 p-5 rounded-lg hover:bg-ocean-light hover:bg-opacity-10 transition text-center"
              >
                <h3 className="font-bold text-ocean-dark mb-2">Ciclo del Carbono</h3>
                <p className="text-sm text-gray-600">Procesos que regulan el carbono en el océano y su rol en el cambio climático</p>
              </Link>
              
              <Link
                href="/chemical/ocean-acidification"
                className="bg-gray-50 p-5 rounded-lg hover:bg-ocean-light hover:bg-opacity-10 transition text-center"
              >
                <h3 className="font-bold text-ocean-dark mb-2">Acidificación Oceánica</h3>
                <p className="text-sm text-gray-600">Causas, monitoreo e impactos del descenso del pH del océano</p>
              </Link>
              
              <Link
                href="/chemical/trace-elements"
                className="bg-gray-50 p-5 rounded-lg hover:bg-ocean-light hover:bg-opacity-10 transition text-center"
              >
                <h3 className="font-bold text-ocean-dark mb-2">Elementos Traza</h3>
                <p className="text-sm text-gray-600">Distribución y funciones de micronutrientes y contaminantes metálicos</p>
              </Link>
              
              <Link
                href="/chemical/marine-pollution"
                className="bg-gray-50 p-5 rounded-lg hover:bg-ocean-light hover:bg-opacity-10 transition text-center"
              >
                <h3 className="font-bold text-ocean-dark mb-2">Contaminación Marina</h3>
                <p className="text-sm text-gray-600">Evaluación y monitoreo de contaminantes químicos en el ambiente marino</p>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-ocean py-12 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Aplicar análisis químico a su investigación</h2>
          <p className="max-w-2xl mx-auto mb-8">
            ¿Necesita apoyo con análisis químicos, interpretación de datos o asesoría para su proyecto de investigación? Nuestro equipo de expertos puede ayudarle con metodologías personalizadas.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <Link 
              href="/contact"
              className="inline-block px-8 py-3 bg-white text-ocean font-bold rounded-md hover:bg-gray-100 transition"
            >
              Solicitar consultoría
            </Link>
            <Link 
              href="/resources/chemical"
              className="inline-block px-8 py-3 border border-white text-white font-bold rounded-md hover:bg-ocean-dark transition"
            >
              Ver recursos técnicos
            </Link>
          </div>
        </div>
      </div>

      {/* Data Sources Section */}
      <div className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-ocean-dark mb-8 text-center">Fuentes de Datos</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-ocean-dark mb-3">Bases de Datos Globales</h3>
              <ul className="space-y-2 text-gray-700">
                <li>
                  <strong>GLODAP</strong> (Global Ocean Data Analysis Project) - Compilación global de datos de carbono y químicos relacionados
                </li>
                <li>
                  <strong>World Ocean Atlas</strong> - Datos climatológicos globales incluyendo oxígeno, nutrientes y pH
                </li>
                <li>
                  <strong>SOCAT</strong> (Surface Ocean CO₂ Atlas) - Base de datos global de CO₂ superficial
                </li>
                <li>
                  <strong>GEOTRACES</strong> - Programa internacional para elementos traza y sus isótopos
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-ocean-dark mb-3">Programas de Observación</h3>
              <ul className="space-y-2 text-gray-700">
                <li>
                  <strong>Argo</strong> - Red global de flotadores con sensores biogeoquímicos (BGC-Argo)
                </li>
                <li>
                  <strong>OceanSITES</strong> - Sistema global de estaciones océanicas de series temporales
                </li>
                <li>
                  <strong>GO-SHIP</strong> - Programa de secciones hidrográficas repetidas
                </li>
                <li>
                  <strong>Antares</strong> - Red latinoamericana de series de tiempo costeras
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-ocean-dark mb-3">Recursos Educativos</h3>
              <ul className="space-y-2 text-gray-700">
                <li>
                  <strong>OCB</strong> (Ocean Carbon & Biogeochemistry) - Materiales educativos y mejores prácticas
                </li>
                <li>
                  <strong>IOCCP</strong> - Proyecto Internacional de Coordinación del Carbono Oceánico
                </li>
                <li>
                  <strong>COPtRMS</strong> - Protocolos para métodos y estándares en oceanografía
                </li>
                <li>
                  <strong>OA-ICC</strong> - Centro de Coordinación Internacional sobre Acidificación Oceánica
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <Link 
              href="/resources/databases"
              className="inline-block px-6 py-2 bg-ocean text-white rounded-md hover:bg-ocean-dark transition"
            >
              Explorar todas las fuentes de datos
            </Link>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-ocean-dark mb-8 text-center">Preguntas Frecuentes</h2>
          
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-ocean-dark mb-2">¿Qué es la alcalinidad y por qué es importante?</h3>
              <p className="text-gray-700">
                La alcalinidad es una medida de la capacidad del agua de mar para neutralizar ácidos. Es crucial para entender la química del carbono oceánico, la acidificación y el ciclo global del carbono. Actúa como un amortiguador natural contra los cambios de pH y está principalmente compuesta por iones bicarbonato, carbonato y borato.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-ocean-dark mb-2">¿Cómo afecta el cambio climático a la química oceánica?</h3>
              <p className="text-gray-700">
                El cambio climático afecta la química oceánica de múltiples formas: la absorción de CO₂ atmosférico reduce el pH (acidificación), el calentamiento reduce la solubilidad del oxígeno, la estratificación aumentada limita el intercambio de nutrientes, y los cambios en circulación alteran la distribución de parámetros químicos globalmente.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-ocean-dark mb-2">¿Qué son las zonas de mínimo oxígeno (ZMO)?</h3>
              <p className="text-gray-700">
                Las zonas de mínimo oxígeno son regiones del océano, típicamente entre 200-1000m de profundidad, donde las concentraciones de oxígeno son extremadamente bajas (&lt;20 μmol/kg). Se forman debido a la combinación de alta productividad superficial, remineralización bacteriana de materia orgánica, y limitada ventilación. Están expandiéndose debido al calentamiento global y la estratificación.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-ocean-dark mb-2">¿Por qué el hierro es importante en los océanos?</h3>
              <p className="text-gray-700">
                El hierro es un micronutriente esencial para el fitoplancton, necesario para la fotosíntesis y la fijación de nitrógeno. A pesar de su abundancia en la corteza terrestre, tiene muy baja solubilidad en agua de mar oxigenada, lo que lo convierte en un elemento limitante para la productividad primaria en aproximadamente 30% de los océanos globales, especialmente en regiones HNLC (Alto Nutriente, Baja Clorofila).
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-ocean-dark mb-2">¿Qué es la relación Redfield y por qué es significativa?</h3>
              <p className="text-gray-700">
                La relación Redfield describe la proporción relativamente constante de carbono, nitrógeno y fósforo (106C:16N:1P) encontrada en el plancton marino y en los cambios de concentración de estos elementos en el agua de mar debido a procesos biológicos. Es fundamental para entender los ciclos biogeoquímicos y las relaciones entre nutrientes en el océano.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ChemicalAnalysisPage;