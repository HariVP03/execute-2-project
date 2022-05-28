import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { TokenService } from './token.service';
import { CreateTokenDto } from './dto/create-token.dto';
import { UpdateTokenDto } from './dto/update-token.dto';

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
