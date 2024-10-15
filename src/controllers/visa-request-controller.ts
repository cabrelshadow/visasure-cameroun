import { NextFunction, Request, Response } from "express";
import { VisaService } from "../services/visa-request-service";
import logger from "../middlewares/helper/logger";


export const createVisaController = {
  init: (app: any) => {
    app.get(
      "/api/getAllvisa",
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const data = await VisaService.getAllVisa();
          logger.info(`Visa récupéré avec succès`);
          res.send({
            message: "visa recuperé avec success",
            data,
          });
        } catch (error) {
          next(error);
        }
      }
    );

    app.post(
      "/api/visa-insert",
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const data = await VisaService.createVisaRequest(req.body);
          logger.info(`Visa récupéré avec succès`);
          res.send({
            message: "Visa request created successfully",
          });
        } catch (error: any) {
          logger.info(`erreur de creation d'une demande :${error.stack}`);
          next(error);
        }
      }
    );
    // Route d'authentificatio
  },
};
