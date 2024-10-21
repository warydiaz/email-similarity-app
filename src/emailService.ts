import nodemailer from 'nodemailer';

export async function sendEmail( subject: string, body: string) {
    const transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST, 
        port: 587, 
        secure: false, 
        auth: {
            user: process.env.MAIL_USER, 
            pass: process.env.PASS_MAIL, 
        },
        tls: {
            ciphers: process.env.MAIL_ENCRYPTION, 
            rejectUnauthorized: false 
        },
        logger: false,
        debug: false, 
    });

    await transporter.sendMail({
        from: process.env.MAIL_USER,
        to: process.env.MAIL_TO,
        subject: subject,
        text: body
    });
}
