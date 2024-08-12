const { createLogger, format, transports } = require('winston');
const path = require('path');
const fs = require('fs');

const logDirectory = path.join('logs', 'connections');
if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory, { recursive: true });
}

function sanitizeIP(ip) {
    return ip.replace(/:/g, '_').replace(/\./g, '_');
}

function createLoggerForIP(ip) {
    const sanitizedIP = sanitizeIP(ip);
    return createLogger({
        level: 'info',
        format: format.combine(
            format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
            format.printf(({ timestamp, message }) => {
                return `${timestamp} ${message}`;
            })
        ),
        transports: [
            new transports.File({
                filename: path.join(logDirectory, `${sanitizedIP}.log`),
                level: 'info'
            })
        ]
    });
}

module.exports = createLoggerForIP;