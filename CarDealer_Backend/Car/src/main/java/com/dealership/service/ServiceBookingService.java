package com.dealership.service;

import com.dealership.model.ServiceBooking;
import com.dealership.repository.ServiceBookingRepository;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class ServiceBookingService {

    private final ServiceBookingRepository serviceBookingRepository;

    public ServiceBookingService(ServiceBookingRepository serviceBookingRepository) {
        this.serviceBookingRepository = serviceBookingRepository;
    }

    public ServiceBooking createBooking(ServiceBooking booking) {
        booking.setStatus("PENDING");

        boolean alreadyBooked = serviceBookingRepository.existsByPreferredDateAndTimeSlot(
                booking.getPreferredDate(),
                booking.getTimeSlot()
        );

        if (alreadyBooked) {
            throw new IllegalArgumentException("This time slot is no longer available.");
        }

        return serviceBookingRepository.save(booking);
    }

    public List<ServiceBooking> getBookingsByCustomerEmail(String customerEmail) {
        return serviceBookingRepository.findByCustomerEmail(customerEmail);
    }

    public List<String> getAvailableTimeSlots(LocalDate date) {
        List<String> allSlotsForDay = getSlotsForDayOfWeek(date.getDayOfWeek());
        List<ServiceBooking> existingBookings = serviceBookingRepository.findByPreferredDate(date);

        List<String> bookedSlots = new ArrayList<>();
        for (ServiceBooking booking : existingBookings) {
            bookedSlots.add(booking.getTimeSlot());
        }

        List<String> availableSlots = new ArrayList<>();
        for (String slot : allSlotsForDay) {
            if (!bookedSlots.contains(slot)) {
                availableSlots.add(slot);
            }
        }

        return availableSlots;
    }

    private List<String> getSlotsForDayOfWeek(DayOfWeek dayOfWeek) {
        switch (dayOfWeek) {
            case MONDAY:
                return Arrays.asList("9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM");
            case TUESDAY:
                return Arrays.asList("10:00 AM", "11:00 AM", "2:00 PM", "3:00 PM");
            case WEDNESDAY:
                return Arrays.asList("9:00 AM", "12:00 PM", "1:00 PM", "4:00 PM");
            case THURSDAY:
                return Arrays.asList("10:00 AM", "1:00 PM", "2:00 PM", "3:00 PM");
            case FRIDAY:
                return Arrays.asList("9:00 AM", "10:00 AM", "11:00 AM");
            case SATURDAY:
                return Arrays.asList("10:00 AM", "12:00 PM");
            default:
                return new ArrayList<>();
        }
    }

    public ServiceBooking cancelBooking(Long id) {
    ServiceBooking booking = serviceBookingRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Booking not found"));

    if (!booking.getStatus().equals("PENDING")) {
        throw new IllegalArgumentException("Only pending bookings can be cancelled.");
    }

    booking.setStatus("CANCELLED");
    return serviceBookingRepository.save(booking);
}
}