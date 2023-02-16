import {
  Controller,
  Get,
  Post,
  Body,
  // Patch,
  Param,
  // Delete,
  UsePipes,
  HttpCode,
} from '@nestjs/common';
import { SalesService } from './sales.service';
import { CreateSalesDto } from './dto/create-sales.dto';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';
import * as swagger from '@nestjs/swagger';

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

  /*   @Get()
        findAll() {
            return this.salesService.findAll();
        }
    
        @Get(':id')
        findOne(@Param('id') id: string) {
            return this.salesService.findOne(+id);
        } */

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateSalesDto: UpdateSalesDto) {
  //   return this.salesService.update(+id, updateSalesDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.salesService.remove(+id);
  // }
}
