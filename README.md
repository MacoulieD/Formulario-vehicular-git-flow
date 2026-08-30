Formulario de Vehículos — Git Flow

Aplicación web sencilla para gestionar el registro de ingreso de vehículos a un parqueadero, desarrollada como ejercicio práctico para aplicar el modelo de trabajo Git Flow, incluyendo el uso de ramas feature, develop, release y hotfix.

Funcionalidades
Registro de ingreso (index.html): formulario destinado al registro de vehículos mediante los campos de placa, tipo de vehículo, conductor, hora de ingreso y espacio asignado. Los datos son validados mediante las validaciones nativas de HTML y JavaScript antes de ser almacenados.
Persistencia de datos: cada registro es almacenado en localStorage del navegador, permitiendo conservar la información incluso después de recargar la página.
Visualización de registros (almacenamiento.html): presenta una tabla con todos los vehículos registrados, organizados desde el registro más reciente hasta el más antiguo. La información es obtenida del mismo almacenamiento utilizado por el formulario.
Estructura de archivos
Archivo Responsabilidad
index.html Interfaz correspondiente al formulario de registro de vehículos
almacenamiento.html Interfaz encargada de mostrar los vehículos registrados
style.css Hoja de estilos compartida entre ambas páginas
storage.js Gestiona el modelo de almacenamiento: clave de localStorage, loadVehiculoRecords() y saveVehiculoRecords(). Constituye la única fuente de información utilizada por script.js y almacenamiento.js
script.js Contiene la lógica del formulario, incluyendo validación, creación y almacenamiento de los registros
almacenamiento.js Administra la consulta de los registros y la construcción dinámica de la tabla
Ejecución

El proyecto no requiere procesos de compilación ni dependencias externas. Los archivos pueden ejecutarse como contenido estático utilizando un servidor local. Por ejemplo:

python -m http.server 8000

Posteriormente, se puede acceder a la aplicación desde:

http://localhost:8000/index.html

Flujo de trabajo — Git Flow

El proyecto implementa el modelo de ramificación Git Flow, utilizando diferentes tipos de ramas según el propósito de cada cambio:

main — contiene la versión estable y lista para producción. Cada versión liberada o corrección urgente finaliza en esta rama acompañada de una etiqueta de versión.
develop — funciona como rama principal de integración, donde se incorporan las funcionalidades desarrolladas antes de formar parte de una versión estable.
feature/_ — corresponde a ramas independientes destinadas al desarrollo de funcionalidades específicas. Se crean a partir de develop y, una vez finalizadas, se integran nuevamente en ella. Algunos ejemplos son feature/logicaformulario y feature/almacenamiento.
release/_ — se utilizan para preparar, verificar y estabilizar una nueva versión antes de integrarla en main.
hotfix/\* — permiten solucionar errores o realizar correcciones urgentes directamente sobre la versión estable ubicada en main, sin tener que esperar al siguiente ciclo de lanzamiento.
Ejemplo: Hotfix 1.0.1

La reorganización de la estructura del modelo de datos, incluyendo la separación de storage.js y la incorporación de almacenamiento.html, se implementó como una corrección sobre la versión 1.0.0.

Para completar correctamente el proceso mediante Git Flow se realizó el siguiente procedimiento:

Se creó la rama hotfix/1.0.1 a partir de la versión estable.
Se desarrollaron y confirmaron los cambios correspondientes al hotfix.
La rama hotfix/1.0.1 se integró en main.
Se creó la etiqueta v1.0.1 sobre la rama main para identificar la nueva versión.
Los cambios del hotfix también se integraron en develop, garantizando que la corrección permaneciera disponible para futuras versiones.
Una vez finalizado el proceso, se eliminó la rama hotfix/1.0.1, debido a que ya había cumplido su función.
Finalmente, se publicaron en el repositorio remoto las ramas actualizadas y la etiqueta correspondiente.
git checkout main
git merge --no-ff hotfix/1.0.1
git tag -a v1.0.1 -m "Hotfix 1.0.1"

git checkout develop
git merge --no-ff hotfix/1.0.1

git branch -d hotfix/1.0.1
git push origin main develop v1.0.1
Tecnologías utilizadas

El proyecto fue desarrollado utilizando HTML, CSS y JavaScript, sin implementar frameworks, librerías ni dependencias externas.
