var winston           = require('winston');

var consoleTransport = new winston.transports.Console();
  // cloudwatchTransport = new WinstonCloudWatch({
  //   logGroupName: 'application-logs',
  //   logStreamName: 'normandia-'+process.env.NODE_ENV,
  //   awsRegion: 'us-east-1'
  // });


var logTransports = [];

if (process.env.NODE_ENV === 'development')
  logTransports = [consoleTransport];


var logger = new winston.Logger({
  level: 'info',
  transports: logTransports,
  exitOnError : false
});

logger.handleExceptions(logTransports);
//
// logger.rewriters.push(function(level, msg, meta) {
//   var log_context = cls.getNamespace('app-log-ctx');
//   meta.uow = log_context.get('uow');
//   return meta;
// });

module.exports = logger;
