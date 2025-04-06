import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Topic {
  id: number;
  name: string;
  category: string;
  description: string;
  image: string;
  connections: number[];
}

const MarineTopicsNetwork: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [isInfoVisible, setIsInfoVisible] = useState<boolean>(false);
  const [zoomedNode, setZoomedNode] = useState<number | null>(null);
  const networkRef = useRef<HTMLDivElement | null>(null);
  const nodeRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
  
  // Datos de tópicos de biología marina
  const topics: Topic[] = [
    {
      id: 1,
      name: 'Arrecifes de Coral',
      category: 'Ecosistemas',
      description: 'Ecosistemas marinos de alta biodiversidad formados principalmente por colonias de corales, hogar de más del 25% de especies marinas.',
      image: '/ecosystems/reef.jpg',
      connections: [2, 7, 11]
    },
    {
      id: 2,
      name: 'Biodiversidad Marina',
      category: 'Conceptos',
      description: 'La variedad de especies y ecosistemas que existen en nuestros océanos, desde microorganismos hasta grandes mamíferos marinos.',
      image: '/ecosystems/marine-biodiversity.jpg',
      connections: [1, 3, 9, 13]
    },
    {
      id: 3,
      name: 'Oceanografía Biológica',
      category: 'Campos',
      description: 'Estudio de cómo los procesos biológicos influyen en la química y física de los océanos y viceversa.',
      image: '/ecosystems/biological-oceanography.jpg',
      connections: [2, 4, 8]
    },
    {
      id: 4,
      name: 'Fitoplancton',
      category: 'Organismos',
      description: 'Microorganismos fotosintéticos responsables de producir más del 50% del oxígeno del planeta.',
      image: '/ecosystems/phytoplankton.jpg',
      connections: [3, 5, 10]
    },
    {
      id: 5,
      name: 'Zooplancton',
      category: 'Organismos',
      description: 'Pequeños organismos animales que derivan con las corrientes y forman una parte crucial de la cadena alimentaria marina.',
      image: '/ecosystems/zooplankton.jpg',
      connections: [4, 6, 10]
    },
    {
      id: 6,
      name: 'Mamíferos Marinos',
      category: 'Organismos',
      description: 'Grupo diverso que incluye ballenas, delfines, focas y manatíes, adaptados a la vida acuática.',
      image: '/ecosystems/marine-mammals.jpg',
      connections: [5, 9, 15]
    },
    {
      id: 7,
      name: 'Ecosistemas Bentónicos',
      category: 'Ecosistemas',
      description: 'Comunidades biológicas que habitan el fondo marino, desde la costa hasta las fosas abisales.',
      image: '/ecosystems/benthic-ecosystems.jpg',
      connections: [1, 8, 11]
    },
    {
      id: 8,
      name: 'Ecología Marina',
      category: 'Campos',
      description: 'Estudio de las interacciones entre organismos marinos y su ambiente, incluyendo redes tróficas y flujos de energía.',
      image: '/ecosystems/marine-ecology.jpg',
      connections: [3, 7, 12]
    },
    {
      id: 9,
      name: 'Conservación Marina',
      category: 'Aplicaciones',
      description: 'Esfuerzos para proteger y preservar ecosistemas marinos y su biodiversidad frente a amenazas humanas.',
      image: '/ecosystems/marine-conservation.jpg',
      connections: [2, 6, 13]
    },
    {
      id: 10,
      name: 'Productividad Primaria',
      category: 'Procesos',
      description: 'Síntesis de compuestos orgánicos a partir de CO₂, principalmente por fitoplancton, base de las cadenas alimentarias marinas.',
      image: '/ecosystems/primary-productivity.jpg',
      connections: [4, 5, 12]
    },
    {
      id: 11,
      name: 'Ecosistemas Pelágicos',
      category: 'Ecosistemas',
      description: 'Hábitats de aguas abiertas donde viven organismos que nadan o flotan libremente en la columna de agua.',
      image: '/ecosystems/pelagic-ecosystems.jpg',
      connections: [1, 7, 14]
    },
    {
      id: 12,
      name: 'Ciclos Biogeoquímicos',
      category: 'Procesos',
      description: 'Intercambio de elementos químicos entre organismos marinos y su ambiente, fundamentales para el funcionamiento ecosistémico.',
      image: '/ecosystems/biogeochemical-cycles.jpg',
      connections: [8, 10, 13]
    },
    {
      id: 13,
      name: 'Cambio Climático y Océanos',
      category: 'Desafíos',
      description: 'Impacto del calentamiento global en ecosistemas marinos, incluyendo acidificación, aumento del nivel del mar y eventos extremos.',
      image: '/ecosystems/climate-change-oceans.jpg',
      connections: [2, 9, 12]
    },
    {
      id: 14,
      name: 'Especies Invasoras',
      category: 'Desafíos',
      description: 'Organismos introducidos en ecosistemas donde no son nativos, causando desequilibrios ecológicos y económicos.',
      image: '/ecosystems/invasive-species.jpg',
      connections: [11, 15]
    },
    {
      id: 15,
      name: 'Bioacústica Marina',
      category: 'Métodos',
      description: 'Estudio de los sonidos producidos por organismos marinos y su uso en comunicación, navegación y localización de presas.',
      image: '/ecosystems/marine-bioacoustics.jpg',
      connections: [6, 14]
    }
  ];
  
  // Colores para las categorías
  const categoryColors = {
    'Ecosistemas': '#219ebc', // Azul océano
    'Conceptos': '#2a9d8f',   // Verde oceánico
    'Campos': '#8338ec',      // Púrpura
    'Organismos': '#fb8500',  // Ámbar/Naranja
    'Aplicaciones': '#ef476f', // Rosa
    'Procesos': '#4361ee',    // Índigo
    'Desafíos': '#e63946',    // Rojo
    'Métodos': '#00b4d8'      // Celeste
  };

  // Posiciones fijas para los nodos en un patrón circular
  useEffect(() => {
    if (!networkRef.current) return;
    
    const positionNodes = () => {
      const container = networkRef.current;
      if (!container) return;
      
      const width = container.clientWidth;
      const height = container.clientHeight;
      const centerX = width / 2;
      const centerY = height / 2;
      
      // Crear SVG para las líneas si no existe
      let svgElement = container.querySelector('svg.connection-lines') as SVGSVGElement | null;
      if (!svgElement) {
        svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svgElement.classList.add('connection-lines');
        svgElement.setAttribute('width', '100%');
        svgElement.setAttribute('height', '100%');
        svgElement.style.position = 'absolute';
        svgElement.style.top = '0';
        svgElement.style.left = '0';
        svgElement.style.zIndex = '1';
        svgElement.style.pointerEvents = 'none';
        container.appendChild(svgElement);
      }
      
      // Limpiar el SVG
      while (svgElement.firstChild) {
        svgElement.removeChild(svgElement.firstChild);
      }
      
      // Posicionar nodos en un patrón circular
      topics.forEach((topic, index) => {
        const nodeRef = nodeRefs.current[topic.id];
        if (!nodeRef) return;
        
        // Calcular posición en círculo
        const angleStep = (2 * Math.PI) / topics.length;
        const angle = index * angleStep;
        const radius = Math.min(width, height) * 0.35;
        
        // Agregar variación para que no sea un círculo perfecto
        const randomOffset = () => (Math.random() - 0.5) * 60;
        const x = centerX + Math.cos(angle) * radius + randomOffset();
        const y = centerY + Math.sin(angle) * radius + randomOffset();
        
        // Aplicar posición
        nodeRef.style.left = `${x - 60}px`; // Ajuste para el centro del nodo
        nodeRef.style.top = `${y - 60}px`;
        
        // Guardar coordenadas para dibujar líneas después
        nodeRef.dataset.centerX = String(x);
        nodeRef.dataset.centerY = String(y);
      });
      
      // Dibujar líneas de conexión después de posicionar los nodos
      drawAllConnections(svgElement);
    };
    
    // Dibujar todas las conexiones
    const drawAllConnections = (svg: SVGSVGElement) => {
      topics.forEach(topic => {
        topic.connections.forEach(connectedId => {
          // Dibujar cada conexión solo una vez
          if (topic.id < connectedId) {
            const sourceNode = nodeRefs.current[topic.id];
            const targetNode = nodeRefs.current[connectedId];
            
            if (sourceNode && targetNode) {
              const sourceX = parseFloat(sourceNode.dataset.centerX || '0');
              const sourceY = parseFloat(sourceNode.dataset.centerY || '0');
              const targetX = parseFloat(targetNode.dataset.centerX || '0');
              const targetY = parseFloat(targetNode.dataset.centerY || '0');
              
              // Crear línea SVG
              const line = document.createElementNS('http://www.w3.org/2000/svg', 'line') as SVGLineElement;
              line.setAttribute('x1', String(sourceX));
              line.setAttribute('y1', String(sourceY));
              line.setAttribute('x2', String(targetX));
              line.setAttribute('y2', String(targetY));
              line.setAttribute('stroke', categoryColors[topic.category as keyof typeof categoryColors] || '#ccc');
              line.setAttribute('stroke-width', '2');
              line.setAttribute('data-source', String(topic.id));
              line.setAttribute('data-target', String(connectedId));
              line.style.opacity = '0.6';
              
              svg.appendChild(line);
            }
          }
        });
      });
    };
    
    // Resaltar conexiones para un nodo específico
    const highlightConnections = (nodeId: number | null) => {
      const svg = networkRef.current?.querySelector('svg.connection-lines') as SVGSVGElement | null;
      if (!svg) return;
      
      const lines = svg.querySelectorAll('line');
      
      if (nodeId === null) {
        // Restaurar todas las líneas
        lines.forEach(line => {
          const svgLine = line as SVGLineElement;
          svgLine.style.opacity = '0.6';
          svgLine.setAttribute('stroke-width', '2');
        });
        
        // Restaurar todos los nodos
        Object.values(nodeRefs.current).forEach(node => {
          if (node) {
            node.style.opacity = '1';
            node.style.transform = '';
            node.style.zIndex = '10';
          }
        });
      } else {
        // Atenuar todas las líneas
        lines.forEach(line => {
          const svgLine = line as SVGLineElement;
          svgLine.style.opacity = '0.2';
          svgLine.setAttribute('stroke-width', '1');
        });
        
        // Atenuar todos los nodos
        Object.values(nodeRefs.current).forEach(node => {
          if (node) {
            node.style.opacity = '0.3';
            node.style.zIndex = '5';
          }
        });
        
        // Resaltar el nodo seleccionado
        const selectedNode = nodeRefs.current[nodeId];
        if (selectedNode) {
          selectedNode.style.opacity = '1';
          selectedNode.style.transform = 'scale(1.2)';
          selectedNode.style.zIndex = '20';
        }
        
        // Resaltar nodos conectados
        const topic = topics.find(t => t.id === nodeId);
        if (topic) {
          topic.connections.forEach(connId => {
            const connectedNode = nodeRefs.current[connId];
            if (connectedNode) {
              connectedNode.style.opacity = '1';
              connectedNode.style.zIndex = '15';
            }
            
            // Resaltar líneas conectadas
            lines.forEach(line => {
              const svgLine = line as SVGLineElement;
              const sourceId = svgLine.getAttribute('data-source');
              const targetId = svgLine.getAttribute('data-target');
              
              if ((sourceId === String(nodeId) && targetId === String(connId)) || 
                  (sourceId === String(connId) && targetId === String(nodeId))) {
                svgLine.style.opacity = '1';
                svgLine.setAttribute('stroke-width', '3');
              }
            });
          });
        }
      }
    };
    
    // Inicializar la red
    positionNodes();
    
    // Manejar eventos de zoom
    window.addEventListener('resize', positionNodes);
    
    // Actualizar estado para manejar selección de nodos
    setZoomedNode(null);
    
    // Función para actualizar la visualización cuando cambia el nodo seleccionado
    const updateSelectedNode = (id: number | null) => {
      highlightConnections(id);
    };
    
    // Exportar funciones al objeto window para debugging
    (window as any).marineNetworkFunctions = {
      positionNodes,
      drawAllConnections,
      highlightConnections,
      updateSelectedNode
    };
    
    return () => {
      window.removeEventListener('resize', positionNodes);
      // Limpiar objeto window
      if ((window as any).marineNetworkFunctions) {
        delete (window as any).marineNetworkFunctions;
      }
    };
  }, [topics]);
  
  // Efecto para actualizar la visualización cuando cambia el nodo seleccionado
  useEffect(() => {
    if ((window as any).marineNetworkFunctions?.updateSelectedNode) {
      (window as any).marineNetworkFunctions.updateSelectedNode(zoomedNode);
    }
  }, [zoomedNode]);

  // Manejar clic en un tópico
  const handleTopicClick = (topic: Topic) => {
    if (zoomedNode === topic.id) {
      // Deseleccionar
      setZoomedNode(null);
      setSelectedTopic(null);
      setIsInfoVisible(false);
    } else {
      // Seleccionar nuevo tópico
      setZoomedNode(topic.id);
      setSelectedTopic(topic);
      setIsInfoVisible(true);
    }
  };

  return (
    <div className="relative w-full h-screen bg-gradient-to-b from-blue-900 to-blue-950 overflow-hidden">
      {/* Red de tópicos */}
      <div ref={networkRef} className="relative w-full h-full">
        {/* Nodos */}
        {topics.map((topic) => {
          const nodeColor = categoryColors[topic.category as keyof typeof categoryColors] || '#219ebc';
          
          return (
            <motion.div
              key={topic.id}
              ref={(el: HTMLDivElement | null) => { nodeRefs.current[topic.id] = el; }}
              className={`absolute network-node cursor-pointer rounded-full flex items-center justify-center p-1 shadow-lg z-10 hover:scale-110 transition-all duration-300`}
              style={{ 
                backgroundColor: nodeColor,
                width: '120px',
                height: '120px',
                position: 'absolute',
              }}
              onClick={() => handleTopicClick(topic)}
              whileHover={{ scale: 1.1, boxShadow: '0 0 15px rgba(255,255,255,0.3)' }}
            >
              <span className="text-white text-center font-medium px-2 text-sm">
                {topic.name}
              </span>
            </motion.div>
          );
        })}
      </div>
      
      {/* Panel de información del tópico seleccionado */}
      <AnimatePresence>
        {selectedTopic && isInfoVisible && (
          <motion.div 
            className="absolute right-0 top-0 h-full w-full md:w-1/3 bg-white shadow-2xl overflow-hidden z-30"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <div className="h-full flex flex-col">
              <div className="relative h-1/3 bg-gray-200">
                <div 
                  className="w-full h-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${selectedTopic.image})` }}
                />
                <button 
                  onClick={() => {
                    setIsInfoVisible(false);
                    setTimeout(() => {
                      setSelectedTopic(null);
                      setZoomedNode(null);
                    }, 300);
                  }}
                  className="absolute top-4 right-4 rounded-full bg-black bg-opacity-50 p-2 text-white hover:bg-opacity-70 transition"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="p-6 flex-grow overflow-y-auto">
                <div className="inline-block px-3 py-1 rounded-full text-sm font-medium mb-2" 
                    style={{ 
                      backgroundColor: `${categoryColors[selectedTopic.category as keyof typeof categoryColors] || '#219ebc'}20`, 
                      color: categoryColors[selectedTopic.category as keyof typeof categoryColors] || '#219ebc'
                    }}>
                  {selectedTopic.category}
                </div>
                <h2 className="text-2xl font-bold text-ocean-dark mb-4">{selectedTopic.name}</h2>
                <p className="text-gray-600 mb-6">{selectedTopic.description}</p>
                
                <h3 className="text-lg font-semibold text-ocean-dark mb-3">Tópicos relacionados</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedTopic.connections.map((connId: number) => {
                    const connectedTopic = topics.find(t => t.id === connId);
                    if (!connectedTopic) return null;
                    
                    const buttonColor = categoryColors[connectedTopic.category as keyof typeof categoryColors] || '#219ebc';
                    
                    return (
                      <button
                        key={connId}
                        className="px-3 py-1 rounded-full text-sm font-medium text-white transition-all hover:shadow-md"
                        style={{ backgroundColor: buttonColor }}
                        onClick={() => {
                          handleTopicClick(connectedTopic);
                        }}
                      >
                        {connectedTopic.name}
                      </button>
                    );
                  })}
                </div>
                
                <div className="mt-8">
                  <a 
                    href={`/biological/${selectedTopic.name.toLowerCase().replace(/ /g, '-')}`} 
                    className="inline-flex items-center text-ocean hover:text-ocean-dark transition"
                  >
                    Explorar más sobre este tema
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Botón "Ver todos" */}
      {zoomedNode && (
        <button 
          onClick={() => {
            setZoomedNode(null);
            setSelectedTopic(null);
            setIsInfoVisible(false);
          }}
          className="absolute bottom-6 left-6 z-20 bg-white bg-opacity-20 backdrop-blur-sm text-white px-4 py-2 rounded-full hover:bg-opacity-30 transition-all"
        >
          Ver Todos
        </button>
      )}
      
      {/* Leyenda de categorías */}
      <div className="absolute bottom-6 right-6 bg-black bg-opacity-20 backdrop-blur-sm rounded-lg p-4 z-20">
        <h3 className="text-white text-sm font-medium mb-2">Categorías</h3>
        <div className="flex flex-wrap gap-x-4 gap-y-2">
          {Object.entries(categoryColors).map(([category, color]) => (
            <div key={category} className="flex items-center">
              <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: color }}></div>
              <span className="text-white text-xs">{category}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarineTopicsNetwork;