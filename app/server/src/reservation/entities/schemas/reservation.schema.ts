import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type ReservationDocument = Document & Reservation;

@Schema()
export class Reservation {
  @Prop({ required: true })
  public userId: MongooseSchema.Types.ObjectId;

  @Prop({ required: true })
  public hotelId: MongooseSchema.Types.ObjectId;

  @Prop({ required: true })
  public roomId: MongooseSchema.Types.ObjectId;

  @Prop({ required: true })
  public dateStart: MongooseSchema.Types.Date;

  @Prop({ required: true })
  public dateEnd: MongooseSchema.Types.Date;
}

export const ReservationSchema = SchemaFactory.createForClass(Reservation);
