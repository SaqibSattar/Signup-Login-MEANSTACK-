require('./config/config.js');
require('./models/db.js');
require('./config/passportConfig');



const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
 
const regRoutes = require('./routes/register');

var app = express();

// middleware
app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());
// /register
app.use('/api', regRoutes);
// handle error
app.use((err, req, res, next) => {
    if (err.name === 'ValidationError') {
        var valEror = [];
        Object.keys(err.errors).forEach(key => valEror.push(err.errors[key].message));
        res.status(422).send(valEror);
    }
})


// start server
app.listen(process.env.PORT, () => console.log(`Server started at PORT : ${process.env.PORT}`));