package com.dealership.service;

import com.dealership.model.TestDriveRequest;
import com.dealership.repository.TestDriveRequestRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TestDriveRequestService {

    private final TestDriveRequestRepository repository;

    public TestDriveRequestService(TestDriveRequestRepository repository) {
        this.repository = repository;
    }

    public TestDriveRequest createRequest(TestDriveRequest request) {
        // make sure new requests always start as PENDING
        request.setStatus("PENDING");
        return repository.save(request);
    }

    public List<TestDriveRequest> getAllRequests() {
        return repository.findAll();
    }

    public List<TestDriveRequest> getRequestsByEmail(String email) {
        return repository.findByEmail(email);
    }

    public TestDriveRequest updateStatus(Long id, String status) {
        TestDriveRequest req = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Test drive request not found"));
        req.setStatus(status);
        return repository.save(req);
    }
}
