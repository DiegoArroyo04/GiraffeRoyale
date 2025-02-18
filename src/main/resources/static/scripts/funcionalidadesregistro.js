var vip = false;
var vipTarjeta = false;
var vipBanco = false;


document.addEventListener("DOMContentLoaded", function () {
    // Event listener para el formulario
    const formulario = document.getElementById("formulario");
    formulario.addEventListener("submit", validarFormulario);

    //Inicializar modal terminos
    modalTerminos();

});

function comprobarContrasenia(pass) {

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


function comprobarMayoriaEdad(fechaNacimiento) {



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
function comprobarDni(dni) {
    //FORMATEO DE DNI

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
        console.log(contadorNumeros);
        return false;
    } else {
        mostrarModal("Formato de dni invalido.Por favor introduzca su dni bien");
        return false;
    }



}


function comprobarTelefono(telefono) {

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

    // Cerrar automáticamente después de 3 segundos
    setTimeout(function () {
        modal.style.display = "none";
    }, 3000);
}

function modalTerminos() {
    document.getElementById('abrirModalTerminos').onclick = function () {
        document.getElementById('modalTerminos').style.display = 'block';

    }

    document.getElementById("btnTerminos").addEventListener("click", function () {
        document.getElementById('modalTerminos').style.display = 'none';
        document.getElementById("terminos_registro").checked = true;
    });

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

function comprobarNumerosNombreApellidos(nombre, apellidos) {

    var tieneNumeros = false;
    var numeros = "0123456789";

    // Comprobación en el nombre
    for (var i = 0; i < nombre.length; i++) {
        if (numeros.includes(nombre[i])) {
            tieneNumeros = true;
            mostrarModal("Un nombre no puede contener numeros.");
        }
    }

    // Comprobación en los apellidos si no se encontró antes en el nombre
    if (!tieneNumeros) {
        for (var i = 0; i < apellidos.length; i++) {
            if (numeros.includes(apellidos[i])) {
                tieneNumeros = true;
                mostrarModal("Unos apellidos no pueden contener numeros");
            }
        }
    }

    if (tieneNumeros) {
        return false;
    } else {
        return true;
    }


}

function validarFormulario(event) {
    event.preventDefault(); // Evita el envío del formulario

    var dni = document.getElementById("dni").value;
    var nombre = document.getElementById("nombre").value;
    var apellidos = document.getElementById("apellidos").value;
    var nombreUsuario = document.getElementById("username").value;
    var email = document.getElementById("email").value;
    var telefono = document.getElementById("telefono").value;
    var fechaNacimiento = new Date(document.getElementById("fecha_nacimiento").value);
    var pass = document.getElementById("pass").value;
    var tarjeta = document.getElementById("numeroTarjeta").value;
    var fechaExpiracionValue = new Date(document.getElementById("fechaExpiracion").value);
    var cvcValue = document.getElementById('cvc').value;
    var titularTarjeta = document.getElementById("titularTarjeta").value;
    var titularCuenta = document.getElementById("titularCuenta").value;
    var iban = document.getElementById("numeroCuenta").value;


    //PERMITIR O DENEGAR REGISTRO
    if ((comprobarDni(dni) == true) && (comprobarContrasenia(pass) == true) && (comprobarTelefono(telefono) == true) && (comprobarMayoriaEdad(fechaNacimiento) == true) && (comprobarNumerosNombreApellidos(nombre, apellidos) == true)) {

        //SI EL FORMULARIO ES VALIDO CORRECTAMENTE COMPROBAR CAMPOS DE PAGO
        if (vip == true && vipTarjeta == true) {
            if (comprobarTarjeta(tarjeta) == true && validarCVC() == true && validarTitularTarjeta(titularTarjeta) == true) {


                var datos = {
                    dni: dni,
                    nombre: nombre,
                    apellidos: apellidos,
                    nombreUsuario: nombreUsuario,
                    email: email,
                    telefono: telefono,
                    fechaNacimiento: fechaNacimiento,
                    usuarioVip: true,
                    pass: pass,
                    tarjetaCredito: tarjeta,
                    fechaExpiracionTarjeta: fechaExpiracionValue,
                    cvcTarjeta: cvcValue,
                    titular: titularTarjeta
                };

                // Realizar una solicitud AJAX PARA GUARDAR EL USUARIO EN BBDD
                $.ajax({
                    type: "POST",
                    url: "/usuarios/registrar",
                    contentType: "application/json",
                    data: JSON.stringify(datos),
                    success: function (response) {
                        mostrarModal(response);
                        if (response.trim() == "Cuenta creada con Éxito.") {
                            console.log(response);
                            enviarCorreo(event.target);

                            //REDIRIGIR AL LOGIN
                            setTimeout(function () {
                                window.location.href = '/';
                            }, 3000);


                        }
                    },
                    error: function (error) {
                        console.error("Error en la solicitud AJAX:", error);
                    }
                });

                return true;
            } else {
                return false;
            }

        }

        if (vip == true && vipBanco == true) {
            if (validarTitularCuenta(titularCuenta) == true && validarIBAN(iban) == true) {

                var datos = {
                    dni: dni,
                    nombre: nombre,
                    apellidos: apellidos,
                    nombreUsuario: nombreUsuario,
                    email: email,
                    telefono: telefono,
                    fechaNacimiento: fechaNacimiento,
                    usuarioVip: true,
                    pass: pass,
                    cuentaBancaria: iban,
                    titular: titularCuenta

                };

                // Realizar una solicitud AJAX PARA GUARDAR EL USUARIO EN BBDD
                $.ajax({
                    type: "POST",
                    url: "/usuarios/registrar",
                    contentType: "application/json",
                    data: JSON.stringify(datos),
                    success: function (response) {
                        mostrarModal(response);
                        if (response.trim() == "Cuenta creada con Éxito.") {
                            console.log(response);
                            enviarCorreo(event.target);

                            //REDIRIGIR AL LOGIN
                            setTimeout(function () {
                                window.location.href = '/';
                            }, 3000);

                        }
                    },
                    error: function (error) {
                        console.error("Error en la solicitud AJAX:", error);
                    }
                });

                return true;
            } else {
                return false;
            }
        }

        if (vip == false) {


            var datos = {
                dni: dni,
                nombre: nombre,
                apellidos: apellidos,
                nombreUsuario: nombreUsuario,
                email: email,
                telefono: telefono,
                fechaNacimiento: fechaNacimiento,
                usuarioVip: false,
                pass: pass
            };

            // Realizar una solicitud AJAX PARA GUARDAR EL USUARIO EN BBDD
            $.ajax({
                type: "POST",
                url: "/usuarios/registrar",
                contentType: "application/json",
                data: JSON.stringify(datos),
                success: function (response) {

                    mostrarModal(response);
                    if (response.trim() == "Cuenta creada con Éxito.") {
                        console.log(response);
                        enviarCorreo(event.target);
                        //REDIRIGIR AL LOGIN
                        setTimeout(function () {
                            window.location.href = '/';
                        }, 3000);
                    }
                },
                error: function (error) {
                    console.error("Error en la solicitud AJAX:", error);
                }
            });

            return true;
        }



    } else {

        return false;
    }

}


//REGISTRO VIP
document.getElementById("vip").addEventListener("change", function () {

    const metodosPago = document.getElementById("metodosPago");
    if (document.getElementById("vip").checked) {
        metodosPago.classList.remove("hidden");
        metodosPago.style.display = "flex";
        vip = true;
    } else {
        metodosPago.style.display = "none";

        resetearCamposPago();
    }
});

document.getElementById("tarjeta").addEventListener("change", function () {

    document.getElementById("datosTarjeta").classList.remove("hidden");
    document.getElementById("datosBancarios").classList.add("hidden");
    resetearCuentaBancaria();

    // Hacer los campos de tarjeta requeridos
    document.getElementById("numeroTarjeta").required = true;
    document.getElementById("fechaExpiracion").required = true;
    document.getElementById("titularTarjeta").required = true;
    document.getElementById("cvc").required = true;


    vipTarjeta = true;
    vipBanco = false;

});

document.getElementById("bancaria").addEventListener("change", function () {
    document.getElementById("datosBancarios").classList.remove("hidden");
    document.getElementById("datosTarjeta").classList.add("hidden");
    resetearTarjeta();

    // Hacer los campos bancarios requeridos
    document.getElementById("titularCuenta").required = true;
    document.getElementById("numeroCuenta").required = true;

    vipBanco = true;
    vipTarjeta = false;

});

function resetearCamposPago() {
    document.getElementById("tarjeta").checked = false;
    document.getElementById("bancaria").checked = false;
    vip = false;
    vipTarjeta = false;
    vipBanco = false;
    resetearTarjeta();
    resetearCuentaBancaria();
}

function resetearTarjeta() {
    document.getElementById("datosTarjeta").classList.add("hidden");
    document.getElementById("numeroTarjeta").value = "";
    document.getElementById("fechaExpiracion").value = "";
    document.getElementById("titularTarjeta").value = "";
    document.getElementById("cvc").value = "";

    //QUITAR CAMPOS REQUERIDOS
    document.getElementById("numeroTarjeta").required = false;
    document.getElementById("fechaExpiracion").required = false;
    document.getElementById("titularTarjeta").required = false;
    document.getElementById("cvc").required = false;
}

function resetearCuentaBancaria() {
    document.getElementById("datosBancarios").classList.add("hidden");
    document.getElementById("titularCuenta").value = "";
    document.getElementById("numeroCuenta").value = "";

    //QUITAR CAMPOS REQUERIDOS
    document.getElementById("titularCuenta").required = false;
    document.getElementById("numeroCuenta").required = false;

}


function comprobarTarjeta(tarjeta) {


    //VERIFICAR LONGITUD
    if (tarjeta.length != 16) {
        mostrarModal("El número de tarjeta no es válido. Debe tener 16 caracteres");
        return false;
    } else {
        return true;
    }

}

//VALIDAR FECHA EXPIRACION 
var fechaExpiracion = document.getElementById("fechaExpiracion");

// Obtener la fecha actual (AÑO y MES)
var fechaActual = new Date();
var año = fechaActual.getFullYear();
var mes = (fechaActual.getMonth() + 1).toString().padStart(2, '0');//MES DE DOS DIGITIOS
var fechaMinima = `${año}-${mes}`;

// Establecer el mínimo permitido en el campo
fechaExpiracion.setAttribute("min", fechaMinima);

//VALIDACION CVC
const cvcInput = document.getElementById('cvc');

cvcInput.addEventListener('input', function () {
    let valor = parseInt(cvcInput.value, 10);

    // Asegúrate de que el valor esté dentro del rango de 1 a 999
    if (valor < 1) {
        cvcInput.value = '1';
    } else if (valor > 999) {
        cvcInput.value = '999';
    }

});

function validarCVC() {

    //VERIFICAR LONGITUD
    if (cvcInput.value.length != 3) {
        mostrarModal("El cvc no es válido. Debe tener 3 caracteres");
        return false;
    } else {
        return true;
    }

}

function validarTitularTarjeta(titularTarjeta) {


    var tieneNumeros = false;
    var numeros = "0123456789";

    // Comprobación en el titularTarjeta
    for (var i = 0; i < titularTarjeta.length; i++) {
        if (numeros.includes(titularTarjeta[i])) {
            tieneNumeros = true;
            mostrarModal("Un titular no puede contener numeros.");
        }
    }

    if (tieneNumeros) {
        return false;
    } else {
        return true;
    }

}

function validarTitularCuenta(titularCuenta) {


    var tieneNumeros = false;
    var numeros = "0123456789";

    // Comprobación en el titularTarjeta
    for (var i = 0; i < titularCuenta.length; i++) {
        if (numeros.includes(titularCuenta[i])) {
            tieneNumeros = true;
            mostrarModal("Un titular no puede contener numeros.");
        }
    }
    if (tieneNumeros) {
        return false;
    } else {
        return true;
    }

}
function validarIBAN(iban) {

    var letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    var numeros = "0123456789";
    var tieneSoloNumeros = true;
    var tieneLetras = true;
    var tamanio = true;

    //VERIFICAR LONGITUD
    if (iban.length != 24) {
        mostrarModal("El IBAN no es válido. Debe tener 24 caracteres");
        tamanio = false;
    } else {
        tamanio = true;
    }

    //COMPROBAR SUFIJO DE LAS DOS PRIMERAS LETRAS DEL IBAN
    if (letras.includes(iban[0]) && letras.includes(iban[1])) {
        tieneLetras = true;
    } else {
        tieneLetras = false;
        mostrarModal("El IBAN debe comenzar por dos letras");
    }

    // Verificar que el resto sean solo números
    for (var i = 2; i < iban.length; i++) {
        if (!numeros.includes(iban[i])) {
            tieneSoloNumeros = false;
            mostrarModal("El IBAN debe contener solo números despues de las dos letras")
            break;
        }
    }

    if (tieneSoloNumeros == true && tieneLetras == true && tamanio == true) {
        return true;
    } else {
        return false;
    }

}