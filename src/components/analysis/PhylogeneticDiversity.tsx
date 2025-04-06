import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";

const PhylogeneticDiversity = () => {
  const router = useRouter();

  return (
    <div className="container mx-auto py-6">
      <button
        onClick={() => router.push('/')}
        className="mb-6 flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
            clipRule="evenodd"
          />
        </svg>
        <span>Volver a la Red Jerárquica</span>
      </button>

      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-4">Diversidad Filogenética del Zooplancton</h2>
        <p className="text-lg text-gray-700 mb-6">
          La diversidad filogenética es una medida que considera las relaciones evolutivas entre especies,
          proporcionando una visión más profunda de la biodiversidad que la simple riqueza de especies.
          Este análisis examina la diversidad del zooplancton desde múltiples perspectivas: taxonómica,
          filogenética, funcional y espacial.
        </p>
      </div>

      <Tabs defaultValue="taxonomic" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="taxonomic">Taxonómica</TabsTrigger>
          <TabsTrigger value="phylogenetic">Filogenética</TabsTrigger>
          <TabsTrigger value="functional">Funcional</TabsTrigger>
          <TabsTrigger value="spatial">Espacial</TabsTrigger>
        </TabsList>

        <TabsContent value="taxonomic">
          <Card>
            <CardHeader>
              <CardTitle>Diversidad Taxonómica</CardTitle>
              <CardDescription>
                Distribución de especies por grupos taxonómicos principales en la comunidad zooplanctónica.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <div className="relative w-full h-[600px]">
                <Image
                  src="/images/diversidad/taxonomic_diversity.png"
                  alt="Diversidad Taxonómica del Zooplancton"
                  fill
                  style={{ objectFit: 'contain' }}
                />
              </div>
              <p className="mt-4 text-gray-700">
                El gráfico circular muestra la proporción de especies en cada grupo taxonómico principal:
                copépodos, eufáusidos, quetognatos y sifonóforos. Los copépodos representan el grupo más
                diverso, seguido por los eufáusidos.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="phylogenetic">
          <Card>
            <CardHeader>
              <CardTitle>Diversidad Filogenética</CardTitle>
              <CardDescription>
                Relaciones evolutivas entre las especies de zooplancton estudiadas.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <div className="relative w-full h-[600px]">
                <Image
                  src="/images/diversidad/phylogenetic_tree.png"
                  alt="Árbol Filogenético del Zooplancton"
                  fill
                  style={{ objectFit: 'contain' }}
                />
              </div>
              <p className="mt-4 text-gray-700">
                El árbol filogenético ilustra las relaciones evolutivas entre las especies,
                agrupadas por taxones principales. La longitud de las ramas representa la
                distancia evolutiva entre especies.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="functional">
          <Card>
            <CardHeader>
              <CardTitle>Diversidad Funcional</CardTitle>
              <CardDescription>
                Red de relaciones funcionales entre especies basada en características ecológicas.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <div className="relative w-full h-[600px]">
                <Image
                  src="/images/diversidad/functional_network.png"
                  alt="Red de Diversidad Funcional"
                  fill
                  style={{ objectFit: 'contain' }}
                />
              </div>
              <p className="mt-4 text-gray-700">
                La red funcional conecta especies que comparten características similares como
                tamaño, movilidad, estrategia de alimentación y reproducción. Las conexiones
                indican similitud funcional entre especies.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="spatial">
          <Card>
            <CardHeader>
              <CardTitle>Disimilitud entre Zonas</CardTitle>
              <CardDescription>
                Diferencias en la composición de especies entre zonas biogeográficas.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <div className="relative w-full h-[600px]">
                <Image
                  src="/images/diversidad/zone_dissimilarity.png"
                  alt="Disimilitud entre Zonas"
                  fill
                  style={{ objectFit: 'contain' }}
                />
              </div>
              <p className="mt-4 text-gray-700">
                El mapa de calor muestra la disimilitud en la composición de especies entre
                las zonas costera, de transición y oceánica. Los valores más altos (rojo más intenso)
                indican mayor diferencia en la composición de especies.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PhylogeneticDiversity; 