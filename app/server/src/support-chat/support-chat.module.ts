import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ChatGateway } from './chat-gateway';
import { Message, MessageSchema } from './entities/schemas/message.shema';
import {
  SupportRequest,
  SupportRequestSchema,
} from './entities/schemas/request-support.schema';
import { RequestSupportService } from './request-support.service';
import { SupportRequestClientService } from './support-request-client.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SupportRequest.name, schema: SupportRequestSchema },
      { name: Message.name, schema: MessageSchema },
    ]),
  ],
  providers: [ChatGateway, RequestSupportService, SupportRequestClientService],
})
export class SupportChatModule {}
