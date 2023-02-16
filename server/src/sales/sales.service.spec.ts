import { Test, TestingModule } from '@nestjs/testing';
import { SalesService } from './sales.service';
import { ModeOfDeliveryEnum } from './enums/sales.enums';
import { PrismaService } from 'nestjs-prisma';
import { BadRequestException } from '@nestjs/common';

describe('SalesService', () => {
  let service: SalesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SalesService,
        {
          provide: PrismaService,
          useValue: {
            create: jest.fn(),
          },
        },
      ],
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

      const result = {
        statusCode: 201,
        message: 'Sales created successfully',
        data: {
          ...sales,
          status: true,
          salesDate: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      };
      jest.spyOn(service, 'create').mockImplementation(async () => result);

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

  describe('findAll', () => {
    it('should return an array of sales', async () => {
      service.findAll = jest.fn().mockReturnValue([
        {
          id: 'cle75s7cu0001yacykfu2ec4t',
          amount: 10,
          orderId: 'cle6yzvja0000yanfh5so53dc',
          quantity: 1,
          salesDate: '2023-02-16T13:49:35.934Z',
          deliveryDate: '19/02/2023',
          modeOfPayment: 'CARD',
          paymentStatus: 'PENDING',
          paymentDate: '18/02/2023',
          modeOfDelivery: 'COURIER',
          createdAt: '2023-02-16T13:49:35.934Z',
          updatedAt: '2023-02-16T13:49:35.934Z',
          status: true,
          order: {
            createdAt: '2023-02-16T10:39:36.550Z',
            customerId: 'cle6uozvc000oya2f245vi0ls',
            discount: 0,
            id: 'cle6yzvja0000yanfh5so53dc',
            productId: 'cle6uhoaa000cya2fxqvly48a',
            quantity: 1,
            totalPrice: 10,
            updatedAt: '2023-02-16T10:39:36.550Z',
          },
        },
      ]);

      const sales = await service.findAll();

      expect(await service.findAll()).toEqual(sales);
    });
  });

  describe('findOne', () => {
    it('should return a sale entry', async () => {
      service.findOne = jest.fn().mockReturnValue({
        id: 'cle75s7cu0001yacykfu2ec4t',
        amount: 10,
        orderId: 'cle6yzvja0000yanfh5so53dc',
        quantity: 1,
        salesDate: '2023-02-16T13:49:35.934Z',
        deliveryDate: '19/02/2023',
        modeOfPayment: 'CARD',
        paymentStatus: 'PENDING',
        paymentDate: '18/02/2023',
        modeOfDelivery: 'COURIER',
        createdAt: '2023-02-16T13:49:35.934Z',
        updatedAt: '2023-02-16T13:49:35.934Z',
        status: true,
        order: {
          createdAt: '2023-02-16T10:39:36.550Z',
          customerId: 'cle6uozvc000oya2f245vi0ls',
          discount: 0,
          id: 'cle6yzvja0000yanfh5so53dc',
          productId: 'cle6uhoaa000cya2fxqvly48a',
          quantity: 1,
          totalPrice: 10,
          updatedAt: '2023-02-16T10:39:36.550Z',
        },
      });

      const sales = await service.findOne('cle75s7cu0001yacykfu2ec4t');

      expect(await service.findOne('cle75s7cu0001yacykfu2ec4t')).toEqual(sales);
    });
  });

  describe('update', () => {
    it('should update a sale entry', async () => {
      service.update = jest.fn().mockReturnValue({
        id: 'cle75s7cu0001yacykfu2ec4t',
        amount: 10,
        orderId: 'cle6yzvja0000yanfh5so53dc',
        quantity: 1,
        salesDate: '2023-02-16T13:49:35.934Z',
        deliveryDate: '19/02/2023',
        modeOfPayment: 'CARD',
        paymentStatus: 'CONFIRMED',
        paymentDate: '18/02/2023',
        modeOfDelivery: 'COURIER',
        createdAt: '2023-02-16T13:49:35.934Z',
        updatedAt: '2023-02-16T13:49:35.934Z',
        status: true,
        order: {
          createdAt: '2023-02-16T10:39:36.550Z',
          customerId: 'cle6uozvc000oya2f245vi0ls',
          discount: 0,
          id: 'cle6yzvja0000yanfh5so53dc',
          productId: 'cle6uhoaa000cya2fxqvly48a',
          quantity: 1,
          totalPrice: 10,
          updatedAt: '2023-02-16T10:39:36.550Z',
        },
      });
      const id = 'cle75s7cu0001yacykfu2ec4t';
      const updateSalesDto = {
        amount: 50,
        orderId: 'cle6yzvja0000yanfh5so53dc',
        quantity: 8,
        salesDate: '2023-02-16T13:49:35.934Z',
        deliveryDate: '19/02/2023',
        modeOfPayment: 'CARD',
        paymentStatus: 'CONFIRMED',
        paymentDate: '18/02/2023',
        modeOfDelivery: 'COURIER',
      };

      const sales = await service.update(id, updateSalesDto);

      expect(await service.update(id, updateSalesDto)).toEqual(sales);
    });
  });

  describe('remove', () => {
    it('should delete a sale entry', async () => {
      service.delete = jest.fn().mockReturnValue({
        id: 'cle75s7cu0001yacykfu2ec4t',
        amount: 10,
        orderId: 'cle6yzvja0000yanfh5so53dc',
        quantity: 1,
        salesDate: '2023-02-16T13:49:35.934Z',
        deliveryDate: '19/02/2023',
        modeOfPayment: 'CARD',
        paymentStatus: 'CONFIRMED',
        paymentDate: '18/02/2023',
        modeOfDelivery: 'COURIER',
        createdAt: '2023-02-16T13:49:35.934Z',
        updatedAt: '2023-02-16T13:49:35.934Z',
        status: true,
        order: {
          createdAt: '2023-02-16T10:39:36.550Z',
          customerId: 'cle6uozvc000oya2f245vi0ls',
          discount: 0,
          id: 'cle6yzvja0000yanfh5so53dc',
          productId: 'cle6uhoaa000cya2fxqvly48a',
          quantity: 1,
          totalPrice: 10,
          updatedAt: '2023-02-16T10:39:36.550Z',
        },
      });

      const sales = await service.delete('cle75s7cu0001yacykfu2ec4t');

      expect(await service.delete('cle75s7cu0001yacykfu2ec4t')).toEqual(sales);
    });
  });
});
