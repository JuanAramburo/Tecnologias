const btnBuscar = document.getElementById("btnCargar");
const btnLimpiar = document.getElementById("limpiar");
const mensaje = document.getElementById("mensaje");
const imagen = document.getElementById("poster");
const razaSelect = document.getElementById("floatingSelect");

btnBuscar.addEventListener('click', buscarImagen);
btnLimpiar.addEventListener('click', limpiar);

document.addEventListener("DOMContentLoaded", cargarRazas);

function cargarRazas(){
    const url = "https://dog.ceo/api/breeds/list/all";

    fetch(url)
    .then(response => response.json())
    .then(data =>{
        if(data.status === "success"){
            razaSelect.innerHTML = '<option selected>Seleccionar la Raza</option>';
            Object.keys(data.message).forEach(raza =>{
                let option = document.createElement("option");
                option.value = raza;
                option.textContent = raza;
                razaSelect.appendChild(option);
            });
        }
    })
    .catch(error =>{
        mensaje.innerHTML = "Error al cargar las razas: " + error;
    });
}

function buscarImagen(){
    const raza = razaSelect.value;
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
        if(data.status === "False") mensaje.innerHTML = data.error;
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
