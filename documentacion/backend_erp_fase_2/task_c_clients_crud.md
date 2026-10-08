# Tarea C: CRUD de Clientes (Directorio B2B)

## Estado: ✅ Completada

## Objetivos
1. Consolidar el backend de Clientes (Clean Architecture).
2. Crear la vista `/admin/clients` (Listado y Búsqueda).
3. Mostrar el historial de cotizaciones asociadas a cada cliente en su perfil de detalle.

## Registro de Trabajo Realizado
- *[Backend]*: Se agregaron capacidades de eliminación de clientes en `ClientRepository`, `ClientPrismaRepository`, `DeleteClientUseCase`, `ClientController` y `ClientRouter`.
- *[Frontend]*: Se implementó la vista `/admin/clients` con un DataGrid interactivo y "Soft UI".
- Se diseñó un layout a dos columnas: 2/3 para la tabla de clientes (con CRUD), 1/3 para el historial de cotizaciones. Al seleccionar un cliente de la tabla, se filtran las cotizaciones cargadas globalmente para mostrar solo las relacionadas con el `clientId` seleccionado.

## Próximos Pasos
- Proceder con la Tarea D: Trazabilidad y Control de Inventario (Órdenes de Producción).


## Correcciones de Errores (Bug Fixes)
- **Historial de Cotizaciones:** Se resolvi� un error en \src/app/admin/clients/page.tsx (246:36)\ que ocurr�a al ver el historial del cliente. La interfaz \Quote\ en el frontend estaba desactualizada respecto a lo que retorna la API (\QuoteDetailsDTO\), ya que esperaba \	otalKg\ y \inalPrice\ en lugar de \itemsCount\ y \	otalPrice\. Se actualiz� la interfaz y el renderizado JSX para solucionar este TypeError.
