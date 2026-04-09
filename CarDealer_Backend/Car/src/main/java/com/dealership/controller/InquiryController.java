package com.dealership.controller;

import com.dealership.model.Inquiry;
import com.dealership.model.TestDriveRequest;
import com.dealership.repository.InquiryRepository;
import com.dealership.service.InquiryService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/inquiries")

public class InquiryController {

    private final InquiryService inquiryService;
    private final InquiryRepository inquiryRepository;

    public InquiryController(InquiryService inquiryService,InquiryRepository inquiryRepository) {
        this.inquiryService = inquiryService;
        this.inquiryRepository = inquiryRepository;
    }

    @PostMapping
    public Inquiry createInquiry(@RequestBody Inquiry inquiry) {
        return inquiryService.saveInquiry(inquiry);
    }

    @GetMapping
    public List<Inquiry> getAllInquiries() {
        return inquiryService.getAllInquiries();
    }
    
    
    @PatchMapping("/{id}/status")
    public ResponseEntity<Inquiry> updateStatus(
            @PathVariable Long id,
            @RequestParam String status) {
        Inquiry updated = inquiryService.updateStatus(id, status);
        return ResponseEntity.ok(updated);
    }
    
    // ✅ Get inquiry by ID
    @GetMapping("/{id}")
    public ResponseEntity<Inquiry> getInquiryById(@PathVariable Long id) {
        Inquiry inquiry = inquiryService.getInquiryById(id);
        if (inquiry != null) {
            return ResponseEntity.ok(inquiry);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // ✅ Delete inquiry by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteInquiry(@PathVariable Long id) {
        boolean deleted = inquiryService.deleteInquiry(id);
        if (deleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}