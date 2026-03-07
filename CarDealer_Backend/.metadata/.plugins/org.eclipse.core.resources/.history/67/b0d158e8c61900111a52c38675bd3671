package com.dealership.service;

import com.dealership.model.Car;
import com.dealership.repository.CarRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CarService {

    private final CarRepository repo;

    public CarService(CarRepository repo){
        this.repo = repo;
    }

    public List<Car> getAllCars(){
        return repo.findAll();
    }

    public Car getCarById(Long id){
        return repo.findById(id).orElse(null);
    }
}