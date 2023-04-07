const express = require('express')
const app = express()
var mongoose = require('mongoose')
const bodyparser = require('body-parser');

mongoose.connect("mongodb://127.0.0.1/rohitkart", { useNewUrlParser: true, useUnifiedTopology: true });

var db=mongoose.connection;
db.on('error',console.error.bind(console,'connection error:'));
db.once('open',function(){
    console.log("we are connected....")
})
const contactSchema = new mongoose.Schema({
    
    email: String,
    query:String,
    concern: String,
    about: String,

});

const Contact = mongoose.model('contactboot', contactSchema);

app.post("/contact", (req, res) => {
    var myData = new Contact(req.body);
    myData.save().then(() => {
        res.send("This item has been saved to the database")
    }).catch(() => {
        res.status(400).send('item was not saved to the databse')
    })
});
