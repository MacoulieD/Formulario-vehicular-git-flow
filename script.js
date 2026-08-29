document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.form');
  const statusMessage = document.getElementById('status-message');

  const PLACA_PATTERN = /^[A-Z0-9-]+$/;

  const records = loadVehiculoRecords();

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

  function showStatusMessage(text) {
    if (!statusMessage) return;
    statusMessage.textContent = text;
    statusMessage.hidden = false;
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
    saveVehiculoRecords(records);

    showStatusMessage(`Vehículo ${record.placa} registrado correctamente.`);
    form.reset();
    form.placa.focus();
  }

  form.addEventListener('submit', handleSubmit);
});
