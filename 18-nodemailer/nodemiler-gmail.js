import { createTransport } from 'nodemailer';

const TEST_MAIL = 'porter.purdy@ethereal.email'

const transporter = createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: 'astorguchus@gmail.com', //ACA VA MI MAIL DE GMAIL!!!!
        pass: 'hpkbgfmwczgquffi' ///Y ACA LA CONTRASENA QUE SE CREO EN SECURITY.GOOGLE
    }
});


const mailOptions = {
    from: `Prueba mail personal - ${TEST_MAIL}`,
    to: `porter.purdy@ethereal.email`, //ACA VA EL MAIL QUE ME CREO ETHEREAL
    subject: 'Mail de prueba desde Node.js',
    html: '<h1>Mail de prueba desde Node.js</h1>'
    
}

try {
    const info = await transporter.sendMail(mailOptions)
    console.log(info)
} catch (error) {
    console.log(error)
}