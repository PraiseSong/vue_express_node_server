var express = require('express');
var router = express.Router();

var login_controller = require('../controllers/login');

router.post('/api/login/submit', login_controller.submit);

module.exports = router;
