import { Request, Response } from 'express';
import Task from '../models/Task';

interface AuthRequest extends Request {
    user?: { email?: string }; // from JWT payload
}
//controller for POST /api/tasks/
export const addTask = async (req: AuthRequest, res: Response) => {
    const { title, description, status, priority, dueDate } = req.body;
    try {
        if (!req.user || !req.user.email) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const username = req.user.email;

        const task = new Task({
            title,
            username,
            description,
            status,
            priority,
            dueDate: dueDate ? new Date(dueDate) : undefined,
        });

        await task.save();

        res.status(201).json({ message: 'Task created', task });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

//controller for GET /api/tasks/
//fatching the the task added by a particular person using emailId stored in localstorage/Token
export const getAllTasks = async (req: AuthRequest, res: Response) => {
  try {
    const userEmail = req.user?.email;
    if (!userEmail) {
      return res.status(400).json({ message: 'User email not found in token' });
    }

    const tasks = await Task.find({ username : userEmail });
    res.status(200).json({ tasks });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch tasks' });
  }
};

// Get task by id. controller for  GET /api/tasks/:id 
// to fetch data using id of a parcular task
export const getTaskById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const task = await Task.findById(id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json({ task });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch task' });
    }
};

// PUT /api/tasks/:id
//this is using during Edit
export const updateTask = async (req: Request, res: Response) => {
    try {
        console.log("Incoming update body:", req.body); 
//find the task by the id and updating the task details
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.status(200).json(task); 
    } catch (error) {
        console.error("Error updating task:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


//controller for deletetask
//DELETE /api/tasks/:id 
export const deleteTask = async (req: Request, res: Response) => {
    const taskId = req.params.id;
//this is just find by id and delete
    try {
        const deletedTask = await Task.findByIdAndDelete(taskId);

        if (!deletedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        console.error('Error deleting task:', error);
        res.status(500).json({ message: 'Server error while deleting task' });
    }
};