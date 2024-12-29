import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';

import {
  IServiceReservation,
  ReservationDto,
  ReservationSearchOptions,
} from './entities/reservation.entity';
import {
  Reservation,
  ReservationDocument,
} from './entities/schemas/reservation.schema';

@Injectable()
export class ReservationService implements IServiceReservation {
  constructor(
    @InjectModel(Reservation.name)
    private readonly ReservationModel: Model<ReservationDocument>,
    @InjectConnection() private readonly connection: Connection,
  ) {}

  addReservation(data: ReservationDto): Promise<Reservation> {
    const reservation = new this.ReservationModel(data);
    return reservation.save();
  }

  getReservations({
    userId,
    dateStart,
    dateEnd,
  }: ReservationSearchOptions): Promise<Reservation[]> {
    return this.ReservationModel.find({ userId, dateStart, dateEnd })
      .select('-__v')
      .exec();
  }

  removeReservation(id: string): Promise<void> {
    return this.ReservationModel.findOneAndDelete({ _id: id });
  }
}
