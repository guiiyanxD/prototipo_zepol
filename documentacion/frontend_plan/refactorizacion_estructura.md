# Plan de Refactorización Estructural (Monorepo)

Para mantener la sanidad del proyecto y evitar colisiones entre el Frontend (Next.js) y el Backend (Node/Express/Prisma), es imperativo separar las responsabilidades a nivel de directorios.

## 1. Archivos que se MOVERÁN a la nueva carpeta `/backend/`
Estos archivos y carpetas pertenecen exclusivamente a la API y lógica de servidor, por lo que deben ser encapsulados:

*   `src/`: Contiene los controladores, rutas y casos de uso de Express (Materials, Inventory, Clients, Quotes).
*   `prisma/` y `prisma.config.ts`: Esquemas de base de datos y migraciones (Prisma ORM pertenece al backend).
*   `package.json` y `package-lock.json` (actuales en la raíz): Contienen las dependencias únicas del servidor (`express`, `@prisma/client`, etc.).
*   `tsconfig.json` (actual en la raíz): Es la configuración estricta de compilación para Node.js, diferente a la de Next.js.
*   `Dockerfile`: Las instrucciones de construcción actuales están diseñadas para levantar el servidor Node.
*   `dist/` y `node_modules/`: Artefactos autogenerados de compilación e instalación del backend. Se moverán para limpiar la raíz.

## 2. Archivos que se QUEDAN en la raíz (`/`)
Estos archivos son "Agnósticos" o "Globales". Actúan sobre todo el repositorio (Frontend + Backend), por lo que deben vivir en el nivel superior para orquestar ambos proyectos sin favorecer a ninguno:

*   `frontend/`: La carpeta de Next.js ya está encapsulada y aislada correctamente.
*   `documentacion/`: Centraliza el conocimiento, manuales y planes maestros de todo Zepol (aplica a full-stack).
*   `docker-compose.yml`: **(Fundamental en la raíz)** Este es el orquestador maestro. Desde la raíz, le dirá a Docker cómo levantar la base de datos PostgreSQL, el contenedor del `/backend` y el contenedor del `/frontend` simultáneamente en la misma red virtual.
*   `.env` y `.env.example`: Centralizar las variables de entorno en la raíz facilita la inyección segura de credenciales mediante `docker-compose`.
*   `.gitignore` y `.dockerignore`: Definen las reglas de exclusión globales para no subir basura al repositorio Git o a los contenedores.
*   `PRODUCT.md`: Archivo maestro generado por Impeccable que define la verdad absoluta del producto (usuarios, propósito, contexto) aplicable a toda la plataforma.
*   Carpetas Ocultas de Agentes (`.agents`, `.cursor`, `.claude`, `mcp.json`): Configuran el comportamiento, instrucciones y herramientas de la IA (como yo) para operar en todo el *workspace*.
