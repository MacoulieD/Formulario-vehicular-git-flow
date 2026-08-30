// Espera a que el DOM esté listo antes de buscar elementos y renderizar la tabla
document.addEventListener('DOMContentLoaded', () => {
  // Referencias a la sección de la tabla, su cuerpo, el contador y el mensaje de "vacío"
  const recordsSection = document.getElementById('records');
  const recordsBody = document.getElementById('records-body');
  const recordsCount = document.getElementById('records-count');
  const emptyMessage = document.getElementById('empty-message');

  // Registros persistidos, compartidos con index.html a través de storage.js
  const records = loadVehiculoRecords();

  // Crea y agrega una fila de la tabla a partir de un registro
  function renderRecord(record) {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${record.placa}</td>
      <td>${VEHICULO_TIPO_LABELS[record.tipo] || record.tipo}</td>
      <td>${record.conductor}</td>
      <td>${record.hora}</td>
      <td>${record.espacio || '—'}</td>
    `;
    // Inserta arriba para que el más reciente quede primero
    recordsBody.prepend(row);
  }

  // Limpia y vuelve a pintar todos los registros guardados (uso al cargar la página)
  function renderAllRecords() {
    recordsBody.innerHTML = '';
    records.forEach(renderRecord);
  }

  // Sincroniza el contador y qué bloque mostrar según haya o no registros
  function updateRecordsCount() {
    recordsCount.textContent = `(${records.length})`;
    recordsSection.hidden = records.length === 0;
    emptyMessage.hidden = records.length > 0;
  }

  // Pinta la tabla y actualiza el estado apenas carga la página
  renderAllRecords();
  updateRecordsCount();
});
