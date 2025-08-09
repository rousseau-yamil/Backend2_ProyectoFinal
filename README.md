PROYECTO MERN : Final de Backend 2
Es una WebApp de un simple e-commerce construida con el stack MERN. 

Esta aplicacion permite a los usuarios 
- **Registro y Login de usuarios** con encriptación de contraseñas (bcrypt).
- **Autenticación y autorización** mediante JWT almacenado en cookie firmada (`httpOnly`).
- **Protección de rutas** según roles (ej. admin / user).
- **Gestión de productos** (crear, listar, actualizar y eliminar).
- **Carrito de compras** con manejo de productos y cantidades.
- **Generación de tickets** al finalizar la compra (total calculado y carrito vaciado).
- Arquitectura basada en **DAO, Services, Repositories y Controllers**.
- **Validaciones y manejo de errores** personalizados.

PRODUCTOS
## 🛠️ Tecnologías usadas

### Backend
- [Node.js](https://nodejs.org/) + [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/) + [Mongoose](https://mongoosejs.com/)
- [bcrypt](https://www.npmjs.com/package/bcrypt) para hashing de contraseñas
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) para autenticación
- [Passport.js](http://www.passportjs.org/) para estrategias de autorización
- [cookie-parser](https://www.npmjs.com/package/cookie-parser) para manejo de cookies firmadas

## 📦 Instalación

1. **Clonar repositorio**
   ```bash
   git clone https://github.com/rousseau-yamil/Backend2_ProyectoFinal.git

2. **Instalar dependencias**
   npm install

3. **Iniciar**
   npm run start

   
🔑 **Endpoints principales (Backend)**

Auth
POST 127.0.0.1:8080/api/sessions/register → Registro de usuario 
  ejemplo BODY:Formato JSON 
          {"first_name":"Nombre","last_name":"Apellido","email":"test@client.com","password":"***","role":"user"}  (admin/user)

POST 127.0.0.1:8080/api/sessions/login → Login de usuario
ejemplo BODY:Formato JSON 
          {"email":"user@mail.com","password":"***"}

GET 127.0.0.1:8080/api/sessions/current/ → Perfil del usuario autenticado (DTO)

PUT 127.0.0.1:8080/api/sessions/profile/:uid → Modificacion de usuario (solo admin)
ejemplo BODY:Formato JSON 
          {"propiedad":"valor","role":"user"}

POST 127.0.0.1:8080/api/sessions/logout → Logout

++++++++++++++++++++++++++++++++++++++++++++

OPERACIONES CON PRODUCTS

GET /api/products → Listar productos

GET /api/products/:pid → Ver producto por ID

POST 127.0.0.1:8080/api/products/ → Crear producto (Admin)
ejemplo BODY:Formato JSON 
  {
    "title": "Mouse Gamer RGBcopia",
    "description": "Mouse óptico con iluminación RGB y 6 botones programables.",
    "code": "PRD001123123",
    "price": 29.99,
    "stock": 50,
    "category": "accesorios",
    "thumbnails": ["mouse1.jpg"]
  }

PUT 127.0.0.1:8080/api/products/:pid → Actualizar producto (Admin)
 ejemplo BODY:Formato JSON 
  {
    "stock": 52
  }

DELETE 127.0.0.1:8080/api/products/:pid → Eliminar producto (Admin)

++++++++++++++++++++++++++++++++++++++++++++++++++++

OPERACIONES DE USUARIOS CON SUS CARRITOS
Carrito
GET 127.0.0.1:8080/api/carts/:cid → Obtener carrito por ID

POST /api/carts/:cid/productos/:pid → Agregar producto al carrito
ejemplo BODY:Formato JSON
  {
    "quantity": 2
  }

DELETE /api/carts/:id/productos/:pid → Eliminar producto del carrito

POST /api/carts/:cid/checkout → Finalizar compra y generar ticket

+++++++++++++++++++++++++++++++++

📂 Estructura del proyecto

├── src/
 │    ├── configuracion/
 │    ├── controller/
 │    ├── dao/
 │    ├── data/
 │    ├── dto/
 │    ├── middleware/
 │    ├── public/
 │    ├── repository/
 │    ├── routes/
 │    ├── services/
 │    ├── utils/
 │    ├── views/
 │    └── app.js
 │    └── websocket.js
 ├── package.json

✨ Autor
Desarrollado por Rousseau Yamil.
