import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

const MarineNeuralNetwork: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<number | null>(null);
  const [showPanel, setShowPanel] = useState(false);
  const networkRef = useRef<HTMLDivElement | null>(null);
  const nodesRef = useRef<Record<string, HTMLDivElement | null>>({});
  const linesRef = useRef<HTMLDivElement[]>([]);

  // Datos de tópicos con categorías de colores
  const topics = [
    { id: 1, name: 'Arrecifes de Coral', category: 'Ecosistemas', color: '#219ebc', 
      description: 'Ecosistemas marinos de alta biodiversidad formados principalmente por colonias de corales, hogar de más del 25% de especies marinas.', 
      connections: [2, 3, 5, 8, 12, 14, 17] },
    { id: 2, name: 'Biodiversidad Marina', category: 'Conceptos', color: '#2a9d8f', 
      description: 'La variedad de vida en los océanos, desde microorganismos hasta grandes mamíferos. Los científicos marinos estudian tres componentes: diversidad alfa (riqueza de especies en un hábitat), diversidad beta (cambios entre comunidades) y diversidad gamma (diversidad regional total). Ejemplos destacados incluyen los arrecifes de coral del Triángulo de Coral con más de 600 especies de corales, las praderas de Posidonia del Mediterráneo con su alta diversidad funcional, y los ecosistemas de surgencia costera como Humboldt con su rica diversidad de fitoplancton.', 
      extraContent: {
        title: 'Análisis de Biodiversidad Marina',
        text: 'Nuestro módulo de análisis de biodiversidad ofrece herramientas para calcular índices de diversidad alfa (Shannon, Simpson, Margalef), beta (Bray-Curtis, Whittaker) y gamma utilizando métodos multivariados (RDA, db-RDA, NMDS). Estas técnicas son fundamentales para entender patrones de distribución de especies y monitorear cambios en ecosistemas marinos.',
        link: '/biological/biodiversity',
        linkText: 'Explorar Módulo de Biodiversidad'
      },
      connections: [1, 3, 4, 5, 7, 8, 9, 13, 16, 18] },
    { id: 3, name: 'Oceanografía Biológica', category: 'Campos', color: '#8338ec', 
      description: 'Estudio de cómo los procesos biológicos influyen en la química y física de los océanos y viceversa.', 
      connections: [1, 2, 4, 8, 10, 12, 15] },
    { id: 4, name: 'Fitoplancton', category: 'Organismos', color: '#fb8500', 
      description: 'Microorganismos fotosintéticos responsables de producir más del 50% del oxígeno del planeta.', 
      connections: [2, 3, 5, 7, 10, 15, 19] },
    { id: 5, name: 'Zooplancton', category: 'Organismos', color: '#fb8500', 
      description: 'Pequeños organismos animales que derivan con las corrientes y forman una parte crucial de la cadena alimentaria marina.', 
      connections: [1, 2, 4, 6, 10, 14, 19] },
    { id: 6, name: 'Mamíferos Marinos', category: 'Organismos', color: '#fb8500', 
      description: 'Grupo diverso que incluye ballenas, delfines, focas y manatíes, adaptados a la vida acuática.', 
      connections: [2, 5, 9, 13, 15, 20] },
    { id: 7, name: 'Ecosistemas Bentónicos', category: 'Ecosistemas', color: '#219ebc', 
      description: 'Comunidades biológicas que habitan el fondo marino, desde la costa hasta las fosas abisales.', 
      connections: [1, 2, 4, 8, 10, 11, 17] },
    { id: 8, name: 'Ecología Marina', category: 'Campos', color: '#8338ec', 
      description: 'Estudio de las interacciones entre organismos marinos y su ambiente, incluyendo redes tróficas y flujos de energía.', 
      connections: [1, 3, 7, 9, 11, 13, 16] },
    { id: 9, name: 'Conservación Marina', category: 'Aplicaciones', color: '#ef476f', 
      description: 'Esfuerzos para proteger y preservar ecosistemas marinos y su biodiversidad frente a amenazas humanas.', 
      connections: [1, 2, 6, 8, 13, 16, 18] }
  ];

  // Inicializar la red
  useEffect(() => {
    initNetwork();
    
    // Manejar cambios de tamaño
    window.addEventListener('resize', initNetwork);
    return () => {
      window.removeEventListener('resize', initNetwork);
      
      // Limpiar las líneas al desmontar
      clearLines();
    };
  }, []);
  
  // Función para inicializar la red
  const initNetwork = () => {
    if (!networkRef.current) return;
    
    positionNodes();
    
    // Dar tiempo para que se posicionen los nodos antes de dibujar las líneas
    setTimeout(() => {
      clearLines();
      drawConnections();
    }, 100);
  };
  
  // Posicionar los nodos en un patrón circular
  const positionNodes = () => {
    if (!networkRef.current) return;
    
    const container = networkRef.current;
    const width = container.clientWidth || 800;
    const height = container.clientHeight || 600;
    
    topics.forEach((topic, index) => {
      const nodeElement = nodesRef.current[topic.id.toString()];
      if (!nodeElement) return;
      
      const angleStep = (2 * Math.PI) / topics.length;
      const angle = index * angleStep;
      const radius = Math.min(width, height) * 0.35;
      
      const x = width / 2 + Math.cos(angle) * radius;
      const y = height / 2 + Math.sin(angle) * radius;
      
      nodeElement.style.left = `${x - 25}px`; // 25 es la mitad del ancho del nodo
      nodeElement.style.top = `${y - 25}px`; // 25 es la mitad de la altura del nodo
    });
  };
  
  // Limpiar todas las líneas
  const clearLines = () => {
    linesRef.current.forEach(line => {
      if (line && line.parentNode) {
        line.parentNode.removeChild(line);
      }
    });
    linesRef.current = [];
  };
  
  // Dibujar todas las conexiones
  const drawConnections = () => {
    if (!networkRef.current) return;
    
    const container = networkRef.current;
    
    topics.forEach(topic => {
      const sourceNode = nodesRef.current[topic.id.toString()];
      if (!sourceNode) return;
      
      topic.connections.forEach(targetId => {
        // Evitar dibujar conexiones duplicadas
        if (topic.id < targetId) {
          const targetNode = nodesRef.current[targetId.toString()];
          if (!targetNode) return;
          
          // Obtener posiciones
          const sourceRect = sourceNode.getBoundingClientRect();
          const targetRect = targetNode.getBoundingClientRect();
          const containerRect = container.getBoundingClientRect();
          
          // Calcular centros relativos al contenedor
          const sourceX = (sourceRect.left - containerRect.left) + (sourceRect.width / 2);
          const sourceY = (sourceRect.top - containerRect.top) + (sourceRect.height / 2);
          const targetX = (targetRect.left - containerRect.left) + (targetRect.width / 2);
          const targetY = (targetRect.top - containerRect.top) + (targetRect.height / 2);
          
          // Crear línea
          createLine(sourceX, sourceY, targetX, targetY, topic.color, container);
        }
      });
    });
  };
  
  // Crear una línea de conexión
  const createLine = (x1: number, y1: number, x2: number, y2: number, color: string, container: HTMLElement) => {
    // Calcular longitud y ángulo
    const dx = x2 - x1;
    const dy = y2 - y1;
    const length = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx) * 180 / Math.PI;
    
    // Crear elemento de línea
    const line = document.createElement('div');
    line.classList.add('network-line');
    line.dataset.source = x1.toString();
    line.dataset.target = x2.toString();
    
    // Aplicar estilos
    line.style.position = 'absolute';
    line.style.width = `${length}px`;
    line.style.height = '2px';
    line.style.backgroundColor = color;
    line.style.left = `${x1}px`;
    line.style.top = `${y1}px`;
    line.style.transform = `rotate(${angle}deg)`;
    line.style.transformOrigin = '0 0';
    line.style.opacity = '0.6';
    line.style.zIndex = '5';
    
    // Añadir al contenedor y guardar referencia
    container.appendChild(line);
    linesRef.current.push(line);
    
    return line;
  };
  
  // Manejar clic en un nodo
  const handleNodeClick = (id: number) => {
    if (selectedNode === id) {
      // Deseleccionar si ya está seleccionado
      setSelectedNode(null);
      setShowPanel(false);
      resetHighlights();
    } else {
      // Seleccionar nuevo nodo
      setSelectedNode(id);
      setShowPanel(true);
      highlightConnections(id);
    }
  };
  
  // Resaltar conexiones de un nodo
  const highlightConnections = (nodeId: number) => {
    // Atenuar todos los nodos primero
    topics.forEach(topic => {
      const nodeElement = nodesRef.current[topic.id.toString()];
      if (!nodeElement) return;
      
      // Reducir opacidad para todos
      nodeElement.style.opacity = '0.3';
      nodeElement.style.zIndex = '5';
      
      // Quitar cualquier escala anterior
      const transform = nodeElement.style.transform || '';
      if (transform.includes('scale')) {
        nodeElement.style.transform = transform.substring(0, transform.indexOf('scale')).trim();
      }
    });
    
    // Resaltar el nodo seleccionado
    const selectedNodeElement = nodesRef.current[nodeId.toString()];
    if (selectedNodeElement) {
      selectedNodeElement.style.opacity = '1';
      selectedNodeElement.style.zIndex = '20';
      selectedNodeElement.style.transform = 'scale(1.2)';
      selectedNodeElement.style.boxShadow = '0 0 15px rgba(255,255,255,0.5)';
    }
    
    // Resaltar nodos conectados
    const selectedTopic = topics.find(t => t.id === nodeId);
    if (selectedTopic) {
      selectedTopic.connections.forEach(connId => {
        const connectedNode = nodesRef.current[connId.toString()];
        if (connectedNode) {
          connectedNode.style.opacity = '1';
          connectedNode.style.zIndex = '15';
        }
      });
    }
    
    // Atenuar todas las líneas
    linesRef.current.forEach(line => {
      if (!line) return;
      line.style.opacity = '0.2';
      line.style.height = '1px';
    });
    
    // Resaltar las líneas conectadas al nodo seleccionado
    if (selectedTopic) {
      linesRef.current.forEach(line => {
        if (!line || !line.dataset.source || !line.dataset.target) return;
        
        // Intentar identificar las líneas conectadas al nodo seleccionado
        // Simplemente resaltamos todas las líneas por ahora
        // en una implementación real necesitaríamos una mejor forma de identificarlas
        line.style.opacity = '0.8';
        line.style.height = '3px';
        line.style.zIndex = '10';
      });
    }
  };
  
  // Restablecer todos los resaltados
  const resetHighlights = () => {
    // Restablecer nodos
    topics.forEach(topic => {
      const nodeElement = nodesRef.current[topic.id.toString()];
      if (!nodeElement) return;
      
      nodeElement.style.opacity = '1';
      nodeElement.style.zIndex = '10';
      
      // Quitar cualquier escala
      const transform = nodeElement.style.transform || '';
      if (transform.includes('scale')) {
        nodeElement.style.transform = transform.substring(0, transform.indexOf('scale')).trim();
      } else {
        nodeElement.style.transform = '';
      }
      
      nodeElement.style.boxShadow = '0 0 10px rgba(255,255,255,0.3)';
    });
    
    // Restablecer líneas
    linesRef.current.forEach(line => {
      if (!line) return;
      line.style.opacity = '0.6';
      line.style.height = '2px';
      line.style.zIndex = '5';
    });
  };
  
  // Función para resetear la vista
  const resetView = () => {
    setSelectedNode(null);
    setShowPanel(false);
    resetHighlights();
  };

  return (
    <div className="relative w-full h-full bg-black">
      {/* Red neural */}
      <div 
        ref={networkRef} 
        className="w-full h-full relative"
      >
        {/* Nodos */}
        {topics.map((topic) => (
          <div
            key={topic.id}
            ref={(el) => { nodesRef.current[topic.id.toString()] = el; }}
            className="absolute rounded-full flex items-center justify-center cursor-pointer transition-all duration-300"
            style={{
              width: '50px',
              height: '50px',
              backgroundColor: topic.color,
              zIndex: 10,
              boxShadow: '0 0 10px rgba(255,255,255,0.3)'
            }}
            onClick={() => handleNodeClick(topic.id)}
          >
            <span className="text-white text-xs font-bold">{topic.id}</span>
          </div>
        ))}
      </div>

      {/* Panel de información */}
      {showPanel && selectedNode && (
        <div className="absolute top-0 right-0 w-full md:w-96 h-full bg-gray-900 bg-opacity-90 backdrop-blur p-6 text-white overflow-auto z-50">
          {(() => {
            const topic = topics.find(t => t.id === selectedNode);
            if (!topic) return null;
            
            return (
              <>
                <button 
                  className="absolute top-4 right-4 text-white p-2 rounded-full bg-gray-800 hover:bg-gray-700"
                  onClick={resetView}
                >
                  X
                </button>
                
                <div className="mb-4">
                  <span 
                    className="inline-block px-3 py-1 text-sm rounded-full mb-2" 
                    style={{ backgroundColor: topic.color }}
                  >
                    {topic.category}
                  </span>
                </div>
                
                <h2 className="text-2xl font-bold mb-4">{topic.name}</h2>
                <p className="mb-6 text-gray-300">{topic.description}</p>
                
                {/* Contenido adicional solo para Biodiversidad Marina */}
                {'extraContent' in topic && topic.extraContent && (
                  <div className="mb-6 bg-gray-800 bg-opacity-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-3">{topic.extraContent.title}</h3>
                    <p className="text-gray-300 mb-4">{topic.extraContent.text}</p>
                    <Link 
                      href={topic.extraContent.link}
                      className="inline-block px-4 py-2 bg-ocean text-white rounded hover:bg-ocean-dark transition-colors"
                    >
                      {topic.extraContent.linkText}
                    </Link>
                  </div>
                )}
                
                <h3 className="text-lg font-semibold mb-3">Tópicos relacionados</h3>
                <div className="flex flex-wrap gap-2 mb-6">
                  {topic.connections.map(connId => {
                    const connectedTopic = topics.find(t => t.id === connId);
                    if (!connectedTopic) return null;
                    
                    return (
                      <button
                        key={connId}
                        className="px-3 py-1 rounded-full text-sm"
                        style={{ backgroundColor: connectedTopic.color }}
                        onClick={() => handleNodeClick(connId)}
                      >
                        {connectedTopic.name}
                      </button>
                    );
                  })}
                </div>
              </>
            );
          })()}
        </div>
      )}

      {/* Botón para resetear la visualización */}
      <button 
        className="absolute bottom-6 left-6 z-20 bg-gray-800 text-white px-4 py-2 rounded-full"
        onClick={resetView}
      >
        Ver Todos
      </button>
    </div>
  );
};

export default MarineNeuralNetwork;