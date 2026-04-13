package com.dealership.controller;


import com.dealership.dto.ApiResponse;
import com.dealership.jwt.JwtUtil;
import com.dealership.model.Admin;
import com.dealership.service.AdminService;
import com.dealership.service.UserDetailsServiceImpl;

import jakarta.servlet.http.HttpServletResponse;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import com.dealership.dto.AdminResponseDTO;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.web.bind.annotation.CookieValue;

@RestController
@RequestMapping("/api/admin")

public class AdminLoginController {

    @Autowired
    private AdminService adminService;
    
    
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private UserDetailsServiceImpl userDetailsService;
  
    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private PasswordEncoder passwordEncoder;

    

   
    
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Admin admin, HttpServletResponse response) {
        try {
            String username = admin.getUsername();
            String password = admin.getPassword();

            System.out.println("Login attempt for: " + username);

            // 🔥 Authenticate
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(username, password)
            );

            System.out.println("Authentication successful");

            SecurityContextHolder.getContext().setAuthentication(authentication);

            Admin dbUser = adminService.findAdmin(username);
            System.out.println("DB User: " + dbUser);

            String jwt = jwtUtil.generateAccessToken(username);
            System.out.println("JWT generated");

            ResponseCookie cookie = jwtUtil.createAccessTokenCookie(jwt);
            response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());

            AdminResponseDTO adminResponse = new AdminResponseDTO(
                    jwt, dbUser.getId(), dbUser.getUsername()
            );
            System.out.println("ID: " + dbUser.getId());
            System.out.println("Username: " + dbUser.getUsername());
            System.out.println("Returning response: " + adminResponse);

            return ResponseEntity.ok(adminResponse);

        } catch (Exception e) {
            System.out.println("LOGIN ERROR: " + e.getMessage());
            e.printStackTrace(); // VERY IMPORTANT

            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ApiResponse<>(false, null, "Incorrect username or password"));
        }
    }
    
    
    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletResponse response) {

        System.out.println("Logout request received");

        // Clear JWT cookie
        ResponseCookie cookie = ResponseCookie.from("jwt", "")
                .httpOnly(true)
                .secure(false) // change to true in production (HTTPS)
                .path("/")
                .maxAge(0) // THIS deletes the cookie
                .sameSite("Lax")
                .build();

        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());

        // Clear Spring Security context
        SecurityContextHolder.clearContext();

        return ResponseEntity.ok(Map.of(
                "message", "Logged out successfully"
        ));
    }
    
    
    
    
@GetMapping("/check")
public ResponseEntity<?> check(
        @CookieValue(value = "access_token", required = false) String token) {

    try {
        if (token == null || token.isBlank()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        String username = jwtUtil.validateAccessToken(token);
        if (username == null || username.isBlank()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        Admin admin = adminService.findAdmin(username);
        if (admin == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        return ResponseEntity.ok(Map.of(
                "id", admin.getId(),
                "name", admin.getUsername()
        ));
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
}
}