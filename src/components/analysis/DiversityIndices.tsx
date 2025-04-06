import React from 'react';
import Image from 'next/image';

const DiversityIndices: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-ocean-dark mb-6">Índices de Diversidad</h2>
      
      {/* Índices Alfa */}
      <section className="mb-8">
        <h3 className="text-xl font-semibold text-ocean-dark mb-4">Índices de Diversidad Alfa</h3>
        <p className="mb-4 text-gray-700">
          Los índices de diversidad alfa cuantifican la riqueza y estructura de especies en una comunidad local.
          Cada índice enfatiza diferentes aspectos de la diversidad:
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Índice de Shannon */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-ocean-dark mb-2">Índice de Shannon (H')</h4>
            <p className="text-sm text-gray-600 mb-2">
              Mide la incertidumbre en predecir la especie a la que pertenece un individuo seleccionado al azar.
              Considera tanto la riqueza como la equitatividad.
            </p>
            <div className="bg-white p-3 rounded">
              <p className="text-center font-mono">H' = -∑(pᵢ × ln(pᵢ))</p>
              <p className="text-xs text-gray-500 mt-1">
                donde pᵢ es la proporción de individuos de la especie i
              </p>
            </div>
          </div>

          {/* Índice de Simpson */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-ocean-dark mb-2">Índice de Simpson (D)</h4>
            <p className="text-sm text-gray-600 mb-2">
              Representa la probabilidad de que dos individuos seleccionados al azar pertenezcan a la misma especie.
              Es más sensible a las especies dominantes.
            </p>
            <div className="bg-white p-3 rounded">
              <p className="text-center font-mono">D = 1 - ∑(pᵢ²)</p>
              <p className="text-xs text-gray-500 mt-1">
                donde pᵢ es la proporción de individuos de la especie i
              </p>
            </div>
          </div>

          {/* Índice de Margalef */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-ocean-dark mb-2">Índice de Margalef (DMg)</h4>
            <p className="text-sm text-gray-600 mb-2">
              Estima la biodiversidad basándose en la distribución numérica de individuos por especie.
              Relaciona el número de especies con el logaritmo natural del número total de individuos.
            </p>
            <div className="bg-white p-3 rounded">
              <p className="text-center font-mono">DMg = (S - 1) / ln(N)</p>
              <p className="text-xs text-gray-500 mt-1">
                donde S es el número de especies y N el número total de individuos
              </p>
            </div>
          </div>

          {/* Equitatividad de Pielou */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-ocean-dark mb-2">Equitatividad de Pielou (J')</h4>
            <p className="text-sm text-gray-600 mb-2">
              Mide qué tan equitativa es la distribución de individuos entre las especies.
              Compara la diversidad observada con la máxima diversidad esperada.
            </p>
            <div className="bg-white p-3 rounded">
              <p className="text-center font-mono">J' = H' / ln(S)</p>
              <p className="text-xs text-gray-500 mt-1">
                donde H' es el índice de Shannon y S el número de especies
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Índices Beta */}
      <section className="mb-8">
        <h3 className="text-xl font-semibold text-ocean-dark mb-4">Índices de Diversidad Beta</h3>
        <p className="mb-4 text-gray-700">
          Los índices de diversidad beta cuantifican el recambio de especies entre comunidades.
          Son fundamentales para entender la heterogeneidad espacial del ecosistema:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Índice de Whittaker */}
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-semibold text-ocean-dark mb-2">Índice de Whittaker (βw)</h4>
            <p className="text-sm text-gray-600 mb-2">
              Mide el recambio de especies entre comunidades basándose en presencia/ausencia.
            </p>
            <div className="bg-white p-3 rounded">
              <p className="text-center font-mono">βw = (S/α) - 1</p>
              <p className="text-xs text-gray-500 mt-1">
                donde S es el número total de especies y α es el promedio de especies por sitio
              </p>
            </div>
          </div>

          {/* Índice de Jaccard */}
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-semibold text-ocean-dark mb-2">Índice de Jaccard (Cj)</h4>
            <p className="text-sm text-gray-600 mb-2">
              Mide la similitud entre comunidades basándose en especies compartidas.
            </p>
            <div className="bg-white p-3 rounded">
              <p className="text-center font-mono">Cj = j / (a + b - j)</p>
              <p className="text-xs text-gray-500 mt-1">
                donde j es el número de especies compartidas, a y b son el número de especies en cada sitio
              </p>
            </div>
          </div>

          {/* Índice de Sørensen */}
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-semibold text-ocean-dark mb-2">Índice de Sørensen (Cs)</h4>
            <p className="text-sm text-gray-600 mb-2">
              Similar a Jaccard pero da más peso a las especies compartidas.
            </p>
            <div className="bg-white p-3 rounded">
              <p className="text-center font-mono">Cs = 2j / (a + b)</p>
              <p className="text-xs text-gray-500 mt-1">
                donde j es el número de especies compartidas, a y b son el número de especies en cada sitio
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Visualización de Índices Beta */}
      <section>
        <h3 className="text-xl font-semibold text-ocean-dark mb-4">Comparación de Índices Beta</h3>
        <div className="flex flex-col items-center">
          <div className="relative w-full h-[500px]">
            <Image 
              src="/images/diversidad/zooplankton/beta_diversity_comparison.png"
              alt="Comparación de índices de diversidad beta"
              fill
              style={{ objectFit: "contain" }}
              sizes="(max-width: 768px) 100vw, 80vw"
              className="rounded-lg"
            />
          </div>
          <p className="mt-4 text-sm text-gray-600 max-w-2xl text-center">
            Comparación de los índices de Whittaker, Jaccard y Sørensen entre estaciones y profundidades.
            Los boxplots muestran la distribución de los valores para cada índice, permitiendo visualizar
            patrones de variación espacial en la composición de especies.
          </p>
        </div>
      </section>
    </div>
  );
};

export default DiversityIndices; 