import { MiddlewareConsumer, Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { TokenAuthMiddleware } from 'src/token-auth.middleware';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [PaymentsController],
  providers: [PaymentsService, PrismaService],
})
export class PaymentsModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TokenAuthMiddleware).forRoutes('payments/onGoing/*');
  }
}
