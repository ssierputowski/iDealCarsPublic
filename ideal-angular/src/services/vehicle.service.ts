import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Vehicle } from '../models/vehicle.model';
import { Router } from '@angular/router';

import { environment } from '../environments/environment';

const BACKEND_URL = environment.apiUrl + '/vehicles';

@Injectable({providedIn: 'root'})
export class VehicleService {
  private vehicles: Vehicle[] = [];
  private vehiclesUpdated = new Subject<{vehicles: Vehicle[]}>();

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  getVehicles() {
    this.http
      .get<{message: string, vehicles: any}>(
        BACKEND_URL
      )
      .pipe(map((vehicleData) => {
        return {
          vehicles: vehicleData.vehicles.map(vehicle => {
            return {
              vehVin: vehicle.vehVin,
              vehYear: vehicle.vehYear,
              vehMake: vehicle.vehMake,
              vehModel: vehicle.vehModel,
              vehColor: vehicle.vehColor,
              vehCondition: vehicle.vehCondition,
              vehDetail: vehicle.vehDetail,
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

  addVehicle(
    vehVin: string,
    vehYear: number,
    vehMake: string,
    vehModel: string,
    vehColor: string,
    vehicleCon: string,
    vehDetail: string,
    vehPrice: number,
    vehImage: string
  ) {
    const vehicleData: Vehicle = {
      vehVin: vehVin,
      vehYear : vehYear,
      vehMake: vehMake,
      vehModel: vehModel,
      vehColor: vehColor,
      vehCondition: vehicleCon,
      vehDetail: vehDetail,
      vehPrice: vehPrice,
      vehImage: vehImage
    };
    this.http
      .post<{message: string, vehicle: Vehicle}>(BACKEND_URL, vehicleData)
      .subscribe((resData) => {
        this.getVehicles();
      });
  }
// delete method for vehicles; used in dialog for vehicle display,
  deleteVehicle(vehicleVin: string) {
    this.http.delete(BACKEND_URL + vehicleVin)
    .subscribe(() => {
      const updatedVehicles = this.vehicles.filter(vehicle => vehicle.vehVin !== vehicleVin);
      this.vehicles = updatedVehicles;
      this.vehiclesUpdated.next({vehicles: [...this.vehicles]});
      console.log('Deleted!');
    });
  }
}
