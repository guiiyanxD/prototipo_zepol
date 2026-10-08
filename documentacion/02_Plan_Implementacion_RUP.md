# Plan de Implementación: ERP Zepol (MVP)
**Metodología:** Proceso Unificado (Inicio, Elaboración, Construcción, Transición)
**Patrón de Arquitectura:** Clean Architecture (Feature-Sliced Design / Feature-Based)

## 1. Fase de Inicio (Inception) - [COMPLETADO]
* **Objetivo:** Entender el problema de negocio, definir alcance del MVP y establecer arquitectura base.
* Tareas realizadas: Análisis de negocio, propuesta algorítmica, decisión ERP vs SaaS, stack tecnológico.

## 2. Fase de Elaboración (Elaboration) - [ACTUAL]
* **Objetivo:** Mitigar riesgos técnicos, diseñar modelo de datos y setup arquitectónico.
* **Tarea 2.1:** Diseñar Diagrama Entidad-Relación (ERD) para el MVP.
* **Tarea 2.2:** Setup del proyecto Backend (Node/TS, Linter, Prettier).
* **Tarea 2.3:** Diseño de la Arquitectura Limpia por capas (Domain, Application, Infrastructure, Presentation) aplicando SOLID.

## 3. Fase de Construcción (Construction) - [PRÓXIMA]
* **Objetivo:** Desarrollo iterativo por features.
* **Tarea 3.1 - Feature Materials:** CRUD de materiales, gramajes, precios.
* **Tarea 3.2 - Feature Inventory:** Lógica de stock, entradas/salidas, reservas.
* **Tarea 3.3 - Feature Quotes:** Calculadora, validación stock, proformas.
* **Tarea 3.4 - Code Review:** Revisión estricta de cumplimiento SOLID al finalizar cada feature.

## 4. Fase de Transición (Transition) - [FUTURO]
* **Objetivo:** Pruebas unitarias de algoritmos (Domain layer) y despliegue.
