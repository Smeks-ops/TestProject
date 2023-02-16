import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UsePipes,
  HttpCode,
  Patch,
  Delete,
} from '@nestjs/common';
import { SalesService } from './sales.service';
import { CreateSalesDto } from './dto/create-sales.dto';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';
import * as swagger from '@nestjs/swagger';
import { UpdateSalesDto } from './dto/update-sales.dto';

@swagger.ApiTags('sales')
@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  @HttpCode(201)
  create(@Body() createSalesDto: CreateSalesDto) {
    return this.salesService.create(createSalesDto);
  }

  @Get()
  @HttpCode(201)
  findAll() {
    return this.salesService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  findOne(@Param('id') id: string) {
    return this.salesService.findOne(id);
  }

  @Patch(':id')
  @HttpCode(200)
  update(@Param('id') id: string, @Body() updateSalesDto: UpdateSalesDto) {
    return this.salesService.update(id, updateSalesDto);
  }

  @Delete(':id')
  @HttpCode(200)
  remove(@Param('id') id: string) {
    return this.salesService.delete(id);
  }
}
