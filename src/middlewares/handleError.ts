import { Request, Response, NextFunction } from "express";
import { errorMessages } from "./helper/error-message";
import logger from "./helper/logger";


interface ApiError extends Error {
  status?: number;
  errorCode?: string;  // Ajout d'un code d'erreur personnalisé
}

// Middleware de gestion d'erreurs
const errorHandler = (
  err: ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Détermine le statut de l'erreur (400 par défaut ou 500 pour une erreur serveur)
  const status = err.status || 500;

  // Recherche du message d'erreur dans le tableau en fonction du code d'erreur
  const errorMessage = err.message ? errorMessages[err.message] : undefined;
  const errorTitle = err.message ? errorMessages[err.message]?.title : undefined;

  // Utilise le message d'erreur du tableau ou celui de l'erreur elle-même
  const message = errorMessage || err.message || "Une erreur est survenue.";
  const title = errorTitle || err.message || "Echec opération.";

  // Si c'est une erreur serveur, log l'erreur pour débogage
  if (status === 500) {
    console.error("Erreur serveur:", message);
  }

  // Envoie une réponse JSON avec l'erreur
  logger.error({
    message: err.message,
    status: status,
    stack: err.stack,
  });
  res.status(status).json({
    success: false,
    message: message,
    status: status,
    title: title
  });
};

export default errorHandler;
