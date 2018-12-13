import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Part } from '../models/part.model';
import { Router } from '@angular/router';

import { environment } from '../environments/environment';

const BACKEND_URL = environment.apiUrl + '/parts';

@Injectable({providedIn: 'root'})
export class PartService {
  private parts: Part[] = [];
  private partsUpdated = new Subject<{parts: Part[]}>();

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  getParts() {
    this.http
      .get<{message: string, parts: any}>(
        BACKEND_URL
      )
      .pipe(map((partData) => {
        return {
          parts: partData.parts.map(part => {
            return {
              partId: part.partId,
              name: part.name,
              description: part.description,
              price: part.price
            };
          })
        };
      }))
      .subscribe((transformedPartData) => {
        this.parts = transformedPartData.parts;
        this.partsUpdated.next({parts: [...this.parts]});
      });
  }

  getPartUpdateListener() {
    return this.partsUpdated.asObservable();
  }

  addPart(
    partId: string,
    name: string,
    description: string,
    price: string
  ) {
    const partData: Part = {
      partId: partId,
      name: name,
      description: description,
      price: price
    };
    this.http
      .post<{message: string, part: Part}>(BACKEND_URL, partData)
      .subscribe((resData) => {
        window.location.reload();
      });
  }
}
