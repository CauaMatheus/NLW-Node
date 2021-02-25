import nodemailer, { Transporter } from 'nodemailer';
import handlebars from 'handlebars';
import fs from 'fs';

interface Variables {
  to: string,
  subject: string,
  description: string,
  userId: string
}
class SendMailService {
  private client: Transporter

  constructor() {
    nodemailer.createTestAccount().then((account) => {
      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });
      this.client = transporter;
    });
  }

  async execute(variables: Variables, path: string) {
    const {
      to, subject, description, userId,
    } = variables;
    const templateFileContent = fs.readFileSync(path).toString('utf8');
    const mailTemplateParse = handlebars.compile(templateFileContent);

    const html = mailTemplateParse({
      name: to, title: subject, description, userId,
    });

    const message = await this.client.sendMail({
      from: 'NPS <noreply@nps.com.br>',
      to,
      subject,
      html,
    });
    console.log('Message sent: %s', message.messageId); // eslint-disable-line
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message)); // eslint-disable-line
  }
}
const sendMailService = new SendMailService();
export default sendMailService;
