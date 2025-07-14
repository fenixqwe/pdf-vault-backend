const {createTransport} = require("nodemailer");
const {readFileSync} = require("node:fs");
const path = require("path");
const {compile} = require("handlebars");

class MailService {
    constructor() {
        this.transporter = createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        });
    }

    async sendToMail(mailOptions) {
        const source = readFileSync(path.join(__dirname, mailOptions.template), "utf8");
        const compiledTemplate = compile(source);

        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to: mailOptions.to,
            subject: mailOptions.subject,
            text: mailOptions.text,
            html: compiledTemplate(mailOptions.payload)
        });
    }
}

module.exports = new MailService();