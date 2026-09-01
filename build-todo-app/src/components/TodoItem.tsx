interface Props {
  id: string;
  title: string;
  done: boolean;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TodoItem({ id, title, done, onToggle, onDelete }: Props) {
  return (
    <li className="todo-item">
      <input type="checkbox" checked={done} onChange={() => onToggle(id)} />
      <span style={{ textDecoration: done ? "line-through" : "none" }}>{title}</span>
      <button onClick={() => onDelete(id)} aria-label="delete">
        ×
      </button>
    </li>
  );
}
