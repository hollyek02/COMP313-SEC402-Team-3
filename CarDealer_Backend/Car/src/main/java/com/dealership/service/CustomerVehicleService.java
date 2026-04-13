package com.dealership.service;

import com.dealership.model.Car;
import com.dealership.model.CustomerVehicle;
import com.dealership.repository.CarRepository;
import com.dealership.repository.CustomerVehicleRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.time.LocalDate;

@Service
public class CustomerVehicleService {

    private final CustomerVehicleRepository customerVehicleRepository;
    private final CarRepository carRepository;

    public CustomerVehicleService(CustomerVehicleRepository customerVehicleRepository, CarRepository carRepository) {
        this.customerVehicleRepository = customerVehicleRepository;
        this.carRepository = carRepository;
    }

    public List<CustomerVehicle> getOwnershipRecordsByEmail(String email) {
        return customerVehicleRepository.findByCustomerEmail(email);
    }

    public List<Car> getOwnedCarsByEmail(String email) {
        List<CustomerVehicle> ownershipRecords = customerVehicleRepository.findByCustomerEmail(email);
        List<Car> ownedCars = new ArrayList<>();

        for (CustomerVehicle record : ownershipRecords) {
            Car car = carRepository.findById(record.getCarId()).orElse(null);
            if (car != null) {
                ownedCars.add(car);
            }
        }

        return ownedCars;
    }

public void saveCustomerVehicle(String customerEmail, Long carId) {
    CustomerVehicle customerVehicle = new CustomerVehicle();
    customerVehicle.setCustomerEmail(customerEmail);
    customerVehicle.setCarId(carId);
    customerVehicle.setPurchaseDate(LocalDate.now());
    customerVehicle.setStatus("ACTIVE");
    customerVehicleRepository.save(customerVehicle);
}

}