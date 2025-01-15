import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy, RmqOptions, Transport } from '@nestjs/microservices';
import { firstValueFrom, timeout } from 'rxjs';
import { Logger } from '@nestjs/common';

type ProcessRequestProps = {
  pattern: string;
  payload: any;
  service: ClientProxy;
  timeoutMs?: number;
};

@Injectable()
export class RabbitService {
  constructor(private readonly configService: ConfigService) {}
  getOptions(queue: string, noAck: boolean = true): RmqOptions {
    return {
      transport: Transport.RMQ,
      options: {
        urls: [this.configService.get<string>('RABBITMQ_URL')],
        queue: this.configService.get<string>(`RABBITMQ_${queue}_QUEUE`),
        noAck,
        persistent: true,
      },
    };
  }

  async processRequest<T>({
    pattern,
    payload,
    service,
    timeoutMs = 2000,
  }: ProcessRequestProps): Promise<T> {
    try {
      return firstValueFrom(
        service.send<T>(pattern, payload).pipe(timeout(timeoutMs)),
      );
    } catch (error) {
      Logger.error(
        `Failed to process request with pattern: ${pattern}`,
        error.message,
      );
      throw error;
    }
  }

  async processEvent({
    pattern,
    payload,
    service,
  }: ProcessRequestProps): Promise<void> {
    service.emit(pattern, payload);
  }
}
