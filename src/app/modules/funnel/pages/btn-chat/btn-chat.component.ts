import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-btn-chat',
  templateUrl: './btn-chat.component.html',
  styleUrls: ['./btn-chat.component.scss']
})
export class BtnChatComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  goChat(){
    window.open("https://chat.whatsapp.com/It7Bdndurzr1BqpPUbT6Tw");
  }
}
