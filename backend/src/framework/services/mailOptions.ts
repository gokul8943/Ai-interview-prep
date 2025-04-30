import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.Email_User,
    pass: process.env.Email_Pass,
  },
});