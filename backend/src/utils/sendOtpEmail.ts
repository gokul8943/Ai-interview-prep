import formData from 'form-data';
import Mailgun from 'mailgun.js';
import dotenv from 'dotenv';
dotenv.config();

const mg = new Mailgun(formData);

const mailgun = mg.client({
  username: 'api',
  key: process.env.MAILGUN_API_KEY || '',
});

export async function sendOtpEmail(to: string, otp: string) {
  try {
    const domain = process.env.MAILGUN_DOMAIN || 'sandboxXXXX.mailgun.org'; // put your sandbox domain here

    const result = await mailgun.messages.create(domain, {
      from: `IntelliPrep <mailgun@${domain}>`,
      to: [to],
      subject: 'Your OTP Code',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>Welcome to IntelliPrep!</h2>
          <p>Your One-Time Password (OTP) is:</p>
          <h1 style="color: #2b2b2b;">${otp}</h1>
          <p>This OTP is valid for 10 minutes.</p>
        </div>
      `,
    });

    console.log('✅ Mailgun send result:', result);
    return result;
  } catch (err) {
    console.error('❌ Mailgun send error:', err);
    throw err;
  }
}
