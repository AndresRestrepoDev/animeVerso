// URL base de la API (JSON Server)
const API_URL = "http://localhost:3000/sagas";

// Referencia al contenedor donde se mostrarán las tarjetas de sagas
const contenedor = document.getElementById("sagas-container");

// ==============================
// Función: mostrarSaga
// Crea y muestra una tarjeta con los datos de una saga
// ==============================
function mostrarSaga(saga) {
  // Crear el elemento contenedor (tarjeta)
  const card = document.createElement("div");
  card.classList.add("saga-card"); // Clase para estilos

  // Contenido HTML de la tarjeta
  card.innerHTML = `
    <img src="${saga.imagen}" alt="${saga.nombre}" width="200">
    <h3>${saga.nombre}</h3>
    <p><strong>Comentario:</strong> ${saga.comentario}</p>
    <p><strong>Calificación:</strong> ${saga.calificacion} ⭐</p>
    <button class="btn-eliminar">🗑️ Eliminar</button>
    <button class="btn-editar">✏️ Editar</button>
  `;

  // Agregar tarjeta al contenedor principal
  contenedor.appendChild(card);

  // =====================================
  // Evento: Eliminar saga al hacer clic
  // =====================================
  card.querySelector(".btn-eliminar").addEventListener("click", () => {
    const confirmar = confirm(`¿Estás seguro de eliminar "${saga.nombre}"?`);
    if (!confirmar) return;

    // Realizar solicitud DELETE a la API
    fetch(`${API_URL}/${saga.id}`, {
      method: "DELETE"
    })
      .then(() => {
        alert("✅ Saga eliminada correctamente");
        card.remove(); // Quitar del DOM visualmente
      })
      .catch(error => {
        console.error("❌ Error al eliminar saga:", error);
      });
  });

  // =====================================
  // Evento: Editar saga al hacer clic
  // =====================================
  card.querySelector(".btn-editar").addEventListener("click", () => {
    // Cargar los valores actuales en el formulario
    document.getElementById("nombre").value = saga.nombre;
    document.getElementById("imagen").value = saga.imagen;
    document.getElementById("comentario").value = saga.comentario;
    document.getElementById("calificacion").value = saga.calificacion;

    // Guardar ID en el formulario (para saber que es una edición)
    form.dataset.editando = saga.id;

    // Cambiar texto del botón
    form.querySelector("button[type='submit']").textContent = "Actualizar Saga";

    // Scroll hacia el formulario (mejora de UX)
    form.scrollIntoView({ behavior: "smooth" });
  });
}

// ==============================
// Cargar sagas existentes al iniciar
// ==============================
fetch(API_URL)
  .then(res => {
    if (!res.ok) throw new Error("No se pudo cargar la información");
    return res.json();
  })
  .then(data => {
    console.log("📦 Sagas cargadas:", data);
    data.forEach(saga => mostrarSaga(saga)); // Mostrar cada saga
  })
  .catch(err => console.error("❌ Error al cargar sagas:", err));

// ==============================
// Manejo del formulario
// ==============================

// Referencia al formulario
const form = document.getElementById("sagaForm");

// Evento al enviar el formulario
form.addEventListener("submit", function (e) {
  e.preventDefault(); // Prevenir recarga de página

  // Obtener datos del formulario
  const nombre = document.getElementById("nombre").value.trim();
  const imagen = document.getElementById("imagen").value.trim();
  const comentario = document.getElementById("comentario").value.trim();
  const calificacion = parseFloat(document.getElementById("calificacion").value);

  // Validación de campos
  if (!nombre || !imagen || !comentario || isNaN(calificacion) || calificacion < 1 || calificacion > 10) {
    alert("⚠️ Por favor completa todos los campos correctamente.");
    return;
  }

  // Crear objeto saga
  const saga = { nombre, imagen, comentario, calificacion };

  // Verificar si es una edición
  const idEditando = form.dataset.editando;

  if (idEditando) {
    // ========================
    // Actualizar saga existente
    // ========================
    fetch(`${API_URL}/${idEditando}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...saga, id: Number(idEditando) })
    })
      .then(res => res.json())
      .then(data => {
        alert("✅ Saga actualizada correctamente");
        location.reload(); // Recargar para reflejar cambios
      })
      .catch(err => console.error("❌ Error al editar saga:", err));
  } else {
    // ========================
    // Agregar nueva saga
    // ========================
    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(saga)
    })
      .then(res => res.json())
      .then(data => {
        mostrarSaga(data); // Mostrar nueva saga
        form.reset(); // Limpiar formulario
      })
      .catch(err => console.error("❌ Error al agregar saga:", err));
  }

  // Resetear el formulario (modo normal)
  form.reset();
  delete form.dataset.editando;
  form.querySelector("button[type='submit']").textContent = "Agregar Saga";
});
