import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Vehicle } from '../models/vehicle.model';
import { Router } from '@angular/router';

import { environment } from '../environments/environment';
import { puts } from 'util';

const BACKEND_URL = environment.apiUrl + '/vehicles';

@Injectable({providedIn: 'root'})
export class VehicleService {
  private vehicles: Vehicle[] = [];
  private vehiclesUpdated = new Subject<{vehicles: Vehicle[]}>();

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  // Returns observable of List of Vehicles for inventory page dialog
  getVehicles() {
    this.http
      .get<{message: string, vehicles: any}>(
        BACKEND_URL
      )
      .pipe(map((vehicleData) => {
        return {
          vehicles: vehicleData.vehicles.map(vehicle => {
            return {
              id: vehicle._id,
              vehVin: vehicle.vehVin,
              vehYear: vehicle.vehYear,
              vehMake: vehicle.vehMake,
              vehModel: vehicle.vehModel,
              vehColor: vehicle.vehColor,
              vehCondition: vehicle.vehCondition,
              vehDetail: vehicle.vehDetail,
              vehMiles: vehicle.vehMiles,
              vehPrice: vehicle.vehPrice,
              vehImage: vehicle.vehImage
            };
          })
        };
      }))
      .subscribe((transformedVehicleData) => {
        this.vehicles = transformedVehicleData.vehicles;
        this.vehiclesUpdated.next({vehicles: [...this.vehicles]});
      });
  }

  getVehicleUpdateListener() {
    return this.vehiclesUpdated.asObservable();
  }

  // SAVE functions for dialog-entry
  addVehicle(
    vehVin: string,
    vehYear: string,
    vehMake: string,
    vehModel: string,
    vehColor: string,
    vehCondition: string,
    vehDetail: string,
    vehMiles: string,
    vehPrice: string,
    vehImage: File
  ) {
    const vehicleData  = new FormData();
    vehicleData.append('vehVin', vehVin);
    vehicleData.append('vehYear', vehYear);
    vehicleData.append('vehMake', vehMake);
    vehicleData.append('vehModel', vehModel);
    vehicleData.append('vehColor', vehColor);
    vehicleData.append('vehCondition', vehCondition);
    vehicleData.append('vehDetail', vehDetail);
    vehicleData.append('vehMiles', vehMiles);
    vehicleData.append('vehPrice', vehPrice);
    vehicleData.append('vehImage', vehImage, vehModel);
    return this.http
      .post<{message: string, vehicle: Vehicle }>(BACKEND_URL, vehicleData)
      .subscribe((resData) => {
        const vehicle: Vehicle = {
          id: resData.vehicle.id,
          vehVin: vehVin,
          vehYear: vehYear,
          vehMake: vehMake,
          vehModel: vehModel,
          vehColor: vehColor,
          vehCondition: vehCondition,
          vehDetail: vehDetail,
          vehMiles: vehMiles,
          vehPrice: vehPrice,
          vehImage: resData.vehicle.vehImage
        };
        this.vehicles.push(vehicle);
        this.vehiclesUpdated.next({vehicles: [...this.vehicles]});
        window.location.reload();
      });
  }
  // helper method (not used) for edit vehicle
  getVehicleByID(id: string) {
    // tslint:disable-next-line:max-line-length
    return this.http.get<{_id: string, vehVin: string, vehYear: string, vehMake: string, vehModel: string, vehColor: string, vehCondition: string, vehDetail: string, vehMiles: string, vehPrice: string, vehImage: string }>( BACKEND_URL + '/' + id);
  }

  // EDIT functions for dialogVin
  updateVehicle(
    id: string,
    vehVin: string,
    vehYear: string,
    vehMake: string,
    vehModel: string,
    vehColor: string,
    vehCondition: string,
    vehDetail: string,
    vehMiles: string,
    vehPrice: string,
    vehImage: File | string
    ) {
    let vehicleData: Vehicle | FormData;
    if (typeof(vehImage) === 'object') {
        vehicleData = new FormData();
        vehicleData.append('id', id);
        vehicleData.append('vehVin', vehVin);
        vehicleData.append('vehYear', vehYear);
        vehicleData.append('vehMake', vehMake);
        vehicleData.append('vehModel', vehModel);
        vehicleData.append('vehColor', vehColor);
        vehicleData.append('vehCondition', vehCondition);
        vehicleData.append('vehDetail', vehDetail);
        vehicleData.append('vehMiles', vehMiles);
        vehicleData.append('vehPrice', vehPrice);
        vehicleData.append('vehImage', vehImage, vehModel);
    } else {
        vehicleData = {
        id: id,
        vehVin: vehVin,
        vehYear: vehYear,
        vehMake: vehMake,
        vehModel: vehModel,
        vehColor: vehColor,
        vehCondition: vehCondition,
        vehDetail: vehDetail,
        vehMiles: vehMiles,
        vehPrice: vehPrice,
        vehImage: vehImage
    };
  }
    return this.http.put(BACKEND_URL + '/' + id, vehicleData)
    .subscribe(response => {
      const updatedVehicles = [...this.vehicles];
      const oldVehicleIndex = updatedVehicles.findIndex(p => p.id === id);
      const vehicle: Vehicle = {
        id: id,
        vehVin: vehVin,
        vehYear: vehYear,
        vehMake: vehMake,
        vehModel: vehModel,
        vehColor: vehColor,
        vehCondition: vehCondition,
        vehDetail: vehDetail,
        vehMiles: vehMiles,
        vehPrice: vehPrice,
        vehImage: ''
      };
      updatedVehicles[oldVehicleIndex] = vehicle;
      this.vehicles = updatedVehicles;
      this.vehiclesUpdated.next({vehicles: [...this.vehicles ]});
      window.location.reload();

    });
  }
// DELETE method for vehicles; used in dialogVin
  deleteVehicle(vehicleID: string) {
    console.log('Deleted! ' + vehicleID);
    return this.http.delete(BACKEND_URL + '/' + vehicleID)
     .subscribe(() => {
      const updatedVehicles = this.vehicles.filter(vehicle => vehicle.id !== vehicleID);
      this.vehicles = updatedVehicles;
      this.vehiclesUpdated.next({vehicles: [...this.vehicles]});
    });
  }
}
