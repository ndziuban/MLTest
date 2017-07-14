"use strict";

const restConnector = require('../clients/RestConnector');

class ApiClient {
  constructor() {
    this._restConnector = new restConnector(4000);
    this._baseUrl = "https://api.mercadolibre.com"
  }

  getItems(query) {
    var url = this._baseUrl + "/sites/MLA/search?q=" + query.toLowerCase();

    return this._restConnector.get(url);
  }

  getItemById(id) {
    var url = this._baseUrl + "/items/" + id;

    return this._restConnector.get(url);
  }

  getItemDescriptionById(id) {
    var url = this._baseUrl + "/items/" + id + "/description";

    return this._restConnector.get(url);
  }
}

module.exports = ApiClient;
