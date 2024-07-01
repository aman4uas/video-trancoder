import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()

const mailSender = async (email: string, title: string, htmlBody: string) => {
  try {
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    })

    let info = await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: `${email}`,
      subject: `${title}`,
      html: `${htmlBody}`,
    })
    return info
  } catch (error) {
    console.log(error)
    throw new Error('Error sending email !!')
  }
}

export { mailSender }
