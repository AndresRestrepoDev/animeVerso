# 🌌 animeVerso

**animeVerso** es una aplicación web construida con HTML, CSS y JavaScript puro que permite a los usuarios registrar, visualizar, calificar y editar sagas de anime. La información se gestiona usando una API REST simulada con [JSON Server](https://github.com/typicode/json-server), permitiendo operaciones CRUD (Crear, Leer, Actualizar, Eliminar).

---

## 🚀 Funcionalidades

- ✅ Ver listado de sagas de anime con imagen, nombre, comentario y calificación.
- ✅ Agregar nuevas sagas.
- ✅ Editar información de una saga existente.
- ✅ Eliminar una saga.
- ✅ Validación de datos.
- ✅ Subida automática del formulario al hacer clic en “Editar”.
- ✅ Persistencia de datos con JSON Server.

---

## 📁 Estructura del Proyecto

```
animeVerso/
├── db.json                 # Base de datos simulada (JSON Server)
├── gestion_api.js         # Archivo para pruebas de API desde Node.js
├── index.html             # Página principal
├── README.md              # Este archivo
├── CSS/
│   └── style.css          # Estilos de la app
└── JS/
    └── script.js          # Lógica DOM + conexión con la API
```

---

## 🔧 Tecnologías Utilizadas

- HTML5
- CSS3
- JavaScript
- [JSON Server](https://www.npmjs.com/package/json-server)

---

## 🧪 Archivo de pruebas: `gestion_api.js`

El archivo `gestion_api.js` contiene ejemplos prácticos de cómo usar los métodos HTTP (`GET`, `POST`, `PUT`, `DELETE`) utilizando `fetch()` desde Node.js para interactuar con la API simulada. Sirve como entorno de pruebas para probar funcionalidades de forma rápida antes de integrarlas a la interfaz web.

### ▶️ Cómo usarlo

1. Inicia JSON Server:

```bash
json-server --watch db.json
```

2. Luego ejecuta el archivo con Node.js:

```bash
node gestion_api.js
```

---

## 📦 Instalación y ejecución

1. Clona el repositorio o descarga los archivos.
git clone https://github.com/AndresRestrepoDev/animeVerso.git

2. Instala JSON Server si no lo tienes:

```bash
npm install -g json-server
```

3. En la raíz del proyecto, corre el servidor:

```bash
json-server --watch db.json
```

4. Abre `index.html` con Live Server o directamente en el navegador.
5. Disfruta 🎉

---

## ✍️ Autor

- 💻 Desarrollado por **Andres Felipe Restrepo Ramirez**

---

## 📌 Nota

Este proyecto es 100% educativo y tiene como propósito aprender sobre APIs REST, `fetch`, DOM y simulación de backend con JSON Server.

---