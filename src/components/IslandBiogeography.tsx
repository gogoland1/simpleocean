// src/components/IslandBiogeography.tsx
import React, { useState, useEffect } from "react";
import dynamic from 'next/dynamic';

// Carga dinámica de los componentes para evitar errores de hidratación
const Image = dynamic(() => import('next/image'), { ssr: false });
const IslandTheoryModel = dynamic(
  () => import("./visualization/IslandTheoryModel"),
  { 
    ssr: false,
    loading: () => <div className="w-full h-96 flex items-center justify-center bg-gray-100">Cargando visualización...</div>
  }
);

// Agregar el nuevo modelo avanzado con carga dinámica
const IslandTheoryAdvancedModel = dynamic(
  () => import("./visualization/IslandTheoryAdvancedModel"),
  { 
    ssr: false,
    loading: () => <div className="w-full h-96 flex items-center justify-center bg-gray-100">Cargando modelo avanzado...</div>
  }
);

// Tipo para la imagen en modal
interface ModalImageData {
  src: string;
  alt: string;
  caption: string;
}

const IslandBiogeography: React.FC = () => {
  // Estado para controlar si el componente está montado en el cliente
  const [isMounted, setIsMounted] = useState(false);
  const [activeCategory, setActiveCategory] = useState("classic-model");
  const [activeSubcategory, setActiveSubcategory] = useState("equilibrium");
  
  // Estado para controlar el modal de imagen ampliada
  const [showImageModal, setShowImageModal] = useState(false);
  const [modalImage, setModalImage] = useState<ModalImageData | null>(null);

  // Función para abrir el modal con una imagen específica
  const openImageModal = (src: string, alt: string, caption: string) => {
    setModalImage({ src, alt, caption });
    setShowImageModal(true);
  };

  // Función para cerrar el modal
  const closeImageModal = () => {
    setShowImageModal(false);
  };

  // Efecto para marcar cuando el componente está montado en el cliente
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Componente para el modal de imagen
  const ImageModal = () => {
    if (!modalImage) return null;
    
    return (
      <div 
        className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
        onClick={closeImageModal}
      >
        <div className="max-w-5xl max-h-screen flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
          <div className="relative w-full h-[70vh] mb-4">
            <Image
              src={modalImage.src}
              alt={modalImage.alt}
              fill
              style={{ objectFit: 'contain' }}
              quality={100}
            />
          </div>
          <p className="text-white text-center max-w-3xl text-lg">
            {modalImage.caption}
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

  const categories = [
    { id: "classic-model", name: "Modelo Clásico" },
    { id: "nonlinear-effects", name: "Fenómenos No Lineales" },
    { id: "genetic-effects", name: "Efectos Genéticos" },
    { id: "marine-examples", name: "Ejemplos Marinos" },
    { id: "visualizations", name: "Visualizaciones" }
  ];

  // Subcategorías para cada categoría principal
  const subcategories: Record<string, Array<{ id: string; name: string }>> = {
    "classic-model": [
      { id: "equilibrium", name: "Equilibrio Dinámico" },
      { id: "immigration", name: "Tasas de Inmigración" },
      { id: "extinction", name: "Tasas de Extinción" }
    ],
    "nonlinear-effects": [
      { id: "ecological-interactions", name: "Interacciones Ecológicas" },
      { id: "evolution", name: "Procesos Evolutivos" },
      { id: "stochastic-events", name: "Eventos Estocásticos" }
    ],
    "genetic-effects": [
      { id: "founder-effect", name: "Efecto Fundador" },
      { id: "bottleneck", name: "Cuello de Botella" }
    ],
    "marine-examples": [
      { id: "coral-reefs", name: "Arrecifes de Coral" },
      { id: "seamounts", name: "Montañas Submarinas" },
      { id: "mangroves", name: "Manglares y Praderas" },
      { id: "deep-sea", name: "Ecosistemas del Océano Profundo" }
    ],
    "visualizations": [
      { id: "python-graphs", name: "Gráficos Interactivos" },
      { id: "case-studies", name: "Casos de Estudio" }
    ]
  };

  // Renderizado condicional basado en la categoría y subcategoría seleccionadas
  const renderContent = () => {
    if (!isMounted) return null;

    // Modelo clásico - equilibrio dinámico
    if (activeCategory === "classic-model" && activeSubcategory === "equilibrium") {
      return (
        <div className="mt-6">
          <h3 className="text-2xl font-bold text-blue-800 mb-4">Equilibrio Dinámico de Especies</h3>
          
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/2">
              <p className="mb-4">
                El modelo clásico propuesto por MacArthur y Wilson en 1967 establece que la 
                riqueza de especies en una isla alcanza un equilibrio dinámico determinado 
                por el balance entre dos procesos principales: inmigración y extinción.
              </p>
              
              <h4 className="text-xl font-semibold text-blue-700 mb-2">Puntos Clave:</h4>
              <ul className="list-disc pl-6 mb-4">
                <li>Las islas grandes tendrán mayor riqueza de especies en equilibrio que las islas pequeñas</li>
                <li>Las islas cercanas al continente tendrán mayor riqueza de especies que las distantes</li>
                <li>El equilibrio es dinámico, con un recambio constante de especies</li>
                <li>El número de especies en equilibrio (S) ocurre en el punto donde las curvas de inmigración y extinción se intersectan</li>
              </ul>
              
              <h4 className="text-xl font-semibold text-blue-700 mb-2">Aplicaciones:</h4>
              <p>
                Este modelo ha sido fundamental para entender patrones de biodiversidad en sistemas 
                insulares, desde islas oceánicas hasta fragmentos de hábitat en ambientes 
                terrestres y marinos.
              </p>
            </div>
            
            <div className="md:w-1/2 flex flex-col items-center">
              <div 
                className="w-full h-64 relative bg-gray-200 rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => openImageModal(
                  "/images/biology/community_ecology/island_theory.png",
                  "Modelo clásico de biogeografía de islas",
                  "Modelo clásico de MacArthur y Wilson (1967) mostrando el equilibrio entre tasas de inmigración y extinción"
                )}
              >
                {isMounted && (
                  <Image 
                    src="/images/biology/community_ecology/island_theory.png" 
                    alt="Modelo clásico de biogeografía de islas"
                    fill
                    style={{ objectFit: 'contain' }}
                  />
                )}
                <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 flex items-center justify-center">
                  <div className="bg-white bg-opacity-70 rounded-full p-2 transform scale-0 group-hover:scale-100 transition-transform">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v5m4-5v5" />
                    </svg>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-2 italic text-center">
                Modelo clásico de MacArthur y Wilson (1967) mostrando el equilibrio entre 
                tasas de inmigración y extinción
              </p>
            </div>
          </div>
          
          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <h4 className="text-xl font-semibold text-blue-700 mb-2">Visualización Interactiva</h4>
            <p className="mb-4">
              Explora cómo los diferentes parámetros afectan el equilibrio de especies 
              en el modelo clásico de biogeografía de islas:
            </p>
            
            <IslandTheoryModel />
          </div>
        </div>
      );
    }
    
    // Fenómenos No Lineales - Interacciones Ecológicas
    if (activeCategory === "nonlinear-effects" && activeSubcategory === "ecological-interactions") {
      return (
        <div className="mt-6">
          <h3 className="text-2xl font-bold text-blue-800 mb-4">Interacciones Ecológicas Complejas</h3>
          
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/2">
              <p className="mb-4">
                A pesar de su elegancia y poder explicativo, el modelo de MacArthur y Wilson 
                simplifica excesivamente numerosos procesos ecológicos complejos que influyen 
                significativamente en la dinámica de las comunidades insulares.
              </p>
              
              <h4 className="text-xl font-semibold text-blue-700 mb-2">Limitaciones en interacciones:</h4>
              <ul className="list-disc pl-6 mb-4">
                <li><strong>Competencia interespecífica:</strong> Puede acelerar o retrasar extinción según el contexto</li>
                <li><strong>Depredación:</strong> Depredadores pueden regular poblaciones de presas previniendo sobreexplotación de recursos</li>
                <li><strong>Mutualismo:</strong> Facilita persistencia de especies interdependientes</li>
                <li><strong>Cascadas tróficas:</strong> Extinción de especies clave puede desencadenar extinciones en cadena impredecibles</li>
                <li><strong>Facilitación:</strong> Algunas especies pueden mejorar el hábitat para otras</li>
              </ul>
              
              <p>
                Estas interacciones generan patrones no lineales donde pequeños cambios en la composición 
                de especies pueden provocar efectos desproporcionados en la estructura de la comunidad, 
                desafiando las predicciones del modelo clásico.
              </p>
            </div>
            
            <div className="md:w-1/2 flex flex-col items-center">
              <div 
                className="w-full h-64 relative bg-gray-200 rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => openImageModal(
                  "/images/biology/community_ecology/trophic_cascade.png",
                  "Interacciones ecológicas complejas",
                  "Red compleja de interacciones biológicas en una comunidad bentónica - Yakovis & Artemieva, 2021: Effects of a trophic cascade on a multi-level facilitation cascade"
                )}
              >
                {isMounted && (
                  <Image 
                    src="/images/biology/community_ecology/trophic_cascade.png" 
                    alt="Interacciones ecológicas complejas"
                    fill
                    style={{ objectFit: 'contain' }}
                  />
                )}
              </div>
              <p className="text-sm text-gray-600 mt-2 italic text-center">
                Red compleja de interacciones biológicas en una comunidad bentónica - Yakovis & Artemieva, 2021: Effects of a trophic cascade on a multi-level facilitation cascade
              </p>
              
              <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                <h5 className="font-semibold text-amber-800 mb-2">Caso de estudio: Arrecifes de coral</h5>
                <p className="text-sm">
                  En arrecifes de coral aislados, la sobrepesca de depredadores tope (tiburones) 
                  ha provocado explosiones poblacionales de mesodepredadores y colapsos de herbívoros, 
                  alterando completamente la estructura comunitaria de forma que el modelo clásico 
                  no puede predecir.
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    }
    
    // Genetic effects - Founder effect
    if (activeCategory === "genetic-effects" && activeSubcategory === "founder-effect") {
      return (
        <div className="mt-6">
          <h3 className="text-2xl font-bold text-blue-800 mb-4">Efecto Fundador</h3>
          
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/2">
              <p className="mb-4">
                El efecto fundador es un fenómeno que ocurre cuando un pequeño subgrupo de una población mayor 
                se separa y establece una nueva población aislada. Este proceso es particularmente relevante 
                en la colonización de islas.
              </p>
              
              <h4 className="text-xl font-semibold text-blue-700 mb-2">Características principales:</h4>
              <ul className="list-disc pl-6 mb-4">
                <li><strong>Muestreo aleatorio:</strong> Los individuos fundadores representan solo una muestra aleatoria del pool genético original</li>
                <li><strong>Pérdida de diversidad:</strong> La nueva población tiene significativamente menos variabilidad genética</li>
                <li><strong>Cambio en frecuencias alélicas:</strong> Algunos alelos pueden estar sobrerrepresentados y otros perdidos</li>
                <li><strong>Fijación de alelos raros:</strong> Alelos que eran raros en la población original pueden volverse comunes</li>
              </ul>
              
              {/* Botón para navegar a la página detallada */}
              <div className="mt-6">
                <a 
                  href="/biological/founder-effect" 
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Explorar Página Detallada
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </div>
            
            <div className="md:w-1/2 flex flex-col items-center">
              <div 
                className="w-full h-64 relative bg-gray-200 rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => openImageModal(
                  "/images/biology/community_ecology/founder_effect.png",
                  "Efecto fundador en poblaciones insulares",
                  "Ilustración del efecto fundador: un pequeño subconjunto de la población original establece una nueva población con diferente composición genética"
                )}
              >
                {isMounted && (
                  <Image 
                    src="/images/biology/community_ecology/founder_effect.png" 
                    alt="Efecto fundador en poblaciones insulares"
                    fill
                    style={{ objectFit: 'contain' }}
                  />
                )}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="sr-only">Ampliar imagen</span>
                  <div className="absolute inset-0 bg-black opacity-0 hover:opacity-10 transition-opacity"></div>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-2 italic text-center">
                Ilustración del efecto fundador: un pequeño subconjunto de la población original 
                establece una nueva población con diferente composición genética
              </p>
            </div>
          </div>
          
          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <h4 className="text-xl font-semibold text-blue-700 mb-2">Aplicaciones en Oceanografía</h4>
            <p className="mb-4">
              El efecto fundador es particularmente relevante en ecosistemas marinos aislados como:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Arrecifes de coral remotos donde especies como el pez mariposa endémico de Pascua (<em>Chaetodon litus</em>) evolucionaron a partir de pocos individuos fundadores</li>
              <li>Montañas submarinas que albergan comunidades bentónicas con clara estructura determinada por aislamiento y colonización limitada</li>
              <li>Ventilas hidrotermales donde comunidades extremófilas muestran patrones de colonización secuencial</li>
            </ul>
          </div>
        </div>
      );
    }
    
    // Genetic effects - Bottleneck
    if (activeCategory === "genetic-effects" && activeSubcategory === "bottleneck") {
      return (
        <div className="mt-6">
          <h3 className="text-2xl font-bold text-blue-800 mb-4">Cuello de Botella Genético</h3>
          
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/2">
              <p className="mb-4">
                Un cuello de botella genético ocurre cuando una población existente experimenta una reducción 
                drástica en su tamaño, seguida de una recuperación posterior. A diferencia del efecto fundador, 
                este fenómeno afecta a poblaciones ya establecidas que sufren un evento catastrófico.
              </p>
              
              <h4 className="text-xl font-semibold text-blue-700 mb-2">Características principales:</h4>
              <ul className="list-disc pl-6 mb-4">
                <li><strong>Erosión genética:</strong> Pérdida significativa de diversidad genética, especialmente de alelos raros</li>
                <li><strong>Aumento de homocigosis:</strong> Mayor presencia de individuos homocigotos debido a la reducción de variantes alélicas</li>
                <li><strong>Depresión endogámica:</strong> Reducción de aptitud biológica por expresión de alelos deletéreos recesivos</li>
                <li><strong>Deriva genética intensificada:</strong> Los cambios aleatorios en frecuencias alélicas tienen mayor impacto</li>
              </ul>
              
              {/* Botón para navegar a la página detallada */}
              <div className="mt-6">
                <a 
                  href="/biological/bottleneck" 
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Explorar Página Detallada
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </div>
            
            <div className="md:w-1/2 flex flex-col items-center">
              <div 
                className="w-full h-64 relative bg-gray-200 rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => openImageModal(
                  "/images/biology/community_ecology/bottleneck.png",
                  "Cuello de botella genético en poblaciones",
                  "Representación del cuello de botella genético: una población experimenta una drástica reducción de tamaño y solo algunos alelos sobreviven en la población resultante"
                )}
              >
                {isMounted && (
                  <Image 
                    src="/images/biology/community_ecology/bottleneck.png" 
                    alt="Cuello de botella genético en poblaciones"
                    fill
                    style={{ objectFit: 'contain' }}
                  />
                )}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="sr-only">Ampliar imagen</span>
                  <div className="absolute inset-0 bg-black opacity-0 hover:opacity-10 transition-opacity"></div>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-2 italic text-center">
                Representación del cuello de botella genético: una población experimenta una 
                drástica reducción de tamaño y solo algunos alelos sobreviven en la población resultante
              </p>
            </div>
          </div>
          
          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <h4 className="text-xl font-semibold text-blue-700 mb-2">Ejemplos en Ecosistemas Marinos</h4>
            <p className="mb-4">
              El cuello de botella genético es un fenómeno común en ecosistemas marinos vulnerables:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Arrecifes de coral:</strong> Eventos masivos de blanqueamiento han reducido poblaciones de corales hasta en un 80% en algunas regiones</li>
              <li><strong>Mamíferos marinos:</strong> La ballena franca del Atlántico Norte y la vaquita marina muestran signos de cuellos de botella severos</li>
              <li><strong>Praderas de pastos marinos:</strong> Algunas praderas de <em>Posidonia oceanica</em> en el Mediterráneo son prácticamente clonales tras eventos de mortandad masiva</li>
              <li><strong>Especies insulares:</strong> Poblaciones de islas remotas son particularmente vulnerables a eventos catastróficos como tormentas tropicales</li>
            </ul>
          </div>
        </div>
      );
    }
    
    // Visualizaciones - Python Graphs (SECCIÓN MODIFICADA)
    if (activeCategory === "visualizations" && activeSubcategory === "python-graphs") {
      return (
        <div className="mt-6">
          <h3 className="text-2xl font-bold text-blue-800 mb-4">Visualizaciones Interactivas</h3>
          
          <p className="mb-6">
            Las siguientes visualizaciones te permiten explorar los conceptos clave de la teoría 
            de biogeografía de islas de manera interactiva, ajustando parámetros para ver cómo 
            afectan los equilibrios de especies en diferentes modelos teóricos.
          </p>
          
          <IslandTheoryAdvancedModel />
        </div>
      );
    }
    
    // Valor por defecto
    return <div>Selecciona una categoría y subcategoría para explorar el contenido</div>;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-blue-900 mb-3">Teoría de Biogeografía de Islas</h1>
        <p className="text-lg text-gray-700">
          Estudio de los patrones de distribución de especies en ecosistemas insulares y 
          los procesos que los determinan, desde el modelo clásico hasta fenómenos complejos 
          no contemplados originalmente.
        </p>
      </div>

      {/* Renderiza el contenido interactivo solo después de que el componente esté montado en el cliente */}
      {isMounted ? (
        <>
          {/* Navegación de pestañas para categorías principales */}
          <div className="mb-6 border-b border-gray-200">
            <div className="flex flex-wrap -mb-px">
              {categories.map((category) => (
                <button
                  key={category.id}
                  className={`mr-2 inline-block p-4 rounded-t-lg ${
                    activeCategory === category.id
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                  onClick={() => {
                    setActiveCategory(category.id);
                    // Acceso seguro con valor predeterminado
                    setActiveSubcategory(subcategories[category.id]?.[0]?.id || "");
                  }}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Subcategorías para la categoría seleccionada */}
          <div className="mb-6">
            <div className="flex flex-wrap gap-2">
              {(subcategories[activeCategory] || []).map((subcategory) => (
                <button
                  key={subcategory.id}
                  className={`px-4 py-2 rounded-full text-sm ${
                    activeSubcategory === subcategory.id
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                  onClick={() => setActiveSubcategory(subcategory.id)}
                >
                  {subcategory.name}
                </button>
              ))}
            </div>
          </div>

          {/* Contenido dinámico basado en selecciones */}
          {renderContent()}
          
          {/* Modal para imagen ampliada */}
          {showImageModal && <ImageModal />}
        </>
      ) : (
        <div className="py-12 text-center text-gray-500">
          <div className="animate-pulse">Cargando contenido...</div>
        </div>
      )}
    </div>
  );
};

export default IslandBiogeography;