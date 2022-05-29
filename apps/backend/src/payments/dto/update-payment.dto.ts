import { PartialType } from '@nestjs/mapped-types';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { CreatePaymentDto } from './create-payment.dto';
enum paymentStatus {
  FAILED = 'FAILED',
  SUCCESS = 'SUCCESS',
}
export class UpdatePaymentDto extends PartialType(CreatePaymentDto) {
  @IsOptional()
  @IsString()
  from: string;
  @IsOptional()
  @IsString()
  transactionHash: string;
  @IsOptional()
  @IsString()
  chain: string;
  @IsOptional()
  @IsString()
  crypto: string;
  @IsOptional()
  @IsString()
  cryptoAmount: string;
  @IsOptional()
  @IsString()
  status: 'FAILED' | 'SUCCESS';
}
