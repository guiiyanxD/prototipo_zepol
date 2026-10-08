# Tareas Pendientes y Plan de Implementación - Zepol

Plan para construir los cimientos backend (CRUDs y base lógica) de forma robusta, y posteriormente priorizar la interfaz de usuario enfocada en ventas (Landing Page) sobre las vistas administrativas.

## 1. Completar CRUD de Materiales (Backend)
* **Grado de Complejidad**: Baja
* **Estado**: **[COMPLETADO]**
* **Plan**: Implementar los casos de uso faltantes (`GetMaterials`, `GetMaterialById`, `UpdateMaterial`), conectarlos a `MaterialController` y registrar sus endpoints.
* **Reporte de Implementación**: 
  - Se crearon los casos de uso faltantes: `GetMaterialsUseCase`, `GetMaterialByIdUseCase` y `UpdateMaterialUseCase`.
  - Se implementaron los métodos en `MaterialController` para listar todos los materiales, obtener uno por ID y actualizar.
  - Se registraron los endpoints (`GET /`, `GET /:id`, `PUT /:id`) en `MaterialRouter.ts`.
  - Se conectó exitosamente la inyección de dependencias en el router y se montó en `main.ts` bajo `/api/materials`.

## 2. Módulo de Inventario y Movimientos
* **Grado de Complejidad**: Media
* **Estado**: **[COMPLETADO]**
* **Plan**: 
  1. Crear el módulo `inventory` con DDD.
  2. Implementar `InventoryTransaction` y sus casos de uso.
  3. Validar que la creación de `InventoryTransaction` modifique atómicamente el `stockKg` del material correspondiente usando transacciones de Prisma, previniendo stocks negativos.
* **Reporte de Implementación**:
  - **Dominio**: Se implementó la entidad `InventoryTransaction` con los tipos de movimiento (`IN`, `OUT`, `RESERVE`, `COMMIT`, `CANCEL`). Se estableció la regla estricta de requerir un `referenceQuoteId` para reservas y confirmaciones.
  - **Caso de Uso**: Se desarrolló `RegisterTransactionUseCase`, asegurando que antes de realizar un retiro (`OUT` o `RESERVE`), el sistema consulte el stock real del material y aborte arrojando error si los kilogramos requeridos superan los disponibles.
  - **Transacciones Atómicas**: Se codificó la persistencia en `InventoryPrismaRepository` utilizando `prisma.$transaction`. Guardar un historial de movimiento modifica matemática y automáticamente (`increment` o `decrement`) el `stockKg` del material. Si alguna tabla falla, toda la transacción se revierte.
  - **API**: Se completaron e integraron `InventoryController` e `InventoryRouter` exponiendo `POST /api/inventory/` y `GET /api/inventory/:materialId`. Compilado exitosamente.

## 3. Módulo de Clientes (Clients)
* **Grado de Complejidad**: Baja
* **Estado**: **[COMPLETADO]**
* **Plan**: 
  1. Crear la estructura DDD en `features/clients`.
  2. Implementar los endpoints básicos de creación, lectura y actualización de clientes.
* **Reporte de Implementación**:
  - **Dominio**: Se creó la entidad `Client` y la interfaz `ClientRepository`. La entidad contiene la lógica de validación (email válido y nombre de contacto obligatorio).
  - **Casos de Uso**: Se desarrollaron los casos de uso para las operaciones CRUD: `CreateClientUseCase`, `GetClientsUseCase`, `GetClientByIdUseCase` y `UpdateClientUseCase`. Los casos de uso de creación y actualización incluyen la validación de unicidad de email.
  - **Infraestructura**: Se implementó `ClientPrismaRepository` para conectar con la base de datos de PostgreSQL usando Prisma, mapeando el modelo de base de datos directamente al modelo de dominio.
  - **API**: Se crearon `ClientController` y `ClientRouter` con inyección de dependencias. Se expusieron los endpoints `POST /api/clients`, `GET /api/clients`, `GET /api/clients/:id` y `PUT /api/clients/:id`, montándolos en `main.ts`. El proyecto compiló exitosamente sin errores.

## 4. Módulo de Cotizaciones (Quotes)
* **Grado de Complejidad**: Alta
* **Estado**: **[COMPLETADO]**
* **Plan**:
  1. Construir la estructura DDD en `features/quotes`.
  2. Desarrollar `QuoteCalculationService` para abstraer la matemática pura (áreas, gramajes, consumo de tintas, mermas).
  3. Implementar la API transaccional para guardar una cotización con todos sus items de forma íntegra.
* **Reporte de Implementación**:
  - **Servicio Matemático (Domain)**: Se creó `QuoteCalculationService` encapsulando la lógica pesada. Este servicio toma las medidas (ancho, alto), calcula el área en $m^2$, determina los kilogramos requeridos de material base y tinta considerando el **gramaje** y los márgenes de **desperdicio (merma)**, y finalmente calcula el precio.
  - **Caso de Uso**: Se desarrolló `CreateQuoteUseCase` el cual recibe los datos de la interfaz, valida que el cliente y los materiales existan, itera sobre cada item para inyectarlo en el motor matemático, y totaliza la cotización (`calculateTotal`).
  - **Transaccionalidad (Infra)**: En `QuotePrismaRepository`, se utilizó un `prisma.$transaction` para guardar primero la tabla cabecera `Quote` y en cadena (usando `createMany`) todos sus `QuoteItem`.
  - **API**: Se expuso exitosamente a través de `QuoteController` bajo la ruta `/api/quotes`. El código compiló perfectamente.

## 5. Fase Frontend (Interfaces de Usuario)
* **Estado**: Pendiente
* **Plan**: 
  * **5.1. Landing Page y Cotizador Web (Prioridad 1)**: Construir primero la interfaz enfocada al usuario final. Debe poder calcular cotizaciones en tiempo real consumiendo los endpoints construidos en los puntos previos.
  * **5.2. Panel Administrativo (CRUDs)**: Construir interfaces para gestionar materiales, inventario y ver cotizaciones de los clientes.
