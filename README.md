# Giraffe Royale Casino:Proyecto Transversal 2º DAW

## Introducción

Este proyecto transversal tiene como objetivo el desarrollo de un **casino online** completamente funcional, integrando conocimientos adquiridos en diversas áreas del desarrollo web. A lo largo del proyecto, abordamos el proceso completo de creación de una aplicación web, desde el diseño de interfaces hasta su despliegue final.

La propuesta consiste en construir una plataforma de juegos de azar donde varios usuarios podrán acceder a diferentes juegos, gestionar su saldo y disfrutar de una experiencia inmersiva. Para diferenciar este casino en particular, se ha definido una **identidad visual única con temática de jungla**, incluyendo:

- **Nombre del casino**
- **Logo e iconografía corporativa**
- **Paleta de colores distintiva**
- **Imágenes y elementos gráficos personalizados**

El acceso a la plataforma se realizará mediante un **sistema de autenticación**, permitiendo a los usuarios registrarse y acceder a su cuenta. Además, existirá la opción de registrarse como **usuario VIP**, lo que requerirá un pago y otorgará acceso exclusivo a juegos adicionales. Dependiendo del tipo de usuario (estándar o VIP), se ofrecerán diferentes juegos y beneficios. En todo momento, los jugadores podrán consultar su saldo y gestionar su monedero.

Los juegos estarán organizados dentro de una interfaz dinámica e intuitiva. Al seleccionar un juego, el usuario será redirigido a su página específica para jugar y realizar apuestas. Se fomenta la inclusión de elementos interactivos como **animaciones, efectos visuales y una jugabilidad optimizada y atractiva** para mejorar la experiencia del usuario.

Este proyecto no solo busca el desarrollo técnico de la aplicación, sino también fomentar el **trabajo colaborativo**, la organización mediante **reparto de tareas**, el uso de **GitHub con trabajo en ramas** y la integración de múltiples disciplinas dentro del desarrollo web. 🔥



## Descripción
**Giraffe Rush** es un emocionante juego desarrollado en JavaScript y gestionado en el backend con **Spring Boot**. Combina estrategia, suspenso y diversión. En este juego, el jugador controla a una jirafa que debe esquivar a un león mientras acumula multiplicadores de apuesta. La clave es decidir cuándo retirarse para maximizar las ganancias antes de ser atrapado.

El proyecto incorpora técnicas avanzadas como **Web Workers** para optimizar el rendimiento de carga de imágenes, gestión de datos mediante **Spring Boot**, y operaciones asíncronas realizadas con **AJAX** y **jQuery**.

---

## Características Principales
- **Interactividad Dinámica:** 
  - Animaciones fluidas de la jirafa y el león.
  - Botón interactivo que cambia de estado entre "Tirar" y "Parar".

- **Riesgo Progresivo:** 
  - A medida que el multiplicador crece, aumenta la probabilidad de que el león alcance a la jirafa.

- **Optimización con Web Workers:**
  - Las imágenes del juego se cargan en paralelo para minimizar el tiempo de carga inicial.

- **Gestión Backend con Spring Boot:**
  - Datos de usuarios, históricos de tiradas y reglas gestionados mediante servicios RESTful.

- **Conexión Base de Datos:**
  - Utilización de **Maven** como gestor de dependencias.
  - Base de datos conectada al proyecto para almacenar usuarios y tiradas.

---

## Tecnologías Utilizadas

### Frontend
- **HTML5 y CSS3:**
  - Diseño atractivo y funcional con un enfoque en la experiencia de usuario.

- **JavaScript:**
  - Animaciones y lógica del juego.

- **jQuery:**
  - Manipulación eficiente del DOM y operaciones AJAX.

### Backend
- **Spring Boot:**
  - Gestión de servicios RESTful.

- **Java:**
  - Gestión de lógica del backend y conexión con la base de datos.

- **Maven:**
  - Gestor de dependencias del proyecto.

### Herramientas
- **GitHub:**
  - Control de versiones y colaboración.

- **Visual Studio:**
  - Entorno de desarrollo integrado.

- **Web Workers:**
  - Manejo de procesos en paralelo para optimizar el rendimiento.

---

## Guía de Instalación

1. Clona el repositorio desde GitHub:

```bash
git clone [https://github.com/DiegoArroyo04/CrashGame.git]
```

2. Configura la base de datos en el archivo `application.properties` de Spring Boot.

3. Construye el proyecto con Maven:

```bash
mvn clean install
```

4. Ejecuta el servidor backend.

5. Abre el proyecto en tu editor de código preferido (por ejemplo, Visual Studio) para gestionar el frontend.

6. Configura un servidor local (puedes usar extensiones como Live Server).

7. Accede al juego desde tu navegador web.

---

## Cómo Jugar
1. **Inicio del Juego:** Presiona el botón "Tirar" para comenzar.
2. **Evita el León:** Observa cómo la jirafa se mueve mientras aumenta el multiplicador.
3. **Decide Cuándo Parar:** Haz clic en "Parar" antes de que el león alcance a la jirafa para obtener tus ganancias.
4. **Objetivo:** Maximiza el multiplicador sin perder tu apuesta inicial.

---


## Contacto
- **Desarrollador:** [Diego Arroyo González](https://github.com/DiegoArroyo04)
- **Correo Electrónico:** diegoarroyogonzalez04@gmail.com
