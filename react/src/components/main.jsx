import { useEffect, useState } from 'react';
import Form from './form';
import Table from './table';
import {BASE_URL} from '../shared/urls.js';

function getTasks(setTasks) {
    fetch(BASE_URL, {
        method: 'GET'
    })
        .then(response => response.json())
        .then(data => {
            setTasks(data);
        })
        .catch((error) => {
            console.error('Error:', error);
            alert("unfortunately we cannot load your task, the service is temporarily down");
        });
}

function Main() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        getTasks(setTasks);
    }, [])

    return (
        <div>
            <Form setTasks={setTasks}></Form>
            <Table tasks={tasks} setTasks={setTasks}></Table>
        </div>
    );
}

export default Main;