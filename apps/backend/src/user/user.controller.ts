import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('')
  findOne(@Req() request: any) {
    if (request.user.email)
      return this.userService.findOne(request.user.email as any);
    return {};
  }

  @Patch('')
  update(@Req() request: any, @Body() updateUserDto: UpdateUserDto) {
    console.log(updateUserDto);
    if (!request.user.email || Object.keys(updateUserDto).length === 0) return;
    return this.userService.update(request.user.email, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
