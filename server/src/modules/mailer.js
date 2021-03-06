const nodemailer = require('nodemailer')

const { MAILER_HOST, MAILER_PORT, MAILER_USER, MAILER_PASS} = process.env;

const transport = nodemailer.createTransport({
    host: MAILER_HOST,
    port: MAILER_PORT,
    auth: { user: MAILER_USER, pass: MAILER_PASS }
});

module.exports = transport