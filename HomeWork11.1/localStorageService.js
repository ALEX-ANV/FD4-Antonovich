class LocalStorageService {
  key = "todos";

  set = (todos) => {
    localStorage.setItem(this.key, JSON.stringify(todos));
  }

  get = () => {
    return JSON.parse(localStorage.getItem(this.key));
  }
}

const localStorageWrapper = new LocalStorageService();