package com.cdac.itregister.controller;

import com.cdac.itregister.dto.ApiResponse;
import com.cdac.itregister.dto.LetterRequest;
import com.cdac.itregister.service.LetterService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpHeaders;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/api/letters")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")

public class LetterController {

    private final LetterService letterService;
    @Value("${file.upload-dir}")
    private String uploadDir;

    @PostMapping(
            value = "/save",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public ResponseEntity<ApiResponse<?>> saveLetter(

            @RequestParam("letterNumber") String letterNumber,

            @RequestParam("letterDate") String letterDate,

            @RequestParam("departmentName") String departmentName,

            @RequestParam("subject") String subject,

            @RequestParam("description") String description,

            @RequestParam("remarks") String remarks,

            @RequestParam("attachment") MultipartFile attachment,

            @RequestParam("uploadedBy") String uploadedBy
    ) {
        System.out.println("========== SAVE LETTER API HIT ==========");
        LetterRequest request = new LetterRequest();

        request.setLetterNumber(letterNumber);
        request.setLetterDate(letterDate);
        request.setDepartmentName(departmentName);
        request.setSubject(subject);
        request.setDescription(description);
        request.setRemarks(remarks);
        request.setAttachment(attachment);

        ApiResponse<?> response = letterService.saveLetter(
                request,
                uploadedBy
        );

        if (response.isSuccess()) {
            return ResponseEntity.ok(response);
        }

        return ResponseEntity.badRequest().body(response);
    }

    @GetMapping
    public ResponseEntity<ApiResponse<?>> getAllLetters() {

        return ResponseEntity.ok(
                letterService.getAllLetters()
        );

    }

    @GetMapping("/download/{fileName}")
    public ResponseEntity<Resource> downloadFile(
            @PathVariable String fileName) throws IOException {

        System.out.println("========== DOWNLOAD API HIT ==========");

        Path path = Paths.get(uploadDir).resolve(fileName);
        System.out.println("Looking for file: " + path.toAbsolutePath());
        Resource resource = new UrlResource(path.toUri());

        if (!resource.exists()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok()
                .header(
                        HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=\"" + resource.getFilename() + "\""
                )
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(resource);
    }

    @GetMapping("/view/{fileName:.+}")
    public ResponseEntity<Resource> viewFile(
            @PathVariable String fileName) throws IOException {

        Path path = Paths.get(uploadDir).resolve(fileName);

        Resource resource = new UrlResource(path.toUri());

        if (!resource.exists()) {
            return ResponseEntity.notFound().build();
        }

        String contentType = Files.probeContentType(path);

        if (contentType == null) {
            contentType = "application/octet-stream";
        }

        return ResponseEntity.ok()
                .header(
                        HttpHeaders.CONTENT_DISPOSITION,
                        "inline; filename=\"" + resource.getFilename() + "\""
                )
                .contentType(MediaType.parseMediaType(contentType))
                .body(resource);
    }

    @GetMapping("/report/pdf")
    public ResponseEntity<byte[]> downloadPdfReport() {

        try {

            byte[] pdf = letterService.downloadPdfReport();

            return ResponseEntity.ok()

                    .header(
                            HttpHeaders.CONTENT_DISPOSITION,
                            "attachment; filename=Letter_Register_Report.pdf"
                    )

                    .header(
                            HttpHeaders.CONTENT_TYPE,
                            "application/pdf"
                    )

                    .body(pdf);

        }

        catch (Exception exception) {

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)

                    .body(null);

        }

    }

    @GetMapping("/report/excel")
    public ResponseEntity<byte[]> downloadExcelReport() {

        try {

            byte[] excel = letterService.downloadExcelReport();

            return ResponseEntity.ok()

                    .header(
                            HttpHeaders.CONTENT_DISPOSITION,
                            "attachment; filename=Letter_Register_Report.xlsx"
                    )

                    .header(
                            HttpHeaders.CONTENT_TYPE,
                            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                    )

                    .body(excel);

        }

        catch (Exception exception) {

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)

                    .body(null);

        }

    }
}