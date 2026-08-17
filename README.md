# PruebaTecnicaCastores

Proyecto full-stack desarrollado como prueba técnica, compuesto por un backend en Spring Boot y un frontend en React.

---

## Tecnologías y Herramientas

* **Editor usado:** Visual Studio Code
* **Base de Datos:** MySQL Workbench 8.0
* **Backend:**
  * Java 17
  * Spring Boot 4.1.0
  * Gradle
* **Frontend:**
  * Node.js 24.19.0
  * React 19.2.8

---

## Pasos para Ejecutar la Aplicación

### 1. Base de Datos
1. Abre MySQL Workbench.
2. Ejecuta el script `PruebaInventario.sql` para crear la base de datos y sus tablas asociadas.

### 2. Configuración del Backend
1. Abre el proyecto backend en tu IDE o editor.
2. Navega a `src/main/resources/application.properties`.
3. Ajusta las credenciales de conexión a tu base de datos local (usuario, contraseña y URL).

---

## Instalación de Dependencias
Abre una terminal independiente para cada proyecto y ejecuta los siguientes comandos:

* **Backend (Spring Boot):**
  `./gradlew build --refresh-dependencies`

* **Backend (Spring Boot):**
  `npm install`

## Ejecución de proyecto
Con las dependencias instaladas, ejecuta ambos proyectos en sus respectivas terminales:

* **Backend**
  `./gradlew bootRun`
  
* **Frontend**
  `npm run dev`
