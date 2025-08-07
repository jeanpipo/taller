package com.example.taller.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Task {
    Long id;
    String name;
    String description;
    Boolean completed;

    @Override
    public String toString() {
        return "{ " +
                "\"id\": " + id + ", " +
                "\"name\": \"" + name + "\", " +
                "\"description\": \"" + description + "\", " +
                "\"completed\": " + completed +
                " } ";
    }
}
