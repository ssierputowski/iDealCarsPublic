import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../models/user.model';

import { environment } from '../environments/environment';

const BACKEND_URL = environment.apiUrl + '/user';

@Injectable({ providedIn: 'root' })
export class UserService {

  constructor(
    private http: HttpClient,
  ) {}

  getUser(id: string) {
    return this.http.get<{ user: any }>(BACKEND_URL + '/' + id);
  }
}
