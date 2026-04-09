package com.dealership.dto;
public class AdminResponseDTO {

    private String token;
    private Long id;
    private String username;

    public AdminResponseDTO(String token, Long id, String username) {
        this.token = token;
        this.id = id;
        this.username = username;
    }

    public String getToken() { return token; }
    public Long getId() { return id; }
    public String getUsername() { return username; }
}