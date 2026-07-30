package com.cdac.itregister.service.impl;

import com.cdac.itregister.dto.ApiResponse;
import com.cdac.itregister.dto.LetterRequest;
import com.cdac.itregister.entity.Letter;
import com.cdac.itregister.repository.LetterRepository;
import com.cdac.itregister.service.LetterService;
import com.lowagie.text.Font;
import java.awt.Color;
import lombok.RequiredArgsConstructor;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import com.lowagie.text.Image;
import java.net.URL;
import java.time.LocalDateTime;

import com.lowagie.text.*;
import com.lowagie.text.pdf.*;

import java.io.ByteArrayOutputStream;
import java.time.format.DateTimeFormatter;
import java.util.List;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class LetterServiceImpl implements LetterService {

    private final LetterRepository letterRepository;

    @Value("${file.upload-dir}")
    private String uploadDir;

    @Override
    public ApiResponse<?> saveLetter(
            LetterRequest request,
            String uploadedBy
    ) {

        try {

            String fileName = "";

            if (request.getAttachment() != null &&
                    !request.getAttachment().isEmpty()) {

                Path uploadPath = Paths.get(uploadDir);

                if (!Files.exists(uploadPath)) {
                    Files.createDirectories(uploadPath);
                }

                fileName = request.getAttachment().getOriginalFilename();

                Path destination = uploadPath.resolve(fileName);

                if (Files.exists(destination)) {

                    return ApiResponse.builder()
                            .success(false)
                            .message("File already exists.")
                            .build();

                }

                Files.copy(
                        request.getAttachment().getInputStream(),
                        destination
                );

            }

            Letter letter = Letter.builder()

                    .letterNumber(request.getLetterNumber())

                    .letterDate(LocalDate.parse(request.getLetterDate()))

                    .departmentName(request.getDepartmentName())

                    .subject(request.getSubject())

                    .description(request.getDescription())

                    .remarks(request.getRemarks())

                    .attachment(fileName)

                    .uploadedBy(uploadedBy)

                    .build();

            letterRepository.save(letter);

            return ApiResponse.builder()

                    .success(true)

                    .message("Letter Saved Successfully.")

                    .data(letter)

                    .build();

        }

        catch (IOException exception) {

            return ApiResponse.builder()

                    .success(false)

                    .message("Unable to upload attachment.")

                    .build();

        }

        catch (Exception exception) {

            return ApiResponse.builder()

                    .success(false)

                    .message(exception.getMessage())

                    .build();

        }

    }

    @Override
    public ApiResponse<?> getAllLetters() {

        return ApiResponse.builder()
                .success(true)
                .message("Letters fetched successfully.")
                .data(
                        letterRepository.findAll()
                )
                .build();

    }

    @Override
    public byte[] downloadPdfReport() throws Exception {

        List<Letter> letters = letterRepository.findAll();

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();

        Document document = new Document(PageSize.A4.rotate());

        PdfWriter.getInstance(document, outputStream);

        document.open();

        Font titleFont = new Font(
                Font.HELVETICA,
                18,
                Font.BOLD
        );

        Font headingFont = new Font(
                Font.HELVETICA,
                12,
                Font.BOLD
        );

        Font bodyFont = new Font(
                Font.HELVETICA,
                10
        );

        Paragraph title = new Paragraph(
                "C-DAC IGIMS Correspondence Management System",
                titleFont
        );

        title.setAlignment(Element.ALIGN_CENTER);

        document.add(title);

        Paragraph subTitle = new Paragraph(
                "Letter Register Report",
                headingFont
        );

        subTitle.setAlignment(Element.ALIGN_CENTER);

        subTitle.setSpacingAfter(20);

        document.add(subTitle);

        Paragraph generatedOn = new Paragraph(

                "Generated On : " +

                        LocalDate.now().format(

                                DateTimeFormatter.ofPattern("dd/MM/yyyy")

                        ),

                bodyFont

        );

        generatedOn.setSpacingAfter(15);

        document.add(generatedOn);

        PdfPTable table = new PdfPTable(6);

        table.setWidthPercentage(100);

        table.setWidths(new float[]{1f, 2f, 2f, 3f, 5f, 2f});

        addCell(table, "S.No.", headingFont);

        addCell(table, "Letter No.", headingFont);

        addCell(table, "Date", headingFont);

        addCell(table, "Department", headingFont);

        addCell(table, "Subject", headingFont);

        addCell(table, "Uploaded By", headingFont);

        int serial = 1;

        for (Letter letter : letters) {

            addCell(table, String.valueOf(serial++), bodyFont);

            addCell(table, letter.getLetterNumber(), bodyFont);

            addCell(
                    table,
                    letter.getLetterDate().format(
                            DateTimeFormatter.ofPattern("dd/MM/yyyy")
                    ),
                    bodyFont
            );

            addCell(table, letter.getDepartmentName(), bodyFont);

            addCell(table, letter.getSubject(), bodyFont);

            addCell(table, letter.getUploadedBy(), bodyFont);

        }

        document.add(table);

        document.close();

        return outputStream.toByteArray();

    }

    @Override
    public byte[] downloadExcelReport() throws Exception {
        List<Letter> letters = letterRepository.findAll();

        Workbook workbook = new XSSFWorkbook();

        Sheet sheet = workbook.createSheet("Letter Register Report");

        org.apache.poi.ss.usermodel.Font headerFont =
                workbook.createFont();
        headerFont.setBold(true);

        CellStyle headerStyle = workbook.createCellStyle();
        headerStyle.setFont(headerFont);

        Row headerRow = sheet.createRow(0);

        String[] headers = {
                "S.No.",
                "Letter No.",
                "Date",
                "Department",
                "Subject",
                "Description",
                "Uploaded By"
        };

        for (int i = 0; i < headers.length; i++) {

            Cell cell = headerRow.createCell(i);

            cell.setCellValue(headers[i]);

            cell.setCellStyle(headerStyle);

        }

        int rowNumber = 1;

        int serial = 1;

        DateTimeFormatter formatter =
                DateTimeFormatter.ofPattern("dd/MM/yyyy");

        for (Letter letter : letters) {

            Row row = sheet.createRow(rowNumber++);

            row.createCell(0).setCellValue(serial++);

            row.createCell(1).setCellValue(letter.getLetterNumber());

            row.createCell(2).setCellValue(
                    letter.getLetterDate().format(formatter)
            );

            row.createCell(3).setCellValue(letter.getDepartmentName());

            row.createCell(4).setCellValue(letter.getSubject());

            row.createCell(5).setCellValue(letter.getDescription());

            row.createCell(6).setCellValue(letter.getUploadedBy());

        }

        for (int i = 0; i < headers.length; i++) {

            sheet.autoSizeColumn(i);

        }

        ByteArrayOutputStream outputStream =
                new ByteArrayOutputStream();

        workbook.write(outputStream);

        workbook.close();

        return outputStream.toByteArray();

    }

    private void addCell(
            PdfPTable table,
            String text,
            Font font
    ) {

        PdfPCell cell = new PdfPCell(
                new Phrase(text, font)
        );

        cell.setPadding(6);

        table.addCell(cell);

    }


}