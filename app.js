const express = require('express');
const firebase = require('firebase');
const app =  express();



const expressLayouts = require('express-ejs-layouts');


//ejs
app.use(expressLayouts);
app.set('view engine','ejs');

//Bodyparser
app.use(express.urlencoded({extended: false}));

//Routes
app.use('/', require('./routes/index'));

app.use('/users', require('./routes/users'));
const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));