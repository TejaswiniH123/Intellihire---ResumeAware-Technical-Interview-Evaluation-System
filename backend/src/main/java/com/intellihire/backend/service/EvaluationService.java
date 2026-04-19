package com.intellihire.backend.service;

import com.intellihire.backend.entity.Answer;
import com.intellihire.backend.entity.InterviewSession;
import com.intellihire.backend.repository.AnswerRepository;
import com.intellihire.backend.repository.InterviewSessionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class EvaluationService {

    private final AnswerRepository answerRepository;
    private final InterviewSessionRepository sessionRepository;

    public Map<String, Object> evaluate(String answer, String keywords, Long sessionId) {

        // 🔥 SESSION HANDLING
        InterviewSession session;

        if (sessionId != null) {
            session = sessionRepository.findById(sessionId).orElse(null);
        } else {
            session = sessionRepository.save(new InterviewSession());
        }

        // 🔥 KEYWORD SCORING
        String[] keywordList = keywords.split(",");
        int keywordMatch = 0;

        for (String k : keywordList) {
            if (answer.toLowerCase().contains(k.trim().toLowerCase())) {
                keywordMatch++;
            }
        }

        int keywordScore = (keywordMatch * 100) / keywordList.length;

        // 🔥 LENGTH SCORE
        int lengthScore = Math.min(answer.length() / 10, 100);

        // 🔥 STRUCTURE SCORE
        int structureScore = answer.contains(".") ? 70 : 40;

        // 🔥 FINAL SCORE
        int finalScore =
                (int)(keywordScore * 0.5 +
                      lengthScore * 0.2 +
                      structureScore * 0.2);

        // 🔥 SAVE TO DB
        Answer ans = Answer.builder()
    .answerText(answer)
    .finalScore((double) finalScore)
    .keywordScore((double) keywordScore)
    .lengthScore((double) lengthScore)
    .structureScore((double) structureScore)
    .session(session)              // ✅ MUST
    .question(question)            // ✅ MUST (if available)
    .evaluationType("WRITTEN")
    .build();

        answerRepository.save(ans);

        // 🔥 RESPONSE
        Map<String, Object> result = new HashMap<>();
        result.put("finalScore", finalScore);
        result.put("keywordScore", keywordScore);
        result.put("lengthScore", lengthScore);
        result.put("structureScore", structureScore);
        result.put("sessionId", session.getId());

        return result;
    }
}