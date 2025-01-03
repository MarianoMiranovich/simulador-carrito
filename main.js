const productosMercado = [
    {
      "id": 1,
      "nombre": "Remera de Algodón",
      "precio": 15.99,
      "stock": 50,
      "img": "./assets/remera.webp"
    },
    {
      "id": 2,
      "nombre": "Pantalón Jeans",
      "precio": 29.99,
      "stock": 30,
      "img": "./assets/portrait-female-legs-jeans (1).jpg"
      
    },
    {
      "id": 3,
      "nombre": "Zapatillas Deportivas",
      "precio": 49.99,
      "stock": 20,
      "img": "./assets/zapatillas.jpg"
    },
    {
      "id": 4,
      "nombre": "Camiseta de Futbol",
      "precio": 12.49,
      "stock": 100,
      "img": "./assets/camiseta.webp"
    },
    {
      "id": 5,
      "nombre": "Mochila Escolar",
      "precio": 35.00,
      "stock": 15,
      "img": "./assets/mochila.webp"
    },
    {
      "id": 6,
      "nombre": "Auriculares Bluetooth",
      "precio": 59.99,
      "stock": 10,
      "img": "./assets/auriculares.webp"
    },
    {
      "id": 7,
      "nombre": "Reloj de Pulsera",
      "precio": 75.50,
      "stock": 8,
      "img": "./assets/reloj.webp"
    },
    {
      "id": 8,
      "nombre": "Campera de Invierno",
      "precio": 89.99,
      "stock": 25,
      "img": "./assets/camper.webp"
    },
    {
      "id": 9,
      "nombre": "Smartphone X100",
      "precio": 299.99,
      "stock": 5,
      "img": "./assets/celular.webp"
    },
    {
      "id": 10,
      "nombre": "Lámpara LED de Escritorio",
      "precio": 22.50,
      "stock": 40,
      "img": "./assets/lampara.webp"
    }
  ];

  let Carrito = JSON.parse(localStorage.getItem('carrito')) || [];

  document.getElementById("carritoIcon").addEventListener("click", () => {
    document.getElementById("carrito").classList.toggle("active")
  })
  
  const ProductosDom = document.getElementById('productos');
  const ProductosCarritoDom = document.getElementById('productosCarrito')
  const Total = document.getElementById('total')

  const botonesEliminar = () => {

    const BotonesEliminar = document.getElementsByClassName('botonesEliminar')
    const ArrayBotonesEliminar = Array.from(BotonesEliminar)
    ArrayBotonesEliminar.forEach(el => {
     el.addEventListener('click', (e) => {
      let producto = Carrito.find( el => el.nombre == e.target.parentElement.children[0].innerText )
      if (producto.cantidad == 1 ){
        let index = Carrito.findIndex(el => el.nombre == e.target.parentElement.children[0].innerText)
        Carrito.splice(index, 1)
      }else{
        producto.cantidad -= 1 
      }
      actualizadoraDeCarrito()
     })
    })

  }

  const actualizadoraDeCarrito = () => {
    ProductosCarritoDom.innerHTML= '';
    Carrito.forEach(el => {
      ProductosCarritoDom.innerHTML+= 
      `
             <div class="producto">
                <h3>${el.nombre}</h3>
                <p>Precio: ${el.precio}</p>
                <p>Cantidad: ${el.cantidad}</p>
                <button class="botonesEliminar">Eliminar</button>
            </div>
      `
    })

    Total.innerText = " $ " +Carrito.reduce((acc, el) => {
      return acc + el.precio * el.cantidad
    },0)

    botonesEliminar()
    localStorage.setItem('carrito', JSON.stringify(Carrito))
  }
  

  productosMercado.forEach(el => {
    ProductosDom.innerHTML += 
        ` 
        <div class="producto">
        <h3>${el.nombre}</h3>
        <div class="img">
            <img src="${el.img}" alt="">
        </div>
        <p>Precio: $<span>${el.precio}</span></p>
        <button class="botonesCompra">Añadir al carrito</button>
        </div>
        `
  });

  const BotonesProductos = document.getElementsByClassName('botonesCompra')
  const ArrayBotonesProducto = Array.from(BotonesProductos)

  ArrayBotonesProducto.forEach(el => {
    el.addEventListener('click', (event) => {
      let producto = Carrito.find(el => el.nombre == event.target.parentElement.children[0].innerText )

      if(producto){
        producto.cantidad+= 1
      }else{
        Carrito.push({
          nombre: event.target.parentElement.children[0].innerText,
          cantidad: 1,
          precio: Number(event.target.parentElement.children[2].children[0].innerText)
        })
      }

      actualizadoraDeCarrito()
    })
  })
  
  document.addEventListener("DOMContentLoaded", () => {
    actualizadoraDeCarrito()
  })