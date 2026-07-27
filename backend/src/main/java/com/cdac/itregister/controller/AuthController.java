package com.cdac.itregister.controller;

import com.cdac.itregister.dto.ApiResponse;
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
    public ApiResponse registerUser(
            @Valid @RequestBody UserRegistrationRequest request) {

        return authService.registerUser(request);
    }
}