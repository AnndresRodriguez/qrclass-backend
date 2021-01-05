import dotenv from "dotenv";
dotenv.config();
const sgMail = require("@sendgrid/mail");

export async function sendMail(to: string, password: string, template: string) {
  sgMail.setApiKey(`${process.env.API_KEY_MAIL}`);

  const message = {
    to,
    from: {
      email: "noreply@qrclassufps.com",
      name: "QRCLASS",
    },
    subject: "QRCLASS",
    html: template,
  };

  sgMail.send(message).then(
    (data: any) => {
      console.log(data);
    },
    (error: any) => {
      console.error(error);
      if (error.response) {
        console.error(error.response.body);
      }
    }
  );
}
