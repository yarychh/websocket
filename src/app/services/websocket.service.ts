import { Injectable } from '@angular/core';
import { MessageDto } from '../constants/message.dto';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private webSocket!: WebSocket;

  public chatMessages: MessageDto[] = [];

  constructor() {}

  public openWebSocket(): void {
    this.webSocket = new WebSocket('ws://localhost:3000');

    this.webSocket.onopen = (event) => {
      console.log('open', event);
    };

    this.webSocket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      this.chatMessages.push(message);
    };

    this.webSocket.onclose = (event) => {
      console.log('close', event);
    };
  }

  public sendMessage(message: MessageDto): void {
    this.webSocket.send(JSON.stringify(message));
  }

  public closeWebSocket(): void {
    this.webSocket.close();
  }
}
