# Full Stack JavaScript Developer Async Test Mid

**Lexart ® 2024**

## Ingeniería de software

### Objetivo

Desarrollar una aplicación web para gestionar productos (teléfonos celulares) utilizando Node.js para el backend y React para el frontend. El backend debe proporcionar servicios externos que permitan a los clientes consumir la lista de productos e insertar nuevos productos.

### Requisitos

#### Backend (Node.js en funciones Vercel):

- ✔Crear una API RESTful para operaciones CRUD (Create, Read, Update, Delete) de productos.
- ✔Utilizar Express.js para el enrutamiento.
- ✔Utilizar Sequelize para interactuar con la base de datos.
- ✔Utilizar el Postgres de Vercel como base de datos.
- ✔Exponer una ruta exclusiva para permitir que clientes externos de la aplicación consuman los productos; estas rutas deben utilizar algún tipo de autorización.
- ✔Exponer una ruta exclusiva para permitir que clientes externos de la aplicación inserten productos; estas rutas deben utilizar algún tipo de autorización.
- ✔Exponer servicios externos utilizando Swagger.
- Crear un procedimiento que permita la eliminación de todos los productos en segundo plano.
- Crear un procedimiento que permita cargar 50 productos de prueba.

#### Frontend (React en Vercel):

- ✔Crear un formulario para registro e inicio de sesión.
- ✔Crear una interfaz de usuario para mostrar los productos y permitir que el usuario realice operaciones CRUD disponibles solo para usuarios que hayan iniciado sesión.
- ✔Implementar rutas para navegar entre las diferentes vistas (lista de productos, agregar producto, editar producto, registros).
- ✔Utilizar servicios para consumir la API RESTful creada en el backend.
- Al hacer clic en "Cargar productos de prueba" debe añadir 50 productos.
- Al hacer clic en "Eliminar todos los productos", ejecutar el procedimiento de eliminación y mostrar una barra de progreso del 0 al 100% que se actualice en tiempo real.
- ✔Mostrar una lista de los productos eliminados en una pantalla llamada registros dentro del sitio.

### Requerido

- ✔La aplicación debe tener una página para inicio de sesión y registro. (Proveer un usuario de prueba).
- ✔La aplicación debe tener una página principal donde todos los productos disponibles y sus detalles sean mostrados; el acceso a esta página es posible solo con el inicio de sesión del usuario.
- ✔Debe ser posible añadir nuevos productos.
- ✔Debe ser posible editar los productos existentes.
- ✔Debe ser posible eliminar productos.
- Añadir funcionalidades de búsqueda y filtrado de productos.
- ✔Debe ser posible listar los productos de las APIs externas.
- Debe tener un botón para poder cargar 50 productos.
- Debe tener un botón para poder eliminar todos los productos del sitio.
- Debe tener una barra de progreso mostrando el estado de la eliminación del 0 al 100%.
- ✔Debe tener una pantalla llamada registros donde se puedan ver los productos que fueron eliminados.

### Entrega

- Enviar el repositorio y el enlace de la solución a: contacto@lexartlabs.xyz con el asunto: "Nombre del candidato - Test FullStack - Software".
- Hacer el despliegue de la aplicación en Vercel.
