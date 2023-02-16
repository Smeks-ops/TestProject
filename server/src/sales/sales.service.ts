import { BadRequestException, Injectable, Res } from '@nestjs/common';
import { CreateSalesDto } from './dto/create-sales.dto';
import { PrismaService } from 'nestjs-prisma';
import { UpdateSalesDto } from './dto/update-sales.dto';

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
        throw new BadRequestException('Sales already exists');
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
    try {
      const sales = await this.prisma.sales.findMany({
        where: {
          status: true,
        },
        include: {
          order: true,
        },
      });

      if (!sales) {
        throw new BadRequestException('No sales found');
      }

      return {
        data: sales,
        message: 'Sales fetched successfully',
      };
    } catch (error: any) {
      throw new BadRequestException(error.message);
    }
  }

  async findOne(id: string) {
    try {
      const sales = await this.prisma.sales.findFirst({
        where: {
          id,
          status: true,
        },
      });

      if (!sales) {
        throw new BadRequestException(`Sale with id ${id} not found`);
      }
      return {
        data: sales,
        message: 'Sales fetched successfully',
      };
    } catch (error: any) {
      throw new BadRequestException(error.message);
    }
  }

  async update(id: string, updateSalesDto: UpdateSalesDto) {
    try {
      const Exists = await this.prisma.sales.findFirst({
        where: {
          id,
          status: true,
        },
      });

      if (!Exists) {
        throw new BadRequestException(`Sales with id ${id} not found`);
      }

      const updatedSales = await this.prisma.sales.update({
        where: {
          id,
        },
        data: {
          ...updateSalesDto,
        },
      });

      return {
        data: updatedSales,
        message: 'Sales updated successfully',
      };
    } catch (error: any) {
      throw new BadRequestException(error.message);
    }
  }

  async delete(id: string) {
    try {
      const Exists = await this.prisma.sales.findFirst({
        where: {
          id,
        },
      });

      if (!Exists) {
        throw new BadRequestException(`Sales with id ${id} not found`);
      }

      const deletedSales = await this.prisma.sales.update({
        where: {
          id,
        },
        data: {
          status: false,
        },
      });

      return {
        data: deletedSales,
        message: 'Sales deleted successfully',
      };
    } catch (error: any) {
      throw new BadRequestException(error.message);
    }
  }
}
