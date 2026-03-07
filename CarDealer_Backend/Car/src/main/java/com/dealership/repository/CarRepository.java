package com.dealership.repository;

import com.dealership.model.Car;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CarRepository extends JpaRepository<Car, Long> {

	List<Car> findAll();
}