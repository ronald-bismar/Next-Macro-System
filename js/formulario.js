let datos;
let nombre, telefono, correo, mensaje, btnEnviar;

class Usuario {
  nombre;
  telefono;
  correo;
  mensaje;
  constructor(nombre, telefono, correo, mensaje) {
    this.nombre = nombre;
    this.telefono = telefono;
    this.correo = correo;
    this.mensaje = mensaje;
  }
}
initElements();
getRequerementsFromLocalStorage();

btnEnviar.addEventListener("click", () => {
  let usuario = new Usuario(
    nombre.value,
    telefono.value,
    correo.value,
    mensaje.value
  );
  let datos = `${usuario.mensaje},
  Nombre: ${usuario.nombre},
  Telefono: ${usuario.telefono},
  Correo: ${usuario.correo}`;
  mensaje.value = datos;
  setTimeout(clearInputs, 1000);
});
function clearInputs() {
  nombre.value = "";
  telefono.value.clear();
  correo.value = "";
  mensaje.value = "";
}
function initElements() {
  nombre = document.getElementById("nombre");
  telefono = document.getElementById("phone");
  correo = document.getElementById("email");
  mensaje = document.getElementById("message");
  btnEnviar = document.getElementById("enviar");
  console.log(btnEnviar);
}
function getRequerementsFromLocalStorage() {
  datos = localStorage.getItem("dato");
  localStorage.clear();
}
