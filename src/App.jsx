import { useEffect, useState } from "react";
import AddTask from "./components/AddTask";
import Tasks from "./components/Tasks";
import Title from "./components/Title";

// const BASE_URL = "http://192.168.0.100:3000/task";
const BASE_URL = "https://tasklist-api-88rl.onrender.com/task";

const app = {
  ownerEmail: "app@nuratech.com",
  appId: "Curso-React",
};

function App() {
  const [tasks, setTasks] = useState([]);

  const deleteTask = async (taskId) => {
    const response = await fetch(BASE_URL + "/" + taskId, {
      method: "DELETE",
    });
    const deletedTask = await response.json();
    alert(`Task "${deletedTask.title}" deletada com sucesso!`);
  };

  const getTasks = async () => {
    const responseTaskList = await fetch(
      `${BASE_URL}?ownerEmail=${app.ownerEmail}&appId=${app.appId}`,
      {
        method: "GET",
      }
    );
    const dataTaskList = await responseTaskList.json();
    setTasks(dataTaskList);
  };

  const createTask = async (task) => {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...task, ...app }),
    });
    const newTask = await response.json();
    alert(`Task "${newTask.title}" criada com sucesso!`);
  };

  const updateTaskStatus = async (taskId, status) => {
    const response = await fetch(BASE_URL + "/" + taskId, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: status.toString() }),
    });
    const updatedTask = await response.json();
    alert(`Task "${updatedTask.title}" atualizada com sucesso!`);
  };

  useEffect(() => {
    getTasks();
  }, []);

  async function onTaskClick(taskId, status) {
    await updateTaskStatus(taskId, status);
    await getTasks();
  }

  async function onDeleteTaskClick(taskId) {
    await deleteTask(taskId);
    await getTasks();
  }

  async function onAddTaskSubmit(title, description) {
    const newTask = {
      title,
      description,
      status: "todo",
    };
    await createTask(newTask);
    await getTasks();
  }

  return (
    <div className="w-screen h-screen bg-slate-500 flex justify-center p-6">
      <div className="w-[500px] space-y-4">
        <Title>Gerenciador de Tarefas</Title>
        <AddTask onAddTaskSubmit={onAddTaskSubmit} />
        <Tasks
          tasks={tasks}
          onTaskClick={onTaskClick}
          onDeleteTaskClick={onDeleteTaskClick}
        />
      </div>
    </div>
  );
}

export default App;
