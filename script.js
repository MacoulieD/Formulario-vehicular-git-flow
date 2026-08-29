document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.form');
  const recordsSection = document.getElementById('records');
  const recordsList = document.getElementById('records-list');
  const recordsCount = document.getElementById('records-count');

  const TIPO_LABELS = { carro: 'Carro', moto: 'Moto', otro: 'Otro' };
  const PLACA_PATTERN = /^[A-Z0-9-]+$/;

  const records = [];

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
    const item = document.createElement('li');
    item.className = 'records__item';

    const detalle = [
      record.placa,
      TIPO_LABELS[record.tipo] || record.tipo,
      record.conductor,
      record.hora,
    ];
    if (record.espacio) {
      detalle.push(`Espacio ${record.espacio}`);
    }

    item.textContent = detalle.join(' · ');
    recordsList.prepend(item);
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
    renderRecord(record);
    updateRecordsCount();

    form.reset();
    form.placa.focus();
  }

  form.addEventListener('submit', handleSubmit);
});
