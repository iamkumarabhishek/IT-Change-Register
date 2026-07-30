package com.cdac.itregister.service.impl;

import com.cdac.itregister.dto.ApiResponse;
import com.cdac.itregister.repository.LetterRepository;
import com.cdac.itregister.service.ReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ReportServiceImpl implements ReportService {

    private final LetterRepository letterRepository;

    @Override
    public ApiResponse<?> getLetterReport() {

        return ApiResponse.builder()
                .success(true)
                .message("Letter Report")
                .data(letterRepository.findAll())
                .build();
    }



}