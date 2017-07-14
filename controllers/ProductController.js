"use strict";

// const Q = require('q'),
//   NodeCache = require('node-cache'),
const logger = require('../utils/logger');

class ProductController {
  constructor(productsService) {
    this._productsService = productsService;
  }

  index(req, res) {
    var that = this;
    this._productsService.getById(req.params.id).then(function(data) {
      that._productsService.getDescriptionById(req.params.id).then(function(descData) {
        data.item["description"] = descData.plain_text;
        return res.render('../views/product.hbs', {item: data.item});
      }).catch(function(err) {
        logger.info('[ERROR] -> ' + err);
      });
    }).catch(function(err) {
      logger.info('[ERROR] -> ' + err);
    });

  }

}

module.exports = ProductController;
