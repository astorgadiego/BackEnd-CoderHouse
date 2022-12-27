import twilio from 'twilio'

const accountSid = ''// NOS LO DAN LA CUENTA PROPIA DE TWILIO
const authToken = ''// NOS LO DAN LA CUENTA PROPIA DE TWILIO

const client = twilio(accountSid, authToken)

const options = {
    body: 'Hola soy un SMS desde Node.js!',
    from: '+',
    to: '+'
}

try {
    const message = await client.messages.create(options)
    console.log(message)
} catch (error) {
    console.log(error)
}
