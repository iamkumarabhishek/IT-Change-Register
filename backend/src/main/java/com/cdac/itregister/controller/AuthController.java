package com.cdac.itregister.controller;

import com.cdac.itregister.dto.*;
import com.cdac.itregister.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    // =========================
    // REGISTER
    // =========================
    @PostMapping("/register")
    public ApiResponse<Object> registerUser(
            @Valid @RequestBody UserRegistrationRequest request) {

        return authService.registerUser(request);
    }

    // =========================
    // LOGIN
    // =========================
    @PostMapping("/login")
    public ApiResponse<LoginResponse> login(
            @Valid @RequestBody LoginRequest request) {

        return authService.login(request);
    }

    // =========================
    // CHANGE PASSWORD
    // =========================
    @PutMapping("/change-password")
    public ApiResponse<Object> changePassword(
            @Valid @RequestBody ChangePasswordRequest request) {

        return authService.changePassword(request);
    }

    // =========================
    // FORGOT PASSWORD
    // =========================
    @PostMapping("/forgot-password")
    public ApiResponse<Object> forgotPassword(
            @Valid @RequestBody ForgotPasswordRequest request) {

        return authService.forgotPassword(request);
    }

    // =========================
    // LOGOUT
    // =========================
    @PostMapping("/logout")
    public ApiResponse<Object> logout() {

        return ApiResponse.<Object>builder()
                .success(true)
                .message("Logged out successfully.")
                .build();
    }
}