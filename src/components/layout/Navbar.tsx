import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPerspectivesOpen, setIsPerspectivesOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const togglePerspectives = () => {
    setIsPerspectivesOpen(!isPerspectivesOpen);
  };

  return (
    <header className="bg-ocean-dark text-white">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Ocean<span className="text-ocean-light">Insight</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6">
          <Link href="/" className="hover:text-ocean-light">
            Inicio
          </Link>
          <Link href="/biological" className="hover:text-ocean-light">
            Biología Marina
          </Link>
          <Link href="/physical" className="hover:text-ocean-light">
            Oceanografía Física
          </Link>
          <Link href="/chemical" className="hover:text-ocean-light">
            Oceanografía Química
          </Link>
          <Link href="/geological" className="hover:text-ocean-light">
            Oceanografía Geológica
          </Link>
          <Link href="/ai-glossary" className="hover:text-ocean-light">
            Diccionario IA
          </Link>
          <Link href="/quantum" className="hover:text-ocean-light">
            Computación Cuántica
          </Link>
          
          {/* Dropdown para las nuevas secciones */}
          <div className="relative group">
            <button className="flex items-center hover:text-ocean-light focus:outline-none">
              Perspectivas Interdisciplinarias
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            <div className="absolute left-0 mt-2 w-48 bg-ocean-dark rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
              <div className="py-1 border border-gray-700 rounded-md">
                <Link href="/wellbeing" className="block px-4 py-2 text-sm hover:bg-gray-700 hover:text-ocean-light">
                  Bienestar
                </Link>
                <Link href="/social-sciences" className="block px-4 py-2 text-sm hover:bg-gray-700 hover:text-ocean-light">
                  Ciencias Sociales
                </Link>
                <Link href="/innovation" className="block px-4 py-2 text-sm hover:bg-gray-700 hover:text-ocean-light">
                  Innovación
                </Link>
              </div>
            </div>
          </div>
          
          {/* Nuevo enlace a Donaciones */}
          <Link href="/donate" className="hover:text-ocean-light">
            Donaciones
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white focus:outline-none"
          onClick={toggleMenu}
        >
          {isMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-ocean-dark border-t border-gray-700">
          <div className="container mx-auto px-4 py-2">
            <Link href="/" className="block py-2 hover:text-ocean-light">
              Inicio
            </Link>
            <Link href="/biological" className="block py-2 hover:text-ocean-light">
              Biología Marina
            </Link>
            <Link href="/physical" className="block py-2 hover:text-ocean-light">
              Oceanografía Física
            </Link>
            <Link href="/chemical" className="block py-2 hover:text-ocean-light">
              Oceanografía Química
            </Link>
            <Link href="/geological" className="block py-2 hover:text-ocean-light">
              Oceanografía Geológica
            </Link>
            <Link href="/ai-glossary" className="block py-2 hover:text-ocean-light">
              Diccionario IA
            </Link>
            <Link href="/quantum" className="block py-2 hover:text-ocean-light">
              Computación Cuántica
            </Link>
            
            {/* Sección desplegable en móvil */}
            <div>
              <button 
                onClick={togglePerspectives}
                className="flex items-center justify-between w-full py-2 hover:text-ocean-light"
              >
                <span>Perspectivas Interdisciplinarias</span>
                <svg 
                  className={`w-4 h-4 transition-transform duration-200 ${isPerspectivesOpen ? 'transform rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              
              {isPerspectivesOpen && (
                <div className="pl-4 border-l border-gray-700 ml-2">
                  <Link href="/wellbeing" className="block py-2 hover:text-ocean-light">
                    Bienestar
                  </Link>
                  <Link href="/social-sciences" className="block py-2 hover:text-ocean-light">
                    Ciencias Sociales
                  </Link>
                  <Link href="/innovation" className="block py-2 hover:text-ocean-light">
                    Innovación
                  </Link>
                </div>
              )}
            </div>
            
            {/* Nuevo enlace a Donaciones en mobile */}
            <Link href="/donate" className="block py-2 hover:text-ocean-light">
              Donaciones
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}