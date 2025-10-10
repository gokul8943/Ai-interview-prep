import nodemailer from 'nodemailer';
import { Resend } from 'resend';

export const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.Email_User,
    pass: process.env.Email_Pass,
  },
});

export const resend = new Resend(process.env.RESEND_API_KEY);