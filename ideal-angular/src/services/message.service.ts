import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from '../environments/environment';
import { Message } from '../models/message.model';
import { User } from '../models/user.model';
import { UserService } from './user.service';



const BACKEND_URL = environment.apiUrl + '/messages';

@Injectable({providedIn: 'root'})
export class MessageService {

  private messages: Message[] = [];
  private messagesUpdatedListener = new Subject<{messages: Message[]}>();

  constructor(private http: HttpClient, public userService: UserService) { }

  getMessages() {
    this.http.get<Message[]>(BACKEND_URL).subscribe(res => {
      this.messages = res;
      this.messagesUpdatedListener.next({messages: [...this.messages]});
    });
  }

  getUpdatedMessages() {
    return this.messagesUpdatedListener.asObservable();
  }

  postMessage(creator: string, date: string, content: string) {
    let user = '';
    this.userService.getUser(creator).subscribe(res => {
      user += res.firstName + ' ';
      user += res.lastName;
      const messageData: Message = {
        creator: user,
        date: date,
        content: content
      };
      this.http.post(BACKEND_URL, messageData)
        .subscribe(() => {
          this.getMessages();
        });
    });
  }
}
