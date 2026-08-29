const VEHICULO_STORAGE_KEY = 'vehiculo-registros';
const VEHICULO_TIPO_LABELS = { carro: 'Carro', moto: 'Moto', otro: 'Otro' };

function loadVehiculoRecords() {
  try {
    const raw = localStorage.getItem(VEHICULO_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (error) {
    return [];
  }
}

function saveVehiculoRecords(records) {
  localStorage.setItem(VEHICULO_STORAGE_KEY, JSON.stringify(records));
}
