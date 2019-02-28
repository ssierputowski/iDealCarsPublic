import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../models/user.model';

import { environment } from '../environments/environment';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

const BACKEND_URL = environment.apiUrl + '/user';

@Injectable({ providedIn: 'root' })
export class UserService {
  private users: any[] = [];
  private usersUpdated = new Subject<{users: any[]}>();

  constructor(
    private http: HttpClient,
  ) {}

  getUsers() {
    this.http.get<{message: string, users: any}>(
      BACKEND_URL
    )
    .pipe(map((userData) => {
      return {
        users: userData.users.map(user => {
          return {
            employeeId: user._id,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            emailAddress: user.emailAddress,
            phoneNumber: user.phoneNumber,
            jobRole: user.jobRole
          };
        })
      };
    }))
    .subscribe((transformedUserData) => {
      this.users = transformedUserData.users;
      this.usersUpdated.next({users: [...this.users]});
    });
  }

  getUserUpdateListener() {
    return this.usersUpdated.asObservable();
  }

  getUser(id: string) {
    return this.http.get<{ user: any }>(BACKEND_URL + '/' + id);
  }
}
