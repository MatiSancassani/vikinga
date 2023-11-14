let productos = [];
fetch("./js/productos.json")
    .then(response => response.json()) 
    .then(data => {
        productos = data;        
        cargarProductos(productos);
    })

const productosHtml = document.querySelector("#productosJs");
let botonAgregar = document.querySelectorAll(".boton-agregar");
const numerito = document.querySelector("#numerito");


function cargarProductos(productosCargados) {
    productosHtml.innerHTML = "";
    
    productosCargados.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("columna");
        div.classList.add("tarjetas")
        div.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.titulo}">
          <h6>${producto.titulo}</h6>          
          <p>${producto.description}</p>  
          <p>$${producto.precio}</p>        
          <button class="boton-agregar" id="${producto.id}">Agregar al carrito</button>
        `
        productosHtml.append(div);
        
    })

    actualizarBoton ();
};


function actualizarBoton () {
    botonAgregar = document.querySelectorAll(".boton-agregar");
    botonAgregar.forEach(button => {
        button.addEventListener("click", agregarAlCarrito);
    });
}

let productosEnCarrito;
let productosEnElCarritoLocalS = localStorage.getItem("Productos-carrito");

if (productosEnElCarritoLocalS) {
    productosEnCarrito = JSON.parse(productosEnElCarritoLocalS);
    actualizarNumerito();
} else {
    productosEnCarrito = [];
}

function agregarAlCarrito(e){
    Toastify({
        text: "Agregado con exito",
        duration: 3000,
        destination: "../carrito.html",
        newWindow: true,
        // close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "#FFF",
          color: "black",
          borderRadius: "2rem",
        },
        offset: {
            x: "1rem", // horizontal axis - can be a number or a string indicating unity. eg: '2em'
            y: "5rem" // vertical axis - can be a number or a string indicating unity. eg: '2em'
          },
        onClick: function(){} // Callback after click
      }).showToast();
    const idButton = e.currentTarget.id;
    const productosAgregados = productos.find(productos => productos.id === idButton);
   
    if (productosEnCarrito.some(productos => productos.id === idButton)) {
        const index = productosEnCarrito.findIndex(productos => productos.id === idButton);
        productosEnCarrito[index].cantidad++
        
    } else {
        productosAgregados.cantidad = 1;
        productosEnCarrito.push(productosAgregados); // Agregamos un producto a nuestro array (productosEnCarrito = [];) haciendo click en el boton
    };
    localStorage.setItem("Productos-carrito", JSON.stringify(productosEnCarrito));
    actualizarNumerito();
}

// Traemos la info del localStorage al carrito.html

function actualizarNumerito() {
    let nuevoNumero = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0); 
    numerito.innerText = nuevoNumero;
}