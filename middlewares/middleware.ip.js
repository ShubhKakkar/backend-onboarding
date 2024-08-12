const createLoggerForIP = require('../utils/util.ip');

const ipLoggerMiddleware = (req, res, next) => {
    const ip = req.ip.replace(/:/g, '_').replace(/\./g, '_');
    
    const logger = createLoggerForIP(ip);
    
    const logMessage = `${ip} - ${req.method} ${req.originalUrl} ${res.statusCode} ${req.headers['user-agent']}`;
    logger.info(logMessage);

    next();
};

module.exports = ipLoggerMiddleware;
