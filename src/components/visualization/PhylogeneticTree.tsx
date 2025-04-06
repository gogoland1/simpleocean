import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface PhylogeneticData {
  name: string;
  children?: PhylogeneticData[];
  value?: number;
  color?: string;
  abundance?: number;
}

interface PhylogeneticTreeProps {
  data: PhylogeneticData;
  width?: number;
  height?: number;
}

interface TreeNode extends d3.HierarchyNode<PhylogeneticData> {
  x: number;
  y: number;
}

interface TreeLink extends d3.HierarchyLink<PhylogeneticData> {
  source: TreeNode;
  target: TreeNode;
}

const PhylogeneticTree: React.FC<PhylogeneticTreeProps> = ({ 
  data,
  width = 900,
  height = 900
}) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || !data) return;

    // Limpiar el SVG
    d3.select(svgRef.current).selectAll("*").remove();

    // Configurar el árbol radial
    const radius = Math.min(width, height) / 2;

    const tree = d3.tree<PhylogeneticData>()
      .size([2 * Math.PI, radius - 120])
      .separation((a: TreeNode, b: TreeNode) => {
        // Aumentar la separación entre nodos
        return (a.parent === b.parent ? 1 : 2.5) / a.depth;
      });

    // Crear la jerarquía de datos
    const root = d3.hierarchy(data) as TreeNode;
    const treeData = tree(root);

    // Crear el SVG
    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .style("font", "10px sans-serif")
      .style("user-select", "none");

    const g = svg.append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);

    // Dibujar los enlaces con curvas más pronunciadas
    const linkGenerator = d3.linkRadial<TreeLink, TreeNode>()
      .angle(d => d.x)
      .radius(d => d.y);

    g.append("g")
      .attr("fill", "none")
      .attr("stroke-opacity", 0.4)
      .selectAll("path")
      .data(treeData.links())
      .join("path")
      .attr("stroke", (d: TreeLink) => d.target.data.color || "#555")
      .attr("stroke-width", (d: TreeLink) => {
        // Hacer las líneas más delgadas hacia las puntas
        const depth = d.target.depth;
        return Math.max(0.5, 2 - depth * 0.3);
      })
      .attr("d", linkGenerator);

    // Dibujar los nodos
    const node = g.append("g")
      .selectAll("g")
      .data(root.descendants())
      .join("g")
      .attr("transform", (d: TreeNode) => `
        rotate(${(d.x * 180 / Math.PI - 90)})
        translate(${d.y},0)
      `);

    // Círculos más pequeños para las ramificaciones
    node.append("circle")
      .attr("fill", (d: TreeNode) => d.data.color || "#999")
      .attr("r", (d: TreeNode) => {
        // Hacer los nodos más pequeños hacia las puntas
        const size = d.data.abundance || 1;
        const depth = d.depth;
        return Math.max(1, 3 - depth * 0.5) * Math.sqrt(size / 100);
      });

    // Etiquetas de texto
    node.append("text")
      .attr("dy", "0.31em")
      .attr("x", (d: TreeNode) => d.x < Math.PI === !d.children ? 6 : -6)
      .attr("text-anchor", (d: TreeNode) => d.x < Math.PI === !d.children ? "start" : "end")
      .attr("transform", (d: TreeNode) => d.x >= Math.PI ? "rotate(180)" : null)
      .text((d: TreeNode) => d.data.name)
      .style("font-size", (d: TreeNode) => {
        // Ajustar el tamaño del texto según la profundidad
        return `${Math.max(8, 12 - d.depth)}px`;
      })
      .style("font-weight", (d: TreeNode) => d.children ? "bold" : "normal")
      .clone(true).lower()
      .attr("stroke", "white")
      .attr("stroke-width", 3);

  }, [data, width, height]);

  return (
    <div className="relative w-full h-full">
      <svg
        ref={svgRef}
        className="w-full h-full"
        style={{ maxHeight: '900px' }}
      />
    </div>
  );
};

export default PhylogeneticTree; 