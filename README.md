# Actividad 8 - Proyecto t3_act8_eq17 (Iron Gym)

## Integrantes (Equipo 17)
- Carlos García
- Uriel Guzmán

## Información de Despliegue (VPS)
- **Dirección IP del Servidor:** `52.159.103.236`
- **Enlace al Proyecto Desplegado:** [http://52.159.103.236/t3_act8_eq17/](http://52.159.103.236/t3_act8_eq17/)

## APIs Consumidas
- **Autenticación (Fase 1):** `https://dummyjson.com/auth/login`
- **Tabla de Datos / CRUD (Fase 3):** `https://dummyjson.com/products`

---

## Funcionalidades Implementadas

### Fase 1: Login (Front-end puro)
- Formulario de autenticación con campos de usuario y contraseña siguiendo el mockup de Figma.
- Consumo del endpoint POST de DummyJSON.
- Manejo de estado (`useState`) para datos del usuario (incluyendo avatar de perfil).
- Mensajes de validación y alertas de error en credenciales incorrectas.

### Fase 2: Sistema Simulado (Sidebar + Navbar)
- Vista del sistema protegida condicionalmente por el estado de sesión.
- Navbar interactivo con nombre del usuario, foto de perfil y botón para cerrar sesión.
- Sidebar lateral con opciones de navegación.

### Fase 3: Tabla de Datos, Filtros, Paginación y CRUD
- **Filtros:** Búsqueda por texto y filtrado por categoría.
- **Paginación:** Controles de navegación de página y selector de cantidad de registros (10, 20, 40, 50) reflejados dinámicamente en los parámetros de la URL (`?page=X&limit=Y`).
- **Estados de carga y error:** Indicador visual durante peticiones y manejo claro de fallos de red.
- **Acciones CRUD:** Funcionalidad de agregar, editar y eliminar registros con diálogos de confirmación previa, ejecutando peticiones reales HTTP (POST, PUT, DELETE) y actualizando el estado local (`useState`).

### Fase 4: Despliegue en VPS
- Configuración de `base: '/t3_act8_eq17/'` en `vite.config.js`.
- Generación de build optimizado (`npm run build`).
- Transferencia de archivos estáticos vía SFTP a la ruta del servidor web.
- Configuración y puesta en marcha con Nginx en Ubuntu 22.04 LTS en Azure.
