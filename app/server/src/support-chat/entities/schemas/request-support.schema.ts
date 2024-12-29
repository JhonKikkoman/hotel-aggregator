import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

import { Message } from './message.shema';

export type SupportRequestDocument = SupportRequest & Document;

@Schema()
export class SupportRequest {
  @Prop({ required: true })
  public user: MongooseSchema.Types.ObjectId;

  @Prop({ required: true })
  public createdAt: MongooseSchema.Types.Date;

  @Prop()
  public messages: Message[];

  @Prop()
  public isActive: boolean;
}
export const SupportRequestSchema =
  SchemaFactory.createForClass(SupportRequest);
