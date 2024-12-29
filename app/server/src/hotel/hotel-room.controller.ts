import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

import { SearchRoomsParams } from './entities/hotel-room.entity';
import { UpdateHotelParams } from './entities/hotel.entity';
import { HotelRoomService } from './hotel-room.service';

@Controller('hotel/room')
export class HotelRoomController {
  constructor(private readonly hoteRoomService: HotelRoomService) {}

  @Post()
  create(@Body() createHotelDto: any) {
    return this.hoteRoomService.create(createHotelDto);
  }

  @Get()
  findAll(@Query() { limit, offset, hotel, isEnabled }: SearchRoomsParams) {
    return this.hoteRoomService.search({ limit, offset, hotel, isEnabled });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hoteRoomService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHotelDto: UpdateHotelParams) {
    return this.hoteRoomService.update(id, updateHotelDto);
  }
}
