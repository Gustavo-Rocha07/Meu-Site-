// Configuração simples de login de demonstração
const DEMO_USER = {
  email: 'admin@clinica.com',
  password: 'admin123',
};

function handleLoginPage() {
  const form = document.getElementById('login-form');
  if (!form) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const email = /** @type {HTMLInputElement} */ (document.getElementById('email')).value.trim();
    const password = /** @type {HTMLInputElement} */ (document.getElementById('password')).value;

    if (email === DEMO_USER.email && password === DEMO_USER.password) {
      localStorage.setItem('admin_logged_in', 'true');
      window.location.href = 'dashboard.html';
    } else {
      alert('Credenciais inválidas. Use admin@clinica.com / admin123.');
    }
  });
}

function requireAuth() {
  const isLoggedIn = localStorage.getItem('admin_logged_in') === 'true';
  if (!isLoggedIn && !window.location.pathname.endsWith('/login.html')) {
    window.location.href = 'login.html';
  }
}

function handleLogout() {
  const btnLogout = document.getElementById('btn-logout');
  if (!btnLogout) return;

  btnLogout.addEventListener('click', () => {
    localStorage.removeItem('admin_logged_in');
    window.location.href = 'login.html';
  });
}

// Utilidades de localStorage ----------------------------------------------

function loadCollection(key) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function saveCollection(key, items) {
  localStorage.setItem(key, JSON.stringify(items));
}

// Tratamentos -------------------------------------------------------------

const KEY_TRATAMENTOS = 'admin_tratamentos';

function renderTratamentos() {
  const tableBody = document.querySelector('#table-tratamentos tbody');
  if (!tableBody) return;

  const emptyMsg = document.getElementById('tratamentos-empty-msg');
  const items = loadCollection(KEY_TRATAMENTOS);

  tableBody.innerHTML = '';

  if (!items.length) {
    if (emptyMsg) emptyMsg.style.display = 'block';
    return;
  }

  if (emptyMsg) emptyMsg.style.display = 'none';

  items.forEach((item) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${item.nome}</td>
      <td>${item.descricao}</td>
      <td>${item.imagem ? '<span class="pill pill-soft">com imagem</span>' : '<span class="pill pill-soft">sem imagem</span>'}</td>
      <td>
        <div class="table-actions">
          <button class="btn btn-icon" data-edit-tratamento="${item.id}" title="Editar">✏️</button>
          <button class="btn btn-icon btn-icon-danger" data-delete-tratamento="${item.id}" title="Excluir">🗑️</button>
        </div>
      </td>
    `;
    tableBody.appendChild(tr);
  });
}

function handleTratamentosPage() {
  const form = document.getElementById('form-tratamento');
  if (!form) return;

  const modal = document.getElementById('modal-tratamento');
  const titleEl = document.getElementById('modal-tratamento-title');
  const idInput = document.getElementById('tratamento-id');
  const nomeInput = document.getElementById('tratamento-nome');
  const descInput = document.getElementById('tratamento-descricao');
  const imgInput = document.getElementById('tratamento-imagem');

  document.querySelectorAll('[data-open-modal="modal-tratamento"]').forEach((btn) => {
    btn.addEventListener('click', () => {
      if (titleEl) titleEl.textContent = 'Novo tratamento';
      if (idInput) idInput.value = '';
      if (nomeInput) nomeInput.value = '';
      if (descInput) descInput.value = '';
      if (imgInput) imgInput.value = '';
      openModal(modal);
    });
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const id = idInput && idInput.value ? idInput.value : null;
    const nome = nomeInput && nomeInput.value.trim();
    const descricao = descInput && descInput.value.trim();
    const imagem = imgInput && imgInput.value.trim();

    if (!nome || !descricao) return;

    const items = loadCollection(KEY_TRATAMENTOS);

    if (id) {
      const idx = items.findIndex((t) => String(t.id) === String(id));
      if (idx !== -1) {
        items[idx] = { ...items[idx], nome, descricao, imagem };
      }
    } else {
      const newItem = {
        id: Date.now(),
        nome,
        descricao,
        imagem,
      };
      items.push(newItem);
    }

    saveCollection(KEY_TRATAMENTOS, items);
    renderTratamentos();
    closeModal(modal);
  });

  document.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;

    const editId = target.getAttribute('data-edit-tratamento');
    const deleteId = target.getAttribute('data-delete-tratamento');

    if (editId) {
      const items = loadCollection(KEY_TRATAMENTOS);
      const item = items.find((t) => String(t.id) === String(editId));
      if (!item) return;

      if (titleEl) titleEl.textContent = 'Editar tratamento';
      if (idInput) idInput.value = item.id;
      if (nomeInput) nomeInput.value = item.nome;
      if (descInput) descInput.value = item.descricao;
      if (imgInput) imgInput.value = item.imagem || '';
      openModal(modal);
    }

    if (deleteId) {
      if (!confirm('Deseja realmente excluir este tratamento?')) return;
      const items = loadCollection(KEY_TRATAMENTOS).filter((t) => String(t.id) !== String(deleteId));
      saveCollection(KEY_TRATAMENTOS, items);
      renderTratamentos();
    }
  });

  renderTratamentos();
}

// Depoimentos -------------------------------------------------------------

const TESTIMONIALS_TABLE = 'testimonials';

async function renderDepoimentos() {
  const tableBody = document.querySelector('#table-depoimentos tbody');
  if (!tableBody) return;

  const emptyMsg = document.getElementById('depoimentos-empty-msg');

  if (!window.supabase) {
    console.warn('Supabase não disponível para depoimentos.');
    if (emptyMsg) emptyMsg.style.display = 'block';
    return;
  }

  tableBody.innerHTML = '';
  if (emptyMsg) emptyMsg.style.display = 'block';

  const { data, error } = await window.supabase
    .from(TESTIMONIALS_TABLE)
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Erro ao carregar depoimentos:', error);
    return;
  }

  if (!data || !data.length) {
    return;
  }

  if (emptyMsg) emptyMsg.style.display = 'none';

  data.forEach((item) => {
    const tr = document.createElement('tr');
    const rating = item.rating || 0;
    const stars = '★'.repeat(rating) + '☆'.repeat(5 - rating);
    tr.innerHTML = `
      <td>${item.patient_name}</td>
      <td>${item.comment}</td>
      <td>${stars}</td>
      <td>
        <div class="table-actions">
          <button class="btn btn-icon" data-edit-depoimento="${item.id}" title="Editar">✏️</button>
          <button class="btn btn-icon btn-icon-danger" data-delete-depoimento="${item.id}" title="Excluir">🗑️</button>
        </div>
      </td>
    `;
    tableBody.appendChild(tr);
  });
}

function handleDepoimentosPage() {
  const form = document.getElementById('form-depoimento');
  if (!form) return;

  const modal = document.getElementById('modal-depoimento');
  const titleEl = document.getElementById('modal-depoimento-title');
  const idInput = document.getElementById('depoimento-id');
  const nomeInput = document.getElementById('depoimento-nome');
  const fotoInput = document.getElementById('depoimento-foto');
  const comentarioInput = document.getElementById('depoimento-comentario');
  const notaSelect = document.getElementById('depoimento-nota');

  document.querySelectorAll('[data-open-modal="modal-depoimento"]').forEach((btn) => {
    btn.addEventListener('click', () => {
      if (titleEl) titleEl.textContent = 'Novo depoimento';
      if (idInput) idInput.value = '';
      if (nomeInput) nomeInput.value = '';
      if (fotoInput) fotoInput.value = '';
      if (comentarioInput) comentarioInput.value = '';
      if (notaSelect) notaSelect.value = '';
      openModal(modal);
    });
  });

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const id = idInput && idInput.value ? idInput.value : null;
    const nome = nomeInput && nomeInput.value.trim();
    const comentario = comentarioInput && comentarioInput.value.trim();
    const nota = notaSelect && Number(notaSelect.value);

    if (!nome || !comentario || !nota) return;

    if (!window.supabase) return;

    try {
      if (id) {
        const { error } = await window.supabase
          .from(TESTIMONIALS_TABLE)
          .update({
            patient_name: nome,
            comment: comentario,
            rating: nota,
          })
          .eq('id', id);
        if (error) throw error;
      } else {
        const { error } = await window.supabase
          .from(TESTIMONIALS_TABLE)
          .insert([
            {
              patient_name: nome,
              comment: comentario,
              rating: nota,
              origin: 'admin',
            },
          ]);
        if (error) throw error;
      }

      await renderDepoimentos();
      closeModal(modal);
    } catch (err) {
      console.error('Erro ao salvar depoimento:', err);
    }
  });

  document.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;

    const editId = target.getAttribute('data-edit-depoimento');
    const deleteId = target.getAttribute('data-delete-depoimento');

    if (editId) {
      if (!window.supabase) return;
      window.supabase
        .from(TESTIMONIALS_TABLE)
        .select('*')
        .eq('id', editId)
        .single()
        .then(({ data, error }) => {
          if (error || !data) {
            console.error('Erro ao carregar depoimento para edição:', error);
            return;
          }

          if (titleEl) titleEl.textContent = 'Editar depoimento';
          if (idInput) idInput.value = data.id;
          if (nomeInput) nomeInput.value = data.patient_name || '';
          if (fotoInput) fotoInput.value = '';
          if (comentarioInput) comentarioInput.value = data.comment || '';
          if (notaSelect) notaSelect.value = String(data.rating || 5);
          openModal(modal);
        });
    }

    if (deleteId) {
      if (!confirm('Deseja realmente excluir este depoimento?')) return;
      if (!window.supabase) return;
      window.supabase
        .from(TESTIMONIALS_TABLE)
        .delete()
        .eq('id', deleteId)
        .then(({ error }) => {
          if (error) {
            console.error('Erro ao excluir depoimento:', error);
            return;
          }
          renderDepoimentos();
        });
    }
  });

  renderDepoimentos();
}

// Galeria -----------------------------------------------------------------

const KEY_GALERIA = 'admin_galeria';

function renderGaleria() {
  const container = document.getElementById('galeria-lista');
  if (!container) return;

  const emptyMsg = document.getElementById('galeria-empty-msg');
  const items = loadCollection(KEY_GALERIA);

  container.innerHTML = '';

  if (!items.length) {
    if (emptyMsg) emptyMsg.style.display = 'block';
    return;
  }

  if (emptyMsg) emptyMsg.style.display = 'none';

  items.forEach((item) => {
    const div = document.createElement('div');
    div.className = 'gallery-item';
    div.innerHTML = `
      <div class="gallery-thumb">
        <img src="${item.imagem}" alt="${item.descricao}">
      </div>
      <div class="gallery-meta">
        <p>${item.descricao}</p>
        <button class="btn btn-icon btn-icon-danger" data-delete-galeria="${item.id}" title="Excluir">🗑️</button>
      </div>
    `;
    container.appendChild(div);
  });
}

function handleGaleriaPage() {
  const form = document.getElementById('form-galeria');
  if (!form) return;

  const imgInput = document.getElementById('galeria-imagem');
  const descInput = document.getElementById('galeria-descricao');

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const imagem = imgInput && imgInput.value.trim();
    const descricao = descInput && descInput.value.trim();

    if (!imagem || !descricao) return;

    const items = loadCollection(KEY_GALERIA);
    items.push({
      id: Date.now(),
      imagem,
      descricao,
    });
    saveCollection(KEY_GALERIA, items);
    renderGaleria();

    if (imgInput) imgInput.value = '';
    if (descInput) descInput.value = '';
  });

  document.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    const deleteId = target.getAttribute('data-delete-galeria');
    if (!deleteId) return;

    if (!confirm('Deseja realmente excluir esta imagem da galeria?')) return;
    const items = loadCollection(KEY_GALERIA).filter((g) => String(g.id) !== String(deleteId));
    saveCollection(KEY_GALERIA, items);
    renderGaleria();
  });

  renderGaleria();
}

// Agendamentos ------------------------------------------------------------

const KEY_AGENDAMENTOS = 'admin_agendamentos';

function seedAgendamentosIfEmpty() {
  const existing = loadCollection(KEY_AGENDAMENTOS);
  if (existing.length) return;

  const hoje = new Date();
  const baseDate = hoje.toISOString().slice(0, 10);
  const dataAmanha = new Date(hoje.getTime() + 24 * 60 * 60 * 1000).toISOString().slice(0, 10);

  const mocks = [
    {
      id: Date.now(),
      paciente: 'João Silva',
      telefone: '(11) 99999-0001',
      procedimento: 'Implante unitário',
      data: baseDate,
      hora: '09:00',
      status: 'confirmado',
    },
    {
      id: Date.now() + 1,
      paciente: 'Maria Oliveira',
      telefone: '(11) 99999-0002',
      procedimento: 'Carga imediata',
      data: baseDate,
      hora: '11:00',
      status: 'pendente',
    },
    {
      id: Date.now() + 2,
      paciente: 'Carlos Souza',
      telefone: '(11) 99999-0003',
      procedimento: 'Reabilitação oral',
      data: dataAmanha,
      hora: '14:30',
      status: 'pendente',
    },
  ];

  saveCollection(KEY_AGENDAMENTOS, mocks);
}

function statusBadge(status) {
  const map = {
    pendente: { label: 'Pendente', className: 'pill-soft' },
    confirmado: { label: 'Confirmado', className: 'pill-green' },
    cancelado: { label: 'Cancelado', className: 'pill-soft' },
    realizado: { label: 'Realizado', className: 'pill-green' },
  };
  const cfg = map[status] ?? map.pendente;
  return `<span class="pill ${cfg.className}">${cfg.label}</span>`;
}

function renderAgendamentos() {
  const tableBody = document.querySelector('#table-agendamentos tbody');
  if (!tableBody) return;

  const emptyMsg = document.getElementById('agendamentos-empty-msg');
  const items = loadCollection(KEY_AGENDAMENTOS);

  tableBody.innerHTML = '';

  if (!items.length) {
    if (emptyMsg) emptyMsg.style.display = 'block';
    return;
  }

  if (emptyMsg) emptyMsg.style.display = 'none';

  items
    .slice()
    .sort((a, b) => {
      const da = `${a.data}T${a.hora}`;
      const db = `${b.data}T${b.hora}`;
      return da.localeCompare(db);
    })
    .forEach((item) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${item.paciente}</td>
        <td>${item.telefone}</td>
        <td>${item.procedimento}</td>
        <td>${item.data}</td>
        <td>${item.hora}</td>
        <td>${statusBadge(item.status)}</td>
        <td>
          <div class="table-actions">
            <button class="btn btn-icon" data-edit-agendamento="${item.id}" title="Atualizar status">✏️</button>
            <button class="btn btn-icon btn-icon-danger" data-delete-agendamento="${item.id}" title="Excluir">🗑️</button>
          </div>
        </td>
      `;
      tableBody.appendChild(tr);
    });
}

function handleAgendamentosPage() {
  const table = document.getElementById('table-agendamentos');
  if (!table) return;

  seedAgendamentosIfEmpty();

  const modal = document.getElementById('modal-agendamento');
  const idInput = document.getElementById('agendamento-id');
  const statusSelect = document.getElementById('agendamento-status');
  const form = document.getElementById('form-agendamento');

  const createForm = document.getElementById('form-novo-agendamento');
  if (createForm) {
    const nomeInput = document.getElementById('novo-nome');
    const telInput = document.getElementById('novo-telefone');
    const procInput = document.getElementById('novo-procedimento');
    const dataInput = document.getElementById('novo-data');
    const horaInput = document.getElementById('novo-hora');

    createForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const paciente = nomeInput && nomeInput.value.trim();
      const telefone = telInput && telInput.value.trim();
      const procedimento = procInput && procInput.value.trim();
      const data = dataInput && dataInput.value;
      const hora = horaInput && horaInput.value;

      if (!paciente || !telefone || !procedimento || !data || !hora) return;

      const items = loadCollection(KEY_AGENDAMENTOS);
      items.push({
        id: Date.now(),
        paciente,
        telefone,
        procedimento,
        data,
        hora,
        status: 'pendente',
        origem: 'admin',
      });
      saveCollection(KEY_AGENDAMENTOS, items);
      renderAgendamentos();
      createForm.reset();
    });
  }

  document.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;

    const editId = target.getAttribute('data-edit-agendamento');
    const deleteId = target.getAttribute('data-delete-agendamento');

    if (editId) {
      const items = loadCollection(KEY_AGENDAMENTOS);
      const item = items.find((a) => String(a.id) === String(editId));
      if (!item) return;
      if (idInput) idInput.value = item.id;
      if (statusSelect) statusSelect.value = item.status;
      openModal(modal);
    }

    if (deleteId) {
      if (!confirm('Deseja realmente excluir este agendamento?')) return;
      const items = loadCollection(KEY_AGENDAMENTOS).filter((a) => String(a.id) !== String(deleteId));
      saveCollection(KEY_AGENDAMENTOS, items);
      renderAgendamentos();
    }
  });

  form?.addEventListener('submit', (event) => {
    event.preventDefault();
    const id = idInput && idInput.value;
    const status = statusSelect && statusSelect.value;
    if (!id || !status) return;
    const items = loadCollection(KEY_AGENDAMENTOS);
    const idx = items.findIndex((a) => String(a.id) === String(id));
    if (idx !== -1) {
      items[idx] = { ...items[idx], status };
      saveCollection(KEY_AGENDAMENTOS, items);
      renderAgendamentos();
    }
    closeModal(modal);
  });

  renderAgendamentos();
}

// Dashboard ---------------------------------------------------------------

function handleDashboardPage() {
  const metricToday = document.getElementById('metric-today-appointments');
  const metricWeek = document.getElementById('metric-week-appointments');
  const metricNewPatients = document.getElementById('metric-new-patients');
  const metricMessages = document.getElementById('metric-pending-messages');
  const nextList = document.getElementById('next-appointments-list');

  if (!metricToday || !metricWeek || !metricNewPatients || !metricMessages || !nextList) return;

  seedAgendamentosIfEmpty();
  const ags = loadCollection(KEY_AGENDAMENTOS);

  const hojeStr = new Date().toISOString().slice(0, 10);
  const hoje = ags.filter((a) => a.data === hojeStr);
  metricToday.textContent = String(hoje.length);

  const hojeDate = new Date(hojeStr);
  const domingo = new Date(hojeDate);
  domingo.setDate(hojeDate.getDate() + (7 - hojeDate.getDay()));
  const domingoStr = domingo.toISOString().slice(0, 10);

  const semana = ags.filter((a) => a.data >= hojeStr && a.data <= domingoStr);
  metricWeek.textContent = String(semana.length);

  metricNewPatients.textContent = String(Math.max(3, semana.length));
  metricMessages.textContent = String(Math.max(1, Math.floor(semana.length / 2)));

  nextList.innerHTML = '';

  semana
    .slice()
    .sort((a, b) => {
      const da = `${a.data}T${a.hora}`;
      const db = `${b.data}T${b.hora}`;
      return da.localeCompare(db);
    })
    .slice(0, 5)
    .forEach((item) => {
      const li = document.createElement('li');
      li.innerHTML = `
        <span>${item.data} ${item.hora} — ${item.paciente}</span>
        ${statusBadge(item.status)}
      `;
      nextList.appendChild(li);
    });
}

// Modal helpers -----------------------------------------------------------

function openModal(modal) {
  if (!modal) return;
  modal.setAttribute('data-open', 'true');
  modal.setAttribute('aria-hidden', 'false');
}

function closeModal(modal) {
  if (!modal) return;
  modal.removeAttribute('data-open');
  modal.setAttribute('aria-hidden', 'true');
}

function setupModalListeners() {
  document.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;

    if (target.hasAttribute('data-close-modal')) {
      const modal = target.closest('.modal');
      if (modal) closeModal(modal);
    }
  });
}

// Inicialização -----------------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
  if (window.location.pathname.endsWith('/login.html')) {
    handleLoginPage();
    return;
  }

  requireAuth();
  handleLogout();
  setupModalListeners();

  if (document.getElementById('table-tratamentos')) handleTratamentosPage();
  if (document.getElementById('table-depoimentos')) handleDepoimentosPage();
  if (document.getElementById('galeria-lista')) handleGaleriaPage();
  if (document.getElementById('table-agendamentos')) handleAgendamentosPage();
  if (document.getElementById('metric-today-appointments')) handleDashboardPage();
});

