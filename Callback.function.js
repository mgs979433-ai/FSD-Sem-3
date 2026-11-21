
function calculate(a, b, callback) {
    console.log("Result:", callback(a, b));
}

// Addition
calculate(10, 5, function(x, y) {
    return x + y;
});

// Subtraction
calculate(10, 5, function(x, y) {
    return x - y;
});

// Multiplication
calculate(10, 5, function(x, y) {
    return x * y;
});

// Division
calculate(10, 5, function(x, y) {
    return x / y;
});
