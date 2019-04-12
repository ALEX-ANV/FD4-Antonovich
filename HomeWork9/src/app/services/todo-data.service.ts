import { Injectable } from '@angular/core';
import { Todo } from '../models/todo';
import { TodoDataLocalStorageService } from './todo-data-local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class TodoDataService {
  allTodo: Todo[];
  key = 'todo-items';

  constructor(private todoLocalStorageService: TodoDataLocalStorageService) {
    this.allTodo = todoLocalStorageService.getValue(this.key) || [];
  }

  addTodo(todo: Todo): TodoDataService {
    this.allTodo.push(todo);
    this.saveTodo();
    return this;
  }

  deleteTodoById(id: number): TodoDataService {
    this.allTodo = this.allTodo.filter(todo => todo.id !== id);
    this.saveTodo();
    return this;
  }

  updateTodoById(id: number, values: object = {}): Todo {
    const todo = this.getTodoById(id);
    if (!todo) {
      return null;
    }
    Object.assign(todo, values);
    this.saveTodo();
    return todo;
  }

  getAllTodo(): Todo[] {
    return this.allTodo.sort((a, b) => b.id - a.id);
  }

  getTodoById(id: number): Todo {
    return this.allTodo.filter(todo => todo.id === id).pop();
  }

  toggleTodoComplete(id: number) {
    const todo = this.getTodoById(id);
    const updatedTodo = this.updateTodoById(todo.id, {
      complete: !todo.complete
    });
    this.saveTodo();
    return updatedTodo;
  }

  saveTodo() {
    this.todoLocalStorageService.setValue(this.key, this.allTodo);
  }
}
