// // Validator 
// const mongoose = require('mongoose');

// const isValid = (value) => {

//     if (typeof value === 'undefined' || value === null) return false

//     if (typeof value === 'string' && value.trim().length === 0) return false

//     if (typeof value === 'number' && value.toString().trim().length === 0) return false

//     return true;

// }

// const isValidRequestBody = (requestBody) => {

//     if (Object.keys(requestBody).length) return true

//     return false;

// }

// const isValidObjectId = (ObjectId) => {

//     return mongoose.Types.ObjectId.isValid(ObjectId)

// }
// const isValidTitle = function(title){

//     return ['Mr', 'Mrs', 'Miss'].indexOf(title) !== -1

// }

// const isValidEmail = function (email) {

//         email = email.trim()

//         let regexForEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

//         return regexForEmail.test(email)

//     };

// module.exports={isValid,isValidRequestBody,isValidObjectId,isValidEmail,isValidTitle}