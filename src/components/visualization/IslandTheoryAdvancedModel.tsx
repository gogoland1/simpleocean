// src/components/visualization/IslandTheoryAdvancedModel.tsx
import { useState, useEffect, useRef } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine
} from 'recharts';

// Definir interfaz para los datos del gráfico
interface DataPoint {
  species: number;
  immigration: number;
  extinction: number;
}

// Interfaz para el punto de equilibrio
interface EquilibriumPoint {
  species: number;
  rate: number;
}

const IslandTheoryAdvancedModel: React.FC = () => {
  // Estados para parámetros
  const [distFactor, setDistFactor] = useState(0.5);
  const [areaFactor, setAreaFactor] = useState(2.0);
  const [selectedModel, setSelectedModel] = useState('classic');
  
  // Estado para datos generados
  const [data, setData] = useState<DataPoint[]>([]);
  const [equilibrium, setEquilibrium] = useState<EquilibriumPoint | null>(null);
  
  // Estado para dimensiones del gráfico
  const [chartWidth, setChartWidth] = useState(800);
  const chartContainerRef = useRef<HTMLDivElement>(null);
  
  // Constantes
  const S_MAX = 100; // Máximo de especies en pool continental
  
  // Definiciones de modelos disponibles
  const models = [
    { id: 'classic', name: 'Modelo Clásico' },
    { id: 'founder', name: 'Efecto Fundador' },
    { id: 'cascade', name: 'Extinción en Cascada' },
    { id: 'allee', name: 'Efecto Allee' },
    { id: 'facilitation', name: 'Facilitación' }
  ];
  
  // Descripciones de modelos
  const modelDescriptions: Record<string, string> = {
    classic: "Modelo Clásico: Propuesto por MacArthur y Wilson (1967). Predice equilibrio basado en balance entre inmigración y extinción.",
    founder: "Efecto Fundador: Colonización dificultada para primeras especies por falta de diversidad genética y ausencia de facilitadores.",
    cascade: "Extinción en Cascada: A altas densidades, la extinción se acelera por competencia y efectos en cadena cuando se pierden especies clave.",
    allee: "Efecto Allee: Poblaciones pequeñas sufren tasas de extinción desproporcionadamente altas por falta de parejas, polinizadores, etc.",
    facilitation: "Facilitación: Algunas especies mejoran las condiciones para otras, acelerando la inmigración en fases intermedias de colonización."
  };
  
  // Funciones del modelo clásico
  const classicImmigration = (S: number): number => {
    return Math.max(0, (S_MAX - S) * Math.exp(-distFactor));
  };
  
  const classicExtinction = (S: number): number => {
    return S * Math.exp(-areaFactor);
  };
  
  // Funciones con efectos no lineales
  const nonlinearImmigrationFounder = (S: number): number => {
    // Efecto fundador: tasa reducida para pequeñas S
    if (S < 10) {
      return Math.max(0, (S_MAX - S) * Math.exp(-distFactor) * 0.3);
    } else {
      return Math.max(0, (S_MAX - S) * Math.exp(-distFactor));
    }
  };
  
  const nonlinearExtinctionCascade = (S: number): number => {
    // Extinción en cascada: aumentos abruptos a ciertos umbrales
    const baseRate = S * Math.exp(-areaFactor);
    if (S > 60) {
      return baseRate * 2;  // Extinción acelerada por competencia
    }
    return baseRate;
  };
  
  const nonlinearExtinctionAllee = (S: number): number => {
    // Efecto Allee: extinción muy alta a bajas densidades
    const baseRate = S * Math.exp(-areaFactor);
    if (S < 15) {
      return baseRate * 3 + 1;  // Extinción acelerada por efecto Allee
    }
    return baseRate;
  };
  
  const nonlinearImmigrationFacilitation = (S: number): number => {
    // Facilitación: algunas especies facilitan establecimiento
    const baseRate = Math.max(0, (S_MAX - S) * Math.exp(-distFactor));
    if (20 < S && S < 50) {
      return baseRate * 1.5;  // Fase de facilitación
    }
    return baseRate;
  };
  
  // Generar los datos para el gráfico
  const generateData = (): DataPoint[] => {
    const newData: DataPoint[] = [];
    
    // Seleccionar las funciones apropiadas según el modelo
    let immigrationFunction, extinctionFunction;
    
    switch (selectedModel) {
      case 'founder':
        immigrationFunction = nonlinearImmigrationFounder;
        extinctionFunction = classicExtinction;
        break;
      case 'cascade':
        immigrationFunction = classicImmigration;
        extinctionFunction = nonlinearExtinctionCascade;
        break;
      case 'allee':
        immigrationFunction = classicImmigration;
        extinctionFunction = nonlinearExtinctionAllee;
        break;
      case 'facilitation':
        immigrationFunction = nonlinearImmigrationFacilitation;
        extinctionFunction = classicExtinction;
        break;
      case 'classic':
      default:
        immigrationFunction = classicImmigration;
        extinctionFunction = classicExtinction;
    }
    
    // Generar puntos de datos
    for (let i = 0; i <= S_MAX; i += 2) {
      const immigrationRate = immigrationFunction(i);
      const extinctionRate = extinctionFunction(i);
      
      newData.push({
        species: i,
        immigration: immigrationRate,
        extinction: extinctionRate
      });
    }
    
    return newData;
  };
  
  // Calcular punto de equilibrio donde las curvas se cruzan
  const findEquilibrium = (data: DataPoint[]): EquilibriumPoint | null => {
    if (data.length === 0) return null;
    
    let minDiff = Infinity;
    let equilibrium: EquilibriumPoint | null = null;
    
    for (const point of data) {
      const diff = Math.abs(point.immigration - point.extinction);
      if (diff < minDiff) {
        minDiff = diff;
        equilibrium = {
          species: point.species,
          rate: point.immigration
        };
      }
    }
    
    return equilibrium;
  };
  
  // Obtener interpretación específica según el modelo seleccionado
  const getModelInterpretation = () => {
    if (!equilibrium) return '';
    
    switch (selectedModel) {
      case 'founder':
        return `En este modelo de efecto fundador, la dificultad inicial para establecer especies resulta en un equilibrio de ${equilibrium.species} especies, menor que en el modelo clásico bajo las mismas condiciones.`;
      case 'cascade':
        return `Con extinción en cascada, el equilibrio se estabiliza en ${equilibrium.species} especies, pero este equilibrio es más frágil ya que la pérdida de especies clave puede provocar extinciones en cadena a altas densidades.`;
      case 'allee':
        return `Debido al efecto Allee, el equilibrio de ${equilibrium.species} especies es inestable para poblaciones pequeñas, donde la extinción se acelera desproporcionadamente.`;
      case 'facilitation':
        return `El fenómeno de facilitación permite un equilibrio de ${equilibrium.species} especies, con tasas de inmigración aumentadas en fases intermedias donde especies establecidas facilitan la llegada de nuevas.`;
      case 'classic':
      default:
        return `En estas condiciones, la isla mantiene un equilibrio dinámico de ${equilibrium.species} especies donde la tasa de llegada de nuevas especies iguala a la tasa de extinción de especies residentes.`;
    }
  };
  
  // Efecto para actualizar los datos cuando cambian los parámetros
  useEffect(() => {
    const newData = generateData();
    setData(newData);
    setEquilibrium(findEquilibrium(newData));
  }, [distFactor, areaFactor, selectedModel]);
  
  // Efecto para ajustar el tamaño del gráfico según el contenedor
  useEffect(() => {
    const handleResize = () => {
      if (chartContainerRef.current) {
        const containerWidth = chartContainerRef.current.clientWidth;
        setChartWidth(Math.min(containerWidth, 800));
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return (
    <div className="w-full p-4">
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-4">Modelo Interactivo de MacArthur-Wilson</h3>
        
        {/* Selector de modelo */}
        <div className="mb-6">
          <h4 className="text-lg font-medium mb-2">Selecciona un modelo:</h4>
          <div className="flex flex-wrap gap-2">
            {models.map((model) => (
              <button
                key={model.id}
                className={`px-4 py-2 rounded-full text-sm ${
                  selectedModel === model.id
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                onClick={() => setSelectedModel(model.id)}
              >
                {model.name}
              </button>
            ))}
          </div>
        </div>
        
        {/* Descripción del modelo seleccionado */}
        <div className="p-4 bg-blue-50 rounded-lg mb-6">
          <p className="text-sm">
            {modelDescriptions[selectedModel]}
          </p>
        </div>
        
        {/* Controles de parámetros */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Distancia al Continente: {distFactor.toFixed(1)}
            </label>
            <input
              type="range"
              min="0.1"
              max="2"
              step="0.1"
              value={distFactor}
              onChange={(e) => setDistFactor(parseFloat(e.target.value))}
              className="w-full"
            />
            <p className="text-xs text-gray-500 mt-1">
              Mayor valor = isla más alejada del continente (menor inmigración)
            </p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tamaño de la Isla: {areaFactor.toFixed(1)}
            </label>
            <input
              type="range"
              min="0.1"
              max="4"
              step="0.1"
              value={areaFactor}
              onChange={(e) => setAreaFactor(parseFloat(e.target.value))}
              className="w-full"
            />
            <p className="text-xs text-gray-500 mt-1">
              Mayor valor = isla más grande (menor extinción)
            </p>
          </div>
        </div>
      </div>
      
      {/* Gráfico */}
      <div ref={chartContainerRef} className="w-full bg-white p-4 rounded-lg shadow">
        <LineChart
          width={chartWidth}
          height={Math.max(300, chartWidth * 0.5)}
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="species" 
            label={{ value: 'Número de Especies (S)', position: 'insideBottomRight', offset: -10 }} 
          />
          <YAxis label={{ value: 'Tasa', angle: -90, position: 'insideLeft' }} />
          <Tooltip 
            formatter={(value: number) => [value.toFixed(2), '']}
            labelFormatter={(label) => `Especies: ${label}`}
          />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="immigration" 
            stroke="#3b82f6" 
            name="Tasa de Inmigración"
            dot={false}
            activeDot={{ r: 6 }}
          />
          <Line 
            type="monotone" 
            dataKey="extinction" 
            stroke="#ef4444" 
            name="Tasa de Extinción" 
            dot={false}
            activeDot={{ r: 6 }}
          />
          {equilibrium && (
            <ReferenceLine 
              x={equilibrium.species} 
              stroke="gray" 
              strokeDasharray="3 3" 
              label={{ value: `Equilibrio: ${equilibrium.species} especies`, position: 'top' }} 
            />
          )}
        </LineChart>
        
        {/* Interpretación del equilibrio */}
        {equilibrium && (
          <div className="mt-4 p-3 bg-blue-50 rounded text-sm">
            <p className="font-bold mb-1">Punto de equilibrio: {equilibrium.species} especies</p>
            <p><strong>Interpretación:</strong> {getModelInterpretation()}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default IslandTheoryAdvancedModel;