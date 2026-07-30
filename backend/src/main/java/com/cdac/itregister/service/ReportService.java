package com.cdac.itregister.service;

import com.cdac.itregister.dto.ApiResponse;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.ResponseEntity;

public interface ReportService {

    ApiResponse<?> getLetterReport();



}