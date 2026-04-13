package com.dealership.controller;

import com.dealership.service.CustomerMessageService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/customer-messages")
@CrossOrigin(origins = "http://localhost:5173")
public class CustomerMessageController {

    private final CustomerMessageService customerMessageService;

    public CustomerMessageController(CustomerMessageService customerMessageService) {
        this.customerMessageService = customerMessageService;
    }

    @PostMapping
    public ResponseEntity<String> sendMessage(@RequestBody Map<String, String> payload) {
        String customerEmail = payload.get("customerEmail");
        String message = payload.get("message");
        customerMessageService.saveMessage(customerEmail, message);
        return ResponseEntity.ok("Message sent successfully");
    }

    @GetMapping("/{email}")
    public List<Map<String, Object>> getMessages(@PathVariable String email) {
        return customerMessageService.getMessagesByEmail(email);
    }
    
@PostMapping("/reply")
public ResponseEntity<String> sendAdminReply(@RequestBody Map<String, String> payload) {
    String customerEmail = payload.get("customerEmail");
    String message = payload.get("message");
    customerMessageService.saveAdminReply(customerEmail, message);
    return ResponseEntity.ok("Reply sent successfully");
}

    @GetMapping
    public List<Map<String, Object>> getAllMessages() {
        return customerMessageService.getAllMessages();
    }

    @PatchMapping("/{id}/read")
    public ResponseEntity<String> markMessageAsRead(@PathVariable Long id) {
        customerMessageService.markAsRead(id);
        return ResponseEntity.ok("Message marked as read");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMessage(@PathVariable Long id) {
        customerMessageService.deleteMessage(id);
        return ResponseEntity.noContent().build();
    }
}