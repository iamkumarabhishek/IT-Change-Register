package com.cdac.itregister.service;

import com.cdac.itregister.dto.ApiResponse;
import com.cdac.itregister.dto.LetterRequest;

public interface LetterService {

    ApiResponse<?> saveLetter(
            LetterRequest request,
            String uploadedBy
    );
    ApiResponse<?> getAllLetters();

    byte[] downloadPdfReport() throws Exception;
    byte[] downloadExcelReport() throws Exception;
}