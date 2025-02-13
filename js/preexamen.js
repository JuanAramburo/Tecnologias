const btnCargar = document.getElementById("btnCargar");
const btnLimpiar = document.getElementById("limpiar");
const mensaje = document.getElementById("mensaje");
const nombrePais = document.getElementById("nombre");
const nombreOficial = document.getElementById("oficial");
const imgBandera = document.getElementById("poster");
const poblacion = document.getElementById("poblacion");
const capital = document.getElementById("capital");

btnCargar.addEventListener("click", buscarPais);
btnLimpiar.addEventListener("click", limpiar);

function buscarPais(){
    const nombre = document.getElementById("txtPais").value;
    const url = "https://restcountries.com/v3.1/name/" + nombre;

    if(!nombre){
        mensaje.textContent = "Ingresa el nombre de un país";
        return;
    }

    fetch(url)
        .then(response =>{
            if(!response.ok){
                limpiar();
                throw new Error("No se encontró el pais");
            }

            return response.json();
        })
        .then(data =>{
            if(!data || data.length === 0){
                mensaje.innerHTML = "No se encontró información del país.";
            }else{
                mostrar(data[0]);
            }
        })
        .catch(error =>{
            mensaje.innerHTML = "Surgió un error: " + error.message;
        });
}

function mostrar(pais){
    limpiar();
    nombrePais.textContent = pais.name.common;
    nombreOficial.textContent = "Nombre oficial: " + pais.name.official;
    imgBandera.src = pais.flags.png;
    poblacion.textContent = "Población: " + pais.population.toLocaleString();
    capital.textContent = "Capital: " + (pais.capital ? pais.capital[0] : "No disponible");
}


function limpiar(){
    mensaje.innerHTML = "";
    nombrePais.textContent = "";
    nombreOficial.textContent = "";
    imgBandera.src = "";
    poblacion.textContent = "";
    capital.textContent = "";
}


