import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { CustomerVehicle } from '../models/customerVehicle.model';
import { Router } from '@angular/router';

import { environment } from '../environments/environment';

const BACKEND_URL = environment.apiUrl + '/customerVehicles';


@Injectable({providedIn: 'root'})
export class CustomerVehicleService {
  private customerVehicles: CustomerVehicle[] = [];
  private customerVehiclesUpdated = new Subject<{customerVehicles: CustomerVehicle[]}>();

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  getCustomerVehicles() {
    this.http
      .get<{message: string, customerVehicles: any}>(
        BACKEND_URL
      )
      .pipe(map((customerVehicleData) => {
        return {
          customerVehicles: customerVehicleData.customerVehicles.map(customerVehicle => {
            return {
              id: customerVehicle._id,
              customerId: customerVehicle.customerId,
              vehicleId: customerVehicle.vehicleId,
              vehicleYear: customerVehicle.vehicleYear,
              vehicleMake: customerVehicle.vehicleMake,
              vehicleModel: customerVehicle.vehicleModel,
              vehicleColor: customerVehicle.vehicleColor,
              vehicleDetails: customerVehicle.vehicleDetails,
              vehiclePriceSold: customerVehicle.vehiclePriceSold,
              vehicleImage: customerVehicle.vehicleImage
            };
          })
        };
      }))
      .subscribe((transformedCustomerVehicleData) => {
        this.customerVehicles = transformedCustomerVehicleData.customerVehicles;
        this.customerVehiclesUpdated.next({customerVehicles: [...this.customerVehicles]});
      });
  }

  getCustomerVehicleUpdateListener() {
    return this.customerVehiclesUpdated.asObservable();
  }
  //  Find by internal customerId
  getCustomerVehiclesByCustomerID(customerId: string) {
    this.http
      .get<{message: string, customerVehicles: any}>(
        BACKEND_URL + '/' + customerId
      )
      .pipe(map((customerVehicleData) => {
        return {
          customerVehicles: customerVehicleData.customerVehicles.map(customerVehicle => {
            return {
              id: customerVehicle._id,
              customerId: customerVehicle.customerId,
              vehicleId: customerVehicle.vehicleId,
              vehicleYear: customerVehicle.vehicleYear,
              vehicleMake: customerVehicle.vehicleMake,
              vehicleModel: customerVehicle.vehicleModel,
              vehicleColor: customerVehicle.vehicleColor,
              vehicleDetails: customerVehicle.vehicleDetails,
              vehiclePriceSold: customerVehicle.vehiclePriceSold,
              vehicleImage: customerVehicle.vehicleImage
            };
          })
        };
      }))
      .subscribe((transformedCustomerVehicleData) => {
        this.customerVehicles = transformedCustomerVehicleData.customerVehicles;
        this.customerVehiclesUpdated.next({customerVehicles: [...this.customerVehicles]});
      });
  }


// ADD method for Customer dialog
  addCustomerVehicle(
    customerId: string,
    vehicleId: string,
    vehicleYear: string,
    vehicleMake: string,
    vehicleModel: string,
    vehicleColor: string,
    vehicleDetails: string,
    vehiclePriceSold: string,
    vehicleImage: File
  ) {
    const customerVehicleData = new FormData();
      customerVehicleData.append('customerId', customerId);
      customerVehicleData.append('vehicleId', vehicleId);
      customerVehicleData.append('vehicleYear', vehicleYear);
      customerVehicleData.append('vehicleMake', vehicleMake);
      customerVehicleData.append('vehicleModel', vehicleModel);
      customerVehicleData.append('vehicleColor', vehicleColor);
      customerVehicleData.append('vehicleDetails', vehicleDetails);
      customerVehicleData.append('vehiclePriceSold', vehiclePriceSold);
      customerVehicleData.append('vehicleImage', vehicleImage, vehicleModel);
    return this.http
      .post<{message: string, customerVehicle: CustomerVehicle}>(BACKEND_URL, customerVehicleData)
      .subscribe((resData) => {
        const customerVehicle: CustomerVehicle = {
              id: resData.customerVehicle.id,
              customerId: customerId,
              vehicleId: vehicleId,
              vehicleYear: vehicleYear,
              vehicleMake: vehicleMake,
              vehicleModel: vehicleModel,
              vehicleColor: vehicleColor,
              vehicleDetails: vehicleDetails,
              vehiclePriceSold: vehiclePriceSold,
              vehicleImage: resData.customerVehicle.vehicleImage
            };
            this.customerVehicles.push(customerVehicle);
            this.customerVehiclesUpdated.next({customerVehicles: [...this.customerVehicles]});

          });
      }

// UPDATE method for Customer dialogs
  updateCustomerVehicle(
    id: string,
    customerId: string,
    vehicleId: string,
    vehicleYear: string,
    vehicleMake: string,
    vehicleModel: string,
    vehicleColor: string,
    vehicleDetails: string,
    vehiclePriceSold: string,
    vehicleImage: File | string
  ) {
    let customerVehicleData: CustomerVehicle | FormData;
    if (typeof(vehicleImage) === 'object') {
        customerVehicleData = new FormData();
        customerVehicleData.append('id', id);
        customerVehicleData.append('customerId', customerId);
        customerVehicleData.append('vehicleId', vehicleId);
        customerVehicleData.append('vehicleYear', vehicleYear);
        customerVehicleData.append('vehicleMake', vehicleMake);
        customerVehicleData.append('vehicleModel', vehicleModel);
        customerVehicleData.append('vehicleColor', vehicleColor);
        customerVehicleData.append('vehicleDetails', vehicleDetails);
        customerVehicleData.append('vehiclePriceSold', vehiclePriceSold);
        customerVehicleData.append('vehicleImage', vehicleImage, vehicleModel);
    } else {
      customerVehicleData = {
        id: id,
        customerId: customerId,
        vehicleId: vehicleId,
        vehicleYear: vehicleYear,
        vehicleMake: vehicleMake,
        vehicleModel: vehicleModel,
        vehicleColor: vehicleColor,
        vehicleDetails: vehicleDetails,
        vehiclePriceSold: vehiclePriceSold,
        vehicleImage: vehicleImage
      };
      }
      return this.http.put(BACKEND_URL + '/' + id, customerVehicleData)
      .subscribe(response => {
        const updatedCustomerVehicles = [...this.customerVehicles];
        const oldCustomerVehicleIndex = updatedCustomerVehicles.findIndex(p => p.id === id);
        const customerVehicle: CustomerVehicle = {
          id: id,
          customerId: customerId,
          vehicleId: vehicleId,
          vehicleYear: vehicleYear,
          vehicleMake: vehicleMake,
          vehicleModel: vehicleModel,
          vehicleColor: vehicleColor,
          vehicleDetails: vehicleDetails,
          vehiclePriceSold: vehiclePriceSold,
          vehicleImage: ''
        };
        updatedCustomerVehicles[oldCustomerVehicleIndex] = customerVehicle;
        this.customerVehicles = updatedCustomerVehicles;
        this.customerVehiclesUpdated.next({customerVehicles: [...this.customerVehicles ]});

      });
    }

    // DELETE method Customer dialog
  deleteCustomerVehicle(idCustomerVehicleID: string) {
    console.log('Customer Vehicle Deleted! ' + idCustomerVehicleID);
    return this.http.delete(BACKEND_URL + '/' + idCustomerVehicleID)
      .subscribe(() => {
        const updatedCustomerVehicles = this.customerVehicles.filter(customerVehicle => customerVehicle.id !== idCustomerVehicleID);
        this.customerVehicles = updatedCustomerVehicles;
        this.customerVehiclesUpdated.next({customerVehicles: [...this.customerVehicles]});
      });
    }
}

