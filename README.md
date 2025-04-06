# SimpleOcean - Análisis Oceanográfico

SimpleOcean es una plataforma web para el análisis y visualización de datos oceanográficos, incluyendo modelado de distribución de especies, análisis de masas de agua y seguimiento de fauna marina.

## Características Principales

- 🐟 Modelado de distribución de especies marinas
- 🌊 Análisis de masas de agua
- 🦭 Seguimiento de fauna marina
- 📊 Visualizaciones interactivas
- 🔄 Simulaciones multiagente

## Tecnologías

- Frontend: Next.js, Svelte, D3.js
- Backend: Python, FastAPI
- Análisis de Datos: Pandas, NumPy, Scikit-learn
- Visualización: Matplotlib, Seaborn, Folium
- Herramientas: Git, Docker, Jupyter Notebooks

## Instalación

1. Clonar el repositorio:
```bash
git clone https://github.com/tu-usuario/simpleocean.git
cd simpleocean
```

2. Instalar dependencias:
```bash
npm install
pip install -r requirements.txt
```

3. Configurar variables de entorno:
```bash
cp .env.example .env
```

4. Ejecutar el proyecto:
```bash
npm run dev
```

## Contribuir

Las contribuciones son bienvenidas. Por favor, lee las [guías de contribución](CONTRIBUTING.md) antes de enviar un pull request.

## Licencia

Este proyecto está licenciado bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## Contacto

Para preguntas o sugerencias, por favor abre un issue en el repositorio.

# Resumen de Proyectos

## 1. Ocean Insight - Modelo de Distribución de Especies
**Ubicación:** D:/ocean_insight

### Descripción
Sistema de modelado de distribución de especies marinas en la Bahía de Valparaíso, enfocado en copépodos y su relación con variables ambientales.

### Características Principales
- Modelo de distribución de especies usando GAM y MaxEnt
- Visualización de mapas de densidad con interpolación espacial
- Análisis de variables ambientales (temperatura, salinidad, clorofila, etc.)
- Predicciones de hábitat bajo escenarios de cambio climático
- Evaluación de modelos usando AUC y curvas de Boyce

### Tecnologías
- TypeScript/Next.js
- Svelte para componentes
- D3.js para visualizaciones
- Python para análisis de datos

## 2. Sistema Multiagente Oceanográfico
**Ubicación:** D:/ocean_agents

### Descripción
Sistema de simulación multiagente para estudiar interacciones oceanográficas y dinámicas ecosistémicas.

### Características Principales
- Simulación de agentes biológicos y físicos
- Modelado de interacciones entre especies
- Simulación de corrientes y masas de agua
- Análisis de patrones emergentes
- Visualización en tiempo real

### Tecnologías
- Python
- Mesa (framework multiagente)
- NumPy/Pandas para análisis
- Matplotlib/Plotly para visualización

## 3. Análisis de Telemetría de Focas
**Ubicación:** D:/seal_telemetry

### Descripción
Sistema de análisis de datos de telemetría de focas para estudiar sus patrones de movimiento y comportamiento.

### Características Principales
- Procesamiento de datos GPS
- Análisis de patrones de buceo
- Visualización de rutas
- Correlación con variables ambientales
- Predicción de comportamiento

### Tecnologías
- Python
- Pandas para análisis de datos
- Folium para mapas interactivos
- Scikit-learn para predicciones

## 4. Análisis de Masas de Agua
**Ubicación:** D:/water_masses

### Descripción
Sistema de análisis y clasificación de masas de agua usando datos oceanográficos.

### Características Principales
- Clasificación de masas de agua
- Análisis de propiedades termohalinas
- Visualización de secciones verticales
- Tracking de masas de agua
- Análisis de variabilidad temporal

### Tecnologías
- Python
- Ocean Data View (ODV)
- NumPy/SciPy para análisis
- Matplotlib/Seaborn para visualización

## Estructura General de Proyectos

```
D:/
├── ocean_insight/           # Modelo de distribución de especies
├── ocean_agents/           # Sistema multiagente
├── seal_telemetry/         # Análisis de telemetría
└── water_masses/          # Análisis de masas de agua
```

## Características Técnicas Comunes

### Análisis de Datos
- Procesamiento de datos oceanográficos
- Análisis estadístico avanzado
- Visualización de datos espaciales
- Predicción y modelado

### Visualización
- Mapas interactivos
- Gráficos de series temporales
- Visualizaciones 3D
- Dashboards interactivos

### Herramientas Comunes
- Python como lenguaje principal
- Git para control de versiones
- Jupyter Notebooks para análisis
- Docker para contenedorización

## Requisitos Generales
- Python 3.x
- R (para algunos análisis específicos)
- Dependencias listadas en requirements.txt de cada proyecto

## Instalación
1. Clonar los repositorios necesarios
2. Instalar dependencias:
   ```bash
   pip install -r requirements.txt
   ```
3. Configurar variables de entorno según sea necesario
4. Ejecutar los scripts o notebooks correspondientes
