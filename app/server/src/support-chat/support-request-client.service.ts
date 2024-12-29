import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';

import { Message, MessageDocument } from './entities/schemas/message.shema';
import {
  SupportRequest,
  SupportRequestDocument,
} from './entities/schemas/request-support.schema';
import {
  CreateSupportRequestDto,
  ISupportRequestClientService,
  MarkMessagesAsReadDto,
} from './entities/support-request-client.entity';

@Injectable()
export class SupportRequestClientService
  implements ISupportRequestClientService
{
  constructor(
    @InjectModel(SupportRequest.name)
    private readonly SupportRequestModel: Model<SupportRequestDocument>,
    @InjectModel(Message.name)
    private readonly MessageModel: Model<MessageDocument>,
    @InjectConnection() private readonly connection: Connection,
  ) {}

  createSupportRequest({
    user,
    text,
  }: CreateSupportRequestDto): Promise<SupportRequest> {
    const createdAt = new Date();
    const supportReq = new this.SupportRequestModel({
      user,
      createdAt,
      messages: text,
    });
    return supportReq.save();
  }

  markMessagesAsRead({
    user,
    supportRequest,
    createdBefore,
  }: MarkMessagesAsReadDto) {
    return;
  }
  getUnreadCount(supportRequest: string): Promise<Message[]> {
    return this.MessageModel.find({ _id: supportRequest });
  }
}
