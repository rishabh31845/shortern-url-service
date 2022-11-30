'use strict';

// Require modules
const uuidv1 = require('uuid/v1');
const path = require('path');
const winston = require('winston');
const { format } = require('winston');
const { combine, timestamp, printf, prettyPrint } = format;
require('winston-daily-rotate-file');
import { vars } from '../config/vars';
const logDirectory = path.join(__dirname, '/logs/winston');

const transports = [];

const consoleLog = new winston.transports.Console({
  name: 'debug-console',
  level: vars.logLevel,
  handleExceptions: false,
  json: false,
  colorize: true,
});
transports.push(consoleLog);

const fileLog = new winston.transports.DailyRotateFile({
  level: vars.logLevel,
  filename: `${logDirectory}/%DATE%.log`,
  datePattern: 'YYYY-MM-DD',
  handleExceptions: true,
  zippedArchive: true,
  colorized: true,
});

transports.push(fileLog);

// eslint-disable-next-line
const formatMessage = printf(
  (info: { timestamp: string; level: string; message: string }) => {
    const reqId = uuidv1();
    return JSON.stringify({
      reqId,
      timestamp: info.timestamp,
      level: info.level,
      message: info.message,
    });
  }
);

const logger = new winston.createLogger({
  format: combine(timestamp(), prettyPrint(), formatMessage),
  transports,
  exitOnError: false,
});

module.exports = logger;
