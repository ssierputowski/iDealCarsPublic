import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../environments/environment';

import { Message } from '../models/message.model';

const BACKEND_URL = environment.apiUrl + '/messages';

@Injectable({providedIn: 'root'})
export class MessageService {

  private messages: Message[] = [];
  private messagesUpdatedListener = new Subject<{messages: Message[]}>();

  constructor(private http: HttpClient) { }

  getMessages() {
    this.http.get<{response: string, messages: any}>(BACKEND_URL).pipe(map((messageData) => {
      return { messages: messageData.messages.map(message => {
        return {
          message: message,
        };
      })
    };
    }))
    .subscribe((updatedMessageData) => {
      this.messages = updatedMessageData.messages;
      this.messagesUpdatedListener.next({messages: [...this.messages]});
    });
  }

  getUpdatedMessages() {
    return this.messagesUpdatedListener.asObservable();
  }

  postMessage(message: string) {
    const messageData: Message = {
      message: message,
    };
    this.http.post(BACKEND_URL, messageData)
      .subscribe((response) => {
        console.log(response);
      });
  }
}
