package com.example.taller.service;

import com.example.taller.model.Task;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import java.util.Collection;

import static org.junit.jupiter.api.Assertions.*;

public class TodoServiceTest {
    private TodoService todoService;

    @BeforeEach
    void setUp() {
        todoService = new TodoService();
    }

    @Test
    void testAddNewTask() {
        Task task = new Task(null, "Test Task", "desc", false);
        Task added = todoService.addNewTask(task);
        assertNotNull(added.getId());
        assertEquals("Test Task", added.getName());
        assertEquals("desc", added.getDescription());
        assertFalse(added.getCompleted());
        assertTrue(todoService.getAllTasks().contains(added));
    }

    @Test
    void testGetAllTasks() {
        Task task1 = new Task(null, "Task 1", "desc1", false);
        Task task2 = new Task(null, "Task 2", "desc2", false);
        todoService.addNewTask(task1);
        todoService.addNewTask(task2);
        Collection<Task> tasks = todoService.getAllTasks();
        assertEquals(2, tasks.size());

        assertTrue(tasks.contains(task1));
        assertTrue(tasks.contains(task2));
        
    }

    @Test
    void testUpdateTask() {
        Task task = new Task(null, "Original", "desc", false);
        Task added = todoService.addNewTask(task);
        Task updatedTask = new Task(added.getId(), "Updated", "desc", true);
        Task updated = todoService.updateTask(updatedTask);
        assertEquals("Updated", updated.getName());
        assertEquals("desc", updated.getDescription());
        assertTrue(updated.getCompleted());
        assertEquals(added.getId(), updated.getId());
    }

    @Test
    void testRemoveTask() {
        Task task = new Task(null, "To Remove", "desc", false);
        Task added = todoService.addNewTask(task);
        boolean removed = todoService.removeTask(added.getId());
        assertTrue(removed);
        assertFalse(todoService.getAllTasks().contains(added));
    }

    @Test
    void testRemoveTaskNonExistent() {
        boolean removed = todoService.removeTask(999L);
        assertTrue(removed);
    }
}
