# Dev Agent Kit

Paquete Integrado de Agente de Desarrollo - Una herramienta de desarrollo integral que integra Spec-kit, gestión de tareas pendientes, Roles de Agente, Aprendizaje por Refuerzo de IA y Claude Skills

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org/)

> **Proyecto de Código Abierto**: Este es un proyecto de código abierto que cualquiera puede usar, modificar y distribuir libremente.

## 🌐 Ver en Otros Idiomas / View in Other Languages

- 🇰🇷 [한국어 (Korean)](README.ko.md)
- 🇺🇸 [English](README.en.md)
- 🇨🇳 [中文 (Chinese)](README.zh.md)

## Características

### 1. Integración de Spec-kit
- Gestión de documentos de especificación basada en GitHub Spec-kit
- Documentación de requisitos y control de versiones
- Validación y prueba de especificaciones

### 2. Lista de Tareas Pendientes y Gestión de Tareas Paso a Paso
- Creación y gestión de elementos de tareas
- Seguimiento de progreso basado en hitos
- Gestión de prioridades y dependencias

### 3. Sistema de Roles de Agente
Un sistema de agentes que admite diversos roles de desarrollo:
- **PM (Gerente de Proyecto)**: Gestión y coordinación de proyectos
- **Desarrollador Frontend**: Desarrollo frontend
- **Desarrollador Backend**: Desarrollo backend
- **Desarrollador Servidor/BD**: Gestión de servidores y bases de datos
- **Gerente de Seguridad**: Gestión de seguridad y auditoría
- **Diseñador UI/UX**: Diseño de interfaz y experiencia de usuario
- **Investigador de Marketing de IA**: Investigación de mercado basada en IA

### 4. Aprendizaje por Refuerzo de IA (Agent Lightning)
- Integración de aprendizaje por refuerzo basada en Microsoft Agent Lightning
- Optimización del rendimiento del agente
- Gestión de datos de entrenamiento

### 5. Integración de Claude Skills
- Integración con ComposioHQ awesome-claude-skills
- Utilización de varias habilidades de Claude AI
- Soporte para desarrollo de habilidades personalizadas

### 6. Integración de Agent Skills
- Integración con el framework agentskills
- Gestión y expansión de habilidades de agente

### 7. Optimización SEO
- Análisis de optimización de motores de búsqueda
- Análisis de metaetiquetas y palabras clave
- Generación de Sitemap y Robots.txt
- Validación de datos estructurados

### 8. Optimización SEO con IA
- Investigación de palabras clave basada en IA
- Optimización automática de contenido
- Análisis de densidad de palabras clave y legibilidad
- Análisis de palabras clave de la competencia

### 9. Servidor Backend FastAPI
- Provisión de API RESTful optimizada
- Procesamiento asíncrono y optimización de rendimiento
- Generación automática de documentación API (Swagger/OpenAPI)

### 10. Optimización de Token de Clave API
- Almacenamiento en caché y reutilización de tokens
- Almacenamiento seguro cifrado
- Seguimiento y monitoreo de uso

### 11. GEO (Optimización de Motor Generativo)
- Optimización de motores de búsqueda de IA generativa (ChatGPT, Claude, Perplexity, Gemini, etc.)
- Análisis de estructura de contenido amigable con IA
- Generación de esquemas FAQ, HowTo, Article
- Optimización de compatibilidad con múltiples motores de IA
- Mejora de citas y credibilidad

### 12. Optimización Todo en Uno (AIO)
- Análisis integral de SEO, SEO con IA, GEO
- Análisis de rendimiento, accesibilidad y seguridad
- Optimización de redes sociales
- Optimización automática y generación de informes

## Instalación

### Instalación Básica

```bash
# Clonar repositorio
git clone https://github.com/saewookkangboy/dev-agent-kit.git
cd dev-agent-kit

# Instalar dependencias
npm install

# Configurar
npm run setup
```

### Instalación Global (Opcional)

```bash
npm link
# o
npm install -g .
```

Después de la instalación, puede usar el comando `dev-agent` en cualquier lugar.

## Uso

### Inicialización del Proyecto

```bash
npm run init
# o
dev-agent init
```

### Uso de CLI

#### Gestión de Lista de Tareas Pendientes

```bash
# Agregar tarea pendiente (con prioridad e hito)
dev-agent todo add "Descripción de la tarea" -p high -m "Fase 1"
dev-agent todo add "Integración de API" -p medium

# Listar tareas pendientes
dev-agent todo list
dev-agent todo list -s pending  # Filtrar por estado

# Completar tarea pendiente
dev-agent todo complete <id>
```

#### Configuración de Rol de Agente

```bash
# Establecer rol
dev-agent role set --role frontend
dev-agent role set --role backend
dev-agent role set --role pm

# Listar roles disponibles
dev-agent role list

# Obtener información del rol actual
dev-agent role info
```

#### Gestión de Spec-kit

```bash
# Crear documento de especificación
dev-agent spec create "Sistema de Autenticación de Usuario"
dev-agent spec create "Diseño de API"

# Listar documentos de especificación
dev-agent spec list

# Validar documentos de especificación
dev-agent spec validate
```

#### Aprendizaje por Refuerzo de IA

```bash
# Iniciar aprendizaje por refuerzo
dev-agent train --agent my-agent --episodes 100
```

#### Gestión de Habilidades

```bash
# Listar Claude Skills
dev-agent skills list --type claude

# Listar Agent Skills
dev-agent skills list --type agent

# Activar habilidad
dev-agent skills activate spec-kit --type claude
dev-agent skills activate web-search --type agent
```

#### Optimización SEO

```bash
# Análisis SEO
dev-agent seo analyze https://example.com

# Generar Sitemap
dev-agent seo sitemap -u https://example.com https://example.com/about

# Generar Robots.txt
dev-agent seo robots
```

#### Optimización SEO con IA

```bash
# Investigación de palabras clave con IA
dev-agent ai-seo keywords "desarrollo web"

# Optimización de contenido
dev-agent ai-seo optimize "texto del contenido" -k "palabra clave1" "palabra clave2"

# Análisis de competidores
dev-agent ai-seo competitors example.com -c competitor1.com
```

#### GEO (Optimización de Motor Generativo)

```bash
# Análisis GEO (optimización de motor de búsqueda de IA)
dev-agent geo analyze https://example.com

# Generar esquema FAQ
dev-agent geo faq -q "Pregunta 1" "Pregunta 2"

# Generar esquema HowTo
dev-agent geo howto -n "Nombre de la guía" -s "Paso 1" "Paso 2"

# Generar esquema Article
dev-agent geo article -h "Título" -a "Autor" -u "https://example.com"

# Optimización de motor generativo
dev-agent geo optimize https://example.com -e chatgpt claude perplexity
```

#### Optimización Integral AIO

```bash
# Análisis integral
dev-agent aio analyze https://example.com

# Optimización automática
dev-agent aio optimize https://example.com

# Generar informe
dev-agent aio report -f markdown
```

#### Servidor FastAPI

```bash
# Instalar dependencias de FastAPI
dev-agent api:install

# Iniciar servidor
dev-agent api:start

# Modo de desarrollo (recarga automática)
dev-agent api:start --reload --port 8080
```

#### Gestión de Claves API

```bash
# Guardar clave API
dev-agent api-key set openai -k "sk-..."

# Listar claves API
dev-agent api-key list

# Estadísticas de uso
dev-agent api-key stats

# Eliminar clave API
dev-agent api-key delete openai
```

## Estructura del Proyecto

```
dev-agent-kit/
├── api/                      # Servidor backend FastAPI
│   ├── main.py              # Aplicación FastAPI
│   ├── requirements.txt     # Dependencias de Python
│   └── .env.example         # Ejemplo de variables de entorno
├── src/
│   ├── index.js              # Punto de entrada principal
│   ├── modules/
│   │   ├── spec-kit/         # Módulo Spec-kit
│   │   ├── todo/             # Módulo de gestión de tareas pendientes
│   │   ├── roles/            # Módulo de Rol de Agente
│   │   ├── api-key-manager/  # Módulo de optimización de token de clave API
│   │   ├── lightning/        # Módulo Agent Lightning
│   │   ├── claude-skills/    # Módulo Claude Skills
│   │   ├── agent-skills/     # Módulo Agent Skills
│   │   ├── seo/              # Módulo de optimización SEO
│   │   ├── ai-seo/           # Módulo de optimización SEO con IA
│   │   ├── geo/              # Módulo de optimización GEO
│   │   └── aio/              # Módulo de optimización integral AIO
│   ├── utils/                # Funciones de utilidad
│   └── config/               # Archivos de configuración
├── bin/
│   └── cli.js                # Punto de entrada CLI
├── scripts/                  # Scripts
│   ├── init-project.js       # Inicialización del proyecto
│   └── setup.js              # Script de configuración
├── docs/                     # Documentación
│   ├── USAGE.md              # Guía de uso
│   ├── ARCHITECTURE.md       # Documentación de arquitectura
│   ├── RECOMMENDED_PACKAGES.md # Paquetes recomendados
│   ├── INTEGRATION_GUIDE.md  # Guía de integración
│   └── SEO_GUIDE.md          # Guía SEO/SEO con IA/GEO/AIO
├── .spec-kit/                # Repositorio de documentos Spec-kit
├── .project-data/            # Datos del proyecto
│   ├── todos.json            # Datos de tareas pendientes
│   ├── role-config.json      # Configuración de roles
│   └── config.json           # Configuración del proyecto
├── .env.example              # Ejemplo de variables de entorno
├── .eslintrc.json            # Configuración ESLint
├── .prettierrc.json          # Configuración Prettier
├── vitest.config.js          # Configuración Vitest
└── package.json.recommended  # Ejemplo de paquete extendido
```

## Extensión e Integración

### Paquetes Recomendados

Paquetes recomendados que son útiles para agregar al proyecto:

- **Calidad de Código**: ESLint, Prettier, SonarJS
- **Pruebas**: Vitest, Playwright, Cypress
- **Documentación**: TypeDoc, JSDoc
- **Gestión de Dependencias**: npm-check-updates, Snyk
- **CI/CD**: GitHub Actions, Husky
- **Registro**: Winston, Debug
- **Seguridad**: Snyk, audit-ci

Para más detalles, consulte la [Documentación de Paquetes Recomendados](docs/RECOMMENDED_PACKAGES.md).

### Guía de Integración

Para métodos de integración con otras herramientas, consulte la [Guía de Integración](docs/INTEGRATION_GUIDE.md).

## Documentación

- [Guía de Uso](docs/USAGE.md) - Instrucciones detalladas de uso
- [Documentación de Arquitectura](docs/ARCHITECTURE.md) - Estructura y diseño del sistema
- [Paquetes Recomendados](docs/RECOMMENDED_PACKAGES.md) - Paquetes adicionales recomendados
- [Guía de Integración](docs/INTEGRATION_GUIDE.md) - Métodos de integración de herramientas
- [Guía SEO/SEO con IA/GEO/AIO](docs/SEO_GUIDE.md) - Guía de optimización web
- [Guía de Contribución](CONTRIBUTING.md) - Cómo contribuir al proyecto

## Ejemplo de Flujo de Trabajo de Desarrollo

```bash
# 1. Inicializar proyecto
dev-agent init

# 2. Establecer rol
dev-agent role set --role frontend

# 3. Crear documento de especificación inicial
dev-agent spec create "Resumen del Proyecto"

# 4. Agregar tareas
dev-agent todo add "Diseño de Componente" -p high -m "Fase 1"
dev-agent todo add "Integración de API" -p medium -m "Fase 1"

# 5. Activar habilidades
dev-agent skills activate code-reviewer --type claude
dev-agent skills activate git-operations --type agent

# 6. Verificar progreso
dev-agent todo list
dev-agent spec list
```

## Contribuir

Si desea contribuir al proyecto, consulte la [Guía de Contribución](CONTRIBUTING.md).

¡Se aceptan informes de errores, sugerencias de funciones y Pull Requests!

## Licencia

Licencia MIT

Copyright (c) 2025 Park chunghyo

Este es un proyecto de código abierto que cualquiera puede usar, modificar y distribuir libremente.

Para más detalles, consulte el archivo [LICENSE](LICENSE).

## Recursos de Referencia

### Recursos de Integración Principal

- [Spec-kit](https://github.com/github/spec-kit) - Gestión de documentos de especificación
- [Agent Lightning](https://github.com/microsoft/agent-lightning) - Aprendizaje por refuerzo de IA
- [Awesome Claude Skills](https://github.com/ComposioHQ/awesome-claude-skills) - Claude Skills
- [Agent Skills](https://github.com/agentskills/agentskills) - Framework de Agent Skills

### Herramientas Relacionadas

- [ESLint](https://eslint.org/) - Linting de código
- [Prettier](https://prettier.io/) - Formateo de código
- [Vitest](https://vitest.dev/) - Framework de pruebas
- [Husky](https://typicode.github.io/husky/) - Git hooks
- [standard-version](https://github.com/conventional-changelog/standard-version) - Gestión de versiones

## Autor

**Park chunghyo**

- GitHub: [@saewookkangboy](https://github.com/saewookkangboy)

## Estrella

Si este proyecto le fue útil, ¡dale una ⭐!

