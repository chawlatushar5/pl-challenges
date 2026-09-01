import { useState } from "react";
import { todoStore, Todo } from "@/store/todoStore";

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>(todoStore.getTodos());

  function refresh() {
    setTodos([...todoStore.getTodos()]);
  }

  return {
    todos,
    add: (title: string) => {
      todoStore.addTodo(title);
      refresh();
    },
    toggle: (id: string) => {
      todoStore.toggleTodo(id);
      refresh();
    },
    remove: (id: string) => {
      todoStore.deleteTodo(id);
      refresh();
    },
  };
}
