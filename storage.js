// Clave usada en localStorage para guardar el arreglo de registros de vehículos
const VEHICULO_STORAGE_KEY = 'vehiculo-registros';

// Traduce el value del <select> a un texto legible para mostrar en pantalla
const VEHICULO_TIPO_LABELS = { carro: 'Carro', moto: 'Moto', otro: 'Otro' };

// Lee los registros persistidos en localStorage y los devuelve como array de objetos
function loadVehiculoRecords() {
  try {
    const raw = localStorage.getItem(VEHICULO_STORAGE_KEY);
    // Si nunca se guardó nada, se retorna un array vacío en vez de null
    return raw ? JSON.parse(raw) : [];
  } catch (error) {
    // JSON corrupto o localStorage no disponible: se continúa sin registros
    return [];
  }
}

// Serializa y guarda el arreglo completo de registros en localStorage
function saveVehiculoRecords(records) {
  localStorage.setItem(VEHICULO_STORAGE_KEY, JSON.stringify(records));
}
