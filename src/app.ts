import express from "express";
import dotenv from "dotenv";

import sequelize from "./config/database";
import { createVisaController } from "./controllers/visa-request-controller";
import errorHandler from "./middlewares/handleError";
import { AdminController } from "./controllers/admin-controller";
import cors from 'cors';
import { UploadController } from "./controllers/upload-controller";

dotenv.config();



const app = express();

// Augmenter la taille maximale des requêtes JSON à 10 Mo (par exemple)
app.use(express.json({ limit: '10mb' })); // Modifier la taille selon vos besoins

// Configurer les options CORS si nécessaire
const corsOptions = {
  origin: process.env.HOST_SECURE, // Remplacez cela par l'origine que vous souhaitez autoriser
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Méthodes autorisées
  allowedHeaders: ['Content-Type', 'Authorization'], // En-têtes autorisés
};

// Utiliser CORS avec les options spécifiées
app.use(cors(corsOptions));



app.use(express.json());
createVisaController.init(app);
AdminController.init(app);
UploadController.init(app)



// Utilisation du middleware de gestion d'erreurs
app.use(errorHandler);

sequelize
  .sync()
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.error("Error connecting to the database", err);
  });
// seedAdmin();
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
