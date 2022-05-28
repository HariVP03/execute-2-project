import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findOne(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      return this.prisma.user.create({ data: { email, name: '' } });
    }
    return user;
  }

  async update(email: string, updateUserDto: UpdateUserDto) {
    return await this.prisma.user.update({
      where: { email },
      data: updateUserDto,
    });
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
