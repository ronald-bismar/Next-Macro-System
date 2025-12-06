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
            <!-- Importar FontAwesome (CDN porque faltan archivos locales) -->
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />

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
                font-family: OpenSans-Medium, sans-serif;
                transition: background-color 0.3s ease;
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

            .search-icon {
                width: 20px;
                height: 20px;
                /* Filtro para volver blanco el SVG si es negro por defecto */
                filter: invert(100%) sepia(100%) saturate(0%) hue-rotate(288deg) brightness(102%) contrast(102%);
            }

            .search img{
                width: 20px;
                height: 20px !important;
            }

            /* Estilos de aparecer la lista de los dropdown (solo para el navbar en pantalla completa)*/
            @media (min-width: 1200px) {
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
            
            /* Estilo para mostrar el menú móvil y dropdowns manualmente */
            .show {
                display: block !important;
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
                    id="navbar-toggler"
                >
                    <span class="navbar-toggler-icon"></span>
                </button>
                <!-- Menu de navegacion -->
                <div class="enlaces collapse navbar-collapse" id="menu-principal">
                    <ul class="navbar-nav m-auto">
                        <li class="nav-item ms-4">
                            <a href="index.html" class="nav-link px-0">Inicio</a>
                        </li>
                        <li class="nav-item ms-4">
                            <a href="sobrenosotros.html" class="nav-link px-0">Sobre nosotros</a>
                        </li>
                        <li class="nav-item ms-4">
                            <a href="formulario.html" class="nav-link px-0">Contactos</a>
                        </li>
                        <li class="nav-item ms-4 dropdown" id="soluciones-dropdown">
                            <a
                                href="#productos"
                                class="nav-link dropdown-toggle px-0"
                                id="soluciones-toggle"
                            >Soluciones</a>
                            <ul class="dropdown-menu menu-desplegado" id="soluciones-menu">
                                <li>
                                    <a href="estimar-proyecto.html" class="dropdown-item">Pagina Web de Servicios</a>
                                </li>
                                <li>
                                    <a href="estimar-proyecto.html" class="dropdown-item">Pagina Web de Administracion</a>
                                </li>
                                <li>
                                    <a href="estimar-proyecto.html" class="dropdown-item">Aplicaciones Moviles Nativas</a>
                                </li>
                                <li>
                                    <a href="estimar-proyecto.html" class="dropdown-item">Aplicaciones Moviles Hibridas</a>
                                </li>
                                <li>
                                    <a href="estimar-proyecto.html" class="dropdown-item">Programas de Escritorio</a>
                                </li>
                                <li>
                                    <a href="estimar-proyecto.html" class="dropdown-item">Panel de Administracion</a>
                                </li>
                            </ul>
                        </li>
                        <li class="nav-item ms-4">
                            <a href="blog.html" class="nav-link px-0">Blog</a>
                        </li>
                        <li class="nav-item ms-4 dropdown btnbuscar" id="search-dropdown">
                            <a
                                href="#"
                                class="nav-link dropdown-toggle px-0 search"
                                id="search-toggle"
                            >
                                <img src="img/search.svg" alt="Buscar" class="search-icon" />
                            </a>
                            <div class="dropdown-menu search" id="search-menu">
                                <!-- Realizar una busqueda en la pagina segun la cadena que se ingrese -->
                                <div action="get" class="d-flex">
                                
                                    <input
                                        type="search"
                                        class="form-control ms-3"
                                        placeholder="Buscar"
                                    />
                                    <a href="busqueda-sin-resultados.html">
                                        <button class="btn btn-light ms-1 me-3">Buscar</button>
                                    </a>
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
    // Scroll effect
    if (this.scrollEffect) {
      const nav = this.shadowRoot.querySelector(".navbar");
      const dropdowns = this.shadowRoot.querySelectorAll(".dropdown-menu");

      window.addEventListener("scroll", () => {
        const scrollY = window.scrollY;
        dropdowns.forEach((dropdown) => {
          dropdown.style.backgroundColor = `rgba(0, 67, 109, ${scrollY / 500})`;
        });

        if (scrollY <= 490) {
          nav.style.backgroundColor = `rgba(0, 67, 109, ${scrollY / 500})`;
        }
      });
    }

    // Mobile Menu Toggle
    const toggler = this.shadowRoot.getElementById("navbar-toggler");
    const menuPrincipal = this.shadowRoot.getElementById("menu-principal");

    if (toggler && menuPrincipal) {
      toggler.addEventListener("click", () => {
        menuPrincipal.classList.toggle("show");
      });
    }

    // Search Dropdown Toggle
    const searchToggle = this.shadowRoot.getElementById("search-toggle");
    const searchMenu = this.shadowRoot.getElementById("search-menu");

    // Secret search functionality
    const searchInput = searchMenu.querySelector('input[type="search"]');
    const searchButtonLink = searchMenu.querySelector(
      'a[href="busqueda-sin-resultados.html"]'
    );

    if (searchInput && searchButtonLink) {
      searchButtonLink.addEventListener("click", (e) => {
        e.preventDefault(); // Prevent default navigation
        const searchTerm = searchInput.value.trim();
        if (searchTerm === "NextMacroSystem123456") {
          window.location.href =
            "panel-post9809544b-9a26-4664-b2ba-dbeefa92a860.html";
        } else {
          // If not the secret keyword, proceed with the default search results page
          window.location.href = searchButtonLink.href;
        }
      });
    }

    if (searchToggle && searchMenu) {
      searchToggle.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        searchMenu.classList.toggle("show");
      });
    }

    // Soluciones Dropdown Toggle (Mobile)
    const solucionesToggle =
      this.shadowRoot.getElementById("soluciones-toggle");
    const solucionesMenu = this.shadowRoot.getElementById("soluciones-menu");

    if (solucionesToggle && solucionesMenu) {
      solucionesToggle.addEventListener("click", (e) => {
        // Only toggle on click for mobile or if hover doesn't work
        if (window.innerWidth < 1200) {
          e.preventDefault();
          e.stopPropagation();
          solucionesMenu.classList.toggle("show");
        }
      });
    }

    // Close dropdowns when clicking outside
    window.addEventListener("click", (e) => {
      const path = e.composedPath();

      if (searchMenu && searchMenu.classList.contains("show")) {
        if (!path.includes(searchToggle) && !path.includes(searchMenu)) {
          searchMenu.classList.remove("show");
        }
      }

      if (solucionesMenu && solucionesMenu.classList.contains("show")) {
        // Only close if it was opened via click (mobile mainly)
        if (
          !path.includes(solucionesToggle) &&
          !path.includes(solucionesMenu)
        ) {
          solucionesMenu.classList.remove("show");
        }
      }
    });
  }
}

// IMPORTANTE: Registrar el componente
customElements.define("header-next-macro-system", HeaderNextMacroSystem);
