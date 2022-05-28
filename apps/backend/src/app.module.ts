import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PrismaService } from './prisma/prisma.service';
import { TokenModule } from './token/token.module';
import { PaymentsModule } from './payments/payments.module';

@Module({
  imports: [UserModule, TokenModule, PaymentsModule],
  exports: [PrismaService],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
