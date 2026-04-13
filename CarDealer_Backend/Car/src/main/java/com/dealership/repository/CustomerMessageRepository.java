package com.dealership.repository;

import com.dealership.model.CustomerMessage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CustomerMessageRepository extends JpaRepository<CustomerMessage, Long> {

    List<CustomerMessage> findByCustomerEmailOrderByCreatedAtAsc(String customerEmail);
}