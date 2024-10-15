import nodemailer from 'nodemailer';

const sendEmailNotification = async (
  recipientEmail: string, 
  firstName: string, 
  lastName: string,
  visaType: any
) => {

  const listCategory = [
    { code: 100, label: "Visa court séjour"},
    { code: 200, label: "Visa long séjour"},
    { code: 300, label: "Visa court séjour express"},
  ]

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_GMAIL?.trim() || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_GMAIL_PORT || '465', 10),
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: recipientEmail,
    subject: 'Confirmation de Soumission de Demande de Visa',
    html: `
      <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px; background-color: #f9f9f9;">
        <h2 style="color: #1a73e8; text-align: center;">Confirmation de Soumission de Visa</h2>
        <div style="text-align: center; margin-bottom: 20px;">
          <img src="https://i.ibb.co/TY2kgr7/flag-for-flag-cameroon-svgrepo-com.png" alt="evisasure-cameroun.com" style="width: 80px; height: 80px; border-radius: 50%;" />
        </div>
        <p style="font-size: 16px; line-height: 1.5;">Cher(ère) <strong>${firstName} ${lastName}</strong>,</p>
        <p style="font-size: 16px; line-height: 1.5;">
          Nous avons bien reçu votre demande de visa pour un <strong>${listCategory?.find(e => e?.code === visaType)?.label}</strong>.
        </p>
        <h3 style="color: #00647b; margin-top: 20px;">Détails de votre demande :</h3>
        <ul style="list-style: none; padding: 0;">
          <li style="margin-bottom: 8px;">
            <strong>Prénom :</strong> ${firstName}
          </li>
          <li style="margin-bottom: 8px;">
            <strong>Nom :</strong> ${lastName}
          </li>
          <li style="margin-bottom: 8px;">
            <strong>Type de visa :</strong> ${listCategory?.find(e => e?.code === visaType)?.label}
          </li>
        </ul>
        <p style="font-size: 16px; line-height: 1.5;">
          Votre demande est actuellement en cours de traitement. Nous reviendrons vers vous dans les plus brefs délais avec une mise à jour.
        </p>
        <p style="font-size: 16px; line-height: 1.5;">Merci de faire confiance à notre service evisasure-cameroun.com !</p>
        <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />
        <p style="font-size: 14px; color: #999; text-align: center;">
          Ceci est un message automatique. Merci de ne pas répondre à ce mail.
        </p>
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

export default sendEmailNotification;
