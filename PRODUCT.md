# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js (React) para interfaces dinámicas y landing (según 01_Analisis_Propuesta_Zepol.md).

## Users

- **Clientes finales (B2B/B2C):** Solicitan cotizaciones de envases flexibles ingresando dimensiones y características en la Landing Page/Cotizador.
- **Equipo Zepol (Ventas y Producción):** Administran el inventario de materias primas (bobinas, tintas) y evalúan la viabilidad real de los pedidos.

## Product Purpose

Conectar el portal de ventas (Cotizador) con un sistema de gestión de inventario en tiempo real. El cotizador actúa como filtro, calculando costos precisos (conversión de área a peso mediante gramaje) y garantizando la viabilidad material antes de emitir proformas, eliminando compras de emergencia y sobrecostos.

## Positioning

Un cotizador inteligente e industrial específico para envases flexibles que impide vender lo que no está en stock, fusionando la experiencia de compra web con la estricta realidad de la planta de producción.

## Operating Context

Industria de envases flexibles. Las compras de materia prima se realizan por peso (Kg), pero la producción se planifica por área ($m^2$). La venta web sucede en tiempo real y debe validar contra un stock atómico.

## Capabilities and Constraints

- **Algoritmo de cálculo:** Convierte área requerida a peso (Kg) utilizando el gramaje del material base y añade porcentajes de merma operativa.
- **Validación estricta de stock:** La cotización no avanza si el "Peso Total en Kg" supera el "Stock Actual".
- **Inventario atómico:** Reservas de stock en base a cotizaciones aceptadas.
- **Backend completado:** Expone endpoints listos para CRUD de materiales, inventario, clientes y cotizaciones a través de Node.js + Prisma.

## Brand Commitments

- Marca: "Zepol" (y/o Dyxersoft como proveedor tecnológico).
- Tono: Industrial, profesional, preciso y transparente. 

## Evidence on Hand

- Documentación y reglas de negocio detalladas en `documentacion/01_Analisis_Propuesta_Zepol.md` y `02_Plan_Implementacion_RUP.md`.
- Endpoints transaccionales ya desarrollados en la carpeta `src/features`.

## Product Principles

1. **La realidad de la planta manda:** Ninguna venta puede ignorar el inventario físico.
2. **Cálculos transparentes:** El puente entre el área del diseño y el peso del material debe ser exacto.
3. **Reducción de fricción:** El cliente debe poder cotizar rápidamente, mientras Zepol protege sus márgenes operacionales.
