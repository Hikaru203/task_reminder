package com.example.taskreminder.service;

import com.example.taskreminder.dto.NoteDTO;
import com.example.taskreminder.entity.Note;
import com.example.taskreminder.entity.NoteStatus;
import com.example.taskreminder.entity.User;
import com.example.taskreminder.repository.NoteRepository;
import com.example.taskreminder.repository.UserRepository;
import com.example.taskreminder.security.services.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class NoteService {

    @Autowired
    private NoteRepository noteRepository;

    @Autowired
    private UserRepository userRepository;

    private User getCurrentUser() {
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return userRepository.findById(userDetails.getId()).orElseThrow(() -> new RuntimeException("User not found"));
    }

    public List<NoteDTO> getAllNotes() {
        User user = getCurrentUser();
        return noteRepository.findByUserId(user.getId()).stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    public NoteDTO createNote(NoteDTO noteDTO) {
        User user = getCurrentUser();
        Note note = new Note();
        note.setTitle(noteDTO.getTitle());
        note.setDescription(noteDTO.getDescription());
        note.setReminderTime(noteDTO.getReminderTime());
        note.setStatus(NoteStatus.PENDING);
        note.setUser(user);

        Note savedNote = noteRepository.save(note);
        return mapToDTO(savedNote);
    }

    public NoteDTO updateNote(Long id, NoteDTO noteDTO) {
        User user = getCurrentUser();
        Note note = noteRepository.findById(id).orElseThrow(() -> new RuntimeException("Note not found"));

        if (!note.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized");
        }

        note.setTitle(noteDTO.getTitle());
        note.setDescription(noteDTO.getDescription());
        note.setReminderTime(noteDTO.getReminderTime());
        if(noteDTO.getStatus() != null) {
            note.setStatus(noteDTO.getStatus());
        }

        Note updatedNote = noteRepository.save(note);
        return mapToDTO(updatedNote);
    }

    public void deleteNote(Long id) {
        User user = getCurrentUser();
        Note note = noteRepository.findById(id).orElseThrow(() -> new RuntimeException("Note not found"));

        if (!note.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized");
        }

        noteRepository.delete(note);
    }

    public NoteDTO getNoteById(Long id) {
        User user = getCurrentUser();
        Note note = noteRepository.findById(id).orElseThrow(() -> new RuntimeException("Note not found"));

        if (!note.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized");
        }

        return mapToDTO(note);
    }

    private NoteDTO mapToDTO(Note note) {
        NoteDTO dto = new NoteDTO();
        dto.setId(note.getId());
        dto.setTitle(note.getTitle());
        dto.setDescription(note.getDescription());
        dto.setReminderTime(note.getReminderTime());
        dto.setStatus(note.getStatus());
        return dto;
    }
}
