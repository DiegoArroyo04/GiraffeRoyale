var modal = document.getElementById("modal");

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
