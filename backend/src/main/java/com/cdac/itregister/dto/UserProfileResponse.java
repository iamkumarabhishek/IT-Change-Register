package com.cdac.itregister.dto;

import com.cdac.itregister.enums.UserRole;
import com.cdac.itregister.enums.UserStatus;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class UserProfileResponse {

    private Long id;

    private String fullName;

    private String username;

    private String email;

    private String mobileNumber;

    private UserRole role;

    private UserStatus status;

    private LocalDateTime createdAt;

    private String createdBy;

    private LocalDateTime approvedAt;

    private String approvedBy;

    private boolean emailVerified;

}