# Tarea 4: Desarrollo del Cotizador Interactivo Web

## Objetivo
Proveer una herramienta fluida y "delightful" para que el usuario calcule y solicite la cotización de sus envases en tiempo real, interactuando con la API de Zepol.

## Flujo del Usuario (Step-by-Step UI)
Para evitar que el usuario vea un formulario aburrido y largo, se diseñará en formato *Wizard* o de pasos con transiciones suaves (Framer Motion slide-in/out).

*   **Paso 1: Tipo de Envase y Material**: Selección visual del material (base e impresión) mediante tarjetas seleccionables. (Consumiendo `GET /api/materials` para el listado disponible).
*   **Paso 2: Dimensiones y Cantidad**: Inputs numéricos (Ancho cm, Alto cm, Cantidad, Porcentaje de Cobertura de Tinta). Se incluirán tooltips explicativos para ayudar al usuario.
*   **Paso 3: Datos de Contacto**: Registro exprés del cliente (Nombre, Empresa, Email).
*   **Paso 4: Resultados (El "Aha! moment")**: 
    - Pantalla de carga con un skeleton animado simulando el cálculo.
    - Se envía el payload a `POST /api/quotes`.
    - Se muestra el precio estimado y detalles técnicos (Área calculada, Kg estimados) con un diseño de recibo limpio.
