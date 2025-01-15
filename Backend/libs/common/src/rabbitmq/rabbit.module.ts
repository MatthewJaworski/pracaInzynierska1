import { DynamicModule, Module } from '@nestjs/common';
import { RabbitService } from './rabbit.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

interface RabbitModuleOptions {
  name: string;
}

@Module({
  providers: [RabbitService],
  exports: [RabbitService],
})
export class RabbitModule {
  static register({ name }: RabbitModuleOptions): DynamicModule {
    return {
      module: RabbitModule,
      imports: [
        ClientsModule.registerAsync([
          {
            name,
            useFactory: (configService: ConfigService) => ({
              transport: Transport.RMQ,
              options: {
                urls: [configService.get<string>('RABBITMQ_URL')],
                queue: configService.get<string>(`RABBITMQ_${name}_QUEUE`),
              },
            }),
            inject: [ConfigService],
          },
        ]),
      ],
      exports: [ClientsModule],
    };
  }
}
