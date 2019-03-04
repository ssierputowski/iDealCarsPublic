import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Vehicle } from '../../models/vehicle.model';
import { FormGroup, FormControl, Validators, FormBuilder, FormGroupDirective } from '@angular/forms';
import { VehicleService } from '../../services/vehicle.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import { elementContainerStart } from '@angular/core/src/render3';

@Component({
  selector: 'app-dialog-vin',
  templateUrl: './dialog-vin.component.html',
  styleUrls: ['./dialog-vin.component.css']
})
export class DialogVinComponent implements OnInit {

  newValues = [];
  current_info: any;
  edit_form: FormGroup;
  dataSource: MatTableDataSource<Vehicle>;
  public dialogRef: MatDialogRef<DialogVinComponent>;
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
  private vehicle: Vehicle;
  private vehicleID: string;
  // vehicleVIN = new FormControl( { value: 'this.vehicleDvin'});


  constructor(
    public dialog: MatDialog,
    private vehicleService: VehicleService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuild: FormBuilder,
    private route: ActivatedRoute) {// this passes the data from the inventory component to this dialog
     /*  this.vehicleDvin = data;
      this.vehicleDYear = data;
      this.vehicleDmake = data;
      this.vehicleDmodel = data;
      this.vehicleDColor = data;
      this.vehicleDcondition = data;
      this.vehicleDdetail = data;
      this.vehicleDPrice = data;
      this.vehicleDimage = data;
 */
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
    console.log(this.data.id);
    console.log(this.data);

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.mode = 'edit';
        this.vehicleID = paramMap.get('id');
        this.vehicle = this.vehicleService.getVehicleByID(this.vehicleID);
      } else { this.vehicleID = null; }
    });

    this.route.params.subscribe(
      param => {
        this.current_info = param;

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

   /*  let newValues = {
      id: this.current_info.id,
      vehVin: value.vehVin,
      vehYear: value.vehYear,
      vehMake: value.vehMake,
      vehModel: value.vehModel,
      vehColor: value.vehColor,
      vehCondition: value.vehCondition,
      vehDetail: value.vehDetail,
      vehPrice: value.vehPrice,
      vehImage: value.vehImage
    }; */
    // this.vehicleService.updateItem(newValues);

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
