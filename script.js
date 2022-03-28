//Variables
const form = document.getElementById('form');
const input = document.getElementById('input-text');
const lista = document.getElementById('contenedor-lista');
let tareas = [];

//Funciones
const validar = () => {
    if (localStorage.getItem('tareas') === null) {
        tareas = [];
    } else {
        tareas = JSON.parse(localStorage.getItem('tareas'));
    }
}
const cleanInput = () => {
    input.value = '';
    input.focus();
}
const hecho = (e) =>{
    let toDone = e.parentElement.parentElement.id;
    tareas[toDone].done = !tareas[toDone].done;
    renderTask();
    updateTask();
}
const eliminarTask = (e) => {
    let toDelete = e.parentElement.parentElement.id;
    tareas.splice(toDelete, 1);
    renderTask();
    updateTask();
}
const updateTask = () =>{
    localStorage.setItem('tareas', JSON.stringify(tareas));
}
const renderTask = () => {
    lista.innerHTML = "";
    for (let i = 0; i < tareas.length; i++) {
        if (tareas[i].done) {
            lista.insertAdjacentHTML("beforeend", `<div class="item" id="${i}">
        <div class="tarea done">
            <p>${tareas[i].name}</p>
        </div>
        <div class="buttons">
            <button id="done" onclick="hecho(this)">Done</button>
            <button id="delete" onclick="eliminarTask(this)">Delete</button>
        </div>
    </div>`)
        } else {
            lista.insertAdjacentHTML("beforeend", `<div class="item" id="${i}">
        <div class="tarea">
            <p>${tareas[i].name}</p>
        </div>
        <div class="buttons">
            <button id="done" onclick="hecho(this)">Done</button>
            <button id="delete" onclick="eliminarTask(this)">Delete</button>
        </div>
    </div>`)
        }
    }

}
const newTask = () => {
    let tarea = {
        name: input.value,
        done: false
    }
    tareas.push(tarea);
    console.log(tareas);
}
window.onload = () => {
    validar();
    renderTask()
};
//EventListeners
form.addEventListener('submit', (e) => {
    e.preventDefault();
    newTask();
    renderTask();
    updateTask();
    cleanInput();
});