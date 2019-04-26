
'use strict';

(function () {
  const styles = `
.todo-container .todo {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
  margin-top: 5px;
  border: 1px solid black;
  background: rgba(255, 255, 0, 0.1);
}
.todo-container .todo h1 {
  width: 50%;
}
.todo-container .todo button {
  background: transparent;
  border: 1px solid black;
  padding: 5px;
}
.todo-container .todo button:hover {
  background: rgba(165, 42, 42, 0.2);
}
.todo-container .todo.checked h1 {
  text-decoration: line-through;
}
`


  class Todo extends HTMLDivElement {

    todoContainer = document.createElement('div');
    h1 = document.createElement("h1");
    div = document.createElement("div");

    constructor() {
      super();

      const shadow = this.attachShadow({ mode: 'open' });

      this.todoContainer.classList.add("todo-container");
      this.todoContainer.onclick = this.handleClick;

      const style = document.createElement("style");
      style.innerText = styles;

      this.todoContainer.appendChild(style);
      this.div.classList.add("todo");

      this.todoContainer.appendChild(this.div);
      this.div.appendChild(this.h1);

      const button = document.createElement("button");
      button.type = "button";
      button.classList.add("remove");
      button.innerText = "Удалить";

      this.div.appendChild(button);

      shadow.appendChild(this.todoContainer);
    }

    connectedCallback() {
      this.todoContainer.dataset["id"] = this.dataset.id;
      this.h1.innerText = this.dataset.title;

      if (JSON.parse(this.dataset.checked)) {
        this.div.classList.add("checked");
      }
    }

    handleClick = ({ target }) => {
      var toRemove = target.closest('.remove');

      if (toRemove) {
        console.log("remove");
        this.dispatchEvent(new Event("remove", { bubbles: true, composed: true }));
      } else {
        this.dispatchEvent(new Event("toggle", { bubbles: true, composed: true }));
      }
    }

  }

  window.customElements.define('todo-element', Todo, { extends: "div" });
})();