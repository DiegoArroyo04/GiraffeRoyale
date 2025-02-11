
document.addEventListener("DOMContentLoaded", function () {
    cargarHoraInicial()
    actualizarTexto(); // Llamar a la función solo cuando el DOM está listo
});

var usuario = {};
var saldo = 0.00;

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
                cerrarSesion: "Cerrar Sesión"

            }
        },
        en: {
            translation: {
                saldo: "Balance:{{saldo}}€",
                saldoActual: "Current Balance:{{saldo}}€",
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
                cerrarSesion: "Log out"

            }
        }
    }
}, function (err, t) {
    actualizarTexto(); // Traduce el contenido al cargar
});


function actualizarTexto() {

    // Traduce el saldo dinámico
    var saldoElement = document.getElementById("saldo");
    saldoElement.textContent = i18next.t('saldo', { saldo: saldo });

    // ELEMENTOS ESTATICOS
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
    document.getElementById("cerrarSesion").textContent = i18next.t('cerrarSesion');

}

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

    // CONVERTIR A DECIMAL
    var deposito = parseFloat(document.getElementById("inputDeposito").value);

    if (!isNaN(deposito) && deposito > 0) {
        saldo += deposito;
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

    //CONVERTIR A DECIMAL
    var retiro = parseFloat(document.getElementById("inputRetiro").value);

    // Verifica si el valor es válido y que no sea mayor que el saldo
    if (!isNaN(retiro) && retiro > 0 && retiro <= saldo) {
        saldo -= retiro; // Resta el saldo retirado

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

