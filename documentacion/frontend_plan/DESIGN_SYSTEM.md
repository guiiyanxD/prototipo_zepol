# Zepol Design System (UI/UX Pro Max)

Este documento centraliza los tokens de diseño y principios UI/UX para construir el frontend de Zepol, garantizando una imagen corporativa seria, sobria y moderna. Las bases fueron generadas mediante la herramienta Stitch.

## 1. Principios de Diseño
- **Sobriedad y Confianza**: Zepol es una industria B2B de manufactura (ISO 9001, FDA). El diseño debe transmitir confianza absoluta, higiene industrial y precisión.
- **Microanimaciones (UI/UX Pro Max)**: Las interfaces no deben ser estáticas, pero tampoco abrumadoras. Usar transiciones fluidas de 200-300ms (Framer Motion) en hovers, aperturas de modales y scroll reveals.
- **Espacios que Respiran (Whitespace)**: Priorizar el uso generoso de márgenes (padding/margin) para evitar que la pantalla se vea saturada.

## 2. Paleta de Colores (Light Mode)
A partir de la identidad original, se ha filtrado la paleta para lograr madurez:
- **Primary Color**: `#1E3A8A` (Azul corporativo profundo). Transmite solidez, confianza y experiencia.
- **Secondary Color**: `#0F172A` (Azul pizarra ultra oscuro). Se usará para textos principales, titulares y contrastes pesados.
- **Tertiary / Accent**: `#0891B2` (Cian moderno). Para resaltar botones secundarios, tooltips o íconos, dándole un toque tecnológico/moderno sin perder la seriedad.
- **Neutral / Background**: `#F1F5F9` (Gris/Azul muy claro). Para los fondos de la aplicación, evitando el blanco puro para reducir fatiga visual. Blancos puros (`#FFFFFF`) se reservarán exclusivamente para las Tarjetas (Cards).

## 3. Paleta de Colores (Dark Mode - *Opcional/Planificado*)
Si se implementa un modo oscuro, la paleta debe invertirse armónicamente:
- **Background**: `#0F172A` (Secondary Light se vuelve el fondo).
- **Surface (Cards)**: `#1E293B` (Gris pizarra oscuro).
- **Primary Color**: `#3B82F6` (Un azul más brillante para asegurar legibilidad).
- **Text**: `#F8FAFC` (Blanco con tinte azulado).

## 4. Tipografía (Google Fonts)
- **Familia Principal**: `Inter` (Sans-Serif).
- **Titulares (H1, H2, H3)**: Font-weight `700` (Bold) o `800` (ExtraBold). Tracking (letter-spacing) ajustado a `-0.02em` para darle un look más profesional y compacto.
- **Cuerpo de Texto (Body)**: Font-weight `400` (Regular) o `500` (Medium). Line-height de `1.6` para facilitar la lectura.

## 5. Formas y Bordes (Roundness)
- **Roundness**: `ROUND_FOUR` (Equivalente a `rounded-lg` en Tailwind: `0.5rem` / `8px`).
- **Justificación**: Bordes ligeramente redondeados modernizan la interfaz haciéndola amigable, pero sin llegar a ser "juguetona" (como bordes full-rounded), manteniendo el tono industrial/B2B.

## 6. Elevación y Sombras (Shadows)
- Sombras muy difuminadas y suaves (ej. `box-shadow: 0 10px 25px -5px rgba(15, 23, 42, 0.05);`). Nunca usar sombras duras o completamente negras.
