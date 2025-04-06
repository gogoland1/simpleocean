# OceanInsight - Plataforma de Consultoría Oceanográfica

OceanInsight es una plataforma web de consultoría oceanográfica potenciada por inteligencia artificial, diseñada para ofrecer recursos, análisis y asesoría en diversas áreas de las ciencias del mar.

## 📋 Tabla de Contenidos

- [Visión General](#visión-general)
- [Características](#características)
- [Stack Tecnológico](#stack-tecnológico)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Componentes Principales](#componentes-principales)
- [Guía de Instalación](#guía-de-instalación)
- [Uso](#uso)
- [Áreas de Desarrollo Futuro](#áreas-de-desarrollo-futuro)
- [Contribución](#contribución)

## 🌊 Visión General

OceanInsight es una plataforma que combina conocimientos especializados en oceanografía con tecnologías modernas para proporcionar servicios de consultoría en diversas áreas:

- Biología Marina
- Oceanografía Física
- Oceanografía Química
- Oceanografía Geológica
- Aplicaciones de Computación Cuántica en Oceanografía

El proyecto incluye una interfaz web interactiva, recursos educativos, y herramientas de análisis basadas en IA para ayudar a investigadores, estudiantes y profesionales del sector marítimo.

## ✨ Características

- **Interfaz Moderna**: Diseño responsive con Tailwind CSS
- **Estructura Modular**: Componentes reutilizables basados en React
- **Navegación Intuitiva**: Acceso sencillo a las diferentes áreas de especialización
- **Optimización SEO**: Metadatos apropiados para mejorar el posicionamiento en buscadores
- **Base para Chatbot de IA**: Estructura preparada para integrar asistentes virtuales

## 🛠️ Stack Tecnológico

- **Framework**: [Next.js](https://nextjs.org/) 15.x (basado en React)
- **Lenguaje**: [TypeScript](https://www.typescriptlang.org/)
- **Estilos**: [Tailwind CSS](https://tailwindcss.com/)
- **Enrutamiento**: Next.js Router
- **API**: [tRPC](https://trpc.io/) para endpoints tipados
- **Desarrollo**: [Create-T3-App](https://create.t3.gg/)

## 📁 Estructura del Proyecto

```
ocean_insight/
├── .next/                  # Archivos generados por Next.js
├── node_modules/           # Dependencias de Node.js
├── public/                 # Archivos estáticos
├── src/                    # Código fuente
│   ├── components/         # Componentes React
│   │   ├── layout/         # Componentes de estructura
│   │   │   ├── Navbar.tsx  # Barra de navegación
│   │   │   ├── FooterSection.tsx # Pie de página
│   │   │   └── Layout.tsx  # Estructura principal
│   ├── pages/              # Páginas del sitio
│   │   ├── index.tsx       # Página principal
│   │   ├── biological.tsx  # Página de biología marina
│   │   ├── physical.tsx    # Página de oceanografía física
│   │   ├── chemical.tsx    # Página de oceanografía química
│   │   ├── geological.tsx  # Página de oceanografía geológica
│   │   └── quantum.tsx     # Página de computación cuántica
│   ├── server/             # Lógica del servidor (tRPC)
│   ├── styles/             # Estilos globales
│   └── utils/              # Utilidades y funciones auxiliares
├── .eslintrc.js            # Configuración de ESLint
├── .gitignore              # Archivos ignorados por Git
├── next.config.js          # Configuración de Next.js
├── package.json            # Dependencias y scripts
├── postcss.config.js       # Configuración de PostCSS
├── README.md               # Documentación del proyecto
├── tailwind.config.ts      # Configuración de Tailwind CSS
└── tsconfig.json           # Configuración de TypeScript
```

## 🧩 Componentes Principales

### Layout

El componente `Layout.tsx` proporciona la estructura principal para todas las páginas, incluyendo:

- Cabecera con metadatos
- Barra de navegación (Navbar)
- Contenedor principal para el contenido específico de cada página
- Pie de página (FooterSection)

```tsx
// src/components/layout/Layout.tsx
import { type ReactNode } from "react";
import Head from "next/head";
import Navbar from "./Navbar";
import FooterSection from "./FooterSection";

interface LayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
}

export default function Layout({
  children,
  title = "OceanInsight - Consultoría Oceanográfica",
  description = "Plataforma de consultoría oceanográfica potenciada por IA",
}: LayoutProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <FooterSection />
      </div>
    </>
  );
}
```

### Navbar

El componente `Navbar.tsx` implementa una barra de navegación responsive con:

- Logo/título de la plataforma
- Enlaces a las principales áreas de oceanografía
- Menú desplegable para dispositivos móviles

### FooterSection

El componente `FooterSection.tsx` proporciona el pie de página con:

- Enlaces a páginas importantes como "Sobre nosotros" y "Contacto"
- Enlace al repositorio de GitHub
- Información de copyright

### Página Principal

La página principal (`index.tsx`) muestra:

- Una sección hero con título y descripción
- Tarjetas para las diferentes áreas de oceanografía
- Sección "¿Por qué elegir OceanInsight?" con beneficios destacados

## 🚀 Guía de Instalación

Para instalar y ejecutar este proyecto localmente:

1. **Clonar el repositorio**:
```bash
git clone https://github.com/tu-usuario/ocean_insight.git
cd ocean_insight
```

2. **Instalar dependencias**:
```bash
npm install
```

3. **Ejecutar en modo desarrollo**:
```bash
npm run dev
```

La aplicación estará disponible en [http://localhost:3000](http://localhost:3000).

## 💻 Uso

### Desarrollo

Para trabajar en el proyecto:

1. **Iniciar el servidor de desarrollo**:
```bash
npm run dev
```

2. **Construir para producción**:
```bash
npm run build
```

3. **Iniciar versión de producción**:
```bash
npm start
```

### Añadir Nuevas Páginas

Para crear una nueva página:

1. Añade un nuevo archivo en la carpeta `src/pages/`
2. Utiliza el componente `Layout` para mantener la estructura consistente
3. Implementa el contenido específico de la página dentro del `Layout`

Ejemplo:
```tsx
import Layout from "~/components/layout/Layout";

export default function NewPage() {
  return (
    <Layout title="Nueva Página - OceanInsight">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold">Nueva Página</h1>
        <p className="mt-4">Contenido de la página...</p>
      </div>
    </Layout>
  );
}
```

## 🔮 Áreas de Desarrollo Futuro

El proyecto tiene planificadas las siguientes mejoras:

1. **Chatbot de Consultoría**:
   - Implementación de asistentes IA especializados en cada área de oceanografía
   - Interfaz de chat para consultas en tiempo real

2. **Visualizaciones de Datos Oceanográficos**:
   - Gráficos interactivos usando D3.js o Recharts
   - Mapas oceanográficos con Leaflet

3. **Repositorio de Conocimiento**:
   - Biblioteca de recursos y artículos
   - Sistema de categorización y búsqueda

4. **Integración con Proyecto tIAmat**:
   - Herramientas de análisis de datos oceanográficos
   - Visualizaciones científicas avanzadas

5. **Módulo de Computación Cuántica**:
   - Recursos educativos sobre aplicaciones de computación cuántica en oceanografía
   - Demostraciones conceptuales

## 👥 Contribución

Las contribuciones son bienvenidas. Para contribuir:

1. Haz un fork del repositorio
2. Crea una rama para tu feature (`git checkout -b feature/amazing-feature`)
3. Haz commit de tus cambios (`git commit -m 'Add some amazing feature'`)
4. Push a la rama (`git push origin feature/amazing-feature`)
5. Abre un Pull Request

---

Creado por [Tu Nombre] - Oceanógrafo y Desarrollador Web