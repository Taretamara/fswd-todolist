import $ from 'jquery';

$.ajaxSetup({
  headers: {
    'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
  }
});

// Fetch all tasks
export var indexTasks = function(successCB, errorCB) {
  $.ajax({
    type: 'GET',
    url: '/api/tasks?api_key=1',
    success: successCB,
    error: errorCB || function(err) {
      console.error("Error fetching tasks:", err);
    }
  });
};

// Create a new task
export var postTask = function(content, successCB, errorCB) {
  $.ajax({
    type: 'POST',
    url: '/api/tasks?api_key=1',
    data: { task: { content: content } },
    success: successCB,
    error: errorCB || function(err) {
      console.error("Error adding task:", err);
    }
  });
};

// Mark a task as complete
export var markComplete = function(taskId, successCB, errorCB) {
  $.ajax({
    type: 'PUT',
    url: `/api/tasks/${taskId}/mark_complete?api_key=1`,
    success: successCB,
    error: errorCB || function(err) {
      console.error("Error marking task complete:", err);
    }
  });
};

// Delete a task
export var deleteTask = function(taskId, successCB, errorCB) {
  $.ajax({
    type: 'DELETE',
    url: `/api/tasks/${taskId}?api_key=1`,
    success: successCB,
    error: errorCB || function(err) {
      console.error("Error deleting task:", err);
    }
  });
};
