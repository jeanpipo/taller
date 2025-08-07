package com.example.taller.service;

import java.util.Collection;
import java.util.Hashtable;
import java.util.Map;
import java.util.concurrent.atomic.AtomicLong;

import org.springframework.stereotype.Service;

import com.example.taller.model.Task;

@Service
public class TodoService {
    Map<Long, Task> tasks = new Hashtable<>();
    AtomicLong lastId = new AtomicLong(1);

    public Collection<Task> getAllTasks() {
        return tasks.values();
    }

    public Task addNewTask(Task task) {
        task.setId(lastId.getAndIncrement());
        this.tasks.put(task.getId(), task);
        return task;
    }

    public Task updateTask(Task task) {
        this.tasks.replace(task.getId(), task);
        return task;
    }

    public boolean removeTask(Long id) {
        this.tasks.remove(id);
        // if task does not exist we also return null bc it does not exist
        return true;
    }

}
