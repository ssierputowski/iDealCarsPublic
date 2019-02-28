import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Vehicle } from '../../models/vehicle.model';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { VehicleService } from '../../services/vehicle.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dialog-entry',
  templateUrl: './dialog-entry.component.html',
  styleUrls: ['./dialog-entry.component.css']

})
export class DialogEntryComponent implements OnInit {

  vehicles: Vehicle[] = [];
  totalVehicles = 0;
  private vehiclesSub: Subscription;

  isLoading = false;
  checked = false;
  vehicleform: FormGroup;

  constructor(
    public dialog: MatDialog,
    private vehicleService: VehicleService,
    private dialogRef: MatDialogRef<DialogEntryComponent>,
    private formBuild: FormBuilder
   ) {}

  ngOnInit() {
      if (this.checked) {
        this.isLoading = true;
      } else {
        this.isLoading = false;
      }
    this.vehicleform = this.formBuild.group({
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
        validators: [Validators.required]
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
        this.vehicleform.value.vehVin,
        this.vehicleform.value.vehYear,
        this.vehicleform.value.vehMake,
        this.vehicleform.value.vehModel,
        this.vehicleform.value.vehColor,
        this.vehicleform.value.vehCondition,
        this.vehicleform.value.vehDetails,
        this.vehicleform.value.vehPrice,
        this.vehicleform.value.vehImage

      );

      this.vehicleform.reset();

    }
  /* closes 'Add Vehicle Inventory' form */
  close() {
    this.dialogRef.close();

  }
  }
