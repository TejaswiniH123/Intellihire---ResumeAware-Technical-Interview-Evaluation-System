package com.intellihire.backend.controller;

import com.intellihire.backend.service.AnalyticsService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/analytics")
@RequiredArgsConstructor
public class AnalyticsController {

    private final AnalyticsService analyticsService;

    @GetMapping("/performance")
    public List<Map<String, Object>> getPerformance() {
        return analyticsService.getDomainPerformance();
    }

    @GetMapping("/skill-gap")
public Map<String, Object> getSkillGap() {
    return analyticsService.getSkillGapAnalysis();
}
}