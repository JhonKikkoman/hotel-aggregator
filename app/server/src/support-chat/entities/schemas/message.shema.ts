import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type MessageDocument = Document & Message;

@Schema()
export class Message {
  @Prop({ required: true })
  public author: MongooseSchema.Types.ObjectId;

  @Prop({ required: true })
  public sentAt: MongooseSchema.Types.Date;

  @Prop({ required: true })
  public text: string;

  @Prop()
  public readAt: MongooseSchema.Types.Date;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
