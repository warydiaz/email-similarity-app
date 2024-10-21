import nodemailer from 'nodemailer';

export async function sendEmail(to: string, subject: string, body: string) {
    const transporter = nodemailer.createTransport({
        host: "cbmalta.com", // Dirección del servidor de Exchange
        port: 587, // Puerto SMTP de Exchange (587 para TLS, 465 para SSL)
        secure: false, // Cambia a true si usas el puerto 465 y quieres conexión segura SSL
        auth: {
            user: process.env.MAIL_USER, // Tu dirección de correo de Exchange
            pass: process.env.PASS_MAIL, // Tu contraseña de Exchange
        },
        tls: {
            ciphers: 'SSLv3', // Especifica un cifrado si es necesario
            rejectUnauthorized: false // Cambia a true si el certificado del servidor está firmado por una CA de confianza
        },
        logger: true, // Activa el registro
        debug: true, // Activa el modo de depuración
    });

    await transporter.sendMail({
        from: process.env.MAIL_USER,
        to: to,
        subject: subject,
        text: body
    });
    console.log('Email enviado con éxito');
}
