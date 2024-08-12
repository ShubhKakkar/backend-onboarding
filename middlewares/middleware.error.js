const logger = require('../utils/util.error');

function errorHandler(err, req, res, next) {
    logger.error('Error: %s | Stack: %s', err.message, err.stack);
    console.error(err.stack);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Internal Server Error',
    });
}

module.exports = errorHandler;