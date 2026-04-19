package com.intellihire.backend.controller;

import com.intellihire.backend.service.EvaluationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class EvaluationController {

    private final EvaluationService evaluationService;

    @PostMapping("/evaluate")
    public Map<String, Object> evaluateAnswer(
            @RequestParam String answer,
            @RequestParam String keywords,
            @RequestParam(required = false) Long sessionId
    ) {
        return evaluationService.evaluate(answer, keywords, sessionId);
    }
}