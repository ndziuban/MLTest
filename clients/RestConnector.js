"use strict";

const Q             = require("q"),
      restler       = require('restler'),
      logger        = require('../utils/logger');

class RestConnector {
  constructor(defaultTimeout) {
    this._defaultTimeout = defaultTimeout;
  }

  get(url, options) {
    logger.info('[GET] -> ' + url);

    var deferred = Q.defer();
    restler .get(url, options)
            .on('success', (rs) => deferred.resolve(rs))
            .on('fail', (err) => this._handleError(url, deferred, err))
            .on('error', (err) => this._handleError(url, deferred, err))
            .on('timeout', (err) =>  this._handleError(url, deferred, err));

    return deferred.promise;
  }

  post(url, body, options) {
    logger.info('[POST] ' + url);

    var deferred = Q.defer();
    restler.postJson(url, body, options)
      .on('success', (rs) => deferred.resolve(rs))
      .on('fail', (err) => this._handleError(url, deferred, err))
      .on('error', (err) => this._handleError(url, deferred, err))
      .on('timeout', (err) =>  this._handleError(url, deferred, err));

    return deferred.promise;
  }

  _handleError(url, deferred, err) {
    if(!(err instanceof Error)) err = new Error(err);
    logger.error('RestConnector Error ' + url, err);
    deferred.reject(new Error('RestConnector Error ' + url));
  }

}

module.exports = RestConnector;
