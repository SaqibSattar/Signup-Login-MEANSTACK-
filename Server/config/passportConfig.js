const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');

var User = mongoose.model('Users');

passport.use(
    new localStrategy(
        {
            usernameField: 'email'
        }, (username, password, done) => {
            User.findOne({ email: username},
                (err, user) => {
                    if (err) {
                        return done(err)
                        // unknown User
                    } else if (!user) {
                        return done(null, false, { message: 'Email not Found' });
                    }
                    // wrong pasword
                    else if (!user.verifyPassword(password)) {
                        return done(null, false, { message: 'Wrong Crediential. '});
                    }
                    // Auth Success
                    else {
                        return done(null, user);
                    }
                });
        }) 
);