import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { VehicleService } from 'src/services/vehicle.service';
import { Vehicle } from '../../models/vehicle.model';
import { Subscription } from 'rxjs';
import { DialogEntryComponent } from '../dialog-entry/dialog-entry.component';


@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
  vehicles: Vehicle[] = [];
  totalVehicles = 0;
  private vehiclesSub: Subscription;
  dialogEntryRef: MatDialogRef<DialogEntryComponent>;
  dataSource: MatTableDataSource<Vehicle>;
  isLoading = false;
  checked = false;
  searchForm: FormGroup;

  constructor(
    private router: Router,
    private titleService: Title,
    private vehicleService: VehicleService,
    private dialog: MatDialog
    ) {}

  displayedColumns = [
     'vehVin',
     'vehYear',
     'vehMake',
     'vehModel',
     'vehCondition',
     'vehColor',
     'vehDetails',
     'vehImage'
  ];

  // inventory = [
  //   { vehicleId: 'TBHF2000201', vehicleYear: 2001, vehicleMake: 'Honda', vehicleModel: 'S2000',
  //   newOrUsed: 'Used', vehicleColor: 'Silver', vehicleDetails: 'Convertible, A/C, here are some
  //   more details just to see how it handles extra data space' },
  //   ];



  ngOnInit() {
      if (this.checked) {
        this.isLoading = true;
      } else {
        this.isLoading = false;
      }
    this.titleService.setTitle('Vehicle Inventory | iDealCars');
    this.searchForm = new FormGroup({
      'Year': new FormControl(null, {
        validators: [Validators.required]
      }),
      'Make': new FormControl(null, {
        validators: [Validators.required]
      }),
      'Model': new FormControl(null, {
        validators: [Validators.required]
      }),
      'Color': new FormControl(null, {
        validators: [Validators.required]
      }),

    });
    this.getCars();
  }
getCars(): void {
  this.vehicleService.getVehicles();
  this.vehicleService.getVehicleUpdateListener()
    .subscribe((vehicleData: { vehicles: Vehicle[] }) => {
      this.vehicles = vehicleData.vehicles;
      this.dataSource = new MatTableDataSource(this.vehicles);
    });
}
applyFilter(filterValue: string) {
  filterValue = filterValue.trim(); // Remove whitespace
  filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
  this.dataSource.filter = filterValue;
}
openDialogEntry() {
  this.dialogEntryRef = this.dialog.open(DialogEntryComponent, {
    hasBackdrop: true,
    autoFocus: true,
    disableClose: false,
    width: '350px',
    height: 'auto'
  });
}

  print(id: any) {
    alert(id);
  }
  onRowClicked(row) {

  }
}


