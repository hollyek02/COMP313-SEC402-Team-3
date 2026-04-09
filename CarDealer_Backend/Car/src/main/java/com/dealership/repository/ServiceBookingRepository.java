package com.dealership.repository;

import com.dealership.model.ServiceBooking;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface ServiceBookingRepository extends JpaRepository<ServiceBooking, Long> {

    List<ServiceBooking> findByCustomerEmail(String customerEmail);

    List<ServiceBooking> findByPreferredDate(LocalDate preferredDate);

    boolean existsByPreferredDateAndTimeSlot(LocalDate preferredDate, String timeSlot);
}