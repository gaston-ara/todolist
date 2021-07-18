// const tareas = [];
window.onload = function () {
    validar()
};

let tareas = [];

//Funcion de onclick para agregar nueva tarea
function nueva(event) {
    event.preventDefault();
    let inputTarea = document.querySelector("#input-text");
    tareas.push(inputTarea.value);
    //Se guarda el array de las tareas en localstorage
    let Storage = JSON.stringify(tareas);
    localStorage.setItem('tarea', Storage);
    //Funcion para renderizar cada tarea nueva
    renderTarea();
    //funcion para borrar el input
    resetInput();
}
function resetInput() {
    let inputTarea = document.querySelector("#input-text");
    return inputTarea.value = '';
}
function renderTarea() {
    const container = document.querySelector('#contenedor-lista');
    const tareasStorage = JSON.parse(localStorage.getItem('tarea'))
    container.innerHTML = "";
    //For-of que toma datos del localstorage e inserta una plantilla por cada objeto guardado.
    for (const tarea of tareasStorage) {
        container.innerHTML += `<div class="item">
    <div class="tarea">
        <p>${tarea}</p>
    </div>
    <div class="buttons">
        <button id="done">Done</button>
        <button id="delete">Delete</button>
    </div>
</div>`
    }
}

function validar() {
    try {
        tareas = JSON.parse(localStorage.getItem('tarea')) || [];
        renderTarea();
    }
    catch (error) {
    }
}