document.addEventListener("DOMContentLoaded", function () {
    setTimeout(() => {
        document.getElementById("preloader").style.display = "none";
    }, 3000); // Si quieres que dure 3 segundos


});

var estaGirando = false;
// Referencia a la barra de volumen y el texto del volumen
const barraVolumen = document.getElementById("barraVolumen");
const valorVolumen = document.getElementById("valorVolumen");
var volumen = barraVolumen.value / 100; // Convertir el valor de 0-100 a 0.0-1.0

var barraTiradas = document.getElementById("barraTiradas");
var valorTiradas = document.getElementById("valorTiradas");
var tiradas = barraTiradas.value;
var activadorGiros = false;
var hayPremio = false;


//CANCION 
var musica = new Audio('assets/tragaperras/musicaTragaperras.mp3');
musica.loop = true;
var musicaSuena = true;

//SALDO APUESTAS
var saldo = 0.00;
var creditos = 0;
var apuesta = 20;
var usuario = {};

var intervaloTiradas = null;

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
        console.error("Error al obtener el usuario:", error);
    }
});

//ICONOS
var girafa = "iconoGirafa.png";
var arbol = "iconoArbol.png";
var loro = "iconoLoro.png";
var platanos = "iconoPlatanos.png";
var flor = "iconoFlor.png";
var comodin = "comodin.png";

// Matriz de imágenes de los carretes
var carretes = [
    [girafa, arbol, loro, platanos, flor, flor, platanos, platanos, loro, arbol, flor, platanos, flor, loro, flor],
    [girafa, arbol, loro, platanos, flor, flor, platanos, platanos, loro, arbol, flor, platanos, flor, loro, comodin],
    [girafa, arbol, loro, platanos, flor, flor, platanos, platanos, loro, arbol, flor, platanos, flor, loro, flor]
];

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
                girosGratis: "¡HAS GANADO 10 GIROS GRATIS!",
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
                tituloTablaPremios: "Tabla de Premios",
                combinacion: "Combinación",
                jirafa: "Jirafa",
                arbol: "Árbol",
                loro: "Loro",
                platanos: "Plátanos",
                flor: "Flor",
                comodin: "Comodin",
                lineaCentral: "Línea central",
                lineaSuperiorInferior: "Línea superior/inferior",
                lineaDiagonal: "Línea en Diagonal",
                activadorGirosTabla: "Activador de Giros",
                activadorGirosDescripcion: "3 Jirafas activan 10 giros gratuitos con el multiplicador de la jirafa aplicado a todos los símbolos.",
                acumuladorMultiplicadores: "Acumulador de multiplicadores",
                acumuladorMultiplicadoresDescripcion: "¡Si se obtienen varias combinaciones ganadoras, ¡los multiplicadores de todas se suman!",
                descripcionComodin: "El comodín reemplaza cualquier símbolo y forma combinaciones ganadoras.",
                creditosTexto: "CREDITOS:",
                apuestaTexto: "APUESTA:",
                tituloTiradas: "NUMERO DE TIRADAS AUTOMÁTICAS",
                iniciarTiradas: "INICIAR TIRADAS AUTOMÁTICAS",
                apuestaMaxima: "¡APUESTA MAXIMA ALCANZADA!",
                apuestaMinima: "¡APUESTA MINIMA ALCANZADA!",
                buenaSuerte: "¡BUENA SUERTE!",
                tiradasRestantes: "TIRADAS RESTANTES: ",
                noCreditosParaApostar: "¡NO TIENES SUFICIENTES CREDITOS PARA ESA APUESTA!",
                hasGanado: "¡HAS GANADO ",
                creditosModalVictoria: " CREDITOS!",
                ganancias: "GANANCIAS: ",
                tituloHistorial: "HISTORIAL DE TUS ULTIMAS 5 TIRADAS",
                historialApuesta: "Apuesta",
                historialCombinación: "Combinacion",
                historialResultado: "Creditos obtenidos",
                tituloHistorial: "HISTORIAL DE TUS ULTIMAS 5 TIRADAS",
                historialApuesta: "Apuesta",
                historialCombinacion: "Combinación",
                historialResultado: "Creditos obtenidos",
                cerrarSesion: "Cerrar Sesión",
                sigueJugando: "¡SIGUE INTENTANDOLO!",

            }
        },
        en: {
            translation: {
                saldo: "Balance:{{saldo}}€",
                saldoActual: "Current Balance:{{saldo}}€",
                tirar: "SPIN TO WIN!",
                girosGratis: "YOU'VE WON 10 FREE SPINS!",
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
                tituloTablaPremios: "Table of Awards",
                combinacion: "Combination",
                jirafa: "Giraffe",
                arbol: "Tree",
                loro: "Parrot",
                platanos: "Bananas",
                flor: "Flower",
                comodin: "Wild",
                lineaCentral: "Central line",
                lineaSuperiorInferior: "Top / Bottom Line",
                lineaDiagonal: "Diagonal Line",
                activadorGirosTabla: "Free Spins",
                activadorGirosDescripcion: "3 giraffes activate 10 free spins with the giraffe multiplier applied to all symbols.",
                acumuladorMultiplicadores: "Multiplier accumulator",
                acumuladorMultiplicadoresDescripcion: "If multiple winning combinations are obtained, all multipliers are add up!",
                descripcionComodin: "The wild replaces any symbol and form of winning combinations.",
                creditosTexto: "CREDITS:",
                apuestaTexto: "BET:",
                tituloTiradas: "SELECT A NUMBER OF AUTOMATIC SPINS",
                iniciarTiradas: "START AUTOMATIC STRIPS",
                apuestaMaxima: "BET MAXIMUM REACHED!",
                apuestaMinima: "BET MINIMUM REACHED!",
                buenaSuerte: "GOOD LUCK!",
                tiradasRestantes: "REMAINING SPINS: ",
                noCreditosParaApostar: "YOU HAVE NO SUFFICIENT CREDITS FOR THAT BET!",
                hasGanado: "YOU'VE WON ",
                creditosModalVictoria: " CREDITS!",
                ganancias: "WINS: ",
                tituloHistorial: "HISTORY OF YOUR LAST 5 SPINS",
                historialApuesta: "Bet",
                historialCombinacion: "Combination",
                historialResultado: "Credits obtained",
                cerrarSesion: "Log out",
                sigueJugando: "KEEP TRYING!",

            }
        }
    }
}, function (err, t) {
    actualizarTexto(); // Traduce el contenido al cargar
});

window.addEventListener("load", function () {

    //Cargar hora por primera vez
    cargarHoraInicial();

    //JUEGO
    //APUESTAS
    //BOTON DE AUMENTAR APUESTA
    document.getElementById("aumentarApuesta").addEventListener("click", function () {

        //BLOQUEAR BOTON SI ESTAMOS EN EL BONO
        if (activadorGiros == true) {
            return;
        }

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
        //BLOQUEAR BOTON SI ESTAMOS EN EL BONO
        if (activadorGiros == true) {
            return;
        }
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

    //GIRAR CUANDO PULSE EL BOTON TIRAR
    document.getElementById("botonTirar").addEventListener('click', function () {

        //SI YA ESTA GIRANDO CORTAR LA EJECUCION
        if (estaGirando == true) {
            return;
        }

        //SI ES EL BOTON DE TIRAR
        if (document.getElementById("botonTirar").src.includes("botonTirar.png")) {
            if (apuesta <= creditos) {
                girarCarretes(carretes);
                //QUITAR APUESTA
                creditos -= apuesta;
                document.getElementById("creditosTotales").innerHTML = creditos;
                document.getElementById("creditosInfo").textContent = i18next.t('creditosActuales', { creditos: creditos });
            } else {

                document.getElementById("textoTragaperras").innerHTML = i18next.t('noCreditosParaApostar');
                setTimeout(() => {
                    document.getElementById("textoTragaperras").innerHTML = i18next.t('tirar');
                }, 2000);

            }
        }

        //SI ES EL BOTON DE DETENER Y EL BONO ESTA ACTIVO BLOQUEAR EL BOTON PARA QUE NO HAGA NADA
        if (document.getElementById("botonTirar").src.includes("tiradasAutomaticasParar.png") && activadorGiros == true) {
            return;
        }

        //SI ES EL BOTON DE DETENER 
        if (document.getElementById("botonTirar").src.includes("tiradasAutomaticasParar.png")) {
            // Detener las tiradas automáticas
            if (intervaloTiradas != null) {
                clearInterval(intervaloTiradas);
                intervaloTiradas = null;
            }
            // Restaurar el botón a su estado de 'Tirar'
            document.getElementById("botonTirar").src = "./assets/tragaperras/botonTirar.png";
            document.getElementById("tiradasAutomaticas").style.display = "flex";
            document.getElementById("cantidadTiradas").style.display = "none";
            return;
        }


    });

    //GIRAR CON EL ESPACIO
    window.addEventListener('keydown', function (event) {

        //SI YA ESTA GIRANDO CORTAR LA EJECUCION
        if (estaGirando == true) {
            event.preventDefault(); // Prevenir el desplazamiento de la página
            return;
        }

        if (event.key === ' ') {
            event.preventDefault(); // Prevenir el desplazamiento de la página


            //SI ES EL BOTON DE TIRAR QUE GIRE
            if (document.getElementById("botonTirar").src.includes("botonTirar.png") && activadorGiros == false) {
                if (apuesta <= creditos) {
                    girarCarretes(carretes);
                    //QUITAR APUESTA
                    creditos -= apuesta;
                    document.getElementById("creditosTotales").innerHTML = creditos;
                    document.getElementById("creditosInfo").textContent = i18next.t('creditosActuales', { creditos: creditos });
                } else {

                    document.getElementById("textoTragaperras").innerHTML = i18next.t('noCreditosParaApostar');
                    setTimeout(() => {
                        document.getElementById("textoTragaperras").innerHTML = i18next.t('tirar');
                    }, 2000);

                }
            }
            //SI ES EL BOTON DE DETENER Y EL BONO ESTA ACTIVO BLOQUEAR EL BOTON PARA QUE NO HAGA NADA
            if (document.getElementById("botonTirar").src.includes("tiradasAutomaticasParar.png") && activadorGiros == true) {
                return;
            }
        }
    });

    //TIRADAS AUTOMATICAS
    document.getElementById("tiradasAutomaticas").addEventListener("click", function () {
        document.getElementById("modalTiradasAutomaticasPantalla").style.display = "flex";
    });


    barraTiradas.addEventListener("input", function () {

        valorTiradas.textContent = barraTiradas.value; // Mostrar el valor actual

    });

    document.getElementById("iniciarTiradas").addEventListener("click", tiradasAutomaticas);

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
    document.getElementById("cerrarModalTablaPremios").addEventListener("click", function () {
        document.getElementById("modalTablaPremios").style.display = "none";
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
    document.getElementById("cerrarModalTiradas").addEventListener("click", function () {
        document.getElementById("modalTiradasAutomaticasPantalla").style.display = "none";
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
        if (event.target == document.getElementById("modalTablaPremios")) {
            document.getElementById("modalTablaPremios").style.display = "none";
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
        if (event.target == document.getElementById("modalTiradasAutomaticasPantalla")) {
            document.getElementById("modalTiradasAutomaticasPantalla").style.display = "none";
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
            iconoModoOscuro.src = "./assets/tragaperras/modoClaro.png";// Icono para el modo claro

        } else {
            document.getElementById("textoModoOscuro").textContent = i18next.t('textoModoOscuro');
            iconoModoOscuro.src = "./assets/tragaperras/modoOscuro.png"; // Icono para el modo oscuro
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
            icono.src = "./assets/tragaperras/iconoEspaña.png";
        } else {
            icono.src = "./assets/tragaperras/iconoIngles.png";
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

            //PETICION GET PARA OBTENER CUANTOS CREDITOS TIENE ESTE JUEGO POR EURO
            $.ajax({
                type: "GET",
                url: "/convertirACreditos?id=1", // URL del endpoint en el backend junto con el id del juego
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
            //PETICION GET PARA OBTENER CUANTOS CREDITOS TIENE ESTE JUEGO POR EURO
            $.ajax({
                type: "GET",
                url: "/convertirACreditos?id=1", // URL del endpoint en el backend junto con el id del juego
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

        document.getElementById("modalTablaPremios").style.display = "flex";
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
            document.getElementById("sonido").src = "./assets/tragaperras/sonidoRojo.png";
            document.getElementById("iconoSonidoModal").src = "./assets/tragaperras/sonidoMuteRojo.png";

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
            document.getElementById("sonido").src = "./assets/tragaperras/sonido.png";
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
        document.getElementById("iconoSonidoModal").src = "./assets/tragaperras/sonido.png";
        document.getElementById("sonido").src = "./assets/tragaperras/sonido.png"

        if (volumen == 0.0) {
            document.getElementById("iconoSonidoModal").src = "./assets/tragaperras/sonidoMuteRojo.png";
            document.getElementById("sonido").src = "./assets/tragaperras/sonidoRojo.png"
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
            document.getElementById("sonido").src = "./assets/tragaperras/sonidoRojo.png";
            document.getElementById("iconoSonidoModal").src = "./assets/tragaperras/sonidoMuteRojo.png";

            // Cambia el color de la barra y del slider thumb a rojo
            barraVolumen.classList.add("mute");





        } else {
            //REAUNUDAR LA MUSICA
            musica.play();
            musicaSuena = true;
            document.getElementById("sonido").src = "./assets/tragaperras/sonido.png";
            document.getElementById("iconoSonidoModal").src = "./assets/tragaperras/sonido.png";

            //VOLER AL COLOR ORIGINAL EN LA BARRA
            barraVolumen.classList.remove("mute");

        }

    });

    //VER HISTORICOS 
    document.getElementById("historialTiradasAbrir").addEventListener("click", function () {
        document.getElementById("modalHistorial").style.display = "flex";

        //PETICION GET PARA OBTENER LOS HISTORICOS DEL USUARIO 
        $.ajax({
            type: "GET",
            url: `/usuarios/obtenerHistoricosTragaperrasUsuario?dni=${usuario.dni}&idJuego=1`, //MANDAR DNI DEL USUARIO PARA BUSCARLO
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

                    var combinacionCelda = document.createElement("td");
                    combinacionCelda.textContent = tirada.combinacion;

                    var resultadoCelda = document.createElement("td");
                    resultadoCelda.textContent = tirada.resultado;

                    // Añadir las celdas a la fila
                    fila.appendChild(apuestaCelda);
                    fila.appendChild(combinacionCelda);
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
    document.getElementById("tituloTablaPremios").textContent = i18next.t('tituloTablaPremios');
    document.getElementById("combinacion").textContent = i18next.t('combinacion');
    document.getElementById("jirafa").innerHTML = '<img src="assets/tragaperras/iconoGirafa.png" alt="Jirafa"> ' + i18next.t('jirafa');
    document.getElementById("arbol").innerHTML = '<img src="assets/tragaperras/iconoArbol.png" alt="Árbol"> ' + i18next.t('arbol');
    document.getElementById("loro").innerHTML = '<img src="assets/tragaperras/iconoLoro.png" alt="Loro"> ' + i18next.t('loro');
    document.getElementById("platanos").innerHTML = '<img src="assets/tragaperras/iconoPlatanos.png" alt="Plátanos"> ' + i18next.t('platanos');
    document.getElementById("comodin").innerHTML = '<img src="assets/tragaperras/comodin.png" alt="Comodin"> ' + i18next.t('comodin');
    document.getElementById("flor").innerHTML = '<img src="assets/tragaperras/iconoFlor.png" alt="Flor"> ' + i18next.t('flor');
    document.getElementById("lineaCentral").textContent = i18next.t('lineaCentral');
    document.getElementById("lineaSuperiorInferior").textContent = i18next.t('lineaSuperiorInferior');
    document.getElementById("lineaDiagonal").textContent = i18next.t('lineaDiagonal');
    document.getElementById("activadorGirosTabla").textContent = i18next.t('activadorGirosTabla');
    document.getElementById("activadorGirosDescripcion").textContent = i18next.t('activadorGirosDescripcion');
    document.getElementById("acumuladorMultiplicadores").textContent = i18next.t('acumuladorMultiplicadores');
    document.getElementById("acumuladorMultiplicadoresDescripcion").textContent = i18next.t('acumuladorMultiplicadoresDescripcion');
    document.getElementById("descripcionComodin").textContent = i18next.t('descripcionComodin');
    document.getElementById("creditosTexto").textContent = i18next.t('creditosTexto');
    document.getElementById("apuestaTexto").textContent = i18next.t('apuestaTexto');
    document.getElementById("tituloTiradas").textContent = i18next.t('tituloTiradas');
    document.getElementById("iniciarTiradas").textContent = i18next.t('iniciarTiradas');
    document.getElementById("tituloHistorial").textContent = i18next.t('tituloHistorial');
    document.getElementById("historialApuesta").textContent = i18next.t('historialApuesta');
    document.getElementById("historialCombinacion").textContent = i18next.t('historialCombinacion');
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
        document.getElementById("aumentarApuesta").src = "./assets/tragaperras/aumentarApuestaMaxima.png";
        document.getElementById("textoTragaperras").innerHTML = i18next.t('apuestaMaxima');
        setTimeout(() => {
            document.getElementById("textoTragaperras").innerHTML = i18next.t('tirar');
        }, 2000);
    } else if (apuesta == 20) {
        // Cambiar icono y mensaje para apuesta mínima
        document.getElementById("disminuirApuesta").src = "./assets/tragaperras/disminuirApuestaMinima.png";
        document.getElementById("textoTragaperras").innerHTML = i18next.t('apuestaMinima');
        setTimeout(() => {
            document.getElementById("textoTragaperras").innerHTML = i18next.t('tirar');
        }, 2000);
    } else {
        // Restaurar iconos y mensajes para valores intermedios
        document.getElementById("aumentarApuesta").src = "./assets/tragaperras/aumentarApuesta.png";
        document.getElementById("disminuirApuesta").src = "./assets/tragaperras/disminuirApuesta.png";
        document.getElementById("textoTragaperras").innerHTML = i18next.t('tirar');
        //SONIDO AUMENTAR Y DISMINUIR APUESTA
        var sonidoAumentarDisminuir = new Audio('assets/tragaperras/aumentarDisminuirApuesta.mp3');
        sonidoAumentarDisminuir.volume = volumen;
        sonidoAumentarDisminuir.play();
    }
}

//FUNCION PARA GIRAR LOS CARRETES Y SIMULAR EL JUEGO
function girarCarretes(carretes) {
    //COJO LA APUESTA ACTUAL AL GIRAR LOS CARRETES POR SI EL USUARIO LE DIERA POR SUBIR LA APUESTA AUNQUE SE LE HAYA COBRADO UNA MENOR
    var apuestaActual = apuesta;
    if (estaGirando == true) return; // Si ya está girando, no hacer nada

    estaGirando = true; // Bloquea el evento mientras está girando

    var sonidoCarrete = new Audio('assets/tragaperras/spin.mp3');
    sonidoCarrete.volume = volumen;
    reiniciarCarretes();


    // Generamos 3 números aleatorios para cada carrete (de 1 a 15)
    let numerosAleatorios = [
        Math.floor(Math.random() * 15),  // Primer carrete Icono 1
        Math.floor(Math.random() * 15),  // Primer carrete Icono 2
        Math.floor(Math.random() * 15),  // Primer carrete Icono 3

        Math.floor(Math.random() * 15),  // Segundo carrete Icono 1
        Math.floor(Math.random() * 15),  // Segundo carrete Icono 2
        Math.floor(Math.random() * 15),  // Tercer carrete Icono 3

        Math.floor(Math.random() * 15),  // Primer carrete Icono 1
        Math.floor(Math.random() * 15),  // Segundo carrete Icono 2
        Math.floor(Math.random() * 15),  // Tercer carrete Icono 3

    ];

    //Actualizamos texto
    document.getElementById("textoTragaperras").innerHTML = i18next.t('buenaSuerte');


    // Acceder a los carretes y actualizar las imágenes
    let carrete1 = document.getElementById("carrete1").getElementsByTagName("img");
    let carrete2 = document.getElementById("carrete2").getElementsByTagName("img");
    let carrete3 = document.getElementById("carrete3").getElementsByTagName("img");


    // Agregar la clase 'girar' a cada icono del carrete 1
    for (i = 0; i < carrete1.length; i++) {
        carrete1[i].classList.add('girar');
    }




    // ESPERO DOS SEGUNDOS PARA QUE COMIENCEN LOS CARRETES A GIRAR Y NO SE VEA EL CAMBIO DE IMAGEN
    setTimeout(() => {
        //COMBINACIONES A COMPROBAR
        //CAMBIO LAS IMAGENES ALEATORIAMENTE 
        carrete1[0].src = "assets/tragaperras/" + carretes[0][numerosAleatorios[0]];
        carrete1[1].src = "assets/tragaperras/" + carretes[0][numerosAleatorios[1]];
        carrete1[2].src = "assets/tragaperras/" + carretes[0][numerosAleatorios[2]];


    }, 2000);

    setTimeout(() => {

        //AQUI SE CAMBIA EL RESTO DE IMAGENES DE LA TRAGAPERRAS PARA QUE EN LA PROXIMA TIRADA LOS ICONOS NO SEAN LOS MISMOS Y LA ANIMACION DE GIRO SEA DINAMICA
        for (i = 3; i < carrete1.length; i++) {
            var aleatorio = Math.floor(Math.random() * 15);
            carrete1[i].src = "assets/tragaperras/" + carretes[0][aleatorio];
        }

        for (i = 3; i < carrete2.length; i++) {
            var aleatorio = Math.floor(Math.random() * 15);
            carrete2[i].src = "assets/tragaperras/" + carretes[1][aleatorio];
        }

        for (i = 3; i < carrete3.length; i++) {
            var aleatorio = Math.floor(Math.random() * 15);
            carrete3[i].src = "assets/tragaperras/" + carretes[2][aleatorio];
        }

        // PARAMOS LA ANIMACION ESPERANDO UN POCO PARA QUE DE TIEMPO A QUE LLEGUE A SU POSICION INICIAL

        for (i = 0; i < carrete1.length; i++) {
            carrete1[i].classList.remove('girar');
        }


        sonidoCarrete.play();

        //ANIMACION CARRETE 2
        for (i = 0; i < carrete2.length; i++) {
            carrete2[i].classList.add('girar');
        }

        // ESPERO DOS SEGUNDOS PARA QUE COMIENCEN LOS CARRETES A GIRAR Y NO SE VEA EL CAMBIO DE IMAGEN
        setTimeout(() => {

            //COMBINACIONES A COMPROBAR
            //CAMBIO LAS IMAGENES ALEATORIAMENTE 
            carrete2[0].src = "assets/tragaperras/" + carretes[1][numerosAleatorios[3]];
            carrete2[1].src = "assets/tragaperras/" + carretes[1][numerosAleatorios[4]];
            carrete2[2].src = "assets/tragaperras/" + carretes[1][numerosAleatorios[5]];

        }, 2000);
        setTimeout(() => {

            //AQUI SE CAMBIA EL RESTO DE IMAGENES DE LA TRAGAPERRAS PARA QUE EN LA PROXIMA TIRADA LOS ICONOS NO SEAN LOS MISMOS Y LA ANIMACION DE GIRO SEA DINAMICA
            for (i = 3; i < carrete1.length; i++) {
                var aleatorio = Math.floor(Math.random() * 15);
                carrete1[i].src = "assets/tragaperras/" + carretes[0][aleatorio];
            }

            for (i = 3; i < carrete2.length; i++) {
                var aleatorio = Math.floor(Math.random() * 15);
                carrete2[i].src = "assets/tragaperras/" + carretes[1][aleatorio];
            }

            for (i = 3; i < carrete3.length; i++) {
                var aleatorio = Math.floor(Math.random() * 15);
                carrete3[i].src = "assets/tragaperras/" + carretes[2][aleatorio];
            }

            // PARAMOS LA ANIMACION ESPERANDO UN POCO PARA QUE DE TIEMPO A QUE LLEGUE A SU POSICION INICIAL

            for (i = 0; i < carrete2.length; i++) {
                carrete2[i].classList.remove('girar');
            }


            sonidoCarrete.play();

            //ANIMACION CARRETE 3
            for (i = 0; i < carrete3.length; i++) {
                carrete3[i].classList.add('girar');
            }


            // ESPERO DOS SEGUNDOS PARA QUE COMIENCEN LOS CARRETES A GIRAR Y NO SE VEA EL CAMBIO DE IMAGEN
            setTimeout(() => {
                //COMBINACIONES A COMPROBAR
                //CAMBIO LAS IMAGENES ALEATORIAMENTE 
                carrete3[0].src = "assets/tragaperras/" + carretes[2][numerosAleatorios[6]];
                carrete3[1].src = "assets/tragaperras/" + carretes[2][numerosAleatorios[7]];
                carrete3[2].src = "assets/tragaperras/" + carretes[2][numerosAleatorios[8]];

            }, 2000);
            setTimeout(() => {

                //AQUI SE CAMBIA EL RESTO DE IMAGENES DE LA TRAGAPERRAS PARA QUE EN LA PROXIMA TIRADA LOS ICONOS NO SEAN LOS MISMOS Y LA ANIMACION DE GIRO SEA DINAMICA
                for (i = 3; i < carrete1.length; i++) {
                    var aleatorio = Math.floor(Math.random() * 15);
                    carrete1[i].src = "assets/tragaperras/" + carretes[0][aleatorio];
                }

                for (i = 3; i < carrete2.length; i++) {
                    var aleatorio = Math.floor(Math.random() * 15);
                    carrete2[i].src = "assets/tragaperras/" + carretes[1][aleatorio];
                }

                for (i = 3; i < carrete3.length; i++) {
                    var aleatorio = Math.floor(Math.random() * 15);
                    carrete3[i].src = "assets/tragaperras/" + carretes[2][aleatorio];
                }

                // PARAMOS LA ANIMACION ESPERANDO UN POCO PARA QUE DE TIEMPO A QUE LLEGUE A SU POSICION INICIAL

                for (i = 0; i < carrete3.length; i++) {
                    carrete3[i].classList.remove('girar');
                }


                sonidoCarrete.play();

                //DEPUES DE TODAS LAS ANIMACIONES ACTIVAMOS QUE SE PUEDA VOLVER A TIRAR Y COMPROBAMOS LOS SIMBOLOS
                comprobarSimbolos(carrete1, carrete2, carrete3, apuestaActual);

                //SI HAY PREMIO ESPERAR A QUE CAMBIE EL TEXTO DE LA TRAGAPERRAS
                if (hayPremio == true) {

                    setTimeout(() => {
                        estaGirando = false; // Liberar para la siguiente tirada
                        hayPremio = false;
                    }, 5000); // Esperar 5 segundos antes de la siguiente tirada

                } else {
                    document.getElementById("textoTragaperras").textContent = i18next.t('sigueJugando');
                    setTimeout(() => {
                        document.getElementById("textoTragaperras").textContent = i18next.t('tirar');
                        estaGirando = false; // Liberar para la siguiente tirada
                        hayPremio = false;
                    }, 2000); // Esperar 5 segundos antes de la siguiente tirada
                }


            }, 3000); // Tiempo de duración de la animación (3 segundos)


        }, 3000); // Tiempo de duración de la animación (3 segundos)

    }, 3000); // Tiempo de duración de la animación (3 segundos)

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

function comprobarSimbolos(carrete1, carrete2, carrete3, apuestaActual) {

    var premioTotal = 0;
    var combinacion = "";

    var girafa = {
        imagen: "assets/tragaperras/iconoGirafa.png",
        multiCentral: 100,
        multiHorizontalesArribaAbajo: 50,
        multiDiagonal: 50
    };
    var arbol = {
        imagen: "assets/tragaperras/iconoArbol.png",
        multiCentral: 30,
        multiHorizontalesArribaAbajo: 15,
        multiDiagonal: 15
    };
    var loro = {
        imagen: "assets/tragaperras/iconoLoro.png",
        multiCentral: 20,
        multiHorizontalesArribaAbajo: 10,
        multiDiagonal: 10
    };
    var platanos = {
        imagen: "assets/tragaperras/iconoPlatanos.png",
        multiCentral: 10,
        multiHorizontalesArribaAbajo: 5,
        multiDiagonal: 5
    };

    var flor = {
        imagen: "assets/tragaperras/iconoFlor.png",
        multiCentral: 5,
        multiHorizontalesArribaAbajo: 2.5,
        multiDiagonal: 2.5
    };



    //MULTIPLICADOR DE LA GIRAFA PARA TODOS LOS SIMBOLOS EN EL BONO DE LAS 3 GIRAFAS
    if (activadorGiros == true) {

        flor.multiCentral = 100;
        flor.multiHorizontalesArribaAbajo = 50;
        flor.multiDiagonal = 50;

        platanos.multiCentral = 100;
        platanos.multiHorizontalesArribaAbajo = 50;
        platanos.multiDiagonal = 50;

        loro.multiCentral = 100;
        loro.multiHorizontalesArribaAbajo = 50;
        loro.multiDiagonal = 50;


        arbol.multiCentral = 100;
        arbol.multiHorizontalesArribaAbajo = 50;
        arbol.multiDiagonal = 50;

    }



    // Procesar todos los símbolos y acumular premios y multiplicadores
    let resultadoGirafa = calcularPremioCombinado(girafa, carrete1, carrete2, carrete3, apuestaActual);
    premioTotal += resultadoGirafa.premio;          // Acumular el premio
    //SI EL RESULTADO ES DISTINTO DE SIN COMBINAR SIGNIFICA QUE HAY UNA COMBINACION GANADORA 
    if (resultadoGirafa.combinacion !== "Sin combinar") {
        combinacion = resultadoGirafa.combinacion;
    }


    let resultadoArbol = calcularPremioCombinado(arbol, carrete1, carrete2, carrete3, apuestaActual);
    premioTotal += resultadoArbol.premio;
    //SI EL RESULTADO ES DISTINTO DE SIN COMBINAR SIGNIFICA QUE HAY UNA COMBINACION GANADORA 
    if (resultadoArbol.combinacion !== "Sin combinar") {
        combinacion = resultadoArbol.combinacion;
    }


    let resultadoLoro = calcularPremioCombinado(loro, carrete1, carrete2, carrete3, apuestaActual);
    premioTotal += resultadoLoro.premio;
    //SI EL RESULTADO ES DISTINTO DE SIN COMBINAR SIGNIFICA QUE HAY UNA COMBINACION GANADORA 
    if (resultadoLoro.combinacion !== "Sin combinar") {
        combinacion = resultadoLoro.combinacion;
    }



    let resultadoPlatanos = calcularPremioCombinado(platanos, carrete1, carrete2, carrete3, apuestaActual);
    premioTotal += resultadoPlatanos.premio;
    //SI EL RESULTADO ES DISTINTO DE SIN COMBINAR SIGNIFICA QUE HAY UNA COMBINACION GANADORA 
    if (resultadoPlatanos.combinacion !== "Sin combinar") {
        combinacion += " " + resultadoPlatanos.combinacion;
    }


    let resultadoFlor = calcularPremioCombinado(flor, carrete1, carrete2, carrete3, apuestaActual);
    premioTotal += resultadoFlor.premio;
    //SI EL RESULTADO ES DISTINTO DE SIN COMBINAR SIGNIFICA QUE HAY UNA COMBINACION GANADORA 
    if (resultadoFlor.combinacion !== "Sin combinar") {
        combinacion += " " + resultadoFlor.combinacion;
    }


    // Si hay algún multiplicador, calcular el premio
    if (premioTotal > 0) {
        creditos += premioTotal;
        document.getElementById("creditosTotales").innerHTML = creditos;
        document.getElementById("creditosInfo").textContent = i18next.t('creditosActuales', { creditos: creditos });
        mostrarModalVictoria(i18next.t('hasGanado') + premioTotal + i18next.t('creditosModalVictoria'));
        document.getElementById("textoTragaperras").innerHTML = i18next.t('ganancias') + premioTotal + i18next.t('creditosModalVictoria');
        setTimeout(() => document.getElementById("textoTragaperras").innerHTML = i18next.t('tirar'), 5000);
        hayPremio = true;

    } else {
        document.getElementById("textoTragaperras").innerHTML = i18next.t('tirar');
        combinacion = "Sin combinar";
    }


    //REGISTRAR TIRADA EN BBDD Y FINALIZAR LA TIRADA
    finalizarTirada(apuestaActual, premioTotal, combinacion.trim());


}


//REGISTRAR TIRADA EN BBDD
function finalizarTirada(apuestaActual, premioTotal, combinacion) {

    var resultado = premioTotal - apuestaActual;


    var datos = {
        usuarioDni: usuario.dni,
        idJuego: 1,
        apuesta: apuestaActual,
        resultado: resultado,
        combinacion: combinacion
    };

    // Realizar una solicitud AJAX para crear la tirada  EN BBDD
    $.ajax({
        type: "POST",
        url: "/crearTiradaTragaperras",
        contentType: "application/json",
        data: JSON.stringify(datos),
        success: function (response) {
            console.log("Tirada registrada " + response);
        },
        error: function (error) {
            console.error("Error en la solicitud AJAX:", error);
        }
    });



}



function calcularPremioCombinado(simbolo, carrete1, carrete2, carrete3, apuestaActual) {


    // Obtiene solo el nombre de la imagen desde su ruta
    function obtenerNombreImagen(src) {
        return src.split('/').pop();
    }

    //ACUMULARA EL MULTIPLICADOR DE TODAS LAS CASUISTICAS Y SI HAY MAS DE DOS SE SUMARA 
    var multiplicadorTotal = 0;

    //ALMACENA LAS IMAGENES DE LAS COMBINACIONES GANADORAS PARA RESALTARLAS
    var combinacionesGanadoras = [];


    var combinacionTexto = "";

    //OBTENER EL NOMBRE DEL SIMBOLO 
    var nombreSimbolo = obtenerNombreImagen(simbolo.imagen).replace("icono", "").replace(".png", "").toUpperCase();


    // COMBINACION LINEA CENTRAL
    if (
        // COMPROBACIONES DE QUE EL PRIMER SEGUNDO Y TERCER CARRETE COINCIDAN Y SI HAY COMODIN
        ((
            obtenerNombreImagen(carrete1[1].src) === obtenerNombreImagen(carrete2[1].src) &&
            obtenerNombreImagen(carrete1[1].src) === obtenerNombreImagen(carrete3[1].src)
        ) ||
            (
                obtenerNombreImagen(carrete1[1].src) === obtenerNombreImagen(carrete3[1].src) &&
                obtenerNombreImagen(carrete2[1].src) === comodin
            ))
        &&
        obtenerNombreImagen(simbolo.imagen) === obtenerNombreImagen(carrete1[1].src)) {
        multiplicadorTotal += simbolo.multiCentral;
        combinacionesGanadoras.push([carrete1[1], carrete2[1], carrete3[1]]);
        //CONCATENAR COMBINACION GANADORA
        combinacionTexto += "Central " + nombreSimbolo + " ";
    }


    // COMBINACION LINEA SUPERIOR
    if (
        // COMPROBACIONES DE QUE EL PRIMER SEGUNDO Y TERCER CARRETE COINCIDAN Y SI HAY COMODIN
        ((
            obtenerNombreImagen(carrete1[0].src) === obtenerNombreImagen(carrete2[0].src) &&
            obtenerNombreImagen(carrete1[0].src) === obtenerNombreImagen(carrete3[0].src)
        ) ||
            (
                obtenerNombreImagen(carrete1[0].src) === obtenerNombreImagen(carrete3[0].src) &&
                obtenerNombreImagen(carrete2[0].src) === comodin
            ))
        &&
        obtenerNombreImagen(simbolo.imagen) === obtenerNombreImagen(carrete1[0].src)) {
        multiplicadorTotal += simbolo.multiHorizontalesArribaAbajo;
        combinacionesGanadoras.push([carrete1[0], carrete2[0], carrete3[0]]);
        //CONCATENAR COMBINACION GANADORA
        combinacionTexto += "Superior " + nombreSimbolo + " ";
    }


    // COMBINACION LINEA INFERIOR
    if (
        // COMPROBACIONES DE QUE EL PRIMER SEGUNDO Y TERCER CARRETE COINCIDAN Y SI HAY COMODIN
        ((
            obtenerNombreImagen(carrete1[2].src) === obtenerNombreImagen(carrete2[2].src) &&
            obtenerNombreImagen(carrete1[2].src) === obtenerNombreImagen(carrete3[2].src)
        ) ||
            (
                obtenerNombreImagen(carrete1[2].src) === obtenerNombreImagen(carrete3[2].src) &&
                obtenerNombreImagen(carrete2[2].src) === comodin
            ))
        &&
        obtenerNombreImagen(simbolo.imagen) === obtenerNombreImagen(carrete1[2].src)) {
        multiplicadorTotal += simbolo.multiHorizontalesArribaAbajo;
        combinacionesGanadoras.push([carrete1[2], carrete2[2], carrete3[2]]);
        //CONCATENAR COMBINACION GANADORA
        combinacionTexto += "Inferior " + nombreSimbolo + " ";
    }

    // COMBINACION DIAGONAL IZQUIERDA
    if (
        // COMPROBACIONES DE QUE EL PRIMER SEGUNDO Y TERCER CARRETE COINCIDAN Y SI HAY COMODIN
        ((
            obtenerNombreImagen(carrete1[0].src) === obtenerNombreImagen(carrete2[1].src) &&
            obtenerNombreImagen(carrete1[0].src) === obtenerNombreImagen(carrete3[2].src)
        ) ||
            (
                obtenerNombreImagen(carrete1[0].src) === obtenerNombreImagen(carrete3[2].src) &&
                obtenerNombreImagen(carrete2[1].src) === comodin
            ))
        &&
        obtenerNombreImagen(simbolo.imagen) === obtenerNombreImagen(carrete1[0].src)) {
        multiplicadorTotal += simbolo.multiDiagonal;
        combinacionesGanadoras.push([carrete1[0], carrete2[1], carrete3[2]]);
        //CONCATENAR COMBINACION GANADORA
        combinacionTexto += "Diagonal izquierda " + nombreSimbolo + " ";
    }


    // COMBINACION DIAGONAL DERECHA
    if (
        // COMPROBACIONES DE QUE EL PRIMER SEGUNDO Y TERCER CARRETE COINCIDAN Y SI HAY COMODIN
        ((
            obtenerNombreImagen(carrete3[0].src) === obtenerNombreImagen(carrete2[1].src) &&
            obtenerNombreImagen(carrete3[0].src) === obtenerNombreImagen(carrete1[2].src)
        ) ||
            (
                obtenerNombreImagen(carrete3[0].src) === obtenerNombreImagen(carrete1[2].src) &&
                obtenerNombreImagen(carrete2[1].src) === comodin
            ))
        &&
        obtenerNombreImagen(simbolo.imagen) === obtenerNombreImagen(carrete3[0].src)) {
        multiplicadorTotal += simbolo.multiDiagonal;
        combinacionesGanadoras.push([carrete3[0], carrete2[1], carrete1[2]]);
        //CONCATENAR COMBINACION GANADORA
        combinacionTexto += "Diagonal Derecha " + nombreSimbolo + " ";
    }

    // Resalta combinaciones ganadoras
    combinacionesGanadoras.forEach(imagenes => resaltarImagenes(imagenes));

    //SI SON TRES GIRAFAS ACTIVAMOS GIROS GRATIS
    if (simbolo.imagen == "assets/tragaperras/iconoGirafa.png" && multiplicadorTotal > 0 && activadorGiros == false) {
        activadorGiros = true;

        // Esperar 2 segundos antes de mostrar el modal de giros gratis para que se vea el premio de la triple girafa
        setTimeout(() => {
            mostrarModalVictoria(i18next.t('girosGratis'));
            tiradasAutomaticas();
        }, 2000);


    }



    // DEVUELVE UN OBJETO CON EL PREMIO Y SU COMBINACION SI HA SIDO EXITOSA
    return {
        premio: apuestaActual * multiplicadorTotal, // Premio calculado
        combinacion: combinacionTexto.trim() || "Sin combinar" //COMBINACION
    };

}

function mostrarModalVictoria(mensaje) {
    // Asigna el mensaje de victoria
    document.getElementById("modalVictoriaMensaje").innerText = mensaje;

    document.getElementById("modalVictoria").style.display = "flex";
    //SONIDO MONEDAS CAYENDO
    var sonidoMonedas = new Audio('assets/tragaperras/sonidoMonedas.mp3');
    sonidoMonedas.volume = volumen;
    sonidoMonedas.play();

    //CERRAR AUTOMATICAMENTE A LOS 3 SEGUNDOS
    setTimeout(() => {
        document.getElementById('modalVictoria').style.display = "none";
    }, 3000);

}


// Función para resaltar imágenes específicas
function resaltarImagenes(imagenes) {
    imagenes.forEach(imagen => {

        imagen.classList.add("destacar"); // Añadir clase de resaltar

    });
}

// Función para reiniciar los carretes y quitar el resaltado
function reiniciarCarretes() {
    // Eliminar la clase 'destacar' de todas las imágenes
    const imagenesDestacadas = document.querySelectorAll('.destacar');
    imagenesDestacadas.forEach(imagen => {
        imagen.classList.remove('destacar');
    });
}

function tiradasAutomaticas() {
    document.getElementById("modalTiradasAutomaticasPantalla").style.display = "none";
    tiradas = barraTiradas.value;

    //CAMBIAR EL VALOR DE LAS TIRADAS SI SE LLAMA DESDE EL BONO A 10 TIRADAS GRATUITAS
    if (activadorGiros == true) {
        // Detener cualquier tirada automática en curso
        clearInterval(intervaloTiradas);

        tiradas = 10;
        //PRIMERA TIRADA SIN DESCONTAR NADA PORQUE SON GRATIS
        document.getElementById("botonTirar").src = "./assets/tragaperras/tiradasAutomaticasParar.png";
        document.getElementById("disminuirApuesta").src = "./assets/tragaperras/disminuirApuestaMinima.png";
        document.getElementById("aumentarApuesta").src = "./assets/tragaperras/aumentarApuestaMaxima.png";
        document.getElementById("tiradasAutomaticas").style.display = "none";
        document.getElementById("cantidadTiradas").innerHTML = i18next.t('tiradasRestantes') + tiradas;
        document.getElementById("cantidadTiradas").style.display = "flex";
        girarCarretes(carretes);
        tiradas--;

        intervaloTiradas = setInterval(function () {
            if (tiradas > 0) {
                document.getElementById("cantidadTiradas").innerHTML = i18next.t('tiradasRestantes') + tiradas;
                girarCarretes(carretes);
                tiradas--;

            } else {
                // Si no hay más tiradas detener
                activadorGiros = false;
                clearInterval(intervaloTiradas);
                document.getElementById("botonTirar").src = "./assets/tragaperras/botonTirar.png";
                document.getElementById("disminuirApuesta").src = "./assets/tragaperras/disminuirApuesta.png";
                document.getElementById("aumentarApuesta").src = "./assets/tragaperras/aumentarApuesta.png";
                document.getElementById("tiradasAutomaticas").style.display = "flex";
                document.getElementById("cantidadTiradas").style.display = "none";
            }
        }, 16000); // Tiempo entre tiradas (16 segundos por si gana de tiempo al modal)

        //TIRADAS AUTOMATICAS COBRANDO 
    } else {

        // Realizar la primera tirada inmediatamente
        if (tiradas > 0 && apuesta <= creditos) {


            document.getElementById("botonTirar").src = "./assets/tragaperras/tiradasAutomaticasParar.png";
            document.getElementById("tiradasAutomaticas").style.display = "none";
            document.getElementById("cantidadTiradas").innerHTML = i18next.t('tiradasRestantes') + tiradas;
            document.getElementById("cantidadTiradas").style.display = "flex";
            girarCarretes(carretes);

            // Descontar la apuesta de la primera tirada
            creditos -= apuesta;

            document.getElementById("creditosTotales").innerHTML = creditos;
            document.getElementById("creditosInfo").textContent = i18next.t('creditosActuales', { creditos: creditos });

            tiradas--;


        } else {
            document.getElementById("textoTragaperras").innerHTML = i18next.t('noCreditosParaApostar');
            setTimeout(() => {
                document.getElementById("textoTragaperras").innerHTML = i18next.t('tirar');
            }, 2000);
            return; // Salir si no se puede realizar la primera tirada
        }

        // Ejecutar tiradas automáticas con un intervalo
        intervaloTiradas = setInterval(function () {

            if (tiradas > 0 && apuesta <= creditos) {

                document.getElementById("cantidadTiradas").innerHTML = i18next.t('tiradasRestantes') + tiradas;
                girarCarretes(carretes);
                // Descontar apuesta
                creditos -= apuesta;
                document.getElementById("creditosTotales").innerHTML = creditos;
                document.getElementById("creditosInfo").textContent = i18next.t('creditosActuales', { creditos: creditos });

                tiradas--;


            } else {
                // Si no hay más tiradas o créditos insuficientes, detener
                activadorGiros = false;
                clearInterval(intervaloTiradas);
                document.getElementById("botonTirar").src = "./assets/tragaperras/botonTirar.png";
                document.getElementById("tiradasAutomaticas").style.display = "flex";
                document.getElementById("cantidadTiradas").style.display = "none";
                if (apuesta > creditos) {
                    document.getElementById("textoTragaperras").innerHTML = i18next.t('noCreditosParaApostar');
                    setTimeout(() => {
                        document.getElementById("textoTragaperras").innerHTML = i18next.t('tirar');
                    }, 2000);
                }
            }
        }, 16000); // Tiempo entre tiradas (16 segundos por si gana de tiempo al modal)
    }



}




window.addEventListener('beforeunload', function (event) {

    //AL SALIR SI TIENE CREDITOS PENDIENTES CONVERTIRLOS A EUROS
    if (creditos > 0) {
        event.preventDefault();
        //PETICION GET PARA OBTENER CUANTOS CREDITOS TIENE ESTE JUEGO PARA CONVERTIR USUARIO DE PRUEBA
        $.ajax({
            type: "GET",
            url: "/convertirACreditos?id=1", // URL del endpoint en el backend junto con el id del juego
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




