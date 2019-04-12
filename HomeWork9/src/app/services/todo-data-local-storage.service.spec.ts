import { TestBed } from '@angular/core/testing';

import { TodoDataLocalStorageService } from './todo-data-local-storage.service';

describe('TodoDataLocalStorageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TodoDataLocalStorageService = TestBed.get(TodoDataLocalStorageService);
    expect(service).toBeTruthy();
  });
});
