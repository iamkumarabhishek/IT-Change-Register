package com.cdac.itregister.service;

import com.cdac.itregister.dto.*;
import com.cdac.itregister.entity.User;
import com.cdac.itregister.enums.UserRole;
import com.cdac.itregister.enums.UserStatus;
import com.cdac.itregister.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class AuthService {

    private final UserRepository userRepository;

    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // =========================
    // REGISTER USER
    // =========================
    public ApiResponse<Object> registerUser(UserRegistrationRequest request) {

        if (!request.getPassword().equals(request.getConfirmPassword())) {
            return ApiResponse.<Object>builder()
                    .success(false)
                    .message("Password and Confirm Password do not match.")
                    .build();
        }

        if (userRepository.existsByUsername(request.getUsername())) {
            return ApiResponse.<Object>builder()
                    .success(false)
                    .message("Username already exists.")
                    .build();
        }

        if (userRepository.existsByEmail(request.getEmail())) {
            return ApiResponse.<Object>builder()
                    .success(false)
                    .message("Email already registered.")
                    .build();
        }

        if (userRepository.existsByMobileNumber(request.getMobileNumber())) {
            return ApiResponse.<Object>builder()
                    .success(false)
                    .message("Mobile number already registered.")
                    .build();
        }

        User user = User.builder()
                .fullName(request.getFullName())
                .username(request.getUsername())
                .email(request.getEmail())
                .mobileNumber(request.getMobileNumber())
                .password(request.getPassword())
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

    // =========================
    // LOGIN
    // =========================
    public ApiResponse<LoginResponse> login(LoginRequest request) {

        Optional<User> optionalUser = userRepository.findByUsername(request.getUsername());

        if (optionalUser.isEmpty()) {
            return ApiResponse.<LoginResponse>builder()
                    .success(false)
                    .message("Invalid username or password.")
                    .build();
        }

        User user = optionalUser.get();

        if (!user.getPassword().equals(request.getPassword())) {
            return ApiResponse.<LoginResponse>builder()
                    .success(false)
                    .message("Invalid username or password.")
                    .build();
        }

        if (user.getStatus() == UserStatus.PENDING) {
            return ApiResponse.<LoginResponse>builder()
                    .success(false)
                    .message("Your account is awaiting administrator approval.")
                    .build();
        }

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

    // =========================
    // CHANGE PASSWORD
    // =========================
    public ApiResponse<Object> changePassword(ChangePasswordRequest request) {

        Optional<User> optionalUser = userRepository.findByUsername(request.getUsername());

        if (optionalUser.isEmpty()) {
            return ApiResponse.<Object>builder()
                    .success(false)
                    .message("User not found.")
                    .build();
        }

        User user = optionalUser.get();

        if (!user.getPassword().equals(request.getOldPassword())) {
            return ApiResponse.<Object>builder()
                    .success(false)
                    .message("Old password is incorrect.")
                    .build();
        }

        if (!request.getNewPassword().equals(request.getConfirmPassword())) {
            return ApiResponse.<Object>builder()
                    .success(false)
                    .message("New Password and Confirm Password do not match.")
                    .build();
        }

        if (request.getOldPassword().equals(request.getNewPassword())) {
            return ApiResponse.<Object>builder()
                    .success(false)
                    .message("New password must be different from old password.")
                    .build();
        }

        user.setPassword(request.getNewPassword());
        user.setUpdatedAt(LocalDateTime.now());

        userRepository.save(user);

        return ApiResponse.<Object>builder()
                .success(true)
                .message("Password changed successfully.")
                .build();
    }

    // =========================
    // FORGOT PASSWORD
    // =========================
    public ApiResponse<Object> forgotPassword(ForgotPasswordRequest request) {

        Optional<User> optionalUser = userRepository.findByUsername(request.getUsername());

        if (optionalUser.isEmpty()) {
            return ApiResponse.<Object>builder()
                    .success(false)
                    .message("User not found.")
                    .build();
        }

        User user = optionalUser.get();

        if (user.getStatus() != UserStatus.ACTIVE) {
            return ApiResponse.<Object>builder()
                    .success(false)
                    .message("Account is not active.")
                    .build();
        }

        // Placeholder until email/OTP functionality is implemented
        return ApiResponse.<Object>builder()
                .success(true)
                .message("Password reset request accepted. OTP/Email functionality will be implemented in the next phase.")
                .build();
    }
}