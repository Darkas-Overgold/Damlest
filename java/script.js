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
                menuImage: '../images/blancomenu.jpg' // Specify menu image for product
            },
            {
                id: 2,
                nombre: "Polo Negro Corte Boxy",
                precio: 45,
                imagen: "../images/negromenu.jpg",
                fotos: ["../images/negro1.jpg", "../images/negro2.jpg", "../images/negro3.jpg"],
                tallas: ["S", "M", "L", "XL"],
                menuImage: '../images/negromenu.jpg' // Specify menu image for product
            },
        ],
        productoSeleccionado: null,
        tallaSeleccionada: "",
        mostrarCompra: false,
        mostrarQR: false,
        mostrarQRW: false, // Keep this property for QR modal
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
            this.productoSeleccionado = producto; // Set selected product
        },
        mostrarFormularioCompra() {
            this.mostrarCompra = true;
        },
        cerrarModalCompra() {
            this.mostrarCompra = false; 
            this.tallaSeleccionada = ""; // Reset selected size
        },
        comprarProducto() {
            if (this.tallaSeleccionada) {
                // Simulación de pago
                alert(`Has comprado el producto ${this.productoSeleccionado.nombre} en talla ${this.tallaSeleccionada}.`);
                this.cerrarModalCompra();
                this.mostrarQRW = true; // Show QR modal after purchase
            } else {
                alert("Por favor selecciona una talla.");
            }
        },
        cerrarQR() {
            this.mostrarQRW = false; // Close QR modal
        },
        guardarDatos() {
            if (this.nombre && this.correo) {
                localStorage.setItem("nombreCorredor", this.nombre);
                localStorage.setItem("correoCorredor", this.correo);
                alert("Datos guardados correctamente.");
                this.cerrarModal(); // Close modal after saving data
            } else {
                alert("Por favor, complete todos los campos.");
            }
        }
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
            clearInterval(interval); // Stop when it reaches 100%
            document.querySelector('.damlest-loading').style.display = 'none';
        }
    }, intervalDuration);

    // Event listener for keydown
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            // Close modals if they are open
            if (app.showModal) {
                app.cerrarModal(); // Close main modal
            }
            if (app.mostrarCompra) {
                app.cerrarModalCompra(); // Close purchase modal
            }
            if (app.mostrarQRW) {
                app.cerrarQR(); // Close QR modal
            }
        }
    });
});

function openPage() {
    window.open('damlest.html'); // Opens damlest.html in a new tab
}
