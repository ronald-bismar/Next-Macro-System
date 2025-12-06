class FooterNextMacroSystem extends HTMLElement {
  constructor() {
    super();
  }
  // IMPORTANTE: Este método se ejecuta cuando el componente se añade al DOM
  connectedCallback() {
    this.render();
    this.addEventListeners();
  }

  render() {
    this.innerHTML = `
            <!-- Importar Bootstrap dentro del Shadow DOM -->
            <link rel="stylesheet" href="css/bootstrap.min.css" />
            <!-- Importar FontAwesome (CDN porque faltan archivos locales)-->
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />

        <style>
            .pie-de-pagina .redes a .icon-redes {
  transition: 0.7s;
}
.pie-de-pagina .redes a span {
  transition: all ease-out 0.5s;
}

/* Animacion logo facebook */
.pie-de-pagina .redes #link-facebook:hover .icon-redes {
  transform: translateY(15px);
  background-color: #f2ecff;
  color: rgb(0, 98, 255);
}
.pie-de-pagina .redes #link-facebook:hover #icon-facebook {
  transform: translateY(-40px);
  opacity: 1;
}
/* Animacion logo Youtube */
.pie-de-pagina .redes #link-youtube:hover .icon-redes {
  transform: translateY(15px);
  background-color: #f2ecff;
  color: red;
}
.pie-de-pagina .redes #link-youtube:hover #icon-youtube {
  transform: translateY(-40px);
  opacity: 1;
}
/* Animacion logo Instagram */
.pie-de-pagina .redes #link-instagram:hover .icon-redes {
  transform: translateY(15px);
  color: #cc39a4;
}
.pie-de-pagina .redes #link-instagram:hover #icon-instagram {
  transform: translateY(-40px);
  opacity: 1;
}
/* Animacion logo whatsapp */
.pie-de-pagina .redes #link-whatsapp:hover .icon-redes {
  transform: translateY(15px);
  color: #25d366;
}
.pie-de-pagina .redes #link-whatsapp:hover #icon-whatsapp {
  transform: translateY(-40px);
  opacity: 1;
}
/* Animacion logo gmail */
.pie-de-pagina .redes #link-gmail:hover .icon-redes {
  transform: translateY(15px);
  color: #3b60c4;
}
.pie-de-pagina .redes #link-gmail:hover #icon-gmail {
  transform: translateY(-40px);
  opacity: 1;
}

:root {
  --color-gradient-oscuro: rgb(26, 26, 26);
  --color-gradient-claro: rgb(70, 70, 70);
  --color-iconos-redes: #030303;
}
.pie-de-pagina {
  background: linear-gradient(
    -45deg,
    var(--color-gradient-oscuro),
    var(--color-gradient-claro)
  );
  color: white;
  margin-top: 150px;
  height: 450px;
  padding-top: 40px;
}

.list-group-item {
  background-color: rgba(0, 0, 0, 0);
}
.pie-de-pagina .redes {
  margin-block: 20px;
  gap: 30px;
}
.pie-de-pagina .redes a {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  text-decoration: none;
}
.pie-de-pagina .redes a .icon-redes {
  width: 1.5rem;
  height: 1.5rem;
  padding: 15px;
  border-radius: 150%;
  background-color: aliceblue;
  color: var(--color-iconos-redes);
  box-shadow: 10px 10px 10px rgb(34, 34, 34);
}

.pie-de-pagina .redes a span {
  position: absolute;
  opacity: 0;
  color: aliceblue;
}
@media (max-width: 564px) {
  .pie-de-pagina .redes {
    gap: 5%;
  }
}

        </style>

          <footer class="row pie-de-pagina d-flex justify-content-center">
      <article class="col-12 col-md-4">
        <h4 class="mt-3 text-center">Más de nuestros servicios</h4>
        <ul class="list-group list-group-flush">
          <a href="formulario.html" class="list-group-item text-light"
            >Despliegue</a
          >
          <a href="formulario.html" class="list-group-item text-light"
            >Mantenimiento</a
          >
          <a href="formulario.html" class="list-group-item text-light"
            >Consultas y cotizaciones</a
          >
        </ul>
      </article>
      <div class="row justify-content-center mt-3">
        <h5 class="text-center">Buscanos en</h5>
        <article
          class="redes col-12 col-md-4 px-5 d-flex justify-content-center align-items-center"
        >
          <a href="#" id="link-facebook">
            <span id="icon-facebook">Facebook</span>
            <i class="icon-redes fa-brands fa-facebook-f"></i>
          </a>
          <a href="#" id="link-youtube">
            <span id="icon-youtube">Youtube</span>
            <i class="icon-redes fa-brands fa-youtube"></i>
          </a>
          <a href="#" id="link-instagram">
            <span id="icon-instagram">Instagram</span>
            <i class="icon-redes fa-brands fa-instagram"></i>
          </a>
          <a
            href="https://wa.me/59168107914?text=Quiero saber más sobre el desarrollo de aplicaciones"
            id="link-whatsapp"
          >
            <span id="icon-whatsapp">Whatsapp</span>
            <i class="icon-redes fa-brands fa-whatsapp"></i>
          </a>
          <a href="formulario.html" id="link-gmail">
            <span id="icon-gmail">Gmail</span>
            <i class="icon-redes fa-regular fa-envelope"></i>
          </a>
        </article>
        <article class="col-12 text-center text-white mt-3">
          <p>Copyright - &copy; ${new Date().getFullYear()} - Desarrollado por Next Macro System</p>
        </article>
      </div>
    </footer>
        `;
  }
}

customElements.define("footer-next-macro-system", FooterNextMacroSystem);
