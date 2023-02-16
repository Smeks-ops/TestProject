
import { Module, RequestMethod } from '@nestjs/common';
import { SalesService } from './sales.service';
import { SalesController } from './sales.controller';
import { PrismaService } from 'nestjs-prisma';
import { AuthModule } from '../auth/auth.module';

@Module({
    controllers: [SalesController],
    providers: [SalesService, PrismaService],
})
export class SalesModule {}

