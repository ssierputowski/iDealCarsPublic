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

import { AddPartComponent } from '../add-part/add-part.component';
import { EditPartComponent } from '../edit-part/edit-part.component';
import { Part } from 'src/models/part.model';
import { PartService } from 'src/services/part.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

  parts: Part[] = [];
  totalParts = 0;
  addPartRef: MatDialogRef<AddPartComponent>;
  editPartRef: MatDialogRef<EditPartComponent>;
  dataSourceParts: MatTableDataSource<Part>;

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
    private partService: PartService,
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
     'vehPrice',
     'vehImage'
  ];

  displayedColumnsParts = [
    'partID',
    'partName',
    'partPrice',
    'partQuantity',
    'partCompatibility',
    'partDescription',
    'partImage'
 ];

  filterValues = {
    vehYear: '',
    vehMake: '',
    vehModel: '',
    vehColor: '',
    vehCondition: '',

  };
// might be able to make search bitton work here by removing validators putting in constructor etc.
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

  // form for parts filter
  PartID = new FormControl('', {
    validators: [Validators.required]
  });
  Name = new FormControl('', {
    validators: [Validators.required]
  });
  Compatibility = new FormControl('', {
    validators: [Validators.required]
  });

  ngOnInit() {

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

    // ######## PARTS #########
    // tslint:disable-next-line:triple-equals
    if (this.isparts == true) {
      this.titleService.setTitle('Parts Inventory | iDealCars');

      this.PartID.valueChanges
      .subscribe(
        PartID => {
          this.filterValuesParts.partID = PartID;
          this.dataSourceParts.filter = JSON.stringify(this.filterValues);
        }
      );
      this.Name.valueChanges
      .subscribe(
        Name => {
          this.filterValuesParts.partName = Name;
          this.dataSourceParts.filter = JSON.stringify(this.filterValues);
        }
      );
      this.Compatibility.valueChanges
      .subscribe(
        Compatibility => {
          this.filterValuesParts.partCompatibility = Compatibility;
          this.dataSourceParts.filter = JSON.stringify(this.filterValues);
        }
      );

    this.getParts();
    }

  }

getParts(): void {
  this.partService.getParts();
  this.partService.getPartUpdateListener()
    .subscribe((partData: { parts: Part[] }) => {
      this.parts = partData.parts;
      this.dataSourceParts = new MatTableDataSource(this.parts);
      this.dataSourceParts.filterPredicate = this.tableFilter();
    });
}

getCars(): void {
  this.vehicleService.getVehicles();
  this.vehicleService.getVehicleUpdateListener()
    .subscribe((vehicleData: { vehicles: Vehicle[] }) => {
      this.vehicles = vehicleData.vehicles;
      this.dataSource = new MatTableDataSource(this.vehicles);
      this.dataSource.filterPredicate = this.tableFilter();
      console.log(this.vehicles);
    });
}
// filter function for table data
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
  // // tslint:disable-next-line:triple-equals
  // if (this.isparts == true) {
  //   const filterFunctionParts = function(data, filter): boolean {
  //     const searchTerms = JSON.parse(filter);
  //     return data.partID.toString().toLowerCase().indexOf(searchTerms.partID) !== -1
  //       && data.partName.toString().toLowerCase().indexOf(searchTerms.partName) !== -1
  //       && data.partCompatibility.toString().toLowerCase().indexOf(searchTerms.partCompatibility) !== -1;
  //   };
  //   return filterFunctionParts;
  // }

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

  openAddPart() {
    this.addPartRef = this.dialog.open(AddPartComponent, {
      disableClose: true,
      minWidth: '50rem',
    });
  }

  openEditPart(data: any) {
    const config: MatDialogConfig = {
      disableClose: true,
      minWidth: '50rem',
    };
    this.editPartRef = this.dialog.open(EditPartComponent, config);
    this.editPartRef.componentInstance.data = {
      id: data.id,
      partID: data.partID,
      partName: data.partName,
      partPrice: data.partPrice,
      partQuantity: data.partQuantity,
      partCompatibility: data.partCompatibility,
      partDescription: data.partDescription,
      partImage: data.partImage,

      };
    }
}


