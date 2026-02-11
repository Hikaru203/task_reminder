package com.example.taskreminder.scheduler;

import com.example.taskreminder.entity.Note;
import com.example.taskreminder.entity.NoteStatus;
import com.example.taskreminder.repository.NoteRepository;
import com.example.taskreminder.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Component
public class NoteScheduler {

    @Autowired
    private NoteRepository noteRepository;

    @Autowired
    private EmailService emailService;

    // Run every minute
    @Scheduled(cron = "0 * * * * ?")
    @Transactional
    public void checkAndSendReminders() {
        LocalDateTime now = LocalDateTime.now();
        List<Note> dueNotes = noteRepository.findByStatusAndReminderTimeBeforeAndReminderSentFalse(NoteStatus.PENDING, now);

        for (Note note : dueNotes) {
            try {
                String subject = "Reminder: " + note.getTitle();
                String text = "Hi " + note.getUser().getUsername() + ",\n\n" +
                        "This is a reminder for your task: " + note.getTitle() + "\n\n" +
                        "Description: " + note.getDescription() + "\n" +
                        "Due: " + note.getReminderTime();

                emailService.sendSimpleMessage(note.getUser().getEmail(), subject, text);

                note.setReminderSent(true);
                noteRepository.save(note);
            } catch (Exception e) {
                System.err.println("Failed to send email for note " + note.getId() + ": " + e.getMessage());
            }
        }
    }
}
