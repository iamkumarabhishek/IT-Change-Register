package com.cdac.itregister.service;

import com.cdac.itregister.dto.ApiResponse;
import com.cdac.itregister.dto.UserRegistrationRequest;
import com.cdac.itregister.entity.User;
import com.cdac.itregister.enums.UserStatus;
import com.cdac.itregister.repository.UserRepository;
import org.springframework.stereotype.Service;
import com.cdac.itregister.dto.PendingUserResponse;
import com.cdac.itregister.enums.UserStatus;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    public List<PendingUserResponse> getPendingUsers() {

        return userRepository.findByStatus(UserStatus.PENDING)
                .stream()
                .map(user -> PendingUserResponse.builder()
                        .id(user.getId())
                        .fullName(user.getFullName())
                        .username(user.getUsername())
                        .email(user.getEmail())
                        .mobileNumber(user.getMobileNumber())
                        .status(user.getStatus())
                        .build())
                .toList();
    }

    public ApiResponse approveUser(Long id) {

        User user = userRepository.findById(id)
                .orElse(null);

        if (user == null) {
            return new ApiResponse(false, "User not found.");
        }

        if (user.getStatus() == UserStatus.ACTIVE) {
            return new ApiResponse(false, "User is already approved.");
        }

        user.setStatus(UserStatus.ACTIVE);
        user.setApprovedAt(LocalDateTime.now());
        user.setApprovedBy("SYSTEM");
        user.setUpdatedAt(LocalDateTime.now());

        userRepository.save(user);

        return new ApiResponse(true, "User approved successfully.");
    }

}