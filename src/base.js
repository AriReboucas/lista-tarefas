import { useState } from "react";

//hook que permite algumas funcionalidades especiais do React

useState 
// variável que é alterada no React que faz com que o componente seja renderizado novamente com o novo valor / utilizando quando se quer fazer algo em resposta a interação do usuário
// quando altera a variável precisa alterar a interface? Cria um state

// sempre que usa o .map a tag precisa ter uma key={} que seja única
<ul className="space-y-4">
      {props.tasks.map((task) => (
        <li key={task.id} className="bg-slate-400 text-white p-2 rounded-md">
          {task.title}
        </li>
      ))}
    </ul>


// destructuring - desestruturação
function Tasks({ tasks, onTaskClick, onDeleteTaskClick }){ //passo como props para a function
return (
    <ul className="space-y-4 p-6 bg-slate-200 rounded-md shadow">
      {tasks.map((task) => ( //passa a propriedade passada direto 
        <li key={task.id} className="flex gap-2">
          <button
            onClick={() => {
              onTaskClick(task.id); //passa a propriedade passada direto 
            }}
            className={`bg-slate-400 text-left text-white p-2 rounded-md w-full ${
              task.isCompleted && "line-through"
            }`}
          >
            {task.title}
          </button>
          <button className="bg-slate-400 p-2 rounded-md text-white">
            <ChevronRightIcon />
          </button>
          <button
            onClick={() => onDeleteTaskClick(task.id)} //passa a propriedade passada direto 
            className="bg-slate-400 p-2 rounded-md text-white"
          >
            <TrashIcon />
          </button>
        </li>
      ))}
    </ul>
  )};


  <button
  onClick={() => {
    // validação de campos preenchidos para add novo
    if (!title.trim() || !description.trim()) { //.trim() -> elimina os espaços em branco
      return alert("Preencha o título e a descrição da tarefa!");
    }
    onAddTaskSubmit(title, description); // add nova task após preenchidos os campos
    setTitle(""); // limpa o campo após add nova task
    setDescription(""); // limpa o campo após add nova task
  }}
  className="bg-slate-500 text-white px-4 py-2 rounded-md font-medium"
>
  Adicionar
</button>

// utilizando params para as pages/urls com QueryParams -> react router dom
function TaskPage() {
    const [searchParams] = useSearchParams();
    const title = searchParams.get("title");
    const description = searchParams.get("description");
  
    return (
      <div className="h-screen w-screen bg-slate-500 p-6">
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    );
  }
  
  // função que faz a navegação para outras rotas/páginas
  function onSeeDetailsClick(task) {
    const query = new URLSearchParams(); // segurança para ajustes de rota(url)
    query.set("title", task.title);
    query.set("description", task.description);
    navigate(`/task?${query.toString()}`);
  }

  
  // é o mesmo que criar uma função e chamar o navigate (hook)
  onClick={() => navigate(-1)}
 
  function onBackClick() {
    navigate(-1)
  }
  onClick={onBackClick}

  //useEffect -> recebe como parâmetros uma função e uma lista
  // a função é executada sempre que oque foi colocado na lista for alterado
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks)) // converte a lista para string
  }, [tasks])
  //se o segundo parâmetro estiver vazio, a função só é realizada uma vez, no carregamento da página
  

  //persiste as informações por meio do localstorage e se não tiver itens, retornar uma lista vazia
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );

  //consumo de dados de uma API por meio do fetch
  const fetchTasks = async () => {
    //chama a API
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/todos?_limit=10",
      {
        method: "GET",
      }
    ); 
    //pegar os dados que ela retorna
    const data = await response.json();
    //armazena e persiste no state
    setTasks(data);
  };
  fetchTasks();
}, []);