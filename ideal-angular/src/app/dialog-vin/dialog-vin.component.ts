import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Vehicle } from '../../models/vehicle.model';
import { FormGroup, FormControl, Validators, FormBuilder, FormGroupDirective } from '@angular/forms';
import { VehicleService } from '../../services/vehicle.service';
import { Subscription } from 'rxjs';
import { DialogEntryComponent } from '../dialog-entry/dialog-entry.component';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-dialog-vin',
  templateUrl: './dialog-vin.component.html',
  styleUrls: ['./dialog-vin.component.css']
})
export class DialogVinComponent implements OnInit {
  vehicleVin: string;
  vehicleYear: Number;
  vehicleMake: string;
  vehicleModel: string;
  vehicleColor: string;
  vehicleCondition: string;
  vehicleDetail: string;
  vehiclePrice: Number;
  vehicleImage: string;

  editClicked = false;
  currentInfo: any;
  edit_form: FormGroup;
  dataSource: MatTableDataSource<Vehicle>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
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
        vehDetail: new FormControl('', Validators.required),
        vehPrice: new FormControl('', Validators.required),
        vehImage: new FormControl('', Validators.required),
      });
     }

  ngOnInit() {

    console.log('onInit');
    this.route.params.subscribe(
      param => {
        this.currentInfo = param;
        console.log(this.edit_form);
        // only to see how far method gets
        // this is where currentInfo prints [object Object] in each form section
        // if I do this.currentInfo.vehVin and so on, none of the information is pulled from the table cell and returns empty input items
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

  editVehicle(value) {

    const newValues = {
      id: this.currentInfo.id,
      vehVin: value.vehVin,
      vehYear: value.vehYear,
      vehMake: value.vehMake,
      vehModel: value.vehModel,
      vehColor: value.vehColor,
      vehCondition: value.vehCondition,
      vehDetail: value.vehDetail,
      vehPrice: value.vehPrice,
      vehImage: value.vehImage
    };

    // need editVehicle method in vehicle.service.ts to save new information
    // this.vehicleService.editVehicle(newValues);

  }
  close() {
    this.dialogRef.close();

  }

  print(currentInfo: any) {
    this.print(currentInfo);
  }

}
