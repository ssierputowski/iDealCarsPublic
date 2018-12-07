import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Customer } from '../models/customer.model';
import { Router } from '@angular/router';

import { environment } from '../environments/environment';

const BACKEND_URL = environment.apiUrl + '/customers';

@Injectable({providedIn: 'root'})
export class CustomerService {
  private customers: Customer[] = [];
  private customersUpdated = new Subject<{customers: Customer[]}>();

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  getCustomers() {
    this.http
      .get<{message: string, customers: any}>(
        BACKEND_URL
      )
      .pipe(map((customerData) => {
        return {
          customers: customerData.customers.map(customer => {
            return {
              fname: customer.fname,
              lname: customer.lname,
              carYear: customer.carYear,
              carMake: customer.carMake,
              carModel: customer.carModel,
              telephone: customer.telephone,
              email: customer.email,
              id: customer._id
            };
          })
        };
      }))
      .subscribe((transformedCustomerData) => {
        this.customers = transformedCustomerData.customers;
        this.customersUpdated.next({customers: [...this.customers]});
      });
  }

  getCustomerUpdateListener() {
    return this.customersUpdated.asObservable();
  }

  addCustomer(
    fname: string,
    lname: string,
    carYear: string,
    carMake: string,
    carModel: string,
    telephone: string,
    email: string
  ) {
    const customerData: Customer = {
      fname: fname,
      lname: lname,
      carYear: carYear,
      carMake: carMake,
      carModel: carModel,
      telephone: telephone,
      email: email
    };
    this.http
      .post<{message: string, customer: Customer}>(BACKEND_URL, customerData)
      .subscribe((resData) => {
        window.location.reload();
      });
  }
}
