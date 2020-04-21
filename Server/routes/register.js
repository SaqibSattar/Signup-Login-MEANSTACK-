const express = require('express');
var router = express.Router(); 
require('../models/db');

var ctrlRoutes = require('../controllers/usersController.js');
var jwtAuth = require('../config/jwtAuth')



router.post('/register', ctrlRoutes.register);
router.post('/authenticate', ctrlRoutes.authenticate);
router.get('/userProfile',jwtAuth.verifyToken ,ctrlRoutes.userProfile);

module.exports = router;