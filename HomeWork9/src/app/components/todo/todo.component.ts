import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/app/models/todo';
import { TodoDataService } from 'src/app/services/todo-data.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent {

  newTodo: Todo = new Todo();
  date: string;

  constructor(private todoDataService: TodoDataService) { }

  addTodo() {
    this.newTodo.date = new Date(this.date);
    this.todoDataService.addTodo(this.newTodo);
    this.newTodo = new Todo();
    this.date = null;
  }

  toggleTodoComplete(id: number) {
    this.todoDataService.toggleTodoComplete(id);
  }

  removeTodo(id: number) {
    this.todoDataService.deleteTodoById(id);
  }

  get todoItems(): Todo[] {
    return this.todoDataService.getAllTodo();
  }

  getTargetElement(target: EventTarget): Element {
    return (target instanceof Element) ? target
      : (target instanceof Text) ? target.parentElement
        : null;
  }

  getId(element: Element): number {
    return parseInt(element.closest('li').getAttribute('id'), 10);
  }

  itemClick(event: MouseEvent) {
    const element = this.getTargetElement(event.target);
    if (!element) {
      return;
    }
    const id = this.getId(element);
    const destroy = element.closest('.destroy');

    if (destroy) {
      this.removeTodo(id);
    }
    const label = element.closest('label');
    if (label) {
      this.toggleTodoComplete(id);
    }
  }
}
