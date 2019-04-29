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
  isparts = true;
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
     'vehCondition',
     'vehDetail',
     'vehMiles',
     'vehPrice',
     'vehImage'
  ];

  filterValues = {
    vehYear: '',
    vehMake: '',
    vehModel: '',
    vehColor: '',
    vehCondition: '',

  };
  // formControls for search filters
  Year = new FormControl('');
  Make = new FormControl('');
  Model = new FormControl('');
  Color = new FormControl('');
  Condition = new FormControl('');


  ngOnInit() {

    this.titleService.setTitle('Vehicle Inventory | iDealCars');
      // below subscribe to value changes of the search Filter formControls and filter the
      // table dataSource cooresponding to the values entered in the filter formControls
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
          this.filterValues.vehMake = Make.toLowerCase();
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      );
      this.Model.valueChanges
      .subscribe(
        Model => {
          this.filterValues.vehModel = Model.toLowerCase();
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      );
      this.Color.valueChanges
      .subscribe(
        Color => {
          this.filterValues.vehColor = Color.toLowerCase();
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      );
      this.Condition.valueChanges
      .subscribe(
        Condition => {
          this.filterValues.vehCondition = Condition.toLowerCase();
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      );
    this.getCars();

  }
// returns observable of the vehicles for the inventory page stored in the db
// last line applies filter function below filterPredicate to datasource and causes to
// display those results in the table
getCars(): void {
  this.vehicleService.getVehicles();
  this.vehicleService.getVehicleUpdateListener()
    .subscribe((vehicleData: { vehicles: Vehicle[] }) => {
      this.vehicles = vehicleData.vehicles;
      this.dataSource = new MatTableDataSource(this.vehicles);
      this.dataSource.filterPredicate = this.tableFilter();

    });
}
// filter function for table data-filters results contained in the column attributes
// converts them to string lowercase to  return a result and in combination with the
// formControls above ignores case
tableFilter(): (data: any, filter: string) => boolean {
  const filterFunction = function(data, filter): boolean {
    const searchTerms = JSON.parse(filter);
    return data.vehYear.toString().indexOf(searchTerms.vehYear) !== -1
      && data.vehMake.toString().toLowerCase().indexOf(searchTerms.vehMake) !== -1
      && data.vehModel.toString().toLowerCase().indexOf(searchTerms.vehModel) !== -1
      && data.vehColor.toString().toLowerCase().indexOf(searchTerms.vehColor) !== -1
      && data.vehCondition.toString().toLowerCase().indexOf(searchTerms.vehCondition) !== -1;
  };
  return filterFunction;
}
// opens dialog to enter a new vehicle to the inventory page
openDialogEntry() {
  this.dialogEntryRef = this.dialog.open(DialogEntryComponent, {
    disableClose: true,
    minWidth: '50rem',
    height: '75rem',
  });
}

// opens dialog for editing vehicle entry already contained in the table,
// passing the data in that row to the edit dialog
openDialogVin(data: any) {
  const config: MatDialogConfig = {
    disableClose: true,
    minWidth: '50rem',
    height: '75rem',
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
    vehMiles: data.vehMiles,
    vehPrice: data.vehPrice,
    vehImage: data.vehImage,
    };
  }
}


