import express from 'express';
import { addTask } from '../controller/task';
import { authMiddleware } from '../middleware/auth';
import { RequestHandler } from 'express';
import { getAllTasks } from '../controller/task';
import { getTaskById } from '../controller/task';
import { updateTask } from '../controller/task';
import { deleteTask } from '../controller/task';
const router = express.Router();
//POST /api/tasks/
router.post('/', authMiddleware as RequestHandler, addTask as RequestHandler);
//GET /api/tasks/ 
router.get('/', authMiddleware as RequestHandler ,  getAllTasks as RequestHandler);
//GET /api/tasks/:id
router.get('/:id', authMiddleware as RequestHandler , getTaskById as RequestHandler );
//PUT /api/tasks/:id
router.put('/:id'  ,authMiddleware as RequestHandler, updateTask as RequestHandler)    
//DELETE /api/tasks/:id
router.delete('/:id', authMiddleware as RequestHandler,  deleteTask as RequestHandler);
export default router;
