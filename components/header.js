class HeaderNextMacroSystem extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  // IMPORTANTE: Este método se ejecuta cuando el componente se añade al DOM
  connectedCallback() {
    this.render();
    this.addEventListeners();
  }

  get scrollEffect() {
    // Por defecto true si no se especifica
    return this.getAttribute("scroll-effect") !== "false";
  }

  get isFixed() {
    // Por defecto true si no se especifica
    return this.getAttribute("fixed") !== "false";
  }

  render() {
    const fixedClass = this.isFixed ? "fixed-top" : "";
    const backgroundColor = this.scrollEffect
      ? "rgba(0, 67, 109, 0)"
      : "rgba(0, 67, 109, 1)";

    this.shadowRoot.innerHTML = `

               <!-- Importar Bootstrap dentro del Shadow DOM -->
            <link rel="stylesheet" href="css/bootstrap.min.css" />
               <link rel="stylesheet" href="CSS/font-awesome.min.css" />


        <style>
                        :host{
                            display: block;
                            width: 100%;
                        }
                            :root {
  --color-font-navbar: white;
  --background-navbar: ${backgroundColor};
  --background-menus-dropdown: rgba(0, 57, 92, 0.493);
}
.navbar {
  background-color: var(--background-navbar);
  font-family: OpenSans-Medium;
}
/* Imagenes logo navbar */
.navbar a img {
  height: 40px;
}
.navbar a img:nth-child(2) {
  height: 20px;
}
/* Enlaces del navbar */
.enlaces ul li a {
  color: white;
  transform: scaleX(105%);
  margin-inline: 10px;
}
/* Menus dropdown */
ul li a.dropdown-item:hover {
  background-color: rgb(0, 128, 255);
}

.dropdown-menu {
  background-color: var(--background-menus-dropdown);
}
.dropdown-menu.search {
  transform: translate(-300px, 20px);
}
.search input {
  width: 220px;
}
.btnbuscar {
  color: var(--color-font-navbar);
}
.btnbuscar a {
  transform: translateX(-100px);
}
/* Pantallas de laptop */
@media (max-width: 992px) {
  .dropdown-menu.search {
    transform: translate(0px, 0px);
  }
  .search input {
    width: 100%;
  }
}

/* Pantallas de celular */
@media (max-width: 564px) {
  .icon-computer {
    display: none;
  }
}
.dropdown-menu {
  transition: all ease 0.5s;
}
.enlaces ul li a {
  transition: all 0.3s;
}
.enlaces ul li a:hover {
  color: white;
  transition: all 0.3s;
  transform: translateY(3px);
}
/* Estilos de aparecer la lista de los dropdown (solo para el navbar en pantalla completa)*/
@media (min-width: 768px) {
  .navbar-nav li:hover > .menu-desplegado {
    transition: all ease 0.5s;
    display: block;
  }

  .menu-desplegado {
    display: none;
    position: absolute;
    transition: all ease 0.5s;
  }

  .menu-desplegado a {
    color: #000;
  }
}
/* Pantallas de celular */
@media (max-width: 564px) {
  .icon-computer {
    display: none;
  }
}

                    </style>

        <header class="row">
    <nav class="navbar navbar-expand-xl ${fixedClass} navbar-dark mb-5">
        <!-- Logotipo -->
        <a href="index.html" class="navbar-brand ms-5">
            <img
                src="img/logo_cabecera.png"
                alt="logotipo"
                class="img-fluid icon-computer"
            />
            <img
                class="icon-letter img-fluid"
                src="img/letras-logo.png"
                alt="next macro system"
            />
        </a>
        <button
            class="navbar-toggler me-3"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#menu-principal"
        >
            <span class="navbar-toggler-icon"></span
            ><!-- boton hamburguesa -->
        </button>
        <!-- Menu de navegacion -->
        <div class="enlaces collapse navbar-collapse" id="menu-principal">
            <ul class="navbar-nav m-auto">
                <li class="nav-item ms-4">
                    <a href="index.html" class="nav-link px-0">Inicio</a>
                </li>
                <li class="nav-item ms-4">
                    <a href="sobrenosotros.html" class="nav-link px-0"
                    >Sobre nosotros</a
                    >
                </li>
                <li class="nav-item ms-4">
                    <a href="formulario.html" class="nav-link px-0">Contactos</a>
                </li>
                <li class="nav-item ms-4 dropdown">
                    <a
                        href="#productos"
                        class="nav-link dropdown-toggle px-0"
                        data-bs-toggle="dropdown"
                    >Soluciones</a
                    >
                    <ul class="dropdown-menu menu-desplegado">
                        <li>
                            <a href="estimar-proyecto.html" class="dropdown-item"
                            >Pagina Web de Servicios</a
                            >
                        </li>
                        <li>
                            <a href="estimar-proyecto.html" class="dropdown-item"
                            >Pagina Web de Administracion</a
                            >
                        </li>
                        <li>
                            <a href="estimar-proyecto.html" class="dropdown-item"
                            >Aplicaciones Moviles Nativas</a
                            >
                        </li>
                        <li>
                            <a href="estimar-proyecto.html" class="dropdown-item"
                            >Aplicaciones Moviles Hibridas</a
                            >
                        </li>
                        <li>
                            <a href="estimar-proyecto.html" class="dropdown-item"
                            >Programas de Escritorio</a
                            >
                        </li>
                        <li>
                            <a href="estimar-proyecto.html" class="dropdown-item"
                            >Panel de Administracion</a
                            >
                        </li>
                    </ul>
                </li>
                <li class="nav-item ms-4">
                    <a href="blog.html" class="nav-link px-0"
                    >Blog</a
                    >
                </li>
                <li class="nav-item ms-4 dropdown btnbuscar">
                    <a
                        href="#"
                        class="nav-link dropdown-toggle px-0"
                        data-bs-toggle="dropdown"
                    >
                        <i class="fa-solid fa-magnifying-glass"></i>
                    </a>
                    <div class="dropdown-menu search">
                        <!-- Realizar una busqueda en la pagina segun la cadena que se ingrese -->
                        <div action="get" class="d-flex">
                            <input
                                type="search"
                                class="form-control ms-3"
                                placeholder="Buscar"
                            />
                            <a href="busqueda-sin-resultados.html"
                            ><button class="btn btn-light ms-1 me-3">Buscar</button></a
                            >
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </nav>
</header>
        `;
  }

  addEventListeners() {
    if (!this.scrollEffect) {
      return;
    }
    // ✅ CORRECTO - busca dentro del Shadow DOM del componente
    const nav = this.shadowRoot.querySelector(".navbar");
    const dropdowns = this.shadowRoot.querySelectorAll(".dropdown-menu");

    window.addEventListener("scroll", () => {
      const scrollY = window.scrollY;

      // Usar forEach en lugar de for loop (más moderno)
      dropdowns.forEach((dropdown) => {
        dropdown.style.backgroundColor = `rgba(0, 67, 109, ${scrollY / 500})`;
      });

      if (scrollY <= 490) {
        nav.style.backgroundColor = `rgba(0, 67, 109, ${scrollY / 500})`;
      }
    });
  }
}

// IMPORTANTE: Registrar el componente
customElements.define("header-next-macro-system", HeaderNextMacroSystem);
