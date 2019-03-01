const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validatePostInput(data) {
  let errors = {};

  data.text = !isEmpty(data.text) ? data.text: '';

  //make sure post is no longer than 300 characters
  if(!Validator.isLength(data.text, { max: 300})) {
    
    errors.text = "Post cannot be more than 300 characters"
       
  }

   //ensuring text field isn't empty
   if(Validator.isEmpty(data.text)) {
    errors.text = 'Text field is required';
  }


  return {
    errors,
    isValid: isEmpty(errors)
  };
};