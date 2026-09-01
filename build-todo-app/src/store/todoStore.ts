export interface Todo {
  id: string;
  title: string;
  done: boolean;
}

const STORAGE_KEY = "todos";
let _nextId = 1;

function loadFromStorage(): Todo[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveToStorage(todos: Todo[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

let _todos: Todo[] = loadFromStorage();

export const todoStore = {
  getTodos: (): Todo[] => _todos,

  addTodo: (title: string): Todo => {
    const todo: Todo = { id: String(_nextId++), title, done: false };
    _todos = [..._todos, todo];
    saveToStorage(_todos);
    return todo;
  },

  toggleTodo: (id: string) => {
    _todos = _todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t));
  },

  deleteTodo: (id: string) => {
    _todos = _todos.filter((t) => t.id !== id);
    saveToStorage(_todos);
  },

  clear: () => {
    _todos = [];
    saveToStorage(_todos);
  },
};
