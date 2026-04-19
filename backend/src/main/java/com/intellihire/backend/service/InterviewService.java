package com.intellihire.backend.service;

import com.intellihire.backend.entity.QuestionBank;
import com.intellihire.backend.entity.Skill;
import com.intellihire.backend.entity.InterviewSession;
import com.intellihire.backend.repository.QuestionBankRepository;
import com.intellihire.backend.repository.SkillRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class InterviewService {

    private final SkillRepository skillRepository;
    private final QuestionBankRepository questionBankRepository;

    public List<QuestionBank> generateQuestions(Long userId) {

        List<Skill> skills = skillRepository.findAll();

        List<String> skillNames = skills.stream()
                .map(Skill::getSkillName)
                .collect(Collectors.toList());

        List<QuestionBank> questions = questionBankRepository.findAll();
        Collections.shuffle(questions);

        return questions.stream().limit(5).collect(Collectors.toList());
    }
}