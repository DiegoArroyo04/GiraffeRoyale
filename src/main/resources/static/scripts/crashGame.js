document.addEventListener("DOMContentLoaded", function () {

    setTimeout(() => {
        document.getElementById("preloader").style.display = "none";
    }, 3000); // Si quieres que dure 3 segundos

});

// Referencia a la barra de volumen y el texto del volumen
const barraVolumen = document.getElementById("barraVolumen");
const valorVolumen = document.getElementById("valorVolumen");
var volumen = barraVolumen.value / 100; // Convertir el valor de 0-100 a 0.0-1.0


//VARIABLES JUEGO
var hayPremio = false;
var estaJugando;
var multiplicadorJirafa = 0.0; // Comienza en 1x
var intervaloMulti; // Intervalo para el incremento del multiplicador
var duracionJuego; // Duración aleatoria del juego
var timeoutJuego;//TIMEOUT PARA EL JUEGO

//CANCION 
var musica = new Audio('assets/crash/musica.mp3');
musica.loop = true;
var musicaSuena = true;

//SALDO APUESTAS

var saldo = 0.00;
var creditos = 0;
var apuesta = 20;
var apuestaActual = 0;
var usuario = {};
var ultimas5tiradas;
var premioTotal = 0;

//PETICION GET PARA OBTENER USUARIO
$.ajax({
    type: "GET",
    url: "/usuarios/obtenerUsuario", // URL del endpoint en el backend
    success: function (data) {
        usuario = data;
        saldo = usuario.presupuesto;
        // Actualizar elementos del DOM dentro del success
        var saldoElement = document.getElementById("saldo");
        saldoElement.textContent = i18next.t('saldo', { saldo: saldo });

        var saldoActualElement = document.getElementById("saldoCreditosInfo");
        saldoActualElement.textContent = i18next.t('saldoActual', { saldo: saldo });
    },
    error: function (error) {
        console.error("Error al obtener el usuario de prueba:", error);
    }
});


//IDIOMAS
var idiomaActual = 'es';
i18next.init({
    lng: 'es', // Idioma predeterminado
    resources: {
        es: {
            translation: {
                saldo: "Saldo:{{saldo}}€",
                saldoActual: "Saldo actual:{{saldo}}€",
                tirar: "¡TIRE PARA GANAR!",
                depositarTitulo: "DEPOSITAR",
                placeholderDeposito: "Introduce la cantidad que deseas depositar",
                depositarBtn: "Depositar",
                abrirModalRetirar: "Retirar",
                retirarTitulo: "RETIRAR",
                placeholderRetiro: "Introduce la cantidad que deseas retirar",
                retirarBtn: "Retirar",
                abrirModalDepositar: "Depositar",
                textoConfirmacionDeposito: "Has depositado ",
                textoErrorFormatoDeposito: "Formato de deposito no válido",
                textoConfirmacionRetiro: "Has retirado ",
                textoErrorRetiroSaldoInsuficiente: "No tienes suficiente saldo para retirar esa cantidad.",
                textoErrorFormatoRetiro: "Por favor, ingresa una cantidad válida.",
                tituloAjustes: "Ajustes",
                cambiarIdiomaTexto: "Cambiar Idioma A Ingles:",
                textoModoOscuro: "Cambiar A Modo Oscuro:",
                textoModoColor: "Cambiar A Modo Color:",
                creditosBoton: "Creditos",
                insertarCreditosTitulo: "CONVERTIR EUROS A CREDITOS",
                placeholderEurosACreditos: "Introduce la cantidad de euros que deseas convertir a creditos",
                convertirBtn: "Convertir a creditos",
                abrirModalRetirarCreditos: "Retirar creditos",
                retirarCreditosTitulo: "CONVERTIR CREDITOS A EUROS",
                creditosActuales: "Creditos actuales:{{creditos}}",
                hasConvertido: "Has convertido ",
                eurosA: "€ a ",
                creditosTextoModalConversion: " creditos",
                errorEurosInsuficientesConversion: "No tienes tantos euros disponibles para convertir.",
                placeholderCreditosEuros: "Introduce la cantidad de creditos que deseas convertir a euros",
                abrirModalDepositarCreditos: "Convertir euros a creditos",
                creditosA: " creditos a ",
                errorCreditosInsuficientesConversion: "No tienes tantos creditos disponibles para convertir.",
                tituloInstrucciones: "Instrucciones del Juego",
                reglaColumna: "Regla",
                descripcionColumna: "Descripción",
                evitaLeonTitulo: "Evita al León",
                evitaLeonDescripcion: "El león intentará atraparte. Si lo hace, pierdes el juego.",
                retiraATiempoTitulo: "Retira tus Ganancias",
                retirarATiempoDescripcion: "Puedes retirar las ganancias en cualquier momento para ganar el multiplicador actual.",
                multiplicadoresInformacionTitulo: "Multiplicadores",
                multiplicadoresInformacion: "El multiplicador aumenta con el tiempo, pero si esperas demasiado, corres el riesgo de perderlo todo.",
                creditosTexto: "CREDITOS:",
                apuestaTexto: "APUESTA:",
                apuestaMaxima: "¡APUESTA MAXIMA ALCANZADA!",
                apuestaMinima: "¡APUESTA MINIMA ALCANZADA!",
                buenaSuerte: "¡BUENA SUERTE!",
                noCreditosParaApostar: "¡NO TIENES SUFICIENTES CREDITOS PARA ESA APUESTA!",
                hasGanado: "¡HAS GANADO ",
                creditosModalVictoria: " CREDITOS!",
                ganancias: "GANANCIAS: ",
                sigueJugando: "¡SIGUE INTENTANDOLO!",
                tituloHistorial: "HISTORIAL DE TUS ULTIMAS 5 TIRADAS",
                historialApuesta: "Apuesta",
                historialMulti: "Multiplicador",
                historialResultado: "Creditos obtenidos",
                cerrarSesion: "Cerrar Sesión"

            }
        },
        en: {
            translation: {
                saldo: "Balance:{{saldo}}€",
                saldoActual: "Current Balance:{{saldo}}€",
                tirar: "SPIN TO WIN!",
                depositarTitulo: "DEPOSIT",
                placeholderDeposito: "Enter the amount you want to deposit",
                depositarBtn: "Deposit",
                abrirModalRetirar: "Withdraw",
                retirarTitulo: "WITHDRAW",
                placeholderRetiro: "Enter the amount you want to withdraw",
                retirarBtn: "Withdraw",
                abrirModalDepositar: "Deposit",
                textoConfirmacionDeposito: "You have deposited ",
                textoErrorFormatoDeposito: "Invalid deposit format",
                textoConfirmacionRetiro: "You have withdrawn ",
                textoErrorRetiroSaldoInsuficiente: "You don't have enough balance to withdraw that amount.",
                textoErrorFormatoRetiro: "Please enter a valid amount.",
                tituloAjustes: "Settings",
                cambiarIdiomaTexto: "Change Language To Spanish",
                textoModoOscuro: "Switch to Dark Mode:",
                textoModoColor: "Switch to Color Mode:",
                creditosBoton: "Credits",
                insertarCreditosTitulo: "BECOME EUROS TO CREDITS",
                placeholderEurosACreditos: "Enter the amount of euros you want to convert to credits",
                convertirBtn: "Convert to credits",
                abrirModalRetirarCreditos: "Withdraw credits",
                retirarCreditosTitulo: "BECOME CREDITS TO EUROS",
                creditosActuales: "Current credits:{{creditos}}",
                hasConvertido: "You have converted ",
                eurosA: "€ to ",
                creditosTextoModalConversion: " credits",
                errorEurosInsuficientesConversion: "You don't have that many euros available to convert.",
                placeholderCreditosEuros: "Enter the amount of credits you want to convert to euros",
                abrirModalDepositarCreditos: "Convert euros to credits",
                creditosA: " credits to ",
                errorCreditosInsuficientesConversion: "You don't have that many credits available to convert.",
                tituloInstrucciones: "Game Instructions",
                reglaColumna: "Rule",
                descripcionColumna: "Description",
                evitaLeonTitulo: "Avoid the Lion",
                evitaLeonDescripcion: "The lion will try to catch you. If it does, you lose the game.",
                retiraATiempoTitulo: "Withdraw your earnings",
                retirarATiempoDescripcion: "You can withdraw the winnings at any time to win the current multiplier.",
                multiplicadoresInformacionTitulo: "Multipliers",
                multiplicadoresInformacion: "The multiplier increases over time, but if you wait too long, you risk losing everything.",
                creditosTexto: "CREDITS:",
                apuestaTexto: "BET:",
                apuestaMaxima: "BET MAXIMUM REACHED!",
                apuestaMinima: "BET MINIMUM REACHED!",
                buenaSuerte: "GOOD LUCK!",
                noCreditosParaApostar: "YOU HAVE NO SUFFICIENT CREDITS FOR THAT BET!",
                hasGanado: "YOU'VE WON ",
                creditosModalVictoria: " CREDITS!",
                ganancias: "WINS: ",
                sigueJugando: "KEEP TRYING!",
                tituloHistorial: "HISTORY OF YOUR LAST 5 SPINS",
                historialApuesta: "Bet",
                historialMulti: "Multiplier",
                historialResultado: "Credits obtained",
                cerrarSesion: "Log out"

            }
        }
    }
}, function (err, t) {
    actualizarTexto(); // Traduce el contenido al cargar
});

window.addEventListener("load", function () {

    //Cargar hora por primera vez
    cargarHoraInicial();

    //WEB WORKERS

    // URLs de las imágenes
    const imageUrls = [
        "../assets/crash/header.jpg",
        "../assets/crash/home.png",
        "../assets/crash/logo giraffe royale.png",
        "../assets/crash/añadir.png",
        "../assets/crash/configuracion.png",
        "../assets/crash/girafaEstatica.png",
        "../assets/crash/leonEstatico.png",
        "../assets/crash/iconoInformacion.png",
        "../assets/crash/sonido.png",
        "../assets/crash/disminuirApuesta.png",
        "../assets/crash/botonTirar.png",
        "../assets/crash/historialTiradas.png",
        "../assets/crash/aumentarApuesta.png",
        "../assets/crash/sonidoMuteRojo.png",
        "../assets/crash/juegasegurocasino.png",
        "../assets/crash/premioHeader.png",
        "../assets/crash/girafaPremios.png",
        "../assets/crash/modoOscuro.png",
        "../assets/crash/iconoIngles.png",
    ];

    // Inicializa el Web Worker
    const worker = new Worker("imageLoaderWorker.js");

    // Maneja los mensajes desde el Web Worker 
    worker.onmessage = function (e) {
        if (e.data.success) {
            const loadedImages = e.data.images;

            // ARRAY QUE ASIGNA LAS IMAGENES A LOS ELEMENTOS DEL HTML
            const imageElements = [
                { id: "preloader", type: "background", index: 0 },
                { selector: "a[href='/comprobarLobby'] img.home", type: "img", index: 1 },
                { selector: "a[href='/comprobarLobby'] img.logo", type: "img", index: 2 },
                { id: "añadirSaldo", type: "img", index: 3 },
                { id: "configuracion", type: "img", index: 4 },
                { id: "imagenGirafa", type: "img", index: 5 },
                { id: "imagenLeon", type: "img", index: 6 },
                { id: "info", type: "img", index: 7 },
                { id: "sonido", type: "img", index: 8 },
                { id: "disminuirApuesta", type: "img", index: 9 },
                { id: "botonTirar", type: "img", index: 10 },
                { id: "historialTiradasAbrir", type: "img", index: 11 },
                { id: "aumentarApuesta", type: "img", index: 12 },
                { id: "iconoSonidoModal", type: "img", index: 13 },
                { selector: "a[href='https://www.juegoseguro.es'] img", type: "img", index: 14 },
                { selector: ".modalVictoriaContenido img.premioHeader", type: "img", index: 15 },
                { selector: ".modalVictoriaContenido img.girafaPremio", type: "img", index: 16 },
                { id: "modoOscuro", type: "img", index: 17 },
                { id: "idioma", type: "img", index: 18 },
            ];

            //IMAGENES QUE ESTAN COMO FONDOS
            imageElements.forEach(({ id, selector, type, index }) => {
                const element = id ? document.getElementById(id) : document.querySelector(selector);
                if (element) {
                    if (type === "img") {
                        element.src = loadedImages[index];
                    } else if (type === "background") {
                        element.style.backgroundImage = `url('${loadedImages[index]}')`;
                    }
                }
            });



            console.log("Todas las imágenes se cargaron correctamente.");
        } else {
            console.error("Error al cargar las imágenes:", e.data.error);
        }
    };


    // Enviar las URLs al Web Worker
    worker.postMessage(imageUrls);

    //JUEGO
    const botonTirar = document.getElementById("botonTirar");


    //APUESTAS
    //BOTON DE AUMENTAR APUESTA
    document.getElementById("aumentarApuesta").addEventListener("click", function () {

        //SI LA APUESTA ES MENOR DE DOSCIENTOS CREDITOS AUMENTAMOS LA APUESTA DE 20 EN 20 
        if (apuesta < 200) {
            apuesta += 20;
            document.getElementById("apuesta").innerHTML = apuesta;
        } else if (apuesta >= 200 && apuesta < 1000) {
            //SI LA APUESTA ESTA ENTRE 200 Y 1000 CREDITOS AUMENTAMOS DE 100 EN 100 
            apuesta += 100;
            document.getElementById("apuesta").innerHTML = apuesta;
        } else if (apuesta >= 1000 && apuesta < 2500) {
            //SI LA APUESTA ESTA ENTRE 1000 Y 2500 CREDITOS AUMENTAMOS DE 500 EN 500 
            apuesta += 500;
            document.getElementById("apuesta").innerHTML = apuesta;
        } else if (apuesta >= 2500 && apuesta < 10000) {
            //SI LA APUESTA ESTA ENTRE 2500 Y 10000 CREDITOS AUMENTAMOS DE 2500 EN 2500 
            apuesta += 2500;
            document.getElementById("apuesta").innerHTML = apuesta;
        }

        actualizarEstadoApuesta();

    });

    //BOTON DE DISMINUIR APUESTA
    document.getElementById("disminuirApuesta").addEventListener("click", function () {
        //SI LA APUESTA ES MENOR DE DOSCIENTOS CREDITOS RESTAMOS LA APUESTA DE 20 EN 20 
        if (apuesta <= 200 && apuesta > 20) {
            apuesta -= 20;
            document.getElementById("apuesta").innerHTML = apuesta;
        } else if (apuesta >= 200 && apuesta <= 1000) {
            //SI LA APUESTA ESTA ENTRE 200 Y 1000 CREDITOS RESTAMOS DE 100 EN 100 
            apuesta -= 100;
            document.getElementById("apuesta").innerHTML = apuesta;
        } else if (apuesta >= 1000 && apuesta <= 2500) {
            //SI LA APUESTA ESTA ENTRE 1000 Y 2500 CREDITOS RESTAMOS DE 500 EN 500 
            apuesta -= 500;
            document.getElementById("apuesta").innerHTML = apuesta;
        } else if (apuesta >= 2500 && apuesta <= 10000) {
            //SI LA APUESTA ESTA ENTRE 2500 Y 10000 CREDITOS RESTAMOS DE 2500 EN 2500 
            apuesta -= 2500;
            document.getElementById("apuesta").innerHTML = apuesta;
        }

        actualizarEstadoApuesta();

    });

    //EMPEZAR JUEGO CUANDO PULSE EL BOTON TIRAR
    document.getElementById("botonTirar").addEventListener('click', function () {
        toggleJuego();

    });

    //EMPEZAR JUEGO CON EL ESPACIO
    window.addEventListener('keydown', function (event) {
        if (event.key === ' ') {
            event.preventDefault(); // Prevenir el desplazamiento de la página
            toggleJuego();

        }
    });


    //AÑADIR SALDO
    document.getElementById("añadirSaldo").addEventListener('click', function () {
        document.getElementById("modalDepositar").style.display = "flex";

        //SI PULSAMOS EN EL BOTON DE RETIRAR SE ABRE EL MODAL DE RETIRAR
        document.getElementById("abrirModalRetirar").addEventListener('click', function () {
            document.getElementById("modalDepositar").style.display = "none";
            document.getElementById("inputDeposito").value = "";
            document.getElementById("modalRetirar").style.display = "flex";
        });

        // SI PULSAMOS EN EL BOTON DE DEPOSITAR EN EL MODAL DE RETIRAR  SE ABRE EL MODAL DE DEPOSITAR
        document.getElementById("abrirModalDepositar").addEventListener('click', function () {

            document.getElementById("modalRetirar").style.display = "none";

            document.getElementById("inputRetiro").value = "";

            document.getElementById("modalDepositar").style.display = "flex";

        });
    });

    //GUARDAR SALDO Y ACTUALIZARLO
    document.getElementById("depositarBtn").addEventListener('click', function () {

        var deposito = document.getElementById("inputDeposito").value.trim();
        var decimalesValidados = false;

        //SEPARAR DECIMALES Y ENTEROS
        var decimales = 0;
        if (deposito.includes(".")) {
            let partes = deposito.split(".");
            decimales = partes[1].length;
        }

        if (decimales < 3) {
            deposito = parseFloat(deposito);
            decimalesValidados = true;
        }

        if (!isNaN(deposito) && deposito > 0 && decimalesValidados) {
            saldo = parseFloat((saldo + deposito).toFixed(2));
            var datos = {
                dni: usuario.dni,
                presupuesto: saldo
            };

            // Realizar una solicitud AJAX PARA ACTUALIZAR EL SALDO EN BBDD
            $.ajax({
                type: "POST",
                url: "/usuarios/actualizarSaldo",
                contentType: "application/json",
                data: JSON.stringify(datos),
                success: function (response) {

                    //SALDO PARA HEADER
                    document.getElementById("saldo").textContent = i18next.t('saldo', { saldo: saldo });
                    //EN EL MODAL DE CREDITOS APARECERA EL SALDO ACTUAL 
                    document.getElementById("saldoCreditosInfo").textContent = i18next.t('saldoActual', { saldo: saldo });
                    mostrarError(i18next.t('textoConfirmacionDeposito') + deposito + "€");

                },
                error: function (error) {
                    console.error("Error en la solicitud AJAX:", error);
                }
            });


        } else {
            mostrarError(i18next.t('textoErrorFormatoDeposito'));
        }

        document.getElementById("modalDepositar").style.display = "none";
        document.getElementById("inputDeposito").value = "";

    });





    // RETIRAR SALDO Y ACTUALIZARLO
    document.getElementById("retirarBtn").addEventListener('click', function () {

        var retiro = document.getElementById("inputRetiro").value.trim();
        var decimalesValidados = false;
        //SEPARAR DECIMALES Y ENTEROS
        var decimales = 0;
        if (retiro.includes(".")) {
            let partes = retiro.split(".");
            decimales = partes[1].length;
        }

        if (decimales < 3) {
            retiro = parseFloat(retiro);
            decimalesValidados = true;
        }


        // Verifica si el valor es válido y que no sea mayor que el saldo
        if (!isNaN(retiro) && retiro > 0 && retiro <= saldo && decimalesValidados) {
            saldo = parseFloat((saldo - retiro).toFixed(2));
            var datos = {
                dni: usuario.dni,
                presupuesto: saldo
            };

            // Realizar una solicitud AJAX PARA ACTUALIZAR EL SALDO EN BBDD
            $.ajax({
                type: "POST",
                url: "/usuarios/actualizarSaldo",
                contentType: "application/json",
                data: JSON.stringify(datos),
                success: function (response) {

                    document.getElementById("saldo").textContent = i18next.t('saldo', { saldo: saldo });
                    document.getElementById("saldoCreditosInfo").textContent = i18next.t('saldoActual', { saldo: saldo });
                    mostrarError(i18next.t('textoConfirmacionRetiro') + retiro + "€");

                },
                error: function (error) {
                    console.error("Error en la solicitud AJAX:", error);
                }
            });


        } else if (retiro > saldo) {
            mostrarError(i18next.t('textoErrorRetiroSaldoInsuficiente'));
        } else {
            mostrarError(i18next.t('textoErrorFormatoRetiro'));
        }

        // Cierra el modal después del retiro
        document.getElementById("modalRetirar").style.display = "none";
        document.getElementById("inputRetiro").value = "";
    });


    //CERRAR MODAL AL HACER CLICK EN LA X
    document.getElementById("cerrarModalDepositar").addEventListener("click", function () {
        document.getElementById("modalDepositar").style.display = "none";

    })
    //CERRAR MODAL AL HACER CLICK EN LA X
    document.getElementById("cerrarModalRetirar").addEventListener("click", function () {
        document.getElementById("modalRetirar").style.display = "none";

    })

    // Cerrar el modal de error al hacer clic en la "X"
    document.getElementById("cerrarModalError").addEventListener("click", function () {
        document.getElementById("modalError").style.display = "none";
    });

    // Cerrar el modal de error al hacer clic en la "X"
    document.getElementById("cerrarModalAjustes").addEventListener("click", function () {
        document.getElementById("modalAjustes").style.display = "none";
    });

    // Cerrar el modal de error al hacer clic en la "X"
    document.getElementById("cerrarModalInstrucciones").addEventListener("click", function () {
        document.getElementById("modalInstrucciones").style.display = "none";
    });

    // Cerrar el modal de error al hacer clic en la "X"
    document.getElementById("cerrarModalDepositarCreditos").addEventListener("click", function () {
        document.getElementById("modalDepositarCreditos").style.display = "none";
    });
    // Cerrar el modal de error al hacer clic en la "X"
    document.getElementById("cerrarModalRetirarCreditos").addEventListener("click", function () {
        document.getElementById("modalRetirarCreditos").style.display = "none";
    });
    // Cerrar el modal de error al hacer clic en la "X"
    document.getElementById("cerrarModalRetirarCreditos").addEventListener("click", function () {
        document.getElementById("modalRetirarCreditos").style.display = "none";
    });
    // Cerrar el modal de error al hacer clic en la "X"
    document.getElementById("cerrarModalVictoria").addEventListener("click", function () {
        document.getElementById("modalVictoria").style.display = "none";
    });

    // Cerrar el modal de error al hacer clic en la "X"
    document.getElementById("cerrarModalHistorial").addEventListener("click", function () {
        document.getElementById("modalHistorial").style.display = "none";
    });

    // Cierra el modal al hacer clic fuera del contenido
    window.addEventListener("click", (event) => {
        if (event.target == document.getElementById("modalDepositar")) {
            document.getElementById("modalDepositar").style.display = "none";
        }
        if (event.target == document.getElementById("modalRetirar")) {
            document.getElementById("modalRetirar").style.display = "none";
        }
        if (event.target == document.getElementById("modalError")) {
            document.getElementById("modalError").style.display = "none";
        }
        if (event.target == document.getElementById("modalAjustes")) {
            document.getElementById("modalAjustes").style.display = "none";
        }
        if (event.target == document.getElementById("modalInstrucciones")) {
            document.getElementById("modalInstrucciones").style.display = "none";
        }

        if (event.target == document.getElementById("modalSonidoPantalla")) {
            document.getElementById("modalSonidoPantalla").style.display = "none";
        }
        if (event.target == document.getElementById("modalDepositarCreditos")) {
            document.getElementById("modalDepositarCreditos").style.display = "none";
        }
        if (event.target == document.getElementById("modalRetirarCreditos")) {
            document.getElementById("modalRetirarCreditos").style.display = "none";
        }
        if (event.target == document.getElementById("modalVictoria")) {
            document.getElementById("modalVictoria").style.display = "none";
        }
        if (event.target == document.getElementById("modalHistorial")) {
            document.getElementById("modalHistorial").style.display = "none";
        }

    });

    window.addEventListener("scroll", (event) => {

        //ESCONDER MODAL DE SONIDO AL HACER SCROLL
        const modal = document.getElementById("modalSonidoPantalla");
        if (modal.style.display == "flex") {
            modal.style.display = "none";
        }

    });


    //AJUSTES
    document.getElementById("configuracion").addEventListener("click", function () {
        document.getElementById("modalAjustes").style.display = "flex";
    });
    //MODO OSCURO
    document.getElementById("modoOscuro").addEventListener("click", function () {
        document.body.classList.toggle("modo-oscuro");
        // Cambia la imagen del icono de modo oscuro según el estado actual
        const iconoModoOscuro = document.getElementById("modoOscuro"); // ID del elemento de icono

        if (document.body.classList.contains("modo-oscuro")) {
            document.getElementById("textoModoOscuro").textContent = i18next.t('textoModoColor');
            iconoModoOscuro.src = "./assets/crash/modoClaro.png";// Icono para el modo claro

        } else {
            document.getElementById("textoModoOscuro").textContent = i18next.t('textoModoOscuro');
            iconoModoOscuro.src = "./assets/crash/modoOscuro.png"; // Icono para el modo oscuro
        }

    });

    //CAMBIAR IDIOMA
    document.getElementById("idioma").addEventListener("click", function () {

        //ALTERNAR IDIOMAS
        idiomaActual = i18next.language === 'es' ? 'en' : 'es';

        // Cambiar idioma en i18next
        i18next.changeLanguage(idiomaActual, function () {
            actualizarTexto(); // Vuelve a traducir el texto
        });

        // Cambiar el ícono del idioma
        const icono = document.getElementById("idioma");
        if (idiomaActual === 'en') {
            icono.src = "./assets/crash/iconoEspaña.png";
        } else {
            icono.src = "./assets/crash/iconoIngles.png";
        }
    });

    //CREDITOS
    document.getElementById("creditos").addEventListener("click", function () {
        document.getElementById("inputEurosACreditos").value = "";
        document.getElementById("modalDepositarCreditos").style.display = "flex";


    });
    //CONVERSION DE EUROS A CREDITOS
    document.getElementById("convertirBtn").addEventListener("click", function () {

        var eurosACreditos = document.getElementById("inputEurosACreditos").value.trim();
        var decimalesValidados = false;

        //SEPARAR DECIMALES Y ENTEROS
        var decimales = 0;
        if (eurosACreditos.includes(".")) {
            let partes = eurosACreditos.split(".");
            decimales = partes[1].length;
        }

        if (decimales < 3) {
            eurosACreditos = parseFloat(eurosACreditos);
            decimalesValidados = true;
        }

        if (!isNaN(eurosACreditos) && eurosACreditos > 0 && eurosACreditos <= saldo && decimalesValidados) {

            //PETICION GET PARA OBTENER CUANTOS CREDITOS TIENE ESTE JUEGO PARA CONVERTIR USUARIO DE PRUEBA
            $.ajax({
                type: "GET",
                url: "/convertirACreditos?id=2", // URL del endpoint en el backend junto con el id del juego
                success: function (multiplicador) {


                    creditos += parseFloat((eurosACreditos * multiplicador).toFixed(2));
                    saldo -= eurosACreditos;

                    var datos = {
                        dni: usuario.dni,
                        presupuesto: saldo
                    };
                    // Realizar una solicitud AJAX PARA ACTUALIZAR EL SALDO EN BBDD
                    $.ajax({
                        type: "POST",
                        url: "/usuarios/actualizarSaldo",
                        contentType: "application/json",
                        data: JSON.stringify(datos),
                        success: function (response) {

                            document.getElementById("saldo").textContent = i18next.t('saldo', { saldo: saldo.toFixed(2) });
                            document.getElementById("saldoCreditosInfo").textContent = i18next.t('saldoActual', { saldo: saldo.toFixed(2) });
                            document.getElementById("creditosInfo").textContent = i18next.t('creditosActuales', { creditos: creditos });
                            document.getElementById("creditosTotales").innerHTML = creditos;
                            document.getElementById("inputEurosACreditos").value = "";
                            mostrarError(i18next.t('hasConvertido') + eurosACreditos + i18next.t('eurosA') + (parseFloat((eurosACreditos * multiplicador).toFixed(2))) + i18next.t('creditosTextoModalConversion'));

                        },
                        error: function (error) {
                            console.error("Error en la solicitud AJAX:", error);
                        }
                    });
                },
                error: function (error) {
                    console.error("Error al obtener el multiplicador del juego:", error);
                }
            });


        } else if (eurosACreditos > saldo) {

            mostrarError(i18next.t('errorEurosInsuficientesConversion'));

        } else {

            mostrarError(i18next.t('textoErrorFormatoRetiro'));

        }

    });

    //MODAL DE RETIRAR CREDITOS 
    document.getElementById("abrirModalRetirarCreditos").addEventListener("click", function () {

        document.getElementById("inputEurosACreditos").value = "";
        document.getElementById("modalDepositarCreditos").style.display = "none";
        document.getElementById("modalRetirarCreditos").style.display = "flex";

    });

    //CONVERSION DE CREDITOS A EUROS
    document.getElementById("retirarCreditosBtn").addEventListener("click", function () {
        var creditosAEuros = parseFloat(document.getElementById("inputRetiroCreditos").value);

        if (!isNaN(creditosAEuros) && creditosAEuros > 0 && creditosAEuros <= creditos && Number.isInteger(creditosAEuros)) {
            //PETICION GET PARA OBTENER CUANTOS CREDITOS TIENE ESTE JUEGO PARA CONVERTIR USUARIO DE PRUEBA
            $.ajax({
                type: "GET",
                url: "/convertirACreditos?id=2", // URL del endpoint en el backend junto con el id del juego
                success: function (multiplicador) {

                    // EVITAR ERRORES DE PRECISION AL DIVIDIR
                    saldo = (saldo * 100 + (creditosAEuros * 100) / multiplicador) / 100;
                    saldo = parseFloat(saldo.toFixed(2)); // Aplicar toFixed(2) solo al final
                    creditos -= creditosAEuros;

                    var datos = {
                        dni: usuario.dni,
                        presupuesto: saldo
                    };
                    // Realizar una solicitud AJAX PARA ACTUALIZAR EL SALDO EN BBDD
                    $.ajax({
                        type: "POST",
                        url: "/usuarios/actualizarSaldo",
                        contentType: "application/json",
                        data: JSON.stringify(datos),
                        success: function (response) {

                            document.getElementById("saldo").textContent = i18next.t('saldo', { saldo: saldo });
                            document.getElementById("saldoCreditosInfo").textContent = i18next.t('saldoActual', { saldo: saldo });
                            document.getElementById("creditosInfo").textContent = i18next.t('creditosActuales', { creditos: creditos });
                            document.getElementById("creditosTotales").innerHTML = creditos;
                            document.getElementById("inputRetiroCreditos").value = "";
                            mostrarError(i18next.t('hasConvertido') + creditosAEuros + i18next.t('creditosA') + (creditosAEuros / multiplicador).toFixed(2) + " €");
                        },
                        error: function (error) {
                            console.error("Error en la solicitud AJAX:", error);
                        }
                    });
                },
                error: function (error) {
                    console.error("Error al obtener el multiplicador del juego:", error);
                }
            });
        } else if (creditosAEuros > creditos) {
            mostrarError(i18next.t('errorCreditosInsuficientesConversion'));
        } else {
            mostrarError(i18next.t('textoErrorFormatoRetiro'));
        }
    });

    //MODAL DE DEPOSITAR CREDITOS DESDE EL MODAL DE CONVERTIR CREDITOS A EUROS
    document.getElementById("abrirModalDepositarCreditos").addEventListener("click", function () {
        document.getElementById("inputRetiroCreditos").value = "";
        document.getElementById("modalRetirarCreditos").style.display = "none";
        document.getElementById("modalDepositarCreditos").style.display = "flex";
    });

    //INFORMACION
    document.getElementById("info").addEventListener("click", function () {

        document.getElementById("modalInstrucciones").style.display = "flex";
    });


    //SONIDO
    document.getElementById("sonido").addEventListener("click", function () {

        //DETECTAR SI LLAMAMOS AL EVENTO DESDE UN TELEFONO
        let esMovil = window.matchMedia("(max-width: 768px)").matches;


        //PAUSAR LA MUSICA
        if (musicaSuena == true) {
            musica.pause();
            volumen = 0.0;
            musicaSuena = false;
            document.getElementById("sonido").src = "./assets/crash/sonidoRojo.png";
            document.getElementById("iconoSonidoModal").src = "./assets/crash/sonidoMuteRojo.png";

            //ABRIR EL MODAL SI NO ESTAMOS EN UN MOVIL
            if (!esMovil) {
                document.getElementById("modalSonidoPantalla").style.display = "flex";
            }


            // Cambia el color de la barra y del slider thumb a rojo
            barraVolumen.classList.add("mute");

        } else {
            //REAUNUDAR LA MUSICA
            musica.play();
            musicaSuena = true;
            document.getElementById("sonido").src = "./assets/crash/sonido.png";
            //CIERRO EL MODAL DE SONIDO
            document.getElementById("modalSonidoPantalla").style.display = "none";

            // Vuelve a cambiar el color de la barra a su color original
            barraVolumen.classList.remove("mute");

        }

    });

    // Ajusta el volumen de todos los audios de la página
    barraVolumen.addEventListener("input", function () {
        volumen = barraVolumen.value / 100; // Convertir el valor de 0-100 a 0.0-1.0
        valorVolumen.textContent = barraVolumen.value; // Mostrar el valor actual

        musica.play();
        musica.volume = volumen;
        document.getElementById("iconoSonidoModal").src = "./assets/crash/sonido.png";
        document.getElementById("sonido").src = "./assets/crash/sonido.png"

        if (volumen == 0.0) {
            document.getElementById("iconoSonidoModal").src = "./assets/crash/sonidoMuteRojo.png";
            document.getElementById("sonido").src = "./assets/crash/sonidoRojo.png"
            barraVolumen.classList.add("mute"); // Añade la clase de mute

        } else {
            barraVolumen.classList.remove("mute"); // Elimina la clase de mute

        }

    });

    document.getElementById("iconoSonidoModal").addEventListener("click", function () {

        //PAUSAR LA MUSICA
        if (musicaSuena == true) {
            musica.pause();
            volumen = 0.0;
            musicaSuena = false;
            document.getElementById("sonido").src = "./assets/crash/sonidoRojo.png";
            document.getElementById("iconoSonidoModal").src = "./assets/crash/sonidoMuteRojo.png";

            // Cambia el color de la barra y del slider thumb a rojo
            barraVolumen.classList.add("mute");

        } else {
            //REAUNUDAR LA MUSICA
            musica.play();
            musicaSuena = true;
            document.getElementById("sonido").src = "./assets/crash/sonido.png";
            document.getElementById("iconoSonidoModal").src = "./assets/crash/sonido.png";

            //VOLER AL COLOR ORIGINAL EN LA BARRA
            barraVolumen.classList.remove("mute");

        }

    });
    document.getElementById("historialTiradasAbrir").addEventListener("click", function () {
        document.getElementById("modalHistorial").style.display = "flex";

        //PETICION GET PARA OBTENER LOS HISTORICOS DEL USUARIO 
        $.ajax({
            type: "GET",
            url: `/usuarios/obtenerHistoricosUsuario?dni=${usuario.dni}&idJuego=2`, //MANDAR DNI DEL USUARIO PARA BUSCARLO
            success: function (historicos) {

                //obtener ultimas 5 tiradas
                ultimas5tiradas = historicos.slice(0, 5);

                var tablaHistorialBody = document.getElementById("tablaHistorialBody");

                // Limpiar el contenido previo
                tablaHistorialBody.innerHTML = "";

                // Agregar las filas dinámicamente
                ultimas5tiradas.forEach(tirada => {
                    var fila = document.createElement("tr");

                    // Crear las celdas
                    var apuestaCelda = document.createElement("td");
                    apuestaCelda.textContent = tirada.apuesta;

                    var multiplicadorCelda = document.createElement("td");
                    multiplicadorCelda.textContent = tirada.multiplicador.toFixed(2);

                    var resultadoCelda = document.createElement("td");
                    resultadoCelda.textContent = tirada.resultado;

                    // Añadir las celdas a la fila
                    fila.appendChild(apuestaCelda);
                    fila.appendChild(multiplicadorCelda);
                    fila.appendChild(resultadoCelda);

                    // Añadir la fila al cuerpo de la tabla
                    tablaHistorialBody.appendChild(fila);
                });


            },
            error: function (error) {
                console.error("Error al obtener los historicos del usuario:", error);

            }
        });
    });

});
function actualizarTexto() {
    // Traduce el saldo dinámico
    var saldoElement = document.getElementById("saldo");
    saldoElement.textContent = i18next.t('saldo', { saldo: saldo });

    var saldoActualElement = document.getElementById("saldoCreditosInfo");
    saldoActualElement.textContent = i18next.t('saldoActual', { saldo: saldo });

    var creditosActuales = document.getElementById("creditosInfo");
    creditosActuales.textContent = i18next.t('creditosActuales', { creditos: creditos });

    // ELEMENTOS ESTATICOS
    document.getElementById("textoTragaperras").textContent = i18next.t('tirar');
    document.querySelector(".mensajeVictoria").textContent = i18next.t('girosGratis');
    document.getElementById("depositarTitulo").textContent = i18next.t('depositarTitulo');
    document.getElementById("inputDeposito").setAttribute("placeholder", i18next.t('placeholderDeposito'));
    document.getElementById("depositarBtn").textContent = i18next.t('depositarBtn');
    document.getElementById("abrirModalRetirar").textContent = i18next.t('abrirModalRetirar');
    document.getElementById("retirarTitulo").textContent = i18next.t('retirarTitulo');
    document.getElementById("inputRetiro").setAttribute("placeholder", i18next.t('placeholderRetiro'));
    document.getElementById("retirarBtn").textContent = i18next.t('retirarBtn');
    document.getElementById("abrirModalDepositar").textContent = i18next.t('abrirModalDepositar');
    document.getElementById("tituloAjustes").textContent = i18next.t('tituloAjustes');
    document.getElementById("cambiarIdiomaTexto").textContent = i18next.t('cambiarIdiomaTexto');
    document.getElementById("textoModoOscuro").textContent = i18next.t('textoModoOscuro');
    document.getElementById("creditos").textContent = i18next.t('creditosBoton');
    document.getElementById("insertarCreditosTitulo").textContent = i18next.t('insertarCreditosTitulo');
    document.getElementById("inputEurosACreditos").setAttribute("placeholder", i18next.t('placeholderEurosACreditos'));
    document.getElementById("convertirBtn").textContent = i18next.t('convertirBtn');
    document.getElementById("abrirModalRetirarCreditos").textContent = i18next.t('abrirModalRetirarCreditos');
    document.getElementById("retirarCreditosTitulo").textContent = i18next.t('retirarCreditosTitulo');
    document.getElementById("inputRetiroCreditos").setAttribute("placeholder", i18next.t('placeholderCreditosEuros'));
    document.getElementById("retirarCreditosBtn").textContent = i18next.t('abrirModalRetirarCreditos');
    document.getElementById("abrirModalDepositarCreditos").textContent = i18next.t('abrirModalDepositarCreditos');
    document.getElementById("tituloInstrucciones").textContent = i18next.t('tituloInstrucciones');
    document.getElementById("reglaColumna").textContent = i18next.t('reglaColumna');
    document.getElementById("descripcionColumna").textContent = i18next.t('descripcionColumna');
    document.getElementById("evitaLeonTitulo").textContent = i18next.t('evitaLeonTitulo');
    document.getElementById("evitaLeonDescripcion").textContent = i18next.t('evitaLeonDescripcion');
    document.getElementById("retiraATiempoTitulo").textContent = i18next.t('retiraATiempoTitulo');
    document.getElementById("retirarATiempoDescripcion").textContent = i18next.t('retirarATiempoDescripcion');
    document.getElementById("multiplicadoresInformacionTitulo").textContent = i18next.t('multiplicadoresInformacionTitulo');
    document.getElementById("multiplicadoresInformacion").textContent = i18next.t('multiplicadoresInformacion');
    document.getElementById("creditosTexto").textContent = i18next.t('creditosTexto');
    document.getElementById("apuestaTexto").textContent = i18next.t('apuestaTexto');
    document.getElementById("tituloHistorial").textContent = i18next.t('tituloHistorial');
    document.getElementById("historialApuesta").textContent = i18next.t('historialApuesta');
    document.getElementById("historialMulti").textContent = i18next.t('historialMulti');
    document.getElementById("historialResultado").textContent = i18next.t('historialResultado');
    document.getElementById("cerrarSesion").textContent = i18next.t('cerrarSesion');

}

function cargarHoraInicial() {
    // Pedir permiso al usuario para obtener su ubicación
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
                // Actualizar la hora cada segundo
                setInterval(() => cargarHora(timeZone), 1000);
            },
            (error) => {
                console.error("Error obteniendo la ubicación:", error);
                // Si no se puede obtener la ubicación, usar la zona horaria local por defecto
                const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
                setInterval(() => cargarHora(timeZone), 1000);
            }
        );
    } else {
        console.error("La geolocalización no es soportada por este navegador.");
    }
}

function cargarHora(zonaHoraria) {

    var horaActual = new Date().toLocaleTimeString('es-ES', {
        timeZone: zonaHoraria,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });

    document.getElementById('hora').innerHTML = horaActual;

    //CARGAR MUSICA AL CARGAR LA PAGINA
    if (musicaSuena == true) {
        musica.play();
    }

}
// FUNCIÓN PARA ACTUALIZAR ICONOS Y MENSAJES BASADOS EN EL VALOR DE APUESTA
function actualizarEstadoApuesta() {
    if (apuesta == 10000) {
        // Cambiar icono y mensaje para apuesta máxima
        document.getElementById("aumentarApuesta").src = "./assets/crash/aumentarApuestaMaxima.png";
        document.getElementById("textoTragaperras").innerHTML = i18next.t('apuestaMaxima');
        setTimeout(() => {
            document.getElementById("textoTragaperras").innerHTML = i18next.t('tirar');
        }, 2000);
    } else if (apuesta == 20) {
        // Cambiar icono y mensaje para apuesta mínima
        document.getElementById("disminuirApuesta").src = "./assets/crash/disminuirApuestaMinima.png";
        document.getElementById("textoTragaperras").innerHTML = i18next.t('apuestaMinima');
        setTimeout(() => {
            document.getElementById("textoTragaperras").innerHTML = i18next.t('tirar');
        }, 2000);
    } else {
        // Restaurar iconos y mensajes para valores intermedios
        document.getElementById("aumentarApuesta").src = "./assets/crash/aumentarApuesta.png";
        document.getElementById("disminuirApuesta").src = "./assets/crash/disminuirApuesta.png";
        document.getElementById("textoTragaperras").innerHTML = i18next.t('tirar');
        //SONIDO AUMENTAR Y DISMINUIR APUESTA
        var sonidoAumentarDisminuir = new Audio('assets/crash/aumentarDisminuirApuesta.mp3');
        sonidoAumentarDisminuir.volume = volumen;
        sonidoAumentarDisminuir.play();
    }
}

// Mostrar mensaje de error en el modal
function mostrarError(mensaje) {
    document.getElementById('mensajeError').textContent = mensaje;
    document.getElementById('modalError').style.display = "flex";

    //CERRAR AUTOMATICAMENTE A LOS 2 SEGUNDOS
    setTimeout(() => {
        document.getElementById('modalError').style.display = "none";
    }, 2000);

}

function mostrarModalVictoria(mensaje) {
    // Asigna el mensaje de victoria
    document.getElementById("modalVictoriaMensaje").innerText = mensaje;

    document.getElementById("modalVictoria").style.display = "flex";
    //SONIDO MONEDAS CAYENDO
    var sonidoMonedas = new Audio('assets/crash/sonidoMonedas.mp3');
    sonidoMonedas.volume = volumen;
    sonidoMonedas.play();

    //CERRAR AUTOMATICAMENTE A LOS 3 SEGUNDOS
    setTimeout(() => {
        document.getElementById('modalVictoria').style.display = "none";
    }, 3000);

}

function empezarJuego() {
    apuestaActual = apuesta;
    estaJugando = true;
    multiplicadorJirafa = 0.0;
    //Actualizamos texto
    document.getElementById("textoTragaperras").innerHTML = i18next.t('buenaSuerte');
    //ARRANCAR ANIMACIONES
    document.getElementById("contenedorJuego").style.animationPlayState = 'running';
    document.getElementById("imagenGirafa").style.animationPlayState = 'running';
    document.getElementById("imagenGirafa").src = "assets/crash/girafamoviendose.gif";
    document.getElementById("multi").style.display = "flex";

    //CAMBIAR BOTON POR EL DE PARAR
    document.getElementById("botonTirar").src = "assets/crash/Parar.png";

    duracionJuego = Math.random() * 100000;


    // Incrementar el multiplicador cada 100 ms
    intervaloMulti = setInterval(() => {
        multiplicadorJirafa += 0.01;
        document.getElementById("multi").innerHTML = multiplicadorJirafa.toFixed(2) + "X"; // Mostrar multiplicador
    }, 100);

    // Terminar el juego automáticamente después de la duración aleatoria
    timeout = setTimeout(() => {

        var sonidoRugido = new Audio('/assets/crash/rugidoLeon.mp3');
        sonidoRugido.volume = volumen;
        sonidoRugido.play();

        document.getElementById("imagenLeon").style.display = "block";
        document.getElementById("textoTragaperras").textContent = i18next.t('sigueJugando');
        document.getElementById("botonTirar").src = "assets/crash/botonTirar.png";
        document.getElementById("contenedorJuego").style.animationPlayState = 'paused';
        document.getElementById("imagenGirafa").style.animationPlayState = 'paused';
        document.getElementById("imagenGirafa").src = "assets/crash/girafaSuelo.gif";

        //DEPUES DE 3 SEGUNDOS ESCONDER EL LEON Y VOLVER A MOSTRAR MENSAJE DE TIRAR
        setTimeout(() => {
            document.getElementById("imagenLeon").style.display = "none";
            document.getElementById("textoTragaperras").textContent = i18next.t('tirar');
            document.getElementById("multi").style.display = "none";
            document.getElementById("imagenGirafa").src = "assets/crash/girafaEstatica.png";

            //RESETEAR CAMPOS POR DEFECTO
            premioTotal = 0;
            hayPremio = false;
            estaJugando = false;
            finalizarTirada();

        }, 3000);

        // Cancelar timeout y intervalo
        clearTimeout(timeout); // Detiene el rugido del león
        clearInterval(intervaloMulti); // Detiene el incremento del multiplicador


    }, duracionJuego);
}
function toggleJuego() {
    const botonTirar = document.getElementById("botonTirar");

    //SI ES EL BOTON DE TIRAR CUANDO ENTRE A LA FUNCION EMPEZAR EL JUEGO
    if (botonTirar.src.endsWith("botonTirar.png") && !estaJugando) {
        if (apuesta <= creditos) {
            empezarJuego();
            creditos -= apuesta;
            document.getElementById("creditosTotales").innerHTML = creditos;
            document.getElementById("creditosInfo").textContent = i18next.t('creditosActuales', { creditos: creditos });

            botonTirar.src = "assets/crash/Parar.png";

        } else {
            document.getElementById("textoTragaperras").innerHTML = i18next.t('noCreditosParaApostar');
            setTimeout(() => {
                document.getElementById("textoTragaperras").innerHTML = i18next.t('tirar');
            }, 2000);
        }
    } else if (botonTirar.src.endsWith("Parar.png") && estaJugando) {
        botonTirar.src = "assets/crash/botonTirar.png";
        document.getElementById("contenedorJuego").style.animationPlayState = 'paused';
        document.getElementById("imagenGirafa").style.animationPlayState = 'paused';
        document.getElementById("imagenGirafa").src = "assets/crash/girafaEstatica.png";
        document.getElementById("multi").style.display = "none";

        // Cancelar timeout y intervalo
        clearTimeout(timeout);
        clearInterval(intervaloMulti);

        //CALCULAR EL PREMIO TOTAL
        premioTotal = Math.round(apuestaActual * multiplicadorJirafa);

        //SI LO QUE GANA EL USUARIO ES MAYOR QUE SU APUESTA HAY PREMIO
        if (premioTotal > apuestaActual) {
            hayPremio = true;
        } else {
            document.getElementById("textoTragaperras").textContent = i18next.t('sigueJugando');
            setTimeout(() => {
                document.getElementById("textoTragaperras").textContent = i18next.t('tirar');
            }, 3000);
        }
        finalizarTirada();
        estaJugando = false;
    }

    //DAR PREMIO
    if (hayPremio == true && estaJugando == false) {
        premioTotal = Math.round(apuestaActual * multiplicadorJirafa);
        creditos += premioTotal;
        document.getElementById("creditosTotales").innerHTML = creditos;
        document.getElementById("creditosInfo").textContent = i18next.t('creditosActuales', { creditos: creditos });
        mostrarModalVictoria(i18next.t('hasGanado') + premioTotal + i18next.t('creditosModalVictoria'));
        document.getElementById("textoTragaperras").innerHTML = i18next.t('ganancias') + premioTotal + i18next.t('creditosModalVictoria');
        setTimeout(() => document.getElementById("textoTragaperras").innerHTML = i18next.t('tirar'), 5000);
        hayPremio = false;
    }
}
//REGISTRAR TIRADA EN BBDD
function finalizarTirada() {

    var resultado = premioTotal - apuesta;

    var datos = {
        usuarioDni: usuario.dni,
        idJuego: 2,
        apuesta: apuestaActual,
        resultado: resultado,
        multiplicador: parseFloat(multiplicadorJirafa.toFixed(2))
    };

    // Realizar una solicitud AJAX para crear la tirada  EN BBDD
    $.ajax({
        type: "POST",
        url: "/crearTiradaCrash",
        contentType: "application/json",
        data: JSON.stringify(datos),
        success: function (response) {
            console.log("Tirada registrada " + response);
        },
        error: function (error) {
            console.error("Error en la solicitud AJAX:", error);
        }
    });

    //RESTABLECER EL PREMIO TOTAL PARA LA PROXIMA TIRADA
    premioTotal = 0;

}
window.addEventListener('beforeunload', function (event) {

    //AL SALIR SI TIENE CREDITOS PENDIENTES CONVERTIRLOS A EUROS
    if (creditos > 0) {
        event.preventDefault();
        //PETICION GET PARA OBTENER CUANTOS CREDITOS TIENE ESTE JUEGO PARA CONVERTIR USUARIO DE PRUEBA
        $.ajax({
            type: "GET",
            url: "/convertirACreditos?id=2", // URL del endpoint en el backend junto con el id del juego
            success: function (multiplicador) {

                // EVITAR ERRORES DE PRECISION AL DIVIDIR
                saldo = (saldo * 100 + (creditos * 100) / multiplicador) / 100;
                saldo = parseFloat(saldo.toFixed(2));
                creditos = 0;

                var datos = {
                    dni: usuario.dni,
                    presupuesto: saldo
                };
                // Realizar una solicitud AJAX PARA ACTUALIZAR EL SALDO EN BBDD
                $.ajax({
                    type: "POST",
                    url: "/usuarios/actualizarSaldo",
                    contentType: "application/json",
                    data: JSON.stringify(datos),
                    success: function (response) {

                        document.getElementById("saldo").textContent = i18next.t('saldo', { saldo: saldo });
                        document.getElementById("saldoCreditosInfo").textContent = i18next.t('saldoActual', { saldo: saldo });
                        document.getElementById("creditosInfo").textContent = i18next.t('creditosActuales', { creditos: creditos });
                        document.getElementById("creditosTotales").innerHTML = creditos;
                        document.getElementById("inputRetiroCreditos").value = "";

                    },
                    error: function (error) {
                        console.error("Error en la solicitud AJAX:", error);
                    }
                });
            },
            error: function (error) {
                console.error("Error al obtener el multiplicador del juego:", error);
            }
        });
    }
});



