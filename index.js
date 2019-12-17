const express = require('express');
const path = require('path');
const port = 8000;

//Conection to the database
const db = require('./config/mongoose');

//Creating of Schemas in MongoDB using mongoose
const Contact = require('./models/contact');


const app = express();


// to use view engine to enable ejs
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

//Middleware function

//to read encoded data that is sent by form encoded in string format from browser to the server
app.use(express.urlencoded());  

//to use static files home.css from the asset folder on the browser
app.use(express.static('assets'));


//get method for rendering page on browser
app.get('/',function(req,res){

    //To render the information from the databse to the browser
    Contact.find({},function(err,contact){
        if(err){
            console.log('error in displaying from db');
            return;
        }

        return res.render('home',
        {
            title:"Contacts List",
            contact_list : contact
        
        });

});

//post method for pushing new added contact from the browser
app.post('/create-Contact',function(req,res){
 

    //creating document in database getting from browser
     Contact.create({
         name : req.body.name,
         phone : req.body.phone
     } , function(err,newContact){

        if(err) {
            console.log('Error');
            return;
        }

        console.log('*****',newContact);

        return res.redirect('back');
     })

});

//for query params
app.get('/delete-contact',function(req,res){

  // deletion of contact from database

     //for database we will use id for deletion which is unique for every object
     console.log(req.query);  
     let id = req.query.id;

     Contact.findByIdAndDelete(id,function(err){
         if(err){
             console.log('Error in deleting from DB');
             return;
         }

         return res.redirect('back');
     });


 });

 //Listening on the port for successful running of express js
app.listen(port,function(err){
   if(err)
   {
    console.log('Error',err);
   }

   console.log('Server runnin on port:',port);
});