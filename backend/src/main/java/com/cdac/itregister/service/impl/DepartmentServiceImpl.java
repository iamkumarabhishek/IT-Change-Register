package com.cdac.itregister.service.impl;

import com.cdac.itregister.dto.ApiResponse;
import com.cdac.itregister.entity.Department;
import com.cdac.itregister.repository.DepartmentRepository;
import com.cdac.itregister.service.DepartmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DepartmentServiceImpl implements DepartmentService {

    private final DepartmentRepository departmentRepository;

    @Override
    public ApiResponse<?> saveDepartment(Department department) {

        if (departmentRepository
                .findByDepartmentNameIgnoreCase(department.getDepartmentName())
                .isPresent()) {

            return ApiResponse.builder()
                    .success(false)
                    .message("Department already exists.")
                    .build();

        }
        department.setStatus("ACTIVE");
        Department savedDepartment =
                departmentRepository.save(department);



        return ApiResponse.builder()
                .success(true)
                .message("Department added successfully.")
                .data(savedDepartment)
                .build();

    }

    @Override
    public ApiResponse<?> getDepartments() {

        return ApiResponse.builder()
                .success(true)
                .message("Department List")
                .data(departmentRepository.findAll())
                .build();

    }

    @Override
    public ApiResponse<?> getActiveDepartments() {
        
        return ApiResponse.builder()
                .success(true)
                .message("Active Departments")
                .data(
                        departmentRepository.findByStatusOrderByDepartmentNameAsc("ACTIVE")
                )
                .build();

    }

}