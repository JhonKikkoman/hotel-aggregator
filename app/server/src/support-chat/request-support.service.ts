import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';

import {
  GetChatListParams,
  ISupportRequestService,
  SendMessageDto,
} from './entities/request-support.entity';
import { Message, MessageDocument } from './entities/schemas/message.shema';
import {
  SupportRequest,
  SupportRequestDocument,
} from './entities/schemas/request-support.schema';

@Injectable()
export class RequestSupportService implements ISupportRequestService {
  constructor(
    @InjectModel(SupportRequest.name)
    private readonly SupportRequestModel: Model<SupportRequestDocument>,
    @InjectModel(Message.name)
    private readonly MessageModel: Model<MessageDocument>,
    @InjectConnection() private readonly connection: Connection,
  ) {}

  findSupportRequests({
    user,
    isActive,
  }: GetChatListParams): Promise<SupportRequest[]> {
    return this.SupportRequestModel.find({ user }).select('-__v').exec();
  }

  sendMessage({ author, text }: SendMessageDto): Promise<Message> {
    const sentAt = new Date();
    const message = new this.MessageModel({
      author,
      sentAt,
      text,
    });
    console.log('from sendMessage', message);
    return;
  }

  getMessages(id: string): Promise<Message[]> {
    return this.MessageModel.find({ _id: id }).select('-__v').exec();
  }
  subscribe(
    handler: (supportRequest: SupportRequest, message: Message) => void,
  ): () => void {
    return;
  }
}
