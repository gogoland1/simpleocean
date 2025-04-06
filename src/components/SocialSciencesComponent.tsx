import React, { useState } from "react";

// Versión con aserciones de no-nulidad
export default function SocialSciencesComponent() {
  // Datos estáticos 
  const categories = [
    {
      name: "Antropología Marina",
      topics: [
        {
          title: "Prácticas Culturales Marino-Costeras",
          description: "Estudio de las tradiciones, costumbres y prácticas culturales de comunidades costeras.",
          keyPoints: ["Etnografía de comunidades pesqueras", "Sistemas de conocimiento tradicional"],
          applications: ["Preservación de conocimientos tradicionales", "Diseño de políticas culturales"]
        },
        {
          title: "Arqueología Marítima",
          description: "Investigación de restos materiales de actividades humanas en ambientes acuáticos.",
          keyPoints: ["Tecnologías de prospección", "Conservación de patrimonio"],
          applications: ["Museos virtuales", "Reconstrucción digital"]
        }
      ]
    },
    {
      name: "Humanidades Oceánicas",
      topics: [
        {
          title: "Literatura y Océanos",
          description: "Análisis de representaciones literarias del mar y su influencia cultural.",
          keyPoints: ["El mar como metáfora", "Narrativas marítimas"],
          applications: ["Talleres de escritura", "Análisis de discursos"]
        }
      ]
    }
  ];

  // Estados iniciales que NO pueden ser nulos
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [topicIndex, setTopicIndex] = useState(0);

  // Funciones de manejo simplificadas
  const handleCategoryChange = (index: number) => {
    setCategoryIndex(index);
    setTopicIndex(0); // Reset al primer tópico
  };

  // Obtener categoría y tópico actual usando aserciones no-nulas para TypeScript
  const currentCategory = categories[categoryIndex]!;
  const currentTopic = currentCategory.topics[topicIndex]!;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      {/* Navegación de categorías */}
      <div className="mb-8 border-b">
        <div className="flex flex-wrap">
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => handleCategoryChange(index)}
              className={`pb-4 px-4 text-lg font-medium ${
                categoryIndex === index
                  ? "border-b-2 border-indigo-500 text-indigo-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Contenido principal */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Menú lateral */}
        <div className="md:col-span-1 bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Tópicos</h3>
          <div className="space-y-2">
            {currentCategory.topics.map((topic, index) => (
              <button
                key={index}
                onClick={() => setTopicIndex(index)}
                className={`w-full text-left px-3 py-2 rounded-md ${
                  topicIndex === index
                    ? "bg-indigo-100 text-indigo-700 font-medium"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {topic.title}
              </button>
            ))}
          </div>
        </div>

        {/* Contenido del tópico */}
        <div className="md:col-span-3">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {currentTopic.title}
          </h2>
          
          <p className="text-gray-600 mb-6">
            {currentTopic.description}
          </p>
          
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Puntos Clave</h3>
          <ul className="list-disc pl-5 mb-6 space-y-2 text-gray-600">
            {currentTopic.keyPoints.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
          
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Aplicaciones</h3>
          <ul className="list-disc pl-5 space-y-2 text-gray-600">
            {currentTopic.applications.map((app, index) => (
              <li key={index}>{app}</li>
            ))}
          </ul>
          
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-medium text-gray-800 mb-2">Colaboraciones</h3>
            <p className="text-gray-600">
              OceanInsight facilita colaboraciones entre científicos marinos y humanistas.
            </p>
            <div className="mt-4">
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md">
                Explorar Colaboraciones
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}