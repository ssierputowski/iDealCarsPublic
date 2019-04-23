import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Router, CanActivate } from '@angular/router';
import { Subject, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';


import { environment } from '../../environments/environment';

import { User } from '../../models/user.model';
import { AuthData } from './auth-data.model';

const BACKEND_URL = environment.apiUrl + '/user';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private isAuthenticated = false;
  private token: string;
  private tokenTimer: NodeJS.Timer;
  private authStatusListener = new Subject<boolean>();
  private currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));

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

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
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
    const authData: AuthData = { username: username, password: password };
    return this.http.post<any>(BACKEND_URL + '/login', authData)
      .pipe(map(user => {
        // login successful if there's a jwt token in the response
        if (user && user.token) {
          // store user details and jwt token in local storage
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          const expiresIn = user.expiresIn;
          const employeeId = user.userId;
          this.setAuthTimer(expiresIn);
          this.isAuthenticated = true;
          this.authStatusListener.next(true);
          const now = new Date();
          const expDate = new Date(now.getTime() + expiresIn * 1000);
          this.saveAuthData(user.token, expDate, employeeId);
        }

        return user;
      }));
  }

  autoAuthUser() {
    const authInfo = this.getAuthData();
    if (!authInfo) {
      return;
    }
    const now = new Date();
    const expiresIn = authInfo.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInfo.token;
      this.isAuthenticated = true;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  private setAuthTimer(duration: number) {
    // console.log('Setting timer: ', duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/']);
  }

  private saveAuthData(token: string, expirationDate: Date, employeeId: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('employeeId', employeeId);
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('employeeId');
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    if (!token && !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate)
    };
  }
}
