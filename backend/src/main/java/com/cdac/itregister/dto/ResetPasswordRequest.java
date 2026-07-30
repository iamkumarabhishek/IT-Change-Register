package com.cdac.itregister.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class ResetPasswordRequest {

    @NotBlank(message = "Username is required")
    private String username;

    @NotBlank(message = "New Password is required")
    @Size(min = 6, max = 20)
    private String newPassword;

    @NotBlank(message = "Confirm Password is required")
    private String confirmPassword;

}