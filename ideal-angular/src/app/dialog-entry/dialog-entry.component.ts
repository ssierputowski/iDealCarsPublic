import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Vehicle } from '../../models/vehicle.model';
import { FormGroup, FormControl, Validators, ValidationErrors, FormBuilder } from '@angular/forms';
import { VehicleService } from '../../services/vehicle.service';
import { Subscription } from 'rxjs';
import { mimeType } from '../manager-actions/mime-type.validator';

@Component({
  selector: 'app-dialog-entry',
  templateUrl: './dialog-entry.component.html',
  styleUrls: ['./dialog-entry.component.css']

})
export class DialogEntryComponent implements OnInit {

  vehicles: Vehicle[] = [];
  private vehiclesSub: Subscription;

  isLoading = false;
  checked = false;
  vehicleform: FormGroup;
  imagePreview: string;
  carStates: string[] = [
    'USED', 'NEW'
  ];
  constructor(
    public dialog: MatDialog,
    private vehicleService: VehicleService,
    private dialogRef: MatDialogRef<DialogEntryComponent>,
    private formBuild: FormBuilder
   ) {}

  ngOnInit() {

    this.vehicleform = new FormGroup({
      'vehVin': new FormControl(null, {
        validators: [Validators.required, Validators.minLength(17), Validators.maxLength(17), Validators.pattern('[A-Za-z0-9]*')]
      }),
      'vehYear': new FormControl(null, {
        validators: [Validators.required, Validators.min(1900), Validators.max(2050), Validators.pattern('[0-9]*')]
      }),
      'vehMake': new FormControl(null, {
        validators: [Validators.required, Validators.maxLength(25)]
      }),
      'vehModel': new FormControl(null, {
        validators: [Validators.required, Validators.maxLength(15)]
      }),
      'vehColor': new FormControl(null, {
        validators: [Validators.required, Validators.maxLength(15)]
      }),
      'vehCondition': new FormControl(null, {
        validators: [Validators.required]
      }),
      'vehDetail': new FormControl(null, {
        validators: [Validators.required, Validators.maxLength(20)]
      }),
      'vehMiles': new FormControl(null, {
        validators: [Validators.required, Validators.maxLength(7)]
      }),
      'vehPrice': new FormControl(null, {
        validators: [Validators.required, Validators.min(0), Validators.max(1000000), Validators.pattern(/^\d+\.\d{2}$/)]
      }),
      'vehImage': new FormControl(null, {
        validators: [Validators.required], asyncValidators: [mimeType]
      })

    });
    this.vehicleService.getVehicles();
    this.vehiclesSub = this.vehicleService.getVehicleUpdateListener()
      .subscribe((vehicleData: { vehicles: Vehicle[] }) => {
        this.vehicles = vehicleData.vehicles;
      });
  }

    saveVehicle() {
      if (this.vehicleform.invalid) {
        return;
      }
      this.vehicleService.addVehicle(
        this.vehicleform.get('vehVin').value,
        this.vehicleform.get('vehYear').value,
        this.vehicleform.get('vehMake').value,
        this.vehicleform.get('vehModel').value,
        this.vehicleform.get('vehColor').value,
        this.vehicleform.get('vehCondition').value,
        this.vehicleform.get('vehDetail').value,
        this.vehicleform.get('vehMiles').value,
        this.vehicleform.get('vehPrice').value,
        this.vehicleform.get('vehImage').value

      );
      console.log(this.vehicleform.value );
      this.vehicleform.reset();

    }
  /* closes 'Add Vehicle Inventory' form */
  close() {
    this.dialogRef.close();
  }
  // Image selection function
  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.vehicleform.patchValue({vehImage: file});
    this.vehicleform.get('vehImage').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
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
  }
