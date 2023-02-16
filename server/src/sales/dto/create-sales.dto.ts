import { InputType, Field } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsNumber,
  ValidateNested,
  IsDefined,
  IsNotEmpty,
  IsIn,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ModeOfDeliveryEnum } from '../enums/sales.enums';

export class CreateSalesDto {
  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @IsNotEmpty({ message: 'Order ID is required' })
  @Field(() => String, {
    nullable: true,
  })
  orderId?: string | undefined;

  @ApiProperty({
    required: true,
    type: Number,
  })
  @IsNumber()
  @IsNotEmpty({ message: 'Amount is required' })
  @Field(() => Number, {
    nullable: true,
  })
  amount?: number | null;

  @ApiProperty({
    required: true,
    type: Number,
  })
  @IsNumber()
  @IsNotEmpty({ message: 'Quantity is required' })
  @Field(() => Number, {
    nullable: true,
  })
  quantity?: number | null;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  deliveryDate?: string | null;

    @ApiProperty({
    required: true,
    type: String,
    })
    @IsString()
    @IsNotEmpty({ message: 'Mode of Payment is required' })
    @Field(() => String, {
    nullable: true,
    })
    modeOfPayment?: string | null;

    @ApiProperty({
    required: true,
    type: String,
    })
    @IsString()
    @IsNotEmpty({ message: 'Payment Status is required' })
    @Field(() => String, {
    nullable: true,
    })
    paymentStatus?: string | null;

    @ApiProperty({
    required: true,
    type: String,
    })
    @IsString()
    @IsNotEmpty({ message: 'Payment Date is required' })
    @Field(() => String, {
    nullable: true,
    })
    paymentDate?: string | null;

    @ApiProperty({
    required: true,
    type: String,
    enum: [ModeOfDeliveryEnum.COURIER, ModeOfDeliveryEnum.SELF],
    })
    @IsString()
    @IsNotEmpty({ message: 'Mode of Delivery is required' })
    @IsIn([
    ModeOfDeliveryEnum.COURIER,
    ModeOfDeliveryEnum.SELF,
    ])
    @Field(() => String, {
    nullable: false,
    })
    modeOfDelivery?: ModeOfDeliveryEnum;
}
