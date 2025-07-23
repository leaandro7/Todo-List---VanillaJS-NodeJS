const btnAdd = document.getElementsByClassName("btn-add");
const inputTask = document.getElementById("inputTask");

const ulTaskList = document.querySelector(".task-list");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Add Task Function
const addTask = () => {
  // For user write something.
  console.log(inputTask.value.length);

  if (!inputTask.value) {
    return alert("Write something");
  } else if (inputTask.value.length < 2) {
    return alert("Your task need 2+ characters");
  } else {
    console.log("Input capturado");
  }

  // captura task e cria-se objeto
  let task = {
    taskName: inputTask.value,
    taskId: tasks.length + 1,
    checkTask: false,
  };

  // adiciona task no array de tasks
  tasks.push(task);

  // clear input
  inputTask.value = "";

  // carregar todas tasks na tela.
  loadTasks();
};

// Load Task Function
const loadTasks = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks));

  // limpa lista ul para que itens não sejam subscritos.
  ulTaskList.innerHTML = "";

  tasks.forEach((i, index) => {
    // criação da li
    let taskLi = document.createElement("li");

    // gives her atributes
    taskLi.id = `${i.taskId}`;

    taskLi.innerHTML = `<span style='${
      i.checkTask == false
        ? "text-decoration: none"
        : "text-decoration: line-through"
    }'> ${i.taskName} </span> 
        <div>
        <button onclick="removeTask(${
          i.taskId
        })" class="remove-btn"><i class="fa fa-times" aria-hidden="true"></i></button> 
        <button onclick="markTask(${i.taskId})" class="mark-btn">
        
        ${
          i.checkTask
            ? '<i class="fa fa-circle" aria-hidden="true"></i>'
            : '<i class="fa-regular fa-circle"></i>'
        }
        
        </button>

        </div>`;

    ulTaskList.appendChild(taskLi);
  });
};

const removeTask = (id) => {
  // Retorna uma lista sem o item a ser removido.
  let newList = tasks.filter((i) => i.taskId !== id);
  tasks = tasks.filter((i) => i.taskId !== id);
  localStorage.setItem("tasks", JSON.stringify(newList));
  loadTasks();
};

const markTask = (id) => {
  let newList = tasks.filter((i) => i.taskId !== id);
  let checkedTask = tasks.filter((i) => i.taskId == id);

  if (checkedTask[0].checkTask == false) {
    checkedTask[0].checkTask = true;
    tasks = newList;
    tasks.push(checkedTask[0]);
  } else {
    checkedTask[0].checkTask = false;
  }

  loadTasks();
};

// First load of tasks
loadTasks();
