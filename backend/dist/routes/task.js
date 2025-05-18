"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const task_1 = require("../controller/task");
const auth_1 = require("../middleware/auth");
const task_2 = require("../controller/task");
const task_3 = require("../controller/task");
const task_4 = require("../controller/task");
const task_5 = require("../controller/task");
const router = express_1.default.Router();
//POST /api/tasks/
router.post('/', auth_1.authMiddleware, task_1.addTask);
//GET /api/tasks/ 
router.get('/', auth_1.authMiddleware, task_2.getAllTasks);
//GET /api/tasks/:id
router.get('/:id', auth_1.authMiddleware, task_3.getTaskById);
//PUT /api/tasks/:id
router.put('/:id', auth_1.authMiddleware, task_4.updateTask);
//DELETE /api/tasks/:id
router.delete('/:id', auth_1.authMiddleware, task_5.deleteTask);
exports.default = router;
