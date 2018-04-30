import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MessageService } from '../../services/message.service';
import { InputMessage } from '../../inputMessage';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-message-form',
  templateUrl: './message-form.component.html',
  styles: []
})

export class MessageFormComponent implements OnInit {

  constructor(private messageService: MessageService,
    private loginService: LoginService,
    private router: Router) { }
    
  @Input() inputMessage: InputMessage;
  responseStatus: Object = [];

  ngOnInit() {
    this.inputMessage = new InputMessage();
    this.inputMessage.msgSummary = "";
    this.inputMessage.msgText = "";
    this.inputMessage.userId = this.loginService.getUserInfo();
  }

  onSubmit() {
    this.messageService.postMessage(this.inputMessage).subscribe(
      data => console.log(this.responseStatus = data),
      err => console.log(err)
    );
    this.router.navigate(['/api/messages']);
  }
}  