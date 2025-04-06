import React from 'react';
import Layout from '~/components/layout/Layout';
import PhylogeneticTree from '~/components/visualization/PhylogeneticTree';

const sampleData = {
  name: "Microorganismos Marinos",
  children: [
    {
      name: "Bacterias",
      color: "#4CAF50",
      children: [
        {
          name: "Acidobacteria",
          color: "#81C784",
          abundance: 300,
          children: Array.from({ length: 15 }, (_, i) => ({
            name: `Acidobacteria sp.${i + 1}`,
            color: "#A5D6A7",
            abundance: Math.random() * 100 + 50
          }))
        },
        {
          name: "Actinobacteria",
          color: "#FDD835",
          abundance: 400,
          children: Array.from({ length: 20 }, (_, i) => ({
            name: `Actinobacteria sp.${i + 1}`,
            color: "#FFEE58",
            abundance: Math.random() * 150 + 50
          }))
        },
        {
          name: "Bacteroidetes",
          color: "#7E57C2",
          abundance: 350,
          children: Array.from({ length: 12 }, (_, i) => ({
            name: `Bacteroidetes sp.${i + 1}`,
            color: "#9575CD",
            abundance: Math.random() * 120 + 50
          }))
        },
        {
          name: "Firmicutes",
          color: "#FF7043",
          abundance: 250,
          children: Array.from({ length: 18 }, (_, i) => ({
            name: `Firmicutes sp.${i + 1}`,
            color: "#FFAB91",
            abundance: Math.random() * 80 + 50
          }))
        },
        {
          name: "Proteobacteria",
          color: "#42A5F5",
          abundance: 500,
          children: [
            {
              name: "Alphaproteobacteria",
              color: "#64B5F6",
              abundance: 200,
              children: Array.from({ length: 10 }, (_, i) => ({
                name: `Alpha sp.${i + 1}`,
                color: "#90CAF9",
                abundance: Math.random() * 100 + 50
              }))
            },
            {
              name: "Betaproteobacteria",
              color: "#64B5F6",
              abundance: 150,
              children: Array.from({ length: 8 }, (_, i) => ({
                name: `Beta sp.${i + 1}`,
                color: "#90CAF9",
                abundance: Math.random() * 80 + 50
              }))
            },
            {
              name: "Gammaproteobacteria",
              color: "#64B5F6",
              abundance: 180,
              children: Array.from({ length: 12 }, (_, i) => ({
                name: `Gamma sp.${i + 1}`,
                color: "#90CAF9",
                abundance: Math.random() * 90 + 50
              }))
            }
          ]
        }
      ]
    },
    {
      name: "Archaea",
      color: "#F06292",
      children: [
        {
          name: "Euryarchaeota",
          color: "#F48FB1",
          abundance: 200,
          children: Array.from({ length: 10 }, (_, i) => ({
            name: `Euryarchaeota sp.${i + 1}`,
            color: "#F8BBD0",
            abundance: Math.random() * 100 + 30
          }))
        },
        {
          name: "Thaumarchaeota",
          color: "#F48FB1",
          abundance: 180,
          children: Array.from({ length: 8 }, (_, i) => ({
            name: `Thaumarchaeota sp.${i + 1}`,
            color: "#F8BBD0",
            abundance: Math.random() * 90 + 30
          }))
        }
      ]
    },
    {
      name: "Microalgas",
      color: "#26A69A",
      children: [
        {
          name: "Bacillariophyta",
          color: "#4DB6AC",
          abundance: 300,
          children: Array.from({ length: 15 }, (_, i) => ({
            name: `Bacillariophyta sp.${i + 1}`,
            color: "#80CBC4",
            abundance: Math.random() * 120 + 40
          }))
        },
        {
          name: "Dinoflagellata",
          color: "#4DB6AC",
          abundance: 250,
          children: Array.from({ length: 12 }, (_, i) => ({
            name: `Dinoflagellata sp.${i + 1}`,
            color: "#80CBC4",
            abundance: Math.random() * 100 + 40
          }))
        }
      ]
    }
  ]
};

const MarineMicrobiologyPage = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Microbiología Marina</h1>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Árbol Filogenético de Microorganismos Marinos</h2>
          <p className="text-gray-600 mb-6">
            Este árbol filogenético representa las relaciones evolutivas entre los principales grupos de microorganismos marinos.
            El tamaño y color de las ramas indican la abundancia relativa y la clasificación taxonómica de cada grupo.
            Las ramificaciones más externas representan especies individuales dentro de cada grupo taxonómico.
          </p>
          <div className="w-full h-[900px]">
            <PhylogeneticTree data={sampleData} />
          </div>
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-3">Grupos Principales</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-[#4CAF50] mr-2"></div>
                <span>Bacterias</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-[#F06292] mr-2"></div>
                <span>Archaea</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-[#26A69A] mr-2"></div>
                <span>Microalgas</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MarineMicrobiologyPage; 