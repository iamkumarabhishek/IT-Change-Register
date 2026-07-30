package com.cdac.itregister.dto;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
public class LetterRequest {

    private String letterNumber;

    private String letterDate;

    private String departmentName;

    private String subject;

    private String description;

    private String remarks;

    private MultipartFile attachment;

}