import { createTask, getAllUsers, getTask, getTasks, deleteTask, updateTask } from './petitions.js';

const tabla = document.getElementById('tabla');
const tareaCompletada = document.getElementById('completed');
const formulario = document.getElementById('form-task');
const formTitle = document.getElementById('form-title');
const listUsers = document.getElementById('users');
const submitButton = document.getElementById('submitbutton');
let estaActualizando = false;
let idEditar;

document.addEventListener('DOMContentLoaded', async () => {
  const users = await getAllUsers();

  let template = listUsers.innerHTML;
  for (const user of users) {
    template += `
      <option value="${user.id}">${user.fullname}</option>
    `;
  }

  listUsers.innerHTML = template;
});

listUsers.addEventListener('change', async () => {
  let template = '';
  const tareas = await getTasks(listUsers.value);
  console.log(tareas);
  tareas.forEach((tarea) => {
    const completado = tarea.completed ? 'Completada' : 'No Completada'; // Modificación aquí
    template += `
      <tr id=fila${tarea.id}>
        <td>${tarea.id}</td>
        <td>${listUsers.options[listUsers.value].innerText}</td>
        <td>${tarea.title}</td>
        <td>${completado}</td> <!-- Modificación aquí -->
        <td>
          <button class="btn btn-secondary btn-sm updateBtn" id="updateBtn${tarea.id}">
            <span>Update</span> <i class="nf nf-md-pencil"></i>
          </button>
          <button class="btn btn-danger btn-sm deleteBtn" id="deleteBtn${tarea.id}">
            <span>Delete</span> <i class="nf nf-cod-trash"></i>
          </button>
        </td>
      </tr>
    `;
  });
  tabla.innerHTML = template;

  const deleteButtons = document.querySelectorAll('.deleteBtn');
  deleteButtons.forEach((button) => {
    button.addEventListener('click', async () => {
      console.log('Borrar');
      const taskId = button.id.replace('deleteBtn', '');
      console.log(taskId);
      const row = document.getElementById(`fila${taskId}`);
      row.remove();
      await deleteTask(taskId);
    });
  });

  const updateButtons = document.querySelectorAll('.updateBtn');
  updateButtons.forEach((button) => {
    button.addEventListener('click', async (e) => {
      console.log('Actualizar');
      const taskId = button.id.replace('updateBtn', '');
      const taskInfo = await getTask(taskId);
      let taskCheck;
      idEditar = taskId;
      taskInfo.completed === true ? (taskCheck = 'true') : (taskCheck = '');
      console.log(taskInfo);
      formulario.querySelector('#title').value = `${taskInfo.title}`; 
      formTitle.innerText = 'Modify Task'; 
      tareaCompletada.checked = taskCheck; 
      submitButton.innerText = 'UPDATE';
      submitButton.setAttribute('id', 'update');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      estaActualizando = true;
    });
  });
});

// AGREGAR TASK O UPDATE TASK
formulario.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(formulario);
  const completedValue = tareaCompletada.checked ? 1 : 0;
  formData.append('completed', completedValue);

  if (estaActualizando && idEditar) {
    // Si estamos actualizando y tenemos un ID válido para editar
    try {
      const response = await updateTask(formData, idEditar);
      if (response.success) {
        // Actualizamos la tarea existente en la tabla
        const taskInfo = await getTask(idEditar);
        let taskCompleted = '0';
        if (taskInfo.completed) {
          taskCompleted = '1';
        }
        const rowToUpdate = document.getElementById(`fila${idEditar}`);
        rowToUpdate.children[2].innerText = taskInfo.title; // Actualizamos el título de la tarea
        rowToUpdate.children[3].innerText = taskCompleted; // Actualizamos el estado completado de la tarea
        // Reiniciamos el formulario y los estados
        formTitle.innerText = 'Insert Task';
        submitButton.innerText = 'SAVE';
        submitButton.setAttribute('id', 'insert');
        formulario.reset();
        estaActualizando = false;
        idEditar = null;
      } else {
        console.error('Failed to update task');
      }
    } catch (error) {
      console.error('Error updating task:', error);
    }
  } else {
    // Si no estamos en la actividad de actualizando, creamos una nueva tarea
    try {
      const response = await createTask(formData);
      if (response.success) {
        // Insertamos la nueva tarea en la tabla
        const taskInfo = await getTask(response.taskId);
        let taskCompleted = '0'; //No completada
        if (taskInfo.completed) {
          taskCompleted = '1'; //Completada
        }
        const newRow = document.createElement('tr');
        newRow.setAttribute('id', `fila${taskInfo.id}`);
        newRow.innerHTML = `
          <td>${taskInfo.id}</td>
          <td>${listUsers.options[listUsers.value].innerText}</td>
          <td>${taskInfo.title}</td>
          <td>${taskCompleted}</td>
          <td>
            <button class="btn btn-secondary btn-sm updateBtn" id="updateBtn${taskInfo.id}">
              <span>Update</span> <i class="nf nf-md-pencil"></i>
            </button>
            <button class="btn btn-danger btn-sm deleteBtn" id="deleteBtn${taskInfo.id}">
              <span>Delete</span> <i class="nf nf-cod-trash"></i>
            </button>
          </td>
        `;
        tabla.appendChild(newRow);
      } else {
        console.error('Failed to create task');
      }
    } catch (error) {
      console.error('Error creating task:', error);
    }
  }
});
