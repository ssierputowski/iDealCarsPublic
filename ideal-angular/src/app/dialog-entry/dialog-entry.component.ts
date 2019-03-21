import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Vehicle } from '../../models/vehicle.model';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
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

  constructor(
    public dialog: MatDialog,
    private vehicleService: VehicleService,
    private dialogRef: MatDialogRef<DialogEntryComponent>,
    private formBuild: FormBuilder
   ) {}

  ngOnInit() {

    this.vehicleform = new FormGroup({
      'vehVin': new FormControl(null, {
        validators: [Validators.required]
      }),
      'vehYear': new FormControl(null, {
        validators: [Validators.required]
      }),
      'vehMake': new FormControl(null, {
        validators: [Validators.required]
      }),
      'vehModel': new FormControl(null, {
        validators: [Validators.required]
      }),
      'vehColor': new FormControl(null, {
        validators: [Validators.required]
      }),
      'vehCondition': new FormControl(null, {
        validators: [Validators.required]
      }),
      'vehDetail': new FormControl(null, {
        validators: [Validators.required]
      }),
      'vehPrice': new FormControl(null, {
        validators: [Validators.required]
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
  }
