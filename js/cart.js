let productosEnElCarrito = localStorage.getItem("Productos-carrito");
productosEnElCarrito = JSON.parse(productosEnElCarrito);

const carritoVacio = document.querySelector("#carrito-vacio");
const contenedorProductos = document.querySelector("#contenedor-carrito");
const carritoAcc = document.querySelector("#carrito-acc");
let botonRemove = document.querySelectorAll(".carrito-eliminar");
let vaciarCarrito = document.querySelector("#vaciar-carrito");



function cargarCarrito () {
    if(productosEnElCarrito && productosEnElCarrito.length > 0){
        carritoVacio.classList.add("disabled");
        contenedorProductos.classList.remove("disabled");
        carritoAcc.classList.remove("disabled");
        // carritoAcc.classList.remove("disabled");
    
        contenedorProductos.innerHTML = "";
    
        productosEnElCarrito.forEach (producto => {
            const div = document.createElement("div");
            div.classList.add("productos-carrito");
            div.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.titulo}">
            <div class="carrito-producto">
                <small>Producto</small>
                <p>${producto.titulo}</p>
            </div>   
                <div class="carrito-cantidad">             
                    <small>Cantidad</small>
                    <p>${producto.cantidad}</p>
                </div>
                <div class="carrito-precio">
                    <small>Precio</small>
                    <p>$${producto.precio}</p>
                            
                    </div>
                <div class="carrito-subtotal">
                    <small>Subtotal</small>
                    <p>$${producto.precio * producto.cantidad}</p>
                </div>
            <button class="carrito-eliminar" id="${producto.id}"><i class="bi bi-trash3"></i></button>            
            `;
    
            contenedorProductos.append(div);
        })
        
    
    } else {
        carritoVacio.classList.remove("disabled");
        contenedorProductos.classList.add("disabled");        
        carritoAcc.classList.add("disabled");
        // carritoAcc.classList.add("disabled");
    }

    actualizarRemove ();
}

cargarCarrito ();


function actualizarRemove () {
    botonRemove = document.querySelectorAll(".carrito-eliminar");
    botonRemove.forEach(button => {
        button.addEventListener("click", eliminarDelCarrito);
    });
}

function eliminarDelCarrito (e) {
    const idButton = e.currentTarget.id;
    const index = productosEnElCarrito.findIndex(productos => productos.id === idButton);
    productosEnElCarrito.splice(index, 1);
    cargarCarrito();

    localStorage.setItem("Productos-carrito", JSON.stringify(productosEnElCarrito));
}

vaciarCarrito.addEventListener("click", vaciarCarro);

function vaciarCarro() {
    Swal.fire({
        title: '¿Estás seguro?',
        icon: 'question',
        html: `Se van a borrar ${productosEnElCarrito.reduce((acc, producto) => acc + producto.cantidad, 0)} productos.`,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: 'Sí',
        cancelButtonText: 'No'
    }).then((result) => {
        if (result.isConfirmed) {
            productosEnElCarrito.length = 0;
            localStorage.setItem("Productos-carrito", JSON.stringify(productosEnElCarrito));
            cargarCarrito ();
        }
      })
}

