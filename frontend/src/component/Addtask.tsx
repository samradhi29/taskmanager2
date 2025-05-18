import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

export default function AddTask() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState<'pending' | 'in progress' | 'completed' | 'archived'>('pending');
    const [priority, setPriority] = useState<'low' | 'medium' | 'high' | 'urgent'>('medium');
    const [dueDate, setDueDate] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const token = localStorage.getItem('token');
        if (!token) {
            toast.error('You must be logged in to add tasks');
            return;
        }

        try {
            await axios.post(
                'https://taskmanager2-8.onrender.com/api/tasks',
                { title, description, status, priority, dueDate: dueDate || undefined },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            toast.success('Task added successfully');
            navigate('/dashboard');

            // Clear form
            setTitle('');
            setDescription('');
            setStatus('pending');
            setPriority('medium');
            setDueDate('');
        } catch (error: any) {
            console.error(error);
            toast.error(error.response?.data?.message || 'Failed to add task');
        }
    };

    return (
        <div className="relative bg-gradient-to-br from-purple-950 to-black min-h-screen flex items-center justify-center p-6">

            {/* Cancel Button */}
            <button
                type="button"
                onClick={() => navigate('/dashboard')}
                className="absolute top-6 left-6 bg-red-800 hover:bg-red-600 text-white font-bold px-4 py-2 rounded-md transition"
            >
                Cancel
            </button>

            <div className="max-w-sm w-full p-6 bg-black rounded-lg border border-white shadow-lg text-white">
                <h2 className="text-2xl font-extrabold mb-6 text-center text-purple-400">Add Task</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        required
                        className="w-full px-4 py-2 bg-gray-950 border border-white rounded-md text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />

                    <textarea
                        placeholder="Description"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        rows={4}
                        className="w-full px-4 py-2 bg-gray-950 border border-white rounded-md text-purple-200 placeholder-white focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                    />

                    <div className="flex flex-col space-y-4">
                        <label className="block font-semibold text-purple-300">
                            Status:
                            <select
                                value={status}
                                onChange={e => setStatus(e.target.value as any)}
                                className="mt-2 w-full bg-gray-950 border border-white rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                            >
                                <option value="pending">Pending</option>
                                <option value="in progress">In Progress</option>
                                <option value="completed">Completed</option>
                                <option value="archived">Archived</option>
                            </select>
                        </label>

                        <label className="block font-semibold text-purple-300">
                            Priority:
                            <select
                                value={priority}
                                onChange={e => setPriority(e.target.value as any)}
                                className="mt-2 w-full bg-gray-950 border border-white rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                            >
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                                <option value="urgent">Urgent</option>
                            </select>
                        </label>
                    </div>

                    <div>
                        <label className="block font-semibold text-purple-300 mb-2">Due Date:</label>
                        <input
                            type="date"
                            value={dueDate}
                            onChange={e => setDueDate(e.target.value)}
                            className="w-full bg-black border border-white rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-purple-900 hover:bg-white text-white font-bold py-2 rounded-md transition"
                    >
                        Add Task
                    </button>
                </form>

                <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    toastStyle={{ backgroundColor: '#1f2937', color: '#c4b5fd' }}
                    theme="dark"
                />
            </div>
        </div>
    );
}
