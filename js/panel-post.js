// Configuración del API
const API_BASE_URL = 'https://tu-api-blog.example.com';
const API_POSTS_ENDPOINT = '/posts';
const API_TOKEN = '';

// Estado
const state = {
  post: {
    title: '',
    subtitle: '',
    coverImage: '',
    author: 'Ronald Bismar Limachi Mamani',
    tags: [],
    sections: [],
  },
};

// Utilidades
const qs = (sel) => document.querySelector(sel);
const qsa = (sel) => Array.from(document.querySelectorAll(sel));

// Set Date
function initDate() {
  const dateSpan = qs('#currentDate');
  if (dateSpan) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    dateSpan.textContent = new Date().toLocaleDateString('es-ES', options);
  }
}

function showStatus(message, type = 'success') {
  const status = qs('#statusArea');
  status.classList.remove('d-none', 'alert-success', 'alert-danger');
  status.classList.add(type === 'success' ? 'alert-success' : 'alert-danger');
  status.textContent = message;
  setTimeout(() => status.classList.add('d-none'), 3000);
}

// Auto-resize textarea
function autoResize(textarea) {
  textarea.style.height = 'auto';
  textarea.style.height = textarea.scrollHeight + 'px';
}

// Crear una Sección Compuesta
function createSection(data = {}) {
  const container = qs('#sectionsContainer');
  const sectionId = 'section-' + Date.now();

  const wrapper = document.createElement('div');
  wrapper.className = 'section-composite';
  wrapper.id = sectionId;

  // Floating Actions (Delete, Move)
  const floatingActions = document.createElement('div');
  floatingActions.className = 'section-actions-floating';
  floatingActions.innerHTML = `
        <button type="button" class="btn btn-sm text-muted btnMoveUp" title="Subir"><i class="fa-solid fa-arrow-up"></i></button>
        <button type="button" class="btn btn-sm text-muted btnMoveDown" title="Bajar"><i class="fa-solid fa-arrow-down"></i></button>
        <button type="button" class="btn btn-sm text-danger btnRemove" title="Eliminar"><i class="fa-solid fa-trash"></i></button>
    `;

  // Toolbar (Add Subtitle, Add Image)
  const toolbar = document.createElement('div');
  toolbar.className = 'section-toolbar';
  toolbar.innerHTML = `
        <button type="button" class="btn-tool btnToggleSubtitle ${data.subtitle ? 'active' : ''}"><i class="fa-solid fa-heading"></i> Subtítulo</button>
        <button type="button" class="btn-tool btnToggleImage ${data.image ? 'active' : ''}"><i class="fa-solid fa-image"></i> Imagen</button>
    `;

  // Content Container
  const contentDiv = document.createElement('div');
  contentDiv.className = 'section-content';

  // 1. Subtitle (Optional)
  const subtitleContainer = document.createElement('div');
  subtitleContainer.className = `mb-2 ${data.subtitle ? '' : 'd-none'}`;
  subtitleContainer.innerHTML = `
        <input type="text" class="form-control-plaintext section-subtitle" placeholder="Escribe un subtítulo..." value="${data.subtitle || ''}">
    `;

  // 2. Image (Optional)
  const imageContainer = document.createElement('div');
  imageContainer.className = `section-image-container ${data.image ? '' : 'd-none'}`;

  // Image Logic
  const renderImageInput = () => {
    imageContainer.innerHTML = '';
    if (data.image) {
      const img = document.createElement('img');
      img.src = data.image;

      const btnRemoveImg = document.createElement('button');
      btnRemoveImg.className = 'btn btn-sm btn-light position-absolute top-0 end-0 m-2';
      btnRemoveImg.innerHTML = '<i class="fa-solid fa-times"></i>';
      btnRemoveImg.onclick = () => {
        data.image = '';
        renderImageInput();
        toolbar.querySelector('.btnToggleImage').classList.remove('active');
        imageContainer.classList.add('d-none');
      };

      imageContainer.appendChild(img);
      imageContainer.appendChild(btnRemoveImg);
    } else {
      const inputDiv = document.createElement('div');
      inputDiv.className = 'section-image-input';
      inputDiv.innerHTML = `
                <p class="text-muted mb-2">Pega la URL de la imagen</p>
                <input type="url" class="form-control form-control-sm text-center mx-auto" style="max-width: 300px;" placeholder="https://...">
            `;
      const input = inputDiv.querySelector('input');
      input.addEventListener('change', (e) => {
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
  const paragraphContainer = document.createElement('div');
  paragraphContainer.innerHTML = `
        <textarea class="form-control-plaintext section-paragraph" rows="1" placeholder="Escribe tu historia...">${data.paragraph || ''}</textarea>
    `;
  const textarea = paragraphContainer.querySelector('textarea');
  textarea.addEventListener('input', () => autoResize(textarea));
  setTimeout(() => autoResize(textarea), 0);

  // Assemble
  contentDiv.appendChild(subtitleContainer);
  contentDiv.appendChild(imageContainer);
  contentDiv.appendChild(paragraphContainer);

  wrapper.appendChild(floatingActions);
  wrapper.appendChild(toolbar);
  wrapper.appendChild(contentDiv);
  container.appendChild(wrapper);

  // Bind Events
  // Toggle Subtitle
  toolbar.querySelector('.btnToggleSubtitle').addEventListener('click', (e) => {
    const btn = e.currentTarget;
    btn.classList.toggle('active');
    subtitleContainer.classList.toggle('d-none');
    if (!subtitleContainer.classList.contains('d-none')) {
      subtitleContainer.querySelector('input').focus();
    } else {
      subtitleContainer.querySelector('input').value = '';
    }
  });

  // Toggle Image
  toolbar.querySelector('.btnToggleImage').addEventListener('click', (e) => {
    const btn = e.currentTarget;
    btn.classList.toggle('active');
    imageContainer.classList.toggle('d-none');
    if (imageContainer.classList.contains('d-none')) {
      data.image = '';
      renderImageInput();
    }
  });

  // Remove Section
  wrapper.querySelector('.btnRemove').addEventListener('click', () => {
    if (container.children.length > 1) {
      wrapper.remove();
    } else {
      showStatus('Debe haber al menos una sección', 'danger');
    }
  });

  // Move Up/Down
  wrapper.querySelector('.btnMoveUp').addEventListener('click', () => {
    if (wrapper.previousElementSibling) wrapper.parentElement.insertBefore(wrapper, wrapper.previousElementSibling);
  });
  wrapper.querySelector('.btnMoveDown').addEventListener('click', () => {
    if (wrapper.nextElementSibling) wrapper.parentElement.insertBefore(wrapper.nextElementSibling, wrapper);
  });

  return wrapper;
}

// Recolectar datos
function collectPost() {
  const title = qs('#title').value.trim();
  const subtitle = qs('#subtitle').value.trim();
  const coverImage = qs('#coverImage').value.trim();

  const sections = [];
  qsa('.section-composite').forEach((sec, index) => {
    const paragraph = sec.querySelector('.section-paragraph').value;
    const subtitleInput = sec.querySelector('.section-subtitle');
    const imgEl = sec.querySelector('.section-image-container img');

    const secSubtitle = (!subtitleInput.parentElement.classList.contains('d-none')) ? subtitleInput.value : '';
    const secImage = (imgEl) ? imgEl.src : '';

    // Solo agregar si tiene párrafo (obligatorio)
    if (paragraph.trim()) {
      sections.push({
        paragraph,
        subtitle: secSubtitle,
        image: secImage,
        order: index + 1
      });
    }
  });

  return {
    title,
    subtitle,
    coverImage,
    datePost: new Date().toISOString(),
    timeRead: '5 min',
    imagePost: coverImage,
    author: 'Admin',
    section: sections
  };
}

// Guardar Borrador
function saveDraft() {
  const post = collectPost();
  localStorage.setItem('compositeDraft', JSON.stringify(post));
  showStatus('Borrador guardado');
}

// Cargar Borrador
function loadDraft() {
  try {
    const raw = localStorage.getItem('compositeDraft');
    if (!raw) {
      createSection(); // Default initial section
      return;
    }
    const draft = JSON.parse(raw);

    qs('#title').value = draft.title || '';
    qs('#subtitle').value = draft.subtitle || '';
    if (draft.coverImage) {
      qs('#coverImage').value = draft.coverImage;
      // Trigger change event manually if needed or update preview
      const preview = qs('#coverPreview');
      const img = preview.querySelector('img');
      img.src = draft.coverImage;
      preview.classList.remove('d-none');
      qs('#coverImage').classList.add('d-none');
    }

    qs('#sectionsContainer').innerHTML = '';
    if (draft.section && draft.section.length > 0) {
      draft.section.forEach(s => createSection(s));
    } else {
      createSection();
    }
  } catch (e) {
    console.error(e);
    createSection();
  }
}

// Event Listeners
function bindEvents() {
  // Cover Image
  qs('#coverImage').addEventListener('change', (e) => {
    const url = e.target.value;
    if (url) {
      const preview = qs('#coverPreview');
      const img = preview.querySelector('img');
      img.src = url;
      preview.classList.remove('d-none');
      qs('#coverImage').classList.add('d-none');
    }
  });
  qs('#btnRemoveCover').addEventListener('click', () => {
    const preview = qs('#coverPreview');
    preview.classList.add('d-none');
    qs('#coverImage').classList.remove('d-none');
    qs('#coverImage').value = '';
  });

  // Add Section
  qs('#btnAddSection').addEventListener('click', () => createSection());

  qs('#btnGuardarDraft').addEventListener('click', saveDraft);

  qs('#btnPublicar').addEventListener('click', async () => {
    const post = collectPost();
    console.log('Publishing:', post);
    if (post.section.length === 0) {
      showStatus('Agrega al menos una sección con contenido', 'danger');
      return;
    }

    // Simulate success
    const modal = new bootstrap.Modal(document.getElementById('shareModal'));
    modal.show();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  bindEvents();
  loadDraft();
});