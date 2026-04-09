package com.dealership.service;

<<<<<<< HEAD
import com.dealership.model.User;
import com.dealership.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User registerUser(User user) {

        if (user.getFullName() == null || user.getFullName().trim().isEmpty()) {
            throw new IllegalArgumentException("Full name is required.");
        }

        if (user.getEmail() == null || user.getEmail().trim().isEmpty()) {
            throw new IllegalArgumentException("Email is required.");
        }

        if (user.getPassword() == null || user.getPassword().trim().isEmpty()) {
            throw new IllegalArgumentException("Password is required.");
        }

        if (userRepository.existsByEmail(user.getEmail())) {
            throw new IllegalArgumentException("An account with this email already exists.");
        }

        user.setRole("CUSTOMER");

        return userRepository.save(user);
    }

    public User loginUser(String email, String password) {
        Optional<User> user = userRepository.findByEmailAndPassword(email, password);
        return user.orElse(null);
    }
}
=======
import com.dealership.model.Admin;





import java.util.List;
import java.util.Optional;


public interface UserService {

 

  

    
        
    public void saveAdmin(Admin user);
        

    public void saveUser(Admin user);

    public List<Admin> getAll() ;

    public Optional<Admin> findById(Integer id);

    public void deleteById(Integer id);

    public Admin findByUsername(String username);
}
>>>>>>> d503c44a1ad7146200230d04951bf3a971585e02
