// JavaScript para agregar la clase "fade-in" a la imagen después de un retraso
const fadeImage = document.getElementById("fade-image");
setTimeout(() => {
  fadeImage.classList.add("fade-in");
}, 1000); // Ajusta el valor del retraso en milisegundos según desees

const nav = document.querySelector(".navbar");

window.addEventListener("scroll", function () {
  const scrollY = window.scrollY;
  nav.style.backgroundColor = "rgba(0, 67, 109," + scrollY / 500 + ")";
});
