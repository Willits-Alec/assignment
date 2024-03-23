const mongoose = require("mongoose");

var express = require('express');
var router = express.Router();
module.exports = router; 


const ContactsSchema = mongoose.Schema(
    {
            "id": String,
            "name": String,
            "email": String,
            "phone": String,
            "imageUrl": String,
            "group": String,
    }
)

const Contact = mongoose.model("Contact", ContactsSchema);

module.exports = Contact;