import React, { useEffect, useState } from 'react';

interface VisitCounterProps {
  className?: string;
}

const VisitCounter: React.FC<VisitCounterProps> = ({ className = "" }) => {
  const [visits, setVisits] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    // Evitar problemas de hidratación en SSR
    setIsLoaded(true);
    
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

  if (!isLoaded) return null;

  return (
    <div className={`bg-white bg-opacity-80 rounded-full shadow-md px-3 py-1 text-sm text-gray-700 font-medium ${className}`}>
      <span>Visitas: {visits.toLocaleString()}</span>
    </div>
  );
};

export default VisitCounter;