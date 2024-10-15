import nodemailer from 'nodemailer';

const sendEmailNotificationAdmin = async (

  firstName: string, 
  lastName: string,
  email:string,
  phoneNumber:string,
  freindlyNumber:string,
  visaType: any
) => {

  const listCategory = [
    { code: 100, label: "Visa court séjour" },
    { code: 200, label: "Visa long séjour" },
    { code: 300, label: "Visa court séjour express" },
  ];

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_GMAIL?.trim() || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_GMAIL_PORT || '465', 10),
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const visaLabel = listCategory.find(e => e.code === visaType)?.label;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: 'nouvelle demande de visa',
    html: `
      <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif; background-color: #f4f4f4;">
        <table style="width: 100%; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
          <tr>
            <td style="text-align: center;">
              <img src="https://i.ibb.co/TY2kgr7/flag-for-flag-cameroon-svgrepo-com.png" alt="evisasure-cameroun.com" style="width: 80px; margin-bottom: 10px;" />
              <h2 style="color: #1a73e8; margin-bottom: 5px;">Nouvelle Demande de visa soumise avec succès</h2>
              <p style="color: #333; font-size: 16px;">de la part de <strong>${firstName} ${lastName}</strong>,</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 10px 0;">
              <p style="font-size: 16px; color: #555;">
                Nous avons bien reçu votre demande de <strong>${visaLabel}</strong>. Voici un récapitulatif des informations fournies :
              </p>
              <ul style="list-style-type: none; padding: 0; font-size: 15px; color: #555;">
                <li style="margin-bottom: 5px;"><strong>Prénom :</strong> ${firstName}</li>
                <li style="margin-bottom: 5px;"><strong>Nom :</strong> ${lastName}</li>
                <li style="margin-bottom: 5px;"><strong>Type de visa :</strong> ${visaLabel}</li>
                 <li style="margin-bottom: 5px;"><strong>email du voyageur :</strong> ${email}</li>
                   <li style="margin-bottom: 5px;"><strong>numero de telephone du voyageur :</strong> ${phoneNumber}</li>
                           <li style="margin-bottom: 5px;"><strong>numero du contact au pays:</strong> ${freindlyNumber}</li>
              </ul>
            </td>
          </tr>
          <tr>
            <td style="padding: 10px 0;">
              <p style="font-size: 15px; color: #555;">
                Nous procéderons à l'examen de votre demande et nous vous contacterons sous peu pour la suite des étapes.
              </p>
              <p style="font-size: 15px; color: #555;">Merci d'avoir choisi nos services !</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 20px 0; text-align: center;">
              <hr style="border: 0; height: 1px; background-color: #ddd; margin: 20px 0;">
              <p style="font-size: 12px; color: #999;">
                Ceci est un message automatique, merci de ne pas y répondre.
              </p>
            </td>
          </tr>
        </table>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email', error);
  }
};

export default sendEmailNotificationAdmin;
