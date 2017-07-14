"use strict";

//Controllers
const SearchController = require('./SearchController'),
      ListingController = require('./ListingController'),
      ProductController = require('./ProductController');

//Services
const ProductsService  = require('../services/ProductsService');

//Clients
const ApiClient = require('../clients/ApiClient');

const _productService = new ProductsService(new ApiClient());

module.exports = {
  search: new SearchController(),
  listing: new ListingController(_productService),
  product: new ProductController(_productService)
};
