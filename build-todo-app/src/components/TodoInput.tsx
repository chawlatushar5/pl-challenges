import { useState } from "react";

interface Props {
  onAdd: (title: string) => void;
}

export function TodoInput({ onAdd }: Props) {
  const [value, setValue] = useState("");

  function submit() {
    if (!value.trim()) return;
    onAdd(value.trim());
    setValue("");
  }

  return (
    <div className="todo-input">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && submit()}
        placeholder="What needs doing?"
      />
      <button onClick={submit}>Add</button>
    </div>
  );
}
