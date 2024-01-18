const validatePassword = () => {
    let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;   
    return regex;
  }

module.exports = {validatePassword} 