import React, { useState } from 'react';
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';

// Define la interfaz correctamente
interface BiodiversityAnalysisProps {
  ecosystemType?: 'intermareal' | 'arrecife' | 'fiordo' | 'hidrotermal' | 'oceanico' | 'estuario';
}

// Usa FC (FunctionComponent) de React con la interfaz de propiedades
const BiodiversityAnalysis: React.FC<BiodiversityAnalysisProps> = ({ 
  ecosystemType = 'intermareal' 
}) => {
  const [selectedIndex, setSelectedIndex] = useState<string>('shannon');
  const [zoneView, setZoneView] = useState<'vertical' | 'horizontal'>('vertical');

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
    },
    // Datos para otros ecosistemas podrían añadirse aquí
  };

  // Datos de composición de especies (simulados)
  const speciesComposition = {
    intermareal: [
      { name: 'Macroalgas', value: 35 },
      { name: 'Moluscos', value: 25 },
      { name: 'Crustáceos', value: 20 },
      { name: 'Cnidarios', value: 10 },
      { name: 'Equinodermos', value: 5 },
      { name: 'Otros', value: 5 },
    ],
    // Datos para otros ecosistemas podrían añadirse aquí
  };

  // Datos de zonación (simulados)
  const zonationData = {
    intermareal: {
      vertical: [
        { 
          zoneName: 'Supralitoral', 
          dominantSpecies: ['Littorina saxatilis', 'Verrucaria maura', 'Lichina pygmaea'],
          environmentalFactors: 'Alta exposición al aire, temperaturas extremas, baja humedad'
        },
        { 
          zoneName: 'Mesolitoral Superior', 
          dominantSpecies: ['Chthamalus stellatus', 'Patella vulgata', 'Fucus spiralis'],
          environmentalFactors: 'Exposición moderada, ciclos de marea, desecación periódica'
        },
        { 
          zoneName: 'Mesolitoral Medio', 
          dominantSpecies: ['Mytilus edulis', 'Fucus vesiculosus', 'Semibalanus balanoides'],
          environmentalFactors: 'Exposición equilibrada aire/agua, salinidad variable'
        },
        { 
          zoneName: 'Mesolitoral Inferior', 
          dominantSpecies: ['Fucus serratus', 'Palmaria palmata', 'Laminaria digitata (juvenil)'],
          environmentalFactors: 'Cortos periodos de exposición, hidrodinamismo alto'
        },
        { 
          zoneName: 'Infralitoral', 
          dominantSpecies: ['Laminaria hyperborea', 'Saccorhiza polyschides', 'Cystoseira spp.'],
          environmentalFactors: 'Sumergido permanentemente, competencia por luz'
        },
      ],
      horizontal: [
        { 
          zoneName: 'Zona protegida', 
          dominantSpecies: ['Ascophyllum nodosum', 'Fucus ceranoides', 'Littorina obtusata'],
          environmentalFactors: 'Bajo hidrodinamismo, acumulación de sedimentos'
        },
        { 
          zoneName: 'Zona moderada', 
          dominantSpecies: ['Fucus vesiculosus', 'Patella vulgata', 'Gibbula umbilicalis'],
          environmentalFactors: 'Hidrodinamismo medio, sustrato mixto'
        },
        { 
          zoneName: 'Zona expuesta', 
          dominantSpecies: ['Mytilus galloprovincialis', 'Chthamalus montagui', 'Corallina officinalis'],
          environmentalFactors: 'Alto hidrodinamismo, sustrato rocoso, abrasión por olas'
        },
      ]
    },
    // Datos para otros ecosistemas podrían añadirse aquí
  };

  // Colors for pie chart
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

  // Selector de índice de diversidad
  const indexOptions = [
    { id: 'shannon', name: 'Índice de Shannon' },
    { id: 'simpson', name: 'Índice de Simpson' },
    { id: 'margalef', name: 'Índice de Margalef' },
    { id: 'pielou', name: 'Equitatividad de Pielou' },
  ];

  return (
    <div className="space-y-10">
      <section>
        <h2 className="text-2xl font-bold text-ocean-dark mb-6">Índices de Diversidad Alfa</h2>
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
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-ocean-dark mb-4">Composición de Especies</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={speciesComposition.intermareal}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {speciesComposition.intermareal.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value}%`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-4 text-sm text-gray-600">
            Distribución de los principales grupos taxonómicos en el ecosistema intermareal estudiado.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-ocean-dark mb-4">Zonación del Intermareal</h2>
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setZoneView('vertical')}
              className={`px-3 py-1 rounded ${
                zoneView === 'vertical' 
                  ? 'bg-ocean text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Zonación Vertical
            </button>
            <button
              onClick={() => setZoneView('horizontal')}
              className={`px-3 py-1 rounded ${
                zoneView === 'horizontal' 
                  ? 'bg-ocean text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Zonación Horizontal
            </button>
          </div>
          
          <div className="overflow-auto max-h-64">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-2 px-3 text-left">Zona</th>
                  <th className="py-2 px-3 text-left">Especies Dominantes</th>
                  <th className="py-2 px-3 text-left">Factores Ambientales</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {zonationData.intermareal[zoneView].map((zone, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="py-2 px-3 font-medium">{zone.zoneName}</td>
                    <td className="py-2 px-3">{zone.dominantSpecies.join(', ')}</td>
                    <td className="py-2 px-3">{zone.environmentalFactors}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="bg-ocean-light bg-opacity-10 p-6 rounded-lg">
        <h2 className="text-2xl font-bold text-ocean-dark mb-4">Proyecto tIAmat - Análisis Avanzado</h2>
        <p className="mb-4">
          El proyecto tIAmat ofrece herramientas de análisis avanzadas para el estudio de la biodiversidad en ecosistemas marinos. 
          Utilizando algoritmos de aprendizaje automático, tIAmat puede:
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Calcular automáticamente múltiples índices de diversidad</li>
          <li>Identificar patrones de zonación y distribución de especies</li>
          <li>Comparar comunidades utilizando análisis multivariante</li>
          <li>Visualizar datos espacialmente mediante integración con Google Earth Engine</li>
          <li>Generar modelos predictivos para estimar biodiversidad en diferentes escenarios</li>
        </ul>
        <button className="bg-ocean text-white px-4 py-2 rounded hover:bg-ocean-dark transition">
          Ver Documentación de tIAmat
        </button>
      </section>
    </div>
  );
};

export default BiodiversityAnalysis;