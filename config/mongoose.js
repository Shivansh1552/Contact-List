//require library
const mongoose = require('mongoose');

//connect to database
mongoose.connect('mongodb://localhost/contacts_list_db');

//acquire the connection (to check the connection)
const db = mongoose.connection;

//error
db.on('error',console.error.bind(console,'Connection error'));

//connected
db.once('open',function(){
    console.log('Successfully connected to DB');
});

