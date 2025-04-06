import React, { useState } from "react";
import Layout from "~/components/layout/Layout";
import Link from "next/link";
import Image from "next/image";

export default function BottleneckPage() {
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
              src="/images/biology/community_ecology/bottleneck.png"
              alt="Cuello de botella genético"
              fill
              style={{ objectFit: 'contain' }}
              quality={100}
            />
          </div>
          <p className="text-white text-center max-w-3xl text-lg">
            Representación del cuello de botella genético: una población experimenta una 
            drástica reducción de tamaño y solo algunos alelos sobreviven en la población resultante,
            causando una pérdida significativa de diversidad genética.
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
      title="Cuello de Botella Genético - Teoría de Islas - OceanInsight"
      description="Exploración del cuello de botella genético como proceso evolutivo en biogeografía de islas y sus implicaciones en ecosistemas marinos"
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
          
          <h1 className="text-4xl font-bold mb-4">Cuello de Botella Genético</h1>
          <p className="text-xl max-w-3xl">
            Fenómeno evolutivo crítico donde una reducción drástica en el tamaño poblacional 
            provoca pérdida de diversidad genética con importantes implicaciones ecológicas.
          </p>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8 mb-12">
            <div className="md:w-2/3">
              <h2 className="text-3xl font-bold text-blue-800 mb-6">¿Qué es el Cuello de Botella Genético?</h2>
              
              <p className="text-lg text-gray-700 mb-6">
                Un cuello de botella genético ocurre cuando una población existente experimenta una reducción 
                drástica en su tamaño, seguida de una recuperación posterior. A diferencia del efecto fundador, 
                que ocurre durante la colonización de nuevos hábitats, el cuello de botella afecta a poblaciones 
                ya establecidas que sufren un evento catastrófico.
              </p>
              
              <div className="bg-blue-50 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-semibold text-blue-700 mb-3">Causas principales:</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-blue-600 font-bold mr-2">•</span>
                    <span><strong>Desastres naturales:</strong> Erupciones volcánicas, tsunamis, huracanes que diezman poblaciones.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 font-bold mr-2">•</span>
                    <span><strong>Enfermedades:</strong> Epidemias que causan mortalidad masiva en poblaciones silvestres.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 font-bold mr-2">•</span>
                    <span><strong>Cambios climáticos:</strong> Eventos extremos como sequías prolongadas o cambios rápidos de temperatura.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 font-bold mr-2">•</span>
                    <span><strong>Competencia con especies invasoras:</strong> Introducción de especies exóticas que desplazan a las nativas.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 font-bold mr-2">•</span>
                    <span><strong>Actividades humanas:</strong> Caza excesiva, destrucción de hábitat, contaminación o fragmentación de ecosistemas.</span>
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
                    src="/images/biology/community_ecology/bottleneck.png"
                    alt="Ilustración del cuello de botella genético"
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
                    Representación del cuello de botella genético: una población experimenta una 
                    drástica reducción de tamaño y solo algunos alelos sobreviven en la población resultante.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Consecuencias */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-blue-800 mb-6">Consecuencias Evolutivas</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-xl font-semibold text-blue-700 mb-3">Erosión Genética</h3>
                <p className="text-gray-600">
                  Pérdida significativa de variabilidad genética en la población, especialmente de alelos raros 
                  que pueden ser importantes para la adaptación a condiciones cambiantes. Esto crea un "efecto de 
                  muestreo" donde solo una fracción del pool genético original sobrevive.
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-xl font-semibold text-blue-700 mb-3">Aumento de Homocigosis</h3>
                <p className="text-gray-600">
                  Mayor presencia de individuos homocigotos debido a la reducción de variantes alélicas disponibles 
                  y al incremento de endogamia en la población pequeña. Este incremento en homocigosis puede exponer 
                  alelos recesivos deletéreos.
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-xl font-semibold text-blue-700 mb-3">Depresión Endogámica</h3>
                <p className="text-gray-600">
                  Reducción de la aptitud biológica (fitness) debido a la expresión de alelos deletéreos recesivos 
                  que estaban enmascarados en la población mayor. Este fenómeno puede manifestarse en menor fertilidad, 
                  viabilidad o resistencia a enfermedades.
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-xl font-semibold text-blue-700 mb-3">Deriva Genética Intensificada</h3>
                <p className="text-gray-600">
                  Los cambios aleatorios en las frecuencias alélicas tienen un impacto mucho mayor en poblaciones pequeñas. 
                  Esto puede llevar a la fijación o pérdida rápida de ciertos alelos, independientemente de su valor adaptativo, 
                  alterando la trayectoria evolutiva de la población.
                </p>
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
                    <p className="font-medium">Guepardos Africanos</p>
                    <p className="text-gray-600">Población actual con extremadamente baja diversidad genética debido a un severo cuello de botella que ocurrió hace aproximadamente 12,000 años al final del Pleistoceno.</p>
                  </li>
                  <li>
                    <p className="font-medium">Elefantes Marinos del Norte</p>
                    <p className="text-gray-600">Reducidos a aproximadamente 20 individuos a finales del siglo XIX debido a la caza comercial. Aunque ahora son más de 30,000, muestran muy baja diversidad genética.</p>
                  </li>
                  <li>
                    <p className="font-medium">Cóndor de California</p>
                    <p className="text-gray-600">Reducido a sólo 27 individuos en 1987, actualmente en recuperación pero con problemas asociados a baja diversidad genética como malformaciones congénitas.</p>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-xl font-semibold text-blue-700 mb-3">Ejemplos Marinos</h3>
                <ul className="space-y-4">
                  <li>
                    <p className="font-medium">Ballena Franca del Atlántico Norte</p>
                    <p className="text-gray-600">Reducida a unos pocos cientos de individuos por la caza comercial, muestra baja diversidad genética y problemas reproductivos que dificultan su recuperación.</p>
                  </li>
                  <li>
                    <p className="font-medium">Coral <em>Acropora palmata</em></p>
                    <p className="text-gray-600">Poblaciones caribeñas experimentaron un declive del 95% desde la década de 1980 debido a enfermedades y blanqueamiento, resultando en una significativa reducción de diversidad genética.</p>
                  </li>
                  <li>
                    <p className="font-medium">Vaquita Marina</p>
                    <p className="text-gray-600">El mamífero marino más amenazado del mundo, con menos de 10 individuos, víctima de pesca incidental. La extrema reducción poblacional ha creado un severo cuello de botella.</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Implicaciones para la Biogeografía de Islas */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-blue-800 mb-6">Implicaciones para la Biogeografía de Islas</h2>
            
            <p className="text-lg text-gray-700 mb-6">
              El cuello de botella genético tiene importantes repercusiones no contempladas en el modelo 
              clásico de MacArthur y Wilson, afectando profundamente la dinámica poblacional en sistemas insulares:
            </p>
            
            <div className="bg-blue-50 rounded-lg p-8">
              <h3 className="text-xl font-semibold text-blue-700 mb-4">Efectos en Sistemas Insulares</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="bg-white rounded-lg shadow-sm p-4">
                  <p className="font-medium text-blue-600 mb-2">Vulnerabilidad Incrementada</p>
                  <p className="text-gray-600">
                    Las poblaciones insulares son inherentemente más vulnerables a los cuellos de botella debido a:
                    <br />• Tamaños poblacionales inicialmente más pequeños
                    <br />• Mayor exposición a eventos catastróficos como tormentas tropicales
                    <br />• Limitaciones espaciales que impiden migraciones durante perturbaciones
                  </p>
                </div>
                
                <div className="bg-white rounded-lg shadow-sm p-4">
                  <p className="font-medium text-blue-600 mb-2">Alteración de Tasas de Extinción</p>
                  <p className="text-gray-600">
                    El modelo clásico no contempla cómo la reducida diversidad genética post-cuello de botella 
                    puede aumentar exponencialmente (no linealmente) las probabilidades de extinción, incluso 
                    cuando el tamaño poblacional se ha recuperado numéricamente.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Ejemplos específicos en ecosistemas marinos */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-blue-800 mb-6">Ejemplos en Ecosistemas Marinos</h2>
            
            <div className="grid grid-cols-1 gap-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-xl font-semibold text-blue-700 mb-3">Arrecifes de Coral tras Eventos de Blanqueamiento</h3>
                <p className="text-gray-600 mb-4">
                  Los eventos masivos de blanqueamiento de coral representan cuellos de botella genéticos en ecosistemas arrecifales:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-600">
                  <li>La Gran Barrera de Coral australiana ha experimentado reducciones poblacionales del 50-80% en algunas especies tras eventos de blanqueamiento masivo en 2016 y 2017.</li>
                  <li>Las colonias supervivientes representan solo una fracción del pool genético original, potencialmente limitando la capacidad adaptativa frente al cambio climático.</li>
                  <li>Estudios genómicos recientes han demostrado que incluso los arrecifes "recuperados" numéricamente pueden tener diversidad genética significativamente reducida.</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-xl font-semibold text-blue-700 mb-3">Praderas de Pastos Marinos Post-Perturbación</h3>
                <p className="text-gray-600 mb-4">
                  Las praderas de pastos marinos, especialmente de <em>Posidonia oceanica</em> en el Mediterráneo, muestran evidencia de cuellos de botella históricos:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-600">
                  <li>Algunas praderas son prácticamente clonales debido a eventos de mortandad masiva seguidos de recuperación a partir de pocos individuos.</li>
                  <li>La propagación asexual predominante post-cuello de botella limita aún más la recuperación de diversidad genética.</li>
                  <li>Este empobrecimiento genético reduce su capacidad de adaptación a nuevas amenazas como calentamiento de aguas y especies invasoras.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Diferencias con el Efecto Fundador */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-blue-800 mb-6">Comparación con el Efecto Fundador</h2>
            
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-lg overflow-hidden">
                <thead className="bg-blue-600 text-white">
                  <tr>
                    <th className="py-3 px-4 text-left">Característica</th>
                    <th className="py-3 px-4 text-left">Cuello de Botella</th>
                    <th className="py-3 px-4 text-left">Efecto Fundador</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="py-3 px-4 font-medium">Momento de ocurrencia</td>
                    <td className="py-3 px-4">En poblaciones ya establecidas</td>
                    <td className="py-3 px-4">Durante la colonización de nuevos hábitats</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="py-3 px-4 font-medium">Causa principal</td>
                    <td className="py-3 px-4">Eventos catastróficos que reducen una población existente</td>
                    <td className="py-3 px-4">Migración de un pequeño grupo desde una población mayor</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium">Población de origen</td>
                    <td className="py-3 px-4">La misma población antes de la reducción</td>
                    <td className="py-3 px-4">Una población diferente geográficamente separada</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="py-3 px-4 font-medium">Duración del evento</td>
                    <td className="py-3 px-4">Generalmente breve (catastrófico)</td>
                    <td className="py-3 px-4">Puede ser gradual a lo largo de varias generaciones</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium">Impacto en especiación</td>
                    <td className="py-3 px-4">Generalmente menor a menos que exista selección fuerte</td>
                    <td className="py-3 px-4">Mayor potencial para especiación en nuevo ambiente</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Conclusiones e implicaciones para la conservación */}
          <div>
            <h2 className="text-2xl font-bold text-blue-800 mb-6">Implicaciones para la Conservación</h2>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <p className="text-lg text-gray-700 mb-6">
                El cuello de botella genético tiene importantes implicaciones para la conservación de 
                ecosistemas marinos insulares:
              </p>
              
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="bg-blue-100 text-blue-800 rounded-full h-6 w-6 flex items-center justify-center font-bold mr-3 mt-0.5">1</div>
                  <div>
                    <p className="font-medium">Tamaño efectivo vs. tamaño censal</p>
                    <p className="text-gray-600">Las estrategias de conservación deben considerar que una población numéricamente "recuperada" puede seguir siendo genéticamente pobre si proviene de un cuello de botella severo.</p>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <div className="bg-blue-100 text-blue-800 rounded-full h-6 w-6 flex items-center justify-center font-bold mr-3 mt-0.5">2</div>
                  <div>
                    <p className="font-medium">Monitoreo genético</p>
                    <p className="text-gray-600">Incorporar análisis de diversidad genética en programas de monitoreo de poblaciones, especialmente tras eventos catastróficos como blanqueamientos de coral o mortalidades masivas.</p>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <div className="bg-blue-100 text-blue-800 rounded-full h-6 w-6 flex items-center justify-center font-bold mr-3 mt-0.5">3</div>
                  <div>
                    <p className="font-medium">Programas de reproducción asistida</p>
                    <p className="text-gray-600">Desarrollar programas específicos para especies que han sufrido cuellos de botella severos, con estrategias de apareamiento que maximicen la diversidad genética restante.</p>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <div className="bg-blue-100 text-blue-800 rounded-full h-6 w-6 flex items-center justify-center font-bold mr-3 mt-0.5">4</div>
                  <div>
                    <p className="font-medium">Bancos genéticos</p>
                    <p className="text-gray-600">Establecer "bancos de germoplasma" para especies marinas vulnerables, preservando material genético antes de posibles eventos catastróficos como estrategia preventiva.</p>
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
              
              <Link href="/biological/founder-effect" className="block bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition">
                <h3 className="text-lg font-semibold text-blue-700 mb-2">Efecto Fundador</h3>
                <p className="text-gray-600">Fenómeno evolutivo en la colonización de nuevos hábitats</p>
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