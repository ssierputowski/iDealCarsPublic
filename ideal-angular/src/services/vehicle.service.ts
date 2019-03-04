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
getVehicleByID(id: string) {
  return { ...this.vehicles.find(p => p.id === id)};
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
      id: null,
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
      .post<{message: string, vehicle: Vehicle, vehicleID: string}>(BACKEND_URL, vehicleData)
      .subscribe((resData) => {
        const id = resData.vehicleID;
        vehicleData.id = id;
        window.location.reload();
      });
  }
  // for editing
  updateVehicle(
    id: string,
    vehVin: string,
    vehYear: Number,
    vehMake: string,
    vehModel: string,
    vehColor: string,
    vehCondition: string,
    vehDetail: string,
    vehPrice: Number,
    vehImage: string
    ) { const vehicle: Vehicle = {
      id: id,
      vehVin: vehVin,
      vehYear: vehYear,
      vehMake: vehMake,
      vehModel: vehModel,
      vehColor: vehColor,
      vehCondition: vehCondition,
      vehDetail: vehDetail,
      vehImage: vehImage,
      vehPrice: vehPrice
    };
      this.http.put(BACKEND_URL + '/' + id, vehicle)
    .subscribe(response => console.log(response));
  }
// delete method for vehicles; used in dialog for vehicle display
  deleteVehicle(vehicleID: string) {
    this.http.delete(BACKEND_URL + '/' + vehicleID)
    .subscribe(() => {
      const updatedVehicles = this.vehicles.filter(vehicle => vehicle.id !== vehicleID);
      this.vehicles = updatedVehicles;
      this.vehiclesUpdated.next({vehicles: [...this.vehicles]});
      console.log('Deleted!');
    });
  }
}
