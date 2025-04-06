import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Tipos
type ParameterType = 'oxygen' | 'nutrients' | 'pH' | 'alkalinity' | 'salinity';
type AnalysisType = 'profile' | 'distribution' | 'timeSeries' | 'comparison';
type RegionType = 'pacific' | 'atlantic' | 'indian' | 'arctic';
type DepthType = 'surface' | 'mixed' | 'deep' | 'bottom';

interface ChemicalAnalysisProps {
  analysisType?: AnalysisType;
  parameter?: ParameterType;
}

// Constantes y datos
const PARAMS = {
  oxygen: { name: 'Oxígeno Disuelto (ml/L)', color: '#3498db' },
  pH: { name: 'pH', color: '#2ecc71' },
  alkalinity: { name: 'Alcalinidad Total (meq/kg)', color: '#9b59b6' },
  salinity: { name: 'Salinidad (psu)', color: '#e74c3c' },
  nutrients: { name: 'Nutrientes', color: '#f39c12' }
};

const ANALYSES = [
  { id: 'profile', name: 'Perfil Vertical' },
  { id: 'distribution', name: 'Distribución Regional' },
  { id: 'timeSeries', name: 'Serie Temporal' },
  { id: 'comparison', name: 'Comparación de Masas de Agua' }
];

// Datos simplificados
const DATA = {
  vertical: {
    oxygen: [
      { depth: 0, value: 8.5, label: 'Superficie' },
      { depth: 100, value: 6.2, label: '100m' },
      { depth: 250, value: 4.8, label: '250m' },
      { depth: 500, value: 3.5, label: '500m' },
      { depth: 1000, value: 4.2, label: '1000m' },
      { depth: 2000, value: 5.1, label: '2000m' },
      { depth: 3000, value: 5.5, label: '3000m' },
      { depth: 4000, value: 5.7, label: '4000m' }
    ],
    nutrients: [
      { depth: 0, nitrate: 0.2, phosphate: 0.05, silicate: 1.2 },
      { depth: 100, nitrate: 5.6, phosphate: 0.8, silicate: 10.5 },
      { depth: 250, nitrate: 28.5, phosphate: 1.8, silicate: 35.6 },
      { depth: 500, nitrate: 35.2, phosphate: 2.2, silicate: 80.4 },
      { depth: 1000, nitrate: 36.8, phosphate: 2.4, silicate: 120.6 },
      { depth: 2000, nitrate: 34.5, phosphate: 2.3, silicate: 130.2 },
      { depth: 3000, nitrate: 33.9, phosphate: 2.2, silicate: 135.8 },
      { depth: 4000, nitrate: 33.2, phosphate: 2.2, silicate: 136.5 }
    ],
    pH: [
      { depth: 0, value: 8.2 },
      { depth: 100, value: 8.1 },
      { depth: 250, value: 7.9 },
      { depth: 500, value: 7.8 },
      { depth: 1000, value: 7.7 },
      { depth: 2000, value: 7.8 },
      { depth: 3000, value: 7.8 },
      { depth: 4000, value: 7.8 }
    ],
    alkalinity: [
      { depth: 0, value: 2.32 },
      { depth: 100, value: 2.34 },
      { depth: 250, value: 2.36 },
      { depth: 500, value: 2.38 },
      { depth: 1000, value: 2.40 },
      { depth: 2000, value: 2.42 },
      { depth: 3000, value: 2.42 },
      { depth: 4000, value: 2.42 }
    ],
    salinity: [
      { depth: 0, value: 35.5 },
      { depth: 100, value: 35.2 },
      { depth: 250, value: 34.9 },
      { depth: 500, value: 34.7 },
      { depth: 1000, value: 34.6 },
      { depth: 2000, value: 34.8 },
      { depth: 3000, value: 34.7 },
      { depth: 4000, value: 34.7 }
    ]
  },
  regional: {
    oxygen: [
      { region: 'Pacífico Norte', value: 8.2 },
      { region: 'Pacífico Ecuatorial', value: 7.8 },
      { region: 'Pacífico Sur', value: 8.5 },
      { region: 'Atlántico Norte', value: 8.7 },
      { region: 'Atlántico Ecuatorial', value: 8.0 },
      { region: 'Atlántico Sur', value: 8.8 },
      { region: 'Índico', value: 8.3 },
      { region: 'Ártico', value: 9.1 },
      { region: 'Antártico', value: 9.5 }
    ],
    nutrients: [
      { region: 'Pacífico Norte', nitrate: 8.5, phosphate: 0.7, silicate: 15.2 },
      { region: 'Pacífico Ecuatorial', nitrate: 5.2, phosphate: 0.4, silicate: 8.3 },
      { region: 'Pacífico Sur', nitrate: 6.8, phosphate: 0.5, silicate: 10.5 },
      { region: 'Atlántico Norte', nitrate: 7.3, phosphate: 0.6, silicate: 12.4 },
      { region: 'Atlántico Ecuatorial', nitrate: 4.5, phosphate: 0.3, silicate: 7.8 },
      { region: 'Atlántico Sur', nitrate: 5.9, phosphate: 0.5, silicate: 9.6 },
      { region: 'Índico', nitrate: 7.2, phosphate: 0.6, silicate: 14.1 },
      { region: 'Ártico', nitrate: 9.1, phosphate: 0.8, silicate: 18.5 },
      { region: 'Antártico', nitrate: 18.2, phosphate: 1.5, silicate: 45.2 }
    ],
    pH: [
      { region: 'Pacífico Norte', value: 8.05 },
      { region: 'Pacífico Ecuatorial', value: 8.12 },
      { region: 'Pacífico Sur', value: 8.15 },
      { region: 'Atlántico Norte', value: 8.08 },
      { region: 'Atlántico Ecuatorial', value: 8.10 },
      { region: 'Atlántico Sur', value: 8.12 },
      { region: 'Índico', value: 8.07 },
      { region: 'Ártico', value: 8.04 },
      { region: 'Antártico', value: 8.13 }
    ],
    alkalinity: [
      { region: 'Pacífico Norte', value: 2.32 },
      { region: 'Pacífico Ecuatorial', value: 2.31 },
      { region: 'Pacífico Sur', value: 2.34 },
      { region: 'Atlántico Norte', value: 2.35 },
      { region: 'Atlántico Ecuatorial', value: 2.34 },
      { region: 'Atlántico Sur', value: 2.36 },
      { region: 'Índico', value: 2.33 },
      { region: 'Ártico', value: 2.20 },
      { region: 'Antártico', value: 2.30 }
    ],
    salinity: [
      { region: 'Pacífico Norte', value: 34.5 },
      { region: 'Pacífico Ecuatorial', value: 35.0 },
      { region: 'Pacífico Sur', value: 35.2 },
      { region: 'Atlántico Norte', value: 35.5 },
      { region: 'Atlántico Ecuatorial', value: 36.0 },
      { region: 'Atlántico Sur', value: 35.7 },
      { region: 'Índico', value: 35.3 },
      { region: 'Ártico', value: 32.5 },
      { region: 'Antártico', value: 33.8 }
    ]
  },
  timeSeries: {
    oxygen: [
      { year: 1980, value: 8.6 },
      { year: 1990, value: 8.5 },
      { year: 2000, value: 8.4 },
      { year: 2010, value: 8.25 },
      { year: 2020, value: 8.15 },
      { year: 2025, value: 8.1 }
    ],
    nutrients: [
      { year: 1980, nitrate: 7.2, phosphate: 0.6, silicate: 12.4 },
      { year: 1990, nitrate: 7.4, phosphate: 0.62, silicate: 12.8 },
      { year: 2000, nitrate: 7.8, phosphate: 0.65, silicate: 13.5 },
      { year: 2010, nitrate: 8.2, phosphate: 0.69, silicate: 14.3 },
      { year: 2020, nitrate: 8.6, phosphate: 0.73, silicate: 15.1 },
      { year: 2025, nitrate: 8.8, phosphate: 0.75, silicate: 15.5 }
    ],
    pH: [
      { year: 1980, value: 8.20 },
      { year: 1990, value: 8.18 },
      { year: 2000, value: 8.15 },
      { year: 2010, value: 8.11 },
      { year: 2020, value: 8.07 },
      { year: 2025, value: 8.05 }
    ],
    alkalinity: [
      { year: 1980, value: 2.32 },
      { year: 1990, value: 2.33 },
      { year: 2000, value: 2.33 },
      { year: 2010, value: 2.34 },
      { year: 2020, value: 2.35 },
      { year: 2025, value: 2.36 }
    ],
    salinity: [
      { year: 1980, value: 35.30 },
      { year: 1990, value: 35.35 },
      { year: 2000, value: 35.40 },
      { year: 2010, value: 35.45 },
      { year: 2020, value: 35.50 },
      { year: 2025, value: 35.52 }
    ]
  },
  waterMass: {
    oxygen: [
      { name: 'Agua Superficial Tropical', value: 8.2 },
      { name: 'Agua Central del Pacífico Norte', value: 6.5 },
      { name: 'Agua Intermedia del Pacífico Norte', value: 3.8 },
      { name: 'Agua Profunda del Pacífico Norte', value: 4.5 },
      { name: 'Agua Antártica de Fondo', value: 5.8 },
      { name: 'Agua Circumpolar Profunda', value: 5.2 },
      { name: 'Agua Profunda del Atlántico Norte', value: 6.3 }
    ],
    nutrients: [
      { name: 'Agua Superficial Tropical', nitrate: 0.5, phosphate: 0.05, silicate: 1.5 },
      { name: 'Agua Central del Pacífico Norte', nitrate: 15.0, phosphate: 1.0, silicate: 20.0 },
      { name: 'Agua Intermedia del Pacífico Norte', nitrate: 35.0, phosphate: 2.2, silicate: 90.0 },
      { name: 'Agua Profunda del Pacífico Norte', nitrate: 36.0, phosphate: 2.5, silicate: 130.0 },
      { name: 'Agua Antártica de Fondo', nitrate: 33.0, phosphate: 2.2, silicate: 120.0 },
      { name: 'Agua Circumpolar Profunda', nitrate: 34.0, phosphate: 2.3, silicate: 125.0 },
      { name: 'Agua Profunda del Atlántico Norte', nitrate: 18.0, phosphate: 1.3, silicate: 30.0 }
    ],
    pH: [
      { name: 'Agua Superficial Tropical', value: 8.15 },
      { name: 'Agua Central del Pacífico Norte', value: 8.05 },
      { name: 'Agua Intermedia del Pacífico Norte', value: 7.75 },
      { name: 'Agua Profunda del Pacífico Norte', value: 7.70 },
      { name: 'Agua Antártica de Fondo', value: 7.80 },
      { name: 'Agua Circumpolar Profunda', value: 7.78 },
      { name: 'Agua Profunda del Atlántico Norte', value: 7.90 }
    ],
    alkalinity: [
      { name: 'Agua Superficial Tropical', value: 2.30 },
      { name: 'Agua Central del Pacífico Norte', value: 2.32 },
      { name: 'Agua Intermedia del Pacífico Norte', value: 2.38 },
      { name: 'Agua Profunda del Pacífico Norte', value: 2.40 },
      { name: 'Agua Antártica de Fondo', value: 2.37 },
      { name: 'Agua Circumpolar Profunda', value: 2.38 },
      { name: 'Agua Profunda del Atlántico Norte', value: 2.35 }
    ],
    salinity: [
      { name: 'Agua Superficial Tropical', value: 35.6 },
      { name: 'Agua Central del Pacífico Norte', value: 34.9 },
      { name: 'Agua Intermedia del Pacífico Norte', value: 34.2 },
      { name: 'Agua Profunda del Pacífico Norte', value: 34.6 },
      { name: 'Agua Antártica de Fondo', value: 34.7 },
      { name: 'Agua Circumpolar Profunda', value: 34.6 },
      { name: 'Agua Profunda del Atlántico Norte', value: 34.9 }
    ]
  }
};

// Contenido interpretativo para cada parámetro
const PARAM_INFO = {
  oxygen: {
    title: 'Oxígeno Disuelto',
    desc: 'El oxígeno disuelto es un parámetro crítico para la vida marina. Su concentración varía con la profundidad, temperatura, salinidad y actividad biológica.',
    points: [
      'En la superficie, el agua está saturada de oxígeno debido al intercambio con la atmósfera y la fotosíntesis.',
      'La concentración disminuye en la zona de mínimo oxígeno (200-1000m) debido a la respiración bacteriana y oxidación de materia orgánica.',
      'En aguas profundas, el oxígeno puede aumentar debido a la circulación de aguas polares ricas en oxígeno.'
    ],
    timeSeries: 'La tendencia de disminución en el tiempo está relacionada con el calentamiento global y la estratificación aumentada.'
  },
  pH: {
    title: 'pH Oceánico',
    desc: 'El pH del océano es fundamental para procesos químicos y biológicos, y está siendo afectado por la acidificación oceánica.',
    points: [
      'El pH superficial típicamente oscila entre 8.0 y 8.2 en mar abierto.',
      'Disminuye con la profundidad debido a la acumulación de CO₂ de la respiración y descomposición de materia orgánica.',
      'En aguas profundas, tiende a estabilizarse alrededor de 7.7-7.8.'
    ],
    timeSeries: 'La disminución del pH en las últimas décadas es consecuencia directa de la absorción oceánica de CO₂ atmosférico proveniente de actividades humanas.'
  },
  nutrients: {
    title: 'Nutrientes',
    desc: 'Los nutrientes (nitratos, fosfatos y silicatos) son esenciales para la productividad biológica y están sujetos a ciclos biogeoquímicos.',
    points: [
      'La superficie suele ser pobre en nutrientes debido al consumo por fitoplancton (excepto en zonas de afloramiento).',
      'Las concentraciones aumentan con la profundidad debido a la remineralización de materia orgánica.',
      'La relación entre nitrógeno y fósforo (N:P) tiende a seguir la relación de Redfield de 16:1.'
    ],
    distribution: 'Las zonas polares y de afloramiento muestran mayores concentraciones superficiales de nutrientes.'
  },
  alkalinity: {
    title: 'Alcalinidad Total',
    desc: 'La alcalinidad total es una medida de la capacidad del agua de mar para neutralizar ácidos y está relacionada con el sistema del carbonato.',
    points: [
      'Controla la capacidad amortiguadora del océano frente a cambios de pH.',
      'Aumenta ligeramente con la profundidad debido a la disolución de carbonatos.',
      'Varía geográficamente, con valores más altos en el Atlántico que en el Pacífico.'
    ],
    comparison: 'Las diferencias entre masas de agua reflejan sus historias de circulación y procesos biogeoquímicos.'
  },
  salinity: {
    title: 'Salinidad',
    desc: 'La salinidad es un parámetro conservativo que afecta la densidad del agua y muchos procesos físicos y químicos.',
    points: [
      'La salinidad superficial está controlada por evaporación, precipitación y aportes fluviales.',
      'Los perfiles verticales muestran patrones característicos según la región oceánica.',
      'Sirve como trazador para identificar masas de agua y patrones de circulación.'
    ],
    distribution: 'El Atlántico Norte y el Mediterráneo muestran las salinidades más altas debido a la alta evaporación.'
  }
};

// Componente principal
const ChemicalAnalysis: React.FC<ChemicalAnalysisProps> = ({ 
  analysisType: initialAnalysisType = 'profile',
  parameter: initialParameter = 'oxygen'
}) => {
  const [analysisType, setAnalysisType] = useState<AnalysisType>(initialAnalysisType);
  const [parameter, setParameter] = useState<ParameterType>(initialParameter);
  const [region, setRegion] = useState<RegionType>('pacific');
  const [depth, setDepth] = useState<DepthType>('surface');

  // Obtener título del gráfico
  const getChartTitle = () => {
    const paramName = PARAMS[parameter].name;
    
    switch (analysisType) {
      case 'profile': return `Perfil Vertical de ${paramName}`;
      case 'distribution': return `Distribución Regional de ${paramName}`;
      case 'timeSeries': return `Cambios Temporales en ${paramName} (1980-2025)`;
      case 'comparison': return `Comparación de ${paramName} en Diferentes Masas de Agua`;
      default: return `Análisis de ${paramName}`;
    }
  };

  // Formatear valor según el parámetro
  const formatValue = (value: number) => {
    const unit = parameter === 'salinity' ? ' psu' : 
                parameter === 'oxygen' ? ' ml/L' : 
                parameter === 'alkalinity' ? ' meq/kg' : '';
    return `${value}${unit}`;
  };

  // Renderizar gráficos según tipo de análisis y parámetro
  const renderChart = () => {
    // Perfil vertical
    if (analysisType === 'profile') {
      if (parameter === 'nutrients') {
        return (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart layout="vertical" data={DATA.vertical.nutrients} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="depth" type="number" domain={[0, 4000]} reversed={true} 
                    label={{ value: 'Profundidad (m)', angle: -90, position: 'insideLeft' }} />
              <Tooltip formatter={(value, name) => [
                `${Number(value).toFixed(2)} µmol/L`, 
                name === 'nitrate' ? 'Nitrato' : name === 'phosphate' ? 'Fosfato' : 'Silicato'
              ]} labelFormatter={(v) => `Profundidad: ${v}m`} />
              <Legend />
              <Line type="monotone" dataKey="nitrate" stroke="#e74c3c" name="Nitrato" dot={{ r: 3 }} />
              <Line type="monotone" dataKey="phosphate" stroke="#3498db" name="Fosfato" dot={{ r: 3 }} />
              <Line type="monotone" dataKey="silicate" stroke="#2ecc71" name="Silicato" dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        );
      }
      
      return (
        <ResponsiveContainer width="100%" height={400}>
          <LineChart layout="vertical" data={DATA.vertical[parameter]} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" domain={parameter === 'pH' ? [7.5, 8.5] : parameter === 'alkalinity' ? [2.3, 2.5] : undefined} />
            <YAxis dataKey="depth" type="number" domain={[0, 4000]} reversed={true} 
                  label={{ value: 'Profundidad (m)', angle: -90, position: 'insideLeft' }} />
            <Tooltip formatter={(v) => [formatValue(Number(v))]} labelFormatter={(v) => `Profundidad: ${v}m`} />
            <Legend />
            <Line type="monotone" dataKey="value" stroke={PARAMS[parameter].color} name={PARAMS[parameter].name} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      );
    }
    
    // Distribución regional
    if (analysisType === 'distribution') {
      if (parameter === 'nutrients') {
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={DATA.regional.nutrients} layout="vertical" margin={{ top: 5, right: 30, left: 120, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="region" type="category" />
              <Tooltip formatter={(value, name) => [
                `${Number(value).toFixed(2)} µmol/L`, 
                name === 'nitrate' ? 'Nitrato' : name === 'phosphate' ? 'Fosfato' : 'Silicato'
              ]} />
              <Legend />
              <Bar dataKey="nitrate" fill="#e74c3c" name="Nitrato" />
              <Bar dataKey="phosphate" fill="#3498db" name="Fosfato" />
              <Bar dataKey="silicate" fill="#2ecc71" name="Silicato" />
            </BarChart>
          </ResponsiveContainer>
        );
      }
      
      return (
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={DATA.regional[parameter]} layout="vertical" margin={{ top: 5, right: 30, left: 120, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis dataKey="region" type="category" />
            <Tooltip formatter={(v) => [formatValue(Number(v))]} />
            <Legend />
            <Bar dataKey="value" fill={PARAMS[parameter].color} name={PARAMS[parameter].name} />
          </BarChart>
        </ResponsiveContainer>
      );
    }
    
    // Serie temporal
    if (analysisType === 'timeSeries') {
      if (parameter === 'nutrients') {
        return (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={DATA.timeSeries.nutrients} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis yAxisId="left" orientation="left" stroke="#e74c3c" />
              <YAxis yAxisId="right" orientation="right" stroke="#3498db" />
              <Tooltip formatter={(value, name) => [
                `${Number(value).toFixed(2)} µmol/L`, 
                name === 'nitrate' ? 'Nitrato' : name === 'phosphate' ? 'Fosfato' : 'Silicato'
              ]} />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="nitrate" stroke="#e74c3c" name="Nitrato" dot={{ r: 3 }} />
              <Line yAxisId="right" type="monotone" dataKey="phosphate" stroke="#3498db" name="Fosfato" dot={{ r: 3 }} />
              <Line yAxisId="left" type="monotone" dataKey="silicate" stroke="#2ecc71" name="Silicato" dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        );
      }
      
      return (
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={DATA.timeSeries[parameter]} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis domain={parameter === 'pH' ? [8.0, 8.25] : parameter === 'alkalinity' ? [2.3, 2.4] : undefined} />
            <Tooltip formatter={(v) => [formatValue(Number(v))]} />
            <Legend />
            <Line type="monotone" dataKey="value" stroke={PARAMS[parameter].color} name={PARAMS[parameter].name} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      );
    }
    
    // Comparación de masas de agua
    if (analysisType === 'comparison') {
      if (parameter === 'nutrients') {
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={DATA.waterMass.nutrients} layout="vertical" margin={{ top: 5, right: 30, left: 180, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" />
              <Tooltip formatter={(value, name) => [
                `${Number(value).toFixed(2)} µmol/L`, 
                name === 'nitrate' ? 'Nitrato' : name === 'phosphate' ? 'Fosfato' : 'Silicato'
              ]} />
              <Legend />
              <Bar dataKey="nitrate" fill="#e74c3c" name="Nitrato" />
              <Bar dataKey="phosphate" fill="#3498db" name="Fosfato" />
              <Bar dataKey="silicate" fill="#2ecc71" name="Silicato" />
            </BarChart>
          </ResponsiveContainer>
        );
      }
      
      return (
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={DATA.waterMass[parameter]} layout="vertical" margin={{ top: 5, right: 30, left: 180, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis dataKey="name" type="category" />
            <Tooltip formatter={(v) => [formatValue(Number(v))]} />
            <Legend />
            <Bar dataKey="value" fill={PARAMS[parameter].color} name={PARAMS[parameter].name} />
          </BarChart>
        </ResponsiveContainer>
      );
    }
    
    return null;
  };

  // Renderizar información del parámetro
  const renderParamInfo = () => {
    const info = PARAM_INFO[parameter];
    const extraInfo = info[analysisType as keyof typeof info];
    
    return (
      <div>
        <p className="mb-3">{info.desc}</p>
        <ul className="list-disc pl-5 space-y-2 text-gray-700">
          {info.points.map((point, i) => (
            <li key={i}>{point}</li>
          ))}
          {extraInfo && (
            <li className="text-ocean-dark font-medium">{extraInfo}</li>
          )}
        </ul>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-ocean-dark mb-6">{getChartTitle()}</h2>
        
        {/* Controles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Parámetro a Analizar</label>
            <div className="flex flex-wrap gap-2">
              {Object.entries(PARAMS).map(([id, { name }]) => (
                <button
                  key={id}
                  onClick={() => parameter !== id && setParameter(id as ParameterType)}
                  className={`px-3 py-2 rounded-md text-sm ${
                    parameter === id ? 'bg-ocean text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {name}
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Análisis</label>
            <div className="flex flex-wrap gap-2">
              {ANALYSES.map(({ id, name }) => (
                <button
                  key={id}
                  onClick={() => analysisType !== id && setAnalysisType(id as AnalysisType)}
                  className={`px-3 py-2 rounded-md text-sm ${
                    analysisType === id ? 'bg-ocean text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {name}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Gráfico */}
        <div className="border border-gray-200 rounded-lg p-4">
          {renderChart()}
        </div>
      </div>
      
      {/* Información */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-xl font-bold text-ocean-dark mb-4">
          Interpretación y Significado
        </h3>
        {renderParamInfo()}
      </div>
      
      {/* Referencias */}
      <div className="text-sm text-gray-500">
        <p>Datos basados en observaciones oceanográficas globales y modelos.</p>
        <p>Referencias: Libes, S. "An Introduction to Marine Chemistry", GLODAP, World Ocean Atlas.</p>
      </div>
    </div>
  );
};

export default ChemicalAnalysis;