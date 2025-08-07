import { useState } from 'react';
import '../style/table.css';
import { BASE_URL } from '../shared/urls.js';


function updateTask(task, setTasks) {
    fetch(BASE_URL, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
    })
        .then(response => response.json())
        .then(data => {
            setTasks(prev => {
                return {
                    ...prev.filter(task.id !== data.id),
                    ...data
                };
            });
        })
        .catch((error) => {
            console.error('Error:', error);
            alert("we were not able to update your task: " + task.id);
        });
}

function deleteTask(taskId, setTask) {
    fetch(`${BASE_URL}/${taskId}`, {
        method: 'DELETE'
    })
        .then(data => {
            setTask(prev => {
                return prev.filter(task => task.id !== taskId);
            });
        })
        .catch((error) => {
            console.error('Error:', error);
            alert("we were not able to delete your task: " + taskId);
        });
}

function Table({ tasks, setTasks }) {
    const [editingId, setEditingId] = useState(null);
    const [editFields, setEditFields] = useState({});

    const handleEditFieldChange = (id, field, value) => {
        setEditFields(prev => ({
            ...prev,
            [field]: value
        }));

        //t(JSON.stringify(editFields));
    };

    return (
        <div className="table-container">
            <table border="1">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Completed</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map(task => (
                        <tr key={task.id}>
                            <td>{task.id}</td>
                            <td className='table-column'>
                                {editingId === task.id ? (
                                    <input
                                        className='table-input'
                                        type="text"
                                        value={editFields.name}
                                        onChange={e => handleEditFieldChange(task.id, 'name', e.target.value)}
                                    />
                                ) : (
                                    task.name
                                )}
                            </td>
                            <td className='table-column' >
                                {editingId === task.id ? (
                                    <input
                                        type="text"
                                        value={editFields.description}
                                        onChange={e => handleEditFieldChange(task.id, 'description', e.target.value)}
                                        className='table-input'
                                    />
                                ) : (
                                    task.description
                                )}
                            </td>
                            <td className='table-column'>
                                {editingId === task.id ? (
                                    <input
                                        type="checkbox"
                                        checked={editFields.completed}
                                        onChange={e => handleEditFieldChange(task.id, 'completed', e.target.checked)}
                                    />
                                ) : (
                                    task.completed ? 'Yes' : 'No'
                                )}
                            </td>
                            <td className='table-column'>
                                {editingId === task.id ? (
                                    <>
                                        <button
                                            onClick={() => {
                                                updateTask(editFields, setTasks);
                                                setEditingId(null)
                                                setEditFields({})
                                            }}
                                        >Save</button>
                                        <button onClick={() => {
                                            setEditingId(null);
                                            setEditFields({});
                                        }}>
                                            Cancel
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button onClick={() => {
                                            setEditingId(task.id);
                                            setEditFields(() => ({
                                                id: task.id,
                                                name: task.name,
                                                description: task.description,
                                                completed: task.completed
                                            }));
                                        }}>Edit</button>

                                        <button onClick={() => {
                                            deleteTask(task.id, setTasks);
                                        }}>delete</button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Table;