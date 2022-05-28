import { PartialType } from '@nestjs/mapped-types';
import { IsEmpty, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  public name?: string;
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public logo?: string;
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public publicKey?: string;
}
