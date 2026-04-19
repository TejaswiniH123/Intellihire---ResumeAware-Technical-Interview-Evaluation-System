package com.intellihire.backend.service;

import com.intellihire.backend.entity.Resume;
import com.intellihire.backend.entity.User;
import com.intellihire.backend.repository.ResumeRepository;
import com.intellihire.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class ResumeService {

    private final ResumeRepository resumeRepository;
    private final UserRepository userRepository;
    private final SkillService skillService;

    public Resume uploadResume(Long userId, MultipartFile file) {

        try {
            PDDocument document = PDDocument.load(file.getInputStream());
            PDFTextStripper pdfStripper = new PDFTextStripper();
            String text = pdfStripper.getText(document);
            document.close();

            // Normalize text
            text = text.toLowerCase().replaceAll("[^a-zA-Z0-9 ]", " ");

            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            Resume resume = Resume.builder()
                    .fileName(file.getOriginalFilename())
                    .extractedText(text)
                    .user(user)
                    .build();

            Resume savedResume = resumeRepository.save(resume);
            skillService.detectSkills(text, user);
            return savedResume;             


        } catch (Exception e) {
            throw new RuntimeException("Error processing PDF");
        }
    }
}