// JavaScript para agregar la clase "fade-in" a la imagen después de un retraso
const fadeImage = document.getElementById("fade-image");
setTimeout(() => {
  fadeImage.classList.add("fade-in");
}, 1000); // Ajusta el valor del retraso en milisegundos según desees

const nav = document.querySelector(".navbar");
const dropdown = document.getElementsByClassName('dropdown-menu');

window.addEventListener("scroll", function () {
  const scrollY = window.scrollY;
  for (let i = 0; i < dropdown.length; i++) {
    dropdown[i].style.backgroundColor = "rgba(0, 67, 109," + scrollY / 500 + ")";
    
  }
  
  nav.style.backgroundColor = "rgba(0, 67, 109," + scrollY / 500 + ")";
});
