"use server"

import nodemailer from "nodemailer";
import handlebars from "handlebars";
import { TwoFactorCodeTemplate } from "@/components/email-templates/two-factor-code";
import { ResetPasswordTemplate } from "@/components/email-templates/reset-password";
import { VerifyEmailTemplate } from "@/components/email-templates/verify-email";

const { SMTP_EMAIL, SMTP_PASSWORD } = process.env;
const domain = process.env.NEXT_PUBLIC_APP_URL;

// nodemailer transporter defined
const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: SMTP_EMAIL,
    pass: SMTP_PASSWORD,
  },
});

/**
 * Send two factor authentication code email
 */
export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  // create template
  const template = handlebars.compile(TwoFactorCodeTemplate);
  const body = template({
    code: token,
  });

  try {
    await transport.sendMail({
      from: SMTP_EMAIL,
      to: email,
      subject: "Two-Factor Authentication Code",
      html: body,
    });
  } catch (error) {
    console.log("2FA-CODE: ", error);
  }
};

/**
 * Send reset password link email
 */
export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${domain}/auth/new-password?token=${token}`;

  // create template
  const template = handlebars.compile(ResetPasswordTemplate);
  const body = template({
    resetLink: resetLink,
  });

  try {
    await transport.sendMail({
      from: SMTP_EMAIL,
      to: email,
      subject: "Reset Password",
      html: body,
    });
  } catch (error) {
    console.log("Reset Password: ", error);
  }
};

/**
 * Send account verification email
 */
export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;

  // create template
  const template = handlebars.compile(VerifyEmailTemplate);
  const body = template({
    confirmLink: confirmLink,
  });

  try {
    await transport.sendMail({
      from: SMTP_EMAIL,
      to: email,
      subject: "Confirm Your Email",
      html: body,
    });
  } catch (error) {
    console.log("Confirm Email: ", error);
  }
};
