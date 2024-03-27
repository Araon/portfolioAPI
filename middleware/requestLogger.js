const { v4: uuidv4 } = require('uuid');

const requestLogger = (req, res, next) => {
    const requestId = uuidv4();
    req.requestId = requestId;
    console.debug(`[${requestId}] [${new Date().toUTCString()}] ${req.method} ${req.originalUrl}`);
    next();
};

module.exports = requestLogger;