// Configuración del API
const API_BASE_URL = "https://blog-nmsystem.vercel.app";
const API_POSTS_ENDPOINT = "/blogs";
const ADMIN_PANEL_URL =
  "panel-post-admin-9809544b-9a26-4664-b2ba-dbeefa92a860.html";

let isEditMode = false;
let currentPostId = null;
let hasUnsavedChanges = false;
let originalData = null;

let dateSpan;
let statusArea;
let btnGuardarDraft;
let btnPublicar;
let modeIndicator;
let coverPreview;
let img;
let title;
let subtitle;
let coverImage;
let btnRemoveCover;
let author;
let loadingOverlay;
let btnAddSection;
let container;

function initElements() {
  dateSpan = document.getElementById("currentDate");
  statusArea = document.getElementById("statusArea");
  btnGuardarDraft = document.getElementById("btnGuardarDraft");
  btnPublicar = document.getElementById("btnPublicar");
  modeIndicator = document.getElementById("modeIndicator");
  title = document.getElementById("title");
  subtitle = document.getElementById("subtitle");
  coverImage = document.getElementById("coverImage");
  btnRemoveCover = document.getElementById("btnRemoveCover");
  coverPreview = document.getElementById("coverPreview");
  author = document.getElementById("author");
  loadingOverlay = document.getElementById("loadingOverlay");
  btnAddSection = document.getElementById("btnAddSection");
  container = document.getElementById("sectionsContainer");
}

// Estado
const state = {
  post: {
    title: "",
    subtitle: "",
    coverImage: "",
    author: "Ronald Bismar Limachi Mamani",
    sections: [],
  },
};

// Utilidades
const qs = (sel) => document.querySelector(sel);
const qsa = (sel) => Array.from(document.querySelectorAll(sel));

// Set Date
function initDate() {
  if (dateSpan) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    dateSpan.textContent = new Date().toLocaleDateString("es-ES", options);
  }
}

function showStatus(message, type = "success") {
  statusArea.classList.remove("d-none", "alert-success", "alert-danger");
  statusArea.classList.add(
    type === "success" ? "alert-success" : "alert-danger"
  );
  statusArea.textContent = message;
  setTimeout(() => statusArea.classList.add("d-none"), 3000);
}

// Auto-resize textarea
function autoResize(textarea) {
  textarea.style.height = "auto";
  textarea.style.height = textarea.scrollHeight + "px";
}

// Crear una Sección Compuesta
function createSection(data = {}) {
  const sectionId = "section-" + Date.now();

  const wrapper = document.createElement("div");
  wrapper.className = "section-composite";
  wrapper.id = sectionId;

  // Floating Actions (Delete, Move)
  const floatingActions = document.createElement("div");
  floatingActions.className = "section-actions-floating";
  floatingActions.innerHTML = `
        <button type="button" class="btn btn-sm text-muted btnMoveUp" title="Subir"><i class="fa-solid fa-arrow-up"></i></button>
        <button type="button" class="btn btn-sm text-muted btnMoveDown" title="Bajar"><i class="fa-solid fa-arrow-down"></i></button>
        <button type="button" class="btn btn-sm text-danger btnRemove" title="Eliminar"><i class="fa-solid fa-trash"></i></button>
    `;

  // Toolbar (Add Subtitle, Add Image)
  const toolbar = document.createElement("div");
  toolbar.className = "section-toolbar";
  toolbar.innerHTML = `
        <button type="button" class="btn-tool btnToggleSubtitle ${
          data.subtitle ? "active" : ""
        }"><i class="fa-solid fa-heading"></i> Subtítulo</button>
        <button type="button" class="btn-tool btnToggleImage ${
          data.image ? "active" : ""
        }"><i class="fa-solid fa-image"></i> Imagen</button>
    `;

  const contentDiv = document.createElement("div");
  contentDiv.className = "section-content";

  const subtitleContainer = document.createElement("div");
  subtitleContainer.className = `mb-2 ${data.subtitle ? "" : "d-none"}`;
  subtitleContainer.innerHTML = `
        <input type="text" class="form-control-plaintext section-subtitle" placeholder="Escribe un subtítulo..." value="${
          data.subtitle || ""
        }">
    `;

  // 2. Image (Optional)
  const imageContainer = document.createElement("div");
  imageContainer.className = `section-image-container ${
    data.image ? "" : "d-none"
  }`;

  // Image Logic
  const renderImageInput = () => {
    imageContainer.innerHTML = "";
    if (data.image) {
      const img = document.createElement("img");
      img.src = data.image;

      const btnRemoveImg = document.createElement("button");
      btnRemoveImg.className =
        "btn btn-sm btn-light position-absolute top-0 end-0 m-2";
      btnRemoveImg.innerHTML = '<i class="fa-solid fa-times"></i>';
      btnRemoveImg.onclick = () => {
        data.image = "";
        renderImageInput();
        toolbar.querySelector(".btnToggleImage").classList.remove("active");
        imageContainer.classList.add("d-none");
      };

      imageContainer.appendChild(img);
      imageContainer.appendChild(btnRemoveImg);
    } else {
      const inputDiv = document.createElement("div");
      inputDiv.className = "section-image-input";
      inputDiv.innerHTML = `
                <p class="text-muted mb-2">Pega la URL de la imagen</p>
                <input type="url" class="form-control form-control-sm text-center mx-auto" style="max-width: 300px;" placeholder="https://...">
            `;
      const input = inputDiv.querySelector("input");
      input.addEventListener("change", (e) => {
        if (e.target.value) {
          data.image = e.target.value;
          renderImageInput();
        }
      });
      imageContainer.appendChild(inputDiv);
    }
  };
  renderImageInput();

  // 3. Paragraph (Mandatory)
  const paragraphContainer = document.createElement("div");
  paragraphContainer.innerHTML = `
        <textarea class="form-control-plaintext section-paragraph" rows="1" placeholder="Escribe tu historia...">${
          data.paragraph || ""
        }</textarea>
    `;
  const textarea = paragraphContainer.querySelector("textarea");
  textarea.addEventListener("input", () => autoResize(textarea));
  setTimeout(() => autoResize(textarea), 0);

  // Assemble
  contentDiv.appendChild(subtitleContainer);
  contentDiv.appendChild(imageContainer);
  contentDiv.appendChild(paragraphContainer);

  wrapper.appendChild(floatingActions);
  wrapper.appendChild(toolbar);
  wrapper.appendChild(contentDiv);
  container.appendChild(wrapper);

  // Toggle Subtitle
  toolbar.querySelector(".btnToggleSubtitle").addEventListener("click", (e) => {
    const btn = e.currentTarget;
    btn.classList.toggle("active");
    subtitleContainer.classList.toggle("d-none");
    if (!subtitleContainer.classList.contains("d-none")) {
      subtitleContainer.querySelector("input").focus();
    } else {
      subtitleContainer.querySelector("input").value = "";
    }
  });

  // Toggle Image
  toolbar.querySelector(".btnToggleImage").addEventListener("click", (e) => {
    const btn = e.currentTarget;
    btn.classList.toggle("active");
    imageContainer.classList.toggle("d-none");
    if (imageContainer.classList.contains("d-none")) {
      data.image = "";
      renderImageInput();
    }
  });

  // Remove Section
  wrapper.querySelector(".btnRemove").addEventListener("click", () => {
    if (container.children.length > 1) {
      wrapper.remove();
    } else {
      showStatus("Debe haber al menos una sección", "danger");
    }
  });

  // Move Up/Down
  wrapper.querySelector(".btnMoveUp").addEventListener("click", () => {
    if (wrapper.previousElementSibling)
      wrapper.parentElement.insertBefore(
        wrapper,
        wrapper.previousElementSibling
      );
  });
  wrapper.querySelector(".btnMoveDown").addEventListener("click", () => {
    if (wrapper.nextElementSibling)
      wrapper.parentElement.insertBefore(wrapper.nextElementSibling, wrapper);
  });

  return wrapper;
}

// Recolectar datos
function collectPost(isDraft = false) {
  const sections = [];
  qsa(".section-composite").forEach((sec, index) => {
    const paragraph = sec.querySelector(".section-paragraph").value;
    const subtitleInput = sec.querySelector(".section-subtitle");
    const imgEl = sec.querySelector(".section-image-container img");

    const secSubtitle = !subtitleInput.parentElement.classList.contains(
      "d-none"
    )
      ? subtitleInput.value
      : "";
    const secImage = imgEl ? imgEl.src : "";

    // Solo agregar si tiene párrafo (obligatorio)
    if (paragraph.trim()) {
      sections.push({
        paragraph,
        subtitle: secSubtitle,
        image: secImage,
        order: index + 1,
      });
    }
  });

  const dateOptions = { year: "numeric", month: "long", day: "numeric" };
  const readableDate = new Date().toLocaleDateString("es-ES", dateOptions);

  return {
    title: title.value,
    subtitle: subtitle.value,
    datePost: readableDate,
    timeRead: getTimeRead(sections),
    imagePost: coverImage.value,
    section: sections,
    author: "Ronald Bismar Limachi Mamani",
    isDraft: isDraft,
  };
}

function getTimeRead(sections) {
  let totalWords = 0;
  sections.forEach((section) => {
    if (section.paragraph) {
      totalWords += section.paragraph.split(/\s+/).length;
    }
  });
  const timeRead = Math.max(1, Math.ceil(totalWords / 200)) + " min";

  return timeRead;
}

// Event Listeners
function bindEvents() {
  // Cover Image
  coverImage.addEventListener("change", (e) => {
    const url = e.target.value;
    if (url) {
      const preview = qs("#coverPreview");
      const img = preview.querySelector("img");
      img.src = url;
      preview.classList.remove("d-none");
      coverImage.classList.add("d-none");
    }
  });

  btnRemoveCover.addEventListener("click", () => {
    coverPreview.classList.add("d-none");
    coverImage.classList.remove("d-none");
    coverImage.value = "";
  });

  // Add Section
  btnAddSection.addEventListener("click", () => createSection());

  btnGuardarDraft.addEventListener("click", async () => {
    guardarBorrador();
  });

  btnPublicar.addEventListener("click", async () => {
    publicarPost();
  });
}

async function guardarBorrador() {
  const post = collectPost(true);

  // Validaciones básicas
  if (!post.title) {
    showStatus("El título es obligatorio", "danger");
    return;
  }

  const originalText = btnGuardarDraft.textContent;
  btnGuardarDraft.disabled = true;
  btnGuardarDraft.textContent = "Guardando borrador...";

  try {
    const isEdit = isEditMode && currentPostId;
    if (isEdit) {
      response = await fetch(
        `${API_BASE_URL}${API_POSTS_ENDPOINT}/${currentPostId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(post),
        }
      );
    } else {
      response = await fetch(`${API_BASE_URL}${API_POSTS_ENDPOINT}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
      });
    }

    if (response.status === 204) {
      showStatus("Borrador guardado");
      setTimeout(() => {
        window.location.href = ADMIN_PANEL_URL;
      }, 2000);
    } else {
      showStatus("Error al guardar borrador. Intenta nuevamente.", "danger");
      console.error("Error status:", response.status);
    }
  } catch (error) {
    console.error("Error publishing draft:", error);
    showStatus("Error de conexión.", "danger");
  } finally {
    btnGuardarDraft.disabled = false;
    btnGuardarDraft.textContent = originalText;
  }
}

async function publicarPost() {
  const post = collectPost();

  // Validaciones básicas
  if (!post.title) {
    showStatus("El título es obligatorio", "danger");
    return;
  }
  if (post.section.length === 0) {
    showStatus("Agrega al menos una sección con contenido", "danger");
    return;
  }

  const originalText = btnPublicar.textContent;
  btnPublicar.disabled = true;
  btnPublicar.textContent = "Publicando...";

  try {
    console.log(`Publicando: ${JSON.stringify(post)}`);
    let response;

    const isEdit = isEditMode && currentPostId;
    if (isEdit) {
      response = await fetch(
        `${API_BASE_URL}${API_POSTS_ENDPOINT}/${currentPostId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(post),
        }
      );
    } else {
      response = await fetch(`${API_BASE_URL}${API_POSTS_ENDPOINT}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
      });
    }

    if (response.status === 204) {
      const modal = new bootstrap.Modal(document.getElementById("shareModal"));
      modal.show();

      localStorage.removeItem("compositeDraft");
    } else {
      showStatus("Error al publicar. Intenta nuevamente.", "danger");
      console.error("Error status:", response.status);
    }
  } catch (error) {
    console.error("Error publishing:", error);
    showStatus("Error de conexión.", "danger");
  } finally {
    btnPublicar.disabled = false;
    btnPublicar.textContent = originalText;
  }
}

async function checkEditMode() {
  const urlParams = new URLSearchParams(window.location.search);
  currentPostId = urlParams.get("id");

  if (currentPostId) {
    isEditMode = true;
    await loadPostData(currentPostId);
  } else {
    isEditMode = false;
    updateModeIndicator();
    enableButtons();
  }
}

function showLoading(show) {
  if (show) {
    loadingOverlay.classList.remove("d-none");
  } else {
    loadingOverlay.classList.add("d-none");
  }
}

async function loadPostData(postId) {
  try {
    showLoading(true);

    const response = await fetch(
      `${API_BASE_URL}${API_POSTS_ENDPOINT}/${postId}`
    );

    if (!response.ok) {
      throw new Error("No se pudo cargar el post");
    }

    const post = await response.json();
    populateForm(post);
    // originalData = captureFormData();
    updateModeIndicator();
    enableButtons();
  } catch (error) {
    console.error("Error loading post:", error);
    showStatusMessage("Error al cargar el post. Redirigiendo...", "danger");

    setTimeout(() => {
      window.location.href = ADMIN_PANEL_URL;
    }, 2000);
  } finally {
    showLoading(false);
  }
}

function populateForm(post) {
  // const sections = [];
  //   qsa('.section-composite').forEach((sec, index) => {
  //     const paragraph = sec.querySelector('.section-paragraph').value;
  //     const subtitleInput = sec.querySelector('.section-subtitle');
  //     const imgEl = sec.querySelector('.section-image-container img');

  //     const secSubtitle = (!subtitleInput.parentElement.classList.contains('d-none')) ? subtitleInput.value : '';
  //     const secImage = (imgEl) ? imgEl.src : '';

  //     // Solo agregar si tiene párrafo (obligatorio)
  //     if (paragraph.trim()) {
  //       sections.push({
  //         paragraph,
  //         subtitle: secSubtitle,
  //         image: secImage,
  //         order: index + 1
  //       });
  //     }
  //   });
  // Basic fields
  title.value = post.title || "";
  subtitle.value = post.subtitle || "";
  author.value = post.author || "";

  // Cover image
  if (post.imagePost) {
    coverImage.value = post.imagePost;
    showCoverPreview(post.imagePost);
  }

  if (post.section && Array.isArray(post.section)) {
    post.section.forEach((section) => {
      createSection(section);
      if (window.addSection) {
        window.addSection(section);
      }
    });
  }

  // Trigger auto-resize for textareas
  // autoResizeTextarea(title);
}

function showCoverPreview(url) {
  const img = coverPreview.querySelector("img");
  img.src = url;
  img.onerror = () => {
    showStatusMessage("No se pudo cargar la imagen", "warning");
    removeCoverImage();
  };
  coverPreview.classList.remove("d-none");
}

function updateModeIndicator() {
  if (isEditMode) {
    modeIndicator.innerHTML = `
          <span class="edit-mode-badge">
            <i class="fa-solid fa-edit"></i>
            Editando
          </span>
        `;
  } else {
    modeIndicator.innerHTML = `
          <span class="create-mode-badge">
            <i class="fa-solid fa-plus"></i>
            Nuevo post
          </span>
        `;
  }
}

function autoResizeTextarea(textarea) {
  textarea.style.height = "auto";
  textarea.style.height = textarea.scrollHeight + "px";
}

function enableButtons() {
  btnGuardarDraft.disabled = false;
  btnPublicar.disabled = false;
}

function showStatusMessage(message, type = "info") {
  const statusDiv = document.createElement("div");
  statusDiv.className = `alert alert-${type} alert-dismissible fade show status-message`;
  statusDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
      `;

  document.body.appendChild(statusDiv);

  setTimeout(() => {
    statusDiv.remove();
  }, 5000);
}

document.addEventListener("DOMContentLoaded", async () => {
  initElements();
  initDate();
  bindEvents();
  await checkEditMode();
});
