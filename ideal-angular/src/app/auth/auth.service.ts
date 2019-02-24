import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { User } from '../../models/user.model';
import { Subject } from 'rxjs';

import { environment } from '../../environments/environment';

const BACKEND_URL = environment.apiUrl + '/user';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private isAuthenticated = false;
  private token: string;
  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) { }

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  createUser(
    username: string,
    password: string,
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    jobRole: string,
    image: File
  ) {
    const userData = new FormData();
    userData.append('username', username);
    userData.append('password', password);
    userData.append('firstName', firstName);
    userData.append('lastName', lastName);
    userData.append('email', email);
    userData.append('phoneNumber', phoneNumber);
    userData.append('jobRole', jobRole);
    userData.append('image', image, image.name);
    this.http.post(BACKEND_URL + '/register', userData)
      .subscribe(res => {
        console.log(res);
      });
  }

  login(username: string, password: string) {
    const userData: User = { username: username, password: password };
    this.http.post<{token: string}>(BACKEND_URL + '/login', userData)
      .subscribe(res => {
        const token = res.token;
        this.token = token;
        if (token) {
          this.isAuthenticated = true;
          this.authStatusListener.next(true);
          this.router.navigate(['/home']);
        }
      });
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.router.navigate(['/']);
  }
}
