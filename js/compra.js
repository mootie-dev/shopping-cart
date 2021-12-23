const compra = new Carrito();

const listaCompra = document.querySelector("#lista-compra tbody");

const carrito = document.getElementById("carrito");

const procesarCompraBtn = document.getElementById("procesar-compra");

const cliente = document.getElementById("cliente");

const correo = document.getElementById("correo");

cargarEventos();

function cargarEventos() {
  document.addEventListener(
    "DOMContentLoaded",
    compra.leerLocalStorageCompra()
  );

  carrito.addEventListener("click", (e) => {
    compra.eliminarProducto(e);
  });

  compra.calcularTotal();

  procesarCompraBtn.addEventListener("click", procesarCompra);
}

function procesarCompra(e) {
  e.preventDefault();

  if (compra.obtenerProductosLocalStorage().length === 0) {
    Swal.fire({
      type: "info",
      title: "Tu carrito de compras está vacío",
      text: "No hay productos en la lista de compras, por favor, añádelos.",
      footer: "Serás redireccionado a la página principal en dos segundos...",
      timer: 2000,
      timerProgressBar: true,
      showConfirmButton: false,
    }).then(function () {
      window.location = "index.html";
    });
  } else if (cliente.value === "" || correo.value === "") {
    Swal.fire({
      type: "error",
      title: "No has rellenado ningún cuadro de texto",
      text: "Por favor, ingresa tus datos en los cuadros de texto.",
      timer: 2000,
      showConfirmButton: false,
    });
  } else {
    const cargandoGif = document.querySelector("#cargando");

    cargandoGif.style.display = "block";

    const enviado = document.createElement("img");

    enviado.src = "./img/mail.gif";

    enviado.style.display = "block";

    enviado.width = "150";

    setTimeout(() => {
      cargandoGif.style.display = "none";
      document.querySelector("#loaders").appendChild(enviado);
      setTimeout(() => {
        enviado.remove();
        compra.vaciarLocalStorage();
        window.location = "index.html";
      }, 3000);
    }, 3000);
  }
}
