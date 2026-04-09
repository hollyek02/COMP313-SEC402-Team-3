package com.dealership.repository;

import com.dealership.model.TestDriveRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TestDriveRequestRepository extends JpaRepository<TestDriveRequest, Long> {

    List<TestDriveRequest> findByEmail(String email);

    List<TestDriveRequest> findByCarId(Long carId);
}
