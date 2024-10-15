import { NextFunction, Request, response, Response } from "express";
import { UploadService } from "../services/upload-service";

export const UploadController = {
  init: (app: any) => {
    // Route Upload de fichier
    app.post(
      "/api/upload-image",
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const savedFilePath = UploadService.saveBase64Image(req.body);
          res.send({
            message: 'Image sauvegardée avec succès',
            filePath: savedFilePath,
          });
        } catch (err) {
          next(err);
        }
      }
    );
  },
};
