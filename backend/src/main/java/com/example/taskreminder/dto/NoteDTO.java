package com.example.taskreminder.dto;

import com.example.taskreminder.entity.NoteStatus;


import java.time.LocalDateTime;

public class NoteDTO {
    private Long id;
    private String title;
    private String description;
    private LocalDateTime reminderTime;
    private NoteStatus status;

    public NoteDTO() {}

    public NoteDTO(Long id, String title, String description, LocalDateTime reminderTime, NoteStatus status) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.reminderTime = reminderTime;
        this.status = status;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public LocalDateTime getReminderTime() { return reminderTime; }
    public void setReminderTime(LocalDateTime reminderTime) { this.reminderTime = reminderTime; }
    public NoteStatus getStatus() { return status; }
    public void setStatus(NoteStatus status) { this.status = status; }
}
