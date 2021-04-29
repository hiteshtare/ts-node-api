"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLoggerLevel = exports.setLoggerLevel = void 0;
const log4js_1 = require("log4js");
const dotenv_1 = require("dotenv");
const index_1 = require("./../config/index");
dotenv_1.config();
const _logger = getLoggerLevel();
function setLoggerLevel() {
    index_1.APP_CONFIG.loggerLevel = '' + process.env.LOGGER_LEVEL;
    _logger.warn(`setLoggerLevel : ${index_1.APP_CONFIG.loggerLevel}`);
}
exports.setLoggerLevel = setLoggerLevel;
function getLoggerLevel() {
    const logger = log4js_1.getLogger();
    logger.level = index_1.APP_CONFIG.loggerLevel;
    return logger;
}
exports.getLoggerLevel = getLoggerLevel;
//# sourceMappingURL=common.util.js.map