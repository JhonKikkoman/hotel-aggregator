import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

import { RequestSupportService } from './request-support.service';
import { SupportRequestClientService } from './support-request-client.service';

@WebSocketGateway(3020, { cors: { origin: '*' } })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private readonly requestSupport: RequestSupportService,
    private readonly supportRequestClient: SupportRequestClientService,
  ) {}

  @WebSocketServer() server: Server;

  @SubscribeMessage('request-support')
  handleMessage({ id }: Socket, message: any) {
    const requestId = this.supportRequestClient.createSupportRequest({
      user: id,
      text: message,
    });
    console.log(requestId);
    this.requestSupport.sendMessage({
      supportRequest: '', // что тут ?
      author: '', // что тут ??
      text: message,
    });
    this.server.emit('message', message);
  }

  handleConnection(client: Socket) {
    client.broadcast.emit('user-joined', `user join ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    client.broadcast.emit('user-left', `user left ${client.id}`);
  }
}
