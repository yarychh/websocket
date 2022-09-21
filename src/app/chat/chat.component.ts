import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageDto } from '../constants/message.dto';
import { WebsocketService } from '../services/websocket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule]
})
export class ChatComponent implements OnInit, OnDestroy {

  public sendForm!: FormGroup;
  public messageControl: FormControl = new FormControl(null);
  public nameControl: FormControl = new FormControl(null, [Validators.required]);

  constructor(public websocket: WebsocketService) {
    this.sendForm = new FormGroup({
      message: this.messageControl,
      name: this.nameControl
    });
  }

  ngOnInit(): void {
    this.websocket.openWebSocket();
  }

  ngOnDestroy(): void {
    this.websocket.closeWebSocket();
  }

  public sendMessage(): void{
    const message = new MessageDto(this.sendForm.value.message, this.sendForm.value.name);
    this.websocket.sendMessage(message);
    this.sendForm.get('message')?.reset();
  }

}
