package com.intellihire.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "interview_session")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InterviewSession {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;

    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();

    // 🔥 CORRECT RELATION
    @OneToMany(mappedBy = "session", cascade = CascadeType.ALL)
    private List<Answer> answers;
}