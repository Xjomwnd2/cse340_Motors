// inventory-validation.js

// Validate vehicle data
function validateVehicle(vehicle) {
    const errors = [];

    // Check for make
    if (!vehicle.make || vehicle.make.trim() === "") {
        errors.push("Vehicle make is required.");
    }

    // Check for model
    if (!vehicle.model || vehicle.model.trim() === "") {
        errors.push("Vehicle model is required.");
    }

    // Check for price
    if (!vehicle.price || isNaN(vehicle.price) || vehicle.price <= 0) {
        errors.push("Vehicle price must be a positive number.");
    }

    // Check for year
    if (!vehicle.year || isNaN(vehicle.year) || vehicle.year < 1886 || vehicle.year > new Date().getFullYear()) {
        errors.push("Vehicle year must be a valid year (1886 or later).");
    }

    // Check for classification
    if (!vehicle.classificationId) {
        errors.push("Vehicle classification is required.");
    }

    return errors;
}

// Export the validation function
module.exports = {
    validateVehicle,
};
