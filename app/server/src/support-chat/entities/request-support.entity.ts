import { Message } from './schemas/message.shema';
import { SupportRequest } from './schemas/request-support.schema';

export interface SendMessageDto {
  author: string;
  supportRequest: string;
  text: string;
}

export interface GetChatListParams {
  user: string | null;
  isActive: boolean;
}

export interface ISupportRequestService {
  findSupportRequests(params: GetChatListParams): Promise<SupportRequest[]>;
  sendMessage(data: SendMessageDto): Promise<Message>;
  getMessages(supportRequest: string): Promise<Message[]>;
  subscribe(
    handler: (supportRequest: SupportRequest, message: Message) => void,
  ): () => void;
}
