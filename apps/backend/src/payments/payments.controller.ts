import { Controller, Get, Post, Body, Patch, Param, Req } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('/onGoing/')
  create(@Req() request: any, @Body() createPaymentDto: CreatePaymentDto) {
    console.log(request.token, createPaymentDto);
    return this.paymentsService.create(request.token, createPaymentDto.amount);
  }

  @Get(':publicKey')
  findAll(@Param('publicKey') publicKey: string) {
    return this.paymentsService.findAll(publicKey);
  }

  @Get('/onGoing/:id')
  findOne(@Param('id') id: string) {
    return this.paymentsService.findOne(id);
  }

  @Patch('/onGoing/:id')
  update(@Param('id') id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
    console.log(updatePaymentDto);
    return this.paymentsService.update(id, updatePaymentDto);
    // throw new Error('required data not provided');
  }
}
