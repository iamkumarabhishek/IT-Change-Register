package com.cdac.itregister.repository;

import com.cdac.itregister.entity.Department;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface DepartmentRepository extends JpaRepository<Department, Long> {

    Optional<Department> findByDepartmentNameIgnoreCase(String departmentName);

    List<Department> findByStatusOrderByDepartmentNameAsc(String status);

}