import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MatDialogConfig, MatRow } from '@angular/material';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { VehicleService } from 'src/services/vehicle.service';
import { Subscription } from 'rxjs';

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
      'partQuantity',
      'partCompatibility',
      'partDescription',
      'partPrice',
      'partImage'
   ];

    filterValuesParts = {
      partID: '',
      partName: '',
      partCompatibility: ''
    };

    // formControls for search filters
    PartID = new FormControl('');
    Name = new FormControl('');
    Compatibility = new FormControl('');

    ngOnInit() {

      // ######## PARTS #########
        this.titleService.setTitle('Parts Inventory | iDealCars');
        // below subscribe to value changes of the search Filter formControls and filter the
        // table dataSource cooresponding to the values entered in the filter formControls
        this.PartID.valueChanges
        .subscribe(
          PartID => {
            this.filterValuesParts.partID = PartID.toLowerCase();
            this.dataSourceParts.filter = JSON.stringify(this.filterValuesParts);
          }
        );
        this.Name.valueChanges
        .subscribe(
          Name => {
            this.filterValuesParts.partName = Name.toLowerCase();
            this.dataSourceParts.filter = JSON.stringify(this.filterValuesParts);
          }
        );
        this.Compatibility.valueChanges
        .subscribe(
          Compatibility => {
            this.filterValuesParts.partCompatibility = Compatibility.toLowerCase();
            this.dataSourceParts.filter = JSON.stringify(this.filterValuesParts);
          }
        );

      this.getParts();

    }
  // returns observable of the parts for the inventory page stored in the db
  // last line applies filter function below filterPredicate to datasource and causes to
  // display those results in the table
  getParts(): void {
    this.partService.getParts();
    this.partService.getPartUpdateListener()
      .subscribe((partData: { parts: Part[] }) => {
        this.parts = partData.parts;
        this.dataSourceParts = new MatTableDataSource(this.parts);
        this.dataSourceParts.filterPredicate = this.tableFilter();
      });
  }

  // filter function for table data-filters results contained in the column attributes
  // converts them to string lowercase to  return a result and in combination with the
  // formControls above ignores case
  tableFilter(): (data: any, filter: string) => boolean {
    const filterFunctionParts = function(data, filter): boolean {
      const searchTerms = JSON.parse(filter);
      return data.partID.toString().toLowerCase().indexOf(searchTerms.partID) !== -1
        && data.partName.toString().toLowerCase().indexOf(searchTerms.partName) !== -1
        && data.partCompatibility.toString().toLowerCase().indexOf(searchTerms.partCompatibility) !== -1;
    };
    return filterFunctionParts;
  }

    // opens dialog to enter a new part to the inventory page
    openAddPart() {
      this.addPartRef = this.dialog.open(AddPartComponent, {
        disableClose: true,
        minWidth: '50rem',
        height: '75rem',
      });
    }

    // opens dialog for editing part entry already contained in the table,
    // passing the data in that row to the edit dialog
    openEditPart(data: any) {
      const config: MatDialogConfig = {
        disableClose: true,
        minWidth: '50rem',
        height: '75rem',
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


