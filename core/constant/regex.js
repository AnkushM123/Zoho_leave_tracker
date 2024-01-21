const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const mongoIdRegex = /^[0-9a-fA-F]{24}$/;
const mobileRegex = /^(\+\d{1,3}[- ]?)?\d{10}$/;

module.exports = { passwordRegex, mongoIdRegex, mobileRegex }