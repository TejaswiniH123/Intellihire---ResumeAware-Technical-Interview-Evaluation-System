package com.intellihire.backend.service;

import com.intellihire.backend.entity.Skill;
import com.intellihire.backend.entity.User;
import com.intellihire.backend.repository.SkillRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class SkillService {

    private final SkillRepository skillRepository;

    // MASTER SKILL MAP
    private static final Map<String, List<String>> SKILL_MAP = new HashMap<>();

    static {
        SKILL_MAP.put("DSA", Arrays.asList("array", "recursion", "tree", "graph", "stack", "queue"));
        SKILL_MAP.put("CORE", Arrays.asList("os", "dbms", "deadlock", "normalization", "cpu scheduling"));
        SKILL_MAP.put("BACKEND", Arrays.asList("spring", "spring boot", "rest api", "jpa", "hibernate"));
        SKILL_MAP.put("FRONTEND", Arrays.asList("react", "javascript", "html", "css", "hooks"));
    }

    public List<Skill> detectSkills(String resumeText, User user) {

        List<Skill> detectedSkills = new ArrayList<>();

        for (String domain : SKILL_MAP.keySet()) {

            for (String keyword : SKILL_MAP.get(domain)) {

                if (resumeText.contains(keyword)) {

                    Skill skill = Skill.builder()
                            .skillName(keyword)
                            .domain(domain)
                            .user(user)
                            .build();

                    detectedSkills.add(skill);
                }
            }
        }

        return skillRepository.saveAll(detectedSkills);
    }
}