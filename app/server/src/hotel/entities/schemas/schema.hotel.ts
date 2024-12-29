import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type HotelDocument = Document & Hotel;

@Schema()
export class Hotel {
  @Prop({ required: true })
  public title: MongooseSchema.Types.ObjectId;

  @Prop()
  public description: string;

  @Prop({ required: true })
  public createdAt: MongooseSchema.Types.Date;

  @Prop({ required: true })
  public updatedAt: MongooseSchema.Types.Date;
}

export const HotelSchema = SchemaFactory.createForClass(Hotel);
