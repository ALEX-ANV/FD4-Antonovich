import { Component, Input } from '@angular/core';
import { Todo } from 'src/app/models/todo';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent {

  @Input() data: Todo;

  constructor() { }

  get dateText() {
    return this.data.date.toLocaleDateString(navigator.language, {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric'
    });
  }
}
