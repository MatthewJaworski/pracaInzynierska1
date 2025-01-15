import { Injectable } from '@nestjs/common';

@Injectable()
export class BffService {
  constructor() {}

  getHealth(): string {
    return 'OK';
  }
}
