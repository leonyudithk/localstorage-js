// Función para registrar usuario
let usuarioInfo = [];
function registrarUsuario() {
  // Obtener valores del formulario
  const nombres = document.getElementById("nombres").value;

  const apellidos = document.getElementById("apellidos").value;
  const telefono = document.getElementById("telefono").value;
  const direccion = document.getElementById("direccion").value;

  const genero = document.getElementById("genero").value;
  const usuario = document.getElementById("usuario").value;
  const contrasena = document.getElementById("contrasena").value;

  //4) crear una función para capturar datos
  //construcción del objeto
  //validación de existencia de key en el local storage
  // Crear objeto con la información del usuario
  const registro = {
    id: Math.round(Math.random() * (100 - 1) + 1), // id aleatorio entre 1 y 100

    nombres: nombres,
    apellidos: apellidos,
    telefono: telefono,
    direccion: direccion,
    genero: genero,
    usuario: usuario,
    contrasena: contrasena,
  };

  // Almacenar en el localStorage

  //validación existencia de la key usuarioInfo en el localstorage
  //para no sobreescribir la data
  //traemos la información del local storage con key llamada usuarioInfo
  const key = JSON.parse(localStorage.getItem("usuarioInfo"));
  if (key !== null) {
    // si el local storage no es nulo
    key.unshift(registro); //inserte el objeto registro en el array con lo antiguo(key)
    localStorage.setItem("usuarioInfo", JSON.stringify(key)); //almacene en el local storage el array (lo viejo con lo nuevo)
  } else {
    // si el key está nulo
    usuarioInfo.unshift(registro); //añada al arreglo usuarioInfo el objeto llamado registro
    localStorage.setItem("usuarioInfo", JSON.stringify(usuarioInfo)); //almacene en local storage el arreglo usuarioInfo en la key usuarioInfo
  }

  // Mostrar alerta o imprimir en consola
  alert("Usuario registrado exitosamente");

  console.log("Usuario registrado:", usuarioInfo);

  getLocalStorage(); //llamado de la función getLocalStorage
}


// 5.) capturar tbody para listar la data del localostorage
let listar = document.getElementById("listartable");

//6.)crear una función para traer data del local storage
// y mostrarla en el tbody listar
const getLocalStorage = () => {
  //llevams un valor vacío a listar
  listar.innerHTML = "";
  //traemos la data del local storage key usuarioInfo
  let usuarioInfoLocalStorage = JSON.parse(localStorage.getItem("usuarioInfo"));
  //recorremos la lista usuarioInfoLocalStorage con map que realiza las iteraciones de la lista y nos devuelve un elemento nuevo
  usuarioInfoLocalStorage?.map((registroUser) => {
    //registroUser hace referencia al objeto en el que se está posicionado en el momento del recorrido
    const {
        id,
      nombres,
      apellidos,
      telefono,
      direccion,
      genero,
      usuario,
      contrasena,
    } = registroUser; //desestructuramos la información del objeto registroUser
    //establecemos una estructura html para realizarle cambio de contenido a listar con innerHTML
    // ` los templates string, back ticks o plantillas literales (comillitas al revés)
    //nos permiten imprimir inormación de una manera más flexible
    //y nos permite personaliar cualquier cosa que yo requiere envolver
    //leer sobre tagged templates para más info
    listar.innerHTML += `
                    <td>${nombres}</td>
                    <td>${apellidos}</td>
                    <td>${telefono}</td>
                    <td>${direccion}</td>
                    <td><button id=${id} class="btn btn-danger">Eliminar</button></td>
        `;
  });
};

//7.) cargar luego del DOM
document.addEventListener("DOMContentLoaded", getLocalStorage);

//8.) para el eliminar. Llamamos el evento clic de tody listar

listar.addEventListener("click", (e) => {
  //classList.contains nos retorna un booleano(true o false) en base al valor que tiene contains dentro
  const btnEliminar = e.target.classList.contains("btn-danger");
  //capturams el id asignado a los botones en getLocalStorage
  const id = e.target.id;
  //taremos la data del local storage
  const local = JSON.parse(localStorage.getItem("usuarioInfo"));
  //la función find se puede usar en los arreglos o listas y nos retorna un objeto en base a los buscado
  //== doble igual comparación NO estricta, solo valida contenido
  //=== triple igual, comparación estricta, valida contenido y tipo de dato
  const buscado = local.find((data) => data.id === Number(id));
  console.log(local, buscado)
  //si tbnEliminar es true, es decir, si el elemento html que seleccionamos tiene una clase llamada btn-danger(para efectos de este ejercicio)
  if (btnEliminar) {
    //recorremos la data traida del local storage y la recorremos con forEach, este permite recorrer arreglos y listas
    //cuando usamos forEach o map, aparte de tener acceso al objeto, podemos acceder al número de la posición o también conocido como index
    local.forEach((element, index) => {
      //validamos si es objeto.id es igual al id capturado cuando hacemos clic sobre el botón eliminar
      if (element.id === buscado.id) {
        //eliminar el index indicado del arreglo llamado local (data traida desde el local storage)
        //splice nos permite eliminar una posición del arreglo
        //splice(índex o índice del objeto en el array,cantidad de elementos a eliminar, normalmente indicamos 1)
        local.splice(index, 1);
        //cuando eliminamos, necesitamos sobre escribir el array local en el local storage en la key llamada usuarioInfo
        localStorage.setItem("usuarioInfo", JSON.stringify(local));
        //llamamos a getLocalStorage para que nos cargue la dat actualizada y no
        //tengamos que recargar la página en el navegador
        getLocalStorage();
      }
    });
  }
});

//9.)Buscador
//capturamos el botón buscar
let buscar = document.getElementById("btnBuscar");
// capturamos el div en donde vamos a mostrar la data que busquemos
let busqueda = document.getElementById("busqueda");

//10.) llamaos el evento clic del botón buscar
buscar.addEventListener("click", (e) => {
  e.preventDefault();
  //capturamos el texto ingresado en la caja de texto para buscar
  let input = document.getElementById("inputBuscar").value; //lo que voy a buscar
  //traemos la data del local storage
  //dentro de la búsqueda de información,e s importante tener presente dos cosas
  //1.) lo que voy a buscar
  //2.) en donde lo voy a buscar
  let data = JSON.parse(localStorage.getItem("usuarioInfo")); // en donde lo voy a buscar
  //función filter, nos devuelve un arreglo con lo encontrado, al retornar un arrar, puede devolver varios objetos que coindidan
  //la función includes, nos permite buscar las coincidencias y no el valo exacto
  //la función toLowerCase, es como la función toLocaleLoweCase, nos permite convertir el texto todo en minúsculas
  //también está la función toUpperCase, toLocaleUpperCase, que cambia a mayúsculas
  
  console.log("traer a bsucar",data)
  let filtro = data.filter((registroUser) =>
    registroUser.nombres.toLowerCase().includes(input.toLowerCase())
  );
  //limpiamos el div
  busqueda.innerHTML = "";

  //tomamos el arreglo filtro que contiene la información que coincida con la búsqueda que realizaste
  //vamos a validar con un condicional ternario (estos nos permiten validar en términos de expresiones)
  //validamos que si es arreglo no tiene nada filtro.length(longitud del array)
  filtro.length === 0
    ? //nos muestre un diz indicando que lo ingresado no existe
      (busqueda.innerHTML += `<div style="color:white;">El nombre ${input} no existe</div>`)
    : //en caso contrario, nos va a recorrer filtro, desestructuramos y mostramos lo filtrado
      filtro.map((registroUser) => {
        const {
          nombres,
          apellidos,
          telefono,
          direccion,
          genero,
          usuario,
          contrasena,
        } = registroUser;
        busqueda.innerHTML += `
                    <td>${nombres}</td>
                    <td>${apellidos}</td>
                    <td>${telefono}</td>
                    <td>${direccion}</td>
                    <td><button id=${genero} class="btn btn-danger">Eliminar</button></td>
                                             
                `;
      });
});
