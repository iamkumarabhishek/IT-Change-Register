package com.cdac.itregister.controller;

import com.cdac.itregister.dto.ApiResponse;
import com.cdac.itregister.service.ReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/reports")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ReportController {

    private final ReportService reportService;

    @GetMapping("/letters")
    public ResponseEntity<ApiResponse<?>> getLetterReport() {

        return ResponseEntity.ok(
                reportService.getLetterReport()
        );

    }



}