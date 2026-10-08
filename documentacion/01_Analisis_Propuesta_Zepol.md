# Propuesta de Solución ERP para Zepol: Cotizador Inteligente e Inventario en Tiempo Real

## 1. Resumen Ejecutivo y Diagnóstico
**El Problema:** Zepol sufre una desconexión crítica entre su área de ventas (cotizaciones web) y producción (inventario de materias primas). Los clientes aprueban proformas de productos para los cuales no hay material suficiente en almacén. Esto provoca compras de emergencia (sobrecostos), cancelación de pedidos y fricción interna.

**La Solución de Dyxersoft:** Un ERP personalizado desarrollado de manera modular. La Fase 1 (MVP) conectará el portal de ventas (Cotizador) con un sistema de gestión de inventario en tiempo real. El cotizador actuará como filtro, garantizando viabilidad material antes de emitir proformas.

## 2. Gestión y Medición de Materiales (Módulo "Recetario")
En la industria de envases flexibles, los proveedores facturan por **peso (Kg)**. Sin embargo, para fabricar se utiliza **área (m²)**. El puente es el **Gramaje (g/m²)**.

**Parámetros configurables por material base:**
- Costo por Kg.
- Gramaje (g/m²).
- Stock actual en Kg.
- Porcentaje de merma operativa.

## 3. Algoritmo de Cálculo (La Calculadora)
1. **Área del Envase:** Se calcula según las dimensiones solicitadas. (Ej. Ancho x Alto x 2 caras).
2. **Área Total Pedido:** (Área x Cantidad) + Merma.
3. **Conversión a Peso:** (Área Total x Gramaje) / 1000 = Peso Total en Kg.
4. **Validación:** Si Peso Total <= Stock Actual -> Aprobar. Sino -> Alertar.
5. **Costo de Pigmentos (Aproximación):** Área Total x Factor de Cobertura (10%, 50%, 100%) x Rendimiento de Tinta.

## 4. Diseño y Arquitectura (ERP Modular)
- **Base de Datos:** PostgreSQL (Transacciones ACID para RBAC e Inventario).
- **Backend:** Node.js (TypeScript) con Clean Architecture.
- **Frontend:** Next.js (React) para interfaces dinámicas y landing.
