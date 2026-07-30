package com.cdac.itregister.repository;

import com.cdac.itregister.entity.Letter;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LetterRepository extends JpaRepository<Letter, Long> {

    Optional<Letter> findByLetterNumber(String letterNumber);

    boolean existsByLetterNumber(String letterNumber);

}