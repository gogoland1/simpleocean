import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

// Definiendo la interfaz para el slide del carrusel
interface CarouselSlide {
  id: number;
  title: string;
  description: string;
  image: string;
  route: string;
  icon: string;
}

const OceanInsightHome: React.FC = () => {
  const router = useRouter();
  // Estado para el carrusel
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  // Estado para el contador de visitas
  const [visits, setVisits] = useState<number>(0);
  
  // Datos para el carrusel basados en tus imágenes existentes
  const slides: CarouselSlide[] = [
    {
      id: 1,
      title: "Biología Marina",
      description: "Estudio de organismos marinos, ecosistemas y biodiversidad",
      image: "/images/index/biological.png",
      route: "/biological",
      icon: "🐠"
    },
    {
      id: 2,
      title: "Oceanografía Física",
      description: "Análisis de corrientes, mareas, olas y propiedades físicas",
      image: "/images/index/physical.png",
      route: "/physical",
      icon: "🌊"
    },
    {
      id: 3,
      title: "Oceanografía Química",
      description: "Composición química del agua y procesos biogeoquímicos",
      image: "/images/index/chemical.png",
      route: "/chemical",
      icon: "🧪"
    },
    {
      id: 4,
      title: "Oceanografía Geológica",
      description: "Estudio del fondo marino, sedimentos y procesos geológicos",
      image: "/images/index/geological.png",
      route: "/geological",
      icon: "🏝️"
    },
    {
      id: 5,
      title: "Computación Cuántica",
      description: "Aplicaciones innovadoras de la computación cuántica en oceanografía",
      image: "/images/index/quantum.png",
      route: "/quantum",
      icon: "⚛️"
    },
    {
      id: 6,
      title: "Ciencias Sociales",
      description: "Impacto social y cultural de los estudios oceanográficos",
      image: "/images/index/social.png",
      route: "/social-sciences",
      icon: "👥"
    },
    {
      id: 7,
      title: "Bienestar",
      description: "Relación entre los océanos y el bienestar humano",
      image: "/images/index/wellbeing.png",
      route: "/wellbeing",
      icon: "🧠"
    },
    {
      id: 8,
      title: "Innovación",
      description: "Tecnologías emergentes en investigación marina",
      image: "/images/index/innovation.png",
      route: "/innovation",
      icon: "💡"
    }
  ];

  // Auto-deslizamiento del carrusel
  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    
    if (!isPaused) {
      interval = setInterval(() => {
        setActiveIndex((current) => (current === slides.length - 1 ? 0 : current + 1));
      }, 5000); // Cambia cada 5 segundos
    }
    
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isPaused, slides.length]);
  
  // Contador de visitas
  useEffect(() => {
    // Intentar obtener el número de visitas del localStorage
    const storedVisits = localStorage.getItem('oceanInsightVisits');
    let currentVisits = storedVisits ? parseInt(storedVisits) : 0;
    
    // Incrementar contador solo una vez por sesión
    if (!sessionStorage.getItem('visitCounted')) {
      currentVisits += 1;
      sessionStorage.setItem('visitCounted', 'true');
    }
    
    // Guardar en localStorage
    localStorage.setItem('oceanInsightVisits', currentVisits.toString());
    
    // Actualizar estado
    setVisits(currentVisits);
  }, []);

  // Funciones para el carrusel
  const goToSlide = (index: number): void => {
    setActiveIndex(index);
  };

  const nextSlide = (): void => {
    setActiveIndex((current) => (current === slides.length - 1 ? 0 : current + 1));
  };

  const prevSlide = (): void => {
    setActiveIndex((current) => (current === 0 ? slides.length - 1 : current - 1));
  };

  // Función para navegar a la página correspondiente
  const navigateToPage = (route: string): void => {
    router.push(route);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#0c1016]">
      <Head>
        <title>OceanInsight | Consultoría oceanográfica especializada</title>
        <meta name="description" content="Consultoría oceanográfica especializada potenciada por IA" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Navegación - Barra superior con fuente grande */}
      <nav className="bg-[#152238] text-white py-5 relative z-30">
        <div className="container mx-auto px-4 flex items-center justify-between">
          {/* Logo con tamaño grande */}
          <div className="text-5xl font-bold">
            OceanInsight
          </div>
          
          {/* Enlaces de navegación en una sola línea */}
          <div className="flex flex-wrap justify-end text-lg">
            <Link href="/" legacyBehavior><a className="px-3 py-2 hover:bg-[#1c2e4a] rounded">Inicio</a></Link>
            <Link href="/biological" legacyBehavior><a className="px-3 py-2 hover:bg-[#1c2e4a] rounded">Biología Marina</a></Link>
            <Link href="/biological/species-distribution" legacyBehavior><a className="px-3 py-2 hover:bg-[#1c2e4a] rounded">Modelo de Distribución</a></Link>
            <Link href="/physical" legacyBehavior><a className="px-3 py-2 hover:bg-[#1c2e4a] rounded">Oceanografía Física</a></Link>
            <Link href="/chemical" legacyBehavior><a className="px-3 py-2 hover:bg-[#1c2e4a] rounded">Oceanografía Química</a></Link>
            <Link href="/geological" legacyBehavior><a className="px-3 py-2 hover:bg-[#1c2e4a] rounded">Oceanografía Geológica</a></Link>
            <Link href="/dictionary" legacyBehavior><a className="px-3 py-2 hover:bg-[#1c2e4a] rounded">Diccionario IA</a></Link>
            <Link href="/quantum" legacyBehavior><a className="px-3 py-2 hover:bg-[#1c2e4a] rounded">Computación Cuántica</a></Link>
            
            {/* Menú desplegable */}
            <div className="relative group px-3 py-2 hover:bg-[#1c2e4a] rounded">
              <span className="cursor-pointer">Perspectivas Interdisciplinarias ▾</span>
              {/* Dropdown menu */}
              <div className="absolute right-0 mt-2 w-60 bg-[#1c2e4a] rounded shadow-lg z-10 hidden group-hover:block">
                <Link href="/innovation" legacyBehavior><a className="block px-4 py-2 hover:bg-[#273b5e] rounded-t">Innovación</a></Link>
                <Link href="/wellbeing" legacyBehavior><a className="block px-4 py-2 hover:bg-[#273b5e]">Bienestar</a></Link>
                <Link href="/social-sciences" legacyBehavior><a className="block px-4 py-2 hover:bg-[#273b5e] rounded-b">Ciencias Sociales</a></Link>
              </div>
            </div>
            
            {/* Nuevo enlace a Donaciones */}
            <Link href="/donate" legacyBehavior><a className="px-3 py-2 hover:bg-[#1c2e4a] rounded">Donaciones</a></Link>
          </div>
        </div>
      </nav>
      
      {/* Contador de visitas */}
      <div className="fixed bottom-6 left-6 z-50 bg-white bg-opacity-80 rounded-full shadow-md px-3 py-1 text-sm text-gray-700 font-medium">
        <span>Visitas: {visits.toLocaleString()}</span>
      </div>
      
      {/* Botón flotante de donaciones */}
      <Link href="/donate" legacyBehavior>
        <a className="fixed bottom-6 right-6 z-50 bg-[#00a3d9] hover:bg-[#0095c8] text-white font-bold py-3 px-5 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center">
          <span className="mr-2">❤️</span>
          <span>Dona Aquí</span>
        </a>
      </Link>

      {/* Carrusel a pantalla completa */}
      <div className="flex-grow relative overflow-hidden">
        {/* Diapositivas */}
        <div 
          className="absolute inset-0 flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {slides.map((slide) => (
            <div 
              key={slide.id} 
              className="min-w-full h-full relative cursor-pointer"
              onClick={() => navigateToPage(slide.route)}
            >
              {/* Imagen que cubre toda la pantalla de navegación a pie de página */}
              <img 
                src={slide.image} 
                alt={slide.title} 
                className="w-full h-full object-cover"
                onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                  const target = e.currentTarget as HTMLImageElement;
                  target.src = "https://via.placeholder.com/1920x1080?text=" + slide.title;
                }}
              />
              
              {/* Icono en la parte superior - Más grande*/}
              <div className="absolute top-12 left-1/2 transform -translate-x-1/2 z-10">
                <div className="w-20 h-20 rounded-full bg-[#6b44b8]/80 flex items-center justify-center animate-float">
                  <span className="text-4xl">{slide.icon}</span>
                </div>
              </div>
              
              {/* Título y descripción - MUCHO MÁS GRANDES */}
              <div className="absolute bottom-44 left-1/2 transform -translate-x-1/2 text-center w-full z-10">
                <h2 className="text-7xl font-bold text-white mb-6 drop-shadow-lg">
                  {slide.title}
                </h2>
                <p className="text-white text-2xl max-w-4xl mx-auto mb-8">
                  {slide.description}
                </p>
                
                {/* Botón Explorar MÁS GRANDE */}
                <button className="bg-[#00a3d9] hover:bg-[#0095c8] text-white text-xl font-semibold py-4 px-12 rounded-lg shadow-lg transform hover:scale-105 transition-all">
                  Explorar
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Flechas de navegación MUCHO MÁS GRANDES */}
        <button 
          className="absolute left-12 top-1/2 transform -translate-y-1/2 z-10 text-white"
          onClick={(e) => {
            e.stopPropagation();
            prevSlide();
          }}
          aria-label="Anterior"
        >
          <div className="w-24 h-24 flex items-center justify-center bg-black/30 hover:bg-black/50 rounded-full transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </div>
        </button>
        
        <button 
          className="absolute right-12 top-1/2 transform -translate-y-1/2 z-10 text-white"
          onClick={(e) => {
            e.stopPropagation();
            nextSlide();
          }}
          aria-label="Siguiente"
        >
          <div className="w-24 h-24 flex items-center justify-center bg-black/30 hover:bg-black/50 rounded-full transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </div>
        </button>
        
        {/* Indicadores de diapositiva más grandes */}
        <div className="absolute bottom-28 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                goToSlide(index);
              }}
              className={`w-5 h-5 rounded-full transition-all ${
                index === activeIndex ? 'bg-white scale-125' : 'bg-white/40'
              }`}
              aria-label={`Ir a diapositiva ${index + 1}`}
            />
          ))}
        </div>

        {/* Botón de consulta gratis - MÁS GRANDE, ahora con enlace a Contact */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-10">
          <Link href="/contact" legacyBehavior>
            <a className="bg-[#00a3d9] hover:bg-[#0095c8] text-white text-xl font-semibold py-4 px-12 rounded-lg shadow-lg transform hover:scale-105 transition-all inline-block">
              Consulta gratis
            </a>
          </Link>
        </div>
      </div>

      {/* Footer - MÁS GRANDE */}
      <footer className="bg-[#0c1016] text-gray-400 py-4 text-center border-t border-gray-800">
        <div className="text-lg">
          © 2025 OceanInsight | Consultoría oceanográfica
        </div>
      </footer>

      {/* Estilos personalizados */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(-50%);
          }
          50% {
            transform: translateY(-15px) translateX(-50%);
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        html, body {
          background-color: #0c1016;
          margin: 0;
          padding: 0;
          height: 100%;
          width: 100%;
          overflow-x: hidden;
        }
        
        .drop-shadow-lg {
          text-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
        }
      `}</style>
    </div>
  );
};

export default OceanInsightHome;