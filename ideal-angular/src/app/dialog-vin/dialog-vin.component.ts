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
  editClicked = false;
  currentInfo: any;
  edit_form: FormGroup;
  dataSource: MatTableDataSource<Vehicle>;
  newValues = [];
  current_info: any;
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
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private vehicleService: VehicleService,
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
        this.currentInfo = param;
        console.log(this.edit_form);
        // only to see how far method gets
        // this is where currentInfo prints [object Object] in each form section
        // if I do this.currentInfo.vehVin and so on, none of the information is pulled from the table cell and returns empty
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
  
// this for delete
onDelete(vehicleID: string) {
  // vehicleVin = this.data.vehVin;
  this.vehicleService.deleteVehicle(vehicleID);
  // this.dialogRef.close();
}
}
