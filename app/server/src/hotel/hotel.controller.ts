import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

import { SearchHotelParams, UpdateHotelParams } from './entities/hotel.entity';
import { HotelService } from './hotel.service';

@Controller('hotel')
export class HotelController {
  constructor(private readonly hotelService: HotelService) {}

  @Post()
  create(@Body() createHotelDto: any) {
    return this.hotelService.create(createHotelDto);
  }

  @Get()
  findAll(@Query() { limit, offset, title }: SearchHotelParams) {
    return this.hotelService.search({ limit, offset, title });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hotelService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHotelDto: UpdateHotelParams) {
    return this.hotelService.update(id, updateHotelDto);
  }
}
