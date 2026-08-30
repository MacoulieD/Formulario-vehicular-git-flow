# Formulario Vehículo — Git Flow

Aplicación web simple para registrar el ingreso de vehículos a un parqueadero, usada como ejercicio práctico de **Git Flow** (features, develop, release, hotfix).

## Funcionalidades

- **Registro de ingreso** (`index.html`): formulario con placa, tipo de vehículo, conductor, hora de ingreso y espacio asignado. Valida los campos (nativo + JS) antes de guardar.
- **Persistencia**: cada registro se guarda en `localStorage` del navegador, por lo que sobrevive a recargas de página.
- **Listado de registrados** (`almacenamiento.html`): tabla con todos los vehículos guardados, más reciente primero, leída del mismo storage que usa el formulario.

## Estructura de archivos

| Archivo | Responsabilidad |
|---|---|
| `index.html` | Formulario de registro |
| `almacenamiento.html` | Listado/tabla de vehículos registrados |
| `style.css` | Estilos compartidos por ambas páginas |
| `storage.js` | Modelo de datos: clave de `localStorage`, `loadVehiculoRecords()`, `saveVehiculoRecords()` — única fuente de verdad, usada por `script.js` y `almacenamiento.js` |
| `script.js` | Lógica del formulario: validación, creación del registro, guardado |
| `almacenamiento.js` | Lógica del listado: lee los registros y arma la tabla |

## Cómo ejecutar

No requiere build ni dependencias. Basta con servir los archivos estáticos, por ejemplo:

```bash
python -m http.server 8000
```

y abrir `http://localhost:8000/index.html` en el navegador.

## Flujo de trabajo (Git Flow)

El repositorio sigue el modelo de ramas de Git Flow:

- **`main`** — código en producción, siempre estable. Cada release/hotfix termina acá con una tag de versión.
- **`develop`** — rama de integración de las features en curso.
- **`feature/*`** — una rama por funcionalidad, creada desde `develop` y mergeada de vuelta a `develop` al terminar (ej. `feature/logicaformulario`, `feature/almacenamiento`).
- **`release/*`** — estabiliza una versión antes de pasarla a `main`.
- **`hotfix/*`** — corrige algo urgente directamente sobre `main`, sin esperar el próximo release.

### Ejemplo: hotfix `1.0.1`

La reorganización del modelo de negocio (separar `storage.js` del resto y crear `almacenamiento.html`) se aplicó como hotfix sobre la versión `1.0.0`, siguiendo el cierre estándar de Git Flow:

1. Se creó la rama `hotfix/1.0.1` con el fix.
2. Merge de `hotfix/1.0.1` → `main`.
3. Se etiquetó `main` con la tag `v1.0.1`.
4. Merge de `hotfix/1.0.1` → `develop`, para que la próxima release también incluya la corrección.
5. Se eliminó la rama `hotfix/1.0.1` (ya cumplió su propósito) y se publicaron los cambios (`main`, `develop` y la tag) a `origin`.

```bash
git checkout main
git merge --no-ff hotfix/1.0.1
git tag -a v1.0.1 -m "Hotfix 1.0.1"

git checkout develop
git merge --no-ff hotfix/1.0.1

git branch -d hotfix/1.0.1
git push origin main develop v1.0.1
```

## Tecnologías

HTML, CSS y JavaScript sin frameworks ni dependencias externas.
