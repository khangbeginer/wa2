module.exports = function(app) {
    const todoList = require('../controllers/todoListController');

    // Route for listing and creating tasks
    app.route('/tasks')
        .get(todoList.list_all_tasks)   // List all tasks (GET)
        .post(todoList.create_a_task);  // Create a new task (POST)

    // Route for specific task operations (read, update, delete by ID)
    app.route('/tasks/:taskId')
        .get(todoList.read_a_task)      // Read a task by ID (GET)
        .put(todoList.update_a_task)    // Update a task by ID (PUT)
        .delete(todoList.delete_a_task); // Delete a task by ID (DELETE)
};
