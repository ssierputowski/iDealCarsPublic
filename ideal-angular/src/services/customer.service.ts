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
            //  customerId: customer.customerId,
              firstName: customer.firstName,
              lastName: customer.lastName,
             // vehicleYear: customer.vehicleYear,
             // vehicleMake: customer.vehicleMake,
             // vehicleModel: customer.vehicleModel,
             // vehicleColor: customer.vehicleColor,
             // vehicleId: customer.vehicleId,
             // vehicleDetails: customer.vehicleDetails,
             // vehicleImage: customer.vehicleImage,
              phoneNumber: customer.phoneNumber,
              emailAddress: customer.emailAddress,
              address: customer.address,
              city: customer.city,
              state: customer.state,
              zipCode: customer.zipCode,
             // servicePerformed: customer.servicePerformed,
             // serviceDate: customer.serviceDate,
             // dateReturned: customer.dateReturned,
             // mechanic: customer.mechanic,
             // serviceNotes: customer.serviceNotes,
             // servicePrice: customer.servicePrice,
             // paymentReceived: customer.paymentReceived,
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
   // customerId: string,
    firstName: string,
    lastName: string,
    /*vehicleInfo: [
      {
        vehicleYear: number,
        vehicleMake: string,
        vehicleModel: string,
        vehicleColor: string,
        vehicleId: string,
        vehicleDetails: string,
        vehicleImage: string,
      }
    ], */
    phoneNumber: string,
    emailAddress: string,
    address: string,
    city: string,
    state: string,
    zipCode: number,
   /* serviceRecords: [
      {
        servicePerformed: string,
        serviceDate: string,
        dateReturned: string,
        mechanic: string,
        serviceNotes: string[],
        servicePrice: number,
        paymentReceived: boolean,
    }
  ], */
  ) {
    const customerData: Customer = {
    //  customerId: customerId,
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phoneNumber,
      emailAddress: emailAddress,
      address: address,
      city: city,
      state: state,
      zipCode: zipCode,
    };
    this.http
      .post<{message: string, customer: Customer}>(BACKEND_URL, customerData)
      .subscribe((resData) => {
        this.getCustomers();
      });
  }
}
