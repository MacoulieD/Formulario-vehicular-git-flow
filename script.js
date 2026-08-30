// Espera a que el DOM esté listo antes de buscar elementos y enlazar eventos
document.addEventListener('DOMContentLoaded', () => {
  // Referencias a los elementos del formulario y al mensaje de confirmación
  const form = document.querySelector('.form');
  const statusMessage = document.getElementById('status-message');

  // Solo letras, números y guiones para la placa (coincide con el pattern del input)
  const PLACA_PATTERN = /^[A-Z0-9-]+$/;

  // Registros existentes cargados desde storage.js; se van agregando en memoria durante la sesión
  const records = loadVehiculoRecords();

  // Lee y normaliza los valores del formulario: placa en mayúsculas, textos sin espacios extra
  function getFormValues(form) {
    return {
      placa: form.placa.value.trim().toUpperCase(),
      tipo: form.tipo.value,
      conductor: form.conductor.value.trim(),
      hora: form.hora.value,
      espacio: form.espacio.value.trim(),
    };
  }

  // Valida las reglas de negocio del registro; retorna la lista de errores encontrados
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

  // Arma el objeto final del registro, agregando un id único basado en el timestamp
  function createRecord(data) {
    return { id: Date.now(), ...data };
  }

  // Muestra el mensaje de confirmación debajo del formulario
  function showStatusMessage(text) {
    if (!statusMessage) return;
    statusMessage.textContent = text;
    statusMessage.hidden = false;
  }

  // Orquesta el envío del formulario: valida, guarda y limpia
  function handleSubmit(event) {
    // Evita el envío real (recarga de página) ya que todo se maneja por JS
    event.preventDefault();

    // Validación nativa del navegador (required, pattern, type=time, etc.)
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const data = getFormValues(form);
    const errors = validateRecord(data);

    // Validación de negocio adicional a la nativa del HTML
    if (errors.length > 0) {
      alert(errors.join('\n'));
      return;
    }

    const record = createRecord(data);
    records.push(record);
    // Persiste el registro para que almacenamiento.html pueda leerlo
    saveVehiculoRecords(records);

    showStatusMessage(`Vehículo ${record.placa} registrado correctamente.`);
    // Limpia el formulario y regresa el foco a la placa para el siguiente registro
    form.reset();
    form.placa.focus();
  }

  // Enlaza la lógica de envío al evento submit del formulario
  form.addEventListener('submit', handleSubmit);
});
