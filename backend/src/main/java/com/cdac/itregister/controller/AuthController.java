package com.cdac.itregister.controller;

import com.cdac.itregister.dto.ApiResponse;
import com.cdac.itregister.dto.LoginRequest;
import com.cdac.itregister.dto.LoginResponse;
import com.cdac.itregister.dto.UserRegistrationRequest;
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

    @PostMapping("/register")
    public ApiResponse<Object> registerUser(
            @Valid @RequestBody UserRegistrationRequest request) {

        return authService.registerUser(request);
    }

    @PostMapping("/login")
    public ApiResponse<LoginResponse> login(
            @Valid @RequestBody LoginRequest request) {

        return authService.login(request);
    }
}