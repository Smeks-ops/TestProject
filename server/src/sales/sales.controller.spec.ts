import { Test, TestingModule } from '@nestjs/testing';
import { SalesService } from './sales.service';
import { SalesController } from './sales.controller';
import { PrismaService } from 'nestjs-prisma';
import { ModeOfDeliveryEnum } from './enums/sales.enums';

describe('SalesController', () => {
  let controller: SalesController;
  let service: SalesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SalesController],
      providers: [
        {
          provide: SalesService,
          useValue: {
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<SalesController>(SalesController);
    service = module.get<SalesService>(SalesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('it should create a sales entry and should return the created sales', async () => {
      const sales = {
        id: 'cle6utyi9000tya2fuf9vksib',
        amount: 10,
        orderId: 'cle6yzvja0000yanfh5so53dc',
        quantity: 1,
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

      jest.spyOn(service, 'create').mockResolvedValue(result);

      expect(await controller.create(sales)).toEqual(result);
    });
  });
});
