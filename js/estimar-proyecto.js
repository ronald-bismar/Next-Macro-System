// Elementos del DOM
let circles,
  progressBar,
  buttons,
  indicator,
  sliderInner,
  divs,
  btnIrFormulario,
  tituloPrincipal;

// Checkbox
// Padres de los checkbox para que cuando se haga click sobre todo el contenedor de la imagen igual se marque el checkbox
let contCheckbox,
  requerimientosCheckBox = "",
  contadorChecks = 0;

let currentStep = 1;

initElements();
buttons[0].disabled = true;
clicContenedorCheckBox();

// Funcion para actualizar los pasos en el dom
const updateSteps = (e) => {
  if (contadorChecks < currentStep && e.target.id === "next") {
    alert("Selecciona una opcion");
  } else {
    // actualizar los botones basados en el boton clickado
    currentStep = e.target.id === "next" ? ++currentStep : --currentStep;
    circles.forEach((circle, index) => {
      circle.classList[`${index < currentStep ? "add" : "remove"}`]("active");
    });
    // Actualizar la barra de progreso basado en el paso actual
    indicator.style.width = `${
      ((currentStep - 1) / (circles.length - 1)) * 100
    }%`;

    //  Desabilitar los botones si se quiere salir de los limites de los pasos
    if (currentStep == circles.length) {
      tituloPrincipal.textContent = "CUANDO DESEAS INICIAR";
      buttons[1].disabled = true;
      btnIrFormulario.style.display = "inline-block";
    } else if (currentStep == 1) {
      buttons[0].disabled = true;
      tituloPrincipal.textContent = "TIPO DE APLICACION QUE NECESITAS";
    } else {
      buttons.forEach((button) => (button.disabled = false));
      btnIrFormulario.style.display = "none";
      tituloPrincipal.textContent = "TIPO DE TRABAJO";
    }
    // Cambiar el slider div
    let percentage = (currentStep - 1) * -100;
    sliderInner.style.transform = `translateX(${percentage}%)`;
  }
};
buttons.forEach((button) => {
  button.addEventListener("click", updateSteps);
});

function initElements() {
  circles = document.querySelectorAll(".circle");
  progressBar = document.querySelector(".indicator");
  buttons = document.querySelectorAll("button");
  indicator = document.querySelector(".indicator");
  sliderInner = document.querySelector(".slider--inner");
  divs = sliderInner.querySelectorAll(".slider-divs");
  btnIrFormulario = document.querySelector("#enviar-detalles");
  contCheckbox = document.querySelectorAll(".check");
  tituloPrincipal = document.querySelector("#tituloPrincipal");
}

function clicContenedorCheckBox() {
  contCheckbox.forEach((elemento) => {
    elemento.addEventListener("click", () => {
      let checkbox = elemento.querySelector('input[type = "checkbox"]');
      checkbox.checked = !checkbox.checked;
      if (checkbox.checked) {
        requerimientosCheckBox += ` ${
          elemento.querySelector("h5").textContent
        }`;
        contadorChecks++;
      } else {
        requerimientosCheckBox = requerimientosCheckBox.replace(
          elemento.querySelector("h5").textContent,
          ""
        );
        contadorChecks--;
      }

      requerimientosCheckBox = requerimientosCheckBox.trim();
      console.log(requerimientosCheckBox);
    });
  });
}
