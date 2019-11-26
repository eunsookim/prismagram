import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, ".env") });

import { adjectives, nouns } from "./words";
import nodemailer from "nodemailer";
import sgTransport from "nodemailer-sendgrid-transport";

export const generateSecret = () => {
  const randomNumber = Math.floor(Math.random() * adjectives.length);
  return `${adjectives[randomNumber]} ${nouns[randomNumber]}`;
};

console.log(process.env.SENDGRID_USERNAME, process.env.SENDGRID_PASSWORD);

const sendMail = email => {
  const options = {
    auth: {
      api_user: process.env.SENDGRID_USERNAME,
      api_key: process.env.SENDGRID_PASSWORD
    }
  };
  const client = nodemailer.createTransport(sgTransport(options));
  return client.sendMail(email, function(err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log("Message sent: " + info.message);
    }
  });
};

export const sendSecretMail = (address, secret) => {
  const email = {
    from: "eunsoo@prismagram.com",
    to: address,
    subject: "🔒Login Secret for Prismagram🔒",
    text: "Hello world",
    html: `Hello ! Your login secret is ${secret}.<br/>Copy paste on the app/website to login`
  };

  return sendMail(email);
};
