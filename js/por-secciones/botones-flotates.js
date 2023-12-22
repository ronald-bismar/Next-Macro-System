var contenedorBotones;
window.onload = () => {
  initComponents();
  let sw = false;
  window.addEventListener("scroll", function () {
    const scrollY = window.scrollY;
    if (scrollY >= 2200 && sw === false) {
      contenedorBotones.classList.add(
        "contenedor-botones-flotantes",
        "mostrar"
      );
      sw = true;
    }
  });
};
function initComponents() {
  contenedorBotones = document.getElementById("contenedor-botones");
}
