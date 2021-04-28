import { APP_CONFIG } from './../config/index';
// Import node modules
import { Logger } from 'log4js';
import { getLogger } from 'log4js';
import { config } from 'dotenv';

// Import bot configuration/variables from .env file in root folder
config();

// Logger initialise
const _logger = getLoggerLevel();

export function setLoggerLevel(): void {
  APP_CONFIG.loggerLevel = '' + process.env.LOGGER_LEVEL;
  _logger.warn(`setLoggerLevel : ${APP_CONFIG.loggerLevel}`);
}

export function getLoggerLevel(): Logger {
  const logger = getLogger();
  logger.level = APP_CONFIG.loggerLevel;
  return logger;
}