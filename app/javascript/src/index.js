import $ from 'jquery';
import { indexTasks, postTask, deleteTask, markComplete } from "./requests";

// Function to render tasks dynamically
function renderTasks() {
  indexTasks(function(response) {
    if (!Array.isArray(response.tasks)) {
      console.error("Invalid task data received.");
      return;
    }

    var htmlString = response.tasks.map(function(task) {
      return `
        <div class='col-12 mb-3 p-2 border rounded task' data-id='${task.id}'>
          <p>${task.content}</p>
          <button class='btn btn-success mark-complete' data-id='${task.id}'>
            ${task.completed ? 'Mark Active' : 'Mark Complete'}
          </button>
          <button class='btn btn-danger delete-task' data-id='${task.id}'>Delete</button>
        </div>
      `;
    }).join("");

    $("#tasks").html(htmlString);

    // Attach event listeners
    $(".mark-complete").on("click", function() {
      const taskId = $(this).data("id");
      markComplete(taskId, renderTasks); // Re-fetch tasks after update
    });

    $(".delete-task").on("click", function() {
      const taskId = $(this).data("id");
      deleteTask(taskId, renderTasks); // Re-fetch tasks after delete
    });
  });
}

// Event listener for adding a task
$("#add-task-button").on("click", function() {
  const taskContent = $("#new-task-content").val().trim();
  if (taskContent) {
    postTask(taskContent, renderTasks);
    $("#new-task-content").val(""); // Clear input
  }
});

// Initial load of tasks
$(document).ready(renderTasks);
