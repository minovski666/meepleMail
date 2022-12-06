import { createLogger, transports, format } from "winston";
const { combine, timestamp, label, printf, colorize, errors } = format;

const logFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} ${level}: ${stack || message}`;
});

const logger = createLogger({
  defaultMeta: { service: 'user-service' },
  transports: [
     new transports.Console({
      level: 'info',
      format: combine(
        label({ label: 'log format' }),
        colorize(),
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss'}),
        errors({stack: true}),
        logFormat
      ),
     }),
     new transports.File({
      filename: './src/utils/logger/logs.json',
      level: 'info',
      format: combine(
        label({ label: 'json logger' }),
        colorize(),
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss'}),
        errors({stack: true}),
        format.json()
      ),
    }),
  ],
});

export default logger;