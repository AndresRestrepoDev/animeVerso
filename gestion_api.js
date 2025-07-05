/* Para leer los datos guardados en nuestra db.json desde nuestro endpoint vamos a crear un fetch() con metodo GET */
fetch('http://localhost:3000/sagas') //aca hacemos una peticion GET a la URL
    .then( response => response.json() ) //despues de que el servidor responde convertivos el formato de la respuesta a JSON
    .then( data => console.log( "✅ Sagas disponibles:", data ) ) //Mostramos las sagas en consola
    .catch( error => console.error( "❌ Error al obtener sagas:", error ) ) //Si ocurre un error lo mostramos en la consola


/* Para agregar una nueva saga de anime a nuestra db.json usamos fetch() con metodo POST */
const nuevaSaga = {
    nombre: "Death Note",
    imagen: "https://www.galeriaplakatu.com/img/imagecache/100001-101000/product-media/PP35270(1)-679x1026-nobckgr.webp",
    comentario: "La animación es magistral, en serio, sobretodo los close-ups de los personajes",
    calificacion: 8.9
}

fetch('http://localhost:3000/sagas', {
    method: 'POST', // protocolo que indica que se va a enviar un nuevo recuerso
    headers: { 'Content-Type': 'application/json' }, //Especifico que el cuerpo del mensaje es JSON
    body: JSON.stringify(nuevaSaga) //Convertimos nuestro objeto a una cadena JSON para enviarlo
})

    .then( response => response.json() )
    .then( data => console.log("✅ Saga agregada:", data) )
    .catch( error => console.error("❌ Error al agregar la saga:", error) );


/* Para modificar una saga en especifica usamos fetch() con el metodo PUT en este caso debemos enviar en la URL el id */
const idAEditar = 5;
const sagaActualizada = {
    nombre: "Dragon Ball Z Kai",
    imagen: "https://m.media-amazon.com/images/S/pv-target-images/26502aba5ef44ddcc63b5f724cc254e32e388737ee45a8f8d1974cbc4234e3f6.jpg",
    comentario: "Versión remasterizada más rápida y fiel al manga.",
    calificacion: 8.9
};

fetch(`http://localhost:3000/sagas/${idAEditar}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(sagaActualizada)
})
    .then(response => response.json())
    .then(data => console.log("✅ Saga actualizada:", data))
    .catch(error => console.error("❌ Error al actualizar saga:", error));


/* Para eliminar una saga en especifica usamos fetch() con el metodo DELETE en este caso debemos enviar en la URL el id */
const idEliminar = 10;
fetch(`http://localhost:3000/sagas/${idEliminar}`, {   //Recordar que en la URL se debe dar el numero del id del producto que se va a eliminar
    method: 'DELETE'})      //Protocolo DELETE le dice al servidor que se va a eliminar un recurso 
    .then(() => console.log(`✅ Saga con el id ${idEliminar} eliminada`))
    .catch(error => console.error("❌ Error al eliminar saga:", error))
