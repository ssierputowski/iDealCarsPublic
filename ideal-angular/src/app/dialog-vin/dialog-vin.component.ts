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
        'vehVin': new FormControl(null, { validators: [Validators.required] }),
        'vehYear': new FormControl(null, { validators: [Validators.required] }),
        'vehMake': new FormControl(null, { validators: [Validators.required] }),
        'vehModel': new FormControl(null, { validators: [Validators.required] }),
        'vehColor': new FormControl(null, { validators: [Validators.required] }),
        'vehCondition': new FormControl(null, { validators: [Validators.required] }),
        'vehDetail': new FormControl(null, { validators: [Validators.required] }),
        'vehPrice': new FormControl(null, { validators: [Validators.required] }),
        'vehImage': new FormControl(null, { validators: [Validators.required] }),
      });
     }


  ngOnInit() {
    this.route.params.subscribe(
      param => {
        this.current_item = param;

        this.edit_form.patchValue({vehVin: this.current_item.vehVin});
        this.edit_form.patchValue({vehYear: this.current_item.vehYear});
        this.edit_form.patchValue({vehMake: this.current_item.vehMake});
        this.edit_form.patchValue({vehModel: this.current_item.vehModel});
        this.edit_form.patchValue({vehColor: this.current_item.vehColor});
        this.edit_form.patchValue({vehCondition: this.current_item.vehCondition});
        this.edit_form.patchValue({vehDetail: this.current_item.vehDetail});
        this.edit_form.patchValue({vehPrice: this.current_item.vehPrice});
        this.edit_form.patchValue({vehImage: this.current_item.vehImage});

      }
    );
  }

  editVehicle(value) {

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
    };
    // this.vehicleService.updateItem(newValues);

  }
  close() {
    this.dialogRef.close();

  }

}
