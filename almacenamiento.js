document.addEventListener('DOMContentLoaded', () => {
  const recordsSection = document.getElementById('records');
  const recordsBody = document.getElementById('records-body');
  const recordsCount = document.getElementById('records-count');
  const emptyMessage = document.getElementById('empty-message');

  const records = loadVehiculoRecords();

  function renderRecord(record) {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${record.placa}</td>
      <td>${VEHICULO_TIPO_LABELS[record.tipo] || record.tipo}</td>
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
    emptyMessage.hidden = records.length > 0;
  }

  renderAllRecords();
  updateRecordsCount();
});
