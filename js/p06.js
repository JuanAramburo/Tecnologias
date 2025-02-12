const btnBuscar = document.getElementById("btnCargar");
const btnLimpiar = document.getElementById("limpiar");
const mensaje = document.getElementById("mensaje");
const poster = document.getElementById("poster");
const titulo = document.getElementById("titulo");
const parrafo = document.getElementById("parrafo");
const parrafo2 = document.getElementById("parrafo2");

btnBuscar.addEventListener('click', buscarCoctel);
btnLimpiar.addEventListener('click', limpiar);

function buscarCoctel(){
    const url = "https://www.thecocktaildb.com/api/json/v1/1/random.php";

    axios.get(url)
        .then(response =>{
            if(!response.data.drinks){
                mensaje.innerHTML = "No se encontraron cócteles.";
            }else{
                mostrar(response.data.drinks);
            }
        })
        .catch(error =>{
            mensaje.innerHTML = "Surgió un error " + error;
        });
}

function mostrar(drinks){
    limpiar();
    const coctel = drinks[0];
    poster.src = coctel.strDrinkThumb;
    titulo.textContent = coctel.strDrink;
    
    let ingredientes = "Ingredientes: ";
    for (let i=1;i<= 15;i++) {
        let ingrediente = coctel["strIngredient" + i];
        let medida = coctel["strMeasure" + i];
        if (ingrediente) {
            ingredientes += `\n${ingrediente} ${medida ? '('+ medida +')':''}`;
        }
    }
    parrafo.textContent = `Instrucciones: ${coctel.strInstructions}`;
    parrafo2.textContent = `${ingredientes}`;
}

function limpiar(){
    mensaje.innerHTML = "";
    poster.src = "";
    titulo.textContent = "";
    parrafo.textContent = "";
    parrafo2.textContent = "";
}