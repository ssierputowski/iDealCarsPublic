import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MatDialogConfig, MatRow } from '@angular/material';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { VehicleService } from 'src/services/vehicle.service';
import { Vehicle } from '../../models/vehicle.model';
import { Subscription } from 'rxjs';
import { DialogEntryComponent } from '../dialog-entry/dialog-entry.component';
import { DialogVinComponent } from '../dialog-vin/dialog-vin.component';


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
  dialogVinRef: MatDialogRef<DialogVinComponent>;
  dataSource: MatTableDataSource<Vehicle>;
  isLoading = false;
  checked = false;
  searchForm: FormGroup;
  searchVal: string;
  searchStr = [];
  row = new MatRow;
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
     'vehColor',
     'vehDetail',
     'vehPrice',
  ];
  filterValues = {
    vehYear: '',
    vehMake: '',
    vehModel: '',
    vehColor: '',
    vehCondition: '',

  };

  Year = new FormControl('', {
    validators: [Validators.required]
  });
  Make = new FormControl('', {
    validators: [Validators.required]
  });
  Model = new FormControl('', {
    validators: [Validators.required]
  });
  Color = new FormControl('', {
    validators: [Validators.required]
  });
  Condition = new FormControl('', {
    validators: [Validators.required]
  });

  ngOnInit() {
      if (this.checked) {
        this.isLoading = true;
      } else {
        this.isLoading = false;
      }
    this.titleService.setTitle('Vehicle Inventory | iDealCars');

      this.Year.valueChanges
      .subscribe(
        Year => {
          this.filterValues.vehYear = Year;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      );
      this.Make.valueChanges
      .subscribe(
        Make => {
          this.filterValues.vehMake = Make;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      );
      this.Model.valueChanges
      .subscribe(
        Model => {
          this.filterValues.vehModel = Model;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      );
      this.Color.valueChanges
      .subscribe(
        Color => {
          this.filterValues.vehColor = Color;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      );
      this.Condition.valueChanges
      .subscribe(
        Condition => {
          this.filterValues.vehCondition = Condition;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      );
    this.getCars();
  }
getCars(): void {
  this.vehicleService.getVehicles();
  this.vehicleService.getVehicleUpdateListener()
    .subscribe((vehicleData: { vehicles: Vehicle[] }) => {
      this.vehicles = vehicleData.vehicles;
      this.dataSource = new MatTableDataSource(this.vehicles);
      this.dataSource.filterPredicate = this.tableFilter();
    });
}

tableFilter(): (data: any, filter: string) => boolean {
  const filterFunction = function(data, filter): boolean {
    const searchTerms = JSON.parse(filter);
    return data.vehYear.toString().toLowerCase().indexOf(searchTerms.vehYear) !== -1
      && data.vehMake.toString().toLowerCase().indexOf(searchTerms.vehMake) !== -1
      && data.vehModel.toString().toLowerCase().indexOf(searchTerms.vehModel) !== -1
      && data.vehColor.toLowerCase().indexOf(searchTerms.vehColor) !== -1
      && data.vehCondition.toLowerCase().indexOf(searchTerms.vehCondition) !== -1;
  };
  return filterFunction;
}

openDialogEntry() {
  this.dialogEntryRef = this.dialog.open(DialogEntryComponent, {
    disableClose: true,
    minWidth: '50rem',
  });
}

openDialogVin(data: any) {
  const config: MatDialogConfig = {
    disableClose: true,
    minWidth: '50rem',
  };
  this.dialogVinRef = this.dialog.open(DialogVinComponent, config);
  this.dialogVinRef.componentInstance.data = {
    id: data.id,
    vehVin: data.vehVin,
    vehYear: data.vehYear,
    vehMake: data.vehMake,
    vehModel: data.vehModel,
    vehColor: data.vehColor,
    vehCondition: data.vehCondition,
    vehDetail: data.vehDetail,
    vehPrice: data.vehPrice,
    vehImage: data.vehImage,
    };
  }

}

/* This all goes in the dialog component popup for vehicle information
<button mat-button color="warn" (click)="onDelete(vehicle.vehVin)">Delete</button>
 // this for component ts file fo dialog
 onDelete(vehicleVin: string){
    this.vehicleService.deleteVehicle(vehicleVin);
    .close()
}

//edit method for button on vehicle dialog display
constructor(){}


*/
