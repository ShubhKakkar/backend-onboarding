const { createLogger, format, transports } = require('winston');
const path = require('path');

const logger = createLogger({
    level: 'error',
    format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.errors({ stack: true }),
        format.splat(),
        format.simple()
    ),
    transports: [
        new transports.Console(),
        new transports.File({
            filename: path.join('logs/errors', 'error.log'),
            level: 'error'
        })
    ],
});

module.exports = logger;