const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateLoginInput(data) {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email: '';
  data.password = !isEmpty(data.password) ? data.password: '';


  //ensuring email field contains valid email
  if(!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }

   //ensuring email field isn't empty
   if(Validator.isEmpty(data.email)) {
    errors.email = 'Email is required';
  }

  //ensuring password confirmation is not empty
  if(Validator.isEmpty(data.password)) {
    errors.password = 'Password is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};