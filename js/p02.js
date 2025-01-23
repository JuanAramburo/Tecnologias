const btnBuscar = document.getElementById("buscar");
const btnLimpiar = document.getElementById("limpiar");
const mensaje = document.getElementById("mensaje");
const tabla = document.getElementById("table");
const tbody = document.getElementById("tbody");

btnBuscar.addEventListener('click', buscar);
btnLimpiar.addEventListener('click', limpiar);

function buscar(){
    limpiar();
    const Id = document.getElementById("idjson").value;

    if(!Id){
        mensaje.innerHTML = "No capturaste ninguna ID";
        return;
    }

    const http = new XMLHttpRequest();
    const url = "https://jsonplaceholder.typicode.com/albums/" + Id;
    http.open('GET', url, true);
    http.send();

    http.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200) {
            const datos = JSON.parse(this.responseText);

            // const datosid = datos.filter(item => item.id == parseInt(Id));

            if (datos && datos.id) {
                    const fila = document.createElement('tr');
                    
                    const columna1 = document.createElement('td');
                    columna1.textContent = datos.userId;
                    fila.appendChild(columna1);

                    const columna2 = document.createElement('td');
                    columna2.textContent = datos.id;
                    fila.appendChild(columna2);

                    const columna3 = document.createElement('td');
                    columna3.textContent = datos.title;
                    fila.appendChild(columna3);

                    tbody.appendChild(fila);
                };

                mensaje.innerHTML = "Datos cargados correctamente ";
            } else {
                mensaje.innerHTML = "Ocurrió un error al realizar la búsqueda.";
            }
    };
}

function limpiar() {
    tbody.innerHTML = "";
    mensaje.innerHTML = "";
}
