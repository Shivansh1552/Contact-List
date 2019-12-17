//Creating the document usingmongoose

//require the moongoose file
const mongoose = require('mongoose');

//creating the structure of schema
const contactSchema = new mongoose.Schema({
      
       name : {
           type : String,
           required : true
       },

       phone : {
           type : String,
           required : true
       }

});

//variable to defin the model and retrieve it
const Contact = mongoose.model('Contact', contactSchema);

//exporting the variable for index.js file
module.exports = Contact;