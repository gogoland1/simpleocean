import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer
} from 'recharts';

interface AlphaDiversityProps {
  ecosystemType?: string;
}

const AlphaDiversity: React.FC<AlphaDiversityProps> = ({ 
  ecosystemType = 'intermareal' 
}) => {
  const [selectedIndex, setSelectedIndex] = useState<string>('shannon');

  // Datos simulados de índices de diversidad para diferentes ecosistemas
  const diversityIndices = {
    intermareal: {
      shannon: [
        { zone: 'Supralitoral', value: 1.8 },
        { zone: 'Mesolitoral Superior', value: 2.3 },
        { zone: 'Mesolitoral Medio', value: 2.7 },
        { zone: 'Mesolitoral Inferior', value: 3.1 },
        { zone: 'Infralitoral', value: 2.9 },
      ],
      simpson: [
        { zone: 'Supralitoral', value: 0.65 },
        { zone: 'Mesolitoral Superior', value: 0.78 },
        { zone: 'Mesolitoral Medio', value: 0.85 },
        { zone: 'Mesolitoral Inferior', value: 0.90 },
        { zone: 'Infralitoral', value: 0.88 },
      ],
      margalef: [
        { zone: 'Supralitoral', value: 2.1 },
        { zone: 'Mesolitoral Superior', value: 3.4 },
        { zone: 'Mesolitoral Medio', value: 4.2 },
        { zone: 'Mesolitoral Inferior', value: 5.0 },
        { zone: 'Infralitoral', value: 4.6 },
      ],
      pielou: [
        { zone: 'Supralitoral', value: 0.71 },
        { zone: 'Mesolitoral Superior', value: 0.82 },
        { zone: 'Mesolitoral Medio', value: 0.88 },
        { zone: 'Mesolitoral Inferior', value: 0.92 },
        { zone: 'Infralitoral', value: 0.89 },
      ],
    }
  };

  // Selector de índice de diversidad
  const indexOptions = [
    { id: 'shannon', name: 'Índice de Shannon' },
    { id: 'simpson', name: 'Índice de Simpson' },
    { id: 'margalef', name: 'Índice de Margalef' },
    { id: 'pielou', name: 'Equitatividad de Pielou' },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-ocean-dark mb-6">Índices de Diversidad Alfa</h2>
      <p className="mb-4 text-gray-700">
        La diversidad alfa representa la riqueza de especies en un hábitat particular o comunidad.
        Estos índices nos permiten cuantificar la diversidad biológica en un ecosistema específico.
      </p>
      
      <div className="mb-4 bg-gray-100 p-4 rounded-lg">
        <div className="flex flex-wrap gap-2 mb-4">
          {indexOptions.map(option => (
            <button
              key={option.id}
              onClick={() => setSelectedIndex(option.id)}
              className={`px-3 py-1 rounded ${
                selectedIndex === option.id 
                  ? 'bg-ocean text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {option.name}
            </button>
          ))}
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-ocean mb-4">
            {indexOptions.find(o => o.id === selectedIndex)?.name} por Zona (Ecosistema Intermareal)
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={diversityIndices.intermareal[selectedIndex as keyof typeof diversityIndices.intermareal]}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="zone" type="category" width={150} />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#219ebc" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-4 text-sm text-gray-600">
            {selectedIndex === 'shannon' && 
              "El Índice de Shannon mide la entropía de la comunidad. Valores más altos indican mayor diversidad y riqueza."}
            {selectedIndex === 'simpson' && 
              "El Índice de Simpson mide la probabilidad de que dos individuos seleccionados aleatoriamente pertenezcan a la misma especie. Valores cercanos a 1 indican alta diversidad."}
            {selectedIndex === 'margalef' && 
              "El Índice de Margalef relaciona el número de especies con el número total de individuos. Valores más altos indican mayor biodiversidad."}
            {selectedIndex === 'pielou' && 
              "La Equitatividad de Pielou mide la homogeneidad en la distribución de individuos entre especies. Valores cercanos a 1 indican distribución equitativa."}
          </p>
        </div>
      </div>
      
      <div className="mt-6 bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-ocean-dark mb-2">Implementación en Python</h3>
        <div className="bg-gray-800 text-gray-200 p-4 rounded overflow-auto">
          <pre className="text-sm">
{`import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

def shannon_index(abundances):
    """Calcula el índice de Shannon."""
    abundances = np.array(abundances)
    non_zero = abundances[abundances > 0]
    return -np.sum((non_zero/non_zero.sum()) * np.log(non_zero/non_zero.sum()))

def simpson_index(abundances):
    """Calcula el índice de Simpson."""
    abundances = np.array(abundances)
    n = abundances.sum()
    return 1 - np.sum((abundances * (abundances - 1)) / (n * (n - 1)))

def evenness_index(abundances):
    """Calcula el índice de equitatividad de Pielou."""
    s = shannon_index(abundances)
    return s / np.log(len(abundances))

# Ejemplo de uso:
abundances = [120, 45, 78, 10, 25, 32]
print(f"Shannon: {shannon_index(abundances):.4f}")
print(f"Simpson: {simpson_index(abundances):.4f}")
print(f"Evenness: {evenness_index(abundances):.4f}")`}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default AlphaDiversity; 