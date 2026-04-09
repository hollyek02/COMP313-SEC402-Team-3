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

        String updatedStatus = status.toUpperCase();

        if (!updatedStatus.equals("PENDING")
                && !updatedStatus.equals("APPROVED")
                && !updatedStatus.equals("REJECTED")) {
            throw new IllegalArgumentException("Invalid status value.");
        }

        req.setStatus(updatedStatus);
        return repository.save(req);
    }

    public TestDriveRequest getRequestById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public boolean deleteRequest(Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return true;
        }
        return false;
    }
}