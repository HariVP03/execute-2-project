import { Injectable } from '@nestjs/common';
import { Token } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdatePaymentDto } from './dto/update-payment.dto';

@Injectable()
export class PaymentsService {
  select = {
    user: true,
    id: true,
    amount: true,
    chain: true,
    crypto: true,
    cryptoAmount: true,
    from: true,
    status: true,
    to: true,
    transactionHash: true,
  };
  constructor(private prisma: PrismaService) {}
  async create(token: Token, amount: string) {
    const user = await this.prisma.user.findUnique({
      where: { email: token.email },
      select: { publicKey: true },
    });

    const payment = await this.prisma.payment.create({
      data: { amount, to: user.publicKey },
      select: this.select,
    });
    return payment;
  }

  async findAll(publicKey: string) {
    const payements = await this.prisma.payment.findMany({
      where: { to: publicKey },
    });
    return payements;
  }

  async findOne(id: string) {
    const payment = await this.prisma.payment.findUnique({
      where: { id },
      select: this.select,
    });
    return payment;
  }

  async update(id: string, updatePaymentDto: UpdatePaymentDto) {
    const payment = await this.prisma.payment.update({
      where: { id },
      select: this.select,
      data: updatePaymentDto,
    });
    return payment;
  }

  remove(id: string) {
    return `This action removes a #${id} payment`;
  }
}
