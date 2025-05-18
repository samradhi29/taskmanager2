import React, { useState } from 'react';

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

interface EditTaskFormProps {
    task: Task;
    onUpdate: (updatedTask: Task) => void;
    onCancel: () => void;
}

export default function EditTask({ task, onUpdate, onCancel }: EditTaskFormProps) {
    const [title, setTitle] = useState(task.title);
    const [username, setUsername] = useState(task.username);
    const [description, setDescription] = useState(task.description || '');
    const [status, setStatus] = useState(task.status);
    const [priority, setPriority] = useState(task.priority.toLowerCase());
    const [dueDate, setDueDate] = useState(task.dueDate ? task.dueDate.split('T')[0] : '');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const updatedTask: Task = {
            ...task,
            title,
            username,
            description,
            status,
            priority: priority.toLowerCase(), //converting to lowercase for consistency
            dueDate: dueDate || undefined,
            createdAt: task.createdAt,
            updatedAt: new Date().toISOString(),
        };

        onUpdate(updatedTask);
    };
//edit form using tailwind
    return (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50" onClick={onCancel}>
            <form
                onSubmit={handleSubmit}
                onClick={e => e.stopPropagation()}
                className="bg-black border-2 border-white rounded-xl p-6 max-w-md w-full text-white shadow-lg"
                style={{ maxHeight: '80vh', overflowY: 'auto', minWidth: '320px' }}
            >
                <h3 className="text-2xl font-bold mb-6 text-purple-400">Edit Task</h3>

                <label className="block mb-4">
                    <span className="text-purple-300 font-semibold mb-1 block">Title:</span>
                    <input
                        type="text"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        required
                        className="w-full rounded-lg bg-black border border-white px-4 py-2 text-white"
                    />
                </label>

                <label className="block mb-4">
                    <span className="text-purple-300 font-semibold mb-1 block">Assigned To:</span>
                    <input
                        type="text"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        required
                        className="w-full rounded-lg bg-black border border-white px-4 py-2 text-white"
                    />
                </label>

                <label className="block mb-4">
                    <span className="text-purple-300 font-semibold mb-1 block">Description:</span>
                    <textarea
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        rows={4}
                        className="w-full rounded-lg bg-black border border-white px-4 py-2 text-white"
                    />
                </label>

                <label className="block mb-4">
                    <span className="text-purple-300 font-semibold mb-1 block">Status:</span>
                    <select
                        value={status}
                        onChange={e => setStatus(e.target.value)}
                        className="w-full rounded-lg bg-black border border-white px-4 py-2 text-white"
                    >
                        <option value="pending">pending</option>

                        <option value="completed">completed</option>
                    </select>
                </label>

                <label className="block mb-4">
                    <span className="text-purple-300 font-semibold mb-1 block">Priority:</span>
                    <select
                        value={priority}
                        onChange={e => setPriority(e.target.value.toLowerCase())}
                        className="w-full rounded-lg bg-black border border-white px-4 py-2 text-white"
                    >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                </label>

                <label className="block mb-6">
                    <span className="text-purple-300 font-semibold mb-1 block">Due Date:</span>
                    <input
                        type="date"
                        value={dueDate}
                        onChange={e => setDueDate(e.target.value)}
                        className="w-full rounded-lg bg-black border border-white px-4 py-2 text-white"
                    />
                </label>

                <div className="flex justify-end gap-4">
                    <button type="submit" className="bg-purple-600 px-6 py-2 rounded-xl">Save</button>
                    {/* cancel button to cut the edit form */}
                    <button type="button" onClick={onCancel} className="bg-gray-700 px-6 py-2 rounded-xl">Cancel</button> 
                </div>
            </form>
        </div>
    );
}
