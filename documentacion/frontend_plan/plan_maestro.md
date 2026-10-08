# Plan Maestro Frontend - Zepol Envases Flexibles (Actualizado con Impeccable)

Este directorio contiene la planeación detallada para el desarrollo de la interfaz de usuario (Frontend) de Zepol. Ha sido **adaptado para dar máxima prioridad a la metodología Impeccable**, tomando como base el Concepto Aprobado #3 ("Technical Multi-column Dashboard") para fusionar la Landing Page y el Cotizador en una experiencia técnica, fluida e industrial de primer nivel.

## Lineamientos Generales (UI/UX Impeccable Pro)
1. **Identidad de Marca B2B (Zepol Navy)**: Todo el desarrollo visual debe regirse estrictamente por lo definido en el archivo [`DESIGN_SYSTEM.md`](./DESIGN_SYSTEM.md) y por el *Direction Contract* de Impeccable. Uso dominante del azul marino profundo, tipografía `Inter` y estética de consola de ingeniería.
2. **Animación Paramétrica y Dinamismo**: El cotizador no usará fotos estáticas. Integraremos `framer-motion` para re-dibujar y animar los vectores (SVG) de los envases de acuerdo a las dimensiones numéricas ingresadas por el cliente, logrando el efecto de "Blueprint / CAD en vivo".
3. **Flujo Impeccable (Spec -> Build -> Review)**: El código será auditado por el agente `impeccable-finish-reviewer` al finalizar, asegurando que se cumplan las métricas de alta fidelidad, contraste, performance y responsividad.

## Fases de Ejecución (Metodología Integrada)

A continuación se listan las tareas a ejecutar en orden de prioridad. 

*   **Fase 1: Setup Técnico y Dependencias Impeccable**
    *   *Acción*: Inicializar proyecto Next.js (TypeScript). Instalar `tailwindcss`, `framer-motion` (para las animaciones matemáticas en vivo), `lucide-react` (para iconografía técnica) y `clsx`/`tailwind-merge` (manejo de clases).
    *   *Acción*: Traducir el `DESIGN_SYSTEM.md` a variables CSS y configuración del `tailwind.config.ts`.
    *   *Estado*: Pendiente

*   **Fase 2: Preparación de Recursos (Plates y SVGs)**
    *   *Acción*: Preparar los recursos gráficos necesarios: extraer y optimizar el fondo oscuro industrial (plate) de la fábrica y generar los vectores base (SVG) paramétricos para los envases (Bolsa plana, Doypack).
    *   *Estado*: Pendiente

*   **Fase 3: Construcción del Dashboard Técnico Central (Fusiona Tareas 3 y 4 anteriores)**
    *   *Acción*: Construir el Hero interactivo a 3 columnas aprobado en el mockup:
        1. **Columna Izquierda:** Controles del cotizador (Inputs de dimensiones, gramaje, materiales).
        2. **Columna Central:** Canvas interactivo. Renderizado dinámico SVG animado por `framer-motion` simulando un plano CAD.
        3. **Columna Derecha:** Desglose en tiempo real de pesos (Kg), mermas, alertas de stock consumiendo la API de Node/Prisma, y Call to Action.
    *   *Estado*: Pendiente

*   **Fase 4: Finalización y Auditoría Impeccable (Review)**
    *   *Acción*: Invocar al subagente `impeccable-finish-reviewer` para auditar la interfaz terminada contra el mockup aprobado. Corrección de defectos tipográficos, de espaciado o accesibilidad (a11y) detectados en el pase.
    *   *Estado*: Completado

*   **Fase 4.5: Refactorización Estructural del Repositorio (Monorepo)**
    *   *Acción*: Aislar los archivos del servidor Node.js/Express moviéndolos a una nueva carpeta `/backend`. Mantener en la raíz exclusivamente los archivos globales (docker-compose, configs de IA, variables de entorno, documentación). El desglose detallado está en `documentacion/frontend_plan/refactorizacion_estructura.md`.
    *   *Estado*: Completado

*   **Fase 5: Panel Administrativo y Rutas Secundarias**
    *   *Acción*: Desarrollo de CRUDs internos (Backoffice) reutilizando los componentes técnicos base construidos en la Fase 3.
    *   *Estado*: Pendiente
