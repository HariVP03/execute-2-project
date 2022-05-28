import { IsString, isString } from 'class-validator';

export class CreateTokenDto {
  @IsString()
  public token: string;
  @IsString()
  public userId: string;
}
