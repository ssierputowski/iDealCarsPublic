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
  selector: 'app-parts-inventory',
  templateUrl: './parts-inventory.component.html',
  styleUrls: ['./parts-inventory.component.css']
})
export class PartsInventoryComponent implements OnInit {

    parts: Part[] = [];
    totalParts = 0;
    addPartRef: MatDialogRef<AddPartComponent>;
    editPartRef: MatDialogRef<EditPartComponent>;
    dataSourceParts: MatTableDataSource<Part>;

    private vehiclesSub: Subscription;
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

    displayedColumnsParts = [
      'partID',
      'partName',
      'partPrice',
      'partQuantity',
      'partCompatibility',
      'partDescription',
      'partImage'
   ];

    filterValuesParts = {
      partID: '',
      partName: '',
      partCompatibility: ''
    };

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

      // ######## PARTS #########
        this.titleService.setTitle('Parts Inventory | iDealCars');

        this.PartID.valueChanges
        .subscribe(
          PartID => {
            this.filterValuesParts.partID = PartID;
            this.dataSourceParts.filter = JSON.stringify(this.filterValuesParts);
          }
        );
        this.Name.valueChanges
        .subscribe(
          Name => {
            this.filterValuesParts.partName = Name;
            this.dataSourceParts.filter = JSON.stringify(this.filterValuesParts);
          }
        );
        this.Compatibility.valueChanges
        .subscribe(
          Compatibility => {
            this.filterValuesParts.partCompatibility = Compatibility;
            this.dataSourceParts.filter = JSON.stringify(this.filterValuesParts);
          }
        );

      this.getParts();

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


  // filter function for table data
  tableFilter(): (data: any, filter: string) => boolean {
    const filterFunctionParts = function(data, filter): boolean {
      const searchTerms = JSON.parse(filter);
      return data.partID.toString().toLowerCase().indexOf(searchTerms.partID) !== -1
        && data.partName.toString().toLowerCase().indexOf(searchTerms.partName) !== -1
        && data.partCompatibility.toString().toLowerCase().indexOf(searchTerms.partCompatibility) !== -1;
    };
    return filterFunctionParts;
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


