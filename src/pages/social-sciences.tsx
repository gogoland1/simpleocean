import React from "react";
import Layout from "~/components/layout/Layout";
import SocialSciencesComponent from "~/components/SocialSciencesComponent";

export default function SocialSciencesPage() {
  return (
    <Layout 
      title="Ciencias Sociales y Humanidades - OceanInsight" 
      description="Acercando las ciencias sociales, cultura y humanidades a las ciencias marinas para un enfoque interdisciplinario."
    >
      <div className="bg-gradient-to-b from-indigo-700 to-blue-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Ciencias Sociales, Cultura y Humanidades</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Tendiendo puentes entre las ciencias sociales, humanidades 
            y las ciencias marinas para un entendimiento integral de los océanos 
            y su relación con las sociedades humanas.
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12">
        <SocialSciencesComponent />
      </div>
    </Layout>
  );
}