import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private configServise: ConfigService) {}
  getHello(): string {
    return 'Hello World!';
  }
}
