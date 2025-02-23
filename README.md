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

## 2. Juegos

A lo largo del curso, en las diferentes asignaturas, hemos diseñado varios juegos de casino que se han integrado en este proyecto transversal. Sin embargo, para mejorar la experiencia del usuario, se ha añadido un nuevo juego exclusivo para usuarios VIP y se han realizado mejoras en los juegos ya existentes.

### 2.1. Máquinas Tragaperras y Crash Game

En el caso de los juegos previamente creados, simplemente ha sido necesario integrarlos en este proyecto como parte del casino. Dado que el desarrollo se ha realizado en parejas, se han seleccionado los juegos mejor valorados y con menor carga de trabajo en cuanto a mejoras. No obstante, aunque estos juegos ya existieran, ha sido imprescindible optimizarlos tanto en diseño como en funcionalidad.

- **Mejoras de diseño:** Se han aplicado las sugerencias de los profesores de la parte de front-end para optimizar la interfaz y la experiencia del usuario.  
- **Mejoras de funcionalidad:** Se han adaptado los juegos a los conceptos teóricos vistos en las asignaturas, como AJAX, jQuery, JSON, web workers, entre otros.  

Por ejemplo, en la asignatura de **Desarrollo Web en Entorno Cliente**, hemos aprendido a realizar peticiones GET y POST para gestionar datos en la base de datos. Este conocimiento se ha aplicado en todos los juegos, como:  

- 🎰 **Giraffe Spins and Wins** (máquina tragaperras temática de jirafas). Se ha implementado una mejora con comodines y un sistema de notificación al usuario cuando pierde.  
- 🦒 **Giraffe Rush** (crash game en el que una jirafa corre mientras un león intenta atraparla, permitiendo retirarse en cualquier momento para salvarse).  
- 🐂 **Pamplona Rush** – Un crash game inspirado en los Sanfermines. En él, un corredor huye de un toro y debe retirarse en el momento oportuno antes de ser alcanzado.    

Además, se ha estructurado el código siguiendo el **patrón MVC**, tal y como se ha estudiado en las asignaturas de desarrollo en cliente y servidor.

### 2.2. Nuevos Juegos

Para ampliar la oferta del casino y mejorar la exclusividad del usuario VIP, el equipo ha implementado **un juego adicional**, una variación de uno existente que requería mejoras significativas y aún no había sido aprobado por completo por una de las partes del equipo. Este juego ha sido adaptado a las condiciones del casino y se ha integrado como un título más en la plataforma.  

El nuevo juego está accesible desde la pantalla principal para los usuarios VIP y sigue el mismo esquema de funcionamiento que los juegos ya existentes.  

En nuestro caso, uno de los compañeros debía recuperar el tema del **crash game**, por lo que decidimos adaptar su juego al casino. Nuestro nuevo juego es:  

🐂 **Pamplona Rush** – Un crash game inspirado en los Sanfermines. En él, un corredor huye de un toro y debe retirarse en el momento adecuado antes de ser alcanzado.  

### 2.3. ¿Cómo jugar?

Aprender un nuevo juego y comprender su sistema de apuestas puede ser complicado para algunos usuarios. Por ello, muchos casinos ofrecen tutoriales o vídeos explicativos dentro de la plataforma.  

📌 **Nuestra solución:**  
- Se ha incluido un **modal con información del juego** dentro del propio juego y en la pantalla principal.  
- Se ha creado un **vídeo tutorial** que simula algunas tiradas para explicar la mecánica de cada juego de forma visual.  

Esto garantiza que los jugadores puedan aprender rápidamente y mejorar su experiencia dentro del casino.  

### 2.4. 🎰 Giraffe Spins And Wins: Tragaperras Multilingüe

#### Descripción

Este juego de **máquina tragaperras** ha sido desarrollado con **JavaScript, HTML y CSS**, ofreciendo una experiencia de juego interactiva con múltiples funcionalidades avanzadas. Su objetivo es simular un entorno de casino realista con animaciones, multiplicadores y opciones personalizables.

Entre sus características destacan:
- Animaciones de giro en los carretes.
- Multiplicadores dinámicos según las combinaciones ganadoras.
- Función de bono especial con giros gratis y multiplicadores mejorados.
- **Interfaz multilingüe** (español e inglés).
- Controles intuitivos: posibilidad de jugar con botones visuales o con la **barra espaciadora**.
- Implementación de un **comodín** para mejorar las combinaciones ganadoras.

---

#### 🎮 Jugabilidad
- **Girar los carretes**: Usa el botón de girar o la barra espaciadora para iniciar una tirada.
- **Bonos**: Si aparecen tres símbolos especiales (jirafas), se activa un **bono de giros gratis** con multiplicadores mejorados.
- **Tiradas automáticas**: Configura un número de tiradas automáticas y el sistema gestionará el juego por ti.
- **Comodin**: Si aparece un símbolo especial (wild), reemplazara ayudando a combinar .

---

#### 🌍 Multilingüe
- Soporte para **español** e **inglés**.
- Traducción de textos dinámicos y estáticos en la interfaz.
- Mantiene las imágenes y estilos al cambiar de idioma.

---

#### 🔥 Multiplicadores y premios
- Cada símbolo tiene diferentes **multiplicadores** según su posición en los carretes (línea central, superior, inferior, diagonal).
- Los multiplicadores se ajustan dinámicamente durante el bono de giros gratis.
- Los **premios acumulados** se actualizan en tiempo real.

---

#### ⚙️ Funciones técnicas
- **Bloqueo de acciones** mientras los carretes están girando para evitar errores.
- **Ajustes personalizados**: permite cambiar entre **modo oscuro y claro**, insertar créditos y realizar retiros.
- **Gestión de saldos y apuestas** para mejorar la experiencia del usuario.
- **Conexión con backend** mediante **AJAX, JSON y jQuery**, utilizando métodos **POST y GET** para la comunicación con **Spring Boot** bajo el **patrón MVC**.

---

#### 🚀 Tecnologías utilizadas
- **JavaScript**: Lógica del juego, gestión de eventos, animaciones y dinámicas del proyecto.
- **HTML**: Estructura de la interfaz de usuario.
- **CSS**: Estilos para la interfaz y animaciones de los carretes.
- **[i18next](https://www.i18next.com/)**: Biblioteca para la traducción multilingüe.
- **AJAX, JSON y jQuery**: Comunicación con el backend.
- **Spring Boot y MVC**: Gestión del servidor y datos del usuario.

---

#### 🕹️ ¿Cómo jugar?
1. **Accede al juego** desde la pantalla principal del casino.
2. **Configura tu experiencia**: elige idioma, ajusta el modo de pantalla y define tu saldo inicial.
3. **Disfruta del juego**:  
   - Gira los carretes con el botón o la **barra espaciadora**.  
   - Activa **tiradas automáticas** o juega manualmente.  
   - Gana premios con los **multiplicadores** y accede al **modo bono** con giros gratis.  

Este juego forma parte del proyecto transversal, combinando diseño, desarrollo en cliente y servidor, y despliegue para lograr una experiencia de casino completa y funcional. 🎰✨  


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
