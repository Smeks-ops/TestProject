import { Test, TestingModule } from '@nestjs/testing';
import { SalesService } from './sales.service';
import { ModeOfDeliveryEnum } from './enums/sales.enums';
import { PrismaService } from 'nestjs-prisma';
import { BadRequestException } from '@nestjs/common';

describe('SalesService', () => {
  let service: SalesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SalesService, PrismaService],
    }).compile();

    service = module.get<SalesService>(SalesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should return the created sales', async () => {
      const sales = {
        id: 'cle6utyi9000tya2fuf9vksib',
        amount: 10,
        orderId: 'cle6yzvja0000yanfh5so53dc',
        quantity: 1,
        salesDate: '2023-02-16T08:43:02.002Z',
        deliveryDate: '19/02/2023',
        modeOfPayment: 'CARD',
        paymentStatus: 'PENDING',
        paymentDate: '18/02/2023',
        modeOfDelivery: ModeOfDeliveryEnum.COURIER,
      };


      const result = await service.create(sales);

      jest.spyOn(service, 'create').mockResolvedValue(result);
      jest.enableAutomock();

      expect(await service.create(sales)).toEqual(result);
    });

    it('should throw an error if sales already exists', async () => {
      const sales = {
        id: 'cle6utyi9000tya2fuf9vksib',
        amount: 10,
        orderId: 'cle6yzvja0000yanfh5so53dc',
        quantity: 1,
        salesDate: '2023-02-16T08:43:02.002Z',
        deliveryDate: '19/02/2023',
        modeOfPayment: 'CARD',
        paymentStatus: 'PENDING',
        paymentDate: '18/02/2023',
        modeOfDelivery: ModeOfDeliveryEnum.COURIER,
      };
      const result = {
        statusCode: 400,
        message: 'Sales already exists',
        error: 'Bad Request',
      };

      jest.spyOn(service, 'create').mockRejectedValue(result);

      try {
        await service.create(sales);
      } catch (error: any) {
        expect(error.message).toEqual(result.message);
      }
    });

    it('should throw an error if order not found', async () => {
      const sales = {
        id: 'cle6utyi9000tya2fuf9vksib',
        amount: 10,
        orderId: 'fakeId',
        quantity: 1,
        salesDate: '2023-02-16T08:43:02.002Z',
        deliveryDate: '19/02/2023',
        modeOfPayment: 'CARD',
        paymentStatus: 'PENDING',
        paymentDate: '18/02/2023',
        modeOfDelivery: ModeOfDeliveryEnum.COURIER,
      };
      const result = {
        statusCode: 400,
        message: 'Order not found',
        error: 'Bad Request',
      };

      jest.spyOn(service, 'create').mockRejectedValue(result);

      try {
        await service.create(sales);
      } catch (error: any) {
        expect(error.message).toEqual(result.message);
      }
    });
  });
});
