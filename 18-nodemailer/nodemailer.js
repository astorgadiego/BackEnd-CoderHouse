import { createTransport } from 'nodemailer';

const TEST_MAIL = 'porter.purdy@ethereal.email'

const transporter = createTransport({
    host: 'smtp.ethereal.email', //ACA VA EL MAIL QUE ME CREO ETHEREAL
    port: 587,
    auth: {
        user: TEST_MAIL,
        pass: 'kwQ8rwAuZhSC6eYvfr'
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
