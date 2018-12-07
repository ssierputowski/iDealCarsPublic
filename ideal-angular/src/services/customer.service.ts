import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Customer } from '../models/customer.model';
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})
export class CustomerService {
  private customers: Customer[] = [];
  private customersUpdated = new Subject<{customers: Customer[]}>();

  constructor(
    private http: HttpClient,
  ) {}

  getCustomers() {
    this.http
      .get<{message: string, customers: any, maxCustomers: number}>(
        'http://localhost:3000/api/customers'
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
          }),
          maxCustomers: customerData.maxCustomers
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
    const customerData = new FormData();
    customerData.append('fname', fname);
    customerData.append('lname', lname);
    customerData.append('carYear', carYear);
    customerData.append('carMake', carMake);
    customerData.append('carModel', carModel);
    customerData.append('telephone', telephone);
    customerData.append('email', email);
    this.http
      .post<{message: string, customer: Customer}>('http://localhost:3000/api/customers', customerData)
      .subscribe((resData) => {
        console.log(resData);
      });
  }
}
