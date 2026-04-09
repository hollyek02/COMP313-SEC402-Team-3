package com.dealership.controller;

import com.dealership.model.Car;
import com.dealership.model.CustomerVehicle;
import com.dealership.service.CustomerVehicleService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/customer-vehicles")
@CrossOrigin(origins = "http://localhost:5173")
public class CustomerVehicleController {

    private final CustomerVehicleService customerVehicleService;

    public CustomerVehicleController(CustomerVehicleService customerVehicleService) {
        this.customerVehicleService = customerVehicleService;
    }

    @GetMapping("/records/{email}")
    public List<CustomerVehicle> getOwnershipRecords(@PathVariable String email) {
        return customerVehicleService.getOwnershipRecordsByEmail(email);
    }

    @GetMapping("/{email}")
    public List<Car> getOwnedCars(@PathVariable String email) {
        return customerVehicleService.getOwnedCarsByEmail(email);
    }
}