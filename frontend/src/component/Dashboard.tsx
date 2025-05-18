import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EditTask from './EditTask';
import {
  FaTimes,
  FaCalendarAlt,
  FaUser,
  FaFlag,
  FaTasks,
  FaClock,
  FaSignOutAlt,
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

interface Task {
  _id: string;
  title: string;
  username: string;
  description?: string;
  status: string;
  priority: string;
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
}

const priorityColors: Record<string, string> = {
  urgent: 'bg-red-700 text-white',
};

const statusColors: Record<string, string> = {
  done: 'text-green-400 line-through',
  pending: 'text-yellow-400 font-semibold',
};

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const fetchTasks = async () => {
    try {
      const res = await axios.get('http://localhost:4000/api/tasks', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(res.data.tasks);
    } catch (err) {
      console.error('Failed to fetch tasks:', err);
    }
  };

  const fetchTaskById = async (id: string) => {
    try {
      const res = await axios.get(`http://localhost:4000/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSelectedTask(res.data.task);
      setIsEditing(false);
    } catch (err) {
      console.error('Failed to fetch task details:', err);
    }
  };

  const handleUpdateTask = async (updatedTask: Task) => {
    try {
      const res = await axios.put(
        `http://localhost:4000/api/tasks/${updatedTask._id}`,
        updatedTask,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert('Task updated successfully');
      setSelectedTask(res.data);
      setIsEditing(false);
      fetchTasks();
    } catch (err) {
      console.error('Failed to update task:', err);
    }
  };

  const handleDeleteTask = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    try {
      await axios.delete(`http://localhost:4000/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Task deleted successfully');
      setSelectedTask(null);
      fetchTasks();
    } catch (err) {
      console.error('Failed to delete task:', err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 to-black text-white p-10 max-w-6xl mx-auto font-sans select-none">
      <div className="flex justify-between items-center mb-14">
        {/* Left side: Logout button and heading */}
        <div className="flex items-center gap-4">
          <button
            onClick={handleLogout}
            className="text-purple-300 hover:text-white text-2xl p-2 rounded-full transition"
            aria-label="Logout"
            title="Logout"
          >
            <FaSignOutAlt />
          </button>
          <h1 className="text-3xl font-extrabold text-purple-200 drop-shadow-[0_2px_10px_rgba(139,92,246,0.7)] tracking-wide">
            Task Manager
          </h1>
        </div>

        <button
          className="bg-purple-800 hover:bg-purple-700 active:bg-purple-800 text-white px-6 py-2 rounded-full font-semibold shadow-lg transition duration-300 ease-in-out"
          onClick={() => navigate('/addtask')}
        >
          + Add Task
        </button>
      </div>

      {tasks.length === 0 && (
        <p className="text-center text-lg text-purple-300">No tasks found.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 ">
        {tasks.map((task) => (
          <div
            key={task._id}
            onClick={() => fetchTaskById(task._id)}
            className={`cursor-pointer rounded-3xl border-1 border-l-amber-50 p-6 shadow-lg  transition-all duration-300  ${selectedTask?._id === task._id
              ? 'bg-purple-600 shadow-[0_8px_25px_rgba(139,92,246,0.95)] scale-[1.04]'
              : 'bg-gray-900 hover:bg-purple-900 hover:shadow-[0_4px_15px_rgba(139,92,246,0.8)]'
              }`}
          >
            <h3 className="text-2xl font-semibold mb-3 text-purple-300 truncate">
              {task.title}
            </h3>
            <span
              className={`inline-block px-3 py-1 rounded-full text-sm font-semibold mb-2 ${priorityColors[task.priority] || 'bg-yellow-500 text-black'
                }`}
            >
              Priority: {task.priority}
            </span>
            <p
              className={`inline-block text-lg ${statusColors[task.status] || 'text-white'
                }`}
            >
              Status: {task.status}
            </p>
          </div>
        ))}
      </div>

      {selectedTask && !isEditing && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50 p-5">
          <div className="relative bg-gray-900 rounded-3xl shadow-2xl p-10 max-w-4xl w-full text-white border border-white ring-4 ring-purple-700/50">
            <button
              onClick={() => setSelectedTask(null)}
              className="absolute top-5 right-5 text-purple-300 hover:text-white text-2xl transition"
              aria-label="Close details"
            >
              <FaTimes />
            </button>

            <h2 className="text-4xl font-bold mb-8 text-purple-400 drop-shadow-md tracking-wide text-center">
              Task Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg">
              <div className="space-y-4">
                <p>
                  <FaTasks className="inline mr-2 text-purple-300" />
                  <span className="font-semibold text-purple-300">Title:</span>{' '}
                  {selectedTask.title}
                </p>
                <p>
                  <FaUser className="inline mr-2 text-purple-300" />
                  <span className="font-semibold text-purple-300">Assigned to:</span>{' '}
                  {selectedTask.username}
                </p>
                <p>
                  <FaFlag className="inline mr-2 text-purple-300" />
                  <span className="font-semibold text-purple-300">Priority:</span>{' '}
                  {selectedTask.priority}
                </p>
                <p>
                  <FaClock className="inline mr-2 text-purple-300" />
                  <span className="font-semibold text-purple-300">Status:</span>{' '}
                  {selectedTask.status}
                </p>
              </div>
              <div className="space-y-4">
                <p>
                  <FaCalendarAlt className="inline mr-2 text-purple-300" />
                  <span className="font-semibold text-purple-300">Due Date:</span>{' '}
                  {selectedTask.dueDate
                    ? new Date(selectedTask.dueDate).toDateString()
                    : 'N/A'}
                </p>
                <p>
                  <span className="font-semibold text-purple-300">Description:</span>{' '}
                  {selectedTask.description || 'N/A'}
                </p>
                <p>
                  <span className="font-semibold text-purple-300">Created At:</span>{' '}
                  {new Date(selectedTask.createdAt).toLocaleString()}
                </p>
                <p>
                  <span className="font-semibold text-purple-300">Updated At:</span>{' '}
                  {new Date(selectedTask.updatedAt).toLocaleString()}
                </p>
              </div>
            </div>

            <div className="mt-10 flex gap-6 justify-center md:justify-start">
              <button
                onClick={() => setIsEditing(true)}
                className="bg-purple-600 hover:bg-purple-700 active:bg-purple-800 text-white px-8 py-3 rounded-xl font-semibold shadow-lg transition duration-300 ease-in-out"
              >
                Edit Task
              </button>
              <button
                onClick={() => handleDeleteTask(selectedTask._id)}
                className="bg-red-700 hover:bg-red-700 active:bg-red-800 text-white px-8 py-3 rounded-xl font-semibold shadow-lg transition duration-300 ease-in-out"
              >
                Delete Task
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedTask && isEditing && (
        <EditTask
          task={selectedTask}
          onUpdate={handleUpdateTask}
          onCancel={() => setIsEditing(false)}
        />
      )}
    </div>
  );
}
