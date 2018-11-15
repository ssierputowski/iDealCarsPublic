import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    const userData: User = { username: username, password: password };
    this.http.post('http://localhost:3000/api/user/login', userData)
      .subscribe(res => {
        console.log(res);
      });
  }
}
