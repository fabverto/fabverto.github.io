// Selectors

const todoInput = document.querySelector('.todo-input');
const button = document.querySelector('.todo-button');
const list = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

// Event Listeners

button.addEventListener('click', addTodo);
list.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo)


// Functions

function addTodo(event) {
    // Prevent Form from Reloading
    event.preventDefault();
    if (todoInput.value === "")
        window.alert("Can't be Empty!");

    else {
        // Call Todo Div
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");

        // Create li
        const newTodo = document.createElement("li");
        newTodo.innerText = todoInput.value;
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);

        // Completed Button
        const completeButton = document.createElement('button');
        completeButton.innerHTML = '<i class="fas fa-check"></i>';
        completeButton.classList.add('complete-btn');
        todoDiv.appendChild(completeButton);

        // Delete Button
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
        deleteButton.classList.add('delete-btn');
        todoDiv.appendChild(deleteButton);

        // Append to list
        list.appendChild(todoDiv);


        // Add item to local storage
        //save(todoInput.value)

        // Clear input field
        todoInput.value = "";
    }
}

function deleteCheck(event) {
    console.log(event.target)
    const item = event.target;
    if (item.classList[0] === 'delete-btn'){
        const todo = item.parentElement;
        // Falling animations
        todo.classList.add("fall");
        todo.addEventListener('transitionend', function () {
            todo.remove();
        });
    }

    if (item.classList[0] === 'complete-btn'){
        const todo = item.parentElement;
        todo.classList.toggle("completed")
    }
}

function filterTodo(event) {
    const todos = list.childNodes;
    todos.forEach(function (todo) {
        switch(event.target.value){
            case "all":
                todo.style.display = 'flex';
                break;
            case "complete":
                if(todo.classList.contains('completed'))
                    todo.style.display = 'flex';
                else
                    todo.style.display = 'none';
                break;
            case "uncomplete":
                if(!(todo.classList.contains('completed')))
                    todo.style.display = 'flex';
                else
                    todo.style.display = 'none';
                break;
        }

    });

}

/*
function save(todo){
    // Check if a list is already present locally
    let todos;
    if(localStorage.getItem('todos' === null))
        todo= [];
    else
        todos = JSON.parse(localStorage.getItem('todos'));

    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos))
}

function getTodos() {
    // Check if a list is already present locally
    let todos;
    if(localStorage.getItem('todos' === null))
        todo= [];
    else
        todos = JSON.parse(localStorage.getItem('todos'));

    todos.forEach(function (todo) {
        
    })
}
*/
