package com.dealership.service;

import com.dealership.model.Inquiry;
import com.dealership.model.TestDriveRequest;
import com.dealership.repository.InquiryRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InquiryService {

    private final InquiryRepository inquiryRepository;

    public InquiryService(InquiryRepository inquiryRepository) {
        this.inquiryRepository = inquiryRepository;
    }

    public Inquiry saveInquiry(Inquiry inquiry) {
        return inquiryRepository.save(inquiry);
    }

    public List<Inquiry> getAllInquiries() {
        return inquiryRepository.findAll();
    }
    
    public Inquiry updateStatus(Long id, String status) {
        Inquiry req =inquiryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Test drive request not found"));
        req.setStatus(status);
        return inquiryRepository.save(req);
    }
    
    public Inquiry getInquiryById(Long id) {
        return inquiryRepository.findById(id).orElse(null);
    }

    public boolean deleteInquiry(Long id) {
        if (inquiryRepository.existsById(id)) {
            inquiryRepository.deleteById(id);
            return true;
        }
        return false;
    }
}