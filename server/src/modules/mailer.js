const nodemailer = require('nodemailer')

const { MAILER_HOST, MAILER_PORT, MAILER_USER, MAILER_PASS} = process.env;

const transport = nodemailer.createTransport({
    MAILER_HOST,
    MAILER_PORT,
    auth: { MAILER_USER, MAILER_PASS }
});


module.exports = transport