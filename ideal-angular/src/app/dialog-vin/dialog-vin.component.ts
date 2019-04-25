import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Vehicle } from '../../models/vehicle.model';
import { FormGroup, FormControl, Validators, ValidationErrors, FormBuilder, FormGroupDirective } from '@angular/forms';
import { VehicleService } from '../../services/vehicle.service';
import { DialogEntryCustomerComponent } from '../dialog-entry-customer/dialog-entry-customer.component';
import { Subscription } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import { mimeType } from '../manager-actions/mime-type.validator';
import { fileSizeValidator } from '../manager-actions/file-size.validator';



@Component({
  selector: 'app-dialog-vin',
  templateUrl: './dialog-vin.component.html',
  styleUrls: ['./dialog-vin.component.css']
})
export class DialogVinComponent implements OnInit {

  imagePreview: string;
  carStates: string[] = [
    'USED', 'NEW'
  ];
  stateSelector = new FormControl('', { validators: [Validators.required]});
  edit_form: FormGroup;
  dialogEntryCustomerRef: MatDialogRef<DialogEntryCustomerComponent>;
  dataSource: MatTableDataSource<Vehicle>;
  public edit = false;

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<DialogVinComponent>,
    private vehicleService: VehicleService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuild: FormBuilder,
    private route: ActivatedRoute) {// this passes the data from the inventory component to this dialog

      this.edit_form = this.formBuild.group({
        // tslint:disable-next-line:max-line-length
        'vehVin': new FormControl(null, { validators: [Validators.required, Validators.minLength(17), Validators.maxLength(17), Validators.pattern('[A-Za-z0-9]*')] }),
        // tslint:disable-next-line:max-line-length
        'vehYear': new FormControl(null, { validators: [Validators.required, Validators.min(1900), Validators.max(2050), Validators.pattern('[0-9]*')] }),
        'vehMake': new FormControl(null, { validators: [Validators.required, Validators.maxLength(25)] }),
        'vehModel': new FormControl(null, { validators: [Validators.required, Validators.maxLength(25)] }),
        'vehColor': new FormControl(null, { validators: [Validators.required, Validators.maxLength(25)] }),
        'vehCondition': new FormControl(null, { validators: [Validators.required] }),
        'vehDetail': new FormControl(null, { validators: [Validators.required, Validators.maxLength(50)] }),
        'vehMiles': new FormControl(null, { validators: [Validators.required, Validators.maxLength(7)] }),
        // tslint:disable-next-line:max-line-length
        'vehPrice': new FormControl(null, { validators: [Validators.required, Validators.min(0), Validators.max(1000000), Validators.pattern(/^\d+\.\d{2}$/)] }),
        'vehImage': new FormControl(null, { validators: [Validators.required], asyncValidators: [mimeType, fileSizeValidator] }),
      });
     }


  ngOnInit() {
    this.stateSelector.setValue(this.data.vehCondition || this.stateSelector.markAsPristine);
    // Patches form with vehicle data for EDIT
    this.route.params.subscribe(
      param => {

        this.edit_form.patchValue({vehVin: this.data.vehVin});
        this.edit_form.patchValue({vehYear: this.data.vehYear});
        this.edit_form.patchValue({vehMake: this.data.vehMake});
        this.edit_form.patchValue({vehModel: this.data.vehModel});
        this.edit_form.patchValue({vehColor: this.data.vehColor});
        this.edit_form.patchValue({vehCondition: this.data.vehCondition});
        this.edit_form.patchValue({vehDetail: this.data.vehDetail});
        this.edit_form.patchValue({vehMiles: this.data.vehMiles});
        this.edit_form.patchValue({vehPrice: this.data.vehPrice});
        this.edit_form.patchValue({vehImage: this.data.vehImage});

      }
    );
  }
  // Image selection function
  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.edit_form.patchValue({vehImage: file});
    this.edit_form.get('vehImage').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
  // for EDIT function
  saveEditedVehicle() {
    if (this.edit_form.invalid) {
      return;
    }
    this.vehicleService.updateVehicle(
      this.data.id,
      this.edit_form.get('vehVin').value,
      this.edit_form.get('vehYear').value,
      this.edit_form.get('vehMake').value,
      this.edit_form.get('vehModel').value,
      this.edit_form.get('vehColor').value,
      this.edit_form.get('vehCondition').value,
      this.edit_form.get('vehDetail').value,
      this.edit_form.get('vehMiles').value,
      this.edit_form.get('vehPrice').value,
      this.edit_form.get('vehImage').value

    );
     this.dialogRef.close();
  }

  close() {
    this.dialogRef.close();
  }
// this for delete
onDelete(vehicleID: string) {
  // vehicleVin = this.data.vehVin;
  this.vehicleService.deleteVehicle(vehicleID);
  this.dialogRef.close();
}
// opens customer entry dialog
sellVehicle() {
  const config: MatDialogConfig = {
    disableClose: true,
    minWidth: '50rem',
  };
  this.dialogEntryCustomerRef = this.dialog.open(DialogEntryCustomerComponent, config);
  this.dialogEntryCustomerRef.componentInstance.data = {
    id: this.data.id,
    vehVin: this.data.vehVin,
    vehYear: this.data.vehYear,
    vehMake: this.data.vehMake,
    vehModel: this.data.vehModel,
    vehColor: this.data.vehColor,
    vehCondition: this.data.vehCondition,
    vehDetail: this.data.vehDetail,
    vehMiles: this.data.vehMiles,
    vehPrice: this.data.vehPrice,
    vehImage: this.data.vehImage,
    };
  }
    // ERROR Messaging=======================================
  getVINErrorMessage() {
    return  'VIN must be 17 letters, numbers in length!';
  }
  getYEARErrorMessage() {
    return  'YEAR must be between 1900-2050!';
  }
  getPRICEErrorMessage() {
    return  'PRICE must be a number of format 0.00 less than 20,000,000.00!';
  }
  getMILEAGEErrorMessage() {
    return  'MILEAGE must be a number less than 20,000,000!';
  }
  getGENErrorMessage() {
    return  'FIELD REQUIRED!';
  }

  setEdit() {
    this.edit = true;
  }
  unSetEdit() {
    this.edit = false;
  }
}
