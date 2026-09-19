
const addBtn = document.querySelector(".todo-add-btn").addEventListener("click",addTodo)

const inputBox = document.querySelector(".todo-input-box")

inputBox.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        addTodo()
    }
})


function addTodo(){

    const inputBoxValue = document.querySelector(".todo-input-box").value
    
    const newTodo = document.createElement("div")
    newTodo.classList.add("container")
    newTodo.draggable = true

    const task = document.createElement("div")
    task.textContent = inputBoxValue
    task.classList.add("task")

    const checkBox = document.createElement("input")
    checkBox.type = "checkbox"
    checkBox.classList.add("check-list")

    const minusBtn = document.createElement("div")
    minusBtn.textContent = "-"
    minusBtn.classList.add("btn")


    minusBtn.addEventListener("click", () => {
        deleteTodo(newTodo)
    })

    checkBox.addEventListener("change", () => {
        task.classList.toggle("task-completed")
    })

    newTodo.addEventListener("dragstart", () => {
        newTodo.classList.add("dragging")
    })

    newTodo.addEventListener("dragend", () => {
        newTodo.classList.remove("dragging")
    })

    newTodo.appendChild(task)
    newTodo.appendChild(checkBox)
    newTodo.appendChild(minusBtn)
    

    const todoListContainer = document.querySelector(".checklist")
    todoListContainer.appendChild(newTodo)
    document.querySelector(".todo-input-box").value = ""
}



function deleteTodo(todo){
    todo.remove()
}



const todoListContainer = document.querySelector(".checklist")

todoListContainer.addEventListener("dragover", (event) => {
    event.preventDefault()

    const draggingTodo = document.querySelector(".dragging")

    const todos = [...todoListContainer.querySelectorAll(".container:not(.dragging)")]

    const nextTodo = todos.find(todo => {
        const rect = todo.getBoundingClientRect()
        return event.clientY < rect.top + rect.height / 2
    })

    if (nextTodo) {
        todoListContainer.insertBefore(draggingTodo, nextTodo)
    } else {
        todoListContainer.appendChild(draggingTodo)
    }
});

