package com.cdac.itregister.dto;

import com.cdac.itregister.enums.UserStatus;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PendingUserResponse {

    private Long id;

    private String fullName;

    private String username;

    private String email;

    private String mobileNumber;

    private UserStatus status;

}