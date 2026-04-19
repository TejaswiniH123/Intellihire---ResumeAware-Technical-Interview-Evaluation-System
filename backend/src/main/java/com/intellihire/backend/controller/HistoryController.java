package com.intellihire.backend.controller;

import com.intellihire.backend.entity.InterviewSession;
import com.intellihire.backend.entity.Answer;
import com.intellihire.backend.repository.InterviewSessionRepository;
import com.intellihire.backend.repository.AnswerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/history")
@RequiredArgsConstructor
public class HistoryController {

    private final InterviewSessionRepository sessionRepository;
    private final AnswerRepository answerRepository;

    // 🔥 GET ALL SESSIONS
    @GetMapping("/sessions")
    public List<Map<String, Object>> getSessions() {

        List<InterviewSession> sessions = sessionRepository.findAll();

        List<Map<String, Object>> result = new ArrayList<>();

        for (InterviewSession s : sessions) {

            List<Answer> answers = answerRepository.findAll()
                    .stream()
                    .filter(a -> a.getSession().getId().equals(s.getId()))
                    .toList();

            double avg = answers.stream()
                    .mapToDouble(Answer::getFinalScore)
                    .average()
                    .orElse(0);

            result.add(Map.of(
                    "sessionId", s.getId(),
                    "createdAt", s.getCreatedAt(),
                    "avgScore", avg
            ));
        }

        return result;
    }

    // 🔥 GET SESSION DETAILS
    @GetMapping("/session/{id}")
    public List<Answer> getSessionDetails(@PathVariable Long id) {

        return answerRepository.findAll()
                .stream()
                .filter(a -> a.getSession().getId().equals(id))
                .toList();
    }
}