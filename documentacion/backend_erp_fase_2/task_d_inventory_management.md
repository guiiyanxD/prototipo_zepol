# Tarea D: Gestión de Inventario (Transacciones)

## Estado: ✅ Completada

## Objetivos
1. Desarrollar un sistema de registro de Entradas y Salidas de material (Transacciones).
2. Vista `/admin/inventory` en frontend para visualizar el Kardex de los sustratos.
3. Asegurar que las cotizaciones aprobadas descuenten o reserven material de la base de datos de manera atómica.

## Registro de Trabajo Realizado
- *[Backend]*: Se comprobó que `RegisterTransactionUseCase` y `GetTransactionsByMaterialUseCase` están completamente funcionales. Exponen métodos en `InventoryController` y `InventoryRouter`. 
- *[Frontend]*: Se implementó la vista `/admin/inventory` que muestra una lista de materiales. Al hacer clic en un material, se muestra el Kardex (historial de transacciones de tipo IN, OUT, RESERVE, etc.). Se agregaron botones para registrar entradas y salidas manuales de material que descuentan y agregan stock transaccionalmente.

## Próximos Pasos
- Proceder con la Tarea E: Pipeline de Cotizaciones y Órdenes de Producción.
