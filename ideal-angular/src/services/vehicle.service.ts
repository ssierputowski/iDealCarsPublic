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
              vinId: vehicle.vinId,
              price: vehicle.price,
              year: vehicle.year,
              make: vehicle.make,
              vehicleModel: vehicle.vehicleModel,
              carColor: vehicle.carColor,
              optionsDescription: vehicle.optionsDescription
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
    vinId: string,
    price: string,
    year: string,
    make: string,
    vehicleModel: string,
    carColor: string,
    optionsDescription: string
  ) {
    const vehicleData: Vehicle = {
      vinId: vinId,
      price: price,
      year: year,
      make: make,
      vehicleModel: vehicleModel,
      carColor: carColor,
      optionsDescription: optionsDescription
    };
    this.http
      .post<{message: string, vehicle: Vehicle}>(BACKEND_URL, vehicleData)
      .subscribe((resData) => {
        window.location.reload();
      });
  }
}
