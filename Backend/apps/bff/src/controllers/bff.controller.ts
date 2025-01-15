import { Controller, Get } from '@nestjs/common';
import { BffService } from '../bff.service';

@Controller('/api')
export class BffController {
  constructor(private readonly bffService: BffService) {}

  @Get('/health')
  health(): string {
    return this.bffService.getHealth();
  }
}
