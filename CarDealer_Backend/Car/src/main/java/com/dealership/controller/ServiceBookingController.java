package com.dealership.controller;

import com.dealership.model.ServiceBooking;
import com.dealership.service.ServiceBookingService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/service-bookings")
@CrossOrigin(origins = "http://localhost:5173")
public class ServiceBookingController {

    private final ServiceBookingService serviceBookingService;

    public ServiceBookingController(ServiceBookingService serviceBookingService) {
        this.serviceBookingService = serviceBookingService;
    }

    @PostMapping
    public ResponseEntity<?> createBooking(@RequestBody ServiceBooking booking) {
        try {
            ServiceBooking savedBooking = serviceBookingService.createBooking(booking);
            return new ResponseEntity<>(savedBooking, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", e.getMessage());
            return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/{email}")
    public List<ServiceBooking> getBookingsByCustomerEmail(@PathVariable String email) {
        return serviceBookingService.getBookingsByCustomerEmail(email);
    }

    @GetMapping("/available-slots")
    public List<String> getAvailableSlots(@RequestParam String date) {
        LocalDate selectedDate = LocalDate.parse(date);
        return serviceBookingService.getAvailableTimeSlots(selectedDate);
    }

    @PatchMapping("/cancel/{id}")
public ResponseEntity<?> cancelBooking(@PathVariable Long id) {
    try {
        ServiceBooking updated = serviceBookingService.cancelBooking(id);
        return ResponseEntity.ok(updated);
    } catch (IllegalArgumentException e) {
        return ResponseEntity.badRequest().body(e.getMessage());
    }
}
}