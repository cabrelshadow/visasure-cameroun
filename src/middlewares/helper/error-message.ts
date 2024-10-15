export const errorMessages: { [key: string]: { title: string, message: string } } = {
  INVALID_REQUEST: {
    title: "Requête invalide",
    message: "La requête est invalide."
  },
  UNAUTHORIZED_ACCESS: {
    title: "Accès refusé",
    message: "Accès non autorisé."
  },
  NOT_FOUND: {
    title: "Ressource introuvable",
    message: "La ressource demandée est introuvable."
  },
  SERVER_ERROR: {
    title: "Erreur serveur",
    message: "Une erreur serveur est survenue. Veuillez réessayer plus tard."
  },
  INVALID_EMAIL_FORMAT: {
    title: "E-mail invalide",
    message: "Le format de l'adresse e-mail est invalide."
  },
  INVALID_TRAVEL_DATE: {
    title: "Date de voyage incorrecte",
    message: "La date de voyage doit être dans le futur."
  },
  INVALID_PASSPORT_DATE: {
    title: "Passeport expiré",
    message: "La date d'expiration de votre passeport doit être d'au moins 6 mois à partir d'aujourd'hui."
  },
  FIELD_REQUIRED: {
    title: "Champ requis",
    message: "Tous les champs obligatoires doivent être remplis."
  },
  INVALID_CREDENTIAL: {
    title: "Identifiants invalides",
    message: "Invalid credential"
  },
  BAD_CREDENTIAL: {
    title: "Connexion échouée",
    message: "E-mail ou mot de passe incorrect."
  },
  INVALID_PHONE_NUMBER: {
    title: "Numéro invalide",
    message: "Le numéro de téléphone est invalide."
  },
  INVALID_COUNTRY_CODE: {
    title: "Code pays invalide",
    message: "L'indicatif du pays est invalide."
  },
  INVALIDFILE: {
    title: "Format invalide",
    message: "Le format du fichier n'est pas prise en compte."
  },

  // Ajoute d'autres erreurs selon tes besoins
};

