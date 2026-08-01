package com.cdac.itregister.service;

import com.cdac.itregister.dto.ApiResponse;
import com.cdac.itregister.entity.Department;

public interface DepartmentService {

    ApiResponse<?> saveDepartment(Department department);

    ApiResponse<?> getDepartments();

    ApiResponse<?> getActiveDepartments();
    ApiResponse<?> getAllDepartments();

    ApiResponse<?> updateDepartmentStatus(
            Long id,
            String status
    );

}