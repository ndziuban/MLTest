"use strict";

class SearchController {
  constructor() {
  }

  index(req, res) {
    res.render('../views/searchbox.hbs', {});
  }

}

module.exports = SearchController;
