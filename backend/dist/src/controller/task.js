"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.getTaskById = exports.getAllTasks = exports.addTask = void 0;
const Task_1 = __importDefault(require("../models/Task"));
//controller for POST /api/tasks/
const addTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, status, priority, dueDate } = req.body;
    try {
        if (!req.user || !req.user.email) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const username = req.user.email;
        const task = new Task_1.default({
            title,
            username,
            description,
            status,
            priority,
            dueDate: dueDate ? new Date(dueDate) : undefined,
        });
        yield task.save();
        res.status(201).json({ message: 'Task created', task });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});
exports.addTask = addTask;
//controller for GET /api/tasks/
//fatching the the task added by a particular person using emailId stored in localstorage/Token
const getAllTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userEmail = (_a = req.user) === null || _a === void 0 ? void 0 : _a.email;
        if (!userEmail) {
            return res.status(400).json({ message: 'User email not found in token' });
        }
        const tasks = yield Task_1.default.find({ username: userEmail });
        res.status(200).json({ tasks });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch tasks' });
    }
});
exports.getAllTasks = getAllTasks;
// Get task by id. controller for  GET /api/tasks/:id 
// to fetch data using id of a parcular task
const getTaskById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const task = yield Task_1.default.findById(id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json({ task });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch task' });
    }
});
exports.getTaskById = getTaskById;
// PUT /api/tasks/:id
//this is using during Edit
const updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Incoming update body:", req.body);
        //find the task by the id and updating the task details
        const task = yield Task_1.default.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json(task);
    }
    catch (error) {
        console.error("Error updating task:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.updateTask = updateTask;
//controller for deletetask
//DELETE /api/tasks/:id 
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const taskId = req.params.id;
    //this is just find by id and delete
    try {
        const deletedTask = yield Task_1.default.findByIdAndDelete(taskId);
        if (!deletedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json({ message: 'Task deleted successfully' });
    }
    catch (error) {
        console.error('Error deleting task:', error);
        res.status(500).json({ message: 'Server error while deleting task' });
    }
});
exports.deleteTask = deleteTask;
