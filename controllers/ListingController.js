"use strict";

const logger = require('../utils/logger');

class ListingController {
  constructor(productsService) {
    this._productsService = productsService;
  }

  index(req, res) {
    var query = req.query.search;

    if (!query) {
      return res.redirect(301, '/');
    }

    this._productsService.getByQuery(query).then(function(data) {
      return res.render('../views/listing.hbs', {items: data.items.slice(0,4)});
    }).catch(function(err) {
      logger.info('[ERROR] -> ' + err);
    });
  }

}

module.exports = ListingController;
