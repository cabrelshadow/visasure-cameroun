import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Charger les variables d'environnement
dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME as string,   // Nom de la base de données
  process.env.DB_USER as string,   // Utilisateur MySQL
  process.env.DB_PASS as string,   // Mot de passe MySQL
  {
    host: process.env.DB_HOST,     // Hôte (généralement localhost)
    dialect: 'mysql',              // Type de base de données
    logging: false,                // Désactiver l'affichage des requêtes SQL dans la console
  }
);

export default sequelize;