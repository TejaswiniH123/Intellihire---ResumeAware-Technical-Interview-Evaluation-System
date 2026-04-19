package com.intellihire.backend.repository;

import com.intellihire.backend.entity.QuestionBank;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuestionBankRepository extends JpaRepository<QuestionBank, Long> {
    // List<QuestionBank> findByKeywordsIn(List<String> keywords);
}