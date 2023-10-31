const productos = [
    {
        id: "jean monica",
        titulo: "Jean Monica",
        imagen: "../img/1.webp",
        description: "Jean liso tiro medio",
        precio: 1000,
        categoria: {
            id: "jean monica",
            titulo: "Jean Monica"
        }
    },
    {
        id: "campera dallas",
        titulo: "Campera Dallas",
        imagen: "../img/2.webp",
        description: "Oversize negra con Roturas",
        precio: 1000,
        categoria: {
            id: "campera dallas",
            titulo: "Campera Dallas"
        }
    },
    {
        id: "parachute madrid",
        titulo: "Parachute Madrid",
        imagen: "../img/3.webp",
        description: "De sire con elástico en cintura",
        precio: 1000,
        categoria: {
            id: "parachute madrid",
            titulo: "Parachute Madrid"
        }
    },
    {
        id: "jean kara",
        titulo: "Jean Kara",
        imagen: "../img/4.webp",
        description: "Cargo con bolsillos y cierres dorados",
        precio: 1000,
        categoria: {
            id: "jean kara",
            titulo: "Jean Kara"
        }
    },
    {
        id: "jean aitiana",
        titulo: "Jean Aitiana",
        imagen: "../img/5.webp",
        description: "Oxford elastizado",
        precio: 1000,
        categoria: {
            id: "jean aitiana",
            titulo: "Jean Aitiana",
        }
    },
    // {
    //     id: "jean monica",
    //     titulo: "Jean Monica",
    //     imagen: "../img/01.webp",
    //     description: "Jean liso tiro medio",
    //     precio: 1000,
    //     categoria: {
    //         id: "jean monica",
    //         titulo: "Jean Monica"
    //     }
    // },
    // {
    //     id: "jean monica",
    //     titulo: "Jean Monica",
    //     imagen: "../img/02.webp",
    //     description: "Jean liso tiro medio",
    //     precio: 1000,
    //     categoria: {
    //         id: "jean monica",
    //         titulo: "Jean Monica"
    //     }
    // },
    // {
    //     id: "jean monica",
    //     titulo: "Jean Monica",
    //     imagen: "../img/03.webp",
    //     description: "Jean liso tiro medio",
    //     precio: 1000,
    //     categoria: {
    //         id: "jean monica",
    //         titulo: "Jean Monica"
    //     }
    // },
    // {
    //     id: "jean monica",
    //     titulo: "Jean Monica",
    //     imagen: "../img/04.webp",
    //     description: "Jean liso tiro medio",
    //     precio: 1000,
    //     categoria: {
    //         id: "jean monica",
    //         titulo: "Jean Monica"
    //     }
    // },
    // {
    //     id: "jean monica",
    //     titulo: "Jean Monica",
    //     imagen: "../img/05.webp",
    //     description: "Jean liso tiro medio",
    //     precio: 1000,
    //     categoria: {
    //         id: "jean monica",
    //         titulo: "Jean Monica"
    //     }
    // },
    // {
    //     id: "jean monica",
    //     titulo: "Jean Monica",
    //     imagen: "../img/06.webp",
    //     description: "Jean liso tiro medio",
    //     precio: 1000,
    //     categoria: {
    //         id: "jean monica",
    //         titulo: "Jean Monica"
    //     }
    // },
    // {
    //     id: "jean monica",
    //     titulo: "Jean Monica",
    //     imagen: "../img/07.webp",
    //     description: "Jean liso tiro medio",
    //     precio: 1000,
    //     categoria: {
    //         id: "jean monica",
    //         titulo: "Jean Monica"
    //     }
    // },
    // {
    //     id: "jean monica",
    //     titulo: "Jean Monica",
    //     imagen: "../img/08.webp",
    //     description: "Jean liso tiro medio",
    //     precio: 1000,
    //     categoria: {
    //         id: "jean monica",
    //         titulo: "Jean Monica"
    //     }
    // },
    // {
    //     id: "jean monica",
    //     titulo: "Jean Monica",
    //     imagen: "../img/09.webp",
    //     description: "Jean liso tiro medio",
    //     precio: 1000,
    //     categoria: {
    //         id: "jean monica",
    //         titulo: "Jean Monica"
    //     }
    // },
    // {
    //     id: "jean monica",
    //     titulo: "Jean Monica",
    //     imagen: "../img/10.webp",
    //     description: "Jean liso tiro medio",
    //     precio: 1000,
    //     categoria: {
    //         id: "jean monica",
    //         titulo: "Jean Monica"
    //     }
    // },
]

const productosHtml = document.querySelector("#productosJs");
let botonAgregar = document.querySelectorAll(".boton-agregar");

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
}
cargarProductos(productos);


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
} else {
    productosEnCarrito = [];
}

function agregarAlCarrito(e){
    const idButton = e.currentTarget.id;
    const productosAgregados = productos.find(productos => productos.id === idButton);
    if (productosEnCarrito.some(productos => productos.id === idButton)) {
        const index = productosEnCarrito.findIndex(productos => productos.id === idButton);
        productosEnCarrito[index].cantidad++
        
    } else {
        productosAgregados.cantidad = 1;
        productosEnCarrito.push(productosAgregados); // Agregamos un producto a nuestro array (productosEnCarrito = [];) haciendo click en el boton
    }

    localStorage.setItem("Productos-carrito", JSON.stringify(productosEnCarrito));
}

// Traemos la info del localStorage al carrito.html






/* <div class="columna tarjetas">
          <img src="./img/1.webp" alt="Jean liso media altura">
          <h6>Jean Monica</h6>          
          <p>Jean liso tiro medio</p>  
          <p>$ 9999</p>        
          <a href="">Agregar al carrito</a>
        </div> */