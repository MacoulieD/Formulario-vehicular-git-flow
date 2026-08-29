document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.form');
  const recordsSection = document.getElementById('records');
  const recordsBody = document.getElementById('records-body');
  const recordsCount = document.getElementById('records-count');

  const STORAGE_KEY = 'vehiculo-registros';
  const TIPO_LABELS = { carro: 'Carro', moto: 'Moto', otro: 'Otro' };
  const PLACA_PATTERN = /^[A-Z0-9-]+$/;

  function loadRecords() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (error) {
      return [];
    }
  }

  function saveRecords(records) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
  }

  const records = loadRecords();

  function getFormValues(form) {
    return {
      placa: form.placa.value.trim().toUpperCase(),
      tipo: form.tipo.value,
      conductor: form.conductor.value.trim(),
      hora: form.hora.value,
      espacio: form.espacio.value.trim(),
    };
  }

  function validateRecord(data) {
    const errors = [];

    if (!data.placa || !PLACA_PATTERN.test(data.placa)) {
      errors.push('La placa es inválida.');
    }
    if (!data.tipo) {
      errors.push('Seleccione un tipo de vehículo.');
    }
    if (!data.conductor) {
      errors.push('El nombre del conductor es obligatorio.');
    }
    if (!data.hora) {
      errors.push('La hora de ingreso es obligatoria.');
    }

    return errors;
  }

  function createRecord(data) {
    return { id: Date.now(), ...data };
  }

  function renderRecord(record) {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${record.placa}</td>
      <td>${TIPO_LABELS[record.tipo] || record.tipo}</td>
      <td>${record.conductor}</td>
      <td>${record.hora}</td>
      <td>${record.espacio || '—'}</td>
    `;
    recordsBody.prepend(row);
  }

  function renderAllRecords() {
    recordsBody.innerHTML = '';
    records.forEach(renderRecord);
  }

  function updateRecordsCount() {
    recordsCount.textContent = `(${records.length})`;
    recordsSection.hidden = records.length === 0;
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const data = getFormValues(form);
    const errors = validateRecord(data);

    if (errors.length > 0) {
      alert(errors.join('\n'));
      return;
    }

    const record = createRecord(data);
    records.push(record);
    saveRecords(records);
    renderRecord(record);
    updateRecordsCount();

    form.reset();
    form.placa.focus();
  }

  renderAllRecords();
  updateRecordsCount();
  form.addEventListener('submit', handleSubmit);
});
