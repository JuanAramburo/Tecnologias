const btnCargar = document.getElementById("btnCargar");
const btnLimpiar = document.getElementById("limpiar");
const mensaje = document.getElementById("mensaje");
const resultados = document.getElementById("resultados");

btnCargar.addEventListener('click', buscarCoctel);
btnLimpiar.addEventListener('click', limpiar);

function buscarCoctel() {
    const nombre = document.getElementById("txtCoctel").value;
    const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${nombre}`;

    if(!nombre){
        mensaje.textContent = "Ingresa un nombre de algún cóctel";
        return;
    }

    fetch(url)
        .then(response =>{
            if(!response.ok){
                alert("No se encontró el servicio");
            }
            return response.json();
        })
        .then(data =>{
            if(!data.drinks){
                mensaje.innerHTML = "No se encontraron cócteles.";
            }else{
                mostrar(data.drinks);
            }
        })
        .catch(error =>{
            mensaje.innerHTML = "Surgió un error " + error;
        });
}

function mostrar(drinks){
    limpiar();
    
    drinks.forEach(coctel =>{
        const mostrarBebidas = document.createElement("div");
        const img = document.createElement("img");
        img.src = coctel.strDrinkThumb;
        img.alt = coctel.strDrink;
        
        const titulo = document.createElement("h5");
        titulo.textContent = coctel.strDrink;
        
        mostrarBebidas.appendChild(img);
        mostrarBebidas.appendChild(titulo);
        resultados.appendChild(mostrarBebidas);
    });
}

function limpiar(){
    mensaje.innerHTML = "";
    resultados.innerHTML = "";
}

