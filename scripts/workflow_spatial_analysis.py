"""
Genera un diagrama de workflow para el análisis espacial de zooplancton
con métodos de interpolación mejorados.
"""

import graphviz

# Crear un nuevo grafo
dot = graphviz.Digraph(comment='Workflow de Análisis Espacial de Zooplancton')
dot.attr(rankdir='TB')

# Estilo general
dot.attr('node', shape='box', style='rounded,filled', fillcolor='white')

# Datos de entrada
dot.node('A1', 'Datos de Muestreo\nZooplancton', fillcolor='#e6f3ff')
dot.node('A2', 'Coordenadas\nGeográficas', fillcolor='#e6f3ff')
dot.node('A3', 'Profundidades\n[0m, 50m, 100m, 200m]', fillcolor='#e6f3ff')

# Preprocesamiento
dot.node('B1', 'Generación de\nEstaciones de Muestreo', fillcolor='#fff2cc')
dot.node('B2', 'Creación de\nMáscara Terrestre', fillcolor='#fff2cc')

# Interpolación Mejorada
with dot.subgraph(name='cluster_0') as c:
    c.attr(label='Interpolación Espacial Mejorada', style='rounded', fillcolor='#e8f4ea')
    c.node('C1', 'RBF Inicial\n(epsilon=0.005, smooth=0.1)', fillcolor='#d5e8d4')
    c.node('C2', 'Suavizado Gaussiano\nMulti-escala', fillcolor='#d5e8d4')
    c.node('C3', 'Spline Bicúbico\n(s=0.001)', fillcolor='#d5e8d4')
    c.node('C4', 'Suavizado Final\n(sigma=0.6)', fillcolor='#d5e8d4')
    
    c.edge('C1', 'C2')
    c.edge('C2', 'C3')
    c.edge('C3', 'C4')

# Visualización
dot.node('D1', 'Mapas de Diversidad\npor Profundidad', fillcolor='#ffe6cc')
dot.node('D2', 'Gradiente\nVertical', fillcolor='#ffe6cc')
dot.node('D3', 'Perfil\nVertical', fillcolor='#ffe6cc')
dot.node('D4', 'Resumen\nEstadístico', fillcolor='#ffe6cc')

# Conexiones
dot.edge('A1', 'B1')
dot.edge('A2', 'B1')
dot.edge('A2', 'B2')
dot.edge('A3', 'B1')

dot.edge('B1', 'C1')
dot.edge('B2', 'D1')

dot.edge('C4', 'D1')
dot.edge('C4', 'D2')
dot.edge('C4', 'D3')
dot.edge('C4', 'D4')

# Guardar el diagrama
dot.render('public/images/diversidad/zooplankton/workflow_spatial_analysis', 
           format='png', cleanup=True) 