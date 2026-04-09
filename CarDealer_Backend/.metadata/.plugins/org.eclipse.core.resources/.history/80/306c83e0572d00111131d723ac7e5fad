package com.dealership.service;


import com.dealership.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    public boolean validateAdmin(String username, String password) {

        return adminRepository.findByUsernameAndPassword(username, password).isPresent();
    }
}