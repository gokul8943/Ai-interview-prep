import { transporter } from '../framework/services/mailOptions';
import dotenv from 'dotenv';

dotenv.config();


export const sendOtpEmail = async (to: string, otp: string) => {
  const mailOptions = {
    from: process.env.Email_User,
    to,
    subject: 'Your OTP Code',
    text: `Your OTP is ${otp}. It is valid for 5 minutes.`,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2>Welcome to INTERVIEW_PREP!</h2>
        <p>Your One-Time Password (OTP) is:</p>
        <h1 style="color: #2b2b2b;">${otp}</h1>
        <p>This OTP is valid for 10 minutes.</p>
      </div>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

