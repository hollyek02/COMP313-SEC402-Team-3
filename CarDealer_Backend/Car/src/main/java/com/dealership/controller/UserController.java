package com.dealership.controller;

import com.dealership.model.User;
import com.dealership.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        try {
            User savedUser = userService.registerUser(user);

            Map<String, Object> response = new HashMap<>();
            response.put("message", "Registration successful");
            response.put("userId", savedUser.getId());

            return new ResponseEntity<>(response, HttpStatus.CREATED);

        } catch (IllegalArgumentException e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", e.getMessage());
            return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User user) {
        User loggedInUser = userService.loginUser(user.getEmail(), user.getPassword());

        if (loggedInUser == null) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "Invalid email or password.");
            return new ResponseEntity<>(error, HttpStatus.UNAUTHORIZED);
        }

        Map<String, Object> response = new HashMap<>();
        response.put("message", "Login successful");

        Map<String, Object> userData = new HashMap<>();
        userData.put("id", loggedInUser.getId());
        userData.put("fullName", loggedInUser.getFullName());
        userData.put("email", loggedInUser.getEmail());
        userData.put("role", loggedInUser.getRole());

        response.put("user", userData);

        return ResponseEntity.ok(response);
    }
}