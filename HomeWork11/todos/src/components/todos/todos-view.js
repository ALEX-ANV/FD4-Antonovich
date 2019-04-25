import React, { Component } from 'react'

import './todos.scss';

import Todo from '../todo';
import localStrageService from '../../services/local-strage-service';

export default class Todos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      todos: localStrageService.get() || []
    }
  }

  handleChange = ({ target }) => {
    this.setState({ title: target.value });
  }

  handleClick = ({ target }) => {
    let container = target.closest('.todo-container');

    if (!container) {
      return;
    }

    let id = container.dataset.id;

    var toRemove = target.closest('.remove');

    if (toRemove) {
      this.removeTodo(id);
    } else {

      const { todos } = this.state;

      let todo = todos.find(t => t.id === id);
      todo.checked = !todo.checked;

      let newTodos = [...todos.filter(t => t.id !== id), todo];

      this.setState({
        todos: newTodos.sort((a, b) => a.id - b.id)
      }, this.save);
    }
  }

  addTodo = (event) => {
    event.preventDefault();

    const { todos, title } = this.state;

    this.setState({
      todos: [...todos, {
        title: title,
        id: new Date().getTime().toString(),
        checked: false
      }]
    }, this.save);
  }

  removeTodo = (id) => {
    const { todos } = this.state;

    this.setState({
      todos: todos.filter(t => t.id !== id)
    }, this.save);
  }

  save = () => {
    localStrageService.set(this.state.todos);
  }

  render() {
    const { title, todos } = this.state;
    return (
      <div className="todos-container">
        <form onSubmit={this.addTodo} >
          <input type="text" name="title" id="todo-text" required minLength="1" onChange={this.handleChange} value={title} />
          <input type="submit" value="Добавить" />
        </form>
        <div className="todo-items-container" onClick={this.handleClick}>
          {
            todos.map(todo => <Todo data={todo} onRemove={this.removeTodo} key={todo.id} />)
          }
        </div>
      </div>);
  }


}
