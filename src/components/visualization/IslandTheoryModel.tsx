// src/components/visualization/IslandTheoryModel.tsx (o donde esté ubicado)
import { useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine
} from 'recharts';

// Definición de interfaces
interface DataPoint {
  species: number;
  immigration: number;
  extinction: number;
}

const IslandTheoryModel: React.FC = () => {
  const [distFactor, setDistFactor] = useState(0.5);
  const [areaFactor, setAreaFactor] = useState(2.0);
  
  // Generar datos para el gráfico
  const generateData = (): DataPoint[] => {
    const data: DataPoint[] = [];
    const maxSpecies = 100;
    
    for (let i = 0; i <= maxSpecies; i += 2) {
      // Tasa de inmigración: disminuye con el número de especies
      const immigrationRate = Math.max(0, (maxSpecies - i) * Math.exp(-distFactor));
      
      // Tasa de extinción: aumenta con el número de especies
      const extinctionRate = i * Math.exp(-areaFactor);
      
      data.push({
        species: i,
        immigration: immigrationRate,
        extinction: extinctionRate
      });
    }
    
    return data;
  };
  
  // Calcular punto de equilibrio
  const findEquilibrium = (data: DataPoint[]): DataPoint | null => {
    let minDiff = Infinity;
    let equilibrium: DataPoint | null = null;
    
    data.forEach(point => {
      const diff = Math.abs(point.immigration - point.extinction);
      if (diff < minDiff) {
        minDiff = diff;
        equilibrium = point;
      }
    });
    
    return equilibrium;
  };
  
  const data = generateData();
  const equilibrium = findEquilibrium(data);
  
  return (
    <div className="w-full p-4">
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-4">Modelo Interactivo de MacArthur-Wilson</h3>
        <p className="mb-2">
          Ajusta los parámetros para ver cómo afectan al equilibrio de especies:
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
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
      
      <div className="w-full bg-white p-4 rounded-lg shadow">
        {equilibrium ? (
          <>
            <LineChart
              width={800}
              height={400}
              data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="species" 
                label={{ value: 'Número de Especies (S)', position: 'insideBottomRight', offset: -10 }} 
              />
              <YAxis label={{ value: 'Tasa', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
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
              <ReferenceLine 
                x={equilibrium.species} 
                stroke="gray" 
                strokeDasharray="3 3" 
                label={{ value: `Equilibrio: ${equilibrium.species} especies`, position: 'top' }} 
              />
            </LineChart>
            
            <div className="mt-4 p-3 bg-blue-50 rounded text-sm">
              <p><strong>Punto de equilibrio:</strong> {equilibrium.species} especies</p>
              <p><strong>Interpretación:</strong> En estas condiciones, la isla mantiene un equilibrio 
              dinámico de {equilibrium.species} especies donde la tasa de llegada de nuevas especies 
              iguala a la tasa de extinción de especies residentes.</p>
            </div>
          </>
        ) : (
          <p>No se pudo calcular el punto de equilibrio.</p>
        )}
      </div>
    </div>
  );
};

export default IslandTheoryModel;