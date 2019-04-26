'use strict';
(function () {

  const styles = `
  .todos-container {
    width: 600px;
    margin: 0 auto;
  }
  .todos-container form {
    margin-top: 50px;
    display: flex;
    justify-content: center;
    align-items: stretch;
  }
  .todos-container form input {
    background: rgba(255, 255, 0, 0.1);
  }
  .todos-container form input[type='text'] {
    flex: 1 1 auto;
  }
  .todos-container form input[type='submit'] {
    border: 1px solid black;
    padding: 5px;
  }
  .todos-container form input[type='submit']:hover {
    background: rgba(165, 42, 42, 0.2);
  }
  `

  class Todos extends HTMLElement {

    todos = [];
    todoList = document.createElement("div");
    title = "";

    constructor() {
      super();

      const shadow = this.attachShadow({ mode: 'open' });
      const todoContainer = document.createElement('div');
      todoContainer.classList.add("todos-container");

      const style = document.createElement("style");
      style.innerHTML = styles;
      todoContainer.appendChild(style);

      const form = document.createElement("form");

      form.onsubmit = this.addTodo;

      todoContainer.appendChild(form);

      const input = document.createElement("input");
      input.name = "title";
      input.required = true;
      input.minLength = 1;
      input.oninput = this.handleChange;

      form.appendChild(input);

      const button = document.createElement("input");
      button.type = "submit";
      button.innerText = "Добавить";

      form.appendChild(button);

      this.todoList.classList.add("todo-items-container");

      todoContainer.appendChild(this.todoList);

      shadow.appendChild(todoContainer);
    }

    connectedCallback() {
      this.todos = localStorageWrapper.get() || [];

      this.updateTodoElements();
    }

    handleChange = (event) => {
      this.title = event.target.value;
    }

    handleClick = ({ target, type }) => {
      let id = target.dataset.id;
      console.log(id);

      if (type === "remove") {
        this.removeTodo(id);
      } else {

        let todo = this.todos.find(t => t.id === id);
        todo.checked = !todo.checked;

        this.todos = [...this.todos.filter(t => t.id !== id), todo].sort((a, b) => a.id - b.id);
        this.updateTodoElements();
      }
    }

    addTodo = (event) => {
      event.preventDefault();

      this.todos.push({
        title: this.title,
        id: new Date().getTime().toString(),
        checked: false
      });

      this.updateTodoElements();
    }

    removeTodo = (id) => {
      this.todos = this.todos.filter(t => t.id !== id).sort((a, b) => a.id - b.id);
      this.updateTodoElements();
    }

    updateTodoElements = () => {
      this.todoList.innerHTML = ''

      this.todos.forEach(todo => {
          this.todoList.appendChild(this.getTodoElement(todo));
      });

      localStorageWrapper.set(this.todos);
    }

    getTodoElement(todo) {
      let elem = document.createElement("div", { is: "todo-element" });
      elem.setAttribute("data-id", todo.id);
      elem.setAttribute("data-title", todo.title);
      elem.setAttribute("data-checked", todo.checked);

      elem.addEventListener("remove", this.handleClick);
      elem.addEventListener("toggle", this.handleClick);

      return elem;
    }

  }

  window.customElements.define('todos-element', Todos);
})();