import { AdminService } from "./../services/admin-service";
import { NextFunction, Request, response, Response } from "express";
import verifyToken from "../middlewares/authMiddleware";

export const AdminController = {
  init: (app: any) => {
    // Route d'authentification
    app.post(
      "/api/login",
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const data = await AdminService.verifyCredential(req.body);
          res.send(data);
        } catch (err) {
          next(err);
        }
      }
    );

    // Routes protégées
    app.get(
      "/api/dashboard",
      verifyToken,
      (req: Request, res: Response, next: NextFunction) => {
        res.json({ message: "Welcome to the admin dashboard" });
      }
    );
  },
};
