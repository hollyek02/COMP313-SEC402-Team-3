package com.dealership.dto;

public class CustomerVehicleDTO {
    private String customerEmail;
    private Long carId;

    public CustomerVehicleDTO() {
    }

    public CustomerVehicleDTO(String customerEmail, Long carId) {
        this.customerEmail = customerEmail;
        this.carId = carId;
    }

    public String getCustomerEmail() {
        return customerEmail;
    }

    public void setCustomerEmail(String customerEmail) {
        this.customerEmail = customerEmail;
    }

    public Long getCarId() {
        return carId;
    }

    public void setCarId(Long carId) {
        this.carId = carId;
    }
}