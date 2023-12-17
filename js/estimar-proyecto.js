//Elementos del DOM
const circles = document.querySelectorAll(".circle"),
  progressBar = document.querySelector(".indicator"),
  buttons = document.querySelectorAll("button"),
  indicator = document.querySelector(".indicator");
let sliderInner = document.querySelector(".slider--inner");
let divs = sliderInner.querySelectorAll(".slider-divs");

let currentStep = 1;

//   funcion para actualizar los pasos en el dom
const updateSteps = (e) => {
  // actualizar los botones basados en el boton clickado
  currentStep = e.target.id === "next" ? ++currentStep : --currentStep;
  circles.forEach((circle, index) => {
    circle.classList[`${index < currentStep ? "add" : "remove"}`]("active");
  });
  //Actualizar la barra de progreso basado en el paso actual
  indicator.style.width = `${
    ((currentStep - 1) / (circles.length - 1)) * 100
  }%`;

  //   desabilitar los botones si se quiere salir de los limites de los pasos
  if (currentStep == circles.length) {
    buttons[1].disabled = true;
    pasarAPaginaMensaje();
  } else if (currentStep == 1) {
    buttons[0].disabled = true;
  } else {
    buttons.forEach((button) => (button.disabled = false));
  }
  //  Cambiar el slider div
  let percentage = (currentStep - 1) * -100;
  sliderInner.style.transform = `translateX(${percentage}%)`;
};
buttons.forEach((button) => {
  button.addEventListener("click", updateSteps);
});
function pasarAPaginaMensaje() {}
