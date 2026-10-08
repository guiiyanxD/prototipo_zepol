# Fase 2: Consola Administrativa ERP Zepol - Plan Maestro

Este documento detalla el análisis UI/UX y la hoja de ruta estructurada para la construcción de la interfaz administrativa (ERP) y la consolidación de sus respectivos CRUDs bajo los principios de Clean Architecture.

## 1. Análisis UI/UX para el ERP (Backend UI)

Las interfaces de sistemas de gestión empresarial (ERP) requieren un enfoque distinto al de una Landing Page (marketing). Basándonos en las mejores convenciones de diseño de software B2B:

- **Funcionalidad sobre Estética Pura**: La densidad de información es vital. Reduciremos los márgenes gigantes y las tipografías excesivamente grandes para poder mostrar tablas de datos, filtros y formularios de manera eficiente sin requerir scroll excesivo.
- **Identidad Visual "Soft UI" Discreta**: Mantendremos la paleta de colores de la Landing Page (Azul Zepol, Cian de acento, fondos gris/azul claros `bg-slate-50`), esquinas redondeadas (`rounded-xl` en lugar de `rounded-3xl` para optimizar espacio), pero sin sombras pesadas (usaremos `shadow-sm` o bordes sutiles `border-slate-200`).
- **Animaciones Mínimas**: Se eliminarán por completo las animaciones de carga pesada, desplazamientos parallax o rotaciones 3D. Las únicas animaciones permitidas serán transiciones sutiles (ej. `transition-colors` de 150ms al hacer hover en botones o filas de tablas) para no afectar la percepción de "rapidez" que un usuario interno exige de su herramienta de trabajo.
- **Layout de Navegación**: El estándar de facto para ERPs es un menú lateral (Sidebar) oscuro o gris colapsable, y una barra superior (Topbar) blanca/clara para el perfil de usuario y notificaciones. Esto permite escalar el número de módulos (Cotizaciones, Materiales, Clientes, Inventario) infinitamente.

## 2. Hoja de Ruta de Desarrollo y Tareas

A continuación se listan las tareas para completar la Fase 2. Cada tarea tendrá su propio sub-documento técnico de seguimiento donde se registrarán los avances.

### [Tarea A] Configuración del Layout Administrativo Base
- **Objetivo**: Crear el envoltorio visual (`app/admin/layout.tsx`), implementando el Sidebar estático/colapsable y el Topbar, respetando la convención UI/UX definida.
- **Documento**: `task_a_admin_layout.md`

### [Tarea B] CRUD de Materiales (Sustratos)
- **Objetivo**: Finalizar la Clean Architecture en el backend (asegurar que exista crear, leer, actualizar y borrar/desactivar). Crear la vista `/admin/materials` en el frontend con una tabla de datos interactiva para gestionar los sustratos.
- **Documento**: `task_b_materials_crud.md`

### [Tarea C] CRUD de Clientes (Directorio B2B)
- **Objetivo**: Desarrollar la gestión de clientes en el backend y frontend (`/admin/clients`). Mostrar historial de cotizaciones vinculadas por cliente.
- **Documento**: `task_c_clients_crud.md`

### [Tarea D] Gestión de Inventario (Transacciones)
- **Objetivo**: Completar el registro de entradas y salidas de stock (`/admin/inventory`). Vital para descontar material cuando se procesan las proformas.
- **Documento**: `task_d_inventory_management.md`

### [Tarea E] Panel de Cotizaciones (Pipeline)
- **Objetivo**: Vista `/admin/quotes` en formato lista o Kanban. Visualización detallada de la proforma.
- **Documento**: `task_e_quotes_pipeline.md`

## 3. Principios de Arquitectura Mantenidos
- **Frontend**: Next.js App Router (Client & Server Components delimitados).
- **Backend (API)**: Mantener `Feature-Sliced Design` + Clean Architecture (Controller -> UseCase -> Repository -> Prisma).

## User Review Required
> [!IMPORTANT]
> Revisa la estructura propuesta para la interfaz del ERP y el alcance de los CRUDs. ¿Estás de acuerdo con el esquema de colores, reducción de animaciones y distribución de las tareas? Si apruebas este plan maestro, procederé a crear los documentos por tarea y a iniciar con la [Tarea A].
