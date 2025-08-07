import { useState } from 'react';
import '../style/form.css';
import {BASE_URL} from '../shared/urls.js';

function saveTask(task, setTasks, setName, setDescription) {
    fetch(BASE_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
    })
        .then(response => response.json())
        .then(data => {
            setTasks(prev => [
                ...prev,
                data
            ]);
            setName('');
            setDescription('')
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

function Form({ setTasks }) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };


    return (
        <div className="task-form-container">
            <h1>add your Task </h1>
            <div className="task-form-input-container">
                <label>Task name:</label>
                <input className="task-form-input" type="text" value={name} onChange={handleNameChange} />
            </div>
            <div className="task-form-input-container">
                <label>Task description:</label>
                <input className="task-form-input" type="text" value={description} onChange={handleDescriptionChange} />
            </div>

            <div>
                <button onClick={() => saveTask({ name, description }, setTasks, setName, setDescription)}>
                    submit
                </button>
            </div>
        </div>
    );
}

export default Form;