import * as fs from "fs";
import * as path from "path";

export const UploadService = {
  saveBase64Image(options: any) {
    const { base64String, fileName } = options;

    try {
      // Vérifier si la chaîne contient le préfixe "data:image/...;base64,"
      const matches = base64String?.match(
        /^data:image\/(png|jpeg|jpg);base64,(.+)$/
      );
      if (!matches) {
        throw new Error("INVALIDFILE");
      }

      const mimeType = matches[1]; // Exemple: 'image/png', 'image/jpeg', ou 'image/jpg'
      const imageData = matches[2]; // Les données Base64

      // Déterminer l'extension de fichier à partir du mime type
      const ext = mimeType.split("/")[1]; // Exemple: 'png', 'jpeg', ou 'jpg'

      // Construire le chemin de sauvegarde
      const filePath = path.join(
        __dirname,
        "../../uploads",
        `${fileName}.${ext}`
      );

      // Convertir Base64 en Buffer
      const buffer = Buffer.from(imageData, "base64");

      // Sauvegarder le fichier sur le disque
      fs.writeFileSync(filePath, buffer);

      return filePath;
    } catch (error) {
      throw error;
    }
  },
};
