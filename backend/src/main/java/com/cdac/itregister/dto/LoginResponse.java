package com.cdac.itregister.dto;

import com.cdac.itregister.enums.UserRole;
import com.cdac.itregister.enums.UserStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LoginResponse {

    private Long id;

    private String fullName;

    private String username;

    private String email;

    private String mobileNumber;

    private UserRole role;

    private UserStatus status;
}