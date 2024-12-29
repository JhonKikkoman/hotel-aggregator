import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Hotel, HotelSchema } from './entities/schemas/schema.hotel';
import {
  HotelRoom,
  HotelRoomSchema,
} from './entities/schemas/schema.hotel-room';
import { HotelRoomController } from './hotel-room.controller';
import { HotelRoomService } from './hotel-room.service';
import { HotelController } from './hotel.controller';
import { HotelService } from './hotel.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Hotel.name, schema: HotelSchema },
      { name: HotelRoom.name, schema: HotelRoomSchema },
    ]),
  ],
  controllers: [HotelController, HotelRoomController],
  providers: [HotelService, HotelRoomService],
})
export class HotelModule {}
