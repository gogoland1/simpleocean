import Layout from "~/components/layout/Layout";
import PhysicalOceanography from "~/components/PhysicalOceanography";

export default function PhysicalOceanographyPage() {
  return (
    <Layout 
      title="Oceanografía Física - OceanInsight" 
      description="Exploración y análisis avanzado de fenómenos de oceanografía física: corrientes, olas, mareas, circulación termohalina y modelos numéricos."
    >
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-800 to-blue-500 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Oceanografía Física</h1>
          <p className="text-xl max-w-3xl">
            Estudio de los procesos físicos que gobiernan el movimiento y las propiedades de los océanos, 
            desde pequeños remolinos hasta corrientes globales, combinando observaciones, teoría y simulaciones numéricas.
          </p>
        </div>
      </div>

      {/* Capabilities Section */}
      <div className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center mb-12">Nuestras Capacidades</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4 text-blue-700">Análisis de Datos Observacionales</h3>
              <p>Procesamiento e interpretación de datos oceanográficos de satélites, boyas, perfiladores Argo y mediciones in-situ para caracterizar estados y tendencias oceánicas.</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4 text-blue-700">Modelado Numérico</h3>
              <p>Implementación y análisis de modelos de circulación oceánica a múltiples escalas, desde modelos costeros hasta simulaciones globales con acoplamiento oceánico-atmosférico.</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4 text-blue-700">Aplicaciones de IA</h3>
              <p>Integración de técnicas avanzadas de inteligencia artificial para predicción de variables oceánicas, detección de anomalías y mejora de productos de datos satelitales.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-12">
        <div className="container mx-auto px-4">
          <PhysicalOceanography />
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-700 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">¿Necesitas consultoría en oceanografía física?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Nuestro equipo de expertos puede ayudarte con análisis de datos, modelado predictivo y asesoría científica para proyectos de investigación, gestión costera o industria marítima.
          </p>
          <button className="bg-white text-blue-700 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-blue-100 transition duration-300">
            Contactar con un experto
          </button>
        </div>
      </div>
    </Layout>
  );
}