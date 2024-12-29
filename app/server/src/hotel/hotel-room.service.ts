import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';

import {
  IHotelRoomService,
  SearchRoomsParams,
} from './entities/hotel-room.entity';
import {
  HotelRoom,
  HotelRoomDocument,
} from './entities/schemas/schema.hotel-room';

@Injectable()
export class HotelRoomService implements IHotelRoomService {
  constructor(
    @InjectModel(HotelRoom.name)
    private readonly HotelRoomModel: Model<HotelRoomDocument>,
    @InjectConnection() private readonly connection: Connection,
  ) {}

  create(data: any): Promise<HotelRoom> {
    const hotel = new this.HotelRoomModel(data);
    return hotel.save();
  }

  search({
    limit,
    offset,
    hotel,
    isEnabled,
  }: SearchRoomsParams): Promise<HotelRoom[]> {
    return isEnabled === undefined
      ? this.HotelRoomModel.find({ hotel }, null, { limit, offset })
          .select('-__v')
          .exec()
      : this.HotelRoomModel.find({ hotel, isEnabled }, null, { limit, offset })
          .select('-__v')
          .exec();
  }
  findById(id: string): Promise<HotelRoom> {
    return this.HotelRoomModel.findById({ _id: id }).select('-__v').exec();
  }

  update(id: string, data: Partial<HotelRoom>): Promise<HotelRoom> {
    return this.HotelRoomModel.findByIdAndUpdate(id, data, {
      returnDocument: 'after',
    });
  }
}
