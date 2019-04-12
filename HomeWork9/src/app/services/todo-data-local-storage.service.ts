import { Injectable } from '@angular/core';
import { Todo } from '../models/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoDataLocalStorageService {

  setValue(key: string, values: Todo[]) {
    localStorage.setItem(key, JSON.stringify(values));
  }

  getValue(key: string): Todo[] {
    return (JSON.parse(localStorage.getItem(key)) || []).map(element => new Todo(element));
  }
}
