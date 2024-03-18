import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import * as siofu from 'socketio-file-upload';

@WebSocketGateway(4000, {cors: 'localhost:3000'})
export class FileGateway implements OnGatewayConnection, OnGatewayDisconnect{
  @WebSocketServer() server: Server;

  handleConnection(client: Socket) {
    const socketId = client.id;
    console.log(socketId);
  }
  handleDisconnect(client: any) {
    console.log(`${client.id}님이 퇴장 하였습니다.`);
  }

  @SubscribeMessage('message')
  handleMessge(client: any, payload: any): string {
    this.server.emit('message', client.id);
    return 'Hello world!';
  }

  @SubscribeMessage('fileUpload')
  handleUpload(client: any, payload: any){
    // console.log(client);
    console.log(payload);
  }
  
}
