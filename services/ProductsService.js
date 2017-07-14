"use strict";

const Q = require('q'),
      logger = require('../utils/logger');

class ProductsService {
  constructor(apiClient) {
    this._apiClient = apiClient;
  }

  getByQuery(query) {
    var deferred = Q.defer();

    this._apiClient.getItems(query).then(function(response) {
      var obj = {
        "author": {
          "name": "",
          "lastname": ""
        },
        "categories": [],
        "items": []
      };

      response.results.forEach(function(oneResult) {
        var formattedPrice = Math.floor(oneResult.price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

        var newItem = {
          "id": oneResult.id,
          "title": oneResult.title,
          "img": oneResult.thumbnail,
          "address": oneResult.address.state_name,
          "price": {
            "currency": oneResult.currency_id,
            "amount": formattedPrice,
            "decimals": oneResult.price.toString().indexOf(".") == -1 ? "00" : ("0" + oneResult.price.toString().split(".")[1]).slice(-2)
          },
          "picture": oneResult.thumbnail,
          "condition": oneResult.condition,
          "free_shipping": oneResult.shipping.free_shipping
        };

        if(obj.categories.indexOf(oneResult.category_id) == -1) {
          obj.categories.push(oneResult.category_id);
        }

        obj.items.push(newItem);
      });

      deferred.resolve(obj);
    }).catch(function(err) {
      logger.info('[ERROR] -> ' + err);
    });

    return deferred.promise;
  }

  getById(id) {
    var deferred = Q.defer();

    this._apiClient.getItemById(id).then(function(response) {
      var formattedPrice = Math.floor(response.price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

      var obj = {
        "author": {
          "name": "",
          "lastname": ""
        },
        "item": {
          "id": response.id,
          "title": response.title,
          "price": {
            "currency": response.currency_id,
            "amount": formattedPrice,
            "decimals": response.price.toString().indexOf(".") == -1 ? "00" : ("0" + response.price.toString().split(".")[1]).slice(-2)
          },
          "picture": response.pictures[0].url,
          "condition": response.condition,
          "free_shipping": response.shipping.free_shipping,
          "img": response.thumbnail,
          "sold_quantity": response.sold_quantity
        }
      };

      deferred.resolve(obj);
    });

    return deferred.promise;
  }

  getDescriptionById(id) {
    return this._apiClient.getItemDescriptionById(id);
  }

}

module.exports = ProductsService;
