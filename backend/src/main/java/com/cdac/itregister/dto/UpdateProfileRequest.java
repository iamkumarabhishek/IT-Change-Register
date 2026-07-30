package com.cdac.itregister.dto;

import lombok.Data;

@Data
public class UpdateProfileRequest {

    private Long id;

    private String fullName;

    private String email;

    private String mobileNumber;

}