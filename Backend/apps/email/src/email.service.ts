import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { RmqContext } from '@nestjs/microservices';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendMail(
    data: { to: string; subject: string; text: string },
    context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    try {
      const { to, subject, text } = data;
      await this.mailerService.sendMail({
        to,
        subject,
        text,
      });
      console.log(`Email sent to ${to}`);
      channel.ack(originalMsg);
    } catch (error) {
      console.error(`Failed to send email to ${data.to}`, error);
      channel.nack(originalMsg);
    }
  }
}
