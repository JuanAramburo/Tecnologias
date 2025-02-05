const btnCargar = document.getElementById("btnCargar");
const btnLimpiar = document.getElementById("limpiar");
const mensaje = document.getElementById("mensaje");
const imagen = document.getElementById("poster");
const razas = document.getElementById("floatingSelect");
    
btnCargar.addEventListener('click', buscarImagen);
btnLimpiar.addEventListener('click', limpiar);
    
document.addEventListener("DOMContentLoaded", cargarRazas);
    
function cargarRazas(){
    const url = "https://dog.ceo/api/breeds/list/all";
    fetch(url)
    .then(response => response.json())
    .then(data =>{
        if(data.status === "success"){
            Object.keys(data.message).forEach(raza =>{
                if(data.message[raza].length > 0){
                    data.message[raza].forEach(subraza =>{
                        let option = document.createElement("option");
                        option.value = `${raza}/${subraza}`;
                        option.textContent = `${raza} ${subraza}`;
                        razas.appendChild(option);
                    });
                }else{
                    let option = document.createElement("option");
                    option.value = raza;
                    option.textContent = raza;
                    razas.appendChild(option);
                }
            });
        }
    })
    .catch(error =>{
        mensaje.innerHTML = "Error al cargar las razas: " + error;
    });
}
    
function buscarImagen(){
    const raza = razas.value;
    if(raza === "Seleccionar la Raza"){
        mensaje.innerHTML = "Por favor, seleccione una raza válida.";
        return;
    }
    const url = `https://dog.ceo/api/breed/${raza}/images/random`;
    
    fetch(url)
    .then(response =>{
        if(!response.ok){
            alert("No se encontró el servicio");
        }
        return response.json();
    })
    .then(data =>{
        if(data.status === "error") mensaje.innerHTML = "No se encontró la raza";
        else{
            imagen.src = data.message;
        }
    })
    .catch(error =>{
        mensaje.innerHTML = "Surgió un error " + error;
    });
}
    
function limpiar(){
    mensaje.innerHTML = "";
    imagen.src = "/img/dogk.PNG";
}
