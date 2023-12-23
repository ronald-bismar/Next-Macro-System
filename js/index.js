// JavaScript para agregar la clase "fade-in" a la imagen después de un retraso de 1 segundo (1000)
const fadeImage = document.getElementById("fade-image");
obtenerPais();
setTimeout(() => {
  fadeImage.classList.add("fade-in");
}, 1000); // Ajusta el valor del retraso en milisegundos según desees

const nav = document.querySelector(".navbar");
const dropdown = document.getElementsByClassName("dropdown-menu");

window.addEventListener("scroll", function () {
  const scrollY = window.scrollY;
  for (let i = 0; i < dropdown.length; i++) {
    dropdown[i].style.backgroundColor =
      "rgba(0, 67, 109," + scrollY / 500 + ")";
  }
  if (scrollY <= 490)
    nav.style.backgroundColor = "rgba(0, 67, 109," + scrollY / 500 + ")";
});
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
