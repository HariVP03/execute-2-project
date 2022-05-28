import { PartialType } from '@nestjs/mapped-types';
import { IsString } from 'class-validator';
import { CreatePaymentDto } from './create-payment.dto';

export class UpdatePaymentDto extends PartialType(CreatePaymentDto) {
  @IsString()
  from: string;
  @IsString()
  transactionHash: string;
  @IsString()
  chain: string;
  @IsString()
  crypto: string;
  @IsString()
  cryptoAmount: string;
}
