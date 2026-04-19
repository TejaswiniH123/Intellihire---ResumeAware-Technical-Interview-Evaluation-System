package com.intellihire.backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "resume")
@Getter
@Setter
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Resume {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fileName;

    @Lob
    @Column(columnDefinition = "LONGTEXT")
    private String extractedText;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}