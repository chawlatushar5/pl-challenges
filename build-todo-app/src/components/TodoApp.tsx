import { useTodos } from "@/hooks/useTodos";
import { TodoInput } from "@/components/TodoInput";
import { TodoItem } from "@/components/TodoItem";

export function TodoApp() {
  const { todos, add, toggle, remove } = useTodos();

  return (
    <div className="todo-app">
      <h1>Todo</h1>
      <TodoInput onAdd={add} />
      <ul>
        {todos.map((t) => (
          <TodoItem key={t.id} id={t.id} title={t.title} done={t.done} onToggle={toggle} onDelete={remove} />
        ))}
      </ul>
    </div>
  );
}
