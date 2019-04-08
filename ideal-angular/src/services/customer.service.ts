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
              id: customer._id,
              customerId: customer.customerId,
              firstName: customer.firstName,
              lastName: customer.lastName,
              phoneNumber: customer.phoneNumber,
              emailAddress: customer.emailAddress,
              address: customer.address,
              city: customer.city,
              state: customer.state,
              zipCode: customer.zipCode
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

// ADD method for Customer dialog
  addCustomer(
    customerId: string,
    firstName: string,
    lastName: string,
    phoneNumber: string,
    emailAddress: string,
    address: string,
    city: string,
    state: string,
    zipCode: string,
  ) {
    const customerData = new FormData();
      customerData.append('customerId', customerId);
      customerData.append('firstName', firstName);
      customerData.append('lastName', lastName);
      customerData.append('phoneNumber', phoneNumber);
      customerData.append('emailAddress', emailAddress);
      customerData.append('address', address);
      customerData.append('city', city);
      customerData.append('state', state);
      customerData.append('zipCode', zipCode);
    return this.http
      .post<{message: string, customer: Customer}>(BACKEND_URL, customerData)
      .subscribe((resData) => {
        const customer: Customer = {
              id: resData.customer.id,
              customerId: customerId,
              firstName: firstName,
              lastName: lastName,
              phoneNumber: phoneNumber,
              emailAddress: emailAddress,
              address: address,
              city: city,
              state: state,
              zipCode: zipCode,
            };
            this.customers.push(customer);
            this.customersUpdated.next({customers: [...this.customers]});
            // this.router.navigate(['/records']);
            // window.location.reload();
          });
      }

// UPDATE method for Customer dialogs
  updateCustomer(
    id: string,
    customerId: string,
    firstName: string,
    lastName: string,
    phoneNumber: string,
    emailAddress: string,
    address: string,
    city: string,
    state: string,
    zipCode: string,
  ) {
    let customerData: Customer | FormData;
      customerData = {
        id: id,
        customerId: customerId,
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
        emailAddress: emailAddress,
        address: address,
        city: city,
        state: state,
        zipCode: zipCode,
      };
      return this.http.put(BACKEND_URL + '/' + id, customerData)
      .subscribe(response => {
        const updatedCustomers = [...this.customers];
        const oldCustomerIndex = updatedCustomers.findIndex(p => p.id === id);
        const customer: Customer = {
          id: id,
          customerId: customerId,
          firstName: firstName,
          lastName: lastName,
          phoneNumber: phoneNumber,
          emailAddress: emailAddress,
          address: address,
          city: city,
          state: state,
          zipCode: zipCode,
        };
        updatedCustomers[oldCustomerIndex] = customer;
        this.customers = updatedCustomers;
        this.customersUpdated.next({customers: [...this.customers ]});
        this.router.navigate(['/records']);
        window.location.reload();
      });
    }

    // DELETE method Customer dialog
  deleteCustomer(idCustomerID: string) {
    console.log('Customer Deleted! ' + idCustomerID);
    return this.http.delete(BACKEND_URL + '/' + idCustomerID)
      .subscribe(() => {
        const updatedCustomers = this.customers.filter(customer => customer.id !== idCustomerID);
        this.customers = updatedCustomers;
        this.customersUpdated.next({customers: [...this.customers]});
      });
    }
}

