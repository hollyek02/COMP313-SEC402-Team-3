package com.dealership.repository;

import com.dealership.model.CustomerVehicle;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CustomerVehicleRepository extends JpaRepository<CustomerVehicle, Long> {

    List<CustomerVehicle> findByCustomerEmail(String customerEmail);
}