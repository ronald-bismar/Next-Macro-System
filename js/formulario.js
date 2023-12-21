let datos;
let nombre, telefono, correo, mensaje, btnEnviar, requerimientos;

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
obtenerPais();

btnEnviar.addEventListener("click", () => {
  let usuario = new Usuario(
    nombre.value,
    telefono.value,
    correo.value,
    mensaje.value
  );
  requerimientos.value = datos;
  getCountry();
});
function clearInputs() {
  nombre.value.clear();
  telefono.value.clear();
  correo.value.clear();
  mensaje.value.clear();
}
function initElements() {
  nombre = document.getElementById("nombre");
  telefono = document.getElementById("phone");
  correo = document.getElementById("email");
  mensaje = document.getElementById("message");
  btnEnviar = document.getElementById("enviar");
  requerimientos = document.getElementById("infoAdicional");
}
function getRequerementsFromLocalStorage() {
  datos = localStorage.getItem("dato");
  localStorage.clear();
}
function obtenerPais() {
  // Obtener la dirección IP del usuario
  fetch("https://api64.ipify.org?format=json")
    .then((response) => response.json())
    .then((data) => {
      const ipAddress = data.ip;

      // Obtener información de geolocalización basada en la dirección IP
      fetch(
        `http://api.ipstack.com/${ipAddress}?access_key=15939652620cb0813f7d78f354068a40`
      )
        .then((response) => response.json())
        .then((info) => {
          const direction = `Pais: ${info.country_name} Ciudad: ${info.city}`;
          console.log(direction);
          document.getElementById("country").value = direction;
        })
        .catch((error) => console.error(error));
    })
    .catch((error) => console.error(error));
}
