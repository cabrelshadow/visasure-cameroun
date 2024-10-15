import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    // Écrit les logs d'erreurs dans un fichier dédié
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    // Écrit tous les logs d'informations dans un fichier dédié
    new winston.transports.File({ filename: 'logs/combined.log' }),
  ],
});

// Si on est en mode développement, log également dans la console
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}

export default logger;
