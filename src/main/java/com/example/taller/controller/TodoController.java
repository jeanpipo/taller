package com.example.taller.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.taller.model.Task;
import com.example.taller.service.TodoService;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping(path = "api/v1/todo")
public class TodoController {
    @Autowired
    TodoService todoService;
    
    @GetMapping
    public ResponseEntity<Collection<Task>> getTask() {
        return ResponseEntity.ok().body(todoService.getAllTasks());
    }

    @PostMapping
    public ResponseEntity<Task> saveTask(@RequestBody Task task) {
        Task result = todoService.addNewTask(task);
        return ResponseEntity.ok().body(result);
    }

    @PutMapping
    public ResponseEntity<Task> updateTask(@RequestBody Task task) {
        Task result = todoService.updateTask(task);
        return ResponseEntity.ok().body(result);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable("id") Long id) {
        todoService.removeTask(id);
        return ResponseEntity.ok().build();
    }

}