package com.example.taskreminder.repository;

import com.example.taskreminder.entity.Note;
import com.example.taskreminder.entity.NoteStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface NoteRepository extends JpaRepository<Note, Long> {
    List<Note> findByUserId(Long userId);
    
    // For scheduler to find pending notes that need reminding and haven't been sent yet
    List<Note> findByStatusAndReminderTimeBeforeAndReminderSentFalse(NoteStatus status, LocalDateTime dateTime);
}
