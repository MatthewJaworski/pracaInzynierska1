import { Controller } from '@nestjs/common';
import { EventPattern, Payload, Ctx, RmqContext } from '@nestjs/microservices';
import { EmailService } from './email.service';

@Controller()
export class EmailController {
  constructor(private readonly emailService: EmailService) {}
  @EventPattern('send_email')
  async handleSendEmail(@Payload() data: any, @Ctx() context: RmqContext) {
    await this.emailService.sendMail(data, context);
  }
}
