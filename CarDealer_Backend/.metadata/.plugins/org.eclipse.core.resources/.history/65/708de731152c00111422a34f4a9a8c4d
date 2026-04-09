package com.dealership.controller;

import com.dealership.model.TestDriveRequest;
import com.dealership.service.TestDriveRequestService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    public ResponseEntity<TestDriveRequest> updateStatus(
            @PathVariable Long id,
            @RequestParam String status) {
        TestDriveRequest updated = service.updateStatus(id, status);
        return ResponseEntity.ok(updated);
    }
}
