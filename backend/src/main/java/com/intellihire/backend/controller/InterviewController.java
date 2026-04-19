package com.intellihire.backend.controller;

import com.intellihire.backend.entity.QuestionBank;
import com.intellihire.backend.repository.QuestionBankRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/interview")
@RequiredArgsConstructor
public class InterviewController {

    private final QuestionBankRepository questionBankRepository;

    @GetMapping("/start")
    public List<QuestionBank> startInterview() {
        return questionBankRepository.findAll();
    }
}