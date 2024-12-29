import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';

import {
  IHotelService,
  SearchHotelParams,
  UpdateHotelParams,
} from './entities/hotel.entity';
import { Hotel, HotelDocument } from './entities/schemas/schema.hotel';

@Injectable()
export class HotelService implements IHotelService {
  constructor(
    @InjectModel(Hotel.name)
    private readonly HotelModel: Model<HotelDocument>,
    @InjectConnection() private readonly connection: Connection,
  ) {}

  create(data: any): Promise<Hotel> {
    const hotel = new this.HotelModel(data);
    return hotel.save();
  }

  search({ limit, offset, title }: SearchHotelParams): Promise<Hotel[]> {
    return this.HotelModel.find({ title }, null, { limit, offset })
      .select('-__v')
      .exec();
  }

  findById(id: string): Promise<Hotel> {
    return this.HotelModel.findById({ _id: id }).select('-__v').exec();
  }
  update(id: string, data: UpdateHotelParams): Promise<Hotel> {
    return this.HotelModel.findByIdAndUpdate(id, data, {
      returnDocument: 'after',
    });
  }
}
