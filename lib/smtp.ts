"use server"

import nodemailer from "nodemailer"

export const sendTestEmail = async (email: string) => {
    const { SMPT_EMAIL, SMTP_PASSWORD } = process.env

    const transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: SMPT_EMAIL,
            pass: SMTP_PASSWORD
        }
    })

    try {
        const testResult = await transport.verify()
        console.log(testResult)
    } catch (error) {
        console.log("ERROR1: ", error)
        return
    }

    try {
        const sendResult = await transport.sendMail({
            from: SMPT_EMAIL,
            to: "tharishaperera@gmail.com",
            subject: "Test Subject",
            html: "Test Body"
        })
        console.log(sendResult)
    } catch (error) {
        console.log("ERROR2: ", error)
    }
}