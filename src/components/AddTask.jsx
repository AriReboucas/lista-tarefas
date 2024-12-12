import { useState } from "react";
import Input from "./Input";

function AddTask({ onAddTaskSubmit }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  function onSubmit(e) {
    e.preventDefault();
  }

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-4 p-6 bg-slate-200 rounded-md shadow flex flex-col"
    >
      <Input
        autoFocus={true}
        type="text"
        placeholder="Digite o título da tarefa"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="focus:outline-2 focus:ring-3  border-slate-300 rounded-md"
      />

      <Input
        type="text"
        placeholder="Digite a descrição da tarefa"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="focus:outline-2 focus:ring-3  border-slate-300 rounded-md"
      />
      <button
        onClick={() => {
          if (!title.trim() || !description.trim()) {
            return alert("Preencha o título e a descrição da tarefa!");
          }
          onAddTaskSubmit(title, description);
          setTitle("");
          setDescription("");
        }}
        className="bg-slate-500 text-white px-4 py-2 rounded-md font-medium focus:outline-2 focus:ring-3"
      >
        Adicionar
      </button>
    </form>
  );
}

export default AddTask;
