var winston           = require('winston');

var consoleTransport = new winston.transports.Console();

var logTransports = [];

if (process.env.NODE_ENV === 'development')
  logTransports = [consoleTransport];


var logger = new winston.Logger({
  level: 'info',
  transports: logTransports,
  exitOnError : false
});

logger.handleExceptions(logTransports);

module.exports = logger;
