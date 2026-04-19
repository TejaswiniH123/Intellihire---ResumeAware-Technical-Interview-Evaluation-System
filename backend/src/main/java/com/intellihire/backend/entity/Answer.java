package com.intellihire.backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "answers")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Answer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 🔥 SESSION RELATION
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "session_id")
    private InterviewSession session;

    // 🔥 QUESTION RELATION (VERY IMPORTANT)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "question_id")
    private QuestionBank question;

    @Column(columnDefinition = "TEXT")
    private String answerText;

    private double keywordScore;
    private double lengthScore;
    private double structureScore;
    private double finalScore;

    // 🔥 ORAL FIELDS
    private String transcript;
    private double speakingSpeed;   // WPM
    private double confidenceScore;
    private double oralScore;

    private int fillerCount;

    // ORAL / WRITTEN
    private String evaluationType;
}