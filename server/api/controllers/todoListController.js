const mongoose = require('mongoose');
const Task = mongoose.model('Tasks');

// List all tasks
exports.list_all_tasks = function(req, res) {
    Task.find({}, function(err, tasks) {
        if (err) res.status(500).send(err);
        res.status(200).json(tasks);
    });
};

// Create a new task
exports.create_a_task = function(req, res) {
    const new_task = new Task(req.body);
    new_task.save(function(err, task) {
        if (err) res.status(400).send(err);
        res.status(201).json(task);
    });
};

// Read a task by ID
exports.read_a_task = function(req, res) {
    Task.findById(req.params.taskId, function(err, task) {
        if (err) res.status(500).send(err);
        if (!task) res.status(404).json({ message: "Task not found" });
        else res.status(200).json(task);
    });
};

// Update a task by ID
exports.update_a_task = function(req, res) {
    Task.findOneAndUpdate({ _id: req.params.taskId }, req.body, { new: true }, function(err, task) {
        if (err) res.status(400).send(err);
        res.status(200).json(task);
    });
};

// Delete a task by ID
exports.delete_a_task = function(req, res) {
    Task.findByIdAndDelete(req.params.taskId, function(err) {
        if (err) res.status(500).send(err);
        res.status(200).json({ message: 'Task successfully deleted' });
    });
};
