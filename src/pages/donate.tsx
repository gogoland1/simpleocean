import { useState } from "react";
import Layout from "~/components/layout/Layout";

type DonationLevel = {
  id: string;
  name: string;
  amount: number;
  benefits: string[];
  recommended?: boolean;
};

type DonationFrequency = "monthly" | "yearly" | "one-time";

export default function Donate() {
  const [amount, setAmount] = useState<number | "">("");
  const [customAmount, setCustomAmount] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState<string | null>("supporter");
  const [frequency, setFrequency] = useState<DonationFrequency>("monthly");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Niveles de donación predefinidos
  const donationLevels: DonationLevel[] = [
    {
      id: "explorer",
      name: "Explorador",
      amount: 1000,
      benefits: [
        "Acceso a newsletter mensual",
        "Mención en nuestra página de agradecimientos"
      ]
    },
    {
      id: "supporter",
      name: "Colaborador",
      amount: 3000,
      benefits: [
        "Acceso a newsletter mensual",
        "Mención en nuestra página de agradecimientos",
        "Acceso a webinars exclusivos sobre oceanografía"
      ],
      recommended: true
    },
    {
      id: "researcher",
      name: "Investigador",
      amount: 5000,
      benefits: [
        "Acceso a newsletter mensual",
        "Mención en nuestra página de agradecimientos",
        "Acceso a webinars exclusivos sobre oceanografía",
        "Acceso a recursos premium y conjuntos de datos"
      ]
    },
    {
      id: "patron",
      name: "Mecenas",
      amount: 10000,
      benefits: [
        "Acceso a newsletter mensual",
        "Mención en nuestra página de agradecimientos",
        "Acceso a webinars exclusivos sobre oceanografía",
        "Acceso a recursos premium y conjuntos de datos",
        "Consultoría personalizada (1 hora al mes)"
      ]
    }
  ];

  // Multiplicador para donaciones anuales (descuento)
  const yearlyMultiplier = 10; // 2 meses gratis en plan anual

  // Proyectos actuales que se financian con donaciones
  const projects = [
    {
      title: "Monitoreo de Arrecifes de Coral",
      description: "Desarrollo de herramientas de IA para monitorear la salud de los arrecifes de coral en tiempo real.",
      fundingGoal: 15000,
      currentFunding: 8750,
      image: "/images/projects/coral-reef.jpg"
    },
    {
      title: "Educación Oceanográfica",
      description: "Creación de recursos educativos gratuitos sobre oceanografía para escuelas.",
      fundingGoal: 10000,
      currentFunding: 6200,
      image: "/images/projects/education.jpg"
    },
    {
      title: "Mapeo de Contaminación Plástica",
      description: "Implementación de algoritmos para detectar y mapear contaminación plástica en océanos mediante satélites.",
      fundingGoal: 20000,
      currentFunding: 12800,
      image: "/images/projects/plastic-pollution.jpg"
    }
  ];

  // Seleccionar un nivel de donación
  const handleSelectLevel = (levelId: string) => {
    const level = donationLevels.find(l => l.id === levelId);
    if (level) {
      setAmount(level.amount);
      setSelectedLevel(levelId);
      setCustomAmount(false);
    }
  };

  // Manejar donación personalizada
  const handleCustomAmount = () => {
    setSelectedLevel(null);
    setCustomAmount(true);
    setAmount("");
  };

  // Calcular cantidad final según frecuencia
  const calculateFinalAmount = () => {
    if (amount === "") return 0;
    
    if (frequency === "yearly") {
      return amount * yearlyMultiplier;
    }
    return amount;
  };

  // Manejar envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (amount === "") return;

    setIsProcessing(true);
    
    // Simular procesamiento de pago
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mostrar modal de éxito
    setShowModal(true);
    setIsProcessing(false);
  };

  // Resetear formulario después de donación exitosa
  const handleCloseModal = () => {
    setShowModal(false);
    setAmount("");
    setEmail("");
    setName("");
    setSelectedLevel("supporter");
    setFrequency("monthly");
    setCustomAmount(false);
  };

  return (
    <Layout 
      title="Donaciones - OceanInsight" 
      description="Apoya nuestro trabajo en oceanografía y ayúdanos a conservar y entender mejor nuestros océanos."
    >
      <div className="py-12 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">Apoya Nuestra Misión</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Tu contribución nos ayuda a seguir desarrollando recursos y herramientas para entender y conservar nuestros océanos.
            </p>
          </div>
          
          {/* Impacto de las donaciones */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-blue-800 text-center mb-12">El Impacto de tu Apoyo</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <div className="text-5xl mb-4">🔬</div>
                <h3 className="text-xl font-semibold text-blue-700 mb-2">Investigación</h3>
                <p className="text-gray-600">
                  Financiamos investigaciones y desarrollamos herramientas para el estudio oceanográfico.
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <div className="text-5xl mb-4">🌊</div>
                <h3 className="text-xl font-semibold text-blue-700 mb-2">Conservación</h3>
                <p className="text-gray-600">
                  Apoyamos iniciativas para la protección y conservación de ecosistemas marinos.
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <div className="text-5xl mb-4">🎓</div>
                <h3 className="text-xl font-semibold text-blue-700 mb-2">Educación</h3>
                <p className="text-gray-600">
                  Creamos contenidos educativos gratuitos sobre oceanografía para todos los niveles.
                </p>
              </div>
            </div>
          </div>
          
          {/* Proyectos actuales */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-blue-800 text-center mb-12">Proyectos que Apoyamos</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {projects.map((project, index) => {
                const progressPercentage = (project.currentFunding / project.fundingGoal) * 100;
                
                return (
                  <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                    {/* Imagen del proyecto (placeholder) */}
                    <div className="h-48 bg-blue-200 relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-4xl">{index === 0 ? "🐠" : index === 1 ? "📚" : "🌎"}</span>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-blue-800 mb-2">{project.title}</h3>
                      <p className="text-gray-600 mb-4">{project.description}</p>
                      
                      {/* Barra de progreso */}
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                        <div 
                          className="bg-blue-600 h-2.5 rounded-full" 
                          style={{ width: `${progressPercentage}%` }}
                        ></div>
                      </div>
                      
                      <div className="flex justify-between text-sm text-gray-500">
                        <span>${project.currentFunding.toLocaleString()} recaudados</span>
                        <span>Meta: ${project.fundingGoal.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Sección de donación */}
          <div className="bg-white rounded-lg shadow-xl p-8 mb-16">
            <h2 className="text-3xl font-bold text-blue-800 text-center mb-8">Haz tu Donación</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Columna 1: Niveles de donación */}
              <div className="lg:col-span-2">
                <h3 className="text-xl font-semibold text-blue-700 mb-4">Selecciona un nivel</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {donationLevels.map(level => (
                    <div 
                      key={level.id}
                      className={`border rounded-lg p-4 cursor-pointer transition-all duration-200 relative
                        ${selectedLevel === level.id 
                          ? 'border-blue-500 bg-blue-50 shadow-md' 
                          : 'border-gray-200 hover:border-blue-300'
                        }
                      `}
                      onClick={() => handleSelectLevel(level.id)}
                    >
                      {level.recommended && (
                        <span className="absolute -top-3 -right-3 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                          Recomendado
                        </span>
                      )}
                      
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-semibold text-lg">{level.name}</h4>
                        <span className="text-xl font-bold text-blue-600">${level.amount}</span>
                      </div>
                      
                      <ul className="text-sm text-gray-600 space-y-1 mt-3">
                        {level.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-start">
                            <svg className="w-4 h-4 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"></path>
                            </svg>
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                
                <div 
                  className={`border rounded-lg p-4 cursor-pointer transition-all duration-200 mb-8
                    ${customAmount 
                      ? 'border-blue-500 bg-blue-50 shadow-md' 
                      : 'border-gray-200 hover:border-blue-300'
                    }
                  `}
                  onClick={handleCustomAmount}
                >
                  <h4 className="font-semibold text-lg mb-2">Cantidad personalizada</h4>
                  <div className="flex items-center">
                    <span className="text-gray-500 mr-2">$</span>
                    <input 
                      type="number" 
                      className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                      placeholder="Otra cantidad"
                      value={customAmount ? amount : ""}
                      onChange={(e) => {
                        const value = e.target.value === "" ? "" : parseFloat(e.target.value);
                        setAmount(value);
                      }}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                </div>
                
                {/* Frecuencia de donación */}
                <h3 className="text-xl font-semibold text-blue-700 mb-4">Frecuencia</h3>
                
                <div className="flex flex-wrap gap-4 mb-8">
                  <button
                    type="button"
                    className={`px-4 py-2 rounded-md ${frequency === "monthly" 
                      ? "bg-blue-600 text-white" 
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                    onClick={() => setFrequency("monthly")}
                  >
                    Mensual
                  </button>
                  
                  <button
                    type="button"
                    className={`px-4 py-2 rounded-md ${frequency === "yearly" 
                      ? "bg-blue-600 text-white" 
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                    onClick={() => setFrequency("yearly")}
                  >
                    Anual (2 meses gratis)
                  </button>
                  
                  <button
                    type="button"
                    className={`px-4 py-2 rounded-md ${frequency === "one-time" 
                      ? "bg-blue-600 text-white" 
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                    onClick={() => setFrequency("one-time")}
                  >
                    Una sola vez
                  </button>
                </div>
              </div>
              
              {/* Columna 2: Formulario y resumen */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-blue-700 mb-4">Información de pago</h3>
                
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Nombre completo
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                      placeholder="Tu nombre"
                      required
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Correo electrónico
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                      placeholder="tu@email.com"
                      required
                    />
                  </div>
                  
                  {/* Aquí irían los campos para tarjeta de crédito, etc. */}
                  <div className="mb-6 p-4 bg-gray-100 rounded-lg">
                    <div className="text-center text-gray-500 mb-2">Simulación de campos de pago</div>
                    <div className="h-10 bg-gray-200 rounded mb-2"></div>
                    <div className="h-10 bg-gray-200 rounded"></div>
                  </div>
                  
                  {/* Resumen de donación */}
                  <div className="border-t border-gray-200 pt-4 mb-6">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Cantidad:</span>
                      <span className="font-medium">${amount || 0}</span>
                    </div>
                    
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Frecuencia:</span>
                      <span className="font-medium">
                        {frequency === "monthly" 
                          ? "Mensual" 
                          : frequency === "yearly" 
                            ? "Anual" 
                            : "Una sola vez"}
                      </span>
                    </div>
                    
                    {frequency === "yearly" && (
                      <div className="flex justify-between mb-2 text-green-600">
                        <span>Ahorro:</span>
                        <span>2 meses gratis</span>
                      </div>
                    )}
                    
                    <div className="flex justify-between mt-4 text-lg font-bold">
                      <span>Total:</span>
                      <span className="text-blue-600">${calculateFinalAmount()}</span>
                    </div>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={amount === "" || isProcessing}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-md shadow transition-colors duration-300 disabled:bg-blue-400"
                  >
                    {isProcessing ? "Procesando..." : "Completar donación"}
                  </button>
                  
                  <p className="text-sm text-gray-500 mt-4 text-center">
                    Tu donación está segura y encriptada. Al donar, aceptas nuestros términos de servicio.
                  </p>
                </form>
              </div>
            </div>
          </div>
          
          {/* Preguntas frecuentes */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-blue-800 text-center mb-12">Preguntas Frecuentes</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="font-semibold text-xl text-blue-800 mb-2">¿Mi donación es deducible de impuestos?</h3>
                <p className="text-gray-600">Sí, OceanInsight es una organización sin fines de lucro registrada, por lo que tu donación puede ser deducible de impuestos según las leyes de tu país.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="font-semibold text-xl text-blue-800 mb-2">¿Cómo se utilizan los fondos?</h3>
                <p className="text-gray-600">Los fondos se destinan principalmente a investigación, desarrollo de tecnología, creación de contenido educativo y costos operativos de la plataforma.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="font-semibold text-xl text-blue-800 mb-2">¿Puedo cancelar mi donación recurrente?</h3>
                <p className="text-gray-600">Sí, puedes cancelar tu donación recurrente en cualquier momento desde tu perfil de usuario o contactándonos directamente.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="font-semibold text-xl text-blue-800 mb-2">¿Puedo hacer una donación en nombre de otra persona?</h3>
                <p className="text-gray-600">Por supuesto, puedes hacer una donación como regalo. Solo indícalo en los comentarios al realizar tu aporte.</p>
              </div>
            </div>
          </div>
          
          {/* Empresas patrocinadoras */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-blue-800 text-center mb-8">Nuestros Patrocinadores</h2>
            <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
              Agradecemos a las organizaciones que apoyan nuestra misión de promover el conocimiento y conservación de los océanos.
            </p>
            
            <div className="flex flex-wrap justify-center items-center gap-12">
              {/* Logos de patrocinadores (placeholders) */}
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="h-16 w-40 bg-gray-100 rounded flex items-center justify-center">
                  <span className="text-gray-400 font-medium">Patrocinador {i}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Call to Action */}
          <div className="text-center">
            <h2 className="text-2xl font-bold text-blue-900 mb-6">Otras formas de ayudar</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Si no puedes hacer una donación monetaria, hay muchas otras formas de apoyar nuestra misión.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="/volunteer" className="bg-white hover:bg-gray-50 text-blue-600 font-medium py-3 px-6 rounded-md border border-blue-600 transition-colors duration-300">
                Voluntariado
              </a>
              <a href="/spread-the-word" className="bg-white hover:bg-gray-50 text-blue-600 font-medium py-3 px-6 rounded-md border border-blue-600 transition-colors duration-300">
                Difundir nuestro mensaje
              </a>
              <a href="/partnerships" className="bg-white hover:bg-gray-50 text-blue-600 font-medium py-3 px-6 rounded-md border border-blue-600 transition-colors duration-300">
                Alianzas institucionales
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Modal de agradecimiento */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative">
            <button 
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="text-center mb-4">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">¡Gracias por tu donación!</h3>
              <p className="text-gray-600">
                Tu aporte de ${calculateFinalAmount()} nos ayudará a continuar nuestra labor de investigación y educación oceanográfica.
              </p>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg mb-6">
              <p className="text-blue-800 text-sm">
                Hemos enviado un recibo de tu donación a <strong>{email}</strong>. Si no lo recibes en los próximos minutos, revisa tu carpeta de spam.
              </p>
            </div>
            
            <div className="text-center">
              <button
                onClick={handleCloseModal}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}