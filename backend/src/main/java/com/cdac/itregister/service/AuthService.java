package com.cdac.itregister.service;

import com.cdac.itregister.dto.ApiResponse;
import com.cdac.itregister.dto.UserRegistrationRequest;
import com.cdac.itregister.entity.User;
import com.cdac.itregister.enums.UserRole;
import com.cdac.itregister.enums.UserStatus;
import com.cdac.itregister.repository.UserRepository;
import org.springframework.stereotype.Service;
import com.cdac.itregister.dto.LoginRequest;
import com.cdac.itregister.dto.LoginResponse;
import java.util.Optional;

@Service
public class AuthService {

    private final UserRepository userRepository;

    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public ApiResponse<Object> registerUser(UserRegistrationRequest request) {

        // Password confirmation
        if (!request.getPassword().equals(request.getConfirmPassword())) {
            return ApiResponse.<Object>builder()
                    .success(false)
                    .message("Password and Confirm Password do not match.")
                    .build();
        }

        // Username validation
        if (userRepository.existsByUsername(request.getUsername())) {
            return ApiResponse.<Object>builder()
                    .success(false)
                    .message("Username already exists.")
                    .build();
        }

        // Email validation
        if (userRepository.existsByEmail(request.getEmail())) {
            return ApiResponse.<Object>builder()
                    .success(false)
                    .message("Email already registered.")
                    .build();
        }

        // Mobile validation
        if (userRepository.existsByMobileNumber(request.getMobileNumber())) {
            return ApiResponse.<Object>builder()
                    .success(false)
                    .message("Mobile number already registered.")
                    .build();
        }

        // Create user
        User user = User.builder()
                .fullName(request.getFullName())
                .username(request.getUsername())
                .email(request.getEmail())
                .mobileNumber(request.getMobileNumber())
                .password(request.getPassword())   // BCrypt in next phase
                .status(UserStatus.PENDING)
                .role(UserRole.IT_STAFF)
                .emailVerified(false)
                .build();

        userRepository.save(user);

        return ApiResponse.<Object>builder()
                .success(true)
                .message("Registration request submitted successfully. Please wait for approval.")
                .data(null)
                .build();
    }

    public ApiResponse<LoginResponse> login(LoginRequest request) {

        Optional<User> optionalUser = userRepository.findByUsername(request.getUsername());

        if (optionalUser.isEmpty()) {
            return ApiResponse.<LoginResponse>builder()
                    .success(false)
                    .message("Invalid username or password.")
                    .build();
        }

        User user = optionalUser.get();

        // Password validation
        if (!user.getPassword().equals(request.getPassword())) {
            return ApiResponse.<LoginResponse>builder()
                    .success(false)
                    .message("Invalid username or password.")
                    .build();
        }

        // Account approval check
        if (user.getStatus() == UserStatus.PENDING) {
            return ApiResponse.<LoginResponse>builder()
                    .success(false)
                    .message("Your account is awaiting administrator approval.")
                    .build();
        }

        // Inactive account check
        if (user.getStatus() != UserStatus.ACTIVE) {
            return ApiResponse.<LoginResponse>builder()
                    .success(false)
                    .message("Your account is inactive.")
                    .build();
        }

        LoginResponse response = LoginResponse.builder()
                .id(user.getId())
                .fullName(user.getFullName())
                .username(user.getUsername())
                .email(user.getEmail())
                .mobileNumber(user.getMobileNumber())
                .role(user.getRole())
                .status(user.getStatus())
                .build();

        return ApiResponse.<LoginResponse>builder()
                .success(true)
                .message("Login successful.")
                .data(response)
                .build();
    }
}