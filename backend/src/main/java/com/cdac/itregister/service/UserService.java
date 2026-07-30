package com.cdac.itregister.service;

import com.cdac.itregister.dto.*;
import com.cdac.itregister.entity.User;
import com.cdac.itregister.enums.UserStatus;
import com.cdac.itregister.repository.UserRepository;
import org.springframework.stereotype.Service;

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

    public ApiResponse<Object> approveUser(Long id) {

        User user = userRepository.findById(id).orElse(null);

        if (user == null) {
            return ApiResponse.<Object>builder()
                    .success(false)
                    .message("User not found.")
                    .build();
        }

        if (user.getStatus() == UserStatus.ACTIVE) {
            return ApiResponse.<Object>builder()
                    .success(false)
                    .message("User is already approved.")
                    .build();
        }

        user.setStatus(UserStatus.ACTIVE);
        user.setApprovedAt(LocalDateTime.now());
        user.setApprovedBy("SYSTEM");
        user.setUpdatedAt(LocalDateTime.now());

        userRepository.save(user);

        return ApiResponse.<Object>builder()
                .success(true)
                .message("User approved successfully.")
                .build();
    }

    public ApiResponse<Object> registerUser(UserRegistrationRequest request) {

        if (!request.getPassword().equals(request.getConfirmPassword())) {

            return ApiResponse.builder()
                    .success(false)
                    .message("Password and Confirm Password do not match.")
                    .build();

        }

        if (userRepository.existsByUsername(request.getUsername())) {

            return ApiResponse.builder()
                    .success(false)
                    .message("Username already exists.")
                    .build();

        }

        if (userRepository.existsByEmail(request.getEmail())) {

            return ApiResponse.builder()
                    .success(false)
                    .message("Email already exists.")
                    .build();

        }

        if (userRepository.existsByMobileNumber(request.getMobileNumber())) {

            return ApiResponse.builder()
                    .success(false)
                    .message("Mobile Number already exists.")
                    .build();

        }

        User user = User.builder()
                .username(request.getUsername())
                .fullName(request.getFullName())
                .email(request.getEmail())
                .mobileNumber(request.getMobileNumber())
                .password(request.getPassword())     // BCrypt later
                .createdBy(request.getUsername())
                .build();

        userRepository.save(user);

        return ApiResponse.builder()
                .success(true)
                .message("Registration submitted successfully. Please wait for administrator approval.")
                .build();

    }
    public ApiResponse<?> getProfile(String username) {

        User user = userRepository.findByUsername(username).orElse(null);

        if (user == null) {

            return ApiResponse.builder()
                    .success(false)
                    .message("User not found.")
                    .build();

        }

        UserProfileResponse profile = UserProfileResponse.builder()

                .id(user.getId())

                .fullName(user.getFullName())

                .username(user.getUsername())

                .email(user.getEmail())

                .mobileNumber(user.getMobileNumber())

                .role(user.getRole())

                .status(user.getStatus())

                .createdAt(user.getCreatedAt())

                .createdBy(user.getCreatedBy())

                .approvedAt(user.getApprovedAt())

                .approvedBy(user.getApprovedBy())

                .emailVerified(user.isEmailVerified())

                .build();

        return ApiResponse.builder()

                .success(true)

                .message("Profile fetched successfully.")

                .data(profile)

                .build();

    }

    public ApiResponse<?> updateProfile(UpdateProfileRequest request) {

        User user = userRepository.findById(request.getId()).orElse(null);

        if (user == null) {

            return ApiResponse.builder()
                    .success(false)
                    .message("User not found.")
                    .build();

        }

        user.setFullName(request.getFullName());

        user.setEmail(request.getEmail());

        user.setMobileNumber(request.getMobileNumber());

        userRepository.save(user);

        return ApiResponse.builder()

                .success(true)

                .message("Profile updated successfully.")

                .data(user)

                .build();

    }


}