package com.cdac.itregister.controller;

import com.cdac.itregister.dto.ApiResponse;
import com.cdac.itregister.service.UserService;
import org.springframework.web.bind.annotation.*;
import com.cdac.itregister.dto.PendingUserResponse;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }


    @GetMapping("/pending")
    public List<PendingUserResponse> getPendingUsers() {

        return userService.getPendingUsers();

    }
    @PutMapping("/{id}/approve")
    public ApiResponse approveUser(@PathVariable Long id) {

        return userService.approveUser(id);

    }

}