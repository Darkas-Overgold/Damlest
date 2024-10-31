const app = new Vue({
    el: "#app",
    data: {
        showModal: false,
        productos: [
            {
                id: 1,
                nombre: "Polo Blanco Corte Boxy",
                precio: 55,
                imagen: "../images/blancomenu.jpg",
                fotos: ["../images/blanco1.jpg", "../images/blanco2.jpg", "../images/blanco3.jpg"],
                tallas: ["S", "M", "L", "XL"],
                menuImage: '../images/blancomenu.jpg'
            },
            {
                id: 2,
                nombre: "Polo Negro Corte Boxy",
                precio: 45,
                imagen: "../images/negromenu.jpg",
                fotos: ["../images/negro1.jpg", "../images/negro2.jpg", "../images/negro3.jpg"],
                tallas: ["S", "M", "L", "XL"],
                menuImage: '../images/negromenu.jpg'
            },
        ],
        productoSeleccionado: null,
        tallaSeleccionada: "",
        mostrarCompra: false,
        mostrarQRW: false,
        nombre: "",
        correo: ""
    },
    methods: {
        mostrarModal() {
            this.showModal = true;
        },
        cerrarModal() {
            this.showModal = false;
        },
        mostrarSubmenu(producto) {
            this.productoSeleccionado = producto;
        },
        mostrarFormularioCompra() {
            this.mostrarCompra = true;
        },
        cerrarModalCompra() {
            this.mostrarCompra = false;
            this.tallaSeleccionada = "";
        },
        comprarProducto() {
            if (this.tallaSeleccionada) {
                alert(`Has comprado el producto ${this.productoSeleccionado.nombre} en talla ${this.tallaSeleccionada}.`);
                this.cerrarModalCompra();
                this.mostrarQRW = true;
            } else {
                alert("Por favor selecciona una talla.");
            }
        },
        cerrarQR() {
            this.mostrarQRW = false;
        },
        guardarDatos() {
            if (this.nombre && this.correo) {
                localStorage.setItem("nombreCorredor", this.nombre);
                localStorage.setItem("correoCorredor", this.correo);
                alert("Datos guardados correctamente.");
                this.cerrarModal();
            } else {
                alert("Por favor, complete todos los campos.");
            }
        },
        cerrarModalExterno(event) {
            const modalGeneral = document.querySelector("#modalGeneral");
            const modalCompra = document.querySelector("#modalCompra");
            const modalQR = document.querySelector("#modalQR");

            if (this.showModal && modalGeneral && !modalGeneral.contains(event.target)) {
                this.cerrarModal();
            }
            if (this.mostrarCompra && modalCompra && !modalCompra.contains(event.target)) {
                this.cerrarModalCompra();
            }
            if (this.mostrarQRW && modalQR && !modalQR.contains(event.target)) {
                this.cerrarQR();
            }
        }
    },
    mounted() {
        // Detect clicks and touches outside the modal
        window.addEventListener('click', this.cerrarModalExterno, true); // capture phase
        window.addEventListener('touchstart', this.cerrarModalExterno, true); // capture phase

        // Close modals when pressing the Escape key
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                if (this.showModal) this.cerrarModal();
                if (this.mostrarCompra) this.cerrarModalCompra();
                if (this.mostrarQRW) this.cerrarQR();
            }
        });
    },
    beforeDestroy() {
        // Remove event listeners when component is destroyed
        window.removeEventListener('click', this.cerrarModalExterno, true);
        window.removeEventListener('touchstart', this.cerrarModalExterno, true);
    }
});

window.addEventListener('load', function () {
    document.querySelector('.damlest-loading').style.display = 'block';
    let progress = 0;
    const progressBar = document.querySelector('.progress-bar-inner');
    const progressText = document.querySelector('#progress');
    const totalDuration = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
    const intervalDuration = 1000; // Update every second
    const interval = setInterval(function () {
        progress += (intervalDuration / totalDuration) * 100;
        progressBar.style.width = `${progress}%`;
        progressText.textContent = `${progress.toFixed(2)}%`;
        if (progress >= 100) {
            clearInterval(interval);
            document.querySelector('.damlest-loading').style.display = 'none';
        }
    }, intervalDuration);
});

function openPage() {
    window.open('damlest.html');
}
