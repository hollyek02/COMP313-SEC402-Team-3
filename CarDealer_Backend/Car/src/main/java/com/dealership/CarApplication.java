package com.dealership;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.dealership.model.Admin;
import com.dealership.repository.AdminRepository;

@SpringBootApplication
public class CarApplication {

	public static void main(String[] args) {
		SpringApplication.run(CarApplication.class, args);
		
		
		
	}
	
	
	 @Bean
	    CommandLineRunner init(AdminRepository repo, PasswordEncoder encoder) {
	        return args -> {
	            if (repo.findByUsername("admin") == null) {
	                Admin admin = new Admin();
	                admin.setUsername("admin");
	                admin.setPassword(encoder.encode("admin123"));
	                admin.setRole("ADMIN");

	                repo.save(admin);

	                System.out.println("✅ Default admin created");
	            }
	        };
	 }

	 

}
