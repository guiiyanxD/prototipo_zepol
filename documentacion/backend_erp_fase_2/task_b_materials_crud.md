# Tarea B: CRUD de Materiales (Sustratos)

## Estado: ✅ Completada

## Objetivos
1. Validar y completar los endpoints de la API de Materiales (`GET`, `POST`, `PUT`, `DELETE`).
2. Desarrollar la vista Frontend (`/admin/materials`) con un DataGrid (Tabla interactiva).
3. Implementar formularios "Soft UI" para creación y edición de sustratos, gramajes, y costos por Kg.

## Registro de Trabajo Realizado
- *[Backend]*: Se implementó `DeleteMaterialUseCase` y se expuso a través del controlador y las rutas. Se actualizó la interfaz de `MaterialRepository` y `MaterialPrismaRepository` para soportar la eliminación.
- *[Frontend]*: Se creó la página `/admin/materials` usando un diseño "Soft UI". Se incorporó una tabla de datos interactiva, modales para el formulario de creación/edición de materiales utilizando peticiones HTTP nativas a los endpoints correspondientes de la API local en `http://localhost:4000/api/materials`.
- Se validaron todos los tipos y se generaron los builds exitosamente.

## Próximos Pasos
- Proceder con la Tarea C: CRUD de Directorio B2B (Clientes).
