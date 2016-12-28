var express = require('express');
var router = express.Router();
var filterUtil = require('../utils/filterUtil');

var index_controller = require('../controllers/index');
var home_controller = require('../controllers/home');

router.get('/', index_controller.init);
router.get('/home', filterUtil.authorize, home_controller.init);

module.exports = router;
