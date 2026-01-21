import { Module } from '@nestjs/common';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    // Define the Rate Limit: 3 requests per 60 seconds
    ThrottlerModule.forRoot([{
      ttl: 60000, // Time to live (ms)
      limit: 3,   // Max requests per TTL
    }]),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // This applies the rate limit to ALL endpoints automatically
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}