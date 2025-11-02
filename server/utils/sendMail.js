import nodemailer from "nodemailer";

export const sendOTP = async (email, otp) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.MAIL_USER,
      to: email,
      subject: "Your ResumeK-Ai Verification OTP",
      html: `
        <div style="font-family: Arial; padding: 20px;">
          <h2>ResumeK-Ai Email Verification</h2>
          <p>Your OTP code is:</p>
          <h1 style="color:#007bff">${otp}</h1>
          <p>This OTP is valid for 5 minutes.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ OTP sent to ${email}`);
  } catch (error) {
    console.error("❌ Error sending OTP:", error);
    throw new Error("Failed to send email");
  }
};
