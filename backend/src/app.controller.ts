import { Controller, Post, Body, Ip, Logger, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('sos')
export class AppController {
  private readonly logger = new Logger(AppController.name);

  constructor(private readonly appService: AppService) {}

  @Post('start-session')
  async startSession(@Ip() ip: string, @Query('type') userType: string) {
    // Default to 'visitor' if no type is provided
    const type = userType === 'admin' ? 'admin' : 'visitor';
    
    this.logger.log(`Session Request (${type}) from IP: ${ip}`);
    
    // Pass the type to the service
    return this.appService.createSession(type);
  }
}