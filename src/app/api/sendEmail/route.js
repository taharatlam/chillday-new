// app/api/sendEmail/route.js

import nodemailer from 'nodemailer';

export async function POST(req) {
  try {
    const { email } = await req.json();

    // Create a transporter object using your email provider's SMTP settings
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST, // Your SMTP host (e.g., Gmail, Mailgun)
      port: process.env.SMTP_PORT || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Setup email data for subscription confirmation
    const mailOptions = {
      from: process.env.SMTP_USER, // Sender address
      to: email,                   // Receiver address
      subject: 'Subscription Confirmation', // Subject line
      text: 'Thank you for subscribing to our newsletter!', // Plain text body
      html: '<p>Thank you for subscribing to our newsletter!</p>', // HTML body
    };

    // Send the subscription confirmation email
    await transporter.sendMail(mailOptions);

    return new Response(JSON.stringify({ message: 'Subscription email sent successfully' }), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: 'Failed to send subscription email' }), {
      status: 500,
    });
  }
}
