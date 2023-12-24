const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  const tronsport = {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  };     

  const tronsporter = nodemailer.createTransport(tronsport);

  const message = {
    from: `${process.env.SMTP_FROM_NAME} <${process.env.SMTP_FROM_NAME}>`,
    to: options.email,
    subject: options.subject,
    text: options.message
  };

  await tronsporter.sendMail(message);
};

module.exports = sendEmail;
