let todoItems = [];

function renderTodo(todo) {
  const list = document.querySelector(".js-todo-list");
  const item = document.querySelector(`[data-key='${todo.id}']`);

  // if (todo.deleted) {
  //   item.remove();
  //   return;
  // }

  const isChecked = todo.checked ? "done" : "";
  const node = document.createElement("li");
  node.setAttribute("class", `todo-item ${isChecked}`);
  node.setAttribute("data-key", todo.id);
  node.innerHTML = `
    <input id="${todo.id}" type="checkbox"/>
    <label for="${todo.id}" class="tick js-tick"></label>
    <span>${todo.text}</span>
    <button class="delete-todo js-delete-todo">
    <svg><use href="#delete-icon"></use></svg>
    </button>
  `;

  if (item) {
    list.replaceChild(node, item);
  } else {
    list.append(node);
  }
}

function addTodo(text) {
  const todo = {
    text,
    checked: false,
    id:Date.now()
  };

  todoItems.push(todo);
  renderTodo(todo);
}


function deleteTodo(itemKey) {
  const index = todoItems.findIndex((item) => item.id === Number(itemKey));
  if (index !== -1) {
    todoItems.splice(index, 1);
    const item = document.querySelector(`[data-key='${itemKey}']`);
    if (item) {
      item.remove();
    }
  }
}

function toggleDone(itemKey) {
  const index = todoItems.findIndex((item) => item.id === Number(itemKey));
  todoItems[index].checked = !todoItems[index].checked;
  console.log(todoItems);
  renderTodo(todoItems[index]);
}

const form = document.querySelector(".js-form");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const input = document.querySelector(".js-todo-input");

  const text = input.value;
  addTodo(text);
  input.value = "";
  return;
});

const itemListener = document.querySelector(".js-todo-list");

itemListener.addEventListener("click", (event) => {
  if (event.target.classList.contains("js-tick")) {
    const itemKey = event.target.parentElement.dataset.key;
    toggleDone(itemKey);
  }
});


// get delete button
const xlist = document.querySelector(".js-todo-list");

xlist.addEventListener("click", (event) => {
  if (event.target.classList.contains("js-delete-todo")) {
    const itemKey = event.target.parentElement.dataset.key;
    deleteTodo(itemKey);
  }
});
