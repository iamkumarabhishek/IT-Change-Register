package com.cdac.itregister.controller;

import com.cdac.itregister.dto.ApiResponse;
import com.cdac.itregister.entity.Department;
import com.cdac.itregister.service.DepartmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/departments")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class DepartmentController {

    private final DepartmentService departmentService;

    @PostMapping
    public ResponseEntity<ApiResponse<?>> saveDepartment(
            @RequestBody Department department) {

        return ResponseEntity.ok(
                departmentService.saveDepartment(department)
        );

    }

    @GetMapping
    public ResponseEntity<ApiResponse<?>> getDepartments() {

        return ResponseEntity.ok(
                departmentService.getDepartments()
        );

    }

    @GetMapping("/active")
    public ResponseEntity<ApiResponse<?>> getActiveDepartments() {

        return ResponseEntity.ok(
                departmentService.getActiveDepartments()
        );

    }

    @GetMapping("/list")
    public ApiResponse<?> getAllDepartments() {

        return departmentService.getAllDepartments();

    }

    @PutMapping("/{id}/status")
    public ResponseEntity<ApiResponse<?>> updateDepartmentStatus(

            @PathVariable Long id,

            @RequestParam String status

    ) {

        return ResponseEntity.ok(

                departmentService.updateDepartmentStatus(
                        id,
                        status
                )

        );

    }

}