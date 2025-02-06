
document.addEventListener("DOMContentLoaded", function () {
    // Event listener para el formulario
    const formulario = document.getElementById("formulario");
    formulario.addEventListener("submit", validarFormulario);

    //Inicializar modal terminos
    modalTerminos();

});

function comprobarContrasenia() {

    var pass = document.getElementById("pass").value;
    var pass2 = document.getElementById("pass2").value;
    var caracteresEspeciales = "!@#$%^&*(),.?\":{}|<>/";
    var tieneCaracteresEspeciales = false;
    var numeros = "1234567890";
    var tieneNumeros = false;
    var tieneMayuscula = false;
    var tieneMinuscula = false;

    //COMPROBACION CARACTER ESPECIAL,CARACTER NUMERICO,MINUSCULA Y MAYUSCULA
    for (i = 0; i < pass.length; i++) {
        if (caracteresEspeciales.includes(pass[i])) {
            tieneCaracteresEspeciales = true;
        }
        if (numeros.includes(pass[i])) {
            tieneNumeros = true;
        }
        if (pass[i] >= 'A' && pass[i] <= 'Z') {
            tieneMayuscula = true;
        }
        if (pass[i] >= 'a' && pass[i] <= 'z') {
            tieneMinuscula = true;
        }

    }

    //SI LA CONTRASEÑAS CUMPLE TODOS LOS REQUERIMIENTOS CONTRASEÑA VALIDADA SI NO ABRE EL MODAL CON SU ERROR ESPECIFICO
    if ((pass == pass2) && (pass.length >= 8 && pass2.length >= 8) && (tieneCaracteresEspeciales == true) && (tieneNumeros == true) && (tieneMayuscula == true)
        && (tieneMinuscula == true)) {
        return true;
    } else if (pass != pass2) {
        mostrarModal("Contraseñas no validas, tienen que ser iguales");
        return false;
    } else if (pass.length < 8 && pass2.length < 8) {
        mostrarModal("Contraseñas no validas, tienen que tener mas de 8 caracteres");
        return false;
    } else if (tieneCaracteresEspeciales == false) {
        mostrarModal("Contraseñas no validas, debe contener algun caracter especial");
        return false;
    } else if (tieneNumeros == false) {
        mostrarModal("Contraseñas no validas, debe contener algun numero");
        return false;
    } else if (tieneMayuscula == false) {
        mostrarModal("Contraseñas no validas, debe contener alguna Mayuscula");
        return false;
    } else if (tieneMinuscula == false) {
        mostrarModal("Contraseñas no validas, debe contener alguna Minuscula");
        return false;
    }
}


function comprobarMayoriaEdad() {

    var fechaNacimiento = new Date(document.getElementById("fecha_nacimiento").value);

    var fechaActual = new Date();

    // Calcular la diferencia en años entre la fecha actual y la fecha de nacimiento
    var edadUsuario = fechaActual.getFullYear() - fechaNacimiento.getFullYear();

    // Verificar si ya cumplió años este año
    var mesActual = fechaActual.getMonth();
    var diaActual = fechaActual.getDate();
    var mesNacimiento = fechaNacimiento.getMonth();
    var diaNacimiento = fechaNacimiento.getDate();
    if (mesActual < mesNacimiento || (mesActual == mesNacimiento && diaActual < diaNacimiento)) {
        edadUsuario--;
    }


    if (edadUsuario >= 18) {
        return true;
    } else {
        mostrarModal("Error al registrarse.Debes tener al menos 18 años para registrarte.");
        return false;
    }

}
function comprobarDni() {
    //FORMATEO DE DNI
    var dni = document.getElementById("dni").value;
    var dniCadena = dni.toString();
    var dniFormateado = dni.toUpperCase();
    var longitudCorrecta = false;
    var letrasValidasDni = "TRWAGMYFPDXBNJZSQVHLCKE";
    var letraCorrecta = false;
    var numerosDni = "0123456789";
    var numerosCorrectos = false;
    var contadorNumeros = 0;

    for (i = 0; i < dniFormateado.length; i++) {

        //CONTAR NUMEROS DEL DNI
        if (numerosDni.includes(dniFormateado[i])) {
            contadorNumeros++;
        }
    }
    //COMPROBACION LONGITUD
    if (dniFormateado.length == 9) {
        longitudCorrecta = true;
    }

    if (contadorNumeros == 8) {
        numerosCorrectos = true;
    }

    if (letrasValidasDni.includes(dniFormateado[8])) {
        letraCorrecta = true;
    }

    //SI LAS COMPROBACIONES DEL DNI SON CORRECTAS CONTINUAMOS SI NOMUESTRA SU CORRESPONDIENTE ERROR
    if ((longitudCorrecta == true) && (numerosCorrectos == true) && (letraCorrecta == true)) {
        return true;
    } else if (longitudCorrecta == false) {
        mostrarModal("Tamaño de dni no correcto.Por favor Introduzca su dni bien");
        return false;
    } else {
        mostrarModal("Formato de dni invalido.Por favor introduzca su dni bien");
        return false;
    }


}


function comprobarTelefono() {
    var telefono = document.getElementById("telefono").value;
    var patronNumeros = "6789";
    var patronCorrecto = false;
    var longitud = false;
    if (patronNumeros.includes(telefono[0])) {
        patronCorrecto = true;
    }
    if (telefono.length == 9) {
        longitud = true;
    }

    if ((patronCorrecto == true) && (longitud == true)) {
        return true;
    } else if (patronCorrecto == false) {
        mostrarModal("Formato de telefono incorrecto.Los numeros en España comienzan por 6 7 8 o 9.Por favor introduce tu telefono bien");
        return false;
    } else {
        mostrarModal("Longitud de telefono incorrecta.");
        return false;
    }

}
// Función para mostrar el modal EXITOS Y ERRORES
function mostrarModal(mensaje) {
    var modal = document.getElementById("modal");
    var mensajeModal = document.getElementById("mensajeModal");
    mensajeModal.textContent = mensaje;  // Cambia el mensaje del modal
    modal.style.display = "block";  // Muestra el modal

    // Cerrar al hacer clic en la "X"
    var cerrarModal = document.getElementsByClassName("cerrarModal")[0];
    cerrarModal.onclick = function () {
        modal.style.display = "none";
    };

    // Cerrar al hacer clic fuera del modal
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };
}

function modalTerminos() {
    document.getElementById('abrirModalTerminos').onclick = function () {
        document.getElementById('modalTerminos').style.display = 'block';

    }

    // Cerrar al hacer clic en la "X"
    document.getElementsByClassName('cerrarModal')[1].onclick = function () {
        document.getElementById('modalTerminos').style.display = 'none';
    }

    // Cerrar al hacer clic fuera del modal
    window.onclick = function (event) {
        if (event.target == document.getElementById('modalTerminos')) {
            document.getElementById('modalTerminos').style.display = 'none';
        }
    }
}




function enviarCorreo(form) {
    const serviceID = 'service_xzgsr1j';
    const templateID = 'template_qg8x5fm';

    return emailjs.sendForm(serviceID, templateID, form)
        .then(() => {

            form.reset();//VACIAR LOS CAMPOS DEL FORMULARIO UNA VEZ ENVIADO
        })
        .catch((err) => {
            console.error("Error al enviar el correo:", err);

        });
}


function validarFormulario(event) {
    event.preventDefault(); // Evita el envío del formulario


    //PERMITIR O DENEGAR REGISTRO
    if ((comprobarDni() == true) && (comprobarContrasenia() == true) && (comprobarTelefono() == true) && (comprobarMayoriaEdad() == true)) {
        enviarCorreo(event.target);
        mostrarModal("Cuenta creada con Éxito.");
        return true;

    } else {

        return false;
    }

}

