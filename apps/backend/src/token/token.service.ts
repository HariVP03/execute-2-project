import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class TokenService {
  constructor(private prisma: PrismaService) {}
  async create(email: string) {
    const token = uuidv4();
    return await this.prisma.token.update({
      where: { email },
      data: { token },
    });
  }

  async findOne(email: string) {
    const token = await this.prisma.token.findUnique({ where: { email } });
    if (!token) {
      const token = uuidv4();
      return await this.prisma.token.create({
        data: { token, email },
      });
    }
    return token;
  }

  remove(id: number) {
    return `This action removes a #${id} token`;
  }
}
