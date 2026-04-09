package com.dealership.controller;

import com.dealership.model.TestDriveRequest;
import com.dealership.service.TestDriveRequestService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/test-drives")
@CrossOrigin(origins = "*")
public class TestDriveRequestController {

    private final TestDriveRequestService service;

    public TestDriveRequestController(TestDriveRequestService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<TestDriveRequest> create(@RequestBody TestDriveRequest request) {
        TestDriveRequest saved = service.createRequest(request);
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }

    @GetMapping
    public List<TestDriveRequest> getAll() {
        return service.getAllRequests();
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<?> updateStatus(
            @PathVariable Long id,
            @RequestParam String status) {
        try {
            TestDriveRequest updated = service.updateStatus(id, status);
            return ResponseEntity.ok(updated);
        } catch (IllegalArgumentException e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", e.getMessage());
            return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
        } catch (RuntimeException e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", e.getMessage());
            return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
        }
    }
}