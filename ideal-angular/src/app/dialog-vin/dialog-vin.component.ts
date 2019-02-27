import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Vehicle } from '../../models/vehicle.model';
import { FormGroup, FormControl, Validators, FormBuilder, FormGroupDirective } from '@angular/forms';
import { VehicleService } from '../../services/vehicle.service';
import { Subscription } from 'rxjs';
import { DialogEntryComponent } from '../dialog-entry/dialog-entry.component';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-dialog-vin',
  templateUrl: './dialog-vin.component.html',
  styleUrls: ['./dialog-vin.component.css']
})
export class DialogVinComponent implements OnInit {

  current_item: any;
  edit_form: FormGroup;
  constructor(
    public dialog: MatDialog,
    private vehicleService: VehicleService,
    private dialogRef: MatDialogRef<DialogEntryComponent>,
    private formBuild: FormBuilder,
    private route: ActivatedRoute) {
      this.edit_form = this.formBuild.group({
        vehVin: new FormControl('', Validators.required),
        vehYear: new FormControl('', Validators.required),
        vehMake: new FormControl('', Validators.required),
        vehModel: new FormControl('', Validators.required),
        vehColor: new FormControl('', Validators.required),
        vehCondition: new FormControl('', Validators.required),
        vehDetails: new FormControl('', Validators.required),
        vehPrice: new FormControl('', Validators.required),
        vehImage: new FormControl('', Validators.required),
      });
     }


  ngOnInit() {
    this.route.params.subscribe(
      param => {
        this.current_item = param;
        console.log(this.current_item);

        this.edit_form.patchValue({title: this.current_item.title});
        this.edit_form.patchValue({description: this.current_item.vehYear});
        this.edit_form.patchValue({title: this.current_item.vehMake});
        this.edit_form.patchValue({description: this.current_item.vehModel});
        this.edit_form.patchValue({title: this.current_item.vehColor});
        this.edit_form.patchValue({description: this.current_item.vehCondition});
        this.edit_form.patchValue({title: this.current_item.vehDetails});
        this.edit_form.patchValue({title: this.current_item.vehPrice});
        this.edit_form.patchValue({description: this.current_item.vehImage});

      }
    );
  }

  updateVehicle(value) {

    let newValues = {
      id: this.current_item.id,
      vehVin: value.vehVin,
      vehYear: value.vehYear,
      vehMake: value.vehMake,
      vehModel: value.vehModel,
      vehColor: value.vehColor,
      vehCondition: value.vehCondition,
      vehDetails: value.vehDetails,
      vehPrice: value.vehPrice,
      vehImage: value.vehImage
    }
    this.vehicleService.updateItem(newValues);

  }
  close() {
    this.dialogRef.close();

  }

}
