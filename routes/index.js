var express = require('express');
var router = express.Router();
var controllers = require('../controllers');

router.get('/', (req, res) => controllers.search.index(req, res));
router.get('/items', (req, res) => controllers.listing.index(req, res));
router.get('/items/:id', (req, res) => controllers.product.index(req, res));

module.exports = router;
