class Carrito {
  comprarProducto(e) {
    e.preventDefault();

    if (e.target.classList.contains("agregar-carrito")) {
      const producto = e.target.parentElement.parentElement;

      this.leerDatosProducto(producto);
    }
  }

  leerDatosProducto(producto) {
    const infoProducto = {
      imagen: producto.querySelector("img").src,
      titulo: producto.querySelector("h4").textContent,
      precio: producto.querySelector(".precio span").textContent,
      id: producto.querySelector("a").getAttribute("data-id"),
      cantidad: 1,
    };

    let productosLS;

    productosLS = this.obtenerProductosLocalStorage();

    productosLS.forEach(function (productoLS) {
      if (productoLS.id === infoProducto.id) {
        productosLS = productoLS.id;
      }
    });

    if (productosLS === infoProducto.id) {
      Swal.fire({
        type: "info",
        title: "Oops...",
        text: "El producto ya está añadido.",
        footer: "Actualmente hay uno solo en stock",
        timer: 2500,
        showConfirmButton: false,
      });
    } else {
      this.insertarCarrito(infoProducto);
    }
  }

  insertarCarrito(producto) {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>
                <img src = "${producto.imagen}" width=100>
            </td>
            <td><b>${producto.titulo}</b></td>
            <td><b>${producto.precio}$</b></td>
            <td>
                <a href="#" class="borrar-producto fa-solid fa-delete-left text-decoration-none" data-id="${producto.id}"></a>
            </td>
        `;

    listaProductos.appendChild(row);

    this.guardarProductosLocalStorage(producto);
  }

  eliminarProducto(e) {
    e.preventDefault();

    let producto, productoID;

    if (e.target.classList.contains("borrar-producto")) {
      e.target.parentElement.parentElement.remove();

      producto = e.target.parentElement.parentElement;
      productoID = producto.querySelector("a").getAttribute("data-id");
    }

    this.eliminarProductoLocalStorage(productoID);
  }

  vaciarCarrito(e) {
    e.preventDefault();

    while (listaProductos.firstChild) {
      listaProductos.removeChild(listaProductos.firstChild);
    }
    this.vaciarLocalStorage();

    return false;
  }

  guardarProductosLocalStorage(producto) {
    let productos;

    productos = this.obtenerProductosLocalStorage();

    productos.push(producto);

    localStorage.setItem("productos", JSON.stringify(productos));
  }

  obtenerProductosLocalStorage() {
    let productoLS;

    if (localStorage.getItem("productos") === null) {
      productoLS = [];
    } else {
      productoLS = JSON.parse(localStorage.getItem("productos"));
    }
    return productoLS;
  }

  eliminarProductoLocalStorage(productoID) {
    let productosLS;

    productosLS = this.obtenerProductosLocalStorage();

    productosLS.forEach(function (productoLS, index) {
      if (productoLS.id === productoID) {
        productosLS.splice(index, 1);
      }
    });

    localStorage.setItem("productos", JSON.stringify(productosLS));
  }

  leerLocalStorage() {
    let productosLS;

    productosLS = this.obtenerProductosLocalStorage();

    productosLS.forEach(function (producto) {
      const row = document.createElement("tr");
      row.innerHTML = `
              <td>
                  <img src = "${producto.imagen}" width=100>
              </td>
              <td><b>${producto.titulo}</b></td>
              <td><b>${producto.precio}$</b></td>
              <td>
                  <a href="#" class="borrar-producto fa-solid fa-delete-left text-decoration-none" data-id="${producto.id}"></a>
              </td>
          `;

      listaProductos.appendChild(row);
    });
  }

  vaciarLocalStorage() {
    localStorage.clear();
  }

  procesarPedido(e) {
    e.preventDefault();

    if (this.obtenerProductosLocalStorage().length === 0) {
      Swal.fire({
        type: "error",
        title: "Tu carrito de compras está vacío",
        text: "Añade productos al carrito.",
        showConfirmButton: false,
        timer: 2000,
      });
    } else {
      location.href = "compra.html";
    }
  }

  leerLocalStorageCompra() {
    let productosLS;

    productosLS = this.obtenerProductosLocalStorage();

    productosLS.forEach(function (producto) {
      const row = document.createElement("tr");
      row.innerHTML = `
              <td>
                  <img src = "${producto.imagen}" width=100>
              </td>
              <td><b>${producto.titulo}</b></td>
              <td><b>${producto.precio}$</b></td>
              <td>
                <input type="number" class="form-control cantidad" min="1" value=${
                  producto.cantidad
                }>
              </td>
              <td><b>${producto.precio * producto.cantidad}$</b></td>
              <td>
                  <a href="#" class="borrar-producto fa-solid fa-delete-left text-decoration-none" style="font-size:25px" data-id="${
                    producto.id
                  }"></a>
              </td>
          `;

      listaCompra.appendChild(row);
    });
  }
}
