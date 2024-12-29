import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, Document, Schema as MongooseSchema } from 'mongoose';

export type HotelRoomDocument = Document & HotelRoom;

@Schema()
export class HotelRoom {
  @Prop({ required: true, unique: true })
  public hotel: [{ type: MongooseSchema.Types.ObjectId; ref: 'Hotel' }];

  @Prop()
  public description: string;

  @Prop({ default: [] })
  public images: string[];

  @Prop({ required: true })
  public createdAt: MongooseSchema.Types.Date;

  @Prop({ required: true })
  public updatedAt: MongooseSchema.Types.Date;

  @Prop({ required: true, default: true })
  public isEnabled: boolean;
}

export const HotelRoomSchema = SchemaFactory.createForClass(HotelRoom);
