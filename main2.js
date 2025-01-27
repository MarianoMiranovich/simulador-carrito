const API_PRODUCTOS = 'https://fakestoreapi.com/products';


let Carrito = JSON.parse(localStorage.getItem('carrito')) || [];
const ProductosDom = document.getElementById('productos');
const ProductosCarritoDom = document.getElementById('productosCarrito')
const Total = document.getElementById('total')

document.getElementById("carritoIcon").addEventListener("click", () => {
    document.getElementById("carrito").classList.toggle("active")
  })


function creadoraDeCards(producto){
    ProductosDom.innerHTML+= ` 
    <div class="producto">
    <h3>${producto.title}</h3>
    <div class="img">
        <img src="${producto.image}" alt="">
    </div>
    <p>Precio: $<span>${producto.price}</span></p>
    <p>Categoria:${producto.category} </p>
    <button class="botonesCompra">Añadir al carrito</button>
    </div>
    `
}



const BotonesProductos = document.getElementsByClassName('botonesCompra')
const ArrayBotonesProducto = Array.from(BotonesProductos)
const BotonComprar = document.getElementById('boton-comprar')

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

function agregadoraDeEventos(){
    const BotonesProductos = document.getElementsByClassName('botonesCompra')
    const ArrayBotonesProducto = Array.from(BotonesProductos)
    ArrayBotonesProducto.forEach(el=>{
        el.addEventListener('click', (event)=>{

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

            Swal.fire({
                title: 'Se agrego al carrito',
                icon:'success',
                timer: 1600,
                timerProgressBar:true,
                showConfirmButton: false,
                toast: true,
                postition: 'top-end'
            })
            actualizadoraDeCarrito()
        })
    })
}

BotonComprar.addEventListener('click', ()=>{
    let total = Carrito.reduce((acc, el) => {
        return acc + el.precio * el.cantidad
      },0)
    if(total == 0){
        return
    }
    Swal.fire({
        title: 'Su compra es en total: '+ total.toFixed(2),
        showCancelButton: true,
        cancelButtonText: 'No comprar',
        confirmButtonText: 'Pagar'
    }).then((result) =>{
        if(result.isConfirmed){
            Swal.fire({
                title:'Gracias por su compra'
            }).then((result)=>{
                Carrito = []
                actualizadoraDeCarrito()
            })
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Su compra fue cancelada'
            })
        }
    })
})



document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch(API_PRODUCTOS)
 
        if(!response.ok){
            throw new Error ('La respuesta no fue aceptada')
        }

        const data = await response.json()
        data.forEach(el => {
            creadoraDeCards(el)
        });
        agregadoraDeEventos()
    } catch (error) {
        console.error(error)
    }
})

document.addEventListener("DOMContentLoaded", () => {
    actualizadoraDeCarrito()
  })

