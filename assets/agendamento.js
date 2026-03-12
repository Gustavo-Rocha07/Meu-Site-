// Fluxo de agendamento online
// Agora integrado ao Supabase (tabela agendamentos).

const AGENDAMENTO_STATE = {
  step: 1,
  procedimento: null,
  data: null,
  hora: null,
  paciente: {
    nome: null,
    telefone: null,
    data_nascimento: null,
    email: null,
    observacoes: null,
  },
};

// Navegação entre etapas --------------------------------------------------

function goToStep(step) {
  AGENDAMENTO_STATE.step = step;

  document.querySelectorAll('.step-panel').forEach((panel) => {
    const panelStep = Number(panel.getAttribute('data-step'));
    panel.classList.toggle('is-active', panelStep === step);
  });

  document.querySelectorAll('[data-step-indicator]').forEach((li) => {
    const liStep = Number(li.getAttribute('data-step-indicator'));
    li.classList.toggle('is-active', liStep === step);
  });

  if (step === 3) {
    renderTimeSlots();
  }

  if (step === 5) {
    fillResumo();
  }
}

function attachPrevStepButtons() {
  document.querySelectorAll('[data-prev-step]').forEach((btn) => {
    btn.addEventListener('click', () => {
      if (AGENDAMENTO_STATE.step > 1) {
        goToStep(AGENDAMENTO_STATE.step - 1);
      }
    });
  });
}

// STEP 1: PROCEDIMENTO ----------------------------------------------------

function initStep1() {
  const form = document.getElementById('step1-form');
  if (!form) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const selected = form.querySelector('input[name="procedimento"]:checked');
    if (!selected) return;
    AGENDAMENTO_STATE.procedimento = selected.value;
    goToStep(2);
  });
}

// STEP 2: DATA ------------------------------------------------------------

function initStep2() {
  const form = document.getElementById('step2-form');
  const dateInput = document.getElementById('step2-date');
  if (!form || !dateInput) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!dateInput.value) return;
    AGENDAMENTO_STATE.data = dateInput.value;
    goToStep(3);
  });
}

// STEP 3: HORÁRIO ---------------------------------------------------------

async function fetchAvailableTimes(date, procedimento) {
  const todosHorarios = [
    '09:00',
    '09:30',
    '10:00',
    '10:30',
    '11:00',
    '14:00',
    '15:00',
    '16:00',
  ];

  try {
    if (!window.supabase) {
      return todosHorarios;
    }

    const { data: agendamentos, error } = await window.supabase
      .from('agendamentos')
      .select('hora')
      .eq('data', date);

    if (error || !agendamentos) {
      console.error('Erro ao buscar horários ocupados:', error);
      return todosHorarios;
    }

    const ocupados = new Set(agendamentos.map((a) => a.hora));
    return todosHorarios.filter((hora) => !ocupados.has(hora));
  } catch (err) {
    console.error('Erro inesperado ao buscar horários:', err);
    return todosHorarios;
  }
}

async function renderTimeSlots() {
  const container = document.getElementById('time-slots');
  const nextBtn = document.getElementById('step3-next');
  if (!container || !nextBtn) return;

  container.innerHTML = '<p>Carregando horários disponíveis...</p>';
  nextBtn.disabled = true;

  const horarios = await fetchAvailableTimes(
    AGENDAMENTO_STATE.data,
    AGENDAMENTO_STATE.procedimento
  );

  container.innerHTML = '';

  if (!horarios || !horarios.length) {
    container.innerHTML =
      '<p>Não encontramos horários disponíveis para esta data. Escolha outro dia.</p>';
    return;
  }

  horarios.forEach((hora) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'slot-btn';
    button.textContent = hora;
    button.addEventListener('click', () => {
      AGENDAMENTO_STATE.hora = hora;
      document.querySelectorAll('.slot-btn').forEach((b) => {
        b.classList.toggle('is-selected', b === button);
      });
      nextBtn.disabled = false;
    });
    container.appendChild(button);
  });
}

function initStep3() {
  const nextBtn = document.getElementById('step3-next');
  if (!nextBtn) return;

  nextBtn.addEventListener('click', () => {
    if (!AGENDAMENTO_STATE.hora) return;
    goToStep(4);
  });
}

// STEP 4: DADOS DO PACIENTE ----------------------------------------------

function initStep4() {
  const form = document.getElementById('step4-form');
  if (!form) return;

  const nomeInput = document.getElementById('nome');
  const telefoneInput = document.getElementById('telefone');
  const nascimentoInput = document.getElementById('data_nascimento');
  const emailInput = document.getElementById('email');
  const obsInput = document.getElementById('observacoes');

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!nomeInput?.value || !telefoneInput?.value || !nascimentoInput?.value) return;

    AGENDAMENTO_STATE.paciente = {
      nome: nomeInput.value.trim(),
      telefone: telefoneInput.value.trim(),
      data_nascimento: nascimentoInput.value,
      email: emailInput?.value.trim() || null,
      observacoes: obsInput?.value.trim() || null,
    };

    goToStep(5);
  });
}

// STEP 5: CONFIRMAÇÃO -----------------------------------------------------

function fillResumo() {
  const { procedimento, data, hora, paciente } = AGENDAMENTO_STATE;
  const resumoProcedimento = document.getElementById('resumo-procedimento');
  const resumoData = document.getElementById('resumo-data');
  const resumoHora = document.getElementById('resumo-hora');
  const resumoPaciente = document.getElementById('resumo-paciente');

  if (resumoProcedimento) resumoProcedimento.textContent = procedimento || '—';
  if (resumoData) resumoData.textContent = data || '—';
  if (resumoHora) resumoHora.textContent = hora || '—';
  if (resumoPaciente) resumoPaciente.textContent = paciente.nome || '—';
}

async function createAgendamentoInSupabase() {
  const payload = {
    nome: AGENDAMENTO_STATE.paciente.nome,
    telefone: AGENDAMENTO_STATE.paciente.telefone,
    data_nascimento: AGENDAMENTO_STATE.paciente.data_nascimento,
    procedimento: AGENDAMENTO_STATE.procedimento,
    data: AGENDAMENTO_STATE.data,
    hora: AGENDAMENTO_STATE.hora,
    status: 'pendente',
    created_at: new Date().toISOString(),
  };

  if (!window.supabase) {
    console.warn('Supabase não encontrado, não será possível salvar no banco.');
    return;
  }

  const { error } = await window.supabase
    .from('agendamentos')
    .insert([payload]);

  if (error) {
    console.error('Erro ao salvar agendamento no Supabase:', error);
    throw error;
  }
}

function initStep5() {
  const btnConfirmar = document.getElementById('btn-confirmar');
  const mensagemSucesso = document.getElementById('mensagem-sucesso');
  if (!btnConfirmar) return;

  btnConfirmar.addEventListener('click', async () => {
    try {
      await createAgendamentoInSupabase();
      if (mensagemSucesso) {
        mensagemSucesso.hidden = false;
      }
      btnConfirmar.disabled = true;
    } catch (err) {
      console.error('Erro ao criar agendamento (esqueleto):', err);
    }
  });
}

// Inicialização geral -----------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
  goToStep(1);
  attachPrevStepButtons();
  initStep1();
  initStep2();
  initStep3();
  initStep4();
  initStep5();
});

