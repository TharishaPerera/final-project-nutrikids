"use server";

import nodemailer from "nodemailer";
import handlebars from "handlebars";
import { TwoFactorCodeTemplate } from "@/components/email-templates/two-factor-code";
import { ResetPasswordTemplate } from "@/components/email-templates/reset-password";
import { VerifyEmailTemplate } from "@/components/email-templates/verify-email";
import { WelcomeEmailTemplate } from "@/components/email-templates/welcome-email";
import { NotificationEmailTemplate } from "@/components/email-templates/notification-email";

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

/**
 * Send welcome email
 */
export const sendWelcomeEmail = async (email: string) => {
  const signinLink = `${domain}/auth/sign-in`;

  // create template
  const template = handlebars.compile(WelcomeEmailTemplate);
  const body = template({
    email: email,
    password: process.env.DEFAULT_USER_PASSWORD,
    supportEmail: process.env.SMTP_EMAIL,
    signinLink: signinLink,
  });

  try {
    await transport.sendMail({
      from: SMTP_EMAIL,
      to: email,
      subject: "Welcome to NutriKids!",
      html: body,
    });
  } catch (error) {
    console.log("Welcome Email: ", error);
  }
};

/**
 * Send notification email
 */
export const sendNotificationEmail = async (emailData: {
  name: string | null;
  email: string | null;
  title: string;
  description: string;
}) => {
  // create template
  const template = handlebars.compile(NotificationEmailTemplate);
  const body = template({
    name: emailData.name,
    content: emailData.description,
  });

  try {
    await transport.sendMail({
      from: SMTP_EMAIL,
      to: emailData.email!,
      subject: emailData.title,
      html: body,
    });
  } catch (error) {
    console.log("Notification Email: ", error);
  }
};
