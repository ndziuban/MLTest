"use strict";

// const Q = require('q'),
//   NodeCache = require('node-cache'),
//   logger = require('../utils/logger');

class SearchController {
  constructor() {
  }

  index(req, res) {
    res.render('../views/searchbox.hbs', {});
  }

}

module.exports = SearchController;
