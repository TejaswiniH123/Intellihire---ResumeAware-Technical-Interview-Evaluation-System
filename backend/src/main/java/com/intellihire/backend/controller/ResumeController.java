package com.intellihire.backend.controller;

import com.intellihire.backend.entity.Resume;
import com.intellihire.backend.service.ResumeService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/resume")
@RequiredArgsConstructor
public class ResumeController {

    private final ResumeService resumeService;

    @PostMapping("/upload")
    public Resume uploadResume(
            @RequestParam Long userId,
            @RequestParam("file") MultipartFile file
    ) {
        return resumeService.uploadResume(userId, file);
    }
}