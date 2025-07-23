const modal = document.getElementById("modal");

const ulList = document.getElementById("taskList");

const inputTask = document.getElementById("inputTask");
const editInputTask = document.getElementById("editInputTask");

// NEW task
const newTask = async () => {
  const addTaskSong = new Audio("./audios/addTask.mp3");

  // Check input value
  if (inputTask.value == "") {
    return alert(`Digite uma tarefa`);
  }

  // Send the input content to backend
  await fetch("http://localhost:3000/tasks/new", {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({
      name: inputTask.value,
    }),
  })

  loadTasks();

  inputTask.value = "";
  addTaskSong.volume = 0.2;
  addTaskSong.play();
};

// EDIT task
const editTask = async () => {
  const response = await fetch(
    `http://localhost:3000/tasks/edit/${editInputTask.attributes.taskid.value}`,
    {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ name: editInputTask.value }),
    }
  );

  loadTasks();
  closeEditModal();
};

// LOAD TASK LIST
const loadTasks = async () => {
  // Clear UL
  ulList.innerHTML = "";

  const taskList = await fetch("http://localhost:3000/tasks/all").then(
    (response) => response.json()
  );

  taskList.forEach((i) => {
    const liElement = document.createElement("li");
    liElement.innerHTML = `<p ondblclick="checkTask('${i._id}')">${i.name}</p><span onclick="openEditModal('${i._id}')"><i class="fa fa-pencil" aria-hidden="true"></i></span>`;
    liElement.classList.add("task-item");

    if (i.done) {
      liElement.classList.add("checked");
    } else {
      liElement.classList.remove("checked");
    }

    ulList.appendChild(liElement);
  });
};

// EDIT MODAL
const openEditModal = async (idTask) => {
  const taskList = await fetch("http://localhost:3000/tasks/all").then(
    (response) => response.json()
  );

  taskList.forEach((i) => {
    if (i._id == idTask) {

      modal.classList.add("open");
      editInputTask.value = i.name;

      editInputTask.setAttribute("taskID", i._id);
    }
  });
};

const closeEditModal = () => {
  modal.classList.remove("open");
};

const checkTask = async (id) => {
  await fetch(`http://localhost:3000/tasks/check/${id}`, { method: "PUT" });
  loadTasks();
};

const clearTasks = async () => {
  const clearSong = new Audio("./audios/clearSong.mp3");

  await fetch(`http://localhost:3000/tasks/clear`, { method: "GET" });

  loadTasks();

  clearSong.volume = 0.2;
  clearSong.play();
};

//

loadTasks();
