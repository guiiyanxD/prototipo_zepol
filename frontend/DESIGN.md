# Zepol Design System

<!-- impeccable:design-schema 1 -->

## World
**Technical Multi-column (B2B Industrial Console)**
La interfaz de Zepol rechaza las plantillas SaaS genéricas en favor de una estética de ingeniería robusta, precisa y de manufactura. El diseño emula un "dashboard de máquina industrial" (HMI) o consola técnica, diseñado para infundir confianza absoluta, precisión numérica y conexión directa con el inventario real de la planta.

## Palette
- **Zepol Navy (Primary Background):** `#0F172A` (Usado en fondos industriales para reducir la fatiga y aumentar el contraste de los datos).
- **Zepol Surface:** `#1E293B` (Paneles translúcidos o sólidos para agrupar controles).
- **Zepol Accent:** `#0891B2` (Cian moderno para acciones principales, cotas matemáticas y estados activos).
- **Zepol Text Primary:** `#F8FAFC` (Blanco con tinte azulado para máxima legibilidad).
- **Zepol Text Secondary:** `#94A3B8` (Gris pizarra para etiquetas y unidades).
- **Alerts / States:**
  - Success/In Stock: `#4ADE80` (Verde).
  - Error/Out of Stock: `#F87171` (Rojo).

## Typography
- **Global Sans:** `Inter` (Sans-serif limpia, legible y neutra).
- **Data/Math:** Fuentes monoespaciadas (`font-mono`) estandarizadas para todos los valores numéricos, cotas de SVG y salidas de peso/precio, reforzando la precisión de ingeniería.
- **Hierarchy:** Titulares en mayúsculas pequeñas y espaciado (tracking) amplio para etiquetas de control (`text-xs uppercase tracking-widest`).

## Layout & Topology
- **Estructura Base:** Diseños divididos por paneles con bordes sutiles (`border-slate-700`).
- **Densidad:** Alta densidad de información controlada. El uso de rejillas (grids) de 12 columnas permite alinear controles a la izquierda, visualización técnica en el centro y resultados a la derecha.

## Components
- **Inputs de Rango (Sliders):** Controles deslizantes precisos acentuados en Cian para ajustes dimensionales.
- **Visualizador CAD/Blueprint:** Contenedor oscuro simulando un plano técnico (grilla de fondo sutil) donde los elementos SVG paramétricos reaccionan matemáticamente a los inputs.
- **Cards de Resultado:** Paneles de alto contraste con iconos técnicos (`lucide-react`) y números grandes para los entregables de producción (Masa, Costo).

## Interaction & Motion
- **Animaciones Paramétricas:** Transiciones tipo `spring` (framer-motion) exclusivas para reflejar cambios físicos en las dimensiones del envase (SVG), nunca para decoraciones superficiales.
- **Estados Cero:** Si no hay medidas, el visualizador CAD muestra un wireframe base esperando configuración.

## Imagery & Assets
- **Fotografía:** Se permite el uso de fondos de fábrica fotográficos fuertemente oscurecidos o en modo mezcla (`blend-mode`) para mantener el foco en la UI.
- **Iconografía:** Técnica y utilitaria (reglas, balanzas, cajas, engranajes) a través de la librería Lucide. Cero ilustraciones abstractas.
