import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Vehicle } from '../../models/vehicle.model';
import { FormGroup, FormControl, Validators, FormBuilder, FormGroupDirective } from '@angular/forms';
import { VehicleService } from '../../services/vehicle.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import { mimeType } from '../manager-actions/mime-type.validator';


@Component({
  selector: 'app-dialog-vin',
  templateUrl: './dialog-vin.component.html',
  styleUrls: ['./dialog-vin.component.css']
})
export class DialogVinComponent implements OnInit {

  imagePreview: string;
  newValues = [];
  current_info: any;
  edit_form: FormGroup;
  dataSource: MatTableDataSource<Vehicle>;
   /*  vehicleDvin: string;
  vehicleDYear: number;
  vehicleDmake: string;
  vehicleDmodel: string;
  vehicleDColor: string;
  vehicleDcondition: string;
  vehicleDdetail: string;
  vehicleDPrice: number;
  vehicleDimage: string; */
  private mode: 'edit';
  private edit: false;
  private vehicle: Vehicle;
  private vehicleID: string;
  // vehicleVIN = new FormControl( { value: 'this.vehicleDvin'});


  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<DialogVinComponent>,
    private vehicleService: VehicleService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuild: FormBuilder,
    private route: ActivatedRoute) {// this passes the data from the inventory component to this dialog

      this.edit_form = this.formBuild.group({
        'vehVin': new FormControl(null, { validators: [Validators.required] }),
        'vehYear': new FormControl(null, { validators: [Validators.required] }),
        'vehMake': new FormControl(null, { validators: [Validators.required] }),
        'vehModel': new FormControl(null, { validators: [Validators.required] }),
        'vehColor': new FormControl(null, { validators: [Validators.required] }),
        'vehCondition': new FormControl(null, { validators: [Validators.required] }),
        'vehDetail': new FormControl(null, { validators: [Validators.required] }),
        'vehPrice': new FormControl(null, { validators: [Validators.required] }),
        'vehImage': new FormControl(null, { validators: [Validators.required], asyncValidators: [mimeType] }),
      });
     }


  ngOnInit() {
    console.log(this.data.id);
    console.log(this.data);
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
        this.edit_form.patchValue({vehPrice: this.data.vehPrice});
        this.edit_form.patchValue({vehImage: this.data.vehImage});

      }
    );
  }
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
      this.edit_form.get('vehPrice').value,
      this.edit_form.get('vehImage').value

    );
    console.log(this.edit_form.value);
     this.dialogRef.close();
  }

  close() {
    this.dialogRef.close();
  }
// this for delete
onDelete(vehicleID: string) {
  // vehicleVin = this.data.vehVin;
  this.vehicleService.deleteVehicle(vehicleID);
  // this.dialogRef.close();
}
}
