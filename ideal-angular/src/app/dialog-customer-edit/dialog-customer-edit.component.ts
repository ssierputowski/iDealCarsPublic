import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Vehicle } from '../../models/vehicle.model';
import { FormGroup, FormControl, Validators, FormBuilder, FormGroupDirective } from '@angular/forms';
import { VehicleService } from '../../services/vehicle.service';
import { CustomerService } from '../../services/customer.service';
import { Subscription } from 'rxjs';
import { DialogEntryCustomerComponent } from '../dialog-entry-customer/dialog-entry-customer.component';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-dialog-customer-edit',
  templateUrl: './dialog-customer-edit.component.html',
  styleUrls: ['./dialog-customer-edit.component.css']
})
export class DialogCustomerEditComponent implements OnInit {

  customerId: string;
  firstName: string;
  lastName: string;
  vehicleInfo: [
    {
      vehicleYear: number,
      vehicleMake: string,
      vehicleModel: string,
      vehicleColor: string,
      vehicleId: string,
      vehicleDetails: string,
      vehicleImage: string
    }
  ];
  phoneNumber: string;
  email: string;
  serviceRecords: [
    {
      servicePerformed: string,
      serviceDate: string,
      dateReturned: string,
      mechanic: string,
      serviceNotes: string[],
      servicePrice: number,
      paymentReceived: boolean
    }
  ];

  currentInfo: any;
  editCust: FormGroup;
  dataSource: MatTableDataSource<Vehicle>;

  constructor(
  @Inject(MAT_DIALOG_DATA) public data: any,
  public dialog: MatDialog,
  private vehicleService: VehicleService,
  private customerService: CustomerService,
  private dialogRef: MatDialogRef<DialogEntryCustomerComponent>,
  private formBuild: FormBuilder,
  private route: ActivatedRoute) {

    this.editCust = this.formBuild.group({
    customerName: new FormControl('', Validators.required),
    customerEmail: new FormControl('', Validators.required),
    customerPhone: new FormControl('', Validators.required),
    vehicleYear: new FormControl('', Validators.required),
    vehicleMake: new FormControl('', Validators.required),
    vehicleModel: new FormControl('', Validators.required),
    vehicleColor: new FormControl('', Validators.required),
    customerRecords: new FormControl('', Validators.required),
    });
  }


  ngOnInit() {
    console.log('onInit');
    this.route.params.subscribe(
      param => {
        this.currentInfo = param;
        console.log(this.editCust);
        // only to see how far method gets
        // this is where currentInfo prints [object Object] in each form section
        // if I do this.currentInfo.vehVin and so on, none of the information is pulled from the table cell and returns empty input items
        this.editCust.patchValue({customerName: this.data.customerName});
        this.editCust.patchValue({customerEmail: this.data.customerEmail});
        this.editCust.patchValue({customerPhone: this.data.customerPhone});
        this.editCust.patchValue({vehicleYear: this.data.vehicleYear});
        this.editCust.patchValue({vehicleMake: this.data.vehicleMake});
        this.editCust.patchValue({vehicleModel: this.data.vehicleModel});
        this.editCust.patchValue({vehicleColor: this.data.vehicleColor});
        this.editCust.patchValue({customerRecords: this.data.customerRecords});
      }
    );
  }
  editCustomer(value) {

    const newValues = {
     // id: this.currentInfo.id,
      // vehVin: value.vehVin,
      // vehYear: value.vehYear,
      // vehMake: value.vehMake,
      // vehModel: value.vehModel,
      // vehColor: value.vehColor,
      // vehCondition: value.vehCondition,
      // vehDetail: value.vehDetail,
      // vehPrice: value.vehPrice,
      // vehImage: value.vehImage
      customerName: value.customerName,
      customerEmail: value.customerEmail,
      customerPhone: value.customerPhone,
      vehicleYear: value.vehicleYear,
      vehicleMake: value.vehicleMake,
      vehicleModel: value.vehicleModel,
      vehicleColor: value.vehicleColor,
      customerRecords: value.customerRecords
    };

    // need editVehicle method in vehicle.service.ts to save new information
    // this.vehicleService.editVehicle(newValues);

  }
  close() {
    this.dialogRef.close();

  }
}
