package com.intellihire.backend.service;

import com.intellihire.backend.entity.Answer;
import com.intellihire.backend.repository.AnswerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class AnalyticsService {

    private final AnswerRepository answerRepository;

    // ==============================
    // COMMON HELPER METHODS
    // ==============================

    private String extractDomain(Answer a) {
        if (a.getQuestion() == null || a.getQuestion().getDomain() == null) {
            return null;
        }
        return a.getQuestion().getDomain();
    }

    private double extractScore(Answer a) {
        if ("ORAL".equalsIgnoreCase(a.getEvaluationType())) {
            return a.getOralScore();
        }
        return a.getFinalScore();
    }

    private Map<String, List<Double>> groupByDomain(List<Answer> answers) {

        Map<String, List<Double>> domainScores = new HashMap<>();

        for (Answer a : answers) {

            String domain = extractDomain(a);
            if (domain == null) continue;

            double score = extractScore(a);

            domainScores
                    .computeIfAbsent(domain, k -> new ArrayList<>())
                    .add(score);
        }

        return domainScores;
    }

    private double calculateAverage(List<Double> scores) {
        return scores.stream()
                .mapToDouble(Double::doubleValue)
                .average()
                .orElse(0);
    }

    // ==============================
    // DOMAIN PERFORMANCE API
    // ==============================

    public List<Map<String, Object>> getDomainPerformance() {

        List<Answer> answers = answerRepository.findAll();

        Map<String, List<Double>> domainScores = groupByDomain(answers);

        List<Map<String, Object>> result = new ArrayList<>();

        for (Map.Entry<String, List<Double>> entry : domainScores.entrySet()) {

            double avg = calculateAverage(entry.getValue());

            result.add(Map.of(
                    "name", entry.getKey(),
                    "score", avg
            ));
        }

        return result;
    }

    // ==============================
    // SKILL GAP ANALYSIS API
    // ==============================

    public Map<String, Object> getSkillGapAnalysis() {

        List<Answer> answers = answerRepository.findAll();

        Map<String, List<Double>> domainScores = groupByDomain(answers);

        Map<String, Double> avgScores = new HashMap<>();

        String weakestDomain = null;
        double minScore = Double.MAX_VALUE;

        for (Map.Entry<String, List<Double>> entry : domainScores.entrySet()) {

            double avg = calculateAverage(entry.getValue());

            avgScores.put(entry.getKey(), avg);

            if (avg < minScore) {
                minScore = avg;
                weakestDomain = entry.getKey();
            }
        }

        String recommendation = generateRecommendation(weakestDomain);

        Map<String, Object> result = new HashMap<>();
        result.put("weakestDomain", weakestDomain);
        result.put("averageScores", avgScores);
        result.put("recommendation", recommendation);

        return result;
    }

    // ==============================
    // RECOMMENDATION ENGINE
    // ==============================

    private String generateRecommendation(String domain) {

        if (domain == null) return "No data available";

        switch (domain.toUpperCase()) {

            case "DSA":
                return "Practice Arrays, Recursion, solve 20 LeetCode problems";

            case "CORE":
                return "Revise OS concepts, DBMS normalization";

            case "BACKEND":
                return "Improve REST API design and Spring Security";

            case "FRONTEND":
                return "Focus on React Hooks and State Management";

            default:
                return "Work on improving overall fundamentals";
        }
    }
}