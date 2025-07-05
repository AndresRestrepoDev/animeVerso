const API_URL = "http://localhost:3000/sagas";
const contenedor = document.getElementById("sagas-container");
const form = document.getElementById("sagaForm");

// ===============================
// Mostrar tarjetas
// ===============================
function mostrarSaga(saga) {
  const card = document.createElement("div");
  card.classList.add("saga-card");

  card.innerHTML = `
    <img src="${saga.imagen}" alt="${saga.nombre}" width="200">
    <h3>${saga.nombre}</h3>
    <p><strong>Comentario:</strong> ${saga.comentario}</p>
    <p><strong>Calificación:</strong> ${saga.calificacion} ⭐</p>
    <button class="btn-eliminar">🗑️ Eliminar</button>
    <button class="btn-editar">✏️ Editar</button>
  `;

  contenedor.appendChild(card);

  // Botón eliminar
  card.querySelector(".btn-eliminar").addEventListener("click", () => {
    if (!confirm(`¿Eliminar "${saga.nombre}"?`)) return;

    fetch(`${API_URL}/${saga.id}`, { method: "DELETE" })
      .then(() => {
        alert("✅ Eliminado correctamente");
        card.remove();
      })
      .catch(err => console.error("❌ Error al eliminar:", err));
  });

  // Botón editar
  card.querySelector(".btn-editar").addEventListener("click", () => {
    document.getElementById("nombre").value = saga.nombre;
    document.getElementById("imagen").value = saga.imagen;
    document.getElementById("comentario").value = saga.comentario;
    document.getElementById("calificacion").value = saga.calificacion;

    document.getElementById("sagaForm").scrollIntoView({ behavior: "smooth" });

    form.dataset.editando = saga.id;
    form.querySelector("button[type='submit']").textContent = "Actualizar Saga";
  });
}

// ===============================
// Cargar todas las sagas
// ===============================
function cargarSagas() {
  contenedor.innerHTML = ""; // Limpiar antes de volver a pintar
  fetch(API_URL)
    .then(res => res.json())
    .then(data => {
      data.forEach(mostrarSaga);
    })
    .catch(err => console.error("❌ Error al cargar sagas:", err));
}

cargarSagas();

// ===============================
// Manejar formulario (Agregar / Editar)
// ===============================
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const imagen = document.getElementById("imagen").value.trim();
  const comentario = document.getElementById("comentario").value.trim();
  const calificacion = parseFloat(document.getElementById("calificacion").value);

  if (!nombre || !imagen || !comentario || isNaN(calificacion) || calificacion < 1 || calificacion > 10) {
    alert("⚠️ Por favor completa todos los campos correctamente.");
    return;
  }

  const saga = { nombre, imagen, comentario, calificacion };
  const idEditando = form.dataset.editando;

  if (idEditando) {
    // PUT (editar)
    fetch(`${API_URL}/${idEditando}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...saga, id: Number(idEditando) })
    })
      .then(res => res.json())
      .then(() => {
        alert("✅ Saga actualizada");
        delete form.dataset.editando;
        form.querySelector("button[type='submit']").textContent = "Agregar Saga";
        form.reset();
        cargarSagas(); // Refrescar
      })
      .catch(err => console.error("❌ Error al editar:", err));
  } else {
    // POST (agregar)
    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(saga)
    })
      .then(res => res.json())
      .then(data => {
        mostrarSaga(data);
        form.reset();
      })
      .catch(err => console.error("❌ Error al agregar:", err));
  }
});

