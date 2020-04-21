const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, err => {
    if(!err) {
        console.log('MongoDb Successfully Connected.');
        
    } else {
        console.log('Error in Connection : ' + JSON.stringify(err, undefined, 3));
        
    }
});

require('./user');