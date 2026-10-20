import { transporter } from '../framework/services/mailOptions';

export const sendOtpEmail = async (to: string, otp: string, expiresMinutes: number): Promise<void> => {
  const mailOptions = {
    from: process.env.Email_User,
    to,
    subject: 'Your OTP Code',
    text: `Your OTP is ${otp}. It is valid for ${expiresMinutes} minutes.`,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2>Welcome to INTERVIEW_PREP!</h2>
        <p>Your One-Time Password (OTP) is:</p>
        <h1 style="color: #2b2b2b;">${otp}</h1>
        <p>This OTP is valid for ${expiresMinutes} minutes.</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};
