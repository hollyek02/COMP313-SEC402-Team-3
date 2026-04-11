package com.dealership.service;

import com.dealership.model.Admin;
import com.dealership.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    public Admin findAdmin(String username) {
        return adminRepository.findByUsername(username).orElse(null);
    }
}