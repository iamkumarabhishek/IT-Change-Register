package com.cdac.itregister.service;

import com.cdac.itregister.dto.ApiResponse;
import com.cdac.itregister.dto.UserRegistrationRequest;
import com.cdac.itregister.entity.User;
import com.cdac.itregister.enums.UserStatus;
import com.cdac.itregister.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;

    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public ApiResponse registerUser(UserRegistrationRequest request) {

        if (!request.getPassword().equals(request.getConfirmPassword())) {
            return new ApiResponse(false,
                    "Password and Confirm Password do not match.");
        }

        if (userRepository.existsByUsername(request.getUsername())) {
            return new ApiResponse(false,
                    "Username already exists.");
        }

        if (userRepository.existsByEmail(request.getEmail())) {
            return new ApiResponse(false,
                    "Email already registered.");
        }

        if (userRepository.existsByMobileNumber(request.getMobileNumber())) {
            return new ApiResponse(false,
                    "Mobile number already registered.");
        }

        User user = User.builder()
                .fullName(request.getFullName())
                .username(request.getUsername())
                .email(request.getEmail())
                .mobileNumber(request.getMobileNumber())
                .password(request.getPassword())
                .status(UserStatus.PENDING)
                .emailVerified(false)
                .build();

        userRepository.save(user);

        return new ApiResponse(
                true,
                "Registration request submitted successfully. Please wait for approval."
        );
    }

}
