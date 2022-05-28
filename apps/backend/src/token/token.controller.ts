import { Controller, Get, Post, Param, Delete, Req } from '@nestjs/common';
import { TokenService } from './token.service';

@Controller('token')
export class TokenController {
  constructor(private readonly tokenService: TokenService) {}

  @Post()
  create(@Req() req: any) {
    if (req.user.email) return this.tokenService.create(req.user.email);
    return {};
  }

  @Get('')
  findOne(@Req() req: any) {
    return this.tokenService.findOne(req.user.email);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tokenService.remove(+id);
  }
}
