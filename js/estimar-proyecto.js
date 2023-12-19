// Elementos del DOM
let circles,
  progressBar,
  buttons,
  indicator,
  sliderInner,
  btnIrFormulario,
  tituloPrincipal;

// Checkbox
let checkboxs,
  requerimientosCheckBox = "",
  contadorChecks = 0;

let currentStep = 1;

let modal;

let enlace_formulario;

initElements();

buttons[0].disabled = true;

clicContenedorCheckBox();

// Funcion para actualizar los pasos en el dom
const updateSteps = (e) => {
  if (contadorChecks < 1 && e.target.id === "next") {
    window.location.href = "#modal-warning";
  } else {
    // actualizar el estado de los botones basados en el boton clickado
    currentStep = e.target.id === "next" ? ++currentStep : --currentStep;
    circles.forEach((circle, index) => {
      circle.classList[`${index < currentStep ? "add" : "remove"}`]("active");
    });
    // Actualizar la barra de progreso basado en el paso actual
    indicator.style.width = `${
      ((currentStep - 1) / (circles.length - 1)) * 100
    }%`;

    //  Desabilitar los botones si se quiere salir de los limites de los pasos del formulario
    if (currentStep == circles.length) {
      terceraVista();
    } else if (currentStep == 1) {
      primeraVista();
    } else {
      segundaVista();
    }
    moverSlider();
    reiniciarContadorDeCheckeds(); // Se reinicia el contador de checkeds al mover el slider
    borrarCheckeds();
  }
};
buttons.forEach((button) => {
  button.addEventListener("click", updateSteps);
});
function borrarCheckeds() {
  checkboxs.forEach((checkbox) => {
    checkbox.checked = false;
  });
}
function reiniciarContadorDeCheckeds() {
  contadorChecks = 0;
}

function primeraVista() {
  buttons[0].disabled = true;
  tituloPrincipal.textContent = "TIPO DE APLICACION QUE NECESITAS";
}
function segundaVista() {
  buttons.forEach((button) => (button.disabled = false));
  btnIrFormulario.style.display = "none";
  tituloPrincipal.textContent = "TIPO DE TRABAJO";
}
function terceraVista() {
  tituloPrincipal.textContent = "CUANDO DESEAS INICIAR";
  buttons[1].disabled = true;
  btnIrFormulario.style.display = "inline-block";
}
function moverSlider() {
  let percentage = (currentStep - 1) * -100;
  sliderInner.style.transform = `translateX(${percentage}%)`;
}
function initElements() {
  circles = document.querySelectorAll(".circle");
  progressBar = document.querySelector(".indicator");
  buttons = document.querySelectorAll("button");
  indicator = document.querySelector(".indicator");
  sliderInner = document.querySelector(".slider--inner");
  btnIrFormulario = document.querySelector("#enviar-detalles");
  checkboxs = document.querySelectorAll(".opcion");
  tituloPrincipal = document.querySelector("#tituloPrincipal");
  modal = document.querySelector(".modal");
  enlace_formulario = document.querySelector("#btn-cambiar");
}

function clicContenedorCheckBox() {
  checkboxs.forEach((checkbox) => {
    checkbox.addEventListener("click", () => {
      if (checkbox.checked) {
        console.info(checkbox.type === "radio" && contadorChecks >= 1);
        if (checkbox.type === "radio" && contadorChecks >= 1)
          borrarPalabraAnterior();
        requerimientosCheckBox += ` ${checkbox.id}`;
        ++contadorChecks;
      } else {
        requerimientosCheckBox = requerimientosCheckBox.replace(
          checkbox.id,
          ""
        );
        --contadorChecks;
      }

      requerimientosCheckBox = requerimientosCheckBox.trim();
      console.log(requerimientosCheckBox);
    });
  });
}
function borrarPalabraAnterior() {
  requerimientosCheckBox = requerimientosCheckBox.substring(
    0,
    requerimientosCheckBox.lastIndexOf(" ")
  );
}
function actualizarRequerimientos() {
  console.log(enlace_formulario.getAttribute("href"));
}

//Pasar al formulario
btnIrFormulario.addEventListener("click", () => {
  localStorage.setItem("dato", requerimientosCheckBox);
  window.location.href = "formulario.html";
});
