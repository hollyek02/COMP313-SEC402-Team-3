package com.dealership.service;

import com.dealership.model.CustomerMessage;
import com.dealership.repository.CustomerMessageRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class CustomerMessageService {

    private final CustomerMessageRepository customerMessageRepository;

    public CustomerMessageService(CustomerMessageRepository customerMessageRepository) {
        this.customerMessageRepository = customerMessageRepository;
    }

    public void saveMessage(String customerEmail, String message) {
        CustomerMessage msg = new CustomerMessage();
        msg.setCustomerEmail(customerEmail);
        msg.setMessage(message);
        customerMessageRepository.save(msg);
    }

    public List<Map<String, Object>> getMessagesByEmail(String email) {
        return customerMessageRepository.findByCustomerEmailOrderByCreatedAtAsc(email)
                .stream()
                .map(msg -> Map.<String, Object>of(
                        "id", msg.getId(),
                        "message", msg.getMessage(),
                        "createdAt", msg.getCreatedAt(),
                        "status", msg.getStatus()
                ))
                .collect(Collectors.toList());
    }
}