import VisaRequest from "../models/VisaRequest";
import sendEmailNotificationAdmin from "./emailAdmin-service";
import sendEmailNotification from "./emailService";

export const VisaService = {
  async getAllVisa() {
    try {
   
      const visaRequests = await VisaRequest.findAll();
      return visaRequests;
    } catch (error) {
      throw error;
    }
  },

  async createVisaRequest(options: VisaRequest) {
    VisaRequest;
    const {
      type,
      reason,
      travelDate,
      email,
      phoneNumber,
      friendlyNumberCountry,
      firstName,
      lastName,
      passportExpiry,
      passportPhoto,
      flightTicket,
      vaccinationCard,
      isMinor,
      parentalAuthorization,
    } = options;
    // Validation des champs obligatoires
    try {
      if (
        !type ||
        !reason ||
        !travelDate ||
        !email ||
        !phoneNumber||
        !friendlyNumberCountry||
        !firstName ||
        !lastName ||
        !passportExpiry ||
        !passportPhoto ||
        !flightTicket ||
        !vaccinationCard
      ) {
      throw new Error('FIELD_REQUIRED');
      }

      // Validation de l'email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new Error("INVALID_EMAIL_FORMAT");
      }
        // Validation du numéro de téléphone (uniquement des chiffres et longueur de 10 chiffres)
    const phoneRegex = /^\d{09}$/;
    if (!phoneRegex.test(phoneNumber)) {
      throw new Error("INVALID_PHONE_NUMBER");
    }
      // Validation du préfixe international (country code) (optionnel : si nécessaire)
    const friendlyNumberCountryRegex = /^\d+$/;
    if (!friendlyNumberCountryRegex.test(friendlyNumberCountry)) {
      throw new Error("INVALID_COUNTRY_CODE");
    }


      // Validation de la date de voyage (doit être dans le futur)
      const travelDateParsed = new Date(travelDate);
      if (travelDateParsed < new Date()) {
        throw new Error("INVALID_TRAVEL_DATE");
      }

      // Validation de la date d'expiration du passeport (doit être >= 6 mois à partir d'aujourd'hui)
      const passportExpiryDate = new Date(passportExpiry);
      const today = new Date();
      const sixMonthsFromToday = new Date(today.setMonth(today.getMonth() + 6));

      if (passportExpiryDate < sixMonthsFromToday) {
        throw new Error("INVALID_PASSPORT_DATE");
      }

      // Créer la demande de visa
      const visaRequest = await VisaRequest.create({
        type,
        reason,
        travelDate,
        email,
        phoneNumber,
        friendlyNumberCountry,
        firstName,
        lastName,
        passportExpiry,
        isMinor,
        passportPhoto,
        flightTicket,
        vaccinationCard,
        parentalAuthorization: isMinor ? parentalAuthorization : null,
      });

      // Envoi de la notification par email
      await Promise.all([
        sendEmailNotification(email, firstName, lastName, type),
        
        sendEmailNotificationAdmin(firstName, lastName, email,phoneNumber,friendlyNumberCountry,type),
      ]);
    
      // Retourner la réponse au client
      return visaRequest;
    } catch (error) {
      throw error;
    }
  },
};
