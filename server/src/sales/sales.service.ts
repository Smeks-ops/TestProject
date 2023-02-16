import { BadRequestException, Injectable, Res } from '@nestjs/common';
import { CreateSalesDto } from './dto/create-sales.dto';
import { request } from 'express';
// import { PrismaService } from "../../prisma/prisma.service";
import { Prisma, Product, Order, prisma } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { OrderFindUniqueArgs } from '../order/base/OrderFindUniqueArgs';

@Injectable()
export class SalesService {
  constructor(protected readonly prisma: PrismaService) {}

  async create(createSalesDto: CreateSalesDto) {
    try {
      const {
        amount,
        deliveryDate,
        modeOfDelivery,
        modeOfPayment,
        orderId,
        paymentDate,
        paymentStatus,
        quantity,
      } = createSalesDto;

      const order = await this.prisma.order.findUnique({
        where: {
          id: orderId,
        },
      });

      if (!order) {
        throw new BadRequestException('Order not found');
      }

      const Exists = await this.prisma.sales.findFirst({
        where: {
          orderId: orderId,
        },
      });

      if (Exists) {
        throw new Error('Sales already exists');
      }

      const sales = await this.prisma.sales.create({
        data: {
          amount,
          deliveryDate,
          modeOfDelivery,
          modeOfPayment,
          orderId,
          paymentDate,
          paymentStatus,
          quantity,
        },
      });

      return {
        data: sales,
        message: 'Sales created successfully',
      };
    } catch (error: any) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll() {
    return `This action returns all sales`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} sales`;
  }

  async update(id: number, updateSalesDto: CreateSalesDto) {
    return `This action updates a #${id} sales`;
  }

  async remove(id: number) {
    return `This action removes a #${id} sales`;
  }
}
